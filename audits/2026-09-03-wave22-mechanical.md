# Wave 22 mechanical audit — round 1

This is the mechanical half of the round: checks run, not judged. No design opinion is
offered anywhere below; every line is a command, a mutation on a scratch copy, or a
byte comparison. Findings are numbered `W22-M-*`; carried riders keep their `W21-A-*`
IDs. Severities per `EXPANSION_BRIEF.md` §11: P0 a falsehood on a face, P1 a claim the
record does not support or a guard that does not bite, P2 a fragile derivation, P3 a
wording or hygiene defect.

**Commit note.** Briefed at `eecfd60`. Partway through this round the tree moved: `HEAD`
is now `34c2b14` ("Wave 22, gate pass 3: the MW09 split goes into the record, and one
clause repeated W19-A-1"). I independently verified the move (`git log`, `git diff
eecfd60 34c2b14`) rather than taking it on trust — the diff touches only `index.html`,
`screens.mjs` and `seed.mjs`, all confined to the MW09-camp change described in the
commit message, and does not intersect anything Sections A or B mutate (`SO4`,
`ARSENIC_MW05`, `plateClaims`, `VENDOR_REQUIREMENTS.md`, the three `programmes`
objects). So Section A's four scratch-copy mutations (run against a copy taken at
`eecfd60`) stand unchanged; every hygiene number in Section C and the two claims in
Section D were re-measured directly against the real tree at `34c2b14`, which is what
is reported below. The tree was left clean throughout (`git status --short` empty at
the end of every real-tree command).

---

## A. Wave 21's five carried riders

All five mutations were run on a fresh `cp -r` scratch copy (never in the real tree),
built with `node build.mjs`, and the copy deleted afterward. Baseline copy was taken at
`eecfd60`.

### 1. W21-A-12 — MW05 `SO4: 19.1 → 55.0`

**Confirmed as claimed, with one addition the claim did not make.**

Build line: `plate claims: 3 quoted verbatim from figures.mjs, 3 refuted by the ion
table` → `plate claims: 3 quoted verbatim from figures.mjs, 2 refuted by the ion
table`.

`#hydrochem` card headline: `<strong>3 of the 3 plates on this screen</strong> carry
the withdrawn claim` → `<strong>2 of the 3 plates on this screen</strong> carry the
withdrawn claim`.

Row-by-row, before → after:

| Plate | Before | After |
|---|---|---|
| Piper | "the largest cation is not calcium at 4 of the 6, and only 2 hold a majority anion at all" | **unchanged** |
| Stiff | "the closest is 1.94× and the widest 3.84×; against the mean strength of the other 5 it is 2.73× — four is true of none of them" | "the closest is **3.66×** and the widest **7.24×**; against the mean strength of the other 5 it is **5.16×** — four is true of none of them" |
| Schoeller | "the signature fails on the same 4 bores, and the sulfate limb is 3.47× the next bore — an order of magnitude above *the rest* requires the nearest, not the furthest" | "the signature fails on the same 4 bores, and the sulfate limb is **10.00×** the next bore — an order of magnitude above *the rest* requires the nearest, not the furthest" |

Stiff flips (3.66× ≥ 3.5 threshold, so `refuted` goes false); Schoeller holds refuted —
but for a reason worth recording precisely, since the mutation was chosen to land
sulfate at exactly 10.00× (55.0 / 5.5): Schoeller's `refuted` getter is `m.notCalcium
.length > 0 || sulfateNearest < 10`, an **OR**, and `notCalcium.length` (4) alone
already satisfies it — `10.00 < 10` is false, so the sulfate half of the clause is
*not* what is holding the claim refuted here, the calcium half is. This is exactly the
edge the mutation should have been chosen to expose, and it holds up under it.

**W22-M-1 · P0 — the stated thresholds do not appear anywhere in the built
`index.html`.** The wave-21 response claims: *"Each verdict is a getter now over a
**stated threshold** — roughly four times read as ≥ 3.5× and an order of magnitude
read as ≥ 10× against the nearest bore — **printed on the face** so a reader can
disagree with the threshold rather than with a hidden one."* This is false as written.
The threshold text lives entirely in the `test:` field of each `plateClaims` entry in
`seed.mjs` (`'roughly four times read as at least 3.5× against every other bore'`,
`'a shared calcium signature, and an order of magnitude read as at least 10× against
the nearest bore'`) — and nothing in `screens.mjs` ever reads `c.test`. The plate table
renders only `figure`, `desc` and `measured` (`screens.mjs:3551-3559`). Checked
exhaustively: `grep -o "at least[^<\"]\{0,60\}"` over the built `index.html` returns
zero hits containing "3.5" or "10"; a direct search for "3.5×"/"≥ 3.5"/"10×"/"≥ 10"
anywhere in the file returns nothing relevant (only unrelated dissolved-oxygen values
and SVG path coordinates that happen to contain "3.5"). **The thresholds a reader is
invited to disagree with exist only in source, not on the screen** — the opposite of
what round 3 and the response document both assert. This is on the face today
(checked at both `eecfd60` and `34c2b14`, unmutated). *Correction:* render `c.test`
in the plate table, e.g. a fourth column or as part of the `measured` cell.

### 2. W21-A-14 — `ARSENIC_MW05.slice(0, 13)`

**Confirmed exactly.** Full sentence, before → after (rendered on `#statistics`,
`populationLine('statistics')`, `screens.mjs:2450-2458`):

> **Before:** "Population — one analyte at one bore, across rounds. 14 quarterly
> values of Arsenic (filtered) · MW05 · 2023-01 to 2026-04 · the exported series
> carries 0 censored and the trend record beside it says 2. A different population
> from the grid's in every dimension: one analyte, one bore, **14 rounds**. Nothing on
> the screen said so until wave 20, and nothing had counted it until wave 21."

> **After:** "Population — one analyte at one bore, across rounds. **13** quarterly
> values of Arsenic (filtered) · MW05 · 2023-01 to **2026-01** · the exported series
> carries 0 censored and the trend record beside it says 2. A different population
> from the grid's in every dimension: one analyte, one bore, **13 rounds**. Nothing on
> the screen said so until wave 20, and nothing had counted it until wave 21."

Both halves move (`14`→`13` in the population-line clause, `fourteen`-turned-`14`→`13`
in the `says` clause), both are getters over `ARSENIC_MW05.length` (`seed.mjs:14258`,
`:14266`). Confirmed.

### 3. W21-A-11 — `was` string rendering, then `censored: i < 2`

**Both halves confirmed.** First, unmutated: `grep -c "Six typed rows, on months the
series does not hold" index.html` → **1**. It renders, inside an
`sf-result__superseded` span, exactly as claimed.

Then, on a scratch copy, `ARSENIC_MW05`'s builder changed to `censored: i < 2` (from
the constant `censored: false`):

