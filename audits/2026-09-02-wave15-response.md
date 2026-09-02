# Wave 15 — response to the audit, round 1

The round blocked on one P0 in the wave's own settlement class — the rollback
card kept the stale typed 7 and 6 that the activation preview one panel over
had already settled by derivation. Both findings accepted and fixed:

| Finding | Severity | Response |
|---|---|---|
| W15-A-1 — the Rollback card typed "7 re-evaluated / 6 withdrawn" beside an activation panel computing 1 / 0, from the same record | P0 | **Accepted and fixed by the same derivation** — both cards now count off `NON_DETECT.active` and the computed `changed`, through the same values the activation preview reads, and each corrected line records what the card said before. The wave settled the reach and fixed the preview it noticed; the auditor found the sibling card it did not. |
| W15-A-2 — the rendered "three more bottles" dropped the seed's justify-a-summary-row qualifier, reading 3-vs-5 against the 38 → 43 pricing | P3 | **Accepted and fixed at the sentence** — three bottles invented to justify a summary row, five in all against the 38 the receipt reconciled, plus the consignment and the receipt nobody signed. |

**Also this round:** the second-kind-of-absence design was judged sound against
G-25 (no fifth outcome state; every consumer of the notSampled/notAnalysed
split choosing correctly), the seven-record evidence table reproduced in full
including the load-bearing container sum, and the implementer's correction of
the orchestrator's dispatch arithmetic (censored 14 → 9, not 8) was confirmed
right.

**State at close:** build exit 0, rebuild byte-identical (`ece0da75…`), census
character-identical on both clocks; verify exit 0 across all nine families;
the rollback card renders 1 and 0 with both befores stated. Round 2 goes back
to the standing auditor lineage against this commit.
