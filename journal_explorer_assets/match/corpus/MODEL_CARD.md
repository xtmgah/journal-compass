# Expanded Journal Match Model

Status: Experimental; quality or coverage checks not met. Adapter does not deploy automatically.

## Training and Evidence

Frozen encoder: Xenova/all-MiniLM-L6-v2. Full licensed training: 198872 papers; indexed representative evidence: 65323 papers; fitted journals: 429/469. Full-training centroids, prototypes and optional ridge coefficients are retained. The evidence cap does not cap training.

## Untouched Holdout

16309 newly unseen papers across 356 journals. Both models use the same full-catalog test denominator; unsupported targets, unembeddable papers and abstentions are misses. The baseline is the previous corpus-trained model, not a scope matcher.

| Macro metric | Recall@1 | Recall@5 | Recall@10 | MRR@10 |
| --- | --- | --- | --- | --- |
| Expanded corpus | 0.20469616885557146 | 0.4812184436542601 | 0.5996158498566033 | 0.319815661555178 |
| Previous corpus | 0.18729609816219206 | 0.43681882562586144 | 0.5564188927357306 | 0.2917317537379363 |

Micro metrics and exact recorded comparison statistics are in independent-validation.json. Historical inspected-test results are explicitly regression-only and are excluded from main metrics and readiness gates. No ablation claim is made.

## Readiness Checks

- declared_new_holdout_benchmark_gate: pass; observed true, required true.
- catalog_journal_count: pass; observed 469, required 469.
- test_document_count: pass; observed 16309, required 1000.
- tested_journal_count: pass; observed 356, required 100.
- no_macro_or_micro_recall_regression: pass; observed true, required true.
- declared_paired_top5_gain_lower_bound: pass; observed 0.022181512746845787, required ">0".
- paired_bootstrap_top5_gain_lower_bound: pass; observed 0.022596128154658387, required ">0".
- macro_top5_gain: pass; observed 0.044399618028398646, required 0.01.
- prediction_coverage: pass; observed 0.9852228830706972, required 0.95.
- catalog_training_coverage: pass; observed 0.9147121535181236, required 0.8.
- catalog_test_coverage: fail; observed 0.7590618336886994, required 0.8.
- catalog_with_30_training_and_5_new_test_papers: fail; observed 0.4946695095948827, required 0.8.
- component_ablation_available: fail; observed 0, required ">=1 verified ablation".

Experimental only. These results do not establish broad superiority or production readiness.

## Sampling and Limitations

- Known publication venue is not acceptance probability or exclusive suitability.
- New acquisition uses OPEN_ACCESS:Y, English research/review papers, and up to 1000 newest papers per journal per year in 2021-2026. Annual prefixes are not random or exhaustive for high-volume journals.
- The untouched holdout measures unseen OA-indexed papers, not general publication or paywalled-paper performance. Test inclusion is license-unrestricted only within that OA sampling universe.
- The older varied-license corpus was previously seen; historical test results are regression-only, never main metrics or readiness evidence.
- OA status and authorship alone are not training or redistribution permission; documentary reuse rights are checked separately.
- Adapter reuse-documentation checks cover public-index citations only; omitted training citations are not re-audited here.
- Temporal cutoffs differ by journal; frozen encoder pretraining overlap is unknown.
- This adapter checks recorded artifacts and memberships; it does not rerun or independently reproduce evaluation.

## Privacy

Public-index citation reuse documentation and partition membership were checked, not independently re-adjudicated. Omitted training citations were not re-audited by this adapter. Aggregate reports contain no paper-level test predictions or raw queries/abstracts. The model contains documented public training-paper citations only.

Corpus fingerprint: 531bdfbb19f47581bdcca4f8aa981d292ac32369f2bc004104bbf1666b297983 (canonical digest of the two frozen corpus input digests, not concatenated raw-file bytes).

Frozen plan/split fingerprint: a9adc824245dfd2c03601099859ff0f99d22894cb9a8aaf242b56204afc60028.

Public model file SHA-256: b4c4188a739ff4aad200553f6c3863b0434314966e95e0cb73032bcabc61e969.
