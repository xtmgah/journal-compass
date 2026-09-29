import { configureLocalEnvironment, createAssetFetch, createEmbedder, createWorkerHandler } from './embedding.mjs';

const base = new URL('./', import.meta.url);
const localFetch = createAssetFetch(base, globalThis.fetch.bind(globalThis));
globalThis.fetch = localFetch;

// Private text must not reach diagnostic logs or alternate network channels.
for (const name of ['log', 'info', 'debug', 'warn', 'error']) console[name] = () => {};
for (const name of ['XMLHttpRequest', 'WebSocket', 'EventSource']) {
  Object.defineProperty(globalThis, name, { value: undefined, configurable: false, writable: false });
}

const handle = createWorkerHandler({
  post: message => self.postMessage(message),
  load: async progress_callback => {
    const api = await import('./runtime/transformers.mjs');
    configureLocalEnvironment(api.env, {
      // v4's tokenizer metadata probe treats absolute HTTP URLs as remote paths.
      modelPath: new URL('models/', base).pathname,
      wasmPaths: {
        mjs: new URL('runtime/ort-wasm-simd-threaded.mjs', base).href,
        wasm: new URL('runtime/ort-wasm-simd-threaded.wasm', base).href,
      },
      fetch: localFetch,
    });
    return createEmbedder(api, { device: 'wasm', progress_callback });
  },
});
self.addEventListener('message', event => { void handle(event.data); });
