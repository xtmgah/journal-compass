# Expanded Journal Match Model

Status: Experimental; quality or coverage checks not met. Adapter does not deploy automatically.

## Training and Evidence

Frozen encoder: Xenova/all-MiniLM-L6-v2. Full licensed training: 226693 papers; indexed representative evidence: 72678 papers; fitted journals: 466/502. Full-training centroids, prototypes and optional ridge coefficients are retained. The evidence cap does not cap training.

## Untouched Holdout

Primary input: title + abstract. 3812 newly unseen papers across 238 journals. Both models use the same full-catalog test denominator; unsupported targets, unembeddable papers and abstentions are misses. The baseline is the previous corpus-trained model, not a scope matcher.

| Macro metric | Recall@1 | Recall@5 | Recall@10 | MRR@10 |
| --- | --- | --- | --- | --- |
| Expanded corpus | 0.1870162098780241 | 0.42369433111255733 | 0.566814119634186 | 0.28980981152933255 |
| Previous corpus | 0.1600679546911127 | 0.36956397616107134 | 0.48716585574019067 | 0.25217944182773777 |

Micro metrics and exact recorded comparison statistics are in independent-validation.json. No historical inspected-test results are included in this release. No ablation claim is made.

## Abstract-Only Holdout (Secondary)

3812 of the same frozen papers, with unchanged model weights. Abstract-only evaluation is exploratory, not tuning or readiness evidence; title + abstract remains primary. 0 papers could not be embedded and remain in the denominator as misses.

| Macro metric | Recall@1 | Recall@5 | Recall@10 | MRR@10 |
| --- | --- | --- | --- | --- |
| Expanded corpus | 0.18483352235771078 | 0.4190457417283364 | 0.5496488967469526 | 0.28662586823747144 |
| Previous corpus | 0.15662131541424015 | 0.37837022763447153 | 0.483296589899459 | 0.24792200598858574 |

Full micro metrics, paired comparisons and per-journal aggregates are in independent-validation.json. Null intervals mean uncertainty is unavailable, not zero.

## Readiness Checks

- declared_new_holdout_benchmark_gate: pass; observed true, required true.
- catalog_journal_count: pass; observed 502, required 502.
- test_document_count: pass; observed 3812, required 1000.
- tested_journal_count: pass; observed 238, required 100.
- no_macro_or_micro_recall_regression: pass; observed true, required true.
- declared_paired_top5_gain_lower_bound: pass; observed 0.013678293395880683, required ">0".
- paired_bootstrap_top5_gain_lower_bound: pass; observed 0.015591215255379924, required ">0".
- macro_top5_gain: pass; observed 0.05413035495148599, required 0.01.
- prediction_coverage: pass; observed 0.9792759706190975, required 0.95.
- catalog_training_coverage: pass; observed 0.9282868525896414, required 0.8.
- catalog_test_coverage: fail; observed 0.47410358565737054, required 0.8.
- catalog_with_30_training_and_5_new_test_papers: fail; observed 0.11354581673306773, required 0.8.
- component_ablation_available: fail; observed 0, required ">=1 verified ablation".

Experimental only. These results do not establish broad superiority or production readiness.

## Sampling and Limitations

- Known publication venue is not acceptance probability or exclusive suitability.
- New acquisition uses exact-ISSN journal matching in Europe PMC, records without an acquisition rights filter, English research/review papers, and newest-first bounded period prefixes (all-active-catalog, 2026-10-04 to 2026-11-24, annual windows, up to 1000 per journal per window, inactive titles excluded; untrained-catalog, 2021-01-01 to 2026-11-24, annual windows, up to 1000 per journal per window, inactive titles included; general-multidisciplinary, 2024-01-01 to 2026-11-24, monthly windows, up to 150 per journal per window, inactive titles excluded; identity-corrections, 2011-01-01 to 2026-11-24, annual windows, up to 500 per journal per window, inactive titles included). Passes may overlap; records are deduplicated before frozen membership. Pass caps are not unique-paper counts or training caps. Period prefixes are not random or exhaustive for high-volume journals.
- The untouched holdout measures newly unseen papers within this bounded all-rights acquisition universe, not all publication output. Holdout membership is frozen before development reuse-rights filtering; acquisition eligibility still limits the evaluated population.
- The older varied-license corpus was previously seen; historical test results are regression-only, never main metrics or readiness evidence.
- OA status and authorship alone are not training or redistribution permission; documentary reuse rights are checked separately.
- Adapter reuse-documentation checks cover public-index citations only; omitted training citations are not re-audited here.
- Temporal cutoffs differ by journal; frozen encoder pretraining overlap is unknown.
- This adapter checks recorded artifacts and memberships; it does not rerun or independently reproduce evaluation.
- Retained historical sources include the original bounded varied-license corpus and the prior expanded OPEN_ACCESS:Y acquisition: English research/review papers, up to 1000 newest papers per journal per year in 2021-2026. These are earlier source protocols, not the new acquisition settings.
- Eligible licensed historical training records remain in the fitting pool. New acquisition extends rather than replaces that pool; earlier validation, test and quarantined components remain excluded from development.
- The acquisition query excludes indexed Editorial, Letter, Comment, Published Erratum, Retracted Publication, Retraction of Publication, Preprint and Expression of Concern types. Research is a broad bibliographic class, not an independently verified original-research assessment.

## Privacy

Public-index citation reuse documentation and partition membership were checked, not independently re-adjudicated. Omitted training citations were not re-audited by this adapter. Aggregate reports contain no paper-level test predictions or raw queries/abstracts. The model contains documented public training-paper citations only.

Corpus fingerprint: 01f036e6c38ea48c5844ee6b44f723a5b19be8e1726147fea881c49775d322f4 (canonical digest of the two frozen corpus input digests, not concatenated raw-file bytes).

Frozen plan/split fingerprint: 0cd531ad7bc7dad9bce3830a40aadd0053658b2760eb25b08627a36cbc2b9a77.

Public model file SHA-256: abcb4bdd7228e455e96f39a4f308c691bb3f666a37daec94d1eba3273b980e0d.
