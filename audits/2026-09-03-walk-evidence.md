# What the practitioner saw, and how far it has moved — the walk's evidence base

**Measured 3 September 2026**, against the state of the built page at commit
`3112977` — the practitioner review's own commit, which is the last state before
Wave 6 began implementing its findings. This is the evidence half of D13's second
walk. The walk pack itself waits until Wave 23 closes, because what a practitioner
should be shown depends on what Waves 21–23 draw.

**Method:** every `<section>` in the built page at `3112977` and at `HEAD`, matched
by id, compared with `difflib.SequenceMatcher.ratio()` — the exact ratio, not the
`quick_ratio` upper bound. *Unchanged* below means literal character similarity of
the rendered section, which is a blunt instrument for prose and an honest one for
"how much of what she read is still there".

**A baseline error worth recording, because it nearly shipped.** The first run of
this measured against the first Wave 6 *commit*, which is **after** the redesign
the review asked for — so `#field-capture` came back 100% unchanged and the whole
table read as reassuring nonsense. The state a practitioner saw is the state before
the wave that answered her, not the state of the wave that answered her.

## The catalogue then and now

She could see **68** screens. There are now **76**. Eight are new since:
`composite · engagement · estate · exchange · explorer · instruments ·
logger-series · package`.

**31 of the 68 are byte-identical.** The other 37 have moved.

## The four screens she reviewed

| Screen | As seen | Now | Unchanged |
|---|---:|---:|---:|
| `#field-capture` | 1,697 | 11,472 | **21.2%** |
| `#qc` | 11,038 | 41,846 | **24.3%** |
| `#lineage` | 6,414 | 21,244 | 42.2% |
| `#narrative` | 1,516 | 2,704 | 71.8% |

This is the README's standing caveat with numbers under it: *"the four redesigns
carry more invention than the ones the review corrected, not less."* Roughly a
fifth of what she read on the two screens she was most hesitant about is still
there. That is not a fault — PR-1 was explicitly *a replace, not a deepen*, and
the growth is the review being answered. It does mean **the validation those four
screens carry is largely spent**, and the walk should treat them as new work
rather than as confirmed work being re-shown.

## The screen that moved most is one she never saw

| Screen | As seen | Now | Unchanged |
|---|---:|---:|---:|
| `#saved-views` | 3,326 | 25,308 | **11.0%** |
| `#qualifiers` | 2,638 | 8,723 | 19.3% |
| `#purge` | 8,156 | 12,610 | 21.3% |

`#saved-views` is the most-changed screen in the catalogue by this measure, and it
is now the **governed dataset** — the keystone seven requirements hang on, the
object Waves 19 and 20 were built around, and the thing a returning user reaches
for most. No practitioner has ever looked at it. If the walk has time for one
screen beyond the original four, it is this one.

`#purge` at 21.3% is worth noting for a different reason: it was not one of the
four, but PR-1c asked for stabilisation to stop being hidden, and it moved almost
as much as the screens that were.

## What this changes about the walk

1. **It is not a re-review.** Three of the four screens retain a quarter or less
   of what was read. Presenting them as "your corrections, implemented" would
   invite a confirmation rather than a judgement.
2. **The keystone has never been seen.** The dataset, the explorer and the
   analysis object are the last three waves' work and are unvalidated by anyone.
3. **D9 and D11 ride on it.** Both were answered without a practitioner —
   D9 (a criterion generalises to a rule that produces a finding) is the most
   exposed answer in the set, and D11 changed a screen she *had* read. Both are
   listed for validation rather than re-decision.
4. **Eight screens are new since**, and four of those eight (`composite`,
   `exchange`, `instruments`, `logger-series`) draw domains the PRD schedules at
   S8 — worth saying out loud at the walk so a practitioner is not asked to
   validate a roadmap decision as though it were a design one.

## What this does not measure

Character similarity is not meaning. A screen can keep 90% of its bytes and
reverse its argument, or replace every sentence and say the same thing better.
These figures say **how much of what she read is literally still on the page** —
useful for deciding what to re-show, useless for deciding whether it is right.
That second question is the walk.
