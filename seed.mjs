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
];

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
const C = 'compliant', E = 'exceedance', I = 'indeterminate', N = 'not_evaluated';

/*
 * KNOWN CONTRADICTION — recorded 1 September 2026 (wave 6 audit, W6-A-1),
 * owned by wave 7 as a carried rider. The MW11 column below (sixth cell of
 * every row) carries populated, evaluated results, and the rest of the Q2
 * record says MW11 was never sampled: the field round (two visits, found
 * dry, zero samples), the sample manifest, COMPLETENESS and the home screen
 * all agree with each other and disagree with this table. Both sides predate
 * wave 6. The fix is to blank the column — `#data-states` describes exactly
 * that pattern — but blanking moves the censored counts and every surface
 * computed over this table, so it is wave 7's change made deliberately, not
 * this one's made in passing. The visible half of this record is the notice
 * on `#crosstab`.
 */
export const CROSSTAB = [
  { analyte: 'pH', cells: [
    { v: '7.42', o: [N, C] }, { v: '7.18', o: [N, C] }, { v: '8.91', o: [N, E] },
    { v: '7.06', o: [N, C] }, { v: '6.84', o: [N, C] }, { v: '7.31', o: [N, C] }, { v: '7.55', o: [N, C] } ] },
  { analyte: 'Electrical conductivity', cells: [
    { v: '840', o: [N, C] }, { v: '1120', o: [N, C] }, { v: '3410', o: [N, E] },
    { v: '1680', o: [N, C] }, { v: '990', o: [N, C] }, { v: '910', o: [N, C] }, { v: '760', o: [N, C] } ] },
  { analyte: 'Total hardness as CaCO₃', cells: [
    { v: '182', o: [N, N] }, { v: '244', o: [N, N] }, { v: '412', o: [N, N] },
    { v: '268', o: [N, N] }, { v: '196', o: [N, N] }, { v: '174', o: [N, N] }, { v: '158', o: [N, N] } ] },
  { analyte: 'Arsenic (filtered)', cells: [
    { v: '2.1', o: [C, C] },
    { v: '3.1', o: [C, C], superseded: '31' },
    { v: '28.4', o: [E, C] },
    { v: '<1.0', o: [C, C], censored: true },
    { v: '3.2', o: [C, C] }, { v: '2.8', o: [C, C] }, { v: '1.4', o: [C, C] } ] },
  { analyte: 'Cadmium (filtered)', cells: [
    { v: '<1.0', o: [I, C], censored: true }, { v: '<1.0', o: [I, C], censored: true },
    { v: '<1.0', o: [I, C], censored: true }, { v: '<1.0', o: [I, C], censored: true },
    { v: '<1.0', o: [I, C], censored: true }, { v: '<1.0', o: [I, C], censored: true },
    { v: '<1.0', o: [I, C], censored: true } ] },
  { analyte: 'Copper (filtered)', cells: [
    { v: '0.9', o: [C, C] }, { v: '1.2', o: [C, C] }, { v: '6.4', o: [E, C] },
    { v: '1.1', o: [C, C] }, { v: '<0.5', o: [C, C], censored: true }, { v: '0.8', o: [C, C] }, { v: '<0.5', o: [C, C], censored: true } ] },
  { analyte: 'Nickel (filtered)', cells: [
    { v: '1.8', o: [C, C] }, { v: '2.4', o: [C, C] }, { v: '14.2', o: [E, C] },
    { v: '3.6', o: [C, C] }, { v: '2.1', o: [C, C] }, { v: '1.9', o: [C, C] }, { v: '1.2', o: [C, C] } ] },
  { analyte: 'Zinc (filtered)', cells: [
    { v: '4.2', o: [C, C] }, { v: '5.8', o: [C, C] }, { v: '31.6', o: [E, C] },
    { v: '9.4', o: [E, C] }, { v: '3.1', o: [C, C] }, { v: '2.8', o: [C, C] }, { v: '2.2', o: [C, C] } ] },
  { analyte: 'Nitrate as N', cells: [
    { v: '2.4', o: [N, C] }, { v: '3.1', o: [N, C] }, { v: '11.8', o: [N, E] },
    { v: '4.0', o: [N, C] }, { v: '5.2', o: [N, C], quarantined: 'Holding time exceeded — analysed at 6 days against a 2-day window.' },
    { v: '1.9', o: [N, C] }, { v: '1.1', o: [N, C] } ] },
  { analyte: 'Sulfate as SO₄', cells: [
    { v: '112', o: [N, C] }, { v: '186', o: [N, C] }, { v: '918', o: [N, C] },
    { v: '264', o: [N, C] }, { v: '148', o: [N, C] }, { v: '121', o: [N, C] }, { v: '96', o: [N, C] } ] },
  { analyte: 'PFOS + PFHxS', cells: [
    { v: '<2.0', o: [I, N], censored: true }, { v: '<2.0', o: [I, N], censored: true },
    { v: '4.8', o: [E, N], derived: true }, { v: '<2.0', o: [I, N], censored: true },
    { v: '<2.0', o: [I, N], censored: true }, { v: '<2.0', o: [I, N], censored: true }, { v: '<2.0', o: [I, N], censored: true } ] },
];

/** The seven bores that appear as crosstab columns. */
export const CROSSTAB_COLUMNS = ['MW01A', 'MW03B', 'MW05', 'MW07', 'MW09', 'MW11', 'MW12'];

