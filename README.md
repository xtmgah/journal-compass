# Journal Compass

A browser-based journal comparison and submission-planning tool for cancer,
genetics, genomics, biology, bioinformatics, clinical medicine, and epidemiology.

The application is `index.html`. Journal data, charts, icons, and imagery are
embedded; the core explorer requires no R installation or application server.
Shared analytics uses the separate service described below. Official source links
and shared statistics require internet access.

## September 2026 catalog

The catalog contains 457 journals. Both requested Google Scholar profiles were
traversed to the end: 678 displayed entries in one profile and 2,020 in the other.
All 120 and 251 screened journal venues, respectively, map to the catalog or a
documented successor title. These are profile-discovery counts, not independently
verified authorship counts. Books, preprints, education/news products, ambiguous
venue labels, and non-journal records are not treated as research journals.

Scope descriptions are present for all 457 titles, first-decision evidence for
213, and article-format guidance for 301. Evidence coverage differs by field;
an absent value does not imply zero or an unlimited allowance. Historical or
closed titles remain available for comparison but are marked as not accepting
new submissions.

Sourced annual JIFs are available for 238 journals and five-year JIFs for 164,
with their actual metric years retained. Indexed-output evidence covers
2021-2026 for 454 titles; three unresolved identifiers remain unavailable, and
2026 is year-to-date. The recent-paper dataset
contains 43,537 PubMed records across 449 journals. Some sampled records lack
the date pairs needed for an interval estimate, and indexed counts are not a
census of all publisher output.

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
  AAAS/Science, Cell Press and Nature/EMBO. Education and news products are
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
