# Wave 1 — response to the audit, round 1

Every finding is answered below; the P1 corrections follow the audit's own validated
recommendations. Division of labour for the record: the fixes were implemented by a
task agent against a written spec, reviewed, re-measured and committed by the
orchestrating session; the re-audit goes back to the auditor that raised the findings.

| Finding | Severity | Response |
|---|---|---|
| W1-A-1 stacked labels overprint values | P1 | **Fixed.** `min-width: 0` dropped, `flex-shrink: 1` kept — the flex default floors the shrink at min-content. And the meter that would have caught it on day one is now in `verify.mjs`: all 916 labelled stacked cells measured against their own min-content at 375px. One correction to the audit's expectation, measured rather than argued: the three `#coverage` "Re-run by" cells were never squeezed — "Re-run" breaks at its hyphen, so the label's min-content is 21px, not 42px, and the cells render on three legible lines (screenshot `375-coverage-rerun-cells.png`). The check therefore measures **min-content**, identical to "longest word" wherever there is no break opportunity, and it still reports 86 failures if the old rule is restored. |
| W1-A-2 coverage prints a stale state claim | P1 | **Fixed.** The sentence is now computed from the register at build time (58 route-backed · 2 CLI · 6 proposals, whatever the register says tomorrow), and the build's banned-phrase check now covers screen-body prose, not just route lines — proven by temporarily restoring the old sentence: the build exits 1 naming `#coverage` and the phrase. |
| W1-A-3 375px activation lands on the rail | P2 | **Accepted and fixed.** `show()` scrolls the activated section under the sticky chrome in the single-column layout, with a `load`-time re-run because the browser's native anchor jump was measured landing last on a cold load. Hash landing and click hops both put the h1 first in the viewport at 375 (screenshots). |
| W1-A-4 two §10 families unscripted | P2 | **Accepted and fixed.** Figure text-collision (all `figures.mjs` output — `svg.mk-fig, svg.sf-map` — 11 figures, 194 nodes) and coarse-pointer touch targets (372 controls, `hasTouch: true` makes `(pointer: coarse)` real, and the check fails if the media query does not match rather than measuring the wrong stylesheet) are in `verify.mjs`, alongside the W1-A-1 meter. |
| W1-A-5 check/switch under 44px | P2 | **Accepted and fixed.** `label.mk-check`, `.mk-radio`, `.mk-switch` join the coarse-pointer 44px floors; deleting the floors makes the new touch check report 15 failures, restoring them makes it green. |
| W1-A-6 map legend overprint | P2 | **Accepted and fixed.** Legend entries take their measured width and share the leftover space, wrapping to a second row rather than overprinting; re-verified by bbox probe (0 collisions across all 11 figures) and by eye. |
| W1-A-7 three inconsistent overflow counts | P3 | **Accepted and fixed.** README now carries the audited counting: fourteen distinct screens, seventeen screen-width instances (11 · 4 · 2), with a line noting what "sixteen" had missed. |
| W1-A-8 rail legend drift | P3 | **Accepted and fixed.** The legend derives from the states present in the register (`now`), a present state with no meaning string fails the build, and the note says the two shipped variants share a dot and hover reveals the 23 August state. |
| W1-A-9 `aria-labelledby=""` | P3 | **Accepted and fixed.** Attribute removed; the `<title>` child names every figure. |

**One new exclusion, recorded rather than hidden** (raised by the implementing agent):
the touch check scopes to active-screen controls, which leaves the catalogue viewer's
own furniture outside it — the rail filter box measures 31px and the top-bar search
23px under a coarse pointer. They are viewer chrome, not product surfaces, and the
exclusion is written into the check's comment with the measured numbers. Deferred as a
viewer-chrome item for the next wave's tooling pass rather than fixed silently.

**State at hand-back to the auditor:** `node build.mjs` exit 0 (body-prose guard, route
guard, partition, link graph, dead hrefs) · `CHROMIUM=… node verify.mjs` exit 0 (66
screens × 3 widths, all seven check families) · rebuild byte-identical · evidence
screenshots in the auditor's scratch area under `…/scratchpad/fixes/`.
