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
  jurisdiction: 'Western Australia — DWER',
  licence: 'L8842/2019/1',
  timezone: 'Australia/Perth',
  crs: 'GDA2020 / MGA zone 50 (EPSG:7850)',
};

export const PRINCIPAL = {
  name: 'A. Nakamura',
  role: 'Hydrogeologist',
  subject: 'anakamura@wandalup.example',
  roleBinding: 'Contributor · MOCK-WDL',
};

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

/** QA/QC evaluation for the round. */
export const QAQC = [
  { check: 'Holding time', scope: 'Nitrate as N · MW09', outcome: 'fail', detail: 'Analysed 6 days after collection against a 2-day window (APHA 4500-NO₃⁻).', action: 'Quarantined · excluded from evaluation' },
  { check: 'Holding time', scope: '229 of 231 results', outcome: 'pass', detail: 'Within method windows from collection through preparation to analysis.', action: '—' },
  { check: 'Reporting limit above criterion', scope: 'Cadmium (filtered) · all 7 bores', outcome: 'fail', detail: 'LOR 1.0 µg/L sits above the ANZG 2018 criterion of 0.54 µg/L. Nothing can be asserted.', action: 'Outcome recorded as indeterminate — not as a pass' },
  { check: 'Field duplicate RPD', scope: 'WDL-26Q2-005 / WDL-26Q2-008 · MW07', outcome: 'pass', detail: 'All 14 paired analytes within 30% RPD. Largest: sulfate at 11.4%.', action: '—' },
  { check: 'Field duplicate RPD', scope: 'WDL-26Q2-003 / WDL-26Q2-004 · MW05', outcome: 'warn', detail: 'Zinc 21.4 and 31.6 µg/L — RPD 38.2% against a 30% limit. Both results above 5 × LOR, so the percentage test applies and this is a real disagreement rather than noise near the limit.', action: 'Qualifier J assigned — estimated' },
  { check: 'Field duplicate RPD', scope: 'Cadmium · WDL-26Q2-003 / WDL-26Q2-004', outcome: 'pass', detail: 'Both results below 5 × LOR, so the absolute-difference test applies rather than RPD: 0 µg/L against a 2 × LOR allowance. An RPD here would have been arithmetic on noise.', action: '—' },
  { check: 'Laboratory duplicate RPD', scope: 'PAS-WO-268841 · split of WDL-26Q2-003', outcome: 'pass', detail: 'Maximum RPD 4.1% (sulfate) against a 20% limit across 14 analytes.', action: '—' },
  { check: 'Method blank', scope: 'PAS-WO-268841 · MB-268841', outcome: 'pass', detail: 'Every analyte below the limit of reporting in the preparation blank.', action: '—' },
  { check: 'Laboratory control sample', scope: 'PAS-WO-268841 · LCS-268841', outcome: 'pass', detail: 'Recovery 96–104% across 8 analytes against an 80–120% limit.', action: '—' },
  { check: 'Matrix spike recovery', scope: 'PAS-WO-268841 · zinc', outcome: 'fail', detail: 'Zinc recovered 62% against a 70–130% limit, reproduced at 64% on the spike duplicate. Matrix interference, not a one-off.', action: 'Qualifier L — biased low — on all 9 zinc results in the batch' },
  { check: 'Field blank', scope: 'WDL-26Q2-QC1', outcome: 'pass', detail: 'All analytes below LOR.', action: '—' },
  { check: 'Trip blank', scope: 'WDL-26Q2-QC2', outcome: 'pass', detail: 'All analytes below LOR.', action: '—' },
  { check: 'Equipment blank', scope: 'WDL-26Q2-QC3 · bladder pump, after MW05', outcome: 'warn', detail: 'Zinc 1.4 µg/L in the equipment rinsate against a 1.0 µg/L LOR. The pump was reused between MW05 and MW07, and MW07 is the other zinc exceedance this round.', action: 'MW07 zinc flagged for review — carry-over cannot be ruled out' },
  { check: 'Surrogate recovery', scope: 'PFAS batch YAR-B-118420', outcome: 'pass', detail: 'M8PFOS recovery 94% (limits 70–130%) on every sample.', action: '—' },
  { check: 'Field parameter stabilisation', scope: 'MW09', outcome: 'warn', detail: 'Turbidity never fell below 10 NTU across 14 readings and 22 L purged. Sampled at the field officer’s judgement.', action: 'Qualifier T on every metal result from this sample' },
  { check: 'Ionic balance', scope: 'MW05', outcome: 'warn', detail: 'Cation–anion balance −7.8% against a ±5% acceptance limit.', action: 'Review item raised — check sulfate and hardness' },
  { check: 'EC : TDS ratio', scope: '7 bores', outcome: 'pass', detail: 'All within 0.55–0.75 of the expected relationship.', action: '—' },
  { check: 'Spike against history', scope: 'Arsenic · MW05', outcome: 'warn', detail: '28.4 µg/L is 2.4× the location’s prior rolling median of 11.8 µg/L.', action: 'Confirmed against the certificate — real, not transcription' },
  // The same check, on the series `EC_MW05` holds. Its numbers are computed in
  // EC_MW05_OUTLIER rather than written here, so the row and the working on the
  // screen cannot come apart.
  { check: 'Spike against history', scope: 'Electrical conductivity · MW05', outcome: 'warn', detail: `${EC_MW05_OUTLIER.value} against a prior-round median of ${EC_MW05_OUTLIER.median} at this bore — a modified z-score of ${EC_MW05_OUTLIER.score} on ${EC_MW05_OUTLIER.n} rounds of its own record, against a ${EC_MW05_OUTLIER.threshold} threshold.`, action: 'Review item raised — flagged against the bore’s own record, not against a limit' },
];

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
  ].map((s) => {
    let run = 0;
    for (let i = s.values.length - 1; i >= 0 && s.values[i] > s.limit; i -= 1) run += 1;
    let trippedAt = null;
    let streak = 0;
    for (let i = 0; i < s.values.length; i += 1) {
      streak = s.values[i] > s.limit ? streak + 1 : 0;
      if (streak === 3 && !trippedAt) trippedAt = rounds[i];
    }
    return {
      ...s,
      run,
      above: s.values.map((v) => v > s.limit),
      trippedAt,
      outcome: run >= 3 ? 'triggered' : run === 2 ? 'one round short' : 'not triggered',
    };
  });
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

