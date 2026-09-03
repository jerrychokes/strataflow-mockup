# Wave 21 — response to the audit, rounds 1–3, closed at the cap

**Wave 21 did not pass. It closes at §11's three-round cap with one P1
outstanding at the moment the cap fell**, which has happened once before —
wave 10 — and is handled the same way: the finding is fixed after the cap, in
this closing commit, and **verified by the next wave's round 1 as a carried
rider** rather than by the round that raised it. What the cap means is that
*this wave's own auditor* did not certify the last fix; it does not mean the
fix is unmade.

Sixteen findings across three rounds. All sixteen are accepted. All sixteen are
fixed or recorded here.

## Why it took three rounds, stated plainly

One defect shape accounts for six of the sixteen and for both of the rounds
that failed:

> **A guard, a count or a verdict that checks the cheaper half of its own
> claim.**

It has now appeared in wave 18 (whole-file match where the claim was a section),
wave 20 (a `^- ` filter where the document allows a nested bullet), and four
times in this wave: presence-not-arithmetic (A-3), typed row numbers beside a
derived table (A-7), a typed verdict beside derived numbers (A-12), and a typed
`fourteen rounds` beside a clause deriving the same quantity (A-14, landed in
wave 20 and found here). **Two of the six I wrote myself, while fixing the
previous instance.** That is the honest reading of this wave: the instinct was
right every time and the arithmetic was allowed to stop one field short of the
sentence a reader actually sees.

The lesson is narrower than "derive everything". It is: **the last hop is the
one that gets typed.** A record whose numbers derive and whose verdict is a
literal is not half-derived, it is undetectable — the count on the face can
only move in one direction, and no mutation of the data will show it.

## Round 1 — one P0, two P1

| Finding | Severity | Response |
|---|---|---|
| W21-A-1 — `#hydrograph` captions a table "the plotted values" that holds neither those values nor those dates: six typed rows, on months the series does not hold | **P0** | **Accepted and fixed.** The wave found this defect, wrote it into its own five-readings record, and then shipped the false caption unchanged — the record described the lie and the lie stayed on the screen. The table derives from `ARSENIC_MW05` now. The fix tripped the wave's own marker guard, which held the build until the row describing the table moved with it: the guard did its job on its author. |
| W21-A-2 — two figure descriptions render into `#hydrochem` asserting exactly what the screen withdraws, and the screen does not name them | P1 | **Accepted and fixed.** The withdrawal named the claim and left the two surfaces still making it unnamed a screen away. Both are named on the face now, quoted from `figures.mjs` rather than paraphrased — which is what made W21-A-9 findable in round 2 and W21-A-13 fixable in round 3. |
| W21-A-3 — the population-readings guard is the third recurrence of the wave-18/wave-20 shape: it checked that a marker was *present*, never that the array behind it held what the row reported | P1 | **Accepted and fixed.** `countAt` counts the array in `figures.mjs` and compares it to the row; `counts: false` is the explicit opt-out for a row with no literal to count. Both limbs bite under mutation. |
| W21-A-4 — the dominance count is reported clean where it turns on 0.22 of a point | P2 | **Accepted and fixed**, and the auditor's framing is the better one: a majority decided by a fifth of a percentage point is a measurement with a margin, not a fact, and the screen says so. |
| W21-A-5 — "appeared nowhere in this repository" is one occurrence off | P3 | Fixed to "once", which round 3 measured as **still wrong**. See below. |

## Round 2 — two P1

