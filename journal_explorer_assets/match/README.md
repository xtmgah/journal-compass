# Local Semantic Matcher Runtime

## Integration

Serve this entire `match/` directory unchanged at the same origin as the explorer.
No CDN, API key, telemetry, remote model, remote code, or manuscript network request is used.
Use HTTP(S), not `file:`. Ordinary static hosting is sufficient; cross-origin isolation
is not required. The parent controller should create this worker only after opt-in:

```js
const worker = new Worker(new URL('journal_explorer_assets/match/worker.js', document.baseURI), { type: 'module' });
worker.postMessage({ type: 'embed', id: 1, text: title + '\n\n' + abstract });
```

The worker deliberately configures `localModelPath` with the origin-relative URL
pathname, not an absolute HTTP(S) URL. Transformers.js 4.3.0's tokenizer metadata
probe skips absolute HTTP paths when remote models are disabled, even if those URLs
are same-origin. WASM URLs remain absolute and same-origin. Preserve this distinction
when changing deployment paths.

Messages are exactly:

- `{ type: 'progress', id, progress: 0..100, message: 'Loading local model...' }`
- `{ type: 'result', id, vector: number[384] }`
- `{ type: 'error', id, message: 'Local semantic matching is unavailable. Please try again.' }`

IDs may be safe integers or strings up to 128 characters. Text must be nonblank and
at most 12,302 JavaScript characters (300 title + two newlines + 12,000 abstract).
Concurrent jobs receive a generic error; the controller should terminate and replace
the worker to supersede an in-flight request. Ignore stale message IDs.
Use `worker.terminate()` for cancel, clear, leaving the feature, or disabling consent:
this destroys the worker's model/WASM/input memory. There is no model or input store
outside the worker. HTTP caches can contain static model assets, never submitted text.
Browser reclamation timing is implementation-dependent; no promise of secure byte erasure.

The publication-trained matcher uses `corpus/model.json` and `corpus/vectors.i8`.
The parent verifies the manifest against the HTML's SHA-256, streams responses
with size limits, verifies the vector hash, and validates the schema before ranking.
Only static public reference files are fetched. `corpus/independent-validation.json`
contains aggregate evaluation, tied to the exact deployed manifest hash.
See `corpus/MODEL_CARD.md` for sampling, learning, evaluation, and limitations.

The older `journal_match_vectors.json` remains an archived scope-matcher baseline.
It is not the new publication-trained journal model. A failed model load offers
basic keyword scope search only through an explicit user action, never a silent
fallback presented as learned matching.

## Model And Algorithm

- Transformers.js 4.3.0, Apache-2.0.
  The browser bundle includes only the BERT encoder/tokenizer needed by MiniLM,
  not the general-purpose registry of unrelated generative models. Browser-only
  build stubs exclude Node backends without changing the encoder or tokenizer.
- ONNX Runtime Web 1.31.0-dev.20260914-8d85527a0, MIT, WASM-only build.
- Xenova/all-MiniLM-L6-v2 revision 751bff37182d3f1213fa05d7196b954e230abad9,
  Apache-2.0, q8 ONNX, 384 dimensions, 22,972,370 bytes.
- Model SHA-256: afdb6f1a0e45b715d0bb9b11772f032c399babd23bfc31fed1c170afc848bdb1.
- Tokenizer: @huggingface/tokenizers 0.2.0, Apache-2.0;
  bundled template dependency @huggingface/jinja 0.5.10, MIT.

`embedding.mjs` is shared by worker queries and build-time embeddings. It tokenizes the
entire text without truncation, uses 224-token windows with 32-token overlap, adds
the model's CLS/SEP tokens, attention-mask mean-pools each window, averages chunk
vectors weighted by newly covered tokens, then L2-normalizes. Even an unusually
dense 12,302-character input is processed completely. The archived scope vectors
and the fitted model's per-row int8 vectors use this same encoding algorithm,
with CPU inference during the build;
browser inference explicitly selects WASM, one thread, no WebGPU or proxy worker.
Native CPU and WASM may differ slightly in floating point/quantization results.

Remote loading is explicitly disabled, local files are mandatory, and remote code
is not trusted. Browser/FS/custom/WASM library caches are disabled. A worker-local
fetch allowlist permits only exact same-origin static asset GETs, disallows query
strings and redirects, strips credentials and caller-controlled headers, and never
contains manuscript data. Diagnostic output is suppressed in the worker; outward
errors/progress contain generic text only. No service worker is installed.

## Rebuilding The Runtime And Archived Baseline

Use a temporary build-only dependency directory, outside the published assets:

```sh
pnpm add --ignore-scripts --save-exact @huggingface/transformers@4.3.0 esbuild@0.27.2 linkedom@0.18.12
export JOURNAL_MATCH_BUILD_DEPS=/absolute/path/to/that/directory
node journal_match_runtime.mjs
node build_journal_match_vectors.mjs
node --test journal_explorer_tests/match-runtime.test.mjs
```

Only the asset acquisition helper makes upstream requests. Vector generation and
real-model tests load local files and explicitly reject network access. Generation
loads the existing inert `catalog-data`/`submission-data`, bundled MiniSearch, and
`journal_match_engine.js`, then uses `documents()` directly. It requires exactly
469 unique catalog documents, records their digest, and replaces vectors atomically.
For archival/closed journals only, build-time profile views neutralize non-text
eligibility fields so the engine can emit their unchanged scope text too. All 464
currently eligible profiles are checked against the unmodified engine output.
These five extra archival vectors do not change the live ranking exclusions.
No app shell, controller, or R build file is modified by these helpers.
These commands rebuild the runtime and old scope baseline, not the fitted
published-paper model. The latter uses the separate collection, training and
independent evaluation pipeline documented in `corpus/MODEL_CARD.md`; raw corpora
and test vectors must remain outside the published asset directory.
After changes to files under `match/`, refresh hashes with
`node journal_match_runtime.mjs --manifest-only`.
To rebuild just the browser library from the pinned dependencies without downloading
the model again, use `node journal_match_runtime.mjs --bundle-only`.

## Licenses And Verification

`manifest.json` records pinned sources, bytes, SHA-256 hashes, backend settings, and
the ONNX Runtime source commit. Each hosted file must remain below 100,000,000 bytes.
`licenses/` contains verbatim upstream runtime/tokenizer/template licenses, ONNX
Runtime third-party notices, and the pinned model card. The model repository has
no separate LICENSE file; its card declares Apache-2.0, whose exact text is included
as MODEL-APACHE-2.0.txt. Copyright and attribution notices are retained unchanged.

Official API references checked during implementation:

- https://huggingface.co/docs/transformers.js/en/custom_usage
- https://huggingface.co/docs/transformers.js/api/pipelines
- https://onnxruntime.ai/docs/tutorials/web/env-flags-and-session-options.html
- https://github.com/huggingface/transformers.js (pinned npm package source is authoritative for 4.3.0)

Run live-browser checks without COOP/COEP, confirm `crossOriginIsolated === false`,
observe static same-origin requests only, compare repeated/similar synthetic text,
and verify cancellation/clear by terminating the worker. Tests must use synthetic
or public text only, never a private manuscript.

The runtime test suite also executes the unchanged shipped browser worker, tokenizer,
model, and WASM in an isolated Node VM with browser-like globals, no native Node
inference backend, no SharedArrayBuffer global, and crossOriginIsolated=false. This
regression test checks nested deployment paths and same-origin asset-only fetches.
It supplements, but does not replace, the parent's real-browser smoke test.
