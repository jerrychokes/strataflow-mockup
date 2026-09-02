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

---

# Wave 10 — response to the audit, round 2

Round 2 verified all of round 1's fixes and found the thing my own closure claim
missed: the falsified sentence was mine. Both findings accepted and fixed:

| Finding | Severity | Response |
|---|---|---|
| W10-A-4 — `#formats`' ELDF-4 panel still drew `ChemName` and `Units`, one screen from the corrected mapping | P1 | **Accepted and fixed at the panel.** The two source-field rows now read `ChemCode + OriginalChemName` (lookup on the code, then the name, then fuzzy) and `Result_Unit` — the 23 August illustration corrected to the spec the way the matrix words and the last-sampled dates were, because a drawn record that states a checkable fact wrongly gets a correction, not deference. The response's "zero remaining claims anywhere in the built page" was written off a grep that read the two hits as my own corrections and stopped; the auditor's screenshot was the better instrument, and this addendum is the record that the claim was made and was false. A post-fix sweep now finds the only occurrences of either name to be the mapping rows' own first-draft records and the unrelated "Units and conversion" screen title. |
| W10-A-5 — the Unit row carried no first-draft record while its two siblings do | P3 | **Accepted and fixed** — "The first draft of this row wrote 'Units', a name the thirty published columns do not include (W10-A-1)." |

**State at close:** build exit 0, rebuild byte-identical (`a792aedc…`), the 23 Aug
census state counts unchanged; verify exit 0 across all nine families. Round 3
goes back to the standing auditor lineage against this commit.
