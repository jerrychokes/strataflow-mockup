# Wave 23 — response to the audit, three rounds, and the close of the run

**Wave 23 passes.** Round 3 records zero P0 and zero P1 against the wave itself,
so it closes on the gate rather than at the cap — the first wave since 20 to do
so, after 21 and 22 both hit the three-round limit.

But round 3's most important findings are not about Wave 23, and this response
is written to carry them rather than to celebrate a pass.

## The three rounds

| Finding | Round | Severity | Response |
|---|---|---|---|
| **W23-1** — the four non-detect map-colouring outcomes are typed verdicts and typed comparison wording under a `#coverage` row claiming the treatment *"is answered with arithmetic"* | 1 | **P1** | **Fixed.** Tenth instance of the shape, same field as W21-A-12. A substitution rule is a value *and* a comparison, so both derive — including *left as reported*, because a limit **below** the criterion makes a non-detect conclusively compliant, which is a different map. |
| **W23-R2-1** — three prose sites Wave 23 itself wrote state the same relationship as typed words, including `#map`'s own lede three sentences from the fixed table | 2 | **P1** | **Fixed.** Under a moved criterion the lede said *above* while the table said *below*, about the same two numbers. The blast radius of a derivation is every sentence that says the same thing. |
| **W23-R3-1** — **seven more screens** say it too, all predating this wave, two of them claiming *"the comparison is arithmetic"* while typed | 3 | P1 · catalogue-wide, non-gating | **Fixed, and the search was the point.** `CADMIUM_ASSESSABILITY` is now the one record; `#qc`, `#result-detail`, `#hardness`, `#indeterminate`, `#dqa`, `#exceedances` and `#coverage` all read its word. Moving cadmium's criterion above its limit of reporting flips every one of them together. |
| W23-R2-2 · W23-R2-3 · W23-R2-4 · W23-R3-4 | 2–3 | P2 · P3 | **All fixed.** The `tone` getters (a `compliant` badge was printing in failure styling); the plate-claims guard, which proved a description existed *somewhere* in `figures.mjs` rather than on the plate quoting it — swapping the Piper's and Stiff's descriptions passed clean and now fails by name; two guard regexes narrower than the property they assert. |
| **W23-R3-2** — a second random sample: 15 numbers, 15 screens, **7 hits (47%)**, agreeing with round 2's 50% to within a point | 3 | P2 · catalogue-wide | **Accepted, and six of the eight misses are wired here.** Two are orphans stated as such. |
| **W23-R3-3** — no guard existed for the defect shape that has cost eighteen findings | 3 | P2 | **Fixed, and it is this wave's most useful artefact.** See below. |

## Three things worth carrying out of this run

**1. The catalogue's central claim was half true, and now it is measured.**
Two independent random samples — ten numbers on ten screens, then fifteen on
fifteen — put the hit rate at **12 of 25**. The claim *"every number on every
face is computed from the register that owns it"* is true of the screens this
audit chain spent its rounds on and was not true of the catalogue as a whole.
Both samples are wired now, which fixes 25 numbers and not the population. The
honest wording is: **every number on a screen this pipeline has audited is
computed from the register that owns it, and the rest are being found by
sampling.**

**2. The worst find of the run was on a screen no wave had touched.**
`#documents` said *34 documents · 11 laboratory certificates* against a register
holding **6** and **2**. A falsehood on a face, found only because an auditor
sampled the catalogue instead of following the work. Every audit before it
looked where the work had been.

**3. There is now a guard for the shape.** Eighteen findings across waves 18–23
share one form — a verdict, a word or a comparison typed beside numbers that are
live — and this catalogue had mechanised a guard for every adjacent staleness
pattern and none for that one. `build.mjs` now reads the **rendered page** for
sentences asserting a comparison between two numbers it also prints, and checks
the arithmetic. Five such sentences today. Freezing one back to a literal and
moving the criterion fails the build with the sentence quoted and the arithmetic
spelled out.

It is narrower than "every number derives" — it cannot see a comparison whose
numbers are not both printed — and its first version was cleverer than it was
careful, reading *"1.0 µg/L sits above the ANZG 2018 criterion"* as a claim that
1 exceeds 2018. That is recorded rather than hidden, because a guard's first
false positive is the most useful thing it will ever tell you about itself.

## A defect I shipped while writing this, and what it found

**Correction, 3 September 2026.** The commit that closed this wave (`e94df0b`)
was pushed with `verify.mjs` red. I put `${CADMIUM_ASSESSABILITY.word}` inside a
**single-quoted** string on `#dqa`, so thirty characters of source code printed
on the page and pushed the screen 29 px over its width at 375 px. I ran verify
after the push rather than before it, which is the one order the gate exists to
prevent. Fixed in the next commit.

Two things came out of it, and both are worth more than the mistake cost:

1. **`build.mjs` now fails on a template placeholder reaching the page**, in
   markup as well as text — the first mutation of that check put one in an
   `aria-label`, where a tag-stripped scan cannot see it and a screen reader
   would have read the source aloud. Verify caught my instance as an *overflow*,
   which is luck rather than coverage: a shorter expression in a roomier cell
   would have printed silently.
2. **Fixing it found a false count that had been on the page since wave 6.**
   The same sentence read *"Seven results are reported as unassessable"*.
   `INDETERMINATE` holds **six** — one cadmium result per bore that returned
   water. Deriving it was what surfaced the falsehood, which is the argument for
   deriving, made by accident.

## One thing deliberately not derived

`#result-detail` carries a comment by a named person at a stated time saying the
limit of reporting sits above the criterion. It stays literal, with the reason
written next to it: **it is testimony, not a computed claim.** Rewriting what
somebody said so that it tracks a value they wrote it about is falsifying a
record, which is the opposite of what every other fix here is for. If the
criterion moved, the honest catalogue shows a comment overtaken by events.

The same reasoning covers the 62 per-cell mark labels that survived the
criterion mutation: an evaluation outcome is a *stored* record in this product,
written once by the engine and read thereafter, and a label describing what a
stored outcome means is consistent with the outcome rather than with a
recomputation of it.

## State at close

- Build exit 0; rebuild byte-identical, `sha1 b2f99fc909534fceea87abf5e199a34268870688`.
- `verify.mjs` exit 0 across **eleven** families over 78 screens.
- Build guards: `stated comparisons: 5 checked against the numbers beside them` ·
  `plate claims: 3 quoted verbatim from figures.mjs` · `spatial layers: 5 drawn,
  2 an equivalent, 7 counted of 14` · `named counts: 29` · `sticky columns: 135`.
- Census five state counts character-identical; zero `state:` edits; ledger at 2.
- **`figures.mjs` untouched across the whole wave**, `sha256` identical at every commit.

## What is left, and the auditor's ordering

The three outstanding items are the owner's, and round 3 ordered them:
**print test → practitioner walk → PRD amendment.** The print test is purely
blocking and the cheapest to clear — and it now blocks more than three figure
families, because the map's entire symbology surface is drawn and inert for the
same reason. The walk resolves the genuinely subjective questions two rounds
have referred to it, including whether the frozen-column cap reads better or
worse than the overflow it replaced. The amendment should record what the other
two settle, rather than being written twice.
