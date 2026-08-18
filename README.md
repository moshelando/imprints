# Mosaic Studio — Expanded Web Designer Portfolio

A self-contained static portfolio package intended for GitHub Pages. It includes ten fictional concept brands, each built as a distinct four-page website.

## What is included

- Portfolio homepage with live previews of all ten projects
- 10 complete concept sites / 40 internal pages total
- Unique art direction and responsive CSS per site
- Local placeholder SVG artwork — no remote image dependency
- Responsive navigation on every site
- Demo forms with client-side confirmation states
- Site-specific interactions such as filters, accordions, and a budget slider
- `PLACEHOLDER_LEDGER.md` and `placeholders.csv` tracking replaceable content/assets
- `SITE_MAP.md` listing every page
- `.nojekyll` for GitHub Pages

## Publish on GitHub Pages

1. Extract the ZIP.
2. Upload **the contents of this folder** to the root of a GitHub repository.
3. Commit the files.
4. In **Settings → Pages**, deploy from the repository's main branch and root (`/`).
5. GitHub Pages will serve `index.html`.

No npm install, build command, database, or server is required.

## Replacing imagery

Each concept site's artwork lives in `demos/<site>/assets/`. The easiest workflow is to replace a placeholder SVG with a real image **while preserving the filename and path**. If you change the file extension, update the corresponding `<img src=...>` references in that site's HTML.

For every requested image and all fictional content that must be replaced, see `PLACEHOLDER_LEDGER.md`. The CSV version is included for spreadsheet editing.

## Forms and external services

Forms are demonstrations only. They currently prevent submission and show a success-style message. Connect them to a real form endpoint, CRM, booking tool, reservation provider, ticketing system, or backend before production use.

## Important content note

These are **fictional portfolio concepts**. Names, claims, prices, metrics, addresses, credentials, testimonials, dates, policies, and availability are placeholders unless explicitly replaced and verified.

## Editing / handoff files

- `PLACEHOLDER_LEDGER.md` — master replacement ledger.
- `placeholders.csv` — spreadsheet-friendly version of the master ledger.
- `CONTENT_PLACEHOLDERS.md` — plain-language inventory of fictional facts/content by site.
- `ASSET_REQUEST_LIST.md` — the 30 image assets to provide or replace, grouped by site.
- `SITE_MAP.md` — every page in the package.
- `QA_REPORT.md` — validation performed before handoff.
