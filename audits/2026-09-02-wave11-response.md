# Wave 11 — response to the audit, round 1

**The gate passed on the first round — zero P0/P1/P2 — and the W10-A-6 carry
cleared:** the auditor re-derived the 42 and 21 from the spec's own sections and
its own `awk` over the fixture header, confirmed both render exactly once, and
confirmed the wave-11 diff never touched them. The engagement's arithmetic was
recounted by hand, all nine boundary mechanism claims were verified against the
app repo's own files and tests, the vocabulary borrowing was judged real, and
the audit row's external identity was checked as a reference rather than a copy.
Both P3s were right and are fixed in this closing commit:

| Finding | Severity | Response |
|---|---|---|
| W11-A-1 — "Principals seen" computed one qualifier narrower than its printed definition, silently excluding the deprovisioned-but-seen principal | P3 | **Accepted and fixed at the count, not the sentence** — the auditor's first option, for the auditor's own reason: the printed definition says *seen*, a deprovisioned principal was seen, and that the count keeps them is the register's theme — history surviving removal. The Contributors row now reads 3, matching its definition; the auditor binding still correctly reads 0. |
| W11-A-2 — the no-consultancy-identity panel's paraphrase one word stronger than the test's regex ("a person" for `principal`) | P3 | **Accepted and fixed at the word.** The sentence now enumerates the test's own five words, so a hypothetical `person_id` column no longer sits between the claim and its evidence. |

**State at close:** build exit 0, rebuild byte-identical (`1e04df3a…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families. Wave 11 —
the engagement, the boundary in both directions, the four not-in-v1 decisions,
the unified access register, and the W10-A-6 carry — is closed under §11 on the
auditor's round 1 against `d2cef48` plus these two fixes.

**Deferrals carried forward:** the two-clocks record (this wave's, beside the
engagement's dates) and the seven inherited. All recorded in-repo.
