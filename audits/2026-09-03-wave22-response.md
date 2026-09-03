# Wave 22 — response to the audit, three rounds, closed at the cap

**Wave 22 did not pass. It closes at §11's three-round cap with two P1s open at
the moment the cap fell** — the third time this has happened, after waves 10 and
21, and handled the same way: fixed after the cap in this closing commit, and
verified by Wave 23's round 1 as carried riders rather than by the round that
raised them.

Nine findings across three rounds. All nine accepted, all nine fixed here.

## The round that could not run, and what was done instead

The standing audit lineage **failed to start five consecutive times on HTTP 529**,
so this wave's audit was run in a different shape and that is worth recording
plainly, because it changes what the audit is worth:

- **Round 1** was split. A separate agent took the mechanical half — replaying
  Wave 21's five carried riders as mutations, re-running my twelve guard
  mutations independently rather than on trust, and measuring the hygiene
  inventory. `audits/2026-09-03-wave22-mechanical.md`.
- **Rounds 2 and 3** ran as fresh audits on the same model rather than as the
  standing lineage. They did not carry twenty-two waves of accumulated pattern
  knowledge, and a reader should weight them accordingly.

While round 1 could not start I ran my own pass over the two new faces looking
for the eighth instance of the wave-18 defect shape. That pass is a commit of
this wave, not a substitute for the audit, and **the audit then found two P0s in
it**.

## What the three rounds actually found: my claims, not the wave's code

Six of the nine findings are defects in things *I* wrote — a response document, a
fix, a caption, a commit's own follow-through — and not in the implementer's
work. That is the wave's honest summary.

| Finding | Round | Severity | Response |
|---|---|---|---|
| **W22-M-1** — the wave-21 response claimed each plate verdict's threshold was *"printed on the face so a reader can disagree with the threshold rather than with a hidden one"*. It was not: `test` sat in the record and nothing in `screens.mjs` read it | 1 | **P0** | **Accepted.** The one thing a reader needed in order to disagree was the one thing only a reader of the source could see — the W21-A-11 shape, inside the fix for W21-A-12. Found by grepping the built page for "3.5" and getting nothing, which is the right instrument and the one I did not use. The plate table renders *Read as:* under each description with a refuted/stands verdict beside the measurement. My first attempt was five columns and overflowed `#hydrochem` by 94 px at 1280; folded back to three rather than shipped wide. The wave-21 response carries a dated correction. |
| **W22-M-3** — four surfaces stated how often *detection frequency* had appeared here, in three different ways: **twice**, **nowhere**, **once**, the worst pair one paragraph apart on the same panel | 1 | **P0** | **Accepted.** Wave 21 round 1 wrote *nowhere*, its own response wrote *once*, and the post-cap correction to *twice* reached two of four. Three hand-written numbers for one fact. It is one record now — `ANALYSES.detectionFrequency`, where the mentions are the data and the number and the word are arithmetic over them — and adding a third mention moves all four surfaces together. Dated correction in the wave-21 response. |
| **W22-M-4** — *"no count on this screen is taken twice"* is true of the six stage rows and false of the screen | 1 | P2 | **Accepted.** 7 of 10 hand-off endpoints re-show a stage's own number, which is what a hand-off is *for*: a second computation of one quantity is the drift the screen exists to find. The caption says that instead, and its own count of readings derives — the auditor recounted 19 independently. |
| **W22-M-2** — a plural exposed only under mutation | 1 | P3 | **Accepted and fixed.** |
| **W22-R2-1** — `#programme`'s *"Amend the programme"* button was drawn enabled beneath prose explaining it does nothing | 2 | **P1** | **Accepted.** Full opacity, focusable, plain actionable label; a keyboard user tabbing to it heard *"Amend the programme, button"* and nothing more. Five other inert controls in the same file already used `{ disabled: true, title }`. Round 3 then sent the fix back — see W22-R3-1. |
| **W22-R2-2** — the plan said `#programme` becomes *"the entry to preparation"* and nothing on it referenced `#events` | 2 | P2 | **Accepted and fixed.** The only path was the generic five-link sibling strip, which says nothing about what is there; the one screen that *did* link to the measurement by name was `#field-capture`, on the record side rather than the plan side. There is a named forward link now. Round 3 measured that it lands 41–45% down a long screen with no anchor, which is true and is the limit of what a link can do here. |
| **W22-R3-1** — `#field-capture`'s *"Mark the round complete"* is enabled directly beneath a live *"the round cannot be marked complete yet"* notice: the exact shape W22-R2-1 had just fixed, left standing | 3 | **P1** | **Accepted, and it corrects the round-2 fix as well as the wave-6 code.** The auditor's point is that fixing one instance while its sibling stands makes the catalogue *less* self-consistent, and that is right. But the better argument was already on the screen, written in wave 6: *"stays refusable rather than silently disabled — a greyed-out button that will not say why is how a field officer at a gate loses an afternoon."* Round 3 also proved that a `title` on a `disabled` button is unreachable, because `disabled` removes it from the tab order — so round 2's fix was the silent grey-out that sentence warns about. **Both buttons now carry the refusal in their label**, which is what assistive technology reads as the control's name; `#field-capture` follows `blastRadius`'s own three-site `Not available — <reason>` convention and returns to a plain label the moment nothing holds the round. |
| **W22-R3-2** — three of this wave's matrix tables are unusable at 375 px: the frozen column is wider than the pane it is pinned inside, so it covers the whole viewport **at every scroll offset** — 0% of column 2 reachable at maximum scroll | 3 | **P1** | **Accepted, and it is much larger than three tables.** Measuring every matrix table in the catalogue at 375 px rather than the three the round named: **29 of 126** had a frozen column wider than its own pane, the worst 1,801 px inside a 306 px pane — `#statistics`, `#notification`, `#obligations`, `#report`, `#snapshot`, `#criteria` and twenty-three more, most of them years older than this wave. One CSS cap on the frozen column, scoped to the panning range because above 1120 px the table takes `min-width: 100%` and cannot overflow, fixes all 29. |
| **W22-R3-4 / W22-R3-5** — a typed *four* one line below the h2 the same commit had just finished deriving on the identical fact; and two of three clauses in a getter missing the pluralisation its sibling already had | 3 | P2 · P3 | **Accepted and fixed.** Both dormant, both in my own fixes, both the shape this wave has now met nine times. |

