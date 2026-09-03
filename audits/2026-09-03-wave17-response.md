# Wave 17 — response to the audit, round 1

**The gate passed on the first round — zero P0, zero P1** — and this round was
measured harder than any before it. The identity claim ("one record, five
screens, no typed count") was not read out of the code but **proved by
mutation**: three separate seed perturbations, each rebuilt and diffed in a real
browser, with the non-movers checked individually for being correct non-movers.
All 19 exported counts were recomputed independently from `rows`. The three
implementer disagreements I had flagged as needing the hardest look — the origin
refusal, the PFAS scheme overwrite, the four typed rows — each survived an
auditor who says plainly it expected them to break. All four findings are
accepted and fixed in this closing commit.

| Finding | Severity | Response |
|---|---|---|
| W17-A-1 — `QUALIFIERS.drawnBefore[0].was.code` was `fd2.qualifier`, a live read, where its three siblings are literals: a *before* that re-derives from the present, on the panel whose whole subject is that befores are not silently repaired | P2 | **Accepted and fixed, and the verdict now asserts both of its halves.** The drawn code is history and reads as the literal `'J'`. The claim that today's record still agrees was already a separate derived field, `stands`, and it was carrying only half the verdict — the verdict says *the code is right and the asserter is not*, and `stands` tested only the asserter. It is now `fd2.qualifier === 'J' && fd2.concept === 'automatic'`, so both halves recompute and the reproduction the auditor used (setting FD-2's qualifier to `'U'`) now flips the verdict instead of rewriting the history. |
| W17-A-2(a) — `QUALIFIERS.collisions[0]` indexed unguarded in three places, where the record's own comment presents that collection as derived rather than pointed at | P3 | **Accepted and fixed at all three, by degrading the sentence rather than adding a guard that hides.** The auditor named `seed.mjs:9696`; the same defect stood at `screens.mjs:1913` and at the `#qualifiers` collision panel, which dereferenced `collision` seven times. The export basis and the `#qc` sentence each carry a no-collision clause, and the panel now renders a second, honest panel when no letter is shared — because the point survives either way: what decides whether a code may be written is *origin*, not the character. Reproduced the auditor's mutation (`PFAS_LIMITS.qualifier` → `'UJ'`): it built. |
| W17-A-2(b) — `raisedHere` was `rows.filter((r) => r.origin !== 'laboratory')` while every consumer dereferences `r.finding`; the two predicates coincide only because every non-laboratory row happens to be a finding today | P3 | **Accepted and fixed by making the collection say what it means** — `rows.filter((r) => r.finding)`. This is the better half of the two exits offered: a screen-local predicate would have left the record's own collection carrying a name it does not honour. The comment beside it names the case that breaks the old one, and it is not hypothetical — it is *manually*, the glossary's own second origin word, describing a practitioner-applied qualifier. Reproduced the auditor's mutation (`RESULT_DETAIL.qualifiers[0].origin` → `'manually'`): it built. |
| W17-A-3 — "and **the fourth** attributed an automatic qualifier to a person", a fixed phrase between two derived counts | P3 | **Accepted and fixed by derivation**, not by rewording: `B.length - phantom.length`, pluralised, so it reads "the remaining row" today and would say something true rather than something fixed if another typed row were found. The panel's closing line was already derived, which is what made this clause conspicuous. |
| W17-A-4 — the `QualifierOrigin` gap is recorded in three prose places but not in a structure a grep counts | P3 · raised as a judgement | **Accepted in substance, declined in form, and the form matters.** The gap is real and this wave found it: the glossary's origin term is two-valued and 2 of the 6 assertions here fall outside both words. But it is not a deferral. `FOUND AND DEFERRED` counts debts *this catalogue owes and a later wave can pay*, and nothing in this repository can settle this one — the exit is a decision about the product's own vocabulary, taken by its owner, after which the seed follows. Putting it in the ledger would read as unattended-buildable scope where there is none, and would move a count two waves have now reported. So it gets **its own marker with its own grep**: `FOUND FOR THE PRODUCT — 3 September 2026 (wave 17), owner Jerry`, beside the origin words it is about. Two markers, two questions: what this repo owes, and what its reading of the product turned up. If Jerry would rather have one ledger, merging them is a line. |

**A defect of mine, caught by my own check and recorded because it is the exact
class this pipeline exists to catch.** The first draft of that new marker
explained itself by naming the ledger's marker in its prose — and the ledger is
counted by grepping for that string, so `grep -c` went to **3** while two
records stood. The fix that made a finding mechanically findable had, for one
draft, falsified the mechanism it was filed next to. Rewritten to describe the
ledger's marker without writing it: the greps read **2** and **1**.

**State at close:** build exit 0 and rebuild byte-identical
(`a1d950da30218fc5c39e71fc56b08f5c48a3c5f1` — the hash moved from the audited
`dffb7b92…` because W17-A-3's clause now derives and reads "the remaining row");
verify exit 0 across all nine families; the 23 Aug census five state counts
character-identical; ledger **two**, exactly one `SETTLED (wave 17)`, both
surviving deferral blocks untouched. Both of the auditor's P3 reproductions
re-run and now build rather than raising a `TypeError`. Wave 17 — the register
gaining scheme and origin, the letter `J` drawn as two assertions with two
fates, the PFAS scheme correction, and the four typed rows kept beside the
records that refute them — is closed under §11 on the auditor's round 1 against
`5759068` plus these five fixes.

**What the ledger holds now, and what it means for the pipeline.** Two
deferrals stand, and **neither is unattended-buildable**: the depth-profile
plate waits on FP-1's verdict (a figure family is not drawn without Jerry's
word), and the narrative blanks need a challenge-an-attributed-judgement design
that is a product decision before it is a drawing. The register-backed scope the
standing rule runs on is therefore exhausted with this wave. The pipeline
reports that rather than inventing a Wave 18.
