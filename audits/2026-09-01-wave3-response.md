# Wave 3 — response to the audit, round 1

The gate passed on the auditor's first round: zero P0, P1 and P2, a 49-of-49
independent recount across every cascade hop, and the staged-not-written property
verified in both directions. The two P3s were both right and both fixed in the
closing commit rather than deferred:

| Finding | Severity | Response |
|---|---|---|
| W3-A-1 — exceedances, tarp and supersession carry no staged-amendment flag while the preview surfaces do | P3 | **Accepted and fixed.** All three registers now carry a one-line note — the amendment is staged on the certificate, nothing here has moved because a locked period refuses the write, and what *would* change if it is accepted — with the counts read from `AMENDMENT` so the note and the decision table cannot drift. Two surfaces disagreeing about whether a number is settled is the custody failure again, one register over. |
| W3-A-2 — the prose guard cannot see "there is no route for one" | P3 | **Accepted and fixed.** "no route" is banned in every phrasing now, with one scoped exemption: a `proposed` screen may state what the product lacks, because its argument requires it — and the exemption dissolves the day the register flips that screen to shipped, which is exactly when the sentence starts to rot. |

## On W1-A-11 — the disputed "Round 2" attribution, resolved by the orchestration record

The auditor flagged the wave-1 Round 2 section as written by "another session sharing
my scratchpad" and re-measured everything from scratch. The orchestration record
settles the origin: that section was produced by **the same auditor task lineage**,
resumed for round 2 on 1 September at ~11:26–11:34 and reporting its verdict through
the same task id that produced round 1 — the timeline the auditor reconstructed
(fix commit 11:26:47, evidence 11:32, commit 11:34:25) is that resumption's own run,
committed by the orchestrator with the response note. What the flag actually caught
is that a **resumed agent does not always carry memory of its earlier resumptions**,
so a later self can honestly fail to recognise its own work. The auditor behaved
exactly as it should with what it could see — flag first, re-measure regardless —
and every technical claim survived the fresh measurement, so the wave-1 verdict
stands twice over. Recorded here rather than edited into the auditor's file, which
stays the auditor's.

**State at close:** build and verify exit 0 (nine families) with both P3 fixes in;
one pre-existing seed literal on `batches` fixed by the reviewer in the wave commit.
Wave 3 is closed under §11: zero P0/P1 open.
