# Journal Compass

A browser-based journal comparison and submission-planning tool for cancer,
genetics, genomics, biology, bioinformatics, clinical medicine, and epidemiology.

The application is `index.html`. Journal data, charts, icons, and imagery are
embedded; the core explorer requires no R installation or application server.
Shared analytics uses the separate service described below. Official source links
and shared statistics require internet access.

## September 2026 catalog

The catalog contains 458 journals, including Cancer Gene Therapy. Both requested Google Scholar profiles were
traversed to the end: 678 displayed entries in one profile and 2,020 in the other.
All 120 and 251 screened journal venues, respectively, map to the catalog or a
documented successor title. These are profile-discovery counts, not independently
verified authorship counts. Books, preprints, education/news products, ambiguous
venue labels, and non-journal records are not treated as research journals.

Scope descriptions are present for all 458 titles, first-decision evidence for
214, and article-format guidance for 302. Evidence coverage differs by field;
an absent value does not imply zero or an unlimited allowance. Historical or
closed titles remain available for comparison but are marked as not accepting
new submissions.

The September 15-16, 2026 journal-by-journal history audit checked all 457
catalog titles; Cancer Gene Therapy was subsequently added with a complete history.
Annual JIF evidence now contains 5,146 journal-year values across
432 journals, up from 1,441 values across 239 journals. Of these, 336 journals
have at least ten metric years and 55 have all fifteen years from 2011 through
2025. The New England Journal of Medicine, The Lancet, and Nature Reviews Cancer
each have complete 2011-2025 series. The remaining 26 titles have no verified
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
Indexed-output evidence covers
2021-2026 for 454 titles; three unresolved identifiers remain unavailable and
Cancer Gene Therapy has no embedded indexed-output sample yet. Data for
2026 is year-to-date. The recent-paper dataset
contains 43,537 PubMed records across 449 journals. Some sampled records lack
the date pairs needed for an interval estimate, and indexed counts are not a
census of all publisher output.

## Calls for papers

The September 16, 2026 snapshot audits all 212 eligible journals and retains
744 verified journal opportunities across 59 journals. Twelve research/review
agents contributed to this release. Ninety journal audits identify verification
or access limitations; partial-directory coverage is disclosed individually.

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
