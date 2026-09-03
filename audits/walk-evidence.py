#!/usr/bin/env python3
"""
How much of what the practitioner read is still on the page.

## Why this is a script and not a paragraph

The first version of this measurement lived only in prose. Its method line said
*"every `<section>` in the built page, matched by id, compared with
`difflib.SequenceMatcher.ratio()`"* — and that sentence admits at least three
different extractions, which give materially different answers for the same two
commits. None of them reproduced the published figure for `#field-capture`
(21.2%): visible text gives 6.1%, markup to the next screen gives 5.6%, markup
truncated at the first nested `</section>` gives a third answer again.

A method a second reader cannot re-run is not a method — and this measurement's
own headline caution, that a wrong baseline nearly shipped, is about exactly
this class of mistake one level up. So the method is code now.

    python3 audits/walk-evidence.py [baseline-rev] [now-rev]

**Visible text, compared word by word.** Text because the question is how much
of what she *read* is still there, and markup similarity is polluted by class
names and structure. A screen runs from its own `<section class="mk-screen">` to
the next one, so nested sections inside a screen are included rather than
truncated at the first nested close.

**Words rather than characters, and that is a change from the prose version.**
`SequenceMatcher` is quadratic, and the screens have grown: a character-level
exact ratio on today's `#coverage` (46k → 110k) does not finish. The word-level
ratio over the same pair takes 0.22 s. It is also the better measure — a
sentence rewritten with the same words is not a sentence she still recognises,
but a sentence that keeps its characters while losing its words is not a thing
that happens. `autojunk` is off, because it discards elements appearing in more
than 1% of a long sequence, which on prose is every common word.
"""

import difflib
import re
import subprocess
import sys

SCREEN = re.compile(
    r'<section class="mk-screen" id="([a-z0-9-]+)"(.*?)(?=<section class="mk-screen"|\Z)',
    re.S,
)


def screens(rev):
    html = subprocess.run(
        ["git", "show", f"{rev}:index.html"], capture_output=True, text=True, check=True
    ).stdout
    out = {}
    for m in SCREEN.finditer(html):
        text = re.sub(r"<[^>]+>", " ", m.group(2))
        out[m.group(1)] = re.sub(r"\s+", " ", text).strip()
    return out


def main():
    base_rev = sys.argv[1] if len(sys.argv) > 1 else "3112977"
    now_rev = sys.argv[2] if len(sys.argv) > 2 else "HEAD"
    base, now = screens(base_rev), screens(now_rev)
    short = subprocess.run(
        ["git", "rev-parse", "--short", now_rev], capture_output=True, text=True, check=True
    ).stdout.strip()

    shared = sorted(set(base) & set(now))
    added = sorted(set(now) - set(base))
    removed = sorted(set(base) - set(now))

    rows = []
    for sid in shared:
        r = difflib.SequenceMatcher(None, base[sid].split(), now[sid].split(), autojunk=False).ratio()
        rows.append((sid, len(base[sid]), len(now[sid]), r))
    rows.sort(key=lambda r: r[3])

    print(f"baseline {base_rev} → {short}")
    print(f"screens: {len(base)} then, {len(now)} now · {len(added)} added · {len(removed)} removed")
    if added:
        print("added: " + " · ".join(added))
    if removed:
        print("removed: " + " · ".join(removed))
    print(f"byte-identical: {sum(1 for r in rows if r[3] == 1.0)} of {len(shared)}")
    print(f"\n{'screen':<18}{'as read':>9}{'now':>9}{'kept':>8}")
    for sid, a, b, r in rows:
        print(f"{'#' + sid:<18}{a:>9,}{b:>9,}{r * 100:>7.1f}%")


if __name__ == "__main__":
    main()