/** Obligations across the estate. */
export const OBLIGATIONS = [
  { what: 'Annual Environmental Report', to: 'DWER', due: '2026-09-30', remaining: '129 days', state: 'on track', owner: 'R. Whitmore', basis: 'Licence L8842/2019/1 condition 18' },
  { what: 'Quarterly groundwater monitoring — 2026 Q3', to: 'Internal programme', due: '2026-08-14', remaining: '82 days', state: 'on track', owner: 'A. Nakamura', basis: 'Sampling programme GW-QTR' },
  { what: 'PFAS exceedance notification', to: 'DWER', due: '2026-05-23 09:14', remaining: 'lodged', state: 'met', owner: 'R. Whitmore', basis: 'Licence condition 21 — as soon as practicable' },
  { what: 'Quarterly discharge return — 2026 Q2', to: 'DWER', due: '2026-07-28', remaining: '65 days', state: 'on track', owner: 'D. Okafor', basis: 'Licence L8842/2019/1 condition 14' },
  { what: 'TSF annual review — instrumentation', to: 'Board / GISTM', due: '2026-06-30', remaining: '37 days', state: 'at risk', owner: 'S. Petrelli', basis: 'GISTM requirement 4.3' },
  { what: 'Quarterly groundwater monitoring — 2026 Q2', to: 'Internal programme', due: '2026-05-14', remaining: 'overdue by 9 days at MW11', state: 'overdue', owner: 'A. Nakamura', basis: 'Sampling programme GW-QTR' },
  { what: 'Annual Audit Compliance Report', to: 'DWER', due: '2026-09-30', remaining: '129 days', state: 'on track', owner: 'R. Whitmore', basis: 'Licence L8842/2019/1 — a certified statement of compliance against every condition, separate from the AER' },
  { what: 'Contaminated Sites Act report — PFAS at MW05', to: 'DWER — contaminated sites', due: 'owed now', remaining: 'owed since 2026-05-22 09:14', state: 'overdue', owner: 'R. Whitmore', basis: 'Contaminated Sites Act 2003 (WA) s11 — a duty on awareness, not a licence condition' },
  { what: 'Subterranean fauna monitoring — 2026 wet season', to: 'Internal / EPA condition', due: '2026-09-15', remaining: '114 days', state: 'on track', owner: 'S. Petrelli', basis: 'Ministerial statement 1184 condition 9' },
  // Raised by the window condition tripping at 2026-Q1-GW, not by anybody
  // remembering to raise it — which is the point of evaluating a condition
  // rather than describing one.
  { what: 'Groundwater investigation programme — copper at MW05', to: 'DWER', due: '2026-03-16', remaining: 'lodged 2026-02-27', state: 'met', owner: 'A. Nakamura', basis: 'Licence L8842/2019/1 condition 12(c) — three consecutive rounds above the copper guideline value, tripped at 2026-Q1-GW' },
];

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
    { step: 'Component 1', what: 'PFOS (linear) = 3.1 ng/L · detected', detail: 'LOR 2.0 ng/L · method USEPA 1633 · analysed 2026-05-17', kind: 'input' },
    { step: 'Component 2', what: 'PFHxS = 1.7 ng/L · detected', detail: 'LOR 2.0 ng/L · method USEPA 1633 · analysed 2026-05-17', kind: 'input' },
    { step: 'Derivation', what: 'Sum of components · rule sum-pfas-anzg v2.1', detail: 'Non-detect treatment: exclude. Bound to ANZG 2018, not to a global setting (FR-2.2).', kind: 'rule' },
    { step: 'Derived result', what: '4.8 ng/L · flagged derived, not reported by the laboratory', detail: 'Stored additively. Neither component was overwritten (FR-2.4).', kind: 'derived' },
    { step: 'Evaluation', what: 'ANZG 2018 95% species protection · 0.13 ng/L · exceedance at 37×', detail: 'Evaluated synchronously on commit, 2026-05-19 10:22. Criteria version 2018.1.', kind: 'evaluation' },
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
 * Every project the principal holds a binding in (§2.1).
 *
 * The role is on the row because *as what* you are acting is the first thing
 * project scope decides, and a user who cannot see it is guessing. One of
 * these is deliberately `viewer`: a switcher that only ever shows one role
 * teaches nothing about what the scope means.
 */
