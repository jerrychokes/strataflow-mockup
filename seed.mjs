/**
 * The mockup's dataset — one coherent fictional site, read by every screen.
 *
 * Consistency is the whole point. A high-fidelity mockup whose bore reads 28.4
 * on the crosstab and 24.8 on the hydrograph is a mockup that teaches people to
 * distrust it, and the first thing a practitioner does with a demo is check
 * whether two screens agree. So there is one dataset here and every screen
 * derives from it.
 *
 * ## The cast continues the approved oracle rather than inventing one
 *
 * `design/reference/screens/results-crosstab.html` was approved on 18 August
 * with bores MW01A/MW03B/MW05/MW07/MW09, round 2026-Q2-GW, certificate
 * PAS2026-04417 and licence L8842/2019/1. Those names are reused here verbatim,
 * so the mockup and the oracle can be put side by side without a reader having
 * to work out whether two different sites are being shown.
 *
 * The site name follows `fixtures/partner/` — Wandalup, `MOCK-` prefixed, on
 * the G-71 convention that fictional data must be unmistakably fictional. A
 * screenshot of this mockup must never be mistaken for a real operator's data.
 *
 * ## Every number is deterministic
 *
 * No `Math.random()`. The series below come from a seeded generator, so a
 * rebuild produces a byte-identical file and a visual diff means something
 * changed rather than that the dice rolled differently.
 */

/** Mulberry32 — small, fast, and the same sequence on every machine. */
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PROJECT = {
  code: 'MOCK-WDL',
  name: 'Wandalup Operations',
  operator: 'Wandalup Resources Pty Ltd',
  facility: 'Wandalup mine and TSF',
  jurisdiction: 'Western Australia — DWER',
  licence: 'L8842/2019/1',
  timezone: 'Australia/Perth',
  crs: 'GDA2020 / MGA zone 50 (EPSG:7850)',
};

/**
 * The day every countdown on this seed is measured from.
 *
 * It is a constant rather than `Date.now()` for the reason the header states —
 * a rebuild must be byte-identical — and it is **2026-05-24** because that is
 * the date the obligation register's typed remainders were written against.
 * Six of the seven re-derive from it exactly (129 · 160 · 82 · 65 · 37 · 114
 * days), which is how it was established rather than chosen.
 *
 * The seventh did not, and it does now — **resolved 1 September 2026** (wave 6,
 * rider 3). The 2026 Q2 round closed on 2026-05-14 and six screens called it
 * *nine* days overdue, which is as-at 2026-05-23 rather than 2026-05-24. The
 * earlier version of this comment recorded the disagreement and left it,
 * because correcting it meant editing prose on screens outside that wave. The
 * fix is `Q2_OVERDUE` below: the number is now **derived** from `AS_AT` like
 * the other six, so it reads **ten**, and no screen types it.
 *
 * `WATER.asAt` still reads 2026-05-23 and that is not the same claim. It is
 * the day a meter totaliser was read — a reading date on a record — not a
 * board-wide as-at, and the year-elapsed arithmetic on `#water` is measured
 * from it deliberately. Nothing below claims a board-wide as-at date but this
 * constant.
 */
export const AS_AT = '2026-05-24';

/** Whole days between two ISO dates, at UTC midnight. No clock is read. */
export function daysBetween(from, to) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

/**
 * The 2026 Q2 round's overdue countdown, derived once and read everywhere.
 *
 * Six screens typed "nine days" and one seed comment documented that the
 * number implied a different as-at date from the rest of the board. Typing it
 * seven times is what let the two drift, so it is computed here and the
 * screens read `days` — the arithmetic is `2026-05-14` to `AS_AT`, the same
 * subtraction every other countdown on the board makes.
 */
export const Q2_OVERDUE = (() => {
  const due = '2026-05-14';
  const days = daysBetween(due, AS_AT);
  return {
    round: '2026-Q2-GW',
    location: 'MW11',
    due,
    days,
    /** "overdue by 10 days", for prose that wants the phrase rather than the number. */
    phrase: `overdue by ${days} days`,
    /** "10 days overdue", for a register cell that leads with the count. */
    chip: `overdue ${days} days`,
  };
})();

/**
 * The second project — small, quiet, and the reason a portfolio can be drawn.
 *
 * Journey 9 (portfolio → evidence) was blocked from the fourth pass onward on
 * one sentence: *a one-site seed cannot draw a portfolio honestly*. Four rows
 * of typed project metadata were not a portfolio, they were four rows of typed
 * numbers — `locations: 9` on Wandalup while the register held fourteen, and
 * `open: 0` on three sites nothing backed. A cross-project count drawn by hand
 * is the defect this file exists to prevent, and it was sitting on the one
 * screen the portfolio journey starts at.
 *
 * So there are two projects now and both are real. This one is deliberately
 * **small**: four bores, four rounds, eight chloride results. It is a
 * counterweight, not a second Wandalup, and its scale is what lets the noisy
 * first site stay legible beside it.
 *
 * ## One customer, two sites, two bindings
 *
 * The instance is single-tenant (DR-1), so both projects belong to the same
 * operator — Kurrajong is the borefield Wandalup's plant and village draw
 * their water from, 38 km north-west of the mine, on its own licence to take
 * water. What differs is the **binding**: A. Nakamura is a Contributor at
 * Wandalup and an Approver here, which is the whole reason the role sits on
 * the row of the project list.
 *
 * ## Two live facts, and the second is the first one's consequence
 *
 * **Chloride at KRJ-MW03 is above the operating strategy's trigger value and
 * nobody has acknowledged it** — for 199 days. **The round that would say
 * whether it was a step or a spike is 24 days overdue.** They compound: the
 * exceedance was never acknowledged, so the response it obliged was never
 * lodged, and the round that would have resolved it was never collected. That
 * is what a portfolio view is *for* — a site nobody opens looks quiet from
 * inside itself, and only a surface that crosses projects can say otherwise.
 *
 * Every number below is derived from the values beside it: the factor from the
 * value and the trigger, the response deadline from the evaluation date and
 * the condition's own thirty days, every countdown from `AS_AT`.
 */
export const KURRAJONG = (() => {
  const code = 'MOCK-KRJ';
  const trigger = 500; // mg/L chloride, the operating strategy's own value

  /*
   * Four bores, and the codes carry the project prefix. Two sites under one
   * customer will reuse a bore number sooner or later, and a register where
   * only a column tells MW03 from MW03 is a register that will be read wrong
   * in a hurry.
   */
  const bores = [
    { code: 'KRJ-MW01', klass: 'groundwater', role: 'Monitoring — northern sentinel, upgradient of the borefield', chloride: [210, 224] },
    { code: 'KRJ-MW02', klass: 'groundwater', role: 'Monitoring — borefield centre', chloride: [388, 455] },
    { code: 'KRJ-MW03', klass: 'groundwater', role: 'Monitoring — southern sentinel, between the borefield and the palaeochannel', chloride: [486, 742] },
    { code: 'KRJ-PB01', klass: 'production_bore', role: 'Production — the supply bore the plant and the village draw from', chloride: [301, 336] },
  ];

  /*
   * Six-monthly, post-wet and late-dry. `collected: null` is what makes the
   * third row a *missed* round rather than an absent one — the glossary's
   * `overdue`, written when the period ended rather than when somebody looked.
   */
  const rounds = [
    { code: '2025-H1-GW', label: '2025 H1', period: '1 Nov 2024 – 30 Apr 2025', due: '2025-04-30', collected: '2025-04-09', evaluated: '2025-05-02', state: 'satisfied' },
    { code: '2025-H2-GW', label: '2025 H2', period: '1 May – 31 Oct 2025', due: '2025-10-31', collected: '2025-10-14', evaluated: '2025-11-06', state: 'satisfied' },
    { code: '2026-H1-GW', label: '2026 H1', period: '1 Nov 2025 – 30 Apr 2026', due: '2026-04-30', collected: null, evaluated: null, state: 'overdue' },
    { code: '2026-H2-GW', label: '2026 H2', period: '1 May – 31 Oct 2026', due: '2026-10-31', collected: null, evaluated: null, state: 'due' },
  ];
  const collected = rounds.filter((r) => r.collected);
  const latest = collected.at(-1);
  const overdueRound = rounds.find((r) => r.state === 'overdue');
  const nextRound = rounds.find((r) => r.state === 'due');

  /* One outcome per bore on the latest collected round, computed. */
  const results = bores.map((b) => {
    const value = b.chloride.at(-1);
    const previous = b.chloride.at(-2);
    return {
      ...b,
      value,
      previous,
      outcome: value > trigger ? 'exceedance' : 'compliant',
      factor: value > trigger ? `${(value / trigger).toFixed(1)}×` : '—',
    };
  });
  const above = results.filter((r) => r.outcome === 'exceedance');

  const e = above[0];
  const exceedance = {
    location: e.code,
    analyte: 'Chloride',
    unit: 'mg/L',
    value: `${e.value} mg/L`,
    previous: `${e.previous} mg/L`,
    criterion: `Kurrajong groundwater operating strategy · trigger 500 mg/L`,
    factor: e.factor,
    round: latest.code,
    evaluated: latest.evaluated,
    /* `open` is the register's word for an exceedance nobody has acknowledged. */
    state: 'open',
    openDays: daysBetween(latest.evaluated, AS_AT),
    run: 'first — the round before it read 486 mg/L, under the trigger',
    says:
      'Chloride at the southern sentinel rose 256 mg/L in one six-month step, and the sentinel is there to see the palaeochannel arriving before the supply bore does. One round is not a trend and the next round is the test — which is the round that has not been collected.',
  };

  /*
   * Three obligations seeded, and a fourth *derived from the exceedance*: the
   * operating strategy gives thirty days from evaluation to lodge a written
   * response, so the deadline is arithmetic on the exceedance rather than a
   * date somebody typed beside it, and its state falls out of whether that
   * date has passed while the exceedance is still unacknowledged.
   */
  const responseDue = new Date(Date.parse(`${exceedance.evaluated}T00:00:00Z`) + 30 * 86_400_000)
    .toISOString()
    .slice(0, 10);
  const remaining = (dueOn) => {
    const n = daysBetween(AS_AT, dueOn);
    return n < 0 ? `overdue by ${-n} days` : `${n} days`;
  };
  const stateFor = (dueOn) => (daysBetween(AS_AT, dueOn) < 0 ? 'overdue' : 'on track');

  const obligations = [
    {
      what: `Operating strategy trigger response — chloride at ${exceedance.location}`,
      to: 'DWER — water licensing', kind: 'response',
      due: responseDue, dueOn: responseDue, remaining: remaining(responseDue), state: stateFor(responseDue),
      owner: '— unassigned',
      basis: 'GWL121904(1) condition 8 — a trigger value exceeded obliges a written response within 30 days of the evaluation',
    },
    {
      what: `Six-monthly groundwater monitoring — ${overdueRound.label}`,
      to: 'Internal programme', kind: 'round',
      due: overdueRound.due, dueOn: overdueRound.due, remaining: remaining(overdueRound.due), state: stateFor(overdueRound.due),
      owner: 'A. Nakamura',
      basis: 'Sampling programme KRJ-BIA — GWL121904(1) condition 8',
    },
    {
      what: 'Groundwater operating strategy — annual review',
      to: 'DWER — water licensing', kind: 'report',
      due: '2026-08-31', dueOn: '2026-08-31', remaining: remaining('2026-08-31'), state: stateFor('2026-08-31'),
      owner: 'D. Okafor',
      basis: 'GWL121904(1) condition 12 — the strategy is reviewed annually and the review lodged',
    },
    {
      what: `Six-monthly groundwater monitoring — ${nextRound.label}`,
      to: 'Internal programme', kind: 'round',
      due: nextRound.due, dueOn: nextRound.due, remaining: remaining(nextRound.due), state: stateFor(nextRound.due),
      owner: 'A. Nakamura',
      basis: 'Sampling programme KRJ-BIA — GWL121904(1) condition 8',
    },
  ].map((o) => ({ ...o, project: code }));

  return {
    code,
    name: 'Kurrajong Borefield',
    operator: PROJECT.operator,
    facility: 'Kurrajong water supply borefield',
    jurisdiction: PROJECT.jurisdiction,
    licence: 'GWL121904(1)',
    licenceKind: 'Licence to take water — s5C, Rights in Water and Irrigation Act 1914 (WA)',
    timezone: PROJECT.timezone,
    crs: PROJECT.crs,
    role: 'Approver',
    where: '38 km north-west of the Wandalup mine — the borefield the plant and the accommodation village draw from',
    programme: { code: 'KRJ-BIA', frequency: 'biannual', label: 'Six-monthly groundwater monitoring' },
    criteriaSet: 'Kurrajong groundwater operating strategy — trigger values',
    criteriaVersion: '2021.1',
    criteriaSource: 'GWL121904(1) condition 8',
    trigger,
    bores,
    rounds,
    results,
    aboveTrigger: above.length,
    exceedance,
    overdueRound,
    nextRound,
    obligations,
    /*
     * What this catalogue does *not* draw, said once and read wherever the
     * project appears. Every other screen here renders MOCK-WDL's workspace;
     * this project has no location register, no crosstab and no report of its
     * own, and a row that linked into Wandalup's would be the scope confusion
     * the search screen already warns about.
     */
    drawn: false,
    notDrawn:
      'Its workspace is not drawn in this catalogue. Crossing into it is a scope switch rather than a link — the header, the section strip and what every screen is about all change — so the cross-project surfaces below stop at the switch and say so.',
  };
})();

export const PRINCIPAL = (() => {
  /*
   * A role binding is per project (glossary: *role binding*), so a principal
   * has as many as they have projects. `roleBinding` is the binding **in the
   * current scope** — the one the top bar shows — and it is derived from the
   * list rather than typed beside it, because a header naming a role the
   * project list disagrees with is the two-surfaces failure at its most
   * embarrassing.
   */
  const bindings = [
    { project: PROJECT.code, role: 'Contributor' },
    { project: KURRAJONG.code, role: KURRAJONG.role },
  ];
  const current = bindings.find((b) => b.project === PROJECT.code);
  return {
    name: 'A. Nakamura',
    role: 'Hydrogeologist',
    subject: 'anakamura@wandalup.example',
    bindings,
    roleBinding: `${current.role} · ${current.project}`,
  };
})();

/**
 * The external-party engagement — wave 11, and the seam the PRD kept.
 *
 * OD-2 is **out of v1**: the app repo's PRD §14 resolves it "Single operator,
 * single organisation. Project-scoped RLS is kept as the seam; the
 * external-party dimension is added at S8 when a consultancy customer is
 * real", and §4.3 says consultants "are **not first-class users in v1**".
 * Nothing below reschedules that. What is drawn is the *seam* — a consultancy
 * reaching one project through the same scoping every internal principal
 * already goes through, and an explicit list of what v1 does not have.
 *
 * ## "Engagement" is borrowed, not minted (§5.9, QB-9)
 *
 * It is **not** a `docs/GLOSSARY.md` entry, and this record does not claim it
 * is. It is the app repo's own word for this thing, in two places that are not
 * prose about the future but comments beside the code the S8 change lands in:
 *
 *   - `apps/web/lib/authz/scope.ts`, on `Grant` — "`from`/`until`  the
 *     **engagement window**, so access ends with the contract rather than with
 *     someone remembering to revoke it (G-62)";
 *   - the same file, in `scopePredicate` — "the grants are OR-ed together,
 *     because a principal may hold several **engagements** at once";
 *   - `packages/db/src/rls.ts`, on `ProjectScope` — "When G-62 adds the
 *     facility subset and the engagement window…".
 *
 * `docs/GOALS.md` G-62 is the goal itself — *External-party and consultancy
 * access* — and its outcome names "scoped sharing by site and period,
 * contract-transition revocation with work products retained by the operator".
 * So the catalogue spends no new word here: the nouns are *external party*,
 * *engagement*, *engagement window*, and every role word below is the
 * glossary's own closed set of four — reader, contributor, approver, auditor.
 *
 * Two more words, and neither is an abstraction over an established concept
 * (QB-9). **Party** is G-62's own noun — its title is *External-party and
 * consultancy access* — and the glossary's only use of the bare word is the
 * generic one in *custody transfer* ("from one party to another"), so nothing
 * is being overloaded. **Sponsor** is not in the glossary at all and is not
 * proposed for it: it is the plain word for the person inside the operator
 * who owns the engagement, it names no schema column and no role, and the
 * closed set of four roles is untouched by it. The `by` column the membership
 * register already has is what it renders into.
 *
 * The words this record deliberately does **not** use: *tenant* for the
 * consultancy (a tenant is the deployment's own Entra tenant, and this
 * instance is pinned to exactly one), *client* (the operator is the customer;
 * the consultancy's clients are nobody's business here), *viewer* (wave 5
 * settled Reader), and *estate*, which wave 10 recorded as already spent on
 * the deployment portfolio.
 *
 * ## The party is fictional by construction
 *
 * Wave 9's recorded convention: `MOCK-` marks *this instance's own artefacts*
 * — project codes, the purchase-order reference, the engagement identifier —
 * while a fictional *party* is marked by being obviously fictional, as
 * `Pilbara Analytical Services` and `Tallering Metals Pty Ltd` are. This one
 * carries a second, structural marker as well: every identity sits on
 * `coolibah.example`, and `.example` is a reserved TLD that can never resolve
 * (RFC 2606), exactly as the operator's own `wandalup.example` does.
 *
 * ## Every date below is derived from AS_AT, and one is not
 *
 * `granted` and `ends` are the contract's two dates and are literals, like
 * every other instrument date in this seed. Everything else — the term, the
 * time elapsed, the time left, the notice date, the lifecycle state — is
 * arithmetic on those two and `AS_AT`, so no screen types a countdown.
 */
export const ENGAGEMENT = (() => {
  /** ISO date arithmetic at UTC midnight. No clock is read; a rebuild is identical. */
  const addDays = (iso, n) =>
    new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);

  const party = {
    name: 'Coolibah Environmental Pty Ltd',
    kind: 'Environmental consultancy',
    domain: 'coolibah.example',
    based: 'Perth, Western Australia',
    engagedFor: 'Groundwater validation, interpretation and quarterly reporting',
  };

  /* The contract's two dates. Everything else is arithmetic on them. */
  const granted = '2026-03-02';
  const ends = '2026-06-19';
  /** The agreement's own term: an extension is agreed this many days out, or it ends. */
  const noticeDays = 30;

  const termDays = daysBetween(granted, ends);
  const elapsedDays = daysBetween(granted, AS_AT);
  const daysLeft = daysBetween(AS_AT, ends);
  const noticeFrom = addDays(ends, -noticeDays);
  const noticePassedBy = daysBetween(noticeFrom, AS_AT);

  /*
   * The lifecycle, and the state is computed rather than stored. `expiring`
   * is not a fifth thing that happens to an engagement — it is `active`
   * inside the notice window, which is the only definition that cannot drift
   * from the dates beside it.
   */
  const state = daysLeft < 0 ? 'ended' : daysLeft <= noticeDays ? 'expiring' : 'active';

  /*
   * ## SETTLED (wave 13) — 2 September 2026, on a record made 2 September
   * 2026 (wave 11)
   *
   * The record is kept whole and the landed-note is at the end of it, because
   * a debt that vanishes when it is paid leaves nobody able to tell a settled
   * one from one that was never noticed. What wave 11 wrote, unedited:
   *
   * **This catalogue runs on two clocks, and the membership register is on
   * the other one from every countdown.** `AS_AT` is 2026-05-24 and every
   * countdown in this seed measures from it. But `MEMBERS` carries six
   * `lastSeen` values in July and August 2026 — up to 91 days *after* the
   * as-at date — and `ENTITLEMENT.remaining` is a typed `130 days`, which is
   * 2026-08-23 → 2026-12-31 rather than anything `AS_AT` produces. The
   * project and monitoring surfaces are dated 24 May 2026; the instance and
   * administration surfaces are dated 23 August 2026, the day they were first
   * drawn.
   *
   * **Where it bites here.** This engagement is on the `AS_AT` clock, as the
   * wave requires — 26 days left as at 2026-05-24, every number derived. So
   * its two principals were last seen in May while the operator's four were
   * last seen in August, and a reader comparing the two halves of one
   * membership table is reading two different days.
   *
   * **Why it is not fixed here.** Closing it means either moving `AS_AT` —
   * which re-derives every countdown on the obligations board, the programme,
   * the notification and the holding-time clocks, and would change numbers on
   * screens no wave has opened — or moving the August literals on
   * `#project-settings`, `#entitlement`, `#instance` and `#narrative`, which
   * are four screens outside this wave. It is the same shape as wave 6's
   * rider 3, which recorded a *one-day* disagreement rather than editing prose
   * on six screens outside its wave; this one is 91 days and the same rule
   * applies. Recorded rather than guessed at, and the engagement states its
   * own as-at date on its face so no reader has to infer which clock it is on.
   *
   * ## What closed it, and what did not
   *
   * Settled on the terms this record's own last sentence set: **what the
   * engagement did on its face, every face does now.** `OPS_CLOCK` (declared
   * beside `OPS_AS_AT`) is the sentence, written once, and every surface that
   * draws an administration-clock date or countdown renders it — sixteen of
   * them, including the membership register's *last seen* on both screens that
   * draw it, the saved views' *last used*, the instance's scheduler tick, the
   * backup and drill dates on the diagnostics and upgrade screens, the
   * document chain's *verified on read*, and the entitlement's countdown. The
   * estate and the package boards had stated their own as-at since they were
   * drawn and now carry the same phrase as the other thirteen
   *
   * **`ENTITLEMENT.remaining` is derived**, from `OPS_AS_AT` and the term's own
   * end date: 2026-08-23 → 2026-12-31 is 130 days, which is what the string
   * said, so the number does not move and the typing does.
   *
   * **Moving `AS_AT` is still not done, and the reason is the one above,
   * unchanged.** The 91-day disagreement between the two halves of the
   * membership table is still 91 days. What is settled is that both halves say
   * which day they are measured from, which is the difference between two
   * clocks stated and two clocks discovered.
   */

  const binding = {
    group: 'SG-Strataflow-WDL-Ext-Coolibah',
    role: 'Contributor',
    project: PROJECT.code,
    sponsor: 'R. Whitmore',
    sponsorTitle: 'Environmental Lead — Approver at MOCK-WDL',
    /*
     * Its own group, and that is the load-bearing part rather than a
     * tidiness preference. Adding the consultancy to the operator's own
     * `SG-Strataflow-WDL-Contributors` would make ending the engagement a
     * matter of finding two people inside a group of six; a group of its own
     * means the whole engagement is emptied in one act that touches no
     * internal binding at all.
     */
    whyOwnGroup:
      'A group of its own, never the operator’s Contributors group: ending the engagement is then one act on one group, and no internal binding is touched by it.',
    /*
     * Contributor rather than Reader, and the reason is drawn rather than
     * asserted. The scope of work is to *validate* the round — which is a
     * write, a transition with a principal on it — and to draft the section.
     * A Reader binding would have been the smaller grant and would also have
     * drawn an empty answer to the question this wave asks of the trail: the
     * audit record is a record of mutations (ADR-0014), and a principal who
     * writes nothing appears in it not at all.
     */
    whyContributor:
      'Validating a result is a write with a principal on it, and drafting a section is a write too. Reader would have been the smaller grant and would have left the trail with nothing to answer “what did the consultants touch” with — the trail records mutations.',
  };

  const people = [
    { name: 'L. Broadbent', title: 'Senior hydrogeologist', local: 'lbroadbent', lastSeen: '2026-05-22 11:31 AWST' },
    { name: 'P. Sotiriou', title: 'Environmental scientist', local: 'psotiriou', lastSeen: '2026-05-19 14:07 AWST' },
  ].map((p) => ({ ...p, identity: `${p.local}@${party.domain}` }));

  /*
   * The consultant's principal, built in the same shape as `PRINCIPAL` and
   * from the same fields — because *that is the claim*. Nothing about an
   * external principal is a different kind of object: it is a subject, a
   * display name and a list of role bindings, and the only difference is that
   * the list has one entry instead of two.
   */
  const asPrincipal = {
    name: people[0].name,
    role: people[0].title,
    subject: people[0].identity,
    bindings: [{ project: binding.project, role: binding.role }],
  };

  const lifecycle = [
    { name: 'Proposed', detail: `Scope of work agreed under ${'MOCK-WDL-PO-2214'}; the group does not exist yet and nothing is reachable.`, on: '2026-02-18', state: 'done' },
    { name: 'Active', detail: `The group is created and the binding written. ${elapsedDays} days ago.`, on: granted, state: 'done' },
    { name: 'Expiring', detail: `Inside the ${noticeDays}-day notice window — an extension is agreed by now or the engagement ends on its date.`, on: noticeFrom, state: 'run' },
    { name: 'Ended', detail: `The group is emptied. Access stops at the next request; every row already written keeps its principal.`, on: ends, state: 'wait' },
  ];

  /**
   * What the party sees — and every row is the mechanism an internal
   * principal already goes through, named, with nothing bespoke in it.
   */
  const sees = [
    {
      what: 'The project’s records — locations, samples, results, criteria, exceedances, figures, the draft report',
      how: 'The same repository layer every screen reads through. A read narrows through one predicate and no repository writes a project filter of its own.',
      same: 'Identical to an internal Contributor',
    },
    {
      what: 'The trail of any row it can read',
      how: 'A trail is readable exactly when its subject row is — the read walks back to the row and applies that row’s own scope, so there is no second rule to get wrong.',
      same: 'Identical to an internal Contributor',
    },
    {
      what: 'Every control a Contributor binding carries — import, review, validate, qualify, produce figures',
      how: 'The role decides, not the party. Contributor is one of the closed set of four, and this binding is one of them like any other.',
      same: 'Identical to an internal Contributor',
    },
  ];

  /**
   * What it cannot see. Each row names the mechanism that refuses it, because
   * "they cannot see the other project" is a claim and the mechanism is the
   * evidence for it.
   */
  const cannotSee = [
    {
      what: `${KURRAJONG.code} — its bores, its rounds, its one unacknowledged exceedance`,
      refused: 'The grant list holds one project. The repository layer throws when a read arrives with no grant that admits it; the policy beneath returns zero rows, because a policy cannot safely raise.',
      where: 'projects',
      whereLabel: 'The project list',
    },
    {
      what: 'The cross-project registers — the obligations board and the project list, as a portfolio',
      refused: 'Neither is a special surface. They render what the bindings admit: two rows for the signed-in principal, who holds two; one row for this engagement, which holds one. There is nothing to switch to.',
      where: 'obligations',
      whereLabel: 'The obligations board',
    },
    {
      what: 'Sign-off, issue, and lodging a submission',
      refused: 'Approver is not in this binding. A control a binding does not carry is absent rather than present and refusing — which is the rule the project list already states about roles.',
      where: 'signoff',
      whereLabel: 'Approval and sign-off',
    },
    {
      what: 'What any other principal did, across the instance',
      refused: 'That read is not a project scope at all. It needs an auditor binding — the one role that is instance-wide by nature, and the one that cannot be arrived at from a project however many projects a scope holds.',
      where: 'audit',
      whereLabel: 'The audit trail',
    },
    {
      what: 'The audit table itself, read directly',
      refused: 'Denied to the application role outright. The trail is read through a role of its own that holds no project scope, so it cannot be used to read around the walk back to the subject row.',
      where: 'audit',
      whereLabel: 'The audit trail',
    },
    {
      what: 'The deployment — version, upgrade window, backup drill, entitlement, diagnostics',
      refused: 'Not a project binding at all. These surfaces belong to whoever operates the instance, and no role in the closed set of four reaches them by holding a project.',
      where: 'instance',
      whereLabel: 'Instance health',
    },
  ];

  /**
   * What v1 does not have, as decisions rather than gaps — each with the thing
   * in the app repo that makes it checkable rather than asserted.
   */
  const notInV1 = [
    {
      what: 'No consultancy identity model',
      says: 'A role binding is five columns — created_at, directory_group_id, id, project_id, role — and a test asserts that none of them names a principal, a user, a member, a subject or an email. There is nowhere on a binding to put a party, a sponsor or an end date.',
      means: 'The engagement record on this screen is what the S8 dimension would add. It is not a description of a table that exists, and this screen says so rather than drawing a form over nothing.',
      cite: 'the role-binding column assertion in the app repo’s provisioning suite',
    },
    {
      what: 'No cross-client view for the consultant',
      says: 'Every token’s tenant claim must equal the one tenant this deployment is pinned to, and a multi-tenant authority is refused at configuration, again at discovery, and again on every token.',
      means: 'A consultant engaged by three operators signs in to three instances. There is no surface that joins them and building one would be the opposite of what single-tenancy is for — it is the decision, not a missing feature.',
      cite: 'the three tenant-pinning checks in the app repo’s auth layer',
    },
    {
      what: 'The end date is a record, not yet a policy',
      says: 'A grant carries one field today: the project. A facility subset and the engagement window are named in the code as the two extension points and are deliberately not declared as fields yet, on the stated ground that an unread field rots.',
      means: 'So the countdown on this screen is something the sponsor acts on, and what actually ends the access is the directory group emptying. Drawing an enforced expiry would be drawing a policy the product does not have.',
      cite: 'the two named extension points on the grant type',
    },
    {
      what: 'No user table, and no path to one',
      says: 'The customer’s directory is the source of truth. Strataflow holds a principal — the subject claim and the claims that came with it — and holds it because an audit record must stay answerable after the person has left.',
      means: 'An external person needs an identity in the customer’s directory and membership of the group above. Whether that is a guest invitation, a contractor account or a federation the customer already runs is the customer’s process; Strataflow neither performs it nor records it, and does not create, name or manage the group either.',
      cite: 'the glossary’s principal and directory-group entries',
    },
  ];

  /** How the access ends, and what survives it. */
  const ending = [
    { step: 'The group is emptied, or deleted', detail: 'In the customer’s directory, by the administrators who already run joiners and leavers. Nothing is done in Strataflow, and there is nothing in Strataflow to forget to do.', state: 'wait' },
    { step: 'The next request refuses', detail: 'Membership is resolved from the directory on every request rather than read from the token, so nothing waits for a session to expire and nobody keeps working for the rest of the day.', state: 'wait' },
    { step: 'The work stays with the operator', detail: 'Every result validated, every qualifier applied, every figure and every draft section stays. Withdrawing access and erasing history are different acts, and only one of them was asked for.', state: 'wait' },
    { step: 'The trail stays answerable, permanently', detail: 'Every row they wrote still carries their principal. “Who validated this” is answerable in five years by someone who has never heard of the consultancy, which is the whole reason attribution is at the database rather than in the application.', state: 'wait' },
  ];

  return {
    id: 'MOCK-WDL-ENG-2026-01',
    order: 'MOCK-WDL-PO-2214',
    party,
    binding,
    people,
    asPrincipal,
    scope:
      'Validate the 2026 Q2 groundwater round, interpret it against the criteria in force, and draft the interpretation section of the quarterly report. The operator issues it.',
    granted,
    ends,
    noticeDays,
    noticeFrom,
    noticePassedBy,
    termDays,
    elapsedDays,
    daysLeft,
    asAt: AS_AT,
    state,
    lifecycle,
    sees,
    cannotSee,
    notInV1,
    ending,
    /**
     * Where it would live if it were built, and the point of saying so: the
     * PRD's §7 test for OD-2 is that the information architecture accommodates
     * it *without route restructuring*. `/instance/access` is a route the
     * product already serves; this record is a child of it, and the
     * project-side view of it is a panel on a project home that already
     * exists. Nothing above either of them moves.
     */
    route: '/instance/access/engagements/:engagementId',
    routeParent: '/instance/access',
    counts: {
      principals: people.length,
      bindings: 1,
      projectsReachable: 1,
      cannotSee: cannotSee.length,
      notInV1: notInV1.length,
    },
  };
})();

export const ROUND = {
  code: '2026-Q2-GW',
  label: '2026 Q2 groundwater',
  collected: '12–14 May 2026',
  laboratory: 'Pilbara Analytical Services',
  certificate: 'PAS2026-04417',
  received: '2026-05-21',
  validationState: 'screened',
};

/** The criteria sets every result is evaluated against, in mark order. */
export const CRITERIA = [
  {
    key: 'A',
    name: 'ANZG 2018 — 95% species protection',
    short: 'ANZG 2018 · 95%',
    version: '2018.1',
    effective: '2018-08-01',
    source: 'docs/reference/anzg-2018-dgv.md',
  },
  {
    key: 'L',
    name: 'Licence L8842/2019/1 — Table 4',
    short: 'Licence · Table 4',
    version: '2024.2',
    effective: '2024-07-01',
    source: 'Licence condition 12(b)',
  },
];

export const LOCATIONS = [
  { code: 'MW01A', klass: 'groundwater', area: 'Borefield', unit: 'Superficial', position: 'Upgradient', easting: 512340, northing: 7654210, toc: 214.82, screen: '18.0 – 24.0 m', state: 'compliant' },
  { code: 'MW03B', klass: 'groundwater', area: 'Borefield', unit: 'Confined', position: 'Upgradient (nested)', easting: 512780, northing: 7654060, toc: 213.44, screen: '46.0 – 52.0 m', state: 'compliant' },
  { code: 'MW05', klass: 'groundwater', area: 'TSF', unit: 'Superficial', position: 'Downgradient of TSF', easting: 513910, northing: 7653180, toc: 208.11, screen: '12.0 – 18.0 m', state: 'exceedance' },
  { code: 'MW07', klass: 'groundwater', area: 'TSF', unit: 'Superficial', position: 'Downgradient', easting: 514430, northing: 7652940, toc: 206.35, screen: '14.0 – 20.0 m', state: 'compliant' },
  { code: 'MW09', klass: 'groundwater', area: 'Compliance boundary', unit: 'Superficial', position: 'Compliance boundary', easting: 515120, northing: 7652410, toc: 203.90, screen: '15.0 – 21.0 m', state: 'indeterminate' },
  { code: 'MW11', klass: 'groundwater', area: 'Compliance boundary', unit: 'Superficial', position: 'Compliance boundary', easting: 515640, northing: 7652120, toc: 202.17, screen: '16.0 – 22.0 m', state: 'compliant' },
  { code: 'MW12', klass: 'groundwater', area: 'Borefield', unit: 'Superficial', position: 'Background', easting: 511420, northing: 7654890, toc: 217.05, screen: '17.0 – 23.0 m', state: 'not_evaluated' },
  { code: 'TSF-VWP-03', klass: 'tsf_instrumentation', area: 'TSF', unit: '—', position: 'TSF embankment, chainage 340 m', easting: 513480, northing: 7653620, toc: 221.40, screen: 'VWP at 28.5 m', state: 'exceedance' },
  { code: 'SW01', klass: 'surface_water', area: 'Wandalup Creek', unit: '—', position: 'Downstream of discharge', easting: 516010, northing: 7651880, toc: 198.62, screen: '—', state: 'compliant' },
  { code: 'STY01', klass: 'stygofauna', area: 'Borefield', unit: 'Superficial', position: 'Reference — upgradient, off the bore transect', easting: 511800, northing: 7653400, toc: 215.10, screen: '14.0 – 26.0 m', state: 'not_evaluated' },
  { code: 'STY02', klass: 'stygofauna', area: 'TSF', unit: 'Superficial', position: 'Downgradient of TSF, off the bore transect', easting: 515000, northing: 7653400, toc: 206.40, screen: '12.0 – 24.0 m', state: 'not_evaluated' },
  /*
   * The production bores. A bore water is taken from is a location — the
   * extraction record hangs off one — so they belong on this register rather
   * than in a list beside it, and `state` is `not_evaluated` because no
   * criterion is selectable for a bore nobody samples: nothing is asserted
   * about its quality, which is different from asserting it is clean.
   * `lifecycle` is what makes PB03's row honest; the register's own network
   * health question has named it since the third pass.
   */
  { code: 'PB01', klass: 'production_bore', area: 'Borefield', unit: 'Superficial', position: 'Production — western borefield', easting: 512090, northing: 7653640, toc: 216.30, screen: '30.0 – 60.0 m', state: 'not_evaluated' },
  { code: 'PB02', klass: 'production_bore', area: 'Borefield', unit: 'Superficial', position: 'Production — eastern borefield', easting: 512740, northing: 7653320, toc: 214.95, screen: '32.0 – 62.0 m', state: 'not_evaluated' },
  { code: 'PB03', klass: 'production_bore', area: 'Borefield', unit: 'Superficial', position: 'Production — decommissioned 2025-11-04', easting: 511560, northing: 7654180, toc: 218.20, screen: '28.0 – 55.0 m', state: 'not_evaluated', lifecycle: 'decommissioned' },
  /*
   * Wave 9 — the class-soil rows, and they are deliberately a **different
   * record shape** rather than a bore with its casing fields left blank.
   *
   * `docs/GLOSSARY.md`'s *location class* entry lists nine classes and soil is
   * one of them, present since S1 "not because the others are used, but
   * because adding one later is a migration against live data". So these are
   * rows on the one register rather than a second register beside it — the
   * same argument the production bores are here on.
   *
   * What they do **not** carry is `toc` or `screen`. A test pit has no casing
   * and no screened interval; it has a **ground surface** elevation and a set
   * of logged **depth intervals** (FR-1.7). Giving one a `toc` holding the
   * ground level would be the "bore missing its casing" drawing this wave
   * exists to avoid, so the register reads `datum` + `elevation` for the level
   * and the interval log for the depth. Nothing else in this seed reads `toc`
   * or `screen` across all classes — every other reader narrows to groundwater
   * or names one bore — so those two fields stay exactly what they are.
   *
   * `state` is `not_evaluated` on every one of them, and that is a computed
   * fact rather than caution: no set in `CRITERIA_LIBRARY` carries a soil or
   * sediment matrix, so nothing is asserted about any soil result (glossary,
   * *matrix*). `SOIL.criteria` at the foot of this file derives that emptiness
   * rather than claiming it.
   */
  { code: 'TP01', klass: 'soil', area: 'TSF', unit: '—', position: 'Seepage path — nearest the TSF', easting: 513240, northing: 7652980, elevation: 206.90, datum: 'Ground surface', state: 'not_evaluated' },
  { code: 'TP02', klass: 'soil', area: 'TSF', unit: '—', position: 'Seepage path — downgradient', easting: 513540, northing: 7652880, elevation: 205.40, datum: 'Ground surface', state: 'not_evaluated' },
  { code: 'TP03', klass: 'soil', area: 'TSF', unit: '—', position: 'Seepage path — downgradient', easting: 513840, northing: 7652780, elevation: 204.10, datum: 'Ground surface', state: 'not_evaluated' },
  { code: 'TP04', klass: 'soil', area: 'TSF', unit: '—', position: 'Seepage path — furthest from the TSF', easting: 514140, northing: 7652680, elevation: 202.80, datum: 'Ground surface', state: 'not_evaluated' },
  { code: 'TP05', klass: 'soil', area: 'Borefield', unit: '—', position: 'Background — off the seepage path', easting: 511960, northing: 7654520, elevation: 216.20, datum: 'Ground surface', state: 'not_evaluated' },
];

/**
 * Survey history per bore — the datum a depth reading reduces through.
 *
 * ADR-0015: a resurvey takes effect from its own epoch and moves nothing
 * behind it, so a top of casing is not a number but a history, and
 * `LOCATIONS.toc` is the *current* entry of it. The history is declared here,
 * beside the register it qualifies, rather than inside `CONSTRUCTION` —
 * because wave 14 anchored the water-level series to a measured depth and
 * derives its elevation at each month through the datum in force that month,
 * which needs the history before the construction record exists.
 * `CONSTRUCTION` reads this rather than holding a second copy of it.
 *
 * **Only MW05 has been resurveyed**, and the absence of an entry is a fact
 * rather than a default: a bore with no history here reduces through
 * `LOCATIONS.toc` for every reading because no survey after the first is on
 * this record.
 */
export const SURVEYS = {
  MW05: [
    { epoch: '2024-03-18', reason: 'Resurvey', toc: 208.11, applies: 'Readings from 2024-03-18 onward', by: 'Pilbara Survey Co' },
    { epoch: '2019-04-15', reason: 'Original survey', toc: 208.42, applies: 'Readings 2019-04-15 to 2024-03-17', by: 'Pilbara Survey Co' },
  ],
};

/**
 * Top of casing in force on a date — the datum that day's reading reduces through.
 *
 * The same lookup `LOGGER_SERIES` runs once an hour, written once so the
 * monthly series and the hourly one cannot disagree about which survey a
 * reading stands on.
 */
export const tocAt = (code, on) => {
  const current = LOCATIONS.find((l) => l.code === code)?.toc ?? null;
  const history = SURVEYS[code];
  if (!history) return current;
  return (history.find((s) => s.epoch <= on) ?? history.at(-1)).toc;
};

/**
 * Subterranean fauna monitoring — a WA approval condition with no home.
 *
 * The EPA routinely conditions mining approvals in this state on stygofauna
 * and troglofauna survey, and the results are not chemistry: they are counts
 * of taxa against a reference site, on a net-haul method, assessed for whether
 * a population persists rather than against a concentration limit. A
 * groundwater platform built for WA mining with no place for them is visibly
 * not built for WA.
 */
export const STYGOFAUNA = {
  condition: 'Ministerial statement 1184 condition 9 — subterranean fauna monitoring',
  method: 'Net haul, 150 µm and 50 µm, three hauls per bore per event · EPA Technical Guidance, subterranean fauna survey',
  frequency: 'Twice yearly — one wet season, one dry',
  rows: [
    { bore: 'STY01', role: 'Reference', event: '2026 dry', taxa: 7, individuals: 41, notable: 'Bathynellidae sp. B04 — short-range endemic', verdict: 'persisting' },
    { bore: 'STY02', role: 'Downgradient', event: '2026 dry', taxa: 4, individuals: 12, notable: 'Bathynellidae sp. B04 — 2 individuals', verdict: 'reduced against reference' },
    { bore: 'STY01', role: 'Reference', event: '2025 wet', taxa: 8, individuals: 55, notable: 'Bathynellidae sp. B04, Candonidae sp. C11', verdict: 'persisting' },
    { bore: 'STY02', role: 'Downgradient', event: '2025 wet', taxa: 6, individuals: 28, notable: 'Bathynellidae sp. B04 — 9 individuals', verdict: 'persisting' },
  ],
  finding:
    'Taxa richness at STY02 has fallen from 6 to 4 and individual counts from 28 to 12 across two events, while the reference bore held steady. The salinity and sulfate rise at MW05 sits between the two. This is the receptor the water-quality exceedances are ultimately about, and it is assessed on population persistence rather than against a concentration.',
  caution:
    'Two events is not a trend. Stygofauna counts vary by an order of magnitude with season, haul effort and operator, and the honest reading is that this warrants a targeted survey rather than a conclusion. The screen says so rather than drawing a line through two points.',
};

/**
 * The analytes on the crosstab, with the criterion each set applies.
 *
 * `null` means the set has no criterion selectable for this analyte, which
 * renders as `not evaluated` — nothing is asserted. That is a different state
 * from compliant and the encoding keeps them apart (G-13a).
 */
export const ANALYTES = [
  { name: 'pH', unit: 'pH units', a: null, l: '6.5 – 8.5', lNote: 'range', lor: 0.01 },
  { name: 'Electrical conductivity', unit: 'µS/cm', a: null, l: '≤ 2500', lor: 1 },
  { name: 'Total hardness as CaCO₃', unit: 'mg/L', a: null, l: null, lor: 1 },
  { name: 'Arsenic (filtered)', unit: 'µg/L', a: '13', aNote: 'As(V)', l: '≤ 50', lor: 1.0 },
  { name: 'Cadmium (filtered)', unit: 'µg/L', a: '0.54', aNote: 'hardness-adjusted', l: '≤ 2', lor: 1.0 },
  { name: 'Copper (filtered)', unit: 'µg/L', a: '1.4', l: '≤ 20', lor: 0.5 },
  { name: 'Nickel (filtered)', unit: 'µg/L', a: '11', aNote: 'hardness-adjusted', l: '≤ 20', lor: 0.5 },
  { name: 'Zinc (filtered)', unit: 'µg/L', a: '8.0', aNote: 'hardness-adjusted', l: '≤ 50', lor: 1.0 },
  { name: 'Nitrate as N', unit: 'mg/L', a: null, l: '≤ 10', lor: 0.05 },
  { name: 'Sulfate as SO₄', unit: 'mg/L', a: null, l: '≤ 1000', lor: 1 },
  { name: 'PFOS + PFHxS', unit: 'ng/L', a: '0.13', aNote: 'derived sum', l: null, lor: 2.0, derived: true },
];

/**
 * One cell of the crosstab.
 *
 * `outcome` is a two-element array — one per criteria set, in `CRITERIA` order —
 * never a boolean. The model settles at G-25 with one outcome per criterion and
 * an encoding built for two states cannot widen to four across N sets without
 * redrawing every surface (tokens.json).
 */
/**
 * How a planned location was left at the end of a visit — the closed list.
 *
 * Moved above the crosstab in wave 7 so the grid can read it. A cell where no
 * result exists is an absence with a *reason*, and the reason is one of these
 * seven; a grid that invented its own word for it would be the second
 * vocabulary for one fact, which is what the glossary rule exists to stop.
 */
const FIELD_DISPOSITIONS = [
  {
    code: 'sampled', label: 'Sampled', reason: false, tone: 'good', glyph: '●',
    means: 'Water was recovered and one or more samples were submitted under the chain of custody.',
  },
  {
    code: 'dry', label: 'Dry', reason: true, tone: 'warn', glyph: '○',
    means: 'The bore was reached and dipped and held no water. A measurement of the aquifer, not a gap in the record — the hydrograph draws a break rather than a line through it and the round is satisfied as attempted.',
  },
  {
    code: 'insufficient-recharge', label: 'Insufficient recharge', reason: true, tone: 'warn', glyph: '◔',
    means: 'The bore held water, was purged dry, and did not recover enough to fill the containers before the crew had to leave.',
  },
  {
    code: 'inaccessible', label: 'Inaccessible', reason: true, tone: 'warn', glyph: '⊘',
    means: 'The bore could not be reached — a cut track, a locked gate, stock, fire, or a working area closed to entry.',
  },
  {
    code: 'damaged', label: 'Damaged or obstructed', reason: true, tone: 'bad', glyph: '▲',
    means: 'The headworks or the casing prevented the visit: a sheared riser, a seized cap, an obstruction above the screen.',
  },
  {
    code: 'not-located', label: 'Not located', reason: true, tone: 'bad', glyph: '?',
    means: 'The crew searched the surveyed position and did not find the bore. It is a finding about the register, and it routes to the location record rather than to the round.',
  },
  {
    code: 'not-sampled', label: 'Not sampled', reason: true, tone: 'bad', glyph: '—',
    means: 'The residual state, and the reason is free text because the six above did not fit. A round left with this disposition and no reason cannot be marked complete.',
  },
];

const C = 'compliant', E = 'exceedance', I = 'indeterminate', N = 'not_evaluated';

/**
 * The cell for a bore that was not sampled — **drawn, not omitted**.
 *
 * Wave 7's carried rider (W6-A-1, from the wave-6 audit). The MW11 column used
 * to carry eleven populated, evaluated results while every other surface on
 * this round said MW11 was visited twice, found **dry**, and yielded no
 * samples: the field round, the sample manifest, `COMPLETENESS`, the work
 * queue. The column is blanked below — which is what `#data-states` had
 * described all along as the pattern this state asks for — and every count
 * computed over this table moves with it rather than being typed to match.
 *
 * **Dry is not missing**, so the cell says which it is. A blank cell reads as
 * a value somebody forgot to enter; a removed column reads as a bore that does
 * not exist. This one is present, it carries a glyph and a word as well as a
 * position, and the sentence behind it names the disposition the field record
 * holds. It deliberately carries **no outcome marks**: nothing was measured,
 * so nothing was assessed, and a *not evaluated* mark would assert a result
 * that no criterion happened to fit.
 */
const NOT_SAMPLED = (() => {
  const d = FIELD_DISPOSITIONS.find((x) => x.code === 'dry');
  return {
    empty: true,
    /* The disposition's own glyph and its own word — not a second vocabulary. */
    glyph: d.glyph,
    word: d.label.toLowerCase(),
    spoken:
      `${d.label.toLowerCase()} — no sample exists. ${d.means} ` +
      'So this cell is an absence of material, not a result below a limit of reporting, and not a pass.',
  };
})();

/**
 * The cell for a sample that exists and an analysis that does not — **the
 * second kind of absence, and the grid says which one it is** (wave 15).
 *
 * `NOT_SAMPLED` above is an absence of *material*: the bore was dipped and held
 * no water, so no sample exists and nothing could have been measured. This one
 * is an absence of *analysis*: the bore was purged, sampled, sealed and
 * reconciled at the laboratory, and the suite this row reports was never run on
 * it. Those are different facts about the round and a grid that drew them the
 * same way would have thrown the difference away — which is the same argument
 * wave 7 made for drawing MW11 rather than omitting it, one step along.
 *
 * **Why a second word rather than one of the seven.** `FIELD_DISPOSITIONS` is a
 * closed list of how a *visit* was left, and every one of its seven says
 * something about the bore. None of them fits a bore that was sampled: the
 * disposition here is `sampled`, and it is the *test list* that has nothing in
 * it. So the word comes from where the fact lives — the manifest, which counts
 * a sample's tests, and `#composite`, which already writes *retained, not
 * analysed* about material that exists and was never put through an
 * instrument. The glyph is a dotted outline rather than one of the seven, in
 * the same family as the dashed `not_evaluated` mark: dotted and dashed are
 * this catalogue's shapes for *nothing was assessed here*.
 *
 * Like the dry cell it carries **no outcome marks**, for the same reason and one
 * degree more sharply: `not_evaluated` would assert that a result exists and no
 * criterion could be selected for it, `indeterminate` would assert a non-detect
 * whose reporting limit sat above the criterion, and a censored `< 2.0` would
 * assert that a laboratory reported one. All three are claims about an analysis
 * that never happened.
 *
 * `spoken` resolves through `PFAS_REACH`, which is declared beside the custody
 * chain and the manifest it reads — the `IMPORTS`/`EVENTS` getter pattern, for
 * the same reason: a literal here would be a second copy of a sentence composed
 * from records four thousand lines down, and it resolves when a screen renders.
 */
const NOT_ANALYSED = (code) => ({
  empty: true,
  notAnalysed: true,
  glyph: '◌',
  word: 'not analysed',
  get spoken() {
    return PFAS_REACH.cellSentence(code);
  },
});

export const CROSSTAB = [
  { analyte: 'pH', cells: [
    { v: '7.42', o: [N, C] }, { v: '7.18', o: [N, C] }, { v: '8.91', o: [N, E] },
    { v: '7.06', o: [N, C] }, { v: '6.84', o: [N, C] }, NOT_SAMPLED, { v: '7.55', o: [N, C] } ] },
  { analyte: 'Electrical conductivity', cells: [
    { v: '840', o: [N, C] }, { v: '1120', o: [N, C] }, { v: '3410', o: [N, E] },
    { v: '1680', o: [N, C] }, { v: '990', o: [N, C] }, NOT_SAMPLED, { v: '760', o: [N, C] } ] },
  { analyte: 'Total hardness as CaCO₃', cells: [
    { v: '182', o: [N, N] }, { v: '244', o: [N, N] }, { v: '412', o: [N, N] },
    { v: '268', o: [N, N] }, { v: '196', o: [N, N] }, NOT_SAMPLED, { v: '158', o: [N, N] } ] },
  { analyte: 'Arsenic (filtered)', cells: [
    { v: '2.1', o: [C, C] },
    { v: '3.1', o: [C, C], superseded: '31' },
    { v: '28.4', o: [E, C] },
    { v: '<1.0', o: [C, C], censored: true },
    { v: '3.2', o: [C, C] }, NOT_SAMPLED, { v: '1.4', o: [C, C] } ] },
  { analyte: 'Cadmium (filtered)', cells: [
    { v: '<1.0', o: [I, C], censored: true }, { v: '<1.0', o: [I, C], censored: true },
    { v: '<1.0', o: [I, C], censored: true }, { v: '<1.0', o: [I, C], censored: true },
    { v: '<1.0', o: [I, C], censored: true }, NOT_SAMPLED,
    { v: '<1.0', o: [I, C], censored: true } ] },
  { analyte: 'Copper (filtered)', cells: [
    { v: '0.9', o: [C, C] }, { v: '1.2', o: [C, C] }, { v: '6.4', o: [E, C] },
    { v: '1.1', o: [C, C] }, { v: '<0.5', o: [C, C], censored: true }, NOT_SAMPLED, { v: '<0.5', o: [C, C], censored: true } ] },
  { analyte: 'Nickel (filtered)', cells: [
    { v: '1.8', o: [C, C] }, { v: '2.4', o: [C, C] }, { v: '14.2', o: [E, C] },
    { v: '3.6', o: [C, C] }, { v: '2.1', o: [C, C] }, NOT_SAMPLED, { v: '1.2', o: [C, C] } ] },
  { analyte: 'Zinc (filtered)', cells: [
    { v: '4.2', o: [C, C] }, { v: '5.8', o: [C, C] }, { v: '31.6', o: [E, C] },
    { v: '9.4', o: [E, C] }, { v: '3.1', o: [C, C] }, NOT_SAMPLED, { v: '2.2', o: [C, C] } ] },
  { analyte: 'Nitrate as N', cells: [
    { v: '2.4', o: [N, C] }, { v: '3.1', o: [N, C] }, { v: '11.8', o: [N, E] },
    { v: '4.0', o: [N, C] }, { v: '5.2', o: [N, C], quarantined: 'Holding time exceeded — analysed at 6 days against a 2-day window.' },
    NOT_SAMPLED, { v: '1.1', o: [N, C] } ] },
  { analyte: 'Sulfate as SO₄', cells: [
    { v: '112', o: [N, C] }, { v: '186', o: [N, C] }, { v: '918', o: [N, C] },
    { v: '264', o: [N, C] }, { v: '148', o: [N, C] }, NOT_SAMPLED, { v: '96', o: [N, C] } ] },
  /*
   * Wave 15. This row carried a censored `< 2.0` at five bores whose samples
   * were never tested for PFAS — five assertions that a laboratory had reported
   * a non-detect, on analyses no certificate, batch, container or custody
   * transfer records. `PFAS_REACH` holds the measurement and the decision; the
   * five cells are withdrawn to the second kind of absence rather than
   * re-valued, because there is nothing to re-value them from. MW05's derived
   * total stands: it is the one analysis every reading of the record agreed
   * happened. MW11 stays dry — a different absence, drawn differently.
   */
  { analyte: 'PFOS + PFHxS', cells: [
    NOT_ANALYSED('MW01A'), NOT_ANALYSED('MW03B'),
    { v: '4.8', o: [E, N], derived: true }, NOT_ANALYSED('MW07'),
    NOT_ANALYSED('MW09'), NOT_SAMPLED, NOT_ANALYSED('MW12') ] },
];

/** The seven bores that appear as crosstab columns. */
export const CROSSTAB_COLUMNS = ['MW01A', 'MW03B', 'MW05', 'MW07', 'MW09', 'MW11', 'MW12'];

/**
 * The shape of the grid, counted off the grid.
 *
 * Every number the crosstab, the report's structural check and the partial
 * state on `#data-states` print about this table resolves here, so blanking a
 * column moves all of them at once. The alternative is the one the rider
 * exists to end: a count typed beside a table it no longer describes.
 *
 * **Wave 15 splits `empty` in two, and every consumer had to choose.** There
 * are now two reasons a cell holds no result — no sample (`notSampled`, MW11's
 * dry column) and no analysis (`notAnalysed`, the five withdrawn PFAS cells) —
 * and a surface that says *dry* over the total would be describing eleven cells
 * with a number that counts sixteen. `empty` stays the sum, and the sentences
 * about the dry column now read `notSampled` by name.
 */
export const CROSSTAB_SHAPE = (() => {
  const cells = CROSSTAB.flatMap((r) => r.cells);
  const emptyAt = (i) => CROSSTAB.every((r) => r.cells[i].empty);
  return {
    analytes: CROSSTAB.length,
    locations: CROSSTAB_COLUMNS.length,
    cells: cells.length,
    results: cells.filter((c) => !c.empty).length,
    empty: cells.filter((c) => c.empty).length,
    /** No sample was collected — the whole of MW11's column. */
    notSampled: cells.filter((c) => c.empty && !c.notAnalysed).length,
    /** A sample exists and this suite was never run on it. */
    notAnalysed: cells.filter((c) => c.notAnalysed).length,
    censored: cells.filter((c) => c.censored).length,
    /** The bores whose whole column is empty, and the ones that carry results. */
    emptyColumns: CROSSTAB_COLUMNS.filter((_, i) => emptyAt(i)),
    sampledColumns: CROSSTAB_COLUMNS.filter((_, i) => !emptyAt(i)),
    isEmpty: (code) => emptyAt(CROSSTAB_COLUMNS.indexOf(code)),
  };
})();

/**
 * Results that could not be assessed — **derived from the grid, not typed beside it**.
 *
 * Six hand-written rows used to sit here, one per location, and a seventh for
 * MW11. Wave 7 blanked MW11's column and the seventh row became a claim that
 * the laboratory had reported `< 1.0 µg/L` on a sample nobody collected — the
 * exact class of drift a second copy of a table always eventually produces.
 *
 * So the register is read off `CROSSTAB`: every cadmium cell that exists and
 * resolves to *indeterminate* against a criteria set is a row, and a bore with
 * no cell has no row without anybody deciding that. The gap is arithmetic —
 * the limit of reporting over the criterion — rather than a typed multiple.
 */
export const INDETERMINATE = (() => {
  const set = CRITERIA[0];
  return CROSSTAB.flatMap((row) => {
    const analyte = ANALYTES.find((a) => a.name === row.analyte);
    if (!analyte?.a) return [];
    return row.cells.flatMap((cell, i) => {
      if (cell.empty || cell.o[0] !== 'indeterminate') return [];
      const lor = analyte.lor;
      const criterion = Number(analyte.a);
      return [{
        location: CROSSTAB_COLUMNS[i],
        analyte: row.analyte,
        reported: `${cell.v} ${analyte.unit}`,
        lor: `${lor.toFixed(1)} ${analyte.unit}`,
        criterion: `${analyte.a} ${analyte.unit}`,
        set: `${set.short.replace(' · ', ' · ')}`,
        gap: `${(lor / criterion).toFixed(1)}×`,
        close: 'ICP-MS/MS at 0.1 µg/L',
      }];
    });
  });
})();

/** What the laboratory quoted to close the gap above, per sample. */
export const INDETERMINATE_QUOTE = { perSample: 18, by: 'Pilbara Analytical Services', at: '2026-05-21' };

/**
 * Standing water level, monthly, three years, per bore.
 *
 * Shaped rather than random: a wet-season recovery each Q1, a long decline at
 * MW05 as the TSF seepage mound migrates, and a step where a resurvey moved
 * the datum (G-07b) — the hydrograph shows elevation, so the step is a real
 * feature of the series and not an error to smooth away.
 *
 * **What the tape reads is a depth; an elevation is derived from it.** The
 * generator draws a *depth to water* whose last month is the round's own dip,
 * and reduces each month through `tocAt` — the survey in force that month —
 * which is the rule ADR-0015 states and `#location` prints on its face. So the
 * May 2026 value at every bore reconciles with `LOCATIONS.toc` less the
 * round's dip by construction rather than by coincidence, and the resurvey
 * step is where the datum moved rather than where the water did.
 *
 * ## SETTLED (wave 14) — 2 September 2026, on a record made 2 September 2026
 * (wave 8)
 *
 * The record is kept whole and the settled-note is at the end of it, because a
 * debt that vanishes when it is paid leaves nobody able to tell a settled one
 * from one that was never noticed. What wave 8 wrote, unedited:
 *
 * **This series does not stand on the same baseline as the field record, and
 * the difference is metres.** Measured while wave 8 was deciding what to
 * anchor a logger series to:
 *
 * | Bore  | This series, May 2026 | `LOCATIONS.toc` − the round's dip | `HEADS` (the fitted surface) |
 * |-------|----------------------:|----------------------------------:|-----------------------------:|
 * | MW01A | 203.11                | 203.40                            | 203.4                        |
 * | MW03B | 201.74                | 204.26                            | — (confined, excluded)       |
 * | MW05  | **194.07**            | **199.64**                        | 199.8                        |
 * | MW07  | 193.80                | 199.23                            | 198.7                        |
 * | MW09  | 192.25                | 197.02                            | 197.0                        |
 * | MW12  | 205.40                | 204.19                            | 205.6                        |
 *
 * The cause is here, in one line: `base` is `loc.toc - 12.5`, a shape chosen
 * to spread three traces apart on a plate, and it was never reconciled with
 * the depths the field round actually recorded. Two of the three columns
 * agree with each other to within 0.2 m at MW01A and MW09; this one is the
 * outlier, and it is the one the hydrograph draws.
 *
 * **It is recorded rather than fixed, and wave 8 designed around it rather
 * than amplifying it.** Re-anchoring is four lines of arithmetic and its
 * consequences are not: the three traces on Figure 4.1 currently span 9.6 m
 * and would span 4.3 m, MW05 and MW07 would overlap where they are now
 * clearly separate, and the licence trigger line — 195.6 m AHD, typed twice
 * on `#hydrograph` and nowhere else — sits *above* MW05 on this series and
 * four metres *below* it on the field record. Which of those is the true
 * relationship between this bore and its trigger is a question with a
 * regulatory answer, and it is not one to settle in passing inside a wave
 * about telemetry. So wave 8's logger series is anchored to the field record
 * — the baseline two independent structures corroborate — and drawn on its
 * own plate beside Figure 4.1 rather than on it, which `#hydrograph` says in
 * as many words.
 *
 * The claim about a step at MW03B is the smaller half of the same finding:
 * `drift` has no MW03B term, so there is no step in the numbers this comment
 * describes.
 *
 * ## What closed it, and what did not
 *
 * **The datum is corrected and the shape is not.** `base = loc.toc - 12.5` is
 * gone. The generator now draws the same seasonal structure — same seed, same
 * `wet`, same `drift`, same noise draws in the same order — as a **depth to
 * water**, anchored so that its last month *is* the round's own dip, and
 * derives each month's elevation through `tocAt`. Two consequences, both
 * measured rather than asserted:
 *
 * - Every bore's May 2026 value equals `LOCATIONS.toc` less the round's dip
 *   **exactly**, because it is that subtraction. The offset each bore moved by
 *   is `field − was`, computed per bore and carried on `WATER_LEVELS.anchor`
 *   with what the old rule drew, so no screen has to be told the old number.
 * - The shape is preserved: for every month after MW05's resurvey the new
 *   elevation is the old one plus that bore's constant offset, which is what
 *   "correct the datum, keep the fiction" means arithmetically.
 *
 * **The step is real now, and it is at the bore that was actually resurveyed.**
 * The head of this comment claimed a resurvey step at MW03B; MW03B has no
 * survey history on this record and never had one. MW05 does — 208.42 m AHD
 * until 2024-03-18 and 208.11 m from it — so the series steps 0.31 m *down*
 * at that epoch, where the datum moved and the water did not, and the head of
 * the comment names the bore that has one rather than the bore that does not.
 *
 * **MW11 has no series at all, for the reason it has no head.** The round
 * dipped it to 22.0 m btoc, the base of its screened interval, and found it
 * dry to the weight, so the record holds no standing level to anchor a series
 * against. The old rule drew it anyway, at a water table more than ten metres
 * above where the tape found nothing — the same assertion wave 7 removed from
 * the potentiometric fit at the same bore, for the same reason. It draws its
 * noise like every other bore so that dropping it moved nobody else's shape,
 * and `WATER_LEVELS.anchor` carries the row with the reason in place of a
 * number.
 *
 * **The three columns agree now, and the table above is the one to compare
 * against.** Recomputed at the same two decimals the record used:
 *
 * | Bore  | Figure 4.1, May 2026 | `LOCATIONS.toc` − the round's dip | `HEADS` (the fitted surface) |
 * |-------|---------------------:|----------------------------------:|-----------------------------:|
 * | MW01A | 203.40               | 203.40                            | 203.40                       |
 * | MW03B | 204.26               | 204.26                            | — (confined, excluded)       |
 * | MW05  | **199.64**           | **199.64**                        | 199.64                       |
 * | MW07  | 199.23               | 199.23                            | 199.23                       |
 * | MW09  | 197.02               | 197.02                            | 197.02                       |
 * | MW12  | 204.19               | 204.19                            | 204.19                       |
 *
 * The third column agrees because it was made to: the fitted heads were
 * **also** wrong, and closing this record meant closing that one too — MW07
 * stood 0.53 m and MW12 1.41 m from the field record on a plate whose largest
 * residual was 0.04 m, which is what a plane fitted through numbers chosen to
 * make it fit looks like. `HEADS` reduces the five dipped bores now, the fit
 * moves with them (119° → 103°, 1.93 → 1.74 m/km, residual **0.04 → 0.55 m**),
 * and the record of that is in `figures.mjs` beside the table it corrects.
 *
 * **Two of the record's own estimates did not survive being measured**, and
 * they are corrected here rather than quietly inherited. It said the three
 * traces "currently span 9.6 m and would span 4.3 m": measured, they spanned
 * **10.52 m** and now span **5.38 m**. It said "MW05 and MW07 would overlap
 * where they are now clearly separate": their ranges already overlapped, and
 * re-anchoring moved their May values from **0.28 m** apart to **0.41 m**
 * apart — further apart, not nearer. The direction the record gave for the
 * trigger was right; the panel on `#hydrograph` that summarised it had it
 * backwards, which is recorded there.
 *
 * **The trigger line the record above could not settle is settled beside it**,
 * in `LEVEL_TRIGGER` — measured first, decided against the evidence, and drawn
 * on `#hydrograph` rather than described here.
 */
function waterLevels() {
  const random = prng(20260512);
  const months = [];
  for (let y = 2023; y <= 2026; y += 1) {
    for (let m = 1; m <= 12; m += 1) {
      if (y === 2026 && m > 5) break;
      months.push(`${y}-${String(m).padStart(2, '0')}`);
    }
  }
  /*
   * A monthly reading is dated mid-month for the one purpose a date serves
   * here: choosing the survey it reduces through. Nothing else reads it, and
   * naming the convention is cheaper than leaving a reader to infer it from a
   * step that lands in one month rather than the next.
   */
  const dateOf = (month) => `${month}-15`;

  const series = {};
  const anchor = [];
  for (const loc of LOCATIONS.filter((l) => l.klass === 'groundwater')) {
    /*
     * The drawn shape, unchanged from the version this re-anchoring replaced.
     * Every groundwater bore draws its own noise whether or not it ends with a
     * series, so a bore that cannot be anchored moves nobody else's shape.
     */
    const drift = loc.code === 'MW05' ? -0.055 : loc.code === 'MW07' ? -0.018 : 0.004;
    const shape = months.map((month, i) => {
      const m = Number(month.slice(5));
      const wet = Math.sin(((m - 2) / 12) * Math.PI * 2) * 0.62;
      const noise = (random() - 0.5) * 0.16;
      return wet + drift * i + noise;
    });
    const last = shape.at(-1);
    /* What the old rule drew here in the last month, by the old rule itself. */
    const was = Number((loc.toc - 12.5 + last).toFixed(3));
    const dip = FIELD_ROUND.current.find((s) => s.location === loc.code)?.depthToWater ?? null;

    if (dip === null) {
      anchor.push({
        code: loc.code, toc: loc.toc, dip: null, field: null, was, offset: null,
        why: `Dipped to the base of its screened interval on the ${FIELD_ROUND.round} round and found dry, so the record holds no standing level to anchor a series against.`,
      });
      continue;
    }

    const field = Number((loc.toc - dip).toFixed(3));
    anchor.push({ code: loc.code, toc: loc.toc, dip, field, was, offset: Number((field - was).toFixed(3)), why: null });
    series[loc.code] = months.map((month, i) => {
      /* The tape's own quantity: the shape rides on the depth, not on the elevation. */
      const dtw = Number((dip - (shape[i] - last)).toFixed(3));
      const toc = tocAt(loc.code, dateOf(month));
      return {
        month,
        dtw,
        toc,
        elevation: Number((toc - dtw).toFixed(3)),
        /* What the rule this replaced drew for the same month, by that rule. */
        was: Number((loc.toc - 12.5 + shape[i]).toFixed(3)),
      };
    });
  }

  /* The resurveys that fall inside the window, as steps the plate will show. */
  const steps = Object.entries(SURVEYS)
    .filter(([code]) => series[code])
    .flatMap(([code, history]) =>
      history
        .filter((s) => s.epoch.slice(0, 7) > months[0] && s.epoch.slice(0, 7) <= months.at(-1))
        .map((s) => {
          const previous = history[history.indexOf(s) + 1];
          return { code, epoch: s.epoch, from: previous.toc, to: s.toc, metres: Number((s.toc - previous.toc).toFixed(2)), reason: s.reason };
        }),
    );

  return {
    months,
    series,
    /** Per bore: the datum, the round's dip, the value the old rule drew, and the offset. */
    anchor,
    anchorOf: (code) => anchor.find((a) => a.code === code) ?? null,
    /** The bores the record holds no standing level for, with the reason. */
    noLevel: anchor.filter((a) => a.field === null),
    steps,
    anchoredTo: `${FIELD_ROUND.round} — each bore's own dip, reduced through the survey in force at the measurement date`,
  };
}

/*
 * `WATER_LEVELS`, `RAINFALL` and `ARSENIC_MW05` are declared **after**
 * `FIELD_ROUND` — see the foot of that record. Wave 14 anchored this series to
 * the round's own dip, so the dependency is real and the declaration order
 * states it rather than a comment claiming it.
 */

/**
 * Electrical conductivity at MW05, round by round — the bore's own record.
 *
 * One series, read by two screens asking different questions of it. `#qc` asks
 * whether this round's 3410 µS/cm is an outlier **against this bore's own
 * history** (FR-4.5), which is a question no fixed limit can answer: 3410 at a
 * background bore and 3410 at a bore that has read 3400 for a decade are not
 * the same finding. `#exceedances` asks whether the licence's consecutive-round
 * condition has been satisfied (FR-5.2), which needs the same values and a
 * different rule. Drawing them from one array is what keeps the two screens
 * from quoting different numbers for the same bore.
 *
 * The rise is the TSF seepage mound the whole seed is about — the same story as
 * the sulfate at MW05 and the stygofauna counts at STY02.
 */
export const EC_MW05 = [
  { round: '2023-Q3-GW', value: 1840 },
  { round: '2023-Q4-GW', value: 1890 },
  { round: '2024-Q1-GW', value: 1930 },
  { round: '2024-Q2-GW', value: 1980 },
  { round: '2024-Q3-GW', value: 2050 },
  { round: '2024-Q4-GW', value: 2120 },
  { round: '2025-Q1-GW', value: 2190 },
  { round: '2025-Q2-GW', value: 2240 },
  { round: '2025-Q3-GW', value: 2180 },
  { round: '2025-Q4-GW', value: 2330 },
  { round: '2026-Q1-GW', value: 2710 },
  { round: '2026-Q2-GW', value: 3410 },
];

/**
 * The outlier test, computed rather than asserted.
 *
 * Iglewicz–Hoaglin: `0.6745 × (x − median) ÷ MAD`, flagged above 3.5. The
 * median and the median absolute deviation are used rather than a mean and a
 * standard deviation for the reason that matters here — a rising series drags a
 * mean toward the very value being tested, so a spike partly hides itself. Both
 * numbers below fall out of `EC_MW05`; typing them beside it is how a screen
 * ends up quoting a statistic its own data no longer supports.
 */
export const EC_MW05_OUTLIER = (() => {
  const median = (xs) => {
    const s = [...xs].sort((a, b) => a - b);
    const m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  const history = EC_MW05.slice(0, -1).map((r) => r.value);
  const current = EC_MW05[EC_MW05.length - 1];
  const med = median(history);
  const mad = median(history.map((v) => Math.abs(v - med)));
  const z = (0.6745 * (current.value - med)) / mad;
  return {
    location: 'MW05',
    analyte: 'Electrical conductivity',
    sample: 'WDL-26Q2-003',
    round: current.round,
    value: `${current.value} µS/cm`,
    n: history.length,
    median: `${med} µS/cm`,
    mad: `${mad} µS/cm`,
    ratio: `${(current.value / med).toFixed(2)}×`,
    score: z.toFixed(1),
    threshold: '3.5',
    method: 'Modified z-score (Iglewicz–Hoaglin), median and MAD over the bore’s own prior rounds',
    basis: 'Flagged against this bore’s own record, not against a fixed limit.',
    reading:
      'Eleven rounds of rise and then a step: the trend explains part of this and not the size of it. The finding is raised, not resolved — whether it is a step change in the seepage plume or a sampling artefact is a question for the trend test and the purge record, and the product does not guess between them.',
    separately:
      'This bore also exceeds the licence limit of 2500 µS/cm this round, which is a different question with a different answer. A fixed limit says the water is out of compliance; the bore’s own history says something changed. Both are true and neither is the other.',
  };
})();

/** Major-ion chemistry, for the Piper, Stiff and Schoeller plots. meq/L. */
export const MAJOR_IONS = {
  MW01A: { Ca: 3.1, Mg: 2.4, Na: 2.9, K: 0.11, HCO3: 4.2, SO4: 2.3, Cl: 2.0 },
  MW03B: { Ca: 3.9, Mg: 3.0, Na: 4.1, K: 0.14, HCO3: 4.8, SO4: 3.9, Cl: 2.4 },
  MW05: { Ca: 6.2, Mg: 5.9, Na: 12.4, K: 0.38, HCO3: 3.1, SO4: 19.1, Cl: 2.7 },
  MW07: { Ca: 4.4, Mg: 3.5, Na: 6.1, K: 0.19, HCO3: 4.4, SO4: 5.5, Cl: 4.3 },
  MW09: { Ca: 3.3, Mg: 2.6, Na: 3.2, K: 0.12, HCO3: 4.3, SO4: 3.1, Cl: 1.8 },
  MW12: { Ca: 2.7, Mg: 2.1, Na: 2.5, K: 0.09, HCO3: 4.0, SO4: 1.6, Cl: 1.7 },
};

/**
 * Internal consistency — FR-4.4, derived from the ions rather than typed.
 *
 * **The wave-7 rider, landed (2 September 2026).** `#consistency` printed a
 * cation–anion balance, a TDS reconciliation and an EC : TDS ratio per bore
 * as five typed strings beside a table of ions that says something else, and
 * wave 7 recorded the debt rather than paying it because paying it moves a
 * drawn argument. Recomputed from `MAJOR_IONS`, **every balance on that
 * screen was wrong**, including the −7.8% at MW05 that the screen and
 * `#hydrochem` both reasoned from at length: the ions in this seed balance to
 * within 0.7% at every bore, and at MW05 to 0.04%. The screen follows the
 * computation.
 *
 * That is the typed-copy drift class in its purest form — a number nobody
 * checked, sitting next to the data that refutes it, load-bearing on two
 * screens for ten days.
 *
 * **What survives is the finding, on the check that actually fails.** The
 * ions at MW05 sum to 1698 mg/L of dissolved solids and the laboratory
 * reports 2240 — a 32% shortfall, well outside the ±10% the reconciliation
 * allows. That is the same reading the old panel argued ("a cation the suite
 * does not include") arriving at the same bore through the check that can
 * actually see it, and this time it is computed.
 *
 * Reported values are two per bore and they are exactly the two a laboratory
 * reports rather than calculates: total dissolved solids dried at 180 °C, and
 * electrical conductivity. MW05's conductivity is not typed either — it is
 * the last round in `EC_MW05`, the same 3410 µS/cm `#qc` and `#exceedances`
 * read.
 */
export const CONSISTENCY = (() => {
  /*
   * Equivalent weights, mg per meq — the gram formula weight over the charge.
   * They are constants of chemistry, not of this site, and they are the only
   * thing here that is not either measured or derived.
   */
  const EQUIVALENT = { Ca: 20.04, Mg: 12.15, Na: 22.99, K: 39.10, HCO3: 61.02, SO4: 48.03, Cl: 35.45 };
  const CATIONS = ['Ca', 'Mg', 'Na', 'K'];
  const ANIONS = ['HCO3', 'SO4', 'Cl'];

  /** The acceptance limits, stated where the numbers are made. */
  const LIMITS = {
    balance: 5,
    ratio: [0.9, 1.1],
    ecTds: [0.55, 0.75],
    balanceText: '± 5%',
    ratioText: '0.90 – 1.10',
    ecTdsText: '0.55 – 0.75',
  };

  /** What the laboratory reported, per bore. Nothing here is calculated. */
  const reported = {
    MW01A: { tds: 588, ec: 920 },
    MW03B: { tds: 803, ec: 1320 },
    MW05: { tds: 2240, ec: null },
    MW07: { tds: 925, ec: 1470 },
    MW09: { tds: 658, ec: 1010 },
    MW12: { tds: 515, ec: 800 },
  };

  const rows = Object.entries(MAJOR_IONS).map(([code, ions]) => {
    const cations = CATIONS.reduce((t, k) => t + ions[k], 0);
    const anions = ANIONS.reduce((t, k) => t + ions[k], 0);
    const balance = ((cations - anions) / (cations + anions)) * 100;
    const tdsCalc = Object.entries(ions).reduce((t, [k, v]) => t + v * EQUIVALENT[k], 0);
    // MW05's conductivity is the bore's own record, not a second copy of it.
    const ec = reported[code].ec ?? EC_MW05.at(-1).value;
    const tds = reported[code].tds;
    const ratio = tds / tdsCalc;
    const ecTds = tds / ec;
    const checks = [
      { key: 'balance', ok: Math.abs(balance) <= LIMITS.balance },
      { key: 'ratio', ok: ratio >= LIMITS.ratio[0] && ratio <= LIMITS.ratio[1] },
      { key: 'ecTds', ok: ecTds >= LIMITS.ecTds[0] && ecTds <= LIMITS.ecTds[1] },
    ];
    const failed = checks.filter((c) => !c.ok).map((c) => c.key);
    return {
      code,
      ions,
      cations: Number(cations.toFixed(2)),
      anions: Number(anions.toFixed(2)),
      balance: Number(balance.toFixed(2)),
      tdsCalc: Number(tdsCalc.toFixed(0)),
      tds,
      ec,
      ratio: Number(ratio.toFixed(2)),
      ecTds: Number(ecTds.toFixed(2)),
      failed,
      verdict: failed.length ? 'review raised' : 'consistent',
    };
  });

  /*
   * MW11 has a row and no numbers. It was dipped twice and found dry: there
   * is no water to have a chemistry, and a consistency check run over a
   * chemistry that does not exist is what wave 7 removed from this screen.
   * The bore stays on the register — one that vanishes reads as one that was
   * never on the programme.
   */
  const dry = FIELD_DISPOSITIONS.find((d) => d.code === 'dry');

  const raised = rows.filter((r) => r.failed.length);
  return {
    rows,
    dry,
    limits: LIMITS,
    equivalent: EQUIVALENT,
    cations: CATIONS,
    anions: ANIONS,
    raised,
    /** The bore the review item is on, resolved rather than named. */
    subject: raised[0] ?? null,
    counts: {
      bores: rows.length,
      consistent: rows.filter((r) => !r.failed.length).length,
      raised: raised.length,
      worstBalance: rows.reduce((w, r) => (Math.abs(r.balance) > Math.abs(w.balance) ? r : w)).balance,
    },
  };
})();

/** The import runs register. */
export const IMPORTS = [
  /*
   * Wave 8 — a logger download is an import run, and it is a different kind
   * of one (FR-3.10). `kind` tells the two apart because the difference is
   * the whole of FR-1.10: a laboratory deliverable commits **results**, and a
   * logger file commits **water levels**, which are held separately and are
   * never the same count. Adding them together on a stat tile would be the
   * conflation this requirement exists to prevent.
   *
   * `rows` is a getter, and deliberately: the number of rows this run read is
   * the number of water levels in the series it committed, and the series is
   * declared at the foot of this file because it needs the field round, the
   * bore's survey history and the instrument register to exist first. A
   * literal here would be a second copy of a count that is computed 4,000
   * lines down. It resolves when a screen renders, long after both.
   */
  {
    id: 'IMP-0243',
    kind: 'series',
    file: 'MOCK_MW05_LT-A1_20260531.lvlx + MOCK_BL-01_20260531.lvlx',
    format: 'Levelogic .lvlx v4 (MOCK)',
    lab: '— (logger download)',
    received: '2026-05-31 17:26',
    get rows() { return LOGGER_SERIES.counts.rowsRead; },
    held: 0,
    state: 'committed',
    by: 'A. Nakamura',
  },
  { id: 'IMP-0241', kind: 'results', file: 'PAS2026-04417_Wandalup_2026Q2.zip', format: 'ESdat ELDF-4', lab: 'Pilbara Analytical Services', received: '2026-05-21 09:14', rows: 231, held: 0, state: 'committed', by: 'A. Nakamura' },
  { id: 'IMP-0240', kind: 'results', file: 'PAS2026-04398_Wandalup_2026Q2_partial.zip', format: 'ESdat ELDF-4', lab: 'Pilbara Analytical Services', received: '2026-05-19 16:02', rows: 84, held: 6, state: 'reversed', by: 'A. Nakamura' },
  { id: 'IMP-0239', kind: 'results', file: 'YAR-26-0881_Wandalup_PFAS.csv', format: 'Yarra Regional v2', lab: 'Yarra Regional Analytical', received: '2026-05-18 11:47', rows: 42, held: 3, state: 'in review', by: 'D. Okafor' },
  { id: 'IMP-0238', kind: 'results', file: 'MOCK_Wandalup_ESdat_Legacy_Export.csv', format: 'ESdat legacy export', lab: '— (migration)', received: '2026-04-02 08:30', rows: 18740, held: 112, state: 'committed', by: 'system' },
];

/** The exception queue on IMP-0239, as the review screen shows it. */
export const REVIEW_ITEMS = [
  { kind: 'Analyte match', subject: 'PFHxS (linear)', detail: 'Row 18 · YAR-26-0881 · not in the analyte dictionary', confidence: 0.82, rows: 1, proposal: 'Perfluorohexane sulfonate — PFHxS · CAS 355-46-4', options: ['PFHxS (linear)', 'PFHxS (branched)', 'PFHxS — total'], escape: 'None of these — hold this row and ask the laboratory', consequence: 'The result joins the PFOS + PFHxS derived sum, which is evaluated against ANZG 2018.' },
  { kind: 'Unit conversion', subject: 'ng/L → µg/L', detail: 'Rows 18–29 · laboratory reported ng/L, dictionary holds µg/L', confidence: 0.99, rows: 12, proposal: 'Divide by 1000, carry the rule in lineage', options: ['ng/L → µg/L', 'keep ng/L', 'flag for review'], escape: 'None of these — hold these 12 rows', consequence: 'Applied to 12 results. The conversion and its factor are recorded on each one (PP3).' },
  { kind: 'Location identifier', subject: 'MW-05', detail: 'Rows 30–41 · no location with this code on MOCK-WDL', confidence: 0.94, rows: 12, proposal: 'MW05 — Downgradient of TSF, Superficial', options: ['MW05', 'MW05A'], escape: 'This is a bore we have not registered — create it, or hold these rows', consequence: 'Twelve results attach to a bore that already holds 38 rounds of history.' },
];

/** What the importer applied without asking, and why. */
export const APPLIED_UNASKED = [
  { what: 'Sulphate → Sulfate as SO₄', why: 'Exact synonym in the analyte dictionary', count: 7 },
  { what: 'mg/l → mg/L', why: 'Case normalisation, no conversion', count: 63 },
  { what: '−999 → analysis aborted', why: 'ESdat ELDF-4 sentinel, mapped by the format definition', count: 2 },
  { what: '−997 → text result', why: 'ESdat ELDF-4 sentinel, mapped by the format definition', count: 1 },
];

/**
 * The site's data quality objectives, as a version pair (PR-2c).
 *
 * A finding carries the rule version it was raised under — that is the
 * glossary's own words for a data quality objective, and it is why "Re-run
 * checks" has to say *against what*. This round's findings were raised on
 * 2026-05-19 under **2025.2**; **2026.1** took effect two days later and is
 * what is in force now, so the QA/QC screen shows both and the re-run control
 * names the one it would use.
 *
 * The span reaches forward only. Re-running does not re-judge a finding
 * already raised; it produces a second assessment under a second version, and
 * both stay readable.
 *
 * ## The matrix dimension — wave 16, 2 September 2026
 *
 * **The limits are the version's content, so they live here.** They were a
 * separate `QC_LIMITS.rules` array four thousand lines further down, which
 * meant a finding's rule text (`QAQC`, below) and the library's own row were
 * two copies of one number that agreed by hand. `QC_LIMITS.rules` is this
 * array now — the same object, not a matching one — and a finding reads the
 * row it was raised under rather than restating it. A matrix-scoped limit is
 * part of a data quality objective version's content the way an analyte is
 * part of a criteria set's; it is not a second version axis.
 *
 * **Every row states the matrix it was written for, and what says so.** The
 * words are the glossary's five and no others (`MATRIX_WORDS`, checked on
 * `QC_LIMITS`). Every one of these ten reads **Water**, and that is a
 * measurement rather than a default: this set was written for the groundwater
 * programme, its own basis is a water-quality sampling standard, and every
 * finding it has ever raised is on a water sample. `matrixSays` carries the
 * warrant per row, in the record's own strings — a water-quality standard, a
 * water method, or the bench control adopted for the water suite this set
 * governs. Where the record does not speak for another matrix, the row says
 * that rather than guessing on the laboratory's behalf.
 *
 * **Stating a matrix is not changing a limit.** A version governs the number,
 * the population and the consequence, and none of the three moves here: no
 * verdict re-derives, no finding is re-judged, and no version is created. The
 * field was always true of these limits and had never been written down. The
 * moment it *becomes* a version change is the moment a limit is written for a
 * second matrix — and this set has not been. One thing does move, and it moves
 * in the reader's head rather than in the record: a **soil** field duplicate is
 * now visibly held to a limit written for water, where before the library was
 * silent about matrix and the mismatch could only be read in a comment
 * (`SOIL.duplicate.matrix`).
 *
 * **`since` is derived, never typed.** A limit's effective date is its
 * version's, because the set records no limit carried forward from an earlier
 * one with a date of its own — and the one thing it does record about a row's
 * own history, that the field duplicate limit moved *on 2025-07-01*, is that
 * same date. Under the current version the two rows that moved take
 * **2026-05-21** and the eight that did not are carried forward at
 * **2025-07-01**, which is what "which limits, under which version, since
 * when" answers row by row.
 */
export const DQO = (() => {
  const used = {
    version: '2025.2',
    effective: '2025-07-01 → 2026-05-20',
    state: 'superseded',
    why: 'In force when this round’s checks were run, so it is what every finding on it was judged against.',
  };
  const current = {
    version: '2026.1',
    effective: '2026-05-21 →',
    state: 'in force',
    by: 'D. Okafor',
    approved: '2026-05-20 16:05 AWST',
    why: 'Two changes, both tightening: the field duplicate limit, and an explicit consequence on the equipment blank rule that 2025.2 stated no action for.',
  };

  /** The first date of an effective span, so a row's date is read off its version rather than typed beside it. */
  const startOf = (span) => span.match(/\d{4}-\d{2}-\d{2}/)[0];

  const limits = [
    {
      check: 'Field duplicate RPD', matrix: 'Water',
      limit: '≤ 30%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR',
      source: 'Site DQO, consistent with AS/NZS 5667.1',
      matrixSays: 'AS/NZS 5667.1 is a water-quality sampling standard, and this is the site’s own field control on the groundwater programme.',
      next: '≤ 25% — the 5 × LOR applicability rule unchanged',
    },
    {
      check: 'Laboratory duplicate RPD', matrix: 'Water',
      limit: '≤ 20%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR',
      source: 'PAS QA plan rev 8',
      matrixSays: 'Adopted from the laboratory’s plan for the water suite this set governs. What that plan states for any other matrix is not in this record, so this set does not speak for it.',
    },
    {
      check: 'Matrix spike recovery', matrix: 'Water',
      limit: '70 – 130%', applies: 'One per 20 samples per matrix per batch', fallback: '—',
      source: 'PAS QA plan rev 8',
      matrixSays: 'Its own population counts one spike per matrix per batch — that is the counting unit, not the scope. The figure this set carries was adopted for the water suite, and the only spike it has judged was on a water sample.',
      silent: 'States the limit and no consequence. A recovery outside it raises a finding; what that finding does to the batch is not written here, which is why the zinc propagation is a decision rather than a rule.',
    },
    {
      check: 'MS/MSD RPD', matrix: 'Water',
      limit: '≤ 30%', applies: 'Where a duplicate spike was run', fallback: '—',
      source: 'PAS QA plan rev 8',
      matrixSays: 'Adopted with the spike rule it belongs to, for the same water suite. No duplicate spike has been run on any other matrix on this project.',
    },
    {
      check: 'Laboratory control sample recovery', matrix: 'Water',
      limit: '80 – 120%', applies: 'One per batch, per method', fallback: '—',
      source: 'PAS QA plan rev 8',
      matrixSays: 'A bench control on the water methods this set governs. The soil investigation’s own batch carries no quality-control block in this record, so nothing here was adopted for it.',
    },
    {
      check: 'Surrogate recovery — PFAS', matrix: 'Water',
      limit: '70 – 130%', applies: 'Every sample, isotope-labelled',
      source: 'USEPA 1633',
      matrixSays: 'USEPA 1633 is written for several matrices; this set adopted it for the water PFAS suite, and no PFAS analysis on any other matrix exists on this project.',
    },
    {
      check: 'Method blank', matrix: 'Water',
      limit: '< LOR', applies: 'One per batch, per method', fallback: 'Detection above LOR qualifies every sample in the batch',
      source: 'PAS QA plan rev 8',
      matrixSays: 'A bench control on the water methods this set governs, on the same footing as the laboratory control sample beside it.',
    },
    {
      check: 'Field / trip / equipment blank', matrix: 'Water',
      limit: '< LOR', applies: 'One field and one trip blank per event; an equipment blank per equipment reuse',
      source: 'Site DQO',
      matrixSays: 'Its blanks are water by construction. A trip blank is a bottle of laboratory water, and the soil round’s own equipment blank is a rinsate — matrix water, poured over an excavator bucket, on a soil investigation.',
      next: '< LOR — and a detection above it qualifies every result for that analyte collected with the same equipment after the rinse, in that event',
    },
    {
      /*
       * The one row whose text is read rather than written, and the direction
       * is deliberate. `CONSISTENCY` states this limit where its arithmetic is
       * done — the numeric 5 the balance is compared against and the `± 5%` a
       * sentence prints — and it was written before this set existed. Two
       * registers holding one figure is the settlement this wave is made of,
       * so the library quotes the check rather than restating it, and the
       * finding that cites the limit, the internal-consistency screen and this
       * row are one string by identity.
       */
      check: 'Cation–anion balance', matrix: 'Water',
      limit: CONSISTENCY.limits.balanceText, applies: 'TDS > 100 mg/L', fallback: '± 10% below 100 mg/L, where analytical error dominates',
      source: 'APHA 1030E',
      matrixSays: 'APHA 1030E is a method for the examination of water and wastewater, and an ionic balance is a property of a water analysis. There is no solid-matrix reading of it.',
    },
    {
      check: 'Field parameter stabilisation', matrix: 'Water',
      limit: '3 consecutive readings in tolerance', applies: 'Low-flow purging',
      source: 'AS/NZS 5667.11',
      matrixSays: 'AS/NZS 5667.11 is the groundwater sampling standard, and low-flow purging is a groundwater act. Nothing is purged before a test pit is dug.',
    },
  ].map((r) => ({
    ...r,
    version: used.version,
    since: startOf(used.effective),
    /* A row that moved takes the current version's date; one that did not is carried forward with its own. */
    currentSince: r.next ? startOf(current.effective) : startOf(used.effective),
    carried: !r.next,
  }));

  return {
    set: 'Wandalup data quality objectives',
    basis: 'AS/NZS 5667.1, the laboratory’s NATA-scoped QA plan, and the site’s own DQOs where these are tighter.',
    raisedAt: '2026-05-19 10:22 AWST',
    used,
    current,
    limits,
    /** One row, by the closed check name the glossary's data quality check entry describes. */
    limitFor: (check) => limits.find((r) => r.check === check) ?? null,
    /**
     * Every statement that gained the matrix word, and exactly what it said
     * before — written down once, read wherever the new statement renders.
     *
     * This is wave 15's shape (`PFAS_REACH.was`) applied to a wave that moves
     * words rather than numbers. A before typed beside each surface would be
     * five copies of a history, and the first one edited would make the other
     * four wrong; each screen prints its own *live* statement, computed, and
     * reads its before from here.
     */
    matrixStated: [
      {
        id: 'library', where: `The ${limits.length} limit rows`, at: 'qc-limits',
        was: 'Every limit carried a number, a population, a fallback and a source — and no field anywhere said what material any of them was written for.',
      },
      {
        id: 'fd-2', where: 'The field duplicate finding’s rule text (FD-2)', at: 'qc',
        was: 'DQO 2025.2 · ≤ 30% above 5 × LOR',
      },
      {
        id: 'st-1', where: 'The stabilisation finding’s rule text (ST-1)', at: 'qc',
        was: 'DQO 2025.2 · 3 consecutive readings in tolerance, low-flow',
      },
      {
        id: 'dqa-precision', where: 'The precision dimension’s objective', at: 'dqa',
        was: '≤ 30% field, ≤ 20% laboratory, above 5 × LOR',
      },
      {
        id: 'dqa-accuracy', where: 'The accuracy dimension’s objective', at: 'dqa',
        was: '80–120% LCS, 70–130% MS',
      },
      {
        id: 'dqa-representativeness', where: 'The representativeness dimension’s objective', at: 'dqa',
        was: '3 consecutive readings in tolerance before collection',
      },
      {
        id: 'soil-duplicate', where: 'The soil field duplicate’s limit', at: 'composite',
        was: 'The round’s single field-duplicate limit, read off the version-change record rather than off the library row, and stated as “≤ 30%” with nothing about the material it was written for.',
      },
    ],
    /** The before for one surface, by name, so a screen cannot quote the wrong one. */
    wasStated(id) {
      return this.matrixStated.find((s) => s.id === id) ?? null;
    },
    changes: [
      {
        check: 'Field duplicate RPD',
        was: '≤ 30%',
        now: '≤ 25%',
        what: 'The limit only. The 5 × LOR applicability rule is unchanged.',
      },
      {
        check: 'Field / trip / equipment blank',
        was: '< LOR, with no stated consequence',
        now: '< LOR — and a detection above it qualifies every result for that analyte collected with the same equipment after the rinse, in that event',
        what: 'The number did not move. What 2026.1 adds is the propagation rule 2025.2 left to a judgement, which is why one finding on this round stops needing a decision under it.',
      },
    ],
  };
})();

/**
 * The laboratory batch the zinc question is about, named once.
 *
 * Its id is the submission work order (W7-A-3): PAS reports the metals run
 * under PAS-WO-268841, the number the whole submission travels under, so the
 * same identifier names the custody hop's physical origin on `#ecoc` and this
 * batch. The subcontracted PFAS run does not share the convention — Yarra
 * Regional issues its own batch id — and the S1 chain's prose states this
 * where both render.
 *
 * `BATCHES` reads its sample count from here rather than typing a second copy,
 * because "how many results does this failed spike reach" is the question the
 * propagation basis exists to answer and two numbers for it would be worse
 * than none.
 */
export const METALS_BATCH = {
  id: 'PAS-WO-268841',
  laboratory: 'Pilbara Analytical Services',
  method: 'USEPA 200.8 — dissolved metals',
  samples: 9,
  analyte: 'Zinc (filtered)',
  spiked: 'WDL-26Q2-005',
  spikedFrom: 'MW07',
};

/**
 * QA/QC evaluation for the round — every check, and what it is still waiting
 * on somebody to decide.
 *
 * **Rebuilt 1 September 2026 (wave 6, PR-2).** The practitioner review called
 * the analytical logic one of the strongest parts of the mockup and then said
 * exactly what was wrong with the surface over it: eyes go from *"10 passed ·
 * 6 warnings · 3 failed"* to *"Advance to validated"* and stop. Pass, warn and
 * fail are the **outcome** of a check. They are not the question a
 * hydrogeologist arrives with, which is *what is still mine to decide*.
 *
 * Three concepts were mixed under one word, and every row below now says which
 * it is:
 *
 * - **`outcome`** — the check ran and passed. Nothing followed, nothing is
 *   owed. Ten of the nineteen.
 * - **`automatic`** — a deterministic rule fired and did something to the
 *   data, and the rule is named on the row. A holding time exceeded quarantines
 *   the result; a reporting limit above a criterion records the outcome as
 *   indeterminate. Neither is a judgement and neither should wait for one.
 * - **`decision`** — the finding needs a hydrogeologist. Blank contamination
 *   that *might* be carry-over, an electrical conductivity step that might be
 *   a spike or might be the bore's new normal, and a failed matrix spike whose
 *   qualifier will or will not reach eight results nobody spiked. A product
 *   that dispositions these silently has made a professional judgement in
 *   somebody's name.
 *
 * The workflow is **Unresolved → Reviewed → Dispositioned → Ready for
 * validation**, and it is a different axis from `ValidationState`: this one
 * runs over *findings*, and the round becomes ready for the validation move
 * only when nothing is unresolved. Every count on the screen is derived from
 * these rows.
 *
 * **Every qualifier that reached a result names its basis** (PR-2b). One of
 * four: the laboratory said it in the deliverable · a project data quality
 * objective rule applies · a named person dispositioned it · it is specific to
 * the sample it was raised on. "That is exactly the type of thing an auditor
 * may ask five years later", and it is the difference between a qualifier and
 * an inference wearing one.
 */
/**
 * A finding's rule text, composed from the limit row it was raised under.
 *
 * Wave 16. It was typed — `'DQO 2025.2 · ≤ 30% above 5 × LOR'` beside a library
 * row reading `≤ 30%`, which is two statements of one number agreeing by hand
 * and one edit away from disagreeing. It reads the row now, and the row states
 * the matrix, so a finding says which material its rule was written for. That
 * costs nothing where they match — these findings are on water and the rule is
 * a water rule — and it is the whole point where they do not.
 *
 * The version does **not** move: the row this reads is `DQO.limits`, which
 * carries the 2025.2 numbers, and these findings were raised under 2025.2.
 */
const ruleText = (check, tail) => {
  const r = DQO.limitFor(check);
  return `DQO ${r.version} · ${r.matrix.toLowerCase()} · ${tail(r)}`;
};

/**
 * A limit, quoted from the library row rather than retyped.
 *
 * Wave 16, and the same move as `ruleText` one field over. Seven findings
 * cited a number the objective set holds and every one of them typed it, which
 * is seven second sources for six figures — and two were already drifting from
 * the library's own spelling (`80–120%` here against `80 – 120%` there, and the
 * same for the spike range). Fixing only the field duplicate, the check this
 * wave settled, would have left its siblings typed beside a derived neighbour,
 * so all seven read the row.
 *
 * `lower` is the one place a range is read at one end: the batch's consequence
 * sentence is about a recovery *below* the lower bound, and the bound comes out
 * of the row's own string rather than being written again beside it.
 */
const limitOf = (check) => DQO.limitFor(check).limit;
const lowerBound = (check) => limitOf(check).split('–')[0].trim();

const QAQC_ROWS = [
  {
    id: 'HT-1', check: 'Holding time', scope: 'Nitrate as N · MW09', outcome: 'fail',
    detail: 'Analysed 6 days after collection against a 2-day window (APHA 4500-NO₃⁻).',
    action: 'Quarantined · excluded from evaluation',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Holding-time window', version: 'APHA 4500-NO₃⁻ · 2 days from collection', says: 'A result analysed outside its method window is quarantined and takes no part in evaluation. There is no judgement in it: the clock ran from collection through transit to the bench, and it ran out.' },
    results: 1, qualifier: null,
    basis: { kind: 'sample', says: 'The one result. A holding time is a fact about this sample’s own clock and reaches nothing else.' },
  },
  {
    id: 'HT-2', check: 'Holding time', scope: '229 of 231 results', outcome: 'pass',
    detail: 'Within method windows from collection through preparation to analysis.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'LOR-1', check: 'Reporting limit above criterion', scope: 'Cadmium (filtered) · all 7 bores', outcome: 'fail',
    detail: 'LOR 1.0 µg/L sits above the ANZG 2018 criterion of 0.54 µg/L. Nothing can be asserted.',
    action: 'Outcome recorded as indeterminate — not as a pass',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Reporting limit against the applicable criterion', version: 'Deterministic — ANZG 2018 · 2018.1', says: 'A limit above the criterion means nothing was measured either way. The comparison is arithmetic on two numbers that are both on the record, so the outcome is written rather than proposed — and it is written as indeterminate, which is not a pass.' },
    results: 7, qualifier: null,
    basis: { kind: 'dqo', says: 'The criteria set’s own guideline value against the laboratory’s own reporting limit. No person and no laboratory assertion is involved.' },
  },
  {
    id: 'FD-1', check: 'Field duplicate RPD', scope: 'WDL-26Q2-005 / WDL-26Q2-008 · MW07', outcome: 'pass',
    detail: `All 14 paired analytes within the ${limitOf('Field duplicate RPD')} limit. Largest: sulfate at 11.4%.`,
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
    rerun: { version: '2026.1', outcomeMoves: false, says: 'The largest RPD in the pair is 11.4%, so the tightened 25% limit does not reach it.' },
  },
  {
    id: 'FD-2', check: 'Field duplicate RPD', scope: 'WDL-26Q2-003 / WDL-26Q2-004 · MW05', outcome: 'warn',
    detail: `Zinc 21.4 and 31.6 µg/L — RPD 38.2% against the ${limitOf('Field duplicate RPD')} limit. Both results above 5 × LOR, so the percentage test applies and this is a real disagreement rather than noise near the limit.`,
    action: 'Qualifier J assigned — estimated',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Field duplicate RPD', version: ruleText('Field duplicate RPD', (r) => `${r.limit} above 5 × LOR`), says: 'The site’s own objective states the limit, the applicability, the matrix it was written for and the consequence, so the qualifier follows from the rule rather than from a view about this pair.' },
    results: 2, qualifier: 'J',
    basis: { kind: 'dqo', says: `Project DQO ${DQO.used.version}, Field duplicate RPD — matrix ${DQO.limitFor('Field duplicate RPD').matrix.toLowerCase()}, and this pair is water. The rule states its own consequence, so the propagation is the rule’s and the version rides on the finding.` },
    reaches: 'The parent and its duplicate — two results, both at MW05. It does not reach the other six bores: a field duplicate says what happened at the bore it was collected at.',
    rerun: { version: '2026.1', outcomeMoves: false, says: 'Already outside the 30% limit, so it is outside the 25% one. The finding would be raised again under 2026.1 with the same consequence.' },
  },
  {
    id: 'FD-3', check: 'Field duplicate RPD', scope: 'Cadmium · WDL-26Q2-003 / WDL-26Q2-004', outcome: 'pass',
    detail: 'Both results below 5 × LOR, so the absolute-difference test applies rather than RPD: 0 µg/L against a 2 × LOR allowance. An RPD here would have been arithmetic on noise.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
    rerun: { version: '2026.1', outcomeMoves: false, says: 'The applicability rule did not move in 2026.1, so this pair is still tested by absolute difference and the tightened percentage never applies to it.' },
  },
  {
    id: 'LD-1', check: 'Laboratory duplicate RPD', scope: 'PAS-WO-268841 · split of WDL-26Q2-003', outcome: 'pass',
    detail: `Maximum RPD 4.1% (sulfate) against the ${limitOf('Laboratory duplicate RPD')} limit across 14 analytes.`,
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'MB-1', check: 'Method blank', scope: 'PAS-WO-268841 · MB-268841', outcome: 'pass',
    detail: 'Every analyte below the limit of reporting in the preparation blank.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'LCS-1', check: 'Laboratory control sample', scope: 'PAS-WO-268841 · LCS-268841', outcome: 'pass',
    detail: `Recovery 96–104% across 8 analytes against the ${limitOf('Laboratory control sample recovery')} limit.`,
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'MS-1', check: 'Matrix spike recovery', scope: 'PAS-WO-268841 · zinc', outcome: 'fail',
    detail: `Zinc recovered 62% against the ${limitOf('Matrix spike recovery')} limit, reproduced at 64% on the spike duplicate. Matrix interference, not a one-off.`,
    action: 'Proposed: qualifier L — biased low — on all 9 zinc results in the batch. Not applied; the basis has not been chosen.',
    concept: 'decision', state: 'unresolved',
    results: 9, qualifier: 'L', proposed: true,
    /*
     * PR-2b, drawn as the review asked. The old row applied qualifier L to
     * nine results and said only that the batch spike had failed, which reads
     * as though the laboratory or a rule had propagated it. Neither did. The
     * certificate reports the spike recovery on its QC page and qualifies no
     * sample result; DQO 2025.2 states the recovery limit and no consequence.
     * So the honest basis for the drawn case is the third one, and it is drawn
     * as exactly that: a decision, with the batch-wide option as one choice and
     * its consequence stated.
     */
    decision: {
      question: 'Zinc recovered 62% in this water and reproduced at 64%. Which zinc results does that reach, and on whose authority?',
      matters: 'Nine results are in the batch and one of them is the MW05 exceedance at 31.6 µg/L. A recovery below 100% biases low, so a qualified exceedance is understated rather than doubtful — but the qualifier is an assertion about eight samples nobody spiked, and an auditor five years from now will ask who made it.',
      options: [
        {
          label: 'The laboratory’s qualifier applies batch-wide',
          basis: 'laboratory',
          writes: 'Qualifier L on 9 results, origin laboratory, attributed to Pilbara Analytical Services.',
          available: false,
          why: 'Not available on this certificate. PAS-WO-268841 reports the spike recovery on its QC page and carries no result-level qualifier, so taking this option would attribute to the laboratory something it did not say.',
        },
        {
          label: 'A project data quality objective rule applies',
          basis: 'dqo',
          writes: 'Qualifier L on every zinc result in the batch, origin rule, with DQO 2025.2 named on each.',
          available: false,
          why: `Not available under ${DQO.used.version}. Its matrix spike rule states the ${limitOf('Matrix spike recovery')} limit and no propagation action, and a rule that says nothing cannot be cited as having said this. Adding the action is a new DQO version, and that is where it belongs.`,
        },
        {
          label: 'A hydrogeologist’s disposition — batch-wide',
          basis: 'disposition',
          writes: 'Qualifier L on 9 results, origin manual, naming you, the date, and the reason you give. Every result carries “dispositioned by” rather than a rule reference.',
          available: true,
          why: 'The honest basis for this case: the interference is reproducible across the spike duplicate, the batch is one water type from one round, and extending it is a professional judgement somebody has to own.',
        },
        {
          label: 'Sample-specific only',
          basis: 'sample',
          writes: 'Qualifier L on 1 result — zinc in WDL-26Q2-005, the sample the spike was made from. The other eight carry nothing.',
          available: true,
          why: 'Defensible and narrow: a spike measures recovery in the aliquot it was added to. It leaves the MW05 exceedance unqualified, which is the consequence to weigh.',
        },
      ],
      refused: 'Apply it silently because the spike failed. That is the inference the review named — a propagated qualifier with no basis on it is indistinguishable from one somebody decided, and only one of those survives a challenge.',
    },
  },
  {
    id: 'FB-1', check: 'Field blank', scope: 'WDL-26Q2-QC1', outcome: 'pass',
    detail: 'All analytes below LOR.', action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'TB-1', check: 'Trip blank', scope: 'WDL-26Q2-QC2', outcome: 'pass',
    detail: 'All analytes below LOR.', action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'EB-1', check: 'Equipment blank', scope: 'WDL-26Q2-QC3 · bladder pump, after MW05', outcome: 'warn',
    detail: 'Zinc 1.4 µg/L in the equipment rinsate against a 1.0 µg/L LOR. The pump was reused between MW05 and MW07, and MW07 is the other zinc exceedance this round.',
    action: 'MW07 zinc raised for review — carry-over cannot be ruled out, and has not been ruled in',
    concept: 'decision', state: 'unresolved',
    results: 1, qualifier: 'B', proposed: true,
    decision: {
      question: 'Zinc is in the rinsate at 1.4 µg/L. Is MW07’s 9.4 µg/L formation water, carry-over from MW05, or both?',
      matters: 'MW07’s zinc is an exceedance at 1.2× the guideline value, and the rinsate is 15% of it. The field record has the pump moved from MW05 — a bore reading 31.6 µg/L — and rinsed at the vehicle before it went down MW07, which is the right order and does not make the question go away.',
      options: [
        {
          label: 'Qualify MW07’s zinc as blank-affected',
          basis: 'disposition',
          writes: 'Qualifier B on 1 result, origin manual, naming you and your reason. The exceedance stands and is annotated; it is not withdrawn.',
          available: true,
          why: 'The rinsate is a real detection above the limit of reporting on the analyte and the equipment in question.',
        },
        {
          label: 'Resample MW07 for zinc with dedicated equipment',
          basis: 'disposition',
          writes: 'A field task on the programme, and the exceedance stays open pending it. Nothing is qualified in the meantime.',
          available: true,
          why: 'The only option that answers the question instead of annotating it — and MW05 and MW07 are already on the escalated monthly programme, so the visit is due within weeks.',
        },
        {
          label: 'Accept the result — the rinsate is 15% of the value',
          basis: 'disposition',
          writes: 'The finding is dispositioned with your reason and no qualifier. It stays on the record as a decision that was made, not as a check that passed.',
          available: true,
          why: 'Defensible if the carry-over cannot account for the exceedance. It is still a judgement and it is still yours.',
        },
      ],
      refused: 'Treat the warning as noise and advance the round. A blank detection on the analyte that is exceeding, on the equipment that visited both bores, is the one warning on this screen that must not be cleared by scrolling past it.',
    },
    rerun: {
      version: '2026.1', outcomeMoves: false, conceptMoves: 'automatic', results: 1,
      says: 'Under 2026.1 this stops being a decision. The blank rule gains an explicit consequence — a detection above the limit of reporting qualifies every result for that analyte collected with the same equipment after the rinse — so MW07’s zinc would take qualifier B automatically, with the rule and its version as the basis instead of a person.',
    },
  },
  {
    id: 'SR-1', check: 'Surrogate recovery', scope: 'PFAS batch YAR-B-118420', outcome: 'pass',
    detail: `M8PFOS recovery 94% (limit ${limitOf('Surrogate recovery — PFAS')}) on every sample.`,
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'ST-1', check: 'Field parameter stabilisation', scope: 'MW09', outcome: 'warn',
    // Composed below, beside the PURGE derivation it reads from — a typed
    // literal here would be a dead initializer that could reactivate if the
    // override moved (W6-A-5, W6-A-6).
    detail: null,
    action: 'Qualifier T on every metal result from this sample',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Field parameter stabilisation', version: ruleText('Field parameter stabilisation', (r) => `${r.limit}, low-flow`), says: 'The purge record carries the readings and the tolerances, so whether the parameters held is computed rather than judged. What was judged is whether to sample anyway, and the field officer did that at the bore and said so.' },
    results: 8, qualifier: 'T',
    basis: { kind: 'sample', says: 'Sample-specific — every metal result from WDL-26Q2-006 and nothing beyond it. Stabilisation is a fact about one purge at one bore on one visit.' },
    reaches: 'A filtered metal from a turbid bore reads high, and nobody can tell afterwards whether that was formation water or suspended sediment. The qualifier says which question is open.',
  },
  /*
   * Wave 8's rider reaches this row. It read "Cation–anion balance −7.8%
   * against a ±5% acceptance limit" — the same typed number `#consistency`
   * carried, and the ions refute it. The finding survives on the check that
   * can see it, and every number in it is now read from `CONSISTENCY`.
   */
  {
    id: 'IB-1', check: 'Ionic balance and TDS reconciliation', scope: CONSISTENCY.subject.code, outcome: 'warn',
    detail:
      `Cation–anion balance ${CONSISTENCY.subject.balance > 0 ? '+' : '−'}${Math.abs(CONSISTENCY.subject.balance).toFixed(2)}%, inside the ${CONSISTENCY.limits.balanceText} limit. Reported dissolved solids ${CONSISTENCY.subject.tds.toLocaleString('en-AU')} mg/L against ${CONSISTENCY.subject.tdsCalc.toLocaleString('en-AU')} calculated from the reported ions — a ratio of ${CONSISTENCY.subject.ratio.toFixed(2)} against ${CONSISTENCY.limits.ratioText}.`,
    action: 'Review item raised — a third of the mass is unaccounted for',
    concept: 'decision', state: 'reviewed',
    results: 0, qualifier: null,
    review: {
      by: 'A. Nakamura', at: '2026-05-20 11:12 AWST',
      found: `Sulfate re-read against the certificate at ${Math.round(CONSISTENCY.subject.ions.SO4 * CONSISTENCY.equivalent.SO4).toLocaleString('en-AU')} mg/L — transcription is not the explanation, and the charges balance, so the suite is coherent as far as it goes. The likeliest reading is a constituent the suite does not include, and the laboratory has been asked whether they can report it from the retained sample.`,
      next: 'Waiting on Pilbara Analytical Services. Nothing has been qualified and nothing has been dispositioned, because the answer decides which.',
    },
  },
  {
    id: 'ET-1', check: 'EC : TDS ratio', scope: `${CONSISTENCY.counts.bores} bores`, outcome: 'pass',
    detail: `All within ${CONSISTENCY.limits.ecTdsText} of the expected relationship.`,
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'SH-1', check: 'Spike against history', scope: 'Arsenic · MW05', outcome: 'warn',
    detail: '28.4 µg/L is 2.4× the location’s prior rolling median of 11.8 µg/L.',
    action: 'Dispositioned — confirmed against the certificate; real, not transcription',
    concept: 'decision', state: 'dispositioned',
    results: 1, qualifier: null,
    disposition: {
      by: 'A. Nakamura', role: 'Hydrogeologist', at: '2026-05-20 09:41 AWST',
      chose: 'Accept the value and leave it unqualified',
      why: 'Read against the certificate and against the arsenic series: the rise is the third consecutive quarter and it tracks sulfate and conductivity at the same bore. A transcription error does not do that.',
      wrote: 'The finding is closed with a reason on it, and no qualifier reached the result. A finding closed without a qualifier is still a decision somebody made.',
    },
  },
  {
    id: 'SH-2', check: 'Spike against history', scope: 'Electrical conductivity · MW05', outcome: 'warn',
    detail: 'SPIKE_DETAIL',
    action: 'Review item raised — flagged against the bore’s own record, not against a limit',
    concept: 'decision', state: 'unresolved',
    results: 1, qualifier: null,
    decision: {
      question: 'Is this a step in the bore’s own chemistry, or a spike in one round’s number?',
      matters: 'It is not a regulatory question and the screen must not let it become one: the licence question about conductivity is a separate exceedance against Table 4, already open. This finding is about whether the bore’s record has moved, which is what decides whether the next round is a comparison or a confirmation.',
      options: [
        {
          label: 'Accept as a real step — the bore has changed',
          basis: 'disposition',
          writes: 'The finding is closed with your reason. No qualifier reaches the result, and the trend test is re-run over the series including this round.',
          available: true,
          why: 'Consistent with sulfate and hardness moving together at this bore, and with the TSF-seepage reading the interpretation already argues.',
        },
        {
          label: 'Hold for the next round before deciding',
          basis: 'disposition',
          writes: 'The finding stays open and is carried onto 2026-Q3-GW’s QA/QC as a standing question, with the round it came from named. Nothing is qualified.',
          available: true,
          why: 'One reading cannot separate a step from a spike, and the escalated monthly programme means the next reading is weeks away rather than a quarter.',
        },
        {
          label: 'Qualify the result as suspect pending confirmation',
          basis: 'disposition',
          writes: 'A reviewer qualifier on 1 result, origin manual, naming you. It travels with the value into every figure and export until it is removed.',
          available: true,
          why: 'Available and rarely right: a value flagged against its own history is not a value in doubt, and a qualifier that says otherwise will be read as a laboratory’s.',
        },
      ],
      refused: 'Treat it as an exceedance. A historical anomaly is not a regulatory exceedance, and a screen that ran the two together would raise obligations nobody owes.',
    },
  },
];

export const QAQC = QAQC_ROWS.map((r) => {
  if (r.id === 'SH-2') {
    return {
      ...r,
      // The same check, on the series `EC_MW05` holds. Its numbers are computed
      // in EC_MW05_OUTLIER rather than written here, so the row and the working
      // on the screen cannot come apart.
      detail: `${EC_MW05_OUTLIER.value} against a prior-round median of ${EC_MW05_OUTLIER.median} at this bore — a modified z-score of ${EC_MW05_OUTLIER.score} on ${EC_MW05_OUTLIER.n} rounds of its own record, against a ${EC_MW05_OUTLIER.threshold} threshold.`,
    };
  }
  /*
   * Wave 17's adversarial sweep, in the one place it found the wave-15 shape.
   *
   * MS-1's card typed its own result count five times beside a facts row that
   * already computed it from `results`: *"Nine results are in the batch"*, an
   * action line reading *"on all 9 zinc results"*, two options writing *"on 9
   * results"*, and two sentences calling the unspiked remainder *"eight"*.
   * That is exactly what the rollback card was caught doing in wave 15 — one
   * number, derived on one panel and typed on the next — and the fix is the
   * same one: the row's own `results` is the only place it is written, and the
   * unspiked count is that number less the one aliquot the spike was made in.
   * Nothing here says anything new; every figure is the figure it already was.
   */
  if (r.id === 'MS-1') {
    const n = r.results;
    const unspiked = n - 1;
    return {
      ...r,
      action: `Proposed: qualifier ${r.qualifier} — biased low — on all ${n} zinc results in the batch. Not applied; the basis has not been chosen.`,
      decision: {
        ...r.decision,
        matters: `${n} results are in the batch and one of them is the MW05 exceedance at 31.6 µg/L. A recovery below 100% biases low, so a qualified exceedance is understated rather than doubtful — but the qualifier is an assertion about ${unspiked} samples nobody spiked, and an auditor five years from now will ask who made it.`,
        options: r.decision.options.map((o) => {
          if (o.basis === 'laboratory') {
            return { ...o, writes: `Qualifier ${r.qualifier} on ${n} results, origin laboratory, attributed to ${METALS_BATCH.laboratory}.` };
          }
          if (o.basis === 'disposition') {
            return { ...o, writes: `Qualifier ${r.qualifier} on ${n} results, origin manual, naming you, the date, and the reason you give. Every result carries “dispositioned by” rather than a rule reference.` };
          }
          if (o.basis === 'sample') {
            return { ...o, writes: `Qualifier ${r.qualifier} on 1 result — zinc in ${METALS_BATCH.spiked}, the sample the spike was made from. The other ${unspiked} carry nothing.` };
          }
          return o;
        }),
      },
    };
  }
  return r;
});

/**
 * The decision layer — the screen's headline, counted rather than typed.
 *
 * `needDecision` is the number the review wants a practitioner's eye to land
 * on first, and `ready` is false while it is above zero. That is the whole
 * redesign in two fields: the control that used to be one click from a
 * pass/warn/fail triad now states which named findings are between the round
 * and the validation move.
 */
export const QC_DECISIONS = (() => {
  const by = (p) => QAQC.filter(p);
  const state = (s) => by((q) => q.state === s);
  const needDecision = state('unresolved');
  const rerun = by((q) => q.rerun);
  return {
    checks: QAQC.length,
    passed: by((q) => q.outcome === 'pass').length,
    warned: by((q) => q.outcome === 'warn').length,
    failed: by((q) => q.outcome === 'fail').length,
    automatic: by((q) => q.concept === 'automatic').length,
    reviewed: state('reviewed').length,
    dispositionedByPerson: by((q) => q.state === 'dispositioned' && q.concept === 'decision').length,
    dispositioned: state('dispositioned').length,
    clear: state('clear').length,
    needDecision: needDecision.length,
    needDecisionRows: needDecision,
    resultsAwaiting: needDecision.reduce((n, q) => n + q.results, 0),
    ready: needDecision.length === 0,
    workflow: [
      { state: 'unresolved', label: 'Unresolved', n: state('unresolved').length, means: 'A finding nobody has looked at, or has looked at and not decided. The round cannot leave this state on its own.' },
      { state: 'reviewed', label: 'Reviewed', n: state('reviewed').length, means: 'Somebody has read it and recorded what they found, and the disposition is waiting on something outside this screen.' },
      { state: 'dispositioned', label: 'Dispositioned', n: state('dispositioned').length, means: 'Settled — by a deterministic rule that names itself, or by a person who names themselves. Both are on the record and they are told apart.' },
      { state: 'clear', label: 'Ready for validation', n: state('clear').length, means: 'The check passed and nothing followed. It is not a decision that was made; it is a decision that was never owed.' },
    ],
    /** What re-running under the current version would and would not move. */
    rerunUnderCurrent: {
      version: DQO.current.version,
      considered: rerun.length,
      outcomesMoved: rerun.filter((q) => q.rerun.outcomeMoves).length,
      conceptsMoved: rerun.filter((q) => q.rerun.conceptMoves).length,
      resultsNewlyQualified: rerun.filter((q) => q.rerun.conceptMoves).reduce((n, q) => n + (q.rerun.results ?? 0), 0),
      rows: rerun,
    },
  };
})();

/** Exceedances on the round, as the register lists them. */
export const EXCEEDANCES = [
  { location: 'MW05', analyte: 'Arsenic (filtered)', value: '28.4 µg/L', criterion: 'ANZG 2018 · 95% · 13 µg/L', factor: '2.2×', run: '3rd consecutive quarter', tarp: 'Level 2', state: 'open' },
  { location: 'MW05', analyte: 'Zinc (filtered)', value: '31.6 µg/L', criterion: 'ANZG 2018 · 95% · 8.0 µg/L', factor: '4.0×', run: '2nd consecutive quarter', tarp: 'Level 2', state: 'open' },
  { location: 'MW05', analyte: 'Nickel (filtered)', value: '14.2 µg/L', criterion: 'ANZG 2018 · 95% · 11 µg/L', factor: '1.3×', run: 'first', tarp: 'Level 1', state: 'open' },
  { location: 'MW05', analyte: 'Copper (filtered)', value: '6.4 µg/L', criterion: 'ANZG 2018 · 95% · 1.4 µg/L', factor: '4.6×', run: '4th consecutive quarter', tarp: 'Level 2', state: 'acknowledged' },
  { location: 'MW05', analyte: 'PFOS + PFHxS', value: '4.8 ng/L', criterion: 'ANZG 2018 · 95% · 0.13 ng/L', factor: '37×', run: 'first', tarp: 'Level 3', state: 'notified' },
  { location: 'MW05', analyte: 'pH', value: '8.91', criterion: 'Licence Table 4 · 6.5 – 8.5', factor: '—', run: 'first', tarp: '—', state: 'open' },
  { location: 'MW05', analyte: 'Electrical conductivity', value: '3410 µS/cm', criterion: 'Licence Table 4 · ≤ 2500 µS/cm', factor: '1.4×', run: '2nd consecutive quarter', tarp: 'Level 1', state: 'open' },
  { location: 'MW05', analyte: 'Nitrate as N', value: '11.8 mg/L', criterion: 'Licence Table 4 · ≤ 10 mg/L', factor: '1.2×', run: 'first', tarp: '—', state: 'open' },
  { location: 'MW07', analyte: 'Zinc (filtered)', value: '9.4 µg/L', criterion: 'ANZG 2018 · 95% · 8.0 µg/L', factor: '1.2×', run: 'first', tarp: 'Level 1', state: 'open' },
];

/**
 * The consecutive-round condition, evaluated (FR-5.2).
 *
 * A licence condition of this shape is not a description of the data — it is a
 * rule that *decides* something, and the decision is a stored outcome with the
 * rounds it was computed from and the rule version that computed it (PP3). The
 * register above says "2nd consecutive quarter" as a fact about a row; this
 * says what the condition did with that fact, which is the part an inspector
 * asks about.
 *
 * Three things are drawn rather than claimed. The **run is counted, not typed**
 * — it is the trailing streak of rounds above the criterion, so it cannot drift
 * from the values beside it. The **window is fixed at four rounds** because the
 * condition needs to see three and one more to show that the fourth did not
 * start a new run. And a **triggered condition names the round it tripped on**:
 * a rule that re-raises its obligation every quarter it stays true would bury
 * the quarter it first became true, which is the one the deadline runs from.
 *
 * Electrical conductivity reads its four values out of `EC_MW05`, the same
 * array `#qc` measures the outlier against. One series, two questions.
 */
/**
 * The condition, as one function, so a re-run cannot use a second rule.
 *
 * An amended certificate re-runs this window over a changed value, and the
 * before-and-after is only evidence if both sides came out of the same
 * arithmetic. A second copy of the rule written beside the preview is how a
 * preview comes to disagree with the evaluation it is previewing.
 */
export function evaluateWindow(values, limit, rounds) {
  let run = 0;
  for (let i = values.length - 1; i >= 0 && values[i] > limit; i -= 1) run += 1;
  let trippedAt = null;
  let streak = 0;
  for (let i = 0; i < values.length; i += 1) {
    streak = values[i] > limit ? streak + 1 : 0;
    if (streak === 3 && !trippedAt) trippedAt = rounds[i];
  }
  return {
    run,
    above: values.map((v) => v > limit),
    trippedAt,
    outcome: run >= 3 ? 'triggered' : run === 2 ? 'one round short' : 'not triggered',
  };
}

export const WINDOW_CONDITION = (() => {
  const rounds = ['2025-Q3-GW', '2025-Q4-GW', '2026-Q1-GW', '2026-Q2-GW'];
  const ecByRound = Object.fromEntries(EC_MW05.map((r) => [r.round, r.value]));
  const series = [
    {
      location: 'MW07', analyte: 'Zinc (filtered)', unit: 'µg/L',
      criterion: 'ANZG 2018 · 95% · 8.0 µg/L', limit: 8.0,
      values: [2.6, 3.1, 4.8, 9.4],
      says: 'The first round above the criterion at this bore. Two more consecutive rounds would oblige a notification; one round below resets the count to nothing.',
      also: 'The equipment blank taken after the pump was used at MW05 carries 1.4 µg/L of zinc, so carry-over cannot be ruled out on this result — a run that begins on a qualified result is worth watching rather than acting on.',
    },
    {
      location: 'MW05', analyte: 'Zinc (filtered)', unit: 'µg/L',
      criterion: 'ANZG 2018 · 95% · 8.0 µg/L', limit: 8.0,
      values: [6.9, 7.4, 18.2, 31.6],
      says: 'One round short. A third consecutive exceedance in 2026 Q3 trips the condition, and the monthly programme now running at this bore means that round arrives in weeks rather than in a quarter.',
    },
    {
      location: 'MW05', analyte: 'Copper (filtered)', unit: 'µg/L',
      criterion: 'ANZG 2018 · 95% · 1.4 µg/L', limit: 1.4,
      values: [2.1, 3.0, 4.7, 6.4],
      says: 'Tripped on 2026-Q1-GW, which is the round the 30-day clock ran from. This round extends the run and raises nothing new — the obligation is the one already lodged, and the response it obliged is the TARP Level 2 escalation in force since 2026-03-01.',
    },
    {
      location: 'MW05', analyte: 'Electrical conductivity', unit: 'µS/cm',
      criterion: 'Licence Table 4 · ≤ 2500 µS/cm', limit: 2500,
      values: rounds.map((r) => ecByRound[r]),
      says: 'One round short, on the licence limit rather than a guideline value. The same four numbers are the tail of the record the QA/QC outlier check measured this round’s value against — one series, two questions, and they do not have the same answer.',
    },
  ].map((s) => ({ ...s, ...evaluateWindow(s.values, s.limit, rounds) }));
  return {
    condition: 'L8842/2019/1 condition 12(c)',
    rule: 'Three consecutive quarterly rounds above the criterion, at the same location, for the same parameter',
    schedule: 'Copper, zinc and electrical conductivity, at MW05, MW07, MW09 and MW11',
    obliges: 'Notify the CEO and lodge a groundwater investigation programme within 30 days of the third round being evaluated',
    rounds,
    evaluated: '2026-05-21 14:06 AWST',
    ruleVersion: 'consecutive-window v2 · bound to Licence L8842/2019/1 v2024.2',
    frozen:
      'The window and the criterion in force at each round are frozen onto the outcome. A licence varied next year re-evaluates future rounds and moves nothing already decided — the same rule the notification screen keeps about a deadline.',
    notDrawn:
      'Twelve series are evaluated — three parameters at four bores. Eight have no round above the criterion anywhere in the window and are not drawn; a register of nothing happening is not a finding, and it would bury the four that are.',
    series,
    alsoWindowed:
      'The site’s own TARP is a second window over the same rounds and it is stricter — Level 2 escalates on two consecutive rounds, not three, which is why monthly sampling at MW05 has been running since March while the licence condition has tripped once.',
  };
})();

/** TARP state, per the site's trigger action response plan. */
export const TARP = [
  { level: 'Level 3', label: 'Notify DWER', locations: 'MW05', trigger: 'PFOS + PFHxS above ANZG 2018 95% DGV', state: 'active', since: '2026-05-22', response: 'Statutory notification lodged 2026-05-22 14:30 AWST' },
  { level: 'Level 2', label: 'Investigate and increase frequency', locations: 'MW05', trigger: 'Arsenic, zinc or copper above DGV for 2 consecutive rounds', state: 'active', since: '2026-02-14', response: 'Monthly sampling in force since 2026-03-01' },
  { level: 'Level 1', label: 'Confirm and record', locations: 'MW05, MW07', trigger: 'Any DGV exceedance', state: 'active', since: '2025-08-19', response: 'Recorded, confirmed against certificate' },
  { level: 'Level 3', label: 'Notify DWER', locations: 'TSF-VWP-03', trigger: 'Phreatic surface above design line for 7 consecutive days', state: 'cleared', since: '2026-04-08', response: 'Cleared 2026-04-16 after drawdown' },
];

/**
 * The take, the entitlement it is measured against, and the load the discharge
 * return carries (FR-5.6, FR-5.5).
 *
 * **Volumes are kilolitres, held as integers.** The glossary gives the reason
 * and it is not fussiness: an entitlement is a legal limit, and a rounding that
 * lands a kilolitre over it is an exceedance nobody caused. Megalitres are a
 * display unit and no comparison here is made in them.
 *
 * **A monthly figure is an extraction record — a reported volume for a stated
 * period — and not a meter reading.** The difference between two cumulative
 * readings is a derivation and would owe its rule and its inputs; a meter
 * replaced mid-year, a rollover and a read nobody took each change that answer
 * silently. So May, whose period has not ended, carries a totaliser reading
 * instead and is kept out of every rate computed below.
 *
 * **Basis is metered or estimated, and there is no third value.** An estimate
 * carries the arithmetic that produced it and is never blended into a metered
 * figure; the totals state how much of themselves is estimated.
 *
 * **The entitlement year is the water licence's own.** GWL118842(2) was granted
 * on 1 October 2019 and its year runs from that anniversary — not the WA fiscal
 * year, which is what a July boundary here would be. The year is named by the
 * month it *ends*, so the 2026 entitlement year is 1 Oct 2025 → 30 Sep 2026,
 * and midnight at the site is 16:00 UTC the day before.
 */
export const WATER = (() => {
  const entitlementKl = 1_250_000;
  const asAt = '2026-05-23';
  const threshold = 90; // per cent of the entitlement, projected at year end

  /*
   * The year, month by month. `complete` carries the whole reliability
   * question: a complete month has an extraction record behind it, an
   * incomplete one has a meter still running.
   */
  const months = [
    { key: '2025-10', label: 'Oct 2025', days: 31, complete: true },
    { key: '2025-11', label: 'Nov 2025', days: 30, complete: true },
    { key: '2025-12', label: 'Dec 2025', days: 31, complete: true },
    { key: '2026-01', label: 'Jan 2026', days: 31, complete: true },
    { key: '2026-02', label: 'Feb 2026', days: 28, complete: true },
    { key: '2026-03', label: 'Mar 2026', days: 31, complete: true },
    { key: '2026-04', label: 'Apr 2026', days: 30, complete: true },
    { key: '2026-05', label: 'May 2026', days: 31, complete: false, elapsed: 23 },
  ];
  const complete = months.filter((m) => m.complete);
  const restOfYear = [30, 31, 31, 30]; // June, July, August, September

  /*
   * Two estimates in the year, and each is its own arithmetic rather than a
   * number somebody wrote down.
   */
  const pb02Feb = { hours: 412, rate: 107.5 };
  const pb03Oct = { hours: 200, rate: 130 };

  /* Keyed by bore, in month order. `null` is no take, which is not zero. */
  const TAKES = {
    PB01: {
      meter: 'Magflow MF-2211',
      verified: '2025-11-12',
      note: 'Read on the last day of each month, and that reading is the month’s reported volume.',
      cells: [
        { kl: 44_800, basis: 'metered' },
        { kl: 47_200, basis: 'metered' },
        { kl: 52_600, basis: 'metered' },
        { kl: 55_100, basis: 'metered' },
        { kl: 51_400, basis: 'metered' },
        { kl: 53_900, basis: 'metered' },
        { kl: 46_700, basis: 'metered' },
        { kl: 34_600, basis: 'metered' },
      ],
    },
    PB02: {
      meter: 'Magflow MF-2212',
      verified: '2026-02-26',
      note: 'MF-2212 failed on 2026-02-03 and was replaced on 2026-02-26; the replacement was verified on installation.',
      cells: [
        { kl: 38_100, basis: 'metered' },
        { kl: 40_600, basis: 'metered' },
        { kl: 45_200, basis: 'metered' },
        { kl: 47_800, basis: 'metered' },
        {
          kl: Math.round(pb02Feb.hours * pb02Feb.rate),
          basis: 'estimated',
          how: `${pb02Feb.hours} pump run hours × ${pb02Feb.rate} kL/h`,
          why: 'The meter was out of service for 23 days of the month. The duty rate is the one MF-2212 itself measured in January and the hours come from the pump controller, so neither input is an assumption about this bore.',
        },
        { kl: 46_100, basis: 'metered' },
        { kl: 39_400, basis: 'metered' },
        { kl: 29_800, basis: 'metered' },
      ],
    },
    PB03: {
      meter: null,
      note: 'Never metered, and decommissioned on 2025-11-04 — inside this entitlement year, so the take before that date still counts against it.',
      cells: [
        {
          kl: Math.round(pb03Oct.hours * pb03Oct.rate),
          basis: 'estimated',
          how: `${pb03Oct.hours} pump run hours × ${pb03Oct.rate} kL/h`,
          why: 'No meter was ever fitted to PB03. The rate is its last capacity test, in 2021, which is the weakest evidence on this page — so it is marked wherever the volume appears rather than only here.',
        },
        null, null, null, null, null, null, null,
      ],
    },
  };

  /*
   * The bore list comes from the location register rather than from the table
   * above, so a production bore cannot exist on one screen and not on the
   * other. A bore with no take data is a bore with no extraction records — an
   * empty state, not a missing row.
   */
  const bores = LOCATIONS.filter((l) => l.klass === 'production_bore').map((l) => {
    const t = TAKES[l.code] ?? { meter: null, note: 'No extraction records in this entitlement year.', cells: [] };
    const cells = months.map((m, i) => t.cells[i] ?? null);
    return {
      code: l.code,
      position: l.position,
      lifecycle: l.lifecycle ?? 'operating',
      meter: t.meter,
      verified: t.verified,
      note: t.note,
      cells,
      recordKl: cells.reduce((a, c, i) => a + (c && months[i].complete ? c.kl : 0), 0),
      provisionalKl: cells.reduce((a, c, i) => a + (c && !months[i].complete ? c.kl : 0), 0),
    };
  });

  const monthTotals = months.map((m, i) => ({
    ...m,
    kl: bores.reduce((a, b) => a + (b.cells[i]?.kl ?? 0), 0),
    estimated: bores.filter((b) => b.cells[i]?.basis === 'estimated').length,
  }));

  const takenKl = bores.reduce((a, b) => a + b.recordKl, 0);
  const provisionalKl = bores.reduce((a, b) => a + b.provisionalKl, 0);
  const records = bores.flatMap((b) => b.cells.filter((c, i) => c && months[i].complete));
  const estimates = records.filter((c) => c.basis === 'estimated');

  /*
   * The projection, and the rule behind it: the mean of the *complete* months,
   * over twelve. The alternative — counting the part month as a month — is
   * computed beside it because it is the arithmetic a reader does in their
   * head, and on this year it lands on the other side of the flag. Which rule
   * is in force is a decision, so it is printed rather than assumed.
   */
  const rateKl = takenKl / complete.length;
  const projectionKl = Math.round(rateKl * 12);
  const altProjectionKl = Math.round(((takenKl + provisionalKl) / (complete.length + 1)) * 12);
  /*
   * And the third rule, which is the one the data itself argues for: PB03 was
   * decommissioned in November, so a flat rate over the whole record projects
   * a bore that no longer exists forward for another five months.
   */
  const operatingKl = bores.filter((b) => b.lifecycle === 'operating').reduce((a, b) => a + b.recordKl, 0);
  const operatingProjectionKl = Math.round((operatingKl / complete.length) * 12);
  const pct = (kl) => Math.round((kl / entitlementKl) * 1000) / 10;

  const elapsedDays = complete.reduce((a, m) => a + m.days, 0);
  const yearDays = months.reduce((a, m) => a + m.days, 0) + restOfYear.reduce((a, d) => a + d, 0);
  const monthsRemaining = 12 - complete.length;
  const headroomKl = entitlementKl - takenKl;
  const may = months.at(-1);

  /**
   * Mass load by reporting period (FR-5.5).
   *
   * The reporting period is the calendar quarter, because that is what the
   * discharge return is on — condition 14, and the quarters already in the
   * submission archive. Volume is metered at the discharge point; concentration
   * is one grab sample per quarter at the point the licence names for it, which
   * sits 200 m downstream. That arrangement is the licence's rather than a
   * setting: the load is reported at the compliance point and not at the
   * outfall, and moving the sample is a variation, not a preference.
   *
   * `concentration × kL ÷ 1000` is the whole calculation, and the unit scaling
   * is stated rather than absorbed: mg/L × kL ÷ 1000 = kg, µg/L × kL ÷ 1000 = g.
   *
   * **A censored concentration is not a number and the load does not invent
   * one.** FR-5.8 refuses default half-LOR substitution and a total that goes
   * to a regulator is the last place to start; the quarter carries the interval
   * its two bounding substitutions give — zero below, the limit of reporting
   * above — with the four treatments drawn beside it so the choice is visible.
   */
  const load = (() => {
    const dischargeKl = {
      '2025-10': 0, '2025-11': 1_900, '2025-12': 12_400, '2026-01': 38_600,
      '2026-02': 44_200, '2026-03': 21_800, '2026-04': 4_600, '2026-05': 0,
    };
    const quarters = [
      { key: '2025 Q4', months: ['2025-10', '2025-11', '2025-12'], complete: true, returned: 'lodged 2026-01-27' },
      { key: '2026 Q1', months: ['2026-01', '2026-02', '2026-03'], complete: true, returned: 'lodged 2026-04-24 · WDL-DR-2026Q1' },
      { key: '2026 Q2', months: ['2026-04', '2026-05'], complete: false, returned: 'due 2026-07-28' },
    ];
    const analytes = [
      { name: 'Nitrate as N', unit: 'mg/L', loadUnit: 'kg', lor: 0.05,
        by: { '2025 Q4': { v: 1.8, at: '2025-11-18' }, '2026 Q1': { v: 2.4, at: '2026-02-11' }, '2026 Q2': { v: 2.1, at: '2026-05-14' } } },
      { name: 'Copper (filtered)', unit: 'µg/L', loadUnit: 'g', lor: 0.5,
        by: { '2025 Q4': { v: null, at: '2025-11-18' }, '2026 Q1': { v: 0.9, at: '2026-02-11' }, '2026 Q2': { v: null, at: '2026-05-14' } } },
    ];
    const r1 = (v) => Math.round(v * 10) / 10;
    const mass = (conc, kl) => (conc * kl) / 1000;

    const rows = analytes.flatMap((a) =>
      quarters.map((q) => {
        const kl = q.months.reduce((sum, m) => sum + dischargeKl[m], 0);
        const s = a.by[q.key];
        const censored = s.v === null;
        return {
          analyte: a.name, unit: a.unit, loadUnit: a.loadUnit, lor: a.lor,
          quarter: q.key, complete: q.complete, returned: q.returned,
          kl, sampledAt: s.at,
          conc: censored ? `< ${a.lor.toFixed(1)}` : String(s.v),
          censored,
          load: censored ? null : r1(mass(s.v, kl)),
          low: censored ? 0 : null,
          high: censored ? r1(mass(a.lor, kl)) : null,
          treatments: censored
            ? [
                { rule: 'exclude', gives: null },
                { rule: 'zero', gives: r1(0) },
                { rule: 'half the LOR', gives: r1(mass(a.lor / 2, kl)) },
                { rule: 'the LOR', gives: r1(mass(a.lor, kl)) },
              ]
            : null,
        };
      }),
    );

    const totals = analytes.map((a) => {
      const mine = rows.filter((r) => r.analyte === a.name);
      const low = mine.reduce((sum, r) => sum + (r.censored ? 0 : mass(Number(r.conc), r.kl)), 0);
      const high = mine.reduce((sum, r) => sum + (r.censored ? mass(a.lor, r.kl) : mass(Number(r.conc), r.kl)), 0);
      return { analyte: a.name, loadUnit: a.loadUnit, low: r1(low), high: r1(high), bounded: r1(low) !== r1(high) };
    });

    return {
      point: 'DP01', monitoredAt: 'SW01',
      period: 'Calendar quarter — the period the discharge return is on (condition 14)',
      formula: 'concentration × volume ÷ 1000 — mg/L × kL gives kilograms, µg/L × kL gives grams',
      dischargeKl, quarters, analytes, rows, totals,
      says:
        'One grab sample against three months of volume is a first-order load, and the screen says so rather than printing three significant figures at it. A flow-weighted composite would answer better; the licence asks for a grab, and the number that goes into the return is the one the licence asks for.',
    };
  })();

  return {
    asAt,
    instrument: {
      id: 'GWL118842(2)',
      kind: 'Licence to take water — s5C, Rights in Water and Irrigation Act 1914 (WA)',
      granted: '2019-10-01',
      regulator: 'DWER — water licensing',
      mirror: '23',
      mirrors:
        'Condition 23 of L8842/2019/1 restates the same volume, so taking more than the entitlement breaches two instruments at once — the water licence the entitlement belongs to, and the environmental licence that mirrors it.',
      scope:
        'The entitlement is held on the licence and not on a bore, so PB03’s October take counts against it although condition 23 names only PB01 and PB02. The condition’s wording is kept as the regulator wrote it; the difference is stated here rather than resolved by editing it.',
    },
    year: {
      label: '2026 entitlement year',
      from: '2025-10-01',
      to: '2026-09-30',
      endsIn: 'September',
      why:
        'The year runs from the anniversary of the water licence’s grant — 1 October 2019 — because that is what the instrument says. A July boundary here would be the WA fiscal year borrowed out of habit, and it would put four months of this year’s take into last year’s return.',
      named: 'A year is named by the month it ends, so the 2026 entitlement year began on 1 October 2025.',
      boundary:
        'The boundary is 00:00 on 1 October at the site, which is 16:00 UTC on 30 September. A volume logged at 07:00 AWST on 1 October belongs to the year beginning, never to the year ending — resolved in Australia/Perth, never on the server.',
      aligns:
        'Four calendar quarters tile this year exactly, which is why the quarterly discharge returns sit inside it without splitting. The groundwater monitoring year does not: it ends in June and cuts this one in half.',
    },
    entitlementKl,
    threshold,
    months,
    complete,
    bores,
    monthTotals,
    takenKl,
    provisionalKl,
    estimatedKl: estimates.reduce((a, c) => a + c.kl, 0),
    recordCount: records.length,
    estimatedCount: estimates.length,
    estimates: bores.flatMap((b) =>
      b.cells.map((c, i) => (c && c.basis === 'estimated' ? { ...c, code: b.code, month: months[i].label } : null)).filter(Boolean),
    ),
    pctTaken: pct(takenKl),
    pctYear: Math.round((elapsedDays / yearDays) * 1000) / 10,
    elapsedDays,
    yearDays,
    rateKl: Math.round(rateKl),
    projectionKl,
    projectionPct: pct(projectionKl),
    altProjectionKl,
    altProjectionPct: pct(altProjectionKl),
    operatingKl,
    operatingRateKl: Math.round(operatingKl / complete.length),
    operatingProjectionKl,
    operatingProjectionPct: pct(operatingProjectionKl),
    decommissionedKl: takenKl - operatingKl,
    headroomKl,
    monthsRemaining,
    allowedKl: Math.round(headroomKl / monthsRemaining),
    mayRateKl: Math.round((provisionalKl / may.elapsed) * may.days),
    flagged: pct(projectionKl) >= threshold,
    load,
  };
})();

/**
 * Wandalup's obligations. **This project's, not the estate's** — the portfolio
 * register is `PORTFOLIO.obligations` below, and the two are kept apart so a
 * screen scoped to one project cannot quietly start counting two.
 *
 * Three fields carry the wave-5 additions and none of them changes a word that
 * renders on an existing row. `project` is what makes the cross-project board
 * able to say whose row it is. `kind` is what lets a *round* be counted as a
 * round rather than matched out of prose. And `dueOn` is the due date as a
 * sortable key beside `due`, which stays in the regulator's own words — the
 * glossary's rule for a reporting obligation is that the wording survives, and
 * "owed now" is a due rule rather than a date.
 */
export const OBLIGATIONS = [
  { what: 'Annual Environmental Report', to: 'DWER', due: '2026-09-30', dueOn: '2026-09-30', kind: 'report', remaining: '129 days', state: 'on track', owner: 'R. Whitmore', basis: 'Licence L8842/2019/1 condition 18' },
  // The return the entitlement discharges through. Condition 23 has named it
  // since the licence was drawn; until the take was drawn, nothing did.
  { what: 'Annual water return — entitlement year to 30 September', to: 'DWER — water licensing', due: '2026-10-31', dueOn: '2026-10-31', kind: 'report', remaining: '160 days', state: 'on track', owner: 'D. Okafor', basis: 'GWL118842(2) — volumes taken in the entitlement year, by bore and by month, with the basis of each' },
  { what: 'Quarterly groundwater monitoring — 2026 Q3', to: 'Internal programme', due: '2026-08-14', dueOn: '2026-08-14', kind: 'round', remaining: '82 days', state: 'on track', owner: 'A. Nakamura', basis: 'Sampling programme GW-QTR' },
  { what: 'PFAS exceedance notification', to: 'DWER', due: '2026-05-23 09:14', dueOn: '2026-05-23', kind: 'notification', remaining: 'lodged', state: 'met', owner: 'R. Whitmore', basis: 'Licence condition 21 — as soon as practicable' },
  { what: 'Quarterly discharge return — 2026 Q2', to: 'DWER', due: '2026-07-28', dueOn: '2026-07-28', kind: 'report', remaining: '65 days', state: 'on track', owner: 'D. Okafor', basis: 'Licence L8842/2019/1 condition 14' },
  { what: 'TSF annual review — instrumentation', to: 'Board / GISTM', due: '2026-06-30', dueOn: '2026-06-30', kind: 'report', remaining: '37 days', state: 'at risk', owner: 'S. Petrelli', basis: 'GISTM requirement 4.3' },
  { what: 'Quarterly groundwater monitoring — 2026 Q2', to: 'Internal programme', due: '2026-05-14', dueOn: '2026-05-14', kind: 'round', remaining: `${Q2_OVERDUE.phrase} at ${Q2_OVERDUE.location}`, state: 'overdue', owner: 'A. Nakamura', basis: 'Sampling programme GW-QTR' },
  { what: 'Annual Audit Compliance Report', to: 'DWER', due: '2026-09-30', dueOn: '2026-09-30', kind: 'report', remaining: '129 days', state: 'on track', owner: 'R. Whitmore', basis: 'Licence L8842/2019/1 — a certified statement of compliance against every condition, separate from the AER' },
  { what: 'Contaminated Sites Act report — PFAS at MW05', to: 'DWER — contaminated sites', due: 'owed now', dueOn: '2026-05-22', kind: 'notification', remaining: 'owed since 2026-05-22 09:14', state: 'overdue', owner: 'R. Whitmore', basis: 'Contaminated Sites Act 2003 (WA) s11 — a duty on awareness, not a licence condition' },
  { what: 'Subterranean fauna monitoring — 2026 wet season', to: 'Internal / EPA condition', due: '2026-09-15', dueOn: '2026-09-15', kind: 'round', remaining: '114 days', state: 'on track', owner: 'S. Petrelli', basis: 'Ministerial statement 1184 condition 9' },
  // Raised by the window condition tripping at 2026-Q1-GW, not by anybody
  // remembering to raise it — which is the point of evaluating a condition
  // rather than describing one.
  { what: 'Groundwater investigation programme — copper at MW05', to: 'DWER', due: '2026-03-16', dueOn: '2026-03-16', kind: 'response', remaining: 'lodged 2026-02-27', state: 'met', owner: 'A. Nakamura', basis: 'Licence L8842/2019/1 condition 12(c) — three consecutive rounds above the copper guideline value, tripped at 2026-Q1-GW' },
].map((o) => ({ ...o, project: PROJECT.code }));

/** The statutory notification, with the countdown frozen onto the event. */
export const NOTIFICATION = {
  obligation: 'Licence L8842/2019/1 condition 21 — notification of exceedance',
  becameAware: '2026-05-22 09:14 AWST',
  window: 'As soon as practicable',
  windowStored: 'null — read as owed now, never as a blank',
  deadline: 'Owed now (no fixed window)',
  lodged: '2026-05-22 14:30 AWST',
  elapsed: '5 h 16 m',
  evidence: 'DWER portal receipt DWER-N-2026-11842.pdf · 214 KB',
  by: 'R. Whitmore — Environmental Lead',
  frozen: 'Window and rule frozen onto the event at 2026-05-22 09:14. A later licence variation cannot move this deadline.',
};

/** The report being assembled. */
export const REPORT = {
  title: 'Wandalup Operations — Quarterly Groundwater Monitoring Report',
  period: '2026 Q2 · April – June 2026',
  template: 'Wandalup Resources — corporate report template v4 (.dotx)',
  state: 'draft',
  figures: 9,
  tables: 6,
  snapshot: 'not yet taken',
  sections: [
    { n: '1', title: 'Introduction', words: 420, state: 'complete' },
    { n: '2', title: 'Monitoring programme', words: 610, state: 'complete' },
    { n: '3', title: 'Data quality', words: 880, state: 'complete', auto: 'QA/QC summary table generated' },
    { n: '4', title: 'Results', words: 1240, state: 'complete', auto: 'Crosstab and 6 figures generated' },
    { n: '5', title: 'Assessment against criteria', words: 960, state: 'in progress', auto: 'Exceedance register generated' },
    { n: '6', title: 'Interpretation', words: 0, state: 'not started' },
    { n: '7', title: 'Conclusions and recommendations', words: 0, state: 'not started' },
  ],
};

/**
 * The three limits on the two PFAS components, kept apart (QB-9, ADR-0009).
 *
 * ## Wave 17 — the one field on this object the record does not support
 *
 * This carried `scheme: 'USEPA'` from wave 6, beside `origin: 'laboratory'`
 * and the sentence *"The laboratory said it; nobody here inferred it."* The
 * origin holds and is the strongest evidence of its kind in the seed — a named
 * laboratory, a named certificate. **The scheme does not**, and wave 17
 * measured it rather than inheriting it:
 *
 *   - The glossary's warrant for reading a laboratory's letter as USEPA's is
 *     one sentence and it names one format: *"An **ESdat deliverable's** `U`
 *     is USEPA's `U`."* This qualifier did not arrive on one. `IMP-0239`'s
 *     format is **Yarra Regional v2** — `FORMATS` calls it *"the laboratory's
 *     own dialect"*, a single flat CSV whose `preserves` line names analyte,
 *     value, unit and sample code and no qualifier vocabulary at all.
 *   - The mechanism by which an ESdat vocabulary travels — the header file's
 *     `Lab_Qualifiers` block mapping each `Code` to a `Description` — belongs
 *     to a format this deliverable is not in. Nothing declaring a vocabulary
 *     came with the file.
 *   - `method: 'USEPA 1633'` is the nearest thing to a citation on this
 *     object and it is **an analytical method, not a qualifier vocabulary**.
 *     A method named after an agency does not put that agency's reason codes
 *     on the certificate, and the resemblance is exactly how this kind of
 *     assertion gets made without anybody deciding it.
 *
 * So `scheme` is null and `schemeWas` records what it said. The whole state —
 * the two readings, the export consequence of each, and the one question that
 * would settle it — is on `QUALIFIERS`, which is the one record every surface
 * that draws a qualifier now reads. This object keeps what its own source
 * states: the letter, what it means, and who said it.
 */
export const PFAS_LIMITS = {
  lor: 2.0,
  mdl: 0.5,
  unit: 'ng/L',
  method: 'USEPA 1633',
  scheme: null,
  schemeWas: 'USEPA',
  qualifier: 'J',
  qualifierMeans: 'estimated',
  origin: 'laboratory',
  certificate: 'YAR-26-0881',
  says: 'Reported by Yarra Regional on YAR-26-0881 with the J qualifier against the result. The laboratory said it; nobody here inferred it.',
};

/** The lineage of one number — the panel's whole subject. */
export const LINEAGE = {
  value: '4.8 ng/L',
  analyte: 'PFOS + PFHxS',
  location: 'MW05',
  collected: '2026-05-13 08:40 AWST',
  chain: [
    { step: 'Source', what: 'YAR-26-0881_Wandalup_PFAS.csv, rows 18 and 24', detail: 'Yarra Regional Analytical · certificate YAR-26-0881 · received 2026-05-18 11:47', kind: 'source', at: 'imports', node: 'YAR-26-0881', nodeSub: 'deliverable, rows 18 & 24' },
    { step: 'Import', what: 'IMP-0239 · ESdat-mapped, committed 2026-05-19 10:22', detail: 'Acting principal dokafor@wandalup.example · transaction 8f2c…41ab', kind: 'import', at: 'import-commit', node: 'IMP-0239', nodeSub: 'committed 2026-05-19' },
    { step: 'Unit conversion', what: 'ng/L retained — no conversion applied', detail: 'Dictionary unit for this analyte pair is ng/L. Rule: unit-identity v1.', kind: 'rule', at: 'units', node: 'ng/L retained', nodeSub: 'unit-identity v1' },
    { step: 'Component 1', what: `PFOS (linear) = 3.1 ${PFAS_LIMITS.unit} · detected · quantified`, detail: `MDL ${PFAS_LIMITS.mdl.toFixed(1)} · LOR ${PFAS_LIMITS.lor.toFixed(1)} ${PFAS_LIMITS.unit} · above the limit of reporting, so the number is quantified · method ${PFAS_LIMITS.method} · analysed 2026-05-17`, kind: 'input', at: 'certificate' },
    /*
     * PR-3b, in the one place the review found it. This step read "PFHxS =
     * 1.7 ng/L · detected · LOR 2.0 ng/L" — an unqualified detect below the
     * limit of reporting, which is not a thing a laboratory reports. The three
     * limits stay distinct (QB-9) and the assertion moves to where the
     * glossary puts it: a **qualifier**, not a detect status.
     */
    /*
     * Wave 17. `detail` is a getter now, and for the reason `IMPORTS[0].rows`
     * is one: the qualifier's scheme is settled on `QUALIFIERS`, which is
     * declared further down this file because it reads the QA/QC register, the
     * result page and this object. A literal here would be a second copy of a
     * decision taken 600 lines below, and the copy is the thing that drifts.
     * It read "qualifier J (USEPA scheme, laboratory origin)" until 3 September
     * 2026 — see the note on `PFAS_LIMITS` for what the record does and does
     * not support there.
     */
    { step: 'Component 2', what: `PFHxS = 1.7 ${PFAS_LIMITS.unit} · detected · ${PFAS_LIMITS.qualifier} — ${PFAS_LIMITS.qualifierMeans}`, get detail() { return `MDL ${PFAS_LIMITS.mdl.toFixed(1)} · LOR ${PFAS_LIMITS.lor.toFixed(1)} ${PFAS_LIMITS.unit} · the value sits between the two, so it is real and not reliably quantified · qualifier ${PFAS_LIMITS.qualifier} · origin ${PFAS_LIMITS.origin}, ${QUALIFIERS.byId('lab-J').schemeShort} · method ${PFAS_LIMITS.method} · analysed 2026-05-17`; }, kind: 'input', at: 'certificate' },
    { step: 'Derivation', what: 'Sum of components · rule sum-pfas-anzg v2.1', detail: 'Non-detect treatment: exclude — and it does not reach either component here. Both were detected, and an estimated detect is still a detect, so 1.7 enters the sum at its reported value rather than at a substituted one. Bound to ANZG 2018, not to a global setting (FR-2.2).', kind: 'rule', at: 'criteria' },
    { step: 'Derived result', what: `4.8 ${PFAS_LIMITS.unit} ${PFAS_LIMITS.qualifier} · ${PFAS_LIMITS.qualifierMeans} · flagged derived, not reported by the laboratory`, detail: 'Stored additively. Neither component was overwritten (FR-2.4), and the J carries from the component onto the total — a sum is no more certain than the least certain thing in it.', kind: 'derived', at: 'crosstab' },
    { step: 'Evaluation', what: 'ANZG 2018 95% species protection · 0.13 ng/L · exceedance at 37×', detail: 'Evaluated synchronously on commit, 2026-05-19 10:22. Criteria version 2018.1. The estimate does not decide it: PFOS alone is 24× the guideline value, so the outcome holds under every reading of the component.', kind: 'evaluation', at: 'exceedances' },
    { step: 'Consequence', what: 'TARP Level 3 raised · statutory notification obligation created', detail: 'Notification lodged 2026-05-22 14:30 AWST. Became-aware timestamp immutable at the database (G-44).', kind: 'consequence', at: 'notification' },
  ],
};

/**
 * The audit trail readback.
 *
 * Wave 11 adds one row and adds no column. The external principal's act is
 * recorded by the same trigger, in the same shape, with the same fields as the
 * seven beside it — there is no `external` flag and there must not be one.
 * "What did the consultants touch" is answered by the *subject* the row
 * already carries, and a flag would be a second copy of a fact the customer's
 * directory owns. The subject is read from `ENGAGEMENT` rather than typed, so
 * the row cannot drift from the engagement it belongs to.
 */
export const AUDIT = [
  { at: '2026-05-22 14:30:07', who: 'rwhitmore@wandalup.example', action: 'insert', table: 'notification_event', what: 'Notification lodged · DWER-N-2026-11842', tx: '3d91…7c02' },
  { at: '2026-05-22 11:31:06', who: ENGAGEMENT.people[0].identity, action: 'update', table: 'location', what: 'MW07 · area corrected from Borefield to TSF', tx: 'e40a…15c7' },
  { at: '2026-05-22 09:14:22', who: 'system', action: 'insert', table: 'notification_event', what: 'Became aware recorded · immutable', tx: 'a114…9f30' },
  { at: '2026-05-19 10:22:41', who: 'dokafor@wandalup.example', action: 'insert', table: 'result', what: '42 results committed · IMP-0239', tx: '8f2c…41ab' },
  { at: '2026-05-19 10:22:41', who: 'dokafor@wandalup.example', action: 'insert', table: 'lineage', what: '42 lineage records · 1 derivation', tx: '8f2c…41ab' },
  { at: '2026-05-19 16:44:09', who: 'anakamura@wandalup.example', action: 'insert', table: 'import_reversal', what: 'IMP-0240 reversed · 84 results withdrawn', tx: 'c7e0…2b58' },
  { at: '2026-05-19 11:03:55', who: 'anakamura@wandalup.example', action: 'update', table: 'result', what: 'Arsenic MW03B · 31 superseded by 3.1', tx: '5a68…de14' },
  { at: '2026-05-19 11:03:55', who: 'anakamura@wandalup.example', action: 'insert', table: 'supersession', what: 'Certificate PAS2026-04398 amended by PAS2026-04417', tx: '5a68…de14' },
];

/** Supersession history for the arsenic value. */
export const SUPERSESSION = {
  subject: 'Arsenic (filtered) · MW03B · 2026-05-13',
  reason: 'Laboratory re-issued the certificate — transcription error at the laboratory, decimal point.',
  original: { value: '31 µg/L', certificate: 'PAS2026-04398', issued: '2026-05-18', outcome: 'exceedance against ANZG 2018 · 2.4×' },
  superseding: { value: '3.1 µg/L', certificate: 'PAS2026-04417', issued: '2026-05-21', outcome: 'compliant against ANZG 2018' },
  cascade: [
    { what: 'Exceedance flag', outcome: 'withdrawn — no longer an exceedance' },
    { what: 'TARP Level 1 trigger at MW03B', outcome: 'withdrawn — trigger no longer met' },
    { what: 'Consecutive-exceedance count at MW03B', outcome: 'recomputed 1 → 0' },
    { what: 'Draft report §5 exceedance table', outcome: 'flagged stale — regenerate before issue' },
    { what: 'Statutory notification', outcome: 'none had been raised — no withdrawal needed' },
  ],
};

/**
 * Criteria library entries.
 *
 * # The matrix column holds matrix words — settled 2 September 2026, wave 13
 *
 * ## What the record said
 *
 * Wave 9 recorded, beside `#composite`'s soil count: *"`CRITERIA_LIBRARY.matrix`
 * does not hold matrix words. It holds `Freshwater` (an ANZG **receptor**) and
 * `Groundwater` (a **location class**) — neither is in the glossary's closed
 * list of five, which is the same conflation the sample manifest carried until
 * this wave. So 'does a soil criteria set exist' is answered by reading strings
 * rather than by matching a field, and the answer happens to be right."* The
 * filter it described was a regular expression, `/soil|sediment/i`, over five
 * strings that were never going to contain either word.
 *
 * ## What each old string actually was, drawn rather than deleted
 *
 * The glossary is unambiguous on both halves. **Matrix** is "the material a
 * sample is made of — water, soil, sediment, vapour or biota", and it is
 * "distinct from location class, which is a property of the place". So:
 *
 *   - Every set here is a **water** set. All five are limits on what is in a
 *     bottle of water, which is why every soil and sediment result in this seed
 *     reads `not evaluated` — and that is now true by matching a field rather
 *     than by reading strings.
 *   - `Freshwater` was the **receptor** the ANZG values protect. It moves to
 *     `protects`, which is the word `#criteria` already uses as a column head
 *     over the PFAS NEMP comparison beside it ("Aquatic ecosystems", "Human
 *     health, potable"), and which the glossary's *criteria applicability*
 *     entry uses in as many words: applying a freshwater value to a groundwater
 *     sample "is an assessor's judgement about receptors, not a lookup".
 *   - `Groundwater` was the **location class** of the places the licence and
 *     the site-specific set govern. It moves to `locationClass`, which is the
 *     glossary's own term and one of its nine.
 *
 * Additive, never a rename in place: `matrix` keeps its name and gains the
 * right values, the two dimensions it was carrying at once get fields of their
 * own, and `wasDrawnAs` keeps what the row said before so the correction can be
 * checked rather than taken. **A dimension a set does not name is unrestricted
 * rather than unknown** — the glossary's rule for applicability, and the reason
 * a null here renders as a dash rather than as a gap.
 *
 * What this does **not** do is close FR-1.11's applicability model: a set is
 * bound by matrix, location group, hydrostratigraphic unit, analyte, fraction
 * and period, and four of those six are still the prose in `applies`. Splitting
 * that is a versioned change to the library with an effective date on every
 * set. What is settled is the column wave 9 named, and the count that read it.
 */
export const CRITERIA_LIBRARY = [
  { set: 'ANZG 2018 — 95% species protection', version: '2018.1', effective: '2018-08-01 →', matrix: 'Water', protects: 'Freshwater aquatic ecosystems', locationClass: null, wasDrawnAs: 'Freshwater', applies: 'All groundwater locations, Superficial unit', analytes: 58, state: 'active' },
  { set: 'ANZG 2018 — 99% species protection', version: '2018.1', effective: '2018-08-01 →', matrix: 'Water', protects: 'Freshwater aquatic ecosystems', locationClass: null, wasDrawnAs: 'Freshwater', applies: 'Not assigned', analytes: 58, state: 'available' },
  { set: 'Licence L8842/2019/1 — Table 4', version: '2024.2', effective: '2024-07-01 →', matrix: 'Water', protects: null, locationClass: 'Groundwater', wasDrawnAs: 'Groundwater', applies: 'Compliance boundary locations', analytes: 12, state: 'active' },
  { set: 'Licence L8842/2019/1 — Table 4', version: '2019.1', effective: '2019-03-01 – 2024-06-30', matrix: 'Water', protects: null, locationClass: 'Groundwater', wasDrawnAs: 'Groundwater', applies: 'Superseded by 2024.2', analytes: 9, state: 'historic' },
  { set: 'Site-specific trigger values — TSF', version: '2025.1', effective: '2025-01-01 →', matrix: 'Water', protects: null, locationClass: 'Groundwater', wasDrawnAs: 'Groundwater', applies: 'MW05, MW07 (downgradient of TSF)', analytes: 6, state: 'active' },
];

/**
 * The glossary's closed list of five, as a record rather than five strings.
 *
 * Every matrix word this catalogue prints comes from here, so a sixth cannot be
 * introduced by typing one. The order is the glossary's own.
 */
export const MATRIX_WORDS = ['Water', 'Soil', 'Sediment', 'Vapour', 'Biota'];

/**
 * EDD format definitions — configuration, never code (FR-3.1).
 *
 * Two field counts corrected 2 September 2026 (W10-A-6, raised at the wave 10
 * cap and fixed as wave 11's carried rider): ELDF-4 typed 61 where the spec's
 * two files publish 30 + 12 = 42 columns, and the legacy export typed 28 where
 * the only legacy artifact in evidence carries a 21-column header — both
 * literals unchanged since 23 August, both contradicted by the page's own
 * "thirty columns … twelve" sentence one screen away. The Yarra and EQuIS
 * counts have no in-repo evidence either way and stand as drawn.
 */
export const FORMATS = [
  { name: 'ESdat ELDF-4', version: '4.0', files: 'Sample + Chemistry pair', fields: 42, labs: 'Pilbara Analytical Services, Yarra Regional Analytical', state: 'active' },
  { name: 'Yarra Regional v2', version: '2.3', files: 'Single CSV', fields: 34, labs: 'Yarra Regional Analytical', state: 'active' },
  { name: 'ESdat legacy export', version: '—', files: 'Single CSV', fields: 21, labs: 'migration only', state: 'migration' },
  { name: 'EQuIS EDD (4-file)', version: '—', files: 'Four CSV', fields: 88, labs: 'migration only', state: 'migration' },
];

export const INSTANCE = {
  version: 'v0.7.2',
  released: '2026-08-14',
  commit: '95e1321',
  database: 'PostgreSQL 16.3 · 4.1 GB · 2.84 M results',
  services: [
    { name: 'web', state: 'ok', detail: 'react-router-serve · 3 replicas · p95 340 ms' },
    { name: 'scheduler', state: 'ok', detail: 'last tick 2026-08-23 06:00:04 AWST · 0 failed claims' },
    { name: 'stats', state: 'ok', detail: 'FastAPI · p95 41 ms' },
    { name: 'postgres', state: 'ok', detail: 'Azure Database for PostgreSQL · flexible server' },
  ],
  backup: { last: '2026-08-23 02:00 AWST', size: '1.9 GB', verified: 'content integrity check passed', rpo: '4 h stated · 2 h 41 m measured', rto: '4 h stated · 38 m measured at last drill', drill: '2026-08-22' },
};

/* ==================================================================== *
 * Surfaces the first build had no data for.
 *
 * `UI_EXPECTATIONS.md` §15 is a coverage matrix from entity to owning
 * surface, and running it against the first thirty-seven screens turned up
 * fourteen entities with nowhere to live — the project itself among them,
 * which is the authorisation scope and had no face at all. Everything below
 * exists so those surfaces can be drawn from the same fictional site as the
 * rest, rather than from a second cast that disagrees with the first.
 * ==================================================================== */

/**
 * Every project the principal holds a binding in (§2.1) — **two, and every
 * number on both rows is counted rather than typed.**
 *
 * This list used to hold four rows and three of them were scenery: `locations:
 * 14` and `open: 0` on sites with no data behind them, beside a Wandalup row
 * reading `locations: 9` while the register held fourteen. A portfolio is
 * exactly the screen where a hand-kept count does its damage — *where is
 * something wrong* is answered by the numbers on these rows, and a wrong one
 * sends somebody to the wrong site or, worse, nowhere. The three scenery rows
 * are gone and the seed backs the two that remain.
 *
 * The role is still on the row, because *as what* you are acting is the first
 * thing project scope decides — and it is now demonstrated rather than
 * asserted: the same person is a Contributor at one site and an Approver at
 * the other. The Reader binding the old fourth row existed to show is real on
 * `#roles`, where S. Petrelli holds one.
 */
export const PROJECTS = (() => {
  const roleIn = (project) => PRINCIPAL.bindings.find((b) => b.project === project)?.role ?? '—';
  const rounds = (obligations) => obligations.filter((o) => o.kind === 'round');
  const nextRoundDue = (obligations) =>
    rounds(obligations)
      .filter((o) => o.state !== 'overdue')
      .map((o) => o.dueOn)
      .sort()[0] ?? '—';

  return [
    {
      code: PROJECT.code,
      name: PROJECT.name,
      facility: PROJECT.facility,
      role: roleIn(PROJECT.code),
      current: true,
      drawn: true,
      locations: LOCATIONS.length,
      exceedances: EXCEEDANCES.length,
      unacknowledged: EXCEEDANCES.filter((e) => e.state === 'open').length,
      roundsOverdue: rounds(OBLIGATIONS).filter((o) => o.state === 'overdue').length,
      nextRound: nextRoundDue(OBLIGATIONS),
      obligations: OBLIGATIONS,
      note: 'The workspace this catalogue draws. Every other screen here is inside it.',
    },
    {
      code: KURRAJONG.code,
      name: KURRAJONG.name,
      facility: KURRAJONG.facility,
      role: roleIn(KURRAJONG.code),
      current: false,
      drawn: KURRAJONG.drawn,
      locations: KURRAJONG.bores.length,
      exceedances: KURRAJONG.aboveTrigger,
      unacknowledged: KURRAJONG.exceedance.state === 'open' ? 1 : 0,
      roundsOverdue: rounds(KURRAJONG.obligations).filter((o) => o.state === 'overdue').length,
      nextRound: nextRoundDue(KURRAJONG.obligations),
      obligations: KURRAJONG.obligations,
      note: KURRAJONG.notDrawn,
    },
  ];
})();

/**
 * The estate, as the two `/aggregate` questions actually ask it.
 *
 * *What is due* is one register across every binding, ordered by when it falls
 * rather than by which project it belongs to — an operator's week is not
 * partitioned by project and a board that partitioned it would hide the row
 * that matters. `dueOn` is the sort key; `due` stays as written.
 *
 * *Where is something wrong* is the per-project decomposition beside it, so an
 * aggregate can always be taken apart into the sites it was added up from.
 */
export const PORTFOLIO = (() => {
  const obligations = PROJECTS.flatMap((p) => p.obligations).sort((a, b) => a.dueOn.localeCompare(b.dueOn));
  const count = (state, rows = obligations) => rows.filter((o) => o.state === state).length;
  return {
    asAt: AS_AT,
    projects: PROJECTS,
    obligations,
    states: ['overdue', 'at risk', 'on track', 'met'],
    counts: Object.fromEntries(['overdue', 'at risk', 'on track', 'met'].map((s) => [s, count(s)])),
    byProject: PROJECTS.map((p) => ({
      code: p.code,
      name: p.name,
      drawn: p.drawn,
      obligations: p.obligations.length,
      counts: Object.fromEntries(['overdue', 'at risk', 'on track', 'met'].map((s) => [s, count(s, p.obligations)])),
      unacknowledged: p.unacknowledged,
      roundsOverdue: p.roundsOverdue,
    })),
    says:
      'Two projects, one register. The rows interleave by date because that is how the week arrives — the oldest thing owed on this estate is a trigger response at Kurrajong that nobody was assigned, and it sits above every Wandalup row rather than below a project heading nobody opened.',
  };
})();

/**
 * The work queue (§1.1) — what needs this person, before any navigation.
 *
 * Ordered by role rather than by configuration: the principal is a
 * hydrogeologist, so exceptions sort above approvals. Each row carries the
 * screen that *resolves* it, never a list to re-search from.
 *
 * **The project is a field, not a phrase inside the context.** It used to be
 * the first token of a sentence, which reads fine and cannot be counted,
 * filtered or checked — and the landing surface of a two-project estate is the
 * one place *which site is this* has to be structural. Two of the rows are on
 * the second project, and their `target` is honest about where it can take
 * you: MOCK-KRJ's workspace is not drawn, so they open the cross-project
 * register that does hold them rather than pretending to open a screen that
 * is somebody else's project.
 */
export const WORK_QUEUE = [
  { kind: 'Exceedance', urgency: 'now', headline: 'PFOS + PFHxS at MW05 is 37× the ANZG 2018 DGV', context: 'First occurrence · TARP Level 3 raised', project: PROJECT.code, age: '3 days open', target: 'exceedances', action: 'Review exceedance' },
  { kind: 'Notification', urgency: 'now', headline: 'Statutory notification lodged — evidence not attached', context: 'DWER condition 21 · lodged 2026-05-22 14:30 AWST', project: PROJECT.code, age: '1 day', target: 'notification', action: 'Attach receipt' },
  { kind: 'Overdue round', urgency: 'now', headline: 'MW11 not sampled for 2026 Q2', context: 'Programme GW-QTR · window closed 2026-05-14 AWST', project: PROJECT.code, age: Q2_OVERDUE.phrase, target: 'programme', action: 'Record or reschedule' },
  // The two live facts at the second project. Both are computed from
  // KURRAJONG rather than restated here, so the queue card and the obligation
  // register cannot come apart on a number.
  {
    kind: 'Exceedance', urgency: 'now',
    headline: `Chloride at ${KURRAJONG.exceedance.location} is ${KURRAJONG.exceedance.factor} the operating-strategy trigger, and nobody has acknowledged it`,
    context: `Round ${KURRAJONG.exceedance.round} · evaluated ${KURRAJONG.exceedance.evaluated} · the response it obliged is ${KURRAJONG.obligations[0].remaining}`,
    project: KURRAJONG.code, age: `${KURRAJONG.exceedance.openDays} days open`,
    target: 'obligations', action: 'Open it on the cross-project register',
  },
  {
    kind: 'Overdue round', urgency: 'now',
    headline: `The ${KURRAJONG.overdueRound.label} six-monthly round at Kurrajong has not been collected`,
    context: `Programme ${KURRAJONG.programme.code} · window closed ${KURRAJONG.overdueRound.due} AWST · it is the round that would test the chloride step`,
    project: KURRAJONG.code, age: KURRAJONG.obligations[1].remaining,
    target: 'obligations', action: 'Open it on the cross-project register',
  },
  { kind: 'Review', urgency: 'soon', headline: '3 questions on IMP-0239 block its commit', context: 'Yarra Regional Analytical · 42 rows read', project: PROJECT.code, age: '5 days', target: 'import-review', action: 'Answer questions' },
  { kind: 'Quarantine', urgency: 'soon', headline: '3 rows held out of IMP-0239', context: 'Holding time, aborted analysis', project: PROJECT.code, age: '5 days', target: 'quarantine', action: 'Resolve holds' },
  { kind: 'Alert', urgency: 'soon', headline: 'TSF-VWP-03 has not reported for 41 hours', context: 'Vibrating wire piezometer · last reading 2026-08-21 16:12', project: PROJECT.code, age: '41 h', target: 'tarp', action: 'Acknowledge' },
  { kind: 'Stale figure', urgency: 'soon', headline: 'Report §5 exceedance table is stale after a supersession', context: 'Arsenic at MW03B superseded 2026-05-19', project: PROJECT.code, age: '4 days', target: 'supersession', action: 'Regenerate' },
  // The old row here was a countersignature on a project with no data behind
  // it. This one is a real open decision on this project's own record: seven
  // results that cannot be assessed until the laboratory's reporting limit
  // comes down, and a quote for what that costs.
  { kind: 'Decision', urgency: 'later', headline: 'Cadmium cannot be assessed at any bore until the reporting limit comes down', context: `${INDETERMINATE.filter((i) => i.analyte === 'Cadmium (filtered)').length} cadmium results indeterminate · PAS quoted ICP-MS/MS at +$${INDETERMINATE_QUOTE.perSample} per sample`, project: PROJECT.code, age: '3 days', target: 'indeterminate', action: 'Review the register' },
].map((w) => ({ ...w, crossProject: w.project !== PROJECT.code }));

/**
 * Planned against received for the open period (EX-20).
 *
 * This is the programme-completeness signal, and it belongs on the landing
 * page rather than on a dashboard of its own: *did we get everything we said
 * we would collect* is a daily question, and a screen somebody has to
 * remember to visit answers it for nobody.
 */
/*
 * Wave 7: the three totals are derived from the rows rather than typed beside
 * them. They had drifted — the header read *58 of 63 received · 2 never
 * collected* over a table whose own rows add to 53 received and 10 never
 * collected, because MW11's nine and MW09's one were counted in the rows and
 * not in the summary. The rider that blanked MW11's crosstab column is the
 * same defect one surface along, so it is fixed the same way: the rows are the
 * record and the totals are read off them. `held` is not here at all — a held
 * row is a quarantine finding, `QUARANTINE` owns those, and the screen that
 * prints both counts them from their own registers.
 */
export const COMPLETENESS = (() => {
  const rows = [
    { location: 'MW01A', planned: 9, received: 9, state: 'complete' },
    { location: 'MW03B', planned: 9, received: 9, state: 'complete' },
    { location: 'MW05', planned: 9, received: 9, state: 'complete' },
    { location: 'MW07', planned: 9, received: 9, state: 'complete' },
    { location: 'MW09', planned: 9, received: 8, state: 'partial' },
    { location: 'MW11', planned: 9, received: 0, state: 'missing', why: 'Dry on both visits — attempted, not missed' },
    { location: 'MW12', planned: 9, received: 9, state: 'complete' },
  ];
  const planned = rows.reduce((n, r) => n + r.planned, 0);
  const received = rows.reduce((n, r) => n + r.received, 0);
  return {
    period: '2026 Q2 · 1 April – 30 June 2026 (Australia/Perth)',
    rows,
    planned,
    received,
    missing: planned - received,
  };
})();

/**
 * Global search (§1.2).
 *
 * Identifier-prefix matches rank first because a practitioner searches by
 * code — "MW05", not "the downgradient bore". Each row states its entity type
 * and its project, and selecting one across a scope boundary switches the
 * scope *visibly*: fail-closed RLS made legible rather than surprising.
 */
export const SEARCH = (() => {
  const query = 'MW0';
  const groups = [
    { label: 'Locations — identifier starts with the query', rank: 'prefix', rows: [
      { code: 'MW05', what: 'Groundwater monitoring bore · TSF · downgradient', project: 'MOCK-WDL', target: 'location', badge: 'exceedance' },
      { code: 'MW01A', what: 'Groundwater monitoring bore · Borefield · upgradient', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW03B', what: 'Groundwater monitoring bore · Borefield · nested, confined', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW07', what: 'Groundwater monitoring bore · TSF · downgradient', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW09', what: 'Groundwater monitoring bore · compliance boundary', project: 'MOCK-WDL', target: 'location', badge: 'indeterminate' },
    ] },
    /*
     * The claim above this group — identifier prefixes rank first — had
     * nothing to demonstrate it until there were two projects. Kurrajong's
     * bores carry the project prefix, so `MW0` matches them in the middle of
     * the code rather than at the front, and they rank below every exact
     * prefix match. Same query, both projects, correct order.
     */
    { label: 'Locations — identifier contains the query', rank: 'contains', rows:
      KURRAJONG.bores
        .filter((b) => b.code.includes(query))
        .map((b) => ({
          code: b.code,
          what: `${b.klass === 'production_bore' ? 'Production bore' : 'Groundwater monitoring bore'} · ${b.role}`,
          project: KURRAJONG.code,
          target: 'projects',
          badge: b.code === KURRAJONG.exceedance.location ? 'exceedance' : null,
        })) },
    { label: 'Sampling events', rank: 'contains', rows: [
      { code: '2026-Q2-GW', what: 'Quarterly groundwater · collected 12–14 May 2026 · includes MW05', project: 'MOCK-WDL', target: 'events', badge: null },
    ] },
    { label: 'Import runs and certificates', rank: 'contains', rows: [
      { code: 'PAS2026-04417', what: 'Certificate · Pilbara Analytical Services · 231 results · covers MW05', project: 'MOCK-WDL', target: 'certificate', badge: null },
      { code: 'IMP-0239', what: 'Import run · Yarra Regional v2 · in review · 3 questions', project: 'MOCK-WDL', target: 'import-review', badge: 'in review' },
    ] },
    { label: 'Criteria sets and licences', rank: 'contains', rows: [
      { code: PROJECT.licence, what: 'Licence · DWER · 24 conditions · governs MW05, MW07, MW09, MW11', project: PROJECT.code, target: 'licence', badge: null },
      { code: KURRAJONG.licence, what: `Licence to take water · DWER · governs ${KURRAJONG.bores.filter((b) => b.klass === 'groundwater').map((b) => b.code).join(', ')}`, project: KURRAJONG.code, target: 'projects', badge: null },
    ] },
  ];
  const rows = groups.flatMap((g) => g.rows);
  return {
    query,
    groups,
    rows,
    matches: rows.length,
    projects: new Set(rows.map((r) => r.project)).size,
    /* Both counted, because the empty state quotes them and a typed one was
     * already wrong: it said nine locations start with "MW0" and five do. */
    prefixLocations: groups.find((g) => g.rank === 'prefix').rows.length,
    containsLocations: groups.find((g) => g.label.startsWith('Locations — identifier contains')).rows.length,
  };
})();

/** The facility → area hierarchy (§3.1, FR-1.1). */
export const FACILITY = {
  // One string, read twice: the project list names the facility on its row and
  // this screen names it as a heading, and they cannot come apart.
  name: PROJECT.facility,
  operator: PROJECT.operator,
  tenement: 'M47/1882',
  /*
   * `locations` is counted from LOCATIONS rather than typed beside it. The
   * typed version said 3 · 3 · 2 · 1 while the register held four in two of
   * those areas: a hand-kept count of a list that grows is a count that is
   * wrong by the next screen somebody adds.
   */
  areas: [
    { name: 'Borefield', kind: 'Water supply', parent: '—', programme: 'GW-QTR', note: 'Upgradient and background control, and the bores the entitlement is taken through' },
    { name: 'TSF', kind: 'Tailings storage', parent: '—', programme: 'GW-QTR, GW-MTH', note: 'Downgradient of the embankment; monthly since 2026-03-01' },
    { name: 'Compliance boundary', kind: 'Regulatory', parent: '—', programme: 'GW-QTR', note: 'Licence Table 4 applies here and nowhere else' },
    { name: 'Wandalup Creek', kind: 'Surface water', parent: '—', programme: 'SW-QTR', note: 'Downstream of the licensed discharge point' },
  ].map((a) => ({ ...a, locations: LOCATIONS.filter((l) => l.area === a.name).length })),
  /** What an edit would touch, shown before the edit (G-EXP-5, PP6). */
  blastRadius: [
    { what: 'Locations reassigned', n: '3 bores move from TSF to Compliance boundary' },
    { what: 'Criteria applicability changes', n: 'Licence Table 4 begins applying to 3 bores' },
    { what: 'Historical evaluations affected', n: '0 — applicability is resolved at evaluation date, not re-run' },
    { what: 'Programmes touched', n: 'GW-QTR keeps all 3; GW-MTH loses 3' },
    { what: 'Figures whose series would change', n: '4 saved figure configurations name an area' },
  ],
};

/**
 * The samples inside `2026-Q2-GW` — the round's manifest, with the QC taxonomy
 * closed (FR-1.6).
 *
 * Every QC sample names its parent **by code**, because the alternative in
 * every incumbent is a naming convention: `MW05-DUP` next to `MW05`, related by
 * a substring and by nothing the database knows. `parent` is the link and `qc`
 * is the role; a blank's parent is not a sample, so it carries a short name for
 * the register column and a `detail` for the taxonomy, which has room for it. Every row here was made in the field; the QC made at the bench is
 * `LAB_QC` below, because a field duplicate and a laboratory duplicate answer
 * different questions and collapsing them under one word loses the only thing
 * the pair was collected to separate.
 *
 * `containers` sums to 38, which is what the laboratory reconciled on arrival
 * and what the chain of custody sealed. MW11 is deliberately absent: the round
 * is overdue at that bore (Q2_OVERDUE, COMPLETENESS, OBLIGATIONS), and a
 * manifest that quietly listed it would make an overdue round read as
 * collected. `FIELD_ROUND` says what the crew found standing there, which is a
 * different question from what the laboratory received.
 *
 * Composites are out of the slice, not omitted by oversight: FR-1.7's depth
 * intervals and increments are soil and sediment work, staged S8. Every row
 * here is a discrete grab.
 *
 * **Still true of this round, corrected 2 September 2026 (wave 9) about the
 * seed.** Every row below is still a discrete grab and this manifest still
 * holds no composite. What changed is the sentence's scope: `SOIL` at the foot
 * of this file carries a soil investigation with two composites and nine
 * constituent increments, drawn as a proposal, so "out of the slice" is a
 * statement about the product's sequencing rather than about what this
 * catalogue draws.
 *
 * **And `matrix` was carrying the wrong word.** The glossary's *matrix* entry
 * is a closed list of five — water, soil, sediment, vapour, biota — and it is
 * explicitly "distinct from location class, which is a property of the place".
 * Eight rows read `Groundwater`, which is the **location class** of the bore
 * they came from, and three read `Field blank`/`Trip blank`/`Equipment blank`,
 * which are **sample types** the `qc` column beside them already carries. All
 * eleven are `Water`, because that is what is in the bottle. Nobody noticed
 * for the reason the glossary gives — "a water matrix is overwhelmingly the
 * common case in the slice, which is exactly why guessing it would be
 * invisible when wrong" — and the column only became legible the moment a
 * round arrived with three matrices in it.
 */
export const EVENT_SAMPLES = [
  { id: 'WDL-26Q2-001', location: 'MW01A', matrix: 'Water', collected: '2026-05-12 07:55 AWST', depth: '20.4 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-002', location: 'MW03B', matrix: 'Water', collected: '2026-05-12 10:20 AWST', depth: '48.8 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-003', location: 'MW05', matrix: 'Water', collected: '2026-05-13 08:40 AWST', depth: '15.2 m bgl', tests: 16, results: 16, qc: '—', parent: '—', containers: 5, state: 'evaluated' },
  { id: 'WDL-26Q2-004', location: 'MW05', matrix: 'Water', collected: '2026-05-13 08:40 AWST', depth: '15.2 m bgl', tests: 14, results: 14, qc: 'Field duplicate (blind)', parent: 'WDL-26Q2-003', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-005', location: 'MW07', matrix: 'Water', collected: '2026-05-13 11:05 AWST', depth: '17.1 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-008', location: 'MW07', matrix: 'Water', collected: '2026-05-13 11:05 AWST', depth: '17.1 m bgl', tests: 14, results: 14, qc: 'Field duplicate (blind)', parent: 'WDL-26Q2-005', containers: 3, state: 'evaluated' },
  { id: 'WDL-26Q2-006', location: 'MW09', matrix: 'Water', collected: '2026-05-14 07:30 AWST', depth: '18.6 m bgl', tests: 14, results: 13, qc: '—', parent: '—', containers: 4, state: 'results-partial' },
  { id: 'WDL-26Q2-007', location: 'MW12', matrix: 'Water', collected: '2026-05-14 11:20 AWST', depth: '19.8 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-QC1', location: '—', matrix: 'Water', collected: '2026-05-13 08:00 AWST', depth: '—', tests: 14, results: 14, qc: 'Field blank', parent: 'The event', detail: 'The event itself — poured at MW05, at the bore', containers: 2, state: 'evaluated' },
  { id: 'WDL-26Q2-QC2', location: '—', matrix: 'Water', collected: '2026-05-12 06:00 AWST', depth: '—', tests: 14, results: 14, qc: 'Trip blank', parent: 'The cooler', detail: 'The cooler — travelled with the samples, 12–15 May', containers: 2, state: 'evaluated' },
  { id: 'WDL-26Q2-QC3', location: '—', matrix: 'Water', collected: '2026-05-13 10:35 AWST', depth: '—', tests: 14, results: 14, qc: 'Equipment blank (rinsate)', parent: 'Bladder pump', detail: 'Bladder pump, rinsed between WDL-26Q2-003 and WDL-26Q2-005', containers: 2, state: 'evaluated' },
];

/**
 * The other half of the taxonomy — the QC that is made at the bench.
 *
 * A field duplicate and a laboratory duplicate are both "duplicates" and they
 * are not the same control: one carries sampling variability and the other does
 * not, so a product that lists them under one word has thrown away the only
 * thing the pair was collected to separate. These sit on the **batch**, which
 * is why `#batches` owns them and this table names them rather than repeating
 * them — a control sample applies to a batch, not to a round.
 */
export const LAB_QC = [
  { kind: 'Laboratory duplicate', id: 'LD-268841', parent: 'WDL-26Q2-003', batch: 'PAS-WO-268841', answers: 'Laboratory precision alone — the same bottle, split at the bench', outcome: 'pass' },
  { kind: 'Method blank', id: 'MB-268841', parent: 'The preparation batch', batch: 'PAS-WO-268841', answers: 'Contamination introduced in preparation', outcome: 'pass' },
  { kind: 'Laboratory control sample', id: 'LCS-268841', parent: 'A certified standard', batch: 'PAS-WO-268841', answers: 'Accuracy against a known concentration', outcome: 'pass' },
  { kind: 'Matrix spike', id: 'MS-268841', parent: 'WDL-26Q2-005', batch: 'PAS-WO-268841', answers: 'Recovery in this water, not in clean water', outcome: 'fail' },
  { kind: 'Matrix spike duplicate', id: 'MSD-268841', parent: 'WDL-26Q2-005', batch: 'PAS-WO-268841', answers: 'Whether that recovery reproduces — it did, at 64%', outcome: 'fail' },
  { kind: 'Surrogate (isotope-labelled)', id: 'M8PFOS', parent: 'Every PFAS sample', batch: 'YAR-B-118420', answers: 'Per-sample recovery on the PFAS suite', outcome: 'pass' },
];

/**
 * Sampling events (§4.1) — the round, its samples, and where each one is up to.
 *
 * The Q2 groundwater counts are read off the manifest above rather than typed
 * beside it. A register row and the detail page it opens are the commonest pair
 * of screens to disagree about a count, and the disagreement is always the
 * register's.
 */
export const EVENTS = [
  /*
   * `matrix` arrived with wave 9, on every row rather than only on the new
   * one. A round collects material and material has a matrix (glossary), and
   * this register never had to say so while there was only ever one — which
   * is exactly the condition under which a column carrying the wrong word
   * goes unnoticed for a year. The groundwater round's is a getter over its
   * own manifest, so the register and the manifest cannot come apart on it.
   */
  { code: '2026-Q2-GW', label: 'Quarterly groundwater', window: '1 Apr – 30 Jun 2026', collected: '12–14 May 2026', by: 'A. Nakamura', samples: EVENT_SAMPLES.filter((s) => s.qc === '—').length, qc: EVENT_SAMPLES.filter((s) => s.qc !== '—').length, state: 'results-complete', lab: 'Pilbara Analytical Services', get matrix() { return [...new Set(EVENT_SAMPLES.map((s) => s.matrix))].join(' · '); } },
  /*
   * Wave 15 — the fourth reading of the PFAS suite, re-derived. This row typed
   * `samples: 4, qc: 1`, and no manifest, chain, container or certificate held
   * a fourth sample or a control at Yarra Regional. What it actually covers is
   * the subcontracted fraction of **one** sample on the round above, which is
   * why the counts are getters over `PFAS_REACH` and why `covers` says out loud
   * that this row is an analysis rather than a second collection — the sample
   * is counted once, on the manifest it was collected onto. The two numbers it
   * used to type are kept on `PFAS_REACH.was`, where every before this
   * settlement moved is written down exactly once, and they render beside the
   * new ones. Getters for the reason the soil row below uses them: the record
   * they read is declared beside the custody chain, fifteen hundred lines down.
   */
  {
    code: '2026-Q2-PFAS', label: 'PFAS supplementary', window: '1 Apr – 30 Jun 2026', collected: '13 May 2026',
    by: 'A. Nakamura', state: 'results-partial', lab: 'Yarra Regional Analytical', matrix: 'Water',
    get samples() { return PFAS_REACH.samples; },
    get qc() { return PFAS_REACH.qc; },
    get wasSamples() { return PFAS_REACH.was.eventSamples; },
    get wasQc() { return PFAS_REACH.was.eventQc; },
    get covers() { return PFAS_REACH.eventCovers; },
  },
  { code: '2026-M05-TSF', label: 'Monthly TSF downgradient', window: '1 – 31 May 2026', collected: '13 May 2026', by: 'D. Okafor', samples: 3, qc: 1, state: 'results-complete', lab: 'Pilbara Analytical Services', matrix: 'Water' },
  { code: '2026-Q2-SW', label: 'Quarterly surface water', window: '1 Apr – 30 Jun 2026', collected: '14 May 2026', by: 'D. Okafor', samples: 1, qc: 0, state: 'evaluated', lab: 'Pilbara Analytical Services', matrix: 'Water' },
  /*
   * Wave 9 — the soil investigation, and it is an event like any other rather
   * than a special case beside them. Its counts are getters for the reason
   * `IMPORTS` uses one: the manifest it counts is declared at the foot of this
   * file, because it needs the location register and the criteria library to
   * exist first, and a literal here would be a second copy of an addition made
   * five thousand lines down. `matrix` says what this round collected, which
   * the groundwater rounds never needed to say because there was only ever
   * one — and stating it is the glossary's rule, not a decoration.
   */
  {
    code: '2026-M05-SOIL', label: 'TSF seepage soil investigation', window: '1 – 31 May 2026',
    collected: '6–7 May 2026', by: 'D. Okafor', state: 'results-complete', lab: 'Pilbara Analytical Services',
    matrix: 'Soil · Sediment · Water',
    get samples() { return SOIL.counts.primary; },
    get qc() { return SOIL.counts.qc; },
  },
  { code: '2026-Q3-GW', label: 'Quarterly groundwater', window: '1 Jul – 30 Sep 2026', collected: '—', by: '—', samples: 0, qc: 0, state: 'planned', lab: '—', matrix: 'Water' },
];


/**
 * One result, with everything true about it (§6.2, EX-08).
 *
 * The three limits are distinct because ESdat carries four and EQuIS two
 * (§7.2) — the parity bar is that they never collapse into one number.
 */
export const RESULT_DETAIL = {
  analyte: 'Cadmium (filtered)',
  location: 'MW05',
  sample: 'WDL-26Q2-003',
  collected: '2026-05-13 08:40 AWST',
  analysed: '2026-05-17 14:22 AWST',
  reported: '< 1.0 µg/L',
  detect: 'non-detect',
  lor: '1.0 µg/L',
  mdl: '0.2 µg/L',
  pql: '1.0 µg/L',
  method: 'USEPA 200.8 · ICP-MS',
  certificate: 'PAS2026-04417',
  /*
   * Wave 17. This entry read `source: 'laboratory'`. The glossary's word is
   * **origin** — `QualifierOrigin`, "who said it: the laboratory, in the
   * deliverable, or a practitioner manually" — and `source` was a fourth
   * spelling of a first-class term (QB-9, ADR-0009): `PFAS_LIMITS` already
   * said `origin`, the QA/QC decision options already wrote *origin
   * laboratory* and *origin manual*, and this one said something else again.
   * The field is renamed; the before is on `QUALIFIERS.renamed`, so the screen
   * prints what it used to say rather than the rename being silent.
   */
  qualifiers: [
    { code: 'U', origin: 'laboratory', meaning: 'Not detected above the reporting limit' },
  ],
  annotations: [
    { by: 'A. Nakamura', at: '2026-05-21 15:02 AWST', text: 'LOR sits above the ANZG 2018 criterion for this analyte at this hardness. Raised with the laboratory on 21 May — they can reach 0.1 µg/L by ICP-MS/MS at additional cost. Recommend we fund it from Q3; until then cadmium at this site cannot be assessed and the report must say so rather than showing a pass.', flowsTo: 'Report §3 Data quality' },
  ],
  outcomes: [
    { set: 'ANZG 2018 — 95% species protection', criterion: '0.54 µg/L (hardness-adjusted)', outcome: 'indeterminate', why: 'The reporting limit of 1.0 µg/L sits above the criterion. Nothing was measured either way, and this is not a pass.' },
    { set: 'Licence L8842/2019/1 — Table 4', criterion: '≤ 2 µg/L', outcome: 'compliant', why: 'The reporting limit sits below the criterion, so a non-detect is assessable against it.' },
  ],
};

/** Mapping memory, per laboratory (§5.4, FR-3.2). */
export const MAPPING_PROFILES = [
  { lab: 'Pilbara Analytical Services', entries: 214, lastUsed: '2026-05-21', autoApplied: 63, corrections: 2, state: 'active' },
  { lab: 'Yarra Regional Analytical', entries: 88, lastUsed: '2026-05-18', autoApplied: 21, corrections: 1, state: 'active' },
  { lab: 'ChemCentre WA', entries: 41, lastUsed: '2025-11-04', autoApplied: 0, corrections: 0, state: 'dormant' },
];

/** One profile's entries — the thing a wrong learned mapping is found in. */
export const MAPPING_ENTRIES = [
  { from: 'Sulphate', to: 'Sulfate as SO₄', kind: 'analyte', learned: '2024-03-11', by: 'A. Nakamura', uses: 47, version: 3, state: 'current' },
  { from: 'Cd-diss', to: 'Cadmium (filtered)', kind: 'analyte', learned: '2024-03-11', by: 'A. Nakamura', uses: 44, version: 1, state: 'current' },
  { from: 'MW-05', to: 'MW05', kind: 'location', learned: '2025-07-02', by: 'D. Okafor', uses: 19, version: 1, state: 'current' },
  { from: 'ug/l', to: 'µg/L', kind: 'unit', learned: '2024-03-11', by: 'system — case normalisation', uses: 612, version: 1, state: 'current' },
  { from: 'TDS (calc)', to: 'Total dissolved solids', kind: 'analyte', learned: '2024-08-19', by: 'A. Nakamura', uses: 0, version: 2, state: 'corrected', note: 'Was mapped to "Total dissolved solids (dried)" until 2025-02-03. The laboratory calculates this from EC and does not dry it; 31 results were re-derived when the mapping was corrected.' },
];

/** Rows held out of a commit, with the reason a person can act on (§5.3). */
export const QUARANTINE = [
  { row: 18, subject: 'Nitrate as N · MW09 · 2026-05-14', reason: 'Analysed 6 days after collection against a 2-day holding-time window (APHA 4500-NO₃⁻). A nitrate result outside its window understates the true concentration.', rule: 'holding-time · APHA 4500-NO₃⁻ · 2 d', wayOut: 'Request a re-analysis, or accept with qualifier H and record why', state: 'held' },
  { row: 24, subject: 'Sulfate as SO₄ · MW09 · 2026-05-14', reason: 'The laboratory reported this as analysis_aborted, which is not a concentration. Storing it as a number would invent a measurement.', rule: 'sentinel −999 · ESdat ELDF-4', wayOut: 'Request a re-analysis. There is nothing to accept.', state: 'held' },
  { row: 31, subject: 'Validation state "QA-Hold" · rows 31–36', reason: '"QA-Hold" is not a validation state this format maps. Defaulting it would erase or invent a review judgement (PP4).', rule: 'Validation_Status · ESdat export vocabulary', wayOut: 'Add the mapping to the Yarra Regional profile, or hold these rows', state: 'held' },
  { row: 12, subject: 'Zinc (filtered) · MW05-DUP · 2026-05-13', reason: 'Field duplicate RPD of 38.2% against a 30% acceptance limit. Both results are above the reporting limit, so this is a real disagreement rather than noise near the limit.', rule: 'field-duplicate-rpd · 30%', wayOut: 'Accepted with qualifier J — estimated', state: 'resolved' },
];

/**
 * # Every qualifier in this instance — one record, read on five screens
 *
 * Wave 17, 3 September 2026. Wave 10 found, while drawing the export, that
 * *"the QA/QC register records each qualifier's basis and not its scheme, and
 * an export is the first surface that needs the second"*, and deferred it as
 * *"a seed change with four screens on the other end of it and a judgement in
 * the middle"*. This is that record. The settled note closing the deferral is
 * further down, beside `schemeGap` in `EXCHANGE`, where the debt was raised.
 *
 * ## The gap is two fields, not one
 *
 * `docs/GLOSSARY.md` carries **three** separate first-class terms, not two:
 * *qualifier* (`QualifierCode`), *qualifier scheme* (`QualifierScheme` — USEPA,
 * ESdat or Strataflow, *"which vocabulary a code belongs to"*) and *qualifier
 * origin* (`QualifierOrigin` — *"who said it: the laboratory, in the
 * deliverable, or a practitioner manually"*). The export rule wave 10 quoted
 * lives in the **scheme** entry and turns on **origin**: a Strataflow reason
 * code *"must not be exported as though a laboratory had said it"* is a
 * sentence about who asserted a code, not about which list it came from. The
 * deferral named the scheme and not the origin, and a register carrying only
 * the scheme would still not answer the question the rule asks.
 *
 * ## What is derived and what is drawn as a decision
 *
 * **Origin is a measurement.** For every code the record already shows whether
 * a deliverable carried it or a check in this instance raised it, and that is
 * read off the record rather than assigned here. What the measurement returns
 * is not two clean buckets, and the register says so rather than rounding:
 * two codes are `laboratory` in the glossary's own word, two were raised by a
 * deterministic rule in this instance — which is **neither** of the glossary's
 * two words — and two are proposed and have written nothing at all, though
 * every available way out of both would write a person's judgement, which is
 * the glossary's second word exactly. The export does not need the missing
 * word: its rule turns on *laboratory or not*, and that is answered for all
 * six.
 *
 * **Scheme is decided only where the record decides it.** One code is settled
 * by the glossary's own sentence and the format it names. Five are not, in two
 * different ways, and the register keeps them apart because the ways out
 * differ: for the laboratory's `J` the question belongs to the laboratory, and
 * for the four raised here it belongs to this instance. Both readings of a
 * borrowed letter are real, they have different export consequences, and this
 * wave draws the decision rather than taking it — the same move waves 14, 15
 * and 16 made on the licence trigger, the withdrawn censored cells and the
 * absent soil limit.
 *
 * ## What is refused
 *
 * A meaning for `T`. Nothing in this instance states one, and the letter is
 * the whole point of the undecided scheme, so `means` is null and the screens
 * print the absence. And any claim that `Lab_Qualifier` **forbids** a code
 * outside the six the specification names: `docs/reference/esdat-edd-spec.md`
 * says the field *"may carry USEPA codes `U, J, J+, J-, R, UJ`"*. That names
 * six; it does not reject a seventh, and *"not among the codes the
 * specification names"* is the sentence this register uses.
 */
export const QUALIFIERS = (() => {
  /** The six the ESdat specification names for `Lab_Qualifier` (§3, tier ✅). */
  const specNames = ['U', 'J', 'J+', 'J-', 'R', 'UJ'];
  const specField = 'Lab_Qualifier';
  /**
   * The glossary's two origin words, closed. Nothing here invents a third.
   *
   * ## FOUND FOR THE PRODUCT — 3 September 2026 (wave 17), owner Jerry
   *
   * **`QualifierOrigin` is two-valued and this instance holds assertions it
   * cannot express.** The glossary says origin is *"the laboratory, in the
   * deliverable, or a practitioner manually"*. `FD-2` and `ST-1` are neither:
   * a rule of this project's own raised them automatically against the DQO,
   * and they are applied to 10 results between them. They carry
   * `originState: 'uncovered'` and are counted rather than given a third word
   * a mockup invented.
   *
   * Filed under its own marker rather than in the deferral ledger, and the
   * distinction is the point: the ledger's marker counts debts this catalogue
   * owes and a later wave can pay, and this is not one. Nothing in this
   * repository can settle it — the exit is a decision about the product's own
   * vocabulary, taken by its owner, after which the seed follows. A ledger
   * entry would read as unattended-buildable scope and there is none here, and
   * it would move a count two waves have reported. Greppable under the heading
   * above, which is the whole reason it is a heading: it was recorded in three
   * prose places before it was findable mechanically (W17-A-4). Two markers,
   * two questions — what this repo owes, and what its reading of the product
   * turned up.
   */
  const originWords = ['laboratory', 'manually'];

  const esdatRun = IMPORTS.find((i) => i.id === 'IMP-0241');
  const yarraRun = IMPORTS.find((i) => i.id === 'IMP-0239');
  const esdatFormat = FORMATS.find((f) => f.name === esdatRun.format);
  const yarraFormat = FORMATS.find((f) => f.name === yarraRun.format);

  /**
   * A meaning word, **found in the record** rather than restated beside it.
   *
   * The candidate is checked against the finding's own action line and the
   * labels of its ways out. If the record stops saying it, this returns null
   * and every surface prints the absence instead of a stale word.
   */
  const meaningIn = (q, word) => {
    if (!word) return null;
    const said = [q.action, ...(q.decision?.options ?? []).map((o) => o.label)].join(' · ');
    return said.includes(word) ? word : null;
  };
  const MEANING = { 'FD-2': 'estimated', 'MS-1': 'biased low', 'EB-1': 'blank-affected', 'ST-1': null };

  /* ---------------------------------------------------------------- *
   * The two the laboratories asserted
   * ---------------------------------------------------------------- */

  const labU = {
    id: 'lab-U',
    code: RESULT_DETAIL.qualifiers[0].code,
    means: RESULT_DETAIL.qualifiers[0].meaning.toLowerCase(),
    raisedBy: `${esdatRun.lab} — certificate ${RESULT_DETAIL.certificate}`,
    on: `${RESULT_DETAIL.analyte} · ${RESULT_DETAIL.location} · sample ${RESULT_DETAIL.sample}`,
    at: 'result-detail',
    atLabel: 'the result',
    applied: true,
    results: null,
    origin: RESULT_DETAIL.qualifiers[0].origin,
    originState: 'stated',
    originSays:
      `It arrived on ${esdatRun.file} — ${esdatRun.format}, from ${esdatRun.lab} — and committed as ${esdatRun.id}. ` +
      'The laboratory said it in the deliverable, which is the glossary’s first origin word without any inference in between.',
    scheme: 'USEPA',
    schemeState: 'declared',
    schemeShort: 'USEPA scheme, declared by the deliverable’s format',
    schemeSays:
      `The glossary settles this one by name: “An ESdat deliverable’s U is USEPA’s U and means what USEPA says it means.” ${esdatRun.file} is that format — ${esdatRun.format}, ${esdatFormat.files.toLowerCase()}, ${esdatFormat.fields} published fields — and the specification gives that format a way to carry its own vocabulary: a header block mapping each code to a description. The letter is read against a named list rather than against a habit.`,
  };

  const labJ = {
    id: 'lab-J',
    code: PFAS_LIMITS.qualifier,
    means: PFAS_LIMITS.qualifierMeans,
    raisedBy: `${yarraRun.lab} — certificate ${PFAS_LIMITS.certificate}`,
    on: 'PFHxS on the PFOS + PFHxS pair, and carried onto the derived total',
    at: 'lineage',
    atLabel: 'the lineage of the derived total',
    applied: true,
    results: null,
    origin: PFAS_LIMITS.origin,
    originState: 'stated',
    originSays: PFAS_LIMITS.says,
    scheme: null,
    schemeWas: PFAS_LIMITS.schemeWas,
    schemeState: 'undeclared',
    schemeShort: 'scheme not declared by the deliverable that carried it',
    schemeSays:
      `A laboratory said it, and no vocabulary came with it. ${yarraRun.id} arrived in ${yarraRun.format} — ${yarraFormat.files.replace('Single', 'a single')}, ${yarraFormat.fields} fields, this laboratory’s own dialect and nobody else’s. A single file has no header, so it has no block declaring a code list, and the glossary’s warrant for reading a laboratory’s letter as USEPA’s names one format and it is not this one.`,
    schemeWasWhy:
      `The nearest thing to a citation on the record is ${PFAS_LIMITS.method}, and that is an analytical method rather than a qualifier vocabulary — a method named after an agency does not put that agency’s reason codes on a certificate, and the resemblance is how this kind of assertion gets made without anybody deciding it.`,
    settledBy: `Ask ${yarraRun.lab} which list its J is drawn from, or take the next PFAS suite on a deliverable whose header declares one. It is the laboratory’s answer to give, and it costs an email rather than a decision.`,
  };

  /* ---------------------------------------------------------------- *
   * The four this instance raised
   * ---------------------------------------------------------------- */

  const fromFinding = (q) => {
    const applied = !q.proposed;
    const byRule = q.concept === 'automatic';
    /** The ways out that are open and would actually write this letter. */
    const writes = (q.decision?.options ?? []).filter(
      (o) => o.available && o.writes.startsWith(`Qualifier ${q.qualifier}`),
    );
    /**
     * The origin an unapplied code would take, derived from the ways out.
     *
     * Not from the propagation basis, which is a different question — *how far
     * does it reach* rather than *who said it*. What decides origin is whether
     * a way out that writes the letter attributes it to the laboratory or to a
     * rule; where none does, the person taking the decision is the asserter,
     * and `manually` is the glossary's own word for that. On both unapplied
     * findings the laboratory and rule options are on the card and **refused
     * by the record** — the certificate qualifies no result, the objective set
     * states no consequence — which is why what is left is a person.
     */
    const ruledOut = (q.decision?.options ?? []).filter(
      (o) => !o.available && (o.basis === 'laboratory' || o.basis === 'dqo'),
    );
    const wouldBe = writes.length && !writes.some((o) => o.basis === 'laboratory' || o.basis === 'dqo') ? 'manually' : null;
    return {
      id: q.id,
      code: q.qualifier,
      means: meaningIn(q, MEANING[q.id]),
      raisedBy: `${q.check} — ${q.scope}`,
      on: q.action,
      at: 'qc',
      atLabel: 'the QA/QC finding',
      applied,
      results: q.results,
      basis: q.basis?.kind ?? null,
      finding: q,
      origin: applied ? (byRule ? null : 'manually') : null,
      originState: applied ? (byRule ? 'uncovered' : 'stated') : 'unwritten',
      wouldBe,
      ruledOut,
      originSays: applied
        ? byRule
          ? `Raised by a rule in this instance, not by anybody: ${q.rule.name}, ${q.rule.version}. The glossary’s origin is two-valued — the laboratory in the deliverable, or a practitioner manually — and a deterministic rule of this project’s own is neither. The register records what raised it and does not invent a third word for it.`
          : `${q.disposition.by} applied it on ${q.disposition.at}, which is the glossary’s second origin word exactly.`
        : `Nothing has been written, and an export writes the record rather than the proposal. ${q.results} result${q.results === 1 ? ' is' : 's are'} at stake and the decision has not been made. ${writes.length === 1 ? 'The one way out that would write this letter is a person’s' : writes.length === 2 ? 'Both ways out that would write this letter are a person’s' : `All ${writes.length} ways out that would write this letter are a person’s`}` +
          (ruledOut.length
            ? `, and the ${ruledOut.length} that would have attributed it to ${ruledOut.map((o) => (o.basis === 'laboratory' ? 'the laboratory' : 'a rule')).join(' or ')} are refused by the record`
            : ', and no option on the card offers to attribute it to a laboratory or a rule') +
          `. So the origin it would take is ${wouldBe ?? 'not settled by the options either'} — the person the decision belongs to.`,
      alsoUnder:
        q.rerun?.conceptMoves === 'automatic'
          ? `${q.rerun.says} So this code’s origin depends on which version judges it, which is the sharpest thing on the round about origin being a fact about an act rather than a property of a letter.`
          : null,
      scheme: null,
      schemeState: 'unrecorded',
      schemeShort: 'scheme not recorded — raised here, vocabulary unstated',
      schemeSays:
        'The record says what raised it and never which list the letter came from. A reviewer reaching for a familiar letter and this instance minting its own reason code produce the same character, and only one of them may cross into a laboratory field.',
    };
  };

  const rows = [labU, labJ, ...QAQC.filter((q) => q.qualifier).map(fromFinding)].map((r) => {
    const named = specNames.includes(r.code);
    const mayWrite =
      r.origin !== 'laboratory'
        ? 'no'
        : r.schemeState === 'declared' && named
          ? 'yes'
          : 'only with the assumption stated';
    return {
      ...r,
      specNames: named,
      specSays: named
        ? `${specField} may carry ${r.code} — it is among the ${specNames.length} codes the specification names for that field.`
        : `${r.code} is not among the ${specNames.length} codes the specification names for ${specField}. That is what was measured; the specification does not say the field rejects a seventh, and this register does not say so either.`,
      mayWrite,
      writeSays:
        r.origin !== 'laboratory'
          ? r.originState === 'unwritten'
            ? `Nothing to write. The qualifier is proposed and unapplied, and an export writes the record rather than the proposal.${named ? '' : ` Were it applied, ${r.code} would still not be among the codes the specification names for ${specField}.`}`
            : `Refused on origin, before the letter is even looked at. ${specField} is a laboratory qualifier field, and this code was raised by a check of this instance’s own — writing it there would export it as though a laboratory had said it, which the glossary forbids by name.${named ? ` The letter ${r.code} happens to be one the specification names, and that changes nothing: origin decides this, not the character.` : ''}`
          : mayWrite === 'yes'
            ? `Written unchanged. A laboratory asserted it, the deliverable declared the vocabulary, and ${specField} is the field that vocabulary belongs to — the code crosses without translation.`
            : `Writable, but not silently. Putting ${r.code} in a field the specification describes as carrying USEPA codes asserts that this laboratory’s ${r.code} is USEPA’s ${r.code}, and nothing declared that. Either the assumption is stated in the transmittal or the code is held — the same two ways out this screen offers for every other loss.`,
    };
  });

  const byId = (id) => rows.find((r) => r.id === id);
  const applied = rows.filter((r) => r.applied);
  const proposed = rows.filter((r) => !r.applied);
  const laboratory = rows.filter((r) => r.origin === 'laboratory');
  /*
   * W17-A-2b. This read `r.origin !== 'laboratory'`, which is not the same
   * predicate as "came from one of this round's QA/QC checks" — it only
   * coincides with it while every non-laboratory row happens to be a finding.
   * A practitioner-applied qualifier is the glossary's own second origin word
   * and has no finding behind it, and every consumer here dereferences
   * `r.finding` for the check, its scope and its basis. So the collection says
   * what it means, and a manual assertion joins the register without killing
   * the screen that draws the rules.
   */
  const raisedHere = rows.filter((r) => r.finding);
  const undecided = rows.filter((r) => r.schemeState === 'unrecorded');
  const sum = (list) => list.reduce((n, r) => n + (r.results ?? 0), 0);

  /**
   * The letters carried by more than one assertion.
   *
   * Derived rather than pointed at: today it returns one group and it is `J`,
   * the same character on a laboratory's certificate and on a rule this
   * project wrote. A register keyed on the letter alone would merge them.
   */
  const collisions = [...new Set(rows.map((r) => r.code))]
    .map((code) => ({ code, on: rows.filter((r) => r.code === code) }))
    .filter((g) => g.on.length > 1);

  return {
    rows,
    byId,
    byCode: (code) => rows.filter((r) => r.code === code),
    specNames,
    specField,
    originWords,
    applied,
    proposed,
    laboratory,
    raisedHere,
    undecided,
    collisions,
    counts: {
      assertions: rows.length,
      codes: new Set(rows.map((r) => r.code)).size,
      applied: applied.length,
      proposed: proposed.length,
      laboratory: laboratory.length,
      raisedHere: raisedHere.length,
      /** The 10 results wave 10 counted, recounted off the same register. */
      appliedResults: sum(applied),
      proposedResults: sum(proposed),
      declared: rows.filter((r) => r.schemeState === 'declared').length,
      undeclared: rows.filter((r) => r.schemeState === 'undeclared').length,
      unrecorded: undecided.length,
      originStated: rows.filter((r) => r.originState === 'stated').length,
      originUncovered: rows.filter((r) => r.originState === 'uncovered').length,
      originUnwritten: rows.filter((r) => r.originState === 'unwritten').length,
      writable: rows.filter((r) => r.mayWrite === 'yes').length,
      conditional: rows.filter((r) => r.mayWrite === 'only with the assumption stated').length,
      refused: rows.filter((r) => r.mayWrite === 'no').length,
      specNamed: rows.filter((r) => r.specNames).length,
      notSpecNamed: rows.filter((r) => !r.specNames).length,
    },

    /**
     * The decision this wave draws rather than takes.
     *
     * One question over four codes, not four questions — the reviewer's
     * vocabulary is a property of this instance, and answering it for `J`
     * answers it for `T`, `L` and `B` at the same time.
     */
    decision: {
      question: 'When a check of ours raises a letter, which list is that letter drawn from?',
      covers: undecided.map((r) => r.code),
      results: sum(undecided),
      resultsApplied: sum(undecided.filter((r) => r.applied)),
      resultsProposed: sum(undecided.filter((r) => !r.applied)),
      matters:
        'Scheme is what makes a migration mappable in both directions, and it is the field that tells one assertion from another when two of them wear the same character. It does not change the export answer — origin already refuses all four — so nothing is blocked on it, which is exactly why it could sit unrecorded for a wave without anybody noticing.',
      readings: [
        {
          label: 'Borrowed from USEPA, carrying the meaning it has there',
          says: 'The reviewer reached for a letter practitioners already read, and meant by it what USEPA means. It is the ordinary reading and the record is consistent with it.',
          consequence:
            'A migration out of this instance can map these codes to a receiving system’s USEPA list, because they are the same codes. It does not make them writable into a laboratory field — a borrowed word in our mouth is still ours — and one of the four would map cleanly while three are not among the codes the specification names for that field at all.',
        },
        {
          label: 'This instance’s own reason code, wearing a familiar letter',
          says: 'The check raised its own code and the letter is a convenience. It is equally consistent with the record, and it is what the glossary’s Strataflow scheme describes.',
          consequence:
            'A migration must carry the code with this instance’s own vocabulary attached, or it lands somewhere else meaning something else. The same character in the receiving system is a different code, and mapping on the letter would silently merge two assertions.',
        },
      ],
      refused:
        'Choose one because it is likelier. Wave 10 did that once already — it read B as USEPA on familiarity — and the specification did not agree. A vocabulary guessed is the same defect as a field mapping guessed, and the export screen exists to not do that.',
      wouldSettle:
        'A controlled reason-code list for this instance, versioned like the criteria library and the objective set, stating for each code the vocabulary it belongs to. The glossary already names the three schemes; what is missing is the list itself, and writing one is a configuration decision with an approver rather than a column to fill in.',
    },

    /** The wave-10 expectation, corrected against the specification. */
    wave10: {
      /* The deferral's own sentence, with its code fences dropped so it reads
       * as prose on a screen. The byte-exact original is quoted in the settled
       * note beside `schemeGap`. */
      was: 'J and B read as USEPA, T and L are the ones a real decision would have to be taken about',
      now: `The specification names ${specNames.length} codes for ${specField} — ${specNames.join(', ')}. J is among them and B is not, and neither are T and L. So the guess was right about J and wrong about B, measured against the specification rather than against familiarity.`,
      andAlso:
        'It also read the question as one about four codes. It is about six assertions on five letters, because the same J is on a laboratory’s certificate as well as on a rule of ours, and because origin — which the deferral never named — is what the export rule actually turns on.',
    },

    /** The field this wave renamed, with what it used to say. */
    renamed: [
      {
        where: 'RESULT_DETAIL.qualifiers[]',
        was: 'source',
        now: 'origin',
        why: 'The glossary’s term is qualifier origin (QualifierOrigin). One concept was modelled under three words across this seed — origin on the PFAS limits, source here, and neither on the QA/QC register — which is the drift QB-9 and ADR-0009 exist to stop.',
      },
    ],

    /**
     * ## What `#qualifiers` drew until 3 September 2026
     *
     * The screen carried four typed rows and **three of them assert a
     * qualifier the record says was never applied**, while the fourth
     * attributes an automatic one to a person. Measured against the records
     * that own each claim, not against a reading of the screen: every verdict
     * below recomputes, so a record that changed would change the sentence.
     */
    drawnBefore: (() => {
      const ht = QAQC.find((q) => q.id === 'HT-1');
      const heldRow = QUARANTINE.find((r) => r.row === 18);
      const spike = QAQC.find((q) => q.id === 'SH-1');
      const fd2 = QAQC.find((q) => q.id === 'FD-2');
      const derived = LINEAGE.chain.find((s) => s.kind === 'derived');
      return [
        {
          // W17-A-1. `code` was `fd2.qualifier` — a before that re-derived from
          // the present, on the panel whose whole subject is that befores are
          // not silently repaired. What this screen drew is history and reads
          // as a literal like its three siblings; the claim that today's record
          // still says the same thing is `stands`, which is where a derivation
          // belongs. Both halves of the verdict are asserted there now.
          was: { result: 'Zinc · MW05', code: 'J', means: 'Estimated value', by: 'A. Nakamura', reason: `Field duplicate RPD 38.2% against the ${DQO.limitFor('Field duplicate RPD').limit} limit` },
          verdict: 'the code is right and the asserter is not',
          stands: fd2.qualifier === 'J' && fd2.concept === 'automatic',
          now: `${fd2.id} is concept ${fd2.concept}: ${fd2.rule.says.charAt(0).toLowerCase()}${fd2.rule.says.slice(1)} Nobody applied it, and it reached ${fd2.results} results — the parent and its duplicate — rather than the one row the screen drew.`,
          at: 'qc',
        },
        {
          was: { result: 'Nitrate · MW09', code: 'H', means: 'Holding time exceeded', by: 'system', reason: 'Analysed at 6 days against a 2-day window' },
          verdict: 'a way out that was never taken',
          stands: ht.qualifier === null && heldRow.state === 'held',
          now: `${ht.id} carries no qualifier at all — its action is “${ht.action}” — and row ${heldRow.row} is still ${heldRow.state}. H appears in one place on this round, as half of that row’s way out: “${heldRow.wayOut}”. Nobody accepted it, so nothing was written.`,
          at: 'quarantine',
        },
        {
          was: { result: 'Arsenic · MW05', code: '*', means: 'Confirmed against certificate', by: 'A. Nakamura', reason: 'Spike against location history — checked, real' },
          verdict: 'contradicted by the disposition it came from',
          stands: spike.qualifier === null,
          now: `${spike.id} says the opposite in as many words: “${spike.disposition.wrote}” A finding closed without a qualifier was being drawn as a qualifier, which turns the record’s most careful distinction inside out.`,
          at: 'qc',
        },
        {
          was: { result: 'PFOS+PFHxS · MW05', code: 'D', means: 'Derived value', by: 'system', reason: 'Sum parameter · rule sum-pfas-anzg v2.1' },
          verdict: 'not a qualifier — a property of the result',
          stands: !rows.some((r) => r.code === 'D'),
          now: `The glossary’s qualifier is “a coded assertion attached to a result by the laboratory or by a reviewer”. Derived is neither: it is what FR-2.3 makes first-class on the result itself, and the chain says so — “${derived.what}”. The qualifier that total does carry is ${labJ.code}, from ${labJ.raisedBy}.`,
          at: 'lineage',
        },
      ];
    })(),
  };
})();

/**
 * # The import screen's four stat tiles, derived — settled 2 September 2026,
 * wave 13
 *
 * ## What the record said, and what it said it was waiting for
 *
 * Wave 8 recorded, beside the tiles in `screens.mjs`: *"the other three tiles
 * are still literals and they predate this wave: 231 is IMP-0241 alone, 9 is
 * the two non-migration runs' held rows (the migration's 112 are not in it),
 * and 1 is the reversal … Deriving them means deciding what 'this quarter' and
 * 'held' mean across a migration run and a logger download, which is a scoping
 * decision rather than an arithmetic one."* That is the decision, taken here
 * and stated on the screen: **each tile's definition sentence is a field on
 * the tile, so the sentence and the filter are one thing rather than two that
 * can drift.** A count one qualifier narrower than its printed definition is
 * how this goes wrong, and the only defence is that the definition is not
 * written anywhere else.
 *
 * ## The two decisions the record was waiting for
 *
 * **"This quarter" is the calendar quarter the project clock's as-at date
 * falls in** — `AS_AT` is 2026-05-24, so 1 April to 30 June 2026 — resolved in
 * the site's own timezone, which is the rule the completeness screen already
 * states in as many words (*"a sample taken at 08:00 on 1 April local time
 * belongs to the June quarter, not this one"*). Calendar rather than fiscal,
 * deliberately: this project's reporting year ends in June and its *fiscal*
 * Q4 is April–June, so the two windows coincide here and would not everywhere;
 * the round these runs carry is coded `2026-Q2` on the calendar, and a tile
 * counting one thing while the round beside it is named for another would be
 * the disagreement rather than the fix.
 *
 * **"Held" is a row read, understood and deliberately not written**, summed
 * over the quarter's runs that have not been reversed. Reversing a run
 * withdraws it — its results leave every register that counted them — so its
 * held rows are not waiting for anybody either, and IMP-0240's 6 are out.
 *
 * ## Three of the four numbers move, and here is each one
 *
 *   - **runs this quarter: 5 → 5.** It was already `IMPORTS.length`; it is now
 *     the same list filtered to the quarter, which is every run, so the number
 *     is unchanged and the sentence under it is now true of the filter.
 *   - **results committed: 231 → 18,859.** The old literal was IMP-0241 alone.
 *     A committed results run writes `rows − held` results — 42 rows, 3 held,
 *     39 committed is the arithmetic the review screen already draws — so the
 *     migration's 18,740 rows less its 112 held is **18,628**, and 231 + 18,628
 *     is 18,859. The migration committed those results into this project and a
 *     tile that left them out was counting one run rather than a quarter.
 *   - **held for review: 9 → 115.** The old literal was IMP-0240's 6 plus
 *     IMP-0239's 3. It had it exactly the wrong way round: IMP-0240 is
 *     *reversed*, so its 6 are not held any more, and the migration's 112 are
 *     held on a run that stands. 3 + 112 = 115.
 *   - **reversed: 1 → 1.** One run in the quarter is in state `reversed`, and
 *     it is the run the literal meant.
 *
 * Wave 8's closing line — *"the logger run contributes 0 to all three"* — was
 * a protected assumption and is a computed fact now: `loggerContributes`
 * carries what IMP-0243 puts into each tile, and it is 1 run, 0 results (its
 * kind is `series`, so the results filter never reaches it), 0 held and 0
 * reversed. Reading its `rows` here would resolve a getter that needs the
 * logger series four thousand lines below, and no tile does.
 *
 * Declared here rather than beside `IMPORTS` because the held tile reconciles
 * against `QUARANTINE`, which is declared above this line and below the runs.
 */
export const IMPORT_TILES = (() => {
  const year = Number(AS_AT.slice(0, 4));
  const quarter = Math.ceil(Number(AS_AT.slice(5, 7)) / 3);
  const startMonth = (quarter - 1) * 3 + 1;
  const from = `${year}-${String(startMonth).padStart(2, '0')}-01`;
  /* The first instant of the next quarter, so the window is half-open and the
   * last day of a 30- or 31-day month needs no special case. */
  const until = quarter === 4 ? `${year + 1}-01-01` : `${year}-${String(startMonth + 3).padStart(2, '0')}-01`;
  const day = (run) => run.received.slice(0, 10);
  const runs = IMPORTS.filter((r) => day(r) >= from && day(r) < until);

  const committed = runs.filter((r) => r.kind === 'results' && r.state === 'committed');
  const standing = runs.filter((r) => r.state !== 'reversed');
  const reversed = runs.filter((r) => r.state === 'reversed');
  const results = committed.reduce((n, r) => n + (r.rows - r.held), 0);
  const held = standing.reduce((n, r) => n + r.held, 0);

  /* The migration is the run that moves two of the three numbers, so it is
   * found by the property that makes it the migration rather than by index. */
  const migration = committed.find((r) => r.lab.includes('migration'));
  const series = runs.find((r) => r.kind === 'series');

  /** What the held register enumerates, against what the runs count. */
  const enumerated = QUARANTINE.filter((q) => q.state === 'held').length;
  const enumeratedRun = standing.find((r) => r.held === enumerated && r.kind === 'results');

  const quarterLabel = `${year} Q${quarter}`;
  const window = `1 ${['January', 'April', 'July', 'October'][quarter - 1]} – ${quarter === 1 ? '31 March' : quarter === 2 ? '30 June' : quarter === 3 ? '30 September' : '31 December'} ${year}`;

  return {
    quarter: quarterLabel,
    window,
    from,
    until,
    asAt: AS_AT,
    runs: runs.length,
    results,
    held,
    reversed: reversed.length,
    migration,
    migrationCommitted: migration.rows - migration.held,
    reversedRun: reversed[0],
    enumerated,
    enumeratedRun,
    /**
     * One row per tile, and the sentence is the filter written out. Nothing
     * on the screen states a definition that is not on this object.
     */
    tiles: [
      {
        value: runs.length,
        label: 'runs this quarter',
        tone: 'neutral',
        counts: `Every import run received in ${quarterLabel} — ${window}, the calendar quarter ${AS_AT} falls in, resolved in the site’s own timezone.`,
        includes: `All ${runs.length} kinds of run together: ${runs.filter((r) => r.kind === 'results').length} laboratory or migration deliverables and ${runs.filter((r) => r.kind === 'series').length} logger download.`,
        was: 'the whole register’s length, which was the same 5 — the filter is new, the number is not',
      },
      {
        value: results,
        label: 'results committed',
        tone: 'good',
        counts: `Results written to the record by the runs above whose kind is results and whose state is committed — each one’s rows less the rows it held.`,
        includes: `${committed.length} runs: ${committed.map((r) => r.id).join(' and ')}. The logger download commits water levels rather than results and contributes 0; the reversed run is not committed and contributes 0.`,
        was: '231 — IMP-0241 alone, which left out the migration’s 18,628',
      },
      {
        value: held,
        label: 'held for review',
        tone: 'warn',
        counts: 'Rows read, understood and deliberately not written, summed over the runs above that have not been reversed.',
        includes: `${standing.filter((r) => r.held > 0).length} runs carry any: ${standing.filter((r) => r.held > 0).map((r) => `${r.id} (${r.held})`).join(', ')}. Reversing a run withdraws it, so IMP-0240’s ${reversed[0].held} are not held any more.`,
        was: '9 — IMP-0240’s 6 and IMP-0239’s 3, which counted a reversed run and left out a committed one',
      },
      {
        value: reversed.length,
        label: 'reversed',
        tone: 'bad',
        counts: 'Runs above whose state is reversed. A reversal is an event on the record, not an erasure.',
        includes: `${reversed.map((r) => r.id).join(', ')}, reversed after ${reversed[0].rows} rows were committed and superseded by a complete deliverable.`,
        was: '1 — the same run, typed',
      },
    ],
    /** Wave 8's protected assumption, computed. */
    loggerContributes: {
      id: series.id,
      runs: 1,
      results: 0,
      held: series.held,
      reversed: 0,
      why: 'Its kind is series, so the results tile never reaches it; it held no row and it has not been reversed. It is one of the five runs, and that is the whole of what it contributes.',
    },
    /** The held tile against the register that enumerates held rows. */
    reconciliation: {
      enumerated,
      run: enumeratedRun.id,
      unenumerated: held - enumerated,
      says: `The held register lists ${enumerated} rows, and they are ${enumeratedRun.id}’s — one row each, with the rule that held it and the way out of it. The other ${held - enumerated} are the migration’s, and they are a count on a run rather than rows anybody can open: nothing in this catalogue enumerates them, which is a fact about the migration rather than about the tile.`,
    },
  };
})();

/** The licence as an entity (§11.2). */
export const LICENCE = {
  id: 'L8842/2019/1',
  holder: 'Wandalup Resources Pty Ltd',
  regulator: 'DWER — Department of Water and Environmental Regulation (WA)',
  issued: '2019-03-01',
  expires: '2029-02-28',
  lastVaried: '2024-07-01 (variation 3 — Table 4 limits tightened)',
  conditions: [
    { n: '12(b)', what: 'Groundwater quality at the compliance boundary must not exceed Table 4 limits', governs: 'MW09, MW11', discharges: 'Quarterly groundwater monitoring report', state: 'met' },
    // The window condition WINDOW_CONDITION evaluates. It sits beside 12(b)
    // because it is the same limit read over time rather than a second limit:
    // one round above is a result, three in a row is a finding about the site.
    { n: '12(c)', what: 'Where copper, zinc or electrical conductivity exceeds its criterion at the same location in three consecutive quarterly rounds, notify the CEO and lodge a groundwater investigation programme within 30 days', governs: 'MW05, MW07, MW09, MW11', discharges: 'Groundwater investigation programme', state: 'triggered' },
    { n: '14', what: 'Quarterly discharge return, volumes and quality at the licensed discharge point', governs: 'SW01', discharges: 'Quarterly discharge return', state: 'due' },
    { n: '18', what: 'Annual Environmental Report by 30 September each year', governs: 'All locations', discharges: 'Annual Environmental Report', state: 'on track' },
    { n: '21', what: 'Notify the CEO as soon as practicable on becoming aware of an exceedance', governs: 'All locations', discharges: 'Statutory notification', state: 'discharged 2026-05-22' },
    // The volume comes from the entitlement it mirrors, not from a second copy
    // of the number: this condition restates a limit set on another instrument,
    // and two instruments holding one figure is exactly how they come apart.
    { n: '23', what: `Abstraction must not exceed the volume licensed by ${WATER.instrument.id} — ${(WATER.entitlementKl / 1000).toLocaleString('en-AU')} ML — in the entitlement year`, governs: 'PB01, PB02 (production bores)', discharges: 'Annual water return', state: 'on track' },
  ],
  dischargePoints: [
    { id: 'DP01', what: 'Licensed surface discharge to Wandalup Creek', limit: '≤ 4 ML/day · Table 4 quality', monitored: 'SW01, 200 m downstream' },
  ],
  /*
   * The entitlement is a row on this licence's screen and its numbers are
   * `WATER`'s — one source, read twice. The version this replaces typed
   * "812 ML" and "65% of year elapsed" beside a July–June year, where 65% was
   * the share of the *entitlement* taken and the year was 15% through.
   */
  entitlements: [
    { id: WATER.instrument.id, what: 'Groundwater abstraction entitlement', instrument: WATER.instrument.kind, condition: WATER.instrument.mirror },
  ],
};

/** The unit dictionary, and every conversion the product may apply (§13.2, PP3). */
export const UNITS = [
  { unit: 'mg/L', quantity: 'Mass concentration', canonical: true, aliases: 'mg/l, ppm (water), milligrams per litre', uses: 1284 },
  { unit: 'µg/L', quantity: 'Mass concentration', canonical: true, aliases: 'ug/L, ug/l, ppb (water), mcg/L', uses: 2140 },
  { unit: 'ng/L', quantity: 'Mass concentration', canonical: true, aliases: 'ng/l, ppt (water)', uses: 188 },
  { unit: 'µS/cm', quantity: 'Electrical conductivity', canonical: true, aliases: 'uS/cm, umhos/cm, µmhos/cm', uses: 412 },
  { unit: 'pH units', quantity: 'Dimensionless (log activity)', canonical: true, aliases: 'pH, pH Units', uses: 412 },
  { unit: 'm AHD', quantity: 'Elevation', canonical: true, aliases: 'mAHD, m (AHD)', uses: 3106 },
  { unit: 'm bgl', quantity: 'Depth below ground level', canonical: true, aliases: 'mbgl, m BGL, metres below ground', uses: 3106 },
];

export const CONVERSIONS = [
  { from: 'ng/L', to: 'µg/L', rule: 'unit-scale v1', factor: '÷ 1000', exact: true, note: 'Decimal scaling within one quantity. Exact.' },
  { from: 'mg/L', to: 'µg/L', rule: 'unit-scale v1', factor: '× 1000', exact: true, note: 'Decimal scaling within one quantity. Exact.' },
  { from: 'µmhos/cm', to: 'µS/cm', rule: 'unit-identity v1', factor: '× 1', exact: true, note: 'Same quantity under an older name. No arithmetic.' },
  { from: 'm bgl', to: 'm AHD', rule: 'datum-at-date v2', factor: 'TOC elevation at the measurement date − depth', exact: false, note: 'Not a unit conversion — a derivation against the datum in force on the day, which a resurvey changes for later readings only (ADR-0015).' },
  { from: 'NO₃ (as NO₃)', to: 'Nitrate as N', rule: 'speciation v1', factor: '× 0.2259', exact: false, note: 'Speciation basis, not scaling. Carries the molar basis in lineage; a value converted without a stated basis is refused rather than assumed.' },
];

/** Documents and evidence, attached where they belong (§14, EX-08). */
export const DOCUMENTS = [
  { name: 'PAS2026-04417.pdf', kind: 'Laboratory certificate', size: '1.2 MB', attachedTo: 'Import run IMP-0241 · 231 results', by: 'A. Nakamura', at: '2026-05-21 09:14', hash: 'sha256:7c41…9a02', state: 'lineage terminus' },
  { name: 'PAS2026-04398.pdf', kind: 'Laboratory certificate', size: '0.9 MB', attachedTo: 'Import run IMP-0240 · superseded by 04417', by: 'A. Nakamura', at: '2026-05-19 16:02', hash: 'sha256:11d8…4e77', state: 'superseded' },
  { name: 'COC-WDL-26Q2.pdf', kind: 'Chain of custody', size: '340 KB', attachedTo: 'Sampling event 2026-Q2-GW', by: 'A. Nakamura', at: '2026-05-14 17:40', hash: 'sha256:cc02…81b3', state: 'current' },
  { name: 'DWER-N-2026-11842.pdf', kind: 'Notification evidence', size: '214 KB', attachedTo: 'Notification event · condition 21', by: 'R. Whitmore', at: '2026-05-22 14:31', hash: 'sha256:3f90…22ac', state: 'current' },
  { name: 'MW05-headworks-2026-05-13.jpg', kind: 'Field photograph', size: '2.8 MB', attachedTo: 'Sample WDL-26Q2-003 · MW05', by: 'A. Nakamura', at: '2026-05-13 08:52', hash: 'sha256:a7e1…0c45', state: 'current' },
  { name: 'MW05-bore-completion-2019.pdf', kind: 'Construction record', size: '4.1 MB', attachedTo: 'Location MW05', by: 'migration', at: '2026-04-02 08:30', hash: 'sha256:59bb…7f18', state: 'current' },
];

/** What has already gone out, and cannot change (§10.3). */
export const SUBMISSIONS = [
  { ref: 'WDL-QGR-2026Q1', what: 'Quarterly Groundwater Monitoring Report — 2026 Q1', to: 'DWER', submitted: '2026-04-28 11:02 AWST', by: 'R. Whitmore', snapshot: 'SNAP-0117', evidence: 'DWER portal receipt · 2026-04-28', state: 'accepted' },
  { ref: 'WDL-NOT-2026-001', what: 'Statutory notification — PFOS + PFHxS at MW05', to: 'DWER', submitted: '2026-05-22 14:30 AWST', by: 'R. Whitmore', snapshot: 'SNAP-0121', evidence: 'DWER-N-2026-11842.pdf', state: 'acknowledged' },
  { ref: 'WDL-DR-2026Q1', what: 'Quarterly discharge return — 2026 Q1', to: 'DWER', submitted: '2026-04-24 09:45 AWST', by: 'D. Okafor', snapshot: 'SNAP-0114', evidence: 'DWER portal receipt · 2026-04-24', state: 'accepted' },
  { ref: 'WDL-AER-2025', what: 'Annual Environmental Report — 2025', to: 'DWER', submitted: '2025-09-26 16:20 AWST', by: 'R. Whitmore', snapshot: 'SNAP-0088', evidence: 'DWER portal receipt · 2025-09-26', state: 'accepted' },
];

/**
 * The instance's authorisation configuration — every role binding it holds.
 *
 * The glossary's own definition of a role binding is *"one statement of the
 * form 'members of this directory group hold this role, here'"*, and its next
 * sentence is that **the instance's entire authorisation configuration is a
 * list of these**. So it is a list, here, once — and `#roles` renders it
 * rather than restating it.
 *
 * ## Why this list exists at all (wave 11, and it is a fix)
 *
 * `#roles` carried its own four hand-typed rows naming groups
 * (`WDL-Env-Leads`, `WDL-Env-Team`, `WDL-Geotech`, `WDL-Exec`) that appear
 * nowhere else in this seed, while `MEMBERS` — rendered on
 * `#project-settings` — resolved the same people through
 * `SG-Strataflow-WDL-Contributors`, `-Approvers` and `-Readers`. Two registers
 * of the same thing, disagreeing about what the instance's authorisation
 * configuration *is*, and a third screen (`#projects`) pointing at `#roles`
 * for a Reader binding that was on neither of its four rows. One register now,
 * and `MEMBERS` names its groups from it so the two cannot drift again.
 *
 * ## Two things the old rows claimed that the product refuses
 *
 * **`WDL-Exec → Reader → all projects` cannot exist.** A binding is
 * instance-wide **if and only if** its role is `auditor` — a check constraint,
 * `role_binding_instance_wide_iff_auditor`, and the app repo's provisioning
 * suite asserts both halves of it (a project-less `contributor` is refused,
 * and so is an `auditor` pinned to one project). A Reader over "all projects"
 * is not a configuration somebody has to be careful not to write; it is a row
 * the database will not accept. It is replaced here by the two things it was
 * conflating: a Reader binding on the project (S. Petrelli holds one), and an
 * **Auditor** binding, which is instance-wide by nature and is the glossary's
 * fourth role — *"answers for the instance rather than for a project"*.
 *
 * **A member count is not a fact this product has.** The old table carried
 * `Members: 2 · 6 · 3 · 4`. Strataflow asks the directory *which groups is
 * this principal in* and never *who is in this group* — the glossary is
 * explicit that it "reads group ids and never their membership" — so a roster
 * count would be a number no request can produce. What it can honestly count
 * is **principals it has seen**: people who signed in, whose membership
 * resolved to this binding at that moment. That is what the column says now,
 * it is counted from `MEMBERS`, and the auditor binding correctly reads 0.
 */
export const BINDINGS = [
  { group: 'SG-Strataflow-WDL-Approvers', role: 'Approver', project: PROJECT.code, party: PROJECT.operator, can: 'Approve, sign off, issue reports and lodge submissions' },
  { group: 'SG-Strataflow-WDL-Contributors', role: 'Contributor', project: PROJECT.code, party: PROJECT.operator, can: 'Import, review, validate, qualify, produce figures' },
  { group: 'SG-Strataflow-WDL-Readers', role: 'Reader', project: PROJECT.code, party: PROJECT.operator, can: 'Read and export every register and issued report; write nothing' },
  { group: 'SG-Strataflow-KRJ-Approvers', role: 'Approver', project: KURRAJONG.code, party: PROJECT.operator, can: 'Approve, sign off, issue reports and lodge submissions' },
  /*
   * The one binding with no project, and the schema is what makes that safe:
   * instance-wide iff auditor, so an unscoped grant cannot be arrived at by
   * leaving a field blank. It is also the authority behind the one read in
   * this product that does not narrow to a project — "what did this principal
   * do, across every project, in a bounded window".
   */
  { group: 'SG-Strataflow-Audit', role: 'Auditor', project: null, party: PROJECT.operator, can: 'Read what one principal did across every project, in a bounded window. No project data.' },
  {
    group: ENGAGEMENT.binding.group,
    role: ENGAGEMENT.binding.role,
    project: ENGAGEMENT.binding.project,
    party: ENGAGEMENT.party.name,
    can: 'Import, review, validate, qualify, produce figures — the Contributor set, unchanged',
    engagement: ENGAGEMENT.id,
    sponsor: ENGAGEMENT.binding.sponsor,
    until: ENGAGEMENT.ends,
  },
];

/**
 * Role bindings against Entra identities (§2.3, §13.1, G-70d).
 *
 * Not a user table and not a roster: these are the principals this instance
 * has actually seen, with the binding their group membership resolved to at
 * the time. Wave 11 extends the same structure with the engagement's two
 * external principals rather than opening a second register beside it — they
 * are generated from `ENGAGEMENT` so the party, the group, the sponsor and the
 * end date cannot drift from the engagement record they belong to.
 */
export const MEMBERS = [
  { name: 'A. Nakamura', identity: 'anakamura@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-23 07:41 AWST', state: 'active' },
  // W5-A-1: the binding two screens and the top bar rest on must be on the
  // register that grounds it, or the register is not the authority it claims.
  { name: 'A. Nakamura', identity: 'anakamura@wandalup.example', project: 'MOCK-KRJ', role: 'Approver', granted: '2025-09-14', by: 'System administrator', group: 'SG-Strataflow-KRJ-Approvers', lastSeen: '2026-08-23 07:41 AWST', state: 'active' },
  { name: 'D. Okafor', identity: 'dokafor@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-06-03', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-22 16:08 AWST', state: 'active' },
  { name: 'R. Whitmore', identity: 'rwhitmore@wandalup.example', project: 'MOCK-WDL', role: 'Approver', granted: '2024-02-19', by: 'System administrator', group: 'SG-Strataflow-WDL-Approvers', lastSeen: '2026-08-23 06:55 AWST', state: 'active' },
  { name: 'S. Petrelli', identity: 'spetrelli@wandalup.example', project: 'MOCK-WDL', role: 'Reader', granted: '2025-03-11', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Readers', lastSeen: '2026-08-19 09:12 AWST', state: 'active' },
  { name: 'J. Halloran', identity: 'jhalloran@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: '— removed from group 2026-07-31', lastSeen: '2026-07-30 15:44 AWST', state: 'deprovisioned' },
  /*
   * Wave 11 — the engagement's principals, on the same register and in the
   * same shape. Every field but the name and the last-seen moment is read off
   * `ENGAGEMENT`, so there is one statement of who sponsored the engagement,
   * which group carries it and when it ends.
   *
   * `party` and `until` are the two fields the internal rows do not carry, and
   * they are `undefined` there rather than filled in with the operator's own
   * name and a blank: a row with no party is an operator row, and a row with
   * no end date is a binding that ends when the group membership does. Both
   * screens that render this register read them that way.
   */
  ...ENGAGEMENT.people.map((p) => ({
    name: p.name,
    identity: p.identity,
    project: ENGAGEMENT.binding.project,
    role: ENGAGEMENT.binding.role,
    granted: ENGAGEMENT.granted,
    by: ENGAGEMENT.binding.sponsor,
    group: ENGAGEMENT.binding.group,
    lastSeen: p.lastSeen,
    state: 'active',
    party: ENGAGEMENT.party.name,
    until: ENGAGEMENT.ends,
    engagement: ENGAGEMENT.id,
  })),
];

/** Instance administration the operating model implies but no persona owns (§13.3). */
export const ENTITLEMENT = {
  customer: 'Wandalup Resources Pty Ltd',
  term: '2026-01-01 → 2026-12-31',
  /**
   * The countdown, derived from the term's own end date and the administration
   * clock — **settled 2 September 2026, wave 13**, the arithmetic half of
   * wave 11's two-clocks record.
   *
   * It was the string `'130 days'`, typed on 23 August 2026, and wave 12's
   * `OPS_AS_AT` comment listed it as one of seven literals nobody could grep as
   * a set. The subtraction it stood in for: **2026-08-23 → 2026-12-31 = 8 (the
   * rest of August) + 30 + 31 + 30 + 31 = 130 days.** The number does not move.
   * What moves is that it is the subtraction now rather than the memory of one,
   * measured from the same `OPS_AS_AT` the estate and package boards use, so
   * moving that constant moves this with it.
   *
   * A getter rather than a computed constant because `OPS_AS_AT` is declared
   * four thousand lines below this record — the same reason `IMPORTS`' logger
   * run holds its row count as one. It resolves when a screen renders, long
   * after both.
   */
  get remaining() {
    return `${daysBetween(OPS_AS_AT, this.term.split(' → ')[1])} days`;
  },
  seats: '12 named · 5 in use this month',
  atExpiry: 'The instance keeps running read-only. Ingestion and report generation stop; every existing record, export and backup stays reachable, and the data is the customer’s in their own tenancy either way (DR-1).',
  support: 'Business hours AWST · 1 business day response · escalation to the operator',
};

export const UPGRADE = {
  current: 'v0.7.2',
  available: 'v0.8.0',
  released: '2026-08-21',
  window: 'Customer-scheduled — nothing installs itself',
  preflight: [
    { check: 'Schema migrations applied cleanly against a copy of this database', outcome: 'pass', detail: '3 migrations · 41 s on a 4.1 GB restore' },
    { check: 'Backup taken and content-integrity verified within 24 h', outcome: 'pass', detail: '2026-08-23 02:00 AWST · audit and lineage digests match' },
    { check: 'Reference content versions compatible', outcome: 'pass', detail: 'ANZG 2018.1 unchanged · analyte dictionary 2026.2 → 2026.3 (diff below)' },
    { check: 'No import run mid-flight', outcome: 'warn', detail: 'IMP-0239 is in review. An upgrade will not lose it, but its stage artifacts rebuild on first open.' },
    { check: 'Rollback path verified', outcome: 'pass', detail: 'v0.7.2 image retained by digest · restore drill 2026-08-22 · measured RTO 38 m' },
  ],
  changes: [
    { what: 'Analyte dictionary 2026.2 → 2026.3', kind: 'reference content', detail: '14 added, 2 synonyms corrected, 0 removed. Arrives as a diff you accept — nothing overwrites silently.' },
    { what: 'Crosstab per-criterion shading', kind: 'feature', detail: 'Results gain a mark per criteria set.' },
    { what: 'Reversal from the browser', kind: 'feature', detail: 'A committed import can be reversed without a terminal.' },
  ],
};

/**
 * The diagnostic bundle, previewed before anything leaves (§13.3, OM-1, DR-2).
 *
 * The preview *is* the trust feature. A support bundle that a customer cannot
 * inspect before it is exported is a request to take the vendor's word for
 * what it holds, and this product's whole position is single-tenant, in the
 * customer's own cloud.
 *
 * ## The contents list moved out of here — settled 2 September 2026, wave 13
 *
 * `BUNDLE.contents` was eight hand-written rows and `#diagnostics` drew four
 * different ones, which is what wave 12's `bundleGap` record was about. There
 * is one derived list now — `BUNDLE_CONTENTS`, declared beside the
 * configuration inventory it reads, because the configuration category cannot
 * be described without it — and both screens render it. What is left here is
 * the pair of facts that are about the *act* of generating a bundle rather
 * than about what is in one.
 *
 * What the eight rows said, kept because a deleted list cannot be checked
 * against the one that replaced it: *Instance version, schema version,
 * reference-content versions* (2 KB) · *Service health and last 200 scheduler
 * ticks* (48 KB) · *Application logs, last 24 hours* (3.1 MB) · *Slow-query
 * log and query plans* (410 KB) · *Migration history and schema DDL* (96 KB) ·
 * *Row counts per table* (4 KB) · *Result values, coordinates or certificates*
 * (excluded) · *Backup contents* (excluded).
 */
export const BUNDLE = {
  generated: 'not yet — nothing is written until you generate it',
  initiator: 'You. Strataflow cannot generate this remotely and has no path into this instance.',
};

/**
 * The analyte suites this project selects by name, and their sizes.
 *
 * Wave 18. Each count below was typed twice — once in the results grid's suite
 * selector and once inside a saved view's `analytes` string, in the same words
 * (`Dissolved metals (8)` on both). Two records agreeing independently is what
 * made the grid's number *evidence* when the drawn view disagreed with it
 * (`SAVED_VIEWS` below), and it is also the one-source-read-twice shape this
 * file keeps collapsing. So the counts live here and both surfaces render them.
 *
 * **What the record holds is a suite's size, not its membership.** Nothing here
 * and nothing else in this seed says which eight analytes the dissolved-metals
 * suite contains. The 2026 Q2 grid draws five filtered metals, which is that
 * round's manifest rather than the project's suite; the two are not in conflict
 * and neither derives from the other. The size is stated because two records
 * state it. The membership is not invented because none does.
 *
 * The licence suite is the exception and it is derived rather than stated: the
 * criteria library already records how many analytes Table 4 governs, and it
 * records it per version — so this follows the set in force rather than the
 * number that was true when somebody typed it.
 */
export const ANALYTE_SUITES = [
  { code: 'metals-dissolved', label: 'Dissolved metals', n: 8 },
  { code: 'nutrients', label: 'Nutrients', n: 4 },
  { code: 'pfas', label: 'PFAS', n: 14 },
  { code: 'field-parameters', label: 'Field parameters', n: 5 },
  {
    code: 'licence-t4',
    label: 'Licence Table 4',
    get n() {
      return CRITERIA_LIBRARY.find((c) => c.set.endsWith('Table 4') && c.state === 'active').analytes;
    },
  },
];

/**
 * The saved views — **one record, read by three surfaces** (§6.1, EX-24).
 *
 * ## The defect, and how it was found
 *
 * Four assessments were run against the vendor requirements brief on
 * 3 September 2026, and one of them turned up a defect that had nothing to do
 * with the brief: `#saved-views` held **four typed literal rows** in
 * `screens.mjs` while this file held a different four-row list for the same
 * objects, rendered on `#crosstab`. Only one name was common — *TSF
 * downgradient — metals* — and the two disagreed about what it selects, when it
 * last ran, and which figures it feeds. `#report-figures` was a third answer
 * again: two of its items name that view as their source, and neither of them
 * is among the three the drawn screen claimed. Three surfaces, three answers,
 * about the object the brief's §4.5 asks to be *governed*.
 *
 * ## What is settled by measurement, and what is not
 *
 * **The downstream is derived, not typed.** A view's `feeds` is the report items
 * whose `source` names it — a filter over `REPORT_ITEMS`, so the figure numbers
 * follow the numbering rather than restating it. The drawn screen's *Figures
 * 4.2, 4.6, 4.7* was wrong three ways at once, and the third is the one worth
 * keeping: **§4 carries six figures and there is no Figure 4.7 at all.**
 *
 * **The analyte count is corroborated.** The grid's own suite selector carries
 * `Dissolved metals (8)` and this record carried the same 8, independently. The
 * drawn screen's *6 metals* is the drift, and it is corrected to the number two
 * records state — which `ANALYTE_SUITES` above now holds once.
 *
 * **The period is not settled, and this record does not settle it.** The seed
 * said *Rolling 8 quarters*; the drawn screen said *rolling 3 years*. Those are
 * two years and three, and there is no third record of this view's period
 * anywhere. Measuring what *is* there does not choose between them — it
 * undercuts both: the two figures this view feeds draw 41 monthly water levels
 * and 14 quarterly arsenic values, spanning 2023-01 to 2026-05, which is longer
 * than either reading. So the disagreement is drawn as a disagreement, with both
 * readings, the record each came from, and the measurement that fits neither —
 * the shape wave 15 used for the PFAS three-way, and the trade waves 14, 15 and
 * 16 each refused: inventing a resolution the record does not support.
 *
 * ## One claim in the assessment that did not survive re-measurement
 *
 * The assessment recorded that the two records disagree *"about its owner"*.
 * They do not. The drawn row's third column is **Used by**, it read
 * `A. Nakamura`, and this record's `by` reads `A. Nakamura` — the one field of
 * the four that agreed. Three values moved on that row, not four, and saying so
 * is cheaper than leaving a fourth in a settlement note where a later reader
 * would look for it and find nothing.
 *
 * ## What a view selects, where the record can say it
 *
 * Two of the four views select exactly the members of a **location group** —
 * the glossary's named set of locations assessed together, which
 * `INSTRUMENTS.groups` already holds because FR-3.10 defines barometric
 * compensation per group. `MW05, MW07` and `MW09, MW11` were typed here and
 * named there, identically. They read from the group now, so a bore joining the
 * compliance boundary joins the view that reports it, and `matchesGroup` below
 * records that the two lists agreed before either moved.
 */
export const SAVED_VIEWS = (() => {
  const suiteOf = (code) => ANALYTE_SUITES.find((s) => s.code === code);
  const suiteText = (code, plus) => {
    const s = suiteOf(code);
    return `${s.label} (${s.n})${plus ? ` + ${plus}` : ''}`;
  };
  const groupOf = (name) => INSTRUMENTS.groups.find((g) => g.name === name);

  /**
   * Every value the three surfaces held before this wave, typed once.
   *
   * A before is a historical fact and it is written down exactly once; every
   * *now* beside it is counted off the record as it stands. The four rows are
   * the drawn screen's own table, verbatim, because a settlement about three
   * surfaces disagreeing is unreadable without the one that was wrong.
   */
  const was = {
    drawnRows: [
      { view: 'Compliance boundary — quarterly', selects: 'MW09, MW11 · licence suite · current quarter', usedBy: 'A. Nakamura', lastRun: '2026-05-21', feeds: 'Report §4, Figure 4.1' },
      { view: 'TSF downgradient — metals', selects: 'MW05, MW07 · 6 metals · rolling 3 years', usedBy: 'A. Nakamura', lastRun: '2026-05-21', feeds: 'Figures 4.2, 4.6, 4.7' },
      { view: 'Everything above a criterion', selects: 'All locations · all analytes · exceedance only', usedBy: 'R. Whitmore', lastRun: '2026-05-22', feeds: 'Exceedance register' },
      { view: 'PFAS watch', selects: 'All locations · PFOS, PFHxS, sum · all time', usedBy: 'D. Okafor', lastRun: '2026-05-22', feeds: 'Alert rule · TARP Level 3' },
    ],
    /* The one row both lists named, field by field. */
    tsf: { analytes: '6 metals', period: 'rolling 3 years', lastRun: '2026-05-21', usedBy: 'A. Nakamura', feeds: 'Figures 4.2, 4.6, 4.7' },
    /* The strings this file itself carried, before the suite and the group. */
    seedAnalytes: { 'licence-quarterly': 'Licence Table 4 suite (12)', 'pfas-everything': 'PFAS suite (14) + derived sum', 'quick-check': 'Arsenic, zinc, copper' },
    seedLocations: { 'licence-quarterly': 'MW09, MW11', 'tsf-metals': 'MW05, MW07' },
    namesInCommon: 1,
    drawnFigures: 3,
    /* The one chip the grid used to state its edits with. */
    crosstabChip: '1 — “added zinc”',
    /* ---------------------------------------------------------------- *
     * Wave 19's own befores. Each is a historical fact, typed once here.
     * ---------------------------------------------------------------- */
    /** The field that held the sharing class, under a name that promised an owner. */
    sharingField: 'owner',
    /** And the column head the results grid gave the same value. */
    crosstabSharingHead: 'Owner',
    /** How the one person's name was drawn, and what the record calls the field. */
    personAs: 'an attribution under the dataset’s name, unlabelled',
    personHeader: 'Used by',
    /** The purpose: in the record since wave 18, rendered on nothing. */
    purposeDrawn: 'in the record, on no face',
    /** What the figure register did with a citation once it resolved. */
    citationCheck: 'resolved, and never checked against the definition it names',
    /** What the definition was, as a reader met it. */
    definitionAs: 'four prose cells in one row',
    /** What the register offered about a dataset’s state. */
    lifecycleAs: 'a Project/Private tag, and nothing else',
  };

  /**
   * The four views.
   *
   * Order is load-bearing in one place and it is recorded where it is relied
   * on: `SAVED_VIEW_LIST[2].used` is one of the six literals the wave-13 note
   * lists as still sitting on the administration clock, so the third row stays
   * the third row.
   */
  const views = [
    {
      id: 'licence-quarterly',
      name: 'Compliance boundary — Table 4',
      sharing: 'Project', by: 'R. Whitmore', shared: true,
      group: 'Compliance boundary',
      get locations() { return groupOf(this.group).members.join(', '); },
      suite: 'licence-t4',
      get analytes() { return suiteText(this.suite); },
      period: 'Rolling 4 quarters',
      criteria: 'Licence Table 4 only',
      used: '2026-08-19',
      purpose: 'The licence numbers, at the two bores condition 12 is assessed at. Run before every quarterly return.',
    },
    {
      id: 'tsf-metals',
      name: 'TSF downgradient — metals',
      sharing: 'Project', by: 'A. Nakamura', shared: true,
      group: 'TSF downgradient compliance',
      get locations() { return groupOf(this.group).members.join(', '); },
      suite: 'metals-dissolved',
      get analytes() { return suiteText(this.suite); },
      /* Null is the whole finding, not a missing value: two records disagree
       * about this one field and nothing in the record chooses. Every surface
       * that renders it renders the disagreement. */
      period: null,
      criteria: 'ANZG 95% + site-specific',
      used: '2026-08-22',
      purpose: 'The seepage question: the dissolved metals at the two bores downgradient of the tailings storage facility.',
    },
    {
      id: 'pfas-everything',
      name: 'PFAS — everything',
      sharing: 'Project', by: 'A. Nakamura', shared: true,
      group: null,
      /* No group holds this set, so the dimension resolves through the
       * location register's own class instead — and `locations` stays the
       * sentence it always was rather than becoming a list of seven codes. */
      klass: 'groundwater',
      locations: 'All groundwater',
      suite: 'pfas',
      /* The `+ derived sum` in the analyte string is a row on the grid, and
       * which row is counted rather than named here: it is the only one whose
       * cells carry `derived`. */
      includesDerived: true,
      get analytes() { return suiteText(this.suite, 'derived sum'); },
      period: 'All time',
      criteria: 'ANZG 95%',
      used: '2026-08-23',
      purpose: 'Everything ever measured, because the PFAS question is whether a plume is arriving rather than what this quarter did.',
    },
    {
      id: 'quick-check',
      name: 'My quick check',
      sharing: 'Private', by: 'A. Nakamura', shared: false,
      group: null,
      locations: 'MW05',
      analyteNames: ['Arsenic (filtered)', 'Zinc (filtered)', 'Copper (filtered)'],
      get analytes() { return this.analyteNames.join(', '); },
      period: 'Rolling 4 quarters',
      criteria: 'ANZG 95%',
      used: '2026-08-23',
      purpose: 'One bore, three metals, no ceremony. Private, and the only one of the four that is.',
    },
  ];

  /**
   * The downstream, computed.
   *
   * A report item names its source in the caption a reader sees, so the string
   * stays what it is; what changes is that it now *resolves*. A source of the
   * form `Saved view · <name>` is matched against the record, and a source that
   * matches nothing is drawn as an orphan rather than dropped — a citation
   * pointing at a view that does not exist is the defect this settlement is
   * about, arriving from the other end.
   */
  const PREFIX = 'Saved view · ';
  const cited = (source) => (source.startsWith(PREFIX) ? source.slice(PREFIX.length) : null);
  const viewFor = (source) => {
    const name = cited(source);
    return name ? views.find((v) => v.name.startsWith(name)) ?? null : null;
  };
  const feedsOf = (view) => REPORT_ITEMS.items.filter((it) => viewFor(it.source) === view);
  for (const v of views) Object.defineProperty(v, 'feeds', { get() { return feedsOf(this); }, enumerable: true });

  const of = (id) => views.find((v) => v.id === id);
  const tsf = of('tsf-metals');

  /**
   * The period, unsettled — both readings, and the measurement that fits neither.
   *
   * Two records, two answers, no third. What follows the readings is not a
   * tie-break: it is the only other thing in the record that bears on the
   * question, and it is *longer than both*, so it rules neither in.
   */
  const period = {
    question: 'Over what period does this view select?',
    unsettled: true,
    readings: [
      { says: 'Rolling 8 quarters', quarters: 8, record: 'The seed’s own view list, since it was written', at: 'crosstab', restsOn: 'The record the results grid has always rendered — two years of quarterly rounds.' },
      { says: 'Rolling 3 years', quarters: 12, record: 'The four literal rows drawn on the saved-views screen', at: 'saved-views', restsOn: 'A typed table in the screen module, whose three other rows name views this record does not hold at all.' },
    ],
    /* The third measurement — computed, and it is not a tie-break. */
    get evidence() {
      const q = ARSENIC_MW05.length;
      return {
        figures: tsf.feeds.map((f) => f.n).join(' and '),
        months: WATER_LEVELS.months.length,
        from: WATER_LEVELS.months[0],
        to: WATER_LEVELS.months.at(-1),
        quarters: q,
        longerThan: period.readings.filter((r) => r.quarters < q).length,
      };
    },
    get consequence() {
      return `${this.readings.map((r) => r.quarters).join(' quarters against ')} are different populations, and this view feeds a figure in a report that has been issued. ` +
        'Choosing one here would put a number in the record that nothing in the record supports — the trade this catalogue has refused four times, over the licence trigger line, the PFAS reach, the custody chain and the soil limit.';
    },
    settledBy:
      'One record of this view being run: a saved definition carrying its own period, or a figure whose population states the window it was drawn over. That is a field on an object the product does not have yet, so the honest place for this to close is the wave that builds one.',
  };

  /**
   * The grid's own state against the view it says it is on.
   *
   * `#crosstab` names this view in its filter bar and marks itself *edited*.
   * What it did not say is *how* edited: the bar's four selections are compared
   * with the view's own here, so the chips state the differences rather than
   * asserting one. The period row is why this matters — the grid is on a single
   * quarter, which is an edit, and therefore no evidence about the
   * disagreement above.
   */
  const onCrosstab = {
    get view() { return tsf; },
    /* `grid: null` on the locations row is filled by `#crosstab` as it renders:
     * that option is counted off the location register there, and counting it
     * a second time here is the defect this whole record is about.
     *
     * Wave 19: the *view* side of each row is no longer restated here either.
     * `dimensionsOf` below is the one place a dataset's dimension is composed,
     * and this bar compares the grid's selections against it — so a definition
     * the register draws and a definition the grid compares itself with cannot
     * become two descriptions of one thing. The four labels and the four grid
     * selections are unchanged. */
    grid: { Locations: null, 'Analyte suite': 'Everything in the round', Period: '2026 Q2', 'Criteria sets': 'Both sets' },
    get dimensions() {
      return dimensionsOf(tsf).map((d) => ({ dimension: d.dimension, grid: this.grid[d.dimension], view: d.value }));
    },
    against(locationsOnGrid) {
      return this.dimensions.map((d) => ({ dimension: d.dimension, grid: d.grid ?? locationsOnGrid, view: d.view }));
    },
    differing(locationsOnGrid) {
      return this.against(locationsOnGrid).filter((d) => d.grid !== d.view);
    },
    note:
      'The working population is this dataset with unsaved changes. A dataset is a shared object, so an edit nobody saved is one person’s question rather than the project’s — which is the whole reason a population names the dataset it started from. Until wave 20 that naming was done by the results grid’s own filter bar; D11 moved the bar to the explorer and the sentence is unchanged in substance.',
  };

  /**
   * The three figure numbers the drawn screen claimed, checked one by one.
   *
   * Not "the list was wrong" but *which* of the three were, and how. A number
   * this document does not carry at all is a different defect from a number it
   * carries against a figure this view does not feed, and the second is the
   * one a reader would never catch by proofreading.
   */
  const phantom = () => {
    const claimed = (was.tsf.feeds.match(/\d+\.\d+/g) ?? []).map((n) => `Figure ${n}`);
    const exists = REPORT_ITEMS.items.map((it) => it.n);
    const fed = tsf.feeds.map((f) => f.n);
    return {
      claimed,
      absent: claimed.filter((n) => !exists.includes(n)),
      elsewhere: claimed.filter((n) => exists.includes(n) && !fed.includes(n)),
      right: claimed.filter((n) => fed.includes(n)),
      missed: fed.filter((n) => !claimed.includes(n)),
      inSection: REPORT_ITEMS.items.filter((it) => it.kind === 'Figure' && it.section === '4').length,
      section: '4',
    };
  };

  /* ================================================================ *
   * Wave 19 — the same record, promoted to the object §4.5 asks for
   *
   * D1 accepted the query capability on 3 September 2026 and the PRD
   * amendment that carries it, so this stops being a remembered column set
   * and becomes a **population that can be named, versioned, owned, carried
   * between workspaces and cited years later at the version used**. Seven
   * requirements across the vendor brief — §4.3, §4.4, §4.5, §5.6, §6.4, §9.5
   * and §12.2 — are each asking for this one object from a different
   * direction, which is why it is built here rather than beside here.
   *
   * **Nothing new is declared next to this record.** The four datasets gain
   * the fields the requirement names, and every one of them is either read
   * off a record that already exists or drawn as a gap with what would close
   * it. The export keeps its wave-18 name so that settlement stays greppable:
   * the object is a *dataset*, the export is `SAVED_VIEWS`, and the screen id
   * is still `saved-views` because a route is not a noun.
   *
   * **On the word.** `docs/GLOSSARY.md` carries neither *saved view* nor
   * *dataset* as a term. The brief's §4.5 heading is "Saved queries and
   * governed datasets" and `docs/PRD.md` uses *dataset* in prose four times,
   * so the word is the requirement's and the product's rather than this
   * catalogue's invention — and the glossary entry is part of the amendment
   * D1 accepted, which has not landed. Stated on the screen, not assumed.
   * ================================================================ */

  /** The analyte rows this catalogue holds a derived total for — counted, not named. */
  const derivedRows = () => CROSSTAB.filter((r) => r.cells.some((c) => c.derived)).map((r) => r.analyte);

  /** The locations a dataset selects, resolved through the record that holds them. */
  const locationCodes = (v) =>
    v.group ? groupOf(v.group).members
      : v.klass ? LOCATIONS.filter((l) => l.klass === v.klass).map((l) => l.code)
        : v.locations.split(', ');

  /** The analyte rows it selects that this catalogue can actually resolve to a row. */
  const analyteRows = (v) =>
    [...(v.analyteNames ?? []), ...(v.includesDerived ? derivedRows() : [])]
      .filter((name) => CROSSTAB.some((r) => r.analyte === name));

  /**
   * A suite whose size follows another record rather than sitting still.
   *
   * Detected rather than listed: `ANALYTE_SUITES` holds the licence suite's
   * size as a getter onto the criteria set in force, and the other four as
   * numbers. So the question "does this dimension move when nobody edits the
   * dataset" is answered by the shape of the record, which is the only place
   * the answer is actually kept.
   */
  const suiteFollows = (code) => typeof Object.getOwnPropertyDescriptor(suiteOf(code), 'n')?.get === 'function';

  /**
   * The definition, as four inspectable dimensions rather than four prose cells.
   *
   * The same four the grid's filter bar carries, in the same order, because
   * `onCrosstab` compares them one against the other and a fifth here would be
   * a comparison with nothing on the other side. `through` is the record the
   * dimension resolves against and `resolves` says whether this catalogue can
   * turn it into rows — which is the honest half: **a suite is a size here and
   * never a membership**, so a dataset that names one has an analyte dimension
   * nothing can expand, and the population readout says so rather than
   * guessing eight analytes out of eleven.
   */
  const dimensionsOf = (v) => [
    {
      dimension: 'Locations', value: v.locations, resolves: true,
      through: v.group ? `location group · ${v.group}`
        : v.klass ? `location register · every location of class ${v.klass}`
          : 'named on the dataset itself',
      live: Boolean(v.group || v.klass), at: v.group ? 'locations' : 'locations',
    },
    {
      dimension: 'Analyte suite', value: v.analytes, resolves: analyteRows(v).length > 0,
      through: v.suite ? `analyte suite · ${suiteOf(v.suite).label} — the record holds its size, never its membership`
        : 'named on the dataset itself, analyte by analyte',
      live: Boolean(v.suite), at: 'dictionary',
    },
    {
      dimension: 'Period', value: v.period ?? 'unsettled — two readings', resolves: v.period !== null,
      through: v.period ? 'named on the dataset itself' : 'two records answer and nothing holds a third',
      live: false, at: v.period ? 'programme' : 'saved-views',
    },
    {
      dimension: 'Criteria sets', value: v.criteria, resolves: true,
      through: 'named on the dataset itself', live: false, at: 'criteria',
    },
  ];

  /**
   * The population, resolved against the grid the dataset selects from — and
   * **what it excludes, counted per kind**.
   *
   * This is the trap this catalogue is uniquely exposed to. The grid's most
   * careful work is that *dry*, *not analysed*, *composited* and *not
   * evaluated* are four different absences and none of them is a pass. A
   * population that filtered to "validated results only" and quietly dropped
   * those cells would destroy the distinction the whole grammar rests on. So
   * the readout counts them by kind, off the same cells `#crosstab` draws, and
   * the two cannot disagree because there is one array.
   *
   * `dryColumns` is counted at the location axis rather than the cell axis on
   * purpose: a dataset whose analyte dimension names a suite resolves to no
   * rows at all, and *one of the two bores I select returned nothing* is still
   * true and still worth saying when the cells cannot be counted.
   */
  /**
   * The accounting itself, over any array of cells — **wave 20**.
   *
   * Wave 19 counted the absences inside `populationOf`, which was right while
   * a population was always a dataset's. The explorer walks a population that
   * narrows step by step and is not any dataset's, and it has to report the
   * same four kinds at every step. Two implementations of *what left and why*
   * is exactly the disagreement this record exists to end, so there is one
   * expression and both callers pass their own cells to it.
   *
   * **The kinds are read off the cells rather than listed here.** `byKind`
   * derives its words from the cells it was given, so a grid that gains a
   * fifth absence appears in the readout without anybody adding it to a list —
   * and a step that drops a kind entirely reports it as absent from its scope
   * rather than silently stopping counting it.
   */
  const accounting = (cells) => {
    const included = cells.filter((x) => !x.cell.empty);
    const absent = cells.filter((x) => x.cell.empty);
    const allNot = (x) => x.cell.o.every((o) => o === 'not_evaluated');
    return {
      cells,
      included,
      excluded: absent,
      byKind: [...new Set(absent.map((x) => x.cell.word))].map((word) => ({
        word,
        glyph: absent.find((x) => x.cell.word === word).cell.glyph,
        list: absent.filter((x) => x.cell.word === word),
      })),
      nothingAsserted: included.filter(allNot),
      partlyAsserted: included.filter((x) => x.cell.o.some((o) => o === 'not_evaluated') && !allNot(x)),
    };
  };

  const populationOf = (v) => {
    const codes = locationCodes(v);
    const columns = codes.filter((c) => CROSSTAB_COLUMNS.includes(c));
    const rows = analyteRows(v);
    const cells = rows.flatMap((name) => {
      const row = CROSSTAB.find((r) => r.analyte === name);
      return columns.map((code) => ({ analyte: name, location: code, cell: row.cells[CROSSTAB_COLUMNS.indexOf(code)] }));
    });
    const acc = accounting(cells);
    const kind = (word) => acc.byKind.find((k) => k.word === word)?.list ?? [];
    return {
      locations: codes,
      columns,
      offGrid: codes.filter((c) => !CROSSTAB_COLUMNS.includes(c)),
      dryColumns: columns.filter((c) => CROSSTAB_SHAPE.isEmpty(c)),
      rows,
      byName: v.analyteNames?.length ?? 0,
      bySuite: v.suite ? suiteOf(v.suite).n : 0,
      resolves: rows.length > 0,
      ...acc,
      dry: kind('dry'),
      notAnalysed: kind('not analysed'),
    };
  };

  /**
   * The four absences, catalogue-wide, and the one thing that is **not** one.
   *
   * Each kind renders from a cell that actually holds it, so the glyph, the
   * word and the sentence a screen reader gets are the ones the grid already
   * draws rather than a second description of them. The fourth kind has no
   * empty cell — a result exists and nothing was asserted about it — so it
   * carries its outcome key and the screen renders the dashed mark and
   * `OUTCOME_TEXT` for it, from `ui.mjs`, where that vocabulary lives.
   */
  const absences = () => {
    const water = CROSSTAB.flatMap((r) => r.cells);
    const soil = SOIL.grid.flatMap((r) => r.cells);
    const emptyOf = (cells, word) => cells.filter((c) => c.empty && c.word === word);
    const results = (cells) => cells.filter((c) => !c.empty);
    const nothing = (cells) => results(cells).filter((c) => c.o.every((o) => o === 'not_evaluated'));
    const partly = (cells) => results(cells).filter((c) => c.o.some((o) => o === 'not_evaluated')).length - nothing(cells).length;
    const dry = emptyOf(water, 'dry');
    const notAnalysed = emptyOf(water, 'not analysed');
    const composited = emptyOf(soil, 'composited');
    const unassessed = [...nothing(water), ...nothing(soil)];
    return [
      {
        key: 'dry', absenceOf: 'material', n: dry.length, sample: dry[0], at: 'crosstab',
        where: `the ${CROSSTAB_SHAPE.emptyColumns.join(', ')} column, on the ${ROUND.code} water grid`,
        says: 'The bore was reached and dipped and held no water, so no sample exists and nothing could have been measured. The round is satisfied as attempted.',
        ifDropped: 'The column disappears, and a reader compares this quarter with last across a narrower grid than the programme asked for.',
      },
      {
        key: 'not analysed', absenceOf: 'analysis', n: notAnalysed.length, sample: notAnalysed[0], at: 'batches',
        where: `${PFAS_REACH.analyte} at ${PFAS_REACH.withdrawnLocations.join(', ')} — sampled, sealed, reconciled, never run`,
        says: 'The sample exists and this suite was never run on it. A censored value here would assert that a laboratory reported a non-detect, and none did.',
        ifDropped: 'The suite reads as though it reached the whole network, which is the claim wave 15 withdrew five cells to stop making.',
      },
      {
        key: 'composited', absenceOf: 'a result of its own', n: composited.length, sample: composited[0], at: 'composite',
        where: `${SOIL.gridShape.emptyColumns.length} increment columns on the soil grid`,
        says: 'The material was combined into a composite before analysis, so no number was ever produced for this position — and it is retained, so it can still be bought rather than derived.',
        ifDropped: 'The increments stop existing, and the composite reads as a sample from one place rather than a combination of four.',
      },
      {
        key: 'not evaluated', absenceOf: 'an assessment', n: unassessed.length, outcome: 'not_evaluated', at: 'criteria',
        where: `${nothing(soil).length} soil and sediment results no set in the library carries a matrix for, and ${nothing(water).length} water results that are an input to a criterion rather than a subject of one`,
        says: 'A result exists and no criterion was selectable for it, so nothing is asserted about the number in either direction. A further ' +
          `${partly(water)} water results are assessed against one set and not the other, and stay inside with one mark each.`,
        ifDropped: 'Not evaluated becomes compliant, which is the single substitution this catalogue exists to refuse.',
      },
    ];
  };

  /**
   * The kind that is **inside**, decided rather than measured (D10).
   *
   * Nine zinc results carry a proposed and unapplied `L`; the register holds a
   * second proposal beside it. Jerry's verdict on 3 September 2026 is that a
   * proposed-but-unapplied qualifier is *inside* the population and the plate
   * says so — excluding them would be the product taking a decision the
   * practitioner has not.
   *
   * The count is the register's and not the grid's, and that difference is
   * stated rather than smoothed: `QUALIFIERS` counts results in an analytical
   * batch and the grid counts cells in a round, so the ten below are not ten
   * of the sixty-one. Reporting them as if they were would be the same
   * conflation the matrix filter was fixed to stop making.
   */
  const insideAnyway = () => ({
    decision: 'D10',
    verdict: 'A proposed-but-unapplied qualifier is inside the population, and the plate says so.',
    assertions: QUALIFIERS.proposed.length,
    results: QUALIFIERS.counts.proposedResults,
    codes: QUALIFIERS.proposed.map((r) => `${r.code} — ${r.finding.check.toLowerCase()}, ${r.results} result${r.results === 1 ? '' : 's'}`),
    counted: 'results in an analytical batch, which is not the same population as cells in a round',
    says:
      'The qualifier is proposed and the basis has not been chosen, so nothing has been written. A population that dropped these would be asserting the decision; one that included them silently would be hiding it. They are in, and every surface that draws the population says which of its members are in this state.',
  });

  /* ---------------------------------------------------------------- *
   * Versions, and the acts that would make one
   * ---------------------------------------------------------------- */

  /**
   * Every act recorded against a dataset in this instance — **none**.
   *
   * Two kinds of act would make a version: a definition change committed to
   * the dataset, and a supersession. A third, an approval, moves the lifecycle
   * without moving the definition. The record holds none of the three for any
   * of the four datasets, which is why every one of them reads v1 and reads
   * *draft*: both are counted off this list rather than defaulted. A dataset
   * numbered v3 in a catalogue holding no record of two changes would be a
   * version typed to look governed, which is the trade this file has refused
   * five times.
   */
  const acts = [];
  const actsFor = (v) => acts.filter((a) => a.dataset === v.id);
  const versionOf = (v) => actsFor(v).filter((a) => a.makesVersion).length + 1;
  const approvalsOf = (v) => actsFor(v).filter((a) => a.kind === 'approved');
  const supersessionOf = (v) => actsFor(v).find((a) => a.kind === 'superseded') ?? null;
  const lifecycleOf = (v) => (supersessionOf(v) ? 'superseded' : approvalsOf(v).length ? 'approved' : 'draft');

  /**
   * The brief lists four states on one line and they are **two axes**.
   *
   * *Draft*, *approved* and *superseded* are a lifecycle: a dataset occupies
   * exactly one of them and moves between them by an act. *Shared* is a
   * visibility: an approved dataset is surely also shared, and drawing the
   * four as one strip would make those two mutually exclusive. So the axes are
   * drawn apart and each dataset carries a position on both — the same
   * discipline `#crosstab` applies to the two roads that reach *not
   * evaluated*, one requirement over.
   */
  const AXES = {
    lifecycle: {
      axis: 'Lifecycle', of: 'the definition',
      states: ['draft', 'approved', 'superseded'],
      get says() {
        return `One of three, moved between by an act that is recorded. Nothing here has been approved and nothing superseded, so all ${views.length} read draft — derived from the absence of an approval act, in the same shape the report template models a version that exists and is not effective.`;
      },
    },
    visibility: {
      axis: 'Visibility', of: 'who can read it',
      states: ['private', 'shared with the project'],
      says: 'A different question from the lifecycle, and the one the record actually holds. A view that lives on one machine puts two people asking for the compliance boundary numbers back on two questions, which is the disagreement the product exists to end.',
    },
  };

  /**
   * Creator and current owner — **the refusal, and it is this wave's**.
   *
   * §4.5 asks the dataset to identify its creator *and* its current owner, and
   * this record names **one person** per dataset. The only header that field
   * ever carried is `Used by`, on the four rows `#saved-views` withdrew in
   * wave 18 and keeps drawn as the before they are; wave 18's own settlement
   * table names that row *used by* as well. So the strongest reading of the
   * record is *who last ran it*, paired with the date beside it — and neither
   * a creator nor an owner is recorded anywhere for any of the four.
   *
   * Filling both from that one name would answer §4.5 for free by assuming
   * the thing it asks to be shown. Both fields are drawn and neither is
   * filled, in the shape wave 15's PFAS three-way and wave 18's period
   * disagreement each settled into.
   */
  const roles = {
    question: 'Who created this dataset, and who owns it now?',
    unsettled: true,
    holds: 'One person per dataset, in one capacity.',
    capacity: 'ran it',
    evidence: `The one header the record ever gave the field is “${was.personHeader}”, on the four rows this screen withdrew — and wave 18’s settlement names that row “used by” as well. It is paired with a date, which is what a last-run field looks like.`,
    drawnAs: was.personAs,
    consequence:
      'A creator is who to ask what a dataset was for; a current owner is who may change it and who answers for what it feeds. Naming one person as both would put an accountability in the record that nobody wrote down — and the two figures this catalogue’s most-cited dataset feeds are in a report.',
    settledBy:
      'Two writes the product would make and this instance has not: an attribution on the act that created the dataset, which the audit trigger would record without anybody choosing to, and an ownership transfer record — the same shape a sign-off already has, because “who answers for this now” is the question a capacity answers.',
  };

  /* ---------------------------------------------------------------- *
   * Citations — a figure cites a dataset at a version, and it is checked
   * ---------------------------------------------------------------- */

  /**
   * One citation, with the two questions nobody had asked of it.
   *
   * Wave 18 made a citation *resolve* — the source string stopped being text
   * and became the record it names. What it did not do is check whether the
   * definition it resolves to describes the figure that cites it, and the
   * first time this is measured, half of them do not.
   *
   * Both checks are derived off the item's own title against registers this
   * file already holds: the location codes it names, against the codes the
   * dataset selects; and whether the subject is an analyte in the dictionary
   * at all. Nothing is typed and nothing is judged.
   *
   * **The binding is derived, and the derivation names its own limit.** With
   * exactly one version recorded there is no other version a citation could
   * have been bound to, so `bound` follows `versionOf`. The moment a dataset
   * gains a second, that stops being derivable and the binding becomes a fact
   * the citation itself has to carry — which is the field §4.5's last sentence
   * is asking for and the field this instance does not yet need.
   */
  const citationsOf = (v) => {
    const selects = locationCodes(v);
    const version = versionOf(v);
    return v.feeds.map((item) => {
      const names = LOCATIONS.filter((l) => item.title.includes(l.code)).map((l) => l.code);
      const outside = names.filter((c) => !selects.includes(c));
      const analytes = ANALYTES.filter((a) => item.title.includes(a.name.split(' (')[0])).map((a) => a.name);
      return {
        item, dataset: v,
        bound: version === 1 ? 1 : null,
        current: version,
        boundDerived: version === 1,
        staleByDefinition: version !== 1,
        staleByEvidence: item.state !== 'current',
        names, outside, analytes,
        /*
         * W19-A-1. `agrees` folded two grounds into one, so a plate that draws
         * water levels — which names no analyte by nature — could never agree
         * however its locations read. Correcting the drawn defect would not
         * have cleared it, which is a check that cannot be satisfied rather
         * than one that is failing. The location test is the disagreement; the
         * analyte test is a question this item kind cannot be asked, and it is
         * reported as unanswerable rather than as a fault.
         */
        agrees: outside.length === 0,
        analyteCheckable: analytes.length > 0,
      };
    });
  };

  const allCitations = () => views.flatMap(citationsOf);

  /**
   * Which populations one value is a member of — the lineage hop, from the
   * result's end.
   *
   * §15's chain runs *Validated Result → Query → Analysis → Figure* and must be
   * traversable **in both directions**. The forward direction is what a
   * dataset's own population readout answers; this is the other one, and it
   * has three answers rather than two. A dataset that selects the bore and
   * names the analyte contains it; one that does not select the bore does not;
   * and one that selects the bore and names a *suite* cannot be resolved at
   * all, because the record holds a suite's size and never its membership.
   * The third answer is the honest one and it is the reason this is computed
   * rather than listed.
   */
  const membershipOf = ({ location, analyte }) => views.map((v) => {
    const codes = locationCodes(v);
    const rows = analyteRows(v);
    if (!codes.includes(location)) {
      return { view: v, verdict: 'out', why: `Its location dimension does not select ${location} — it selects ${codes.join(', ')}.` };
    }
    if (rows.includes(analyte)) {
      return { view: v, verdict: 'in', why: `${location} is in ${v.group ? `the ${v.group} group` : 'the locations it selects'}, and ${analyte} is a row it names.` };
    }
    if (v.suite && rows.length === 0) {
      return {
        view: v, verdict: 'unresolved',
        why: `It selects ${location}, and its analyte dimension names ${suiteOf(v.suite).label} by size — ${suiteOf(v.suite).n} analytes, membership unrecorded. Whether ${analyte} is inside cannot be resolved, and guessing which of the ${suiteOf(v.suite).n} they are would be inventing a population.`,
      };
    }
    return { view: v, verdict: 'out', why: `It selects ${location} and names ${rows.length} analyte${rows.length === 1 ? '' : 's'} by name, and ${analyte} is not among them.` };
  });

  /* ---------------------------------------------------------------- *
   * The seam: what is live, what a citation freezes, and the act between
   * ---------------------------------------------------------------- */

  /**
   * A live definition and a frozen citation are opposite things, and both
   * failure modes are already named by this catalogue's own arguments.
   *
   * Build the population as session state and two people asking for the
   * compliance boundary numbers get two questions — the disagreement
   * `#saved-views` says the product exists to end. Build it as a snapshot and
   * it diverges silently, and a stale figure becomes undetectable — which is
   * exactly what `#report-figures` catches today for certificates and would
   * lose for populations.
   *
   * So the seam is drawn rather than chosen. A dataset **being refined** is
   * live: its dimensions resolve through the records that own them, and a bore
   * joining a location group joins the dataset that reports it without anybody
   * editing the dataset. A dataset **a figure cites** is frozen at a version.
   * The transition is an act with a record — not a save button — and the act
   * is what creates the next version.
   *
   * `live` is counted rather than asserted: a dimension is live when it
   * resolves through another record, which `dimensionsOf` already knows,
   * and one of them is live twice over — the licence dataset's analyte count
   * follows the criteria set in force, so a licence variation moves that
   * dataset's definition with nobody touching either.
   */
  const seam = () => {
    const v = tsf;
    const version = versionOf(v);
    const cites = citationsOf(v);
    /* All four, and the locations row differs because the grid is on the whole
     * network and this dataset names two bores — which is why passing `null`
     * for the grid's location label is safe here and would not be on a face. */
    const differing = onCrosstab.differing(null);
    const liveDims = views.flatMap((x) => dimensionsOf(x).filter((d) => d.live).map((d) => ({ dataset: x.name, ...d })));
    const twoHop = views.filter((x) => x.suite && suiteFollows(x.suite));
    return {
      version,
      live: liveDims,
      twoHop: twoHop.map((x) => ({
        dataset: x.name, suite: suiteOf(x.suite).label, n: suiteOf(x.suite).n,
        follows: CRITERIA_LIBRARY.find((c) => c.set.endsWith('Table 4') && c.state === 'active').set,
        at: CRITERIA_LIBRARY.find((c) => c.set.endsWith('Table 4') && c.state === 'active').version,
      })),
      frozen: [
        { what: 'The dimensions, as they resolved', why: 'A version that stored a pointer to a group would go on moving after the citation, and “the exact query definition” would name a thing that had changed.' },
        { what: 'The criteria sets in force at the version', why: 'The same rule an outcome already follows: frozen at evaluation, and a licence varied next year moves nothing already decided.' },
        { what: 'Nothing about the results themselves', why: 'A dataset is a question. What the answer was on the day is the snapshot’s job, and a report already has one.' },
      ],
      /* Counted over every citation in the instance rather than this
       * dataset's, so the channel means what it says on both faces that
       * render it — and today the two sets happen to be the same. */
      channels: [
        {
          channel: 'by definition', n: allCitations().filter((c) => c.staleByDefinition).length,
          what: 'The dataset moved to a later version and this citation names an earlier one.',
          newIn: 'wave 19',
          /* W19-A-3: said on the face rather than only in a comment. */
          unexercised: 'Every dataset here is at v1, so this limb has never fired. It is argued, not demonstrated — and it cannot be demonstrated without a version history no recorded act supports.',
        },
        {
          channel: 'by evidence', n: allCitations().filter((c) => c.staleByEvidence).length,
          what: 'The definition is unchanged and the data under it moved — a certificate amended, a result superseded.',
          newIn: 'already drawn, for certificates',
        },
      ],
      /** What saving the grid's edits into this dataset would cost, before anybody does it. */
      radius: [
        { what: 'Dimensions that would change', n: `${differing.length} — ${differing.map((d) => d.dimension.toLowerCase()).join(', ')}` },
        { what: 'The dataset’s version', n: `v${version} → v${version + 1}` },
        { what: 'Citations bound to the version before it', n: `${cites.length} — ${cites.map((c) => c.item.n).join(', ')}` },
        { what: 'Figures regenerated', n: '0 — a citation goes stale rather than being redrawn under an author' },
        { what: 'Issued documents affected', n: '0 — a snapshot holds the definition it was issued under, as it holds every other input' },
        { what: 'Other datasets reached', n: `0 of ${views.length - 1} — a version is a fact about one dataset` },
      ],
      /* The register's stale items that resolve to no dataset at all — the
       * reason both channels can read zero while the register shows two. */
      staleItems: REPORT_ITEMS.items.filter((it) => it.state !== 'current'),
      staleNotCiting: REPORT_ITEMS.items.filter((it) => it.state !== 'current' && !allCitations().some((c) => c.item === it)),
      reader:
        'The plate itself does not move. It keeps drawing the population of the version it names, because a figure that changes underneath a paragraph somebody has already written is how a report comes to contradict itself. What changes is the register beside it: the item reads stale, the reason names the version rather than the certificate, and the difference between the two versions is a link rather than a claim.',
      act: {
        into: {
          label: 'Save into this dataset',
          makes: `v${version + 1}`,
          costs: `${cites.length} citation${cites.length === 1 ? '' : 's'} go stale, named`,
          reversible: 'Reversible. A version is added rather than overwritten, so the citations bound to the earlier one keep resolving; discarding the new version restores the register without touching a figure.',
        },
        variant: {
          label: 'Save as a variant',
          makes: 'A new dataset, at v1, naming this one as its parent',
          costs: `0 — the original stays at v${version} and its ${cites.length} citations do not move`,
          reversible: 'Reversible, and it writes nothing to the original. A variant is the answer to “I want to ask this slightly differently” that does not make one person’s question the project’s.',
        },
      },
      /** The one thing the record does not settle, and it is the seam itself. */
      unrecorded: {
        question: 'Was v1’s membership frozen when the figure cited it, or is it still resolving live?',
        why: 'No dataset here has been cited and then changed, so no version has ever had to freeze. Both readings are consistent with the record and they differ in exactly the case below.',
        shownBy: 'The disagreement on Figure 4.1, which is the first thing a version would have settled.',
      },
    };
  };

  /**
   * The citation check's finding, stated where it is measured.
   *
   * Half of the resolved citations disagree with the definition they name, and
   * the disagreement is on both axes at once: the item draws a bore the
   * dataset does not select, and its subject is not an analyte at all. Two
   * readings are consistent with the record and this file chooses neither.
   */
  const citationFinding = () => {
    const bad = allCitations().filter((c) => !c.agrees);
    const all = allCitations();
    return {
      checked: all.length,
      disagreeing: bad.length,
      /* The second axis, reported separately since W19-A-1: an item naming no
       * analyte is not a disagreement, it is a question this kind of plate
       * cannot be asked. */
      analyteUncheckable: all.filter((c) => !c.analyteCheckable).length,
      rows: bad.map((c) => ({
        item: c.item.n, title: c.item.title, dataset: c.dataset.name,
        outside: c.outside, selects: locationCodes(c.dataset),
        subject: c.analytes.length ? c.analytes.join(', ') : 'no analyte in the dictionary — the item draws water levels, so this axis cannot be checked and is not counted against it',
      })),
      readings: [
        {
          says: 'The citation is wider than the dataset',
          means: 'The figure was drawn over a population this dataset does not describe, and the source line names it anyway. The citation is the thing that is wrong.',
          consequence: 'Whoever regenerates the figure from the dataset gets a different plate from the one in the report, and nothing warns them.',
        },
        {
          says: 'The dataset has narrowed since the figure was made',
          means: 'The definition was wider when the figure was drawn and has since been edited down, and there is no version record to show it.',
          consequence: 'The figure is right, the dataset is right, and the pair is unreadable — which is precisely the state §4.5’s last sentence exists to prevent.',
        },
      ],
      settledBy:
        'A version that froze its resolved membership, and a citation carrying the version it was bound at. Neither exists here, and the second reading is only possible because they do not — which is the strongest argument this wave can make for building them.',
      refuses:
        'Correcting the figure’s title, or narrowing the dataset to fit it. Both would put a number in the record that nothing in the record supports, and one of the two would quietly rewrite what a report already says.',
    };
  };

  return {
    views, of, was, period, onCrosstab, viewFor,
    get phantom() { return phantom(); },
    /** Report items citing a saved view no record holds — zero, and checked. */
    get orphanCitations() { return REPORT_ITEMS.items.filter((it) => cited(it.source) && !viewFor(it.source)); },
    /** What each of the three surfaces said, and what it says now. */
    get readings() {
      return [
        {
          reading: 'The saved-views screen',
          at: 'saved-views',
          said: `${was.drawnRows.length} typed rows, ${was.namesInCommon} of which names a view this record holds`,
          restsOn: 'Four literals in the screen module. Nothing derived them and nothing checked them against the record the grid was already drawing.',
          now: `${views.length} views, read from the record`,
          verdict: 'corrected',
        },
        {
          reading: 'The results grid',
          at: 'crosstab',
          said: `${views.length} views, and a suite count the drawn screen contradicted`,
          restsOn: 'This record, rendered as a table, beside a suite selector that independently carried the same 8.',
          now: 'unchanged in substance — it was right',
          verdict: 'stands',
        },
        {
          reading: 'The figure register',
          at: 'report-figures',
          said: `${tsf.feeds.length} items sourced from “${PREFIX}TSF downgradient”, as text`,
          restsOn: 'A string in each item’s source field, matching no record and linking nowhere.',
          now: `${tsf.feeds.length} items, resolved against the record and linked`,
          verdict: 'stands, and now resolves',
        },
      ];
    },
    /** Every value this settlement moved, with what it was. */
    get moved() {
      return [
        { what: 'TSF downgradient · analytes', was: was.tsf.analytes, now: tsf.analytes, at: 'saved-views', why: 'The grid’s suite selector and the seed both said 8, independently. Six had no source.' },
        { what: 'TSF downgradient · period', was: was.tsf.period, now: 'unsettled — both readings drawn', at: 'saved-views', why: 'No third record. Stated as a disagreement rather than decided.' },
        { what: 'TSF downgradient · last run', was: was.tsf.lastRun, now: tsf.used, at: 'saved-views', why: 'The drawn date was three months behind the record, and nothing derived it.' },
        { what: 'TSF downgradient · feeds', was: was.tsf.feeds, now: tsf.feeds.map((f) => f.n).join(', '), at: 'report-figures', why: `Derived from the report items that name the view. Of the ${phantom().claimed.length} it claimed, ${phantom().right.length} was right, ${phantom().elsewhere.length} names a figure this view does not feed, and ${phantom().absent.length} does not exist.` },
        { what: 'TSF downgradient · used by', was: was.tsf.usedBy, now: tsf.by, at: 'saved-views', why: 'Unchanged — the assessment recorded an owner disagreement that re-measurement did not find.' },
        { what: 'Views the screen draws', was: `${was.drawnRows.length} typed rows`, now: `${views.length} from the record`, at: 'saved-views', why: 'Three of the four typed names existed on no other surface.' },
        { what: 'Compliance boundary · analytes', was: was.seedAnalytes['licence-quarterly'], now: of('licence-quarterly').analytes, at: 'crosstab', why: 'The count follows the licence set in force rather than the number that was true when it was typed.' },
        { what: 'PFAS — everything · analytes', was: was.seedAnalytes['pfas-everything'], now: of('pfas-everything').analytes, at: 'crosstab', why: 'One suite record, rendered the same way in the filter and in the view.' },
        { what: 'My quick check · analytes', was: was.seedAnalytes['quick-check'], now: of('quick-check').analytes, at: 'crosstab', why: 'The three analytes as the dictionary names them, fraction included — a metals view that does not say filtered is two questions.' },
        { what: 'Results grid · the edits its chips name', was: was.crosstabChip, now: `${onCrosstab.dimensions.length} dimensions compared, one chip per difference`, at: 'crosstab', why: 'The bar said “edited” and then named a single edit, while four of its own selections differed from the view it says it is on — and that edit matched nothing anywhere else in the catalogue.' },
        /* -------------------------------------------------------------- *
         * Wave 19. Five more, and none of them is a number that changed:
         * they are fields that meant something other than their name, a
         * record that reached no face, and a check nobody had run.
         * -------------------------------------------------------------- */
        { what: 'The field holding the sharing class', was: was.sharingField, now: 'sharing', at: 'saved-views', why: 'It never held an owner. Wave 18 measured that and wrote it in a note, and the field kept the name for a wave — with §4.5 asking for an owner by name, a field called `owner` that means something else is the next drift waiting to happen.' },
        { what: 'The results grid’s column head for that value', was: was.crosstabSharingHead, now: 'Visibility', at: 'crosstab', why: 'The same word on a face rather than in a field. It printed Project or Private under a head that said Owner, which is the reading §4.5 would otherwise have had answered for it.' },
        { what: 'What the one person’s name means', was: was.personAs, now: `who last ran it — the capacity the record’s own “${was.personHeader}” header gives it`, at: 'saved-views', why: 'Read as an attribution it answers §4.5’s creator-and-owner ask for free, by assuming the thing the requirement asks to be shown. The header is the only evidence and it says something else.' },
        { what: 'The stated purpose', was: was.purposeDrawn, now: `rendered on ${views.length} of ${views.length}`, at: 'saved-views', why: 'It has been in this record since wave 18 and no surface drew it, which is the quieter half of the same defect: a field nobody reads cannot be checked against anything.' },
        { what: 'The definition, as a reader meets it', was: was.definitionAs, now: `${onCrosstab.dimensions.length} dimensions, each with the record it resolves through`, at: 'saved-views', why: '§4.5 asks for the filtering logic to be inspectable. Prose in a cell is legible and not inspectable, and it cannot say that a suite is a size here and never a membership.' },
        { what: 'A resolved citation, checked against the definition it names', was: was.citationCheck, now: `${citationFinding().disagreeing} of ${citationFinding().checked} disagree`, at: 'report-figures', why: 'Wave 18 made a citation resolve and nothing compared the two ends of it. The first measurement finds a figure drawing a bore its dataset does not select, and the disagreement is drawn rather than resolved.' },
      ];
    },
    /** The two location lists, checked against the groups rather than assumed. */
    get matchesGroup() {
      return views.filter((v) => v.group).map((v) => ({
        view: v.name, group: v.group, members: v.locations,
        was: was.seedLocations[v.id], agreed: v.locations === was.seedLocations[v.id],
      }));
    },
    /* ---------------------------------------------------------------- *
     * Wave 19's surface, one accessor per question the object answers.
     * ---------------------------------------------------------------- */
    dimensionsOf, populationOf, citationsOf, locationCodes, membershipOf,
    /* Wave 20 — the one expression the explorer's every step counts through. */
    accounting,
    versionOf, lifecycleOf, roles, AXES,
    get absences() { return absences(); },
    get insideAnyway() { return insideAnyway(); },
    get citations() { return allCitations(); },
    get citationFinding() { return citationFinding(); },
    get seam() { return seam(); },
    /** Every dataset with the fields §4.5 names, composed once. */
    get governed() {
      return views.map((v) => ({
        view: v,
        version: versionOf(v),
        lifecycle: lifecycleOf(v),
        visibility: v.shared ? 'shared with the project' : 'private',
        dimensions: dimensionsOf(v),
        population: populationOf(v),
        citations: citationsOf(v),
      }));
    },
    /** The vocabulary this object is named in, and where each word comes from. */
    vocabulary: {
      word: 'dataset',
      inGlossary: false,
      says:
        'The brief’s §4.5 is headed “Saved queries and governed datasets” and `docs/PRD.md` uses *dataset* in prose; `docs/GLOSSARY.md` carries neither that word nor *saved view* as a term. So the object is named in the requirement’s own words rather than in one this catalogue invented, and the glossary entry is part of the PRD amendment D1 accepted and that has not landed. The screen keeps its id and its label, because a route is not a noun.',
    },
    /* The counts the surfaces render, so none of them is typed. */
    get shared() { return views.filter((v) => v.shared).length; },
    get fed() { return views.filter((v) => v.feeds.length > 0).length; },
    get feedsTotal() { return views.reduce((n, v) => n + v.feeds.length, 0); },
    get fromGroup() { return views.filter((v) => v.group).length; },
    get unsettledCount() { return views.filter((v) => v.period === null).length; },
    settledOn: '2026-09-03',
  };
})();

/** Column sets a returning user recalls rather than rebuilds (§6.1, EX-24). */
export const SAVED_VIEW_LIST = SAVED_VIEWS.views;
/** The keyboard contract, stated once and shown on demand (G-EXP-9). */
export const SHORTCUTS = [
  { group: 'Anywhere', keys: [
    { k: '⌘ K', what: 'Open the command palette' },
    { k: '/', what: 'Jump to search' },
    { k: 'g then p', what: 'Go to projects' },
    { k: 'g then r', what: 'Go to results' },
    { k: 'g then x', what: 'Go to exceedances' },
    { k: '?', what: 'Show this sheet' },
    { k: 'Esc', what: 'Close the panel, dialog or palette in front' },
  ] },
  { group: 'Any grid', keys: [
    { k: '↑ ↓', what: 'Move between rows' },
    { k: '← →', what: 'Move between columns' },
    { k: 'Space', what: 'Select the row' },
    { k: '⇧ ↑ ↓', what: 'Extend the selection' },
    { k: 'Enter', what: 'Open the row' },
    { k: 'L', what: 'Open lineage for the focused value' },
    { k: '⌘ E', what: 'Export exactly what is on screen' },
  ] },
  { group: 'Exception review', keys: [
    { k: 'J / K', what: 'Next / previous question' },
    { k: '1 – 9', what: 'Choose that answer' },
    { k: 'Enter', what: 'Apply and advance' },
    { k: 'A', what: 'Accept every match above the threshold' },
    { k: 'H', what: 'Hold this question’s rows and move on' },
    { k: '⌘ Z', what: 'Undo the last answer' },
  ] },
  /*
   * Wave 6: the contract moved with the axis. A round entered column by
   * column needs "next row, same column"; a round entered bore by bore does
   * not, and a single key that marked a bore dry was right when dry was the
   * only alternative to sampled and is wrong now there are six dispositions.
   */
  { group: 'Field capture — the bore session', keys: [
    { k: 'Tab', what: 'Next field, walking down the session' },
    { k: 'Enter', what: 'Add a reading to the open stabilisation series' },
    { k: 'J / K', what: 'Next / previous bore in the round' },
    { k: 'X', what: 'Disposition this bore — opens the seven states, and the reason is still typed' },
    { k: '⌘ S', what: 'Save the session locally' },
  ] },
];

/* ==================================================================== *
 * The second review pass — sampling defensibility, the WA statutory
 * frame, and the derivations that decide whether an exceedance stands.
 *
 * Everything above this line answers "what does the register name". This
 * block answers a different question: what would a hydrogeologist, a
 * laboratory data manager or a DWER officer look for and fail to find.
 * ==================================================================== */


/**
 * The stabilisation test, written once and run over every series.
 *
 * The rule is the glossary's: *a run of consecutive readings whose values all
 * sit within a stated tolerance of each other*, three of them, and the
 * tolerances are configuration rather than code. Two readings of it are
 * possible and the difference matters, so it is stated on the screen as well
 * as here: the **spread across the three readings** (largest minus smallest)
 * is what must fall inside the tolerance, measured as a percentage of their
 * mean where the tolerance is a percentage. The looser reading — each reading
 * within x% of the mean — allows twice the movement.
 *
 * Turbidity is the one disjunctive rule and that is the field convention
 * rather than a convenience: below 10 NTU the reading is acceptable outright,
 * and only above it does the ±10% agreement test apply. A falling turbidity
 * curve never satisfies a percentage test on its way down, and every low-flow
 * sample ever taken would fail a conjunctive reading of it.
 */
const STABILISATION = {
  window: 3,
  params: [
    { key: 'ph', label: 'pH', unit: '', tol: 0.1, kind: 'absolute', text: '± 0.1 pH units' },
    { key: 'ec', label: 'Conductivity', unit: 'µS/cm', tol: 3, kind: 'relative', text: '± 3%' },
    { key: 'do', label: 'Dissolved oxygen', unit: 'mg/L', tol: 10, kind: 'relative', text: '± 10%' },
    { key: 'redox', label: 'Redox', unit: 'mV', tol: 10, kind: 'absolute', text: '± 10 mV' },
    { key: 'turb', label: 'Turbidity', unit: 'NTU', tol: 10, kind: 'turbidity', text: '< 10 NTU, or ± 10% above that' },
    { key: 'temp', label: 'Temperature', unit: '°C', tol: 0.2, kind: 'absolute', text: '± 0.2 °C' },
  ],
  basis: 'AS/NZS 5667.11, three consecutive readings',
};

/** Whether one parameter held still across a window of readings. */
function held(param, window) {
  const values = window.map((r) => r[param.key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (param.kind === 'absolute') return max - min <= param.tol + 1e-9;
  if (param.kind === 'turbidity') {
    if (max < 10) return true;
    return ((max - min) / mean) * 100 <= param.tol + 1e-9;
  }
  return ((max - min) / mean) * 100 <= param.tol + 1e-9;
}

/**
 * One purge, with its readings scored rather than annotated.
 *
 * `rate` and the minutes between the start of purging and collection give the
 * volume; nothing types a volume. Each reading carries which parameters were
 * holding at it, so a series that stabilised on five of six parameters says
 * which one it did not — the glossary requires stabilisation to be reported
 * per parameter as well as overall, and "did not stabilise" without naming the
 * parameter is the assertion this record exists to replace.
 */
function purgeOf({ location, method, pump, intake, rate, startedAt, sampledAt, first, step = 5, readings }) {
  const hhmm = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const clock = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
  const start = hhmm(startedAt);
  const collected = hhmm(sampledAt);
  const minutes = collected - start;
  const volume = Math.round(rate * minutes * 10) / 10;
  const rows = readings.map((r, i) => ({ ...r, t: clock(hhmm(first) + i * step) }));
  const scored = rows.map((r, i) => {
    if (i + 1 < STABILISATION.window) return { ...r, window: null, holding: [], moving: STABILISATION.params.map((p) => p.key), stable: false };
    const w = rows.slice(i + 1 - STABILISATION.window, i + 1);
    const holding = STABILISATION.params.filter((p) => held(p, w)).map((p) => p.key);
    return {
      ...r,
      window: `${w[0].t}–${r.t}`,
      holding,
      moving: STABILISATION.params.filter((p) => !holding.includes(p.key)).map((p) => p.key),
      stable: holding.length === STABILISATION.params.length,
    };
  });
  const firstStable = scored.find((r) => r.stable) ?? null;
  const last = scored.at(-1);
  const neverHeld = STABILISATION.params.filter((p) => !scored.some((r) => r.holding.includes(p.key)));
  return {
    location,
    method,
    pump,
    intake,
    rate,
    rateText: `${rate.toFixed(2)} L/min`,
    startedAt,
    sampledAt,
    minutes,
    volume,
    volumeText: `${volume.toFixed(1)} L`,
    readings: scored,
    tolerance: STABILISATION,
    stabilised: Boolean(firstStable),
    stabilisedAt: firstStable ? firstStable.t : null,
    /** Which parameters never held, so "did not stabilise" names its cause. */
    neverHeld: neverHeld.map((p) => p.label),
    heldAtEnd: last.holding.map((k) => STABILISATION.params.find((p) => p.key === k).label),
    outcome: firstStable ? 'Stable' : 'Sampled by judgement',
    verdict: firstStable
      ? `Stabilised at ${firstStable.t} — ${STABILISATION.window} consecutive readings within tolerance on every parameter, ${firstStable.window}. Sample collected at ${sampledAt}.`
      : `Never stabilised across ${scored.length} readings and ${volume.toFixed(1)} L — ${neverHeld.map((p) => p.label.toLowerCase()).join(' and ')} ${neverHeld.length === 1 ? 'held' : 'each held'} outside tolerance to the last reading. Sampled at ${sampledAt} on the field officer’s judgement, and the record says so.`,
  };
}

/* ==================================================================== *
 * Wave 8 — the instruments, and the series two of them record
 *
 * **Vocabulary, decided against `docs/GLOSSARY.md` before anything was
 * named** (QB-9, EXPANSION_BRIEF.md §5.9). The glossary has no entry for
 * *logger*, *telemetry*, *deployment*, *calibration* as a record, or
 * *barometric compensation*, so each word below is anchored to the nearest
 * entry the glossary does hold and the anchor is written down here rather
 * than left to be inferred — the precedent is wave 6's MDL and wave 7's
 * disposition.
 *
 * - **water level** — what a logger records, one per hour. The glossary's
 *   "Words Strataflow does not use" table sends *reading*, *measurement* and
 *   *data point* to **result** or **water level**, and a logger's output has
 *   no analyte, no test and no sample: it is a water level against a
 *   location, measured as a **depth to water** below a named **measuring
 *   point**. Nothing here calls one a reading.
 * - **groundwater elevation** — derived at the measurement date from the
 *   **location survey** in force, never stored (glossary, FR-1.3, ADR-0015).
 *   That is the rule `#location` states; it applies once an hour here rather
 *   than once a round.
 * - **series** — the PRD's own noun in FR-1.10 ("timeseries from loggers …
 *   raw and corrected series"), and the glossary's **chart kind** entry
 *   already carries `censored_series` and reasons about "one series" as a
 *   first-class thing. Not minted.
 * - **instrument** — FR-3.10's own word ("common instrument vendors"), and
 *   the PRD's opening sentence ("laboratory and instrument data"). It
 *   collides with the glossary's **licence** entry, where *instrument* means
 *   a statutory instrument, so the register says which sense it means on its
 *   own face and its label is *Instruments and loggers* rather than the bare
 *   noun.
 * - **deployment** — an interval record in the shape of the glossary's
 *   **location survey** history: dated, never edited, and two of them cannot
 *   cover one bore at once. Checked below rather than asserted.
 * - **location group** — the glossary entry, verbatim: "a named set of
 *   locations that are assessed together". FR-3.10 defines the barometric
 *   source *per location group*, so the source is a record against a group
 *   and not a setting on a screen.
 * - **correction** — the glossary's **survey reason** `correction`: the
 *   earlier record was wrong, and a correction **supersedes** what it
 *   replaces over the same span rather than editing it. The raw pressure
 *   record is untouched (PP6); the corrected series is re-derived.
 * - **calibration** — the glossary reaches it through **qualifier** ("above
 *   calibration range"), and the field round has carried calibration and
 *   post-round check records since wave 6. Those records move here; nothing
 *   about them changes.
 *
 * **The register owns what the preflight reads.** The three field
 * instruments below were declared inside `FIELD_ROUND` in wave 6 and counted
 * by its completion preflight; they are declared here now and `FIELD_ROUND`
 * reads them, so the register and the preflight are one source read twice
 * rather than two lists that can come apart. Their serials gained the
 * `MOCK-` prefix §5.6 requires in the same move — they had rendered on no
 * screen until this register, so nothing already drawn changed.
 * ==================================================================== */

export const INSTRUMENTS = (() => {
  /** Sentinel for an interval still open, so every comparison stays lexical. */
  const OPEN = '9999-12-31';

  /*
   * The field instruments, exactly as wave 6 wrote them — a field parameter
   * is only as good as the probe that read it. Calibration before the round
   * is what the DQO asks for; the post-round check is what says the probe had
   * not drifted while it was reading, and one of the three has not been
   * recorded, which the preflight counts rather than glossing.
   */
  const field = [
    { asset: 'MOCK-INST-01', kind: 'Multiparameter sonde', model: 'YSI ProDSS', serial: 'MOCK-SN-21F0994', reads: 'pH · conductivity · dissolved oxygen · redox · temperature', calibrated: '2026-05-12 05:40 AWST', check: '2026-05-14 17:10 AWST', drift: 'pH +0.02, conductivity −0.4% — within acceptance', held: 'Field kit WDL-FK-01', state: 'in service' },
    { asset: 'MOCK-INST-02', kind: 'Turbidimeter', model: 'Hach 2100Q', serial: 'MOCK-SN-18B4471', reads: 'turbidity', calibrated: '2026-05-12 05:55 AWST', check: null, drift: null, held: 'Field kit WDL-FK-01', state: 'in service' },
    { asset: 'MOCK-INST-03', kind: 'Water level meter', model: 'Solinst 102', serial: 'MOCK-SN-331802', reads: 'depth to water', calibrated: '2026-04-30 — tape checked against the workshop reference, 0 mm over 30 m', check: '2026-05-14 17:14 AWST', drift: 'No change against the reference mark', held: 'Field kit WDL-FK-01', state: 'in service' },
  ];

  /*
   * The installed instruments. `Levelogic` is a MOCK vendor on the
   * `fixtures/partner/` convention — real-world-shaped, so the model, the
   * format and the file extension read like something a hire company would
   * actually send, and unmistakably fictional, so a screenshot of this can
   * never be read as a real operator's asset register.
   */
  const installed = [
    { asset: 'MOCK-LT-A1', kind: 'Water level logger', model: 'Levelogic LT-5000 (MOCK)', serial: 'MOCK-SN-LT5-114327', reads: 'absolute pressure · temperature', range: '10 m water column · 0.05% FS', interval: 'hourly', state: 'in service', held: 'MW05' },
    { asset: 'MOCK-LT-A2', kind: 'Water level logger', model: 'Levelogic LT-5000 (MOCK)', serial: 'MOCK-SN-LT5-114329', reads: 'absolute pressure · temperature', range: '10 m water column · 0.05% FS', interval: 'hourly', state: 'in service', held: 'MW07' },
    { asset: 'MOCK-LT-A3', kind: 'Water level logger', model: 'Levelogic LT-5000 (MOCK)', serial: 'MOCK-SN-LT5-118004', reads: 'absolute pressure · temperature', range: '10 m water column · 0.05% FS', interval: 'hourly', state: 'in service', held: 'MW09' },
    { asset: 'MOCK-LT-A4', kind: 'Water level logger', model: 'Levelogic LT-5000 (MOCK)', serial: 'MOCK-SN-LT5-118011', reads: 'absolute pressure · temperature', range: '10 m water column · 0.05% FS', interval: 'hourly', state: 'out of service — calibration expired', held: 'Workshop, Wandalup' },
    { asset: 'MOCK-BL-01', kind: 'Barometric logger', model: 'Levelogic BL-100 (MOCK)', serial: 'MOCK-SN-BL1-90221', reads: 'atmospheric pressure · temperature', range: '0 – 150 kPa', interval: 'hourly', state: 'in service', held: 'Site gauge station' },
    { asset: 'MOCK-BL-02', kind: 'Barometric logger', model: 'Levelogic BL-100 (MOCK)', serial: 'MOCK-SN-BL1-90188', reads: 'atmospheric pressure · temperature', range: '0 – 150 kPa', interval: 'hourly', state: 'in service', held: 'Kurrajong Road compound' },
    { asset: 'MOCK-VW-01', kind: 'Vibrating wire piezometer', model: 'Geosense VWP-3400 (MOCK)', serial: 'MOCK-SN-VW-40712', reads: 'pore pressure · temperature', range: '350 kPa', interval: 'six-hourly', state: 'in service', held: 'TSF-VWP-03' },
  ];

  /**
   * Where a barometer sits, in metres AHD.
   *
   * A station that records the weather is not a place samples are taken from,
   * so it has no row in `LOCATIONS` and that is the honest answer rather than
   * an omission. Its elevation is here because the compensation rule needs
   * it, and a rule whose inputs live somewhere unstated is the silent
   * derivation PP3 forbids.
   */
  const stations = [
    { name: 'Site gauge station', elevation: 212.4, note: 'The same station the rainfall series under the hydrograph comes from.' },
    { name: 'Kurrajong Road compound', elevation: 198.9, note: 'The former barometric source, 6.4 km east of the borefield.' },
  ];

  /*
   * Deployments — interval records, not attributes.
   *
   * A logger is not *at* a bore; it was at a bore over a span, and the span
   * is what makes a water level from March mean something different from one
   * in May. Two of them cannot cover one bore at once and one instrument
   * cannot be in two bores at once; both are checked below rather than
   * trusted. `sensor` is the depth of the pressure sensor below the measuring
   * point, and `sensorWas` is what the record said before wave 8's
   * correction — kept, because a corrected record that discards what it
   * corrected is not a record (PP6).
   */
  const deployments = [
    // `toHour` and `fromHour` are the hours the instrument left the bore and
    // went back into it. They live here rather than inside the service
    // record's prose because the series' gap is computed from them, and an
    // hour written down in two places is an hour that can come apart.
    { instrument: 'MOCK-LT-A1', at: 'MW05', from: '2024-06-12', to: '2026-04-06', toHour: 9, sensor: 16.00, sensorWas: null, why: 'Removed for scheduled service and drift check' },
    { instrument: 'MOCK-LT-A1', at: 'MW05', from: '2026-04-20', fromHour: 9, to: null, sensor: 15.62, sensorWas: 16.00, why: 'Returned to service after calibration' },
    { instrument: 'MOCK-LT-A2', at: 'MW07', from: '2024-06-12', to: null, sensor: 15.40, sensorWas: null, why: 'Original installation' },
    { instrument: 'MOCK-LT-A3', at: 'MW09', from: '2025-02-18', to: null, sensor: 14.80, sensorWas: null, why: 'Installed when the compliance-boundary line went to continuous monitoring' },
    { instrument: 'MOCK-VW-01', at: 'TSF-VWP-03', from: '2023-08-30', to: null, sensor: 28.50, sensorWas: null, why: 'Grouted in at the embankment raise' },
    { instrument: 'MOCK-BL-01', at: 'Site gauge station', from: '2025-04-01', to: null, sensor: null, sensorWas: null, why: 'Replaced MOCK-BL-02 as the site barometric source' },
    { instrument: 'MOCK-BL-02', at: 'Kurrajong Road compound', from: '2024-06-12', to: null, sensor: null, sensorWas: null, why: 'Retained as the second barometric record' },
  ];

  /*
   * Service and calibration, as events. The gap in the MW05 series is one of
   * these rows rather than a story told beside it — the series screen
   * resolves its gap through this record, so the fortnight the trace is
   * missing and the fortnight the instrument was in the workshop are the same
   * fortnight by construction.
   */
  const services = [
    { instrument: 'MOCK-LT-A1', at: '2026-04-06', kind: 'Removed for service', what: 'Scheduled twelve-month service. Retrieved 09:00 AWST; the bore has no continuous record from that hour.', by: 'A. Nakamura' },
    { instrument: 'MOCK-LT-A1', at: '2026-04-17', kind: 'Calibrated', what: 'Two-point calibration against the workshop reference column — −0.021 m over 10 m before adjustment, +0.002 m after.', by: 'Levelogic service agent (MOCK)' },
    { instrument: 'MOCK-LT-A1', at: '2026-04-20', kind: 'Returned to service', what: 'Redeployed at MW05 at 09:00 AWST. Cable set to the mark at 15.62 m below top of casing.', by: 'A. Nakamura' },
    { instrument: 'MOCK-BL-01', at: '2026-01-14', kind: 'Calibrated', what: 'Bench calibration against the reference barometer — +0.008 kPa. Next due 2027-01-14.', by: 'Levelogic service agent (MOCK)' },
    { instrument: 'MOCK-LT-A4', at: '2026-02-28', kind: 'Calibration expired', what: 'Twelve months since the last calibration. The unit is held in the workshop and is not deployable until it is calibrated.', by: 'system' },
    { instrument: 'MOCK-VW-01', at: '2025-11-19', kind: 'Zero-offset check', what: 'Barometric zero check against MOCK-BL-01 — a +1.2 kPa offset recorded and carried on the series.', by: 'D. Okafor' },
    { instrument: 'MOCK-INST-01', at: '2026-05-12', kind: 'Calibrated', what: 'Four-point pH, one-point conductivity, air-saturated dissolved oxygen, before the round.', by: 'A. Nakamura' },
    { instrument: 'MOCK-INST-03', at: '2026-04-30', kind: 'Tape check', what: 'Checked against the workshop reference — 0 mm over 30 m.', by: 'A. Nakamura' },
  ];

  /**
   * The location groups the barometric source is defined against.
   *
   * The glossary's **location group**: a named set of locations assessed
   * together, where membership is an assessment decision rather than a place
   * or an area. FR-3.10 defines barometric compensation per group, which is
   * why these exist here at all.
   */
  const groups = [
    { name: 'TSF downgradient compliance', members: ['MW05', 'MW07'], why: 'The bores licence condition 12 names for the TSF seepage limits' },
    { name: 'Compliance boundary', members: ['MW09', 'MW11'], why: 'The line the licence limits are assessed at' },
    { name: 'Borefield background', members: ['MW01A', 'MW03B', 'MW12'], why: 'The upgradient set the background comparison is referenced against' },
    { name: 'TSF embankment instrumentation', members: ['TSF-VWP-03'], why: 'The embankment piezometer, which carries pore pressure rather than a water level' },
  ];

  /*
   * The barometric source, per group, as interval records — FR-3.10's "a
   * defined source per location group", where *defined* is a record with a
   * span rather than a field on a settings page. The site barometer replaced
   * the Kurrajong Road one on 1 April 2025, so every group carries two rows
   * and the one in force on a date is resolved rather than assumed.
   */
  const baroSources = groups.flatMap((g) => [
    { group: g.name, source: 'MOCK-BL-02', from: '2024-06-12', to: '2025-03-31' },
    { group: g.name, source: 'MOCK-BL-01', from: '2025-04-01', to: null },
  ]);

  const all = [...field, ...installed];
  const of = (asset) => all.find((i) => i.asset === asset) ?? null;
  const stationOf = (name) => stations.find((s) => s.name === name) ?? null;

  /** Every interval that overlaps another on the same key. Zero is the claim. */
  const overlaps = (rows, key) => {
    const found = [];
    const by = new Map();
    for (const r of rows) {
      if (!by.has(r[key])) by.set(r[key], []);
      by.get(r[key]).push(r);
    }
    for (const [k, list] of by) {
      const sorted = [...list].sort((a, b) => a.from.localeCompare(b.from));
      for (let i = 1; i < sorted.length; i += 1) {
        const prev = sorted[i - 1];
        const cur = sorted[i];
        if (cur.from < (prev.to ?? OPEN)) found.push(`${k}: ${prev.from}→${prev.to ?? 'open'} overlaps ${cur.from}→${cur.to ?? 'open'}`);
      }
    }
    return found;
  };

  const inForce = (rows, key, value, on) =>
    rows.filter((r) => r[key] === value && r.from <= on && on < (r.to ?? OPEN));

  const sourceFor = (group, on) => inForce(baroSources, 'group', group, on)[0] ?? null;
  const deploymentAt = (location, on) => inForce(deployments, 'at', location, on)[0] ?? null;
  const groupOf = (code) => groups.find((g) => g.members.includes(code)) ?? null;

  return {
    field,
    installed,
    all,
    stations,
    deployments,
    services,
    groups,
    baroSources,
    of,
    stationOf,
    groupOf,
    sourceFor,
    deploymentAt,
    /** The invariants, computed. A register that only claims these is a list. */
    checks: {
      byLocation: overlaps(deployments, 'at'),
      byInstrument: overlaps(deployments, 'instrument'),
      byGroup: overlaps(baroSources, 'group'),
      groupsWithoutSource: groups.filter((g) => !sourceFor(g.name, AS_AT)).map((g) => g.name),
      placesCovered: [...new Set(deployments.map((d) => d.at))].length,
      /** Every monitored location that no instrument has ever sat in. */
      withoutInstrument: LOCATIONS.filter(
        (l) => (l.klass === 'groundwater' || l.klass === 'tsf_instrumentation') && !deployments.some((d) => d.at === l.code),
      ).map((l) => l.code),
    },
  };
})();

export const FIELD_ROUND = (() => {
  const round = '2026-Q2-GW';
  const programme = 'GW-QTR';
  const crew = 'A. Nakamura';
  const device = 'Field tablet WDL-FT-02';

  /*
   * The measuring point vocabulary is the glossary's own closed list — top of
   * casing, top of protective cover, ground level, staff gauge zero — and the
   * dip is a **depth to water** below the point that was dipped from, which is
   * what comes off the tape. A field sheet says SWL and the term is marked as
   * the practitioner's word where it appears, not adopted as the product's.
   */
  const sessions = [
    {
      location: 'MW01A',
      day: 1,
      arrived: '2026-05-12 07:14 AWST',
      condition: 'Cover sound, lock free, no stock damage. Concrete pad intact.',
      access: 'Borefield access road, dry',
      headworks: 'Steel monument, padlocked, 0.62 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 11.42,
      totalDepth: null,
      totalDepthWhy: 'Not required — silt check falls due on the annual round',
      purge: purgeOf({
        location: 'MW01A', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump', intake: '21.0 m btoc — mid-screen', rate: 0.22,
        startedAt: '07:22', sampledAt: '07:55', first: '07:27',
        readings: [
          { swl: 11.40, ph: 7.44, ec: 812, do: 4.10, redox: 142, turb: 18.4, temp: 26.2 },
          { swl: 11.41, ph: 7.38, ec: 828, do: 3.72, redox: 133, turb: 9.6, temp: 26.0 },
          { swl: 11.42, ph: 7.34, ec: 836, do: 3.55, redox: 128, turb: 6.2, temp: 25.9 },
          { swl: 11.42, ph: 7.32, ec: 839, do: 3.48, redox: 126, turb: 5.4, temp: 25.9 },
          { swl: 11.42, ph: 7.31, ec: 840, do: 3.44, redox: 125, turb: 5.1, temp: 25.9 },
        ],
      }),
      drawdown: '0.02 m — within the 0.10 m limit for low-flow',
      samples: ['WDL-26Q2-001'],
      filtration: '0.45 µm in-line capsule, changed at this bore',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottle; nutrients on ice, unpreserved',
      observations: 'Clear, no odour. Cattle trough refilled 40 m north.',
      photographs: 4,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-12 08:03 AWST',
      synced: '2026-05-12 18:41 AWST',
    },
    {
      location: 'MW03B',
      day: 1,
      arrived: '2026-05-12 09:36 AWST',
      condition: 'Cover sound. Surface seal cracked on the northern edge — photographed, not yet a defect.',
      access: 'Borefield access road, dry',
      headworks: 'Steel monument, padlocked, 0.55 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 9.18,
      totalDepth: null,
      totalDepthWhy: 'Not required — silt check falls due on the annual round',
      purge: purgeOf({
        location: 'MW03B', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump', intake: '49.0 m btoc — mid-screen', rate: 0.20,
        startedAt: '09:44', sampledAt: '10:20', first: '09:49',
        readings: [
          { swl: 9.16, ph: 7.72, ec: 1082, do: 1.20, redox: 22, turb: 12.8, temp: 27.6 },
          { swl: 9.17, ph: 7.66, ec: 1104, do: 0.96, redox: 12, turb: 5.9, temp: 27.5 },
          { swl: 9.18, ph: 7.62, ec: 1114, do: 0.88, redox: 6, turb: 3.4, temp: 27.4 },
          { swl: 9.18, ph: 7.61, ec: 1118, do: 0.84, redox: 3, turb: 2.8, temp: 27.4 },
          { swl: 9.18, ph: 7.60, ec: 1120, do: 0.82, redox: 1, turb: 2.5, temp: 27.4 },
        ],
      }),
      drawdown: '0.02 m — within the 0.10 m limit for low-flow',
      samples: ['WDL-26Q2-002'],
      filtration: '0.45 µm in-line capsule, changed at this bore',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottle; nutrients on ice, unpreserved',
      observations: 'Confined unit. Head stands above the superficial bore in the same nest — the upward gradient the location record argues from.',
      photographs: 5,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-12 10:31 AWST',
      synced: '2026-05-12 18:41 AWST',
    },
    {
      location: 'MW05',
      day: 2,
      arrived: '2026-05-13 07:48 AWST',
      condition: 'Cover sound, lock free. Faint sulfurous odour at the cap before purging.',
      access: 'TSF perimeter road, dry',
      headworks: 'Steel monument, padlocked, 0.48 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 8.47,
      totalDepth: null,
      totalDepthWhy: 'Not required — silt check falls due on the annual round',
      purge: purgeOf({
        location: 'MW05', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump', intake: '15.0 m btoc — mid-screen', rate: 0.24,
        startedAt: '08:02', sampledAt: '08:40', first: '08:07',
        readings: [
          { swl: 8.41, ph: 8.62, ec: 3180, do: 2.41, redox: 118, turb: 41.2, temp: 26.8 },
          { swl: 8.43, ph: 8.74, ec: 3260, do: 1.98, redox: 104, turb: 28.4, temp: 26.6 },
          { swl: 8.44, ph: 8.83, ec: 3330, do: 1.62, redox: 96, turb: 17.1, temp: 26.5 },
          { swl: 8.45, ph: 8.88, ec: 3380, do: 1.44, redox: 91, turb: 9.8, temp: 26.4 },
          { swl: 8.46, ph: 8.90, ec: 3396, do: 1.39, redox: 89, turb: 7.2, temp: 26.4 },
          { swl: 8.46, ph: 8.91, ec: 3404, do: 1.36, redox: 88, turb: 6.4, temp: 26.4 },
          { swl: 8.47, ph: 8.91, ec: 3410, do: 1.34, redox: 87, turb: 6.1, temp: 26.3 },
        ],
      }),
      drawdown: '0.06 m — within the 0.10 m limit for low-flow',
      /*
       * The field blank was poured here, at the bore, at 08:00 — inside this
       * visit. The equipment blank was not: the pump was rinsed at the
       * vehicle at 10:35, on the way to MW07, so the rinsate sits in that
       * session. A QC sample belongs to the visit its collection time falls
       * in, or the manifest and the field record disagree about when it was
       * made.
       */
      samples: ['WDL-26Q2-003', 'WDL-26Q2-004', 'WDL-26Q2-QC1'],
      filtration: '0.45 µm in-line capsule, changed at this bore',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottles; PFAS in HDPE, no preservative, no PTFE anywhere in the train',
      observations: 'Slight sulfurous odour, strongest at the start of purging and gone by collection. Water clear at collection.',
      photographs: 6,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-13 09:02 AWST',
      synced: '2026-05-13 18:12 AWST',
    },
    {
      location: 'MW07',
      day: 2,
      arrived: '2026-05-13 10:24 AWST',
      condition: 'Cover sound. Bladder pump moved from MW05 and rinsed at the vehicle — the rinsate is the equipment blank.',
      access: 'TSF perimeter road, dry',
      headworks: 'Steel monument, padlocked, 0.51 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 7.12,
      totalDepth: null,
      totalDepthWhy: 'Not required — silt check falls due on the annual round',
      purge: purgeOf({
        location: 'MW07', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump — reused from MW05, rinsed', intake: '17.0 m btoc — mid-screen', rate: 0.26,
        startedAt: '10:31', sampledAt: '11:05', first: '10:36',
        readings: [
          { swl: 7.10, ph: 7.28, ec: 1602, do: 3.10, redox: 96, turb: 22.6, temp: 26.9 },
          { swl: 7.11, ph: 7.20, ec: 1648, do: 2.62, redox: 84, turb: 11.2, temp: 26.7 },
          { swl: 7.12, ph: 7.16, ec: 1668, do: 2.44, redox: 78, turb: 6.8, temp: 26.6 },
          { swl: 7.12, ph: 7.15, ec: 1676, do: 2.38, redox: 75, turb: 5.5, temp: 26.6 },
          { swl: 7.12, ph: 7.14, ec: 1680, do: 2.35, redox: 74, turb: 5.0, temp: 26.6 },
        ],
      }),
      drawdown: '0.02 m — within the 0.10 m limit for low-flow',
      samples: ['WDL-26Q2-005', 'WDL-26Q2-008', 'WDL-26Q2-QC3'],
      filtration: '0.45 µm in-line capsule, changed at this bore and again after the rinsate was poured',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottle; nutrients on ice, unpreserved',
      observations: 'Equipment reused from MW05 after rinsing at the vehicle at 10:35. The rinsate blank was poured before the pump went down this bore, which is the only order in which it answers anything.',
      photographs: 4,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-13 11:18 AWST',
      synced: '2026-05-13 18:12 AWST',
    },
    {
      location: 'MW09',
      day: 3,
      arrived: '2026-05-14 06:05 AWST',
      condition: 'Cover sound. Fines visible in the standing water on the pad after overnight rain.',
      access: 'Compliance boundary track, soft after rain',
      headworks: 'Steel monument, padlocked, 0.44 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 6.88,
      totalDepth: 21.4,
      totalDepthWhy: 'Dipped because turbidity would not fall — 0.6 m of silt above the surveyed base, recorded against the location',
      purge: purgeOf({
        location: 'MW09', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump', intake: '18.0 m btoc — mid-screen', rate: 0.31,
        startedAt: '06:19', sampledAt: '07:30', first: '06:24',
        readings: [
          { swl: 6.84, ph: 7.02, ec: 918, do: 4.60, redox: 168, turb: 68.2, temp: 26.1 },
          { swl: 6.85, ph: 6.96, ec: 942, do: 4.22, redox: 152, turb: 44.6, temp: 26.0 },
          { swl: 6.86, ph: 6.92, ec: 958, do: 3.98, redox: 141, turb: 31.2, temp: 25.9 },
          { swl: 6.86, ph: 6.89, ec: 968, do: 3.84, redox: 133, turb: 24.8, temp: 25.8 },
          { swl: 6.87, ph: 6.87, ec: 975, do: 3.74, redox: 128, turb: 19.4, temp: 25.8 },
          { swl: 6.87, ph: 6.86, ec: 980, do: 3.68, redox: 124, turb: 26.2, temp: 25.7 },
          { swl: 6.87, ph: 6.85, ec: 983, do: 3.63, redox: 121, turb: 17.8, temp: 25.7 },
          { swl: 6.88, ph: 6.84, ec: 985, do: 3.60, redox: 119, turb: 22.4, temp: 25.7 },
          { swl: 6.88, ph: 6.84, ec: 986, do: 3.57, redox: 118, turb: 15.6, temp: 25.7 },
          { swl: 6.88, ph: 6.83, ec: 987, do: 3.55, redox: 117, turb: 20.8, temp: 25.6 },
          { swl: 6.88, ph: 6.83, ec: 988, do: 3.54, redox: 116, turb: 14.2, temp: 25.6 },
          { swl: 6.88, ph: 6.83, ec: 989, do: 3.52, redox: 116, turb: 18.6, temp: 25.6 },
          { swl: 6.88, ph: 6.82, ec: 989, do: 3.51, redox: 115, turb: 12.8, temp: 25.6 },
          { swl: 6.88, ph: 6.82, ec: 990, do: 3.50, redox: 115, turb: 16.4, temp: 25.6 },
        ],
      }),
      drawdown: '0.04 m — within the 0.10 m limit for low-flow',
      samples: ['WDL-26Q2-006'],
      filtration: '0.45 µm in-line capsule, changed twice — the first blinded on fines',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottle; nutrients on ice, unpreserved',
      observations: 'Turbidity would not settle. Purged 22.0 L over 71 minutes and stopped: every other parameter had held for an hour and the crew had two bores left before the cooler had to leave for the courier.',
      photographs: 7,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-14 07:44 AWST',
      synced: '2026-05-14 19:02 AWST',
    },
    {
      location: 'MW12',
      day: 3,
      arrived: '2026-05-14 10:41 AWST',
      condition: 'Cover sound, lock free. Background bore, no works within 400 m.',
      access: 'Borefield northern track, dry',
      headworks: 'Steel monument, padlocked, 0.58 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: 12.86,
      totalDepth: null,
      totalDepthWhy: 'Not required — silt check falls due on the annual round',
      purge: purgeOf({
        location: 'MW12', method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
        pump: 'Bladder pump', intake: '20.0 m btoc — mid-screen', rate: 0.25,
        startedAt: '10:44', sampledAt: '11:20', first: '10:49',
        readings: [
          { swl: 12.84, ph: 7.18, ec: 594, do: 5.20, redox: 168, turb: 15.2, temp: 25.4 },
          { swl: 12.85, ph: 7.10, ec: 612, do: 4.86, redox: 158, turb: 8.4, temp: 25.3 },
          { swl: 12.86, ph: 7.07, ec: 617, do: 4.72, redox: 152, turb: 5.6, temp: 25.2 },
          { swl: 12.86, ph: 7.06, ec: 619, do: 4.66, redox: 149, turb: 4.6, temp: 25.2 },
          { swl: 12.86, ph: 7.05, ec: 620, do: 4.63, redox: 148, turb: 4.2, temp: 25.2 },
        ],
      }),
      drawdown: '0.02 m — within the 0.10 m limit for low-flow',
      samples: ['WDL-26Q2-007'],
      filtration: '0.45 µm in-line capsule, changed at this bore',
      preservation: 'Nitric acid to pH < 2 on the dissolved metals bottle; nutrients on ice, unpreserved',
      observations: 'Background bore. Nothing unusual; the photographs are the routine four plus three of the northern fenceline after the rain.',
      photographs: 7,
      photographsPending: true,
      disposition: 'sampled',
      dispositionReason: null,
      captured: '2026-05-14 11:34 AWST',
      synced: '2026-05-14 19:02 AWST',
    },
    {
      location: 'MW11',
      day: 2,
      visit: 1,
      arrived: '2026-05-13 14:02 AWST',
      condition: 'Not reached.',
      access: 'Compliance boundary track — the Wandalup Creek crossing was running after 31 mm overnight',
      headworks: '—',
      measuringPoint: null,
      depthToWater: null,
      totalDepth: null,
      purge: null,
      samples: [],
      filtration: '—',
      preservation: '—',
      observations: 'Turned back at the creek crossing. Photographed the crossing and the gauge board; 0.4 m over the causeway.',
      photographs: 2,
      disposition: 'inaccessible',
      dispositionReason: 'Wandalup Creek crossing running 0.4 m over the causeway after 31 mm overnight',
      captured: '2026-05-13 14:20 AWST',
      synced: null,
    },
    {
      location: 'MW11',
      day: 3,
      visit: 2,
      arrived: '2026-05-14 16:31 AWST',
      condition: 'Cover sound, lock free. Nothing wrong with the bore.',
      access: 'Compliance boundary track, passable by the afternoon',
      headworks: 'Steel monument, padlocked, 0.46 m stickup',
      measuringPoint: 'Top of casing',
      depthToWater: null,
      totalDepth: 22.0,
      totalDepthWhy: 'Dipped to confirm the bore is dry rather than blocked — tape wet to no mark, base reached at the surveyed depth',
      purge: null,
      samples: [],
      filtration: '—',
      preservation: '—',
      observations: 'Dry. Tape run to 22.0 m btoc, the base of the screened interval, and came up dry to the weight. The bore is sound and the aquifer is below the screen — the fourth successive dry season reading at this bore.',
      photographs: 3,
      disposition: 'dry',
      dispositionReason: 'Dipped to 22.0 m btoc, the base of the screened interval, and found dry to the weight',
      captured: '2026-05-14 16:52 AWST',
      synced: null,
    },
  ];

  /*
   * The instruments, because a field parameter is only as good as the probe
   * that read it. Calibration before the round is what the DQO asks for; the
   * post-round check is what says the probe had not drifted while it was
   * reading — and one of the three has not been recorded, which the preflight
   * counts rather than glossing.
   *
   * Wave 8: they are declared on the instrument register and read here. The
   * preflight counts the register's own rows, so "3 instruments, 3
   * calibrated, 2 post-checked" and the register that lists them cannot come
   * apart — which is the whole reason the register exists rather than a
   * second list of the same three probes.
   */
  const instruments = INSTRUMENTS.field;

  const planned = ['MW01A', 'MW03B', 'MW05', 'MW07', 'MW09', 'MW11', 'MW12'];
  const byCode = (code) => sessions.filter((s) => s.location === code);
  /** The visit that decides a bore's row on the summary — the last one made. */
  const current = planned.map((code) => byCode(code).at(-1));
  const disposition = (code) => FIELD_DISPOSITIONS.find((d) => d.code === code);

  const pending = sessions.filter((s) => !s.synced);
  /*
   * Mandatory fields per the round's own template. Counted off the pending
   * records rather than asserted, because "unsynced mandatory fields" is a
   * number a preflight has no business rounding.
   */
  const mandatoryOf = (s) => [
    'arrival time',
    'disposition',
    s.dispositionReason ? 'disposition reason' : null,
    s.measuringPoint ? 'measuring point' : null,
    s.depthToWater !== null ? 'depth to water' : null,
    s.totalDepth !== null ? 'total depth' : null,
  ].filter(Boolean);
  const pendingFields = pending.reduce((n, s) => n + mandatoryOf(s).length, 0);
  const pendingPhotos = sessions.filter((s) => s.photographsPending).length;

  const tally = FIELD_DISPOSITIONS.map((d) => ({
    ...d,
    n: current.filter((s) => s.disposition === d.code).length,
    visits: sessions.filter((s) => s.disposition === d.code).length,
  }));

  const sampled = current.filter((s) => s.disposition === 'sampled');
  const purges = sessions.filter((s) => s.purge);
  const stabilised = purges.filter((s) => s.purge.stabilised);

  return {
    round,
    programme,
    crew,
    device,
    laboratory: 'Pilbara Analytical Services',
    window: '1 Apr – 30 Jun 2026',
    days: [
      { n: 1, date: '2026-05-12', label: 'Day 1 — borefield' },
      { n: 2, date: '2026-05-13', label: 'Day 2 — TSF downgradient' },
      { n: 3, date: '2026-05-14', label: 'Day 3 — compliance boundary and background' },
    ],
    dispositions: FIELD_DISPOSITIONS,
    stabilisation: STABILISATION,
    sessions,
    current,
    planned,
    instruments,
    tally: tally.filter((d) => d.visits > 0),
    disposition,
    /** Everything the preflight counts, computed from the sessions above. */
    preflight: {
      planned: planned.length,
      dispositioned: current.filter((s) => s.disposition).length,
      onRecord: current.filter((s) => s.disposition && s.synced).length,
      sampled: sampled.length,
      dry: current.filter((s) => s.disposition === 'dry').length,
      visits: sessions.length,
      revisits: sessions.filter((s) => s.visit === 2).length,
      purges: purges.length,
      stabilised: stabilised.length,
      byJudgement: purges.length - stabilised.length,
      instruments: instruments.length,
      calibrated: instruments.filter((i) => i.calibrated).length,
      postChecked: instruments.filter((i) => i.check).length,
      pendingRecords: pending.length + pendingPhotos,
      pendingFields,
      pendingPhotos,
    },
  };
})();

/*
 * The monthly water-level series, and the two series whose months come off it.
 *
 * Declared here rather than beside their generators because wave 14 anchored
 * `WATER_LEVELS` to the field round's own dip at each bore: the series cannot
 * be built before the round that measured it exists. The record above
 * `waterLevels()` holds the finding this settles and what closed it.
 */
export const WATER_LEVELS = waterLevels();

/** Monthly rainfall at the site gauge, for the hydrograph overlay. */
export const RAINFALL = (() => {
  const random = prng(776);
  return WATER_LEVELS.months.map((month) => {
    const m = Number(month.slice(5));
    const wet = m <= 3 || m >= 11 ? 1 : m <= 5 || m >= 9 ? 0.45 : 0.12;
    return { month, mm: Math.round(wet * (40 + random() * 120)) };
  });
})();

/** Arsenic at MW05 — the series behind the exceedance and the trend test. */
export const ARSENIC_MW05 = (() => {
  const random = prng(413);
  return WATER_LEVELS.months
    .filter((_, i) => i % 3 === 0)
    .map((month, i) => {
      const value = 3.4 + i * 1.72 + (random() - 0.5) * 2.4;
      return { month, value: Number(Math.max(1.1, value).toFixed(1)), censored: false };
    });
})();

/**
 * The 195.6 m AHD line Figure 4.1 used to draw, and the decision taken about it.
 *
 * ## The question, and how it was settled
 *
 * Re-anchoring the series moved MW05 from **below** that line to **four metres
 * above** it, and a compliance bore crossing a trigger is not a rendering
 * detail. The wave plan set the test: *is it a real licence condition the seed
 * committed to — cited on the licence record, carried into obligations — or
 * was it typed to sit above the old wrong series?* So it was measured before
 * anything was drawn.
 *
 * **The measurement.** A level trigger is a criterion in the elevation unit,
 * and the unit dictionary names that unit, so the test is: does any register
 * that could carry a criterion carry one in `m AHD`? Every register below was
 * read in full and the answer is **zero** in all six, against a control — the
 * identical test for `µS/cm`, a unit this site genuinely does hold criteria in
 * — which finds the electrical-conductivity rows exactly where they are. The
 * search is capable of finding a criterion; there is no level criterion for it
 * to find.
 *
 * **The two occurrences.** `195.6` existed in exactly two places in the
 * catalogue, both on `#hydrograph`: the argument to the figure, and the string
 * `Trigger line · 195.6 m AHD (TSF licence)` in the configuration panel beside
 * it. Nothing linked to either, nothing derived from either, and the licence
 * record its parenthesis names lists **6 of 24** conditions — the ones with a
 * monitoring obligation, which is the class a level trigger would be in.
 *
 * **Where the number came from is visible in the drawing.** Against the series
 * it was typed beside, 195.6 sits 0.32 m above the first value the MW05 trace
 * draws, is reached only by the four months of the first wet season, and
 * stands above the drawn level for the other 37 — a line grazing the top of
 * one trace on one plate. That is where a ceiling drawn for a picture lands,
 * not where a limit read off an instrument does.
 *
 * **The decision: the trigger is scenery, and it is withdrawn rather than
 * re-valued.** There is nothing in the record to re-derive it from, and
 * inventing a licence condition to justify a number that never had one would
 * be a worse defect than the one being fixed — the catalogue would then hold a
 * regulatory obligation nobody wrote. So the line comes off the plate, the
 * withdrawal is drawn on the screen where the line used to be, and what
 * replaces it on Figure 4.1 is the thing the plate should always have been
 * standing on: the round's own dip at each bore, as a mark.
 *
 * **Nothing is absorbed by that, and the two stories agree.** The counterfactual
 * is stated in full on `#hydrograph` — had the line been real, MW05 would sit
 * 4.04 m above it — and *above* is the same side of the line the chemistry
 * story already puts this bore on: eight of the round's nine exceedances are
 * here, the TARP stands at Level 3, and the interpretation argues a seepage
 * mound. A high
 * water level downgradient of a tailings storage facility agrees with a mound;
 * it does not contradict anything. What would have contradicted the record is
 * drawing MW05 comfortably *under* a compliance line on the one screen that
 * shows its water level while every other screen calls it the impacted bore.
 *
 * **What would bring a trigger back** is a condition on the licence record
 * naming a level at a named bore. It would then carry into the obligations
 * board, the exceedance register and the TARP through the machinery the
 * chemistry conditions already use, and Figure 4.1 would draw it from there
 * rather than from an argument typed into a figure call.
 */
export const LEVEL_TRIGGER = (() => {
  const value = 195.6;
  const code = 'MW05';
  const unit = UNITS.find((u) => u.quantity === 'Elevation').unit;
  const controlUnit = UNITS.find((u) => u.quantity === 'Electrical conductivity').unit;
  const holds = (needle, ...fields) => fields.some((f) => typeof f === 'string' && f.includes(needle));

  /* Every register that could carry a criterion, read for one in the elevation unit. */
  const registers = [
    {
      register: `Licence ${LICENCE.id} — conditions with a monitoring obligation`,
      of: `${LICENCE.conditions.length} of 24`,
      test: (needle) => LICENCE.conditions.filter((c) => holds(needle, c.what)).length,
    },
    {
      register: 'Obligations board — what this project owes',
      of: `${OBLIGATIONS.length}`,
      test: (needle) => OBLIGATIONS.filter((o) => holds(needle, o.what, o.basis)).length,
    },
    {
      register: 'Exceedance register — the 2026-Q2-GW round',
      of: `${EXCEEDANCES.length}`,
      test: (needle) => EXCEEDANCES.filter((e) => holds(needle, e.criterion, e.value)).length,
    },
    {
      register: 'Trigger action response plan',
      of: `${TARP.length}`,
      test: (needle) => TARP.filter((t) => holds(needle, t.trigger)).length,
    },
    {
      register: 'Criteria library — the sets in force',
      of: `${CRITERIA_LIBRARY.length}`,
      test: (needle) => CRITERIA_LIBRARY.filter((c) => holds(needle, c.set, c.applies)).length,
    },
    {
      register: 'The consecutive-round condition, as evaluated',
      of: `${WINDOW_CONDITION.series.length} drawn of 12 evaluated`,
      test: (needle) => WINDOW_CONDITION.series.filter((s) => holds(needle, s.criterion)).length,
    },
  ].map((r) => ({ register: r.register, of: r.of, hits: r.test(unit), control: r.test(controlUnit) }));

  const anchor = WATER_LEVELS.anchorOf(code);
  const series = WATER_LEVELS.series[code];
  const at = TARP.filter((t) => t.locations.split(', ').includes(code));

  return {
    value,
    code,
    unit,
    controlUnit,
    /** What the configuration panel said, kept verbatim so the screen can strike it. */
    was: `Trigger line · ${value.toFixed(1)} ${unit} (TSF licence)`,
    now: 'withdrawn 2 September 2026, no licence citation',
    occurrences: 2,
    occurrencesWhere: 'the argument to the figure and the configuration row beside it, both on `#hydrograph`',
    registers,
    citations: registers.reduce((n, r) => n + r.hits, 0),
    controlCitations: registers.reduce((n, r) => n + r.control, 0),
    /** The arithmetic the withdrawal is measured by. */
    drawnBefore: anchor.was,
    drawnNow: anchor.field,
    aboveBefore: Number((value - anchor.was).toFixed(2)),
    aboveNow: Number((anchor.field - value).toFixed(2)),
    monthsAboveBefore: series.filter((p) => p.was > value).length,
    monthsAboveNow: series.filter((p) => p.elevation > value).length,
    months: series.length,
    /** How far the line stood above the first value the old series drew. */
    startedAbove: Number((value - series[0].was).toFixed(2)),
    /** The last month the old series reached it, and the one after that. */
    lastAbove: [...series].reverse().find((p) => p.was > value)?.month ?? null,
    belowSince: series.find((p, i) => p.was <= value && series.slice(i).every((q) => q.was <= value))?.month ?? null,
    /** The side of the line the rest of the record already puts this bore on. */
    chemistry: {
      exceedances: EXCEEDANCES.filter((e) => e.location === code).length,
      ofExceedances: EXCEEDANCES.length,
      tarp: at.length,
      highest: at.map((t) => t.level).sort().at(-1),
    },
    decision: 'withdrawn — scenery, not a condition',
    decidedOn: '2026-09-02',
  };
})();

/**
 * The purge and stabilisation record, read out of the field round.
 *
 * `#purge` is the deep view of the series `#field-capture` shows inline — one
 * source, read twice, rather than a second copy of the readings that can come
 * to disagree with the first. `location`, `round`, the readings, the volume
 * and the verdict all resolve through `FIELD_ROUND`; nothing here is typed.
 */
export const PURGE = (() => {
  const session = FIELD_ROUND.sessions.find((s) => s.location === 'MW05');
  const failing = FIELD_ROUND.sessions.find((s) => s.purge && !s.purge.stabilised);
  return {
    round: FIELD_ROUND.round,
    session,
    ...session.purge,
    sample: session.samples[0],
    collected: `${FIELD_ROUND.days.find((d) => d.n === session.day).date} ${session.purge.sampledAt} AWST`,
    drawdown: session.drawdown,
    /** The case that matters more than the clean one. */
    failing: {
      location: failing.location,
      session: failing,
      what: `Turbidity never fell below 10 NTU across ${failing.purge.readings.length} readings and ${failing.purge.volumeText} purged.`,
      consequence:
        'Sampled anyway at the field officer’s judgement, and the record says so. Every metal result from this sample carries qualifier T — turbidity above the acceptance limit at collection — because a filtered metal from a turbid bore reads high and nobody can tell afterwards whether that was formation water or suspended sediment.',
    },
  };
})();

// W6-A-5: the QA/QC register's ST-1 row states the same failing purge this
// record derives, and its two numbers were typed copies — the drift mechanism
// this wave removed for the round countdown and the purge volumes. The row is
// declared long before the field round exists, so its detail is composed here,
// beside the source; the register row and the failing panel on `#purge` are
// now one sentence read twice.
QAQC.find((r) => r.id === 'ST-1').detail =
  `${PURGE.failing.what} Sampled at the field officer’s judgement.`;

/** What arrived at the laboratory, and in what condition. */
export const RECEIPT = {
  batch: 'PAS-WO-268841',
  courier: 'Pilbara Freight · consignment PF-2026-118420',
  dispatched: '2026-05-14 16:40 AWST',
  received: '2026-05-15 09:12 AWST',
  transit: '16 h 32 m',
  checks: [
    { what: 'Cooler temperature on arrival', found: '4.2 °C', limit: '≤ 6 °C', outcome: 'pass' },
    { what: 'Temperature blank present', found: 'yes', limit: 'required', outcome: 'pass' },
    { what: 'Custody seals intact', found: '2 of 2 intact', limit: 'all intact', outcome: 'pass',
      // W2-A-1: integrity and identity are different checks, and the identity
      // question lives on the chain — this row must say so, or two surfaces
      // disagree about custody, which is the exact failure claim B5 documents.
      note: 'Integrity passed. One seal number is in question — not the seal — and the question is held on the chain of custody.' },
    { what: 'Containers received against the chain of custody', found: '38 of 38', limit: 'all', outcome: 'pass' },
    { what: 'Preservation — nitric acid, dissolved metals', found: 'pH < 2 verified on 7 of 7', limit: 'pH < 2', outcome: 'pass' },
    { what: 'Headspace — VOC vials', found: 'n/a — no VOCs in this suite', limit: '—', outcome: 'n/a' },
    { what: 'Container integrity', found: '1 sulfate bottle cracked — WDL-26Q2-006', limit: 'none damaged', outcome: 'fail' },
    { what: 'Holding time remaining on receipt', found: 'nitrate 1 of 2 days used', limit: 'within window', outcome: 'warn' },
  ],
  consequence:
    'The cracked bottle is why MW09 is one result short, and it is recorded here rather than appearing later as an unexplained gap in the crosstab. The nitrate warning is why the holding-time failure that followed was foreseeable rather than a surprise.',
};

/**
 * The chain of custody for 2026-Q2-GW — the whole of it, not the laboratory end.
 *
 * `docs/GLOSSARY.md` has no entry for "eCOC" and one for **custody transfer**:
 * *one handover of a set of samples from one party to another, with the time,
 * both parties, and the seal on the container.* So the record below is a
 * sequence of transfers, and the screen that draws it is called Chain of
 * custody — the glossary's own words for what a practitioner calls a COC.
 *
 * Two properties come straight from that entry and are drawn rather than
 * asserted. **Transfers are ordered by an explicit sequence, not by time**:
 * two handovers can share a recorded minute, and a chain with a gap in its
 * sequence is visible where a chain ordered only by time silently closes over
 * the missing link. And **a break carries forward to the result it affected**.
 *
 * `onReceipt` marks the four hops the laboratory-end receipt screen has always
 * shown; `CUSTODY` below is derived from them rather than written twice, so
 * `#receipt` and `#ecoc` cannot drift on a name, a time or a seal number.
 */
export const CUSTODY_CHAIN = {
  id: 'MOCK-COC-2026Q2-014',
  round: '2026-Q2-GW',
  raisedBy: 'A. Nakamura',
  raisedAt: '2026-05-12 06:40 AWST',
  laboratory: 'Pilbara Analytical Services',
  workOrder: 'PAS-WO-268841',
  containers: 38,
  seals: '4471, 4472',
  state: 'received',
  /*
   * Container counts per sample sum to 38 — the same 38 the laboratory
   * reconciled on arrival ("38 of 38", RECEIPT above). Two screens, one
   * addition; if a sample is added here and the receipt is not, the total
   * printed on both stops agreeing and the drawing says so.
   */
  transfers: [
    { seq: 1, at: '2026-05-12 17:20 AWST', from: 'A. Nakamura — field', to: 'Wandalup site cold store', what: 'Day 1 — 10 containers from MW01A, MW03B and the trip blank, logged in at 3.8 °C', containers: 10, seal: '—', state: 'ok' },
    { seq: 2, at: '2026-05-13 17:05 AWST', from: 'A. Nakamura — field', to: 'Wandalup site cold store', what: 'Day 2 — 20 containers from MW05 and its field duplicate, MW07 and its field duplicate, the field blank and the equipment blank, at 4.0 °C', containers: 20, seal: '—', state: 'ok' },
    { seq: 3, at: '2026-05-14 15:50 AWST', from: 'Wandalup site cold store', to: 'A. Nakamura — field', what: '30 containers withdrawn for dispatch and reconciled against the record, joined by the 8 collected today', containers: 38, seal: '—', state: 'ok' },
    { seq: 4, at: '2026-05-14 16:20 AWST', from: 'A. Nakamura — field', to: 'A. Nakamura — vehicle esky', what: '38 containers sealed, seals 4471/4472', containers: 38, seal: '4471, 4472', state: 'ok', onReceipt: true },
    { seq: 5, at: '2026-05-14 16:40 AWST', from: 'A. Nakamura', to: 'Pilbara Freight — consignment PF-2026-118420', what: 'Cooler handed over, signed', containers: 38, seal: '4471, 4472', state: 'ok', onReceipt: true },
    { seq: 6, at: '2026-05-15 09:12 AWST', from: 'Pilbara Freight', to: 'Pilbara Analytical Services — receipt', what: 'Seals verified intact, 4.2 °C, 1 container cracked', containers: 38, seal: '4471, 4427', state: 'exception', onReceipt: true },
    { seq: 7, at: '2026-05-15 09:40 AWST', from: 'PAS receipt', to: 'PAS laboratory — work order PAS-WO-268841', what: 'Logged, subsampled, preserved', containers: 38, seal: '—', state: 'ok', onReceipt: true },
  ],
  /**
   * One seal number, written down twice, differently — and the product does
   * not choose (PP4).
   *
   * Both seals were found intact, which is a different check and it passed
   * (RECEIPT, "custody seals intact · 2 of 2"). What disagrees is the *number*
   * on the second seal: 4472 in the field record, 4427 on the laboratory's
   * receiving form. A digit transposition is the likeliest reading and the
   * likeliest reading is exactly what a custody challenge attacks, so it is
   * raised as a review item and neither number is overwritten.
   */
  discrepancy: {
    what: 'Seal number on the second cooler lid',
    field: '4472 — entered at 2026-05-14 16:20 AWST by A. Nakamura',
    laboratory: '4427 — entered at 2026-05-15 09:12 AWST by M. Toledo, PAS sample receipt',
    raisedAt: '2026-05-15 09:20 AWST',
    raisedBy: 'M. Toledo — PAS sample receipt',
    assignedTo: 'A. Nakamura',
    affects: 'Seal 4471 and the temperature check agree. Nothing about the containers is in doubt; the identity of one seal is.',
    state: 'open',
    ways: [
      { label: 'Ask the laboratory for the seal photograph', detail: 'PAS photographs every lid on receipt. The photograph settles it, and the answer is attributed to whoever read it.' },
      { label: 'Record the field entry as mis-keyed', detail: 'A correction supersedes; both numbers stay readable and the transfer keeps its original entry. Reversible, and attributed.' },
      { label: 'Record the laboratory entry as mis-keyed', detail: 'The same, from the other end — and it goes to PAS as a receiving-form correction rather than being changed here.' },
    ],
    refused: 'Reconcile them silently. Two records disagree; picking one and deleting the other is the act this screen exists to make impossible.',
  },
  /**
   * Where the chain does not stop — the subcontracted PFAS fraction.
   *
   * **New in wave 7 (PR-3a).** Building the provenance of the PFOS + PFHxS
   * result backwards from the bore hit a hop with no record: every one of the
   * 38 containers went to Pilbara Analytical Services and reconciled there,
   * and the certificate for the PFAS suite is **Yarra Regional's**. The only
   * reading under which both are true is the ordinary one — PAS is not
   * NATA-accredited to USEPA 1633 and subcontracts it — and a subcontract is
   * a **custody transfer** by the glossary's own definition: one handover of a
   * set of samples from one party to another, with the time, both parties and
   * the seal.
   *
   * So it is a chain of its own rather than two more rows on the one above,
   * because the transfers above are what the *field* chain covers and what the
   * laboratory signed for on arrival: appending to them would have moved the
   * "last four rows" the receipt screen draws and made a laboratory-to-
   * laboratory hop look like a field one. This chain has its own identifier,
   * its own parent, and its own receipt.
   */
  continues: {
    id: 'MOCK-COC-2026Q2-014-S1',
    parent: 'MOCK-COC-2026Q2-014',
    why: 'Pilbara Analytical Services holds no NATA scope for USEPA 1633. The PFAS fraction is subcontracted, and the subcontract laboratory issues its own certificate. One naming convention to read past: PAS-WO-268841 is the submission work order — the number the whole box travels under — and PAS also reports its metals run under it, so the same identifier names this bottle’s physical origin and the metals batch on the QA/QC screen. Yarra Regional issues its own batch, YAR-B-118420, which is why a PFAS result never cites the metals number.',
    laboratory: 'Yarra Regional Analytical',
    workOrder: 'YAR-B-118420',
    certificate: 'YAR-26-0881',
    /** One container: the HDPE bottle that made WDL-26Q2-003 a five-container sample. */
    sample: 'WDL-26Q2-003',
    containers: 1,
    transfers: [
      { seq: 1, at: '2026-05-15 14:05 AWST', from: 'PAS laboratory — work order PAS-WO-268841', to: 'Pilbara Freight — consignment PF-2026-118655', what: 'PFAS fraction of WDL-26Q2-003 — 1 HDPE bottle, unopened, subcontracted for USEPA 1633', containers: 1, seal: '5108', state: 'ok' },
      { seq: 2, at: '2026-05-16 08:55 AWST', from: 'Pilbara Freight', to: 'Yarra Regional Analytical — receipt', what: 'Seal 5108 verified intact, 4.4 °C, 1 of 1 container', containers: 1, seal: '5108', state: 'ok' },
    ],
    receipt: {
      at: '2026-05-16 08:55 AWST',
      temperature: '4.4 °C',
      limit: '≤ 6 °C',
      seal: '5108 — intact',
      reconciled: '1 of 1',
      by: 'K. Ashworth — Yarra Regional sample receipt',
      outcome: 'pass',
    },
    /*
     * The holding time this fraction was actually kept to, stated with its
     * rule rather than asserted as compliant. Collected 2026-05-13 08:40,
     * extracted 2026-05-17: four days against a 28-day window.
     */
    holding: {
      rule: 'USEPA 1633 — 28 days from collection to extraction, held ≤ 6 °C',
      collected: '2026-05-13 08:40 AWST',
      extracted: '2026-05-17',
      window: 28,
      used: 4,
    },
    /** Trip blank cover: the cooler this fraction travelled in, up to PAS. */
    travellingQC: 'WDL-26Q2-QC2',
  },
};

/** The four hops the laboratory-end receipt has always shown, derived not repeated. */
export const CUSTODY = CUSTODY_CHAIN.transfers
  .filter((t) => t.onReceipt)
  .map(({ at, from, to, what, state }) => ({ at, from, to, what, state }));

/**
 * How far the PFAS suite reached on 2026-Q2 — measured, decided, and recorded.
 *
 * ## The question, and why it stood for a wave
 *
 * Four surfaces described one fact and gave four answers. The batch said **4
 * samples**; the manifest gave the two extra PFAS tests to **one** sample; the
 * results grid carried a PFOS + PFHxS total at **6** locations; and the
 * `2026-Q2-PFAS` event said **4 samples and 1 control**. Wave 7 met the
 * disagreement while chaining the MW05 result to the records that produced it,
 * recorded it, and did not settle it — because settling it means deciding which
 * reading is true, and the cheapest reading empties cells of the one row
 * `#criteria` runs the non-detect rule over. That is a decision with a drawn
 * argument on the other end of it rather than a count to nudge.
 *
 * ## The measurement, taken before anything was drawn
 *
 * A PFAS result requires a bottle at Yarra Regional Analytical, so the test is:
 * **what material reached that laboratory, and what does every record of that
 * material say?** Three independent records answer, and they agree.
 *
 * 1. **The subcontract chain** `MOCK-COC-2026Q2-014-S1` is the only record of
 *    material crossing from Pilbara Analytical Services to Yarra Regional. It
 *    holds two transfers of **one container** each, names its sample
 *    (`WDL-26Q2-003`), carries seal 5108 through both hops, and ends in a
 *    receipt reconciled **1 of 1** by a named person at a recorded minute.
 *    There is no second chain, no second consignment and no second receipt.
 * 2. **The manifest** gives one sample of eleven **16 tests and 5 containers**
 *    where the round's others carry 14 and four; the two extra tests are the
 *    suite and the fifth container is the HDPE bottle that carried it. Ten rows
 *    do not have them.
 * 3. **The container count is closed.** The per-sample containers sum to 38 and
 *    the laboratory reconciled *38 of 38* on arrival. A PFAS bottle at each of
 *    the five other bores would have made 43. Two parties signed for 38.
 *
 * Nothing in the record contradicts them. The certificate's own deliverable
 * raises exactly one location question and it is MW-05; the lineage's source
 * step names two rows of one file for one bore; the snapshot that went to the
 * regulator holds *PFOS + PFHxS at MW05 and the eleven results that framed it*.
 *
 * ## The decision, against that evidence
 *
 * **The suite reached one sample.** The batch's 4 and the event's 4-and-1 are
 * counts with no material behind them, and the grid's six locations are
 * contradicted by every other reading — including the two that disagree with
 * each other. So the two counts are re-derived from the material record, and
 * the five censored cells are **withdrawn rather than re-valued**, because a
 * censored value is the laboratory's own notation for a result it produced and
 * there is nothing here to re-value them from. Inventing three more bottles,
 * three transfers and a second receipt to justify a summary row would put a
 * fabricated chain of custody in a system of record — a worse defect than the
 * one being fixed, and the same trade wave 14 refused over the licence trigger.
 *
 * What replaces them is the second kind of absence: the sample exists, the
 * analysis does not, and the cell says so in its own word rather than in the
 * dry column's.
 *
 * ## What survives, and it is the part that mattered
 *
 * MW05's analysis is the one every reading of the record agreed happened, and
 * nothing about it moves: 3.1 + 1.7 J = 4.8 ng/L, 37× the guideline value, the
 * TARP at Level 3, the statutory notification lodged. The demonstration on
 * `#criteria` keeps its rule, its four treatments and its arithmetic — and what
 * it now demonstrates is sharper than what it demonstrated before, because the
 * five rows it used to turn into passes under `zero` were results nobody
 * produced. A rule that manufactures compliance out of a non-detect is the
 * failure that screen was drawn to refuse; a table that manufactured it out of
 * an analysis that never ran is the same failure arriving through a worse door.
 *
 * ## Reversibility
 *
 * One record brings the five results back: a certificate from Yarra Regional
 * naming those samples, with the containers that carried them on a custody
 * transfer. It would restore the manifest rows, the batch count and the grid
 * cells through the machinery this record already reads — the withdrawal is a
 * statement about the evidence, not about the bores, and the evidence is the
 * thing that can change.
 */
export const PFAS_REACH = (() => {
  const analyte = 'PFOS + PFHxS';
  const row = CROSSTAB.find((r) => r.analyte === analyte);
  const sub = CUSTODY_CHAIN.continues;

  /* ---- what the material record says ---------------------------------- */
  const tally = new Map();
  for (const s of EVENT_SAMPLES) tally.set(s.tests, (tally.get(s.tests) ?? 0) + 1);
  const [standardTests, standardCount] = [...tally].sort((a, b) => b[1] - a[1])[0];
  const carriers = EVENT_SAMPLES.filter((s) => s.tests > standardTests);
  const carrier = carriers[0];
  const extraTests = carrier.tests - standardTests;
  const containers = EVENT_SAMPLES.reduce((n, s) => n + s.containers, 0);
  const reconciled = RECEIPT.checks.find((c) => c.what.startsWith('Containers received')).found;

  /* ---- what the grid draws, read back --------------------------------- */
  const at = (pick) => CROSSTAB_COLUMNS.filter((_, i) => pick(row.cells[i]));
  const locations = at((c) => !c.empty);
  const withdrawnLocations = at((c) => c.notAnalysed);
  const dry = at((c) => c.empty && !c.notAnalysed);
  const samplesByLocation = (code) => EVENT_SAMPLES.find((s) => s.location === code && s.qc === '—');

  /* The grid and the material record, checked against each other rather than
   * asserted to agree — the whole point of settling this from two directions. */
  const carrierLocations = carriers.map((s) => s.location);
  const agrees =
    locations.length === carrierLocations.length && locations.every((c) => carrierLocations.includes(c));

  /* ---- the deliverable, for corroboration ----------------------------- */
  const run = IMPORTS.find((i) => i.file.startsWith(sub.certificate));
  const source = LINEAGE.chain.find((s) => s.step === 'Source');
  const locationQuestion = REVIEW_ITEMS.find((r) => r.kind === 'Location identifier');

  /**
   * What each of the four surfaces said before this wave, typed once.
   *
   * Every before rendered anywhere in the catalogue for this settlement reads
   * from here. A before is a historical fact and it is written down exactly
   * once; everything else is counted off the record as it stands now.
   */
  const was = {
    batchSamples: 4,
    eventSamples: 4,
    eventQc: 1,
    gridLocations: 6,
    censoredCells: 5,
    components: 6,
    censored: 14,
    indeterminate: 11,
    results: 66,
    outcomes: 132,
    goldenIndeterminateRows: 11,
  };

  const readings = [
    {
      reading: 'The batch',
      at: 'batches',
      record: sub.workOrder,
      said: `${was.batchSamples} samples`,
      restsOn: 'A count on a summary row. No fourth bottle, no fourth manifest row, no fourth transfer, no fourth receipt.',
      now: `${carriers.length} sample`,
      verdict: 'corrected',
    },
    {
      reading: 'The manifest',
      at: 'events',
      record: carrier.id,
      said: `${carrier.tests} tests and ${carrier.containers} containers on ${carriers.length} sample of ${EVENT_SAMPLES.length}`,
      restsOn: `${standardCount} of ${EVENT_SAMPLES.length} rows carry ${standardTests} tests. The ${extraTests} extra are the suite; the fifth container is the HDPE bottle that carried it.`,
      now: 'unchanged — it was right',
      verdict: 'stands',
    },
    {
      reading: 'The results grid',
      at: 'crosstab',
      record: `${analyte} row`,
      said: `a derived total at ${was.gridLocations} locations`,
      restsOn: `${was.censoredCells} censored cells and one derived total. The derived total has a certificate, a batch and a chain behind it; the ${was.censoredCells} censored cells have none of the three.`,
      now: `${locations.length} location — ${locations.join(', ')}`,
      verdict: 'corrected',
    },
    {
      reading: 'The event',
      at: 'events',
      record: '2026-Q2-PFAS',
      said: `${was.eventSamples} samples and ${was.eventQc} control`,
      restsOn: 'No manifest, no chain and no certificate of its own. What it covers is the subcontracted fraction of one sample on the round beside it.',
      now: `${carriers.length} sample and 0 controls`,
      verdict: 'corrected',
    },
  ];

  const evidence = [
    {
      record: `Subcontract chain ${sub.id}`,
      at: 'ecoc',
      says: `${sub.transfers.length} transfers of ${sub.containers} container, sample ${sub.sample}, seal ${sub.transfers[0].seal} through both hops, receipt reconciled ${sub.receipt.reconciled} by ${sub.receipt.by}`,
      supports: 'one sample',
      grade: 'A custody transfer — the glossary’s own unit of who held what, when, under which seal',
    },
    {
      record: 'The round’s sample manifest',
      at: 'events',
      says: `${carriers.length} of ${EVENT_SAMPLES.length} samples carries ${carrier.tests} tests and ${carrier.containers} containers; the other ${EVENT_SAMPLES.length - carriers.length} carry ${standardTests} and fewer`,
      supports: 'one sample',
      grade: 'The record of what was collected, signed at the bore',
    },
    {
      record: 'The container reconciliation',
      at: 'receipt',
      says: `per-sample containers sum to ${containers} and the laboratory reconciled ${reconciled}; ${withdrawnLocations.length} more PFAS bottles would have made ${containers + withdrawnLocations.length}`,
      supports: 'one sample',
      grade: 'A physical count, agreed by two parties',
    },
    {
      record: `Deliverable ${sub.certificate} · ${run.id}`,
      at: 'import-review',
      says: `${source.what}; the run’s only location question is ${locationQuestion.subject} — ${locationQuestion.rows} results at one bore`,
      supports: 'one location',
      grade: 'The file the results arrived in, and the exceptions it raised',
    },
    {
      record: `Batch ${sub.workOrder}`,
      at: 'batches',
      says: `${was.batchSamples} samples`,
      supports: 'four samples',
      grade: 'A summary count with no material record behind it',
    },
    {
      record: 'Event 2026-Q2-PFAS',
      at: 'events',
      says: `${was.eventSamples} samples and ${was.eventQc} control`,
      supports: 'four samples and a control',
      grade: 'A register row with no manifest under it',
    },
  ];

  /** Every value this settlement moved, with what it was. */
  const moved = [
    { what: 'Batch YAR-B-118420 · samples', was: was.batchSamples, now: carriers.length, at: 'batches' },
    { what: 'Event 2026-Q2-PFAS · samples', was: was.eventSamples, now: carriers.length, at: 'events' },
    { what: 'Event 2026-Q2-PFAS · field QC', was: was.eventQc, now: 0, at: 'events' },
    { what: `${analyte} · locations with a total`, was: was.gridLocations, now: locations.length, at: 'crosstab' },
    { what: 'Grid · results', was: was.results, now: CROSSTAB_SHAPE.results, at: 'crosstab' },
    { what: 'Grid · censored values', was: was.censored, now: CROSSTAB_SHAPE.censored, at: 'crosstab' },
    { what: 'Grid · cells with no analysis', was: 0, now: CROSSTAB_SHAPE.notAnalysed, at: 'crosstab' },
    { what: 'Results that could not be assessed', was: was.indeterminate, now: INDETERMINATE.length, at: 'indeterminate' },
    { what: 'Evaluation outcomes carried by the export', was: was.outcomes, now: CROSSTAB_SHAPE.results * CRITERIA.length, at: 'exchange' },
    { what: 'Rows in the non-detect demonstration', was: was.components, now: locations.length, at: 'criteria' },
  ];

  return {
    analyte,
    decision: 'the suite reached one sample — five censored cells withdrawn, two counts re-derived',
    decidedOn: '2026-09-02',
    /* The counts the four surfaces now read. */
    samples: carriers.length,
    qc: 0,
    locations,
    withdrawnLocations,
    dry,
    cellsWithdrawn: withdrawnLocations.length,
    /* The material record. */
    sample: carrier,
    standardTests,
    standardCount,
    extraTests,
    containers,
    reconciled,
    wouldHaveNeeded: containers + withdrawnLocations.length,
    subcontract: sub,
    run,
    agrees,
    was,
    readings,
    evidence,
    moved,
    qcWhy:
      `The trip blank ${sub.travellingQC} covered this fraction only as far as ${CUSTODY_CHAIN.laboratory}, where it was analysed with the rest of the round. Nothing but the one bottle went on to ${sub.laboratory}, so no field control was run on the suite — which the batch’s own method blank, control sample and surrogate do not replace, because those are made at the bench and answer a different question.`,
    eventCovers:
      `The subcontracted PFAS fraction of ${carrier.id} — ${extraTests} tests on one bottle out of the round beside it, reported under ${sub.laboratory}’s own certificate ${sub.certificate}. It has a row of its own because a second laboratory issued a second certificate, and its sample is counted once, on the ${ROUND.code} manifest it was collected onto. This is an analysis, not a second collection.`,
    /** The sentence a withdrawn cell speaks, composed from the records above. */
    cellSentence(code) {
      const s = samplesByLocation(code);
      return (
        `not analysed — ${s.id} was collected at ${code}, sealed and reconciled at the laboratory, and the PFAS suite was never run on it. ` +
        `It carries ${s.tests} tests and ${s.containers} containers; ${carrier.id} is ${carriers.length === 1 ? 'the only' : `one of the ${carriers.length}`} sample of ${EVENT_SAMPLES.length} carrying ${carrier.tests} and ${carrier.containers}, and its fifth bottle is ${sub.containers === 1 ? 'the one container' : `one of the ${sub.containers} containers`} the subcontract chain moved to ${sub.laboratory}. ` +
        'So this cell is an absence of analysis, not a result below a limit of reporting, and not a pass. A censored value here would assert that a laboratory reported one.'
      );
    },
    /** What would bring the five results back. */
    reversal:
      `A certificate from ${sub.laboratory} naming those samples, with the containers that carried them on a custody transfer. It would restore the manifest rows, the batch count and the grid cells through the machinery this record already reads.`,
  };
})();

/**
 * QC acceptance criteria, versioned exactly as guideline values are.
 *
 * A guideline value gets an effective date, an applicability rule and a
 * version. "30% RPD" got a hard-coded number and no source at all — and a
 * regulator asking *why 30%* is asking the same question they ask about a
 * criterion. The machinery already existed; the QC limits were simply not put
 * through it.
 *
 * **The version pairing arrived with wave 6 (PR-2c).** "Re-run checks" has to
 * say against what, and where a newer set exists the screen has to say which
 * one the round was assessed under. `DQO` holds the pair; the rules below
 * carry the **2025.2** numbers — the ones every finding on 2026-Q2-GW was
 * raised against — and `next` on a rule is what 2026.1 changed it to. Two
 * rules moved, and one of them is why a finding stops needing a hydrogeologist
 * under the version that is current now.
 *
 * **Wave 16 moved the rows up into `DQO` and left this pointing at them.**
 * `rules` is `DQO.limits` — the same array object, so the row a finding names
 * and the row this screen prints cannot be two numbers that agree. What is
 * added here is the *reading* half: which words a matrix may be
 * (`MATRIX_WORDS`, the glossary's five, one source), how many limits each of
 * the five holds, and `resolve`, the one function that answers **which limit
 * judges this check on this matrix**. Everything that asks that question —
 * the soil field duplicate, the library's own gap row — calls it, so the
 * answer is one object rather than a sentence written twice.
 */
export const QC_LIMITS = (() => {
  /** The same array `DQO` holds. Not a copy: `QC_LIMITS.rules[0] === DQO.limits[0]`. */
  const rules = DQO.limits;

  /**
   * How many limits this set holds for each of the glossary's five.
   *
   * `accounted` is the closure check and it is printed rather than assumed: if
   * a row ever carried a sixth word, the five counts would stop summing to the
   * number of rows and the screen would say so instead of quietly dropping it.
   */
  const held = MATRIX_WORDS.map((matrix) => ({
    matrix,
    limits: rules.filter((r) => r.matrix === matrix),
  }));
  const accounted = held.reduce((n, h) => n + h.limits.length, 0);

  /**
   * Which limit judges a check on a given matrix, and by what right.
   *
   * Two outcomes and they are told apart, because the difference is the whole
   * of what a matrix dimension buys. `held: true` — the set holds a limit for
   * this matrix, and it is the one that applies. `held: false` — it does not,
   * and what judged the check is a limit written for a different material. The
   * second is not an error and it is not a silent default either: the record
   * carries the rule that was used *and* the matrix it was written for, and
   * every surface that prints a verdict prints both.
   *
   * It never invents a number. Where the set holds no limit for the check at
   * all, `rule` is null and the caller has nothing to judge against, which is
   * a different and louder absence.
   */
  const resolve = (check, matrix) => {
    const own = rules.find((r) => r.check === check && r.matrix === matrix);
    if (own) {
      return {
        check, matrix, rule: own, held: true, judgedBy: matrix,
        says: `${check} on ${matrix.toLowerCase()}: ${own.limit}, DQO ${own.version}, in force since ${own.since}.`,
      };
    }
    const other = rules.find((r) => r.check === check) ?? null;
    return {
      check, matrix, rule: other, held: false, judgedBy: other ? other.matrix : null,
      says: other
        ? `This set holds no ${check} limit for ${matrix.toLowerCase()}. What judged it is the ${other.matrix.toLowerCase()} one — ${other.limit}, DQO ${other.version}, in force since ${other.since} — because it is the only ${check} limit in the set.`
        : `This set holds no ${check} limit for any matrix, so there is nothing to judge against.`,
    };
  };

  return {
    set: DQO.set,
    version: DQO.used.version,
    effective: DQO.used.effective,
    basis: DQO.basis,
    dqo: DQO,
    used: DQO.used,
    current: DQO.current,
    rules,
    matrices: MATRIX_WORDS,
    held,
    accounted,
    resolve,
    /** How many rows moved in the current version, counted rather than stated in prose. */
    moved: rules.filter((r) => r.next).length,
    changed: 'Field duplicate RPD moved from 25% to 30% on 2025-07-01, and the 5 × LOR applicability rule was added in the same revision. Results evaluated before that date keep the limits in force then.',
    /**
     * Who quotes these limits, and how the quotation used to be spelled.
     *
     * Wave 16's second settlement, and the plainer of the two. Seven findings
     * and seven other sentences quote a number this set holds, and thirteen of
     * those fourteen had typed it — thirteen second sources for five figures,
     * two of them already drifting from the library's own spelling. They read
     * the row now. The entries below are the *befores*, one per limit rather
     * than one per sentence, because the change happened to the number and the
     * sentences merely carried it.
     *
     * Only the field duplicate needed this for the matrix work. Fixing it and
     * leaving its siblings typed beside a derived neighbour is the shape of
     * defect the last two audits found, so all of them moved together.
     */
    citedAs: [
      {
        check: 'Field duplicate RPD', moved: true,
        wasTyped: '“30%” and “a 30% limit”',
        where: 'FD-1 and FD-2 on the QA/QC workspace, the qualifier register, the near-limit card on this screen, and the round manifest’s QC linkage card',
      },
      {
        check: 'Laboratory duplicate RPD', moved: true,
        wasTyped: '“a 20% limit”',
        where: 'LD-1',
      },
      {
        check: 'Laboratory control sample recovery', moved: true,
        wasTyped: '“an 80–120% limit”',
        where: 'LCS-1',
      },
      {
        check: 'Matrix spike recovery', moved: true,
        wasTyped: '“a 70–130% limit”, “70–130%” and “the 70% limit”',
        where: 'MS-1, the propagation panel and its decision facts, the withdrawn propagation option’s reason, and the batch’s consequence sentence',
      },
      {
        check: 'Surrogate recovery — PFAS', moved: true,
        wasTyped: '“(limits 70–130%)”',
        where: 'SR-1',
      },
      {
        check: 'Cation–anion balance', moved: false,
        wasTyped: 'nothing — IB-1 already read the constant its own arithmetic is done with, and this row quotes that same string rather than restating it',
        where: 'IB-1 and the internal-consistency workspace',
      },
    ],
    /**
     * What stating the matrix did and did not do. Rendered, not only reasoned.
     */
    matrixNote: {
      what: `Every limit in this set states the matrix it was written for. All ${rules.length} read water.`,
      notAVersion:
        'A version governs a limit’s number, its population and its consequence, and none of the three moved. No verdict re-derives, no finding is re-judged and no version was created — the field was always true of these limits and had never been written down. Writing a limit for a second matrix would be a version change; stating the matrix of the ones already here is not.',
      whatMoved:
        'What moved is what a reader can see. A soil field duplicate is now visibly held to a limit written for water, where before the library was silent about matrix and the mismatch could only be read in a comment.',
      before:
        'Before: ten limits, each with a number, a population, a fallback and a source, and no field anywhere saying what material any of them was written for.',
    },
  };
})();

/** The laboratory batch — what a QC result actually covers. */
export const BATCHES = [
  {
    id: METALS_BATCH.id, lab: METALS_BATCH.laboratory, method: METALS_BATCH.method,
    samples: METALS_BATCH.samples, prepared: '2026-05-16', analysed: '2026-05-17', nata: 'In scope · 2377 site 1841',
    qc: [
      { kind: 'Method blank', id: 'MB-268841', result: 'All analytes < LOR', outcome: 'pass' },
      { kind: 'Laboratory control sample', id: 'LCS-268841', result: 'Recovery 96 – 104% across 8 analytes', outcome: 'pass' },
      { kind: 'Laboratory duplicate', id: 'LD-268841 (of WDL-26Q2-003)', result: 'Max RPD 4.1% (sulfate)', outcome: 'pass' },
      { kind: 'Matrix spike', id: 'MS-268841 (of WDL-26Q2-005)', result: 'Zinc recovery 62%', outcome: 'fail' },
      { kind: 'Matrix spike duplicate', id: 'MSD-268841', result: 'Zinc recovery 64% · RPD 3.2%', outcome: 'fail' },
    ],
    consequence:
      `Zinc matrix-spike recovery of 62% is below the ${lowerBound('Matrix spike recovery')}% limit and it is reproducible across the duplicate, so this is matrix interference rather than a one-off. Every zinc result in this batch — nine samples, including the MW05 exceedance at 31.6 µg/L — is qualified as biased low. A recovery below 100% biasing low means the true value is likely higher, so the exceedance stands and is if anything understated.`,
  },
  /*
   * ## SETTLED (wave 15) — 2 September 2026, on a record made 2 September 2026
   * (wave 7)
   *
   * The record is kept whole and the settled-note is at the end of it, because
   * a debt that vanishes when it is paid leaves nobody able to tell a settled
   * one from one that was never noticed.
   *
   * Its ledger tag — the found-and-deferred marker, dated 2 September 2026
   * (wave 7), owner unassigned — is **closed rather than quoted**, and it is
   * the only line of this record that moved. That marker is what a grep counts
   * as the ledger, so reproducing it inside the quotation would keep the ledger
   * reading four while three records stand; the heading above is what it
   * became. Everything the record *found* is below it, unedited:
   *
   * > Three surfaces disagree about how far the PFAS suite reached on this
   * > round, and all three predate wave 7. This batch states **4 samples**;
   * > `EVENT_SAMPLES` gives the two extra PFAS tests to **one** sample
   * > (WDL-26Q2-003, 16 tests and 5 containers where the round's others carry 14
   * > and 4); and `CROSSTAB` carries a PFOS + PFHxS total at **6** locations.
   * > The `2026-Q2-PFAS` event in `EVENTS` is a fourth reading again — a
   * > supplementary event of 4 samples and 1 control, collected on 13 May, which
   * > is the day MW05 and MW07 were visited.
   * >
   * > Wave 7 met it while chaining the PFAS result to the records that produced
   * > it (PR-3a) and did not reconcile it, deliberately. Reconciling means
   * > deciding which reading is true, and the cheapest of them — PFAS on MW05
   * > and MW07 only — empties four cells of the crosstab's PFAS row, which is
   * > the row `#criteria` runs its non-detect demonstration over and the one
   * > `NON_DETECT` computes four treatments across. That is a seed change with
   * > a drawn argument on the other end of it, not a count to nudge. The lineage
   * > chain names this batch and links it rather than restating its sample
   * > count, so nothing wave 7 drew rests on which reading wins.
   *
   * ## What closed it
   *
   * `PFAS_REACH`, above, holds the whole of it: the measurement (three
   * independent records of the material, all saying one bottle), the decision
   * (the suite reached one sample), the evidence table both readings are ranked
   * on, and the reversal that would bring the five withdrawn results back. This
   * batch's `samples` is a getter over it, so the count on this screen and the
   * count on the manifest are one number read twice rather than two numbers
   * that agreed until somebody edited one.
   *
   * **Two of wave 7's own estimates did not survive being measured.** It wrote
   * *three surfaces* and then named a fourth in its own last paragraph — the
   * event — so the disagreement was always four-way. And the cheapest reading
   * it anticipated, *PFAS on MW05 and MW07 only*, empties **four** cells; the
   * reading the evidence actually supports empties **five**, because nothing on
   * the record puts a PFAS bottle at MW07 either. Both corrections are carried
   * on the decision record where it renders.
   *
   * **What wave 7 protected is intact.** The lineage chain names this batch and
   * links it rather than restating its sample count, so nothing wave 7 drew
   * rests on which reading won — and nothing in that chain moved.
   */
  {
    id: 'YAR-B-118420', lab: 'Yarra Regional Analytical', method: 'USEPA 1633 — PFAS',
    get samples() { return PFAS_REACH.samples; },
    get wasSamples() { return PFAS_REACH.was.batchSamples; },
    prepared: '2026-05-16', analysed: '2026-05-17', nata: 'In scope · 14622',
    qc: [
      { kind: 'Method blank', id: 'MB-118420', result: 'All analytes < LOR', outcome: 'pass' },
      { kind: 'Laboratory control sample', id: 'LCS-118420', result: 'Recovery 91 – 108%', outcome: 'pass' },
      { kind: 'Surrogate (isotope-labelled)', id: 'M8PFOS', result: '94% on every sample', outcome: 'pass' },
    ],
    consequence: 'Nothing qualified. The PFAS exceedance carries no batch caveat.',
  },
];

/**
 * How a hardness-dependent criterion was actually arrived at.
 *
 * Three of the five metal exceedances at MW05 rest on a criterion that is a
 * *function of another measurement*. Neither incumbent shows the working —
 * ESdat applies conditional action levels, EQuIS emits an action-level code,
 * and both hand you the answer without the arithmetic. This is the derivation,
 * and it is the difference between an exceedance a regulator accepts and one
 * they send back.
 */
export const HARDNESS = {
  sample: 'WDL-26Q2-003 · MW05 · 2026-05-13',
  measured: { value: '412 mg/L as CaCO₃', source: 'Reported by the laboratory, not derived', method: 'APHA 2340C — EDTA titration', lor: '1 mg/L' },
  crossCheck: {
    calcium: '96.4 mg/L', magnesium: '41.2 mg/L',
    computed: '410.3 mg/L as CaCO₃',
    formula: '2.497 × Ca + 4.118 × Mg',
    agreement: '0.4% against the reported value — within the ±10% reconciliation limit',
    note: 'Reported and computed hardness agree, so the criterion below rests on a number two independent measurements support. Where they disagree by more than 10% the result is a review item, because the criterion inherits the error.',
  },
  cap: 'Capped at 400 mg/L. ANZG does not extrapolate the hardness relationship above that, so the criterion is computed at the cap rather than at 412 — the conservative direction, and it is stated rather than silently applied.',
  derived: [
    { analyte: 'Cadmium (filtered)', base: '0.2 µg/L at 30 mg/L', slope: '0.89', criterion: '0.54 µg/L', result: '< 1.0 µg/L', outcome: 'indeterminate', note: 'The LOR sits above the criterion, so the hardness adjustment does not rescue it.' },
    { analyte: 'Nickel (filtered)', base: '11 µg/L at 30 mg/L', slope: '0.85', criterion: '11 µg/L', result: '14.2 µg/L', outcome: 'exceedance', note: 'Exceeds at 1.3×.' },
    { analyte: 'Zinc (filtered)', base: '8.0 µg/L at 30 mg/L', slope: '0.85', criterion: '8.0 µg/L', result: '31.6 µg/L', outcome: 'exceedance', note: 'Exceeds at 4.0×, and the batch matrix spike says the true value may be higher.' },
  ],
  equation: 'criterion = base × (hardness ÷ 30) ^ slope, evaluated at the capped hardness of 400 mg/L as CaCO₃',
  ruleVersion: 'hardness-modified-tv v3 · bound to ANZG 2018 2018.1',
  whatIfWrong:
    'If hardness were 120 mg/L rather than 400, the zinc criterion would be 2.8 µg/L rather than 8.0 and the exceedance factor would be 11× rather than 4.0×. A criterion that moves by a factor of three on another analyte’s result is not a footnote.',
};

/**
 * The results that could not be assessed — a finding, not an absence.
 *
 * The exceedance register says these are "not on this register", which is
 * correct and leaves them nowhere. A documented incumbent failure is exactly
 * this state rendered as a pass; making it a register of its own is the
 * strongest form of the claim.
 */

/**
 * Background comparison and the derivation of a site-specific trigger value.
 *
 * At a mine this is the assessment. ANZG explicitly provides for site-specific
 * trigger values from a reference distribution, the data model already labels
 * MW12 background and MW01A/MW03B upgradient, and no screen did the comparison.
 */
export const BACKGROUND = {
  reference: 'MW12 (background) and MW01A, MW03B (upgradient) · 14 quarterly rounds each · 2023-01 to 2026-05',
  method: 'ANZG 2018 §3.1.4 — site-specific trigger value as the 80th percentile of the reference distribution, applied where a default guideline value is absent or demonstrably unrepresentative.',
  rows: [
    { analyte: 'Sulfate as SO₄', bg: '112 mg/L', p80: '148 mg/L', dg: 'none — no ANZG DGV', stv: '148 mg/L', mw05: '918 mg/L', verdict: '6.2× the site-specific trigger', basis: 'Derived — no default exists' },
    { analyte: 'Electrical conductivity', bg: '890 µS/cm', p80: '1,140 µS/cm', dg: 'Licence ≤ 2500 µS/cm', stv: '1,140 µS/cm', mw05: '3,410 µS/cm', verdict: '3.0× background, 1.4× the licence limit', basis: 'Both apply; the licence governs compliance' },
    { analyte: 'Arsenic (filtered)', bg: '2.1 µg/L', p80: '3.4 µg/L', dg: 'ANZG 13 µg/L', stv: 'not adopted', mw05: '28.4 µg/L', verdict: '8.4× background, 2.2× the DGV', basis: 'DGV applies — a default exists and is representative' },
    { analyte: 'Total hardness', bg: '128 mg/L', p80: '166 mg/L', dg: '—', stv: 'not a criterion', mw05: '412 mg/L', verdict: '2.5× background', basis: 'Context for the hardness-modified values' },
  ],
  inference:
    'Every parameter elevated at MW05 is elevated against background as well as against a guideline, and the signature — sulfate, EC and hardness together — is TSF seepage rather than natural variation. Two bores upgradient in the same unit show none of it.',
  caution:
    'The 80th percentile is computed over 42 reference results with two censored, using Kaplan–Meier rather than substitution. A site-specific trigger value derived by substituting half the limit of reporting would sit lower and manufacture exceedances.',
};

/**
 * Data quality assessment, against the objectives set before the round.
 *
 * **Wave 6 (PR-2): each dimension now says who settled the findings under it.**
 * A dimension's verdict rests on findings, and a reader asking "met with
 * exception — on whose word?" had nowhere to go. `findings` names the QA/QC
 * rows behind each row here, so the counts of *automatically dispositioned*,
 * *dispositioned by a person* and *still needing a decision* are read off
 * `QAQC` rather than typed beside it — and a dimension whose findings are not
 * all settled says so, which is the whole reason an assessment is written
 * after the checks and before the report.
 *
 * The representativeness figure was also wrong and is now computed: it read
 * "6 of 7 bores stabilised" over a round in which seven bores were planned,
 * **six were purged** and **five stabilised**. MW11 was never purged — it was
 * dry — so it could not have been in either half of that fraction.
 *
 * **Wave 16: the three dimensions that cite limits read them.** Precision,
 * accuracy and representativeness each restated numbers the objective set
 * holds — a second spelling of one figure, and one of them was already drifting
 * (`80–120%` here against `80 – 120%` there). Each reads `DQO.limits` now and
 * states the matrix the limit was written for, and each carries the sentence it
 * replaced (`DQO.matrixStated`, by `wasId`) in the cell where it renders. The
 * three that cite no limit are untouched, because deriving a dimension that
 * cites a criteria set from a QC library would be a worse answer than a typed
 * one.
 */
const dqaLimit = (check) => DQO.limitFor(check);
const DQA_ROWS = [
  {
    dim: 'Precision', measure: 'Field duplicate RPD, laboratory duplicate RPD',
    objective: `${dqaLimit('Field duplicate RPD').limit} field, ${dqaLimit('Laboratory duplicate RPD').limit} laboratory, above 5 × LOR · ${dqaLimit('Field duplicate RPD').matrix.toLowerCase()} limits`,
    wasId: 'dqa-precision',
    achieved: '1 of 15 field pairs outside — zinc at MW05, 38.2%', verdict: 'met with exception', findings: ['FD-1', 'FD-2', 'FD-3', 'LD-1'],
  },
  {
    dim: 'Accuracy', measure: 'LCS, matrix spike, surrogate recovery',
    objective: `${dqaLimit('Laboratory control sample recovery').limit} LCS, ${dqaLimit('Matrix spike recovery').limit} MS · ${dqaLimit('Matrix spike recovery').matrix.toLowerCase()} limits`,
    wasId: 'dqa-accuracy',
    achieved: 'LCS 96–104%. Zinc matrix spike 62% — below limit, reproducible', verdict: 'not met for zinc', findings: ['LCS-1', 'MS-1', 'SR-1', 'EB-1', 'MB-1', 'FB-1', 'TB-1', 'IB-1'],
  },
  {
    dim: 'Representativeness', measure: 'Field parameter stabilisation, purge records, sampling position',
    objective: `${dqaLimit('Field parameter stabilisation').limit} before collection · ${dqaLimit('Field parameter stabilisation').matrix.toLowerCase()} limit`,
    wasId: 'dqa-representativeness',
    achieved: 'REPRESENTATIVENESS', verdict: 'met with exception', findings: ['ST-1'],
  },
  { dim: 'Comparability', measure: 'Consistent methods, units and reporting limits across rounds', objective: 'No method change without a documented equivalence', achieved: 'Arsenic LOR stepped 5.0 → 1.0 µg/L at 2025-05 on a method change; recorded and drawn on the plate', verdict: 'met', findings: ['ET-1', 'SH-1', 'SH-2'] },
  { dim: 'Completeness', measure: 'Results received against results planned', objective: '≥ 95% of planned results usable', achieved: 'COMPLETENESS', verdict: 'not met', findings: ['HT-1', 'HT-2'] },
  { dim: 'Sensitivity', measure: 'Reporting limit against the applicable criterion', objective: 'LOR ≤ 0.5 × criterion for every assessed analyte', achieved: 'SENSITIVITY', verdict: 'not met', findings: ['LOR-1'] },
];

export const DQA = DQA_ROWS.map((d) => {
  const rows = d.findings.map((id) => QAQC.find((q) => q.id === id));
  const p = FIELD_ROUND.preflight;
  return {
    ...d,
    /*
     * Three of the six dimensions state a count, and a data-quality assessment
     * that types its own counts is the one document where that is least
     * defensible. All three are composed here from the registers that hold
     * them: the field round, the completeness rows and the unassessable
     * register.
     */
    achieved:
      d.achieved === 'REPRESENTATIVENESS'
        ? `${p.stabilised} of ${p.purges} bores purged stabilised; ${p.planned - p.purges} of ${p.planned} planned was not purged. MW09 turbidity never below 10 NTU`
        : d.achieved === 'COMPLETENESS'
          ? `${COMPLETENESS.received} of ${COMPLETENESS.planned} received, ${COMPLETENESS.received - QUARANTINE.filter((q) => q.state === 'held').length} usable — ${Math.round(((COMPLETENESS.received - QUARANTINE.filter((q) => q.state === 'held').length) / COMPLETENESS.planned) * 100)}%. ${COMPLETENESS.rows.find((r) => r.state === 'missing').location} dry on both visits — attempted, not missed`
          : d.achieved === 'SENSITIVITY'
            ? /*
               * Wave 15: this sentence named two analytes and counted both.
               * The PFAS half rested on five censored totals at bores whose
               * samples were never tested for the suite (`PFAS_REACH`), so the
               * dimension is cadmium's alone now — and it is composed from the
               * register rather than restated, so a sentence naming an analyte
               * the register no longer holds cannot survive the next change.
               */
              `${[...new Set(INDETERMINATE.map((i) => i.analyte))]
                .map((name) => {
                  const r = INDETERMINATE.find((i) => i.analyte === name);
                  return `${name.replace(' (filtered)', '')} LOR ${r.lor} against a ${r.criterion} criterion`;
                })
                .join(', and ')} — ${INDETERMINATE.length} results unassessable (was ${PFAS_REACH.was.indeterminate}, ${PFAS_REACH.was.indeterminate - INDETERMINATE.length} of them PFAS totals withdrawn as not analysed)`
            : d.achieved,
    rows,
    settled: {
      total: rows.length,
      automatic: rows.filter((q) => q.concept === 'automatic').length,
      byPerson: rows.filter((q) => q.state === 'dispositioned' && q.concept === 'decision').length,
      reviewed: rows.filter((q) => q.state === 'reviewed').length,
      open: rows.filter((q) => q.state === 'unresolved').length,
      who: [
        ...new Set(
          rows
            .map((q) => q.disposition?.by ?? q.review?.by ?? (q.concept === 'automatic' ? `${q.rule.name} · ${q.rule.version}` : null))
            .filter(Boolean),
        ),
      ],
    },
  };
});

/**
 * How the bore was built, and on whose survey its levels stand.
 *
 * **New in wave 7 (PR-3a).** The provenance of a groundwater result begins at
 * the bore, and until now the only place this construction existed was inside
 * the bore-log renderer as literals — a drawing with no record behind it, so a
 * lineage step naming the screened interval had nothing to link to. The record
 * is here now, the plate reads it, `#location` reads it, and the chain links
 * it: one source, drawn three ways.
 *
 * The vocabulary is the glossary's own and nothing here is invented beside it:
 * **bore** (the construction at a location, not the location), **screened
 * interval** (the slotted section, and therefore the depth range and the
 * aquifer a sample represents), **casing** and **casing component** (blank
 * casing, sump — the screen is deliberately not a member), **casing material**
 * (a data-quality fact, not an inventory one: steel contributes zinc),
 * **annulus** and **annulus material** (filter pack, bentonite seal, cement
 * grout, concrete pad — without a seal above the pack the screen does not
 * monitor the unit it claims to), **hydrostratigraphic unit**, and **location
 * survey** with its **survey epoch**.
 *
 * Every number that also lives on `LOCATIONS` is read from there rather than
 * repeated: the screened interval, the top-of-casing elevation, the position
 * and the unit. What is added is what only a construction record knows.
 */
export const CONSTRUCTION = (() => {
  const bores = {
    MW05: {
      id: 'MOCK-BORE-MW05',
      drilled: '2019-04-11',
      driller: 'Pilbara Drilling Services · rig PDS-04',
      method: '150 mm mud rotary',
      purpose: 'Groundwater monitoring — TSF downgradient compliance',
      totalDepth: 24.0,
      casing: [
        { component: 'Blank casing', from: 0, to: 12.0, material: '50 mm Class 18 uPVC' },
        { component: 'Screened interval', from: 12.0, to: 18.0, material: '50 mm uPVC, 0.4 mm slot' },
        { component: 'Sump', from: 18.0, to: 19.0, material: '50 mm Class 18 uPVC, capped' },
      ],
      annulus: [
        { from: 0, to: 0.5, material: 'Concrete pad' },
        { from: 0.5, to: 9.0, material: 'Cement grout' },
        { from: 9.0, to: 10.5, material: 'Bentonite seal' },
        { from: 10.5, to: 19.5, material: 'Filter pack — 1–2 mm washed silica' },
        { from: 19.5, to: 24.0, material: 'Natural collapse' },
      ],
      strata: [
        { from: 0, to: 3.2, name: 'Sand, aeolian', pattern: 'dots' },
        { from: 3.2, to: 9.6, name: 'Clayey sand', pattern: 'dash' },
        { from: 9.6, to: 19.4, name: 'Weathered granite', pattern: 'cross' },
        { from: 19.4, to: 24, name: 'Fresh granite', pattern: 'brick' },
      ],
      /*
       * The bitemporal half (ADR-0015). A resurvey takes effect from its own
       * epoch and moves nothing behind it, which is why the elevation on the
       * location register is the *current* one and a 2022 water level still
       * reduces through the 2019 datum. `LOCATIONS` holds the current figure;
       * `SURVEYS` holds the history that makes it mean something — read here
       * rather than copied, since wave 14 the monthly hydrograph reduces
       * through the same history once a month and the logger series once an
       * hour, and three copies of a datum is three chances to disagree.
       */
      surveys: SURVEYS.MW05,
      says:
        'The screen sits wholly within the weathered granite, below a bentonite seal at 9.0–10.5 m. A sample from this bore represents the superficial aquifer at 12–18 metres and nothing above it, which is the claim every result from MW05 is interpreted under.',
    },
  };
  const of = (code) => {
    const b = bores[code];
    if (!b) return null;
    const loc = LOCATIONS.find((l) => l.code === code);
    const screen = b.casing.find((c) => c.component === 'Screened interval');
    const survey = b.surveys[0];
    return {
      ...b,
      code,
      unit: loc.unit,
      position: loc.position,
      easting: loc.easting,
      northing: loc.northing,
      /** The register's interval, read rather than restated. */
      screen: loc.screen,
      screenFrom: screen.from,
      screenTo: screen.to,
      slot: screen.material,
      /** Current top of casing, and the survey it came from. */
      toc: loc.toc,
      tocFrom: survey.epoch,
      surveys: b.surveys,
      rounds: 38,
    };
  };
  return { of, codes: Object.keys(bores) };
})();

/**
 * The whole provenance of one number — **beginning at the bore** (PR-3a).
 *
 * The practitioner review's strongest word on this screen was that the chain
 * *starts too late*: "one result, and everything that produced it" opened on
 * the laboratory's CSV, and for a groundwater result the account a
 * hydrogeologist has to be able to give runs location and version → bore and
 * screen construction → programme → field event → field measurements and
 * stabilisation → sample → filtration and preservation → custody transfer →
 * laboratory receipt → analytical batch, method and QC → laboratory result →
 * import → derivation → evaluation → downstream use. "The other screens
 * already hold most of this — the lineage should stitch it together."
 *
 * So it is stitched, and **nothing below is retyped**. Every upstream hop
 * reads the record that owns it — `LOCATIONS`, `CONSTRUCTION`, `FIELD_ROUND`,
 * `EVENT_SAMPLES`, `CUSTODY_CHAIN`, `RECEIPT`, `BATCHES` — and the downstream
 * half is `LINEAGE.chain`, unchanged and appended rather than copied. A hop
 * whose text disagrees with its screen is then not a thing that can happen
 * without the screen disagreeing with itself first.
 *
 * The subject is the **PFAS** result, so it is chained to the records that
 * actually produced it: certificate YAR-26-0881, batch YAR-B-118420 and the
 * subcontract custody hop that got the bottle to Yarra Regional. The metals
 * batch is not in it. Bolting `PAS-WO-268841` onto a PFAS result because it
 * is the batch this seed talks about most would be the exact error the chain
 * exists to make impossible.
 */
export const PROVENANCE = (() => {
  const session = FIELD_ROUND.sessions.find((s) => s.location === 'MW05' && s.purge);
  const bore = CONSTRUCTION.of('MW05');
  const day = FIELD_ROUND.days.find((d) => d.n === session.day);
  const sample = EVENT_SAMPLES.find((s) => s.id === session.samples[0]);
  const duplicate = EVENT_SAMPLES.find((s) => s.parent === sample.id);
  const fieldBlank = EVENT_SAMPLES.find((s) => s.id === 'WDL-26Q2-QC1');
  const tripBlank = EVENT_SAMPLES.find((s) => s.id === CUSTODY_CHAIN.continues.travellingQC);
  const equipBlank = EVENT_SAMPLES.find((s) => s.id === 'WDL-26Q2-QC3');
  const sub = CUSTODY_CHAIN.continues;
  const subReceipt = sub.receipt;
  const batch = BATCHES.find((b) => b.id === sub.workOrder);
  const cooler = RECEIPT.checks.find((c) => c.what === 'Cooler temperature on arrival');
  const reconciled = RECEIPT.checks.find((c) => c.what.startsWith('Containers received'));
  const p = session.purge;

  /** One upstream hop: the record it reads, and the screen that owns it. */
  const upstream = [
    {
      step: 'Location, and the version in force',
      what: `${bore.code} · ${bore.position} · ${bore.unit} unit · ${PROJECT.crs} ${bore.easting}E ${bore.northing}N`,
      detail: `Top of casing ${bore.toc.toFixed(2)} m AHD, established by the ${bore.surveys[0].reason.toLowerCase()} of ${bore.tocFrom} — the datum in force on the day this sample was taken. The ${bore.surveys[1].epoch} survey stands for readings before it and was not replaced by the later one, so a 2022 water level still reduces through the datum it was measured against (ADR-0015).`,
      kind: 'place', at: 'location', node: bore.code, nodeSub: 'location · datum in force',
    },
    {
      step: 'Bore and screened interval',
      what: `${bore.id} · screened ${bore.screen} · ${bore.slot}`,
      detail: `${bore.method}, drilled ${bore.drilled} by ${bore.driller}. ${bore.says} Bentonite seal ${bore.annulus.find((a) => a.material === 'Bentonite seal').from.toFixed(1)}–${bore.annulus.find((a) => a.material === 'Bentonite seal').to.toFixed(1)} m above a filter pack, and uPVC casing throughout — which is also why a zinc result from this bore is not read against a steel-cased one.`,
      kind: 'place', at: 'location', node: 'Screen 12–18 m', nodeSub: 'weathered granite',
    },
    {
      step: 'Programme and round',
      what: `${FIELD_ROUND.programme} · ${FIELD_ROUND.round} · window ${FIELD_ROUND.window}`,
      detail: `The quarterly groundwater programme, resolved in ${PROJECT.timezone}: the window is what decides which round a sample satisfies, and a sample collected at 08:00 on 1 April local time belongs to the June quarter rather than this one (G-41b).`,
      kind: 'plan', at: 'programme', node: FIELD_ROUND.round, nodeSub: 'quarterly round',
    },
    {
      step: 'Field event and bore session',
      what: `${day.label} · arrived ${session.arrived} · ${FIELD_ROUND.crew} · ${FIELD_ROUND.device}`,
      detail: `Disposition ${FIELD_ROUND.disposition(session.disposition).label.toLowerCase()}. Condition on arrival: ${session.condition} Captured ${session.captured} on the device and on the record at ${session.synced} — two timestamps, because they answer different questions.`,
      kind: 'field', at: 'field-capture', node: 'Bore session', nodeSub: `${FIELD_ROUND.crew} · ${day.date}`,
    },
    {
      step: 'Field measurements and stabilisation',
      what: `${p.method} · ${p.pump} at ${p.intake} · ${p.rateText} · ${p.volumeText} purged`,
      detail: `${p.verdict} Drawdown ${session.drawdown}. Depth to water ${session.depthToWater.toFixed(2)} m below ${session.measuringPoint.toLowerCase()}, dipped before the pump went down. Every reading is on the record with the parameters that were holding at it, so “stabilised” names its evidence rather than asserting itself.`,
      kind: 'field', at: 'purge', node: `Stabilised ${p.stabilisedAt}`, nodeSub: `${p.readings.length} readings`,
    },
    {
      step: 'Sample',
      what: `${sample.id} · collected ${sample.collected} · ${sample.depth} · ${sample.containers} containers · ${sample.tests} tests`,
      detail: `The PFAS suite is the reason this sample carries ${sample.containers} containers where the round's others carry four, and ${sample.tests} tests where the others carry ${duplicate.tests}. Its blind field duplicate ${duplicate.id} was filled at the same minute from the same pump and went to the laboratory unmarked, which is the only way a duplicate answers anything.`,
      kind: 'field', at: 'events', node: sample.id, nodeSub: `${sample.collected.replace(' AWST', '')}`,
    },
    {
      step: 'Filtration and preservation',
      what: session.filtration,
      detail: `${session.preservation}. The 0.45 µm capsule is the dissolved-metals train; the PFAS bottle was filled direct and unfiltered, and the record says PTFE was kept out of the train because PTFE is itself a fluoropolymer and would answer the question the sample was taken to ask.`,
      kind: 'field', at: 'field-capture', node: 'Unfiltered · HDPE', nodeSub: 'no PTFE in the train',
    },
    {
      step: 'Field quality control collected with it',
      what: `${fieldBlank.id} · ${fieldBlank.qc.toLowerCase()}, poured at this bore at ${fieldBlank.collected.replace('2026-05-13 ', '').replace(' AWST', '')} · ${equipBlank.id} · ${equipBlank.qc.toLowerCase()} · ${tripBlank.id} · ${tripBlank.qc.toLowerCase()}`,
      detail: `The field blank belongs to this visit because it was poured inside it; the equipment blank belongs to the next one, because the pump was rinsed at the vehicle on the way to MW07. The trip blank travelled in the cooler ${tripBlank.detail.replace('The cooler — travelled with the samples, ', '')} and never met the ground — which is what makes it the control for anything the transport introduced.`,
      kind: 'field', at: 'events', node: '3 field controls', nodeSub: 'field · equipment · trip',
    },
    {
      step: 'Custody transfer',
      what: `${CUSTODY_CHAIN.id} · ${CUSTODY_CHAIN.transfers.length} transfers · ${CUSTODY_CHAIN.containers} containers · seals ${CUSTODY_CHAIN.seals}`,
      detail: `Raised by ${CUSTODY_CHAIN.raisedBy} at ${CUSTODY_CHAIN.raisedAt}, before the first container was filled. Transfers run 1 to ${CUSTODY_CHAIN.transfers.length} with no gap in the sequence. One thing is open and it is carried forward rather than closed over: ${CUSTODY_CHAIN.discrepancy.what.toLowerCase()} reads ${CUSTODY_CHAIN.seals.split(', ')[1]} in the field record and 4427 on the laboratory's receiving form, and neither number has been overwritten.`,
      kind: 'custody', at: 'ecoc', node: CUSTODY_CHAIN.id, nodeSub: `${CUSTODY_CHAIN.transfers.length} transfers`,
    },
    {
      step: 'Laboratory receipt',
      what: `${RECEIPT.batch} · ${CUSTODY_CHAIN.laboratory} · received ${RECEIPT.received} · ${cooler.found} · ${reconciled.found} containers`,
      detail: `Transit ${RECEIPT.transit}. Cooler at ${cooler.found} against a limit of ${cooler.limit}; seals intact; preservation verified. One container arrived cracked and it was the sulfate bottle from ${QUARANTINE[1].subject.split(' · ')[1]}, not this sample — which is why MW09 is a result short and this bore is not.`,
      kind: 'lab', at: 'receipt', node: `${cooler.found} on arrival`, nodeSub: RECEIPT.received.replace(' AWST', ''),
    },
    {
      step: 'Subcontracted analysis, and its own custody',
      what: `${sub.id} · ${CUSTODY_CHAIN.laboratory} → ${sub.laboratory} · ${sub.containers} container · seal ${sub.transfers[0].seal}`,
      detail: `${sub.why} Received ${subReceipt.at} at ${subReceipt.temperature} against ${subReceipt.limit}, seal ${subReceipt.seal}, ${subReceipt.reconciled}, by ${subReceipt.by}. Holding time ${sub.holding.rule}: collected ${sub.holding.collected}, extracted ${sub.holding.extracted} — ${sub.holding.used} of ${sub.holding.window} days used.`,
      kind: 'custody', at: 'ecoc', node: sub.laboratory, nodeSub: `${sub.holding.used} of ${sub.holding.window} days`,
    },
    {
      step: 'Analytical batch, method and batch QC',
      /*
       * Wave 15: the count moved from 4 to 1 and the noun had to move with it.
       * This read "1 samples" for as long as it took to grep the settlement's
       * own blast radius — a plural typed beside a number that was never going
       * to be 1 until the day it was.
       */
      what: `${batch.id} · ${batch.method} · ${batch.samples} sample${batch.samples === 1 ? '' : 's'} · prepared ${batch.prepared}, analysed ${batch.analysed} · NATA ${batch.nata}`,
      detail: `${batch.qc.map((q) => `${q.kind} ${q.outcome}`).join(' · ')}. ${batch.consequence} A control sample applies to a batch and not to a sample, which is why “which results does this qualify” has an answer here and nowhere else.`,
      kind: 'lab', at: 'batches', node: batch.id, nodeSub: 'batch QC clear',
    },
  ];

  /**
   * Wave 19 — the hop the chain did not have, at the end rather than in the
   * middle.
   *
   * §9.5 asks every analysis to be traceable *Query → included
   * observations/results → QA/QC state → analytical settings → output*, and
   * this chain ran from the deliverable to the consequence with **no query or
   * dataset node in it at all** — which is why that requirement's first link
   * had nothing to attach to. It is appended after the consequence rather than
   * spliced before it, deliberately: the TARP level and the statutory
   * notification follow from the *evaluation*, and a hop inserted between them
   * would draw a causal link that does not exist. What follows the consequence
   * is the other thing this value went on to be — a member of populations, and
   * whatever those populations are cited by.
   *
   * `LINEAGE.chain` itself is untouched. It is the slide-over panel's array as
   * well as this page's, the panel's subtitle counts it in words, and this hop
   * belongs to the page that draws the whole provenance rather than to the
   * panel that answers one number in place.
   *
   * Every count in it is computed by `SAVED_VIEWS.membershipOf`, which returns
   * three answers rather than two: in, out, and **cannot be resolved**.
   */
  const datasetHop = (() => {
    const subject = { location: LINEAGE.location, analyte: LINEAGE.analyte };
    const membership = SAVED_VIEWS.membershipOf(subject);
    const inside = membership.filter((m) => m.verdict === 'in');
    const unresolved = membership.filter((m) => m.verdict === 'unresolved');
    /* `feeds` resolves through `REPORT_ITEMS`, which is declared below this
     * object, so everything that reads it is a getter — the same reason the
     * dataset record's own `feeds` is one. */
    return {
      step: 'Populations that carry it forward',
      subject, membership, inside, unresolved,
      get cited() { return inside.flatMap((m) => m.view.feeds); },
      get what() {
        return `A member of ${inside.length} of ${membership.length} datasets · ${unresolved.length} cannot be resolved · ${this.cited.length} report items cite the one that does`;
      },
      get detail() {
        const cited = this.cited;
        return `${inside.map((m) => m.view.name).join(', ')} selects ${subject.location} and names ${subject.analyte}, and this value is in it at v${SAVED_VIEWS.versionOf(inside[0].view)}. ` +
          `${unresolved.map((m) => m.view.name).join(', ')} selects the same bore and names an analyte suite by size, so whether this value is inside it cannot be resolved from the record — which is stated rather than assumed in either direction. ` +
          (cited.length === 0
            ? 'Nothing cites the dataset that does contain it, so §15’s chain runs Result → Query here and stops: the next link is a figure, and no figure is drawn on this population.'
            : `${cited.length} report items cite it, each bound to the version it named.`);
      },
      kind: 'population',
      at: 'saved-views',
      get node() { return `${inside.length} of ${membership.length} datasets`; },
      get nodeSub() { return `${unresolved.length} unresolvable · ${this.cited.length} cited`; },
    };
  })();

  /**
   * Wave 21 — the analysis hop, appended after the dataset hop.
   *
   * §9.5's chain is *query → included results → QA/QC state → analytical
   * settings → output*, and §15 requires it traversable in **both**
   * directions. Wave 19 gave this value the populations it is a member of;
   * this is the next link — the analyses that read those populations, and what
   * each one did with it. It sits after the dataset hop for the same reason
   * that one sits after the consequence: it is what the value *went on to be
   * read by*, not what produced it, and a hop spliced earlier would draw a
   * causal link the record does not hold.
   *
   * Everything here resolves through `ANALYSES`, which is declared below this
   * object, so every field a reader sees is a getter — the same arrangement
   * the dataset hop already uses for `feeds`.
   */
  const analysisHop = {
    step: 'Analyses that read it',
    get subject() { return { location: LINEAGE.location, analyte: LINEAGE.analyte }; },
    get membership() { return ANALYSES.membershipOf(this.subject); },
    get inside() { return this.membership.filter((m) => m.in); },
    get what() {
      const m = this.membership;
      const inside = this.inside;
      return `Read by ${inside.length} of ${m.length} analyses · ${inside.map((x) => x.analysis.name).join(', ')}`;
    },
    get detail() {
      const inside = this.inside;
      if (inside.length === 0) return 'No analysis on the register reads this value.';
      const a = inside[0].analysis;
      const qa = a.qa;
      return `${a.name} reads it as one of ${a.population.what}, and its output is ${a.output}. ` +
        `The analysis froze the quality state of its population as ${qa.entries.length} findings, ${qa.open.length} of them still open and ` +
        `${qa.proposed.length} carrying a qualifier that is proposed and unapplied over ${qa.proposedResults} results — which are inside the population and said to be, because a proposal is not an assertion in either direction (D10). ` +
        `${a.computedAt ? `It records when it ran: ${a.computedAt}.` : 'It records no computation moment, so the state above is what the register reads today under a field that would be frozen — and one member of this population has already been superseded since.'}`;
    },
    kind: 'analysis',
    at: 'analysis',
    get node() { return `${this.inside.length} of ${this.membership.length} analyses`; },
    get nodeSub() { return this.inside.length ? this.inside[0].analysis.name : 'none read it'; },
  };

  const chain = [...upstream, ...LINEAGE.chain, datasetHop, analysisHop];

  /**
   * The review's own question list, each answered from the chain by link.
   *
   * This is the acceptance test written down where it can be read: a chain
   * that cannot answer these is a longer chain, not a better one.
   */
  const questions = [
    { q: 'Which bore?', a: `${bore.code} — ${bore.position}, ${bore.unit} unit, ${bore.id}`, at: 'location', step: 'Location, and the version in force' },
    { q: 'Which screened interval?', a: `${bore.screen} below ground, ${bore.slot}, wholly within weathered granite`, at: 'location', step: 'Bore and screened interval' },
    { q: 'Who sampled it, and when?', a: `${FIELD_ROUND.crew}, ${sample.collected}, on ${FIELD_ROUND.device}`, at: 'field-capture', step: 'Field event and bore session' },
    { q: 'Did it stabilise before collection?', a: `${p.stabilised ? `Yes — ${p.stabilisedAt}, eight minutes before collection` : 'No'}, on ${p.readings.length} readings and ${p.volumeText}`, at: 'purge', step: 'Field measurements and stabilisation' },
    { q: 'Was it filtered?', a: 'Not this fraction. The 0.45 µm in-line capsule was the dissolved-metals train; the PFAS bottle was filled direct', at: 'field-capture', step: 'Filtration and preservation' },
    { q: 'How was it preserved?', a: 'HDPE, no preservative, no PTFE anywhere in the train', at: 'field-capture', step: 'Filtration and preservation' },
    { q: 'Who held it, and was the chain unbroken?', a: `${CUSTODY_CHAIN.transfers.length} transfers with no gap in the sequence, plus ${sub.transfers.length} on the subcontract — one seal number in dispute, both readings kept`, at: 'ecoc', step: 'Custody transfer' },
    { q: 'What temperature did it arrive at?', a: `${cooler.found} at ${CUSTODY_CHAIN.laboratory} (${cooler.limit}); ${subReceipt.temperature} at ${sub.laboratory} (${subReceipt.limit})`, at: 'receipt', step: 'Laboratory receipt' },
    { q: 'Was it inside its holding time?', a: `${sub.holding.used} of ${sub.holding.window} days — ${sub.holding.rule}`, at: 'qc', step: 'Subcontracted analysis, and its own custody' },
    { q: 'What quality control travelled with it?', a: `${fieldBlank.id} field blank poured at the bore, ${tripBlank.id} trip blank in the cooler, ${equipBlank.id} rinsate from the pump, and blind field duplicate ${duplicate.id}`, at: 'events', step: 'Field quality control collected with it' },
  ];

  /**
   * The same hops, as the compact upstream/downstream view (PR-3c).
   *
   * The review was explicit about what this is not: *"don't replace the
   * narrative with a giant technical DAG."* So the narrative stays the
   * default and this is the second reading of the **same structure** — no
   * second list, no second set of labels. What it shows that a line cannot is
   * the **fork**: a derived total has two inputs which share every upstream
   * hop and separate only at the bench, and a chain drawn as one column
   * silently implies that PFHxS came out of PFOS.
   *
   * It is drawn in the document rather than as a plate. It is not a figure and
   * it is not an addition to the twelve — there is no scale, no axis and
   * nothing measured in it, so the frozen chart grammar is not engaged.
   */
  const trace = {
    upstream: upstream.map((s) => ({ label: s.node, sub: s.nodeSub, at: s.at, kind: s.kind, step: s.step })),
    fork: LINEAGE.chain
      .filter((s) => s.kind === 'input')
      .map((s) => ({ label: s.what.split(' · ')[0], sub: s.what.split(' · ').slice(1).join(' · '), at: 'certificate', kind: 'input', step: s.step })),
    rule: { label: 'sum-pfas-anzg v2.1', sub: 'non-detect treatment: exclude', at: 'criteria', kind: 'rule', step: 'Derivation' },
    focus: { label: LINEAGE.value, sub: `${LINEAGE.analyte} · ${LINEAGE.location}`, at: 'crosstab', kind: 'derived', step: 'Derived result' },
    downstream: [
      { label: 'ANZG 2018 · 37×', sub: 'exceedance, evaluated on commit', at: 'exceedances', kind: 'evaluation', step: 'Evaluation' },
      { label: 'TARP Level 3', sub: 'in force since 2026-05-22', at: 'tarp', kind: 'consequence', step: 'Consequence' },
      { label: 'DWER-N-2026-11842', sub: 'notification lodged', at: 'notification', kind: 'consequence', step: 'Consequence' },
      { label: 'Report §5', sub: 'exceedance register, Table 5.1', at: 'report', kind: 'consequence', step: 'Consequence' },
      /* Wave 19 — the same hop the narrative gained, composed from the same
       * object rather than described a second time, so it cannot appear in
       * one reading of the chain and not the other. */
      { get label() { return datasetHop.node; }, get sub() { return datasetHop.nodeSub; }, at: datasetHop.at, kind: datasetHop.kind, step: datasetHop.step },
      /* Wave 21 — the same hop again, composed from the same object. */
      { get label() { return analysisHop.node; }, get sub() { return analysisHop.nodeSub; }, at: analysisHop.at, kind: analysisHop.kind, step: analysisHop.step },
    ],
  };

  return {
    value: LINEAGE.value,
    analyte: LINEAGE.analyte,
    location: LINEAGE.location,
    collected: LINEAGE.collected,
    sample: sample.id,
    certificate: sub.certificate,
    chain,
    upstream,
    downstream: [...LINEAGE.chain, datasetHop, analysisHop],
    datasetHop,
    analysisHop,
    questions,
    trace,
    /*
     * The hops every result on this sample shares, and the ones only the PFAS
     * fraction took. `#result-detail`'s subject — cadmium on WDL-26Q2-003 —
     * came out of the same bottle as the PFAS total: same bore, same session,
     * same purge, same custody, same cooler. The two part at the bench, where
     * one fraction went to a subcontract laboratory and the other stayed in
     * the metals batch. So the result page reads the shared prefix from here
     * rather than holding its own copy of it, and states where the two chains
     * diverge instead of implying they never met.
     */
    boreToBench: upstream.slice(0, upstream.findIndex((x) => x.step.startsWith('Subcontracted'))),
    pfasOnly: upstream.slice(upstream.findIndex((x) => x.step.startsWith('Subcontracted'))),
  };
})();

/**
 * A bore nest — the vertical dimension the register flattened.
 *
 * The standing level, the head and the gradient are **read off the round**
 * rather than typed beside it (wave 14). They were three literals that
 * happened to be right — `11.42`, `203.40` and `+0.86 m` — and a containment
 * argument resting on a difference of 0.86 m is the last place in this
 * catalogue that should hold a copy of a number rather than a subtraction.
 * The dip is the field record's, the head is `tocAt` at the round's own date,
 * and the gradient is one head less the other.
 */
export const NEST = (() => {
  const on = FIELD_ROUND.days.at(-1).date;
  const bores = [
    { code: 'MW01A', unit: 'Superficial', screen: '18.0 – 24.0 m bgl', ec: '840 µS/cm' },
    { code: 'MW03B', unit: 'Confined (Wandalup Sandstone)', screen: '46.0 – 52.0 m bgl', ec: '1120 µS/cm' },
  ].map((b) => {
    const dip = FIELD_ROUND.current.find((s) => s.location === b.code).depthToWater;
    const head = Number((tocAt(b.code, on) - dip).toFixed(2));
    return { ...b, dip, head, swl: `${dip.toFixed(2)} m btoc`, headText: `${head.toFixed(2)} m AHD` };
  });
  const [superficial, confined] = bores;
  const difference = Number((confined.head - superficial.head).toFixed(2));
  return {
  id: 'Nest B — Borefield',
  bores,
  difference,
  gradient: `${difference > 0 ? 'Upward' : 'Downward'}, ${difference > 0 ? '+' : ''}${difference.toFixed(2)} m from the confined unit to the superficial`,
  inference:
    'The confined unit sits at higher head than the superficial one, so vertical leakage here is upward and TSF seepage in the superficial aquifer cannot be reaching the confined unit at this location. That is a containment argument, and it is only visible when the two bores are read as a nest rather than as two rows in a register.',
  /** What the three literals said before they were derived (wave 14). */
  was: { swl: '11.42 m btoc', head: '203.40 m AHD', gradient: 'Upward, +0.86 m from the confined unit to the superficial' },
  };
})();

/**
 * The second statutory clock, which nothing modelled.
 *
 * A licence condition is not the only duty with a deadline. In WA the
 * Contaminated Sites Act imposes its own reporting obligation on becoming
 * aware of known or suspected contamination, with its own window, its own
 * regulator-facing form and its own consequences — and PFAS at 37× a guideline
 * value is squarely inside it. The notification model already does the hard
 * part; it was pointed at one clock where the site has two.
 */
export const STATUTORY = [
  {
    duty: 'Licence L8842/2019/1 condition 21 — notification of exceedance',
    instrument: 'Environmental Protection Act 1986 (WA), via licence condition',
    to: 'DWER — licensing',
    becameAware: '2026-05-22 09:14 AWST',
    window: 'As soon as practicable',
    lodged: '2026-05-22 14:30 AWST',
    state: 'met',
    evidence: 'DWER-N-2026-11842.pdf',
  },
  {
    duty: 'Contaminated Sites Act 2003 (WA) — report a known or suspected contaminated site',
    instrument: 'Contaminated Sites Act 2003 (WA), section 11',
    to: 'DWER — contaminated sites branch',
    becameAware: '2026-05-22 09:14 AWST',
    window: 'As soon as practicable after becoming aware',
    lodged: '— not yet lodged',
    state: 'owed now',
    evidence: '—',
    note:
      'A separate duty on a separate instrument to a separate part of the regulator, running from the same moment of awareness. Discharging the licence condition does not discharge this one, and the two are commonly confused — which is the reason it is a row rather than a footnote.',
  },
];

/** Assignment and hand-over, which the queue implied and could not do. */
export const ASSIGNMENT = {
  subject: 'PFOS + PFHxS at MW05 — 37× the ANZG 2018 DGV',
  assignedTo: 'R. Whitmore — Environmental Lead',
  assignedBy: 'A. Nakamura',
  at: '2026-05-22 09:31 AWST',
  due: '2026-05-22 17:00 AWST',
  thread: [
    { who: 'A. Nakamura', at: '09:31', text: 'Confirmed against the certificate — both components detected well above the limit of reporting, so this is not a laboratory artefact. Handing to you for the condition 21 notification. The Contaminated Sites Act duty is open as well and is a separate lodgement.' },
    { who: 'R. Whitmore', at: '10:04', text: 'Acknowledged. Lodging condition 21 today. Raising the CS Act report with legal first — the wording commits us on the site’s status and that is not mine to draft alone.' },
    { who: 'A. Nakamura', at: '10:22', text: 'Understood. I have attached the certificate and the lineage export to this item so whatever goes out cites the same numbers.' },
  ],
};

/** Seasonal Mann–Kendall, against the plain test on the same series. */
export const TREND = {
  analyte: 'Arsenic (filtered) · MW05',
  n: 14,
  censored: 2,
  censoredTreatment:
    'Non-detects enter the test as tied values below every detected result, which is what Mann–Kendall’s statistic is built for — it compares ranks, not magnitudes. They are never substituted, and the two here fall below the lowest detection so no tie is ambiguous. Where a non-detect has a limit above a detected value the pair is indeterminate and is scored as a tie rather than guessed.',
  plain: { name: 'Mann–Kendall', s: 78, p: 0.003, slope: '1.77 µg/L per quarter', verdict: 'increasing' },
  seasonal: { name: 'Seasonal Mann–Kendall (quarterly blocks)', s: 41, p: 0.021, slope: '1.52 µg/L per quarter', verdict: 'increasing' },
  why:
    'The hydrograph on this bore shows textbook wet-season recovery, so the series is seasonal and the plain test treats that structure as trend. Both agree here — the increase is real and survives deseasonalising — but the plain test overstates its significance, and on a shorter series it can manufacture one. Reporting only the plain result on a seasonal series is a defensible-looking answer to the wrong question.',
};

/* ==================================================================== *
 * The amendment, and everything downstream of it
 *
 * One re-issued certificate for a round that has already been reported to
 * DWER. It is the case the whole supersession model exists for, and it is
 * different in kind from the amendment already in `SUPERSESSION`: that one
 * landed on an open round and was absorbed, so every screen shows its
 * result. This one lands on **2026 Q1, which `#qualifiers` records as a
 * locked period** — reported, and therefore closed to a write. A locked
 * period refuses a write rather than warning about one, so the amended
 * values are *staged*: computed, previewed, and standing nowhere until a
 * named person decides. That is why the exceedance register, the TARP board
 * and the licence still read as they do, and it is what makes the impact
 * below a preview rather than a description.
 * ==================================================================== */

/** The round the amendment reaches back into. */
export const Q1_ROUND = {
  code: '2026-Q1-GW',
  label: '2026 Q1 groundwater',
  collected: '3–5 February 2026',
  laboratory: 'Pilbara Analytical Services',
  certificate: 'PAS2026-01884',
  workOrder: 'PAS-WO-261188',
  issued: '2026-02-12',
  received: '2026-02-12 08:52 AWST',
  evaluated: '2026-02-14 11:02 AWST',
  period: '2026 Q1',
  lock: '2025 Q1 – 2026 Q1 — locked, reported to DWER',
};

/**
 * A hardness-modified criterion, on the relationship the derivation screen
 * states, anchored where the criteria set publishes its value for this site.
 *
 * `#hardness` publishes the criterion at the capped hardness of 400 mg/L and
 * demonstrates the scaling on the same anchor — 120 mg/L against 400 moves the
 * zinc criterion from 8.0 to 2.9 µg/L. Anchoring anywhere else would give two
 * screens two answers for one rule, which is the failure this file exists to
 * prevent. The cap is applied here as it is there: above 400 the relationship
 * is not extrapolated.
 */
export function hardnessCriterion(at400, hardness, slope) {
  return at400 * (Math.min(hardness, 400) / 400) ** slope;
}

/**
 * The re-issued certificate, its two findings, and the impact of each.
 *
 * Every number below is computed from the values either side of the
 * amendment — the criteria from `hardnessCriterion`, the window runs from
 * `evaluateWindow`, the counts from the arrays. Nothing about the impact is
 * typed, because a hand-kept impact statement is exactly the thing that reads
 * as reassuring while being wrong.
 */
export const AMENDMENT = (() => {
  const hardnessIssued = 268;
  const hardnessAmended = 335; // 268 × 1.25 — the dilution factor, applied
  const calcium = 79.8;
  const magnesium = 33.6;
  const computed = 2.497 * calcium + 4.118 * magnesium;
  // A typographic minus, not a hyphen — the same sign the ionic-balance
  // figures on `#consistency` carry, for one number read on two screens.
  const pct = (v) => `${(((v - computed) / computed) * 100).toFixed(1).replace('-', '−')}%`;

  /** Value against criterion, with the LOR-above-criterion state kept apart. */
  const outcomeOf = (value, censored, lor, criterion) => {
    if (criterion === null) return 'not evaluated';
    if (censored) return lor > criterion ? 'indeterminate' : 'compliant';
    return value > criterion ? 'exceedance' : 'compliant';
  };
  const factor = (value, criterion, censored) =>
    censored || criterion === null || value <= criterion ? '—' : `${(value / criterion).toFixed(1)}×`;

  const rows = [
    {
      analyte: 'Copper (filtered)', unit: 'µg/L', slope: null, at400: 1.4,
      issued: 4.7, amended: 1.2, censored: false, lor: 0.5,
      why: 'Re-analysed. The calibration blank carried copper, so the reported value was high.',
    },
    {
      analyte: 'Zinc (filtered)', unit: 'µg/L', slope: 0.85, at400: 8.0,
      issued: 18.2, amended: 4.6, censored: false, lor: 1.0,
      why: 'Re-analysed on the same finding. Both the result and its criterion move, and they move in opposite directions.',
    },
    {
      analyte: 'Nickel (filtered)', unit: 'µg/L', slope: 0.85, at400: 11,
      issued: 6.9, amended: 6.9, censored: false, lor: 0.5,
      why: 'Not re-analysed — nickel was not in the contaminated blank. Its criterion still moves, because hardness did.',
    },
    {
      analyte: 'Cadmium (filtered)', unit: 'µg/L', slope: 0.89, at400: 0.54,
      issued: null, amended: null, censored: true, lor: 1.0,
      why: 'Reported below the limit of reporting either way. The limit sits above the criterion at both hardnesses, so the amendment cannot rescue it.',
    },
  ].map((r) => {
    const cIssued = r.slope === null ? r.at400 : hardnessCriterion(r.at400, hardnessIssued, r.slope);
    const cAmended = r.slope === null ? r.at400 : hardnessCriterion(r.at400, hardnessAmended, r.slope);
    const before = outcomeOf(r.issued, r.censored, r.lor, cIssued);
    const after = outcomeOf(r.amended, r.censored, r.lor, cAmended);
    return {
      ...r,
      issuedText: r.censored ? `< ${r.lor.toFixed(1)}` : String(r.issued),
      amendedText: r.censored ? `< ${r.lor.toFixed(1)}` : String(r.amended),
      valueMoved: r.issued !== r.amended,
      criterionIssued: cIssued.toFixed(2),
      criterionAmended: cAmended.toFixed(2),
      criterionMoved: cIssued !== cAmended,
      before, after,
      changed: before !== after,
      factorBefore: factor(r.issued, cIssued, r.censored),
      factorAfter: factor(r.amended, cAmended, r.censored),
    };
  });

  /* The same rule, re-run over the amended round. `evaluateWindow` is the
   * evaluation's own function, not a copy of it. */
  const amendedAt = { 'Zinc (filtered)|MW05': 4.6, 'Copper (filtered)|MW05': 1.2 };
  const windows = WINDOW_CONDITION.series.map((s) => {
    const key = `${s.analyte}|${s.location}`;
    const q1 = WINDOW_CONDITION.rounds.indexOf(Q1_ROUND.code);
    const values = s.values.map((v, i) => (i === q1 && key in amendedAt ? amendedAt[key] : v));
    const after = evaluateWindow(values, s.limit, WINDOW_CONDITION.rounds);
    return {
      location: s.location, analyte: s.analyte, unit: s.unit, limit: s.limit, criterion: s.criterion,
      before: { values: s.values, run: s.run, outcome: s.outcome, trippedAt: s.trippedAt, above: s.above },
      after: { values, ...after },
      touched: key in amendedAt,
      changed: after.outcome !== s.outcome,
      whyNot: key in amendedAt
        ? null
        : s.location === 'MW07'
          ? 'MW07 was analysed in a different position on the run and is not covered by either finding. Its values do not move, so its run does not.'
          : 'Electrical conductivity is read on a conductivity cell, not out of the metals digest. Neither finding reaches it.',
    };
  });

  const changedResults = rows.filter((r) => r.valueMoved).length + 1; // + the hardness result itself
  const affected = SUBMISSIONS.filter((s) => s.snapshot === 'SNAP-0117');

  return {
    certificate: `${Q1_ROUND.certificate} rev B`,
    supersedes: Q1_ROUND.certificate,
    round: Q1_ROUND.code,
    laboratory: Q1_ROUND.laboratory,
    workOrder: Q1_ROUND.workOrder,
    issued: '2026-08-27',
    received: '2026-08-27 10:41 AWST',
    stagedBy: 'D. Okafor',
    file: 'PAS2026-01884_revB_Wandalup_2026Q1.zip · 0.8 MB · retained',
    state: 'staged — the decision is open',
    naming:
      'Pilbara Analytical Services numbers a whole re-issue afresh and suffixes a partial one: PAS2026-04398 became PAS2026-04417 because every result on it was re-reported, and this one keeps its reference with a revision because three results on it did. Which document stands is a supersession either way.',
    findings: [
      {
        n: 1,
        what: 'Calibration blank contamination — dissolved metals, ICP-MS run of 2026-02-10',
        detail:
          'The laboratory’s own quarterly review of its calibration records found the blank used to standardise positions 7 to 12 of batch PAS-WO-261188 carried copper and zinc above its acceptance limit. Copper and zinc on the samples in those positions were reported high. Nickel, cadmium and the major cations were unaffected — they were not in the contaminated blank.',
        remedy:
          'Re-analysed on 2026-07-28 from the retained, acid-preserved aliquots. The samples were collected on 2026-02-04, so the re-analysis sits inside the six-month holding time for dissolved metals, which closes on 2026-08-04. Outside that window the amendment would not have been analytically defensible and the laboratory says so on the certificate.',
      },
      {
        n: 2,
        what: 'Dilution factor — EDTA hardness titration, same batch',
        detail:
          'The titration was performed at a 1-in-5 dilution, recorded as such on the bench sheet, and reported against a 1-in-4 factor. The reported hardness is 25% low.',
        remedy:
          'No re-analysis: the titration reading is on the bench sheet and only the factor applied to it was wrong, so the correction is arithmetic and exact — 268 × 1.25 = 335 mg/L as CaCO₃.',
      },
    ],
    hardness: {
      analyte: 'Total hardness as CaCO₃', unit: 'mg/L as CaCO₃',
      issued: hardnessIssued, amended: hardnessAmended,
      calcium, magnesium,
      formula: '2.497 × Ca + 4.118 × Mg',
      computed: computed.toFixed(1),
      agreementIssued: pct(hardnessIssued),
      agreementAmended: pct(hardnessAmended),
      limit: '±10%',
      says:
        'The cross-check is the reason this finding is credible rather than merely claimed. Reported and computed hardness disagreed by 20.6% in February — outside the ±10% reconciliation limit, raised as a review item at the time and never closed. The amended value agrees with the same two cations to within 0.8%, from the same calcium and magnesium results, which were not re-analysed and did not move.',
    },
    rows,
    windows,
    counts: {
      resultsAmended: changedResults,
      resultsPreviewed: rows.length + 1,
      outcomesChanged: rows.filter((r) => r.changed).length,
      criteriaRecomputed: rows.filter((r) => r.criterionMoved).length,
      windowsChanged: windows.filter((w) => w.changed).length,
      windowsUnchanged: windows.filter((w) => !w.changed).length,
      tarpLevels: TARP.length,
      tarpMoved: 0,
      submissionsTotal: SUBMISSIONS.length,
      submissionsAffected: affected.length,
      q2ResultsTouched: 0,
    },
    affectedSubmission: affected[0],
    /* Why each TARP level does not move. A trigger that stays put for a stated
     * reason is a finding; a trigger that is simply not mentioned is a gap. */
    tarp: TARP.map((t) => ({
      level: t.level, label: t.label, locations: t.locations, state: t.state,
      moves: false,
      why:
        t.trigger.startsWith('Arsenic')
          ? 'Level 2 was raised on 2026-02-14 on two consecutive rounds above a guideline value. Copper and zinc no longer supply them — arsenic does, and has since 2025 Q4. The level holds, on a different analyte from the one that raised it, and the monthly programme at MW05 holds with it.'
          : t.trigger === 'Any DGV exceedance'
            ? 'Level 1 rests on the 2026 Q2 exceedances, which this certificate does not reach.'
            : t.locations === 'MW05'
              ? 'Level 3 rests on PFOS + PFHxS, reported by Yarra Regional on YAR-26-0881. A Pilbara certificate cannot amend it.'
              : 'The embankment trigger is instrumentation, not chemistry, and was cleared in April.',
    })),
    decision: {
      asks: 'Accept the amendment into a locked period, record it as no material impact, or hold it and ask the laboratory.',
      ways: [
        {
          label: 'Accept the amendment',
          detail:
            'Writes 3 supersessions against a locked period with the reason on each, re-evaluates 2026-Q1-GW, withdraws 2 exceedances, recomputes 2 window runs, withdraws the condition 12(c) trip, and flags snapshot SNAP-0117 and the 2026 Q2 draft as stale. It does not delete anything and it does not reissue anything: the reissue is its own decision, on its own screen.',
        },
        {
          label: 'Record as no material impact',
          detail:
            'Writes a decision record with a stated reason and leaves the standing values where they are. The amended certificate stays attached to the round and findable. A blank reason is refused — “no impact” with nothing behind it is the judgement this record exists to hold.',
        },
        {
          label: 'Hold, and ask the laboratory',
          detail:
            'Writes a query against the certificate and nothing else. The amendment stays staged and the round stays locked. Use it where the re-analysis itself is in question rather than the arithmetic.',
        },
      ],
      refused:
        'Replacing the three values in place. The period is locked because it has been reported to DWER, and a locked period refuses the write rather than warning about it — a number that has gone to a regulator is superseded with a reason or it is not changed.',
      irreversible:
        'Accepting appends supersessions, and an appended supersession is never deleted. A decision made in error is corrected by a further supersession that names what it corrects, and both stay readable. What is reversible is the evaluation rather than the record: outcomes are recomputed from the values that stand, so a correction moves them back.',
    },
  };
})();

/**
 * What was issued, as an object rather than as a claim.
 *
 * The register is joined to `SUBMISSIONS` on the snapshot reference, so the
 * date a report went out and the snapshot it went out on cannot drift apart:
 * they are one row read twice. `supersededSince` is what a regulator asks
 * about, and it is deliberately not the same number as `staged` — one has
 * been written and the other has not.
 */
export const SNAPSHOTS = (() => {
  const extra = {
    'SNAP-0117': { results: 228, digest: 'sha256:c41f…0b93', template: 'v4', supersededSince: 0, staged: AMENDMENT.counts.resultsAmended, note: 'The amendment on PAS2026-01884 rev B reaches three of these results. None of it is written.' },
    'SNAP-0121': { results: 14, digest: 'sha256:9a70…4d18', template: 'v4', supersededSince: 0, staged: 0, note: 'PFOS + PFHxS at MW05 and the eleven results that framed it.' },
    'SNAP-0114': { results: 36, digest: 'sha256:2e58…b7c1', template: 'v4', supersededSince: 0, staged: 0, note: 'Surface water at SW01. Groundwater amendments do not reach it.' },
    'SNAP-0088': { results: 912, digest: 'sha256:6b19…f204', template: 'v3', supersededSince: 11, staged: 0, note: 'Eleven values were superseded by the 2026-04-02 legacy reconciliation. Regenerating this report against today’s record would differ from what was lodged; regenerating it from its own snapshot would not.' },
  };
  return SUBMISSIONS.map((s) => ({ ...s, ...extra[s.snapshot] }));
})();

/**
 * The Q1 report regenerated, two ways, because they are different questions.
 *
 * Regenerating **from the snapshot** reproduces the lodged document byte for
 * byte and always will — that is what a snapshot is (FR-7.3, QB-3).
 * Regenerating **against today's record** answers the other question a
 * regulator asks, which is how the data has moved since. Today those two
 * answers agree, because the amendment is staged and nothing has been
 * written; the third column is what the second would say if it were accepted.
 */
export const REGENERATION = (() => {
  const snap = SNAPSHOTS.find((s) => s.snapshot === 'SNAP-0117');
  const values = [
    { where: '§4 Table 4.1', subject: `Copper (filtered) · MW05 · ${Q1_ROUND.code}`, issued: '4.7 µg/L', staged: '1.2 µg/L' },
    { where: '§4 Table 4.1', subject: `Zinc (filtered) · MW05 · ${Q1_ROUND.code}`, issued: '18.2 µg/L', staged: '4.6 µg/L' },
    { where: '§4 Table 4.1', subject: `Total hardness as CaCO₃ · MW05 · ${Q1_ROUND.code}`, issued: '268 mg/L', staged: '335 mg/L' },
    { where: '§5 Table 5.1', subject: 'Exceedance — copper at MW05, 3.4× the guideline value', issued: 'on the register', staged: 'withdrawn' },
    { where: '§5 Table 5.1', subject: 'Exceedance — zinc at MW05, 3.2× the guideline value', issued: 'on the register', staged: 'withdrawn' },
    { where: '§5.3', subject: 'Licence condition 12(c) — copper at MW05', issued: 'triggered at 2026-Q1-GW', staged: 'not triggered' },
    { where: '§6.1', subject: 'Sentence citing the copper trip as the basis for the investigation programme', issued: 'cites a trip', staged: 'flagged for the author — not rewritten' },
  ];
  return {
    snapshot: snap,
    fromSnapshot: {
      question: 'Does the issued document still exist exactly as it was lodged?',
      answer: 'Identical, byte for byte',
      evidence: `Regenerated 2026-09-01 from ${snap.snapshot} · digest ${snap.digest} · matches the digest recorded at issue`,
      always: 'This answer cannot change. The snapshot holds the bytes and every value they stood on, and it is append-only.',
    },
    againstRecord: {
      question: 'Does the record it was built from still say the same thing?',
      answer: 'Identical today',
      evidence: `${snap.supersededSince} of ${snap.results} results superseded since issue · ${snap.staged} staged and unwritten`,
      caveat: 'Identical today because the amendment has not been accepted. The column beside shows what this answer becomes if it is — and that is the whole reason the two questions are asked separately.',
    },
    values,
    reissue: {
      writes: [
        { what: 'New snapshot taken', n: '1 — SNAP-0124, with its own digest' },
        { what: 'Results it would stand on', n: `${snap.results} — ${AMENDMENT.counts.resultsAmended} at amended values` },
        { what: 'Sign-offs required again', n: '3 — prepared, reviewed, approved' },
        { what: 'The issued document SNAP-0117', n: '0 changes — it is what was lodged and stays so' },
        { what: 'Submission record', n: '1 new · the accepted 2026 Q1 submission is superseded, not replaced' },
        { what: 'Sections needing an author before it can go', n: '1 — §6.1 cites a trip that would no longer stand' },
      ],
      reversible:
        'A reissue is reversible up to lodgement and not after: the new snapshot can be discarded while it is a draft, and a document that has gone to DWER is withdrawn by writing to DWER. The product records which of those happened; it cannot do the second one for you.',
      blocked: 'Not available while the amendment is staged. A reissue that regenerated against values nobody has accepted would put an undecided number into a regulatory submission.',
    },
  };
})();

/**
 * Sign-off, bound to the snapshot and to nothing else.
 *
 * Three capacities because that is the chain a submission goes through and
 * because *who signed it* and *who checked it* are different questions
 * (`SigningCapacity`: prepared · reviewed · approved). Every signature below
 * is dated before the submission it covers went out, which is a property of
 * the record rather than a coincidence — a signature after lodgement is a
 * signature on something already gone.
 */
export const SIGNOFFS = [
  { subject: 'Quarterly Groundwater Monitoring Report — 2026 Q2', snapshot: null, capacity: 'approved', by: 'R. Whitmore', role: 'Environmental Lead', at: '—', state: 'awaiting' },
  { subject: 'Quarterly Groundwater Monitoring Report — 2026 Q1', snapshot: 'SNAP-0117', capacity: 'prepared', by: 'A. Nakamura', role: 'Hydrogeologist', at: '2026-04-24 15:40 AWST', state: 'signed' },
  { subject: 'Quarterly Groundwater Monitoring Report — 2026 Q1', snapshot: 'SNAP-0117', capacity: 'reviewed', by: 'D. Okafor', role: 'Environmental Officer', at: '2026-04-27 09:18 AWST', state: 'signed' },
  { subject: 'Quarterly Groundwater Monitoring Report — 2026 Q1', snapshot: 'SNAP-0117', capacity: 'approved', by: 'R. Whitmore', role: 'Environmental Lead', at: '2026-04-27 16:12 AWST', state: 'signed' },
  { subject: 'Statutory notification — PFOS + PFHxS at MW05', snapshot: 'SNAP-0121', capacity: 'approved', by: 'R. Whitmore', role: 'Environmental Lead', at: '2026-05-22 14:12 AWST', state: 'signed' },
  { subject: 'Quarterly discharge return — 2026 Q1', snapshot: 'SNAP-0114', capacity: 'approved', by: 'D. Okafor', role: 'Environmental Officer', at: '2026-04-23 14:05 AWST', state: 'signed' },
  { subject: 'Annual Environmental Report — 2025', snapshot: 'SNAP-0088', capacity: 'approved', by: 'R. Whitmore', role: 'Environmental Lead', at: '2025-09-25 11:30 AWST', state: 'signed' },
];

/** The data release, which is a validation judgement and not a sign-off. */
export const DATA_RELEASE = {
  what: '2026 Q2 data released to reporting',
  by: 'A. Nakamura — Hydrogeologist',
  at: '2026-05-22 16:20 AWST',
  covering: '231 results · validation state screened',
  says:
    'Made result by result, about data. It is on this screen only so the two can be told apart: it authorises nothing to leave the building and it binds to no document.',
};

/**
 * Figures and tables, numbered by the section they appear in.
 *
 * The number is derived from position, never stored, because a stored number
 * and a moved figure are how a submission acquires a “see Figure 6” that
 * points at a table. `cites` is the other direction — where in the document
 * the item is referred to — and it is what makes a renumbering answerable
 * before it happens rather than after it has shipped.
 */
export const REPORT_ITEMS = (() => {
  const items = [
    { kind: 'Figure', section: '2', title: 'Monitoring network', source: 'Location register', cites: ['§2.1'], state: 'current' },
    { kind: 'Figure', section: '4', title: 'Groundwater elevation — MW05, MW07, MW01A', source: 'Saved view · TSF downgradient', cites: ['§4.2', '§6.1'], state: 'current' },
    { kind: 'Figure', section: '4', title: 'Arsenic at MW05, with censoring', source: 'Saved view · TSF downgradient', cites: ['§4.3', '§5.1'], state: 'current' },
    { kind: 'Figure', section: '4', title: 'Piper trilinear diagram', source: '2026-Q2-GW major ions', cites: ['§6.2'], prose: true, state: 'current' },
    { kind: 'Figure', section: '4', title: 'Stiff diagrams by location', source: '2026-Q2-GW major ions', cites: ['§6.2'], state: 'current' },
    { kind: 'Figure', section: '4', title: 'Sulfate by location — box plot', source: '2026-Q2-GW results', cites: ['§4.4'], state: 'current' },
    { kind: 'Figure', section: '4', title: 'Arsenic trend at MW05', source: 'services/stats · Mann–Kendall, Sen’s slope', cites: ['§5.2', '§6.1'], prose: true, state: 'current' },
    { kind: 'Figure', section: '5', title: 'Condition 12(c) — four rounds, four series', source: 'Evaluation · consecutive-window v2', cites: ['§5.3'], state: 'stale — the staged amendment reaches two of its four series' },
    { kind: 'Figure', section: '6', title: 'Potentiometric surface, May 2026', source: 'Water levels · planar fit', cites: ['§6.1'], state: 'current' },
    { kind: 'Table', section: '3', title: 'QA/QC summary', source: 'Validation run 2026-05-21', cites: ['§3.2'], state: 'current' },
    { kind: 'Table', section: '3', title: 'Data quality assessment against objectives', source: 'DQA · six dimensions', cites: ['§3.3'], state: 'current' },
    { kind: 'Table', section: '4', title: 'Results by analyte and location', source: '2026-Q2-GW crosstab', cites: ['§4.1'], state: 'current' },
    { kind: 'Table', section: '4', title: 'Field parameters and purge records', source: 'Purge and stabilisation log', cites: ['§4.5'], state: 'current' },
    { kind: 'Table', section: '5', title: 'Exceedance register', source: 'Evaluation · 2 criteria sets', cites: ['§5.1'], state: 'stale — MW03B superseded' },
    { kind: 'Table', section: '5', title: 'Results that could not be assessed', source: 'Evaluation · LOR above criterion', cites: ['§5.4'], state: 'current' },
  ];
  const seq = {};
  const number = (list) =>
    list.map((it) => {
      const key = `${it.kind}|${it.section}`;
      seq[key] = (seq[key] ?? 0) + 1;
      return { ...it, n: `${it.kind} ${it.section}.${seq[key]}` };
    });
  const numbered = number(items);

  /* The insertion, and what it costs — computed by numbering the list again
   * with the new item in place rather than by counting on somebody's fingers. */
  const insertAfter = 'Figure 4.2';
  const inserted = {
    kind: 'Figure', section: '4', title: 'Copper at MW05 across four rounds',
    source: 'Evaluation · condition 12(c) window', cites: [], state: 'new',
  };
  const at = items.findIndex((_, i) => numbered[i].n === insertAfter) + 1;
  for (const k of Object.keys(seq)) delete seq[k];
  const after = number([...items.slice(0, at), inserted, ...items.slice(at)]);
  const byTitle = Object.fromEntries(after.map((it) => [it.title, it.n]));
  const renumbered = numbered.filter((it) => byTitle[it.title] !== it.n)
    .map((it) => ({ from: it.n, to: byTitle[it.title], title: it.title, cites: it.cites, prose: it.prose === true }));

  return {
    items: numbered,
    figures: numbered.filter((it) => it.kind === 'Figure').length,
    tables: numbered.filter((it) => it.kind === 'Table').length,
    insert: {
      item: inserted,
      after: insertAfter,
      becomes: byTitle[inserted.title],
      renumbered,
      liveRefs: renumbered.reduce((n, r) => n + r.cites.length, 0),
      proseRefs: renumbered.filter((r) => r.prose).length,
      why:
        'The copper series is what the staged amendment turns on, and §5.3 asserts a trip that a reader cannot check without seeing four rounds beside each other.',
    },
  };
})();

/**
 * The corporate template, versioned independently of the application (OM-5).
 *
 * A template version is not a preference. It decides the numbering scheme, the
 * caption format and the cross-reference style of every document generated
 * under it, and an issued report regenerates against **the version recorded in
 * its own snapshot** — never against whatever is current — or last year's
 * submission would come back numbered differently from the copy the regulator
 * holds.
 */
export const TEMPLATE = {
  current: 'v4',
  file: 'Wandalup Resources — corporate report template v4 (.dotx)',
  settings: [
    { what: 'Figure numbering', value: 'Figure <section>.<n> — restarts at each section', why: 'The corporate standard. A document-wide sequence puts Figure 27 in section 2.' },
    { what: 'Table numbering', value: 'Table <section>.<n> — restarts at each section', why: 'Figures and tables number independently, so Table 4.1 and Figure 4.1 coexist.' },
    { what: 'Caption format', value: '<Kind> <n>. <Title> — <source>', why: 'The source clause is the customer’s own rule and it is why a plate is defensible without the report body.' },
    { what: 'Caption position', value: 'Below figures, above tables', why: 'The ISO convention the customer’s document controller enforces.' },
    { what: 'Cross-reference style', value: '<Kind> <n> (page <p>)', why: 'Page numbers survive printing, which is how a DWER assessor reads a submission.' },
    { what: 'Heading numbering', value: 'Decimal, to three levels', why: 'Licence conditions are cited by section number in correspondence.' },
    { what: 'Page setup', value: 'A4 portrait · 25 mm margins · figures at 180 mm', why: '180 mm is the printable width the figure grammar is drawn to.' },
    { what: 'Branding', value: 'Wandalup Resources. Strataflow attribution is document metadata only', why: 'FR-7.4 — a Strataflow-branded regulatory submission is a hard anti-pattern.' },
  ],
  versions: [
    { version: 'v5', effective: 'draft — not effective', changed: 'Adds a prescribed §0 executive summary. Not adopted; the document controller has it.', state: 'draft' },
    { version: 'v4', effective: '2026-07-01 →', changed: 'Caption position moved above tables; cross-references gained the page number.', state: 'active' },
    { version: 'v3', effective: '2024-02-01 – 2026-06-30', changed: 'The version SNAP-0088 was issued under, and the version it still regenerates under.', state: 'historic' },
  ],
  note:
    'Changing the active version renumbers nothing that has been issued. Every snapshot records the template version it was produced with, so the 2025 Annual Environmental Report regenerates under v3 in 2029 exactly as it was lodged in 2025.',
};

/**
 * The golden-output comparison (FR-7.5).
 *
 * The assembled document is compared against an approved reference for this
 * report kind and content version, and the comparison gates issue rather than
 * warning about it. Two of the checks below read their outcome out of
 * `REPORT.sections`: a report with an unwritten section fails its own
 * structural check, which is what makes this a gate and not a formality.
 */
export const GOLDEN = (() => {
  const unwritten = REPORT.sections.filter((s) => s.state === 'not started');
  const refs = REPORT_ITEMS.items.reduce((n, it) => n + it.cites.length, 0);
  const censored = CROSSTAB_SHAPE.censored;
  const checks = [
    { check: 'Prescribed section structure, present and in order', expects: '§1 – §7 per the DWER quarterly groundwater form', found: 'All seven present, in order', outcome: 'pass' },
    { check: '§3 carries the QA/QC summary as a table', expects: 'Table 3.1', found: `Table 3.1 · ${QAQC.length} checks`, outcome: 'pass' },
    { check: '§3 carries the data quality assessment', expects: `Table 3.2, ${DQA.length} dimensions`, found: `Table 3.2 · ${DQA.length} dimensions`, outcome: 'pass' },
    /*
     * The shape of the table, not the number of results in it: a column drawn
     * empty is still a column, and a reader comparing this quarter to last
     * needs the same grid with a gap in it rather than a narrower grid. So the
     * check stays 11 × 7 after the MW11 blanking, and the results count that
     * did move is on the crosstab beside the grid.
     */
    { check: '§4 carries the crosstab', expects: 'Table 4.1, analyte × location', found: `Table 4.1 · ${CROSSTAB_SHAPE.analytes} × ${CROSSTAB_SHAPE.locations}`, outcome: 'pass' },
    /*
     * Wave 15: this check counted `empty`, which was the dry column and
     * nothing else until the withdrawn PFAS cells joined it. It counts
     * `notSampled` now — a check about a location that returned nothing must
     * not silently absorb five cells whose bores returned water.
     */
    { check: '§4 draws a planned location that returned nothing', expects: 'The column present and empty, with the reason on it', found: `${CROSSTAB_SHAPE.emptyColumns.join(', ')} · ${CROSSTAB_SHAPE.notSampled} cells, dry`, outcome: 'pass' },
    { check: '§5 carries the exceedance register', expects: 'Table 5.1, one row per result per criterion', found: `Table 5.1 · ${EXCEEDANCES.length} rows`, outcome: 'pass' },
    { check: '§5 carries the results that could not be assessed', expects: 'Table 5.2, with the reason on each', found: `Table 5.2 · ${INDETERMINATE.length} rows`, was: `Table 5.2 · ${PFAS_REACH.was.goldenIndeterminateRows} rows`, outcome: 'pass' },
    { check: 'Figure captions match the template', expects: 'Figure <n>. <Title> — <source>', found: `All ${REPORT_ITEMS.figures} figures`, outcome: 'pass' },
    { check: 'Table captions match the template', expects: 'Table <n>. <Title> — <source>', found: `All ${REPORT_ITEMS.tables} tables`, outcome: 'pass' },
    { check: 'Every cross-reference resolves', expects: 'No reference to a number the document does not carry', found: `${refs} references, all resolving`, outcome: 'pass' },
    { check: 'Every reported value carries its unit', expects: 'Unit on the value or in the column head', found: 'No bare numbers', outcome: 'pass' },
    /*
     * Wave 15. The count moved because five of the values it counted were not
     * the laboratory's notation at all — they were censoring asserted on
     * analyses that never ran, which is the one failure this check exists to
     * catch and the one it could not see, because it counts notation rather
     * than provenance. It carries its before so the drop is a settlement
     * rather than an unexplained shrink.
     */
    { check: 'Censored values in the laboratory’s own notation', expects: '< LOR, never zero and never a substituted half-limit', found: `${censored} censored values, notation intact`, was: `${PFAS_REACH.was.censored} censored values`, outcome: 'pass' },
    ...unwritten.map((s) => ({
      check: `§${s.n} ${s.title}, present with content`,
      expects: 'At least one authored subsection',
      found: `${s.words} words — ${s.state}`,
      outcome: 'fail',
    })),
  ];
  return {
    reference: 'Approved reference output · quarterly groundwater · content version v4.1',
    approved: 'R. Whitmore, 2026-07-14 — the reference is an oracle and it is approved once, not per run',
    ran: '2026-09-01 08:12 AWST · 3.4 s',
    checks,
    passed: checks.filter((c) => c.outcome === 'pass').length,
    failed: checks.filter((c) => c.outcome === 'fail').length,
    gate:
      'A failing comparison blocks the snapshot, not the draft. Writing continues; issuing does not — which is the only point in the loop where the check is worth anything.',
    lastDrift: {
      at: '2026-08-19 16:40 AWST',
      where: '§3.2 — QA/QC summary table',
      what: 'The golden reference carries seven columns and the assembled table carried six: <em>Action taken</em> was dropped when the QA/QC generator changed.',
      why: 'Nothing in the document looked wrong. Every check that reads the document’s own structure passed, and a reader who had never seen the reference would have found §3.2 unremarkable — which is exactly why the comparison is against an approved copy rather than against a rule.',
      done: 'The generator was corrected and §3.2 regenerated the same afternoon. The failing run is kept; a gate with no record of what it caught is indistinguishable from one that has never fired.',
    },
  };
})();

/**
 * The components behind the derived PFAS total, per location.
 *
 * The total on the crosstab is a **sum**, and what a non-detect contributes to
 * a sum is a property of the criteria set rather than of the instance
 * (FR-2.2).
 *
 * ## Five of the six rows were withdrawn — wave 15
 *
 * This list used to run to six locations, five of them `pfos: null, pfhxs:
 * null`, which the demonstration rendered as five pairs of `< 2.0` — the claim
 * that a laboratory reported ten non-detects. It reported none of them: the
 * suite reached one sample, and `PFAS_REACH` holds the three records of the
 * material that say so. So the five leave this list for the reason wave 7 gave
 * when MW11 left it, quoted here because it is the same rule and it now reads
 * as a general one: *"A non-detect is a result: it has a limit of reporting, a
 * method and a certificate behind it."* Those five had none of the three.
 *
 * **What that costs, and what it buys.** It costs the demonstration its five
 * moving rows, and the four treatment columns now agree on the one row that is
 * left — because a rule about non-detects has nothing to say about a result
 * that has none. It buys the demonstration a sharper subject than the one it
 * had: what the withdrawn rows *would* have done is kept whole on
 * `NON_DETECT.withdrawn` and drawn beside the live table as the before it is,
 * and under `zero` they turn five analyses that never happened into five
 * compliant results. The screen was drawn to refuse a rule that manufactures
 * compliance out of a non-detect. It turns out to have been standing on a
 * table that manufactured it out of nothing at all.
 *
 * ## PFHxS at MW05 was drawn as an unqualified detect below the LOR (PR-3b)
 *
 * The practitioner review caught it: **1.7 ng/L · detected · LOR 2.0 ng/L** is
 * a contradiction on its face. A laboratory reporting below its limit of
 * reporting either reports a non-detect, or reports the number and says the
 * number is estimated. The second is what happened, and the record now says
 * so with the three limits the glossary insists stay distinct:
 *
 * - **MDL 0.5 ng/L** — the lowest concentration the method detects with
 *   confidence that the analyte is present. The review's word for it is *LOD*;
 *   the glossary's canonical name is the **method detection limit**, and it
 *   already carries this exact definition — *"a value between the MDL and the
 *   LOR is real but imprecise — detected, not reliably measured"*. Minting LOD
 *   beside it would be QB-9's fourth limit.
 * - **LOR 2.0 ng/L** — the lowest concentration the laboratory will report as
 *   a quantified number.
 * - **1.7 ng/L, qualifier J — estimated.** Detected (it is above the MDL) and
 *   not reliably quantified (it is below the LOR). `J` is USEPA's code and it
 *   means what USEPA says it means (glossary, *qualifier scheme*); *estimated*
 *   is the glossary's own word in the *qualifier* entry.
 *
 * The detect status stays `detected` — the glossary makes it two-valued on
 * purpose, and "finer laboratory assertions about a value are qualifiers, not
 * detect statuses". Which is why this had to be fixed at the qualifier rather
 * than by censoring the value.
 */
/*
 * Wave 7: MW11 is gone from this list with its crosstab column. It carried
 * `pfos: null, pfhxs: null`, which the non-detect demonstration renders as a
 * pair of `< 2.0` results — a claim that the laboratory reported two
 * non-detects on a sample nobody collected. A non-detect is a result: it has a
 * limit of reporting, a method and a certificate behind it. The bore was dry,
 * so it has none, and the sixth row of the demonstration is the right number
 * of rows rather than a row short.
 *
 * Wave 15 read that sentence as the general rule it is and applied it to the
 * five rows wave 7 left standing. Six was the right number of rows against
 * what wave 7 could see; one is the right number against what the material
 * record says.
 */
export const PFAS_COMPONENTS = [
  { location: 'MW05', pfos: 3.1, pfhxs: 1.7, pfhxsQualifier: 'J', pfhxsQualifierMeans: 'estimated — detected above the method detection limit and below the limit of reporting' },
];

/**
 * The five rows this list carried until wave 15, kept as the before they are.
 *
 * Not deleted, for the reason nothing in this catalogue is deleted when it is
 * corrected: a table that quietly loses five rows is indistinguishable from a
 * table that never had them, and the whole argument for withdrawing them is
 * only legible beside what they used to say. `NON_DETECT.withdrawn` runs the
 * same four treatments over these, so the counterfactual is arithmetic on the
 * old record rather than a sentence about it.
 */
const PFAS_COMPONENTS_WITHDRAWN = PFAS_REACH.withdrawnLocations.map((location) => ({
  location,
  pfos: null,
  pfhxs: null,
  why: 'no analysis — the suite was never run on this bore’s sample',
}));

/**
 * The four treatments, run over the real record — and over the record that was
 * withdrawn from under it.
 *
 * `exclude` is what the active set binds. It used to be why the crosstab showed
 * `< 2.0` and an indeterminate mark at six bores; after wave 15 there is one
 * row here, MW05, and every treatment agrees on it, because both of its
 * components were detected and a rule about non-detects has nothing to say
 * about a result that has none.
 *
 * **So the demonstration moved rather than dying, and it demonstrates more than
 * it did.** `withdrawn` runs the identical four treatments over the five rows
 * that left `PFAS_COMPONENTS` — the same arithmetic, the same rule object, the
 * same evaluator — so the screen can put *what this table said before* next to
 * *what the record supports*, which is the treatment every corrected value in
 * this catalogue gets. Under `zero` those five read **compliant**: five passes
 * out of analyses nobody ran, which is a worse version of the failure the four
 * columns were drawn to warn about and is now the sharpest thing on the screen.
 * Under `the limit of reporting` they read as exceedances at 31×, which would
 * have raised five statutory notification obligations on the same nothing.
 *
 * The evaluator is one function used twice, deliberately: a second copy written
 * for the counterfactual could drift from the live one and the comparison would
 * stop meaning anything.
 */
export const NON_DETECT = (() => {
  const LOR = 2.0;
  const CRITERION = 0.13;
  const treatments = [
    { rule: 'exclude', label: 'exclude from the sum', contributes: () => null },
    { rule: 'zero', label: 'zero', contributes: () => 0 },
    { rule: 'half-lor', label: 'half the limit of reporting', contributes: () => LOR / 2 },
    { rule: 'lor', label: 'the limit of reporting', contributes: () => LOR },
  ];
  const evaluate = (t, over) =>
    over.map((p) => {
      const parts = [p.pfos, p.pfhxs].map((v) => (v === null ? t.contributes() : v));
      const kept = parts.filter((v) => v !== null);
      if (kept.length === 0) {
        return { location: p.location, total: `< ${LOR.toFixed(1)}`, censored: true, outcome: 'indeterminate', factor: '—' };
      }
      const total = kept.reduce((a, b) => a + b, 0);
      const outcome = total > CRITERION ? 'exceedance' : 'compliant';
      return {
        location: p.location,
        total: total.toFixed(1),
        censored: false,
        outcome,
        factor: outcome === 'exceedance' ? `${Math.round(total / CRITERION)}×` : '—',
      };
    });
  const active = evaluate(treatments[0], PFAS_COMPONENTS);
  const columns = (over, base) =>
    treatments.map((t) => {
      const rows = evaluate(t, over);
      return {
        ...t,
        rows,
        changes: rows.filter((r, i) => r.outcome !== base[i].outcome).length,
        outcomes: ['exceedance', 'indeterminate', 'compliant'].map((o) => ({ o, n: rows.filter((r) => r.outcome === o).length })).filter((x) => x.n),
      };
    });
  const withdrawnActive = evaluate(treatments[0], PFAS_COMPONENTS_WITHDRAWN);
  return {
    lor: LOR,
    criterion: CRITERION,
    analyte: 'PFOS + PFHxS',
    rule: 'sum-pfas-anzg v2.1',
    activeRule: 'exclude',
    treatments: columns(PFAS_COMPONENTS, active),
    active,
    /**
     * The same four columns over the five rows wave 15 withdrew — the before,
     * computed rather than remembered.
     */
    withdrawn: {
      locations: PFAS_REACH.withdrawnLocations,
      rows: PFAS_COMPONENTS_WITHDRAWN,
      treatments: columns(PFAS_COMPONENTS_WITHDRAWN, withdrawnActive),
      active: withdrawnActive,
      wasRows: PFAS_REACH.was.components,
      why: PFAS_REACH.decision,
      says:
        `These ${PFAS_COMPONENTS_WITHDRAWN.length} rows were the whole of the difference between the four columns, and none of them was a result. ` +
        'The suite reached one sample, so the treatment applied to a non-detect at these bores was being applied to nothing at all — which is why they are withdrawn rather than re-valued and why the arithmetic is kept here rather than deleted with them.',
      zeroSays:
        `Under <em>zero</em> all ${PFAS_COMPONENTS_WITHDRAWN.length} read compliant. That is the failure this screen exists to refuse, arriving one door further back than it was drawn to expect: not a rule turning a non-detect into a pass, but a table turning an analysis nobody ran into one.`,
    },
    says:
      `MW05 is the same 4.8 ng/L under every treatment, because both of its components were detected — a rule about non-detects has nothing to say about a result that has none. It is now the only row here: the ${PFAS_REACH.was.components - PFAS_COMPONENTS.length} bores that used to move under these four columns had no PFAS analysis to move, and what they would have said is drawn below as the before it is.`,
    /*
     * PR-3b. An estimated detect is the case the rule is silent about until
     * somebody asks, and the answer has to be stated rather than inferred from
     * whichever branch the arithmetic happens to take.
     *
     * `J` is a **qualifier**, and `detected` is a **detect status**; the
     * glossary keeps them apart deliberately, and the non-detect rule is keyed
     * on the detect status. So an estimated detect is a detect: it enters the
     * sum at its reported value, the treatment column has nothing to do with
     * it, and the qualifier carries forward onto the derived total because a
     * sum is no more certain than the least certain thing in it (FR-2.4, PP3).
     *
     * The three readings are computed below rather than argued, because "does
     * it change the answer" is the only form of the question worth asking.
     */
    estimated: (() => {
      const mw05 = PFAS_COMPONENTS.find((p) => p.location === 'MW05');
      const at = (total) => ({
        total: total.toFixed(1),
        factor: `${Math.round(total / CRITERION)}×`,
        outcome: total > CRITERION ? 'exceedance' : 'compliant',
      });
      return {
        location: 'MW05',
        component: 'PFHxS',
        value: mw05.pfhxs,
        qualifier: mw05.pfhxsQualifier,
        means: mw05.pfhxsQualifierMeans,
        rule: 'An estimated detect is a detect. It enters the sum at its reported value, the non-detect treatment does not reach it, and the J qualifier carries onto the derived total.',
        carries: 'PFOS + PFHxS at MW05 is reported 4.8 ng/L J — estimated, because one of the two components is.',
        readings: [
          { as: 'Detected and quantified — what was drawn before this fix', ...at(mw05.pfos + mw05.pfhxs), note: 'Wrong: the laboratory did not quantify 1.7 against a 2.0 limit of reporting, and nothing said so.' },
          { as: 'Detected and estimated — what the certificate says', ...at(mw05.pfos + mw05.pfhxs), note: 'The value is the same and the confidence is not. The total carries J.' },
          { as: 'Treated as a non-detect at < 2.0, under the rule in force', ...at(mw05.pfos), note: 'Excluded from the sum, so the total is PFOS alone — a different number, the same outcome.' },
        ],
        decides:
          'The outcome does not turn on it: the total exceeds the 0.13 ng/L guideline value under all three readings, and the statutory notification stands either way. What turns on it is the number in the report and how much weight it carries — which is exactly what a qualifier is for, and exactly what an unqualified 1.7 below a 2.0 limit of reporting hid.',
      };
    })(),
  };
})();

/**
 * A criteria set version pair — one field apart, and that field decides.
 *
 * The version is this instance's configuration of the set, not a new edition
 * of ANZG: the guideline values, the analyte list, the protection level and
 * the applicability are identical in both. What moves is the non-detect rule
 * bound to the set, which is the whole of FR-2.2 and the reason a criteria set
 * is versioned independently of the application it runs in (OM-5).
 */
export const CRITERIA_DRAFT = (() => {
  const half = NON_DETECT.treatments.find((t) => t.rule === 'half-lor');
  const changed = half.rows
    .map((r, i) => ({ ...r, was: NON_DETECT.active[i] }))
    .filter((r) => r.outcome !== r.was.outcome);
  /*
   * Wave 15, and it is the sharpest consequence of the settlement.
   *
   * The activation preview below typed its own numbers — 7 totals re-evaluated,
   * 6 outcomes changing, 6 exceedances, 6 statutory clocks — and two things
   * were wrong with them. They were **already** wrong by one before this wave:
   * they were written when MW11 was still a row here, and wave 7 blanked that
   * column without re-deriving the preview, so the screen typed 7 over a record
   * that held 6 and 6 over a record that supported 5. And the record itself has
   * now moved: five of those six totals were never analysed, so the rule
   * reaches one result and changes nothing.
   *
   * `beforeReaches` and `beforeChanges` are the counterfactual computed off
   * `NON_DETECT.withdrawn` — the same evaluator over the withdrawn rows — so
   * the preview can put what it would have written beside what it writes, and
   * neither number is typed.
   */
  const beforeReaches = NON_DETECT.active.length + NON_DETECT.withdrawn.rows.length;
  const beforeChanges = NON_DETECT.withdrawn.treatments.find((t) => t.rule === 'half-lor').changes;
  const typedBefore = { totals: 7, outcomes: 6, exceedances: 6, notifications: 6 };
  return {
    set: 'ANZG 2018 — 95% species protection',
    active: { version: '2018.1', effective: '2018-08-01 →', nonDetect: 'exclude from the sum', state: 'active', by: 'Loaded with the shipped reference content', at: '2024-02-19' },
    draft: { version: '2026.1', effective: '2026-09-01 → if activated', nonDetect: 'half the limit of reporting', state: 'draft', by: 'D. Okafor', at: '2026-08-24' },
    same: [
      ['Guideline values', '58 analytes, unchanged — no value moves'],
      ['Protection level', '95% species protection, unchanged'],
      ['Applicability', 'All groundwater locations, Superficial unit — unchanged'],
      ['Hardness relationship', 'hardness-modified-tv v3, unchanged'],
    ],
    differs: ['Non-detect rule', 'exclude from the sum', 'half the limit of reporting'],
    rationale:
      'The site’s DWER-facing assessment method statement adopts half-limit substitution for PFAS sums, and the criteria set is where that belongs — not in a preference, and not in whichever spreadsheet the assessor happened to use.',
    test: {
      scope: `Every committed result the rule can reach: ${NON_DETECT.active.length} derived total of ${NON_DETECT.analyte} across ${NON_DETECT.active.length} location, round ${ROUND.code}.`,
      reaches: NON_DETECT.active.length,
      changes: changed.length,
      unchanged: NON_DETECT.active.length - changed.length,
      rows: changed,
      unchangedWhy: 'MW05 does not change: both of its components were detected, so no substitution applies to it.',
      nothingElse:
        'There are no PFAS results on this project before 2026 Q2 and no other derived sum in the analyte dictionary, so the rule reaches nothing else. That is a fact about this seed rather than a property of the rule, and the test says which.',
      /** What this test said before wave 15, computed off the withdrawn rows. */
      before: {
        reaches: beforeReaches,
        changes: beforeChanges,
        typed: typedBefore,
        says:
          `This test read ${beforeReaches} derived totals with ${beforeChanges} of them changing, and the activation preview beside it typed ${typedBefore.totals} and ${typedBefore.outcomes} — already one out, because it was written before MW11's column was blanked and never re-derived. Both are settled now: the numbers are counted off the record, and the record is ${NON_DETECT.active.length} total that no substitution reaches.`,
      },
    },
    activation: {
      writes: [
        { what: 'Criteria set versions written', n: '1 — 2018.1 is superseded, not deleted' },
        { what: 'Derived totals re-evaluated', n: String(NON_DETECT.active.length), was: String(beforeReaches), typed: String(typedBefore.totals) },
        { what: 'Outcomes that change', n: `${changed.length} — nothing to substitute into`, was: `${beforeChanges} — indeterminate becomes exceedance`, typed: String(typedBefore.outcomes) },
        { what: 'Exceedances raised', n: String(changed.length), was: `${beforeChanges}, at ${beforeChanges} locations`, typed: String(typedBefore.exceedances) },
        { what: 'Notification obligations raised under condition 21', n: `${changed.length} — became-aware would be set at activation, immutable`, was: String(beforeChanges), typed: String(typedBefore.notifications) },
        { what: 'TARP levels that extend automatically', n: '0 — Level 3 names MW05 and extending it is a separate decision' },
        { what: 'Locked periods re-evaluated', n: '0 — a rule change evaluates forward' },
        { what: 'Issued reports changed', n: '0 — a snapshot is what was issued' },
      ],
      says:
        `Condition 21 obliges notification as soon as practicable on becoming aware of an exceedance, and the moment of awareness would be this activation. Until wave 15 this preview promised ${beforeChanges} statutory clocks started by a configuration change — and every one of them would have been started over a result no laboratory produced. It promises none now, and the reason it promises none is worth more than the number: half-limit substitution has something to substitute only where a non-detect exists, and the only PFAS result on this round is a detect. Activating a criteria set is still an approval rather than a save; what changed is that this activation is the cheap case rather than the expensive one.`,
      reversible:
        `Reversible as an evaluation and not as a consequence. Rolling back re-evaluates every total the rule reached — ${NON_DETECT.active.length} — and withdraws whatever exceedances it raised, which on this round is ${changed.length}; it does not un-lodge a notification that has gone to DWER. That asymmetry is the whole reason this preview is drawn before the button rather than after it — and it is exactly the asymmetry the ${beforeChanges} clocks would have been on the wrong side of.`,
    },
    rollback: {
      // W15-A-1: this card typed 7 and 6 — the same stale wave-7-era numbers the
      // activation preview beside it had already settled — while that preview
      // computed. Both cards count off the record now, through the same values.
      writes: [
        { what: 'Set version deactivated', n: '1 — superseded, and both stay readable' },
        { what: 'Derived totals re-evaluated', n: `${NON_DETECT.active.length} — this card said 7 until the wave that settled the reach` },
        { what: 'Exceedances withdrawn', n: `${changed.length} — withdrawn, never deleted; this card said 6` },
        { what: 'Notifications un-lodged', n: '0 — a lodgement is withdrawn by writing to the regulator' },
        { what: 'Audit records written', n: 'One per change, appended, attributed' },
      ],
      says:
        'Rollback is drawn as a control rather than left to a database restore, because the question it answers — “we activated the wrong rule on Friday” — is asked on a Monday by somebody who is not a DBA.',
    },
  };
})();

/* ==================================================================== *
 * The interpretation workspace — evidence for the inference, not for
 * the citations (PR-4)
 *
 * The practitioner review's verdict on the drawn editor was that its
 * evidence panel proves the wrong thing: it answers *are my citations
 * numerically correct*, and the question a hydrogeologist has before
 * signing a TSF-seepage sentence is *does the evidence support what I am
 * claiming*. Those are different panels.
 *
 * Three things follow, and the third is the constraint the other two run
 * inside.
 *
 * 1. **An evidence set, pinned to a passage** (PR-4a) — the plates and
 *    records the author had in front of them, kept with the sentence, "so
 *    the reviewer can see exactly what I saw when I made the
 *    interpretation". Explicitly **not** so the software judges the
 *    inference: there is no score anywhere below, no confidence, no
 *    strength, no count of evidence "for" against evidence "against". A
 *    number attached to somebody's professional judgement would be an
 *    opinion wearing arithmetic, and it is the one thing this surface must
 *    not invent.
 * 2. **A cross-reference token** (PR-4b) — a structured reference to a
 *    numbered item rather than the number typed into the sentence. It
 *    renders the item's *current* number, so renumbering moves it silently;
 *    what flags the sentence is the item's **content** changing.
 * 3. **A numeric rendering rule** (PR-4c) — stated on the workspace and
 *    applied to every value citation, so a value that re-derives to more
 *    digits is formatting rather than staleness noise.
 *
 * Over all of it: **authored interpretation is never silently rewritten**
 * (the keep-list). Nothing here edits a sentence. The workspace shows what
 * changed *around* the prose and names the sentences it reaches; the
 * correction is an act the author takes, attributed to them.
 * ==================================================================== */

/**
 * The rendering rule, written as code because it is applied rather than described.
 *
 * The review's example is two significant figures. Three is the cap here, and
 * the reason is worth stating: at two, the arsenic result the certificate
 * reports as 28.4 µg/L renders in the sentence as 28, and a rule that drops a
 * digit the laboratory published is worse than the noise it prevents. So the
 * rule is *the source's own published precision, capped at three significant
 * figures* — it never adds precision the source did not report and never
 * quotes more than three figures of it.
 */
export const RENDERING_RULE = (() => {
  const significant = (published) => {
    const digits = String(published).replace('-', '').replace('.', '').replace(/^0+/, '');
    return digits.length;
  };
  const apply = (published, max = 3) =>
    significant(published) <= max ? String(published) : String(Number(Number(published).toPrecision(max)));
  return {
    max: 3,
    name: 'Three significant figures, and never more than the source publishes',
    says:
      'A number quoted in a sentence renders to the precision its source publishes, capped at three significant figures. A citation is checked under this rule: the question is whether the rendered form moved, not whether the stored value did.',
    why:
      'Without it, a stored value that gains digits — a statistics worker returning four decimal places where it returned two — flags a sentence that has not become wrong. The author then learns that the flag means nothing, which is the failure mode of every staleness indicator that cries wolf.',
    notProse:
      'It governs prose only. A statistics table and a plate carry the precision of the analysis, and 1.77 in a table beside 1.77 in a sentence is the rule agreeing with itself rather than two surfaces disagreeing.',
    significant,
    apply,
  };
})();

/**
 * The passages, their citations and their tokens.
 *
 * The prose is authored — every word below is the hydrogeologist's — and the
 * runs are how a structured citation and a structured cross-reference sit
 * inside a sentence without being typed into it.
 */
export const NARRATIVE = (() => {
  const R = RENDERING_RULE;
  const itemOf = (title) => REPORT_ITEMS.items.find((i) => i.title === title);
  const renumbered = (title) => REPORT_ITEMS.insert.renumbered.find((r) => r.title === title) ?? null;

  /**
   * A value citation: what the sentence says, and what its source says now.
   *
   * `then` is the source's published value at the moment the sentence was
   * written; `now` is what it publishes today. The check compares the two
   * **through the rendering rule**, which is the whole of PR-4c.
   */
  const citations = [
    {
      id: 'as-mw05', label: 'Arsenic at MW05',
      then: '28.4', now: '28.4', unit: 'µg/L',
      source: 'Certificate PAS2026-04417 · result on WDL-26Q2-003', at: 'result-detail',
    },
    {
      id: 'as-dgv', label: 'ANZG 2018 95% guideline value, arsenic',
      then: '13', now: '13', unit: 'µg/L',
      source: 'Criteria set ANZG 2018 · 95% species protection · version 2018.1', at: 'criteria',
    },
    {
      id: 'mk-p', label: 'Mann–Kendall p',
      then: '0.003', now: '0.003', unit: '',
      source: `${TREND.plain.name} over ${TREND.n} quarterly rounds · services/stats`, at: 'statistics',
    },
    {
      id: 'sen', label: 'Sen’s slope', suffix: ' µg/L per quarter',
      then: '1.77', now: '1.7666666666666666', unit: '',
      source: `${TREND.plain.name} · services/stats`, at: 'statistics',
      moved:
        'The stats worker returns the slope at full precision since the 2026-08-19 upgrade; it returned two decimal places before. Nothing about the series changed and nothing about the finding changed — the number simply arrived with more digits on it.',
    },
    {
      id: 'as-mw03b', label: 'Arsenic at MW03B',
      then: '31', now: '3.1', unit: 'µg/L',
      source: `Certificate ${SUPERSESSION.superseding.certificate}, superseding ${SUPERSESSION.original.certificate}`, at: 'supersession',
      moved: SUPERSESSION.reason,
    },
  ].map((c) => {
    const rendered = R.apply(c.now);
    const renderedThen = R.apply(c.then);
    return {
      ...c,
      rendered,
      renderedThen,
      /** Did the *rendered* form move? That is the only question the check asks. */
      moves: rendered !== renderedThen,
      /** Did the stored value move at all? Recorded, because it is a different fact. */
      sourceMoved: String(c.then) !== String(c.now),
    };
  });

  /**
   * A cross-reference token: a reference to the *item*, not to its number.
   *
   * `renders` is the number the item carries today. `renumbering` is what the
   * token would render if the staged figure insert on `#report-figures` were
   * taken — and the sentence is **not** flagged for it, because the sentence
   * never contained the number. `contentChanged` is what does flag it.
   */
  const tokens = [
    {
      id: 'fig-as', title: 'Arsenic at MW05, with censoring', label: 'Arsenic series',
      at: 'hydrograph', contentChanged: null,
    },
    {
      id: 'fig-trend', title: 'Arsenic trend at MW05', label: 'Trend plot',
      at: 'statistics', contentChanged: null,
    },
    {
      id: 'fig-piper', title: 'Piper trilinear diagram', label: 'Piper diagram',
      at: 'hydrochem', contentChanged: null,
    },
    {
      id: 'fig-pot', title: 'Potentiometric surface, May 2026', label: 'Potentiometric surface',
      at: 'map',
      /*
       * A figure can change twice, and the second change does not overwrite
       * the first — an author who has not looked since May is owed both. So
       * `contentChanged` is the latest and `previously` is what it displaced,
       * kept whole.
       */
      contentChanged: {
        at: '2026-09-02',
        what: 'Every head on the fit that belongs to a bore dipped this round is now reduced from the field record — top of casing less the round’s own depth to water — rather than stated. Two of them were not: MW07 stood 0.53 m and MW12 1.41 m away from what the tape and the survey say, on a plate whose largest residual was 0.04 m.',
        moved: 'The flow direction, the gradient and the residual all moved, and the residual moved by an order of magnitude — because it is now measuring how far from planar the aquifer is rather than how carefully the inputs were chosen. The reading the sentence makes — the TSF sits upgradient of MW05 — did not.',
        owed: 'The author is asked to look at the plate and confirm the sentence still says what they meant. Nothing about the sentence has been changed, and nothing will be.',
        previously: {
          at: '2026-09-01',
          what: 'MW11 was dipped to the base of its screened interval on 14 May and found dry, so it carries no head and is no longer a control point on the fit. The plate is fitted through seven bores where it was fitted through eight, and it draws MW11 as a dry bore rather than omitting it.',
          moved: 'The flow direction and the gradient both moved, in the third significant figure. The reading the sentence makes — the TSF sits upgradient of MW05 — did not.',
        },
      },
    },
  ].map((t) => {
    const item = itemOf(t.title);
    const move = renumbered(t.title);
    return {
      ...t,
      renders: item.n,
      section: item.section,
      renumbering: move ? { from: move.from, to: move.to } : null,
      state: t.contentChanged ? 'content changed — the sentence is flagged' : 'current',
    };
  });

  const cite = (id) => ({ cite: citations.find((c) => c.id === id) });
  const tok = (id) => ({ token: tokens.find((t) => t.id === id) });
  const t = (text) => ({ t: text });

  const passages = [
    {
      id: '6.1',
      heading: '6.1 Groundwater quality at MW05',
      by: 'A. Nakamura',
      at: '2026-08-24 08:51 AWST',
      paras: [
        [
          t('Arsenic at MW05 was reported at '), cite('as-mw05'),
          t(', above the ANZG 2018 95% species protection guideline value of '), cite('as-dgv'),
          t(' and the third consecutive quarter above that value '), tok('fig-as'), t('.'),
        ],
        [
          t('Mann–Kendall over fourteen quarterly rounds reports a significant increasing trend ('), cite('mk-p'),
          t(') with a Sen’s slope of '), cite('sen'), t(' '), tok('fig-trend'), t('.'),
        ],
        [
          t('The major-ion signature at MW05 is sulfate-dominated and distinct from the calcium–bicarbonate background of every other bore '), tok('fig-piper'),
          t('; the bore sits directly downgradient of the tailings storage facility on the May 2026 potentiometric surface '), tok('fig-pot'),
          t('; and every elevated parameter is elevated against the site’s own background as well as against a guideline value. Taken together this is consistent with seepage from the tailings storage facility rather than with natural variation.'),
        ],
        [
          t('Cadmium could not be assessed at any location this round: the laboratory’s limit of reporting of 1.0 µg/L sits above the guideline value of 0.54 µg/L'),
        ],
      ],
      /** The sentence the evidence set is pinned to — the inference, not the arithmetic. */
      pinned: 2,
      unfinished: 3,
    },
    {
      id: '6.2',
      heading: '6.2 Compliance boundary and the upgradient bores',
      by: 'A. Nakamura',
      at: '2026-05-19 16:20 AWST',
      paras: [
        [
          t('Arsenic at MW03B was reported at '), cite('as-mw03b'),
          t(', which is above the guideline value and the first such result at an upgradient bore in this programme.'),
        ],
      ],
      flagged: 0,
    },
  ];

  const flaggedTokens = tokens.filter((x) => x.contentChanged);
  const flaggedCitations = citations.filter((c) => c.moves);
  const quiet = citations.filter((c) => c.sourceMoved && !c.moves);

  return {
    rule: R,
    passages,
    citations,
    tokens,
    counts: {
      citations: citations.length,
      tokens: tokens.length,
      flagged: flaggedTokens.length + flaggedCitations.length,
      renumbered: tokens.filter((x) => x.renumbering).length,
      quiet: quiet.length,
    },
    flaggedTokens,
    flaggedCitations,
    quiet,
    /** What the workspace refuses to do, said on the screen rather than only here. */
    refused: [
      { what: 'Rewrite a flagged sentence with the current value', why: 'A sentence somebody wrote is theirs. The workspace names it, shows both values and offers the correction; taking it is the author’s act and it is attributed to them.' },
      { what: 'Score the inference, or rate the evidence', why: 'The evidence set exists so a reviewer sees what the author saw. A product that graded a hydrogeological judgement would be making one, in somebody else’s name.' },
      { what: 'Flag a sentence because a figure was renumbered', why: 'The sentence never contained the number. A cross-reference token resolves to the item, so renumbering moves the rendering and leaves the prose alone.' },
      { what: 'Flag a sentence because a stored value gained digits', why: 'The rendering rule decides what the sentence says. If the rendered form has not moved, nothing a reader can see has changed.' },
    ],
  };
})();

/**
 * The evidence set pinned to the TSF-seepage sentence (PR-4a).
 *
 * The review's list of what a practitioner wants in front of them before
 * signing that sentence, drawn as the eight tiles it names: hydrograph, head
 * contours, Piper/Stiff, source chemistry, background comparison, trend, QA/QC
 * status, bore construction.
 *
 * **Every tile references a plate or a record this catalogue already draws.**
 * No new figure family is introduced — the grammar is frozen and a new family
 * needs a written proposal to Jerry first (brief §5.8) — and the one item on
 * the review's list with nothing behind it, source chemistry, is drawn as the
 * gap it is rather than filled with an invention. An evidence set that quietly
 * omits the evidence nobody has is worse than one that names it.
 *
 * A tile references rather than re-renders. The plates are drawn to 180 mm and
 * a thumbnail of a Piper diagram at tile size is a grey triangle; the tile
 * says what the plate shows, what it does not settle, and opens it at full
 * size. *What it does not settle* is the field that keeps this a set of
 * evidence rather than a set of arguments.
 */
export const EVIDENCE = (() => {
  const passage = NARRATIVE.passages[0];
  const tiles = [
    {
      kind: 'Hydrograph',
      ref: 'Figure 4.1 — groundwater elevation at MW05, MW07 and MW01A, with rainfall',
      shows: 'A falling trend at MW05 through three years of wet-season recovery, against two bores that hold level. The seepage mound is a water-level story before it is a chemistry one.',
      notSettled: 'A hydrograph cannot distinguish seepage from abstraction. There is no production bore within 400 m of MW05, and that is a fact off the location register rather than something this plate shows.',
      at: 'hydrograph', drawn: true,
    },
    {
      kind: 'Head contours',
      ref: 'Figure 6.1 — potentiometric surface and flow direction, May 2026',
      shows: 'A planar least-squares fit through the superficial bores that carry a head this round, with the largest residual printed on the plate. It puts the tailings storage facility upgradient of MW05 and MW07, and those upgradient of the compliance boundary.',
      notSettled: 'A plane states one gradient and one direction. It cannot show local structure, and it says nothing about vertical flow — that argument is the nest at MW01A/MW03B, which is its own record.',
      at: 'map', drawn: true,
    },
    {
      kind: 'Major-ion signature',
      ref: 'Figure 4.3 — Piper trilinear diagram, and Figure 4.4 — Stiff diagrams by location',
      shows: 'MW05 plots away from every other bore on the sulfate limb while the background and upgradient bores cluster as calcium–bicarbonate waters. A signature, not a concentration.',
      notSettled: 'A distinct signature says this water is different. It does not say what made it different, and evaporative concentration would move a bore along the same limb.',
      at: 'hydrochem', drawn: true,
    },
    {
      kind: 'Source chemistry',
      ref: 'No analysis of the tailings liquor is held on this project',
      shows: 'Nothing. The only TSF record here is the embankment piezometer TSF-VWP-03, which measures a phreatic surface and not a chemistry.',
      notSettled: 'This is the piece of evidence that would settle it, and it is absent. The inference rests on the pattern at MW05 against the site’s own background rather than on a source fingerprint, and the reviewer is told that here rather than discovering it.',
      at: 'locations', drawn: false,
      owed: 'A decant or underdrainage analysis would make the comparison direct. It is a sampling decision, not a software one.',
    },
    {
      kind: 'Background comparison',
      ref: 'Site-specific trigger values from the reference distribution — MW12, MW01A and MW03B, fourteen rounds each',
      shows: 'Every elevated parameter at MW05 is elevated against the site’s own background as well as against a guideline value, and the 80th-percentile trigger values are derived by Kaplan–Meier rather than by substituting half the limit of reporting.',
      notSettled: 'A background comparison establishes difference from the reference population. Attribution to a particular source is the hydrogeologist’s inference, and this screen is one of its inputs.',
      at: 'background', drawn: true,
    },
    {
      kind: 'Trend',
      ref: 'Figure 4.6 — arsenic trend at MW05, Mann–Kendall with Sen’s slope',
      shows: 'A significant increasing trend over fourteen quarterly rounds, reported alongside the seasonal test because the series is seasonal and the plain test treats that structure as trend.',
      notSettled: 'A trend says the concentration is rising. It does not say why, and it is the same series the outlier check on the QA/QC screen is asking a different question of.',
      at: 'statistics', drawn: true,
    },
    {
      kind: 'QA/QC status',
      ref: 'The round’s decision layer — what is still owed on the data this sentence rests on',
      shows: 'Whether the numbers under the interpretation are settled. Three findings on this round still need a hydrogeologist, and one of them decides whether nine zinc results carry a qualifier.',
      notSettled: 'None of the open findings reaches the arsenic, sulfate or PFAS results this passage argues from — but the reviewer should see that stated rather than assume it.',
      at: 'qc', drawn: true,
    },
    {
      kind: 'Bore construction',
      ref: 'MW05 construction log — screened interval, casing, annulus and the survey the datum stands on',
      shows: 'The screen sits wholly within the weathered granite below a bentonite seal, so the sample represents the superficial aquifer at 12–18 m and nothing above it. uPVC casing throughout, which is why a metals result here is not read against a steel-cased bore.',
      notSettled: 'Construction says what the sample represents. It cannot say whether the water reaching that interval came from the tailings storage facility.',
      at: 'location', drawn: true,
    },
  ];
  return {
    passage: passage.id,
    paragraph: passage.pinned,
    pinnedBy: 'A. Nakamura',
    pinnedAt: '2026-08-24 09:12 AWST',
    tiles,
    drawn: tiles.filter((x) => x.drawn).length,
    gaps: tiles.filter((x) => !x.drawn).length,
    says:
      'Pinned to the sentence, kept with it, and shown to whoever reviews it. This is what the author had in front of them when they wrote it.',
    /**
     * The alternatives, in the author's own words and attributed to them.
     *
     * The review asked for the competing explanations, and they belong here as
     * authored content rather than as a list the product generated: a product
     * that proposed the alternatives would be proposing the conclusion too.
     *
     * ## FOUND AND DEFERRED — 2 September 2026 (wave 15), owner unassigned
     *
     * **The fourth alternative cites a control that does not exist for the
     * analyte it is arguing about.** *"Four consecutive rounds, two
     * laboratories on the PFAS suite, and the field and equipment blanks
     * clear"* is the author's case against a laboratory or sampling artefact.
     * Wave 15 measured how far the PFAS suite reached on this round
     * (`PFAS_REACH`) and the answer is one sample: the field blank, the trip
     * blank and the equipment blank carry 14 tests each and **none of them is
     * a PFAS test**, so for this analyte the blanks are neither clear nor
     * unclear — they were never asked. The passage argues from arsenic,
     * sulfate *and* PFAS, and the blank limb is sound for the first two, so
     * this is a weakened argument rather than a false sentence. (The equipment
     * blank is also not clear in the ordinary sense: `EB-1` holds zinc at 1.4
     * µg/L against a 1.0 µg/L limit of reporting, which predates this wave.)
     *
     * **Why it is not fixed here.** The fix is not arithmetic. Either the
     * product edits an attributed professional judgement — which the `refused`
     * clause four lines below forbids in as many words, and which is the one
     * thing this screen exists to make impossible — or the evidence workspace
     * grows a way to surface *a challenge to an authored alternative*, which is
     * a new interaction on `#narrative` with its own consequences for
     * `EVIDENCE.tiles`, the staleness rule and the report's §6. That is a
     * design decision with a screen on the other end of it, not a sentence to
     * rewrite in a wave about a sample count.
     *
     * What this wave does instead is what wave 7 did with the three-way: name
     * it, measure it, and leave the author's words alone. The ledger went four
     * → three when the PFAS three-way closed and three → four when this opened;
     * a register of debts is a register of the truth rather than a target, and
     * a wave that found one and did not write it down would be trading the
     * ledger's meaning for its number.
     */
    competing: [
      { what: 'Evaporative concentration in a shallow bore', by: 'A. Nakamura', says: 'Would move the bore along the sulfate limb and raise every ion together. Chloride has not moved with sulfate here, and the ratio is the test.' },
      { what: 'Natural sulfate from the weathered profile', by: 'A. Nakamura', says: 'MW12 and MW01A are screened in the same unit and show none of it, which is what makes the background comparison the load-bearing evidence rather than a formality.' },
      { what: 'Abstraction drawing older, more mineralised water', by: 'A. Nakamura', says: 'No production bore within 400 m, and the hydrograph shows a decline that does not follow the borefield’s pumping pattern.' },
      { what: 'A laboratory or sampling artefact', by: 'A. Nakamura', says: 'Four consecutive rounds, two laboratories on the PFAS suite, and the field and equipment blanks clear. A four-round artefact is a different and larger claim than a seepage one.' },
    ],
    refused:
      'The product does not weigh these against each other and does not tell the author which one is right. It keeps them with the sentence so a reviewer can see that they were considered, and so a reviewer who disagrees knows exactly what to disagree with.',
  };
})();

/* ==================================================================== *
 * Wave 8 — the raw and corrected series at MW05
 *
 * FR-1.10 in one object: a continuous series held **separately from the
 * discrete results**, with **raw and corrected retained independently**. The
 * raw record is the pressure the instrument wrote; every water level, every
 * depth to water and every groundwater elevation below is *derived from that
 * pressure* by the rule named here, at the rounding the instrument reports —
 * so an auditor with a calculator and the six sample rows can reproduce the
 * series without running this file.
 *
 * **Nothing is typed that can be computed.** The gap is the service record's
 * own fortnight, resolved through `INSTRUMENTS.deployments`; the drawdown on
 * 13 May is the purge log's own two numbers; the dip that caught the error is
 * `FIELD_ROUND`'s own depth to water; the survey the elevation reduces
 * through is `CONSTRUCTION`'s own history.
 *
 * **Instants are AWST wall-clock, computed in UTC arithmetic.** Australia/Perth
 * has no daylight saving, so a fixed offset is exact — and doing the
 * arithmetic in `Date.UTC` rather than in local time is what makes a rebuild
 * on a machine in another zone byte-identical (§5.6). The strings carry AWST
 * where they are drawn.
 * ==================================================================== */

export const LOGGER_SERIES = (() => {
  const code = 'MW05';
  const loc = LOCATIONS.find((l) => l.code === code);
  const bore = CONSTRUCTION.of(code);
  const session = FIELD_ROUND.sessions.find((s) => s.location === code && s.purge);
  const roundDay = FIELD_ROUND.days.find((d) => d.n === session.day).date;
  const readings = session.purge.readings;

  /**
   * The compensation rule, with its constants (PP3).
   *
   * A non-vented transducer measures **total** pressure — the water above it
   * plus the atmosphere above that — so the atmosphere has to be taken off
   * before anything the number says is about groundwater. `density` is the
   * pressure of one metre of water at 4 °C; `lapse` is how fast atmospheric
   * pressure falls with elevation in the standard atmosphere, and it is here
   * because the barometer and the water surface are not at the same height.
   */
  const RULE = {
    id: 'baro-compensation-nonvented',
    version: 'v1.3',
    name: 'Barometric compensation — non-vented absolute transducer',
    density: 9.804,
    lapse: 0.01195,
    nominal: 101.325,
    effective: '2025-04-01',
    /*
     * How far a logger may sit from a dipper before the disagreement is a
     * finding. It is here rather than in three sentences on the screen,
     * because it is the number the check is made of and this wave exists to
     * stop constants being retyped beside the things that use them.
     */
    dipAcceptance: 0.05,
    dipAcceptanceText: '±0.05 m',
  };

  const HOUR = 3600000;
  const utc = (y, m, d, h, mi = 0) => Date.UTC(y, m - 1, d, h, mi);
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = (ms) => {
    const t = new Date(ms);
    return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())} ${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}`;
  };
  const dayOf = (ms) => stamp(ms).slice(0, 10);
  const instantOn = (isoDate, hhmm) => {
    const [y, m, d] = isoDate.split('-').map(Number);
    const [h, mi] = hhmm.split(':').map(Number);
    return utc(y, m, d, h, mi);
  };

  /* The window the file covers, and the two deployments inside it. */
  const start = utc(2026, 3, 15, 0);
  const end = utc(2026, 5, 31, 23);
  const slots = Math.round((end - start) / HOUR) + 1;

  const mine = INSTRUMENTS.deployments.filter((d) => d.at === code);
  const before = mine.find((d) => d.to !== null);
  const after = mine.find((d) => d.to === null);
  const removedAt = instantOn(before.to, `${pad(before.toHour)}:00`);
  const redeployedAt = instantOn(after.from, `${pad(after.fromHour)}:00`);
  const logger = INSTRUMENTS.of(after.instrument);

  /* The barometric source in force, resolved through the group rather than named. */
  const group = INSTRUMENTS.groupOf(code);
  const sourceRow = INSTRUMENTS.sourceFor(group.name, dayOf(end));
  const barometer = INSTRUMENTS.of(sourceRow.source);
  const station = INSTRUMENTS.stationOf(barometer.held);

  /*
   * The elevation offset, and why it is not dropped for being small.
   *
   * The barometer sits at the site gauge station; the water surface at this
   * bore stands roughly thirteen metres lower, and atmospheric pressure is
   * higher down there by that difference times the lapse rate. It comes to a
   * centimetre and a half of water. Carrying it costs a multiplication and
   * makes the rule true; dropping it because it is small this time is how a
   * rule comes to be dropped when it is not.
   *
   * The reference elevation is the round's own dipped level, held constant
   * across the deployment: re-deriving it from the level being computed would
   * make the rule circular.
   */
  const referenceElevation = Number((loc.toc - session.depthToWater).toFixed(2));
  const offsetKPa = Number(((station.elevation - referenceElevation) * RULE.lapse).toFixed(4));
  const offsetMetres = Number((offsetKPa / RULE.density).toFixed(4));

  /*
   * The barometric series — hourly, and it has no gap. The bore's logger went
   * to the workshop; the barometer did not, which is why the compensation has
   * an input for every hour the bore has a water level and for 336 hours it
   * does not.
   */
  const baroRandom = prng(20260315);
  const baro = [];
  for (let i = 0; i < slots; i += 1) {
    const days = i / 24;
    const synoptic = 1.05 * Math.sin((2 * Math.PI * days) / 6.5 + 0.7) + 0.62 * Math.sin((2 * Math.PI * days) / 11.3 + 2.1);
    const semidiurnal = 0.13 * Math.sin((2 * Math.PI * i) / 12 + 1.2);
    const noise = (baroRandom() - 0.5) * 0.06;
    baro.push({ i, ms: start + i * HOUR, at: stamp(start + i * HOUR), kPa: Number((98.8 + synoptic + semidiurnal + noise).toFixed(3)) });
  }
  const baroMean = baro.reduce((t, b) => t + b.kPa, 0) / baro.length;

  /*
   * The three manual dips over this window.
   *
   * The May one is not a new number: it is `FIELD_ROUND`'s own depth to water
   * at this bore, at the minute the purge log recorded it. The April one was
   * taken *because* the logger was out — it is the only water level this bore
   * has for that fortnight, which is the whole argument against treating a
   * logger as a replacement for a dipper.
   */
  const dips = [
    { ms: utc(2026, 3, 16, 9, 20), dtw: 8.31, by: 'A. Nakamura', why: 'Routine dip at the quarterly logger download' },
    { ms: utc(2026, 4, 14, 8, 5), dtw: 8.39, by: 'D. Okafor', why: 'Dipped because the logger was out for service — the only water level this bore has for that fortnight' },
    { ms: instantOn(roundDay, readings.at(-1).t), dtw: session.depthToWater, by: FIELD_ROUND.crew, why: `The ${FIELD_ROUND.round} round’s own dip, read at the end of purging` },
  ].map((d) => {
    // Each dip's elevation is derived at *its own* measurement date through the
    // survey in force then — the same rule the hourly water levels follow, and
    // the reason it is derived twice rather than stored once.
    const survey = bore.surveys.find((s) => s.epoch <= stamp(d.ms).slice(0, 10)) ?? bore.surveys.at(-1);
    return {
      ...d,
      at: stamp(d.ms),
      slot: (d.ms - start) / HOUR,
      survey: survey.epoch,
      toc: survey.toc,
      elevation: Number((survey.toc - d.dtw).toFixed(3)),
    };
  });

  /*
   * The purge on 13 May, as the logger would have felt it.
   *
   * Both numbers come from the purge log: the level as found is its first
   * reading, and the drawdown is the difference between that and the level at
   * collection. A logger sitting in the bore records the same drawdown the
   * field sheet describes, from a different instrument — which is why the
   * detector flags it and why the finding resolves rather than being raised.
   */
  const asFound = readings[0].swl;
  const drawdown = Number((session.depthToWater - asFound).toFixed(3));
  const purgeStart = instantOn(roundDay, session.purge.startedAt);
  const purgeSampled = instantOn(roundDay, session.purge.sampledAt);
  const RECOVERY = 45 * 60000;

  /* The anomaly: water up 0.38 m for five hours, and back. Nothing in the
   * barometric record moves with it, which is what makes it a finding. */
  const spike = { from: utc(2026, 5, 4, 2), peak: utc(2026, 5, 4, 4), to: utc(2026, 5, 4, 7), metres: 0.38 };

  const anchors = [
    { ms: dips[0].ms, dtw: dips[0].dtw },
    { ms: dips[1].ms, dtw: dips[1].dtw },
    { ms: instantOn(roundDay, readings[0].t), dtw: asFound },
  ];
  const trend = (ms) => {
    if (ms <= anchors[0].ms) {
      const s = (anchors[1].dtw - anchors[0].dtw) / (anchors[1].ms - anchors[0].ms);
      return anchors[0].dtw + s * (ms - anchors[0].ms);
    }
    for (let k = 1; k < anchors.length; k += 1) {
      if (ms <= anchors[k].ms) {
        const s = (anchors[k].dtw - anchors[k - 1].dtw) / (anchors[k].ms - anchors[k - 1].ms);
        return anchors[k - 1].dtw + s * (ms - anchors[k - 1].ms);
      }
    }
    const n = anchors.length;
    const s = (anchors[n - 1].dtw - anchors[n - 2].dtw) / (anchors[n - 1].ms - anchors[n - 2].ms);
    return anchors[n - 1].dtw + s * (ms - anchors[n - 1].ms);
  };

  const wlRandom = prng(80426);
  const noise = Array.from({ length: slots }, () => (wlRandom() - 0.5) * 0.006);
  const BAROMETRIC_EFFICIENCY = 0.12;

  const featureAt = (ms) => {
    let v = 0;
    if (ms >= spike.from && ms <= spike.to) {
      const f = ms <= spike.peak
        ? (ms - spike.from) / (spike.peak - spike.from)
        : 1 - (ms - spike.peak) / (spike.to - spike.peak);
      v -= spike.metres * f;
    }
    if (ms >= purgeStart) {
      v += ms <= purgeSampled
        ? drawdown * ((ms - purgeStart) / (purgeSampled - purgeStart))
        : drawdown * Math.exp(-(ms - purgeSampled) / RECOVERY);
    }
    return v;
  };

  /*
   * The raw record — the only thing here that is *stored*. Everything below
   * is derived from it, from the barometric series, and from the rule.
   */
  const raws = [];
  for (let i = 0; i < slots; i += 1) {
    const ms = start + i * HOUR;
    if (ms >= removedAt && ms < redeployedAt) continue;
    const deployment = ms < removedAt ? before : after;
    const dtw = trend(ms) + (BAROMETRIC_EFFICIENCY * (baro[i].kPa - baroMean)) / RULE.density + featureAt(ms) + noise[i];
    const column = deployment.sensor - dtw;
    const atBore = baro[i].kPa + offsetKPa;
    raws.push({
      i,
      ms,
      at: stamp(ms),
      kPa: Number((atBore + RULE.density * column).toFixed(3)),
      deployment,
    });
  }

  /** The survey in force on the date a water level was measured (ADR-0015). */
  const surveyOn = (isoDate) => bore.surveys.find((s) => s.epoch <= isoDate) ?? bore.surveys.at(-1);

  const reduce = (kPa, sensor, baroKPa) => {
    const column = (kPa - baroKPa) / RULE.density;
    return { column, dtw: sensor - column };
  };

  const points = raws.map((r) => {
    const atBore = Number((baro[r.i].kPa + offsetKPa).toFixed(3));
    const corrected = reduce(r.kPa, r.deployment.sensor, atBore);
    const asImported = reduce(r.kPa, r.deployment.sensorWas ?? r.deployment.sensor, atBore);
    const uncompensated = reduce(r.kPa, r.deployment.sensor, RULE.nominal);
    const survey = surveyOn(dayOf(r.ms));
    return {
      i: r.i,
      ms: r.ms,
      at: r.at,
      day: dayOf(r.ms),
      kPa: r.kPa,
      baro: baro[r.i].kPa,
      baroAtBore: atBore,
      sensor: r.deployment.sensor,
      sensorAsImported: r.deployment.sensorWas ?? r.deployment.sensor,
      column: Number(corrected.column.toFixed(3)),
      dtw: Number(corrected.dtw.toFixed(3)),
      dtwAsImported: Number(asImported.dtw.toFixed(3)),
      dtwUncompensated: Number(uncompensated.dtw.toFixed(3)),
      survey: survey.epoch,
      toc: survey.toc,
      elevation: Number((survey.toc - corrected.dtw).toFixed(3)),
      elevationUncompensated: Number((survey.toc - uncompensated.dtw).toFixed(3)),
      corrected: r.ms >= redeployedAt,
    };
  });

  /*
   * The anomaly test — the same method `EC_MW05_OUTLIER` uses, run on the
   * hourly change rather than on the value. A modified z-score over the
   * bore's own record, because no fixed limit can answer "did this move
   * faster than this bore moves". The difference is never taken across the
   * gap: a fortnight of absence is not a step.
   */
  const median = (xs) => {
    const s = [...xs].sort((a, b) => a - b);
    const m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  const steps = [];
  for (let k = 1; k < points.length; k += 1) {
    if (points[k].i !== points[k - 1].i + 1) continue;
    steps.push({ k, ms: points[k].ms, at: points[k].at, d: Number((points[k].dtw - points[k - 1].dtw).toFixed(4)) });
  }
  const med = median(steps.map((s) => s.d));
  const mad = median(steps.map((s) => Math.abs(s.d - med)));
  const scored = steps.map((s) => ({ ...s, z: (0.6745 * (s.d - med)) / mad }));
  const flagged = scored.filter((s) => Math.abs(s.z) > 3.5);

  const runs = [];
  for (const f of flagged) {
    const last = runs.at(-1);
    if (last && f.k === last.lastK + 1) {
      last.lastK = f.k;
      last.to = f.at;
      last.toMs = f.ms;
      last.peak = Math.abs(f.z) > Math.abs(last.peak) ? f.z : last.peak;
      last.hours += 1;
    } else {
      runs.push({ firstK: f.k, lastK: f.k, from: f.at, fromMs: f.ms, to: f.at, toMs: f.ms, peak: f.z, hours: 1 });
    }
  }

  const purgeWindow = [purgeStart, purgeSampled + 3 * HOUR];
  const findings = runs.map((r, n) => {
    const explained = r.fromMs >= purgeWindow[0] - HOUR && r.toMs <= purgeWindow[1];
    const span = points.slice(r.firstK - 1, r.lastK + 1);
    const swing = Number((Math.max(...span.map((p) => p.dtw)) - Math.min(...span.map((p) => p.dtw))).toFixed(3));
    /*
     * What the barometer did over the same hours, measured rather than
     * asserted. "The barometric record does not move with it" is the whole
     * evidence for calling a pressure step a finding instead of weather, so
     * it is a number on the record and not a sentence beside it.
     */
    const overBaro = baro.slice(span[0].i, span.at(-1).i + 1).map((b) => b.kPa);
    const baroSwing = Number((Math.max(...overBaro) - Math.min(...overBaro)).toFixed(3));
    /*
     * The run is a run of flagged *changes*, so the water level the change
     * started from is one point earlier. `spanFrom` is that point and
     * `peak` is the extreme one inside the run — both are exported because a
     * screen that wants to say "the instrument wrote X and then Y" must not
     * do that arithmetic on a timestamp string.
     */
    const peakPoint = span.reduce((best, p) => (Math.abs(p.dtw - span[0].dtw) > Math.abs(best.dtw - span[0].dtw) ? p : best), span[0]);
    return {
      id: `MOCK-FIND-LS-${String(n + 1).padStart(2, '0')}`,
      from: r.from,
      to: r.to,
      spanFrom: span[0].at,
      spanFromKPa: span[0].kPa,
      peakAt: peakPoint.at,
      peakKPa: peakPoint.kPa,
      hours: r.hours,
      levels: span.length,
      swing,
      baroSwing,
      baroEquivalent: Number((baroSwing / RULE.density).toFixed(3)),
      score: Math.abs(r.peak).toFixed(1),
      explained,
      state: explained ? 'dispositioned' : 'unresolved',
      what: explained
        ? `Water level fell ${swing.toFixed(3)} m and recovered, across the hours the purge log covers.`
        : `Water level rose ${swing.toFixed(3)} m over ${r.hours} hours and returned. Atmospheric pressure moved ${baroSwing.toFixed(3)} kPa over the same hours — ${(baroSwing / RULE.density).toFixed(3)} m of water, and the wrong way to explain it.`,
      because: explained
        ? `The field record has this bore purged at ${session.purge.rateText} from ${session.purge.startedAt} to ${session.purge.sampledAt} on ${roundDay}, with a recorded drawdown of ${drawdown.toFixed(2)} m. The logger recorded the same event the field sheet describes, from a different instrument. Dispositioned by rule against the field record — not by anyone deciding case by case.`
        : 'Raised, not resolved. A pressure step with no barometric counterpart is a recharge pulse, a slug of water down the annulus, or the instrument. The product does not choose between them, and the corrected series does not smooth it away: a correction that removes what it cannot explain has destroyed the evidence for the explanation.',
    };
  });

  /*
   * The correction. It **supersedes** — the glossary's word — the corrected
   * series over the span it reaches, and it touches no raw pressure: the
   * instrument's own record is what it wrote, and it was never wrong.
   */
  const reach = points.filter((p) => p.corrected);
  const dipChecks = dips.map((d) => {
    const inGap = d.ms >= removedAt && d.ms < redeployedAt;
    if (inGap) {
      return {
        ...d,
        inGap: true,
        nearest: null,
        offsetMinutes: null,
        residual: null,
        residualAsImported: null,
        verdict: 'no comparison — the instrument was not in the bore',
      };
    }
    const nearest = points.reduce((best, p) => (Math.abs(p.ms - d.ms) < Math.abs(best.ms - d.ms) ? p : best));
    return {
      ...d,
      inGap: false,
      nearest,
      offsetMinutes: Math.round((nearest.ms - d.ms) / 60000),
      residual: Number((nearest.dtw - d.dtw).toFixed(3)),
      residualAsImported: Number((nearest.dtwAsImported - d.dtw).toFixed(3)),
      verdict: null,
    };
  }).map((c) => ({
    ...c,
    verdict: c.verdict ?? (Math.abs(c.residual) <= RULE.dipAcceptance ? 'within acceptance' : 'outside acceptance'),
  }));
  const caught = dipChecks.find((c) => !c.inGap && Math.abs(c.residualAsImported) > RULE.dipAcceptance);

  const correction = {
    id: 'MOCK-CORR-0007',
    subject: `Corrected water level series · ${code} · ${logger.asset}`,
    raisedBy: 'A. Nakamura',
    raisedAt: '2026-05-31 16:58 AWST',
    appliedBy: 'D. Okafor',
    appliedAt: '2026-06-01 09:12 AWST',
    reason: `The sensor depth was recorded as ${(after.sensorWas ?? after.sensor).toFixed(2)} m below top of casing when the instrument went back in the bore. The cable mark and the redeployment record say ${after.sensor.toFixed(2)} m. Every corrected water level from that hour onward was ${(((after.sensorWas ?? after.sensor) - after.sensor)).toFixed(2)} m too deep.`,
    found: caught
      ? `The ${caught.at} dip read ${caught.dtw.toFixed(2)} m btoc and the series read ${caught.nearest.dtwAsImported.toFixed(2)} m — ${Math.abs(caught.residualAsImported).toFixed(2)} m apart, against a ${RULE.dipAcceptanceText} acceptance. A logger that agrees with a dipper is checked; one that does not is what a check is for.`
      : null,
    rule: `${RULE.id} ${RULE.version}, re-run against the corrected deployment depth`,
    reachFrom: reach[0].at,
    reachTo: reach.at(-1).at,
    reachCount: reach.length,
    shift: Number((((after.sensorWas ?? after.sensor) - after.sensor)).toFixed(3)),
    raw: 'Untouched. The pressure record is what the instrument wrote and no correction reaches it — this one changed a number the compensation was given, not a number it was told.',
    supersedes: 'The corrected series as imported. Both readings stay on the record and the superseded one is drawn struck through, because what was reported then is a different question from what the record says now.',
  };

  /* Six rows an auditor can reproduce with a calculator. */
  const pick = (ms) => points.reduce((best, p) => (Math.abs(p.ms - ms) < Math.abs(best.ms - ms) ? p : best));
  const samples = [
    { why: 'First water level in the file', p: points[0] },
    { why: 'Last before the instrument came out', p: points.filter((p) => p.ms < removedAt).at(-1) },
    { why: 'First after it went back in', p: points.find((p) => p.corrected) },
    { why: 'The anomaly, at its peak', p: pick(spike.peak) },
    { why: 'The hour the manual dip was checked against', p: dipChecks.at(-1).nearest },
    { why: 'Last water level in the file', p: points.at(-1) },
  ];

  return {
    code,
    loc,
    bore,
    logger,
    barometer,
    station,
    group,
    sourceRow,
    rule: RULE,
    barometricEfficiency: BAROMETRIC_EFFICIENCY,
    offsetKPa,
    offsetMetres,
    referenceElevation,
    window: { start, end, from: stamp(start), to: stamp(end), slots },
    gap: {
      from: stamp(removedAt),
      to: stamp(redeployedAt),
      hours: Math.round((redeployedAt - removedAt) / HOUR),
      days: Math.round((redeployedAt - removedAt) / (24 * HOUR)),
      service: INSTRUMENTS.services.filter((s) => s.instrument === logger.asset),
      why: 'The instrument was in the workshop. A polyline across it would assert 336 water levels nobody measured.',
    },
    deployments: mine,
    points,
    baro,
    dips,
    dipChecks,
    findings,
    correction,
    samples,
    anomaly: spike,
    purge: { start: session.purge.startedAt, sampled: session.purge.sampledAt, drawdown, asFound, at: session.depthToWater, day: roundDay },
    outlier: { n: steps.length, median: med.toFixed(4), mad: mad.toFixed(4), threshold: '3.5', method: 'Modified z-score (Iglewicz–Hoaglin) over the hourly change in depth to water, on this bore’s own record' },
    counts: {
      slots,
      gapHours: slots - points.length,
      water: points.length,
      baroReadings: baro.length,
      rowsRead: points.length + baro.length,
      series: 2,
      results: 0,
      reach: reach.length,
      dips: dips.length,
      findings: findings.length,
      raised: findings.filter((f) => !f.explained).length,
    },
  };
})();

/* ==================================================================== *
 * Wave 9 — soil, sediment, depth intervals and composites (FR-1.7)
 * ==================================================================== */

/**
 * A sample that is made of other samples, and the depth axis water has not got.
 *
 * ## Where every word comes from
 *
 * `docs/GLOSSARY.md` binds two entries here and supplies no third.
 * **Location class** is a property of the *place* — soil and sediment are two
 * of its nine, all present since S1 "not because the others are used, but
 * because adding one later is a migration against live data". **Matrix** is a
 * property of the *sample*, "recorded, never inferred from the location", and
 * the entry's own example is a groundwater location yielding a water sample
 * and, on the same visit, a sediment one.
 *
 * This investigation draws that example literally rather than describing it.
 * The sediment sample below is collected at **SW01**, whose location class is
 * *surface water*; the rinsate blank taken off soil equipment is a **water**
 * sample on a soil round; and the two composites are soil taken at locations
 * whose class is soil. Three samples, three matrices, and not one of them is
 * derivable from where it was standing.
 *
 * The nouns the glossary has no entry for come from FR-1.7's own sentence —
 * *"Store depth intervals on soil, sediment, and vapour samples, and represent
 * composite samples with traceability to constituent increments"* — so
 * **composite sample**, **constituent increment** and **depth interval** are
 * the requirement's words rather than minted ones (QB-9, ADR-0009).
 *
 * Three decisions had no anchor in either document, and are recorded here
 * rather than made in passing:
 *
 * - **compositing scheme** — the stated basis on which increments were
 *   combined. Deliberately not *compositing rule*: `rule` is the derivation
 *   engine's word (FR-2.1, FR-2.3) and a composite is emphatically **not** a
 *   derived value. See `notDerived` below, which is the whole of that
 *   distinction written down.
 * - **test pit** — the practitioner's word for how the hole was made. It is
 *   recorded as the location's `advanced` method and is not adopted as a
 *   class; the class is `soil`, which is the glossary's.
 * - **location codes** — `TP01`…`TP05` follow the site's own convention like
 *   every other row on the register (MW, SW, PB, TSF-VWP). `fixtures/partner/`
 *   and G-71 put the `MOCK-` prefix on the project code and on the
 *   identifiers that imitate an outside party's record — the custody form
 *   below carries it. The laboratory's work order and certificate follow the
 *   fictional laboratory's own numbering (`PAS-WO-…`, `PAS2026-…`, matching
 *   `PAS-WO-268841` from the groundwater round), where the fictional name is
 *   the marking — a real Pilbara Analytical Services does not exist to be
 *   imitated. Recorded this way after W9-A-1: the first draft of this comment
 *   claimed the work order carried the prefix, and it never did.
 *
 * ## Vapour is not drawn, and that is a decision
 *
 * FR-1.7 names three matrices and this seed carries honest context for two.
 * There is no soil-gas programme on this site, no probe on the location
 * register, and no criteria set that would receive a vapour result. Inventing
 * all three to fill a requirement's third noun would be drawing a matrix
 * rather than drawing a site, so the coverage row says *soil and sediment*
 * and names what it left out.
 *
 * ## What is evaluated, and what is honestly not
 *
 * Nothing. `criteria` below filters `CRITERIA_LIBRARY` for a soil or sediment
 * matrix and finds none, so every result in this investigation is
 * `not_evaluated` — the glossary's own consequence, computed rather than
 * asserted. A soil criteria set is a deliberate change on `#criteria` with an
 * effective date, an applicability rule and a version; it is not something an
 * investigation invents on its way past.
 */
export const SOIL = (() => {
  const round = '2026-M05-SOIL';
  const label = 'TSF seepage soil investigation';
  const crew = 'D. Okafor';
  const approver = 'R. Whitmore';
  const laboratory = 'Pilbara Analytical Services';
  const certificate = 'PAS2026-04361';
  const workOrder = 'PAS-WO-268503';
  const plan = 'Sampling and analysis plan — TSF toe seepage investigation, rev 1';
  const planApproved = '2026-05-04';
  /** The field screen above which a discrete sample was submitted. Decided in the plan. */
  const screenThreshold = 500;

  /** ISO date arithmetic at UTC midnight. No clock is read; a rebuild is identical. */
  const addDays = (iso, n) =>
    new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
  const m = (v) => v.toFixed(2);
  const span = (a, b) => `${m(a)} – ${m(b)} m`;

  /*
   * The depth-interval log — FR-1.7's first clause, and the record shape a
   * water sample has no equivalent of.
   *
   * A bore is logged once, when it is drilled, and the log is construction. A
   * test pit is logged **on the day it is opened**, by the person standing in
   * front of it, and the log is what the sampling decision is made from. So
   * the intervals are horizon boundaries rather than round numbers, and each
   * one carries the field screen that was read on it.
   *
   * `ec` is a **field screen**: electrical conductivity on a 1:5 soil:water
   * slurry, read on a handheld meter at the pit. It is not the laboratory's
   * number and it is never reported as one — it exists to choose which
   * interval goes in the jar, and the plan's rule (above `screenThreshold`)
   * is applied below rather than described.
   */
  const pits = [
    {
      code: 'TP01', day: 1, opened: '2026-05-06 08:10 AWST',
      advanced: 'Excavator, 600 mm mud bucket', refusal: 'Refusal on weathered granite at 2.10 m',
      backfill: 'Backfilled with the spoil in the order it came out, compacted in 300 mm lifts, 2026-05-06 12:40',
      intervals: [
        { from: 0.00, to: 0.30, material: 'Silty SAND — red-brown, fine to medium, trace rootlets', moisture: 'dry', ec: 210 },
        { from: 0.30, to: 0.90, material: 'Clayey SAND — pale brown, mottled orange', moisture: 'moist', ec: 640 },
        { from: 0.90, to: 1.60, material: 'Sandy CLAY — orange-brown, gypsum crystals on fracture faces', moisture: 'moist', ec: 1520 },
        { from: 1.60, to: 2.10, material: 'Weathered GRANITE — extremely low strength', moisture: 'moist', ec: 380, refusal: true },
      ],
    },
    {
      code: 'TP02', day: 1, opened: '2026-05-06 13:55 AWST',
      advanced: 'Excavator, 600 mm mud bucket', refusal: 'Refusal on weathered granite at 2.40 m',
      backfill: 'Backfilled with the spoil in the order it came out, compacted in 300 mm lifts, 2026-05-06 16:05',
      intervals: [
        { from: 0.00, to: 0.30, material: 'Silty SAND — red-brown, fine to medium', moisture: 'dry', ec: 180 },
        { from: 0.30, to: 1.00, material: 'Clayey SAND — pale brown, faint mottling', moisture: 'moist', ec: 410 },
        { from: 1.00, to: 1.80, material: 'Sandy CLAY — orange-brown', moisture: 'moist', ec: 760 },
        { from: 1.80, to: 2.40, material: 'Weathered GRANITE — extremely low strength', moisture: 'moist', ec: 240, refusal: true },
      ],
    },
    {
      code: 'TP03', day: 2, opened: '2026-05-07 07:40 AWST',
      advanced: 'Excavator, 600 mm mud bucket', refusal: 'Refusal on weathered granite at 2.00 m',
      backfill: 'Backfilled with the spoil in the order it came out, compacted in 300 mm lifts, 2026-05-07 09:50',
      intervals: [
        { from: 0.00, to: 0.30, material: 'Silty SAND — red-brown, fine to medium', moisture: 'dry', ec: 190 },
        { from: 0.30, to: 0.80, material: 'Clayey SAND — pale brown, mottled orange', moisture: 'moist', ec: 520 },
        { from: 0.80, to: 1.70, material: 'Sandy CLAY — orange-brown, occasional gypsum', moisture: 'moist', ec: 1080 },
        { from: 1.70, to: 2.00, material: 'Weathered GRANITE — extremely low strength', moisture: 'moist', ec: 300, refusal: true },
      ],
    },
    {
      code: 'TP04', day: 2, opened: '2026-05-07 10:25 AWST',
      advanced: 'Excavator, 600 mm mud bucket', refusal: 'Refusal on weathered granite at 1.90 m',
      backfill: 'Backfilled with the spoil in the order it came out, compacted in 300 mm lifts, 2026-05-07 11:55',
      intervals: [
        { from: 0.00, to: 0.30, material: 'Silty SAND — red-brown, fine to medium', moisture: 'dry', ec: 150 },
        { from: 0.30, to: 1.10, material: 'Clayey SAND — pale brown', moisture: 'slightly moist', ec: 330 },
        { from: 1.10, to: 1.90, material: 'Weathered GRANITE — extremely low strength', moisture: 'slightly moist', ec: 260, refusal: true },
      ],
    },
    {
      code: 'TP05', day: 2, opened: '2026-05-07 14:20 AWST',
      advanced: 'Excavator, 600 mm mud bucket', refusal: 'Refusal on weathered granite at 2.30 m',
      backfill: 'Backfilled with the spoil in the order it came out, compacted in 300 mm lifts, 2026-05-07 15:40',
      intervals: [
        { from: 0.00, to: 0.30, material: 'Silty SAND — red-brown, fine to medium, trace rootlets', moisture: 'dry', ec: 90 },
        { from: 0.30, to: 1.10, material: 'Clayey SAND — pale brown', moisture: 'slightly moist', ec: 140 },
        { from: 1.10, to: 2.30, material: 'Weathered GRANITE — extremely low strength', moisture: 'dry', ec: 110, refusal: true },
      ],
    },
  ];

  const pitOf = (code) => pits.find((p) => p.code === code);
  /** The soil rows of the location register, read from it rather than listed twice. */
  const places = LOCATIONS.filter((l) => l.klass === 'soil');
  /** Chainage along the seepage path, computed from the register's own coordinates. */
  const origin = LOCATIONS.find((l) => l.code === 'TP01');
  const chainage = (code) => {
    const l = LOCATIONS.find((x) => x.code === code);
    return Math.round(Math.hypot(l.easting - origin.easting, l.northing - origin.northing));
  };
  /** The deepest thing the pit reached, computed off the log. */
  const investigated = (code) => {
    const p = pitOf(code);
    return { from: p.intervals[0].from, to: p.intervals.at(-1).to, n: p.intervals.length };
  };
  /**
   * Which interval a discrete came out of — the plan's rule, applied.
   *
   * "One discrete from the interval with the highest field screen, refusal
   * horizons excluded, at any pit where that reading exceeds 500 µS/cm." The
   * background pit is submitted whatever it reads, because a control that is
   * only collected when it is interesting is not a control.
   */
  const chosen = (code) =>
    pitOf(code).intervals.filter((i) => !i.refusal).reduce((a, b) => (b.ec > a.ec ? b : a));
  const overThreshold = (code) => chosen(code).ec > screenThreshold;

  /* ---------------------------------------------------------------- *
   * The two composites, and the difference between where they were made
   * ---------------------------------------------------------------- */

  /**
   * One increment: a position, a depth interval, a mass, and what became of it.
   *
   * An increment has a **position** and does not have to be a registered
   * location. Four of C01's five were taken at test pits and the fifth at a
   * grid node between two of them, which is what a surface composite on a
   * grid actually looks like; the record carries the coordinate either way
   * (FR-1.2), and the location register is not asked to grow a row for a
   * trowel scrape.
   */
  const increment = ({ ref, at, node, easting, northing, from, to, mass, ec, sample = null, used = null, retained = null, note }) => ({
    ref, at, node, easting, northing, from, to, mass, ec, sample, used, retained, note,
    interval: span(from, to),
    where: at ?? node,
  });

  const c01Increments = [
    increment({ ref: 'C01-I1', at: 'TP01', easting: 513240, northing: 7652980, from: 0.00, to: 0.30, mass: 500, ec: 210, note: 'Surface scrape taken before the pit was opened' }),
    increment({ ref: 'C01-I2', at: 'TP02', easting: 513540, northing: 7652880, from: 0.00, to: 0.30, mass: 500, ec: 180, note: 'Surface scrape taken before the pit was opened' }),
    increment({ ref: 'C01-I3', node: 'Grid node G3', easting: 513690, northing: 7652830, from: 0.00, to: 0.30, mass: 500, ec: 200, note: 'Midway between TP02 and TP03 — a position on the grid, not a location on the register' }),
    increment({ ref: 'C01-I4', at: 'TP03', easting: 513840, northing: 7652780, from: 0.00, to: 0.30, mass: 500, ec: 190, note: 'Surface scrape taken before the pit was opened' }),
    increment({ ref: 'C01-I5', at: 'TP04', easting: 514140, northing: 7652680, from: 0.00, to: 0.30, mass: 500, ec: 150, note: 'Surface scrape taken before the pit was opened' }),
  ];

  const c02Increments = ['TP01', 'TP02', 'TP03', 'TP04'].map((code, i) => {
    const l = LOCATIONS.find((x) => x.code === code);
    const int = pitOf(code).intervals[1];
    return increment({
      ref: `C02-I${i + 1}`, at: code, easting: l.easting, northing: l.northing,
      from: int.from, to: int.to, mass: 1000, ec: int.ec,
      sample: `WDL-26M5-I0${i + 1}`, used: 250, retained: 750,
      note: 'Submitted whole and unopened; the laboratory took its share at the bench',
    });
  });

  const envelope = (incs) => ({
    from: Math.min(...incs.map((i) => i.from)),
    to: Math.max(...incs.map((i) => i.to)),
    exact: incs.every((i) => i.from === incs[0].from && i.to === incs[0].to),
  });

  const composites = [
    {
      id: 'WDL-26M5-C01',
      name: 'Surface composite — toe seepage area',
      where: 'field',
      whereLabel: 'Composited in the field',
      increments: c01Increments,
      scheme: 'Equal mass — 500 g from each of five increments, homogenised in a stainless bowl, then coned and quartered to a 1,000 g submission',
      schemeShort: 'equal mass, five increments',
      decidedBy: approver, decidedAt: planApproved,
      performedBy: crew, performedAt: '2026-05-06 11:20 AWST',
      why: 'One number for the surface of the toe seepage area. The surface interval is where run-off and wind-blown deposition would show, and it is the interval a rehabilitation decision is taken over — an average across the area answers that better than a number at one point does.',
      equipment: 'Stainless steel bowl and trowel, decontaminated before and after; the rinsate blank is the control on that decontamination',
      collectedMass: 2500,
      submittedMass: 1000,
      surplus: 'The remaining 1 500 g was returned to the TP04 spoil before backfilling, and the return is on the record.',
      containers: 2,
      retains: false,
      retainsWhy: 'The five increments were tipped into one bowl and homogenised. They no longer exist as material, so no analysis of any kind can recover which position carried what. Only a new visit can.',
      sample: null,
    },
    {
      id: 'WDL-26M5-C02',
      name: 'Shallow subsurface composite — seepage path',
      where: 'laboratory',
      whereLabel: 'Composited at the laboratory',
      increments: c02Increments,
      scheme: 'Equal mass — 250 g taken from each of four submitted increments and combined into a 1,000 g composite; the balance of each increment retained',
      schemeShort: 'equal mass, four increments',
      decidedBy: approver, decidedAt: planApproved,
      instructedBy: crew, instructedAt: '2026-05-07 16:30 AWST',
      performedBy: 'M. Toledo — PAS sample preparation', performedAt: '2026-05-11 10:15 AWST',
      why: 'Coverage of the shallow subsurface horizon across the whole path on one analysis, with the increments kept so the coverage can be turned back into resolution if the composite reads high. That second half is the reason it was sent to the bench rather than mixed in a bowl at the pit.',
      equipment: 'Stainless riffle splitter, laboratory bench, decontaminated between samples',
      collectedMass: 4000,
      submittedMass: 1000,
      surplus: null,
      containers: 0,
      retains: true,
      retainsWhy: 'The four increments arrived as four samples and 750 g of each is still in the laboratory’s store. Analysing one of them is a purchase order, not a mobilisation — until the holding time runs out.',
      sample: null,
    },
  ].map((c) => ({ ...c, depth: envelope(c.increments) }));

  const compositeOf = (id) => composites.find((c) => c.id === id);

  /* ---------------------------------------------------------------- *
   * The manifest
   * ---------------------------------------------------------------- */

  /**
   * Every sample the round produced, with its matrix on it.
   *
   * Two link fields, and they are **not the same relation**. `parent` is
   * FR-1.6's link — the QC sample that was made *from* another sample, one to
   * one, upward — and the glossary is explicit that it is mandatory for the
   * types that have one and forbidden for those that do not. `composite` is
   * FR-1.7's — the sample this material was combined *into*, many to one. A
   * product that ran them together would make a constituent increment look
   * like a duplicate of the composite, which is the opposite of what it is.
   */
  const samples = [
    { id: 'WDL-26M5-C01', location: '—', spans: 'TP01 · TP02 · G3 · TP03 · TP04', matrix: 'Soil', collected: '2026-05-06 11:20 AWST', from: 0.00, to: 0.30, role: 'composite', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-S01', location: 'TP01', matrix: 'Soil', collected: '2026-05-06 09:35 AWST', role: 'discrete', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-S02', location: 'TP02', matrix: 'Soil', collected: '2026-05-06 15:10 AWST', role: 'discrete', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-S03', location: 'TP02', matrix: 'Soil', collected: '2026-05-06 15:10 AWST', role: 'discrete', qc: 'Field duplicate (blind)', parent: 'WDL-26M5-S02', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-I01', location: 'TP01', matrix: 'Soil', collected: '2026-05-06 09:20 AWST', role: 'increment', qc: '—', parent: '—', composite: 'WDL-26M5-C02', containers: 2, tests: 0, results: 0, state: 'retained' },
    { id: 'WDL-26M5-I02', location: 'TP02', matrix: 'Soil', collected: '2026-05-06 14:50 AWST', role: 'increment', qc: '—', parent: '—', composite: 'WDL-26M5-C02', containers: 2, tests: 0, results: 0, state: 'retained' },
    { id: 'WDL-26M5-S04', location: 'TP03', matrix: 'Soil', collected: '2026-05-07 08:30 AWST', role: 'discrete', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-I03', location: 'TP03', matrix: 'Soil', collected: '2026-05-07 08:15 AWST', role: 'increment', qc: '—', parent: '—', composite: 'WDL-26M5-C02', containers: 2, tests: 0, results: 0, state: 'retained' },
    { id: 'WDL-26M5-I04', location: 'TP04', matrix: 'Soil', collected: '2026-05-07 11:05 AWST', role: 'increment', qc: '—', parent: '—', composite: 'WDL-26M5-C02', containers: 2, tests: 0, results: 0, state: 'retained' },
    { id: 'WDL-26M5-S05', location: 'TP05', matrix: 'Soil', collected: '2026-05-07 15:05 AWST', role: 'discrete', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-D01', location: 'SW01', matrix: 'Sediment', collected: '2026-05-07 12:40 AWST', from: 0.00, to: 0.10, role: 'discrete', qc: '—', parent: '—', composite: '—', containers: 2, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-C02', location: '—', spans: 'TP01 · TP02 · TP03 · TP04', matrix: 'Soil', collected: '2026-05-07 11:05 AWST', role: 'composite', qc: '—', parent: '—', composite: '—', containers: 0, tests: 5, results: 5, state: 'evaluated' },
    { id: 'WDL-26M5-QC1', location: '—', matrix: 'Water', collected: '2026-05-07 12:10 AWST', role: 'control', qc: 'Equipment blank (rinsate)', parent: 'Excavator bucket and compositing bowl', detail: 'Excavator bucket and the stainless compositing bowl, rinsed after TP04 and before the creek', composite: '—', containers: 1, tests: 5, results: 5, state: 'evaluated' },
  ].map((s) => {
    /*
     * The depth interval, resolved rather than typed. A discrete carries the
     * interval the field screen chose; an increment carries the second logged
     * horizon at its pit — the one the compositing scheme names; a composite
     * carries the envelope of the increments it was made from; and the
     * rinsate has none at all, because water poured over a bucket was never
     * at a depth.
     */
    if (s.from !== undefined) return { ...s, interval: span(s.from, s.to) };
    if (s.role === 'discrete') {
      const i = chosen(s.location);
      return { ...s, from: i.from, to: i.to, interval: span(i.from, i.to), screen: i.ec };
    }
    if (s.role === 'increment') {
      const inc = c02Increments.find((x) => x.sample === s.id);
      return { ...s, from: inc.from, to: inc.to, interval: inc.interval, screen: inc.ec, incrementRef: inc.ref };
    }
    if (s.role === 'composite') {
      const c = compositeOf(s.id);
      return { ...s, from: c.depth.from, to: c.depth.to, interval: span(c.depth.from, c.depth.to) };
    }
    return { ...s, from: null, to: null, interval: '—' };
  });

  const sampleOf = (id) => samples.find((s) => s.id === id);
  const containers = samples.reduce((n, s) => n + s.containers, 0);
  const analysed = samples.filter((s) => s.results > 0);
  const retainedSamples = samples.filter((s) => s.state === 'retained');

  /* ---------------------------------------------------------------- *
   * Custody — the same record shape as the groundwater round's
   * ---------------------------------------------------------------- */

  /**
   * The chain, in `CUSTODY_CHAIN`'s shape, because a composite's containers
   * travel like anything else's.
   *
   * `containers` on the chain is the manifest's own sum rather than a second
   * number beside it, exactly as the groundwater chain reconciles against its
   * manifest. `WDL-26M5-C02` contributes **nothing** to that sum, and that is
   * the fact worth reading twice: a laboratory composite has no containers on
   * the chain because it did not exist when the cooler was sealed. Its four
   * increments did, and they are what travelled.
   */
  const chain = {
    id: 'MOCK-COC-2026M5-009',
    round,
    raisedBy: crew,
    raisedAt: '2026-05-06 07:35 AWST',
    laboratory,
    workOrder,
    containers,
    seals: '5216',
    state: 'received',
    instruction:
      'Composite instruction written on the form at dispatch: combine 250 g from each of WDL-26M5-I01 to I04 into WDL-26M5-C02, equal mass, and retain the balance of each. Written by ' +
      crew + ' under ' + plan + ', approved by ' + approver + ' on ' + planApproved + '.',
    transfers: [
      { seq: 1, at: '2026-05-06 16:40 AWST', from: `${crew} — field`, to: 'Wandalup site cold store', what: 'Day 1 — 12 containers: the field composite, TP01 and TP02 discretes, the blind field duplicate and the two TP01/TP02 increments, logged in at 4.1 °C', containers: 12, seal: '—', state: 'ok' },
      { seq: 2, at: '2026-05-07 15:55 AWST', from: `${crew} — field`, to: 'Wandalup site cold store', what: 'Day 2 — 11 containers: the TP03 and TP05 discretes, the TP03 and TP04 increments, the creek sediment and the rinsate blank, at 4.3 °C', containers: 11, seal: '—', state: 'ok' },
      { seq: 3, at: '2026-05-07 16:15 AWST', from: 'Wandalup site cold store', to: `${crew} — field`, what: 'All 23 containers withdrawn for dispatch and reconciled against the record', containers: 23, seal: '—', state: 'ok' },
      { seq: 4, at: '2026-05-07 16:30 AWST', from: `${crew} — field`, to: 'Pilbara Freight — consignment PF-2026-117904', what: 'Cooler sealed, seal 5216, signed, with the compositing instruction on the form', containers: 23, seal: '5216', state: 'ok', onReceipt: true },
      { seq: 5, at: '2026-05-08 09:05 AWST', from: 'Pilbara Freight', to: `${laboratory} — receipt`, what: 'Seal 5216 verified intact, 4.6 °C, 23 of 23 containers reconciled', containers: 23, seal: '5216', state: 'ok', onReceipt: true },
      { seq: 6, at: '2026-05-08 09:30 AWST', from: 'PAS receipt', to: `PAS laboratory — work order ${workOrder}`, what: 'Logged and preserved; the four constituent increments held unopened against the compositing instruction', containers: 23, seal: '—', state: 'ok', onReceipt: true },
    ],
  };

  /** The laboratory-end hops, derived from the chain rather than written twice. */
  const custody = chain.transfers
    .filter((t) => t.onReceipt)
    .map(({ at, from, to, what, state }) => ({ at, from, to, what, state }));

  /*
   * The compositing act is **not** a custody transfer and is not on the chain
   * above. The glossary defines a custody transfer as one handover of a set of
   * samples from one party to another; the bench work at 10:15 on 11 May moved
   * nothing between parties. It is its own record, on the composite, with its
   * own operator and time — which is also why appending it to the transfers
   * would have quietly made the chain read seven hops long.
   */

  const receipt = {
    at: '2026-05-08 09:05 AWST',
    temperature: '4.6 °C',
    limit: '≤ 6 °C',
    seal: '5216 — intact',
    reconciled: `${containers} of ${containers}`,
    by: 'M. Toledo — PAS sample receipt',
    outcome: 'pass',
  };

  /* ---------------------------------------------------------------- *
   * The analytical suite, the numbers, and what may be said about them
   * ---------------------------------------------------------------- */

  /*
   * Two flags, and they are not the same question.
   *
   * `ratio` is whether a comparison against background means anything. pH is
   * out because it is a logarithm and "1.09 times background" is a number
   * about nothing.
   *
   * `conserved` is whether the **openness arithmetic** below applies — the
   * bound that says one increment could be n × the composite with the rest at
   * zero. That holds for a quantity carried in the mass and conserved when
   * masses are combined: milligrams of sulfate per kilogram add up. It does
   * **not** hold for pH or for the conductivity of an extract, which are
   * properties of the combined material rather than sums over it, so those
   * two rows are left off the table rather than given a bound that would not
   * survive being checked.
   */
  const analytes = [
    { name: 'pH (1:5 soil:water)', short: 'pH', unit: 'pH units', lor: 0.1, dp: 1, ratio: false, conserved: false, method: 'Rayment & Lyons 4A1 — 1:5 soil:water extract', suite: 'extract' },
    { name: 'Electrical conductivity (1:5 soil:water)', short: 'EC', unit: 'µS/cm', lor: 10, dp: 0, ratio: true, conserved: false, method: 'Rayment & Lyons 3A1 — 1:5 soil:water extract', suite: 'extract' },
    { name: 'Sulfate as SO₄ (1:5 soil:water)', short: 'Sulfate', unit: 'mg/kg', lor: 20, dp: 0, ratio: true, conserved: true, method: 'Ion chromatography on the 1:5 extract', suite: 'extract' },
    { name: 'Arsenic (total)', short: 'Arsenic', unit: 'mg/kg', lor: 2, dp: 1, ratio: true, conserved: true, method: 'USEPA 3050B digestion · 6010B ICP-OES', suite: 'metals' },
    { name: 'Zinc (total)', short: 'Zinc', unit: 'mg/kg', lor: 5, dp: 0, ratio: true, conserved: true, method: 'USEPA 3050B digestion · 6010B ICP-OES', suite: 'metals' },
  ];

  /** One row per analysed soil or sediment sample, in the analyte order above. */
  const measured = {
    'WDL-26M5-S01': [6.2, 1840, 2140, 11.4, 62],
    'WDL-26M5-S02': [6.6, 940, 880, 8.2, 41],
    'WDL-26M5-S03': [6.5, 905, 842, 7.9, 44],
    'WDL-26M5-S04': [6.4, 1320, 1460, 9.6, 55],
    'WDL-26M5-S05': [7.1, 130, 46, 4.1, 23],
    'WDL-26M5-C01': [6.8, 620, 540, 6.9, 38],
    'WDL-26M5-C02': [6.5, 1110, 1180, 9.1, 49],
    'WDL-26M5-D01': [7.3, 210, 118, 5.8, 31],
  };
  const shown = (ai, v) => v.toFixed(analytes[ai].dp);
  const valueOf = (id, ai) => measured[id][ai];

  /**
   * Which criteria sets apply to soil or sediment — derived, and it is empty.
   *
   * This is the glossary's *matrix* entry doing its work: a criterion applies
   * by matrix among other things (FR-1.11), the library holds five sets and
   * every one of them is a **water** set, so nothing is selectable and every
   * result below is `not_evaluated`. Two different roads lead to that state and
   * the screens keep them apart — *nobody stated the matrix*, and *the matrix
   * is stated and the library has no set for it*. Only the second one is a
   * configuration somebody can close.
   *
   * ## SETTLED (wave 13) — 2 September 2026
   *
   * Wave 9 recorded here that this zero was *right by inspection rather than by
   * construction*: the filter was `/soil|sediment/i` over five strings, because
   * `CRITERIA_LIBRARY.matrix` held `Freshwater` (an ANZG receptor) and
   * `Groundwater` (a location class) and neither is one of the glossary's five.
   * The library holds matrix words now — the full record is above
   * `CRITERIA_LIBRARY` — and the two dimensions that column was carrying at
   * once have fields of their own, so this filter is a **match on the field**:
   * `Soil` or `Sediment` against a value that is `Water` on every row. Right by
   * construction, which is what the record asked for.
   *
   * The half wave 9 named that is still open: FR-1.11's other four dimensions —
   * location group, hydrostratigraphic unit, fraction and period — are still
   * prose in `applies`, and splitting those is a versioned change to the
   * library. That is not the same debt as this one and it was never the one
   * recorded here.
   */
  const criteria = {
    matrices: [...new Set(CRITERIA_LIBRARY.map((c) => c.matrix))],
    applicable: CRITERIA_LIBRARY.filter((c) => c.matrix === 'Soil' || c.matrix === 'Sediment'),
    sets: CRITERIA_LIBRARY.length,
    /** What the filter now matches on, printed beside the count it produced. */
    settled: {
      on: '2026-09-02',
      wave: 'wave 13',
      was: 'a regular expression over strings that were not matrix words — the library’s column held Freshwater, an ANZG receptor, and Groundwater, a location class',
      now: `a match on the matrix field: ${MATRIX_WORDS[1]} or ${MATRIX_WORDS[2]} against a library whose every set reads ${MATRIX_WORDS[0]}`,
      where: 'criteria',
      whereLabel: 'the criteria library, where the column is drawn',
    },
  };

  /* The columns of the soil grid — samples, not locations, and the reason is
   * the domain's: two of them belong to four places each. */
  const gridColumns = [
    { id: 'WDL-26M5-S01', head: 'TP01', sub: 'discrete' },
    { id: 'WDL-26M5-S02', head: 'TP02', sub: 'discrete' },
    { id: 'WDL-26M5-S04', head: 'TP03', sub: 'discrete' },
    { id: 'WDL-26M5-S05', head: 'TP05', sub: 'background' },
    { id: 'WDL-26M5-C01', head: 'C01', sub: 'composite · 5' },
    { id: 'WDL-26M5-C02', head: 'C02', sub: 'composite · 4' },
    { id: 'WDL-26M5-D01', head: 'SW01', sub: 'sediment' },
    ...c02Increments.map((i) => ({ id: i.sample, head: i.ref.replace('C02-', ''), sub: `increment · ${i.at}` })),
  ];

  /**
   * The cell for a constituent increment — **drawn, not omitted**, on exactly
   * the argument `NOT_SAMPLED` is drawn on.
   *
   * A column that disappears reads as material that was never collected. This
   * one was collected, it is in a laboratory store, and it has no number
   * because it was combined before anything was measured. So the cell is
   * present, it carries a glyph and a word as well as a position, and it
   * carries **no outcome marks** — nothing was measured, so nothing was
   * assessed.
   */
  const NOT_ANALYSED = (inc) => ({
    empty: true,
    glyph: '◇',
    word: 'composited',
    spoken:
      `constituent increment ${inc.ref} — no result of its own. This material was combined into ${compositeOf('WDL-26M5-C02').id} ` +
      'before analysis, so no number was ever produced for this position. It is retained at the laboratory and could still be analysed. ' +
      'That is not a result below a limit of reporting and it is not a pass.',
  });

  const N4 = 'not_evaluated';
  const grid = analytes.map((a, ai) => ({
    analyte: a.name,
    unit: a.unit,
    lor: a.lor,
    cells: gridColumns.map((c) =>
      measured[c.id]
        ? { v: shown(ai, valueOf(c.id, ai)), o: [N4, N4] }
        : NOT_ANALYSED(c02Increments.find((i) => i.sample === c.id))),
  }));

  const gridShape = (() => {
    const cells = grid.flatMap((r) => r.cells);
    return {
      analytes: grid.length,
      columns: gridColumns.length,
      results: cells.filter((c) => !c.empty).length,
      empty: cells.filter((c) => c.empty).length,
      emptyColumns: gridColumns.filter((c) => !measured[c.id]).map((c) => c.head),
      evaluated: cells.filter((c) => !c.empty && c.o.some((o) => o !== N4)).length,
    };
  })();

  /**
   * Against background, because there is no criterion — and a ratio is not an
   * outcome.
   *
   * With nothing selectable in the library, the comparison a practitioner
   * actually makes is against the site's own background, and the honest way
   * to draw that is as a ratio with the word *interpretation* on it. It does
   * **not** become an exceedance mark on the grid; the four-state vocabulary
   * stays what it is (G-13a) and every cell above is still `not_evaluated`.
   *
   * pH is excluded because a ratio of two logarithms is not a number about
   * anything, and the sediment sample is excluded because **there is no
   * sediment background**: TP05 is soil, the investigation collected no
   * upstream creek-bed control, and dividing one matrix by another would be
   * the quiet comparison the glossary's matrix entry exists to refuse.
   */
  const backgroundId = 'WDL-26M5-S05';
  const background = {
    control: backgroundId,
    at: 'TP05',
    rows: gridColumns
      .filter((c) => measured[c.id] && c.id !== backgroundId && sampleOf(c.id).matrix === 'Soil')
      .map((c) => ({
        id: c.id,
        head: c.head,
        sub: c.sub,
        ratios: analytes.map((a, ai) =>
          a.ratio ? { analyte: a.short, x: valueOf(c.id, ai) / valueOf(backgroundId, ai) } : null),
      })),
    excluded: [
      { id: 'WDL-26M5-D01', why: 'Sediment, and the investigation collected no upstream sediment control. A soil background is not one, so this sample has a number and no comparison — which is a finding about the design rather than about the creek.' },
    ],
    pHNote: 'pH is not ratioed. It is a logarithm, so “1.09 times background” would be a number about nothing.',
  };

  /**
   * The blind field duplicate, computed. RPD needs a pair, and pH is not one.
   *
   * ## The matrix question, settled — wave 16, 2 September 2026
   *
   * The limit is no longer a string copied out of the version-change record.
   * It is `QC_LIMITS.resolve('Field duplicate RPD', <this pair's matrix>)` —
   * one function, and the row it hands back **is** the row the library screen
   * prints. So the number judging 7.1% here and the number in the objective
   * set cannot be two values that agree; there is one value.
   *
   * The pair's matrix is read off the manifest rather than assumed, which is
   * the glossary's own rule: matrix is recorded, never inferred from the
   * location.
   *
   * ## The applicability rule is applied, not only quoted — found here
   *
   * The rule the library holds is *≤ 30% where both results are ≥ 5 × LOR,
   * absolute difference ≤ 2 × LOR below that*, and this screen used to apply
   * the percentage half to all four ratioed analytes. **Arsenic does not reach
   * 5 × LOR**: 8.2 and 7.9 mg/kg against a limit of reporting of 2, so the
   * threshold is 10 and both sit under it. Its pair is judged by absolute
   * difference — 0.3 against an allowance of 4 — and the percentage that used
   * to be printed for it was arithmetic on noise, which is the exact defect
   * `#qc-limits` has a panel about. Nothing about the outcome moves: every
   * pair passes under whichever test reaches it, and the worst percentage is
   * still zinc's. What moves is that the sentence says **three** pairs where
   * it said four, and says which test judged the fourth.
   *
   * pH is judged by neither. It is a logarithm, so it has no relative percent
   * difference, and this set holds no allowance written for a logarithmic
   * scale. It is reported rather than judged, and the row says so instead of
   * borrowing a number from a rule that was not written for it.
   */
  const duplicate = (() => {
    const parent = 'WDL-26M5-S02', child = 'WDL-26M5-S03';
    const matrix = sampleOf(child).matrix;
    const limit = QC_LIMITS.resolve('Field duplicate RPD', matrix);
    /** The percentage, taken out of the library's own string rather than typed beside it. */
    const threshold = Number(limit.rule.limit.match(/[\d.]+/)[0]);
    const rows = analytes.map((a, ai) => {
      const p = valueOf(parent, ai), c = valueOf(child, ai);
      const rpd = (Math.abs(p - c) / ((p + c) / 2)) * 100;
      const absolute = Math.abs(p - c);
      const fiveLor = a.lor * 5, allowance = a.lor * 2;
      if (a.short === 'pH') {
        return {
          analyte: a.short, unit: a.unit, parent: shown(ai, p), child: shown(ai, c),
          lor: a.lor, fiveLor, rpd: null, absolute, allowance: null, test: 'not judged', within: null,
          why: 'A logarithm has no relative percent difference, and this set holds no allowance written for a logarithmic scale. The difference is reported; it is not judged against anything.',
        };
      }
      const reaches = Math.min(p, c) >= fiveLor;
      return {
        analyte: a.short, unit: a.unit, parent: shown(ai, p), child: shown(ai, c),
        lor: a.lor, fiveLor, rpd, absolute,
        allowance: reaches ? null : allowance,
        test: reaches ? 'percentage' : 'absolute',
        within: reaches ? rpd <= threshold : absolute <= allowance,
        why: reaches
          ? `Both results reach 5 × LOR (${fiveLor} ${a.unit}), so the percentage test applies.`
          : `Neither result reaches 5 × LOR (${fiveLor} ${a.unit}), so the percentage is not the test — the absolute difference is, against an allowance of 2 × LOR (${allowance} ${a.unit}).`,
      };
    });
    const judged = rows.filter((r) => r.test === 'percentage');
    const worst = judged.reduce((a, b) => (b.rpd > a.rpd ? b : a));
    return {
      parent, child, matrix,
      limit,
      limitVersion: limit.rule.version,
      threshold,
      rows,
      judged,
      worst,
      byAbsolute: rows.filter((r) => r.test === 'absolute'),
      unjudged: rows.filter((r) => r.test === 'not judged'),
      outcome: rows.every((r) => r.within !== false) ? 'pass' : 'fail',
      /**
       * ## SETTLED (wave 16) — 2 September 2026, on a record made 2 September
       * 2026 (wave 9)
       *
       * The record is kept whole and the settled-note is at the end of it,
       * because a debt that vanishes when it is paid leaves nobody able to
       * tell a settled one from one that was never noticed.
       *
       * Its ledger tag — the found-and-deferred marker, dated 2 September 2026
       * (wave 9), owner unassigned — is **closed rather than quoted**, and it
       * is the only line of this record that moved. That marker is what a grep
       * counts as the ledger, so reproducing it inside the quotation would
       * keep the ledger reading four while three records stand; the heading
       * above is what it became. Everything the record *found* is below it,
       * unedited:
       *
       * > `DQO` carries **one** field-duplicate limit and no matrix dimension,
       * > so a soil field duplicate is measured here against a limit written
       * > for water. Soil is heterogeneous at the scale of a trowel and the
       * > conventional soil limit is wider, so applying the water number is
       * > **stricter** and nothing is being let through by it — which is why
       * > this is recorded rather than fixed in passing. Fixing it means giving
       * > the DQO an applicability dimension by matrix, with an effective date
       * > and a version, and that is the same class of deliberate change as
       * > adding a criteria set: it belongs to a wave that redesigns
       * > `#qc-limits`, not to a rider on a soil investigation. Visible on
       * > `#composite` and on the manifest, not only here.
       *
       * ## What closed it
       *
       * The dimension exists (`DQO.limits`, every row with a matrix, an
       * effective date and its version) and the answer for soil was
       * **measured before it was drawn**. `searched` below is that
       * measurement: six records that could have carried a soil
       * field-duplicate limit, what each one actually states, and the one
       * question asked of all six. None states a number.
       *
       * So the honest state is a **computed absence** rather than an invented
       * limit, and it is first-class: the library counts its soil rows and
       * gets zero, the resolver hands back the water row with `held: false`
       * and says so in a sentence, and both this screen and `#qc-limits`
       * print that one object. The comment carried this; the record states it.
       *
       * **What was refused, and why.** A conventional wider soil RPD — the
       * number a practitioner would reach for — has no source in this record.
       * Writing one would give this catalogue a data quality limit nobody
       * approved, on a set with a named approver and an effective date, which
       * is the trade wave 14 refused on the licence trigger line and wave 15
       * refused on five censored values. The direction of the error is still
       * argued, because a reader is owed it, and it is labelled as reasoning
       * rather than dressed as a citation.
       */
      matrixGap: {
        raised: '2 September 2026 (wave 9)',
        settled: '2 September 2026 (wave 16)',
        /** The note this replaces, verbatim, so the screen can print what it used to say. */
        was:
          'The limit applied is the round’s single field-duplicate limit. It was written for water and the data quality objectives carry no matrix dimension, so a soil duplicate is held to a water number. That is stricter rather than looser — soil is heterogeneous at the scale of a trowel and the conventional soil limit is wider — so nothing passes here that would fail a soil limit. Giving the objectives an applicability rule by matrix is a versioned change to them, with an effective date, and it is not something this investigation makes on its way past.',
        now:
          `${limit.says} The set holds ${QC_LIMITS.held.find((h) => h.matrix === matrix).limits.length} limits for ${matrix.toLowerCase()} and ${QC_LIMITS.rules.length} in all, every one of them written for water — so the absence is counted rather than described, and the verdict names both the limit that judged this pair and the material that limit was written for.`,
        question: 'Does any record on this project state a field-duplicate limit for soil?',
        /**
         * The six records that could have carried one, and what each states.
         *
         * Measured before anything was drawn. Two are the investigation's own
         * (the plan and its certificate), two are the objective set and the
         * laboratory plan behind half of it, one is the standard the field
         * duplicate rule cites, and one is the criteria library — included
         * because it is the register a reader reaches for by reflex and it is
         * a different kind of object, which is worth saying once.
         */
        searched: [
          {
            source: plan,
            kind: 'The investigation’s own instrument',
            states: `Approved ${planApproved} by ${approver}. Two decisions are attributed to it in this record: the compositing scheme for each composite — ${composites[0].schemeShort} and ${composites[1].schemeShort} — and the field screen above which a discrete sample was submitted, ${screenThreshold} µS/cm.`,
            verdict: 'No', answer: 'It fixes a sampling design; it states no acceptance limit of any kind.',
            at: 'composite',
          },
          {
            source: `${DQO.set} · ${DQO.used.version} and ${DQO.current.version}`,
            kind: 'The site’s data quality objectives',
            states: `${QC_LIMITS.rules.length} limits across both versions, each with a number, a population, a source and — since this wave — the matrix it was written for. ${QC_LIMITS.held.find((h) => h.matrix === 'Water').limits.length} read water; ${QC_LIMITS.held.filter((h) => h.matrix !== 'Water').reduce((n, h) => n + h.limits.length, 0)} read anything else.`,
            verdict: 'No', answer: 'This is the register that would hold one, and it holds none.',
            at: 'qc-limits',
          },
          {
            source: 'PAS QA plan rev 8',
            kind: 'The laboratory’s own quality plan',
            states: `Named as the source of ${QC_LIMITS.rules.filter((r) => r.source === 'PAS QA plan rev 8').length} of the ${QC_LIMITS.rules.length} limits. What it states for a matrix other than water is not in this record — the set adopted its water figures and nothing else.`,
            verdict: 'No', answer: 'And it governs bench duplicates rather than field ones, which is a different check.',
            at: 'qc-limits',
          },
          {
            source: `${certificate} · ${workOrder}`,
            kind: 'The soil round’s certificate and work order',
            states: `The results and the reporting limits. It carries no batch quality-control block in this record: ${BATCHES.length} batches are drawn with their own QC and both are water — ${BATCHES.map((b) => b.id).join(' and ')}.`,
            verdict: 'No', answer: 'A certificate reports what was measured; it does not set the site’s acceptance limits.',
            at: 'batches',
          },
          {
            source: 'AS/NZS 5667.1',
            kind: 'The standard the field duplicate rule cites',
            states: `Named in the rule’s own source line — ${QC_LIMITS.rules[0].source} — and in the set’s basis. It is a water-quality sampling standard.`,
            verdict: 'No', answer: 'And it could not: the standard the limit rests on is written for water.',
            at: 'qc-limits',
          },
          {
            source: `The criteria library — ${criteria.sets} sets`,
            kind: 'A different kind of object, checked because a reader reaches for it',
            states: `Evaluation criteria, not acceptance limits, and it holds ${criteria.applicable.length} sets carrying a soil or sediment matrix in any case.`,
            verdict: 'No', answer: 'A guideline value says whether a result is acceptable; a data quality limit says whether the measurement is trustworthy. Neither stands in for the other.',
            at: 'criteria',
          },
        ],
        refused:
          'A conventional wider soil RPD is the number a practitioner would reach for, and no record on this project states one. Writing it here would add a data quality limit to a set with a named approver and an effective date, on nobody’s authority — the trade refused on the licence trigger line the day before and on five censored values the same day. The set gains a soil limit when somebody writes one, in a new version, with a date.',
        direction:
          'Which way the error runs is still owed to a reader, and it is reasoning rather than a citation: soil is heterogeneous at the scale of a trowel, so a limit written for it would be wider than one written for water. That makes the water limit the stricter test, and nothing passes here that a soil limit would have failed. It is an argument about direction and it produces no number — which is exactly why it cannot be written into the library.',
        reversal:
          `A soil field-duplicate limit in a new version of ${DQO.set}, with its own effective date and approver, or a sampling and analysis plan that states one and is approved. Either would be read by the same resolver, and this verdict would re-derive under it — forward from that date, never backwards over a round already assessed.`,
        /** What did not move, said out loud, because a settlement that quietly re-judged something would be worse than the gap. */
        unmoved:
          `No verdict moved. The worst percentage is still zinc’s and the pair still passes; ${limit.rule.limit} is the same number this screen printed before, now read off the library row instead of off the version-change record. The water round’s own field-duplicate findings were raised under ${DQO.used.version} on ${DQO.raisedAt} and are untouched — stating a limit’s matrix is not re-running a check.`,
      },
    };
  })();

  /** The rinsate blank: a water sample on a soil round, and the control on the bowl. */
  const rinsate = {
    id: 'WDL-26M5-QC1',
    matrix: 'Water',
    covers: 'The excavator bucket and the stainless compositing bowl, rinsed after TP04 and before the creek',
    results: [
      { analyte: 'pH', value: '6.9', unit: 'pH units' },
      { analyte: 'Electrical conductivity', value: '3', unit: 'µS/cm' },
      { analyte: 'Sulfate as SO₄', value: '<0.5', unit: 'mg/L' },
      { analyte: 'Arsenic (total)', value: '<0.5', unit: 'µg/L' },
      { analyte: 'Zinc (total)', value: '<1', unit: 'µg/L' },
    ],
    verdict: 'Every analyte below the limit of reporting.',
    why:
      'It is the only control on the compositing step. Five increments went through one bowl and four went through one splitter; if either carried material between them, the composite is a number about the equipment. The blank says it did not — and its matrix is water on a soil round, which is the matrix entry’s point made by a bottle rather than by an argument.',
  };

  /* ---------------------------------------------------------------- *
   * What compositing buys, what it costs, and the deadline on the cost
   * ---------------------------------------------------------------- */

  const positions = composites.reduce((n, c) => n + c.increments.length, 0);
  const attributable = [...new Set(samples.filter((s) => s.role === 'discrete' && s.qc === '—').map((s) => s.location))];
  const representedOnly = [...new Set(composites.flatMap((c) => c.increments.map((i) => i.where)))]
    .filter((w) => !attributable.includes(w));

  /**
   * The arithmetic of the limit, per composite and per analyte.
   *
   * `ceiling` is what one increment could be and still produce this composite
   * if every other increment were zero — the composite's value times the
   * number of increments. `floorLor` is the reporting limit as the increments
   * see it: an increment carrying less than n × LOR contributes less than the
   * composite's own reporting limit and can vanish inside it entirely.
   *
   * Both hold only for a **mass-conserved** quantity, so `conserved` gates
   * the rows the screen prints. pH and the conductivity of a 1:5 extract are
   * properties of the combined material rather than sums over it, and giving
   * them a bound they do not obey would be inventing arithmetic to fill a
   * table — the exact failure the rest of this screen is about.
   *
   * Neither number is a claim about what any increment is. They are the width
   * of what the composite leaves open, which is exactly what "a result on a
   * composite cannot be attributed to one increment" means when it is put in
   * units.
   */
  const openness = composites.map((c) => ({
    id: c.id,
    n: c.increments.length,
    rows: analytes.map((a, ai) => ({
      analyte: a.short,
      unit: a.unit,
      value: shown(ai, valueOf(c.id, ai)),
      ceiling: valueOf(c.id, ai) * c.increments.length,
      floorLor: a.lor * c.increments.length,
      lor: a.lor,
      ratio: a.ratio,
      conserved: a.conserved,
    })),
    excluded: analytes.filter((a) => !a.conserved).map((a) => a.short),
  }));

  const earliestCollection = '2026-05-06';
  const holding = [
    { suite: '1:5 soil:water extract — pH, electrical conductivity, sulfate', days: 28, rule: 'Extracted within 28 days of collection, held at ≤ 6 °C', extracted: '2026-05-11' },
    { suite: 'Total metals — arsenic, zinc', days: 180, rule: 'Digested within 180 days of collection, held at ≤ 6 °C', extracted: '2026-05-12' },
  ].map((h) => ({
    ...h,
    used: daysBetween(earliestCollection, h.extracted),
    expires: addDays(earliestCollection, h.days),
    left: daysBetween(AS_AT, addDays(earliestCollection, h.days)),
  }));
  const binding = holding.reduce((a, b) => (b.left < a.left ? b : a));

  /**
   * The decision this screen exists for, with the clock on it.
   *
   * `TP04` has no number of its own. It contributed one increment to each
   * composite and the plan submitted no discrete from it, because its highest
   * field screen read below the threshold. So when the subsurface composite
   * comes back elevated, "how much of that is TP04" has an answer only if
   * someone buys it — and only until the shortest holding time runs out.
   */
  const followUp = {
    question: 'Which of the four increments carries the sulfate in WDL-26M5-C02?',
    answerable: true,
    how: `Analyse the retained increments. ${retainedSamples.length} of them are in ${laboratory}’s store at 750 g each, unopened.`,
    cost: `${retainedSamples.length} analyses instead of the one already run.`,
    deadline: binding,
    irreversible:
      'The window closes on its own. Nothing on this screen can extend a holding time, and an increment analysed outside one is a number with a qualifier on it rather than an answer.',
    ifFieldComposited:
      'None of this would be available for the surface composite. Its five increments went into one bowl, and the only way back to a position there is a second mobilisation and a fresh set of holes.',
  };

  /**
   * Why a composite is not a derived value — the distinction the keep-list
   * forbids conflating, written where both words appear on one screen.
   */
  const notDerived = {
    derived: 'A derived value is arithmetic over other results. It keeps its components and the versioned rule that produced it, it can be recomputed, and it never overwrites what the laboratory reported (FR-2.1, FR-2.3, FR-2.4). PFOS + PFHxS on MW05 is one.',
    composite: 'A composite result is a number the laboratory reported on a physical sample. The combining happened to the material, before any measurement existed, so there are no component results to keep and nothing to recompute. What it carries instead is the compositing scheme, the increments and their positions.',
    consequence: 'A product that filed a composite under derivation would offer to re-derive it, would show a rule version that does not exist, and would imply the increments have numbers behind them. All three are false, and the third is the one that would mislead a regulator.',
  };

  /* ---------------------------------------------------------------- *
   * Traceability, both directions
   * ---------------------------------------------------------------- */

  const forward = composites.flatMap((c) =>
    c.increments.map((i) => ({
      ref: i.ref,
      where: i.where,
      registered: Boolean(i.at),
      interval: i.interval,
      mass: i.mass,
      screen: i.ec,
      sample: i.sample,
      composite: c.id,
      analysed: c.id,
      certificate,
      results: measured[c.id] ? analytes.length : 0,
    })));

  const backward = (() => {
    const c = compositeOf('WDL-26M5-C02');
    const ai = analytes.findIndex((a) => a.short === 'Sulfate');
    return {
      result: `${shown(ai, valueOf(c.id, ai))} ${analytes[ai].unit}`,
      analyte: analytes[ai].name,
      sample: c.id,
      certificate,
      increments: c.increments,
      cannotSay:
        `Which of the ${c.increments.length} carried it. The material was combined before it was measured, so the number describes the combination and nothing smaller.`,
      canSay: [
        `The ${c.increments.length} positions it covers, each with its own depth interval and its own coordinate.`,
        `The envelope those intervals span — ${span(c.depth.from, c.depth.to)} — and that they are not identical, so the composite has a nominal interval rather than an exact one.`,
        'That the scheme was equal mass, so no position is weighted above another.',
        'That the increments are retained, and until when.',
      ],
    };
  })();

  /**
   * The composite result's chain, in `PROVENANCE`'s own shape so the lineage
   * screen renders it with the same two builders and cannot describe a hop
   * differently in one view than in the other.
   *
   * It has no import-run step, deliberately. The hops that carry a
   * laboratory's file into the record — deliverable, mapping, commit — are
   * the ones the PFAS chain already walks and they are the same here; what is
   * particular to a composite is everything **above** the certificate, and
   * repeating the rest would be a second copy of a chain that already exists.
   */
  const provenance = (() => {
    const c = compositeOf('WDL-26M5-C02');
    const ai = analytes.findIndex((a) => a.short === 'Sulfate');
    const value = `${shown(ai, valueOf(c.id, ai))} ${analytes[ai].unit}`;
    const upstream = [
      {
        step: 'Sampling design, and the scheme it fixed',
        what: `${plan} · approved ${planApproved} by ${approver}`,
        detail: `The compositing scheme was decided before anybody stood at a pit: ${c.scheme.toLowerCase()}. The plan also fixed the field-screen threshold at ${screenThreshold} µS/cm, which is what decided that TP04 got no discrete sample — and therefore what makes this composite the only thing standing between TP04 and having no number at all.`,
        kind: 'plan', at: 'composite', node: 'Plan rev 1', nodeSub: `approved ${planApproved}`,
      },
      {
        step: 'Places, and their class',
        what: `${c.increments.map((i) => i.where).join(' · ')} · location class soil · ${PROJECT.crs}`,
        detail: `Four registered locations, each with a ground surface elevation rather than a top of casing and a logged interval set rather than a screened interval. Class is a property of the place; the matrix of what came out of it is recorded separately, and on this round the two disagree twice — a sediment sample at a surface-water location and a water blank on a soil investigation.`,
        kind: 'place', at: 'locations', node: '4 soil locations', nodeSub: 'class soil · TSF seepage path',
      },
      {
        step: 'Depth intervals, logged at the pit',
        what: `${c.increments.map((i) => i.interval).join(' · ')}`,
        detail: `Each increment came out of the second logged horizon at its pit — the clayey sand — and those horizons are not at the same depth in all four. So the composite carries an envelope, ${span(c.depth.from, c.depth.to)}, and a nominal interval rather than an exact one. A record that flattened the four to one figure would be inventing a boundary that is not in any of the logs.`,
        kind: 'field', at: 'composite', node: span(c.depth.from, c.depth.to), nodeSub: 'envelope of 4 intervals',
      },
      {
        step: 'Increments collected',
        what: `${c.increments.length} constituent increments · ${c.increments[0].mass.toLocaleString('en-AU')} g each · submitted as ${c.increments.length} samples`,
        detail: `Collected 6 and 7 May by ${crew}, each one bagged and jarred in its own right and each one given a sample identifier. That is what makes the laboratory route different from the field one: these four exist as material with numbers on the outside of them, and after a field composite they would not exist at all.`,
        kind: 'field', at: 'events', node: `${c.increments.length} increments`, nodeSub: `${c.increments[0].mass.toLocaleString('en-AU')} g each`,
      },
      {
        step: 'Custody transfer',
        what: `${chain.id} · ${chain.transfers.length} transfers · ${chain.containers} containers · seal ${chain.seals}`,
        detail: `Raised by ${chain.raisedBy} at ${chain.raisedAt}, before the first bag was filled, and the compositing instruction travelled on the form. Transfers run 1 to ${chain.transfers.length} with no gap in the sequence. This composite contributes not one container to the count: it did not exist when the cooler was sealed.`,
        kind: 'custody', at: 'ecoc', node: chain.id, nodeSub: `${chain.transfers.length} transfers`,
      },
      {
        step: 'Laboratory receipt',
        what: `${workOrder} · ${laboratory} · received ${receipt.at} · ${receipt.temperature} · ${receipt.reconciled} containers`,
        detail: `Seal ${receipt.seal}, ${receipt.temperature} against ${receipt.limit}, reconciled by ${receipt.by}. The four increments were logged and held unopened against the instruction on the form rather than being prepared with the rest of the round.`,
        kind: 'lab', at: 'receipt', node: receipt.temperature, nodeSub: receipt.at.slice(0, 10),
      },
      {
        step: 'Compositing at the bench',
        what: `${c.performedAt} · ${c.performedBy} · ${c.scheme}`,
        detail: `Instructed by ${c.instructedBy} at ${c.instructedAt} under a scheme approved on ${c.decidedAt}. ${c.increments[0].used} g was taken from each of the four and combined; ${c.increments[0].retained} g of each was retained. This is not a custody transfer — nothing changed hands — so it is recorded here and not as a seventh row on the chain.`,
        kind: 'lab', at: 'composite', node: 'Equal mass', nodeSub: `${c.increments[0].used} g × ${c.increments.length}`,
      },
      {
        step: 'Analysis',
        what: `${analytes[ai].method} · extracted ${holding[0].extracted} · certificate ${certificate}`,
        detail: `Held ${holding[0].used} of ${holding[0].days} days on the extract suite. The number reported is a number about 1,000 g of combined material, and the laboratory reported it as such — there is no derivation and no rule version on it, because nothing was calculated from anything.`,
        kind: 'lab', at: 'batches', node: certificate, nodeSub: `${holding[0].used} of ${holding[0].days} days`,
      },
    ];
    const downstream = [
      {
        step: 'Reported result',
        what: `${value} · ${analytes[ai].name} · reported by ${laboratory}, not derived`,
        detail: 'A composite result is what the laboratory measured on the sample it was given. It carries a compositing scheme and a set of increments where a derived value would carry components and a rule version, and the two are not the same kind of record.',
        kind: 'input', at: 'composite',
      },
      {
        step: 'Evaluation',
        what: `not evaluated · ${criteria.sets} criteria sets in the library, ${criteria.applicable.length} with a soil or sediment matrix`,
        detail: `Nothing is asserted about this number. Applicability is by matrix among other things (FR-1.11), the library holds only ${criteria.matrices.join(' and ').toLowerCase()} sets, and a comparison made anyway would be a water criterion applied to a solid. That is a configuration gap somebody can close on the criteria library, with an effective date and a version — and it is different from a result nobody stated a matrix for, which reaches the same state by a road nobody can close.`,
        kind: 'evaluation', at: 'criteria',
      },
      {
        step: 'What is said instead',
        what: `${(valueOf(c.id, ai) / valueOf(backgroundId, ai)).toFixed(1)}× the background pit at ${background.at}`,
        detail: 'A ratio against the site’s own background is the comparison a practitioner makes when nothing is selectable, and it is an interpretation rather than an outcome. It gets no mark on the grid and it does not make anything an exceedance.',
        kind: 'consequence', at: 'background',
      },
      {
        step: 'The question it cannot answer',
        what: `Which of the ${c.increments.length} increments carries it — no answer exists in this record`,
        detail: `The material was combined before it was measured. What can be bought is the answer: ${followUp.how} ${followUp.cost} The binding window is ${binding.suite.split(' — ')[0]}, ${binding.left} days left as at ${AS_AT}.`,
        kind: 'consequence', at: 'composite',
      },
    ];
    return {
      value,
      analyte: analytes[ai].name,
      sample: c.id,
      certificate,
      collected: sampleOf(c.id).collected,
      upstream,
      downstream,
      chain: [...upstream, ...downstream],
      questions: [
        { q: 'What is this a sample of?', a: `${c.increments.length} constituent increments, equal mass, combined at the laboratory bench`, at: 'composite', step: 'Compositing at the bench' },
        { q: 'Which places does it cover?', a: c.increments.map((i) => i.where).join(', '), at: 'locations', step: 'Places, and their class' },
        { q: 'What depth does this number describe?', a: `${span(c.depth.from, c.depth.to)} — an envelope, because the four logged horizons are not at the same depth`, at: 'composite', step: 'Depth intervals, logged at the pit' },
        { q: 'Who decided to composite, and on what scheme?', a: `${c.decidedBy} on ${c.decidedAt}, in ${plan}; ${c.schemeShort}`, at: 'composite', step: 'Sampling design, and the scheme it fixed' },
        { q: 'Where was it composited — field or laboratory?', a: `Laboratory, ${c.performedAt}, by ${c.performedBy}`, at: 'composite', step: 'Compositing at the bench' },
        { q: 'Was the chain unbroken?', a: `${chain.transfers.length} transfers with no gap in the sequence; ${receipt.reconciled} containers reconciled at ${receipt.temperature}`, at: 'ecoc', step: 'Custody transfer' },
        { q: 'Which increment carries the sulfate?', a: 'Cannot be said. The material was combined before it was measured, and no analysis of the composite can recover it.', at: 'composite', step: 'The question it cannot answer', cannot: true },
        { q: 'Can that still be found out?', a: `Yes, and only until ${binding.expires} — ${binding.left} days. ${followUp.how}`, at: 'composite', step: 'The question it cannot answer' },
        { q: 'What criterion was it assessed against?', a: `None. ${criteria.applicable.length} of the ${criteria.sets} sets in the library carry a soil or sediment matrix.`, at: 'criteria', step: 'Evaluation' },
      ],
      trace: {
        forkCap: `Four increments, one bag — the fan-in a line cannot draw`,
        ruleCap: 'Combined by scheme, not by rule',
        upstream: upstream.slice(0, 6).map((s) => ({ label: s.node, sub: s.nodeSub, at: s.at, kind: s.kind, step: s.step })),
        fork: c.increments.map((i) => ({ label: i.ref, sub: `${i.where} · ${i.interval}`, at: 'composite', kind: 'field', step: 'Increments collected' })),
        rule: { label: c.schemeShort, sub: `${c.increments[0].used} g from each · no result was combined`, at: 'composite', kind: 'rule', step: 'Compositing at the bench' },
        focus: { label: value, sub: `${analytes[ai].name} · ${c.id}`, at: 'composite', kind: 'input', step: 'Reported result' },
        downstream: [
          { label: 'not evaluated', sub: `${criteria.applicable.length} soil sets in the library`, at: 'criteria', kind: 'evaluation', step: 'Evaluation' },
          { label: `${(valueOf(c.id, ai) / valueOf(backgroundId, ai)).toFixed(1)}× background`, sub: 'interpretation, not an outcome', at: 'background', kind: 'consequence', step: 'What is said instead' },
          { label: 'Which increment?', sub: `unanswerable · ${binding.left} days to buy it`, at: 'composite', kind: 'consequence', step: 'The question it cannot answer' },
        ],
      },
    };
  })();

  /*
   * FOUND AND DEFERRED — 2 September 2026 (wave 9), owner unassigned.
   *
   * A depth profile — sulfate against depth, one trace per pit, with the
   * logged horizon boundaries drawn as breaks — is the plate this
   * investigation wants and it is a **new figure family**. The approved
   * grammar is twelve renderings at 180 mm (`design/reference/figures/`), the
   * depth-down vertical axis is not among the moves any of them make, and
   * `EXPANSION_BRIEF.md` §5.8 requires a written grammar proposal on the
   * screen that would use it, flagged for Jerry, before one is drawn. So this
   * wave draws none: the intervals are a table, and the argument for a plate
   * is recorded on `#composite` where a reader will ask for it. The same
   * caveat that would attach to it attaches to everything else here — the
   * grammar has never been print-tested (G-76b, GOALS §7.4).
   */
  const figureProposal = {
    what: 'Depth profile — an analyte against depth, one trace per pit, logged horizon boundaries as breaks and the composite intervals as bands',
    whyNeeded: 'The depth axis is the one thing this matrix has that water samples do not, and a table of intervals is the least legible way to show that the signal sits in the second and third horizons rather than at the surface.',
    whyNotDrawn: 'It is a figure family outside the twelve approved renderings — a depth-down vertical axis, and banded intervals rather than points or a line, are moves none of them makes.',
    needs: 'A written grammar proposal to Jerry, on the screen that would use it, in the same shape as the Piper/Stiff/Durov proposals the catalogue already defers.',
    caveat: 'And the standing caveat would attach to it as it attaches to every plate here: the grammar has never been print-tested (G-76b).',
  };

  return {
    round, label, crew, approver, laboratory, certificate, workOrder, plan, planApproved,
    screenThreshold,
    window: '1 – 31 May 2026',
    collected: '6–7 May 2026',
    days: [
      { n: 1, date: '2026-05-06', label: 'Day 1 — the surface composite and the two nearest pits' },
      { n: 2, date: '2026-05-07', label: 'Day 2 — the far pits, the background pit and the creek' },
    ],
    why:
      'Sulfate, arsenic and zinc have all risen at MW05 over four quarters and the TSF is upgradient of it. A soil investigation on the seepage path asks a question groundwater cannot: whether the signature is in the unsaturated zone between the embankment and the bore, and at what depth.',
    pits, pitOf, places, chainage, investigated, chosen, overThreshold,
    composites, compositeOf,
    samples, sampleOf, containers, analysed, retainedSamples,
    chain, custody, receipt,
    analytes, measured, shown, valueOf,
    criteria, gridColumns, grid, gridShape,
    background, duplicate, rinsate,
    positions, attributable, representedOnly,
    openness, holding, binding, followUp, notDerived,
    forward, backward, provenance, figureProposal,
    counts: {
      places: places.length,
      pits: pits.length,
      intervals: pits.reduce((n, p) => n + p.intervals.length, 0),
      samples: samples.length,
      primary: samples.filter((s) => s.qc === '—').length,
      qc: samples.filter((s) => s.qc !== '—').length,
      discretes: samples.filter((s) => s.role === 'discrete' && s.qc === '—').length,
      increments: samples.filter((s) => s.role === 'increment').length,
      composites: composites.length,
      incrementPositions: positions,
      analysed: analysed.length,
      results: analysed.reduce((n, s) => n + s.results, 0),
      containers,
      analysesRun: composites.length,
      analysesSaved: positions - composites.length,
      attributable: attributable.length,
      representedOnly: representedOnly.length,
    },
  };
})();

/**
 * # Which matrices the objective set covers, and what it has been asked to judge
 *
 * Wave 16. The library's matrix column answers *what was this limit written
 * for*; this answers the question a reader asks straight afterwards — **and
 * what has it had to judge**. Both halves are counted from the registers that
 * hold them, over the glossary's five words in the glossary's own order, so a
 * matrix with no limits and no samples reads as a column of zeroes rather than
 * as a row somebody forgot.
 *
 * The two rounds are pooled deliberately. The quarterly round is water and the
 * soil investigation is not, and the interesting rows are the ones where those
 * two facts cross: the soil round's own equipment blank is a **water** sample,
 * correctly judged by a water blank limit, and its field duplicate is a
 * **soil** sample judged by a water limit because no soil one exists. One table
 * shows both, which is more than either round's own screen can.
 *
 * `accounted` is printed rather than trusted. If a limit ever carried a word
 * outside the five, the per-matrix counts would stop summing to the number of
 * rows, and the screen says which number it got rather than quietly dropping
 * the row.
 */
export const DQO_APPLICABILITY = (() => {
  const pool = [
    ...EVENT_SAMPLES.map((s) => ({ id: s.id, matrix: s.matrix, qc: s.qc, round: ROUND.code })),
    ...SOIL.samples.map((s) => ({ id: s.id, matrix: s.matrix, qc: s.qc, round: SOIL.round })),
  ];
  const rows = MATRIX_WORDS.map((matrix) => {
    const limits = QC_LIMITS.held.find((h) => h.matrix === matrix).limits;
    const sampled = pool.filter((s) => s.matrix === matrix);
    const controls = sampled.filter((s) => s.qc !== '—');
    return {
      matrix,
      limits: limits.length,
      checks: limits.map((r) => r.check),
      samples: sampled.length,
      controls: controls.length,
      controlRows: controls,
      rounds: [...new Set(sampled.map((s) => s.round))],
    };
  });
  const gap = SOIL.duplicate.limit;
  return {
    rows,
    accounted: rows.reduce((n, r) => n + r.limits, 0),
    total: QC_LIMITS.rules.length,
    /** The one place the set is asked for a limit it does not hold, named rather than counted. */
    gap,
    gapAt: `${SOIL.duplicate.child} · ${SOIL.round}`,
    says(row) {
      if (row.limits > 0) {
        return `${row.limits} of the ${QC_LIMITS.rules.length} limits, and ${row.controls} quality-control ${row.controls === 1 ? 'sample' : 'samples'} judged by them.`;
      }
      if (row.controls > 0) {
        return `No limit in this set. ${row.controls} quality-control ${row.controls === 1 ? 'sample' : 'samples'} — judged against the ${gap.judgedBy.toLowerCase()} limit, which is stated on the verdict rather than assumed.`;
      }
      if (row.samples > 0) {
        return row.samples === 1
          ? 'No limit in this set, and no quality control to judge: one sample of this material, and it is not a duplicate, a blank or a spike.'
          : `No limit in this set, and no quality control to judge: ${row.samples} samples of this material, and not one of them is a duplicate, a blank or a spike.`;
      }
      return 'No limit, and no sample of this material anywhere on the project — so nothing has ever asked for one.';
    },
  };
})();

/* ==================================================================== *
 * Wave 10 — what crosses the boundary, and on whose terms
 * ==================================================================== */

/**
 * The exchange formats, and one export drawn in full (FR-7.6, Domain R).
 *
 * ## The word, and why it is not "estate"
 *
 * The wave plan called this *the format estate*. **Estate is already spent in
 * this catalogue** — `PORTFOLIO` above says "the estate, as the two
 * `/aggregate` questions actually ask it", the coverage matrix's OM-2 row says
 * "the estate view is the vendor's, out of frame here", and both mean a set of
 * *deployments*. Two estates in one product is the second-vocabulary-for-one-
 * concept failure the glossary rule exists to stop (QB-9), so the screen is
 * named for what it holds — **exchange formats** — and the plan's phrase is
 * recorded here as its origin rather than adopted.
 *
 * Nothing else here is minted. *Format*, *import run*, *deliverable*,
 * *reconciliation*, *qualifier scheme*, *propagation basis*, *field
 * disposition*, *validation state* and the four *exceedance outcomes* are all
 * words this catalogue and the glossary already use, and the whole point of an
 * export screen is that the domain's words are the ones that stay put while
 * the file's words change around them.
 *
 * ## ADR-0009, read at the other boundary
 *
 * The architecture decision says the practitioner's vocabulary is canonical
 * and **file formats map inward**: `EQL` arrives and becomes **LOR**, and
 * `EQL` never appears on a screen, in a schema or in a report label. An export
 * is the same rule read at the other end of the same boundary — the domain
 * writes **LOR** and the file receives `EQL` — and `#formats` states the
 * inward half under the heading *the vocabulary maps inward, never outward*,
 * which is about the format's words never reaching the application and is not
 * contradicted by a file that receives them. The mapping is recorded either
 * way, never implicit, which is the whole of the decision.
 *
 * ## Every number below is computed
 *
 * The manifest counts come off `EVENT_SAMPLES`, the grid counts off
 * `CROSSTAB_SHAPE` and `CROSSTAB`, the outcome tally off the cells and
 * `CRITERIA`, the format inventory off `FORMATS` and `IMPORTS`, the qualifier
 * counts off `QAQC`. Not one of them is typed twice — an export whose proof is
 * a hand-typed number is the thing the proof exists to replace.
 */
export const EXCHANGE = (() => {
  /* ---------------------------------------------------------------- *
   * The populations, counted once each
   * ---------------------------------------------------------------- */

  /** The round's own record: what was collected and what came back. */
  const manifest = (() => {
    const samples = EVENT_SAMPLES;
    return {
      samples: samples.length,
      primary: samples.filter((s) => s.qc === '—').length,
      qc: samples.filter((s) => s.qc !== '—').length,
      results: samples.reduce((n, s) => n + s.results, 0),
      locations: [...new Set(samples.map((s) => s.location).filter((l) => l !== '—'))],
    };
  })();

  /**
   * The evaluated population: the grid, and the outcomes over it.
   *
   * The manifest and the grid are two different counts of two different things
   * and neither is wrong. The manifest holds every test on every sample
   * including the controls; the grid holds the analytes a quarterly review
   * reads, at the bores that yielded material. So every reconciliation row
   * below says which one it was counted over, because a proof that does not
   * say what it counted is an assertion with a number on it.
   */
  const grid = (() => {
    const cells = CROSSTAB.flatMap((r) => r.cells).filter((c) => !c.empty);
    const tally = {};
    for (const c of cells) for (const o of c.o) tally[o] = (tally[o] ?? 0) + 1;
    return {
      analytes: CROSSTAB_SHAPE.analytes,
      columns: CROSSTAB_SHAPE.locations,
      sampled: CROSSTAB_SHAPE.sampledColumns.length,
      results: CROSSTAB_SHAPE.results,
      censored: CROSSTAB_SHAPE.censored,
      /*
       * Wave 15: `emptyCells` feeds the *dry bore* loss row, so it counts the
       * cells with no sample and not the ones with no analysis. The second kind
       * of absence is its own count and its own sentence — a file that cannot
       * say "dry" also cannot say "never run", and they are different losses.
       */
      emptyCells: CROSSTAB_SHAPE.notSampled,
      notAnalysedCells: CROSSTAB_SHAPE.notAnalysed,
      emptyColumns: CROSSTAB_SHAPE.emptyColumns,
      sets: CRITERIA.length,
      outcomes: cells.length * CRITERIA.length,
      tally,
      exceedance: tally.exceedance ?? 0,
      indeterminate: tally.indeterminate ?? 0,
      compliant: tally.compliant ?? 0,
      notEvaluated: tally.not_evaluated ?? 0,
    };
  })();

  /**
   * The disposition the empty column carries, read off the field record.
   *
   * Not typed: the crosstab reads the same disposition from the same list, so
   * the loss statement below cannot describe a state the grid stopped drawing.
   */
  const emptyDisposition = (() => {
    const code = FIELD_ROUND.current.find((x) => x.location === CROSSTAB_SHAPE.emptyColumns[0])?.disposition;
    return FIELD_ROUND.disposition(code);
  })();

  /* ---------------------------------------------------------------- *
   * The inventory — every format that crosses, in either direction
   * ---------------------------------------------------------------- */

  /** How many committed runs this instance has read in a given format. */
  const runsIn = (name) => IMPORTS.filter((i) => i.format === name).length;
  const rowsIn = (name) => IMPORTS.filter((i) => i.format === name).reduce((n, i) => n + i.rows, 0);
  const defOf = (name) => FORMATS.find((f) => f.name === name);

  /**
   * One format, as a record: which way it crosses, who owns it, what version,
   * what it preserves and what it cannot carry.
   *
   * The five inbound records read their shape off `FORMATS` and `IMPORTS`
   * rather than restating it — the same discipline `#imports` and `#formats`
   * already keep, one register over. The two outbound records have no `FORMATS`
   * row because the product defines no outbound format today (FR-7.6 is S8),
   * and saying so is the point of the column rather than a gap in it.
   */
  const inbound = [
    {
      id: 'esdat-eldf-4',
      name: 'ESdat ELDF-4',
      direction: 'in',
      owner: 'EScIS — the ESdat publisher',
      kind: 'Laboratory deliverable',
      preserves:
        'Analyte, value, unit, sample code, sample date, method, the EQL and MDL limits, and the laboratory’s own qualifier codes in their own scheme.',
      cannotCarry:
        'A validation state — the deliverable’s published columns hold none, so the state a row acquires here is assigned on the way in, never read from the file (the legacy system export is the format that carries one, in Validation_Status). A PQL — the format carries four limits and none of them is verified as one. A field duplicate, a field blank or an equipment blank — there is no code for any of the three, and a blind duplicate reaches a laboratory as Normal.',
      where: 'imports',
      whereLabel: 'Import runs',
    },
    {
      id: 'yarra-v2',
      name: 'Yarra Regional v2',
      direction: 'in',
      owner: 'Yarra Regional Analytical — the laboratory’s own dialect',
      kind: 'Laboratory deliverable',
      preserves: 'Analyte, value, unit and sample code, flat, one row per result.',
      cannotCarry:
        'A validation state this site uses: “QA-Hold” is not a state the format maps, and six rows are held rather than defaulted.',
      where: 'quarantine',
      whereLabel: 'Held rows',
    },
    {
      id: 'esdat-legacy',
      name: 'ESdat legacy export',
      direction: 'in',
      owner: 'EScIS — the incumbent being migrated from',
      kind: 'Migration',
      preserves:
        'Twenty years of results with their historical validation state and their qualifiers, which is the half of FR-3.11 a migration usually loses.',
      cannotCarry:
        'Rows whose holding time, sentinel or validation state cannot be resolved: they are quarantined with the reason rather than defaulted.',
      where: 'migration',
      whereLabel: 'Legacy reconciliation',
    },
    {
      id: 'equis-edd-in',
      name: 'EQuIS EDD (4-file)',
      direction: 'in',
      owner: 'EarthSoft — the EQuIS publisher',
      kind: 'Migration',
      preserves: 'The widest field set of any format here, read as configuration rather than as code.',
      cannotCarry:
        'Nothing yet measured on this site — no EQuIS deliverable has been read here, so the definition is declared and unexercised.',
      where: 'formats',
      whereLabel: 'EDD formats',
    },
    {
      id: 'levelogic-lvlx',
      name: 'Levelogic .lvlx v4 (MOCK)',
      direction: 'in',
      owner: 'The instrument vendor — a binary download, not a deliverable',
      kind: 'Instrument download',
      preserves: 'Pressure and temperature at an hourly cadence, with the logger’s own serial and its clock.',
      cannotCarry:
        'The barometric reference, the datum and the correction. A logger writes what it measured; everything that turns that into a water level is this instance’s.',
      where: 'logger-series',
      whereLabel: 'Logger series',
    },
  ].map((f) => {
    const d = defOf(f.name);
    return {
      ...f,
      version: d?.version ?? '—',
      files: d?.files ?? 'Single binary file per logger',
      fields: d?.fields ?? null,
      runs: runsIn(f.name),
      rows: rowsIn(f.name),
      state: d?.state ?? 'active',
    };
  });

  const outbound = [
    {
      id: 'dwer-water-return',
      name: 'DWER annual water return',
      direction: 'out',
      owner: `DWER — water licensing, under ${WATER.instrument.id}`,
      kind: 'Regulator format',
      version: '—',
      files: 'One portal form',
      fields: null,
      runs: 0,
      rows: 0,
      state: 'in use',
      preserves:
        'The volume taken at each production bore in each month of the entitlement year, and the basis of each — metered or estimated, never blended.',
      cannotCarry:
        'The arithmetic behind an estimated month. The form takes a volume and a basis word; the pump-hours and duty rate that produced the number stay here, on the record that derived it.',
      where: 'water',
      whereLabel: 'Water take',
      lodgement: 'DWER portal · manual lodgement — the receipt is the evidence, and the product never sends it',
    },
    {
      id: 'equis-edd-out',
      name: 'EQuIS-compatible EDD',
      direction: 'out',
      owner: 'The receiving party’s specification — this instance owns no outbound definition',
      kind: 'Contractual deliverable',
      version: '—',
      files: 'Four CSV',
      fields: null,
      runs: 0,
      rows: 0,
      state: 'proposed',
      preserves:
        'Every result the round produced, with its own value, unit, reporting limit and detection limit, its laboratory qualifiers in the laboratory’s own scheme, and the sample and location each one belongs to.',
      cannotCarry:
        'Every judgement this instance made about those numbers: the outcome against a criterion, the indeterminate state, the basis a qualifier travelled on, and the reason a bore has no rows at all.',
      where: 'exchange',
      whereLabel: 'This record, below',
      lodgement: 'A file and a manifest, handed to whoever asked for it. There is no destination on this record',
    },
  ];

  const formats = [...inbound, ...outbound];

  /* ---------------------------------------------------------------- *
   * The outward mapping — ADR-0009 rendered
   * ---------------------------------------------------------------- */

  /**
   * The three tiers, and they are the glossary's own.
   *
   * `docs/GLOSSARY.md` marks each inbound mapping ✅ where a source states it
   * and ⚠️ where none does, and refuses to invent a domain word for a format
   * field that has no domain meaning. The outward table below is that table
   * **read the other way**, with the same tiers, because a mapping that was
   * not evidenced enough to trust on the way in is not evidenced enough to
   * write on the way out.
   */
  const TIERS = {
    established: { label: 'Established', glyph: '✓', tone: 'good', means: 'A source states the equivalence, and the export writes it.' },
    refused: { label: 'Refused', glyph: '⊘', tone: 'warn', means: 'A plausible field exists and no source states the equivalence, so the export writes nothing rather than a guess.' },
    none: { label: 'No counterpart', glyph: '✕', tone: 'bad', means: 'The target vocabulary has nothing that means this, and the file cannot carry it at all.' },
  };

  const outward = [
    { domain: 'Limit of reporting (LOR)', writes: 'EQL', tier: 'established',
      basis: 'The inbound mapping ADR-0009 records, read outward. ESdat’s EQL becomes LOR on the way in; LOR becomes EQL on the way out, and neither direction is silent.' },
    { domain: 'Method detection limit (MDL)', writes: 'MDL', tier: 'established',
      basis: 'Same name, same meaning, in both directions.' },
    { domain: 'Analyte', writes: 'ChemCode + OriginalChemName', tier: 'established',
      basis: 'The spec names the analyte across two fields — ChemCode is the key (“eg. CAS number”) and OriginalChemName the name — so the export writes the dictionary’s canonical name into OriginalChemName and its CAS-keyed code into ChemCode, never a synonym it happened to arrive under. The first draft of this row wrote “ChemName”, a field the Chemistry file does not have (W10-A-1).' },
    { domain: 'Result value', writes: 'Result', tier: 'established',
      basis: 'Written as reported. A non-detect keeps the laboratory’s own censoring notation rather than becoming a substituted number.' },
    { domain: 'Unit', writes: 'Result_Unit', tier: 'established',
      basis: 'The spec’s unit column, distinct from Detection_Limit_Units — the two units the file keeps apart stay apart. The canonical unit is written, with any conversion this instance applied recorded in lineage here — the file carries the number and the unit, not the conversion. The first draft of this row wrote “Units”, a name the thirty published columns do not include (W10-A-1).' },
    { domain: 'Sample', writes: 'SampleCode', tier: 'established',
      basis: 'The sample identifier as collected, which is the identifier the chain of custody and the certificate both name.' },
    { domain: 'Fraction — dissolved', writes: 'Total_or_Filtered', tier: 'established',
      basis: 'The glossary’s Fraction entry states this mapping. Dissolved is what the number means; filtered is what was done, and the format’s word is the second one.' },
    { domain: 'Sample type — primary', writes: 'Normal', tier: 'established', basis: 'ELDF §5.' },
    { domain: 'Sample type — trip blank', writes: 'Trip_B', tier: 'established',
      basis: 'ELDF §5. Trip_S appears in the spec’s prose and not in its code list, so the export writes the code list’s value.' },
    { domain: 'Sample type — laboratory duplicate', writes: 'LAB_D', tier: 'established',
      basis: 'ELDF §5, which cases it both LAB_D and Lab_D; the export writes one and says which.' },
    { domain: 'Sample type — matrix spike', writes: 'MS', tier: 'established',
      basis: 'ELDF §5. It is a sample type and never a result type, and the export does not put it in the other column.' },
    { domain: 'Sample type — matrix spike duplicate', writes: 'MS_D', tier: 'established', basis: 'ELDF §5.' },
    { domain: 'Validation state', writes: 'nothing', tier: 'refused',
      basis: 'No published field carries it — the Chemistry file’s thirty columns and the Sample file’s twelve include no validation state, and writing this instance’s own column name into somebody else’s file would invent a field. The state stays on the record; the transmittal can say it, the file cannot. The first draft of this row claimed the column existed (W10-A-1).' },
    { domain: 'Qualifier — laboratory origin', writes: 'the code, unchanged', tier: 'established',
      basis: `A U in an ESdat deliverable is USEPA’s U and means what USEPA says it means. The code belongs to its scheme, so it crosses without translation. Wave 17 counted them: ${QUALIFIERS.counts.laboratory} of the ${QUALIFIERS.counts.assertions} assertions this instance holds were made by a laboratory, and only ${QUALIFIERS.counts.declared} arrived in a format that declares its own code list — so ${QUALIFIERS.counts.undeclared} of the two crosses only with that assumption written down. The row’s domain used to say “scheme”, which named the field that does not decide this.` },

    { domain: 'Practical quantitation limit (PQL)', writes: 'nothing', tier: 'refused',
      basis: 'RDL is the candidate field and no source states the equivalence. The importer refuses to fill PQL from RDL on the strength of the names; the export refuses the same trade in the other direction.' },
    { domain: 'Qualifier — raised in this instance', writes: 'nothing', tier: 'refused',
      basis: `A reason code raised by one of this instance’s own checks is ours. Writing it into a laboratory qualifier field would export it as though a laboratory had said it, which the glossary forbids by name. ${QUALIFIERS.counts.refused} of ${QUALIFIERS.counts.assertions} fall here${QUALIFIERS.collisions[0] ? `, and one of them wears the same letter ${QUALIFIERS.collisions[0].code} a laboratory put on the PFAS result` : ', and no letter here is shared with one a laboratory wrote'} — which is why the field that decides this is origin rather than the character.` },
    { domain: '— (no domain term for the format’s ODL)', writes: 'left empty', tier: 'refused',
      basis: 'The format carries a fourth limit no practitioner says. On the way in it must not be dropped; on the way out there is nothing to put in it, and the column is written empty rather than filled from a neighbour.' },

    { domain: 'Sample type — field duplicate', writes: 'no code exists', tier: 'none',
      basis: 'ELDF has no field-duplicate code, though it does carry the pairing: Parent_Sample links a QC sample to its parent, and the export writes it. What cannot cross is the kind — a Normal row with a filled Parent_Sample is a parented sample of undefined type, so the RPD pairing’s meaning is lost while its link survives.' },
    { domain: 'Sample type — field blank', writes: 'no code exists', tier: 'none', basis: 'No code found in the published code list.' },
    { domain: 'Sample type — equipment blank', writes: 'no code exists', tier: 'none', basis: 'No code found in the published code list.' },
    { domain: 'Exceedance outcome', writes: 'no column exists', tier: 'none',
      basis: 'An EDD is a laboratory deliverable: it carries what was measured, not what was decided about it. An outcome is a result and a criterion together, and the criteria set does not cross in this file.' },
    { domain: 'Qualifier propagation basis', writes: 'no column exists', tier: 'none',
      basis: 'The code travels; why it travelled does not. A rule firing and a hydrogeologist deciding produce the same letter, and only one of them survives a challenge.' },
    { domain: 'Field disposition', writes: 'no column exists', tier: 'none',
      basis: 'A deliverable has a row per sample. A bore that was visited, dipped and found dry produced no sample, so it produces no row — and the file cannot say which kind of absence that is.' },
  ];

  const byTier = (t) => outward.filter((r) => r.tier === t);
  const outwardCounts = {
    total: outward.length,
    established: byTier('established').length,
    refused: byTier('refused').length,
    none: byTier('none').length,
  };

  /* ---------------------------------------------------------------- *
   * The export record
   * ---------------------------------------------------------------- */

  /** QC sample types on this round, each against the code list, computed. */
  const SAMPLE_TYPE_CODE = {
    'Field duplicate (blind)': null,
    'Field blank': null,
    'Trip blank': 'Trip_B',
    'Equipment blank (rinsate)': null,
  };
  const qcSamples = EVENT_SAMPLES.filter((s) => s.qc !== '—').map((s) => ({
    id: s.id,
    qc: s.qc,
    parent: s.parent,
    code: SAMPLE_TYPE_CODE[s.qc] ?? null,
  }));
  const qcCoded = qcSamples.filter((s) => s.code);
  const qcUncoded = qcSamples.filter((s) => !s.code);
  /**
   * The QC kinds as a phrase, grouped and counted.
   *
   * Listing the samples raw prints "field duplicate (blind), field duplicate
   * (blind), field blank, equipment blank" — two identical items, which reads
   * as a copy-paste rather than as the two blind duplicates the round
   * actually collected. Grouped, and the count comes from the grouping.
   */
  const qcPhrase = (rows) => {
    const by = new Map();
    for (const s of rows) by.set(s.qc, (by.get(s.qc) ?? 0) + 1);
    const words = ['', 'one', 'two', 'three', 'four', 'five'];
    /* The plural belongs on the noun, not after the parenthetical: two field
     * duplicates (blind), never two field duplicate (blind)s. */
    const plural = (kind, n) =>
      n > 1 ? kind.replace(/^([^(]+?)(\s*\(.*\))?$/, (_, noun, paren) => `${noun}s${paren ?? ''}`) : kind;
    return [...by].map(([kind, n]) => `${words[n] ?? n} ${plural(kind, n).toLowerCase()}`).join(', ');
  };

  /**
   * Qualifiers this round actually wrote, and the ones nothing wrote.
   *
   * ## SETTLED (wave 17) — 3 September 2026, on a record made 2 September 2026
   * (wave 10)
   *
   * The record is kept whole and the settled-note is at the end of it, because
   * a debt that vanishes when it is paid leaves nobody able to tell a settled
   * one from one that was never noticed.
   *
   * Its ledger tag — the found-and-deferred marker, dated 2 September 2026
   * (wave 10), owner unassigned — is **closed rather than quoted**, and it is
   * the only line of this record that moved. That marker is what a grep counts
   * as the ledger, so reproducing it inside the quotation would keep the
   * ledger reading three while two records stand; the heading above is what it
   * became. Everything the record *found* is below it, unedited:
   *
   * > **The QA/QC register records each qualifier's *basis* and not its
   * > *scheme*, and an export is the first surface that needs the second.**
   * > `docs/GLOSSARY.md` makes *qualifier scheme* — USEPA, ESdat or Strataflow —
   * > a first-class term, and it states the export rule directly: a Strataflow
   * > reason code "must not be exported as though a laboratory had said it". So
   * > whether a given letter may be written into a laboratory qualifier field at
   * > all is decided by a field these rows do not carry. Four letters are
   * > affected: `J` and `T` are applied (10 results between them) and `L` and
   * > `B` are proposed and unapplied.
   * >
   * > Not fixed here, deliberately. Adding a `scheme` to every row means
   * > deciding, for each of the four, which vocabulary it belongs to — `J` and
   * > `B` read as USEPA, `T` and `L` are the ones a real decision would have to
   * > be taken about — and `#qc` draws all four today, `#qualifiers` and
   * > `#lineage` draw some of them, and `#result-detail` draws a fifth code
   * > (`U`) the same field would have to classify. That is a seed change with four
   * > screens on the other end of it and a judgement in the middle, not a
   * > column to add in passing. The export states the gap where it bites
   * > instead: the propagation basis is a named loss below, and the scheme is
   * > recorded as the thing that would decide *which* codes are written at all.
   *
   * ## What closed it
   *
   * `QUALIFIERS` — one record, six assertions on five letters, read by `#qc`,
   * `#qualifiers`, `#lineage`, `#result-detail` and this screen. The four
   * screens the deferral counted are all on the other end of it, exactly as it
   * said; what it costs them is a lookup rather than a description.
   *
   * **The deferral named one field and the gap is two.** The glossary carries
   * *qualifier scheme* and *qualifier origin* as separate first-class terms,
   * and the export rule it quoted — "must not be exported as though a
   * laboratory had said it" — turns on **origin**, which the record never
   * named. Scheme says which vocabulary a letter is drawn from; origin says
   * who asserted it. The export needed both and the register carried neither.
   *
   * **Origin is measured and it answers the export question completely.** Two
   * of the six assertions are `laboratory` in the glossary's own word; four
   * were raised by checks of this instance. So four are refused before the
   * letter is looked at, and one of those four is a `J` — the same character a
   * laboratory put on the PFAS result, which crosses. Same letter, two
   * assertions, two fates, and nothing on any screen told them apart before.
   *
   * **Scheme is settled only where the record settles it, and that is once.**
   * `U` is USEPA on the glossary's own sentence about the format it arrived
   * in. The other five are undecided in two different ways, kept apart because
   * the ways out differ, and both are drawn as decisions with their readings,
   * their consequence each way and their counts — the wave-14, -15 and -16
   * move, applied here.
   *
   * **Two corrections, each with its before on the face that changed.** Wave
   * 10 expected `J` and `B` to read as USEPA; the specification names six
   * codes for `Lab_Qualifier` and `B` is not among them (`QUALIFIERS.wave10`).
   * And `PFAS_LIMITS` asserted `scheme: 'USEPA'` on a qualifier that arrived
   * on a laboratory's own single-CSV dialect, where the glossary's warrant
   * names one format and it is not that one.
   *
   * **What was refused.** A meaning for `T`, which nothing states. A third
   * origin word for the two rule-raised codes, which the glossary does not
   * offer. And the sentence *"forbidden by the schema"* — the specification
   * says `Lab_Qualifier` **may carry** six codes and does not say it rejects a
   * seventh, so the register says "not among the codes the specification
   * names" and stops there.
   */
  const qualifiersWritten = QAQC.filter((q) => q.qualifier && !q.proposed);
  const qualifiersProposed = QAQC.filter((q) => q.qualifier && q.proposed);
  const qualifiedResults = qualifiersWritten.reduce((n, q) => n + q.results, 0);
  const proposedResults = qualifiersProposed.reduce((n, q) => n + q.results, 0);
  /**
   * The gap above, settled — and what the export may now write, per code.
   *
   * Everything here reads `QUALIFIERS`. `was` is the prose this replaced, kept
   * so the screen can print what it used to say beside what it says now.
   */
  const schemeGap = {
    term: 'qualifier scheme',
    raised: '2 September 2026 (wave 10)',
    settled: '3 September 2026 (wave 17)',
    applied: qualifiersWritten.map((q) => q.qualifier),
    proposed: qualifiersProposed.map((q) => q.qualifier),
    decides: 'Whether a code may be written into a laboratory qualifier field at all.',
    rule: 'A Strataflow reason code is this instance’s own. Exporting it as though a laboratory had said it is forbidden by name, so the scheme is what the export would filter on.',
    /** The two sentences this replaces, verbatim. */
    was: {
      headline: 'The qualifier scheme — the vocabulary a code belongs to — decides whether that code may be written into the file at all, and the QA/QC register does not carry one.',
      why: 'The QA/QC register carries each qualifier’s propagation basis and not its scheme. Adding one means deciding the vocabulary of four codes, on screens that already draw them — which is a decision rather than a column.',
      guess: QUALIFIERS.wave10.was,
    },
    now:
      'The register carries both fields, and the one the deferral never named is the one the rule turns on: ' +
      `origin — ${QUALIFIERS.originWords.join(' or ')}, the glossary’s own two words. ` +
      `${QUALIFIERS.counts.assertions} assertions on ${QUALIFIERS.counts.codes} letters: ` +
      `${QUALIFIERS.counts.writable} crosses unchanged, ${QUALIFIERS.counts.conditional} crosses only with its assumption stated, ` +
      `and ${QUALIFIERS.counts.refused} are refused on origin before the letter is looked at.`,
    /** The residue: what is still undecided, counted rather than described. */
    residue:
      `${QUALIFIERS.counts.unrecorded + QUALIFIERS.counts.undeclared} of the ${QUALIFIERS.counts.assertions} have no scheme the record settles — ` +
      `${QUALIFIERS.counts.unrecorded} raised here with the vocabulary unstated, ${QUALIFIERS.counts.undeclared} that arrived on a deliverable declaring none. ` +
      'None of it changes what the export writes, because origin already decides every row — so the undecided vocabulary is a migration question rather than a blocked file, and it is drawn as the decision it is.',
    register: QUALIFIERS,
  };

  /**
   * The four files, with a row count each and the register each count came
   * from. Nothing here is a literal: change the manifest and the file changes.
   */
  const files = [
    { name: `MOCK-WDL_${ROUND.code}_Locations.csv`, holds: 'One row per location a sample in this file refers to', rows: manifest.locations.length, from: 'the round’s manifest' },
    { name: `MOCK-WDL_${ROUND.code}_Samples.csv`, holds: 'One row per sample, primary and field QC alike', rows: manifest.samples, from: 'the round’s manifest' },
    { name: `MOCK-WDL_${ROUND.code}_Results.csv`, holds: 'One row per test result, with its own limits and qualifiers', rows: manifest.results, from: 'the round’s manifest' },
    { name: `MOCK-WDL_${ROUND.code}_Batches.csv`, holds: 'One row per analytical batch the results were run in, referenced rather than duplicated as samples', rows: BATCHES.length, from: 'the batch register' },
  ];

  /**
   * The reconciliation — FR-3.11's proof, read at the other boundary.
   *
   * The import's version can say *agrees* on every row, because a file that
   * arrived either matched the source or did not. The export's cannot, and the
   * asymmetry is the finding rather than a shortfall in the drawing: some of
   * what this instance holds has nowhere to land. Each row says what it was
   * counted over, so the whole table recounts from the registers above.
   */
  const reconciliation = [
    { check: 'Location rows', over: 'the round’s manifest', record: manifest.locations.length, file: manifest.locations.length, verdict: 'agrees',
      says: `The ${manifest.locations.length} locations a sample in this round refers to, each written once.` },
    { check: 'Sample rows', over: 'the round’s manifest', record: manifest.samples, file: manifest.samples, verdict: 'agrees',
      says: `${manifest.primary} primary and ${manifest.qc} field QC samples. Every one is written; ${qcUncoded.length} of them arrive without a type, which is the QC-code row below.` },
    { check: 'Result rows', over: 'the round’s manifest', record: manifest.results, file: manifest.results, verdict: 'agrees',
      says: 'Every test on every sample on the manifest, including the controls.' },
    { check: 'Analytes on the results grid', over: 'the results grid', record: grid.analytes, file: grid.analytes, verdict: 'agrees',
      says: 'The dictionary’s canonical name for each, not the synonym the deliverable arrived under.' },
    { check: 'Non-detects, censoring notation kept', over: 'the results grid', record: grid.censored, file: grid.censored, verdict: 'agrees', was: PFAS_REACH.was.censored,
      says: `Each keeps the laboratory’s own “less-than” notation beside its reporting limit. None becomes a substituted number. ${PFAS_REACH.was.censored - grid.censored} left this count in wave 15 — not because the notation changed but because ${PFAS_REACH.cellsWithdrawn} of the values were censoring asserted on analyses that never ran, and a censored value is the laboratory’s notation or it is nothing.` },
    { check: 'Locations in the round’s plan', over: 'the grid’s columns', record: grid.columns, file: grid.sampled, verdict: 'not carried',
      says: `${grid.emptyColumns.join(', ')} was visited and found ${emptyDisposition.label.toLowerCase()}, so it has no sample and therefore no row. The file cannot say that; its absence reads as data not yet sent.` },
    { check: 'Evaluation outcomes', over: `the grid, ${grid.sets} criteria sets`, record: grid.outcomes, file: 0, verdict: 'no column', was: PFAS_REACH.was.outcomes,
      says: `${grid.results} results × ${grid.sets} sets. The receiving system re-evaluates against its own criteria library, and a different criterion is a different answer.` },
    { check: '— of those, indeterminate', over: 'the grid', record: grid.indeterminate, file: 0, verdict: 'reads as a pass', was: PFAS_REACH.was.indeterminate,
      says: 'A reporting limit above the criterion means nothing was measured either way. The file carries no state for it, and the incumbent baseline records one of the two incumbents rendering exactly this case as a pass unless a non-default setting is enabled — so these arrive as the one thing they are not.' },
    /*
     * Wave 15 adds the row rather than folding it into the dry one above,
     * because they are different losses with different remedies: a dry bore has
     * no sample and so no row at all, and a bore that was sampled and never
     * analysed for this suite has rows for everything else and a silence where
     * this one would be. The file cannot tell them apart either, which is the
     * point of counting them apart here.
     */
    { check: 'Analyses that were never run', over: 'the results grid', record: grid.notAnalysedCells, file: 0, verdict: 'no column',
      says: `${PFAS_REACH.analyte} at ${PFAS_REACH.withdrawnLocations.join(', ')} — samples that exist, an analysis that does not. The file writes a row per result, so these are simply absent, and their absence is indistinguishable from a result not yet sent.` },
    { check: 'QC samples carrying a type code', over: 'the round’s manifest', record: qcSamples.length, file: qcCoded.length, verdict: 'no code exists',
      says: `The ${qcPhrase(qcCoded)} has a published code. The ${qcPhrase(qcUncoded)} do not — and those are the controls that answer whether the sampling itself introduced anything.` },
    { check: 'Qualified results carrying their basis', over: 'the round’s QA/QC register', record: qualifiedResults, file: 0, verdict: 'no column',
      says: `${qualifiersWritten.map((q) => q.qualifier).join(' and ')} on ${qualifiedResults} results, each with the rule or the judgement it travelled on. The letter can cross; the basis cannot — and neither of these two letters crosses at all, because the register now records what raised them and a rule of ours raised both.` },
  ];

  const agreed = reconciliation.filter((r) => r.verdict === 'agrees');
  const notCarried = reconciliation.filter((r) => r.verdict !== 'agrees');

  /**
   * The loss statement — named, sized, and each one checked against what the
   * format could plausibly carry rather than asserted.
   *
   * `checked` is the part that matters. "The format cannot carry it" is easy
   * to write and easy to be wrong about, so every row says what was looked at
   * before the claim was made.
   */
  const losses = [
    {
      what: 'The outcome against a criterion',
      n: grid.outcomes,
      unit: 'outcomes',
      where: 'crosstab',
      whereLabel: 'the results grid',
      checked:
        'Both incumbents do emit an action-level code of their own, so the claim is not that a code cannot exist in the target. It is narrower and it holds: an outcome is a result and a criterion together, and this file carries no criteria set. A code written against the receiving library is that library’s answer, not this one’s.',
      reads:
        'The receiving system evaluates the numbers against whatever it holds. Where its criteria are ours the answers agree by coincidence rather than by transfer; where they differ, nothing in the file says so.',
    },
    {
      what: 'Indeterminate — a reporting limit above the criterion',
      n: grid.indeterminate,
      unit: 'outcomes',
      where: 'indeterminate',
      whereLabel: 'the register of what could not be assessed',
      checked:
        'Evaluation has four outcomes here and the formats this instance reads carry two. The absence is a missing state rather than a missing column, so no setting on the receiving side can recover it — there is nothing in the file to read. What the incumbent baseline records is the consequence measured on one of the two incumbents: it renders exactly this case as a pass unless a non-default setting is enabled.',
      reads:
        `${grid.indeterminate} results that are explicitly not passes arrive as a number, a reporting limit and no state — which any system comparing the two reads as compliant. It is the sharpest loss on the list, because the reader of the file is not told that anything was lost.`,
    },
    {
      what: 'The field disposition — dry is not missing',
      n: grid.emptyCells,
      unit: `cells at ${grid.emptyColumns.join(', ')}`,
      where: 'field-capture',
      whereLabel: 'the bore session that recorded it',
      checked:
        'The location file could in principle carry a status column, and no source states one; more decisively, a deliverable has a row per sample, and a dry bore produced none. So the loss is structural rather than a field somebody forgot.',
      reads:
        `${grid.emptyColumns.join(', ')} is simply absent. A bore visited twice, dipped to the base of its screened interval and found ${emptyDisposition.label.toLowerCase()} is indistinguishable in this file from a bore whose results have not been sent — and those are different facts about the aquifer and about the round.`,
    },
    /*
     * Wave 15. The grid gained a second kind of absence and the export record
     * has to name it separately, because the remedy is different at both ends:
     * a dry bore's absence is answered by a field disposition the format has no
     * column for, and an unrun analysis is answered by the sample's test list,
     * which the format also has no column for — but a reader told only about
     * the first would conclude the other five silences were the same fact.
     */
    {
      what: 'An analysis that was never run — the sample exists, the result does not',
      n: grid.notAnalysedCells,
      unit: `cells at ${PFAS_REACH.withdrawnLocations.join(', ')}`,
      where: 'crosstab',
      whereLabel: 'the results grid, where the cell says which absence it is',
      checked:
        'The Sample file carries a row per sample and the Chemistry file a row per result, and neither carries the sample’s *test list* — so a suite that was not run produces no row and no column says it was not asked for. The check that matters is that this is not the dry-bore loss wearing a different name: these bores returned water, filled containers and reconciled at the laboratory, and every other analyte on them crossed.',
      reads:
        `${grid.notAnalysedCells} silences in one analyte row. In this file they are indistinguishable from ${grid.emptyColumns.join(', ')}’s absence, from a result held in quarantine, and from a deliverable that has not been sent — four different facts arriving as the same nothing.`,
    },
    {
      what: 'The QC sample types the code list has no code for',
      n: qcUncoded.length,
      unit: `of ${qcSamples.length} field QC samples`,
      where: 'events',
      whereLabel: 'the round’s manifest',
      checked:
        'Six of the nine sample types this domain uses map to a published code and three do not — and the Sample file does carry Parent_Sample, which links a QC sample to its parent, so the export writes the pairing. The three unmapped ones are exactly the field controls, which is not an accident: a laboratory receives a blind duplicate as an ordinary sample and never knew it was one.',
      reads:
        'A field duplicate crosses as Normal with its Parent_Sample filled — a parented sample of undefined kind, so the RPD pairing’s meaning is lost while its link survives — and the two blanks have no code at all. The controls that answer “did the sampling introduce this” do not survive the crossing as what they are.',
    },
    {
      what: 'The basis a qualifier travelled on',
      n: qualifiedResults,
      unit: 'qualified results',
      where: 'qualifiers',
      whereLabel: 'where every qualifier states its basis',
      checked:
        'A code belonging to a laboratory’s own vocabulary can cross intact, because the target reads that vocabulary. What has no field is the answer to “why did it reach these results”, which this instance requires on every propagated qualifier and which no published field carries.',
      reads:
        `The letter, with nothing behind it. A rule firing under a named version and a hydrogeologist’s judgement produce the same character in the same column, and ${proposedResults} further results carry a proposed qualifier that nothing has written — correctly, since no basis has been chosen.`,
    },
    {
      what: 'A practical quantitation limit',
      n: 1,
      unit: 'of the three limits this domain keeps apart',
      where: 'result-detail',
      whereLabel: 'where the three limits are three columns',
      checked:
        `A refusal rather than an absence, and the only one of the ${outwardCounts.refused} refused mappings that costs a number. RDL is the plausible field and the equivalence is unverified; writing it would make the export assert something the importer declined to assert, on the very same evidence.`,
      reads:
        'Nothing, in that column. The receiving system sees two limits where this instance holds three, and the third is missing on purpose rather than by oversight.',
    },
  ];

  /* ---------------------------------------------------------------- *
   * DR-2 — where a reader would look for a send button
   * ---------------------------------------------------------------- */

  const noRelay = {
    headline: 'There is no send button on this record',
    subhead: 'and its absence is a decision',
    lines: [
      'An export is a file and a manifest. It is written where the operator asked for it to be written, inside the customer’s own tenancy, and this instance holds no destination for it — no address, no endpoint, no queue.',
      'The alerting precedent is one screen over and it is stricter than it looks: every alert destination is a configured row, a channel is the only place a dispatch can reach, and there is no relay behind it. An export has not even that, because an export is not dispatched at all.',
      'The regulator returns this project already lodges work the same way and always have: the DWER portal, by hand, with the portal’s receipt kept as the evidence. What the product records is that a lodgement happened, not that it performed one.',
      'Any integration that would route this data through vendor infrastructure is an anti-pattern to be redesigned rather than a feature to be configured. So the control below hands you a file; what happens to it afterwards is the contract’s business and yours.',
    ],
    precedent: { screen: 'alerts', label: 'Every destination is a configured row' },
    lodgement: { screen: 'submissions', label: 'DWER portal · manual lodgement' },
  };

  /* The export record itself. */
  const edd = {
    id: `MOCK-WDL-EDD-${ROUND.code}`,
    covers: ROUND.code,
    coversLabel: ROUND.label,
    collected: ROUND.collected,
    certificate: ROUND.certificate,
    laboratory: ROUND.laboratory,
    validationState: ROUND.validationState,
    format: 'EQuIS-compatible EDD',
    /*
     * The counterparty follows the convention wave 9 recorded rather than the
     * project-code one. `MOCK-` marks this instance's own artefacts — the
     * project codes, the custody form, the export identifier and the file
     * names below — while a fictional *party* is marked by being obviously
     * fictional, exactly as the two laboratories and the operator itself are
     * (`Pilbara Analytical Services`, `Wandalup Resources Pty Ltd`). The first
     * draft of this line read `MOCK-KRJ Holdings Pty Ltd`, which is worse on
     * both counts: `MOCK-KRJ` is a *project code* in this seed, and the
     * project it names belongs to the same operator, so the export would have
     * been owed by Wandalup to itself.
     */
    requestedBy: 'Tallering Metals Pty Ltd — the joint-venture participant',
    requestedUnder: 'Joint-venture agreement, schedule 6 — environmental data supply, quarterly, in the participant’s own system’s format',
    requestedAt: '2026-05-22',
    preparedBy: 'A. Nakamura',
    preparedAt: `${AS_AT} 10:20 AWST`,
    scope:
      'Every sample on the round’s manifest and every test on it, at the validation state the round is in — not the results grid, which is a view over part of the same round.',
    files,
    reconciliation,
    losses,
    noRelay,
    counts: {
      checks: reconciliation.length,
      agreed: agreed.length,
      notCarried: notCarried.length,
      lossKinds: losses.length,
      fileRows: files.reduce((n, f) => n + f.rows, 0),
      /*
       * Wave 15 added one reconciliation row and one loss, both for the same
       * new fact — an analysis that was never run. The befores are here so the
       * two counts that render on other screens can say what they were.
       */
      wasChecks: reconciliation.length - 1,
      wasNotCarried: notCarried.length - 1,
      wasLossKinds: losses.length - 1,
    },
  };

  return {
    formats,
    inbound,
    outbound,
    outward,
    outwardCounts,
    tiers: TIERS,
    byTier,
    manifest,
    grid,
    emptyDisposition,
    qcSamples,
    qcCoded,
    qcUncoded,
    qualifiersWritten,
    qualifiersProposed,
    qualifiedResults,
    proposedResults,
    schemeGap,
    edd,
    counts: {
      formats: formats.length,
      inbound: inbound.length,
      outbound: outbound.length,
      drawnInFull: 1,
      exercised: formats.filter((f) => f.runs > 0).length,
    },
  };
})();

/* ==================================================================== *
 * Wave 12 — configuration portability (OM-5) and the deployment estate
 * (OM-2). 2 September 2026.
 * ==================================================================== */

/**
 * The administration clock, **named rather than typed an eighth time**.
 *
 * Wave 11 recorded, and deferred, that this catalogue runs on two clocks:
 * `AS_AT` is 2026-05-24 and every project and monitoring countdown measures
 * from it, while the instance and administration surfaces are dated
 * **23 August 2026**, the day they were first drawn. That deferral is still
 * open and this wave does not touch it.
 *
 * What this constant is **not** is a third clock. It is the second one, which
 * already exists as seven literals nobody can grep as a set:
 *
 *   - `INSTANCE.backup.last`      — `2026-08-23 02:00 AWST`
 *   - `INSTANCE.services[1]`      — scheduler `last tick 2026-08-23 06:00:04 AWST`
 *   - `ENTITLEMENT.remaining`     — `130 days`, which is 2026-08-23 → 2026-12-31
 *   - `MEMBERS[0].lastSeen`       — `2026-08-23 07:41 AWST`
 *   - `MEMBERS[1].lastSeen`       — the same moment, the same principal
 *   - `MEMBERS[3].lastSeen`       — `2026-08-23 06:55 AWST`
 *   - `SAVED_VIEW_LIST[2].used`   — `2026-08-23`
 *
 * Both surfaces this wave adds are administration surfaces, so both sit on
 * that clock and both state their own as-at date on their face. Every number
 * derived below is arithmetic on this constant and a dated source record;
 * nothing is typed. The existing seven literals are left exactly as they are —
 * moving them is the deferred work, not this wave's.
 *
 * ## SETTLED (wave 13) — 2 September 2026
 *
 * The half that is now paid: **`ENTITLEMENT.remaining` is the seventh literal
 * no longer** — it derives from this constant and the term's own end date, and
 * the record above it carries the arithmetic. And every surface that renders a
 * date or a countdown on this clock now **says so where it renders**, from
 * `OPS_CLOCK` below, so the sentence a reader needs is beside the number
 * rather than in a seed comment they will never open. The other six literals
 * keep their dates exactly as they are, as this comment said they would.
 *
 * The half that is deliberately still open, with the reason unchanged:
 * **moving `AS_AT` itself is not this wave either.** Doing it re-derives every
 * countdown on the obligations board, the programme, the notification and the
 * holding-time clocks, and would change numbers on screens no wave has opened.
 * The honest settlement wave 13 makes is the one wave 11 named — *no reader
 * can mistake which as-at a number is on* — and that is a legibility claim
 * rather than a re-dating one.
 */
export const OPS_AS_AT = '2026-08-23';

/**
 * The two clocks, as one record every face can read.
 *
 * The catalogue has two as-at dates and both are legitimate: the project and
 * monitoring surfaces are drawn as at `AS_AT`, and the instance and
 * administration surfaces as at `OPS_AS_AT`. What was not legitimate was
 * leaving a reader to work out which one a number was on by noticing that
 * *last seen* was three months after *collected*.
 *
 * So this is the sentence, written once. Every surface drawing an
 * administration-clock date or countdown renders it; the project surfaces
 * state theirs the way they always have, in the board's own "as at" line and
 * in the round's own dates. Two clocks stated is a different thing from two
 * clocks discovered.
 *
 * ## Where it is drawn, and the rule that decides
 *
 * **Sixteen surfaces** render it: `#home`, `#project-home`, `#project-settings`,
 * `#crosstab`, `#documents`, `#data-states`, `#certificate`, `#narrative`,
 * `#report`, `#criteria`, `#instance`, `#upgrade`, `#diagnostics`,
 * `#entitlement`, `#package` and `#estate`. The last two already stated their
 * as-at in their own words and now carry the same phrase as the rest, because a
 * sentence that is nearly identical on fourteen screens and worded differently
 * on two is a sentence a reader stops trusting.
 *
 * The rule for the rest is `#estate`'s own, stated there since it was drawn:
 * **a date that is *when something happened* or *when something is due* is a
 * source record's own and belongs to no clock** — a release date, a licence
 * expiry, a period boundary, a round's due date. What belongs to a clock is a
 * value reported *as of* one: a last-seen, a last-checked, a days-remaining, a
 * days-behind. Thirteen more screens carry dates after `AS_AT` and every one of
 * them is the first kind, which is why they say nothing about a clock.
 *
 * ## Vocabulary, recorded with its anchor
 *
 * **"Administration clock"** is not minted here: wave 12 opened the comment
 * above `OPS_AS_AT` with *"The administration clock, named rather than typed
 * an eighth time"*, and this record gives that name a face. **"Project
 * clock"** is its counterpart and is new — the catalogue had no name for the
 * `AS_AT` half because until there were two names it did not need one, and a
 * sentence that names one clock and calls the other *the other one* is the
 * sentence a reader has to decode. Neither is a glossary term and neither
 * describes the product: both are names for two dates in **this catalogue**,
 * which is why they are said on the catalogue's own faces rather than drawn as
 * a field on any record.
 *
 * ## Found while doing this, recorded rather than fixed
 *
 * **Four** records sit *after* the administration as-at as well as after the
 * project one, and they were counted by measurement rather than by memory —
 * every rendered date later than `OPS_AS_AT` was enumerated and classified,
 * and the rest are due dates, contract terms, upgrade windows, a holding-time
 * expiry and this wave's own settled-notes:
 *
 *   - the interpretation authored and pinned at `2026-08-24` (`#narrative`);
 *   - the criteria draft proposed on `2026-08-24` (`#criteria`);
 *   - the amended certificate issued and received on `2026-08-27`
 *     (`#certificate`);
 *   - the golden comparison run at `2026-09-01 08:12` (`#report`) — the one
 *     the first draft of this note missed, which is why it was measured.
 *
 * And two rendered dates are neither records nor on a clock at all: the
 * `2026-09-01 → if activated` previews of the criteria draft's effective
 * date, drawn on `#criteria` and in `#package`'s would-write panel. A
 * preview of a conditional future event has no as-at to be after; the
 * enumeration missed them on its first pass and the auditor's own count
 * found them (W13-A-3), which is the second time this note has been
 * corrected by measurement — the reason it exists.
 *
 * All four are event dates, so the rule above puts them outside a clock — but
 * a reader who noticed would be right to ask, so each is named on its own
 * screen beside the clock statement rather than left to be found. This wave
 * **moves no date literal**, by its own scope. Not a deferral record: it is
 * one sentence of arithmetic whenever somebody moves either clock, and it
 * belongs to that change.
 */
export const OPS_CLOCK = {
  asAt: OPS_AS_AT,
  phrase: `as at ${OPS_AS_AT}`,
  name: 'the administration clock',
  other: AS_AT,
  otherName: 'the project clock',
  /** The clause every face leads with. */
  head: `Administration clock — as at ${OPS_AS_AT}.`,
  /** The clause every face closes with, so no two paraphrase it apart. */
  tail: `The instance and administration surfaces of this catalogue measure from that day; the project and monitoring surfaces measure from ${AS_AT}, so a value here is not stale beside one there — it is on the other clock.`,
  get says() {
    return `${this.head} ${this.tail}`;
  },
  /** Why the two are not simply reconciled, kept beside the statement. */
  why:
    `Reconciling them means moving one, and moving ${AS_AT} re-derives every countdown on the obligations board, the programme and the notification. What is settled instead is that no number has to be traced to find out which day it is measured from.`,
};

/**
 * # The configuration inventory this deployment holds — settled 2 September
 * 2026, wave 13
 *
 * ## Why it exists
 *
 * Wave 12 drew `#estate`'s configuration column and its drift finding on top
 * of the diagnostic bundle's configuration report — *each configuration item's
 * own version and its SHA-256* — and recorded that **the catalogue described
 * the bundle twice without naming that field either time**. This is the field,
 * drawn once, as the thing the bundle carries and the thing drift is measured
 * against. `BUNDLE_CONTENTS` below reads it, `CONFIG_PACKAGE`'s per-item
 * checksums read it, and the estate's one confirmed drift reads it, so the
 * four surfaces cannot state four different checksums for one artifact.
 *
 * ## Anchors, and every one was read in the app repo
 *
 *   - **The shape.** `apps/web/lib/ops/config-bundle.ts` (G-56c):
 *     `ConfigArtifact` is `{ kind, name, version, checksum, bytes }` — the
 *     name is "the filename, which is what an operator sees on disk", the
 *     version is "the artifact's own version, read from inside it", and the
 *     checksum is "SHA-256 of the file's bytes. What drift is detected
 *     against."
 *   - **Its own version field per kind.** `versionOf()` reads `revision` for a
 *     format and `artifact_version` for the other two, "left alone rather than
 *     normalised, because those names are read by people who know one kind and
 *     not the other".
 *   - **An unversioned artifact is refused rather than defaulted.** The same
 *     function throws: *"An unversioned configuration artifact cannot be
 *     reconciled across an estate, and defaulting it would let one deploy
 *     unnoticed."* That is what `refused` below is drawing.
 *   - **The inventory checksum covers configuration and nothing else.**
 *     `configBundle()` hashes `kind:name:version:checksum` lines and stops.
 *   - **The bundle carries this inventory and never the content.**
 *     `apps/web/lib/ops/diagnostics.ts`'s `ConfigurationReport.artifacts` is
 *     commented *"G-56c's inventory: each artifact's own version and SHA-256,
 *     never its content"*, and its configuration category's manifest line
 *     reads *"Configuration shape — env var names as set/unset, config
 *     artifacts as versions and SHA-256s"*.
 *
 * ## The one thing this surfaced, and it is a real one
 *
 * The format register holds **four** definitions and two of them —
 * `ESdat legacy export` and `EQUIS EDD (4-file)`, both migration-only — carry
 * no version at all. Under the rule above, an artifact that declares no
 * version is refused, so those two cannot be configuration artifacts: they are
 * register rows for formats the one historical migration was read with. The
 * inventory therefore holds **three** items, not five, and
 * `CONFIG_PACKAGE.kinds` now counts *held here* from this record rather than
 * from `FORMATS.length` — **the EDD-format row on `#package` moves from 4 to
 * 2**, and the screen says which two are missing and why, rather than letting
 * a reader find two counts of one thing.
 *
 * Every checksum here is fictional on the same convention as every digest and
 * identifier in this seed. What is not fictional is the shape: hex characters
 * of a SHA-256, truncated. The product's own manifest renders sixteen
 * (`sha256.slice(0, 16)`); this catalogue's columns carry twelve, trimmed
 * further for the narrow cells — a display choice stated here rather than
 * misattributed to the product. The first draft claimed the truncations
 * matched (W13-A-2).
 */
export const CONFIG_INVENTORY = (() => {
  const anzg = CRITERIA_LIBRARY.find((c) => c.set === CRITERIA[0].name && c.state === 'active');
  const esdat = FORMATS.find((f) => f.name === 'ESdat ELDF-4');
  const yarra = FORMATS.find((f) => f.name === 'Yarra Regional v2');

  const items = [
    {
      kind: 'criteria-library',
      label: 'Criteria library',
      file: 'anzg-2018.json',
      what: anzg.set,
      field: 'artifact_version',
      version: anzg.version,
      checksum: 'a41f6c0928d7',
      kb: 118,
      where: 'criteria',
      whereLabel: 'the criteria library',
    },
    {
      kind: 'edd-format',
      label: 'EDD format definition',
      file: 'esdat.json',
      what: esdat.name,
      field: 'revision',
      version: esdat.version,
      checksum: '7e2d915cb083',
      kb: 24,
      where: 'formats',
      whereLabel: 'the format registry',
    },
    {
      kind: 'edd-format',
      label: 'EDD format definition',
      file: 'yarra-regional.json',
      what: yarra.name,
      field: 'revision',
      version: yarra.version,
      checksum: 'b6c40e79f215',
      kb: 19,
      where: 'formats',
      whereLabel: 'the format registry',
    },
  ];

  /**
   * Register rows that are not configuration artifacts, drawn rather than
   * quietly absent — the same argument the product makes about an empty kind.
   */
  const refused = FORMATS.filter((f) => f.version === '—').map((f) => ({
    name: f.name,
    state: f.state,
    why: 'Declares no revision, and an item that declares no version is refused rather than defaulted — it could not be reconciled across an estate afterwards.',
  }));

  const countOf = (kind) => items.filter((i) => i.kind === kind).length;

  return {
    items,
    refused,
    kinds: {
      'criteria-library': countOf('criteria-library'),
      'edd-format': countOf('edd-format'),
      /* Reported and reported as empty, because an inventory that omits a kind
       * teaches an operator that the kind is not configurable. */
      'report-template': countOf('report-template'),
    },
    /** One literal, on the same fictional convention as every digest here. */
    checksum: '3d81ba0c5e47',
    checksumOver: 'kind:name:version:checksum, one line per item, and nothing else — not the application version',
    counts: {
      items: items.length,
      refused: refused.length,
      registerRows: FORMATS.length,
      kb: items.reduce((n, i) => n + i.kb, 0),
    },
    settled: {
      on: '2026-09-02',
      wave: 'wave 13',
      was: 'The configuration package screen counted the EDD-format kind as “held here: 4”, straight off the format register’s length.',
      now: `It counts the definitions that carry a revision — ${countOf('edd-format')} — and the ${refused.length} that do not are named beside them as what they are.`,
    },
  };
})();

/**
 * # What is in a diagnostic bundle, derived once and read by both screens —
 * settled 2 September 2026, wave 13
 *
 * ## What this replaces
 *
 * Wave 12's `bundleGap` record: *"two surfaces already describe one record
 * with two different lists — four rows against eight — and this wave adds a
 * third that depends on a field neither of them mentions."* `#diagnostics`
 * enumerated four content rows and named *configuration* only in its intro
 * sentence; `#entitlement` previewed eight and called the nearest one
 * *"reference-content versions"*; **no checksum appeared on either**, which is
 * the field `#estate`'s whole configuration column rests on. Both screens read
 * this record now, and the configuration category carries the inventory
 * itself.
 *
 * ## The categories are the product's five, not the catalogue's four or eight
 *
 * `apps/web/lib/ops/diagnostics.ts` opens with OM-1's own list — *"OM-1 names
 * five categories: version, configuration, logs, schema state, recent
 * errors"* — and `DiagnosticsCategoryName` is that union, closed. Every `what`
 * below is the manifest line the generator writes for that category, quoted.
 * So the four rows `#diagnostics` drew map onto the five like this, and the
 * mapping is the record of what was corrected:
 *
 *   - *Version and commit* → **version**, unchanged in substance.
 *   - *Migration state* and *Schema and policy inventory* were **two rows for
 *     one category**: the bundle writes one `schema.json` and it is the
 *     applied migrations by name and applied-at. There is no DDL in it and no
 *     policy inventory — `schemaReport()` reads `kysely_migration` and
 *     nothing else — so the second row was describing a file the bundle does
 *     not contain.
 *   - *Recent errors, redacted* → **errors**, unchanged in substance.
 *   - **logs** was named in the screen's intro sentence and enumerated
 *     nowhere, and it is the largest thing in the archive.
 *   - **configuration** is the one the whole deferral was about.
 *
 * And the eight rows `#entitlement` drew: *service health and last 200
 * scheduler ticks*, *slow-query log and query plans* and *row counts per
 * table* are **not in the bundle at all** — three files the generator never
 * writes — and *migration history and schema DDL* is half right for the
 * reason above. They are recorded here rather than deleted, because a list
 * that vanishes cannot be compared with the one that replaced it.
 *
 * ## What was found while doing it, and it is not the configuration field
 *
 * `#diagnostics` listed **"Any principal identifier"** under *not in the
 * bundle*, one panel away from `#entitlement` saying the application logs
 * carry *"principal identities … in attribution lines"* and a blast radius
 * counting **~1,400** of them. Both cannot be true, and the product settles
 * it: `apps/web/lib/ops/log.ts`'s denylist is passwords, tokens, connection
 * strings, stacks and the customer's own values — `principal` and `subject`
 * are not on it, deliberately, because attribution is what a log is for. What
 * the bundle excludes is **session data**, which is a different fact: *"Who is
 * signed in is the customer's directory's business and the instance's, not
 * Strataflow's."* The exclusions below are the generator's own `NOT_INCLUDED`
 * map, six of them, each with the reason it ships in every manifest.
 *
 * ## Sizes
 *
 * Fictional, like every size in this seed, but **the total is not typed**: the
 * blast radius on `#entitlement` reads the sum of the parts. It said `3.6 MB`,
 * which was the old eight rows added up; the five categories and the manifest
 * come to 3.1 MB, and the number moves because the list did.
 */
export const BUNDLE_CONTENTS = (() => {
  const kb = (n) => (n < 1024 ? `${n} KB` : `${(n / 1024).toFixed(1)} MB`);

  const categories = [
    {
      category: 'version',
      file: 'version.json',
      what: 'Application version, commit, runtime and platform',
      detail: `${INSTANCE.version} @ ${INSTANCE.commit}, and the Node, platform and architecture it is running on.`,
      sensitive: 'none',
      kb: 2,
    },
    {
      category: 'configuration',
      file: 'configuration.json',
      what: 'Configuration shape — env var names as set/unset, config artifacts as versions and SHA-256s',
      detail: `${CONFIG_INVENTORY.counts.items} configuration items with their own versions and checksums, and 12 environment variables by presence only — never by value.`,
      sensitive: 'item names, versions and checksums; never an item’s content',
      kb: 6,
      /** The field the estate's configuration column and its drift finding rest on. */
      inventory: CONFIG_INVENTORY,
    },
    {
      category: 'logs',
      file: 'logs/recent.ndjson',
      what: 'Recent structured log records (G-85), re-redacted at the bundle boundary',
      detail: 'Up to 2,000 records. Every line is parsed and passed through the denylist a second time on the way in, and a line that does not parse as a structured record is dropped and counted rather than copied.',
      sensitive: 'principal identities appear in attribution lines',
      kb: 3100,
    },
    {
      category: 'errors',
      file: 'errors.json',
      what: 'Recent errors — name and message only, never a stack',
      detail: 'Rebuilt field by field from an allowlist, so a stack smuggled in under another key cannot cross.',
      sensitive: 'error names and messages',
      kb: 84,
    },
    {
      category: 'schema',
      file: 'schema.json',
      what: 'Schema state — every applied migration, by name and applied-at',
      detail: '118 migrations, latest 2026081407_notification_awareness. A database that cannot be reached is recorded as a name and a message rather than failing the bundle — the bundle for an instance that is down is the one somebody needs.',
      sensitive: 'none',
      kb: 14,
    },
  ];

  /** The inventory of the archive itself, which is why an omission is a promise. */
  const manifest = {
    file: 'MANIFEST.md',
    what: 'Every category, its file, its detail and its SHA-256 — including the categories that could not be included, and why',
    kb: 2,
  };

  /** The generator's own `NOT_INCLUDED`, and the reason each ships in every manifest. */
  const excluded = [
    {
      what: 'Result values and monitoring data',
      why: 'The customer’s data, not diagnostic data. No sample, result, location or laboratory row is read by the bundle generator, and log lines are re-redacted at the boundary in case a debug line elsewhere wrote one.',
    },
    {
      what: 'Credentials and secrets',
      why: 'No password, client secret, session secret, token or API key — by field-name denylist on every log line, and by never reading an environment variable’s value at all.',
    },
    {
      what: 'Environment variable values',
      why: 'Names and whether each is set, never what it is set to. The database URL carries a password; the rule has no exceptions so nobody has to decide which others do.',
    },
    {
      what: 'Session data',
      why: 'Who is signed in is the customer’s directory’s business and the instance’s, not Strataflow’s.',
    },
    {
      what: 'The audit trail',
      why: 'Audit rows carry before/after state — which is result values by another route.',
    },
    {
      what: 'Stack traces',
      why: 'A parser’s stack holds fragments of the file it was parsing. Errors travel as name and message only.',
    },
  ];

  const totalKb = categories.reduce((n, c) => n + c.kb, 0) + manifest.kb;

  return {
    categories,
    manifest,
    excluded,
    kb,
    size: kb(totalKb),
    counts: {
      categories: categories.length,
      files: categories.length + 1,
      excluded: excluded.length,
      inventory: CONFIG_INVENTORY.counts.items,
      totalKb,
    },
    /**
     * One thing that is absent without being on the exclusion list, and it is
     * the one the estate board turns on.
     */
    noBackup:
      'A backup manifest. The archive has five categories and none of them is a backup, which is why a deployment’s backup date on the estate board is read off the vendor’s own upgrade record and never off a bundle.',
    settled: {
      on: '2026-09-02',
      wave: 'wave 13',
      was: 'Two screens described one record with two lists — four content rows on the diagnostics screen and eight on the entitlement preview — neither naming the configuration inventory, and no checksum on either.',
      now: `One derived list, read by both: the ${categories.length} categories the bundle generator writes, with the configuration category carrying ${CONFIG_INVENTORY.counts.items} items, each with its own version field and its SHA-256.`,
      alsoFixed:
        'Found while doing it: the diagnostics screen listed “Any principal identifier” as not in the bundle, one panel away from the entitlement preview counting ~1,400 of them in log attribution lines. The logs do carry them — attribution is what a log is for — and what the bundle excludes is session data, which is a different fact.',
      where: 'estate',
      whereLabel: 'the estate board that reads this field',
    },
  };
})();

/**
 * # The configuration package (OM-5)
 *
 * OM-5's words are *criteria libraries, report templates, and EDD format
 * definitions versioned independently of the application and deployed to every
 * customer*. Three kinds, and the product's own configuration module carries
 * exactly those three as a closed union — `edd-format`, `criteria-library`,
 * `report-template` — with each artifact carrying its **own version** read out
 * of the file (`revision` for a format, `artifact_version` for the other two)
 * and its **own SHA-256**. An artifact that declares no version is refused
 * rather than defaulted, on the stated ground that an unversioned artifact
 * cannot be reconciled across an estate afterwards.
 *
 * ## Vocabulary — three decisions, recorded
 *
 * 1. **"Package" is minted here, and the reason is a collision.** The code's
 *    own word is *bundle* (`configBundle`, `ConfigBundle` in the app repo's
 *    `apps/web/lib/ops/config-bundle.ts`, G-56c). This catalogue has spent
 *    *bundle* since 23 August on the **diagnostic bundle** — `BUNDLE`, the
 *    `#diagnostics` screen, OM-1 — and two different things wearing one word
 *    in front of one operator is exactly what QB-9 forbids. The glossary has
 *    no entry for either, so neither word is protected; *package* is the one
 *    that is free. The screen says on its face that the code calls it a
 *    bundle, so the borrowing is visible rather than silent.
 * 2. **"Item", not "artifact".** The code says `ConfigArtifact`. This
 *    catalogue's *artifact* is already the glossary's **stage artifact** — the
 *    parsed form of an import, on `#imports` and `#quarantine` — so the same
 *    collision applies one word over. A package holds **items**; the panel
 *    that cites the code names its word once.
 * 3. **"Estate" is the right word on the screen below and the wrong one on
 *    `#exchange`.** Wave 10 rejected *format estate* for the format inventory
 *    and recorded why: `PORTFOLIO.says` uses *estate* for a set of things one
 *    operator holds, and OM-2's own words are *"version visibility across the
 *    deployment estate"*. The sense the word is spent on is **deployments**,
 *    which is precisely what the estate screen draws — so here it is not a
 *    borrowing at all, it is the PRD's own noun used in the PRD's own sense.
 *
 * ## Where the numbers come from
 *
 * `reaches` and `hardnessReach` are counted off `CROSSTAB` — the arriving
 * criteria item is the ANZG set, and what it reaches is every committed result
 * on this round that carries an ANZG outcome. Nothing here is typed, and the
 * one number this screen deliberately does **not** produce is how many
 * outcomes would move: that is the criteria library's own test, it is a
 * control somebody has to press, and it has not been pressed because nothing
 * from this package is in force.
 *
 * ## Anchors — every product-mechanics claim on this screen, and where it is
 *
 * All of it is in `apps/web/lib/ops/config-bundle.ts` (G-56c, OM-5) unless
 * another file is named:
 *
 *   - **The three kinds, closed.** `type ConfigKind = 'edd-format' |
 *     'criteria-library' | 'report-template'` — OM-5's three, and no fourth.
 *     The analyte dictionary is not among them, which is why this screen
 *     sends it to the release path instead.
 *   - **Its own version field per kind.** `versionOf()` reads `revision` for
 *     a format and `artifact_version` for the other two, and the comment says
 *     the names are "left alone rather than normalised, because those names
 *     are read by people who know one kind and not the other".
 *   - **An unversioned item is refused.** Same function throws: "An
 *     unversioned configuration artifact cannot be reconciled across an
 *     estate, and defaulting it would let one deploy unnoticed."
 *   - **The empty kind is reported, not omitted.** `defaultConfigSources()`
 *     declares the report-template directory anyway, "rather than left out: an
 *     inventory that silently omits a kind teaches an operator that the kind
 *     is not configurable, which is the opposite of what OM-5 promises".
 *   - **The package checksum covers configuration only.** The module header
 *     states it as a deliberate omission: fold the application version in "and
 *     within two releases they would stop looking". `configBundle()` hashes
 *     `kind:name:version:checksum` lines and nothing else.
 *   - **Config-only versus release.** `planDeployment()` returns
 *     `'nothing-to-do' | 'config-only' | 'application'`, because "a tool that
 *     cannot tell the two kinds apart forces every change through the slower
 *     path, and the promise becomes a sentence in a document".
 *   - **Drift is a different event from a planned change.** `driftAgainst()`:
 *     "a planned change is one somebody made here, and drift is one somebody
 *     made *there*… a customer editing a format definition in place to get an
 *     import through, and they will not mention it". A **removed** artifact is
 *     deliberately not drift.
 *   - **Configuration, never code.** FR-3.1, and G-16's promise that a new
 *     laboratory format ships without an application release — the sentence
 *     the module header opens with.
 *   - **A checksum and not a signature.** `.github/workflows/release.yml`
 *     pins its two images by digest, and its own Provenance step records that
 *     attestation is "skipped on a private user-owned repository, because
 *     GitHub does not offer it there" — so nothing the release publishes
 *     carries signed provenance, configuration included. The first draft of
 *     this bullet claimed the images carry it; the workflow's own comment
 *     refutes that (W12-A-2).
 *   - **The diagnostic bundle carries the same inventory.**
 *     `apps/web/lib/ops/diagnostics.ts` builds `configurationReport()` from
 *     `configBundle()` — "G-56c's inventory: each artifact's own version and
 *     SHA-256, never its content" — which is what makes the estate's drift
 *     column possible at all.
 */
export const CONFIG_PACKAGE = (() => {
  const anzg = CRITERIA_LIBRARY.find((c) => c.set === CRITERIA[0].name && c.state === 'active');
  const esdat = FORMATS.find((f) => f.name === 'ESdat ELDF-4');
  const okafor = MEMBERS.find((m) => m.name === CRITERIA_DRAFT.draft.by);
  const approver = MEMBERS.find((m) => m.role === 'Approver' && m.project === PROJECT.code);

  /**
   * The three kinds, closed, and the third is empty until this package lands.
   *
   * An inventory that leaves a kind out teaches an operator that the kind is
   * not configurable — which is the opposite of what OM-5 promises — so the
   * report-template kind is reported and reported as empty. That is the
   * product's own rule about its own inventory, and it is why the arriving
   * template is drawn as `new` rather than as a first entry nobody expected.
   *
   * **Held here reads `CONFIG_INVENTORY` — settled 2 September 2026, wave 13.**
   * The EDD-format row said `FORMATS.length`, which was **4**, and two of those
   * four register rows declare no revision at all: an artifact with no version
   * is refused by the configuration reader rather than defaulted, so they are
   * formats the migration was read with rather than configuration this
   * deployment holds. It reads **2** now, off the same inventory the bundle
   * carries and the estate measures drift against, and the panel names the two
   * that are absent.
   */
  const KINDS = [
    { kind: 'criteria-library', label: 'Criteria library', field: 'artifact_version', held: CONFIG_INVENTORY.kinds['criteria-library'] },
    { kind: 'edd-format', label: 'EDD format definition', field: 'revision', held: CONFIG_INVENTORY.kinds['edd-format'] },
    { kind: 'report-template', label: 'Report template', field: 'artifact_version', held: CONFIG_INVENTORY.kinds['report-template'] },
  ];

  /* What the arriving criteria item reaches on the record already committed. */
  const anzgCells = (rows) =>
    rows.flatMap((r) => r.cells).filter((c) => !c.empty && c.o[0] !== 'not_evaluated').length;
  const reaches = anzgCells(CROSSTAB);
  const reachedAnalytes = CROSSTAB.filter(
    (r) => r.cells.some((c) => !c.empty && c.o[0] !== 'not_evaluated'),
  ).map((r) => r.analyte);
  const hardnessAnalytes = HARDNESS.derived.map((d) => d.analyte);
  const hardnessReach = anzgCells(CROSSTAB.filter((r) => hardnessAnalytes.includes(r.analyte)));

  /**
   * What is here now, by the artifact's own filename — settled 2 September
   * 2026, wave 13.
   *
   * `checksumHere` was a literal on each item and it is a lookup into
   * `CONFIG_INVENTORY` now, so the checksum this screen compares against, the
   * one the diagnostic bundle carries, and the one the estate's drift finding
   * measures against are one string rather than three that happen to match.
   * Both values are unchanged: `a41f6c0928d7` and `7e2d915cb083`.
   */
  const here = (file) => CONFIG_INVENTORY.items.find((i) => i.file === file) ?? null;

  const items = [
    {
      kind: 'criteria-library',
      file: 'anzg-2018.json',
      what: anzg.set,
      here: anzg.version,
      arriving: '2018.2',
      verdict: 'changed',
      /*
       * The consequential one, and the definition of consequential is stated
       * rather than assumed: **it reaches results already committed.** The
       * other two reach nothing that has been recorded — a format definition
       * decides how the *next* file is read, and a template decides how the
       * *next* document is assembled.
       */
      consequential: true,
      checksumHere: here('anzg-2018.json').checksum,
      checksumArriving: 'c58b30ea7194',
      moved:
        'The hardness relationship. 2018.1 carries it as three per-analyte constants; 2018.2 declares it as the named rule the evaluation already applies, so the version that produced a criterion is recorded on the criterion rather than inferred from the set it came in.',
      notMoved:
        'No guideline value in the artifact moves. The diff lists every analyte this site is assessed on under both versions and marks them identical — which is a reason to run the test, not a reason to skip it.',
      reads: `${HARDNESS.ruleVersion.split(' · ')[0]} → hardness-modified-tv v4`,
    },
    {
      kind: 'edd-format',
      file: 'esdat.json',
      what: esdat.name,
      here: esdat.version,
      arriving: esdat.version,
      verdict: 'identical',
      consequential: false,
      checksumHere: here('esdat.json').checksum,
      checksumArriving: '7e2d915cb083',
      moved: 'Nothing. The bytes hash the same, so the package carries the definition this instance already runs.',
      notMoved:
        'Drawn rather than dropped from the list. A package that showed only what changed would leave a reader unable to tell “this item is the same” from “this item is not in the package”, and those are different facts about the deployment.',
      reads: `${esdat.files} · ${esdat.fields} fields`,
    },
    {
      kind: 'report-template',
      file: 'dwer-groundwater-quarterly.json',
      what: 'DWER quarterly groundwater report — prescribed structure',
      here: null,
      arriving: '2026.1',
      verdict: 'new',
      consequential: false,
      /* Nothing here to hash: the kind is empty until this package lands. */
      checksumHere: here('dwer-groundwater-quarterly.json'),
      checksumArriving: '2b6408f7ce15',
      moved:
        'The kind was empty here and now holds one. It is the regulator’s prescribed structure — sections, order and the tables each one must carry — which is the same for every customer lodging under it, and that is why it is a thing the vendor ships rather than a thing each customer builds.',
      notMoved:
        'It is not the corporate template. Nothing in this package touches the operator’s own document, and the panel below says so where a reader would fear otherwise.',
      reads: 'Prescribed structure only — no branding, no page setup, no numbering scheme',
    },
  ];

  const count = (v) => items.filter((i) => i.verdict === v).length;

  /**
   * Provenance, and the honest half of it is which of two plausible origins
   * this one has.
   *
   * A package built **by the vendor** and a package exported **from a sibling
   * deployment** are both real shapes, and they carry different provenance.
   * This one is the vendor's, and the reason is recorded rather than assumed:
   * OM-5's own words are *deployed to every customer*, which is the vendor's
   * act; DT-3 gives the vendor the deploy access to perform it; and a
   * sibling-instance package would have to be exported by that instance's own
   * principal and carried by its own operator, so this instance would hold no
   * record of either. The screen names the field a sibling package would fill
   * and leaves it empty here, which is the honest way to draw one of two.
   */
  const provenance = {
    builtBy: 'Strataflow',
    builtByKind: 'the vendor',
    builtFrom: 'the release line’s own configuration directories',
    notFrom: 'any deployment',
    builtAt: '2026-08-19',
    receivedAt: '2026-08-21',
    receivedBy: okafor.name,
    receivedByBinding: `${okafor.role} · ${okafor.project}`,
    checksum: '9f30c7a51bd6',
    signature: null,
    /*
     * A checksum, not a signature — said out loud because the absence looks
     * like an oversight. The release workflow attaches signed build
     * provenance to the two **images** it publishes and to nothing else;
     * configuration is not an image, and drawing a signature here would be
     * drawing a mechanism the product does not have.
     */
    signatureNote:
      'A checksum, not a signature. The release pins its two images by digest and attests nothing — its own workflow records that provenance attestation is skipped on this repository, because GitHub does not offer it here — so a signature is not something any artifact of this instance carries, and what a package can prove on arrival is that its bytes are the bytes it was built from, not who built them.',
    siblingWould:
      'A package exported from another deployment would name that deployment and the principal who exported it. Both fields are empty here, because this one was built from the release line rather than from any instance.',
    carriedHow:
      'A file. There is no channel from Strataflow into this deployment to push one down, and nothing here holds an address to fetch one from — the same position the export record and the alert destinations already state.',
  };

  /** Arrival, and the four steps that happen before anything is in force. */
  const arrival = [
    { name: 'Built', on: '2026-08-19', detail: 'By the vendor, from the release line’s configuration directories. Every item carries its own version, read out of the file rather than assigned to it.', state: 'done' },
    { name: 'Received', on: '2026-08-21', detail: `Imported by ${okafor.name}. A file arriving, not a deployment happening — nothing has been applied by reading it.`, state: 'done' },
    { name: 'Checksums recomputed', on: '2026-08-21', detail: 'Each item’s SHA-256 recomputed from its bytes on arrival, and the package checksum recomputed from the item lines. Both matched what the package declares.', state: 'done' },
    { name: 'Read against what is in force', on: '2026-08-21', detail: 'The diff below. Reading a package is not applying it, exactly as reading a deliverable is not committing it.', state: 'done' },
    { name: 'Inert', on: OPS_AS_AT, detail: 'Nothing from this package is in force. Two days sitting here, and every register on this instance still answers exactly as it did before it arrived.', state: 'run' },
    { name: 'Activated', on: 'not yet', detail: 'Item by item, or the set. Each activation is one attributed write; the criteria item is behind a named approval because activating a criteria set re-evaluates the record.', state: 'wait' },
  ];

  /**
   * What activating the changed item would write.
   *
   * Deliberately **not** a restatement of the criteria library's own
   * activation preview. That one is about a locally authored version and it
   * prints the outcomes that move, because its test has been run. This one is
   * about a package, its last row is the number this screen cannot produce,
   * and the reason it cannot is the point: an activation whose consequences
   * have not been measured is not ready to be approved.
   */
  const activationWrites = [
    { what: 'Items activated', n: '1 of 3 — the criteria item alone' },
    { what: 'Criteria set versions written', n: `1 — ${anzg.version} is superseded, not deleted` },
    { what: 'Committed results re-evaluated', n: String(reaches) },
    { what: 'Of those, criteria produced by the hardness relationship', n: String(hardnessReach) },
    { what: 'Past rounds re-evaluated', n: '0 — a version change evaluates forward' },
    { what: 'Locked periods re-opened', n: '0 — a locked period refuses the write' },
    { what: 'Issued reports changed', n: '0 — a snapshot regenerates under the version it was issued with' },
    { what: 'Outcomes that change', n: 'not known — the test has not been run' },
  ];

  /**
   * What a package must not overwrite, drawn because the fear is reasonable.
   *
   * Both rows are things this catalogue already holds, and both would be a
   * real defect if a package reached them.
   */
  const mustNotTouch = [
    {
      what: `The operator’s own corporate template — ${TEMPLATE.file}, version ${TEMPLATE.current} in force`,
      why: 'It is the customer’s document, and a Strataflow-branded regulatory submission is a hard anti-pattern (FR-7.4). The arriving template is the regulator’s prescribed structure; the branding, the page setup and the numbering stay where the document controller put them.',
      where: 'report',
      whereLabel: 'the report composer’s template panel',
    },
    {
      what: `The locally authored criteria version — ${CRITERIA_DRAFT.set} ${CRITERIA_DRAFT.draft.version}, drafted by ${CRITERIA_DRAFT.draft.by}`,
      why: 'It is this instance’s own configuration of the set, written for a reason that belongs to this site: the assessment method statement the operator gave the regulator. A package carries the vendor’s baseline and has no business overwriting a decision the customer made on top of it — so the draft is left where it is and the arrival is drawn beside it.',
      where: 'criteria',
      whereLabel: 'the criteria library’s version workspace',
    },
  ];

  /**
   * What a package is not, and the analyte dictionary is the sharp case.
   *
   * `#upgrade` already draws the dictionary moving 2026.2 → 2026.3 as a change
   * that arrives **with a release**. That is not an inconsistency to tidy
   * away: the dictionary is not one of OM-5's three kinds and it is not one of
   * the configuration module's three, so it rides with the application and a
   * package cannot carry it. Saying which things move on which path is the
   * whole of what OM-5 buys.
   */
  const notInAPackage = [
    {
      what: `The analyte dictionary — ${UPGRADE.changes[0].what}`,
      why: 'Shipped reference data, loaded by the database’s own seed. It is not one of the three kinds, so it arrives with the release and is accepted as a diff there.',
      where: 'upgrade',
      whereLabel: 'the upgrade’s change list',
    },
    {
      what: 'Anything that is code',
      why: 'Not because code is hard to move, but because moving it is a release and a package is the thing that is not one. A definition that needed a parser written for it would take the whole classification with it, and an operator who cannot tell a configuration change from a release routes every change through the slower path.',
      where: 'upgrade',
      whereLabel: 'the path a release takes instead',
    },
    {
      what: 'Any record this instance holds',
      why: 'A package is configuration in one direction. It carries no result, no location, no certificate and no principal, and the export below carries none either — the customer’s data stays in the customer’s tenancy.',
      where: 'exchange',
      whereLabel: 'the exchange register',
    },
  ];

  /**
   * Building one here, which is the other half of portability. The EDD count
   * reads the configuration inventory rather than the format registry,
   * because an export can only carry a versioned item — versionOf() refuses
   * the two formats that declare no revision, so the registry's 4 and the
   * exportable 2 are different facts. The first draft counted FORMATS.length
   * here, which put two sources for one count on one screen — the settlement
   * this wave exists to remove — and said 9 items where the inventory
   * supports 7 (W13-A-1).
   */
  const exportable = KINDS.map((k) => ({
    ...k,
    exports:
      k.kind === 'edd-format'
        ? CONFIG_INVENTORY.items.filter((i) => i.kind === 'edd-format').length
        : k.kind === 'criteria-library' ? CRITERIA_LIBRARY.length : 0,
  }));

  return {
    id: 'MOCK-CFG-2026.3',
    asAt: OPS_AS_AT,
    kinds: KINDS,
    items,
    provenance,
    arrival,
    activationWrites,
    mustNotTouch,
    notInAPackage,
    exportable,
    approver: approver.name,
    importer: okafor.name,
    /** The package this instance is running, and the one that first landed the set in force. */
    inForce: { id: 'MOCK-CFG-2026.2', taken: '2026-05-06' },
    /**
     * The receiving end of the portability loop, rendered on `#criteria`.
     *
     * `CRITERIA_DRAFT.active` already carried the two fields this needs — *by*
     * reading "Loaded with the shipped reference content" and *at* reading
     * 2024-02-19, which is the day this instance was stood up and the day its
     * first two role bindings were granted. Naming the package that content
     * arrived in fills a field that exists rather than adding a structure, and
     * that is why the criteria library is the screen this wave extends rather
     * than the report composer, whose template versions carry no arrival
     * provenance at all and would have needed a new one invented for them.
     */
    inForceFrom: {
      package: 'MOCK-CFG-2024.1',
      arrived: CRITERIA_DRAFT.active.at,
      by: CRITERIA_DRAFT.active.by,
      carriedSince: 'MOCK-CFG-2026.2',
    },
    impact: {
      round: ROUND.code,
      roundLabel: ROUND.label,
      reaches,
      analytes: reachedAnalytes,
      locations: CROSSTAB_SHAPE.sampledColumns.length,
      hardnessReach,
      hardnessAnalytes,
      set: anzg.set,
      changesUnknown:
        'How many of those outcomes move is the criteria library’s own test, run against the committed record and reported row by row. It has not been run against this item, and the activation below is gated on it.',
      reportedThen:
        'Activating it would not change what any past round was evaluated against. The version that produced an outcome is recorded on the outcome, a locked period refuses the write, and an issued report regenerates under the version it was issued with. What was reported then and what the record says now are different questions, and a package that answered only the second would have thrown the first away.',
    },
    counts: {
      items: items.length,
      kinds: KINDS.length,
      new: count('new'),
      changed: count('changed'),
      identical: count('identical'),
      consequential: items.filter((i) => i.consequential).length,
      mustNotTouch: mustNotTouch.length,
      notInAPackage: notInAPackage.length,
      exportable: exportable.reduce((n, k) => n + k.exports, 0),
    },
  };
})();

/**
 * # The deployment estate (OM-2) — the vendor's surface, and it says so
 *
 * ## The frame shift, and why it is drawn three ways at once
 *
 * Every other screen in this catalogue is MOCK-WDL's, seen by A. Nakamura, and
 * the viewer's chrome says exactly that at the top of the page: the project
 * code, the role binding, the principal. **This one is not.** It belongs to
 * whoever operates Strataflow, it lives in a different place, no principal in
 * the customer's directory reaches it, and R4 is a risk on the *vendor's*
 * side of the contract rather than the customer's.
 *
 * A screen like that under a chrome that says `MOCK-WDL · Contributor ·
 * A. Nakamura` is not a small imprecision. It is the screenshot that gets
 * shown to a customer and read as *Strataflow can see across my deployment
 * from inside my instance*, which is the exact claim DR-1 and DT-1 exist to
 * refuse. So the shift is drawn rather than captioned, and three ways because
 * each one fails differently:
 *
 * 1. **A frame.** The whole body sits inside a bordered, hatched container
 *    with a standing label. A screenshot cropped to any part of this screen
 *    still carries the frame, which a banner at the top would not.
 * 2. **A counter-chrome.** The vendor's own top bar is drawn *inside* the
 *    frame, carrying the vendor operator and no project switcher at all. The
 *    reader sees the substitution instead of being told about it, and the two
 *    bars are visible in the same screenshot.
 * 3. **A statement.** One notice, first thing inside the frame, naming whose
 *    surface it is, whose principal, and that the bar above belongs to a
 *    different session in a different deployment.
 *
 * The catalogue's own chrome is deliberately **not** altered per screen. It is
 * rendered once for the whole document and it is honest about what it is —
 * the product's chrome, drawn once — and making it lie differently on one
 * screen would trade a stated frame shift for a hidden one.
 *
 * ## Filing, which is part of the same decision
 *
 * The by-section rail mirrors the product's URL spaces, and this screen is in
 * none of them. Filing it under **Instance** would have put a surface that is
 * not this deployment inside the group whose lede is *"the deployment itself"*
 * — the precise claim the screen exists to refute — so it gets a group of its
 * own whose lede says it is not a URL space here. One screen in a group is a
 * fair thing to question; the answer is that the group is not a topic, it is a
 * frame, and the partition is the one place the catalogue can say so
 * structurally rather than in prose somebody has to read.
 *
 * ## The persona is U6, and no persona is minted
 *
 * The catalogue's own record says §12's operating model (OM-1…OM-5) has no
 * persona in the PRD and that the gap is the **instance operator**, U6. DT-3
 * settles who that is at estate scale: Strataflow holds deploy access and
 * customers do not self-install releases, so the person performing an upgrade
 * on N deployments is the vendor's operator. U6 already covers this screen.
 *
 * ## DR-2 is the hard constraint, and it decides the whole content model
 *
 * There is no telemetry. The instance reports itself — `/healthz` carries the
 * version stamp and the schema state, and the release smoke test fails an
 * image whose reported version is not the version being published — but it
 * reports itself **to whoever asks it from inside the customer's network**,
 * and nothing harvests it. So every value on this screen comes from one of
 * exactly three vendor-side records:
 *
 *   1. **The releases Strataflow cut.** Its own register. Every image is
 *      published under its version and its digest with no floating tag, and
 *      the workflow refuses to publish from a commit whose checks did not all
 *      succeed.
 *   2. **The upgrades Strataflow performed.** DT-3 makes this complete rather
 *      than partial: customers do not self-install, so the version the vendor
 *      last installed *is* the version running. The pre-flight refuses to
 *      proceed without a content-verified backup no older than 24 hours, so
 *      an upgrade the vendor performed is also the moment it last saw a
 *      backup it could roll back to.
 *   3. **The diagnostic bundles customers chose to send.** Customer-initiated
 *      by construction (OM-1, DR-2). A bundle carries the application version,
 *      the applied migrations, and each configuration artifact's version and
 *      SHA-256 — which is the only thing that can tell the vendor that what it
 *      installed is still what is there. It carries no result, no location and
 *      no certificate, and names those exclusions in its own manifest.
 *
 * The sentence the whole screen turns on falls out of the split: **the vendor
 * knows what it installed; only a bundle can tell it that what it installed is
 * still what is there.** So the ageing column is the date of the last bundle
 * and nothing else, and a deployment that has never sent one reads as never
 * confirmed rather than as fine.
 *
 * ## Every date is a source record's own, and every derived number is arithmetic
 *
 * Release dates, install dates and bundle dates are literals because they are
 * *when something happened* — the same class as the contract's two dates on
 * the engagement record. Everything else — releases behind, days on a version,
 * days since the last confirmation, the counts in the headline — is computed
 * from those and `OPS_AS_AT`.
 *
 * ## Anchors — every product-mechanics claim on this screen, and where it is
 *
 * Nothing below is drawn from memory. Each of these was read in the app repo:
 *
 *   - **The version stamp, and that nothing harvests it.** G-56a's status is
 *     titled *"The estate reports itself, nothing harvests it"* (OM-2, R4,
 *     DR-2). `apps/web/lib/ops/version.ts` reads the release stamp baked in by
 *     the workflow and falls back to the checkout's `0.0.0` — "a checkout is
 *     not a release" — and its module note says `/healthz` carries it, "the
 *     customer reads it, and nothing transmits it anywhere (DR-2)".
 *   - **The release refuses an image that misreports its version.**
 *     `.github/workflows/release.yml`, the smoke-test step: it compares
 *     `.version.application` from `/healthz` against the version being
 *     published and exits 1 on a mismatch, with the comment "the stamp is what
 *     answers *which version is that customer on* without telemetry".
 *   - **No floating tag; pinned by digest.** Same workflow's header — "There is
 *     no `latest` tag, and that is the same decision. A floating tag is a
 *     deployment that changes when nobody deployed" — and the summary step
 *     prints the digests with "Prefer these. A tag is mutable at the registry;
 *     a digest is not."
 *   - **It refuses to publish from a commit whose checks did not all
 *     succeed.** Same workflow, in the step named `refuse to publish from a
 *     commit CI has not passed`: every check run on the commit must have
 *     concluded `success` — not, in its own words, "the ones I remembered to
 *     name". Its own job is excluded by name, because a workflow run appears
 *     in its own commit's check runs and the first real tag push waited for
 *     itself.
 *   - **The pre-flight blocks without a fresh backup.** G-56a's status names
 *     three refusals in `scripts/upgrade-preflight.mjs` —  `target-stated`
 *     (a tagless or `latest` reference refused), `backup-fresh` (no manifest,
 *     or one older than 24 h, blocks, "because the pre-upgrade backup *is* the
 *     rollback path") and `schema-compatible`.
 *   - **What a bundle carries.** `apps/web/lib/ops/diagnostics.ts` (G-55,
 *     OM-1, DR-2): "Customer-initiated, never harvested" — and, exactly,
 *     "nothing in this module can transmit anything". Its five categories,
 *     from `DiagnosticsCategoryName`, are version, configuration,
 *     logs, schema, errors; the configuration one is described in the manifest
 *     as *"Configuration shape — env var names as set/unset, config artifacts
 *     as versions and SHA-256s"*, and `NOT_INCLUDED` names what is out and
 *     why. There is no backup manifest among them.
 *   - **Customers do not self-install.** PRD §11, DT-3.
 *   - **Version drift is the primary failure mode.** PRD §12.1 and §15's R4.
 */
export const ESTATE = (() => {
  const asAt = OPS_AS_AT;

  /**
   * The releases the vendor cut. Its own register, and the only list here
   * that is complete by construction.
   *
   * v0.7.2 and v0.8.0 are read from `INSTANCE` and `UPGRADE` rather than
   * retyped, so this register and the deployment's own version panel cannot
   * come apart. The digests are fictional on the same convention as every
   * other identifier in this seed; what is not fictional is the shape — a
   * release is pinned by digest because a tag is mutable at the registry, and
   * there is no floating tag to pin instead.
   */
  const releases = [
    { version: 'v0.6.0', released: '2026-06-12', digest: 'sha256:4b1e77c0a9d2', commit: '2c7de40' },
    { version: 'v0.6.1', released: '2026-07-03', digest: 'sha256:8c05f31ab6e4', commit: 'b1904ff' },
    { version: 'v0.7.0', released: '2026-07-24', digest: 'sha256:1d9a4e77b035', commit: '7ea3c18' },
    { version: 'v0.7.1', released: '2026-08-04', digest: 'sha256:6f2c80d41ae9', commit: 'd420b6a' },
    { version: INSTANCE.version, released: INSTANCE.released, digest: 'sha256:5a0cb9e73f16', commit: INSTANCE.commit },
    { version: UPGRADE.available, released: UPGRADE.released, digest: 'sha256:0a73be5f21c8', commit: 'ff58e02' },
  ];
  const current = releases[releases.length - 1];
  const indexOfVersion = (v) => releases.findIndex((r) => r.version === v);
  const behind = (v) => releases.length - 1 - indexOfVersion(v);

  /**
   * How long the vendor's knowledge of a deployment's configuration is
   * allowed to be before this screen calls it stale.
   *
   * **This screen's own convention, not a product rule**, and it is stated on
   * the face for that reason. Thirty days is one monthly cycle: a deployment
   * confirmed inside one is one somebody has looked at, and a deployment
   * confirmed outside two is one the vendor is reasoning about from a record
   * of its own acts alone.
   */
  const FRESH_DAYS = 30;
  const STALE_DAYS = 60;

  const rows = [
    {
      id: 'MOCK-DEP-WDL',
      customer: ENTITLEMENT.customer,
      thisOne: true,
      version: INSTANCE.version,
      installedOn: '2026-08-16',
      lastBundle: '2026-07-29',
      configPackage: 'MOCK-CFG-2026.2',
      configDrift: null,
      window: 'Second Saturday, 22:00 – 02:00 AWST',
      scheduled: null,
      support: ENTITLEMENT.support,
      term: ENTITLEMENT.term,
      /*
       * The sharpest honesty beat on the screen, and it is checkable against
       * `INSTANCE` two screens over: the deployment's own record holds a
       * restore drill and a nightly backup that this register does not, and
       * cannot, because a drill an instance runs on its own reaches no vendor
       * record and the bundle carries no backup manifest. Both dates are read
       * from `INSTANCE.backup` rather than retyped.
       */
      note: `The deployment this catalogue draws, and the one row where the gap is visible: its own screens hold a restore drill on ${INSTANCE.backup.drill} and a backup at ${INSTANCE.backup.last} that this register does not have. Neither reached the vendor, and neither would.`,
    },
    {
      id: 'MOCK-DEP-TAL',
      customer: 'Tallering Metals Pty Ltd',
      thisOne: false,
      version: UPGRADE.available,
      installedOn: '2026-08-22',
      lastBundle: null,
      configPackage: CONFIG_PACKAGE.id,
      configDrift: null,
      window: 'Any weekday evening, 24 h notice',
      scheduled: null,
      support: 'Business hours AWST · 1 business day response · escalation to the operator',
      term: '2026-04-01 → 2027-03-31',
      note: 'The newest deployment, upgraded yesterday and carrying the package that is still sitting inert at Wandalup. It has never sent a bundle, so nothing here has ever been confirmed by anything but the vendor’s own act.',
    },
    {
      id: 'MOCK-DEP-BOO',
      customer: 'Boorabbin Lithium Pty Ltd',
      thisOne: false,
      version: 'v0.7.0',
      installedOn: '2026-07-26',
      lastBundle: '2026-07-06',
      configPackage: 'MOCK-CFG-2026.2',
      configDrift: null,
      window: 'Quarterly change freeze — March, June, September, December',
      scheduled: '2026-09-12',
      support: 'Business hours AWST · 1 business day response · escalation to the operator',
      term: '2025-09-01 → 2026-08-31',
      note: 'A change freeze is a legitimate reason to be behind, and it is the reason this one is: the next window is agreed and dated, which is the difference between a deployment that is behind and one that is drifting.',
    },
    {
      id: 'MOCK-DEP-NUL',
      customer: 'Nullagine Gold Pty Ltd',
      thisOne: false,
      version: 'v0.6.0',
      installedOn: '2026-06-15',
      lastBundle: '2026-06-18',
      configPackage: 'MOCK-CFG-2025.2',
      configDrift: null,
      window: 'By arrangement — no standing window agreed',
      scheduled: null,
      support: 'Business hours AWST · 2 business day response',
      term: '2026-02-01 → 2027-01-31',
      note: 'No standing window was agreed at deployment, so every upgrade needs a conversation to start it and none has started. That is the shape R4 describes — not a failure of a mechanism, an absence of one.',
    },
    {
      id: 'MOCK-DEP-YAN',
      customer: 'Yandanooka Energy Pty Ltd',
      thisOne: false,
      version: INSTANCE.version,
      installedOn: '2026-08-18',
      lastBundle: '2026-08-20',
      configPackage: 'MOCK-CFG-2026.2',
      /*
       * The realistic case, and the product's own module names it: a customer
       * edits a format definition in place to get an import through, and does
       * not mention it. The next deployment would overwrite the fix and the
       * import would start failing again with nothing connecting the two —
       * which is why the module reports drift as a different event from a
       * planned change rather than folding the two together.
       *
       * **`deployedChecksum` reads the inventory — settled 2 September 2026,
       * wave 13.** It was the literal `'7e2d915cb083'`, which was the same
       * string `CONFIG_PACKAGE` carried and neither bundle screen described.
       * It is a lookup now, so the value the vendor deployed and the value the
       * bundle reports are the same field read twice rather than two literals
       * that agreed. The rendered value does not move.
       */
      configDrift: {
        item: `edd-format · ${CONFIG_INVENTORY.items.find((i) => i.file === 'esdat.json').file}`,
        deployedChecksum: CONFIG_INVENTORY.items.find((i) => i.file === 'esdat.json').checksum,
        foundChecksum: 'af17d6b40c92',
        found: '2026-08-20',
        means:
          'The bundle’s configuration report holds a SHA-256 for this item that is not the one the vendor deployed. Somebody edited the definition in place — the usual reason is an import that would not read — and the next deployment would overwrite it.',
      },
      window: 'First Sunday, 06:00 – 10:00 AWST',
      scheduled: '2026-09-06',
      support: 'Business hours AWST · 1 business day response · escalation to the operator',
      term: '2026-03-01 → 2027-02-28',
      note: 'The only row whose configuration has been independently confirmed this week, and the confirmation refuted the assumption. A deployment nobody checks is not a deployment without drift.',
    },
  ].map((d) => {
    const confirmedDays = d.lastBundle === null ? null : daysBetween(d.lastBundle, asAt);
    return {
      ...d,
      behind: behind(d.version),
      releasedOn: releases[indexOfVersion(d.version)].released,
      digest: releases[indexOfVersion(d.version)].digest,
      daysOnVersion: daysBetween(d.installedOn, asAt),
      confirmedDays,
      /*
       * Four states, and `refuted` is the one a green/amber/red scale would
       * have lost: a confirmation three days old that found a difference is
       * not "fresh", and it is not "stale" either.
       */
      confirmation:
        d.configDrift !== null
          ? 'refuted'
          : confirmedDays === null
            ? 'never confirmed'
            : confirmedDays <= FRESH_DAYS
              ? 'confirmed'
              : confirmedDays <= STALE_DAYS
                ? 'ageing'
                : 'stale',
      /*
       * The backup the vendor last saw, which is the upgrade it last
       * performed and nothing else. The pre-flight refuses to proceed on a
       * manifest older than 24 hours, so an install date is a date a
       * content-verified backup existed — and a drill the instance ran on its
       * own afterwards is on its own screen and not in any bundle.
       */
      backupSeenOn: d.installedOn,
      backupSeenDays: daysBetween(d.installedOn, asAt),
    };
  });

  const tally = (state) => rows.filter((r) => r.confirmation === state).length;
  const furthest = rows.reduce((a, b) => (b.behind > a.behind ? b : a));
  const oldest = rows
    .filter((r) => r.confirmedDays !== null)
    .reduce((a, b) => (b.confirmedDays > a.confirmedDays ? b : a));

  /** The three sources, and what each one cannot say. */
  const sources = [
    {
      source: 'The releases Strataflow cut',
      holds: `${String(releases.length)} releases, each pinned by digest, from ${releases[0].released} to ${current.released}`,
      current: 'Always. It is the vendor’s own register',
      cannot: 'Nothing about any deployment. A release is a thing that was published, not a thing that was installed',
    },
    {
      source: 'The upgrades Strataflow performed',
      holds: 'Which version is on which deployment, when it was installed, and that a content-verified backup existed at that moment',
      current: 'As of each install date, and complete — customers do not self-install (DT-3)',
      cannot: 'Anything the customer changed afterwards. Configuration edited in place is invisible to it',
    },
    {
      source: 'The diagnostic bundles customers chose to send',
      holds: 'Application version, applied migrations, and each configuration item’s version and SHA-256',
      current: 'As of the bundle’s own date, and never after it',
      cannot: 'Anything the customer did not send. There is no request that produces one (OM-1, DR-2)',
    },
  ];

  /** What no source gives, said where a reader would look for a live figure. */
  const noSource = [
    /*
     * Plain prose, not markup. These strings are escaped on the way into the
     * cell, so a backtick round /healthz rendered as a literal backtick —
     * caught by eye in the first screenshot pass and fixed at the source
     * rather than by teaching one cell to emit HTML.
     */
    'Whether the instance is up right now. The health endpoint answers whoever asks it from inside the customer’s network, and nothing outside asks',
    'How much data a deployment holds, how many results, how many bores, or how many people signed in',
    'Whether an upgrade a customer scheduled has run, until the vendor runs it',
    'Whether a backup drill the instance ran on its own succeeded — the bundle carries version, configuration, schema, logs and errors, and no backup manifest',
  ];

  /**
   * ## SETTLED (wave 13) — 2 September 2026
   *
   * This is where wave 12's `bundleGap` record stood, and it is settled rather
   * than deleted. What it said: *"the mechanism this screen rests on is not on
   * either of the two screens that describe the bundle"* — every configuration
   * claim here comes from the bundle's configuration report, which carries each
   * configuration item's own version **and its SHA-256**, and the catalogue
   * described that record twice without naming the field. `#diagnostics`
   * enumerated **4** content rows and named *configuration* only in its intro
   * sentence; `#entitlement` previewed **8** and called the nearest one
   * *"reference-content versions"*; **no checksum appeared on either.** It was
   * drawn on this screen as a warn card, which came off with the record.
   *
   * What replaced it is the repair that record named: **one derived contents
   * list that both bundle screens read.** `BUNDLE_CONTENTS` holds the five
   * categories the bundle generator writes, and its configuration category
   * carries `CONFIG_INVENTORY` — the three items with their own version fields
   * and their SHA-256s. So this screen's `configPackage` column and the drift
   * finding below now rest on a record the catalogue draws rather than one it
   * asserts, and `configDrift.deployedChecksum` is a lookup into that same
   * inventory rather than a fourth copy of one string.
   *
   * Nothing on this screen moved as a value. What moved is that a reader
   * following the configuration column arrives somewhere.
   */
  const bundleField = {
    field: 'each configuration item’s version and SHA-256',
    where: 'diagnostics',
    whereLabel: 'the bundle on the customer’s side',
    alsoWhere: 'entitlement',
    alsoWhereLabel: 'the bundle’s contents preview',
    items: CONFIG_INVENTORY.counts.items,
    settledOn: '2026-09-02',
  };

  return {
    bundleField,
    asAt,
    releases,
    current,
    rows,
    sources,
    noSource,
    freshDays: FRESH_DAYS,
    staleDays: STALE_DAYS,
    principal: {
      name: 'M. Ferreira',
      role: 'Strataflow operator',
      subject: 'mferreira@strataflow.example',
      party: 'Strataflow',
    },
    counts: {
      deployments: rows.length,
      behind: rows.filter((r) => r.behind > 0).length,
      current: rows.filter((r) => r.behind === 0).length,
      furthestBehind: furthest.behind,
      furthestId: furthest.id,
      furthestDays: furthest.daysOnVersion,
      drift: rows.filter((r) => r.configDrift !== null).length,
      /*
       * Five tallies rather than a confirmed/unconfirmed split, because
       * `refuted` sits in neither half: that deployment *was* confirmed, three
       * days ago, and the confirmation is the reason it is the row that needs
       * a conversation. A two-way split would have counted it as unconfirmed
       * and lost the only configuration fact on this screen that was
       * independently established rather than assumed.
       */
      confirmed: tally('confirmed'),
      refuted: tally('refuted'),
      ageing: tally('ageing'),
      stale: tally('stale'),
      neverConfirmed: tally('never confirmed'),
      oldestConfirmation: oldest.confirmedDays,
      oldestId: oldest.id,
      sources: sources.length,
      /*
       * Settled 2 September 2026, wave 13: it counted the two excluded rows of
       * `BUNDLE.contents`, a list that no longer exists. It counts the bundle
       * generator's own `NOT_INCLUDED` map now — the six omissions that ship in
       * every manifest — which is the same list `#diagnostics` and
       * `#entitlement` draw. **2 → 6**, and the sentence beside it moved with
       * the number.
       */
      bundleExcludes: BUNDLE_CONTENTS.counts.excluded,
      bundleCategories: BUNDLE_CONTENTS.counts.categories,
      scheduled: rows.filter((r) => r.scheduled !== null).length,
    },
  };
})();

/* ==================================================================== *
 * Wave 18 — the vendor requirements brief as the seventh enumeration.
 * 3 September 2026.
 * ==================================================================== */

/**
 * `VENDOR_REQUIREMENTS.md`, row by row.
 *
 * ## Why it is a closed list and not a summary
 *
 * The brief is an independent acquisition advisor's, it was committed to this
 * repository on decision D12, and its §19 asks for *"a traceability matrix
 * mapping every requirement section to screens, states and end-to-end
 * scenarios"*. `#coverage` already reconciles six closed enumerations and
 * already refuses to claim a screen for a behaviour-shaped requirement, so the
 * brief becomes the seventh rather than a second matrix beside it.
 *
 * **The rows are taken from the brief's own structure, not from a reading of
 * it**: every numbered subsection from §4.2 through §14.4, §15's six lineage
 * questions, §16's five scenarios, §17's ten screen states and §20's ten
 * completion criteria. `build.mjs` reads `VENDOR_REQUIREMENTS.md` on every run
 * and fails if a heading has no row, a row has no heading, a row's quoted
 * words are not in the file, or a bullet count moves. A closed list that is
 * only asserted to be closed is the artefact this project has twice recorded
 * rotting.
 *
 * ## The three verdicts, and why they are the register's words
 *
 * The wave plan named them `covered` / `partially` / `not`. The other six
 * enumerations on this screen have used `covered` / `partially` / `missing`
 * since 1 September, `STATUS_TONE` is keyed on those words, and QB-9 is
 * explicit that a second vocabulary for one concept is the defect. So the
 * third word is `missing`, and this note is why.
 *
 * A verdict is judged at **the brief's own §2 standard**, which is stricter
 * than a screen existing: *a requirement is not satisfied merely by adding a
 * navigation item, dashboard card, table, modal or standalone screen.*
 *
 *   - `covered`    — the workflow, the information the decision needs, the
 *                    actions, the states, the exceptions and the links to
 *                    upstream evidence and downstream use are all drawn.
 *   - `partially`  — some of what the section asks is drawn and some is not,
 *                    and the note says which half is which.
 *   - `missing`    — nothing in this catalogue answers it at that standard.
 *
 * ## The cross-check that makes it honest
 *
 * A verdict resting on a screen the register calls a **proposal** is not the
 * same claim as one resting on a route the product serves, and until this wave
 * no enumeration here said which it was. Every screen a row cites is resolved
 * against the register in `screens.mjs` as the page is assembled — the
 * resolution lives there because that is where the register lives, and a
 * second copy of it here would be the defect this wave's other half is about.
 *
 * ## Where the brief and the product's own requirements disagree
 *
 * Four disagreements were recorded in the response memo and all four are
 * answered decisions. They are **section-wide** rather than row-shaped — D1 is
 * about the whole of §4, D4 about the whole of §5, D5 about the whole of §14 —
 * so the decision is carried on every row it governs rather than on one row
 * per decision. Four decisions, and the number of rows citing one is counted
 * rather than stated.
 */
/* ==================================================================== *
 * Wave 20 — the explorer over the dataset (D1, D11)
 *
 * §4.2's dimensions, §4.3's progressive construction and population readout,
 * and §4.4's six representations over one population — **all of it over the
 * governed dataset wave 19 built, not beside it**. Every population count in
 * this record is taken through `SAVED_VIEWS.accounting`, which is the same
 * expression `#crosstab` and the dataset register already count with, so no
 * two surfaces can report different exclusions for the same cells.
 *
 * ## The constraint that shapes the whole record, stated once
 *
 * **This catalogue is static HTML.** `build.mjs`'s only script does screen
 * navigation, a rail filter and slide-overs. Nothing filters live. So §4.3's
 * *"show how the resulting population changes as filters are applied"* is
 * delivered as **a sequence of drawn states**, each carrying its own readout —
 * which is what §17 asks a mockup for. A drawn sequence that implied working
 * filters would be the one claim this catalogue has never made, so the screen
 * says what it is in its first sentence and again beside the sequence.
 *
 * ## The scenario the brief asks for cannot be run, and that is the finding
 *
 * §4.3 requires *groundwater → Unit C → dissolved metals → arsenic and
 * manganese → 2021–2026 → validated results only → rejected data excluded →
 * comparison against nominated groundwater criteria*. Two exits were
 * available and only one is honest: seed a manganese and a Unit C to make the
 * example runnable, which means inventing fourteen rounds of results at seven
 * bores with a reporting limit and a criterion — the trade this catalogue has
 * refused six times — or **walk what the record can express, name the site's
 * own equivalents as equivalents, and enumerate every term it cannot express
 * with the reason**. The second, counted rather than apologised for.
 *
 * ## On the words
 *
 * `docs/GLOSSARY.md` carries neither *explorer* nor *query* as a term, in the
 * same way it carries neither *saved view* nor *dataset* (wave 19). The words
 * are the requirement's — §3 ranks the capability as *Environmental Data
 * Explorer and Query Builder* — and the glossary entry is part of the PRD
 * amendment D1 accepted and that has not landed. *Population* is different: it
 * is not a headword either, but the glossary already uses it in the sense
 * meant here, in **Data quality limit** — *"One number a site replaced, with
 * the population it applies to"*. Stated on the screen, not assumed.
 * ==================================================================== */
export const EXPLORER = (() => {
  const V = SAVED_VIEWS;

  /** Every cell this project holds, on both grids, in one stream. */
  const WATER_CELLS = CROSSTAB.flatMap((r) =>
    r.cells.map((c, i) => ({ grid: 'water', analyte: r.analyte, column: CROSSTAB_COLUMNS[i], location: CROSSTAB_COLUMNS[i], cell: c })));
  const SOIL_CELLS = SOIL.grid.flatMap((r) =>
    r.cells.map((c, i) => ({ grid: 'soil', analyte: r.analyte, column: SOIL.gridColumns[i].head, sample: SOIL.gridColumns[i].id, cell: c })));
  const ALL_CELLS = [...WATER_CELLS, ...SOIL_CELLS];

  const locationOf = (code) => LOCATIONS.find((l) => l.code === code);

  /**
   * Locations, samples and results — the three numbers §4.3 asks a reader to
   * see, each counted off the cells in scope rather than beside them.
   *
   * The sample count is where the two grids stop being interchangeable and the
   * readout says so instead of adding them. A water column is a **location**
   * and the sample analysed there is the round's primary one — so a column
   * that returned nothing contributes a location and no sample, which is
   * exactly the MW11 case. A soil column **is** a sample: a composite belongs
   * to four places at once and a grid drawn by location has nowhere to put it
   * (`#composite`). Adding those two counts would be the conflation the matrix
   * filter was fixed to stop making.
   */
  const readout = (cells) => {
    const acc = V.accounting(cells);
    const waterColumns = [...new Set(cells.filter((x) => x.grid === 'water').map((x) => x.location))];
    const soilColumns = [...new Set(cells.filter((x) => x.grid === 'soil').map((x) => x.sample))];
    const primaries = EVENT_SAMPLES.filter((s) => s.qc === '—' && waterColumns.includes(s.location));
    return {
      ...acc,
      locations: waterColumns,
      soilSamples: soilColumns,
      samples: [...primaries.map((s) => s.id), ...soilColumns],
      grids: [...new Set(cells.map((x) => x.grid))],
      results: acc.included.length,
      total: cells.length,
      kind: (word) => acc.byKind.find((k) => k.word === word)?.list.length ?? 0,
    };
  };

  /* ---------------------------------------------------------------- *
   * §4.2 — the dimensions, enumerated and measured
   *
   * The names and the group headings are §4.2's own, verbatim, and
   * `build.mjs` fails the build if this list and the brief's bullets drift
   * apart in either direction — the same closure the seventh enumeration on
   * `#coverage` already has, applied a second time to the list this screen is
   * built on.
   *
   * `holds` is the measurement and it has three values, never a verdict:
   * **a record** — a field or a register holds it and is named; **derived** —
   * nothing holds it as a field and it resolves from something that does, with
   * the derivation named; **nothing** — no record in this catalogue holds it,
   * and the row says what stands nearest.
   *
   * **What the explorer offers follows from that rather than being assigned.**
   * A control is drawn for a dimension the record holds or can derive, and for
   * none that it cannot, because a control over nothing is a promise. So the
   * offered count is computed, and the two it does not offer are the two the
   * record cannot express.
   * ---------------------------------------------------------------- */
  const nUnit = (u) => LOCATIONS.filter((l) => l.unit === u).length;
  const UNITS_NAMED = [...new Set(LOCATIONS.map((l) => l.unit))].filter((u) => u !== '—');
  const SCREENED = LOCATIONS.filter((l) => l.screen && l.screen !== '—');
  const QC_KINDS = [...new Set(EVENT_SAMPLES.map((s) => s.qc))].filter((k) => k !== '—');
  const CENSORED = WATER_CELLS.filter((x) => x.cell.censored);
  const SUPERSEDED = WATER_CELLS.filter((x) => x.cell.superseded);
  const QUARANTINED = WATER_CELLS.filter((x) => x.cell.quarantined);
  const FILTERED_ROWS = CROSSTAB.filter((r) => /\(filtered\)/.test(r.analyte)).map((r) => r.analyte);

  const dimensions = [
    { group: 'Project and organisational context', name: 'Organisation or client', holds: 'a record',
      through: `the project’s operator — ${PROJECT.operator}`,
      note: 'One organisation, and the deployment is single-tenant, so this is a constant rather than a dimension: a control over one value selects nothing away.' },
    { group: 'Project and organisational context', name: 'Project', holds: 'a record',
      through: `the project register — ${PROJECTS.length} projects, ${PROJECTS.filter((p) => p.drawn).length} of them drawn`,
      note: 'The one dimension that already has a working control in the product: the switcher. The second project is deliberately undrawn, which is why a cross-project population is not offered here.' },
    { group: 'Project and organisational context', name: 'Site', holds: 'a record',
      through: `the facility record — ${FACILITY.name}, ${FACILITY.areas.length} areas`,
      note: 'One facility on this project, so it narrows nothing here and would narrow a portfolio population.' },
    { group: 'Project and organisational context', name: 'Monitoring programme', holds: 'derived',
      through: `a code carried on each area (${[...new Set(FACILITY.areas.flatMap((a) => a.programme.split(', ')))].join(', ')}) and named in an obligation’s basis`,
      note: 'There is no programme record with its own fields. The code identifies a programme; nothing holds one, so a population selected by programme resolves through the areas that name it.' },
    { group: 'Project and organisational context', name: 'Sampling event or monitoring round', holds: 'a record',
      through: `the event register — ${EVENTS.length} events`,
      note: 'The grid draws one round and carried no round control at all, which is the gap §4.4’s time-series representation falls into below.' },

    { group: 'Location and environmental setting', name: 'Monitoring location', holds: 'a record',
      through: `the location register — ${LOCATIONS.length} locations`, wasOnGrid: 'Locations',
      note: 'The one dimension every surface here already selects on.' },
    { group: 'Location and environmental setting', name: 'Location type', holds: 'a record',
      through: `the location’s class — ${[...new Set(LOCATIONS.map((l) => l.klass))].length} classes`,
      note: 'Nothing offered it before this wave, and the grid’s matrix control offered *Groundwater* as a matrix until wave 9 corrected it — which is the confusion this row and the matrix row exist to keep apart.' },
    { group: 'Location and environmental setting', name: 'Bore', holds: 'derived',
      through: `a location of class groundwater — ${LOCATIONS.filter((l) => l.klass === 'groundwater').length} of them; ${CONSTRUCTION.codes.length} carries a construction record`,
      note: 'A bore is not a separate register here. Selecting by bore resolves through the class, and everything a construction record holds — casing, annulus, slot — exists for one of the seven.' },
    { group: 'Location and environmental setting', name: 'Bore group', holds: 'a record',
      through: `the location groups — ${INSTRUMENTS.groups.length} of them`,
      note: `Already in use as a dimension rather than a label: ${V.fromGroup} of the ${V.views.length} datasets resolve their location dimension through a group, so a bore joining one joins the dataset that reports it.` },
    { group: 'Location and environmental setting', name: 'Area or spatial grouping', holds: 'a record',
      through: `the location’s area — ${[...new Set(LOCATIONS.map((l) => l.area))].length} areas`, wasOnGrid: 'Locations — two of its four options are areas',
      note: 'The grid’s location options are counted off the areas, so this dimension had a control without a name of its own.' },
    { group: 'Location and environmental setting', name: 'Hydrostratigraphic unit', holds: 'a record',
      through: `the location’s unit — ${UNITS_NAMED.join(' and ')}, ${UNITS_NAMED.map((u) => `${nUnit(u)} ${u.toLowerCase()}`).join(' and ')}`,
      note: 'Held, load-bearing, and selectable nowhere until this wave. It decides which criteria set applies to a location and it is why the confined bore is excluded from the potentiometric fit — two decisions the record already makes on a dimension nothing offered.' },
    { group: 'Location and environmental setting', name: 'Screened interval', holds: 'a record',
      through: `the location’s screened interval — ${SCREENED.length} of ${LOCATIONS.length} locations carry one`,
      note: 'The pits and the creek carry none, correctly: a test pit and a surface-water point have no screen.' },
    { group: 'Location and environmental setting', name: 'Sample or investigation depth range', holds: 'a record',
      through: `the sample’s own depth — one figure on a water sample, a logged interval on a soil one (${SOIL.samples.filter((s) => s.from !== null).length} intervals)`,
      note: 'A range on one matrix and a point on the other, which is why a depth control cannot mean one thing across both grids.' },

    { group: 'Sample', name: 'Sample date and time', holds: 'a record',
      through: `the sample’s collection timestamp, with its zone — ${EVENT_SAMPLES[0].collected}`,
      note: 'Time of day is carried, not only the date, which is what a holding-time clock measured from collection needs.' },
    { group: 'Sample', name: 'Sample type', holds: 'a record',
      through: `the sample’s QA kind — ${QC_KINDS.length} kinds on the round’s manifest, and ${LAB_QC.length} more in the laboratory’s own`,
      note: 'The primary case is written as an em dash and the word *primary* appears on no row, so the commonest value of this dimension is the absence of the others.' },
    { group: 'Sample', name: 'Matrix', holds: 'a record',
      through: `the sample’s matrix — ${MATRIX_WORDS.length} words in the vocabulary, ${[...new Set([...EVENT_SAMPLES, ...SOIL.samples].map((s) => s.matrix).filter(Boolean))].length} of them with samples here`,
      wasOnGrid: 'Matrix', note: 'Counted off the manifests since wave 9, so the control cannot offer a matrix this project has no samples of.' },
    { group: 'Sample', name: 'Depth', holds: 'a record',
      through: 'the same field as the range above, read as a value',
      note: 'One field, two dimensions in the brief’s list. Both are named rather than one being quietly counted twice.' },
    { group: 'Sample', name: 'Field or laboratory sample', holds: 'derived',
      through: `two registers rather than a field — the round’s manifest (${EVENT_SAMPLES.length} samples) and the laboratory’s own QC (${LAB_QC.length})`,
      note: 'Which register a row is in *is* the answer, and it is the right shape: a matrix spike is not material somebody carried out of a bore. But it is not a field, so it cannot be combined with another dimension in one selection.' },
    { group: 'Sample', name: 'Primary, duplicate, blank or other QA sample type', holds: 'a record',
      through: `the QA kind on both registers — ${QC_KINDS.join(', ')}`,
      note: 'Blind field duplicates carry their parent; the blanks carry what they are a blank of. The parent link is what makes an RPD computable and a blank interpretable.' },

    { group: 'Analytical', name: 'Analyte', holds: 'a record',
      through: `the analyte dictionary — ${ANALYTES.length} analytes on this project’s water grid`,
      note: 'The dimension the brief’s scenario turns on, and the reason it cannot be run: it names two analytes and this dictionary holds one of them.' },
    { group: 'Analytical', name: 'Analyte group or suite', holds: 'a record',
      through: `the suite register — ${ANALYTE_SUITES.length} suites`, wasOnGrid: 'Analyte suite',
      note: 'A suite is a **size** here and never a membership, which wave 19 measured: a dataset naming one has an analyte dimension nothing can expand, and this explorer inherits that limit rather than guessing which eight of eleven.' },
    { group: 'Analytical', name: 'Method', holds: 'a record',
      through: `the batch’s method and the soil analyte’s own — ${[...new Set([...BATCHES.map((b) => b.method), ...SOIL.analytes.map((a) => a.method)])].length} distinct`,
      note: 'Held on the batch rather than on the result, so selecting by method reaches results one hop away.' },
    { group: 'Analytical', name: 'Laboratory', holds: 'derived',
      through: 'a string on a batch, a certificate, an event and a format',
      note: 'There is no laboratory record anywhere — the same absence §7.1 measures. A population selected by laboratory matches text, which is why two spellings would be two laboratories.' },
    { group: 'Analytical', name: 'Laboratory batch', holds: 'a record',
      through: `the batch register — ${BATCHES.length} batches on this round`,
      note: 'The dimension a QA/QC finding is scoped by: the zinc matrix-spike failure reaches every zinc result in one batch and none outside it.' },
    { group: 'Analytical', name: 'Unit', holds: 'a record',
      through: `the unit register — ${UNITS.length} units and ${CONVERSIONS.length} conversions`,
      note: 'Canonical units with their aliases, so a selection by unit is a selection and not a spelling.' },
    { group: 'Analytical', name: 'Fraction, including dissolved or total', holds: 'derived',
      through: 'a parenthetical inside the analyte’s name',
      note: 'Not a field. The glossary makes **Fraction** first-class and says the domain word is *dissolved*, because filtration is what was done and dissolved is what the number means — and every analyte name on this grid says *(filtered)*. So the dimension resolves by matching a string, in a word the glossary has already ruled against. **This is not a rename this repository may make** (W20-A-5): the approved reference rendering says *Arsenic (filtered)* too, so the disagreement is between an oracle and the glossary and it is settled in the product, not here. Renaming the grid alone would put the catalogue out of step with the plate it is drawn to.' },
    { group: 'Analytical', name: 'Detection or reporting limit', holds: 'a record',
      through: 'the analyte’s limit of reporting, on both grids',
      note: 'And it moves: the cadmium limit stepped from 5.0 to 1.0 µg/L between two rounds, which is why a series that mixed them would read as an improvement.' },

    { group: 'Data quality', name: 'Validation status', holds: 'derived',
      through: `the round’s own validation state — ${ROUND.code} is ${ROUND.validationState}`,
      note: 'One state for the whole round. No result carries its own, so *validated results only* is answerable for a round and not for a result — and the walk below is where that stops being an abstraction.' },
    { group: 'Data quality', name: 'Qualifier', holds: 'a record',
      through: `the qualifier register — ${QUALIFIERS.counts.assertions} assertions over ${QUALIFIERS.counts.codes} codes`,
      note: `D10 settles what a population does with them: ${QUALIFIERS.counts.proposed} are proposed and unapplied and they are **inside**, because excluding them would be the product taking a decision the practitioner has not.` },
    { group: 'Data quality', name: 'QA/QC disposition', holds: 'a record',
      through: `the decision layer — ${QC_DECISIONS.checks} checks, ${QC_DECISIONS.dispositioned} dispositioned`,
      note: 'Dispositions are attributed and reversible, and three still need a person. A population selected on this dimension changes when somebody decides, which is the behaviour rather than a defect.' },
    { group: 'Data quality', name: 'Included or rejected result', holds: 'nothing',
      through: 'no record holds *rejected*',
      note: `The nearest is quarantine, and it is a different thing: ${QUARANTINE.length} rows are held at the import boundary and never committed, so they are not in a population to be excluded from. ${QUARANTINED.length} committed cell is drawn quarantined, in brackets on a hatched ground, and it is still there.` },
    { group: 'Data quality', name: 'Detection status', holds: 'a record',
      through: `the value’s own censoring — ${CENSORED.length} censored cells on the water grid`, wasOnGrid: 'Show — “Censored only”',
      note: 'A non-detect keeps the laboratory’s own <LOR notation and is never rendered as a substituted number, so this dimension selects on what was reported rather than on a treatment.' },
    { group: 'Data quality', name: 'Current or superseded result', holds: 'a record',
      through: `supersession — ${SUPERSEDED.length} superseded cell on the grid, with its original beside it`,
      note: 'The superseded value stays visible struck through, so a population that selected *current only* would still be able to say what it dropped and why.' },

    { group: 'Criteria', name: 'Applicable guideline or criterion', holds: 'a record',
      through: `the criteria library — ${CRITERIA_LIBRARY.length} rows, ${CRITERIA.length} sets in force on this grid`,
      wasOnGrid: 'Criteria sets', note: 'Applicability is by matrix, location class and unit, so nominating a set is not the same as applying it — which is what the last step of the walk measures.' },
    { group: 'Criteria', name: 'Criterion category', holds: 'derived',
      through: `what a set protects — filled on ${CRITERIA_LIBRARY.filter((c) => c.protects).length} of the ${CRITERIA_LIBRARY.length} library rows`,
      note: 'The guideline sets say what they protect; the licence and site-specific sets say nothing, because a licence limit is not written to protect a named receptor. So a category exists for half the library and the other half is not a gap to be filled.' },
    { group: 'Criteria', name: 'Exceedance or non-exceedance', holds: 'a record',
      through: 'the outcome mark on each cell, one per criteria set',
      wasOnGrid: 'Show — “Exceedances only”', note: 'Two marks per value, always in the same order, because a result above one set and below another is two answers rather than one.' },
    { group: 'Criteria', name: 'Magnitude above criterion', holds: 'a record',
      through: `the exceedance register’s factor — ${EXCEEDANCES.length} rows`,
      note: 'Computed against the criterion in force at the round, which is why a hardness-dependent factor understates a change when the criterion moved too.' },

    { group: 'Time', name: 'Arbitrary date range', holds: 'derived',
      through: 'the sample’s own collection timestamp, read as a range',
      wasOnGrid: 'Period', note: 'The control existed and the grid it sat on is one round, so it had nothing to narrow. That is the finding the period step of the walk records rather than a missing feature.' },
    { group: 'Time', name: 'Monitoring round', holds: 'a record',
      through: `the event register’s round codes — ${EVENTS.length} of them`,
      note: 'Nothing offered it before this wave. The grid’s *By round* switch is a **layout** — it changes which axis the cells are drawn on, not which cells are in the population.' },
    { group: 'Time', name: 'Season', holds: 'nothing',
      through: 'no sample, result or round carries a season',
      note: 'The word is in the record twice and neither is an attribute: a fauna programme’s frequency reads *twice yearly — one wet season, one dry*, and the seasonal Mann–Kendall blocks by quarter. Blocking by quarter is what a test does with time; it is not a field a population can select on.' },
    { group: 'Time', name: 'Month, quarter or year', holds: 'derived',
      through: `the round code and the monthly series — ${WATER_LEVELS.months.length} months, ${WATER_LEVELS.months[0]} to ${WATER_LEVELS.months.at(-1)}`,
      note: 'A quarter is legible in a round code and computable from a timestamp. Neither is a stored period, which is why a fiscal year would have to be asked for rather than looked up.' },
    { group: 'Time', name: 'Latest result', holds: 'derived',
      through: 'the last value of a series, computed',
      note: 'No record marks a result as the latest, which is right — *latest* is a property of a question and not of a number, and freezing it onto a row is how a stale figure becomes undetectable.' },
    { group: 'Time', name: 'Historical period', holds: 'derived',
      through: 'a period that has been reported and locked, and a migration of published results',
      note: 'The record holds a locked 2026 Q1 that refuses a write, and a historical import whose validation states were preserved. There is no period register, so *historical* is a state a period is in rather than a thing to select.' },
  ];

  const held = (v) => dimensions.filter((d) => d.holds === v);
  const offered = dimensions.filter((d) => d.holds !== 'nothing');
  const onGrid = dimensions.filter((d) => d.wasOnGrid);
  const GROUPS = [...new Set(dimensions.map((d) => d.group))];

  /* ---------------------------------------------------------------- *
   * §4.3 — the scenario, walked as far as the record allows
   * ---------------------------------------------------------------- */

  /**
   * The brief's eight terms, each measured against this record.
   *
   * `verdict` is one of three and it is a measurement, not an opinion:
   * **expressible** — a dimension the record holds selects it as written;
   * **an equivalent** — the record holds the dimension and not the value the
   * brief names, so the site's own value stands in and is named as a
   * substitute; **not expressible** — the record holds neither.
   */
  const manganese = ANALYTES.filter((a) => /mangan/i.test(a.name));
  const unitC = LOCATIONS.filter((l) => /(^|\s)C$|Unit C/i.test(l.unit ?? ''));
  const recordBegins = ARSENIC_MW05[0].month;
  const askedFrom = 2021;
  const askedTo = 2026;
  const yearsAsked = Array.from({ length: askedTo - askedFrom + 1 }, (_, i) => askedFrom + i);
  const yearsHeld = [...new Set(ARSENIC_MW05.map((p) => Number(p.month.slice(0, 4))))];
  const yearsEmpty = yearsAsked.filter((y) => !yearsHeld.includes(y));
  const VALIDATION_STATES = ['imported', 'screened', 'validated', 'approved', 'published'];
  const reached = VALIDATION_STATES.indexOf(ROUND.validationState);
  const wanted = VALIDATION_STATES.indexOf('validated');

  const scenario = {
    /** The brief's own sentence, quoted rather than paraphrased. */
    asks: 'Groundwater → Unit C → dissolved metals → arsenic and manganese → 2021–2026 → validated results only → rejected data excluded → comparison against nominated groundwater criteria',
    refused:
      'Seeding a manganese and a Unit C to make the example runnable. An analyte is fourteen rounds of results at seven bores, a limit of reporting and a criterion, and a hydrostratigraphic unit is a division this operation’s hydrogeologists agreed on — inventing either would put a record in this catalogue that nothing in it supports, which is the trade refused six times already.',
    terms: [
      { term: 'Groundwater', verdict: 'expressible',
        via: 'Two dimensions rather than one — matrix **Water** and location class **groundwater**',
        why: 'They are different questions and the grid’s matrix control offered *Groundwater* as a matrix until wave 9 corrected it. Both are held, so the walk applies both and reports what each one costs.' },
      { term: 'Unit C', verdict: 'an equivalent',
        via: `Hydrostratigraphic unit — this project’s units are ${UNITS_NAMED.join(' and ')}`,
        why: `The dimension is held on every location; the value is not. ${unitC.length} locations are in anything called Unit C, and the units a project divides its geology into are named per project rather than globally, so there is no general Unit C to fall back on. The walk selects **${UNITS_NAMED[0]}** and says it is a substitution.` },
      { term: 'dissolved metals', verdict: 'an equivalent',
        via: `The suite register holds ${ANALYTE_SUITES.find((s) => s.code === 'metals-dissolved').label} at ${ANALYTE_SUITES.find((s) => s.code === 'metals-dissolved').n}`,
        why: `A suite is a size here and never a membership, so the suite cannot expand to rows. What resolves instead is the grid’s own rows carrying the dissolved fraction — ${FILTERED_ROWS.length} of the ${CROSSTAB.length} — and the fraction is a parenthetical in a name rather than a field.` },
      /*
       * W20-A-3. This read `an equivalent`, and an equivalent is something
       * that stands in. Nothing stands in for manganese — half the term
       * resolves and the other half has no substitute, which is neither of the
       * other two verdicts either. A fourth word rather than the nearest of
       * three, because the taxonomy was one value short of what was measured.
       */
      { term: 'arsenic and manganese', verdict: 'half of it',
        via: 'Arsenic resolves; manganese has no substitute',
        why: `No analyte in this dictionary is a manganese — ${manganese.length} of ${ANALYTES.length}. It did not fail a filter and it is not a non-detect — it has never been measured here, and a population that reported the arsenic count alone would be answering half the question as though it were the whole one.` },
      { term: '2021–2026', verdict: 'an equivalent',
        via: `An arbitrary date range is held; this record begins ${recordBegins}`,
        why: `Of the ${yearsAsked.length} years asked for, ${yearsEmpty.length} hold no result at all (${yearsEmpty.join(' and ')}). And the grid the walk runs over is **one round**, so a period narrows nothing on it — the population that has a period is the series behind it, ${ARSENIC_MW05.length} quarterly values.` },
      { term: 'validated results only', verdict: 'expressible',
        via: `Validation state — ${ROUND.code} is **${ROUND.validationState}**`,
        why: `It is expressible and it empties the population. *${ROUND.validationState}* is ${wanted - reached} step before *validated* in the glossary’s own order, so nothing in this round qualifies. That is the answer, and a screen that drew an empty grid without it would be the failure.` },
      { term: 'rejected data excluded', verdict: 'not expressible',
        via: 'No record holds *rejected*',
        why: `Quarantine is the nearest and it is a different state: ${QUARANTINE.length} rows held at the import boundary that never committed. A held row was never in the population, so excluding it removes nothing — and the one committed cell drawn quarantined is still a result somebody has to decide about.` },
      { term: 'comparison against nominated groundwater criteria', verdict: 'expressible',
        via: `${CRITERIA.length} sets in force on this grid`,
        why: 'Nominating a set is a real selection and it is not free: the two sets assess different numbers of the same results, and the walk’s last step counts the difference.' },
    ],
  };

  /* ---------------------------------------------------------------- *
   * The drawn sequence
   * ---------------------------------------------------------------- */

  /**
   * Each step is a **drawn state**, not an interaction.
   *
   * `keep` is applied to the cells the previous step left, and everything the
   * row reports is counted off the two arrays that result — what stayed and
   * what left — through the same accounting the dataset register uses. A step
   * that removes nothing still reports, because *this filter cost you nothing*
   * is an answer a scientist needs as much as any other.
   */
  const walk = (list, from) => {
    let cells = from;
    return list.map((step) => {
      const before = cells;
      const kept = step.keep ? before.filter(step.keep) : before;
      const left = before.filter((x) => !kept.includes(x));
      cells = kept;
      return { ...step, cells: kept, state: readout(kept), left: readout(left), leftCount: left.length };
    });
  };

  const MAIN = [
    { n: 1, term: '—', applied: 'Nothing yet', dimension: 'The starting population',
      says: 'Every cell this project holds, on both grids. A population that starts anywhere narrower has already made a decision nobody recorded.' },
    { n: 2, term: 'Groundwater', applied: 'Matrix — Water', dimension: 'Matrix',
      keep: (x) => x.grid === 'water',
      says: 'The soil and sediment grid leaves whole, and it does not leave quietly: its composited cells are an absence of a result of its own, not a pass, and they stop being counted here because they are counted there.' },
    { n: 3, term: 'Groundwater', applied: 'Location class — groundwater', dimension: 'Location type',
      keep: (x) => locationOf(x.location)?.klass === 'groundwater',
      says: 'The second half of the brief’s first term, and it removes nothing: every column on this grid is already a groundwater bore. A step that costs nothing is worth drawing, because the alternative is a reader assuming it did something.' },
    { n: 4, term: 'Unit C', applied: `Hydrostratigraphic unit — ${UNITS_NAMED[0]}`, dimension: 'Hydrostratigraphic unit',
      keep: (x) => locationOf(x.location)?.unit === UNITS_NAMED[0],
      says: 'There is no Unit C here, and the substitution earns its place: the bore this step drops is screened in the confined unit and is half of a nest with one that stays. That is exactly what the dimension is for — two rows in a register at one place, in two flow systems.' },
    { n: 5, term: 'dissolved metals', applied: 'Analyte suite — the rows carrying the dissolved fraction', dimension: 'Analyte group or suite',
      keep: (x) => FILTERED_ROWS.includes(x.analyte),
      says: 'The suite cannot expand — the record holds its size and never its membership — so the population resolves through the grid’s own rows instead, and the readout says which of the two it did.' },
    { n: 6, term: 'arsenic and manganese', applied: 'Analyte — arsenic', dimension: 'Analyte',
      keep: (x) => x.analyte === CROSSTAB.find((r) => /^Arsenic/.test(r.analyte)).analyte,
      says: 'One of the two named analytes. The other is not in the dictionary, so it takes nothing out of the population and it takes half the question with it.' },
    { n: 7, term: '2021–2026', applied: `Period — ${askedFrom}-01 to ${askedTo}-12`, dimension: 'Arbitrary date range',
      says: 'Nothing leaves, and the reason matters: this grid is one round, so a period is not a dimension of it. The population that has a period is the series behind the bore, and it begins two years after the range does.' },
    { n: 8, term: 'validated results only', applied: 'Validation state — validated', dimension: 'Validation status',
      keep: () => false, empties: true,
      says: 'The population empties, and this is the honest end of the brief’s own scenario against this record. Nothing in the round has been validated; it is screened, one state short. An explorer that drew an empty grid here would have answered the question and told the scientist nothing.' },
  ];

  const BRANCH = [
    { n: 9, term: 'rejected data excluded', applied: 'Included or rejected — nothing holds *rejected*', dimension: 'Included or rejected result',
      keep: (x) => !x.cell.quarantined,
      says: 'Drawn against the quarantine mark, which is the nearest thing the record holds and is not the same thing. It removes nothing from this population, and it would remove one cell from the whole grid.' },
    { n: 10, term: 'comparison against nominated groundwater criteria', applied: `Criteria set — ${CRITERIA[0].short}`, dimension: 'Applicable guideline or criterion',
      keep: (x) => x.cell.empty || x.cell.o[0] !== 'not_evaluated',
      says: 'Nominating a set narrows to the results it actually assesses. Here it narrows nothing — every result in the population is assessed against this set — and across the whole grid the two sets assess different numbers of the same results, which the table beside this counts.' },
  ];

  const main = walk(MAIN, ALL_CELLS);
  const branchFrom = main[MAIN.findIndex((s) => s.empties) - 1];
  const branch = walk(BRANCH, branchFrom.cells);
  const steps = [...main, ...branch];
  const final = branch.at(-1);

  /**
   * The branch, said out loud rather than arranged around.
   *
   * Step 8 empties the population, so the two terms after it would be drawn
   * over nothing. They are drawn over the population as it stood at step 7,
   * which is a **deliberate reading** and is marked as one on every row — a
   * sequence that quietly skipped its own emptying step would be reporting a
   * walk that did not happen.
   */
  const branchNote = {
    from: branchFrom.n,
    at: MAIN.find((s) => s.empties).n,
    says: `Step ${MAIN.find((s) => s.empties).n} empties the population. The two terms after it are drawn over the population as it stood at step ${branchFrom.n}, so the brief’s last two terms can be measured at all — marked on each row rather than arranged around, because a sequence that skipped its own emptying step would be reporting a walk that did not happen.`,
  };

  /** What the whole grid says about the criteria nomination, once. */
  const nomination = CRITERIA.map((c, i) => ({
    set: c.short,
    assessed: WATER_CELLS.filter((x) => !x.cell.empty && x.cell.o[i] !== 'not_evaluated').length,
    of: WATER_CELLS.filter((x) => !x.cell.empty).length,
  }));

  /* ---------------------------------------------------------------- *
   * §4.4 — six representations, one population
   * ---------------------------------------------------------------- */

  /**
   * The six the brief lists, closed against §4.4's own bullets by the build.
   *
   * `over` is what each would draw over the population the walk ends on, and
   * `drawable` is measured rather than assumed: a time series over a
   * population that is one round has nothing to plot, and saying so is the
   * requirement being met rather than dodged.
   */
  const representations = () => {
    const f = final.state;
    const exceeding = f.included.filter((x) => x.cell.o[0] === 'exceedance');
    return [
      { name: 'Tabular results', screen: 'crosstab', drawable: true,
        over: `${f.results} rows`,
        says: 'The population as rows, one per result, with the value’s own marks. There is no flat result register in this catalogue — the grid is where a result is read — so this representation and the next land on one screen.' },
      { name: 'Crosstab', screen: 'crosstab', drawable: true,
        over: `1 analyte × ${f.locations.length} locations`,
        says: `A crosstab of one row, which is what a population narrowed to a single analyte is. ${f.kind('dry')} of the ${f.locations.length} columns is a bore that returned nothing and it stays drawn, because a column that disappears reads as a bore that does not exist.` },
      { name: 'Time series', screen: 'hydrograph', drawable: false,
        over: '—',
        says: `Not drawable over this population, and the reason is the walk’s own step 7: the population is one round, and a series needs the period dimension this grid does not carry. The series that exists for this analyte at this bore holds ${ARSENIC_MW05.length} quarterly values and is a different population from the one above.` },
      /* Wave 21. `screen` was `null` and the sentence said this was the one of
       * the six with no surface anywhere. `#statistics` gained a summary table
       * on 3 September 2026 — n, mean, standard deviation, minimum, maximum,
       * median, percentiles, detection frequency and exceedance frequency —
       * so the representation resolves to a screen and the before is kept
       * beside it rather than overwritten. */
      { name: 'Summary statistics', screen: 'statistics', drawable: true,
        over: `n = ${f.results}, ${f.included.filter((x) => x.cell.censored).length} censored`,
        was: 'no screen at all — the statistics screen held trend tests and no summary statistics',
        says: 'Computable over this population, and it gained a surface on 3 September 2026. It had none until then: the statistics screen held Mann–Kendall, Sen’s slope and the seasonal pair, while `#result-detail` carried a link promising summary statistics by Kaplan–Meier and pointed at a screen with none on it.' },
      { name: 'Map', screen: 'map', drawable: true,
        over: `${f.locations.length} locations`,
        says: `Every location in the population carries coordinates and an outcome, so the map is the population symbolised. The bore that returned nothing carries an open mark and the word, not an absence — a compliance-boundary bore that vanishes from a network map because it held no water that week is the reading a map can least afford.` },
      { name: 'Exceedance view', screen: 'exceedances', drawable: true,
        over: `${exceeding.length} of ${f.results} above ${CRITERIA[0].short}`,
        says: 'The population read against the nominated set. It is one view of the same cells rather than a different query, which is the whole of what §4.4 asks for.' },
    ];
  };

  /**
   * What each of those screens draws today, and it is **its own** population.
   *
   * This is the measurement §4.4 turns on and it is not the same claim as the
   * strip above. Naming a population is not sharing one: five surfaces state
   * theirs from today and no two of them inherit. The sixth has no screen to
   * name anything on.
   */
  const own = [
    { screen: 'crosstab', what: `the ${ROUND.code} water grid`,
      get line() {
        const r = readout(WATER_CELLS);
        return `${CROSSTAB_SHAPE.analytes} analytes × ${CROSSTAB_SHAPE.locations} locations · ${r.total} cells · ${r.results} results · ` +
          `${r.byKind.map((k) => `${k.list.length} ${k.word}`).join(' · ')} · ` +
          `${r.nothingAsserted.length} results carry no verdict from either set and ${r.partlyAsserted.length} carry one from one of the ${CRITERIA.length} and not the other`;
      },
      says: 'Its own, and inherited from nothing. Until this wave the grid chose it with a filter bar of its own.' },
    { screen: 'exceedances', what: 'the same grid, read against the sets in force',
      get line() {
        const r = readout(WATER_CELLS);
        return `${EXCEEDANCES.length} exceedances over ${r.results} results at ${r.locations.length} locations · ${CRITERIA.length} criteria sets · ` +
          `${INDETERMINATE.length} results could not be assessed and are not on this register`;
      },
      says: 'One row per result per criterion, so a result above two sets appears twice. The register’s population and the grid’s are the same cells read a different way.' },
    /*
     * Wave 21. This line read `${TREND.n} quarterly values … ${TREND.censored}
     * censored, entering as tied values and never substituted`, and the array
     * it describes carries **no censored value at all**. Making the population
     * inspectable was the first time anybody counted: five readings of
     * *arsenic at MW05* exist in this catalogue and they give two different
     * answers about the censoring. It was three until W21-A-1 withdrew the
     * typed table under Figure 4.2 on 3 September 2026 — the count is derived
     * through a `Set` and every rendered surface follows it, so this sentence
     * is the only place the number is written by hand. The line states the
     * disagreement rather than either number, and the before is on the screen
     * that moved it.
     */
    { screen: 'statistics', what: 'one analyte at one bore, across rounds',
      get line() {
        const counted = ARSENIC_MW05.filter((p) => p.censored).length;
        return `${ARSENIC_MW05.length} quarterly values of ${TREND.analyte} · ${ARSENIC_MW05[0].month} to ${ARSENIC_MW05.at(-1).month} · ` +
          `the exported series carries ${counted} censored and the trend record beside it says ${TREND.censored}`;
      },
      /* W21-A-14. `fourteen rounds` was typed in the same sentence as a clause
       * deriving the same quantity, so truncating the series left one half of
       * one sentence correcting itself and the other half asserting the old
       * number. Sixth instance of the shape; this one landed in wave 20. */
      get says() {
        return `A different population from the grid’s in every dimension: one analyte, one bore, ${ARSENIC_MW05.length} rounds. Nothing on the screen said so until wave 20, and nothing had counted it until wave 21.`;
      } },
    { screen: 'hydrograph', what: 'the water-level record this screen reads',
      get line() {
        const codes = Object.keys(WATER_LEVELS.series);
        return `${codes.length} series × ${WATER_LEVELS.months.length} months (${WATER_LEVELS.months[0]} to ${WATER_LEVELS.months.at(-1)}) · ` +
          `${WATER_LEVELS.noLevel.length} bore has no level to plot at all — ${WATER_LEVELS.noLevel.map((x) => x.code).join(', ')}, dry`;
      },
      says: 'Levels rather than concentrations, so it shares not one cell with the grid. The dry bore is a break in the record rather than a line drawn through it.' },
    { screen: 'map', what: 'the network this round’s grid draws',
      get line() {
        const codes = CROSSTAB_COLUMNS.map(locationOf);
        return `${codes.length} groundwater bores · ${CROSSTAB_SHAPE.sampledColumns.length} returned material and ${CROSSTAB_SHAPE.emptyColumns.length} was dry · ` +
          `${codes.filter((l) => l.unit === UNITS_NAMED[1]).length} screened in the ${UNITS_NAMED[1].toLowerCase()} unit and excluded from the potentiometric fit for that reason`;
      },
      says: 'The one screen whose population is decided by a dimension nothing offered a control for until this wave: the confined bore is out because contouring two aquifers as one surface produces a flow direction true of neither.' },
  ];
  const ownOf = (screen) => own.find((o) => o.screen === screen);

  /* ---------------------------------------------------------------- *
   * D11 — the crosstab becomes one representation
   * ---------------------------------------------------------------- */

  /**
   * What the grid keeps, what it loses, and where each control went.
   *
   * D11's words are that it *"keeps its cell grammar, its four absence states
   * and its keyboard contract, and loses its private filter bar"*. The
   * verdict also says the changed screen goes onto the second practitioner
   * walk rather than being treated as settled, and the screen says so — it is
   * one of only four a practitioner has ever read.
   */
  const demotion = {
    decision: 'D11',
    verdict: 'Demote #crosstab to one representation, and put the changed screen on the practitioner walk.',
    keeps: [
      { what: 'The cell grammar', why: 'Two marks per value in the same order, the laboratory’s own censoring notation, a superseded value struck through beside its replacement, a quarantined one in brackets on a hatched ground.' },
      { what: 'The four absence states', why: 'Dry, not analysed, composited and not evaluated stay four different things, each with its glyph, its word and the sentence a screen reader gets.' },
      { what: 'The keyboard contract', why: 'The whole grid worked without a mouse and a population it does not choose does not change one key of that.' },
      { what: 'The population readout', why: 'It was a count on the filter bar. It is now the readout at the head of the screen, and it counts the exclusions by kind rather than naming two of them.' },
    ],
    loses: [
      { control: 'Locations', to: 'explorer', dimension: 'Monitoring location · Area or spatial grouping' },
      { control: 'Analyte suite', to: 'explorer', dimension: 'Analyte group or suite' },
      { control: 'Period', to: 'explorer', dimension: 'Arbitrary date range' },
      { control: 'Matrix', to: 'explorer', dimension: 'Matrix' },
      { control: 'Criteria sets', to: 'explorer', dimension: 'Applicable guideline or criterion' },
      { control: 'Show', to: 'explorer', dimension: 'Detection status · Exceedance or non-exceedance' },
    ],
    walk:
      'It is one of the four screens a practitioner has actually read, and the redesign has not been seen. D13 schedules the second walk before wave 24; this change goes onto it rather than being counted as settled by the decision that authorised it.',
  };

  /* ---------------------------------------------------------------- *
   * The recorded boundary this does not overturn
   * ---------------------------------------------------------------- */
  const boundary = {
    /* Quoted as it stood before this wave, which is the point: the boundary is
     * honoured and only its destination moved, and a quotation that silently
     * updated itself would hide that the sentence had ever said anything else. */
    quoted: 'Search covers identifiers and names, not result values — a number is found through the crosstab’s filters, where the criteria set and period that make it meaningful are also chosen.',
    was: 'the crosstab’s filters',
    now: 'the explorer',
    at: 'search',
    says:
      'The explorer is the second of those two things and not the first. It reaches values through a definition that carries a criteria set and a period, so a number arrives with the two facts that make it mean anything. It does not become a free-text box, and the sentence above stands — what changes is only where the filters live.',
  };

  /* ---------------------------------------------------------------- *
   * Every value this wave moved, with what it was
   * ---------------------------------------------------------------- */
  const was = {
    /** The grid's own filter bar, before D11 was executed. */
    gridControls: 6,
    gridReadout: 'a count on the filter bar, naming two absences of the four',
    gridChose: 'its own population, with a bar of six controls',
    /** What §4.2's list had ever been measured against. */
    dimensionsMeasured: 'a sentence on one coverage row',
    /** What the scenario had been. */
    scenarioWalked: 'stated as unrunnable, with six of eight terms said to have no facet',
    /** What each representation said about its population. */
    namedPopulation: 'none of the five',
    namedEvidence:
      'Measured at wave 19’s audit: the word appears 0 times on the statistics and hydrograph screens, and its 2 appearances on the background screen are the statistical reference population, which is a different sense.',
  };

  const moved = () => [
    { what: 'The results grid’s filter bar', was: `${was.gridControls} controls, choosing the grid’s own population`, now: `0 — ${demotion.loses.length} controls moved to the explorer`, at: 'crosstab',
      why: 'D11. A screen that chooses its own population cannot be one representation of somebody else’s, and §4.4’s whole demand is moving between six without rebuilding the question.' },
    { what: 'The grid’s population readout', was: was.gridReadout, now: `a readout at the head of the screen counting ${V.absences.length} kinds`, at: 'crosstab',
      why: 'The bar’s count named the dry cells and the unrun suite and stopped. Composited and not-evaluated were absent from it, and those are the two a reader is most likely to mistake for a pass.' },
    { what: '§4.2’s dimensions, measured', was: was.dimensionsMeasured, now: `${dimensions.length} rows, ${held('a record').length} held as a record, ${held('derived').length} derived, ${held('nothing').length} not held at all`, at: 'explorer',
      why: 'A sentence saying *roughly a third* is not an enumeration. The list is closed against the brief by the build now, in both directions, so a dimension the brief adds cannot go unmeasured.' },
    { what: 'The brief’s worked scenario', was: was.scenarioWalked, now: `walked — ${scenario.terms.filter((t) => t.verdict === 'expressible').length} terms expressible, ${scenario.terms.filter((t) => t.verdict === 'an equivalent').length} by an equivalent, ${scenario.terms.filter((t) => t.verdict === 'not expressible').length} not expressible`, at: 'explorer',
      why: 'The earlier reading counted the terms that had no facet. This counts what the record can express, which is a different and harder question — and it finds one term that empties the population rather than narrowing it.' },
    { what: 'Representations naming their population', was: was.namedPopulation, now: `${own.length} of the ${representations().length}`, at: 'explorer',
      why: 'Wave 19 measured that none did. Each now states what it ran over — and states that it is its own, because naming a population and sharing one are different claims and only the first is true today.' },
    { what: 'Where the search boundary sends a reader looking for a number', was: boundary.was, now: boundary.now, at: 'search',
      why: 'The boundary itself is unchanged and is honoured rather than overturned — search covers identifiers and names and not result values. Only its destination moved, because D11 took the filter bar off the grid, and a sentence that went on pointing at controls that are no longer there would be the quietest kind of stale.' },
  ];

  return {
    dimensions, GROUPS, offered, onGrid, held,
    scenario, steps, main, branch, branchNote, final, nomination,
    own, ownOf, demotion, boundary, was,
    get representations() { return representations(); },
    get moved() { return moved(); },
    /** The starting population, for the screen's own opening statement. */
    get start() { return readout(ALL_CELLS); },
    readout,
    /** The counts the faces render, so none of them is typed. */
    get counts() {
      return {
        dimensions: dimensions.length,
        groups: GROUPS.length,
        record: held('a record').length,
        derived: held('derived').length,
        nothing: held('nothing').length,
        offered: offered.length,
        onGrid: onGrid.length,
        steps: steps.length,
        expressible: scenario.terms.filter((t) => t.verdict === 'expressible').length,
        equivalent: scenario.terms.filter((t) => t.verdict === 'an equivalent').length,
        notExpressible: scenario.terms.filter((t) => t.verdict === 'not expressible').length,
        terms: scenario.terms.length,
        drawable: representations().filter((r) => r.drawable).length,
        withoutScreen: representations().filter((r) => !r.screen).length,
        screens: [...new Set(representations().map((r) => r.screen).filter(Boolean))].length,
      };
    },
    /** The live/frozen question, answered by pointing rather than repeating. */
    version: {
      has: false,
      says:
        'The population this walk ends on is a **working population**: it started from everything and belongs to no dataset, so there is no version for a figure to cite. That is the state wave 19 drew the seam for — a dataset being refined is live, a dataset a figure cites is frozen at a version, and the transition is an act with a record rather than a save button.',
      act: V.seam.act,
    },
    drawnOn: '2026-09-03',
  };
})();

/**
 * # The analysis — wave 21
 *
 * §9.5 requires every analysis to be traceable through *query → included
 * observations/results → QA/QC state → analytical settings → output*, and the
 * assessment measured that **no analysis object exists**, so the chain has
 * nothing to start at. Wave 19 built the population and wave 20 built the
 * explorer over it; this is the thing that reads a population, applies a
 * method, and produces an output that can be cited.
 *
 * **Nothing new is invented next to this record.** Every analysis here is one
 * the catalogue already performs — the register just gives it an object. The
 * analyses are found rather than chosen: `REPORT_ITEMS` names a source on
 * every item, and the sources that name a *method* are exactly the outputs
 * that are missing an analysis to resolve to. That classification is the
 * measurement §9.5 turns on, and it is computed rather than asserted.
 *
 * **The hard part is the QA/QC state, and it is the third link in the chain.**
 * An analysis records what its members' quality state *was* when it ran, not
 * what it reads now. This instance holds a computation moment for **one** of
 * its analyses, so the frozen field is drawn and the honest half is said out
 * loud: what a later act does to an analysis is demonstrated where the record
 * settles it (a superseded member, both values on the record) and argued where
 * it does not (a disposition nobody has taken, with the four ways out already
 * drawn on the finding).
 *
 * **D10 rides here, decided on 3 September 2026 and not revisited.** A
 * proposed-but-unapplied qualifier is *inside* the population and the plate
 * says so. The count is the register's — results in an analytical batch — and
 * never the grid's, which counts cells in a round: a distinction wave 19
 * established because no grid cell carries a qualifier channel at all.
 */
export const ANALYSES = (() => {
  const V = SAVED_VIEWS;
  const analyteOf = (name) => ANALYTES.find((a) => a.name === name);
  const firstWord = (name) => name.split(/[\s(]/)[0];

  /* ================================================================ *
   * Every value this wave moved, typed exactly once
   * ================================================================ */
  const was = {
    /** What §9.5's chain had at its analytical-settings link. */
    settings: 'nowhere to live',
    /** What a report item's source resolved to before this wave. */
    sourceResolves: 'a dataset, on 2 of the 15 items, and text on the rest',
    /** What `#hydrochem` stated about the population its three plates draw. */
    hydrochemPopulation: 'nothing — no count, no exclusion, no table, no conversion',
    /** The sentence that assigned a water type to six bores. */
    faciesClaim: 'Every bore except MW05 is a calcium-bicarbonate water, tightly clustered',
    faciesTail: 'MW05 is sulfate-dominated and four times the ionic strength',
    /** What `#statistics` offered against the link `#result-detail` points at it. */
    summaryTable: 'a link from #result-detail pointing at a screen with no summary statistics on it',
    /** How the statistics screen described its own population. */
    statisticsPopulation: '14 quarterly values … 2 censored, entering as tied values and never substituted',
    /** Where §9.4's five absent measures stood. */
    absentMeasures: 'no surface at all',
    /** What `#background` said about where its percentiles come from. */
    percentileProvenance: 'a method sentence and a caution, and no reference distribution in the record',
  };

  /* ================================================================ *
   * §9.3's seven forms and §9.4's ten measures — the brief's own words
   *
   * `build.mjs` closes both lists against `VENDOR_REQUIREMENTS.md` in both
   * directions and in order, the same way §4.2's dimensions and §4.4's
   * representations are closed. A screen that measured seven things against a
   * list of seven things it typed itself would be checking its own homework,
   * and wave 20's audit made exactly that finding about the one list that was
   * left unclosed.
   * ================================================================ */

  /** §9.4's ten, each supplied from the record or counted absent with its reason. */
  const MEASURES = [
    'Summary statistics', 'Percentiles', 'Minimum and maximum', 'Detection frequency',
    'Exceedance frequency', 'Mann-Kendall trend', "Sen's slope", 'Seasonal comparison',
    'Censored or non-detect data treatment', 'Background or reference-population comparison',
  ];

  /** §9.3's seven. */
  const FORMS = [
    'Piper diagram', 'Schoeller diagram', 'Stiff diagram', 'Durov diagram',
    'Ionic balance', 'Major-ion composition', 'Water type or facies',
  ];

  /* ================================================================ *
   * The population every statistic on `#statistics` runs over — and the
   * five readings of it this catalogue holds
   *
   * §9.4's own sentence is the standard: *"A graph without an inspectable
   * underlying population is inconsistent with Strataflow's defensibility
   * proposition."* The first thing that happens when this one is made
   * inspectable is that it turns out to be five populations.
   *
   * The exported array is the record and the rest are figure-local literals,
   * which is the repository's own rule rather than a preference: §10 of the
   * expansion brief says the seed is the single source and a count drawn by
   * hand anywhere is a defect. So the statistics run over `ARSENIC_MW05` and
   * every other reading is named, located and left alone — `figures.mjs` is
   * fenced by D13 and an approved plate is not a wave's to redraw.
   *
   * Each reading carries the marker `build.mjs` looks for in the file it names.
   * A reading whose marker has gone stops the build rather than sitting on a
   * screen describing a plate that has changed underneath it.
   * ================================================================ */
  const SERIES = ARSENIC_MW05;
  const arsenic = analyteOf('Arsenic (filtered)');

  const readings = [
    {
      reading: 'The exported series',
      /* Derived from the object itself — there is no literal to count. */
      counts: false,
      where: 'seed.mjs', marker: 'export const ARSENIC_MW05',
      n: SERIES.length,
      get censored() { return SERIES.filter((p) => p.censored).length; },
      get span() { return `${SERIES[0].month} to ${SERIES.at(-1).month}`; },
      get range() { return `${Math.min(...SERIES.map((p) => p.value))} – ${Math.max(...SERIES.map((p) => p.value))} ${arsenic.unit}`; },
      is: 'the record',
      says: 'Fourteen quarterly values, every one of them a detect. It is what Figure 4.6 draws and what the trend record describes.',
    },
    {
      reading: 'The trend record',
      /* A record of numbers a worker returned, not an array this file holds. */
      counts: false,
      where: 'seed.mjs', marker: 'export const TREND',
      n: TREND.n, censored: TREND.censored, span: '—', range: '—',
      is: 'the record',
      says: 'Says the same fourteen values hold two non-detects. The array it describes holds none, and the two sit four thousand lines apart in one file.',
    },
    {
      reading: 'Figure 4.2, as the plate draws it',
      /* A transform applied in the drawing, not an array — the marker is the
       * substitution itself and there is nothing to count. */
      counts: false,
      where: 'figures.mjs', marker: 'i < 2 ? { ...p, value: 5, censored: true, lor: 5 }',
      n: SERIES.length, censored: 2, span: '—', range: '—',
      is: 'a figure-local literal',
      says: 'The plate takes the exported series and rewrites its first two points as non-detects at a 5 µg/L limit, inside the figure module. The substitution is a line of code in a drawing, so nothing else in the catalogue can see it.',
    },
    {
      /*
       * W21-A-1. This row described the defect and the defect stayed on the
       * screen: six typed rows on months the series does not hold, captioned
       * as the plotted values. The table is derived from the series now, so
       * this reading is no longer a fifth answer — it is the record's own,
       * with the plate's departure named beside it rather than reproduced.
       * The marker moved with it, which is what stopped the build when the
       * table changed and the row had not.
       */
      reading: 'The table drawn under Figure 4.2',
      /* Every field below is a getter over the series, so the row cannot drift
       * from the table and there is no literal to count (W21-A-7). */
      counts: false,
      where: 'screens.mjs', marker: 'Figure 4.2 — the ${series.length} values in the record',
      /*
       * W21-A-7. Round 1 rewrote this row and typed its numbers, on a row whose
       * whole subject is a table that no longer types anything — so truncating
       * the series left the table correct and this row reporting fourteen, next
       * to a row twelve lines above that self-corrected because its fields are
       * getters. The fourth instance of the shape, and the first one I wrote.
       * The row reads the array it describes now, so it cannot say a number the
       * table does not draw.
       */
      get n() { return ARSENIC_MW05.length; },
      get censored() { return ARSENIC_MW05.filter((p) => p.censored).length; },
      get span() { return `${ARSENIC_MW05[0].month} to ${ARSENIC_MW05.at(-1).month}`; },
      get range() {
        const v = ARSENIC_MW05.map((p) => p.value);
        return `${Math.min(...v)} – ${Math.max(...v)} µg/L`;
      },
      is: 'derived from the series',
      /*
       * W21-A-11 renders this field, so its two live numbers are derived and
       * only the historical one — what the withdrawn surface said — is written
       * down, which is the whole job of a `was`. Typing "five readings … two
       * answers" onto a face whose other counts derive is the shape this wave
       * has now found six times.
       */
      get was() {
        const answers = new Set(readings.map((x) => x.censored)).size;
        return `Six typed rows, on months the series does not hold and at values it does not carry, under a caption that called them the plotted values — two non-detects at 5.0 and one at 1.0. Withdrawn 3 September 2026, which is why these ${readings.length} readings now give ${answers} answers about the censoring and not the three the wave first reported: one of the three was this table.`;
      },
      get says() {
        return `The ${ARSENIC_MW05.length} values the record holds, with the two rows the plate rewrites named as the plate\u2019s departure rather than restated as data. It agrees with the exported series because it is the exported series.`;
      },
    },
    {
      reading: 'Figure 4.8, the probability plot',
      where: 'figures.mjs', marker: 'const censored = [1.0, 1.0];',
      /* W21-A-3: the array whose length this row reports, counted by the build
       * rather than trusted. Deleting a value from it now fails. */
      countAt: 'const detects',
      n: 14, censored: 2, span: '—', range: '1.0 – 28.4 µg/L',
      is: 'a figure-local literal',
      says: 'Fourteen values of its own — twelve detects and two non-detects at 1.0 — none of which is a value in the exported series. Its legend reads “Robust ROS · 2 of 14 censored”.',
    },
  ];

  /**
   * What re-running the two tests over the exported array gives.
   *
   * Not an accusation: Sen's slope recomputes to the number on the screen
   * exactly, which is strong evidence the trend record was derived from this
   * array. `S` does not, and the difference is stated as a difference rather
   * than corrected, because a Mann-Kendall statistic recomputed here would be
   * this catalogue asserting a test result nothing in the record ran.
   */
  const recount = (() => {
    const v = SERIES.map((p) => p.value);
    let s = 0;
    for (let i = 0; i < v.length; i += 1) for (let j = i + 1; j < v.length; j += 1) s += Math.sign(v[j] - v[i]);
    const slopes = [];
    for (let i = 0; i < v.length; i += 1) for (let j = i + 1; j < v.length; j += 1) slopes.push((v[j] - v[i]) / (j - i));
    slopes.sort((a, b) => a - b);
    const sen = slopes[Math.floor(slopes.length / 2)];
    return {
      s, pairs: slopes.length, sen: Number(sen.toFixed(2)),
      senDrawn: Number(TREND.plain.slope.split(' ')[0]),
      sDrawn: TREND.plain.s,
      get senAgrees() { return this.sen === this.senDrawn; },
      get sAgrees() { return this.s === this.sDrawn; },
      says:
        'Sen’s slope is the median of all pairwise slopes and it is arithmetic on the array, so it can be recomputed here without asserting anything. The Mann-Kendall statistic can be recomputed the same way and the two answers differ; **which of them is right is not settled by this record**, because the test that produced the drawn one was run somewhere this catalogue cannot see — `services/stats`, which is what the figure’s own source line names.',
    };
  })();

  /* ================================================================ *
   * §9.4 — the five measures that had no surface, supplied
   *
   * Every one of them is an order statistic or a count over the population
   * above, so each is exact arithmetic and none needs a distributional
   * assumption. **The percentile convention is a parameter and it is stated**,
   * because percentile definitions differ and a percentile without its
   * convention is a number a reader cannot check.
   *
   * The column that matters most is the last one. The record disagrees about
   * whether two of these fourteen are non-detects (above), and *which
   * statistics survive that disagreement* is a structural fact about ranks
   * rather than a second calculation: a maximum is unaffected, a median seven
   * ranks above the censoring is unaffected, a minimum becomes a limit rather
   * than a value, and a mean stops being computable by ordinary arithmetic at
   * all. That is the whole of why §9.4 asks for the population and not only
   * the graph.
   * ================================================================ */
  const summary = (() => {
    const values = SERIES.map((p) => p.value);
    const n = values.length;
    const sorted = [...values].sort((a, b) => a - b);
    const detects = SERIES.filter((p) => !p.censored).length;
    const criterion = Number(arsenic.a);
    const above = values.filter((x) => x > criterion).length;
    const mean = values.reduce((t, x) => t + x, 0) / n;
    const sd = Math.sqrt(values.reduce((t, x) => t + (x - mean) ** 2, 0) / (n - 1));

    /** Rank of the p-quantile under the stated convention, 1-based. */
    const rankOf = (p) => 1 + p * (n - 1);
    const at = (p) => {
      const r = rankOf(p);
      const lo = Math.floor(r);
      const hi = Math.ceil(r);
      return sorted[lo - 1] + (r - lo) * (sorted[hi - 1] - sorted[lo - 1]);
    };
    /*
     * Two of the fourteen censored is the other reading of the population; the
     * two lowest are the ones every reading that carries censoring censors. So
     * a quantile whose rank sits above 2 is unaffected by that disagreement and
     * one whose rank does not is undetermined by it. Computed from the rank,
     * never from a substituted value.
     */
    const CENSORED_IF = 2;
    /* A quantile is unaffected when **both** order statistics it interpolates
     * between sit above the censoring, so the test is on the lower of the two
     * and not on the fractional rank: rank 2.3 reads order statistic 2, which
     * is one of the two in question. */
    const survives = (p) => Math.floor(rankOf(p)) > CENSORED_IF;

    const pc = [0.1, 0.25, 0.5, 0.75, 0.9, 0.95];
    return {
      n, detects, criterion, unit: arsenic.unit, lor: arsenic.lor,
      censoredIf: CENSORED_IF,
      convention:
        'The value at rank 1 + p(n − 1) in the ordered sample, interpolated linearly between the two order statistics either side of it. Stated because percentile conventions differ by a rank or two at this sample size, and a percentile without its convention is a number nobody can check.',
      percentiles: pc.map((p) => ({
        p, label: `${(p * 100).toFixed(0)}th`, rank: Number(rankOf(p).toFixed(2)),
        value: Number(at(p).toFixed(2)), survives: survives(p),
      })),
      rows: [
        { measure: 'Summary statistics', stat: 'n', value: String(n), survives: true, under: 'unchanged',
          how: 'The count of values in the population. Every other row is over this n.' },
        { measure: 'Summary statistics', stat: 'Mean', value: mean.toFixed(2), survives: false, under: 'not computable by arithmetic',
          how: 'Arithmetic on the array as it stands. **It is the first thing to go** if the other reading is right: a mean over a sample holding non-detects needs Kaplan–Meier or robust ROS, which is what `#result-detail` promises and what `services/stats` is for.' },
        { measure: 'Summary statistics', stat: 'Standard deviation', value: sd.toFixed(2), survives: false, under: 'not computable by arithmetic',
          how: 'Sample standard deviation, n − 1. Goes the same way and for the same reason.' },
        { measure: 'Minimum and maximum', stat: 'Minimum', value: sorted[0].toFixed(1), survives: false, under: 'a limit, not a value',
          how: 'The smallest value. Under the other reading it is not a value at all — it is *below the limit of reporting*, and reporting it as a number would be the substitution this screen exists to refuse.' },
        { measure: 'Minimum and maximum', stat: 'Maximum', value: sorted.at(-1).toFixed(1), survives: true, under: 'unchanged',
          how: 'The largest value, and the one statistic no censoring at the bottom of the sample can reach.' },
        { measure: 'Percentiles', stat: 'Median (50th)', value: at(0.5).toFixed(2), survives: true, under: 'unchanged',
          how: `Rank ${rankOf(0.5).toFixed(1)} of ${n}, which is above the two lowest either way, so the disagreement about censoring does not reach it.` },
        { measure: 'Detection frequency', stat: 'Detected', value: `${detects} of ${n} · ${((detects / n) * 100).toFixed(1)}%`, survives: false, under: 'a different number — 12 of 14',
          how: 'The proportion of the population the laboratory reported as a value rather than as a limit. **It appeared twice in this repository before this wave and never as a measure** — once in this catalogue’s own note saying it had no surface, and once in the brief asking for it, and it is the measure that makes the disagreement above impossible to ignore: on the array it is 100%, and the trend record says it is 12 of 14.' },
        { measure: 'Exceedance frequency', stat: `Above ${arsenic.a} ${arsenic.unit}`, value: `${above} of ${n} · ${((above / n) * 100).toFixed(1)}%`, survives: true, under: 'unchanged',
          how: 'The proportion of the population above the criterion in force. **Not the same measure as the consecutive-run count** on the exceedance register, which asks how many rounds in a row are above it — one is a rate over a period, the other is a streak, and the licence condition turns on the second.' },
      ],
      mean: Number(mean.toFixed(2)),
      sd: Number(sd.toFixed(2)),
      min: sorted[0], max: sorted.at(-1),
      median: Number(at(0.5).toFixed(2)),
      above,
      get supplied() { return ['Summary statistics', 'Percentiles', 'Minimum and maximum', 'Detection frequency', 'Exceedance frequency']; },
    };
  })();

  /* ================================================================ *
   * §9.3 — the major-ion analysis, and the facies this record does not hold
   *
   * The ion table is in meq/L and every screen that reads it has said so; what
   * no screen has done is show the conversion, count the population, name what
   * is excluded, or say where the plates' symbols come from. All four are
   * arithmetic or inventory over records this file already holds.
   *
   * **Facies is measured and not assigned.** The composition resolves — the
   * proportion each ion holds of its own side is arithmetic on the table — and
   * the *name* does not, because a water type is a classification and this
   * instance holds no classification scheme: no threshold, no naming
   * convention, no version, no approver. So the dominance is reported as what
   * it is (a proportion, and whether it reaches a majority) and no bore is
   * given a type. That refusal is load-bearing rather than cautious: applying
   * the commonest convention — a majority of the meq on a side — **contradicts
   * the sentence this screen has carried since the first pass**, which calls
   * five bores calcium-bicarbonate waters. Not one of the five holds a
   * majority cation, and at three of them the largest cation is not calcium.
   * ================================================================ */
  const ions = (() => {
    const EQ = CONSISTENCY.equivalent;
    const CATIONS = CONSISTENCY.cations;
    const ANIONS = CONSISTENCY.anions;
    /* Charge per ion, for ionic strength. Constants of chemistry like the
     * equivalent weights beside them, and the only numbers here that are
     * neither measured nor derived. */
    const CHARGE = { Ca: 2, Mg: 2, Na: 1, K: 1, HCO3: 1, SO4: 2, Cl: 1 };
    const NAME = { Ca: 'Calcium', Mg: 'Magnesium', Na: 'Sodium', K: 'Potassium', HCO3: 'Bicarbonate', SO4: 'Sulfate', Cl: 'Chloride' };
    const MAJORITY = 0.5;

    const bores = Object.keys(MAJOR_IONS);
    const rows_ = bores.map((code) => {
      const ion = MAJOR_IONS[code];
      const cations = CATIONS.reduce((t, k) => t + ion[k], 0);
      const anions = ANIONS.reduce((t, k) => t + ion[k], 0);
      /* Sodium and potassium are read together on the cation side, which is
       * what the Piper plate already does and is not a choice made here. */
      const cationShare = [
        { key: 'Ca', label: NAME.Ca, meq: ion.Ca, share: ion.Ca / cations },
        { key: 'Mg', label: NAME.Mg, meq: ion.Mg, share: ion.Mg / cations },
        { key: 'NaK', label: 'Sodium + potassium', meq: ion.Na + ion.K, share: (ion.Na + ion.K) / cations },
      ].sort((a, b) => b.share - a.share);
      const anionShare = ANIONS.map((k) => ({ key: k, label: NAME[k], meq: ion[k], share: ion[k] / anions }))
        .sort((a, b) => b.share - a.share);
      const strength = Object.entries(ion).reduce((t, [k, v]) => t + v * CHARGE[k], 0) / 2000;
      return {
        code, ion, cations: Number(cations.toFixed(2)), anions: Number(anions.toFixed(2)),
        conversions: Object.entries(ion).map(([k, v]) => ({
          key: k, label: NAME[k], meq: v, weight: EQ[k], mg: Number((v * EQ[k]).toFixed(1)),
          side: CATIONS.includes(k) ? 'cation' : 'anion',
        })),
        cationShare, anionShare,
        topCation: cationShare[0], topAnion: anionShare[0],
        cationMajority: cationShare[0].share > MAJORITY,
        anionMajority: anionShare[0].share > MAJORITY,
        strength: Number(strength.toFixed(5)),
        consistency: CONSISTENCY.rows.find((r) => r.code === code),
      };
    });
    const rows = rows_;
    const of = (code) => rows.find((r) => r.code === code);

    /* The bore the plates draw filled and red, and the ratio the record was
     * asked for. Both are read off the table rather than off the sentence. */
    const impacted = of('MW05');
    const others = rows.filter((r) => r.code !== impacted.code);
    const ratios = others.map((r) => ({ code: r.code, times: impacted.strength / r.strength }));
    const meanOther = others.reduce((t, r) => t + r.strength, 0) / others.length;

    return {
      rows, of, bores,
      equivalent: EQ, cations: CATIONS, anions: ANIONS, charge: CHARGE, majority: MAJORITY,
      /** Every bore on the round's grid, and which of them has a chemistry. */
      onGrid: CROSSTAB_COLUMNS,
      excluded: CROSSTAB_COLUMNS.filter((c) => !bores.includes(c)).map((code) => ({
        code,
        why: CROSSTAB_SHAPE.isEmpty(code)
          ? 'Dipped twice and found dry, so there is no water to have a chemistry. Excluded from the population and named rather than dropped — a bore that vanishes reads as one that was never on the programme.'
          : 'On the round’s grid and not in the major-ion table.',
      })),
      results: rows.length * (CATIONS.length + ANIONS.length),
      perSample: CATIONS.length + ANIONS.length,
      /**
       * The one ion both records report — and the check nothing else runs.
       *
       * Sulfate is on the results grid in mg/L and in the ion table in meq/L,
       * so converting the second gives a number the first can be compared
       * with. Nothing in this catalogue had ever done that, because until this
       * wave the conversion happened inside a plate.
       *
       * It agrees at five of the six bores to within a percent and a half, and
       * **disagrees at one by a fifth**. Neither value is changed: two records
       * report the same quantity and the record does not say which is right,
       * and the consistency checks cannot arbitrate — they are computed from
       * the ion table alone, so the reconciliation at that bore passes either
       * way and would pass on the grid's figure too.
       */
      get crossCheck() {
        const grid = CROSSTAB.find((r) => r.analyte === 'Sulfate as SO₄');
        const unit = ANALYTES.find((a) => a.name === 'Sulfate as SO₄').unit;
        const TOLERANCE = 5;
        const rows = rows_.map((r) => {
          const i = CROSSTAB_COLUMNS.indexOf(r.code);
          const cell = grid.cells[i];
          const reported = cell.empty ? null : Number(cell.v);
          const derived = r.conversions.find((c) => c.key === 'SO4').mg;
          const off = reported === null ? null : ((derived - reported) / reported) * 100;
          return { code: r.code, derived, reported, off: off === null ? null : Number(off.toFixed(2)), agrees: off !== null && Math.abs(off) <= TOLERANCE };
        });
        return {
          analyte: grid.analyte, unit, tolerance: TOLERANCE, rows,
          agreeing: rows.filter((x) => x.agrees).length,
          disagreeing: rows.filter((x) => !x.agrees),
          says:
            'Two records report the same quantity at the same bore in the same round, and one of them is a conversion of the other’s unit. That is the check a per-sample conversion makes possible and nothing in this catalogue could run while the conversion lived inside a plate.',
          refuses:
            'Changing either number. The record does not say which is right, and the consistency checks cannot arbitrate — they are computed from the ion table alone, so the reconciliation at that bore passes on this figure and would pass on the other one too.',
          settledBy:
            'The certificate. One of the two numbers came off a laboratory report and the other is this project’s major-ion table for the same sample; the deliverable that carried them says which, and it is one file rather than a decision.',
        };
      },
      /* ---- the facies question, measured ---- */
      facies: {
        question: 'What kind of water is this?',
        resolves: false,
        composition:
          'The proportion each ion holds of its own side is arithmetic on the table and it resolves for every bore in the population. That is the part §9.3’s *major-ion composition* asks for, and it is drawn.',
        holds:
          'No classification. There is no facies scheme in this instance — no threshold, no naming convention, no version and no approver — so there is nothing to apply and nothing to cite. A water type is a **rule that produces a finding**, which is exactly the object D9 generalised a criterion into, and a rule that is not on the record cannot be run.',
        stated:
          'A majority of the meq on a side is the commonest way a dominance is read, and it is stated here as arithmetic — *does any ion hold more than half* — rather than cited as a scheme, because citing one this catalogue does not hold would be inventing a source.',
        get measured() {
          const noMajority = rows.filter((r) => !r.cationMajority);
          const notCalcium = rows.filter((r) => r.topCation.key !== 'Ca');
          return {
            bores: rows.length,
            cationMajority: rows.filter((r) => r.cationMajority).length,
            anionMajority: rows.filter((r) => r.anionMajority).length,
            noMajority: noMajority.map((r) => r.code),
            notCalcium: notCalcium.map((r) => r.code),
            /*
             * W21-A-4. `4 of 6` was reported as a clean count on a screen that
             * prints the ionic balance to two decimals as `worst +0.61%`. One
             * of the four turns on 0.22 of a percentage point, and a count that
             * hides its own closest call is the kind of number this catalogue
             * spends its time removing. The margins are carried so the face can
             * say which decisions are comfortable and which is not.
             */
            margins: notCalcium
              .map((r) => {
                const cs = r.cations;
                const ca = (r.ion.Ca / cs) * 100;
                const top = (r.topCation.meq / cs) * 100;
                return { code: r.code, top: r.topCation.key, by: top - ca };
              })
              .sort((a, b) => a.by - b.by),
          };
        },
        refuses:
          'Assigning a type to six bores because the words are already in the prose. The sentence beside these plates has named five of them calcium-bicarbonate waters since the first pass, and the table underneath it does not support that in either half.',
        settledBy:
          'A classification scheme as a governed object — the thresholds, the names they produce and the version they are in force under — held the way the criteria library holds a criteria set, so a water type on a report is a finding with a rule behind it rather than a word in a paragraph.',
      },
      /*
       * W21-A-6. Round 1 named the two plate descriptions it was handed and
       * round 2 found a third saying the same thing — and worse, the card
       * added in round 1 opened with a typed *"Two of the three plates"*,
       * which is a fresh false count on the screen built to stop exactly that.
       * Typing a count while correcting a count is the defect answering
       * itself, so the plates are a record now and the face counts them.
       *
       * Each entry holds the description verbatim, the claim it makes about
       * *every other bore*, and the arithmetic from this table that decides
       * it. A plate whose description survives the arithmetic would simply
       * carry `refuted: false` and drop out of the count.
       */
      get plateClaims() {
        const so4 = rows.map((r) => ({ code: r.code, v: r.ion.SO4 })).sort((a, b) => b.v - a.v);
        const sulfateNearest = so4[0].v / so4[1].v;
        const m = this.facies.measured;
        const st = this.strengthClaim;
        return [
          {
            plate: 'Piper', figure: '4.3',
            desc: 'MW05 plots as a distinctly sulfate-dominated water separate from the Ca-HCO3 background of every other bore',
            claims: 'that the other five are calcium-bicarbonate waters',
            measured: `the largest cation is not calcium at ${m.notCalcium.length} of the ${m.bores}, and only ${m.anionMajority} hold a majority anion at all`,
            /*
             * W21-A-12. `refuted: true` was a literal on all three, so the
             * count filtered three hardcoded trues and could not fall — the
             * fifth instance of the shape, and the second I wrote. The numbers
             * were derived and the verdict they were supposed to decide was
             * not, which is the same defect one field over.
             *
             * The plate's words are qualitative, so the test states the
             * threshold it reads them at rather than hiding it: a reader can
             * disagree with the threshold, which is the point of printing it.
             */
            test: 'every other bore has calcium as its largest cation and a bicarbonate majority',
            get refuted() { return m.notCalcium.length > 0 || m.anionMajority < m.bores; },
          },
          {
            plate: 'Stiff', figure: '4.4',
            desc: 'MW05 is roughly four times the ionic strength of every other bore',
            claims: 'a factor of about four against every one of the other five',
            /* W21-A-16. `the mean is 2.73×` sat between the two extremes and read
             * as their mean, which is 2.89×. It is MW05 against the mean strength
             * of the other five — the reading the two other surfaces that use this
             * number both name, and the only one this string did not. */
            measured: `the closest is ${st.highest.times.toFixed(2)}× and the widest ${st.lowest.times.toFixed(2)}×; against the mean strength of the other ${st.ratios.length} it is ${st.meanRatio}× — four is true of none of them`,
            test: 'roughly four times read as at least 3.5× against every other bore',
            get refuted() { return st.highest.times < 3.5; },
          },
          {
            plate: 'Schoeller', figure: '4.5',
            desc: 'Every bore shares a parallel Ca-Mg-HCO3 signature except MW05, whose sulfate limb is an order of magnitude above the rest',
            claims: 'a shared calcium-magnesium-bicarbonate signature, and a sulfate limb ten times the rest',
            measured: `the signature fails on the same ${m.notCalcium.length} bores, and the sulfate limb is ${sulfateNearest.toFixed(2)}× the next bore — an order of magnitude above *the rest* requires the nearest, not the furthest`,
            test: 'a shared calcium signature, and an order of magnitude read as at least 10× against the nearest bore',
            get refuted() { return m.notCalcium.length > 0 || sulfateNearest < 10; },
          },
        ];
      },
      get plateClaimCount() {
        const all = this.plateClaims;
        return { refuted: all.filter((p) => p.refuted).length, total: all.length };
      },
      /* ---- the ionic-strength claim, recomputed ---- */
      strengthClaim: {
        subject: impacted.code,
        get I() { return impacted.strength; },
        ratios,
        meanRatio: Number((impacted.strength / meanOther).toFixed(2)),
        get lowest() { return ratios.reduce((w, r) => (r.times > w.times ? r : w)); },
        get highest() { return ratios.reduce((w, r) => (r.times < w.times ? r : w)); },
        get says() {
          return `Ionic strength is ½ Σ mᵢzᵢ², computed from the meq and the charge on each ion. Against the mean of the other ${this.ratios.length} bores ${this.subject} is **${this.meanRatio}×**; the widest single ratio is **${this.lowest.times.toFixed(2)}×** at ${this.lowest.code} and the narrowest is **${this.highest.times.toFixed(2)}×** at ${this.highest.code}. *Four times every other bore* is true of none of them.`;
        },
      },
      /* ---- §9.3's last inspectable: grouping and symbolisation ---- */
      symbolisation: {
        resolves: false,
        drawnBy: 'figures.mjs',
        rule: 'One mark shape per bore, in the order the ion table holds them, cycling through four; one bore drawn filled and in the exceedance colour.',
        which: impacted.code,
        says:
          'The rule is real and it is legible on the plate. What it is not is **configuration**: it is written inside the module that draws the figure, so nothing selects it, nothing records it, and a reader cannot ask why one bore is red without reading the drawing’s source. §9.3 asks for the grouping or symbolisation logic to be inspectable, and *inspectable* is the word this fails on rather than *present*.',
        sameAs:
          'The potentiometric fit fails in the same place and it is the sharper case, because that one is an analysis rather than a palette — its method, its control set and its residual live in the figure module too, which is why it is the one analysis on this register that cannot be composed here.',
      },
    };
  })();

  /* ================================================================ *
   * The QA/QC state, as at computation
   *
   * §9.5's third link, and the one an analysis is easiest to draw without.
   * Three things have to be true of it and each is drawn rather than claimed:
   *
   *   1. It is **frozen**. An analysis says what its members' quality state
   *      was when it ran; it does not re-read the register every time somebody
   *      opens it. A figure whose caption changed because a reviewer
   *      dispositioned a finding last week is a figure that has stopped being
   *      evidence of anything.
   *   2. It is **attached to the population**, not to the analysis as a whole.
   *   3. It **drifts**, and the drift is the finding.
   *
   * What this instance holds decides how far each can be honestly drawn. A
   * finding's scope names analytes and locations in prose, and **no result
   * carries a qualifier channel at all** — wave 19 measured 0 of 77 grid cells
   * — so a finding is matched to a population by reading its own text. That is
   * a string match rather than a link and the register says so: it is the
   * limit, not the mechanism.
   * ================================================================ */
  const findingsFor = (analytes, checkWords = []) => {
    const words = analytes.map((a) => firstWord(a).toLowerCase());
    return QAQC.filter((q) => {
      const text = [q.scope, q.detail, q.action].filter(Boolean).join(' ').toLowerCase();
      const byAnalyte = words.some((w) => new RegExp(`\\b${w}\\b`).test(text));
      /* The second limb, for a check scoped by bore rather than by analyte.
       * The words are the keys `CONSISTENCY` computes its own limits under, so
       * a check this catalogue stopped computing stops matching. */
      const byCheck = checkWords.some((w) => q.check.toLowerCase().includes(w.toLowerCase()));
      return byAnalyte || byCheck;
    });
  };

  /** The checks the consistency record itself computes, from its own limits. */
  const CONSISTENCY_CHECKS = Object.keys(CONSISTENCY.limits).filter((k) => !/Text$/.test(k));

  /** One member of an analysis's frozen QA/QC state. */
  const qaEntry = (q) => ({
    id: q.id, check: q.check, scope: q.scope, outcome: q.outcome, state: q.state,
    qualifier: q.qualifier,
    position: q.qualifier === null ? 'no qualifier'
      : q.proposed ? 'proposed, unapplied — the basis has not been chosen'
        : 'applied',
    results: q.results,
    proposed: Boolean(q.proposed),
    settled: q.state === 'dispositioned' || q.state === 'clear',
    /** What would move it, from the record rather than from a guess. */
    moves: q.decision ? q.decision.options.filter((o) => o.available).length : 0,
  });

  /* ================================================================ *
   * The analyses
   *
   * Found rather than chosen: `REPORT_ITEMS` names a source on every item, and
   * a source either names a **method** (an analysis, which until this wave had
   * nothing to resolve to), a **dataset** (resolved in wave 19), a
   * **population**, a **register** or a **log**. The classification is the
   * §9.5 measurement, and the analyses below are the methods it finds plus the
   * two this catalogue performs and no report item cites.
   * ================================================================ */
  const SOURCE_KIND = [
    { kind: 'a method', test: (s) => /^services\/stats|^Evaluation ·|^Water levels ·|^DQA ·|^Validation run/.test(s) },
    { kind: 'a dataset', test: (s) => Boolean(V.viewFor(s)) },
    { kind: 'a population', test: (s) => /^2026-Q2-GW/.test(s) },
    { kind: 'a register', test: (s) => /register$/.test(s) },
    { kind: 'a log', test: (s) => /log$/.test(s) },
  ];
  const kindOf = (source) => SOURCE_KIND.find((k) => k.test(source))?.kind ?? 'unclassified';

  /**
   * The one computation moment on the record.
   *
   * Counted rather than assumed: every analysis below is asked for a timestamp
   * and one has it. The consecutive-window condition records `evaluated`
   * because a statutory clock runs from it — which is the reason a moment gets
   * written down at all, and the reason the others have none.
   */
  const analyses = [
    {
      id: 'window-12c',
      name: 'Consecutive-round condition — licence 12(c)',
      composed: true,
      method: WINDOW_CONDITION.rule,
      version: WINDOW_CONDITION.ruleVersion,
      computedAt: WINDOW_CONDITION.evaluated,
      source: 'Evaluation · consecutive-window v2',
      dataset: null,
      datasetWhy: 'A licence condition names its own schedule — three parameters at four bores — so the population is the condition’s rather than a dataset’s. That is a real difference and not a gap: nobody may edit what a licence condition selects.',
      parameters: [
        { p: 'Window', v: `${WINDOW_CONDITION.rounds.length} rounds`, why: 'Three to see the run and one more to show that the fourth did not start a new one.' },
        { p: 'Rule', v: WINDOW_CONDITION.rule, why: 'Same location, same parameter, consecutive.' },
        { p: 'Criterion in force at each round', v: 'frozen onto the outcome', why: WINDOW_CONDITION.frozen },
      ],
      get population() {
        return {
          what: `${WINDOW_CONDITION.series.length} series drawn · ${WINDOW_CONDITION.rounds.length} rounds each · ${WINDOW_CONDITION.series.length * WINDOW_CONDITION.rounds.length} values`,
          members: WINDOW_CONDITION.series.map((s) => `${s.analyte} · ${s.location}`),
          excluded: WINDOW_CONDITION.notDrawn,
        };
      },
      get analytes() { return [...new Set(WINDOW_CONDITION.series.map((s) => s.analyte))]; },
      get locations() { return [...new Set(WINDOW_CONDITION.series.map((s) => s.location))]; },
      get output() {
        const trip = WINDOW_CONDITION.series.filter((s) => s.outcome === 'triggered');
        return `${trip.length} of ${WINDOW_CONDITION.series.length} series triggered · ${trip.map((s) => `${s.analyte} at ${s.location}`).join(', ')}`;
      },
      downstream: ['obligations', 'tarp', 'notification', 'report-figures'],
      at: 'exceedances',
    },
    {
      id: 'evaluation-2-sets',
      name: 'Criteria evaluation — the round against both sets in force',
      composed: true,
      method: 'Each result compared with the criterion its criteria set publishes for that analyte, matrix and location class, one outcome per set',
      version: CRITERIA.map((c) => `${c.short} ${c.version}`).join(' · '),
      computedAt: null,
      source: 'Evaluation · 2 criteria sets',
      dataset: null,
      datasetWhy: 'The population is the round, which is what the grid draws. No dataset selects it — the three that select locations select two or seven of them, and the one that selects all groundwater names a suite by size.',
      parameters: [
        { p: 'Criteria sets', v: `${CRITERIA.length} in force`, why: 'Two marks per value, always in the same order, because a result above one set and below another is two answers rather than one.' },
        { p: 'Non-detect handling', v: 'the reported limit, never a substituted value', why: 'A limit above the criterion is recorded as indeterminate rather than as a pass.' },
      ],
      get population() {
        const cells = CROSSTAB.flatMap((r) => r.cells.map((c, i) => ({ analyte: r.analyte, location: CROSSTAB_COLUMNS[i], cell: c })));
        const acc = V.accounting(cells);
        return {
          what: `${cells.length} cells · ${acc.included.length} results · ${acc.byKind.map((k) => `${k.list.length} ${k.word}`).join(' · ')}`,
          accounting: acc,
          members: [`${CROSSTAB.length} analytes × ${CROSSTAB_COLUMNS.length} locations`],
          excluded: `${acc.excluded.length} cells hold no result, in ${acc.byKind.length} kinds, each counted separately and none of them a pass.`,
        };
      },
      get analytes() { return CROSSTAB.map((r) => r.analyte); },
      locations: CROSSTAB_COLUMNS,
      get output() { return `${EXCEEDANCES.length} exceedances at ${new Set(EXCEEDANCES.map((e) => e.location)).size} locations · ${INDETERMINATE.length} results that could not be assessed`; },
      downstream: ['exceedances', 'indeterminate', 'tarp', 'report-figures'],
      at: 'exceedances',
    },
    {
      id: 'trend-as-mw05',
      name: 'Trend — Mann-Kendall and Sen’s slope',
      composed: true,
      method: `${TREND.plain.name} and ${TREND.seasonal.name}, with Sen’s slope`,
      version: 'services/stats — the worker the figure’s own source line names',
      computedAt: null,
      source: 'services/stats · Mann–Kendall, Sen’s slope',
      dataset: null,
      datasetWhy:
        'The figure that carries this analysis cites a dataset — *TSF downgradient — metals*, at v1 — and the dataset selects MW05 and MW07 while the analysis runs at MW05 alone. So the citation is the dataset’s and the population is narrower than it, which is the second half of the disagreement wave 19 drew on the other figure of the same pair.',
      parameters: [
        { p: 'Test', v: 'Both reported', why: TREND.why },
        { p: 'Seasonal blocking', v: 'quarterly', why: 'What the test does with time. It is not a field a population can select on, which is why *season* is one of the two dimensions the explorer measures as held by nothing.' },
        { p: 'Non-detect treatment', v: 'tied values below every detect, never substituted', why: TREND.censoredTreatment },
        { p: 'Sample-size floor', v: 'n = 8', why: 'Below it the test is reported with a warning and no p-value, rather than a number that looks like evidence.' },
      ],
      get population() {
        return {
          what: `${SERIES.length} quarterly values · ${SERIES[0].month} to ${SERIES.at(-1).month} · ${TREND.analyte}`,
          members: [TREND.analyte],
          excluded: 'Nothing. Every value in the series is in the test — which is what a rank test over a complete series looks like, and it is worth saying rather than leaving a reader to assume it.',
        };
      },
      analytes: ['Arsenic (filtered)'],
      locations: ['MW05'],
      get output() { return `${TREND.plain.name} S ${TREND.plain.s}, p ${TREND.plain.p}, ${TREND.plain.slope} · ${TREND.seasonal.verdict}`; },
      downstream: ['report-figures', 'narrative', 'tarp'],
      at: 'statistics',
    },
    {
      id: 'summary-as-mw05',
      name: 'Summary statistics — the population behind the trend',
      composed: true,
      method: 'Order statistics and counts over the population, with the percentile convention stated',
      version: 'new — 3 September 2026',
      computedAt: null,
      source: null,
      sourceWhy: 'No report item cites it, because it did not exist until this wave. An analysis nothing cites is a normal state and the register says so rather than inventing a citation for it.',
      dataset: null,
      datasetWhy: 'The same population the trend runs over, and it names no dataset for the same reason.',
      parameters: [
        { p: 'Percentile convention', v: 'rank 1 + p(n − 1), interpolated', why: summary.convention },
        { p: 'Criterion for exceedance frequency', v: `${arsenic.a} ${arsenic.unit}`, why: 'The value the criteria set in force publishes for this analyte. A frequency against an unnamed criterion is a number without a question.' },
        { p: 'Non-detect treatment', v: 'none applied — the array holds no censored value', why: 'And that is the disagreement, not the answer: the trend record beside it says two of the fourteen are non-detects.' },
      ],
      get population() {
        return {
          what: `${SERIES.length} quarterly values · ${SERIES[0].month} to ${SERIES.at(-1).month} · ${TREND.analyte}`,
          members: [TREND.analyte],
          excluded: 'Nothing — and **five readings of this population exist in the catalogue and no two agree**, which is what happened the first time it was made inspectable.',
        };
      },
      analytes: ['Arsenic (filtered)'],
      locations: ['MW05'],
      get output() { return `n ${summary.n} · median ${summary.median} · max ${summary.max} · detected ${summary.detects} of ${summary.n} · above the criterion ${summary.above} of ${summary.n}`; },
      downstream: ['result-detail', 'statistics'],
      at: 'statistics',
    },
    {
      id: 'evaluation-lor',
      name: 'Reporting limit against the applicable criterion',
      composed: true,
      method: 'The laboratory’s limit of reporting compared with the criterion in force for the same analyte, matrix and location class',
      version: `Deterministic — ${CRITERIA[0].short} ${CRITERIA[0].version}`,
      computedAt: null,
      source: 'Evaluation · LOR above criterion',
      dataset: null,
      datasetWhy: 'The same population as the evaluation above — it is a second reading of the round rather than a second query.',
      parameters: [
        { p: 'Comparison', v: 'limit of reporting against the guideline value', why: 'Arithmetic on two numbers both on the record, which is why the outcome is written rather than proposed.' },
        { p: 'Outcome when the limit is higher', v: 'indeterminate', why: 'Nothing was measured either way, and **indeterminate is not a pass** — the single substitution this catalogue exists to refuse.' },
      ],
      get population() {
        const row = CROSSTAB.find((r) => r.analyte === INDETERMINATE[0].analyte);
        const cells = row.cells.map((c, i) => ({ analyte: row.analyte, location: CROSSTAB_COLUMNS[i], cell: c }));
        const acc = V.accounting(cells);
        return {
          what: `${cells.length} cells on one analyte row · ${acc.included.length} results`,
          accounting: acc,
          members: [INDETERMINATE[0].analyte],
          excluded: `${acc.excluded.length} — the dry column, which had no sample to have a limit of reporting on.`,
        };
      },
      get analytes() { return [...new Set(INDETERMINATE.map((r) => r.analyte))]; },
      locations: CROSSTAB_COLUMNS,
      note:
        'The finding behind it reports **7** results and this population holds **6**. Both are right about different things: the check was written against all seven planned bores and one of them was dry, so it produced six outcomes. Recorded rather than reconciled — a register that quietly took the smaller number would be describing the check by its result instead of by its scope.',
      get output() { return `${INDETERMINATE.length} results recorded indeterminate · limit ${INDETERMINATE[0].gap} the criterion`; },
      downstream: ['indeterminate', 'exceedances', 'report-figures'],
      at: 'indeterminate',
    },
    {
      id: 'major-ions',
      name: 'Major-ion composition and charge balance',
      composed: true,
      method: 'Cation and anion sums in meq/L, charge balance, TDS reconciliation and EC : TDS ratio, per sample',
      version: `Acceptance limits — balance ${CONSISTENCY.limits.balanceText}, ratio ${CONSISTENCY.limits.ratioText}, EC : TDS ${CONSISTENCY.limits.ecTdsText}`,
      computedAt: null,
      source: null,
      sourceWhy:
        'The two plates that draw it name `2026-Q2-GW major ions`, which is the **population** and not the analysis. That is the §9.5 gap in one cell: an output naming its ions says nothing about the balance, the conversion or the classification that turned them into a picture.',
      checkWords: CONSISTENCY_CHECKS,
      dataset: null,
      datasetWhy: 'No dataset selects the ion suite. The analyte dimension of every dataset here names a suite by size, and the record holds a suite’s size and never its membership.',
      parameters: [
        { p: 'Unit', v: 'meq/L', why: 'The table is held in milliequivalents, which is what a proportion on a trilinear plate needs. The conversion to mg/L is the equivalent weight of each ion and it is shown per sample.' },
        { p: 'Sodium and potassium', v: 'read together on the cation side', why: 'What the plate already does, and it is stated here rather than left inside the drawing.' },
        { p: 'Dominance', v: `a share above ${(ions.majority * 100).toFixed(0)}% of its own side`, why: 'Stated as arithmetic rather than cited as a classification scheme, because this instance holds none.' },
      ],
      get population() {
        return {
          what: `${ions.rows.length} of the ${ions.onGrid.length} bores on the round’s grid · ${ions.results} ion results · ${ions.perSample} ions per sample`,
          members: ions.bores,
          excluded: ions.excluded.map((x) => `${x.code} — ${x.why}`).join(' '),
        };
      },
      analytes: ['Sulfate as SO₄', 'Total hardness as CaCO₃', 'Electrical conductivity'],
      get locations() { return ions.bores; },
      get output() {
        return `${CONSISTENCY.counts.consistent} of ${CONSISTENCY.counts.bores} bores consistent · ${CONSISTENCY.counts.raised} review raised · worst balance ${CONSISTENCY.counts.worstBalance > 0 ? '+' : '−'}${Math.abs(CONSISTENCY.counts.worstBalance).toFixed(2)}%`;
      },
      downstream: ['consistency', 'report-figures', 'narrative'],
      at: 'hydrochem',
    },
    {
      id: 'planar-fit',
      name: 'Potentiometric surface — planar least-squares fit',
      composed: false,
      method: 'A plane fitted through the control heads by least squares, with the residual at each control printed',
      version: null,
      computedAt: null,
      source: 'Water levels · planar fit',
      dataset: null,
      datasetWhy: 'The population is the round’s own dips, reduced through the survey in force at each measurement date.',
      parameters: [],
      population: null,
      analytes: [],
      output: null,
      downstream: ['map', 'report-figures'],
      at: 'map',
      why:
        'This is a real analysis with a method, a control set, named exclusions and a printed residual — **and every one of those lives inside the module that draws the figure**. So it cannot be composed on this register, cited by anything but the plate, or run over any other round. It is the sharpest case for what an analysis object is for, and it is the one this wave cannot fix: `figures.mjs` is fenced until the print test D13 requires has happened.',
    },
    {
      id: 'dqa-six',
      name: 'Data quality assessment against the objectives',
      composed: false,
      method: 'Six dimensions, each resting on the QA/QC findings under it',
      version: DQO.used.version,
      computedAt: null,
      source: 'DQA · six dimensions',
      dataset: null, datasetWhy: null, parameters: [], population: null, analytes: [], output: null,
      downstream: ['dqa', 'validation'],
      at: 'dqa',
      why:
        'Its population is **findings rather than results**, which is why it is not composed here: every field on this register describes a set of results, and forcing an assessment over checks into that shape would be the conflation the grid refuses one requirement over.',
    },
    {
      id: 'validation-run',
      name: 'Validation run',
      composed: false,
      method: null,
      version: null,
      computedAt: '2026-05-21',
      source: 'Validation run 2026-05-21',
      dataset: null, datasetWhy: null, parameters: [], population: null, analytes: [], output: null,
      downstream: ['validation', 'qc'],
      at: 'validation',
      why:
        'A run over a round rather than a method over a population — it names **no method at all**, which is why it is on this register as a source that looked like an analysis and is not one. It carries the second date on the register, and the only one in a source string.',
    },
  ];

  const of = (id) => analyses.find((a) => a.id === id);
  const composed = analyses.filter((a) => a.composed);

  /**
   * Every report item's source, classified — the §9.5 measurement.
   *
   * A source either names a **method** (an analysis, which until this wave had
   * nothing to resolve to), a **dataset** (resolved in wave 19), a
   * **population**, a **register** or a **log**. Nothing here is assigned: the
   * kind is read off the string and the analysis is found by matching it, so
   * an item whose source stops naming a method stops being counted as one.
   */
  const analysesSources = () => {
    const rows = REPORT_ITEMS.items.map((it) => {
      const kind = kindOf(it.source);
      const analysis = analyses.find((a) => a.source === it.source) ?? null;
      return { item: it, source: it.source, kind, analysis, dataset: V.viewFor(it.source) };
    });
    return {
      rows,
      total: rows.length,
      method: rows.filter((r) => r.kind === 'a method').length,
      dataset: rows.filter((r) => r.kind === 'a dataset').length,
      population: rows.filter((r) => r.kind === 'a population').length,
      other: rows.filter((r) => !['a method', 'a dataset', 'a population'].includes(r.kind)).length,
      resolves: rows.filter((r) => r.dataset || (r.analysis && r.analysis.composed)).length,
      unresolved: rows.filter((r) => r.analysis && !r.analysis.composed),
    };
  };

  /* ---- The QA/QC state each composed analysis froze ---- */
  for (const a of composed) {
    Object.defineProperty(a, 'qa', {
      enumerable: true,
      get() {
        const found = findingsFor(this.analytes, this.checkWords ?? []);
        const entries = found.map(qaEntry);
        return {
          matched: 'the finding’s own text, read for the analytes in the population',
          entries,
          open: entries.filter((e) => !e.settled),
          proposed: entries.filter((e) => e.proposed),
          proposedResults: entries.filter((e) => e.proposed).reduce((n, e) => n + (e.results ?? 0), 0),
          applied: entries.filter((e) => e.position === 'applied'),
        };
      },
    });
  }

  /**
   * The drift, and the two ways an analysis is overtaken.
   *
   * One is **realised and on the record**: a member of the evaluation was
   * superseded, and the register the evaluation produced says so in as many
   * words. The other is **prospective and drawn from the ways out the finding
   * already offers**: nobody has dispositioned the matrix-spike failure, and
   * each of the two available options writes a different qualifier on a
   * different number of results.
   *
   * The realised one bounds a computation moment the record does not state. A
   * register that is stale *because* a member was superseded was computed
   * before the supersession, and both certificates carry an issue date — so
   * the evaluation ran between them. That is derived from the staleness mark
   * and two dates rather than assumed, and it is the only reason the frozen
   * population below can hold a value the grid no longer shows.
   */
  const drift = (() => {
    const item = REPORT_ITEMS.items.find((it) => it.state.includes('superseded'));
    const row = CROSSTAB.find((r) => r.analyte === 'Arsenic (filtered)');
    const at = CROSSTAB_COLUMNS.indexOf('MW03B');
    const cell = row.cells[at];
    const ms = QAQC.find((q) => q.id === 'MS-1');
    return {
      realised: {
        kind: 'a member was superseded',
        analysis: 'evaluation-2-sets',
        /* Counted off the grid the evaluation ran over, not off this record:
         * a second superseded cell would appear here without anybody adding
         * it, and a supersession withdrawn would leave. */
        members: CROSSTAB.flatMap((r) => r.cells).filter((c) => c.superseded).length,
        item: item ? item.n : null,
        itemState: item ? item.state : null,
        member: `${row.analyte} · MW03B`,
        asAt: { value: `${cell.superseded} ${arsenic.unit}`, certificate: SUPERSESSION.original.certificate, outcome: SUPERSESSION.original.outcome },
        now: { value: `${cell.v} ${arsenic.unit}`, certificate: SUPERSESSION.superseding.certificate, outcome: SUPERSESSION.superseding.outcome },
        bound: {
          after: SUPERSESSION.original.issued,
          before: SUPERSESSION.superseding.issued,
          how: 'The exceedance register is stale **because** this member was superseded, so the evaluation that produced it ran before the supersession and after the certificate it read. Neither date is the analysis’s own; between them is as close as this record gets, and it is derived rather than chosen.',
        },
        cascade: SUPERSESSION.cascade,
        says:
          'The analysis does not move. It goes on saying what it computed, over the population as it stood, which is why the register beside it can say *stale* at all — an analysis that silently re-read its inputs would have nothing to be stale against. What changes is the mark on the output and the reason under it.',
      },
      prospective: {
        kind: 'a finding is dispositioned',
        analysis: 'evaluation-2-sets',
        finding: ms.id,
        state: ms.state,
        results: ms.results,
        qualifier: ms.qualifier,
        question: ms.decision.question,
        options: ms.decision.options.filter((o) => o.available).map((o) => ({ label: o.label, writes: o.writes })),
        ruledOut: ms.decision.options.filter((o) => !o.available).length,
        says:
          `Nothing has moved yet, so this limb is **argued and not demonstrated** — and it cannot be demonstrated without a disposition nobody has taken. What it would do is on the finding already: ${ms.decision.options.filter((o) => o.available).length} ways out are open, they write the letter on ${ms.results} results or on one, and neither of them reaches back into an analysis that has already run. The analysis would go on reporting *proposed, unapplied, basis not chosen*, and the output would carry the mark that says its quality state has moved since.`,
      },
    };
  })();

  /* ================================================================ *
   * D10 — decided 3 September 2026, implemented here
   * ================================================================ */
  const d10 = () => {
    const inside = V.insideAnyway;
    const spike = QAQC.find((q) => q.id === 'MS-1');
    const zincRow = CROSSTAB.find((r) => r.analyte === 'Zinc (filtered)');
    const zincCells = zincRow.cells.map((c, i) => ({ analyte: zincRow.analyte, location: CROSSTAB_COLUMNS[i], cell: c }));
    const acc = V.accounting(zincCells);
    return {
      ...inside,
      /* The two counts, and the reason they are two rather than one. */
      register: { n: spike.results, of: 'results in analytical batch ' + spike.scope.split(' · ')[0], from: 'qualifiers' },
      grid: { n: acc.included.length, of: `zinc cells in ${ROUND.code} that hold a result`, from: 'crosstab' },
      reconcilable: false,
      whyNot:
        'No grid cell carries a qualifier channel — wave 19 measured 0 of 77 — so the nine cannot be located as cells and the six cannot be looked up as batch results. Saying “nine of the sixty-one” would be the fabrication, not the harder truth.',
      onThePlate:
        'Every surface that draws this population states that some of its members carry a qualifier that is proposed and has not been applied, names the count the register holds, and names the count it does not have. A population that dropped them would be asserting the decision; one that included them silently would be hiding it.',
    };
  };

  /* ================================================================ *
   * What this wave moved
   * ================================================================ */
  const moved = () => {
    const src = analysesSources();
    const f = ions.facies.measured;
    const st = ions.strengthClaim;
    return [
      { what: '§9.5’s analytical-settings link', was: was.settings, now: `${composed.length} analyses composed of the ${analyses.length} the record names`, at: 'analysis',
        why: 'Wave 19 built the dataset the chain starts at and wave 20 the explorer over it. The chain’s middle term was the one with no object, so an output could name a method and resolve to nothing.' },
      { what: 'What a report item’s source resolves to', was: was.sourceResolves, now: `${src.resolves} of the ${src.total} — ${src.dataset} to a dataset and ${src.resolves - src.dataset} to an analysis`, at: 'report-figures',
        why: `The wave-18 sentence said the rest “name a run, a fit or a worker, and stay text because there is nothing to open”. ${src.resolves - src.dataset} of them have something to open now, and the ${src.unresolved.length} that still do not say which of the fields they cannot fill and why.` },
      { what: 'What `#hydrochem` says about the population its plates draw', was: was.hydrochemPopulation, now: `${ions.rows.length} of ${ions.onGrid.length} bores · ${ions.results} ion results · ${ions.excluded.length} excluded and named · ${ions.perSample} conversions per sample`, at: 'hydrochem',
        why: '§9.3’s second sentence asks for the input population, the excluded records, the unit conversions, the charge-balance result and the symbolisation logic. Four of the five are arithmetic or inventory over records this file already holds.' },
      { what: 'The water type assigned to six bores', was: was.faciesClaim, now: `no type assigned — ${f.cationMajority} of ${f.bores} bores hold${f.cationMajority === 1 ? 's' : ''} a majority cation and at ${f.notCalcium.length} the largest is not calcium`, at: 'hydrochem',
        why: 'Measured against the ion table the plates are drawn from. So the sentence is withdrawn and the composition is drawn in its place: a facies **name** needs a classification scheme, and this instance holds none.' },
      { what: 'MW05’s ionic strength against the other bores', was: was.faciesTail, now: `${st.meanRatio}× the mean of the other ${st.ratios.length}, from ${st.highest.times.toFixed(2)}× to ${st.lowest.times.toFixed(2)}×`, at: 'hydrochem',
        why: 'Recomputed as ½ Σ mᵢzᵢ² from the same ions. *Four times* is true of no bore in the table, and MW05 is less than twice the strength of the nearest one.' },
      { what: 'The promise `#result-detail` makes to `#statistics`', was: was.summaryTable, now: `kept — ${summary.rows.length} statistics over the population the trend runs on`, at: 'statistics',
        why: 'A link pointing at nothing. It is kept rather than withdrawn, because every measure it needs is an order statistic or a count over a population the record already holds.' },
      { what: '§9.4’s five measures with no surface', was: was.absentMeasures, now: `${summary.supplied.length} supplied · ${summary.percentiles.length} percentiles with the convention stated`, at: 'statistics',
        why: 'Detection frequency appeared once in the repository and never as a measure, and it is the one that makes the population disagreement impossible to read past.' },
      { what: 'How `#statistics` describes its own population', was: was.statisticsPopulation, now: `${readings.length} readings drawn, giving ${new Set(readings.map((r) => r.censored)).size} answers about how many of the ${SERIES.length} are censored`, at: 'statistics',
        why: 'The sentence was rendered on the face and the array behind it holds no censored value. The screen states the disagreement rather than choosing, and runs its statistics over the exported record because §10 of the brief makes the seed the single source.' },
      { what: 'Where `#background`’s percentiles come from', was: was.percentileProvenance, now: `counted absent — ${BACKGROUND.rows.length} typed percentiles against ${summary.percentiles.length} computed on a population this catalogue holds`, at: 'background',
        why: 'The caution names 42 reference results with two censored and the record holds no reference distribution at all, so nothing recomputes them. Counted as an absence with what would close it.' },
    ];
  };

  return {
    analyses, of, composed, was,
    MEASURES, FORMS,
    readings, recount, summary, ions,
    findingsFor, kindOf,
    /**
     * Which analyses read a given value — §15's chain from the result's end,
     * one link further along than the dataset hop wave 19 added.
     *
     * Derived from each analysis's own population rather than listed: an
     * analysis contains a value when its analyte is one the analysis reads and
     * its location is one the analysis runs over. An analysis that widened its
     * population would gain the value without anybody editing this.
     */
    membershipOf: ({ location, analyte }) => composed.map((a) => ({
      analysis: a,
      in: a.analytes.includes(analyte) && a.locations.includes(location),
      why: !a.analytes.includes(analyte)
        ? `It reads ${a.analytes.length} analyte${a.analytes.length === 1 ? '' : 's'} and ${analyte} is not among them.`
        : !a.locations.includes(location)
          ? `It reads ${analyte} and runs at ${a.locations.join(', ')}, not at ${location}.`
          : `It reads ${analyte} and runs at ${location}.`,
    })),
    get d10() { return d10(); },
    drift,
    /** Every report item's source, classified — the §9.5 measurement. */
    get sources() { return analysesSources(); },
    /** The counts the faces render, so none of them is typed. */
    get counts() {
      return {
        analyses: analyses.length,
        composed: composed.length,
        uncomposed: analyses.length - composed.length,
        timed: analyses.filter((a) => a.computedAt).length,
        measures: MEASURES.length,
        forms: FORMS.length,
        supplied: summary.supplied.length,
        readings: readings.length,
        censoredAnswers: new Set(readings.map((r) => r.censored)).size,
        bores: ions.rows.length,
        ionResults: ions.results,
        faciesAssigned: 0,
      };
    },
    get moved() { return moved(); },
    drawnOn: '2026-09-03',
  };
})();

export const VENDOR_BRIEF = (() => {
  /** §3's own ranking, section by section. `build.mjs` checks it against §3. */
  const PRIORITY = {
    4: 'P0', 5: 'P0', 6: 'P0', 7: 'P1', 8: 'P1', 9: 'P1',
    10: 'P1', 11: 'P1', 12: 'P1/P2', 13: 'P2', 14: 'Strategic',
  };

  /** What each capability area is called in §3, for the group headings. */
  const AREAS = {
    4: 'Environmental Data Explorer and Query Builder',
    5: 'GIS and spatial environmental workspace',
    6: 'Sampling and Analysis Planning',
    7: 'Laboratory/EDD configuration and onboarding',
    8: 'QA/QC rule catalogue and validation',
    9: 'Hydrogeological and environmental analysis',
    10: 'Portfolio environmental operations',
    11: 'Configuration governance',
    12: 'Interpretation and reporting',
    13: 'Regulatory criteria management',
    14: 'Multi-domain environmental monitoring',
  };

  /*
   * The rows. `items` is the number of things the subsection enumerates and it
   * is checked against the file rather than counted by eye; `asks` is quoted
   * from the brief verbatim and checked the same way.
   */
  const requirement = [
    { id: '4.2', title: 'Query dimensions', items: 43, verdict: 'partially', decision: 'D1',
      asks: 'The vendor shall show users constructing queries through combinations of the following dimensions.',
      screens: ['explorer', 'crosstab', 'locations', 'exceedances', 'search'],
      note: `Wave 20 measured all {items} against this record, one row each, and the list is closed against §4.2 by the build in both directions and in order. ${EXPLORER.counts.record} are held by a record that is named; ${EXPLORER.counts.derived} resolve only through a derivation, so they cannot be combined with another dimension in one selection; and ${EXPLORER.counts.nothing} — *included or rejected*, and *season* — no record holds at all. The explorer offers a control for the ${EXPLORER.counts.offered} it can and for none it cannot, because a control over nothing is a promise. It stays partial for two reasons the screen states rather than hides: this page is static, so combinations are drawn states and not a working builder, and a suite is a size here and never a membership, so the analyte dimension cannot expand for a dataset that names one. This note read *“a facet exists on some screen for roughly a third of the {items} — the results grid alone carries six”* until 3 September 2026; the six controls in fact reached ${EXPLORER.counts.onGrid} dimensions, because the location options are areas and *Show* selects on detection status and on exceedance.` },
    { id: '4.3', title: 'Query interaction', verdict: 'partially', decision: 'D1',
      asks: 'The mockup must demonstrate progressive query construction and show how the resulting population changes as filters are applied.',
      screens: ['explorer', 'saved-views', 'crosstab'],
      note: `All three clauses are now drawn and the row stays partial on the fourth. Progressive construction is ${EXPLORER.counts.steps} **drawn states**, each with its own readout of locations, samples and results and its own count of what left and why per kind — this catalogue is static HTML, so a sequence is what §17 asks a mockup for and the screen says that in its first sentence rather than implying a live filter. The required scenario is walked as far as the record allows: of its ${EXPLORER.counts.terms} terms ${EXPLORER.counts.expressible} are expressible as written, ${EXPLORER.counts.equivalent} are walked through the site's own equivalent and named as substitutions, and ${EXPLORER.counts.notExpressible} — *rejected data excluded* — is not expressible at all, because no record here holds *rejected*. **It cannot be run, and that is the finding**: there is no manganese in the dictionary and no Unit C in this project's hydrostratigraphy, and seeding either to make an example runnable is the trade this catalogue has refused six times. One term is expressible and empties the population — nothing in ${ROUND.code} has been validated — which the screen draws as an empty state that says why rather than as an empty grid. This note said *"six of its eight terms have no facet anywhere"* until 3 September 2026; measured term by term, ${EXPLORER.counts.expressible + EXPLORER.counts.equivalent} of the ${EXPLORER.counts.terms} can be walked.` },
    { id: '4.4', title: 'Result representations', items: 6, verdict: 'partially', decision: 'D1',
      asks: 'Without rebuilding the query, users must be able to move between:',
      screens: ['explorer', 'crosstab', 'hydrograph', 'statistics', 'map', 'exceedances'],
      note: `Five of the {items} exist as screens and they land on ${EXPLORER.counts.screens}, because a flat result table and a crosstab are two representations of one grid here; the sixth, summary statistics, has no surface at all — the statistics screen holds trend tests and no summary statistics. Wave 20 drew all {items} over one population on the explorer, with ${EXPLORER.counts.drawable} drawable over it and the time series honestly not, because a population that is one round has nothing to plot. And the ${EXPLORER.own.length} that have a screen now **state the population each ran over**, which none of them did before — wave 19 measured the word at zero occurrences on two of them. The row stays partial on the clause it turns on: **naming a population is not sharing one**. Each of the ${EXPLORER.own.length} lines is that screen's own selection and no two inherit, so moving between them is still rebuilding the question.` },
    { id: '4.5', title: 'Saved queries and governed datasets', items: 7, verdict: 'partially', decision: 'D1',
      asks: 'A saved query or dataset used by an analysis, figure, interpretation or report must retain lineage to the exact query definition and relevant version.',
      screens: ['saved-views', 'crosstab', 'report-figures'],
      note: 'Wave 19 promoted the view into the object: a purpose that had been in the record and on no face, the definition as four inspectable dimensions each naming the record it resolves through, a version and a lifecycle counted off the acts recorded against each dataset rather than typed, a variant that names its parent and costs the original nothing, and a citation bound to a version with the derivation naming its own limit. Six of the {items} are drawn. The seventh is refused: the record names one person per dataset in one capacity — *used by*, which is the only header that field ever carried — and neither a creator nor a current owner is recorded anywhere, so both are drawn as fields and neither is filled from the other. The brief’s four states are also two axes, and the screen draws them apart rather than as one strip.' },

    { id: '5.1', title: 'Gap', verdict: 'missing', decision: 'D4',
      asks: 'Mapping must become a scientific investigation workspace, not simply another way of displaying monitoring locations.',
      screens: ['map'],
      note: 'Two static plates. No layer list, no toggle, no symbology control, no time control and no selection. D4 accepts the workspace and restates NG4 as “no GIS authoring” — the map consumes layers and never authors them — and wave 23 builds it.' },
    { id: '5.2', title: 'Required environmental layers', items: 14, verdict: 'partially', decision: 'D4',
      asks: 'The interface must clearly identify active layers, legends, source, date or version where relevant, and whether a layer is project-supplied, derived or authoritative.',
      screens: ['map', 'locations'],
      note: 'Three of the {items} are drawn and exactly one meets the standard: the fitted potentiometric surface states its method, its control set, its largest residual and the confined bore it excludes. There is no layer list, so nothing else states a source, a date, or whether it is project-supplied, derived or authoritative.' },
    { id: '5.3', title: 'Environmental symbology', items: 7, verdict: 'missing', decision: 'D4',
      asks: 'Users must be able to colour or symbolise locations by:',
      screens: ['map'],
      note: 'One fixed symbology, no control, none of the seven dimensions selectable. The second sentence — how the analyte, criterion, period, units, non-detect treatment and classification method change the map — has nowhere to be asked.' },
    { id: '5.4', title: 'Temporal analysis', verdict: 'missing', decision: 'D4',
      asks: 'The user must not need to rebuild the map for each period.',
      screens: ['map'],
      note: 'One period, drawn once, with no round control. The vocabulary for the harder half exists elsewhere and is good — on the grid an unsampled bore is a column carrying a disposition and a glyph rather than a blank — so what wave 23 has to move is the control, not the concept.' },
    { id: '5.5', title: 'Location investigation', items: 9, verdict: 'partially', decision: 'D4',
      asks: 'Selecting a bore or location must expose relevant scientific context without unnecessarily leaving the spatial investigation:',
      screens: ['location', 'map', 'hydrograph', 'documents'],
      note: 'Every one of the {items} exists, and the bore record is one of the strongest screens here — construction, screened interval read vertically as a nest, elevation, recent samples, exceedances, hydrograph, QA/QC state, attachments. Reaching any of them leaves the map, which is the clause the requirement turns on.' },
    { id: '5.6', title: 'Spatial selection and hand-off', verdict: 'missing', decision: 'D4',
      asks: 'The relationship between Map ↔ Data Explorer ↔ Analysis is mandatory.',
      screens: ['map', 'crosstab'],
      note: 'The map has no selection, so the hand-off has no subject — and two of the three workspaces the relationship names do not exist. Scenario D breaks precisely here.' },

    { id: '6.1', title: 'Gap', verdict: 'partially',
      asks: 'Strataflow must demonstrate not only the recording of samples, but the management of the intended monitoring programme and confirmation that it was executed correctly.',
      screens: ['programme', 'events', 'field-capture'],
      note: 'Recording is the catalogue’s strongest ground and the round confirms itself — a completion control that refuses and names the three lines holding it. The intended programme is a record to read; nothing shows it being managed.' },
    { id: '6.2', title: 'Monitoring programme definition', items: 10, verdict: 'partially',
      asks: 'The mockup must show recurring requirements, one-off exceptions, temporary location changes and versioned programme amendments.',
      screens: ['programme', 'events'],
      note: 'The programme states its locations, frequency, matrices, suites, laboratory and responsible party, and a TARP-escalated monthly programme runs beside the quarterly one. Nothing shows a programme being defined, versioned or amended, and neither the one-off exception nor the temporary location change has a record.' },
    { id: '6.3', title: 'Sampling event preparation', items: 10, verdict: 'partially',
      asks: 'For every location, the scientist must understand what is to be collected, including:',
      screens: ['events', 'field-capture', 'ecoc', 'receipt'],
      note: 'The round’s manifest carries samples, suites, tests, containers and the QA samples, and the chain of custody carries the preservation and the seals. What is not drawn is the generation — expected work produced *from the programme* — so the distinction the requirement asks for between a programme requirement, an event amendment and a field decision is not available to be drawn.' },
    { id: '6.4', title: 'Planned-versus-actual completeness workflow', items: 10, verdict: 'partially',
      asks: 'This must be an actionable monitoring-completeness workflow, not merely a status table.',
      screens: ['programme', 'field-capture', 'receipt', 'imports', 'crosstab'],
      note: 'Six stages, six sound hand-offs, six different screens, and nowhere a reconciliation: the completeness record is three columns wide and submitted, analysed and validated are absent. The exception vocabulary is fully satisfied — MW11 dry with two visits kept as two records, and a nitrate clock that runs from collection where a holding time measured from receipt would have called it compliant.' },

    { id: '7.1', title: 'Gap', verdict: 'partially',
      asks: 'the mockup must demonstrate how organisations manage different laboratories, historical consultant files and changing EDD formats.',
      screens: ['formats', 'mapping-profiles', 'imports', 'migration'],
      note: 'The historical consultant file is drawn end to end, with the reconciliation that proves it landed. There is no laboratory object at all — a laboratory is a string on a format, a batch and a certificate — so “manage different laboratories” has no subject to manage.' },
    { id: '7.2', title: 'Required onboarding workflow', verdict: 'missing',
      asks: 'New laboratory or format → define/import structure → map fields → validate → preview → resolve issues → test → review → save reusable format',
      screens: ['formats', 'import-review'],
      note: 'Nine steps. The format screen holds definitions in force rather than authoring: no structure import, no test run, no preview, no review, no save-as-reusable. Two of the nine are drawn well and for the wrong object — mapping and resolving happen on a run, not on a format being onboarded.' },
    { id: '7.3', title: 'Environmental field mapping', items: 15, verdict: 'partially',
      asks: 'The user must be able to see the source field, mapped Strataflow field, transformation or reference-data mapping, validation state and example value.',
      screens: ['mapping-profiles', 'import-review', 'formats'],
      note: 'The learned entries carry source, target, kind, who learned it, its own version and its use count; the exception review carries the row, the file, the confidence and the proposal. The five properties are spread across two screens and no row carries all five.' },
    { id: '7.4', title: 'Problem and exception handling', items: 9, verdict: 'partially',
      asks: 'The system must not imply that scientifically material transformations occur silently.',
      screens: ['import-review', 'quarantine', 'imports'],
      note: 'Two measurements and both are real. The *resolution* meets §2 outright — confidence per question, rows at stake summing to the header count, “if you accept” stating the downstream, a held row where the screen refuses to offer an accept control, and an “applied without asking — and why” table naming the basis and row count for each. Of the {items} problem types the brief asks to be deliberately included, four are demonstrated and five are not.' },
    { id: '7.5', title: 'Mapping-profile governance', items: 7, verdict: 'partially',
      asks: 'The mockup must show which mapping version was used for a particular import and which transformations affected a selected result.',
      screens: ['mapping-profiles', 'imports', 'lineage'],
      note: 'The second half is answered and answered from the bore: lineage names the transformation that reached a value. The first is not. A profile has a laboratory and a state and no name, no description, no profile version and no approver — and no import run names the version it ran under.' },

    { id: '8.1', title: 'Gap and design constraint', verdict: 'partially',
      asks: 'The vendor must not redesign its fundamental model.',
      screens: ['qc', 'qc-limits'],
      note: 'The constraint is honoured: the decision layer is untouched, and waves 16 and 17 extended it — a matrix dimension on the objectives, a scheme and an origin on the qualifiers — rather than replacing anything. The second half, that the model accommodates the breadth of practice, is §8.2’s measurement and it stands at 13 of the 22 rules §8.2 lists.' },
    { id: '8.2', title: 'Rule catalogue coverage', items: 22, verdict: 'partially',
      asks: 'The design objective is a coherent catalogue and configuration model capable of representing this breadth.',
      screens: ['qc', 'qc-limits', 'batches', 'consistency', 'dqa', 'purge', 'quarantine'],
      note: '13 of the {items} are governed by a rule with a version, an acceptance limit and now a matrix. Holding time and preservation — the two with the sharpest consequences, and both drawn as findings — sit outside the governed set, so the catalogue judges them without configuring them.' },
    { id: '8.3', title: 'Rule context', items: 10, verdict: 'partially',
      asks: 'A rule must visibly identify:',
      screens: ['qc-limits', 'qc'],
      note: 'Four are declared: what it evaluates, its acceptance range, its applicable matrix and its version, each with an effective date. Severity, analyte group, method, and whether automatic disposition is permitted are read off an absence rather than stated — which is the difference between a rule that says what it is and one a reader infers.' },
    { id: '8.4', title: 'Professional judgement workflow', verdict: 'covered',
      asks: 'Automated finding → evidence → scientist review → disposition → qualifier → rationale → downstream consequence',
      screens: ['qc', 'qualifiers', 'result-detail', 'lineage'],
      note: 'The workflow §2’s standard was written for. Each finding carries the question in a hydrogeologist’s words, the evidence, and an options table stating the propagation basis, what each option writes and whether it is available on this evidence — two options refused with the reason, plus an explicitly refused course — and wave 17 added which vocabulary each qualifier is drawn from and who asserted it.' },

    { id: '9.1', title: 'Gap', verdict: 'partially',
      asks: 'The mockup must demonstrate a coherent Analysis workspace.',
      screens: ['analysis', 'statistics', 'hydrochem', 'background', 'hydrograph'],
      note: `An analysis is an object now: ${ANALYSES.counts.composed} of the ${ANALYSES.counts.analyses} the record names are composed, each with the dataset it read, its method and version, its parameters one row at a time, its population through the same accounting the dataset register counts with, its members’ QA/QC state, its output and what depends on it. This row read *missing* until 3 September 2026 and it moves one step and not two: **there is a register and there is no workspace**. Nothing constructs an analysis, re-runs one under a changed parameter, or previews what that would move — and ${ANALYSES.counts.uncomposed} of the sources that name a method compose nowhere at all, the sharpest being the potentiometric fit, whose method, control set and residual live inside the module that draws the plate.` },
    { id: '9.2', title: 'Groundwater-level analysis', items: 8, verdict: 'covered',
      asks: 'The design must expose datum, units, bore reference elevation, measurement status, temporal alignment and relevant exclusions.',
      screens: ['hydrograph', 'map', 'logger-series', 'location'],
      note: 'All {items}, at the standard: elevation derived through the survey in force at each measurement date, the resurvey drawn as a ruled and named step, the gradient by planar fit with its residual printed and its exclusion argued, and a dry bore drawn as a break rather than as a line through it.' },
    { id: '9.3', title: 'Hydrochemistry', items: 7, verdict: 'partially',
      asks: 'The user must be able to inspect the input population, excluded records, unit conversions, charge-balance result and grouping or symbolisation logic.',
      screens: ['hydrochem', 'consistency'],
      note: `Piper, Stiff and Schoeller are drawn, and the ionic balance is computed from the ions rather than stated. Durov is approved (D2) and gated on the print test (D13) with every other figure family. The second sentence is where this row now turns, and four of its five clauses landed on 3 September 2026: the input population is counted (${ANALYSES.ions.rows.length} of the ${ANALYSES.ions.onGrid.length} bores on the round’s grid, ${ANALYSES.ions.results} ion results), the excluded record is named rather than dropped, every ion is shown in meq/L and in mg/L per sample, and the charge-balance result is a table of the three checks rather than a caption. **The fifth is refused by the record**: the grouping and symbolisation logic is written inside the module that draws the plate, so it is present and not inspectable. This note read *“no population, no exclusions, no unit conversions and no table view — the screen renders a tenth of what the hydrograph does”* until that date. One thing left the screen too: it asserted a calcium-bicarbonate water type for five bores, and measured against the ion table the plates are drawn from, ${ANALYSES.ions.facies.measured.cationMajority} of the ${ANALYSES.ions.facies.measured.bores} holds a majority cation. A facies **name** needs a classification scheme and this instance holds none, so the composition is drawn and no type is assigned.` },
    { id: '9.4', title: 'Trend and statistical analysis', items: 10, verdict: 'partially',
      asks: 'A graph without an inspectable underlying population is inconsistent with Strataflow’s defensibility proposition.',
      screens: ['statistics', 'background'],
      note: `All {items} have a surface as of 3 September 2026. Five were already drawn at the standard — Mann-Kendall, Sen’s slope, seasonal comparison, censored treatment and background comparison, with non-detects entering as tied values and never substituted, and both tests reported rather than the one with the smaller p-value. The other five are supplied now: ${ANALYSES.summary.rows.length} statistics and ${ANALYSES.summary.percentiles.length} percentiles over a named population, each with the convention it is computed under, and **detection frequency, which appeared twice in this repository before this wave — in this note and in the brief — and never as a measure**. This note read *“Summary statistics, percentiles, minima and maxima, detection frequency and exceedance frequency have no surface at all”* until that date. It stays partial on two clauses the requirement turns on. **Grouping is not exposed** — there is no control that groups a population by anything. And making the population inspectable found that it is ${ANALYSES.counts.readings} populations: five readings of *arsenic at MW05* give ${ANALYSES.counts.censoredAnswers} different answers about how many of its values are non-detects, so the mean and the minimum are drawn with the condition they hold under rather than as settled numbers.` },
    { id: '9.5', title: 'Analysis lineage', verdict: 'partially',
      asks: 'Query → included observations/results → QA/QC state → analytical settings → output',
      screens: ['lineage', 'saved-views', 'report-figures'],
      note: `All five links exist as of 3 September 2026 and this row read *missing* three days earlier. The provenance chain runs result → dataset → analysis, ${ANALYSES.composed.reduce((n, a) => n + a.parameters.length, 0)} analytical settings are held on ${ANALYSES.counts.composed} analyses, and an output resolves back: ${ANALYSES.sources.resolves} of the ${ANALYSES.sources.total} report items open the record their source names, against 2 before. This note said *“analytical settings have nowhere to live until wave 21 builds the analysis object”* until then. It stays partial on the third link and on the traversal. **QA/QC state is matched by reading a finding’s own prose**, because no result carries a qualifier channel at all — 0 of the 77 grid cells — so an analysis can say which findings governed its population and not which of its members each one reached. And **one analysis in the instance records when it ran**; the frozen state the requirement asks for is drawn as a field with the two acts that would move it beside it, one realised and one prospective, rather than filled from a timestamp the record does not hold.` },

    { id: '10.1', title: 'Gap', verdict: 'partially',
      asks: 'The mockup must demonstrate how a senior environmental manager works across many projects and sites, rather than one dataset at a time.',
      screens: ['obligations', 'projects', 'project-home'],
      note: 'Two projects, and the oldest thing owed on the estate belongs to the one whose workspace is deliberately not drawn — which is what a portfolio actually looks like and is drawn as such rather than smoothed over.' },
    { id: '10.2', title: 'Portfolio context', items: 6, verdict: 'partially',
      asks: 'The hierarchy and current filter context must be apparent.',
      screens: ['projects', 'obligations', 'project-home'],
      note: 'Four of the {items} — projects, sites, programmes and rounds. There is no organisation or client tier and that is a deployment fact rather than a missing screen: the instance is single-tenant by DR-1, and D8 answers it as a client label on a project rather than as a tier. Environmental domain as a portfolio dimension does not exist.' },
    { id: '10.3', title: 'Environmental work queue', items: 19, verdict: 'partially',
      asks: 'What environmental work requires attention today, why, and what happens if it is not resolved?',
      screens: ['home', 'obligations', 'qc', 'import-review', 'exceedances'],
      note: 'All nine kinds of work are identifiable and the queue answers the question in the requirement’s own words, with assignment as a thread hanging off the exceedance. Seven of the ten filters have no data behind them — a row carries kind, urgency, headline, context, project, age, target and action and nothing else — reassignment has no target picker and dependency is prose. D7 promotes the queue to its own screen in wave 30 and keeps “/” a project list.' },

    { id: '11.1', title: 'Gap', verdict: 'partially',
      asks: 'Environmental configuration must have explicit scope, inheritance and lifecycle.',
      screens: ['criteria', 'qc-limits', 'project-settings', 'package'],
      note: 'Scope and version are explicit on every configuration object, and the package screen carries them between deployments. Inheritance does not exist here as a concept at all.' },
    { id: '11.2', title: 'Configuration hierarchy', items: 7, verdict: 'partially',
      asks: 'The user must be able to distinguish an inherited value, an overridden value and a locally created value, and understand the consequence of a proposed change.',
      screens: ['criteria', 'qc-limits', 'project-settings', 'mapping-profiles', 'package', 'programme', 'exceedances'],
      note: 'The second clause is the best thing the catalogue does with configuration: seven screens compute what a proposed change would reach before the control that makes it — results re-derived, evaluations recomputed, issued reports flagged stale and not rewritten, historical evaluations untouched, and reversibility stated either way. The first clause has nothing behind it: no organisation → client → project → programme chain, and no value marked inherited, overridden or local.' },
    { id: '11.3', title: 'Configuration lifecycle', items: 9, verdict: 'partially',
      asks: 'Draft → Review → Approved → Effective → Superseded',
      screens: ['criteria', 'qc-limits', 'licence', 'submissions', 'package'],
      note: 'Effective, superseded and historically applicable are drawn to the byte — the window and the criterion in force at each round frozen onto the outcome, and version diffs that draw identical items rather than dropping them. Review, rejected and returned-for-revision exist on no configuration item anywhere; draft does, and a future-effective version is a draft with a date.' },

    { id: '12.1', title: 'Gap and design intent', verdict: 'covered',
      asks: 'The existing Interpretation Editor is strategically strong and must be expanded rather than replaced with generic word-processing functionality.',
      screens: ['narrative'],
      note: 'Honoured. The editor was rebuilt to a practitioner’s finding — evidence for the inference rather than evidence for the citations — and carries no word processor: the software does not score the inference, does not rewrite the prose, and does not flag a sentence for a change a reader could not see. The same practitioner has not seen what replaced it.' },
    { id: '12.2', title: 'Interpretation object', items: 10, verdict: 'partially',
      asks: 'The interface must distinguish evidence, the scientist’s interpretation, uncertainty, limitations and recommended action.',
      screens: ['narrative', 'lineage', 'report-figures', 'exceedances'],
      note: 'Eight of the {items} can be referenced. The clause “because neither object exists yet” stood until 3 September 2026: the governed dataset exists now, and the count does not move, because no interpretation tile cites one — an object existing and an interpretation being able to reference it are two things and only the first has been built. Statistics and analyses still have no object at all. Evidence, interpretation and uncertainty are distinguished and each tile says what it does *not* settle; recommended action has no object and there is no recommendations register.' },
    { id: '12.3', title: 'Managed figures and tables', items: 9, verdict: 'covered',
      asks: 'The user must be able to inspect how a figure or table was generated and identify whether it is current, stale or affected by changed evidence.',
      screens: ['report-figures', 'narrative', 'snapshot'],
      note: 'All {items}, plus the distinction that carries them: a figure being out of date and a figure having changed under an author are two findings on two screens. Numbering computed from position and scoped to the template version, every cross-reference resolved with dangling detection, a source naming a dataset that resolves to it, and — since wave 19 — that source bound to a version, a second staleness channel that reads zero because no dataset has moved, and the citation checked against the definition it names rather than trusted for resolving.' },
    { id: '12.4', title: 'Review and publication workflow', verdict: 'partially',
      asks: 'Reviewers must be able to comment on specific interpretations, evidence links, figures and findings.',
      screens: ['signoff', 'snapshot', 'supersession', 'narrative'],
      note: 'Draft, approval and publication are drawn with three signing capacities, a digest and exactly what each signature covered; and the change-impact half is answered outright — the cascade withdraws an exceedance and a trigger state, flags the report section, and the snapshot reports the difference value by value. Technical review and revisions are not drawn: there is no comment machinery anywhere in this catalogue and no interpretation review state.' },

    { id: '13.1', title: 'Gap', verdict: 'partially',
      asks: 'Criteria must be treated as governed environmental information, not simply threshold numbers.',
      screens: ['criteria', 'hardness', 'background'],
      note: 'The *set* is governed to the standard — version, effective span, matrix, applicability, and a change whose reach is computed before it is made. The criterion is not an object here, so the governance stops one level above the thing the requirement names.' },
    { id: '13.2', title: 'Criterion information model', items: 13, verdict: 'partially',
      asks: 'A criterion must contain:',
      screens: ['criteria', 'hardness', 'qualifiers'],
      note: `The library is a register of sets: jurisdiction, issuing authority, source document and criterion type are fields nowhere, value and unit live on the results grid rather than on a criterion, and the ${CRITERIA_LIBRARY.find((x) => x.set.startsWith('ANZG 2018') && x.state === 'active').analytes} analytes inside the active ANZG 2018 set cannot be browsed. The second sentence is answered better than it asks — the hardness dependency shows its relationship, its cap, what the cap costs and a cross-check against calcium and magnesium.` },
    { id: '13.3', title: 'Project application', items: 6, verdict: 'partially',
      asks: 'Which criteria apply here, to which data, and why?',
      screens: ['criteria', 'licence', 'background', 'tarp', 'exceedances'],
      note: 'Five of the {items} kinds have a screen that owns them, and the question is answered per set, per matrix and per location class, with concurrent outcomes kept apart rather than merged into one. A conflict between two potentially applicable criteria has no surface — this catalogue draws concurrency instead, deliberately, and says so.' },
    { id: '13.4', title: 'Historical defensibility', verdict: 'partially',
      asks: 'The original and current assessments must remain distinguishable and traceable.',
      screens: ['snapshot', 'supersession', 'criteria', 'exceedances'],
      note: 'Answered in one direction and unanswered in the other. That a change never reaches backwards is enforced rather than promised — the criterion in force frozen onto the outcome, a locked period refusing the write, an issued report flagged stale and not rewritten. There is no surface for asking the second question on purpose: under the current criterion, how would this have been assessed?' },

    { id: '14.1', title: 'Objective', verdict: 'partially', decision: 'D5',
      asks: 'The mockup must demonstrate that its product concept can evolve into a broader environmental monitoring and evidence-management platform without creating a disconnected application for every discipline.',
      screens: ['locations', 'composite', 'logger-series', 'stygofauna', 'water'],
      note: 'Five domains beyond groundwater chemistry are drawn on the catalogue’s own screens rather than in modules of their own, and every one is labelled S8 widening — which is what keeps a drawing from reading as a schedule.' },
    { id: '14.2', title: 'Domains to demonstrate', items: 37, verdict: 'partially', decision: 'D5 · D6',
      asks: 'At minimum, the information architecture must visibly accommodate:',
      screens: ['locations', 'location', 'composite', 'crosstab', 'logger-series', 'hydrograph'],
      note: 'Groundwater is complete. Soil and sediment are drawn and cannot be *evaluated*: no set in the library carries a soil or sediment matrix, which needs a source rather than a design, and D3 supplies NEPM 2013 at commercial/industrial land use for wave 25. Surface water is a round and a location with no detail state. Air, dust, noise and meteorology have no record — rainfall exists only as an overlay with no location and no lineage. Noise is the one domain with no PRD warrant: NG5 refuses noise *modelling*, and D6 draws monitoring while saying so on the screen.' },
    { id: '14.3', title: 'Common environmental model', verdict: 'missing', decision: 'D5',
      asks: 'The mockup must communicate that these domains are governed variations of a common conceptual model:',
      screens: [],
      note: 'The chain is honoured screen by screen and stated on none of them. What the requirement asks for is the statement itself, and that is a screen this catalogue does not have. Wave 24a, under D9’s constraint: one criterion object at different settings, with a finding always rendering which kind of assertion produced it.' },
    { id: '14.4', title: 'Domain-specific scientific context', items: 6, verdict: 'partially', decision: 'D5',
      asks: 'common governance with domain-specific scientific behaviour',
      screens: ['location', 'composite', 'crosstab'],
      note: 'Where a domain has a record the specialist context is better than the requirement asks: bore construction and screened intervals read vertically as a nest, soil depth intervals with a composite’s increment positions both ways, and a sediment sample refused a soil background because the comparison would cross matrices. Three of the {items} examples name domains with no record at all.' },
  ];

  const lineage = [
    { id: 'L1', verdict: 'covered', screens: ['lineage', 'result-detail', 'certificate', 'imports'],
      asks: 'Where did this information come from?',
      note: 'The chain begins at the bore rather than at the deliverable — a practitioner’s correction, answered — and runs through the sample, the container, the file, the row and the certificate.' },
    { id: 'L2', verdict: 'covered', screens: ['hardness', 'qc', 'criteria', 'consistency'],
      asks: 'What transformation or scientific decision produced it?',
      note: 'The hardness-modified criterion shows its equation, its cap and what the cap costs; the non-detect rule shows four treatments over the same rows; no value is derived, converted or censored without the rule travelling with it.' },
    { id: 'L3', verdict: 'covered', screens: ['criteria', 'qc-limits', 'snapshot', 'exceedances'],
      asks: 'Which version, rule or criterion applied?',
      note: 'Frozen onto the outcome at evaluation, and recorded on the snapshot the document regenerates under — so a report lodged in 2025 comes back numbered and assessed as it was lodged.' },
    { id: 'L4', verdict: 'covered', screens: ['audit', 'signoff', 'qc', 'qualifiers'],
      asks: 'Who made or approved the decision?',
      note: 'Attribution is a property of the write rather than a field somebody fills, three signing capacities are kept apart, and wave 17 made the asserter of a qualifier explicit — the same letter from two asserters with two different fates.' },
    { id: 'L5', verdict: 'covered', screens: ['qc', 'narrative', 'documents', 'quarantine'],
      asks: 'What rationale and evidence supported it?',
      note: 'The rationale is a field on the decision rather than a comment beside it: the option table records what each choice writes, and the refused options record why they were refused.' },
    { id: 'L6', verdict: 'partially', screens: ['supersession', 'snapshot', 'report-figures', 'lineage', 'saved-views'],
      asks: 'Which downstream outputs depend on it?',
      note: 'Forward from a result to the issued document is drawn and computed. Result→query now runs both ways — wave 19’s dataset hop names the populations a value is in, and each population names what cites it — which leaves two of the three one-way hops this note counted until 3 September 2026: query→analysis and analysis→figure, both waiting on the analysis object. Two are still missing entirely: a sampling plan for groundwater, and interpretation→obligation.' },
  ];

  const scenario = [
    { id: 'A', title: 'Scenario A — Routine groundwater monitoring', verdict: 'partially', hops: 10,
      asks: 'Programme → planned round → field collection → laboratory receipt → QA/QC → validated dataset → hydrograph → exceedance → interpretation → report',
      screens: ['programme', 'events', 'field-capture', 'receipt', 'qc', 'validation', 'hydrograph', 'exceedances', 'narrative', 'report'],
      note: 'Walks, in ten hops. It strains where §6.4 does — planned-versus-actual is three columns wide, and submitted, analysed and validated are absent — and the results grid has no edge to the hydrograph, so the reader takes the long way round.' },
    { id: 'B', title: 'Scenario B — Problematic laboratory batch', verdict: 'covered', hops: 10,
      asks: 'EDD received → validation problem → mapping issue → QA/QC failures → scientist review → qualification → affected results → affected figures and interpretation',
      screens: ['imports', 'import-review', 'quarantine', 'qc', 'qualifiers', 'crosstab', 'report-figures', 'narrative'],
      note: 'The catalogue’s best scenario and the one that meets §2 outright, end to end in ten hops, with more than one exception type and each decision’s downstream effect drawn. What it does not carry is the reviewer’s side: the interpretation flags a sentence and offers no comment and no return-for-revision.' },
    { id: 'C', title: 'Scenario C — Historical investigation', verdict: 'partially',
      asks: 'Report → interpretation → figure/table → analytical population → validated result → QA/QC → laboratory result → sample → monitoring event → location',
      screens: ['submissions', 'snapshot', 'report-figures', 'lineage', 'result-detail', 'qc', 'certificate', 'events', 'location'],
      note: 'From the figure downward it is excellent and exposes the versions, decisions and actors the scenario asks for. It breaks at the top, twice: there is no route from an issued report to the result rows it stands on, and the figure register’s source cell was text — half of which this wave fixed, for the items that name a saved view. Wave 31 closes the rest.' },
    { id: 'D', title: 'Scenario D — Emerging groundwater issue', verdict: 'partially',
      asks: 'The scientist must maintain project, time, spatial and analyte context as they move between workspaces.',
      screens: ['obligations', 'exceedances', 'location', 'map', 'crosstab', 'statistics', 'hydrograph', 'narrative', 'tarp'],
      note: 'Both ends work and the middle carries no context. The map has no selection, so “surrounding bores → Data Explorer” cannot be expressed at all, and the interpretation reaches no obligation surface. Wave 23 gives the map a selection and wave 29 the interpretation→obligation hop; the walk needs both.' },
    { id: 'E', title: 'Scenario E — Multi-domain investigation', verdict: 'missing',
      asks: 'Elevated groundwater concentration + nearby surface-water monitoring + rainfall event',
      screens: ['locations', 'crosstab', 'hydrograph'],
      note: 'Not walkable. It breaks at the first cross-domain hop: the surface-water location has no detail state, its round is a row with no manifest, and rainfall is a panel on a hydrograph with no record, no location and no lineage. Wave 24a makes it walkable with two domain records rather than four.' },
  ];

  const state = [
    { id: 'S1', verdict: 'covered', screens: ['data-states', 'quarantine', 'exceedances'],
      asks: 'Initial or empty state',
      note: 'Two kinds of empty, drawn as two: a finished queue and an unstarted register are different sentences and the catalogue refuses to write one for both.' },
    { id: 'S2', verdict: 'covered', screens: ['crosstab', 'locations', 'exceedances', 'imports'],
      asks: 'Populated working state',
      note: 'Grid-dense, on the product’s own tokens — the state every register here is drawn in first.' },
    { id: 'S3', verdict: 'partially', screens: ['explorer', 'locations', 'crosstab', 'qc'],
      asks: 'Filtered or selected state',
      note: `Drawn as states rather than performed, and since wave 20 as a **sequence** of them: ${EXPLORER.counts.steps} drawn states, each with its own population readout and its own count of what left and why. The filter bar with its chips and the dataset it started from is on the explorer now — D11 took it off the results grid, which states the population it was handed instead — and the selection bar, whose every action names its scope, is where it was. The catalogue is static by construction, so what §4.3 asks to be demonstrated is a sequence of drawn states, and the screen says that in its own first sentence rather than letting a reader infer an interaction.` },
    { id: 'S4', verdict: 'covered', screens: ['data-states', 'imports', 'documents'],
      asks: 'Loading or processing state where user understanding depends on it',
      note: 'Determinate, with bytes and a time. An indeterminate spinner cannot be told from a dead connection on a site link, which is the condition this product is used in.' },
    { id: 'S5', verdict: 'covered', screens: ['import-review', 'validation', 'consistency'],
      asks: 'Warning and validation state',
      note: 'Every warning names the rule it came from and what happens if it is cleared by scrolling past it.' },
    { id: 'S6', verdict: 'covered', screens: ['quarantine', 'indeterminate', 'composite'],
      asks: 'Scientific or data exception state',
      note: 'The states neither incumbent has: a result that could not be assessed because the reporting limit sits above the criterion, and an absence that says which kind of absence it is.' },
    { id: 'S7', verdict: 'partially', screens: ['qc', 'validation', 'signoff'],
      asks: 'Review state',
      note: 'A data review state is drawn and is the catalogue’s strongest surface. An *interpretation* review state is not, and there is no comment machinery for one to hang on.' },
    { id: 'S8', verdict: 'covered', screens: ['signoff', 'import-commit', 'programme'],
      asks: 'Approval or completion state',
      note: 'Signatures carry capacity, digest and exactly what was covered; and a completion control that cannot honestly complete refuses and names the lines holding it.' },
    { id: 'S9', verdict: 'covered', screens: ['supersession', 'certificate', 'snapshot', 'criteria'],
      asks: 'Superseded or historically applicable state where relevant',
      note: 'A superseded reading keeps its old value struck through beside the new one, and a locked period refuses a write rather than warning about it.' },
    { id: 'S10', verdict: 'partially', screens: ['lineage', 'supersession', 'snapshot', 'saved-views'],
      asks: 'Upstream evidence and downstream dependency views',
      note: 'Drawn for a result, for a certificate and — since wave 19 — for a population: a dataset states the records its dimensions resolve through upstream and the citations bound to its version downstream. This note read “absent for a population and for an analysis, because neither object exists” until 3 September 2026. The analysis half is still absent, which is §9.5 arriving from the other end.' },
  ];

  const completion = [
    { id: 'C1', derive: (rs) => rs.filter((r) => r.group === 'requirement'), screens: ['coverage'],
      asks: 'Every in-scope requirement is mapped to an inspectable screen and state.',
      note: 'Derived from the rows above rather than judged: this reads covered only when every requirement row does.' },
    { id: 'C2', derive: (rs) => rs.filter((r) => r.group === 'scenario'), screens: ['coverage'],
      asks: 'Scenarios A–E can be followed without relying on verbal explanation from the vendor.',
      note: 'Derived from the five scenario rows. One walks end to end today.' },
    { id: 'C3', verdict: 'partially', screens: ['import-review', 'qc', 'crosstab'],
      asks: 'Complex scientific queries and exceptions are demonstrated with realistic environmental data.',
      note: 'The exceptions are, on a coherent single dataset with laboratory certificates, custody chains and real censoring. The queries are not: §4.3’s worked scenario cannot be expressed and two of its analytes do not exist here.' },
    { id: 'C4', verdict: 'partially', screens: ['qc', 'import-review', 'field-capture', 'signoff'],
      asks: 'The mockup shows what the user knows, decides and records at each important step.',
      note: 'Wherever a workflow is drawn this is the thing the catalogue does best — the decision, its evidence, what each option writes, and the options that are refused. Where a workflow is absent there is no step to show it at.' },
    { id: 'C5', verdict: 'covered', screens: ['qc', 'audit', 'signoff', 'narrative'],
      asks: 'Professional judgement is attributable and supported by evidence and rationale.',
      note: 'Attribution is enforced at the write rather than promised in prose, and the rationale is a field on the decision. The one thing the catalogue will not do is score the judgement, which is stated on the screen as a rule.' },
    { id: 'C6', verdict: 'covered', screens: ['criteria', 'snapshot', 'supersession', 'qc-limits'],
      asks: 'Historical versions remain distinguishable from current configurations and assessments.',
      note: 'Distinguishable and traceable in the direction that matters most: nothing already decided moves. What §13.4 asks for beyond this — asking the counterfactual on purpose — is a different requirement and is its own row.' },
    { id: 'C7', verdict: 'missing', screens: ['crosstab', 'map', 'qc', 'narrative', 'obligations', 'report'],
      asks: 'Context persists appropriately between Data Explorer, Map, Analysis, QA/QC, Interpretation, Obligations and Reporting.',
      note: 'Three of the seven workspaces the requirement names — Data Explorer, Map as a workspace, Analysis — still do not exist, so no pair it names is connected and the verdict holds. What changed on 3 September 2026 is that the artefact exists: the keystone this note identified, a population that can be named, versioned, carried and cited years later at the version used, is built and read by the grid, the figure register and the provenance chain. A context object with nowhere to be carried is not context persisting, and this row will not move until the workspaces do.' },
    { id: 'C8', verdict: 'partially', screens: ['lineage', 'supersession', 'snapshot', 'certificate'],
      asks: 'Upstream evidence and downstream dependencies are visible wherever relevant.',
      note: 'Visible and computed for a result, a certificate, an issued document and — since wave 19 — a population. Two hops run one way only and two are missing, which §15’s own row counts; it counted three one-way hops until 3 September 2026, and result→query now runs in both directions.' },
    { id: 'C9', derive: (rs) => rs.filter((r) => r.section === 14), screens: ['coverage'],
      asks: 'Multi-domain capability is demonstrated through a common model with domain-specific scientific behaviour.',
      note: 'Derived from §14’s four rows. The domain-specific half is ahead of the common-model half, which is the opposite of the usual failure and is why 24a states the model before it draws another domain.' },
    { id: 'C10', verdict: 'covered', screens: ['coverage'],
      asks: 'No requirement is claimed as complete solely because a menu item, dashboard tile or isolated screen has been added.',
      note: 'The discipline this screen already implements, and this enumeration is an instance of it: rows resting on a proposal are counted separately, four rows are marked n/a with a reason rather than counted, and no screen is claimed for a behaviour-shaped requirement.' },
  ];

  /**
   * `{items}` in a note is the number of things that subsection enumerates.
   *
   * The numerator in a sentence like *five of the ten* is a judgement and
   * stays written down; the denominator is the brief's own list and is not
   * anybody's judgement, so it is substituted from the row's own `items` —
   * which `build.mjs` has already checked against the document. One
   * substitution point, so a note that grew a placeholder it cannot fill
   * fails the build rather than rendering the token.
   */
  const fill = (r) => (r.note.includes('{items}')
    ? { ...r, note: r.note.replace(/\{items\}/g, String(r.items)) }
    : r);

  const rows = [
    ...requirement.map(fill).map((r) => ({ ...r, group: 'requirement', section: Number(r.id.split('.')[0]) })),
    ...lineage.map((r) => ({ ...r, group: 'lineage', title: r.asks })),
    ...scenario.map((r) => ({ ...r, group: 'scenario' })),
    ...state.map((r) => ({ ...r, group: 'state', title: r.asks })),
    ...completion.map((r) => ({ ...r, group: 'completion', title: r.asks })),
  ];
  for (const r of rows) r.priority = PRIORITY[r.section] ?? '—';

  /**
   * A derived verdict, for the completion criteria that are claims about the
   * other rows.
   *
   * §20's first, second and ninth criteria are not independent judgements —
   * they are statements *about* the rows above, and typing a verdict for one
   * of them would be the defect this enumeration exists to catch. They are
   * computed: covered when every row in their scope is covered, missing when
   * none is, partially otherwise.
   */
  const rollUp = (list) =>
    list.every((r) => r.verdict === 'covered') ? 'covered'
      : list.every((r) => r.verdict === 'missing') ? 'missing'
        : 'partially';
  for (const r of rows) {
    if (r.derive) { r.verdict = rollUp(r.derive(rows)); r.derived = true; }
  }

  const count = (list, verdict) => list.filter((r) => r.verdict === verdict).length;
  const group = (name) => rows.filter((r) => r.group === name);
  const sections = [...new Set(requirement.map((r) => Number(r.id.split('.')[0])))];

  return {
    rows, sections, AREAS, PRIORITY,
    /* Every count this screen renders, computed here so no face types one. */
    get counts() {
      return {
        rows: rows.length,
        covered: count(rows, 'covered'),
        partially: count(rows, 'partially'),
        missing: count(rows, 'missing'),
        requirement: group('requirement').length,
        lineage: group('lineage').length,
        scenario: group('scenario').length,
        state: group('state').length,
        completion: group('completion').length,
        scenariosWalking: count(group('scenario'), 'covered'),
        withDecision: rows.filter((r) => r.decision).length,
        decisions: [...new Set(rows.flatMap((r) => (r.decision ? r.decision.split(' · ') : [])))].sort(),
        noScreen: rows.filter((r) => r.screens.length === 0).length,
        /* The brief's own enumerations, summed off the rows that carry one. */
        items: rows.reduce((n, r) => n + (r.items ?? 0), 0),
      };
    },
    byPriority() {
      const order = ['P0', 'P1', 'P1/P2', 'P2', 'Strategic'];
      return order.map((p) => {
        const list = rows.filter((r) => r.priority === p);
        return { priority: p, n: list.length, covered: count(list, 'covered'), partially: count(list, 'partially'), missing: count(list, 'missing') };
      }).filter((x) => x.n > 0);
    },
    bySection() {
      return sections.map((s) => {
        const list = rows.filter((r) => r.section === s);
        return {
          section: s, area: AREAS[s], priority: PRIORITY[s], n: list.length,
          covered: count(list, 'covered'), partially: count(list, 'partially'), missing: count(list, 'missing'),
          decision: [...new Set(list.flatMap((r) => (r.decision ? r.decision.split(' · ') : [])))].join(' · '),
        };
      });
    },
    group,
    /** The record the whole enumeration is taken from, named on the screen. */
    source: 'VENDOR_REQUIREMENTS.md',
    standard: 'A requirement is not satisfied merely by adding a navigation item, dashboard card, table, modal or standalone screen.',
    enumeratedOn: '2026-09-03',
  };
})();
