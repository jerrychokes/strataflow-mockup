# What the practitioner saw, and how far it has moved — the walk's evidence base

**Re-measured 3 September 2026 at `a41d64f`**, against `3112977` — the
practitioner review's own commit, the last state before Wave 6 began
implementing its findings.

**Run it yourself:** `python3 audits/walk-evidence.py 3112977 HEAD`. One second.

## Correction: the first version of this document was not reproducible

**The figures published here on 3 September 2026 could not be reproduced from
the method they stated, and they were too kind.** The method line read *"every
`<section>` in the built page, matched by id, compared with
`difflib.SequenceMatcher.ratio()`"*, and that sentence admits at least three
different extractions. For `#field-capture` against the same two commits they
give:

| extraction | kept |
|---|---:|
| markup, to the next screen | 5.6% |
| markup, truncated at the first nested `</section>` | different again |
| visible text, character-level | 6.1% |
| visible text, **word-level** — the method now in code | **9.8%** |
| *what the prose reported* | *21.2%* |

None of them is 21.2%. **A method a second reader cannot re-run is not a
method** — and this document's own headline caution, that a wrong baseline
nearly shipped, is about exactly this class of mistake one level up. The method
is a script now.

Two deliberate choices in it, both departures from the prose:

- **Visible text, not markup.** The question is how much of what she *read* is
  still there; markup similarity is polluted by class names and structure.
- **Word-level, not character-level.** `SequenceMatcher` is quadratic and the
  screens have grown — a character-level exact ratio on today's `#coverage`
  (46k → 110k characters) does not finish, where the word-level ratio over the
  same pair takes 0.22 s. It is also the better measure: a sentence that keeps
  its characters while losing its words is not a thing that happens.

Every conclusion below survives the correction. All of them get sharper.

## The catalogue then and now

She could see **68** screens. There are **78**. Ten are new since:
`analysis · completeness · composite · engagement · estate · exchange ·
explorer · instruments · logger-series · package`. Nothing was removed.

**16 of the 68 are byte-identical.** The other 52 have moved.

## The four screens she reviewed

| Screen | As read | Now | Words kept |
|---|---:|---:|---:|
| `#field-capture` | 1,960 | 19,713 | **9.8%** |
| `#lineage` | 2,368 | 37,667 | **10.0%** |
| `#narrative` | 1,853 | 18,872 | **13.5%** |
| `#qc` | 6,215 | 23,556 | 33.9% |

This is the README's standing caveat with numbers under it: *"the four redesigns
carry more invention than the ones the review corrected, not less."* Three of
the four retain **a tenth or less** of the words she read. That is not a fault —
PR-1 was explicitly *a replace, not a deepen*, and the growth is the review
being answered. It does mean **the validation those four screens carry is
spent**, and the walk should treat them as new work rather than as confirmed
work being re-shown.

## The two most-changed screens are ones she never saw

| Screen | As read | Now | Words kept |
|---|---:|---:|---:|
| `#qualifiers` | 1,129 | 17,666 | **6.6%** |
| `#saved-views` | 1,311 | 32,411 | **6.8%** |
| `#map` | 4,866 | 41,304 | 18.3% |

`#saved-views` is now the **governed dataset** — the keystone seven vendor
requirements hang on, the object Waves 19 and 20 were built around, and the
thing a returning user reaches for most. `#qualifiers` is the scheme gap Wave 17
closed. `#map` became an investigation workspace in Wave 23. **No practitioner
has looked at any of the three.**

## What this changes about the walk

1. **It is not a re-review.** Three of the four screens retain a tenth of what
   was read. Presenting them as "your corrections, implemented" would invite a
   confirmation rather than a judgement.
2. **The keystone has never been seen.** The dataset, the explorer, the analysis
   object and the map workspace are the last five waves' work and are
   unvalidated by anyone.
3. **D9 and D11 ride on it.** Both were answered without a practitioner — D9 (a
   criterion generalises to a rule that produces a finding) is the most exposed
   answer in the set, and D11 changed a screen she *had* read.
4. **Ten screens are new**, and four of them (`composite`, `exchange`,
   `instruments`, `logger-series`) draw domains the PRD schedules at S8 — worth
   saying out loud so a practitioner is not asked to validate a roadmap decision
   as though it were a design one.

## What this does not measure

Word similarity is not meaning. A screen can keep 90% of its words and reverse
its argument, or replace every sentence and say the same thing better. These
figures say **how much of what she read is literally still on the page** —
useful for deciding what to re-show, useless for deciding whether it is right.
That second question is the walk.
