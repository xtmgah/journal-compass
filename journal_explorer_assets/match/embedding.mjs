export const MODEL = 'Xenova/all-MiniLM-L6-v2';
export const MODEL_REVISION = '751bff37182d3f1213fa05d7196b954e230abad9';
export const DIMENSION = 384;
export const MAX_TEXT_LENGTH = 12302;
export const CHUNK_TOKENS = 224;
export const OVERLAP_TOKENS = 32;
export const EMBEDDING_VERSION = 'minilm-q8-token224-overlap32-mean-l2-v1';
export const GENERIC_ERROR = 'Local semantic matching is unavailable. Please try again.';

export function validText(text) {
  return typeof text === 'string' && text.length <= MAX_TEXT_LENGTH && text.trim().length > 0;
}

export function tokenWindows(ids) {
  const windows = [];
  for (let start = 0; start < ids.length; start += CHUNK_TOKENS - OVERLAP_TOKENS) {
    const end = Math.min(start + CHUNK_TOKENS, ids.length);
    windows.push({ ids: ids.slice(start, end), weight: end - start - (start ? OVERLAP_TOKENS : 0) });
    if (end === ids.length) break;
  }
  return windows;
}

export function normalizeVector(values) {
  const norm = Math.hypot(...values);
  if (values.length !== DIMENSION || !Number.isFinite(norm) || norm === 0) throw new Error(GENERIC_ERROR);
  return Array.from(values, value => value / norm);
}

export function configureLocalEnvironment(env, { modelPath, wasmPaths, fetch }) {
  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = modelPath;
  env.useBrowserCache = false;
  env.useFSCache = false;
  env.useCustomCache = false;
  env.useWasmCache = false;
  env.logLevel = 50;
  if (fetch) env.fetch = fetch;
  env.backends.onnx.wasm.numThreads = 1;
  env.backends.onnx.wasm.proxy = false;
  if (wasmPaths) env.backends.onnx.wasm.wasmPaths = wasmPaths;
}

// Encode once without truncation; slicing IDs avoids re-tokenization at chunk boundaries.
export async function createEmbedder(api, { device = 'wasm', progress_callback } = {}) {
  const options = {
    local_files_only: true,
    trust_remote_code: false,
    revision: MODEL_REVISION,
    progress_callback,
  };
  const tokenizer = await api.AutoTokenizer.from_pretrained(MODEL, options);
  const model = await api.AutoModel.from_pretrained(MODEL, {
    ...options, dtype: 'q8', device,
    session_options: { intraOpNumThreads: 1, interOpNumThreads: 1, logSeverityLevel: 4 },
  });
  const special = tokenizer.encode('', { add_special_tokens: true });
  if (special.length !== 2) {
    await model.dispose();
    throw new Error(GENERIC_ERROR);
  }
  return {
    async embed(text, onProgress = () => {}) {
      if (!validText(text)) throw new Error(GENERIC_ERROR);
      const ids = tokenizer.encode(text, { add_special_tokens: false });
      const windows = tokenWindows(ids);
      if (!windows.length) throw new Error(GENERIC_ERROR);
      const sum = new Float64Array(DIMENSION);
      for (let index = 0; index < windows.length; index += 1) {
        const { ids: chunk, weight } = windows[index];
        const inputIds = [special[0], ...chunk, special[1]];
        const shape = [1, inputIds.length];
        const inputs = {
          input_ids: new api.Tensor('int64', BigInt64Array.from(inputIds, BigInt), shape),
          attention_mask: new api.Tensor('int64', new BigInt64Array(inputIds.length).fill(1n), shape),
          token_type_ids: new api.Tensor('int64', new BigInt64Array(inputIds.length), shape),
        };
        let outputs, pooled;
        try {
          outputs = await model(inputs);
          pooled = api.mean_pooling(outputs.last_hidden_state, inputs.attention_mask);
          if (pooled.data.length !== DIMENSION) throw new Error(GENERIC_ERROR);
          for (let d = 0; d < DIMENSION; d += 1) sum[d] += pooled.data[d] * weight;
        } finally {
          const tensors = new Set([...Object.values(inputs), ...Object.values(outputs || {}), pooled]);
          for (const tensor of tensors) tensor?.dispose?.();
        }
        onProgress((index + 1) / windows.length);
      }
      return normalizeVector(sum);
    },
    dispose: () => model.dispose(),
  };
}

const MODEL_FILES = ['config.json', 'tokenizer.json', 'tokenizer_config.json', 'onnx/model_quantized.onnx'];
const WASM_FILES = ['ort-wasm-simd-threaded.mjs', 'ort-wasm-simd-threaded.wasm'];

export function createAssetFetch(base, fetchImpl) {
  const root = new URL(base);
  const allowed = new Set([
    ...MODEL_FILES.map(path => new URL(`models/${MODEL}/${path}`, root).href),
    ...WASM_FILES.map(path => new URL(`runtime/${path}`, root).href),
  ]);
  return async (input, init = {}) => {
    const request = typeof input === 'string' || input instanceof URL ? null : input;
    const url = new URL(request ? request.url : input, root);
    const method = (init.method || request?.method || 'GET').toUpperCase();
    if (!['http:', 'https:'].includes(root.protocol) || url.origin !== root.origin ||
        !allowed.has(url.href) || method !== 'GET' || init.body != null || request?.body != null) {
      throw new Error(GENERIC_ERROR);
    }
    // Do not forward caller-controlled headers, credentials, referrers, or redirects.
    const response = await fetchImpl(url.href, {
      method: 'GET', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer',
      cache: 'default', signal: init.signal || request?.signal,
    });
    if (response.redirected || (response.url && response.url !== url.href)) throw new Error(GENERIC_ERROR);
    return response;
  };
}

export function createWorkerHandler({ load, post }) {
  let embedderPromise;
  let busy = false;
  const error = id => post({ type: 'error', id, message: GENERIC_ERROR });
  return async data => {
    const id = data?.id;
    if (!(typeof id === 'string' && id.length <= 128) && !(Number.isSafeInteger(id))) return;
    if (data.type !== 'embed' || !validText(data.text) || busy) return error(id);
    busy = true;
    let previous = -1;
    const progress = value => {
      const next = Math.max(previous, Math.min(100, Math.max(0, Math.round(value))));
      if (next === previous || !Number.isFinite(next)) return;
      previous = next;
      post({ type: 'progress', id, progress: next, message: 'Loading local model...' });
    };
    try {
      progress(0);
      if (!embedderPromise) embedderPromise = load(event => {
        if (event.status === 'progress' && Number.isFinite(event.progress)) progress(event.progress * 0.7);
      });
      const embedder = await embedderPromise;
      progress(75);
      const vector = await embedder.embed(data.text, fraction => progress(75 + fraction * 25));
      post({ type: 'result', id, vector });
    } catch {
      // Never return exception text: tokenizers and runtimes can include their inputs.
      const old = embedderPromise;
      embedderPromise = undefined;
      try { await (await old)?.dispose?.(); } catch {}
      error(id);
    } finally {
      busy = false;
    }
  };
}