- Build line: `population readings: 5 located, 2 answers about the censoring` →
  `population readings: 5 located, 1 answers about the censoring`.
- Rendered `was` string: *"...Withdrawn 3 September 2026, which is why these **5**
  readings now give **1** answers about the censoring and not the three the wave first
  reported: one of the three was this table."*

Both the build line and the face move from 2 to 1 together, as claimed. (**W22-M-2 ·
P3** — "these 5 readings now give 1 answers about the censoring" is a grammar defect
under this mutation, singular/plural not handled by the template; latent in the base
build since the live count is 2 and reads correctly. Not a factual defect, cosmetic
only, noted for completeness.)

### 4. W21-A-13 — one character off a quoted `desc`

**Confirmed exactly.** `roughly four times` → `roughly fourr times` in the Stiff
entry's `desc` (`seed.mjs:14946`). `node build.mjs` → **exit 1**, message:

> `plate claim "Stiff": figures.mjs no longer carries the description this screen
> quotes — "MW05 is roughly fourr times the ionic strength of every other bore"`

Names the plate ("Stiff") and quotes the mismatched string, as claimed.

### 5. W21-A-5, A-15, A-16

**A-5 — the count itself is right; the claim that "the faces now say twice" is not.**

At `cfdb910`, case-insensitive, ignoring `index.html`: `seed.mjs` 1 hit,
`VENDOR_REQUIREMENTS.md` 1 hit — **two occurrences**, confirming "twice" is the
correct number.

**W22-M-3 · P0 — three different claims about this same fact stand simultaneously on
the built page, and two of the four render surfaces are stale.** There are exactly
four places in source that state how many times "detection frequency" appeared in the
repository before wave 21, and they do not agree:

| Source | Text | Verdict |
|---|---|---|
| `seed.mjs:14729` (`ANALYSES.summary` row, `#statistics` table) | "It appeared **twice** in this repository before this wave... once in this catalogue's own note... and once in the brief" | correct |
| `seed.mjs:15660` (§9.4 coverage note, on the vendor-brief/coverage screen) | "detection frequency, which appeared **twice** in this repository before this wave — in this note and in the brief" | correct |
| `screens.mjs:3702` (literal string, `#statistics`, directly below the table row above) | "Detection frequency appeared **nowhere** in this repository before 3 September 2026" | **stale** |
| `seed.mjs:15463` (`ANALYSES.moved()`, `#analysis` "Every value this wave moved" table) | "Detection frequency appeared **once** in the repository and never as a measure" | **stale** |

