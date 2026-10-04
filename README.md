# Journal Compass

A browser-based journal comparison and submission-planning tool for cancer,
genetics, genomics, biology, bioinformatics, clinical medicine, and epidemiology.

The application is `index.html`. Journal data, charts, icons, and imagery are
embedded; the core explorer requires no R installation or application server.
Shared analytics uses the separate service described below. Official source links
and shared statistics require internet access.

## September 2026 catalog

The catalog contains 469 journals, including Cancer Gene Therapy and the Wiley
Advanced life and health sciences additions below. Both requested Google Scholar profiles were
traversed to the end: 678 displayed entries in one profile and 2,020 in the other.
All 120 and 251 screened journal venues, respectively, map to the catalog or a
documented successor title. These are profile-discovery counts, not independently
verified authorship counts. Books, preprints, education/news products, ambiguous
venue labels, and non-journal records are not treated as research journals.

Scope descriptions are present for all 469 titles, first-decision evidence for
220, and article-format guidance for 313. Evidence coverage differs by field;
an absent value does not imply zero or an unlimited allowance. Historical or
closed titles remain available for comparison but are marked as not accepting
new submissions.

The September 15-16, 2026 journal-by-journal history audit checked all 457
catalog titles; Cancer Gene Therapy and the Wiley titles were subsequently audited.
Annual JIF evidence now contains 5,185 journal-year values across
437 journals, up from 1,441 values across 239 journals. Of these, 338 journals
have at least ten metric years and 55 have all fifteen years from 2011 through
2025. The New England Journal of Medicine, The Lancet, and Nature Reviews Cancer
each have complete 2011-2025 series. The remaining 32 titles have no verified
annual value in this public-source pass; that does not prove they have no JIF.

Annual values retain metric years, individual source links, source type, review
notes, and discrepancy disclosures. Clarivate corrections and publisher/society
evidence are preferred; many older values come from explicitly labelled
secondary annual tables or institutional reproductions of JCR tables. This is
not a licensed JCR database or a certification of every historical value.
Unresolved disagreements remain visible and missing years are not interpolated.
Annual-history CSV downloads are available for individual journals and comparisons.

Five-year JIFs are available for 165 journals, with their actual metric years
retained; these are separate source-reported metrics, not averages of annual JIFs.
Indexed-output evidence spans
2021-2026 for 465 titles, with some missing journal-years. Three unresolved
identifiers remain unavailable and Cancer Gene Therapy has no embedded
indexed-output sample yet. The September 28 refresh completed all six years
for ten Wiley additions. Advanced Science has a completed 2021 query; its
2022-2026 page requests failed after retries and remain unavailable, not zero.
The collector supports smaller pages through `EUROPE_PMC_PAGE_SIZE` for
future targeted retries and preserves previous evidence after failures. Data for
2026 is year-to-date. The recent-paper dataset
contains 44,115 PubMed records across 455 journals. Some sampled records lack
the date pairs needed for an interval estimate, and indexed counts are not a
census of all publisher output.

### September 28 Wiley Advanced additions

The catalog now includes Advanced Science and all ten titles listed in the
portfolio's Life & Health Sciences section: Advanced Healthcare Materials,
Advanced Therapeutics, Advanced NanoBiomed Research, Advanced Biology,
Advanced Genetics, Advanced Oncology, Advanced Brain, Advanced Healthy Aging,
Advanced Immunology, and Advanced Medicine.

All eleven have official identity, scope, editorial, author-guidance and
submission-link evidence. Five have verified annual JIF histories; six have
dated publisher first-decision medians. The newer titles and Advanced Genetics
remain without a verified annual JIF, and no five-year JIF was verified for these
additions. These are evidence gaps, not zero-valued metrics. Typical manuscript
lengths are distinguished from hard limits. Advanced Biology's 2020-2021
history is explicitly attributed to predecessor Advanced Biosystems; the
documented rename and overlapping-title caveat are retained in source notes.
Advanced Healthcare Materials' inaugural JIF has a small published discrepancy
(4.880 versus 4.882), disclosed alongside the retained contemporary value.

## Calls for papers

The September 16, 2026 snapshot audits all 212 eligible journals and retains
744 verified journal opportunities across 59 journals. Twelve research/review
agents contributed to this release. Ninety journal audits identify verification
or access limitations; partial-directory coverage is disclosed individually.

The September 28 snapshot contains 722 active opportunities across 60 journals,
with all 214 eligible journals audited. This update adds two official Advanced
Science calls and two eligible-journal audits. Expired September deadlines are
removed rather than carried forward. One new call is restricted to commissioned contributions,
which is stated on its visible status label; contact the editors before submitting.

The Calls for papers module follows Explore in the main navigation. It contains
official, source-backed calls grouped by journal, with topic search, deadline
filters, a comparison-shortlist filter, journal ordering and CSV export. Large
groups can be expanded without excluding their calls from search or exports.
Each call links to its official page and identifies submission status, deadline
when stated, topic background, available article-type/editor information, and
the verification date. Journal details link directly to their open calls.

The source audit covers journals whose latest sourced annual JIF is above 5,
plus the explicitly requested iScience (JIF 4.5). It distinguishes verified open
calls, no current call found, access limitations, and historical titles. Some
publisher directories cannot be exhaustively enumerated; limitations are
disclosed per journal. The audit is not a guarantee that every call was found.

