# ORANGE Report — User Guide

A static, dependency-free HTML guide to the Hartwig Medical Foundation **ORANGE Report**
produced by [oncoanalyser](https://nf-co.re/oncoanalyser/).

**Research Use Only.** The guide is documentation, not a clinical decision aid.

---

## Viewing

Open `index.html` in a browser. No server and no network access required — everything
except outbound reference links is local.

To host it, publish the whole folder as-is (any static host, SharePoint, an internal
web server, or GitHub Pages). Every internal path is relative, so the guide works
identically from `file://`, from a server root, or from a subfolder — see
[Publishing to GitHub Pages](#publishing-to-github-pages).

---

## Layout

`index.html` is **generated**. The editable sources are `layout/` and `sections/`.

```
orange-report-guide/
├── index.html                        GENERATED — do not edit
├── build.py                          concatenate sections + validate
├── README.md                         this file
│
├── layout/
│   ├── head.html                     <head>, sidebar, hero
│   └── foot.html                     footer, lightbox, <script> tag
│
├── sections/                         one file per chapter; NN sets the order
│   ├── 00-before-you-start.html
│   ├── 01-report-overview.html
│   ├── 02-circos-plots.html
│   ├── 03-linx-plots.html
│   ├── 04-summary-page.html
│   ├── 05-somatic-variants.html
│   ├── 06-germline-variants.html
│   ├── 07-rna.html
│   ├── 08-immunology.html
│   ├── 09-tissue-of-origin.html
│   ├── 10-quality-control.html
│   ├── 11-purity-and-ploidy.html
│   ├── 12-tool-map.html
│   ├── 13-faq-and-troubleshooting.html
│   ├── 14-references.html
│   └── 15-glossary.html
│
└── assets/
    ├── css/guide.css                 all styling; brand tokens in section 1
    ├── js/guide.js                   nav, scroll-spy, search, lightbox
    └── img/
        ├── brand/                    Hartwig Medical Foundation logo
        ├── 01-report-overview/       ┐
        ├── 02-circos-plots/          │
        ├── 03-linx-plots/            │
        ├── 04-summary-page/          │ folder names match the section
        ├── 05-somatic-variants/      │ files above, one-to-one
        ├── 06-germline-variants/     │
        ├── 07-rna/                   │ (chapters 00 and 12–15 have no
        ├── 08-immunology/            │  figures, so no image folder)
        ├── 09-tissue-of-origin/      │
        ├── 10-quality-control/       │
        └── 11-purity-and-ploidy/     ┘
```

So a chapter lives in exactly two predictable places:

| To change | Edit |
|---|---|
| Somatic variants prose | `sections/05-somatic-variants.html` |
| Somatic variants figures | `assets/img/05-somatic-variants/` |

Figures are JPEG, max 1600 px wide, quality 82 — extracted from the source
PowerPoint (`Orange Report v3`, HMFAUS-DOC-22 v1.0, 28 July 2026) and named after
what they show, not after their slide number.

---

## Building

```bash
python3 build.py            # rebuild index.html, then validate it
python3 build.py --check    # validate the existing index.html without rebuilding
```

Standard library only; nothing to install. The script concatenates
`layout/head.html` + every `sections/*.html` in filename order +
`layout/foot.html`, then checks that:

1. every `href="#…"` resolves to an id in the document
2. there are no duplicate ids
3. structural tags are balanced
4. every referenced asset exists on disk
5. no image in `assets/img/` is left unreferenced
6. every `<img>` has alt text, intrinsic `width`/`height` and `loading="lazy"`
7. nothing is embedded — no inline `<style>`, `<script>` body, or base64
8. no build placeholders (`TODO`, `data-src=`, …) survive

Content accuracy — thresholds, captions, claims — is not automatable and stays a
manual review step.

Without Python, `cat layout/head.html sections/*.html layout/foot.html > index.html`
produces the same file, but skips the checks.

---

## Publishing to GitHub Pages

The guide is designed to drop into a subfolder of an existing Pages repo. Copy this
whole folder in, keeping its internal structure, and commit — including the generated
`index.html`, which Pages serves directly.

```bash
python3 build.py                      # rebuild + validate; must pass before committing
cp -R . /path/to/pages-repo/orange-guide/
```

It is then live at `https://ORG.github.io/REPO/orange-guide/`.

**`index.html` must be committed.** Pages serves the repo as it is checked in; it does
not run `build.py`. Rebuilding is a pre-commit step, not a deploy step. The one failure
mode to watch for is committing an edited `sections/*.html` without rebuilding, which
silently leaves the live page on the old content.

To have CI catch that, add this step to the repo's existing workflow — it validates
without deploying, and needs no dependencies:

```yaml
- name: Check the ORANGE guide is built and valid
  run: |
    cd orange-guide
    python3 build.py
    git diff --exit-code index.html   # fails if index.html is stale
```

### Why it needs no Pages configuration

| Concern | Status |
|---|---|
| Base path | All 60 asset references are relative — no leading `/` — so any subfolder depth works |
| Jekyll processing | Safe. No YAML front matter, no `{{`/`{%` Liquid syntax, no `_`-prefixed paths, so Jekyll copies every file through verbatim |
| `.nojekyll` | Not needed, and **do not** add one at the parent repo root — that would disable Jekyll for the whole site, breaking any Markdown pages alongside this one |
| Case sensitivity | Verified: every asset reference matches its filename exactly. macOS is case-insensitive and Pages is not, so this is checked, not assumed |
| Mixed content | No `http://` references; every outbound link is `https://` |
| Build step | None at serve time. No Node, no bundler, no dependencies |
| Weight | 5.2 MB total, 4.7 MB of it figures — all `loading="lazy"`, largest 259 KB |

`.gitignore` keeps `.DS_Store` and `__pycache__` out of the published site.

### Link previews

`layout/head.html` carries Open Graph tags for Slack/Teams/social unfurls. Two of them
need the absolute published URL and are commented out until it is known — set
`canonical`, `og:url` and `og:image` there, then rebuild.

---

## Branding

The palette is derived from the Hartwig Medical Foundation logo and lives entirely in
CSS custom properties at the top of `assets/css/guide.css`:

| Token | Value | Used for |
|---|---|---|
| `--brand-blue` | `#2049BD` | Links, chapter numbers, terminology boxes, nav highlight |
| `--brand-blue-dk` | `#16337F` | Hero gradient, table field names |
| `--brand-red` | `#DA4333` | Concept boxes, FAQ markers, hero eyebrow, logo bar motif |
| `--ib-algo` | `#2E3B63` | Algorithm boxes |

Change a token and it propagates everywhere. Semantic colours (amber warnings, green
tips) are deliberately kept separate from the brand so a warning still reads as a warning.

**One exception:** the hex values inside `.legend` swatches in `index.html` are the
*ORANGE report's own plot colours* (e.g. `#E02B20` for C>T substitutions). They describe
pipeline output and must not be re-themed.

---

## Editing

### Change wording
Edit the relevant `sections/NN-*.html` file, then run `python3 build.py`. Never edit
`index.html` — it is overwritten on every build. Markup conventions are documented in a
comment at the top of `layout/head.html`.

Section files are HTML fragments, not whole documents: each one starts with
`<section class="sect" id="…">` and ends with `</section>`.

### Change the header, sidebar, hero or footer
`layout/head.html` and `layout/foot.html`.

### Add a figure
1. Drop the image into the matching `assets/img/NN-chapter/` folder with a descriptive
   kebab-case name.
2. Reference it from the corresponding `sections/NN-chapter.html`. Always include `alt`,
   intrinsic `width`/`height` (prevents layout shift) and `loading="lazy"` — `build.py`
   flags any image missing these:

```html
<figure>
  <img src="assets/img/05-somatic-variants/my-new-plot.jpg"
       width="1400" height="320" loading="lazy" decoding="async"
       alt="Describe what the figure shows, for screen readers">
  <figcaption><b>Lead-in.</b> Explanation.</figcaption>
</figure>
```

Variants: `<figure class="narrow">` caps width at 430 px, `<figure class="wide">` trims
padding, and `<div class="fig-row">` / `<div class="fig-row three">` place two or three
figures side by side.

### Add a chapter
1. Create `sections/16-my-chapter.html` containing a single `<section class="sect">` with
   an `<h2>` and any `<h3 id="...">` sub-headings.
2. If it has figures, create `assets/img/16-my-chapter/` to match.
3. Run `python3 build.py`.

**The sidebar navigation and search index are generated from the headings at page load,
so there is no table of contents to maintain.**

```html
<section class="sect" id="my-chapter">
<h2><span class="sect-n">16</span>My chapter</h2>
<h3 id="my-sub">A sub-heading that appears in the nav</h3>
...
</section>
```

### Reorder or remove a chapter
Renumber the filename (`04-…` → `06-…`) or delete it, then rebuild — ordering is
filename order. Remember to update the `<span class="sect-n">` label, which is display
text and not derived from the filename. If you delete a chapter, `build.py` will report
any inbound links that now point nowhere.

### Component reference

| Pattern | Renders as |
|---|---|
| `<details class="term">` | Info box — report field or terminology (blue **i**) |
| `<details class="term concept">` | Info box — biology & clinical context (red **?**) |
| `<details class="term algo">` | Info box — formula or decision rule (navy **Σ**) |
| `<details class="faq">` | FAQ / troubleshooting entry |
| `<div class="cal note">` | Callout — neutral information |
| `<div class="cal tip">` | Callout — practical advice, rules of thumb |
| `<div class="cal warn">` | Callout — caveat, easy-to-misread value |
| `<div class="cal stop">` | Callout — hard limitation, do not do this |
| `<div class="cal mode">` | Callout — run-mode dependency |
| `<span class="b wgs">` | Badge — WGS only |
| `<span class="b panel">` | Badge — panel / targeted |
| `<span class="b rna">` | Badge — needs RNA |
| `<span class="b tn">` | Badge — needs matched normal |
| `<span class="b to">` | Badge — tumor-only |
| `<span class="b hi">` / `<span class="b lo">` | Driver call — HIGH / LOW |
| `<div class="tool-strip">` | "Fed by" row of hmftools links under a chapter heading |
| `<div class="tw"><table class="fields">` | Field-description table (first column mono) |
| `<p class="formula">` | Monospaced formula block |
| `<a class="ext" href="…">` | External link (gets an ↗ marker) |

Add an info box inside a `<details>`:

```html
<details class="term concept"><summary>Short question or term</summary><div class="body">
<p>Explanation.</p>
<div class="srcs"><b>Tool:</b> <a class="ext" href="…">PURPLE</a></div>
</div></details>
```

---

## Features

- Sidebar contents generated from headings, with scroll-spy
- Full-text search: filters sections, highlights matches, auto-expands boxes containing a hit
- Click any figure to enlarge (Esc or click to close)
- Deep links open collapsed boxes automatically — safe to share `index.html#driverlik`
- Print stylesheet expands every box and drops the chrome
- Responsive: sidebar collapses to a drawer below 1000 px

---

## Maintenance notes

- **Version pinning.** The guide is written against `oncoanalyser v3.0.0` as stated in the
  source manual, and links to hmftools docs on `master`. Thresholds and chapter
  composition change between releases — when you bump the version, re-check the numbers
  and repoint the links at the matching release tag.
- **Two known discrepancies in the source manual** are flagged inline in the guide with
  `†` and `‡` footnotes: the MSI boundary (`> 4` vs `≥ 4`) and the "Germline copy number"
  field description (`amplifications & disruptions`).
- **External links** were verified at time of writing. Several targets are
  JavaScript-rendered sites where only the redirect could be confirmed. Note that
  PharmGKB and CPIC have both migrated to `clinpgx.org`.
- Treat all generated content as draft material and verify before operational use.

---

## Sources

- [hmftools / WiGiTS](https://github.com/hartwigmedical/hmftools)
- [ORANGE README and example reports](https://github.com/hartwigmedical/hmftools/blob/master/orange/README.md)
- [nf-core/oncoanalyser](https://nf-co.re/oncoanalyser/)
- Source manual: ORANGE Report user manual, HMFAUS-DOC-22 v1.0, 28 July 2026