export const PROJECTS = [
  { code: 'MOCK-WDL', name: 'Wandalup Operations', role: 'Contributor', facility: 'Wandalup mine and TSF', locations: 9, open: 9, due: '2026-08-14', current: true },
  { code: 'MOCK-KRJ', name: 'Kurrajong Borefield', role: 'Contributor', facility: 'Kurrajong water supply', locations: 14, open: 0, due: '2026-09-01', current: false },
  { code: 'MOCK-WNJ', name: 'Wanjina Landfill', role: 'Approver', facility: 'Wanjina waste facility', locations: 6, open: 2, due: '2026-08-29', current: false },
  { code: 'MOCK-YRA', name: 'Yarra Rehabilitation', role: 'Viewer', facility: 'Yarra closure area', locations: 22, open: 0, due: '—', current: false },
];

/**
 * The work queue (§1.1) — what needs this person, before any navigation.
 *
 * Ordered by role rather than by configuration: the principal is a
 * hydrogeologist, so exceptions sort above approvals. Each row carries the
 * screen that *resolves* it, never a list to re-search from.
 */
export const WORK_QUEUE = [
  { kind: 'Exceedance', urgency: 'now', headline: 'PFOS + PFHxS at MW05 is 37× the ANZG 2018 DGV', context: 'MOCK-WDL · first occurrence · TARP Level 3 raised', age: '3 days open', target: 'exceedances', action: 'Review exceedance' },
  { kind: 'Notification', urgency: 'now', headline: 'Statutory notification lodged — evidence not attached', context: 'MOCK-WDL · DWER condition 21 · lodged 2026-05-22 14:30 AWST', age: '1 day', target: 'notification', action: 'Attach receipt' },
  { kind: 'Overdue round', urgency: 'now', headline: 'MW11 not sampled for 2026 Q2', context: 'MOCK-WDL · programme GW-QTR · window closed 2026-05-14 AWST', age: 'overdue by 9 days', target: 'programme', action: 'Record or reschedule' },
  { kind: 'Review', urgency: 'soon', headline: '3 questions on IMP-0239 block its commit', context: 'MOCK-WDL · Yarra Regional Analytical · 42 rows read', age: '5 days', target: 'import-review', action: 'Answer questions' },
  { kind: 'Quarantine', urgency: 'soon', headline: '3 rows held out of IMP-0239', context: 'MOCK-WDL · holding time, aborted analysis', age: '5 days', target: 'quarantine', action: 'Resolve holds' },
  { kind: 'Alert', urgency: 'soon', headline: 'TSF-VWP-03 has not reported for 41 hours', context: 'MOCK-WDL · vibrating wire piezometer · last reading 2026-08-21 16:12', age: '41 h', target: 'tarp', action: 'Acknowledge' },
  { kind: 'Stale figure', urgency: 'soon', headline: 'Report §5 exceedance table is stale after a supersession', context: 'MOCK-WDL · arsenic at MW03B superseded 2026-05-19', age: '4 days', target: 'supersession', action: 'Regenerate' },
  { kind: 'Approval', urgency: 'later', headline: '2026 Q1 report awaits your countersignature', context: 'MOCK-WNJ · you hold Approver on this project', age: '11 days', target: 'signoff', action: 'Review snapshot' },
];

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
export const SEARCH = {
  query: 'MW0',
  groups: [
    { label: 'Locations — identifier match', rows: [
      { code: 'MW05', what: 'Groundwater monitoring bore · TSF · downgradient', project: 'MOCK-WDL', target: 'location', badge: 'exceedance' },
      { code: 'MW01A', what: 'Groundwater monitoring bore · Borefield · upgradient', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW03B', what: 'Groundwater monitoring bore · Borefield · nested, confined', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW07', what: 'Groundwater monitoring bore · TSF · downgradient', project: 'MOCK-WDL', target: 'location', badge: null },
      { code: 'MW09', what: 'Groundwater monitoring bore · compliance boundary', project: 'MOCK-WDL', target: 'location', badge: 'indeterminate' },
      { code: 'MW04', what: 'Groundwater monitoring bore · Kurrajong borefield', project: 'MOCK-KRJ', target: 'location', badge: 'other project' },
    ] },
    { label: 'Sampling events', rows: [
      { code: '2026-Q2-GW', what: 'Quarterly groundwater · collected 12–14 May 2026 · includes MW05', project: 'MOCK-WDL', target: 'events', badge: null },
    ] },
    { label: 'Import runs and certificates', rows: [
      { code: 'PAS2026-04417', what: 'Certificate · Pilbara Analytical Services · 231 results · covers MW05', project: 'MOCK-WDL', target: 'certificate', badge: null },
      { code: 'IMP-0239', what: 'Import run · Yarra Regional v2 · in review · 3 questions', project: 'MOCK-WDL', target: 'import-review', badge: 'in review' },
    ] },
    { label: 'Criteria sets and licences', rows: [
      { code: 'L8842/2019/1', what: 'Licence · DWER · 24 conditions · governs MW05, MW07, MW09, MW11', project: 'MOCK-WDL', target: 'licence', badge: null },
    ] },
  ],
};

