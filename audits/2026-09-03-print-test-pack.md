# The print test — what to do, and what it decides (G-76b, D13)

**Yours to run. It gates three approved figure families**, and it is the one
outstanding item that gets cheaper the sooner it happens. Written 3 September
2026, from the frozen grammar's own account of what it never verified.

It concerns the **app repository's** approved renderings, not the mockup's. The
mockup draws to that grammar and inherits its caveat; nothing here changes a
mockup file.

## Why now rather than later

D2 approved FP-1 (depth profile), FP-2 (head contours) and FP-3 (Durov). D13 put
this test in front of all three. That ordering is the whole point: **a grammar
fault found now is found once; found after three families are drawn to it, it is
found three times and each has a reference rendering to re-approve.**

## What the grammar says it never checked — in its own words

`docs/design/figure-grammar.md` §6 is unusually honest and should be read before
the test rather than after. It records what *was* verified — every figure
rasterised and looked at at 180 mm, all three candidates compared in colour and
with the colour taken out, a greyscale pass that changed nothing — and then:

> **No print.** Nothing here has been on paper, and print is the whole
> constraint. A 0.13 mm dotted gridline is a real hairline on a 600 dpi office
> laser and may be nothing on a 300 dpi one.
>
> **No Word template.** QB-1 is *placed unedited into a customer's template*, and
> no customer template exists to place one into.
>
> **No practitioner.** Convention is being asserted from published figures and
> from the domain literature, not confirmed by somebody who submits these for a
> living.

§7.4's instruction was **"Do not commit S5 effort on B3 until that has
happened"**, and the record states plainly that the instruction was overridden by
an explicit decision rather than satisfied.

## The test

**Time:** an afternoon. **Materials:** the approved renderings, a customer Word
template if one can be borrowed, an office laser printer, and a photocopier.

1. **Place, unedited.** Put the plates into a Word template at 180 mm column
   width and change nothing. Any edit needed to make one sit correctly is
   already a finding — QB-1 is *placed unedited*, so an adjustment is a failure
   rather than a fix.
2. **Print at both resolutions.** 600 dpi and 300 dpi. The grammar names this
   difference itself as the thing it could not predict.
3. **Photocopy one page.** Two of the four state marks make a claim that only a
   photocopier can settle: *a pattern survives a photocopier; a tint does not*.
4. **Then look**, against the list below.

### Which plates, and why these

Print all twelve if there is time. If there is not, these four exercise the most
rules per page:

| Plate | What it puts on trial |
|---|---|
| **Censored series** | All three censoring rules at once — the open downward triangle at the limit of reporting, the limit as its own stepped line, and the trace breaking between a detect and a non-detect |
| **Hydrograph comparison** | Series identity twice over: four shapes against four dash patterns, plus the legend placed in the emptiest quadrant and markers on every fourth reading |
| **Crosstab** | The four state marks at their smallest — and the photocopy test |
| **Piper** | The densest labelling, and the projection that was drawn wrong twice during authoring |

### What to look at, in order of what print is most likely to break

Each of these is a specific claim the grammar makes. A tick is not the point; a
sentence about what you saw is.

1. **Gridlines — 0.13 mm, dotted `1 1`.** Present enough to read a value off,
   faint enough never to compete with a series. This is the grammar's own
   nominated failure. Check both resolutions: a hairline that disappears at 300
   dpi and one that reads as solid grey at 600 dpi are two different faults.
2. **Frame and ticks — 0.28 mm, ticks inward at 1.4 mm.** Does the frame hold at
   print weight without dominating?
3. **The 2 mm axis inset.** A marker at either end of a series should sit
   *inside* the plot, not on the rule. Print is where an inset that looked
   generous on screen turns out not to be.
4. **Series identity without colour.** Photocopy first, then read: can four
   series be told apart by shape and dash alone? The greyscale pass says yes on
   screen; a photocopier is a harsher instrument than a desaturation filter.
5. **The four state marks.** The thin outline square must stay the quietest
   thing on the page; the white upward chevron must not fill in; **the 45° hatch
   must survive the copier** — it was chosen over a tint for exactly this; the
   dashed outline for `not_evaluated` must remain the lightest and smallest
   without vanishing, because it is the commonest outcome in a real round.
6. **Censoring, all three rules.** Is the open downward triangle legible at
   print size? Does the stepped limit line read as a step rather than as a
   feature of the data? Is the break between a detect and a non-detect visible
   as a break?
7. **Direct labels and the provenance line.** Both were found clipped during
   authoring and fixed by looking. Print at a real column width is where the
   fix is confirmed or found insufficient.
8. **Marker density.** Every fourth reading on a dense series: caterpillar at
   one extreme, indistinguishable crossings at the other. Which does print
   look like?

## What a result means

- **It holds.** Record that in `docs/design/figure-grammar.md` §6, replacing the
  "No print / No Word template" bullets with what was done. FP-1, FP-2 and FP-3
  are then clear to be drawn, and the mockup's inherited caveat can come off the
  screens that carry it.
- **Something fails.** Fix the grammar and **re-approve the rendering, do not
  adjust a test** — the grammar's own instruction, and the mechanism is
  `node design/promote-figures.mjs <id> --replace` with the reason recorded in §6.
  This is why the ordering matters: the three approved families are undrawn, so
  a change now costs one re-approval per affected plate instead of one per plate
  plus three new ones.
- **It is inconclusive** — no customer template available, no photocopier. Record
  what was and was not done. A partial print is worth more than none, and §6 is
  the right place for a partial answer, honestly bounded.

## The one thing not to do

Do not adjust a reference rendering to match what printed badly. G-77's claim is
that an unreviewed visual change fails CI, and that holds however the baseline
was arrived at — but the grammar also warns that **a rendering that was wrong at
approval is now wrong and defended.** Print is the instrument for telling those
two apart, and it only works if the answer is allowed to be *the grammar was
wrong*.

## Its sibling, which is not this

The **second practitioner walk** (also D13) is a different act with a different
question, and it sits between Wave 23 and Wave 24a rather than in front of the
figure families. The print test asks *does this ink survive paper*. The walk asks
*is this the right thing to draw*. Doing one does not answer the other, and the
grammar's §6 lists them as two of its three missing verifications, not one.
