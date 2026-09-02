# Wave 10 — response to the audit, round 1

The gate did not pass — two P1s, both in the wave's own evidence discipline, both
caught by reading the spec one line further than the implementation did. All
three findings are accepted and fixed in this commit:

| Finding | Severity | Response |
|---|---|---|
| W10-A-1 — three "established" mapping rows with no stating source, two contradicted by the spec their neighbours cite | P1 | **Accepted and fixed at all four sites.** The Analyte row writes `ChemCode + OriginalChemName` (the spec's two fields, key and name); the Unit row writes `Result_Unit` with the distinct-from-`Detection_Limit_Units` note; the Validation-state row moves to **Refused** with the honest basis — no published column carries it, and writing this instance's own column name into somebody else's file would invent a field. The inbound ESdat record's *preserves* sentence loses the validation-state claim and its *cannot-carry* gains it, naming `Validation_Status` on the legacy system export as the format that genuinely carries one. Each corrected row records what its first draft claimed. The tier counts derived (13 / 4 / 6); the README's typed counts now match. **Rider found while fixing:** the pre-existing quarantine row cited "format field validation_state · ESdat ELDF-4" — the same nonexistent field, in the repo since 23 August — and now cites `Validation_Status · ESdat export vocabulary`, the column the evidence supports. |
| W10-A-2 — the field-duplicate loss claimed the format loses a link its own Sample file carries | P1 | **Accepted and fixed at both sentences.** `Parent_Sample` is named in the checked text and written by the export; the loss is restated as the type — a `Normal` row with a filled `Parent_Sample` reaches the receiver as a parented sample of undefined kind, so the RPD pairing's *meaning* is lost while its *link* survives. The reconciliation row (5 → 1 QC-coded) was correct as drawn and is unchanged. |
| W10-A-3 — "estate" surviving in two code comments | P3 | **Accepted and fixed** — "the inventory table" in both. |

**State at close:** build exit 0, rebuild byte-identical (`3c217ac6…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families with the
fixes in; zero remaining claims of `ChemName`, `Units` or an ELDF validation
column anywhere in the built page. Round 2 goes back to the standing auditor
lineage against this commit.