/** The facility → area hierarchy (§3.1, FR-1.1). */
export const FACILITY = {
  name: 'Wandalup mine and TSF',
  operator: 'Wandalup Resources Pty Ltd',
  tenement: 'M47/1882',
  areas: [
    { name: 'Borefield', kind: 'Water supply', locations: 3, parent: '—', programme: 'GW-QTR', note: 'Upgradient and background control' },
    { name: 'TSF', kind: 'Tailings storage', locations: 3, parent: '—', programme: 'GW-QTR, GW-MTH', note: 'Downgradient of the embankment; monthly since 2026-03-01' },
    { name: 'Compliance boundary', kind: 'Regulatory', locations: 2, parent: '—', programme: 'GW-QTR', note: 'Licence Table 4 applies here and nowhere else' },
    { name: 'Wandalup Creek', kind: 'Surface water', locations: 1, parent: '—', programme: 'SW-QTR', note: 'Downstream of the licensed discharge point' },
  ],
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
 * is nine days overdue at that bore (COMPLETENESS, OBLIGATIONS), and a manifest
 * that quietly listed it would make an overdue round read as collected.
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
    { n: '23', what: 'Abstraction must not exceed 1,250 ML per water year', governs: 'PB01, PB02 (production bores)', discharges: 'Annual water return', state: 'on track' },
  ],
  dischargePoints: [
    { id: 'DP01', what: 'Licensed surface discharge to Wandalup Creek', limit: '≤ 4 ML/day · Table 4 quality', monitored: 'SW01, 200 m downstream' },
  ],
  entitlements: [
    { id: 'GWL-118842', what: 'Groundwater abstraction entitlement', limit: '1,250 ML per water year (1 Jul – 30 Jun)', used: '812 ML to 2026-08-23', headroom: '438 ML · 65% of year elapsed' },
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
  { name: 'A. Nakamura', identity: 'anakamura@wandalup.example', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-23 07:41 AWST', state: 'active' },
  { name: 'D. Okafor', identity: 'dokafor@wandalup.example', role: 'Contributor', granted: '2024-06-03', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Contributors', lastSeen: '2026-08-22 16:08 AWST', state: 'active' },
  { name: 'R. Whitmore', identity: 'rwhitmore@wandalup.example', role: 'Approver', granted: '2024-02-19', by: 'System administrator', group: 'SG-Strataflow-WDL-Approvers', lastSeen: '2026-08-23 06:55 AWST', state: 'active' },
  { name: 'S. Petrelli', identity: 'spetrelli@wandalup.example', role: 'Viewer', granted: '2025-03-11', by: 'R. Whitmore', group: 'SG-Strataflow-WDL-Viewers', lastSeen: '2026-08-19 09:12 AWST', state: 'active' },
  { name: 'J. Halloran', identity: 'jhalloran@wandalup.example', role: 'Contributor', granted: '2024-02-19', by: 'R. Whitmore', group: '— removed from group 2026-07-31', lastSeen: '2026-07-30 15:44 AWST', state: 'deprovisioned' },
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
  { group: 'Field capture', keys: [
    { k: 'Tab', what: 'Next field, staying in the row' },
    { k: 'Enter', what: 'Next row, same column' },
    { k: 'D', what: 'Mark the bore dry' },
    { k: '⌘ S', what: 'Save the round locally' },
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
 * The purge log and the stabilisation record (low-flow sampling).
 *
 * A sample is defensible because the parameters had stabilised when it was
 * taken, not because somebody wrote a number in a box. Three consecutive
 * readings within tolerance is the standard test, and without the readings
 * behind it the whole chain of custody, lineage and evaluation below rests on
 * an assertion nobody can check. The incumbents record purge logs; nothing
 * here did.
 */
export const PURGE = {
  location: 'MW05',
  round: '2026-Q3-GW',
  method: 'Low-flow (minimal drawdown) · AS/NZS 5667.11',
  pump: 'Bladder pump, intake at 15.0 m btoc — mid-screen',
  rate: '0.24 L/min',
  startedAt: '2026-08-14 07:41 AWST',
  sampledAt: '2026-08-14 08:19 AWST',
  purgedVolume: '9.1 L',
  drawdown: '0.06 m — within the 0.10 m limit for low-flow',
  tolerance: {
    ph: '± 0.1 pH units',
    ec: '± 3%',
    do: '± 10%',
    orp: '± 10 mV',
    turbidity: '< 10 NTU and ± 10%',
    temp: '± 0.2 °C',
  },
  readings: [
    { t: '07:46', swl: 8.41, ph: 8.62, ec: 3180, do: 2.41, orp: 118, turb: 41.2, temp: 26.8, stable: false },
    { t: '07:51', swl: 8.43, ph: 8.74, ec: 3260, do: 1.98, orp: 104, turb: 28.4, temp: 26.6, stable: false },
    { t: '07:56', swl: 8.44, ph: 8.83, ec: 3330, do: 1.62, orp: 96, turb: 17.1, temp: 26.5, stable: false },
    { t: '08:01', swl: 8.45, ph: 8.88, ec: 3380, do: 1.44, orp: 91, turb: 9.8, temp: 26.4, stable: false },
    { t: '08:06', swl: 8.46, ph: 8.90, ec: 3396, do: 1.39, orp: 89, turb: 7.2, temp: 26.4, stable: true },
    { t: '08:11', swl: 8.46, ph: 8.91, ec: 3404, do: 1.36, orp: 88, turb: 6.4, temp: 26.4, stable: true },
    { t: '08:16', swl: 8.47, ph: 8.91, ec: 3410, do: 1.34, orp: 87, turb: 6.1, temp: 26.3, stable: true },
  ],
  verdict: 'Stabilised at 08:06 — three consecutive readings within tolerance on every parameter. Sample collected at 08:19.',
  /** The case that matters more than the clean one. */
  failing: {
    location: 'MW09',
    what: 'Turbidity never fell below 10 NTU across 14 readings and 22 L purged.',
    consequence:
      'Sampled anyway at the field officer’s judgement, and the record says so. Every metal result from this sample carries qualifier T — turbidity above the acceptance limit at collection — because a filtered metal from a turbid bore reads high and nobody can tell afterwards whether that was formation water or suspended sediment.',
  },
};

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
    { what: 'Custody seals intact', found: '2 of 2 intact', limit: 'all intact', outcome: 'pass' },
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
 */
export const QC_LIMITS = {
  set: 'Wandalup data quality objectives',
  version: '2025.2',
  effective: '2025-07-01 →',
  basis: 'AS/NZS 5667.1, the laboratory’s NATA-scoped QA plan, and the site’s own DQOs where these are tighter.',
  rules: [
    { check: 'Field duplicate RPD', limit: '≤ 30%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR', source: 'Site DQO, consistent with AS/NZS 5667.1' },
    { check: 'Laboratory duplicate RPD', limit: '≤ 20%', applies: 'Both results ≥ 5 × LOR', fallback: 'Below 5 × LOR: absolute difference ≤ 2 × LOR', source: 'PAS QA plan rev 8' },
    { check: 'Matrix spike recovery', limit: '70 – 130%', applies: 'One per 20 samples per matrix per batch', fallback: '—', source: 'PAS QA plan rev 8' },
    { check: 'MS/MSD RPD', limit: '≤ 30%', applies: 'Where a duplicate spike was run', fallback: '—', source: 'PAS QA plan rev 8' },
    { check: 'Laboratory control sample recovery', limit: '80 – 120%', applies: 'One per batch, per method', fallback: '—', source: 'PAS QA plan rev 8' },
    { check: 'Surrogate recovery — PFAS', limit: '70 – 130%', applies: 'Every sample, isotope-labelled', source: 'USEPA 1633' },
    { check: 'Method blank', limit: '< LOR', applies: 'One per batch, per method', fallback: 'Detection above LOR qualifies every sample in the batch', source: 'PAS QA plan rev 8' },
    { check: 'Field / trip / equipment blank', limit: '< LOR', applies: 'One field and one trip blank per event; an equipment blank per equipment reuse', source: 'Site DQO' },
    { check: 'Cation–anion balance', limit: '± 5%', applies: 'TDS > 100 mg/L', fallback: '± 10% below 100 mg/L, where analytical error dominates', source: 'APHA 1030E' },
    { check: 'Field parameter stabilisation', limit: '3 consecutive readings in tolerance', applies: 'Low-flow purging', source: 'AS/NZS 5667.11' },
  ],
  changed: 'Field duplicate RPD moved from 25% to 30% on 2025-07-01, and the 5 × LOR applicability rule was added in the same revision. Results evaluated before that date keep the limits in force then.',
};

/** The laboratory batch — what a QC result actually covers. */
export const BATCHES = [
  {
    id: 'PAS-WO-268841', lab: 'Pilbara Analytical Services', method: 'USEPA 200.8 — dissolved metals',
    samples: 9, prepared: '2026-05-16', analysed: '2026-05-17', nata: 'In scope · 2377 site 1841',
    qc: [
      { kind: 'Method blank', id: 'MB-268841', result: 'All analytes < LOR', outcome: 'pass' },
      { kind: 'Laboratory control sample', id: 'LCS-268841', result: 'Recovery 96 – 104% across 8 analytes', outcome: 'pass' },
      { kind: 'Laboratory duplicate', id: 'LD-268841 (of WDL-26Q2-003)', result: 'Max RPD 4.1% (sulfate)', outcome: 'pass' },
      { kind: 'Matrix spike', id: 'MS-268841 (of WDL-26Q2-005)', result: 'Zinc recovery 62%', outcome: 'fail' },
      { kind: 'Matrix spike duplicate', id: 'MSD-268841', result: 'Zinc recovery 64% · RPD 3.2%', outcome: 'fail' },
    ],
    consequence:
      'Zinc matrix-spike recovery of 62% is below the 70% limit and it is reproducible across the duplicate, so this is matrix interference rather than a one-off. Every zinc result in this batch — nine samples, including the MW05 exceedance at 31.6 µg/L — is qualified as biased low. A recovery below 100% biasing low means the true value is likely *higher*, so the exceedance stands and is if anything understated.',
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

/** Data quality assessment, against the objectives set before the round. */
export const DQA = [
  { dim: 'Precision', measure: 'Field duplicate RPD, laboratory duplicate RPD', objective: '≤ 30% field, ≤ 20% laboratory, above 5 × LOR', achieved: '1 of 15 field pairs outside — zinc at MW05, 38.2%', verdict: 'met with exception' },
  { dim: 'Accuracy', measure: 'LCS, matrix spike, surrogate recovery', objective: '80–120% LCS, 70–130% MS', achieved: 'LCS 96–104%. Zinc matrix spike 62% — below limit, reproducible', verdict: 'not met for zinc' },
  { dim: 'Representativeness', measure: 'Field parameter stabilisation, purge records, sampling position', objective: '3 consecutive readings in tolerance before collection', achieved: '6 of 7 bores stabilised. MW09 turbidity never below 10 NTU', verdict: 'met with exception' },
  { dim: 'Comparability', measure: 'Consistent methods, units and reporting limits across rounds', objective: 'No method change without a documented equivalence', achieved: 'Arsenic LOR stepped 5.0 → 1.0 µg/L at 2025-05 on a method change; recorded and drawn on the plate', verdict: 'met' },
  { dim: 'Completeness', measure: 'Results received against results planned', objective: '≥ 95% of planned results usable', achieved: '58 of 63 received, 55 usable — 87%', verdict: 'not met' },
  { dim: 'Sensitivity', measure: 'Reporting limit against the applicable criterion', objective: 'LOR ≤ 0.5 × criterion for every assessed analyte', achieved: 'Cadmium LOR 1.0 µg/L against a 0.54 µg/L criterion — 7 results unassessable', verdict: 'not met' },
];

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
