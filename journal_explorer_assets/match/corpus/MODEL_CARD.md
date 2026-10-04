# Journal Match: Published-Paper Model

## Intended Use

Generate a research-journal shortlist from an English manuscript title and
abstract. Inspect the supporting published papers, official scope, article
eligibility, and submission guidance before choosing a journal. This model does
not assess novelty, scientific rigor, clinical utility, acceptance probability,
or whether a specific editor will send a manuscript for review.

The interface marks the model Experimental unless its independent offline quality
and coverage checks pass. Even passing those checks is not evidence of acceptance
prediction or a uniquely correct submission recommendation.

## Data

The bounded Europe PMC sample targets up to 160 abstract-bearing papers per active
catalog journal: 40 in 2021-2022, 40 in 2023-2024, and 80 in 2025 through
2026-10-03. Each window takes recent eligible records, not a random census.
Queries and source records are checked against exact journal names and verified
ISSNs. Indexing gaps, sparse/new journals, source failures, abstract availability,
and reuse restrictions limit coverage. Research and review labels are retained.

Raw records, abstracts, API caches, held-out query vectors, and individual test
predictions are private build material and are not shipped to the website.
Only explicitly supported CC BY, CC0, or public-domain development records enter
the public learned model and paper index. Unknown licenses, noncommercial,
no-derivative, and share-alike records are not treated as permission to publish
an embedding. Public training-paper evidence retains source attribution, license
links and modification notices; source content is not endorsed by NLM or Europe PMC.

## Learning

- Frozen, quantized `Xenova/all-MiniLM-L6-v2`, revision
  `751bff37182d3f1213fa05d7196b954e230abad9`, produces 384-dimensional embeddings.
  This pretrained encoder is not a biomedical transformer fine-tuned here.
- Input features are titles and abstracts, with explicit publisher/affiliation
  boilerplate removed. Journal labels, author identities, impact factors and
  acceptance/processing metrics are not semantic input features.
- Training learns journal centroids and topic prototypes. A class-balanced,
  L2-regularized ridge classifier is a competing learned journal head.
- Separate development validation selects the production ranker and its settings
  before the final held-out test. The model manifest records that choice.
- Similar-paper citations come only from training records. They support topic
  relevance, not proof that the journal will accept the submitted manuscript.
- Low-support queries can abstain using validation-derived similarity thresholds.
  This is a heuristic, not a validated general out-of-domain detector.

The browser uses the same pinned encoder and token-window pooling protocol as the
build. Quantized production weights are used in offline evaluation. Native CPU
and browser WASM can differ slightly in floating-point results. The phrase-based
study-design summary is a separate, conservative UI aid; it is not a generative
LLM agent and does not determine the journal ranking.

## Evaluation

### Frozen Release: 2026-10-03

The collected snapshot contains 67,792 records from 451 journals. After reuse,
quality, attribution and split checks, fitting uses 16,714 papers across 422 of
469 catalog journals. Model selection uses 1,659 separate development papers.
The final test contains 3,363 papers across 437 journals, 4.96% of eligible
deduplicated groups before boundary quarantine. It is not restricted to journals
the trained model can represent. The selected ranker is the validation-tuned
centroid/topic-prototype/article-neighbor model, not the competing ridge head.

Independent known-venue recovery, giving each tested journal equal weight:

| Rank threshold | Previous hybrid scope matcher | Published-paper model |
| --- | ---: | ---: |
| Top 1 | 9.2% | 18.1% |
| Top 5 | 19.4% | 41.6% |
| Top 10 | 22.7% | 53.2% |

Paper-weighted recovery is 18.4%, 42.3%, and 54.0%, respectively. These are
measured offline results, not a claim of broad readiness or acceptance prediction.
The independent quality gate **does not pass**: only 44.1% of catalog journals
have at least 30 actual training papers, and 43.9% have adequate licensed
training/test support, below the predeclared 80% thresholds. Experimental status
therefore remains. The frozen acquisition catalog lacks discipline labels, so
discipline-specific accuracy is unavailable in this release; article-type strata
are reported. No parameters were changed using the final test results.
The heuristic sanitizer is not perfect: source QA found two residual grant or
open-access declaration suffixes without explicit journal labels. Contextual
journal-name, study-site, and software-license mentions also remain audit warnings;
these are not represented as fully cleared or used for post-test tuning.

Exact model SHA-256:
`e688a9c1580f0e4764621a62e2974de1a636093da9d35b8dad9daaaf2c79dd4d`.

### Protocol

The final corpus and split are frozen before fitting. Global connected-component
deduplication links PMID, DOI, and normalized-title identities before filtering.
Conflicting labels are quarantined. The newest floor(5%) of usable records per
journal are held out; the preceding floor(10%) form development validation.
Ties at date boundaries are quarantined rather than moved into earlier partitions.
Very small journals may have no 5% test; they remain visible in coverage reports.
This is a within-journal forward split, not one globally prospective calendar date.

Reuse rights restrict training and tuning, not the private test cohort. Test
papers from unsupported journals, omitted predictions and abstentions stay in
the denominator as misses. The production model and previous scope matcher use
the same held-out queries. The report includes journal-weighted and paper-weighted
top-1, top-5, top-10 recovery, reciprocal rank, available article-type strata,
source coverage, paired uncertainty estimates and predeclared quality checks.
These metrics use published titles plus abstracts; title-only use is not the
same benchmark. They measure recovery of one observed publishing venue, not
all suitable alternatives or submission outcomes.

The exact aggregate results are in `independent-validation.json`, whose model
SHA-256 must match `model.json`. `validation.json` records the trainer's report.
No synthetic test results are used as accuracy claims. Development pilots and
engineering checks are not independent external validation. Duplicate checks
cannot rule out paraphrases, preprint overlap, or overlap with encoder pretraining.

## Privacy And Hosting

Manuscript text and its query vector stay in the current tab's memory. They are
not uploaded, saved in browser storage, sent to analytics, included in shared
URLs, or exported in downloaded HTML. Clear, Reset, reload and leaving the
document discard transient application state; this is not a forensic secure-memory
erasure guarantee. Installed browser extensions remain outside the application's
control. Model and public-reference files may be cached and do not contain user text.

Inference runs in a terminable local browser worker. Model requests are fixed
same-origin static GETs without manuscript text, query parameters or credentials.
Shared visitor analytics is separate and never receives manuscript information.
Standalone file copies cannot run the hosted worker/index and disclose that limit.

## Reproduction

Use the local collection, training and evaluation scripts in the source workspace:
`journal_match_research/collect_corpus.py`, `journal_match_model_train.mjs`,
`journal_match_evaluate.mjs`, and `build_journal_match_browser.mjs`. Keep frozen
corpora and embedding caches outside the publishing folder. Rebuild the HTML only
after the exact model has been independently evaluated. The build rejects a stale
evaluation hash. Never refit held-out papers into the published retrieval index.

Source documentation: [Europe PMC API](https://europepmc.org/RestfulWebService),
[Europe PMC copyright](https://europepmc.org/copyright),
[NLM policies](https://www.ncbi.nlm.nih.gov/home/about/policies/), and
[Creative Commons licenses](https://creativecommons.org/share-your-work/cclicenses/).
