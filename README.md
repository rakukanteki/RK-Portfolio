# Portfolio — Khondokar Radwanur Rahman

Static site: plain HTML / CSS / JS, no build step, no framework. Open `index.html`
directly in a browser, or serve the folder with any static file server.

## Directory structure

```
portfolio/
├── index.html                  All page content and section markup
├── css/
│   └── styles.css              All styling (design tokens at the top)
├── js/
│   └── main.js                 Nav toggle, active-link highlight, scroll
│                                reveal, hero waveform, back-to-top
├── assets/
│   ├── images/
│   │   ├── profile/             (empty — for a headshot if you want one)
│   │   ├── research/             Methodology figures, one per publication
│   │   ├── projects/              Project images (image-only cards)
│   │   └── recognitions/          Award / competition images
│   └── icons/                   (empty — for favicon or custom icons)
└── README.md
```

## Filling in placeholders

Every link or image that needs your input has a `data-placeholder="..."`
attribute in `index.html`, so you can search the file for `data-placeholder`
to find everything that still needs a real value.

- **Links** — placeholders use `href="#"`. Replace `#` with the real URL
  (DOI, Google Scholar, LinkedIn, project repo, write-up, etc). Until you do,
  clicking them just logs a warning in the browser console instead of
  navigating anywhere, so nothing breaks if you ship before every link is filled.
- **Images** — placeholder PNGs already sit in `assets/images/...` so the
  layout previews correctly. Replace each file in place (same filename) with
  your real image, or change the `src` in `index.html` to a new filename.
- **Abstracts** — each publication card has an
  `[ABSTRACT PLACEHOLDER — ...]` paragraph in `index.html`. Swap in the real
  abstract text.
- **Featured Writing** — three placeholder rows are included under
  `#writing`; duplicate a `.writelist__row` block for more entries.

## Sections included

Log (hero) · Experience · Research & Publications · Featured Writing ·
Projects · Education · Recognitions · Contact (footer)

## Notes

- Publication search, type/year/area filters, and reset controls
  are implemented in `js/main.js`, adapted from `Publications.tsx` for this static site.
  Maintain `data-type`, `data-year`, and `data-area` on each
  publication card in `index.html`. Optional `data-authors` enables author search.
  Missing metadata uses “Not specified”; filters cover only listed cards,
  while the overview describes the broader portfolio. The referenced TSX content
  modules are not included. All cards remain readable when JavaScript is disabled.

- Typography pairs Source Serif 4 headlines with Source Sans 3 body text via Google Fonts, with local fallbacks. The responsive scale is adapted from Stanford’s typography guidance for this compact portfolio.
- The design respects `prefers-reduced-motion` and is responsive from mobile
  up; the nav collapses into a toggle menu under ~960px wide.

## Project detail pages

Each featured project links to its own static HTML page in `projects/`.
Click the card to open its overview, project image, and technical descriptions;
the GitHub link remains a separate destination. Hangor 2.0 includes an additional
interior photograph. All pages share `css/styles.css` and `js/main.js`, including
the theme toggle and mobile navigation, and work without a build step.

Edit project descriptions and image captions directly in the corresponding HTML
file. Keep the short homepage summary in `index.html` updated separately.
