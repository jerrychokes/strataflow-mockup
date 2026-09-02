# Wave 12 — response to the audit, round 1

The round blocked on the pipeline's first P0, and the finding is exactly right:
the wave gave criteria content one arrival path and then left a pre-existing
hand-typed date standing that contradicts it, one screen away, made newly
visible by the wave's own work. All three findings are accepted and fixed:

| Finding | Severity | Response |
|---|---|---|
| W12-A-1 — `#entitlement`'s "2018.1 · loaded 2026-01-14" against `#criteria`'s package arrival of 2024-02-19, a contradiction the wave made live | P0 | **Accepted and fixed by derivation, not by picking a date.** The entitlement row now reads the same `CONFIG_PACKAGE.inForceFrom` record `#criteria` reads — "arrived 2024-02-19 in MOCK-CFG-2024.1" — one source, read twice, with a comment recording what the hand-typed row said and why it could not stand: no package carries 2026-01-14, and the wave's own model gives criteria content no other way in. |
| W12-A-2 — the anchors block claimed the release publishes signed build provenance; the workflow's own Provenance step records attestation is skipped on this repository | P1 | **Accepted and fixed at both sites** — the anchors bullet and the rendered prose now quote the workflow's own words ("skipped on a private user-owned repository, because GitHub does not offer it there"): nothing the release publishes carries signed provenance, configuration included, and the package's checksum-not-signature claim stands on that corrected ground. Both record what their first drafts claimed. The failure mode is wave 10's exactly — an anchors block whose preamble says "nothing below is drawn from memory" carrying one clause that was. |
| W12-A-3 — the bundleGap deferral said the configuration category is "not among them at all"; `#diagnostics`'s intro names it | P3 | **Accepted and fixed** — the record now says what is true: the category is named in the intro and never enumerated in the content rows, and the per-item versions appear nowhere, with the first draft's overclaim recorded. The enumeration gap itself (4 rows vs 8, no checksum on either screen) was measured true and stands. |

**One process note answered:** the resumption message told the auditor its prior
progress "stands in your file" when no findings file yet existed on disk — the
auditor rightly refused to attest to unrecorded work and re-ran the full round.
That was the correct reading, and the orchestrator's message was wrong; the
round's verdict rests entirely on measurements the file records.

**State at close:** build exit 0, rebuild byte-identical (`afb8e5d2…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families. Round 2
goes back to the standing auditor lineage against this commit.

---

# Wave 12 — response to the audit, round 2: closed

**The gate passed — zero P0/P1 — and Wave 12 closes under §11.** Round 2 verified
the P0 closed by reference (both surfaces resolving through one export, zero
occurrences of the hand-typed date), the P1's quotation verbatim against the
workflow, and the regression battery clean. Its two remaining notes are settled
in this closing commit:

| Item | Response |
|---|---|
| W12-A-3, the surviving half — the rendered warn card on `#estate` still said `#diagnostics` names 4 things "and the configuration category is not among them" | **Fixed with the one clause the auditor named:** the card now says the screen names configuration among a bundle's categories and then enumerates four things that never include it — agreeing with the corrected seed record it points to. |
| The precision note — "both record their first drafts" held for the anchors bullet only | **Accepted as stated;** this addendum is the record. The rendered provenance sentence carries the corrected claim without a first-draft footnote, which the auditor judged immaterial to the gate, and the anchors bullet beside it carries the full history. |

**State at close:** build exit 0, rebuild byte-identical (`6d3132ce…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families. Wave 12 —
the configuration package with import as a decision, the estate view framed as
the vendor's, and the first P0 the loop ever raised, fixed by derivation — is
closed on the auditor's round 2 against `783f805` plus this one-clause fix.
