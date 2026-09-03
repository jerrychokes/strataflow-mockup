# Wave 20 — response to the audit, round 1

**The gate passed on the first round — zero P0, zero P1.** The round re-derived
rather than accepted: it parsed the brief's own scenario sentence on its arrows
and recounted every verdict term by term, recounted the population arithmetic at
all ten steps by hand from raw literals, and corroborated the refactor proof from
the other end — **67 of the 75 shared screens are character-identical to the
baseline, and the 8 that moved are exactly the declared consequence list.** Five
findings, all accepted; four fixed here and one recorded with the reason it
stands.

| Finding | Severity | Response |
|---|---|---|
| W20-A-1 — §4.2's 43 dimensions and §4.4's six representations were closed against the brief in both directions and in order; **§4.3's eight scenario terms were typed and closed by nothing.** Deleting a term left the build green and every derived count silently re-read — the wave's own headline would have dropped from one not-expressible term to none | P2 | **Accepted and fixed.** The scenario is a sentence rather than a list, so it closes by splitting the brief's own arrow-separated sentence — which is where the terms came from in the first place, and so is the only source that cannot drift from them. Deleting `rejected data excluded` now stops the build with `§4.3 scenario terms: row with no source for rejected data excluded`. The lesson repeats from wave 18: **a guard that covers two of three enumerations is a guard whose gap is exactly the interesting one**, because the uncovered list is the one nobody thought of as a list. |
| W20-A-2 — the guard was blind to a nested bullet, so an indented dimension went unmeasured and the comment claiming "a dimension the brief adds cannot go unmeasured" was false. Both limbs shared the `^- ` filter | P2 | **Accepted and fixed at the root, not at the limbs.** A bullet is a bullet at any depth: the count and both closure limbs now match `^\s*- `. Adding `  - Colloidal fraction` under Fraction fires **both** halves — `§4.2: enumerates 44 items in the brief, the row says 43` and `§4.2 dimensions: no row for Colloidal fraction`. Same shape as W18-A-1: a guard that trusts a narrower pattern than the document allows. |
| W20-A-3 — `arsenic and manganese` was scored *an equivalent* though nothing stands in for manganese; the wave's own definition of an equivalent requires a substitute | P3 | **Accepted; the taxonomy gains the value it was short of.** An equivalent is something that stands in, and half this term has none. The verdict reads **`half of it`** now, with `via` saying *"Arsenic resolves; manganese has no substitute."* The tally is 3 expressible · 3 an equivalent · 1 half of it · 1 not expressible. The row always stated the truth — `0 of 11` analytes is a manganese — so nobody was misled; what was wrong was reaching for the nearest of three words instead of admitting the measurement had produced a fourth. |
| W20-A-4 — the drawn control bar is enabled selects, and operating one moves the display and nothing else | P3 | **Accepted as an observation; recorded rather than changed, and the reason is the auditor's own.** The catalogue draws 39 selects and disables none, so disabling this screen's would make the explorer the single place where a control reads as broken rather than as drawn — a divergence in one screen from a convention every other screen keeps. The explorer is already the only screen that states the limit, and it states it three times. If the convention should change it changes catalogue-wide, in a wave that says so. |
| W20-A-5 — deferring the *Fraction* rename is right, **for a stronger reason than the note gave**: the approved reference rendering itself says `Arsenic (filtered)`, so the conflict is oracle-versus-glossary and lives in the app repo. The note misattributed the fix to this repository | P3 | **Accepted and corrected.** The note now says the disagreement is between an oracle and the glossary, that it is settled in the product rather than here, and that renaming the grid alone would put the catalogue out of step with the plate it is drawn to. This is the better argument and it was available: the rule that an oracle and the thing asserting against it never change together is the repository's own. **It is also a finding for Jerry rather than for a wave** — an approved plate and the binding vocabulary disagree about a first-class term, and only one of them can be right. |

**State at close:** build exit 0 and rebuild byte-identical
(`d9bfdb092ce63971d51c8db1e66144574d97aa23` — moved from the audited `4accb518…`
because two faces changed; the guard fixes are build-time and render nothing);
verify exit 0 across nine families over 76 screens; the census **five state
counts** character-identical; `vendor brief: 77 rows closed` still printing;
the ledger at two with both blocks byte-identical; `figures.mjs` untouched, so
D13's print-test gate holds. Wave 20 — the explorer, the walk of the brief's own
scenario, and the crosstab demoted to one representation — is closed under §11 on
the auditor's round 1 against `25ae33c` plus these fixes.

**Two things the round confirmed that are worth keeping visible.** The wave's
correction to my plan holds under independent recount: **7 of 8 terms are
walkable, not 2**, and my earlier figure counted terms with no control rather
than terms the record cannot express. And *validated results only* really does
empty the population, because the round sits at `screened` — one state short in
the glossary's own order — which is the sharpest thing the walk found and was in
nobody's plan.

**For the next wave.** Nothing deferred; the ledger is unchanged at two, both
decision-gated. Wave 21 is the analysis object, which §9.5's chain needs as its
first link, and `#hydrochem` — the weakest analysis screen in the catalogue by
the assessment's own measure — is its second half.