The worst instance is on `#statistics` itself: the table row (line 3699,
`cell(md(r.how))`) reads **"twice"**, and the very next paragraph in the same panel
(`screens.mjs:3702`, a plain hardcoded string, not templated from any seed data) reads
**"nowhere"** — a direct, adjacent, on-screen contradiction about one fact. `git log -S`
confirms `"appeared nowhere"` was introduced at `93c6a9a` (wave 21 round 1) and never
touched since; `"appeared once"` (`seed.mjs:15463`) was introduced at `5bf0eac` (wave
21 round 1's own response commit) and never touched since; the correction to "twice"
landed only at `50a5a9c` (wave 21's closing commit, "after the cap") and was applied to
exactly 2 of the 4 places making the claim. This is the same shape the wave-21 response
document names six times over ("the last hop is the one that gets typed") — a seventh
instance, still open, on the wave whose own retrospective is about exactly this defect
shape. *Correction:* derive all four from one shared count (e.g. count matches of a
named phrase across the two files at build time, or better, hold the "twice, named"
fact in one place and reference it from all four).

**A-15 — confirmed fixed, no comment states the current count as three.** The only
"three" in the vicinity is explicitly historical: `seed.mjs:14270` — "...give **two**
different answers about the censoring. **It was three** until W21-A-1 withdrew the
typed table under Figure 4.2 on 3 September 2026..." Correct as claimed.

**A-16 — confirmed. Both means independently recomputed:**

Instrumented `ANALYSES.ions` on a scratch copy to dump raw values: `impacted.strength
= 0.04049` (MW05); other five strengths `0.01241, 0.01652, 0.02090, 0.01371, 0.01055`
(MW01A, MW03B, MW07, MW09, MW12); individual ratios `3.2627, 2.4510, 1.9373, 2.9533,
3.8379`.

- **Mean of the five strengths, then MW05 against it** (what the face calls "mean
  strength"): `0.04049 / 0.014818 = 2.732487... → 2.73×` — the number on the face.
- **Mean of the five individual ratios** (what a reader would compute eyeballing the
  extremes 1.94× and 3.84×): `(3.2627+2.4510+1.9373+2.9533+3.8379)/5 = 2.888443... →
  2.89×` — a genuinely different number, confirming the round-3 finding exactly.

All three on-screen surfaces name which: the Stiff plate row says "against the **mean
strength** of the other 5 it is 2.73×"; the `strengthClaim.says` text says "Against
the mean of the other 5 bores MW05 is 2.73×" (in a paragraph headed by "Ionic strength
is..."); the facies panel says "MW05 is 2.73× the **mean ionic strength** of the other
5." Confirmed fixed as claimed.

---

## B. Wave 22's own guard, both directions — five re-run mutations

All five reproduced on scratch copies; every one of your five results is confirmed.

1. **Add `- Colloidal fraction` under §6.2's list.** `node build.mjs` → exit **1**:
   `§6.2: enumerates 11 items in the brief, the row says 10` and `§6.2 programme
   attributes: no row for Colloidal fraction`. Names both the count and the row, as
   claimed.
2. **Rename `- Missing QA samples` → `- Absent QA samples` in §6.4.** Exit **1**:
   `§6.4 completeness conditions: no row for Absent QA samples` and `§6.4 completeness
   conditions: row with no source for Missing QA samples`. Both directions named.
3. **`submitted` → `dispatched` in §6.4's arrow sentence.** Exit **1**: `§6.4 stages:
   no row for dispatched` and `§6.4 stages: row with no source for submitted`.
4. **Replace the whole arrow blockquote with plain text.** Exit **1**: `§6.4: the
   brief no longer carries an arrow-separated reconciliation, and the six stages are
   built on one` — exact match.
5. **`matrix: 'Water'` added to all three `programmes` objects.** Build line moves
   `sampling plan: 3 of 10 §6.2 attributes held on a programme...` → `sampling plan:
   4 of 10 §6.2 attributes held on a programme...` — the "Matrices" attribute (`at:
   'events'`, `on: (p) => p.matrix ?? null`) goes from `absent` (0 of 3 filled) to
   `held` (3 of 3 filled) in one step, exactly the 3→4 move claimed.

Twelve mutations from you plus these five re-runs (partial overlap noted, all
independent executions) — none behaved differently from what was reported.

---

## C. Hygiene, measured

- **`node build.mjs` twice, `sha1sum index.html`.** At `eecfd60` (before the tree
  moved): `4c28fab5767fe592e14fa26ba1f6aad536113d33` both runs — matches the value
  given. At current `HEAD` (`34c2b14`): `1ee971d1e1d57bfb438f32befbd208ff3267cf9c`
  both runs, `git status --short` empty afterward. Byte-identical in both cases.
- **`CHROMIUM=/opt/pw-browsers/chromium node verify.mjs`.** Exit **0**. **78** screens
  measured at each of 375px, 1000px and 1280px. Nine families green: 13 figures / 250
  text nodes compared pairwise; 588 controls hit-tested under coarse pointer, floor
  44px; 1877 stacked labels measured; 173 captions × 3 widths. (Measured at `34c2b14`;
  screen count is 78, not 77 — expected, since Wave 22 added `#completeness`, one more
  screen than Wave 21's baseline.)
- **23 Aug census line.** `not built: 15 · engine-only: 35 · shipped: 8 · proposed: 5
  · shipped (CLI): 3` — character-identical to the given string, confirmed from
  `build.mjs`'s own stdout at `34c2b14`.
- **`grep -c "FOUND AND DEFERRED" seed.mjs`** → **2**. Matches.
- **`git diff --stat 36f71e3 eecfd60 -- figures.mjs`** → empty (confirmed, exit
  clean, no output). `sha256sum` of `figures.mjs` at `36f71e3`, `44d9c9b` and
  `eecfd60`: all three
  `11acfcccea3b7aae98395fad0c42ec65f879882d9547f285366d94a35a5a03c9` — identical.
  (Checked `34c2b14` too, for the same reason the commit note above gives: identical.)
- **`#completeness`** (`screens.mjs:14197`): `{ id: 'completeness', label: 'Round
  completeness', body: roundCompleteness, now: 'proposed', added: '2026-09-03' }` —
  has `now: 'proposed'` and `added:`, and **no** `state:` key, unlike its siblings in
  the same array. Confirmed.
- **`git diff 36f71e3 eecfd60`, `state:` lines removed.** Across the *whole* diff
  (not just `screens.mjs`): exactly **7** removed lines match `^-.*state:`, all seven
  the `Q2_PROGRAMME` rows (MW01A, MW03B, MW05, MW07, MW09, MW11, MW12). No other
  `state:` line is removed anywhere in the diff. The seven added lines in `seed.mjs`
  (`git diff ... | grep '^+.*state:'`) are byte-identical to the seven removed from
  `screens.mjs` — same `code`/`suite`/`due`/`collected`/`received`/`state` values in
  the same order, character for character. Confirmed both claims.

---

## D. Two specific claims — tried to break

### D.1 — "no count on this screen is taken twice"

The caption (`screens.mjs:10233`) sits on the six-stage table specifically: "One row
per stage. Every number is read off the register named beside it — no count on this
screen is taken twice." Tracing every number:

**The six stage rows (19 readings total), each with its seed expression:**

| Stage | Readings (expression) |
|---|---|
| Planned | `Q2_PROGRAMME.length` · `[...new Set(Q2_PROGRAMME.map(r=>r.suite))].length` · literal `1` |
| collected | `FIELD_ROUND.preflight.visits` · `FIELD_ROUND.preflight.sampled` · `FIELD_ROUND.preflight.dry` · `EVENT_SAMPLES.length` |
| submitted | `CUSTODY_CHAIN.transfers.length` · `CUSTODY_CHAIN.containers` · `CUSTODY_CHAIN.continues.containers` |
| received | `RECEIPT.checks.length` · `num(receiptCheck(/Containers received/).found)` · `CUSTODY_CHAIN.continues.receipt.reconciled === '1 of 1' ? 1 : 0` |
| analysed | `roundBatches.length` · `roundBatches.reduce((n,b)=>n+b.samples,0)` · `roundDeliverable.rows` |
| validated | `QAQC.length` · `heldRows.length` · `CROSSTAB_SHAPE.results` |

Within this table alone, all 19 expressions are pairwise distinct — no two *stage*
rows read the same source. On that narrow reading (the caption's own sentence: "one
row per stage... no count **on this screen**" immediately following "every number is
read off the register **named beside it**"), the claim holds.

**The five hand-off rows (10 endpoint values), each with its expression:**

| Hand-off | Left | Arrived |
|---|---|---|
| Planned → collected | `Q2_PROGRAMME.length` **(= Planned's own reading)** | `FIELD_ROUND.preflight.sampled` **(= collected's own reading)** |
| collected → submitted | `containersOnManifest` = `EVENT_SAMPLES.reduce((n,s)=>n+s.containers,0)` *(new)* | `CUSTODY_CHAIN.containers` **(= submitted's own reading)** |
| submitted → received | `CUSTODY_CHAIN.containers` **(= submitted's own reading, and = the arrived value directly above)** | `num(receiptCheck(/Containers received/).found)` **(= received's own reading)** |
| received → analysed | `primarySamples.length` = `EVENT_SAMPLES.filter(s=>s.qc==='—').length` *(new)* | `roundBatches.reduce((n,b)=>n+b.samples,0)` **(= analysed's own reading)** |
| analysed → validated | `EVENT_SAMPLES.reduce((n,s)=>n+s.results,0)` *(new — distinct from `EVENT_SAMPLES.length` used in `collected`)* | `CROSSTAB_SHAPE.results` **(= validated's own reading)** |

**W22-M-4 · P2 — a literal, whole-screen reading of "no count on this screen is taken
twice" is false; a narrower reading (no count is independently re-derived by a second
computation path) is true.** 7 of the 10 hand-off endpoint values reuse, verbatim, the
identical source expression already displayed as a stage-row reading — `CUSTODY_CHAIN
.containers` alone appears three times across the two tables (submitted's own row,
then as both the "arrived" end of one hand-off and the "left" end of the next). Only 3
of 10 hand-off endpoints introduce a genuinely new expression not shown in the stage
table (`containersOnManifest`, `primarySamples.length`,
`EVENT_SAMPLES.reduce(...results)`). This is arguably the *point* of a hand-off — it
exists to show a stage's own exit count next to its neighbour's entry count, read from
the same register rather than recomputed a second way (which is exactly what would
risk the drift this whole audit history keeps finding) — so it may be intentional and
defensible. But the caption's own words, "no count on this screen is taken twice," do
not carry that qualification, and a reader who took it at face value and then noticed
`38` appearing three times next to three different labels would reasonably feel misled.
Reported as found; not asserting which reading was intended.

### D.2 — "the 5 places this record disagrees with itself"

Confirmed exactly as claimed. `seed.mjs:13719`: `get disagreementPlaces() { return
handoffs.filter((h) => !h.agrees).length + Object.keys(disagreements).length; }`.

Both halves derived: `handoffs.filter(h => !h.agrees).length` counts live
`.agrees` getters (`h.left.n === h.arrived.n`) over the five hand-off objects;
`Object.keys(disagreements).length` reads the key count of `disagreements = { mw09,
denominator }` (`seed.mjs:13384`) — two named, substantively-computed disagreement
objects, not a typed literal. Live values: 3 hand-offs currently disagree (Planned→
collected −1, received→analysed +4, analysed→validated −94; the other two — collected→
submitted and submitted→received — both reconcile at 38/38) + 2 disagreement types = 5,
matching the face (`grep -o "the [0-9]* places this record disagrees with itself"
index.html` → "the 5 places...").

**Mutation, run on a scratch copy:** flipped `MW11`'s second-visit session
`disposition` from `'dry'` to `'sampled'`, which pushes `FIELD_ROUND.preflight.sampled`
from 6 to 7, matching `Q2_PROGRAMME.length` (7) and making the Planned→collected
hand-off reconcile. Result: `sampling plan: ... 3 of 5 hand-offs reconciling` (up from
2 of 5) and the face moves to **"the 4 places this record disagrees with itself."**
Exactly the 5→4 move claimed. Confirmed.

---

## Findings summary

| ID | Severity | One line |
|---|---|---|
| W22-M-1 | **P0** | The ≥3.5×/≥10× thresholds the wave-21 response claims are "printed on the face" appear nowhere in built `index.html` — only in `seed.mjs`'s `test:` fields, which `screens.mjs` never reads |
| W22-M-3 | **P0** | `#statistics` itself shows "appeared twice" in a table row and "appeared nowhere" one paragraph below, in the same panel; a fourth surface elsewhere still says "once" — a claim W21-A-5 was believed to have closed is open on 2 of 4 surfaces |
| W22-M-4 | **P2** | "No count on this screen is taken twice" is true of the 6-stage table alone (19 distinct expressions) but false of the screen as a whole — 7 of 10 hand-off endpoint values re-display an expression already shown as a stage reading |
| W22-M-2 | **P3** | "these 5 readings now give 1 answers about the censoring" — singular/plural template defect, exposed only under the A-11 censoring mutation, dormant in the live build |

Everything else checked in Sections A, B, C and D.2 — the four remaining carried
riders, all twelve-plus-five §6 guard mutations, every hygiene number, and the
disagreement-count formula and its mutation — is confirmed exactly as claimed, with
the evidence quoted above.
