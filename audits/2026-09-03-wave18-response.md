# Wave 18 — response to the audit, round 1

**The gate passed on the first round — zero P0, zero P1.** The round attacked the
two things the wave asked to be judged rather than measured, reproduced every
register cross-check number independently (77 / 66 / 34 / 5 / 10-of-14 / 60-of-75,
and the verdicts 20 / 46 / 11), tested §20's roll-ups by forcing §14 to `covered`
and watching C9 flip while C1 and C2 held, and fired all seven advertised guard
failure modes by name. Both corrections the wave made to my documents were checked
by hand count and upheld. All three findings are accepted and fixed in this closing
commit.

| Finding | Severity | Response |
|---|---|---|
| W18-A-1 — the `asks` verbatim check ran against the whole brief, so a row could quote another section's sentence and pass. It caught paraphrase and missed misattribution — a matrix row that has stopped tracing | P2 | **Accepted and fixed by narrowing, not by adding a mechanism.** The auditor's own observation pointed at the fix: the guard already slices the file by heading to count bullets, so the same slice now bounds the quotation check. A requirement row is checked against its own §n, a scenario row against its own scenario, and the §15/§17/§20 rows keep the word-for-word match they already had against their own lists. The auditor's exploit was replayed against the fix — swapping §4.2's `asks` for §12.1's sentence verbatim — and the build now stops with `row 4.2: its quoted words are not in §4.2 of the brief`. |
| W18-A-2 — the response document still said "~35 dimensions" and "thirteen layers" where hand counts give 43 and 14, so the repository enforced one pair of numbers and published another | P2 | **Accepted and fixed, and it is my error twice over.** The wave's own report named both as corrections it had made; I edited that file in the same commit to add the owner correction and left these two standing, which is worse than not having noticed. Both are corrected with a dated note that says what the build now enforces. The approximation was the tell: **a requirement count that has to be estimated has not been counted**, and "~35" should have read as an admission rather than a figure. |
| W18-A-3 — the wave plan said eight proposals carry this brief's weight; the measurement is ten | P3 | **Accepted; the dated figure stands and the correction is recorded.** The plan's sentence is dated 3 September and was true of what I knew when I wrote it — it took the figure from the response document rather than from a count. Rewriting a dated plan to match a later measurement is the move wave 16 was pulled up for (W16-A-1), so the plan keeps its words and the corrected figure lives here and on the screen, where it is computed rather than typed. |

**On the two judgements the round was asked to make**, both are recorded because a
later reader should be able to see they were tested rather than assumed. The
covered-on-proposal verdicts were found defensible because the screen renders the
"by a proposal" marker beside the verdict *at the point of reading*, not only in a
computed tally. And the unsettled period was found **honest rather than evasive**:
both readings with their sources, the third measurement stated expressly as *not* a
tie-break — the auditor re-did that arithmetic, 41 months being longer than both 8
and 12 quarters — the consequence named, and `#crosstab` pre-empting the obvious
error by declaring its own period bar an edit rather than a third reading.

**State at close:** build exit 0 and rebuild byte-identical at the audited hash
(`11c97fa5393115bf1d14c48481ebae46d0fe6146` — the guard change is build-time and
the page does not move on it); verify exit 0 across all nine families; the 23 Aug
census five state counts character-identical; the deferral ledger at two with both
blocks byte-identical; `figures.mjs` untouched, so D13's print-test gate holds.
Wave 18 — the brief as the seventh enumeration, closed by the build rather than
asserted, with the register cross-check that counts a row covered by a proposal
separately, and the saved views settled into one record read by three surfaces — is
closed under §11 on the auditor's round 1 against `88148b6` plus these three fixes.

**What the wave leaves for the next one.** Nothing is deferred and the ledger is
unchanged at two, both decision-gated. The programme's next step is Wave 19, the
governed dataset, which D1 unblocked.
