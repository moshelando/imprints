# Mosaic Studio — Web Designer Portfolio

A complete static portfolio package designed to be uploaded directly to a GitHub repository and published with GitHub Pages.

## What's included

- `index.html` — main portfolio homepage
- `assets/styles.css` — portfolio styling
- `assets/script.js` — project filters
- `demos/` — 10 completely separate concept sites
  - Aurora Labs — futuristic AI / SaaS
  - Monolith — brutalist architecture
  - Casa Rosso — warm editorial restaurant
  - Apex Performance — bold fitness / sport
  - Papertrail — editorial magazine
  - Kindred — calm wellness practice
  - Maison Noire — luxury fashion
  - Pennywise — playful fintech product
  - Wild North — immersive travel
  - Signal Room — experimental music venue
- `.nojekyll` — tells GitHub Pages to serve the files as-is
- `404.html` — simple fallback redirect to the portfolio root

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Drag the **contents of this folder** into the repository root and commit them.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub will give you a public Pages URL.

No npm install, build step, framework, or server is required.

## Customize before publishing

Search the project for these placeholders:

- `Mosaic Studio` — replace with your personal/studio name
- `hello@example.com` — replace with your contact email
- demo project names/descriptions if you want to present them as your own concept work

The project descriptions intentionally present these as portfolio concepts rather than client claims.

## Notes

- All graphics are CSS/SVG-style constructions. There are no external image dependencies.
- All demos are responsive.
- The portfolio previews each demo with an embedded iframe; clicking a project opens the full demo in a new tab.
- Everything is plain HTML/CSS/JS, so it is easy to modify.