| Finding | Severity | Response |
|---|---|---|
| W21-A-6 — all three plates carry the withdrawn claim; the new card says two and leaves the third unnamed | P1 | **Accepted and fixed by making the plates a record rather than a sentence.** I typed "two of the three plates" *while fixing a typed claim*. The Schoeller says the same thing and is the sharpest refutation of the three — 3.47× against a claim of ten. Round 3 found the count half-fixed: see A-12. |
| W21-A-7 — the fourth instance: the reading row describing the derived table hardcodes what the row beside it derives | P1 | **Accepted and fixed.** Every field on that row is a getter over the series. Truncating the array now moves the row and the table together, which is the test the auditor ran against the file rather than against my account of it. |
| W21-A-8 — the new table marks a live value with the class reserved for a superseded one | P2 | **Accepted and fixed.** A drawing convention that means one thing everywhere else in the catalogue cannot mean something else on one screen. |
| W21-A-9 — the Piper is quoted with a character it does not contain | P3 | **Accepted and fixed** — `Ca-HCO3`, the character the file holds. A quotation that is nearly the quotation is the failure mode A-13 then closed for good. |
| W21-A-10 — the guard's comment describes an opt-out that does not exist | P3 | **Accepted and fixed**, and the limb tested. |
| W21-A-11 — the withdrawal record on the reading row renders nowhere | P3 | Fixed after the cap. See below. |

## Round 3 — one P1, and the cap

| Finding | Severity | Response |
|---|---|---|
| W21-A-12 — the fifth instance, in this round's own new derivation: the plate record's numbers are measured and its **verdict** is typed, so the count can only go up | **P1** | **Accepted; the blocking finding, and the one the cap fell on.** `refuted: true` was a literal on all three plates, so `plateClaimCount` filtered three hardcoded `true`s. The auditor proved it by setting MW05's sulfate to 55.0 and watching the screen still read "3 of the 3". Each verdict is a getter now over a **stated** threshold — *roughly four times* read as ≥ 3.5×, *an order of magnitude* read as ≥ 10× against the nearest bore. **Correction, 3 September 2026: the words "printed on the face so a reader can disagree with the threshold rather than with a hidden one" stood here and were false.** The thresholds lived in `plateClaims`' `test` field and nothing in `screens.mjs` read it, so the one thing a reader needed in order to disagree was the one thing only a reader of the source could see — the W21-A-11 shape, inside the fix for W21-A-12. Wave 22's mechanical audit found it (W22-M-1, P0) by grepping the built page for the thresholds and getting nothing. The plate table now renders a *Read as* column and a *Refuted* verdict beside each measurement, so the claim is true as written. Replaying the auditor's own mutation gives **2 of 3**, with the Stiff flipping and the Schoeller holding because its shared-calcium clause still fails. |
| W21-A-13 — the record quotes three plate descriptions as verbatim and nothing checks them against `figures.mjs` | P2 | **Accepted and fixed.** The build reads `figures.mjs` and fails on a quoted `desc` it does not contain; it prints `plate claims: 3 quoted verbatim from figures.mjs, 3 refuted by the ion table` on a green run. This had already cost one defect — A-9 was exactly a quotation that was not one. |
| W21-A-14 — `#statistics` types "fourteen rounds" in the same sentence as a clause deriving the same quantity | P2 | **Accepted and fixed.** A getter over the series. Under the auditor's own truncation mutation the sentence now reads **13 rounds** where it read fourteen. Landed in wave 20 rather than in this one, and surfaced only because round 3 re-ran its truncation mutation across the whole screen — the sixth instance of the shape. |
| W21-A-11 — the `was` field renders nowhere, and now carries load-bearing content | P3 | **Accepted and fixed, and it was the more serious of the two P3s.** The explanation of a number that visibly moved on the face — three answers about the censoring to two — was written into a field nothing drew, so a reader of the screen had to reconcile the commit history against the page. It renders now, in the same superseded style every other `was` on that screen uses. Its own two live numbers are derived, because a typed count *inside* the field explaining a derived count would have been the seventh instance. |
| W21-A-5 — "appeared once" is two | P3 | **Accepted; the count was right and the fix reached half the surfaces.** *Correction, 3 September 2026:* the response below claimed both surfaces said *twice*. There were **four** surfaces stating this fact, not two, and the correction reached two of them — leaving `#statistics` saying *twice* in a table row and *nowhere* one paragraph below it, in the same panel, and `#analysis` still saying *once*. Wave 22's mechanical audit found it (W22-M-3, P0). The fact is one record now, `ANALYSES.detectionFrequency`, and all four surfaces read its sentence; adding a third mention moves all four together. The measurement itself was never in doubt: At the baseline `cfdb910`, across tracked source: `seed.mjs` 1, `VENDOR_REQUIREMENTS.md` 1. Both surfaces now say **twice**, and both say *which* two — this catalogue's own note saying detection frequency had no surface, and the brief asking for it. Round 1 changed "nowhere" to "once" without counting; that is the same error one step along, and it is why the corrected sentence names its two occurrences rather than just its number. |
| W21-A-15 — a seed comment still states the superseded count | P3 | **Accepted and fixed.** The comment said three answers where every rendered surface said two. It says two now, with the date the third was withdrawn and a note that the rendered count derives through a `Set` — so the comment is the only hand-written instance of that number and a maintainer knows it. |
| W21-A-16 — "mean 2.73×" sits between two extremes whose mean is 2.89× | P3 | **Accepted and fixed.** 2.73 is MW05 against the mean *strength* of the other five; 2.89 is the mean of the five *ratios*. The two other surfaces carrying this number both say which it is and this compressed string did not, with its placement between the extremes inviting the arithmetic a reader would naturally do. It names the mean now, derived. |