This is a dated snapshot, not a live publisher feed. Past calendar deadlines
are excluded at build time and again when viewed, including from CSV exports.
Calls without a deadline require maintained explicit open status or a current
reaffirmation, are labeled as having no stated deadline, and should be rechecked
with the publisher. A call limited to a calendar year is hidden after that year
without inventing an exact submission cutoff. Historical invitations with no
current confirmation remain in audit notes, not the open-call directory.
Checks older than 30 days display a reminder to reconfirm status. Cross-journal
collections are listed under each participating eligible journal. Fees and
acceptance are never inferred or guaranteed.

## Journal Match

Journal Match learns journal publication profiles from a bounded sample of
published titles and abstracts retrieved through Europe PMC. The abstract-first
editor returns ranked journals with supporting paper citations and source
attribution. Article-format, minimum JIF, and reported first-decision filters can
be applied without repasting the manuscript. Selected journals go directly to
Compare. Closed titles and non-journal resources are excluded from suggestions.

The model combines a frozen sentence encoder with a journal head learned from
licensed development papers. It is not a transformer fine-tuned on all published
papers or a generative LLM agent. The interface labels it Experimental unless
independent offline quality and coverage checks pass. Model coverage and measured
top-1/5/10 recovery appear in the module, including the previous scope-matcher
baseline. Held-out papers from unsupported journals count as misses; reuse rights
limit public training, not the private test denominator. The 5% test partition is
frozen before fitting, separate from 10% development validation. Date-boundary
ties and duplicate identities are quarantined. Sparse classes remain disclosed.
See the [model card](journal_explorer_assets/match/corpus/MODEL_CARD.md) and
[aggregate evaluation](journal_explorer_assets/match/corpus/independent-validation.json).

The hosted edition runs a quantized sentence-embedding model on the visitor's
device, in a dedicated browser worker. Its JavaScript, WASM, and model files are
served from this same GitHub Pages site; there is no remote inference API or
third-party model script. The first match downloads reusable model assets.
If model loading fails, or the standalone HTML is opened without the companion
assets, an explicit optional button offers basic keyword scope search. It is
never silently presented as learned matching. First use downloads the roughly
39 MB encoder/runtime plus the versioned reference model/index. Sourced fee and access
guidance is shown where available; no price is inferred from missing data.

Manuscript text and query embeddings are never sent to a server, written to
browser storage, included in analytics, or placed in a shared link or downloaded
HTML copy. They remain in tab memory only. Clear, Reset, reload, and navigation
away from the document remove manuscript text and transient results from the app.
Internal navigation between modules keeps the editor available until cleared.
Downloaded model files may be cached; they contain no manuscript information.
The separate visitor-counting service described below remains unchanged.

Ranking reflects relative topic and scope fit, not acceptance probability,
editorial priority, research quality, or novelty. Impact factor does not boost
rank. Unknown article-format eligibility remains visibly unverified; only explicit
incompatibilities are excluded. The first-decision filter uses the first sourced
metric displayed for that journal, not a guessed peer-review duration. Definitions
can differ between journals. The finite English-language corpus, missing
abstracts, source licensing, uneven journal support, and emerging topics limit
suggestions. Original publication venue is one observed label, not the only
suitable destination. Title-only input is not the title-plus-abstract benchmark.

## Interpretation

- Missing data are unavailable, not zero.
- Annual and five-year journal impact factors are separate metrics. Retain
  each metric's year and source; consult licensed Journal Citation Reports
  for formal verification.
- Publisher-reported first decisions and published-paper processing intervals
  describe different populations. Read their definitions before comparing.
- Timing samples include published papers only, exclude missing date pairs,
  and may include author revision time. They do not predict acceptance.
- Publication counts describe indexed output, not necessarily all output.
- Journal instructions can change; consult the linked official guidance before
  submitting a manuscript.
- Publisher and society families include JAMA, NEJM, Lancet, ASH, AACR,
  AAAS/Science, Cell Press, Nature/EMBO and Wiley Advanced. Education and news products are
  excluded from the journal catalog.
- New titles may have a current sourced metric without a complete historical
  series. Each displayed JIF retains its actual reporting year.
- Multiple first-decision measures are grouped within one journal row, with
  their distinct definitions, reporting periods and source links preserved.

## Privacy

The hosted build connects to a dedicated Cloudflare Worker and D1 database for
shared page views, cumulative distinct-browser counts, and approximate visitor
countries. Counts start with activation on September 15, 2026; earlier visits
were not recorded and cannot be reconstructed. Distinct browsers are estimates,
not verified people: different devices and cleared storage can add identities.

The browser sends random browser/event identifiers. The database stores only
keyed hashes, country codes, receipt timestamps, and counts, not raw IP addresses,
names, precise locations, page URLs, or referrers. Cloudflare processes connection
metadata separately under its hosting policies; its default invocation logging
is currently enabled. No application request-body logging is used.
Use the footer checkbox to exclude this browser from future shared counting.
The separate local-open count remains only in browser storage. Local-file copies
read shared totals without reporting visits. Refreshing statistics does not add
a page view. Failed analytics remains visibly unavailable, never invented.

## GitHub Pages

Publish the root folder on `main` using Settings > Pages. The `.nojekyll` file
keeps this prebuilt HTML unchanged. Website visibility must be configured
separately from repository visibility where private Pages is available.

## Third-party assets

See `THIRD_PARTY_NOTICES.md` and the accompanying license files for embedded
library and font notices. Third-party journal information retains its source attribution;
this repository does not grant rights to third-party data.
