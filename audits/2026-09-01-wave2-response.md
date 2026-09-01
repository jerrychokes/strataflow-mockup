# Wave 2 — response to the audit, round 1

The gate passed on the auditor's first round: zero P0, P1 and P2. One P3 was raised
and it was right, so it was fixed in the closing commit rather than deferred:

| Finding | Severity | Response |
|---|---|---|
| W2-A-1 — receipt says "seals intact · 2 of 2" while the seal-number question is visible only on the chain | P3 | **Accepted and fixed.** The check row now says integrity and identity are different checks — integrity passed, one seal *number* is in question, and the question is held on the chain of custody — with a link to `#ecoc`. Two surfaces disagreeing about custody is claim B5's documented failure, which is why a P3 got fixed on the spot. Applied by the reviewing session (a one-line seed note plus a two-line renderer addition); build and verify green after. |

Everything else the wave claimed was independently reproduced by the auditor: the
register handled the stateless new screen honestly, Journey 1 covered with fifteen
owned steps, the window-condition runs and the outlier statistics recomputed from the
seed and matching every rendered figure, receipt's custody rows proven to be a filter
of the chain rather than a copy, the eighteen touch-target fixes reproduced exactly by
deleting them in a scratch copy, and a byte-identical rebuild. Wave 2 is closed under
§11.
