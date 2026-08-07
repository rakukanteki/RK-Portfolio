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

- Fonts are loaded from Google Fonts via `<link>` tags in `index.html`
  (Space Grotesk, IBM Plex Sans, IBM Plex Mono) — an internet connection is
  needed the first time a visitor loads the page.
- The design respects `prefers-reduced-motion` and is responsive from mobile
  up; the nav collapses into a toggle menu under ~960px wide.
