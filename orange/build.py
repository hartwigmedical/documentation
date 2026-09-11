#!/usr/bin/env python3
"""
Assemble index.html from layout/ + sections/, then check it.

    python3 build.py            build and validate
    python3 build.py --check    validate the existing index.html only

Concatenation order is: layout/head.html, every sections/*.html in filename
order, then layout/foot.html. Section files are numbered, so renaming a file
is how you reorder a chapter.

Standard library only — no dependencies, nothing to install.

If you have no Python to hand, this is equivalent to:

    cat layout/head.html sections/*.html layout/foot.html > index.html

...but you lose the checks below, so prefer the script.

Checks performed
    1. every href="#..." resolves to an id in the document
    2. no duplicate ids
    3. balanced open/close tags for structural elements
    4. every referenced asset (css, js, img) exists on disk
    5. no image file in assets/img/ is left unreferenced
    6. every <img> has alt text, intrinsic width/height and loading="lazy"
    7. nothing is embedded: no inline <style>, <script> body, or base64
    8. no leftover build placeholders
Content comparisons (thresholds, figure captions) are not automatable and
remain a manual review step.
"""

import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "index.html")

GREEN, RED, YELLOW, DIM, RESET = "\033[32m", "\033[31m", "\033[33m", "\033[2m", "\033[0m"
if not sys.stdout.isatty():
    GREEN = RED = YELLOW = DIM = RESET = ""

STRUCTURAL_TAGS = [
    "html", "head", "body", "main", "aside", "nav", "footer",
    "section", "details", "summary", "div", "table", "thead", "tbody",
    "figure", "figcaption", "dl",
]


def rel(path):
    return os.path.relpath(path, ROOT)


# ----------------------------------------------------------------- build ----
def build():
    head = os.path.join(ROOT, "layout", "head.html")
    foot = os.path.join(ROOT, "layout", "foot.html")
    sections = sorted(glob.glob(os.path.join(ROOT, "sections", "*.html")))

    for required in (head, foot):
        if not os.path.exists(required):
            sys.exit(f"{RED}missing {rel(required)}{RESET}")
    if not sections:
        sys.exit(f"{RED}no files in sections/{RESET}")

    pieces = [open(head, encoding="utf-8").read().rstrip()]
    print(f"{DIM}layout/head.html{RESET}")
    for path in sections:
        text = open(path, encoding="utf-8").read().strip()
        match = re.search(r'<section class="sect" id="([^"]+)"', text)
        if not match:
            sys.exit(f'{RED}{rel(path)}: must start with <section class="sect" id="...">{RESET}')
        pieces.append(text)
        print(f"  + {os.path.basename(path):<44} #{match.group(1)}")
    pieces.append(open(foot, encoding="utf-8").read().strip())
    print(f"{DIM}layout/foot.html{RESET}")

    html = "\n\n".join(pieces) + "\n"
    open(OUT, "w", encoding="utf-8").write(html)
    print(f"\n{GREEN}wrote{RESET} index.html  "
          f"({len(html) / 1024:.0f} KB, {len(sections)} sections)\n")
    return html


# -------------------------------------------------------------- validate ----
def validate(html):
    problems, notes = [], []

    # comments are documentation, not markup — exclude them from every check
    bare = re.sub(r"<!--.*?-->", "", html, flags=re.S)

    ids = re.findall(r'\bid="([^"]+)"', bare)
    id_set = set(ids)

    # 1 — internal links
    broken = sorted({a for a in re.findall(r'href="#([^"]+)"', bare) if a not in id_set})
    problems += [f'broken internal link: href="#{a}"' for a in broken]

    # 2 — duplicate ids
    problems += [f'duplicate id="{i}"' for i in sorted({i for i in ids if ids.count(i) > 1})]

    # 3 — tag balance
    for tag in STRUCTURAL_TAGS:
        opened = len(re.findall(r"<%s[\s>]" % tag, bare))
        closed = len(re.findall(r"</%s>" % tag, bare))
        if opened != closed:
            problems.append(f"unbalanced <{tag}>: {opened} open, {closed} close")

    # 4 — assets exist
    refs = re.findall(r'(?:href|src)="(assets/[^"]+)"', bare)
    problems += [f"missing asset: {r}" for r in sorted(set(refs))
                 if not os.path.exists(os.path.join(ROOT, r))]

    # 5 — orphaned images
    referenced = {r for r in refs if r.startswith("assets/img/")}
    on_disk = set()
    for folder, _, files in os.walk(os.path.join(ROOT, "assets", "img")):
        for f in files:
            if f.startswith("."):
                continue
            on_disk.add(os.path.relpath(os.path.join(folder, f), ROOT).replace(os.sep, "/"))
    orphans = sorted(on_disk - referenced - {"assets/img/brand/hmf-logo.png"})
    notes += [f"unreferenced image: {o}" for o in orphans]

    # 6 — image hygiene
    for tag in re.findall(r"<img [^>]*>", bare):
        src = re.search(r'src="([^"]*)"', tag)
        label = src.group(1) if src else tag[:60]
        if not src or not src.group(1):
            continue                                    # lightbox placeholder
        if "alt=" not in tag:
            problems.append(f"<img> without alt: {label}")
        if "width=" not in tag or "height=" not in tag:
            notes.append(f"<img> without intrinsic width/height: {label}")
        # the logo is above the fold, so it is deliberately eager
        if 'loading="lazy"' not in tag and not label.startswith("assets/img/brand/"):
            notes.append(f'<img> without loading="lazy": {label}')

    # 7 — nothing embedded
    if "<style>" in bare:
        problems.append("inline <style> block — move it to assets/css/guide.css")
    if re.search(r"<script>", bare):
        problems.append("inline <script> body — move it to assets/js/guide.js")
    if "base64" in bare:
        problems.append("base64 data URI — images belong in assets/img/")
    inline = sorted({s for s in re.findall(r'\sstyle="([^"]*)"', bare) if "var(--" in s})
    notes += [f'style attribute using a CSS variable (prefer a class): style="{s}"' for s in inline]

    # 8 — placeholders
    for pattern in (r"\bTODO\b", r"\bFIXME\b", r"data-src=", r"lorem ipsum"):
        if re.search(pattern, bare, re.I):
            problems.append(f"leftover placeholder matching /{pattern}/")

    # ------------------------------------------------------------ report ----
    body_text = re.sub(r"<[^>]+>", " ", bare)
    print(f"{DIM}{len(body_text.split()):,} words · "
          f"{len(re.findall(r'<h2', bare))} chapters · "
          f"{len(re.findall(r'<figure', bare))} figures · "
          f"{len(re.findall(r'<img ', bare)) - 1} images · "
          f"{len(re.findall(chr(60) + 'details class=.term', bare))} info boxes · "
          f"{len(re.findall(chr(60) + 'details class=.faq.', bare))} FAQ entries{RESET}\n")

    for n in notes:
        print(f"{YELLOW}note{RESET}  {n}")
    for p in problems:
        print(f"{RED}FAIL{RESET}  {p}")

    if problems:
        print(f"\n{RED}{len(problems)} problem(s).{RESET} index.html was still written.")
        return 1
    print(f"{GREEN}All checks passed.{RESET}"
          + (f" {len(notes)} note(s) above." if notes else ""))
    return 0


if __name__ == "__main__":
    if "--check" in sys.argv:
        if not os.path.exists(OUT):
            sys.exit(f"{RED}index.html does not exist — run without --check first{RESET}")
        sys.exit(validate(open(OUT, encoding="utf-8").read()))
    sys.exit(validate(build()))