## The guard that existed and never looked

`verify.mjs` has had a sticky-matrix check since wave 1. It was hardcoded to
`#crosstab`, and its assertion — that the frozen column *stays put* during a
scroll — would not have caught this failure even if generalised, because the
column here stays put perfectly: the defect is that "put" covers the whole pane.

Both halves are now fixed. Every matrix table on every screen is measured
against its own pane at 375 px, and the assertion is the one that matters.
Removing the CSS cap produces **29 named failures**, one per table.

**This is the ninth instance of the wave-18 shape and the most expensive form of
it.** A guard scoped to one screen is a guard whose gap is every other screen —
the same sentence as wave 18's whole-file match, wave 20's nested bullet, and
this wave's own §4.3 enumeration, one level up.

## State at close

- Build exit 0; **rebuild byte-identical**, `sha1 177aaa0b13fdc3f9fa450b8d63fc5a17429a324c`.
- `verify.mjs` exit 0 across **ten families** now over 78 screens — the tenth is
  the generalised sticky-column check, `126 matrix tables measured against their
  own pane at 375px`.
- The 23 Aug census **five state counts character-identical**:
  `not built: 15 · engine-only: 35 · shipped: 8 · proposed: 5 · shipped (CLI): 3`.
  Zero `state:` edits.
- Ledger at **2**, both blocks byte-identical.
- **`figures.mjs` untouched** across the whole wave.
- Build guards printing: `sampling plan: 3 of 10 §6.2 attributes held on a
  programme, 7 of 10 §6.4 conditions instantiated, 2 of 5 hand-offs reconciling`.

## What Wave 23's round 1 must verify — the carried riders

1. **W22-R3-2** — remove the CSS cap and confirm `verify.mjs` names 29 tables.
   Then check the cap did not make a desktop column wrap where there was room.
2. **W22-R3-1** — confirm both buttons state their refusal in the *label*, that
   `#field-capture`'s returns to a plain label when nothing holds the round, and
   that the pair is now consistent with the three `blastRadius` sites.
3. **W22-R3-4, W22-R3-5** — the two dormant defects, under the mutations that
   exposed them.
4. **The thing nobody has checked**: whether capping the frozen column at
   `min(62vw, 20rem)` has made any of those 29 tables *harder* to read than the
   overflow did. No auditor has looked at the fix, only at the defect.