/**
 * Standing water level, monthly, three years, per bore.
 *
 * Shaped rather than random: a wet-season recovery each Q1, a long decline at
 * MW05 as the TSF seepage mound migrates, and a step at MW03B where a resurvey
 * moved the datum (G-07b) — the hydrograph shows elevation, so the step is a
 * real feature of the series and not an error to smooth away.
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
  const series = {};
  for (const loc of LOCATIONS.filter((l) => l.klass === 'groundwater')) {
    const base = loc.toc - 12.5;
    const drift = loc.code === 'MW05' ? -0.055 : loc.code === 'MW07' ? -0.018 : 0.004;
    series[loc.code] = months.map((month, i) => {
      const m = Number(month.slice(5));
      const wet = Math.sin(((m - 2) / 12) * Math.PI * 2) * 0.62;
      const noise = (random() - 0.5) * 0.16;
      return { month, elevation: Number((base + wet + drift * i + noise).toFixed(3)) };
    });
  }
  return { months, series };
}

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

/** The import runs register. */
export const IMPORTS = [
  { id: 'IMP-0241', file: 'PAS2026-04417_Wandalup_2026Q2.zip', format: 'ESdat ELDF-4', lab: 'Pilbara Analytical Services', received: '2026-05-21 09:14', rows: 231, held: 0, state: 'committed', by: 'A. Nakamura' },
  { id: 'IMP-0240', file: 'PAS2026-04398_Wandalup_2026Q2_partial.zip', format: 'ESdat ELDF-4', lab: 'Pilbara Analytical Services', received: '2026-05-19 16:02', rows: 84, held: 6, state: 'reversed', by: 'A. Nakamura' },
  { id: 'IMP-0239', file: 'YAR-26-0881_Wandalup_PFAS.csv', format: 'Yarra Regional v2', lab: 'Yarra Regional Analytical', received: '2026-05-18 11:47', rows: 42, held: 3, state: 'in review', by: 'D. Okafor' },
  { id: 'IMP-0238', file: 'MOCK_Wandalup_ESdat_Legacy_Export.csv', format: 'ESdat legacy export', lab: '— (migration)', received: '2026-04-02 08:30', rows: 18740, held: 112, state: 'committed', by: 'system' },
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
 */
export const DQO = {
  set: 'Wandalup data quality objectives',
  basis: 'AS/NZS 5667.1, the laboratory’s NATA-scoped QA plan, and the site’s own DQOs where these are tighter.',
  raisedAt: '2026-05-19 10:22 AWST',
  used: {
    version: '2025.2',
    effective: '2025-07-01 → 2026-05-20',
    state: 'superseded',
    why: 'In force when this round’s checks were run, so it is what every finding on it was judged against.',
  },
  current: {
    version: '2026.1',
    effective: '2026-05-21 →',
    state: 'in force',
    by: 'D. Okafor',
    approved: '2026-05-20 16:05 AWST',
    why: 'Two changes, both tightening: the field duplicate limit, and an explicit consequence on the equipment blank rule that 2025.2 stated no action for.',
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

/**
 * The laboratory batch the zinc question is about, named once.
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
    detail: 'All 14 paired analytes within 30% RPD. Largest: sulfate at 11.4%.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
    rerun: { version: '2026.1', outcomeMoves: false, says: 'The largest RPD in the pair is 11.4%, so the tightened 25% limit does not reach it.' },
  },
  {
    id: 'FD-2', check: 'Field duplicate RPD', scope: 'WDL-26Q2-003 / WDL-26Q2-004 · MW05', outcome: 'warn',
    detail: 'Zinc 21.4 and 31.6 µg/L — RPD 38.2% against a 30% limit. Both results above 5 × LOR, so the percentage test applies and this is a real disagreement rather than noise near the limit.',
    action: 'Qualifier J assigned — estimated',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Field duplicate RPD', version: 'DQO 2025.2 · ≤ 30% above 5 × LOR', says: 'The site’s own objective states the limit, the applicability and the consequence, so the qualifier follows from the rule rather than from a view about this pair.' },
    results: 2, qualifier: 'J',
    basis: { kind: 'dqo', says: 'Project DQO 2025.2, Field duplicate RPD. The rule states its own consequence, so the propagation is the rule’s and the version rides on the finding.' },
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
    detail: 'Maximum RPD 4.1% (sulfate) against a 20% limit across 14 analytes.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'MB-1', check: 'Method blank', scope: 'PAS-WO-268841 · MB-268841', outcome: 'pass',
    detail: 'Every analyte below the limit of reporting in the preparation blank.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'LCS-1', check: 'Laboratory control sample', scope: 'PAS-WO-268841 · LCS-268841', outcome: 'pass',
    detail: 'Recovery 96–104% across 8 analytes against an 80–120% limit.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'MS-1', check: 'Matrix spike recovery', scope: 'PAS-WO-268841 · zinc', outcome: 'fail',
    detail: 'Zinc recovered 62% against a 70–130% limit, reproduced at 64% on the spike duplicate. Matrix interference, not a one-off.',
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
          why: 'Not available under 2025.2. Its matrix spike rule states the 70–130% limit and no propagation action, and a rule that says nothing cannot be cited as having said this. Adding the action is a new DQO version, and that is where it belongs.',
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
    detail: 'M8PFOS recovery 94% (limits 70–130%) on every sample.',
    action: '—', concept: 'outcome', state: 'clear', results: 0, qualifier: null,
  },
  {
    id: 'ST-1', check: 'Field parameter stabilisation', scope: 'MW09', outcome: 'warn',
    detail: 'Turbidity never fell below 10 NTU across 14 readings and 22.0 L purged. Sampled at the field officer’s judgement.',
    action: 'Qualifier T on every metal result from this sample',
    concept: 'automatic', state: 'dispositioned',
    rule: { name: 'Field parameter stabilisation', version: 'DQO 2025.2 · 3 consecutive readings in tolerance, low-flow', says: 'The purge record carries the readings and the tolerances, so whether the parameters held is computed rather than judged. What was judged is whether to sample anyway, and the field officer did that at the bore and said so.' },
    results: 8, qualifier: 'T',
    basis: { kind: 'sample', says: 'Sample-specific — every metal result from WDL-26Q2-006 and nothing beyond it. Stabilisation is a fact about one purge at one bore on one visit.' },
    reaches: 'A filtered metal from a turbid bore reads high, and nobody can tell afterwards whether that was formation water or suspended sediment. The qualifier says which question is open.',
  },
  {
    id: 'IB-1', check: 'Ionic balance', scope: 'MW05', outcome: 'warn',
    detail: 'Cation–anion balance −7.8% against a ±5% acceptance limit.',
    action: 'Review item raised — check sulfate and hardness',
    concept: 'decision', state: 'reviewed',
    results: 0, qualifier: null,
    review: {
      by: 'A. Nakamura', at: '2026-05-20 11:12 AWST',
      found: 'Sulfate re-read against the certificate at 918 mg/L — transcription is not the explanation. The likeliest reading is a cation the suite does not include, and the laboratory has been asked whether they can report it from the retained sample.',
      next: 'Waiting on Pilbara Analytical Services. Nothing has been qualified and nothing has been dispositioned, because the answer decides which.',
    },
  },
  {
    id: 'ET-1', check: 'EC : TDS ratio', scope: '7 bores', outcome: 'pass',
    detail: 'All within 0.55–0.75 of the expected relationship.',
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

export const QAQC = QAQC_ROWS.map((r) =>
  r.id === 'SH-2'
    ? {
        ...r,
        // The same check, on the series `EC_MW05` holds. Its numbers are computed
        // in EC_MW05_OUTLIER rather than written here, so the row and the working
        // on the screen cannot come apart.
        detail: `${EC_MW05_OUTLIER.value} against a prior-round median of ${EC_MW05_OUTLIER.median} at this bore — a modified z-score of ${EC_MW05_OUTLIER.score} on ${EC_MW05_OUTLIER.n} rounds of its own record, against a ${EC_MW05_OUTLIER.threshold} threshold.`,
      }
    : r,
);

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

/** The three limits on the two PFAS components, kept apart (QB-9, ADR-0009). */
export const PFAS_LIMITS = {
  lor: 2.0,
  mdl: 0.5,
  unit: 'ng/L',
  method: 'USEPA 1633',
  scheme: 'USEPA',
  qualifier: 'J',
  qualifierMeans: 'estimated',
  origin: 'laboratory',
  says: 'Reported by Yarra Regional on YAR-26-0881 with the J qualifier against the result. The laboratory said it; nobody here inferred it.',
};

/** The lineage of one number — the panel's whole subject. */
export const LINEAGE = {
  value: '4.8 ng/L',
  analyte: 'PFOS + PFHxS',
  location: 'MW05',
  collected: '2026-05-13 08:40 AWST',
  chain: [
    { step: 'Source', what: 'YAR-26-0881_Wandalup_PFAS.csv, rows 18 and 24', detail: 'Yarra Regional Analytical · certificate YAR-26-0881 · received 2026-05-18 11:47', kind: 'source' },
    { step: 'Import', what: 'IMP-0239 · ESdat-mapped, committed 2026-05-19 10:22', detail: 'Acting principal dokafor@wandalup.example · transaction 8f2c…41ab', kind: 'import' },
    { step: 'Unit conversion', what: 'ng/L retained — no conversion applied', detail: 'Dictionary unit for this analyte pair is ng/L. Rule: unit-identity v1.', kind: 'rule' },
    { step: 'Component 1', what: `PFOS (linear) = 3.1 ${PFAS_LIMITS.unit} · detected · quantified`, detail: `MDL ${PFAS_LIMITS.mdl.toFixed(1)} · LOR ${PFAS_LIMITS.lor.toFixed(1)} ${PFAS_LIMITS.unit} · above the limit of reporting, so the number is quantified · method ${PFAS_LIMITS.method} · analysed 2026-05-17`, kind: 'input' },
    /*
     * PR-3b, in the one place the review found it. This step read "PFHxS =
     * 1.7 ng/L · detected · LOR 2.0 ng/L" — an unqualified detect below the
     * limit of reporting, which is not a thing a laboratory reports. The three
     * limits stay distinct (QB-9) and the assertion moves to where the
     * glossary puts it: a **qualifier**, not a detect status.
     */
    { step: 'Component 2', what: `PFHxS = 1.7 ${PFAS_LIMITS.unit} · detected · ${PFAS_LIMITS.qualifier} — ${PFAS_LIMITS.qualifierMeans}`, detail: `MDL ${PFAS_LIMITS.mdl.toFixed(1)} · LOR ${PFAS_LIMITS.lor.toFixed(1)} ${PFAS_LIMITS.unit} · the value sits between the two, so it is real and not reliably quantified · qualifier ${PFAS_LIMITS.qualifier} (${PFAS_LIMITS.scheme} scheme, ${PFAS_LIMITS.origin} origin) · method ${PFAS_LIMITS.method} · analysed 2026-05-17`, kind: 'input' },
    { step: 'Derivation', what: 'Sum of components · rule sum-pfas-anzg v2.1', detail: 'Non-detect treatment: exclude — and it does not reach either component here. Both were detected, and an estimated detect is still a detect, so 1.7 enters the sum at its reported value rather than at a substituted one. Bound to ANZG 2018, not to a global setting (FR-2.2).', kind: 'rule' },
    { step: 'Derived result', what: `4.8 ${PFAS_LIMITS.unit} ${PFAS_LIMITS.qualifier} · ${PFAS_LIMITS.qualifierMeans} · flagged derived, not reported by the laboratory`, detail: 'Stored additively. Neither component was overwritten (FR-2.4), and the J carries from the component onto the total — a sum is no more certain than the least certain thing in it.', kind: 'derived' },
    { step: 'Evaluation', what: 'ANZG 2018 95% species protection · 0.13 ng/L · exceedance at 37×', detail: 'Evaluated synchronously on commit, 2026-05-19 10:22. Criteria version 2018.1. The estimate does not decide it: PFOS alone is 24× the guideline value, so the outcome holds under every reading of the component.', kind: 'evaluation' },
    { step: 'Consequence', what: 'TARP Level 3 raised · statutory notification obligation created', detail: 'Notification lodged 2026-05-22 14:30 AWST. Became-aware timestamp immutable at the database (G-44).', kind: 'consequence' },
  ],
};

/** The audit trail readback. */
export const AUDIT = [
  { at: '2026-05-22 14:30:07', who: 'rwhitmore@wandalup.example', action: 'insert', table: 'notification_event', what: 'Notification lodged · DWER-N-2026-11842', tx: '3d91…7c02' },
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

/** Criteria library entries. */
export const CRITERIA_LIBRARY = [
  { set: 'ANZG 2018 — 95% species protection', version: '2018.1', effective: '2018-08-01 →', matrix: 'Freshwater', applies: 'All groundwater locations, Superficial unit', analytes: 58, state: 'active' },
  { set: 'ANZG 2018 — 99% species protection', version: '2018.1', effective: '2018-08-01 →', matrix: 'Freshwater', applies: 'Not assigned', analytes: 58, state: 'available' },
  { set: 'Licence L8842/2019/1 — Table 4', version: '2024.2', effective: '2024-07-01 →', matrix: 'Groundwater', applies: 'Compliance boundary locations', analytes: 12, state: 'active' },
  { set: 'Licence L8842/2019/1 — Table 4', version: '2019.1', effective: '2019-03-01 – 2024-06-30', matrix: 'Groundwater', applies: 'Superseded by 2024.2', analytes: 9, state: 'historic' },
  { set: 'Site-specific trigger values — TSF', version: '2025.1', effective: '2025-01-01 →', matrix: 'Groundwater', applies: 'MW05, MW07 (downgradient of TSF)', analytes: 6, state: 'active' },
];

/** EDD format definitions — configuration, never code (FR-3.1). */
export const FORMATS = [
  { name: 'ESdat ELDF-4', version: '4.0', files: 'Sample + Chemistry pair', fields: 61, labs: 'Pilbara Analytical Services, Yarra Regional Analytical', state: 'active' },
  { name: 'Yarra Regional v2', version: '2.3', files: 'Single CSV', fields: 34, labs: 'Yarra Regional Analytical', state: 'active' },
  { name: 'ESdat legacy export', version: '—', files: 'Single CSV', fields: 28, labs: 'migration only', state: 'migration' },
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
  { kind: 'Decision', urgency: 'later', headline: 'Cadmium cannot be assessed at any bore until the reporting limit comes down', context: '7 results indeterminate · PAS quoted ICP-MS/MS at +$18 per sample', project: PROJECT.code, age: '3 days', target: 'indeterminate', action: 'Review the register' },
].map((w) => ({ ...w, crossProject: w.project !== PROJECT.code }));

/**
 * Planned against received for the open period (EX-20).
 *
 * This is the programme-completeness signal, and it belongs on the landing
 * page rather than on a dashboard of its own: *did we get everything we said
 * we would collect* is a daily question, and a screen somebody has to
 * remember to visit answers it for nobody.
 */
export const COMPLETENESS = {
  period: '2026 Q2 · 1 April – 30 June 2026 (Australia/Perth)',
  planned: 63,
  received: 58,
  held: 3,
  missing: 2,
  rows: [
    { location: 'MW01A', planned: 9, received: 9, state: 'complete' },
    { location: 'MW03B', planned: 9, received: 9, state: 'complete' },
    { location: 'MW05', planned: 9, received: 9, state: 'complete' },
    { location: 'MW07', planned: 9, received: 9, state: 'complete' },
    { location: 'MW09', planned: 9, received: 8, state: 'partial' },
    { location: 'MW11', planned: 9, received: 0, state: 'missing' },
    { location: 'MW12', planned: 9, received: 9, state: 'complete' },
  ],
};

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
 */
export const EVENT_SAMPLES = [
  { id: 'WDL-26Q2-001', location: 'MW01A', matrix: 'Groundwater', collected: '2026-05-12 07:55 AWST', depth: '20.4 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-002', location: 'MW03B', matrix: 'Groundwater', collected: '2026-05-12 10:20 AWST', depth: '48.8 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-003', location: 'MW05', matrix: 'Groundwater', collected: '2026-05-13 08:40 AWST', depth: '15.2 m bgl', tests: 16, results: 16, qc: '—', parent: '—', containers: 5, state: 'evaluated' },
  { id: 'WDL-26Q2-004', location: 'MW05', matrix: 'Groundwater', collected: '2026-05-13 08:40 AWST', depth: '15.2 m bgl', tests: 14, results: 14, qc: 'Field duplicate (blind)', parent: 'WDL-26Q2-003', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-005', location: 'MW07', matrix: 'Groundwater', collected: '2026-05-13 11:05 AWST', depth: '17.1 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-008', location: 'MW07', matrix: 'Groundwater', collected: '2026-05-13 11:05 AWST', depth: '17.1 m bgl', tests: 14, results: 14, qc: 'Field duplicate (blind)', parent: 'WDL-26Q2-005', containers: 3, state: 'evaluated' },
  { id: 'WDL-26Q2-006', location: 'MW09', matrix: 'Groundwater', collected: '2026-05-14 07:30 AWST', depth: '18.6 m bgl', tests: 14, results: 13, qc: '—', parent: '—', containers: 4, state: 'results-partial' },
  { id: 'WDL-26Q2-007', location: 'MW12', matrix: 'Groundwater', collected: '2026-05-14 11:20 AWST', depth: '19.8 m bgl', tests: 14, results: 14, qc: '—', parent: '—', containers: 4, state: 'evaluated' },
  { id: 'WDL-26Q2-QC1', location: '—', matrix: 'Field blank', collected: '2026-05-13 08:00 AWST', depth: '—', tests: 14, results: 14, qc: 'Field blank', parent: 'The event', detail: 'The event itself — poured at MW05, at the bore', containers: 2, state: 'evaluated' },
  { id: 'WDL-26Q2-QC2', location: '—', matrix: 'Trip blank', collected: '2026-05-12 06:00 AWST', depth: '—', tests: 14, results: 14, qc: 'Trip blank', parent: 'The cooler', detail: 'The cooler — travelled with the samples, 12–15 May', containers: 2, state: 'evaluated' },
  { id: 'WDL-26Q2-QC3', location: '—', matrix: 'Equipment blank', collected: '2026-05-13 10:35 AWST', depth: '—', tests: 14, results: 14, qc: 'Equipment blank (rinsate)', parent: 'Bladder pump', detail: 'Bladder pump, rinsed between WDL-26Q2-003 and WDL-26Q2-005', containers: 2, state: 'evaluated' },
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
  { code: '2026-Q2-GW', label: 'Quarterly groundwater', window: '1 Apr – 30 Jun 2026', collected: '12–14 May 2026', by: 'A. Nakamura', samples: EVENT_SAMPLES.filter((s) => s.qc === '—').length, qc: EVENT_SAMPLES.filter((s) => s.qc !== '—').length, state: 'results-complete', lab: 'Pilbara Analytical Services' },
  { code: '2026-Q2-PFAS', label: 'PFAS supplementary', window: '1 Apr – 30 Jun 2026', collected: '13 May 2026', by: 'A. Nakamura', samples: 4, qc: 1, state: 'results-partial', lab: 'Yarra Regional Analytical' },
  { code: '2026-M05-TSF', label: 'Monthly TSF downgradient', window: '1 – 31 May 2026', collected: '13 May 2026', by: 'D. Okafor', samples: 3, qc: 1, state: 'results-complete', lab: 'Pilbara Analytical Services' },
  { code: '2026-Q2-SW', label: 'Quarterly surface water', window: '1 Apr – 30 Jun 2026', collected: '14 May 2026', by: 'D. Okafor', samples: 1, qc: 0, state: 'evaluated', lab: 'Pilbara Analytical Services' },
  { code: '2026-Q3-GW', label: 'Quarterly groundwater', window: '1 Jul – 30 Sep 2026', collected: '—', by: '—', samples: 0, qc: 0, state: 'planned', lab: '—' },
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
  qualifiers: [
    { code: 'U', source: 'laboratory', meaning: 'Not detected above the reporting limit' },
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
  { row: 31, subject: 'Validation state "QA-Hold" · rows 31–36', reason: '"QA-Hold" is not a validation state this format maps. Defaulting it would erase or invent a review judgement (PP4).', rule: 'format field validation_state · ESdat ELDF-4', wayOut: 'Add the mapping to the Yarra Regional profile, or hold these rows', state: 'held' },
  { row: 12, subject: 'Zinc (filtered) · MW05-DUP · 2026-05-13', reason: 'Field duplicate RPD of 38.2% against a 30% acceptance limit. Both results are above the reporting limit, so this is a real disagreement rather than noise near the limit.', rule: 'field-duplicate-rpd · 30%', wayOut: 'Accepted with qualifier J — estimated', state: 'resolved' },
];

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

/** Role bindings against Entra identities (§2.3, §13.1, G-70d). */
export const MEMBERS = [
  { name: 'A. Nakamura', identity: 'anakamura@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-23 07:41 AWST', state: 'active' },
  // W5-A-1: the binding two screens and the top bar rest on must be on the
  // register that grounds it, or the register is not the authority it claims.
  { name: 'A. Nakamura', identity: 'anakamura@wandalup.example', project: 'MOCK-KRJ', role: 'Approver', granted: '2025-09-14', by: 'System administrator', group: 'SG-Strataflow-KRJ-Approvers', lastSeen: '2026-08-23 07:41 AWST', state: 'active' },
  { name: 'D. Okafor', identity: 'dokafor@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-06-03', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-22 16:08 AWST', state: 'active' },
  { name: 'R. Whitmore', identity: 'rwhitmore@wandalup.example', project: 'MOCK-WDL', role: 'Approver', granted: '2024-02-19', by: 'System administrator', group: 'SG-Strataflow-WDL-Approvers', lastSeen: '2026-08-23 06:55 AWST', state: 'active' },
  { name: 'S. Petrelli', identity: 'spetrelli@wandalup.example', project: 'MOCK-WDL', role: 'Reader', granted: '2025-03-11', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Readers', lastSeen: '2026-08-19 09:12 AWST', state: 'active' },
  { name: 'J. Halloran', identity: 'jhalloran@wandalup.example', project: 'MOCK-WDL', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: '— removed from group 2026-07-31', lastSeen: '2026-07-30 15:44 AWST', state: 'deprovisioned' },
];

/** Instance administration the operating model implies but no persona owns (§13.3). */
export const ENTITLEMENT = {
  customer: 'Wandalup Resources Pty Ltd',
  term: '2026-01-01 → 2026-12-31',
  remaining: '130 days',
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
 */
export const BUNDLE = {
  generated: 'not yet — nothing is written until you generate it',
  initiator: 'You. Strataflow cannot generate this remotely and has no path into this instance.',
  contents: [
    { what: 'Instance version, schema version, reference-content versions', size: '2 KB', sensitive: 'none', included: true },
    { what: 'Service health and last 200 scheduler ticks', size: '48 KB', sensitive: 'none', included: true },
    { what: 'Application logs, last 24 hours', size: '3.1 MB', sensitive: 'principal identities appear in attribution lines', included: true },
    { what: 'Slow-query log and query plans', size: '410 KB', sensitive: 'table and column names; no row values', included: true },
    { what: 'Migration history and schema DDL', size: '96 KB', sensitive: 'none', included: true },
    { what: 'Row counts per table', size: '4 KB', sensitive: 'none', included: true },
    { what: 'Result values, coordinates or certificates', size: '—', sensitive: 'customer data', included: false },
    { what: 'Backup contents', size: '—', sensitive: 'customer data', included: false },
  ],
};

/** Column sets a returning user recalls rather than rebuilds (§6.1, EX-24). */
export const SAVED_VIEW_LIST = [
  { name: 'Compliance boundary — Table 4', owner: 'Project', by: 'R. Whitmore', locations: 'MW09, MW11', analytes: 'Licence Table 4 suite (12)', period: 'Rolling 4 quarters', criteria: 'Licence Table 4 only', used: '2026-08-19', shared: true },
  { name: 'TSF downgradient — metals', owner: 'Project', by: 'A. Nakamura', locations: 'MW05, MW07', analytes: 'Dissolved metals (8)', period: 'Rolling 8 quarters', criteria: 'ANZG 95% + site-specific', used: '2026-08-22', shared: true },
  { name: 'PFAS — everything', owner: 'Project', by: 'A. Nakamura', locations: 'All groundwater', analytes: 'PFAS suite (14) + derived sum', period: 'All time', criteria: 'ANZG 95%', used: '2026-08-23', shared: true },
  { name: 'My quick check', owner: 'Private', by: 'A. Nakamura', locations: 'MW05', analytes: 'Arsenic, zinc, copper', period: 'Rolling 4 quarters', criteria: 'ANZG 95%', used: '2026-08-23', shared: false },
];

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
 * The field record of 2026-Q2-GW, organised the way the work is done.
 *
 * **Rebuilt 1 September 2026 (wave 6, PR-1).** A senior hydrogeologist read
 * the drawn field-capture grid and stopped at its axis: *"I don't measure the
 * SWL at seven bores, then return conceptually to MW05 to enter its pH."*
 * Real field work runs **bore by bore** — arrive, look at the headworks, dip,
 * set the pump, purge, watch the parameters, take the sample, label it, filter
 * it, preserve it, sign it onto the chain, photograph the bore, move on. So
 * the unit of this record is the **bore session**, and the round grid is a
 * summary over the sessions rather than the thing being filled in.
 *
 * ## What changed in the data, and why each change was forced
 *
 * The old `PURGE` literal called itself round **2026-Q3-GW** and dated itself
 * **2026-08-14**, while `EVENTS` says 2026-Q3-GW is *planned* with no samples
 * and `#ecoc` says it has not been collected. Its readings end at pH 8.91 and
 * EC 3410 µS/cm, which are MW05's **2026 Q2** values on the crosstab, in the
 * exceedance register and in `EC_MW05_OUTLIER`. It was the Q2 record wearing
 * the wrong round code and a date three months in the future, and three
 * screens disagreed because of it. It is the Q2 MW05 session now, collected
 * `2026-05-13 08:40 AWST` — the same instant `EVENT_SAMPLES` gives
 * `WDL-26Q2-003`, read from here rather than typed twice.
 *
 * The old field-capture grid typed **42 L** purged at MW05 and **36 L** at
 * MW09. The purge log said 9.1 L at MW05 (low-flow at 0.24 L/min for 38
 * minutes) and the QA/QC register says 22 L at MW09. Both grid figures were
 * three-casing-volume numbers on a low-flow round. Volumes are now
 * `rate × minutes`, computed, so the grid cannot disagree with the log again.
 *
 * **Stabilisation is computed, never typed.** Every reading's `stable` flag
 * used to be a hand-written boolean; it is now the result of running the
 * tolerances over the three-reading window ending at that reading, and the
 * verdict sentence is generated from the first reading that passes. Under the
 * computed test MW05 stabilises one reading later than the hand-written flag
 * claimed — the hand-written flag had dissolved oxygen moving 15.5% across
 * its window against a ±10% tolerance.
 *
 * ## Three dispositions, and why the round is still open
 *
 * `DISPOSITIONS` is the closed list the review asked for. Six bores were
 * **sampled**; MW11 was visited twice, found **inaccessible** on 13 May and
 * **dry** on 14 May, and the glossary's *purge event* entry is explicit that
 * two visits in one round are two records rather than one. Dry is not
 * missing: the bore was reached, dipped and found empty, and that is a
 * measurement of the aquifer rather than an absence of one.
 *
 * The two MW11 dispositions and MW12's photographs are still **on the device**
 * — captured, not synced. That is why `OBLIGATIONS` and the programme still
 * read the round overdue at MW11 ten days after the window closed: the record
 * has no disposition, and a countdown reads the record. Capture timestamp and
 * sync timestamp are different facts and both are kept.
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
   */
  const instruments = [
    { kind: 'Multiparameter sonde', model: 'YSI ProDSS', serial: '21F0994', reads: 'pH · conductivity · dissolved oxygen · redox · temperature', calibrated: '2026-05-12 05:40 AWST', check: '2026-05-14 17:10 AWST', drift: 'pH +0.02, conductivity −0.4% — within acceptance' },
    { kind: 'Turbidimeter', model: 'Hach 2100Q', serial: '18B4471', reads: 'turbidity', calibrated: '2026-05-12 05:55 AWST', check: null, drift: null },
    { kind: 'Water level meter', model: 'Solinst 102', serial: '331802', reads: 'depth to water', calibrated: '2026-04-30 — tape checked against the workshop reference, 0 mm over 30 m', check: '2026-05-14 17:14 AWST', drift: 'No change against the reference mark' },
  ];

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
};

/** The four hops the laboratory-end receipt has always shown, derived not repeated. */
export const CUSTODY = CUSTODY_CHAIN.transfers
  .filter((t) => t.onReceipt)
  .map(({ at, from, to, what, state }) => ({ at, from, to, what, state }));

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
 */
export const QC_LIMITS = {
  set: DQO.set,
  version: DQO.used.version,
  effective: DQO.used.effective,
  basis: DQO.basis,
  dqo: DQO,
  used: DQO.used,
  current: DQO.current,
  rules: [
    { check: 'Field duplicate RPD', limit: '≤ 30%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR', source: 'Site DQO, consistent with AS/NZS 5667.1', next: '≤ 25% — the 5 × LOR applicability rule unchanged' },
    { check: 'Laboratory duplicate RPD', limit: '≤ 20%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR', source: 'PAS QA plan rev 8' },
    { check: 'Matrix spike recovery', limit: '70 – 130%', applies: 'One per 20 samples per matrix per batch', fallback: '—', source: 'PAS QA plan rev 8', silent: 'States the limit and no consequence. A recovery outside it raises a finding; what that finding does to the batch is not written here, which is why the zinc propagation is a decision rather than a rule.' },
    { check: 'MS/MSD RPD', limit: '≤ 30%', applies: 'Where a duplicate spike was run', fallback: '—', source: 'PAS QA plan rev 8' },
    { check: 'Laboratory control sample recovery', limit: '80 – 120%', applies: 'One per batch, per method', fallback: '—', source: 'PAS QA plan rev 8' },
    { check: 'Surrogate recovery — PFAS', limit: '70 – 130%', applies: 'Every sample, isotope-labelled', source: 'USEPA 1633' },
    { check: 'Method blank', limit: '< LOR', applies: 'One per batch, per method', fallback: 'Detection above LOR qualifies every sample in the batch', source: 'PAS QA plan rev 8' },
    { check: 'Field / trip / equipment blank', limit: '< LOR', applies: 'One field and one trip blank per event; an equipment blank per equipment reuse', source: 'Site DQO', next: '< LOR — and a detection above it qualifies every result for that analyte collected with the same equipment after the rinse, in that event' },
    { check: 'Cation–anion balance', limit: '± 5%', applies: 'TDS > 100 mg/L', fallback: '± 10% below 100 mg/L, where analytical error dominates', source: 'APHA 1030E' },
    { check: 'Field parameter stabilisation', limit: '3 consecutive readings in tolerance', applies: 'Low-flow purging', source: 'AS/NZS 5667.11' },
  ],
  changed: 'Field duplicate RPD moved from 25% to 30% on 2025-07-01, and the 5 × LOR applicability rule was added in the same revision. Results evaluated before that date keep the limits in force then.',
};

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
      'Zinc matrix-spike recovery of 62% is below the 70% limit and it is reproducible across the duplicate, so this is matrix interference rather than a one-off. Every zinc result in this batch — nine samples, including the MW05 exceedance at 31.6 µg/L — is qualified as biased low. A recovery below 100% biasing low means the true value is likely higher, so the exceedance stands and is if anything understated.',
  },
  {
    id: 'YAR-B-118420', lab: 'Yarra Regional Analytical', method: 'USEPA 1633 — PFAS',
    samples: 4, prepared: '2026-05-16', analysed: '2026-05-17', nata: 'In scope · 14622',
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
export const INDETERMINATE = [
  { location: 'MW01A', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L — quoted by PAS at +$18 per sample' },
  { location: 'MW03B', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
  { location: 'MW05', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
  { location: 'MW07', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
  { location: 'MW09', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
  { location: 'MW11', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
  { location: 'MW12', analyte: 'Cadmium (filtered)', reported: '< 1.0 µg/L', lor: '1.0 µg/L', criterion: '0.54 µg/L', set: 'ANZG 2018 · 95%', gap: '1.9×', close: 'ICP-MS/MS at 0.1 µg/L' },
];

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
 */
const DQA_ROWS = [
  { dim: 'Precision', measure: 'Field duplicate RPD, laboratory duplicate RPD', objective: '≤ 30% field, ≤ 20% laboratory, above 5 × LOR', achieved: '1 of 15 field pairs outside — zinc at MW05, 38.2%', verdict: 'met with exception', findings: ['FD-1', 'FD-2', 'FD-3', 'LD-1'] },
  { dim: 'Accuracy', measure: 'LCS, matrix spike, surrogate recovery', objective: '80–120% LCS, 70–130% MS', achieved: 'LCS 96–104%. Zinc matrix spike 62% — below limit, reproducible', verdict: 'not met for zinc', findings: ['LCS-1', 'MS-1', 'SR-1', 'EB-1', 'MB-1', 'FB-1', 'TB-1', 'IB-1'] },
  { dim: 'Representativeness', measure: 'Field parameter stabilisation, purge records, sampling position', objective: '3 consecutive readings in tolerance before collection', achieved: 'REPRESENTATIVENESS', verdict: 'met with exception', findings: ['ST-1'] },
  { dim: 'Comparability', measure: 'Consistent methods, units and reporting limits across rounds', objective: 'No method change without a documented equivalence', achieved: 'Arsenic LOR stepped 5.0 → 1.0 µg/L at 2025-05 on a method change; recorded and drawn on the plate', verdict: 'met', findings: ['ET-1', 'SH-1', 'SH-2'] },
  { dim: 'Completeness', measure: 'Results received against results planned', objective: '≥ 95% of planned results usable', achieved: '58 of 63 received, 55 usable — 87%', verdict: 'not met', findings: ['HT-1', 'HT-2'] },
  { dim: 'Sensitivity', measure: 'Reporting limit against the applicable criterion', objective: 'LOR ≤ 0.5 × criterion for every assessed analyte', achieved: 'Cadmium LOR 1.0 µg/L against a 0.54 µg/L criterion — 7 results unassessable', verdict: 'not met', findings: ['LOR-1'] },
];

export const DQA = DQA_ROWS.map((d) => {
  const rows = d.findings.map((id) => QAQC.find((q) => q.id === id));
  const p = FIELD_ROUND.preflight;
  return {
    ...d,
    achieved:
      d.achieved === 'REPRESENTATIVENESS'
        ? `${p.stabilised} of ${p.purges} bores purged stabilised; ${p.planned - p.purges} of ${p.planned} planned was not purged. MW09 turbidity never below 10 NTU`
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

/** A bore nest — the vertical dimension the register flattened. */
export const NEST = {
  id: 'Nest B — Borefield',
  bores: [
    { code: 'MW01A', unit: 'Superficial', screen: '18.0 – 24.0 m bgl', swl: '11.42 m btoc', head: '203.40 m AHD', ec: '840 µS/cm' },
    { code: 'MW03B', unit: 'Confined (Wandalup Sandstone)', screen: '46.0 – 52.0 m bgl', swl: '9.18 m btoc', head: '204.26 m AHD', ec: '1120 µS/cm' },
  ],
  gradient: 'Upward, +0.86 m from the confined unit to the superficial',
  inference:
    'The confined unit sits at higher head than the superficial one, so vertical leakage here is upward and TSF seepage in the superficial aquifer cannot be reaching the confined unit at this location. That is a containment argument, and it is only visible when the two bores are read as a nest rather than as two rows in a register.',
};

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
  const censored = CROSSTAB.reduce((n, r) => n + r.cells.filter((c) => c.censored).length, 0);
  const checks = [
    { check: 'Prescribed section structure, present and in order', expects: '§1 – §7 per the DWER quarterly groundwater form', found: 'All seven present, in order', outcome: 'pass' },
    { check: '§3 carries the QA/QC summary as a table', expects: 'Table 3.1', found: `Table 3.1 · ${QAQC.length} checks`, outcome: 'pass' },
    { check: '§3 carries the data quality assessment', expects: `Table 3.2, ${DQA.length} dimensions`, found: `Table 3.2 · ${DQA.length} dimensions`, outcome: 'pass' },
    { check: '§4 carries the crosstab', expects: 'Table 4.1, analyte × location', found: `Table 4.1 · ${CROSSTAB.length} × ${CROSSTAB_COLUMNS.length}`, outcome: 'pass' },
    { check: '§5 carries the exceedance register', expects: 'Table 5.1, one row per result per criterion', found: `Table 5.1 · ${EXCEEDANCES.length} rows`, outcome: 'pass' },
    { check: '§5 carries the results that could not be assessed', expects: 'Table 5.2, with the reason on each', found: `Table 5.2 · ${INDETERMINATE.length} rows`, outcome: 'pass' },
    { check: 'Figure captions match the template', expects: 'Figure <n>. <Title> — <source>', found: `All ${REPORT_ITEMS.figures} figures`, outcome: 'pass' },
    { check: 'Table captions match the template', expects: 'Table <n>. <Title> — <source>', found: `All ${REPORT_ITEMS.tables} tables`, outcome: 'pass' },
    { check: 'Every cross-reference resolves', expects: 'No reference to a number the document does not carry', found: `${refs} references, all resolving`, outcome: 'pass' },
    { check: 'Every reported value carries its unit', expects: 'Unit on the value or in the column head', found: 'No bare numbers', outcome: 'pass' },
    { check: 'Censored values in the laboratory’s own notation', expects: '< LOR, never zero and never a substituted half-limit', found: `${censored} censored values, notation intact`, outcome: 'pass' },
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
 * (FR-2.2). Six of these seven locations have both components below the limit
 * of reporting, which is what makes the rule decisive rather than academic:
 * the same seven results read as indeterminate, compliant or 31× a guideline
 * value depending on a field on the set.
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
export const PFAS_COMPONENTS = [
  { location: 'MW01A', pfos: null, pfhxs: null },
  { location: 'MW03B', pfos: null, pfhxs: null },
  { location: 'MW05', pfos: 3.1, pfhxs: 1.7, pfhxsQualifier: 'J', pfhxsQualifierMeans: 'estimated — detected above the method detection limit and below the limit of reporting' },
  { location: 'MW07', pfos: null, pfhxs: null },
  { location: 'MW09', pfos: null, pfhxs: null },
  { location: 'MW11', pfos: null, pfhxs: null },
  { location: 'MW12', pfos: null, pfhxs: null },
];

/**
 * The four treatments, run over the real record.
 *
 * `exclude` is what the active set binds, and it is why the crosstab shows
 * `< 2.0` and an indeterminate mark at six bores: with every component
 * excluded there is no sum to form, so the total is reported censored at the
 * limit and the limit sits above the criterion. `zero` is the treatment that
 * turns all six into passes, which is the direction this product exists to
 * refuse silently.
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
  const evaluate = (t) =>
    PFAS_COMPONENTS.map((p) => {
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
  const active = evaluate(treatments[0]);
  return {
    lor: LOR,
    criterion: CRITERION,
    analyte: 'PFOS + PFHxS',
    rule: 'sum-pfas-anzg v2.1',
    activeRule: 'exclude',
    treatments: treatments.map((t) => {
      const rows = evaluate(t);
      return {
        ...t,
        rows,
        changes: rows.filter((r, i) => r.outcome !== active[i].outcome).length,
        outcomes: ['exceedance', 'indeterminate', 'compliant'].map((o) => ({ o, n: rows.filter((r) => r.outcome === o).length })).filter((x) => x.n),
      };
    }),
    active,
    says:
      'MW05 is the same 4.8 ng/L under every treatment, because both of its components were detected — a rule about non-detects has nothing to say about a result that has none. Every other bore moves, and the six of them are the whole of the difference between the four columns.',
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
      scope: `Every committed result the rule can reach: ${NON_DETECT.active.length} derived totals of ${NON_DETECT.analyte} across ${NON_DETECT.active.length} locations, round ${ROUND.code}.`,
      reaches: NON_DETECT.active.length,
      changes: changed.length,
      unchanged: NON_DETECT.active.length - changed.length,
      rows: changed,
      unchangedWhy: 'MW05 does not change: both of its components were detected, so no substitution applies to it.',
      nothingElse:
        'There are no PFAS results on this project before 2026 Q2 and no other derived sum in the analyte dictionary, so the rule reaches nothing else. That is a fact about this seed rather than a property of the rule, and the test says which.',
    },
    activation: {
      writes: [
        { what: 'Criteria set versions written', n: '1 — 2018.1 is superseded, not deleted' },
        { what: 'Derived totals re-evaluated', n: '7' },
        { what: 'Outcomes that change', n: '6 — indeterminate becomes exceedance' },
        { what: 'Exceedances raised', n: '6, at six locations' },
        { what: 'Notification obligations raised under condition 21', n: '6 — became-aware set at activation, immutable' },
        { what: 'TARP levels that extend automatically', n: '0 — Level 3 names MW05 and extending it is a separate decision' },
        { what: 'Locked periods re-evaluated', n: '0 — a rule change evaluates forward' },
        { what: 'Issued reports changed', n: '0 — a snapshot is what was issued' },
      ],
      says:
        'Condition 21 obliges notification as soon as practicable on becoming aware of an exceedance, and the moment of awareness would be this activation. Six statutory clocks, started by a configuration change and running from a timestamp nobody can afterwards move. That is why activating a criteria set is an approval rather than a save.',
      reversible:
        'Reversible as an evaluation and not as a consequence. Rolling back re-evaluates the seven totals and withdraws the six exceedances; it does not un-lodge a notification that has gone to DWER.',
    },
    rollback: {
      writes: [
        { what: 'Set version deactivated', n: '1 — superseded, and both stay readable' },
        { what: 'Derived totals re-evaluated', n: '7' },
        { what: 'Exceedances withdrawn', n: '6 — withdrawn, never deleted' },
        { what: 'Notifications un-lodged', n: '0 — a lodgement is withdrawn by writing to the regulator' },
        { what: 'Audit records written', n: 'One per change, appended, attributed' },
      ],
      says:
        'Rollback is drawn as a control rather than left to a database restore, because the question it answers — “we activated the wrong rule on Friday” — is asked on a Monday by somebody who is not a DBA.',
    },
  };
})();
