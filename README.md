# Journal Compass

A browser-based journal comparison and submission-planning tool for cancer,
genetics, genomics, and translational research.

The application is `index.html`. Journal data, charts, icons, and imagery are
embedded; no R installation or server-side application is required. Official
source links require internet access.

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

## Privacy

This build has no shared analytics endpoint. The app counts opens only in the
current browser's local storage; its country map does not infer visitors.
Hosting-provider logging is separate from application analytics.

## GitHub Pages

Publish the root folder on `main` using Settings > Pages. The `.nojekyll` file
keeps this prebuilt HTML unchanged. Website visibility must be configured
separately from repository visibility where private Pages is available.

## Third-party assets

See `THIRD_PARTY_NOTICES.md` and the accompanying license files for embedded
library and font notices. Third-party journal information retains its source attribution;
this repository does not grant rights to third-party data.
