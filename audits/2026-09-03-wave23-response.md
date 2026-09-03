# Wave 23 — response to the audit, round 1

**Round 1 did not pass: one P1.** It is fixed here, with six P2s and three P3s
answered — two fixed, the rest recorded with the reason they stand. Round 2
decides whether the wave closes passed.

| Finding | Severity | Response |
|---|---|---|
| **W23-1** — the four non-detect map-colouring outcomes are **typed verdicts and typed comparison wording** (*"is above"*, *"is below"*), while `#coverage`'s §5.3 row claims this treatment *"is answered with arithmetic"*. Moving the cadmium criterion from `0.54` to `0.3` left the build green and the page reading *"0.5 is below 0.3"* beside a `compliant` badge that should have read `exceedance` | **P1** | **Accepted and fixed.** The tenth instance of the shape, and the same one field over as W21-A-12: the raw numbers were live and the verdict they were supposed to decide was not. A substitution rule is a value *and* a comparison, so both derive now. Even *left as reported* derives — a limit **below** the criterion would make a non-detect conclusively compliant, which is a different map, so that verdict is a comparison rather than a constant. Only *excluded* keeps a literal, because producing no mark is structural rather than arithmetic, and it says so. Replaying the auditor's mutation: the comparison flips to *"0.5 is above 0.3"*, the badge to `exceedance`, and the half-limit rule correctly reports that it now gives **the same** answer as the full-limit rule, because the criterion has moved outside the range the two substitutions span. |
| **W23-4** — `named counts`' word list stopped at *twenty* and its noun had to be lowercase | P3 | **Accepted and fixed.** Neither limit was exercised by the catalogue, which is exactly the condition under which a guard's gap goes unnoticed until the wave that crosses it — the ninth instance's own lesson, one size down. The list composes to a hundred and the noun may be capitalised; *"The twenty-four Readings of the period"* on `#saved-views` now fails by name. |
| **W23-5** — the unrendered-emphasis regex required three characters between the asterisks, so `*no*` evaded it while `*not*` was caught | P3 | **Accepted and fixed.** One character is emphasis too. `*no*` now fails the build by name. |
| **W23-2** — neither the shipped `62vw` frozen-column cap nor the proposed `45vw` is a real fix for the 5–8 tables whose identity column holds prose rather than a code; `62vw` is the lesser evil, and the auditor says it is correctly not re-litigated inside this wave | P2 | **Accepted as recorded, and left alone.** Two independent measurements now agree the cap costs real legibility on a handful of tables and that neither value fixes them. That is a genuine finding and it is **not a Wave 23 change**: it touches 29+ tables across the catalogue, most of them older than this wave, and re-tuning another wave's fix in the closing hours of this one is the trade this pipeline has refused throughout. **It belongs to the practitioner walk**, where somebody who reads these tables for a living can say whether a wrapped identity label or a shorter one is the right answer — a question no measurement settles. |
| **W23-3** — `#map`'s layer checkboxes and the whole symbology bar are wired to nothing; no control on the screen repaints Figure 4.9 | P2 | **Accepted as recorded.** It is disclosed on the screen and it is what D13's fence costs: repainting the plate means opening `figures.mjs`, which no wave may do until the print test. The measured dials exist precisely because the control cannot move the drawing — they say what *would* change and by how much. **This is the strongest argument in the catalogue for running the print test**, and it is now the second wave to say so. |
| **W23-6, W23-7** — 7 of 14 layer rows render as prose with no visual anchor, and the one plate covering four layer rows carries no shape differentiation by location class | P2 | **Accepted as recorded, both fenced.** The second is `figures.mjs` work by definition. The first is a design judgement about a wall of *"cannot be stated"* cells, and it is real — but the honest alternative to a prose row is a drawn layer, which is the same fence. Recorded for the walk rather than papered over with an icon that would imply a capability. |

## What the round confirmed, and it exceeded what the wave claimed

The round re-derived rather than accepted, and every headline held:

- **`figures.mjs` byte-identical** at `2c24741` and `f01540e`. D13's fence intact.
- The **14 / 5 / 2 / 7** layer split and the **14 of 42** governance count recomputed
  directly from the seed and matched exactly.
- The plane fit reproduced **from hand-retyped literals by a different algorithm**
  (Cramer's rule): bearing 103°, gradient 1.74 m/km, worst residual 0.55 m, and
  **TP01's 92 m upgradient projection** — the bore logged *"nearest the TSF"* — all
  matched to many decimal places. The 4 / 2 / 2 three-way selection count reproduced
  exactly.
- **Both new guards are genuinely whole-catalogue** and bit under mutation in both
  directions, on old screens as well as new — which was the specific thing Wave 22
  closed on.
- **All four of Wave 22's carried riders** confirmed fixed, including the question
  nobody had quantified: the auditor's own numbers for the frozen-column cap are up
  to 2.46× height inflation and a 73 px reading slot at `62vw`, against a 137 px slot
  and +24–41% height at `45vw`.

## State

Build exit 0, rebuild byte-identical `sha1 45398148675abca7f9405ecd65c9216927a8577a`;
`verify.mjs` exit 0 across **eleven** families over 78 screens; census five state
counts character-identical; zero `state:` edits; ledger at 2; `figures.mjs` untouched.

## For round 2

1. **W23-1's fix, under its own mutation** — move the criterion and check that the
   comparison word, the verdict badge and the *"same answer as the rule above"*
   clause all follow, in all four rules.
2. **The two widened guard regexes**, in both directions.
3. **Whether deriving the verdict changed any number on a face that should not have
   moved** — the fix touches four rows on `#map` and the §5.3 row on `#coverage`.
4. The four recorded P2s are recorded, not fixed. Say if any of them should have
   been.