## State at close

- Build exit 0; **rebuild byte-identical**, `sha1 b8620e35b1df73f0776cf7964c57e6d8caca39e1`.
- `verify.mjs` exit 0 across **nine families** over 77 screens — no document
  overflow at any width, no duplicate ids, no unnamed controls, no heading
  skips, matrix panning intact, no figure text collisions, every coarse-pointer
  target ≥ 44 px, no stacked label below its own text, no caption wider than its
  region.
- The 23 Aug census **five state counts character-identical**:
  `not built: 15 · engine-only: 35 · shipped: 8 · proposed: 5 · shipped (CLI): 3`.
  Zero `state:` edits.
- Deferral ledger at **2**, both blocks byte-identical, both decision-gated.
- **`figures.mjs` untouched** — no diff against `HEAD` at any point in the wave,
  so D13's print-test fence holds. Four of the sixteen findings were about that
  file's *contents*, and none of them was answered by editing it: the
  disagreements are recorded where they can be seen, on screens, rather than
  resolved by a wave that is not allowed to open the file.
- Build guards now printing: `plate claims: 3 quoted verbatim from figures.mjs,
  3 refuted by the ion table` · `population readings: 5 located, 2 answers about
  the censoring` · `vendor brief: 77 rows closed against VENDOR_REQUIREMENTS.md`.

## What Wave 22's round 1 must verify — the carried riders

Wave 21's auditor never saw the last seven fixes. They are riders on Wave 22's
first round, in the order they matter:

1. **W21-A-12** — replay the sulfate mutation (`MW05.SO4` 19.1 → 55.0) and
   confirm the plate count **falls to 2 of 3**, and that the thresholds are on
   the face rather than in source.
2. **W21-A-14** — truncate `ARSENIC_MW05` and confirm `#statistics` moves off
   fourteen in **both** halves of the sentence.
3. **W21-A-11** — confirm the `was` string renders, and that its own numbers
   follow the record. Mutating the record's censored count to 2 gives *one
   answer* on the face and in the build line together, which is the check.
4. **W21-A-13** — delete a character from a quoted `desc` and confirm the build
   names the plate and stops.
5. **W21-A-5, A-15, A-16** — the three P3 corrections, each of which is a claim
   about a measurement rather than a wording choice, and each of which was got
   wrong once already.

## What the wave was, underneath the sixteen findings

The analysis object — §9.5's missing middle term — exists, and the ion table
refutes three drawn sentences that had been on `#hydrochem` since it was first
built. Both of those are worth having. The three rounds were not spent finding
that the work was wrong; they were spent finding that **the work's own proofs
kept stopping one field short**, which is a better problem to have three rounds
of than the alternative and is still three rounds.
