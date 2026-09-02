/**
 * The screens.
 *
 * Nine jobs, in the order a practitioner's day runs, and every screen reads from
 * `seed.mjs` so that two screens never disagree about the same bore. The job
 * spine is deliberately not the navigation of the shipped product — that is
 * `app/navigation/ia.ts`, six sections in the order the work happens, and it is
 * settled. This is a *catalogue* view of the same product: it groups by the
 * question the practitioner arrived with, so a reader can see the whole surface
 * at once. The two are compatible; where a screen exists in the product, its
 * real route is named on the screen itself.
 *
 * Screens marked `proposed: true` are not in the PRD. They are argued for in
 * README.md and drawn here so the argument can be looked at rather than read.
 */

import {
  ANALYTES, APPLIED_UNASKED, AUDIT, BUNDLE, COMPLETENESS, CONVERSIONS, CRITERIA, CRITERIA_LIBRARY,
  CROSSTAB, CROSSTAB_COLUMNS, DOCUMENTS, ENTITLEMENT, EVENTS, EVENT_SAMPLES, EXCEEDANCES, FACILITY,
  FORMATS, IMPORTS, INSTANCE, LICENCE, LINEAGE, LOCATIONS, MAPPING_ENTRIES, MAPPING_PROFILES,
  MEMBERS, NOTIFICATION, OBLIGATIONS, PRINCIPAL, PROJECT, PROJECTS, QAQC, QUARANTINE, REPORT,
  RESULT_DETAIL, REVIEW_ITEMS, ROUND, SAVED_VIEW_LIST, SEARCH, SHORTCUTS, SUBMISSIONS, SUPERSESSION,
  TARP, UNITS, UPGRADE, WORK_QUEUE,
  ASSIGNMENT, BACKGROUND, BATCHES, CUSTODY, DQA, HARDNESS, INDETERMINATE, NEST, PURGE, QC_LIMITS,
  RECEIPT, STATUTORY, STYGOFAUNA, TREND,
  CUSTODY_CHAIN, EC_MW05, EC_MW05_OUTLIER, LAB_QC, WINDOW_CONDITION,
  AMENDMENT, CRITERIA_DRAFT, DATA_RELEASE, GOLDEN, NON_DETECT, PFAS_COMPONENTS, Q1_ROUND,
  REGENERATION, REPORT_ITEMS, SIGNOFFS, SNAPSHOTS, TEMPLATE,
  WATER,
  KURRAJONG, PORTFOLIO,
  AS_AT,
  // Wave 6 — the field round, the decision layer, the DQO version pair, and
  // the three limits the PFAS components are reported against.
  DQO, FIELD_ROUND, METALS_BATCH, PFAS_LIMITS, QC_DECISIONS, Q2_OVERDUE,
  INDETERMINATE_QUOTE,
  // Wave 7 — provenance from the bore, the interpretation workspace, and the
  // shape of the crosstab now that a column is drawn empty.
  CONSTRUCTION, CROSSTAB_SHAPE, EVIDENCE, NARRATIVE, PROVENANCE, RENDERING_RULE,
} from './seed.mjs';
import {
  criteriaLegend, esc, facts, figure, loc, mark, notice, outcomeLegend, panel, ref, resultValue, table, tag, toneFor,
} from './ui.mjs';
import * as F from './figures.mjs';
/**
 * The interaction layer, namespaced so it stays visibly separate.
 *
 * `C.` on a call site is a reminder that the control being drawn is a
 * proposal — `design/reference/` has never seen any of it — while a bare
 * `table()` or `panel()` is a primitive the product already implements.
 */
import * as C from './controls.mjs';

/** The page header every screen shares: title, one line of purpose, a toolbar. */
function head(title, lede, { route, toolbar } = {}) {
  return (
    '<header class="mk-head">' +
    `<div class="mk-head__text"><h1>${title}</h1><p class="sf-lede">${lede}</p>` +
    (route ? `<p class="mk-route"><code>${esc(route)}</code></p>` : '') +
    '</div>' +
    (toolbar ? `<div class="mk-toolbar">${toolbar}</div>` : '') +
    '</header>'
  );
}

/**
 * W3-A-1: every register the staged amendment would rewrite says so, not only
 * the preview surfaces. Two surfaces disagreeing about whether a number is
 * settled is the custody failure again, one register over — and the counts
 * come from AMENDMENT so this line and the decision table cannot drift.
 */
const stagedNote = (would) =>
  `<p class="mk-tight mk-muted">An amendment is <a class="mk-ref" href="#certificate">staged on ${esc(AMENDMENT.certificate)}</a> against the locked 2026 Q1 period. Nothing here has moved — a locked period refuses the write — but ${would} if it is accepted.</p>`;

const btn = (label, kind = '') => `<button class="sf-button${kind ? ` sf-button--${kind}` : ''}" type="button">${esc(label)}</button>`;
const stat = (value, label, tone = 'neutral') =>
  `<div class="mk-stat mk-stat--${tone}"><span class="mk-stat__value">${esc(value)}</span><span class="mk-stat__label">${esc(label)}</span></div>`;
const stats = (items) => `<div class="mk-stats">${items.join('')}</div>`;
/**
 * One stacked cell, one flex item.
 *
 * Below 767 px `.sf-table--records tbody td` becomes `display: flex` so the
 * `data-label` pseudo-element can sit beside the value — and every *inline
 * element* inside such a cell becomes a flex item of its own on a line that
 * does not wrap. A cell of plain text is one anonymous item and wraps
 * normally; a cell that mixes a sentence with a link and an emphasis becomes
 * five items, and the cell's min-content width becomes the sum of all of them.
 * Measured on `#dqa` at 375 px: a 509 px table inside a 306 px panel, +184 px
 * of document overflow, from three sentences that had gained a link.
 *
 * Wrapping the content in one element makes it one flex item again, which
 * wraps inside itself the way the plain-text cells always did. It is a cell
 * that carries mixed inline markup into a record list that needs this — a
 * matrix pans and does not.
 */
const cell = (html) => `<span class="mk-cell">${html}</span>`;

const cols = (a, b, ratio = '3fr 2fr') => `<div class="mk-cols" style="--mk-cols:${ratio}">${a}${b}</div>`;
/**
 * Kilolitres printed as megalitres — one decimal, grouped.
 *
 * Volumes are held in kilolitres because an entitlement is a legal limit and a
 * rounding that lands a kilolitre over it is an exceedance nobody caused. This
 * is the only place the display rounding happens, so the take screen and the
 * licence panel cannot round the same volume two ways.
 */
const megalitres = (kl) =>
  (Math.round(kl / 100) / 10).toLocaleString('en-AU', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* ================================================================== *
 * J1 — Get the data in, and know it landed
 * ================================================================== */

const importRuns = () =>
  head('Import runs', 'Laboratory deliverables as they arrive, and the questions each one raised.', {
    route: '/projects/:projectId/imports',
    toolbar: C.exportMenu() + btn('Upload deliverable', 'primary'),
  }) +
  stats([
    stat('4', 'runs this quarter'),
    stat('231', 'rows committed', 'good'),
    stat('9', 'held for review', 'warn'),
    stat('1', 'reversed', 'bad'),
  ]) +
  cols(
    panel(
      'Read a deliverable',
      C.field({
        label: 'Files',
        control:
          '<div class="mk-drop"><p class="mk-drop__lede">Drop the deliverable here, or <button type="button" class="mk-linkbtn">choose files</button></p>' +
          '<p class="mk-drop__hint">An ESdat deliverable is a Sample file and a Chemistry file. Drop both — the import is one thing, not one per file.</p></div>' +
          '<ul class="mk-filelist"><li><span class="mk-file">Kurrajong.PA2601.ESdatSample4.csv</span><span class="mk-muted">18 KB · Sample</span><button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Remove file">×</button></li>' +
          '<li><span class="mk-file">Kurrajong.PA2601.ESdatChemistry4.csv</span><span class="mk-muted">94 KB · Chemistry</span><button type="button" class="mk-iconbtn mk-iconbtn--ghost" aria-label="Remove file">×</button></li></ul>',
        hint: 'Named as one deliverable — <strong>PA2601</strong> — rather than by whichever file happens to sort first.',
      }) +
        C.field({
          label: 'Format',
          required: true,
          control: C.select({
            placeholder: 'Choose the format this laboratory sends…',
            value: '__none',
            options: ['ESdat ELDF-4', 'Yarra Regional v2', 'ESdat legacy export', 'EQuIS EDD (4-file)', 'Transposed single CSV'],
          }),
          hint: 'Chosen, never defaulted. A deliverable read with the wrong format parses to zero rows, and every screen downstream then says — truthfully — that nothing is waiting.',
          error: 'Choose a format before reading. Pilbara Analytical Services last sent ESdat ELDF-4.',
        }) +
        C.field({
          label: 'Sampling event',
          control: C.combobox({
            value: '',
            placeholder: 'Which round is this?',
            open: false,
            suggestions: [],
          }),
          hint: 'Optional. Left blank, the round is resolved from each sample’s collection date in Australia/Perth.',
        }) +
        '<div class="mk-actions">' + btn('Read the file', 'primary') + btn('Cancel') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem"><strong>Reading is not committing.</strong> The file is parsed into an inspectable stage and nothing reaches the record until you commit.</p>',
    ),
    panel(
      'Reading, and it says how far',
      C.progress({
        pct: 100,
        label: 'Upload — 112 KB, two files',
        detail: 'Complete. Held on this instance; the laboratory’s original bytes are retained, not just the parsed form.',
        tone: 'run',
      }) +
        C.pipeline([
          { name: 'Parse', detail: '2 files · ESdat ELDF-4 · 42 rows read, 0 unreadable. The count comes first, before anything else happens.', state: 'done' },
          { name: 'Map', detail: '39 rows resolved against the dictionary and the Yarra Regional profile · 73 mappings applied without asking · 3 questions raised.', state: 'done', rerun: true },
          { name: 'Validate', detail: 'Holding times, reporting limits and duplicate RPD run against 39 rows · 3 held.', state: 'done', rerun: true },
          { name: 'Review', detail: '3 questions outstanding. The commit is gated on them.', state: 'run' },
          { name: 'Commit', detail: 'Waiting. Nothing has been written.', state: 'wait' },
        ]) +
        C.toast({
          tone: 'warn',
          headline: 'This file has already been read.',
          detail: 'Identical content to IMP-0238, committed 2026-04-02. <strong>Nothing was written.</strong> That is different from an import that failed — this one succeeded and had nothing to add.',
          undo: 'Open IMP-0238',
        }),
    ),
    '1fr 1fr',
  ) +
  table({
    caption: 'Every deliverable read on this project, newest first.',
    head: ['Run', 'File', 'Format', 'Laboratory', 'Received', 'Rows', 'Held', 'State', 'By'],
    kind: 'matrix',
    label: 'Import runs',
    rows: IMPORTS.map((i) => [
      `<a href="#import-review"><code>${esc(i.id)}</code></a>`,
      `<span class="mk-file">${esc(i.file)}</span>`,
      esc(i.format),
      esc(i.lab),
      `<span class="sf-instant">${esc(i.received)}</span>`,
      `<span class="mk-num">${i.rows}</span>`,
      i.held ? `<span class="mk-num mk-num--warn">${i.held}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      tag(i.state, toneFor(i.state)),
      esc(i.by),
    ]),
  }) +
  notice(
    'default',
    'The format is chosen, never defaulted.',
    'A deliverable read with the wrong format parses to zero rows and every downstream screen then says, truthfully, that nothing is waiting. The importer states how many rows it read before anything else happens.',
  );

const importReview = () => {
  const items = REVIEW_ITEMS.map(
    (r) => `<li class="sf-review">
      <div class="sf-review__head"><span class="sf-review__kind">${esc(r.kind)}</span>
        <span class="sf-confidence"><span class="sf-confidence__track"><span class="sf-confidence__fill" style="width:${Math.round(r.confidence * 100)}%"></span></span>${(r.confidence * 100).toFixed(0)}%</span></div>
      <p class="sf-review__subject">${esc(r.subject)}</p>
      <p class="sf-review__detail">${esc(r.detail)}</p>
      <div class="sf-review__body">
        <div><p class="sf-review__detail"><strong>If you accept:</strong> ${esc(r.consequence)}</p>
          <p class="sf-review__detail"><strong>${r.rows} row${r.rows === 1 ? '' : 's'} at stake${r.rows ? '' : ''}.</strong> The commit is gated on this question, and that number is what it is gating.</p></div>
        <div class="sf-review__actions">
          <div class="sf-review__options">${r.options
            .map((o, i) => `<span class="sf-review__option${i === 0 ? ' mk-option--proposed' : ''}"><kbd class="mk-kbd">${i + 1}</kbd>${esc(o)}</span>`)
            .join('')}<span class="sf-review__option mk-option--escape"><kbd class="mk-kbd">H</kbd>${esc(r.escape)}</span>
          <p class="sf-review__detail">Reversible until you commit. Nothing is written yet.</p></div>
          ${btn('Apply', 'primary')}
        </div>
      </div></li>`,
  ).join('');

  return (
    head('Review — IMP-0239', 'Three questions the importer could not answer for itself.', {
      route: '/projects/:projectId/imports (review stage)',
      toolbar: btn('Quarantine the rest') + btn('Commit this import', 'primary'),
      kind: 'matrix',
      label: 'Import runs',
    }) +
    stats([
      stat('42', 'rows read'),
      stat('39', 'ready to commit', 'good'),
      stat('3', 'waiting on you', 'warn'),
      stat('73', 'applied without asking'),
    ]) +
    notice(
      'warning',
      '3 questions, holding 25 rows. The commit is blocked until each one has an answer.',
      'Every question states the rows it holds, and they sum to the number above — a queue that says “0 rows” on a question that blocks a commit cannot be triaged by anybody. Answer them with the keyboard: <kbd class="mk-kbd">J</kbd> and <kbd class="mk-kbd">K</kbd> move, <kbd class="mk-kbd">1</kbd>–<kbd class="mk-kbd">9</kbd> choose, <kbd class="mk-kbd">Enter</kbd> applies and advances, <kbd class="mk-kbd">A</kbd> accepts everything above 95%, and <kbd class="mk-kbd">⌘</kbd><kbd class="mk-kbd">Z</kbd> undoes the last one.',
    ) +
    cols(
      `<section><h2 class="mk-h2">Waiting on you</h2><ul class="sf-queue">${items}</ul></section>`,
      panel(
        'Applied without asking — and why',
        '<p class="sf-review__detail mk-tight">Every one of these is reversible with the import. None of them is a silent default: the rule that fired is recorded on each result.</p>' +
          table({
            head: ['Change', 'Basis', 'Rows'],
            rows: APPLIED_UNASKED.map((a) => [esc(a.what), `<span class="mk-muted">${esc(a.why)}</span>`, `<span class="mk-num">${a.count}</span>`]),
          }),
      ),
    )
  );
};

const importCommit = () =>
  head('Commit — IMP-0239', 'What will be written, stated from the database rather than from the screen.', {
    route: '/projects/:projectId/imports (commit stage)',
  }) +
  cols(
    panel(
      'Before — what the control says it will do',
      C.blastRadius({
        lede: 'Committing IMP-0239 writes, in one transaction:',
        rows: [
          { what: 'Results', n: '39' },
          { what: 'Derived results', n: '1' },
          { what: 'Lineage records', n: '40' },
          { what: 'Evaluations, across 2 criteria sets', n: '78' },
          { what: 'New exceedances raised', n: '2' },
          { what: 'Rows held rather than written', n: '3' },
        ],
        action: 'Commit 39 results',
        cancel: 'Keep reviewing',
        reversible:
          'Reversible. A committed run can be withdrawn, which removes its results from every register that counted them and leaves the reversal itself on the record — a reversal is an event, not an erasure.',
      }) +
        '<p class="mk-tight">The counts come from the staged data rather than from this screen, and they are the same numbers the receipt below will report. A commit control that does not say what it will write is asking for a signature on a blank page.</p>',
    ),
    panel(
      'What is not written, and why',
      notice(
        'warning',
        '3 rows are held rather than committed, and each one names its reason.',
        'Partial accept is the design: what is valid lands, and what is not is quarantined somewhere a person can act on it — not dropped, and not guessed at.',
      ) +
        table({
          head: ['Row', 'Subject', 'Held because'],
          rows: QUARANTINE.filter((q) => q.state === 'held').map((q) => [
            `<span class="mk-num">${q.row}</span>`,
            `<span class="mk-file">${esc(q.subject)}</span>`,
            `<span class="mk-muted">${esc(q.reason)}</span>`,
          ]),
        }) +
        `<div class="mk-actions"><a class="mk-btn mk-btn--sm" href="#quarantine">Open the held rows</a></div>` +
        '<p class="mk-tight" style="margin-top:.6rem">The count reaches the run, the project home and the work queue. A held row visible only to somebody who thought to look for it has been dropped, whatever the database says.</p>',
    ),
    '1fr 1fr',
  ) +
  cols(
    panel(
      'After — the receipt, and the control is gone',
      C.receipt({
        headline: '39 results committed to MOCK-WDL.',
        facts: [
          ['Run', 'IMP-0239'],
          ['Committed', '2026-05-19 10:22 AWST'],
          ['By', 'D. Okafor'],
          ['Transaction', '8f2c…41ab'],
          ['Written', '39 results · 1 derived · 78 evaluations'],
          ['Held', '3 rows'],
          ['Exceedances raised', '2'],
        ],
        next: { label: 'See the 39 results', target: 'crosstab' },
        undo: 'Reverse this commit',
      }) +
        '<p class="mk-tight"><strong>The commit control is not on this page any more.</strong> It is removed rather than disabled, and the write refuses a second commit underneath regardless — because a button that stays put after succeeding is an invitation, and one accidental double-click writes every row twice into an append-only record.</p>' +
        C.toast({
          tone: 'good',
          headline: '39 results committed. 3 rows held.',
          detail: 'Two exceedances were raised at MW05 and a TARP Level 3 trigger fired. Evaluation ran inside the committing transaction, so both were true the moment the import landed rather than on the next tick of something.',
          undo: 'Reverse',
        }),
    ),
    panel(
      'Reversing one',
      C.dialog({
        title: 'Reverse IMP-0240?',
        body:
          '<p>This withdraws <strong>84 results</strong> committed on 2026-05-19 16:02. They stop being live: every register that counted them recounts, and the two exceedances they raised are withdrawn.</p>' +
          '<p>Nothing is deleted. The results, their lineage and this reversal all stay readable, and the run is marked reversed rather than removed — so a report issued while they were live can still be explained.</p>' +
          '<p class="mk-muted">A run can be reversed once. A second attempt is refused rather than silently repeated.</p>',
        confirm: 'Reverse 84 results',
        danger: true,
        typeToConfirm: 'IMP-0240',
      }),
    ),
    '1fr 1fr',
  );

const certificate = () =>
  head('Certificate PAS2026-04417', 'The laboratory document, and every result it produced.', {
    route: '/projects/:projectId/imports (certificate)',
    toolbar: btn('Download original'),
  }) +
  cols(
    facts([
      ['Laboratory', esc(ROUND.laboratory)],
      ['Certificate', `<code>${esc(ROUND.certificate)}</code>`],
      ['Issued', '2026-05-21'],
      ['Received', esc(ROUND.received)],
      ['Original file', '<span class="mk-file">PAS2026-04417_Wandalup_2026Q2.zip · 1.4 MB · retained</span>'],
      ['Results produced', '<span class="mk-num">231</span>'],
      ['Supersedes', '<code>PAS2026-04398</code> — amended, transcription error'],
      ['NATA accreditation', '2377 · site 1841'],
    ]) +
      notice('default', 'The source file is kept, not parsed and discarded.',
        'FR-3.8 makes the certificate the thing every result points back to. A regulator asking where a number came from gets the laboratory’s own document, not a reconstruction of it.'),
    panel('Supersession cascade', table({
      head: ['What followed the amendment', 'Outcome'],
      rows: SUPERSESSION.cascade.map((c) => [esc(c.what), `<span class="mk-muted">${esc(c.outcome)}</span>`]),
    })),
  ) +
  amendmentDecision();

/** A value as it was issued, beside the value that would stand. Never a deletion. */
const struck = (was, now) =>
  '<span class="sf-result">' +
  `<span class="sf-visually-hidden">${esc(`${was} as issued, amended to ${now}`)}</span>` +
  `<span class="sf-result__superseded" aria-hidden="true">${esc(was)}</span>` +
  '<span class="sf-result__arrow" aria-hidden="true">→</span>' +
  `<span class="sf-result__value" aria-hidden="true">${esc(now)}</span></span>`;

/** An outcome as the product draws it everywhere: a shape, then the word. */
const outcomeCell = (outcome, set = 'ANZG 2018 · 95%') =>
  outcome === 'not evaluated'
    ? '<span class="mk-num mk-num--nil">—</span>'
    : `<span class="sf-result">${mark(outcome.replace(' ', '_'), set)}<span style="margin-left:.4rem">${esc(outcome)}</span></span>`;

/**
 * An amendment on a round that has already been reported, drawn as one chain.
 *
 * The supersession above was absorbed the day it arrived, because the round it
 * touched was open. This one is not: `#qualifiers` records 2025 Q1 – 2026 Q1 as
 * **locked**, reported to DWER, and a locked period refuses a write rather than
 * warning about one. So the amended values are staged — computed, previewed and
 * standing nowhere — and what is drawn below is what accepting them would do.
 * That is why the exceedance register, the TARP board and the licence still read
 * as they do while this screen says two of their entries are in question.
 *
 * The chain is one chain deliberately. Six panels each true on their own let a
 * reader decide an amendment on the first of them; a reader who can see from
 * “three results moved” to “an obligation already lodged rests on one of them”
 * is deciding the thing they are actually deciding. Every count in it is
 * computed in `seed.mjs` from the values either side of the amendment, using
 * the evaluation's own window function rather than a second copy of the rule.
 */
const amendmentDecision = () => {
  const A = AMENDMENT;
  const H = A.hardness;
  const c = A.counts;
  const hop = (n, kind, label, what, detail) =>
    `<li class="mk-chain__step mk-chain__step--${kind}">` +
    `<span class="mk-chain__n">${n}</span>` +
    `<div class="mk-chain__text"><span class="mk-chain__label">${esc(label)}</span>` +
    `<span class="mk-chain__what">${what}</span>` +
    `<span class="mk-chain__detail">${detail}</span></div></li>`;
  const fmt = (v, unit) => (unit === 'µS/cm' ? String(v) : Number(v).toFixed(1));

  return (
    '<h2 class="mk-h2" style="margin-top:1.6rem">An amendment on a round that has already been reported</h2>' +
    notice(
      'warning',
      `${esc(A.certificate)} re-reports ${c.resultsAmended} results on ${esc(A.round)}, and that round is inside a locked period.`,
      `The period <strong>${esc(Q1_ROUND.lock)}</strong> was closed to writes when the 2026 Q1 report went to DWER, and a locked period <a class="mk-ref" href="#qualifiers">refuses a write rather than warning about one</a>. The amended values are staged: computed, previewed, and standing nowhere. Nothing on the exceedance register, the TARP board or the licence has moved, and nothing will until somebody decides. What follows is what accepting would do.`,
    ) +
    cols(
      facts([
        ['Amended certificate', `<code>${esc(A.certificate)}</code>`],
        ['Amends', `<code>${esc(A.supersedes)}</code> · round <span class="mk-file">${esc(A.round)}</span> · collected ${esc(Q1_ROUND.collected)}`],
        ['Laboratory', `${esc(A.laboratory)} · work order <span class="mk-file">${esc(A.workOrder)}</span>`],
        ['Issued', `<span class="sf-instant">${esc(A.issued)}</span> — ${esc(String(Math.round((Date.parse(A.issued) - Date.parse(Q1_ROUND.issued)) / 86400000)))} days after the original`],
        ['Received', `<span class="sf-instant">${esc(A.received)}</span> · staged by ${esc(A.stagedBy)}`],
        ['Original file', `<span class="mk-file">${esc(A.file)}</span>`],
        ['Results re-reported', `<span class="mk-num mk-num--warn">${c.resultsAmended}</span> of the <span class="mk-num">${esc(String(SNAPSHOTS[0].results))}</span> the issued 2026 Q1 report stands on`],
        ['State', C.status(A.state, 'warn')],
      ]),
      panel(
        'Why the laboratory re-issued',
        A.findings
          .map(
            (f) =>
              `<h3 class="mk-h3">Finding ${f.n} — ${esc(f.what)}</h3>` +
              `<p class="mk-tight">${esc(f.detail)}</p>` +
              `<p class="mk-tight mk-muted">${esc(f.remedy)}</p>`,
          )
          .join('') +
          `<p class="mk-tight mk-muted"><strong>On the numbering:</strong> ${esc(A.naming)}</p>`,
      ),
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The chain, hop by hop</h2>' +
    `<ol class="mk-chain">${[
      hop(1, 'source', 'What the amendment changed',
        `<strong>${c.resultsAmended} results</strong> at ${loc('MW05')} re-reported — copper, zinc and total hardness. ${ref('supersession', 'The supersession record')}`,
        `Copper ${A.rows[0].issuedText} → ${A.rows[0].amendedText} µg/L · zinc ${A.rows[1].issuedText} → ${A.rows[1].amendedText} µg/L · hardness ${H.issued} → ${H.amended} mg/L. Nothing is overwritten; the issued values stay readable beside the amended ones.`),
      hop(2, 'rule', 'Recalculated derivations',
        `The hardness cross-check reconciles for the first time, and <strong>${c.criteriaRecomputed} hardness-modified criteria</strong> at this bore are recomputed. ${ref('hardness', 'How this criterion was calculated')}`,
        `${esc(H.formula)} over the same calcium and magnesium — which were not re-analysed — gives ${esc(H.computed)} mg/L. Against the issued hardness that is ${esc(H.agreementIssued)}, outside the ${esc(H.limit)} limit; against the amended one, ${esc(H.agreementAmended)}.`),
      hop(3, 'evaluation', 'Changed exceedance outcomes',
        `<strong>${c.outcomesChanged} of ${c.resultsPreviewed - 1}</strong> assessed outcomes change — both from exceedance to compliant. ${ref('exceedances', 'The exceedance register')}`,
        `Copper and zinc at ${'MW05'} in ${esc(A.round)} come off the register. Nickel and cadmium do not change although their criteria move, and the table below says why.`),
      hop(4, 'evaluation', 'Changed condition outcomes',
        `<strong>${c.windowsChanged} of ${A.windows.length}</strong> windowed series change, and the condition 12(c) trip is withdrawn. ${ref('licence', 'Licence L8842/2019/1')}`,
        `The trip at ${esc(A.round)} is what raised the groundwater investigation programme lodged on 2026-02-27 — an obligation ${ref('obligations', 'already discharged')} that would rest on a value no longer standing.`),
      hop(5, 'consequence', 'Trigger states',
        `<strong>${c.tarpMoved} of ${c.tarpLevels}</strong> TARP levels move. ${ref('tarp', 'The TARP board')}`,
        'Level 2 holds on arsenic rather than on copper, so the monthly programme at MW05 holds with it. Each level is stated below with the reason it stays, because a trigger that is simply not mentioned reads as a trigger nobody checked.'),
      hop(6, 'consequence', 'Affected reports',
        `<strong>${c.submissionsAffected} of ${c.submissionsTotal}</strong> issued submissions, and one item in the 2026 Q2 draft. ${ref('snapshot', 'Snapshot and regeneration')}`,
        `${esc(A.affectedSubmission.what)} was lodged on ${esc(A.affectedSubmission.submitted)} against snapshot ${esc(A.affectedSubmission.snapshot)}. The lodged document does not change; what changes is whether the record still says what it said. Figure 5.1 in the ${ref('report-figures', 'draft figure list')} is already flagged stale on this.`),
      hop(7, 'derived', 'The decision',
        'Accept, record as no material impact, or hold — <strong>and it is the decision, not the data, that is outstanding</strong>.',
        `The ${c.q2ResultsTouched === 0 ? 'entire 2026 Q2 round is untouched' : ''}: this certificate reports the February round, so nothing on the ${ref('crosstab', 'results crosstab')} moves either way.`),
    ].join('')}</ol>` +
    '<h2 class="mk-h2">The three results, and the two that did not move</h2>' +
    table({
      caption: `As issued beside as amended. A superseded value is struck, never removed — a reader holding last quarter's printed report has to be able to find the number it contains.`,
      head: ['Analyte', 'Result', 'Criterion here', 'Outcome as issued', 'Outcome if accepted', 'Why'],
      kind: 'matrix',
      label: 'Results re-reported on PAS2026-01884 rev B',
      rows: [
        [
          `${esc(H.analyte)}<small>${esc(H.unit)}</small>`,
          struck(H.issued, H.amended),
          '<span class="mk-num mk-num--nil">— not a criterion</span>',
          outcomeCell('not evaluated'),
          outcomeCell('not evaluated'),
          `<span class="mk-muted">An input to three criteria rather than a result with one. The correction is arithmetic and exact: ${esc(String(H.issued))} × 1.25 = ${esc(String(H.amended))}.</span>`,
        ],
        ...A.rows.map((r) => [
          `${esc(r.analyte)}<small>${esc(r.unit)}</small>`,
          r.valueMoved ? struck(r.issuedText, r.amendedText) : `<span class="mk-num">${esc(r.issuedText)}</span> <span class="mk-muted">unchanged</span>`,
          r.criterionMoved
            ? struck(r.criterionIssued, r.criterionAmended)
            : `<span class="mk-num">${esc(r.criterionIssued)}</span> <span class="mk-muted">flat</span>`,
          outcomeCell(r.before) + (r.factorBefore === '—' ? '' : ` <span class="mk-num mk-num--bad">${esc(r.factorBefore)}</span>`),
          outcomeCell(r.after) + (r.factorAfter === '—' ? '' : ` <span class="mk-num mk-num--bad">${esc(r.factorAfter)}</span>`),
          `<span class="mk-muted">${esc(r.why)}</span>`,
        ]),
      ],
    }) +
    `<p class="mk-tight">Zinc is the row worth reading twice. <strong>Both the result and its criterion move, and they move in opposite directions</strong> — the amended hardness makes the criterion less strict, from ${esc(A.rows[1].criterionIssued)} to ${esc(A.rows[1].criterionAmended)} µg/L, while the amended result falls from ${esc(A.rows[1].issuedText)} to ${esc(A.rows[1].amendedText)}. The outcome changes because the result moved further than the criterion did, and a screen that showed only one of the two would look like it had shown the working.</p>` +
    cols(
      panel(
        'The cross-check that had been failing since February',
        facts([
          ['Calcium (filtered)', `<span class="mk-num">${esc(String(H.calcium))} mg/L</span> <span class="mk-muted">not re-analysed</span>`],
          ['Magnesium (filtered)', `<span class="mk-num">${esc(String(H.magnesium))} mg/L</span> <span class="mk-muted">not re-analysed</span>`],
          ['Formula', `<code class="mk-file">${esc(H.formula)}</code>`],
          ['Computed hardness', `<span class="mk-num">${esc(H.computed)} mg/L</span>`],
          ['Reported, as issued', `<span class="mk-num">${esc(String(H.issued))} mg/L</span> · ${C.status(`${H.agreementIssued} against ${H.limit}`, 'bad')}`],
          ['Reported, as amended', `<span class="mk-num">${esc(String(H.amended))} mg/L</span> · ${C.status(`${H.agreementAmended} against ${H.limit}`, 'good')}`],
        ]) +
          `<p class="mk-tight">${esc(H.says)}</p>`,
      ),
      panel(
        'Every trigger level, and the reason it stays where it is',
        table({
          caption: `${c.tarpMoved} of ${c.tarpLevels} levels move.`,
          head: ['Level', 'Where', 'Moves', 'Because'],
          scroll: true,
          label: 'TARP levels against the staged amendment',
          rows: A.tarp.map((t) => [
            `<strong>${esc(t.level)}</strong><small>${esc(t.label)}</small>`,
            `<span class="mk-muted">${esc(t.locations)}</span>`,
            C.status(t.moves ? 'moves' : 'holds', t.moves ? 'bad' : 'good'),
            `<span class="mk-muted">${esc(t.why)}</span>`,
          ]),
        }),
      ),
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2">Condition 12(c), re-run over the amended round</h2>' +
    table({
      caption: 'The same rule and the same four rounds, run twice. ▲ marks a round above the criterion and · one below it, so the run reads across the row without reading the numbers.',
      head: ['Location', 'Parameter', 'Criterion', ...WINDOW_CONDITION.rounds, 'Run', 'Outcome'],
      kind: 'matrix',
      label: 'Condition 12(c) before and after the staged amendment',
      rows: A.windows.map((w) => [
        loc(w.location),
        esc(w.analyte),
        `<span class="mk-muted">${esc(w.criterion)}</span>`,
        ...w.before.values.map((v, i) => {
          const moved = v !== w.after.values[i];
          const glyph = (above) => (above ? '▲ ' : '· ');
          return moved
            ? `<span class="sf-result"><span class="sf-visually-hidden">${esc(`${fmt(v, w.unit)} as issued, amended to ${fmt(w.after.values[i], w.unit)}`)}</span>` +
              `<span class="sf-result__superseded" aria-hidden="true">${glyph(w.before.above[i])}${esc(fmt(v, w.unit))}</span>` +
              '<span class="sf-result__arrow" aria-hidden="true">→</span>' +
              `<span class="mk-num${w.after.above[i] ? ' mk-num--bad' : ''}" aria-hidden="true">${glyph(w.after.above[i])}${esc(fmt(w.after.values[i], w.unit))}</span></span>`
            : `<span class="mk-num${w.before.above[i] ? ' mk-num--bad' : ''}">${glyph(w.before.above[i])}${esc(fmt(v, w.unit))}</span>`;
        }),
        w.changed
          ? struck(`${w.before.run} of 3`, `${w.after.run} of 3`)
          : `<span class="mk-num">${w.before.run} of 3</span>`,
        w.changed
          ? `${C.status(w.before.outcome, w.before.outcome === 'triggered' ? 'bad' : 'warn')}<br>${C.status(w.after.outcome, 'neutral')}`
          : C.status(w.before.outcome, w.before.outcome === 'triggered' ? 'bad' : w.before.outcome === 'one round short' ? 'warn' : 'neutral'),
      ]),
    }) +
    cols(
      panel(
        'What the withdrawn trip reaches',
        `<p class="mk-tight">Copper at ${loc('MW05')} tripped on <span class="mk-file">${esc(WINDOW_CONDITION.series[2].trippedAt)}</span>, and that trip is what raised the groundwater investigation programme lodged with DWER on 2026-02-27. Accepting the amendment does not un-lodge it: a document that has gone to a regulator is withdrawn by writing to the regulator, and the product records which of those happened rather than doing the second one.</p>` +
          `<p class="mk-tight">The 2026 Q2 exceedance register would also read differently. <strong>Copper at MW05 would read <em>first</em> rather than <em>4th consecutive quarter</em></strong>, and zinc <em>first</em> rather than <em>2nd consecutive quarter</em> — the run column is counted from the rounds, so it moves when a round does.</p>` +
          `<p class="mk-tight mk-muted">${esc(WINDOW_CONDITION.frozen)}</p>`,
      ),
      panel(
        'The two series that do not move, and why not',
        A.windows
          .filter((w) => !w.changed)
          .map(
            (w) =>
              `<p class="mk-tight">${C.status('holds', 'good')} <strong>${esc(w.analyte)} at ${esc(w.location)}</strong> — ${esc(w.whyNot)}</p>`,
          )
          .join('') +
          '<p class="mk-tight mk-muted">Stating why a series did not change is the half of an impact preview that is usually left out, and it is the half a reader needs in order to trust the half that did.</p>',
      ),
    ) +
    '<h2 class="mk-h2">The decision</h2>' +
    `<p class="mk-tight">${esc(A.decision.asks)}</p>` +
    C.blastRadius({
      lede: 'Accepting the amendment into a locked period would write:',
      rows: [
        { what: 'Supersessions appended, with a reason on each', n: `${c.resultsAmended}` },
        { what: 'Results whose value is replaced in place', n: '0 — a superseded value stays readable' },
        { what: 'Assessed outcomes recomputed', n: `${c.resultsPreviewed - 1}` },
        { what: 'Outcomes that change', n: `${c.outcomesChanged}` },
        { what: 'Windowed series re-evaluated', n: `${A.windows.length}, of which ${c.windowsChanged} change` },
        { what: 'Licence conditions whose outcome moves', n: '1 — 12(c), from triggered to not triggered' },
        { what: 'Obligations already lodged that this puts in question', n: '1' },
        { what: 'Issued documents altered', n: '0 — a snapshot is what was issued' },
        { what: 'Snapshots flagged for reissue review', n: `${c.submissionsAffected}` },
        { what: '2026 Q2 results touched', n: `${c.q2ResultsTouched}` },
      ],
      action: 'Accept the amendment',
      cancel: 'Not yet — keep it staged',
      danger: true,
      reversible: A.decision.irreversible,
    }) +
    cols(
      panel(
        'The ways out, each with what it writes',
        table({
          caption: 'Three options and a refusal. None of them deletes anything, and none is the default (PP4, QB-7).',
          head: ['Option', 'What it does', ''],
          scroll: true,
          label: 'Ways to decide the amendment',
          rows: A.decision.ways.map((w) => [
            esc(w.label),
            `<span class="mk-muted">${esc(w.detail)}</span>`,
            C.btn('Take this'),
          ]),
        }),
      ),
      panel(
        'What is refused, and what cannot be undone',
        `<p class="mk-tight"><strong>Refused:</strong> ${esc(A.decision.refused)}</p>` +
          `<p class="mk-tight"><strong>Irreversible:</strong> ${esc(A.decision.irreversible)}</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#supersession">The supersession record</a><a class="mk-btn" href="#snapshot">What it would do to the issued report</a><a class="mk-btn" href="#audit">Who staged it, and when</a></div>`,
      ),
      '3fr 2fr',
    )
  );
};

const migration = () =>
  head('Legacy migration — reconciliation', 'Proof that what came out of the old system matches what went into this one.', {
    route: '/projects/:projectId/reconciliation',
  }) +
  stats([
    stat('18,740', 'source rows'),
    stat('18,740', 'rows loaded', 'good'),
    stat('412', 'exceedances — both', 'good'),
    stat('112', 'quarantined', 'warn'),
  ]) +
  table({
    caption: 'Row and exceedance counts, source against destination. A migration that cannot prove this is a migration nobody should trust.',
    head: ['Check', 'Source (ESdat)', 'Strataflow', 'Agrees'],
    rows: [
      ['Result rows', '18,740', '18,740', tag('yes', 'good')],
      ['Distinct locations', '31', '31', tag('yes', 'good')],
      ['Distinct analytes', '118', '118', tag('yes', 'good')],
      ['Non-detects', '4,206', '4,206', tag('yes', 'good')],
      ['Exceedances — ANZG 2018', '412', '412', tag('yes', 'good')],
      ['Historical qualifiers preserved', '1,884', '1,884', tag('yes', 'good')],
      ['Rows quarantined on load', '—', '112', tag('reasons listed', 'warn')],
    ],
  }) +
  notice('default', 'Validation state and qualifiers came across, not just numbers.',
    'FR-3.11 asks for the historical validation state to survive the move. A migration that lands the values and drops twenty years of qualifiers has moved the data and lost the record.');

/* ================================================================== *
 * The field round, rebuilt around the bore session (wave 6, PR-1)
 *
 * The practitioner review's strongest hesitation was about an axis, not a
 * detail: the drawn grid entered a round **column by column across bores**,
 * and real field work runs **bore by bore**. *"I don't measure the SWL at
 * seven bores, then return conceptually to MW05 to enter its pH."* So the grid
 * is demoted to a summary — which is what a grid is genuinely good for, seeing
 * where the round is up to — and the screen's heart is the session at one
 * bore, carrying the review's sequence in its own order.
 *
 * Everything below reads `FIELD_ROUND`. The purge series shown inline here is
 * the same array `#purge` draws in full: one source, read twice.
 * ================================================================== */

/** A disposition, as a glyph and a word — never as a colour (§5.3). */
const dispo = (code) => {
  const d = FIELD_ROUND.disposition(code);
  return (
    `<span class="mk-dispo mk-dispo--${d.tone}" title="${esc(d.means)}">` +
    `<span class="mk-dispo__glyph" aria-hidden="true">${esc(d.glyph)}</span>${esc(d.label)}</span>`
  );
};

/** One read-only fact inside a session step. The label may carry markup. */
const sessFact = (label, value, hint) =>
  `<div class="mk-pair"><span class="mk-pair__label">${label}</span>` +
  `<span class="mk-pair__value">${value}</span>` +
  (hint ? `<span class="mk-pair__hint">${hint}</span>` : '') +
  '</div>';

/**
 * The stabilisation series, drawn where the review said it belongs (PR-1c).
 *
 * "Important enough that I wouldn't hide it one level below the principal
 * field workflow" — so it is in the session, in full, with every reading's own
 * verdict beside it rather than a summary sentence underneath. The parameter
 * names are the glossary's: **conductivity**, **dissolved oxygen**, **redox**
 * (what the instrument prints as Eh or ORP), **turbidity**.
 */
const stabilisationSeries = (p) => {
  const T = p.tolerance;
  const digits = { ph: 2, ec: 0, do: 2, redox: 0, turb: 1, temp: 1 };
  const cell = (r, key) => {
    const param = T.params.find((x) => x.key === key);
    const holding = r.window && r.holding.includes(key);
    return (
      `<span class="mk-num${r.window && !holding ? ' mk-num--warn' : ''}">${esc(r[key].toFixed(digits[key]))}</span>` +
      (r.window
        ? `<span class="sf-visually-hidden"> ${esc(param.label)} — ${holding ? 'holding within' : 'still moving outside'} ${esc(param.text)}</span>`
        : '')
    );
  };
  return table({
    caption: `${p.location} · tolerances ${T.params.map((x) => `${x.label.toLowerCase()} ${x.text}`).join(' · ')}.`,
    head: [
      'Time',
      'Depth to water<small>m btoc</small>',
      'pH',
      'Conductivity<small>µS/cm</small>',
      'Dissolved oxygen<small>mg/L</small>',
      'Redox<small>mV</small>',
      'Turbidity<small>NTU</small>',
      'Temperature<small>°C</small>',
      'Three-reading window',
    ],
    kind: 'matrix',
    label: `Stabilisation readings at ${p.location}`,
    rows: p.readings.map((r) => [
      `<span class="mk-num">${esc(r.t)}</span>`,
      `<span class="mk-num">${r.swl.toFixed(2)}</span>`,
      cell(r, 'ph'),
      cell(r, 'ec'),
      cell(r, 'do'),
      cell(r, 'redox'),
      cell(r, 'turb'),
      cell(r, 'temp'),
      !r.window
        ? '<span class="mk-muted">not yet three readings</span>'
        : r.stable
          ? C.status(`all ${T.params.length} holding`, 'good')
          : `${C.status(`${r.moving.length} still moving`, 'warn')}<small>${esc(r.moving.map((k) => T.params.find((x) => x.key === k).label.toLowerCase()).join(', '))}</small>`,
    ]),
  });
};

/** How the run of three is read, said once so the arithmetic is recountable. */
const stabilisationRule = () =>
  '<p class="mk-tight">A parameter is <strong>holding</strong> when the spread across the three readings — the largest minus the smallest — sits inside its tolerance, measured against their mean where the tolerance is a percentage. The looser reading of “± 3%”, <em>each reading</em> within 3% of the mean, allows twice the movement, and which one is meant decides whether a bore stabilised — so it is stated rather than assumed. Turbidity is the one disjunctive rule: below 10 NTU a reading is acceptable outright, and only above that does the ± 10% agreement test apply. A falling turbidity curve never satisfies a percentage test on its way down, and a conjunctive reading would fail every low-flow sample ever taken.</p>';

/**
 * The session at one bore, top to bottom, in the order the work happens.
 *
 * One deliberate deviation from the review’s listed sequence (“SWL →
 * condition → pump…”), stated rather than passed off as fidelity (W6-A-3):
 * condition, access and headworks come **before** the depth-to-water dip,
 * because the headworks are inspected before the bore is opened — a damaged
 * cap, a blocked casing or a wasp nest is found by looking, not with the
 * dipper already down the hole. From the dip onward the order is the
 * review’s own.
 */
const boreSession = (s) => {
  const p = s.purge;
  const day = FIELD_ROUND.days.find((d) => d.n === s.day);
  const visits = FIELD_ROUND.sessions.filter((x) => x.location === s.location);
  const samples = s.samples.map((id) => EVENT_SAMPLES.find((x) => x.id === id)).filter(Boolean);
  const qc = samples.filter((x) => x.qc !== '—');
  const d = FIELD_ROUND.disposition(s.disposition);
  let n = 0;
  const step = (label, kind, body) => {
    n += 1;
    return (
      `<li class="mk-chain__step mk-chain__step--${kind}"><span class="mk-chain__n" aria-hidden="true">${n}</span>` +
      `<div class="mk-chain__text"><span class="mk-chain__label">${esc(label)}</span>${body}</div></li>`
    );
  };

  const header =
    `<header class="mk-sess__head">` +
    `<h3 class="mk-sess__code">${esc(s.location)}</h3>` +
    `<p class="mk-sess__meta">${esc(day.label)} · ${esc(day.date)}` +
    (visits.length > 1 ? ` · visit ${s.visit} of ${visits.length}` : '') +
    ` · ${esc(FIELD_ROUND.crew)}</p>` +
    `<div class="mk-sess__state">${dispo(s.disposition)}` +
    (s.synced ? C.status('on the record', 'good') : C.status('on this device only', 'warn')) +
    '</div></header>';

  return (
    `<section class="mk-sess" aria-label="Bore session — ${esc(s.location)}">` +
    header +
    '<ol class="mk-chain">' +
    step(
      'Arrived',
      'source',
      sessFact('Capture time', `<span class="sf-instant">${esc(s.arrived)}</span>`, 'The time the crew reached the bore, off the device’s own clock.') +
        sessFact(
          'Synced to the record',
          s.synced
            ? `<span class="sf-instant">${esc(s.synced)}</span>`
            : `${C.status('not yet', 'warn')} <span class="mk-muted">held on ${esc(FIELD_ROUND.device)}</span>`,
          s.synced
            ? 'Both timestamps are kept. A record that overwrote the first with the second would make every bore look as though it was visited from the vehicle at the gate.'
            : 'The site has no signal. Until this record syncs, the programme reads what the record says rather than what the crew knows.',
        ),
    ) +
    step(
      'Condition, access and headworks',
      'input',
      sessFact('Condition', esc(s.condition)) +
        sessFact('Access', esc(s.access)) +
        sessFact('Headworks', esc(s.headworks)),
    ) +
    step(
      'Measuring point, depth to water, total depth',
      'input',
      C.field({
        label: 'Measuring point',
        required: true,
        control: C.select({
          options: ['Top of casing', 'Top of protective cover', 'Ground level', 'Staff gauge zero'],
          value: s.measuringPoint ?? 'Top of casing',
          disabled: !s.measuringPoint,
        }),
        hint: 'The point the tape was run from. It is recorded twice and the two are different assertions — the survey says which point was levelled, this says which one the crew dipped from — and where they disagree the elevation conversion refuses rather than assuming a stickup.',
      }) +
        (s.depthToWater === null
          ? sessFact(
              'Depth to water <span class="mk-muted">— the field sheet says <em>SWL</em></span>',
              `<span class="mk-num mk-num--nil">no depth</span>`,
              'A bore that held no water has a water-level record and no depth. Recording it as zero, or as the depth of the bore, would be a measurement nobody took.',
            )
          : C.field({
              label: 'Depth to water — SWL on the field sheet',
              required: true,
              control: C.numberInput({ value: s.depthToWater.toFixed(2), unit: 'm btoc' }),
              hint: 'Positive downward, because that is what comes off the dipper. Groundwater elevation is derived from it against the survey in force on this date, and is never stored.',
            })) +
        (s.totalDepth === null
          ? sessFact('Total depth', '<span class="mk-num mk-num--nil">—</span>', esc(s.totalDepthWhy ?? 'Not required this round.'))
          : C.field({
              label: 'Total depth',
              control: C.numberInput({ value: s.totalDepth.toFixed(1), unit: 'm btoc' }),
              hint: esc(s.totalDepthWhy),
            })),
    ) +
    (p
      ? step(
          'Pump, intake and flow rate',
          'rule',
          sessFact('Purge method', esc(p.method), 'The method decides what <em>stabilised</em> means: low-flow draws formation water past the probe and stabilisation is the test that it has arrived, where three-volume purging empties the casing and stabilisation is incidental to it.') +
            sessFact('Pump and intake', `${esc(p.pump)} · ${esc(p.intake)}`) +
            C.field({
              label: 'Flow rate',
              required: true,
              control: C.numberInput({ value: p.rate.toFixed(2), unit: 'L/min' }),
              hint: `The rate the volume is computed from — ${p.minutes} minutes at ${esc(p.rateText)} is <strong>${esc(p.volumeText)}</strong>. Nobody types a volume.`,
            }) +
            sessFact('Drawdown', esc(s.drawdown)),
        ) +
        step(
          'Purge and stabilisation',
          'derived',
          `<p class="mk-tight">Started <span class="sf-instant">${esc(p.startedAt)}</span>, ${p.readings.length} readings at ${FIELD_ROUND.stabilisation.window > 0 ? '5-minute' : ''} intervals, <strong>${esc(p.volumeText)}</strong> purged.</p>` +
            stabilisationSeries(p) +
            `<p class="mk-tight"><strong>Series outcome — ${esc(p.outcome)}.</strong> ${esc(p.verdict)}</p>` +
            (p.stabilised
              ? ''
              : `<p class="mk-tight">Everything else had held for an hour: ${esc(p.heldAtEnd.join(', ').toLowerCase())} were all inside tolerance at the last reading. Stabilisation is reported per parameter as well as overall, because “did not stabilise” without naming the parameter is exactly the assertion this record exists to replace.</p>`) +
            `<div class="mk-actions"><a class="mk-btn" href="#purge">Open the full stabilisation record</a>${C.btn('Add a reading')}${C.btn('End the purge — purged dry')}</div>`,
        )
      : step(
          'Purge and stabilisation',
          'rule',
          `<p class="mk-tight">No purge. ${esc(d.means)}</p>` +
            '<p class="mk-tight mk-muted">Absence is meaningful and it is not the same as <em>none</em>. A passive sampler or a grab sample is purged by no method and says so; a visit with <strong>no purge record at all</strong> is one whose field sheet was never captured, and a reviewer challenges the second, not the first. This is the first.</p>',
        )) +
    (p
      ? step(
          'Field chemistry at collection',
          'input',
          [
            ['pH', p.readings.at(-1).ph.toFixed(2), ''],
            ['Conductivity', String(p.readings.at(-1).ec), 'µS/cm'],
            ['Dissolved oxygen', p.readings.at(-1).do.toFixed(2), 'mg/L'],
            ['Redox', String(p.readings.at(-1).redox), 'mV'],
            ['Turbidity', p.readings.at(-1).turb.toFixed(1), 'NTU'],
            ['Temperature', p.readings.at(-1).temp.toFixed(1), '°C'],
          ]
            .map(([label, value, unit]) => sessFact(esc(label), `<span class="mk-num">${esc(value)}</span> <span class="mk-muted">${esc(unit)}</span>`))
            .join('') +
            `<p class="mk-tight mk-muted">Read off the last stabilisation reading, at <span class="sf-instant">${esc(p.readings.at(-1).t)}</span> — not entered again. A final-parameters box a practitioner fills in by copying the last row is a box that can disagree with the row.</p>`,
        )
      : '') +
    step(
      'Samples, duplicates and QC',
      'input',
      samples.length === 0
        ? `<p class="mk-tight">None — ${esc(d.label.toLowerCase())}. ${esc(s.dispositionReason ?? '')}</p>`
        : table({
            caption: 'Every container this bore contributed, and the role each sample plays.',
            head: ['Sample', 'Role', 'Parent', 'Containers', 'Collected · AWST'],
            scroll: true,
            label: `Samples from ${s.location}`,
            rows: samples.map((x) => [
              `<span class="mk-file mk-file--id">${esc(x.id)}</span>`,
              x.qc === '—' ? '<span class="mk-num mk-num--nil">primary</span>' : `<span class="mk-tag mk-tag--new">${esc(x.qc)}</span>`,
              x.parent === '—' ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-muted">${esc(x.parent)}</span>`,
              `<span class="mk-num">${x.containers}</span>`,
              `<span class="sf-instant">${esc(x.collected.replace(' AWST', ''))}</span>`,
            ]),
          }) +
          (qc.length
            ? `<p class="mk-tight">${qc.length === 1 ? 'One QC sample was' : `${qc.length} QC samples were`} made at this bore — ${qc.map((x) => `<strong>${esc(x.qc)}</strong>`).join(', ')}. A blind field duplicate keeps its parent in the record and off everything the laboratory receives: the distinction the screen has to hold is between <em>the laboratory did not know</em> and <em>we do not know</em>.</p>`
            : ''),
    ) +
    step(
      'Filtration and preservation',
      'rule',
      sessFact('Filtration', esc(s.filtration), 'Dissolved is what the number means; filtration is what was done. Both are recorded, because a criterion expressed on a total basis is not comparable to a filtered result.') +
        sessFact('Preservation', esc(s.preservation)),
    ) +
    step(
      'Chain of custody',
      'rule',
      samples.length === 0
        ? '<p class="mk-tight">Nothing to consign. A visit that produced no sample appends no transfer, and the chain’s sequence stays unbroken because nothing was skipped — there was nothing to skip.</p>'
        : `<p class="mk-tight">These containers joined <a class="mk-ref" href="#ecoc">${esc(CUSTODY_CHAIN.id)}</a>, raised at the first bore of this round before the first container was filled. The session creates the chain; the chain is not typed up afterwards from a notebook.</p>` +
          facts([
            ['Custody record', `<a class="mk-ref" href="#ecoc">${esc(CUSTODY_CHAIN.id)}</a>`],
            ['Transfer this bore fed', `<span class="mk-muted">${esc(CUSTODY_CHAIN.transfers.find((t) => t.seq === s.day)?.what ?? 'logged into the site cold store')}</span>`],
            ['Containers from this bore', `<span class="mk-num">${samples.reduce((acc, x) => acc + x.containers, 0)}</span> of ${CUSTODY_CHAIN.containers} on the chain`],
          ]),
    ) +
    step(
      'Observations and photographs',
      'input',
      C.field({
        label: 'What the crew saw',
        control: C.textarea({ value: s.observations, rows: 3 }),
        hint: 'Free text, kept verbatim and never rewritten. It is the only part of the record that can say something nobody thought to ask for.',
      }) +
        sessFact(
          'Photographs',
          `<span class="mk-num">${s.photographs}</span>` + (s.photographsPending ? ` ${C.status('not yet synced', 'warn')}` : ''),
          s.photographsPending
            ? 'Held on the device. Photographs are the largest thing a field record carries and the first thing a thin link drops.'
            : 'Headworks, the pad, the sample train, and anything the observation names.',
        ),
    ) +
    step(
      'Completion',
      'derived',
      C.field({
        label: 'Disposition',
        required: true,
        control: C.select({
          options: FIELD_ROUND.dispositions.map((x) => ({ label: x.label, value: x.code })),
          value: s.disposition,
        }),
        hint: `Seven states, closed. <strong>${esc(d.label)}</strong> — ${esc(d.means)}`,
      }) +
        C.field({
          label: 'Reason',
          required: d.reason,
          control: C.input({ value: s.dispositionReason ?? '' }),
          hint: d.reason
            ? 'Required for every disposition but <em>Sampled</em>. A round cannot be marked complete while a location carries a reasonless one.'
            : 'Not required — the samples are the reason.',
        }) +
        `<p class="mk-tight">${
          s.synced
            ? `Written to the record at <span class="sf-instant">${esc(s.synced)}</span>.`
            : `<strong>Captured at <span class="sf-instant">${esc(s.captured)}</span> and not yet on the record.</strong> Everything downstream — the programme, the obligation, the completeness figure — reads the record, which is why ${esc(Q2_OVERDUE.location)} still counts as ${esc(Q2_OVERDUE.phrase)}.`
        }</p>`,
    ) +
    '</ol></section>'
  );
};

/**
 * The preflight before "Mark round complete" (PR-1b).
 *
 * Every number here is counted off the sessions, which is the whole point of
 * it: a completion control whose readiness is asserted is a completion control
 * that marks a round complete with a bore missing.
 */
const roundPreflight = () => {
  const P = FIELD_ROUND.preflight;
  const dupes = EVENT_SAMPLES.filter((s) => s.qc === 'Field duplicate (blind)');
  const blanks = EVENT_SAMPLES.filter((s) => s.qc !== '—' && s.qc !== 'Field duplicate (blind)');
  const blocking = [];
  if (P.pendingRecords) blocking.push(`${P.pendingRecords} records are on ${FIELD_ROUND.device} and not on the record`);
  if (P.postChecked < P.instruments) blocking.push(`${P.instruments - P.postChecked} instrument has no post-round check`);
  const rows = [
    ['Locations dispositioned', `${P.dispositioned} of ${P.planned}`, P.dispositioned === P.planned,
      `Every planned location carries one of the seven states. ${P.visits} visits were made to ${P.planned} bores — ${esc(Q2_OVERDUE.location)} took two.`],
    ['…and on the record', `${P.onRecord} of ${P.planned}`, P.onRecord === P.planned,
      `${P.planned - P.onRecord} disposition is captured on the device and has not synced. A countdown reads the record, so the programme still calls this round ${esc(Q2_OVERDUE.phrase)} at ${esc(Q2_OVERDUE.location)}.`],
    ['Sampled', String(P.sampled), true, 'Water recovered and containers submitted under the chain of custody.'],
    ['Dry', String(P.dry), true, 'Reached, dipped, empty. Not missing — the round is satisfied as attempted, and the hydrograph draws a break rather than a line.'],
    ['Duplicates collected', `${dupes.length} of ${dupes.length}`, true,
      `Blind field duplicates at ${dupes.map((x) => esc(x.location)).join(' and ')} — ${dupes.map((x) => `<span class="mk-file mk-file--id">${esc(x.id)}</span>`).join(' and ')}.`],
    ['Other QC samples', `${blanks.length} of ${blanks.length}`, true, blanks.map((b) => esc(b.qc)).join(' · ')],
    ['Instruments calibrated before the round', `${P.calibrated} of ${P.instruments}`, P.calibrated === P.instruments,
      'Every probe that produced a number on this round has a calibration record ahead of it.'],
    ['…and checked after it', `${P.postChecked} of ${P.instruments}`, P.postChecked === P.instruments,
      'A calibration says the probe was right at the start. Only the post-round check says it had not drifted while it was reading.'],
    ['Unsynced mandatory fields', String(P.pendingFields), P.pendingFields === 0,
      `Across ${P.pendingRecords} unsynced records, counted field by field rather than record by record — “some data is missing” is the state in which a number matters most.`],
    ['Chain of custody created', '1', true,
      `<a class="mk-ref" href="#ecoc">${esc(CUSTODY_CHAIN.id)}</a> — ${CUSTODY_CHAIN.containers} containers, ${CUSTODY_CHAIN.transfers.length} transfers, state ${esc(CUSTODY_CHAIN.state)}.`],
  ];
  return (
    table({
      caption: 'Every line counted off the sessions above. Nothing here is asserted.',
      head: ['Check', 'Count', 'State', 'What it means'],
      scroll: true,
      label: 'Round completion preflight',
      rows: rows.map(([what, count, ok, why]) => [
        `<strong>${esc(what)}</strong>`,
        cell(`<span class="mk-num${ok ? '' : ' mk-num--warn'}">${esc(count)}</span>`),
        ok ? C.status('clear', 'good') : C.status('holds the round', 'warn'),
        cell(`<span class="mk-muted">${why}</span>`),
      ]),
    }) +
    (blocking.length
      ? notice(
          'warning',
          `The round cannot be marked complete yet — ${blocking.length === 1 ? 'one thing holds it' : `${blocking.length} things hold it`}.`,
          `${blocking.map((b) => esc(b)).join('; and ')}. The control below states what it would write and stays refusable rather than silently disabled: a greyed-out button that will not say why is how a field officer at a gate loses an afternoon.`,
        )
      : '') +
    C.blastRadius({
      lede: `Marking <strong>${esc(FIELD_ROUND.round)}</strong> complete — what that writes, before you press it:`,
      rows: [
        { what: 'Sampling round marked satisfied on the programme', n: '1 — naming the sampling event that satisfied it' },
        { what: 'Locations whose disposition becomes the round’s answer', n: `${P.planned}` },
        { what: 'Dry locations recorded as attempted rather than missed', n: `${P.dry} — waived with the reason on it, never deleted` },
        { what: 'Obligation countdowns that stop', n: '1 — the quarterly groundwater round' },
        { what: 'Records that would still be on the device afterwards', n: `${P.pendingRecords} — and this is what holds it` },
      ],
      action: 'Mark the round complete',
      cancel: 'Not yet',
      reversible:
        'Reversible while the round is open: completion is a state on the round, recorded with who set it and when, and it can be reopened with a reason. What cannot be undone is the sync — a captured record, once written, is superseded rather than replaced.',
    })
  );
};

const fieldCapture = () => {
  const P = FIELD_ROUND.preflight;
  const open = FIELD_ROUND.sessions.find((s) => s.location === 'MW05');
  const pendingSessions = FIELD_ROUND.sessions.filter((s) => !s.synced || s.photographsPending);
  const summaryRows = FIELD_ROUND.current.map((s) => {
    const p = s.purge;
    const visits = FIELD_ROUND.sessions.filter((x) => x.location === s.location);
    return [
      `${loc(s.location)}<small>${esc(LOCATIONS.find((l) => l.code === s.location).position)}</small>`,
      `<span class="sf-instant">${esc(FIELD_ROUND.days.find((day) => day.n === s.day).date)}</span>` +
        (visits.length > 1
          ? `<small>${visits.length} visits — ${esc(visits.map((v) => FIELD_ROUND.disposition(v.disposition).label.toLowerCase()).join(', then '))}</small>`
          : ''),
      dispo(s.disposition),
      s.depthToWater === null ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-num">${s.depthToWater.toFixed(2)}</span>`,
      p ? `<span class="mk-num">${esc(p.volumeText)}</span>` : '<span class="mk-num mk-num--nil">—</span>',
      p ? C.status(p.outcome, p.stabilised ? 'good' : 'warn') : '<span class="mk-muted">no purge</span>',
      s.samples.length ? `<span class="mk-num">${s.samples.length}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      s.synced ? C.status('on the record', 'good') : C.status('on the device', 'warn'),
      C.btn(`Open ${s.location}`, s.location === open.location ? 'primary' : ''),
    ];
  });

  return (
    head(`Field capture — ${FIELD_ROUND.round}`, 'One bore at a time, in the order the work happens — with the round grid as the summary over them.', {
      route: 'a proposal — not in the product',
      toolbar: C.btn(`Sync ${P.pendingRecords} pending`, 'primary') + C.btn('Round preflight'),
    }) +
    notice(
      'warning',
      'Proposed — and redesigned rather than deepened. Nothing in FR-1 to FR-8 covers field data capture.',
      'U1 is named the highest-frequency user, and every requirement in the PRD is about what happens after a laboratory has already reported. The water level, the purge volume, the field pH and the observation that a bore was dry are still collected by hand and typed in later, or lost. What changed is the <em>axis</em>: the first drawing entered a round column by column across bores, and a senior hydrogeologist read it and said that is not how the work runs — <em>“I don’t measure the SWL at seven bores, then return conceptually to MW05 to enter its pH.”</em> The grid below is now the summary, and the session under it is the screen.',
    ) +
    stats([
      stat(`${P.dispositioned} of ${P.planned}`, 'locations dispositioned'),
      stat(String(P.sampled), 'sampled', 'good'),
      stat(String(P.dry), 'dry — not missing', 'warn'),
      stat(`${P.stabilised} of ${P.purges}`, 'purges stabilised', 'warn'),
      stat(String(P.pendingRecords), 'records still on the device', 'warn'),
    ]) +
    '<h2 class="mk-h2">The round, at a glance</h2>' +
    `<p class="mk-tight">${P.planned} planned locations, ${P.visits} visits across ${FIELD_ROUND.days.length} days, collected by ${esc(FIELD_ROUND.crew)}. This is what a grid is genuinely good for — seeing where a round is up to — and it is no longer where the round is typed.</p>` +
    table({
      caption: 'One row per planned location, showing the visit that decides its answer. Selecting a bore opens its session.',
      head: ['Location', 'Visited', 'Disposition', 'Depth to water<small>m btoc</small>', 'Purged', 'Series outcome', 'Samples', 'Record', 'Session'],
      scroll: true,
      label: 'Round summary by location',
      rows: summaryRows,
    }) +
    (() => {
      /*
       * The containers add up, and the two that do not belong to a bore are
       * the finding rather than a rounding error: a trip blank belongs to the
       * cooler and travelled with the samples for three days, so no session
       * can own it. Counted here rather than asserted, so a sample added to
       * the manifest and not to a session shows up as a number that stops
       * agreeing.
       */
      const owned = new Set(FIELD_ROUND.sessions.flatMap((s) => s.samples));
      const inSessions = EVENT_SAMPLES.filter((x) => owned.has(x.id)).reduce((n, x) => n + x.containers, 0);
      const orphans = EVENT_SAMPLES.filter((x) => !owned.has(x.id));
      const all = EVENT_SAMPLES.reduce((n, x) => n + x.containers, 0);
      return (
        `<p class="mk-tight">The sessions account for <strong>${inSessions} of the ${all} containers</strong> on the ` +
        `<a class="mk-ref" href="#ecoc">chain of custody</a>. The ${orphans.reduce((n, x) => n + x.containers, 0)} that belong to no session are ` +
        `${orphans.map((x) => `${esc(x.qc.toLowerCase())} <span class="mk-file mk-file--id">${esc(x.id)}</span>`).join(' and ')} — a trip blank belongs to the ` +
        `cooler and travelled with the samples for three days, so no bore visit can own it. That is the arithmetic working, not failing: a sample on the ` +
        `<a class="mk-ref" href="#events">manifest</a> that no session claims is either a control with no bore or a visit somebody forgot to record, and the ` +
        `two are told apart by which it is.</p>`
      );
    })() +
    cols(
      panel(
        'The seven dispositions, and why “dry” is one of them',
        table({
          caption: 'A closed list. Every state but the first requires a reason, and the last one is the residual.',
          head: ['State', 'Reason', 'This round', 'What it means'],
          scroll: true,
          label: 'Disposition states',
          rows: FIELD_ROUND.dispositions.map((d) => {
            const visits = FIELD_ROUND.sessions.filter((s) => s.disposition === d.code).length;
            const current = FIELD_ROUND.current.filter((s) => s.disposition === d.code).length;
            return [
              dispo(d.code),
              d.reason ? C.status('required', 'warn') : '<span class="mk-muted">not required</span>',
              visits
                ? `<span class="mk-num">${current}</span> <span class="mk-muted">now${visits !== current ? ` · ${visits} across visits` : ''}</span>`
                : '<span class="mk-num mk-num--nil">0</span>',
              `<span class="mk-muted">${esc(d.means)}</span>`,
            ];
          }),
        }) +
          '<p class="mk-tight"><strong>A dry bore is not a missing reading.</strong> The hydrograph draws a break rather than a line through it, the sampling programme reads the round as attempted rather than uncollected, and the report says so. Left as an absence all three go wrong quietly, and the register cannot tell a bore nobody visited from a bore with no water in it.</p>' +
          `<p class="mk-tight mk-muted">The vocabulary is exercised rather than declared: this round used ${FIELD_ROUND.tally.length} of the seven. ${esc(Q2_OVERDUE.location)} was <strong>inaccessible</strong> on ${esc(FIELD_ROUND.days[1].date)} — the creek crossing was running — and <strong>dry</strong> when the crew got back to it on ${esc(FIELD_ROUND.days[2].date)}. Two visits in one round are two records, not one overwriting the other.</p>`,
      ),
      panel(
        'Captured is not synced, and the board can tell',
        `<p class="mk-tight">${P.pendingRecords} records sit on <strong>${esc(FIELD_ROUND.device)}</strong> and not on the record, holding <strong>${P.pendingFields} mandatory fields</strong> between them.</p>` +
          `<p class="mk-tight">That is why the <a class="mk-ref" href="#obligations">obligation board</a> and the <a class="mk-ref" href="#programme">programme</a> still read this round <strong>${esc(Q2_OVERDUE.phrase)}</strong> at ${esc(Q2_OVERDUE.location)} — ${esc(Q2_OVERDUE.due)} to ${esc(AS_AT)}, counted rather than typed. A countdown reads the record, and the record does not know what the crew knows.</p>` +
          C.card({
            tone: 'warn',
            head: `<span class="mk-queue__kind">${esc(FIELD_ROUND.device)}</span><span class="mk-queue__age">${P.pendingRecords} pending</span>`,
            body: pendingSessions
              .map(
                (s) =>
                  `<p class="mk-tight"><strong>${esc(s.location)}</strong>${s.visit ? ` · visit ${s.visit}` : ''} — ${
                    s.synced
                      ? `${s.photographs} photographs`
                      : `${esc(FIELD_ROUND.disposition(s.disposition).label.toLowerCase())}, captured <span class="sf-instant">${esc(s.captured)}</span>`
                  }</p>`,
              )
              .join(''),
            foot: '<span class="mk-tag mk-tag--warn">The capture timestamp is kept, not the sync timestamp</span>',
          }) +
          '<p class="mk-tight mk-muted">Offline by design: the site has no signal. Records are captured locally, queued, and written when the vehicle reaches the gate — and the record keeps the time the crew stood at the bore, because a round that reads as though every bore was visited at 18:41 from the highway is a round nobody can defend.</p>',
      ),
    ) +
    `<h2 class="mk-h2" style="margin-top:1.4rem">The bore session — ${esc(open.location)}</h2>` +
    `<p class="mk-tight">This is the screen. It walks top to bottom in the order the work happens: arrive · look at the headworks · dip · set the pump · purge and watch the parameters · take the sample · label it · filter and preserve it · sign it onto the chain · photograph the bore · say what happened · disposition it. The grid above is a summary over ${FIELD_ROUND.sessions.length} of these.</p>` +
    C.segmented({
      label: 'Bore session',
      value: open.location,
      options: FIELD_ROUND.current.map((s) => ({ label: s.location, value: s.location })),
    }) +
    boreSession(open) +
    stabilisationRule() +
    '<h2 class="mk-h2" style="margin-top:1.4rem">Before the round can be marked complete</h2>' +
    `<p class="mk-tight">The preflight the review asked for. It is not a checklist somebody ticks: every count is derived from the ${FIELD_ROUND.sessions.length} sessions above, so a round with a bore outstanding cannot read as ready however carefully the list was filled in.</p>` +
    roundPreflight() +
    cols(
      panel(
        'One-handed, at a bore, on a phone',
        '<p class="mk-tight">375 px is the primary layout for this screen and the desktop is the secondary one, which is the opposite of every other screen in this catalogue. A field officer is standing at a headworks in the sun with a tablet in one hand and a dipper in the other.</p>' +
          '<p class="mk-tight">So the session <strong>stacks</strong> rather than pans: every step is full width, every control clears 44 px under a coarse pointer, and the sequence runs vertically because a thumb scrolls down. The stabilisation series is the one thing that pans, with its time column frozen — nine columns cannot stack without losing the comparison between consecutive readings, which is the only thing the series is for.</p>' +
          `<p class="mk-tight mk-muted">The keyboard contract moved with the axis. ${C.kbd('Tab')} walks down the session, ${C.kbd('Enter')} adds a reading to the open series, and ${C.kbd('D')} is gone: a single key that marked a bore dry was right when dry was the only alternative to sampled, and it is wrong now there are six.</p>`,
      ),
      panel(
        'What this screen does not own',
        `<p class="mk-tight"><strong><a class="mk-ref" href="#purge">Purge and stabilisation</a></strong> is the same series read in full, with the tolerances, the field-against-laboratory conductivity check and the bore that never stabilised. A deeper view of these rows, not a second copy of them.</p>` +
          `<p class="mk-tight"><strong><a class="mk-ref" href="#ecoc">Chain of custody</a></strong> owns the containers once they leave the bore — the transfers, the seals, and the disagreement about one seal number. The session creates the chain; it does not hold it.</p>` +
          `<p class="mk-tight"><strong><a class="mk-ref" href="#events">Sampling events</a></strong> owns the round as a record: the manifest, the QC taxonomy and what the laboratory received. <strong><a class="mk-ref" href="#programme">The programme</a></strong> owns what was owed, and when.</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#purge">The stabilisation record</a><a class="mk-btn" href="#ecoc">The chain this round created</a><a class="mk-btn" href="#events">The round as a record</a><a class="mk-btn" href="#location">${esc(open.location)}</a></div>`,
      ),
    )
  );
};

/* ================================================================== *
 * J2 — Know the data is right
 * ================================================================== */

/* ================================================================== *
 * The QA/QC workspace, rebuilt around "what is still mine to decide?"
 * (wave 6, PR-2)
 *
 * The review called the analytical logic one of the strongest parts of the
 * mockup and then said exactly what was wrong with the surface over it: eyes
 * go from *"10 passed · 6 warnings · 3 failed"* to *"Advance to validated"*
 * and stop. Pass, warn and fail are the **outcome** of a check. They are not
 * the question a hydrogeologist arrives with, which is what is still theirs to
 * decide — and NEPM's own principle is that QA/QC must let a practitioner
 * evaluate precision and accuracy rather than stamp a dataset pass/fail.
 *
 * So the decision counts are the headline, the workflow **Unresolved →
 * Reviewed → Dispositioned → Ready for validation** is the organising axis,
 * and pass/warn/fail survives as each check's QC outcome: one attribute among
 * several, and still the one that says what the check did to the data.
 * ================================================================== */

/** Where a qualifier came from, in the glossary's own four words (PR-2b). */
const BASIS_LABEL = {
  laboratory: 'Laboratory qualifier — applies batch-wide',
  dqo: 'Project data quality objective rule',
  disposition: 'A hydrogeologist’s disposition',
  sample: 'Sample-specific only',
};
const BASIS_GLYPH = { laboratory: '◈', dqo: '§', disposition: '✍', sample: '·' };

const basisChip = (kind) =>
  `<span class="mk-dispo mk-dispo--${kind === 'disposition' ? 'warn' : 'neutral'}">` +
  `<span class="mk-dispo__glyph" aria-hidden="true">${esc(BASIS_GLYPH[kind])}</span>${esc(BASIS_LABEL[kind])}</span>`;

/** One finding that still needs a hydrogeologist, with what each way out writes. */
const decisionCard = (q) => {
  const d = q.decision;
  return (
    '<article class="mk-decide">' +
    '<header class="mk-decide__head">' +
    '<span class="mk-decide__flag">Need decision</span>' +
    `<h3 class="mk-decide__title">${esc(q.check)} — ${esc(q.scope)}</h3>` +
    `${tag(q.outcome, toneFor(q.outcome))}<span class="mk-muted">QC outcome</span>` +
    '</header>' +
    `<p class="mk-decide__q"><strong>${esc(d.question)}</strong></p>` +
    `<p class="mk-decide__why">${esc(q.detail)}</p>` +
    `<p class="mk-decide__why">${esc(d.matters)}</p>` +
    table({
      caption: 'Every way out, what it writes, and whether it is available on this evidence.',
      head: ['Option', 'Propagation basis', 'What it writes', 'Available', ''],
      scroll: true,
      label: `Ways to decide ${q.check} — ${q.scope}`,
      rows: d.options.map((o) => [
        `<strong>${esc(o.label)}</strong>`,
        basisChip(o.basis),
        `<span class="mk-muted">${esc(o.writes)}</span>`,
        o.available
          ? `${C.status('available', 'good')}<small>${esc(o.why)}</small>`
          : `${C.status('not on this evidence', 'bad')}<small>${esc(o.why)}</small>`,
        o.available ? C.btn('Take this') : C.btn('Take this', '', { disabled: true, title: o.why }),
      ]),
    }) +
    `<p class="mk-tight"><strong>Refused:</strong> ${esc(d.refused)}</p>` +
    `<p class="mk-tight mk-muted">Whichever is taken is written with <strong>your name, the time and your reason</strong> on it, and the finding moves to <em>Dispositioned</em>. A manual qualifier carries who applied it and why; a laboratory one carries neither, because the laboratory said it and the import records who loaded the file.</p>` +
    '</article>'
  );
};

const qcWorkspace = () => {
  const D = QC_DECISIONS;
  const R = D.rerunUnderCurrent;
  const spike = QAQC.find((q) => q.id === 'MS-1');
  const settled = QAQC.filter((q) => q.qualifier && !q.proposed);

  return (
    head(`QA/QC — ${esc(ROUND.code)}`, 'What the round was held to, what followed automatically, and what is still yours to decide.', {
      route: '/projects/:projectId/qaqc',
      toolbar:
        C.btn(`Re-run using DQO ${DQO.used.version}`) +
        C.btn(`Re-run using DQO ${DQO.current.version} — current`) +
        C.btn('Advance to validated', 'primary', {
          disabled: true,
          title: `${D.needDecision} findings need a decision first`,
        }),
    }) +
    /*
     * PR-2a. These five tiles are the redesign. The pass/warn/fail triad is
     * still on the page — it is the second row, where an outcome belongs —
     * and what a practitioner's eye lands on first is the number of findings
     * that are theirs.
     */
    stats([
      stat(String(D.checks), 'checks run'),
      stat(String(D.clear), 'passed — nothing owed', 'good'),
      stat(String(D.automatic), 'automatically dispositioned'),
      stat(String(D.reviewed + D.dispositionedByPerson), 'reviewed or dispositioned by a person'),
      stat(String(D.needDecision), 'NEED DECISION', 'bad'),
    ]) +
    notice(
      'warning',
      `${D.needDecision} findings stand between this round and validation, and each one needs a hydrogeologist rather than a rule.`,
      `${D.needDecisionRows.map((q) => `<strong>${esc(q.check)} — ${esc(q.scope)}</strong>`).join(' · ')}. Between them they hold <strong>${D.resultsAwaiting} results</strong> whose qualifiers have been proposed and not applied. <em>Advance to validated</em> is refused until they are settled, and it says so rather than being greyed out with no reason: a control that will not explain itself is a control people learn to work around.`,
    ) +
    '<h2 class="mk-h2">The workflow, and where the round sits on it</h2>' +
    '<div class="mk-board">' +
    D.workflow
      .map(
        (w, i) =>
          `<div class="mk-board__col${w.state === 'unresolved' ? ' mk-board__col--current' : ''}">` +
          `<span class="mk-board__state">${i + 1}. ${esc(w.label)}</span>` +
          `<span class="mk-board__count">${w.n}</span>` +
          `<span class="mk-board__note">${esc(w.means)}</span></div>`,
      )
      .join('') +
    '</div>' +
    `<p class="mk-tight">The round moves right only when the first column empties. <strong>This is a different axis from the validation state</strong> — <code class="mk-file">imported → screened → validated → approved → published</code> runs over <em>results</em>, and this one runs over <em>findings</em>. Conflating them is how a round advances with three open questions on it: the results were all screened, so the button looked ready.</p>` +
    `<h2 class="mk-h2" style="margin-top:1.4rem">The ${D.needDecision} findings that are yours</h2>` +
    D.needDecisionRows.map(decisionCard).join('') +
    `<h2 class="mk-h2" style="margin-top:1.4rem">Every check, and which of the three things it is</h2>` +
    notice(
      'default',
      'Three concepts were mixed under one word: the QC outcome, the automatic consequence, and the professional disposition.',
      'A holding time exceeded quarantines a result and a reporting limit above a criterion records an indeterminate outcome — both deterministic, both named by the rule that did it. Equipment-blank contamination and a step in a bore’s own conductivity are not: they need somebody accountable. The column that used to say <em>pass / warn / fail</em> now says all three things, and the outcome is the one that says what the check did to the data.',
    ) +
    table({
      caption: 'Nineteen checks. The outcome is what the check found; the concept is what happened next, and who it was that made it happen.',
      head: ['Check', 'Scope', 'QC outcome', 'Concept', 'State', 'What it did to the data', 'Results reached'],
      kind: 'matrix',
      label: 'QA/QC checks, by concept and workflow state',
      rows: QAQC.map((q) => [
        `<strong>${esc(q.check)}</strong>`,
        `<span class="mk-muted">${esc(q.scope)}</span>`,
        tag(q.outcome, toneFor(q.outcome)),
        q.concept === 'outcome'
          ? '<span class="mk-muted">nothing followed</span>'
          : q.concept === 'automatic'
            ? `${C.status('automatic', 'good')}<small>${esc(q.rule.name)} · ${esc(q.rule.version)}</small>`
            : `${C.status('professional disposition', 'warn')}<small>${esc(q.state === 'unresolved' ? 'not yet made' : q.state === 'reviewed' ? `reviewed by ${q.review.by}` : `by ${q.disposition.by}, ${q.disposition.at}`)}</small>`,
        q.state === 'unresolved'
          ? '<span class="mk-tag mk-tag--bad">Unresolved</span>'
          : q.state === 'reviewed'
            ? '<span class="mk-tag mk-tag--warn">Reviewed</span>'
            : q.state === 'dispositioned'
              ? '<span class="mk-tag mk-tag--good">Dispositioned</span>'
              : '<span class="mk-tag mk-tag--neutral">Ready for validation</span>',
        `<span class="mk-muted">${esc(q.action)}</span><br><span class="mk-muted">${esc(q.detail)}</span>`,
        q.results
          ? `<span class="mk-num${q.proposed ? ' mk-num--warn' : ''}">${q.results}</span>${q.proposed ? '<small>proposed, not applied</small>' : ''}`
          : '<span class="mk-num mk-num--nil">0</span>',
      ]),
    }) +
    `<h2 class="mk-h2" style="margin-top:1.4rem">Where every qualifier came from</h2>` +
    notice(
      'warning',
      'A propagated qualifier states its basis, on every result it reached.',
      '“Why did this qualifier propagate to these results?” is exactly the type of thing an auditor may ask five years later, and the answer is one of four: the laboratory said it in the deliverable · a project data quality objective rule applies · a named person dispositioned it · it is specific to the sample it was raised on. A qualifier with no basis on it cannot be told from an inference, and only one of those survives a challenge.',
    ) +
    table({
      caption: 'Every qualifier that reached a result on this round, with the basis it travelled on.',
      head: ['Qualifier', 'Means', 'Raised by', 'Propagation basis', 'Results', 'Reaches'],
      scroll: true,
      label: 'Qualifier propagation basis',
      rows: [
        ...settled.map((q) => [
          `<span class="mk-tag mk-tag--warn">${esc(q.qualifier)}</span>`,
          `<span class="mk-muted">${esc(q.action)}</span>`,
          `${esc(q.check)}<small>${esc(q.scope)}</small>`,
          basisChip(q.basis.kind),
          `<span class="mk-num">${q.results}</span>`,
          `<span class="mk-muted">${esc(q.reaches ?? q.basis.says)}</span>`,
        ]),
        ...QAQC.filter((q) => q.proposed).map((q) => [
          `<span class="mk-tag mk-tag--bad">${esc(q.qualifier)}</span><small>proposed</small>`,
          `<span class="mk-muted">${esc(q.action)}</span>`,
          `${esc(q.check)}<small>${esc(q.scope)}</small>`,
          `<span class="mk-tag mk-tag--bad">not chosen</span>`,
          `<span class="mk-num mk-num--warn">${q.results}</span><small>if applied</small>`,
          `<span class="mk-muted">Nothing has been written. The basis is the decision, and the decision has not been made.</span>`,
        ]),
      ],
    }) +
    cols(
      panel(
        `The one the review named — ${esc(spike.scope)}`,
        `<p class="mk-tight">The drawn version of this said <em>“Qualifier L — biased low — on all 9 zinc results in the batch”</em> and stopped. Read at speed that is a rule firing. It is not: <strong>${esc(METALS_BATCH.id)}</strong> reports the recovery on its QC page and qualifies no sample result, and DQO ${esc(DQO.used.version)}’s matrix spike rule states the 70–130% limit and no consequence. So the propagation had no basis, and the honest basis is the third one — somebody has to decide it and own it.</p>` +
          facts([
            ['Spiked sample', `<span class="mk-file mk-file--id">${esc(METALS_BATCH.spiked)}</span> · ${loc(METALS_BATCH.spikedFrom)}`],
            ['Batch', `<a class="mk-ref" href="#batches">${esc(METALS_BATCH.id)}</a> · ${METALS_BATCH.samples} samples`],
            ['Recovery', '<span class="mk-num mk-num--bad">62%</span> against 70–130%, reproduced at 64%'],
            ['Results at stake', `<span class="mk-num mk-num--warn">${spike.results}</span> — every zinc result in the batch, if the batch-wide option is taken`],
            ['Written so far', '<span class="mk-num mk-num--nil">0</span> — the qualifier is proposed, not applied'],
          ]) +
          '<p class="mk-tight">Which direction the bias runs is the finding, and the decision does not change it: a recovery below 100% biases low, so a qualified exceedance is <em>understated</em> rather than doubtful. What the decision changes is how many results carry the caveat, and who said they should.</p>',
      ),
      panel(
        `Re-running, and what it would be re-run against (${esc(DQO.used.version)} · ${esc(DQO.current.version)})`,
        `<p class="mk-tight"><strong>${esc(DQO.used.version)} was used for this round · ${esc(DQO.current.version)} is current.</strong> The findings above were raised on <span class="sf-instant">${esc(DQO.raisedAt)}</span> under ${esc(DQO.used.version)}, which was in force ${esc(DQO.used.effective)}. ${esc(DQO.current.version)} took effect ${esc(DQO.current.effective)} — ${esc(DQO.current.why)}</p>` +
          table({
            caption: 'What the current version would change on this round, computed rather than promised.',
            head: ['', 'Under ' + esc(DQO.used.version), 'Under ' + esc(DQO.current.version)],
            rows: [
              ['Checks whose outcome moves', '<span class="mk-muted">—</span>', `<span class="mk-num${R.outcomesMoved ? ' mk-num--warn' : ' mk-num--nil'}">${R.outcomesMoved}</span>`],
              ['Checks that stop needing a decision', `<span class="mk-num">${D.needDecision}</span> <span class="mk-muted">open</span>`, `<span class="mk-num mk-num--good">${R.conceptsMoved}</span> <span class="mk-muted">becomes automatic</span>`],
              ['Results newly qualified by rule', '<span class="mk-num mk-num--nil">0</span>', `<span class="mk-num mk-num--warn">${R.resultsNewlyQualified}</span>`],
              ['Findings already raised that are re-judged', '<span class="mk-muted">—</span>', '<span class="mk-num mk-num--nil">0</span>'],
            ],
          }) +
          R.rows
            .filter((q) => q.rerun.conceptMoves)
            .map((q) => `<p class="mk-tight"><strong>${esc(q.check)} — ${esc(q.scope)}:</strong> ${esc(q.rerun.says)}</p>`)
            .join('') +
          `<p class="mk-tight mk-muted">A re-run does not re-judge a finding already raised: it produces a second assessment under a second version and both stay readable, because every finding carries the rule version it was raised under. That is the same property a criteria set has, and it is why the button says which version rather than just “Re-run checks”. <a class="mk-ref" href="#qc-limits">The objectives, both versions</a>.</p>`,
      ),
    ) +
    notice('warning', 'A reporting limit above the criterion is not a pass.',
      'Cadmium was reported at &lt;1.0 µg/L against an ANZG 2018 guideline value of 0.54 µg/L. Nothing was measured either way, so the outcome is <strong>indeterminate</strong> and it is drawn as its own mark. Recording that as compliance is the single most consequential error this product exists to prevent — and it is one of the four consequences above that follow automatically, because the comparison is arithmetic on two numbers and there is nothing in it for anybody to decide.') +
    historyOutlierPanel()
  );
};

/**
 * A finding raised against the location's own record (FR-4.5).
 *
 * Every other check on this screen measures a value against something written
 * down in advance — a holding time, an acceptance limit, a criterion. This one
 * has no external number at all: it asks whether this result belongs to the
 * series this bore has been producing, and the answer depends entirely on which
 * bore it is. 3410 µS/cm at a background bore is a finding; the same number at
 * a bore that has read 3400 for a decade is a Tuesday.
 *
 * The working is drawn because the finding is only as good as its instrument.
 * A mean and a standard deviation over a rising series are dragged toward the
 * very value being tested, so a spike partly hides itself; the median and the
 * MAD are not, which is why the modified z-score is the test and why the screen
 * says so rather than printing a verdict.
 */
const historyOutlierPanel = () => {
  const O = EC_MW05_OUTLIER;
  const history = EC_MW05.slice(0, -1);
  const current = EC_MW05.at(-1);
  const worst = Math.max(...EC_MW05.map((r) => r.value));
  // The bare bar, not a confidence band: the modifiers colour a *judgement*,
  // and every row but the last is the record rather than an assessment of it.
  // The last one is drawn on the same scale on purpose — a step you cannot see
  // beside the rounds before it is a number, not a finding.
  const bar = (v, flagged = false) => {
    const pct = Math.round((v / worst) * 100);
    return `<span class="mk-conf${flagged ? ' mk-conf--low' : ''}" title="${esc(v)} µS/cm"><span class="mk-conf__track"><span class="mk-conf__fill" style="width:${pct}%"></span></span><span class="mk-conf__pct">${flagged ? `<strong>${v}</strong>` : v}</span></span>`;
  };
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">Spike against history — a finding with no limit behind it</h2>' +
    cols(
      panel(
        `${esc(O.analyte)} at ${esc(O.location)} — ${esc(O.value)} this round`,
        `<p class="mk-tight"><strong>${esc(O.basis)}</strong> ${esc(O.reading)}</p>` +
          facts([
            ['Result', `<span class="mk-num mk-num--warn">${esc(O.value)}</span> · sample <span class="mk-file">${esc(O.sample)}</span> · round <span class="mk-file">${esc(O.round)}</span>`],
            ['Compared against', `${O.n} prior rounds at this bore — nothing from any other location`],
            ['Median of that record', `<span class="mk-num">${esc(O.median)}</span>`],
            ['Median absolute deviation', `<span class="mk-num">${esc(O.mad)}</span>`],
            ['Ratio to the median', `<span class="mk-num">${esc(O.ratio)}</span>`],
            ['Score', `<span class="mk-num mk-num--warn">${esc(O.score)}</span> against a flagging threshold of <span class="mk-num">${esc(O.threshold)}</span>`],
            ['Method', esc(O.method)],
          ]) +
          `<p class="mk-tight mk-muted">${esc(O.separately)}</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#statistics">Is it a step or a trend? — open the trend test</a><a class="mk-btn" href="#exceedances">The licence question, separately</a><a class="mk-btn" href="#purge">The purge record for this sample</a></div>`,
      ),
      panel(
        'The record it was measured against',
        table({
          caption: 'Every round this bore has produced, oldest first. The last row is the one under test and it is not in its own comparison.',
          head: ['Round', 'Electrical conductivity, µS/cm', 'In the comparison'],
          scroll: true,
          label: 'Electrical conductivity at MW05, round by round',
          rows: [
            ...history.map((r) => [`<span class="mk-file">${esc(r.round)}</span>`, bar(r.value), '<span class="mk-muted">yes</span>']),
            [
              `<span class="mk-file">${esc(current.round)}</span>`,
              bar(current.value, true),
              '<span class="mk-tag mk-tag--warn">under test</span>',
            ],
          ],
        }) +
          '<p class="mk-tight mk-muted">A value that entered its own comparison would raise its own threshold and hide itself, which is the failure mode of every rolling check written in a hurry.</p>',
      ),
      '3fr 2fr',
    )
  );
};

/*
 * Two things found here in wave 7 and handled differently, both recorded.
 *
 * **Fixed:** the MW11 row asserted a cation–anion balance, a TDS ratio and a
 * verdict of `consistent` for a bore the field record has dipped twice and
 * found dry. It is drawn as not sampled rather than removed.
 *
 * **Deferred, and recorded rather than left to be noticed:** the balances
 * below are not derived from `MAJOR_IONS`, and recomputing them from that
 * table gives different numbers — including for MW05, whose −7.8% imbalance
 * the panel beside the table reasons from at length. Reconciling the two is a
 * seed change that moves the drawn argument on this screen and the Piper and
 * Stiff plates that read the same ions, so it is not made in passing here.
 * MW12 has results and no row, which is the same debt one column along.
 */
const consistency = () =>
  head('Internal consistency', 'Whether the chemistry agrees with itself.', { route: '/projects/:projectId/consistency' }) +
  cols(
    table({
      caption: 'Checks that compare one reported value against another.',
      head: ['Location', 'Cation–anion balance', 'TDS reconciliation', 'EC : TDS', 'Total vs dissolved'],
      rows: [
        [loc('MW01A'), '<span class="mk-num">+1.2%</span>', '<span class="mk-num">0.98</span>', '<span class="mk-num">0.64</span>', tag('consistent', 'good')],
        [loc('MW03B'), '<span class="mk-num">−2.4%</span>', '<span class="mk-num">1.03</span>', '<span class="mk-num">0.61</span>', tag('consistent', 'good')],
        [loc('MW05'), '<span class="mk-num mk-num--warn">−7.8%</span>', '<span class="mk-num">1.11</span>', '<span class="mk-num">0.67</span>', tag('review raised', 'warn')],
        [loc('MW07'), '<span class="mk-num">+3.1%</span>', '<span class="mk-num">0.96</span>', '<span class="mk-num">0.63</span>', tag('consistent', 'good')],
        [loc('MW09'), '<span class="mk-num">−1.8%</span>', '<span class="mk-num">1.01</span>', '<span class="mk-num">0.65</span>', tag('consistent', 'good')],
        /*
         * Wave 7. This row carried a cation–anion balance, a TDS ratio and a
         * verdict of `consistent` for a bore that was dipped twice and found
         * dry — an internal-consistency check run over a chemistry that does
         * not exist. It is drawn rather than deleted, for the reason the
         * crosstab's blanked column is drawn: a bore that vanishes from a
         * register reads as a bore that was never on the programme.
         */
        [loc('MW11'), ...Array(3).fill('<span class="mk-num mk-num--nil">—</span>'), tag('not sampled — dry', 'neutral')],
      ],
    }),
    panel('MW05 — what the imbalance means',
      '<p class="mk-tight">A −7.8% cation–anion balance says the anions exceed the cations by more than analytical error explains. On a bore whose sulfate is 918 mg/L, the likely readings are a sulfate result reported high, or a cation the suite does not include.</p>' +
      '<p class="mk-tight mk-muted">It is raised as a review item rather than resolved. The product does not know which, and guessing would be a silent derivation (PP3).</p>'),
  );

const validationBoard = () =>
  head('Validation state', 'Where every result in the round sits, and who moved it there.', {
    route: '/projects/:projectId/validation',
    toolbar: btn('Advance selected', 'primary'),
  }) +
  `<div class="mk-board">${[
    { state: 'Imported', n: 0, note: 'Nothing outstanding' },
    { state: 'Screened', n: 231, note: 'QA/QC run · 1 quarantined', current: true },
    { state: 'Validated', n: 0, note: 'Awaiting hydrogeologist review' },
    { state: 'Approved', n: 0, note: 'Awaiting environmental lead' },
    { state: 'Published', n: 18740, note: 'Historical · locked' },
  ].map((c) => `<div class="mk-board__col${c.current ? ' mk-board__col--current' : ''}">
      <span class="mk-board__state">${esc(c.state)}</span>
      <span class="mk-board__count">${c.n.toLocaleString('en-AU')}</span>
      <span class="mk-board__note">${esc(c.note)}</span></div>`).join('')}</div>` +
  table({
    caption: 'Every transition is attributed, including the bulk ones.',
    head: ['At', 'Transition', 'Results', 'By', 'Basis'],
    rows: [
      ['<span class="sf-instant">2026-05-21 14:02</span>', 'imported → screened', '<span class="mk-num">231</span>', 'A. Nakamura', 'Bulk — QA/QC complete, 1 quarantined'],
      ['<span class="sf-instant">2026-05-21 09:14</span>', '— → imported', '<span class="mk-num">231</span>', 'A. Nakamura', 'IMP-0241 committed'],
      ['<span class="sf-instant">2026-04-02 08:41</span>', 'approved → published', '<span class="mk-num">18,740</span>', 'R. Whitmore', 'Migration — historical state preserved'],
    ],
  });

const qualifiers = () =>
  head('Qualifiers and data lock', 'Reason codes on individual results, and periods closed to change.', {
    route: '/projects/:projectId/validation (qualifiers and lock)',
  }) +
  cols(
    table({
      caption: 'Qualifiers assigned from a controlled list. Free text is not offered.',
      head: ['Result', 'Qualifier', 'Meaning', 'Assigned by', 'Reason'],
      rows: [
        [`Zinc · ${loc('MW05')}`, '<code>J</code>', 'Estimated value', 'A. Nakamura', 'Field duplicate RPD 38.2% against a 30% limit'],
        [`Nitrate · ${loc('MW09')}`, '<code>H</code>', 'Holding time exceeded', 'system', 'Analysed at 6 days against a 2-day window'],
        [`Arsenic · ${loc('MW05')}`, '<code>*</code>', 'Confirmed against certificate', 'A. Nakamura', 'Spike against location history — checked, real'],
        [`PFOS+PFHxS · ${loc('MW05')}`, '<code>D</code>', 'Derived value', 'system', 'Sum parameter · rule sum-pfas-anzg v2.1'],
      ],
    }),
    panel('Locked periods',
      table({
        head: ['Period', 'Locked', 'Because'],
        rows: [
          ['2025 Q1 – 2026 Q1', tag('locked', 'good'), '<span class="mk-muted">Reported to DWER in the 2025 Annual Environmental Report</span>'],
          ['2026 Q2', tag('open', 'neutral'), '<span class="mk-muted">Not yet reported</span>'],
        ],
      }) +
      '<p class="mk-tight mk-muted">A locked period refuses a write rather than warning about one. Changing a number that has been submitted to a regulator is a supersession with a reason, not an edit.</p>'),
  );

/* ================================================================== *
 * J3 — Know what's wrong
 * ================================================================== */

const exceedances = () =>
  head('Exceedances — 2026 Q2', 'Where a result sits outside a criterion, and which criteria set says so.', {
    route: '/projects/:projectId/exceedances',
    toolbar: C.exportMenu() + btn('Acknowledge selected', 'primary'),
  }) +
  stats([
    stat(String(EXCEEDANCES.length), 'exceedances', 'bad'),
    stat(String(new Set(EXCEEDANCES.map((e) => e.location)).size), 'locations affected', 'bad'),
    stat(String(INDETERMINATE.length), 'indeterminate', 'warn'),
    stat(String(EXCEEDANCES.filter((e) => e.state === 'notified').length), 'notified', 'good'),
    // F-17's rule, on a tile whose count is 1 today and could be 0 tomorrow.
    ((n) => stat(String(n), `window condition${n === 1 ? '' : 's'} triggered`, n ? 'bad' : 'neutral'))(
      WINDOW_CONDITION.series.filter((w) => w.outcome === 'triggered').length,
    ),
  ]) +
  stagedNote(`${AMENDMENT.counts.outcomesChanged} of ${AMENDMENT.counts.resultsPreviewed} previewed outcomes on this register would change`) +
  C.filterBar({
    onView: 'All open exceedances',
    saved: true,
    controls: [
      C.field({ label: 'State', control: C.select({ options: ['Open and acknowledged', 'Open only', 'Notified', 'Closed'], value: 'Open and acknowledged' }) }),
      C.field({ label: 'Criteria set', control: C.select({ options: ['Both sets', 'ANZG 2018 95%', 'Licence Table 4'], value: 'Both sets' }) }),
      C.field({ label: 'TARP level', control: C.select({ options: ['Any level', 'Level 3', 'Level 2', 'Level 1'], value: 'Any level' }) }),
      C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
    ],
    chips: [C.chip('2026 Q2', { prefix: 'period' }), C.chip('open', { prefix: 'state', tone: 'bad' })],
    count: '9 of 9 exceedances',
  }) +
  C.selectionBar({
    n: 3,
    unit: 'exceedances',
    actions: ['Acknowledge', 'Link to an obligation', 'Annotate', 'Export the selection'],
    undo: 'Acknowledging is attributed and reversible; it does not close the exceedance.',
  }) +
  table({
    caption: 'One row per result per criterion. A result above two criteria appears twice, because two regulators asked two questions.',
    head: ['Location', 'Analyte', 'Result', 'Criterion', 'Factor', 'Run', 'TARP', 'State'],
    kind: 'matrix',
    label: 'Exceedance register',
    rows: EXCEEDANCES.map((e) => [
      loc(e.location),
      esc(e.analyte),
      `<a class="mk-ref" href="#lineage"><span class="mk-num mk-num--bad">${esc(e.value)}</span></a>`,
      `<span class="mk-muted">${esc(e.criterion)}</span>`,
      `<span class="mk-num">${esc(e.factor)}</span>`,
      esc(e.run),
      e.tarp === '—' ? '<span class="mk-num mk-num--nil">—</span>' : tag(e.tarp, e.tarp === 'Level 3' ? 'bad' : 'warn'),
      tag(e.state, toneFor(e.state)),
    ]),
  }) +
  notice('warning', `${INDETERMINATE.length} results could not be assessed at all, and they are not on this register.`,
    `Cadmium at every bore that returned water, and the PFAS sum at ${INDETERMINATE.filter((i) => i.analyte === 'PFOS + PFHxS').length} of them, were reported below a limit of reporting that sits above the guideline value. Those are on the crosstab as <strong>indeterminate</strong> and on <a class="mk-ref" href="#indeterminate">their own register</a>. A register of exceedances that quietly counted them as compliant would be the more dangerous screen.`) +
  windowConditionPanel();

/**
 * A consecutive-round condition, drawn *deciding* something (FR-5.2).
 *
 * The register above already says "2nd consecutive quarter" in a column, which
 * is a fact about a row and not a decision. This is the decision: one licence
 * condition, the four rounds it looked at, and four different outcomes out of
 * the same rule — including the two that matter most and are the easiest to
 * leave undrawn. **Not triggered is an outcome**, and a screen that only shows
 * conditions that fired teaches a reader that silence means nothing was
 * evaluated. **Already triggered is a different outcome again**: the condition
 * tripped a quarter ago and this round extends the run without raising a second
 * obligation, because the deadline runs from the round that first made it true.
 *
 * Outcome is carried by a word and a glyph, never by the colour (§5.3).
 */
const windowConditionPanel = () => {
  const W = WINDOW_CONDITION;
  const fmt = (v, unit) => (unit === 'µS/cm' ? String(v) : v.toFixed(1));
  const TONE = { triggered: 'bad', 'one round short': 'warn', 'not triggered': 'neutral' };
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">Condition 12(c) — three consecutive rounds, evaluated</h2>' +
    facts([
      ['Condition', `<a class="mk-ref" href="#licence">${esc(W.condition)}</a>`],
      ['Rule', esc(W.rule)],
      ['Parameters and locations', esc(W.schedule)],
      ['What it obliges', esc(W.obliges)],
      ['Window', `${esc(W.rounds[0])} → ${esc(W.rounds.at(-1))} · ${W.rounds.length} rounds`],
      ['Evaluated', `<span class="sf-instant">${esc(W.evaluated)}</span>`],
      ['Rule version', `<code class="mk-file">${esc(W.ruleVersion)}</code>`],
    ]) +
    table({
      caption: 'One rule, four series, four outcomes.',
      head: ['Location', 'Parameter', 'Criterion', ...W.rounds, 'Run', 'Outcome'],
      kind: 'matrix',
      label: 'Consecutive-round condition 12(c), evaluated',
      rows: W.series.map((s) => [
        loc(s.location),
        esc(s.analyte),
        `<span class="mk-muted">${esc(s.criterion)}</span>`,
        ...s.values.map(
          (v, i) =>
            `<span class="mk-num${s.above[i] ? ' mk-num--bad' : ''}">${s.above[i] ? '▲ ' : '· '}${esc(fmt(v, s.unit))}</span>`,
        ),
        `<span class="mk-num">${s.run} of 3</span>`,
        C.status(s.outcome, TONE[s.outcome]),
      ]),
    }) +
    '<p class="mk-tight"><strong>▲</strong> marks a round above the criterion and <strong>·</strong> one below it, so the run reads across the row without reading the numbers.</p>' +
    `<p class="mk-tight mk-muted">${esc(W.notDrawn)}</p>` +
    cols(
      panel(
        'What each outcome did, in words',
        W.series
          .map(
            (s) =>
              '<p class="mk-tight">' +
              `${C.status(s.outcome, TONE[s.outcome])} <strong>${esc(s.analyte)} at ${esc(s.location)}</strong>` +
              (s.trippedAt ? ` — tripped on <span class="mk-file">${esc(s.trippedAt)}</span>` : '') +
              `. ${esc(s.says)}</p>` +
              (s.also ? `<p class="mk-tight mk-muted">${esc(s.also)}</p>` : ''),
          )
          .join(''),
      ),
      panel(
        'Why the outcome is stored rather than re-computed',
        `<p class="mk-tight">${esc(W.frozen)}</p>` +
          `<p class="mk-tight">${esc(W.alsoWindowed)} The two windows are drawn apart on purpose: the licence is what a regulator enforces and the <a class="mk-ref" href="#tarp">TARP</a> is what the site committed to, and a product that merges them loses which one was breached.</p>` +
          C.blastRadius({
            lede: 'If the window were widened to five rounds, before anybody widened it:',
            rows: [
              { what: 'Series whose outcome would change', n: '0 — a longer window cannot break a run that is already unbroken' },
              { what: 'Outcomes already decided', n: '1 — copper at MW05, frozen with the rule that decided it' },
              { what: 'Obligations that would be re-raised', n: '0' },
              { what: 'Rounds that would be re-evaluated', n: '9 — every round in the new window, on the criterion in force at each' },
            ],
            action: 'Preview against the real record',
            cancel: 'Leave the window at three',
            reversible:
              'Reversible, and nothing is written by the preview. A condition change re-evaluates forward; outcomes already frozen onto an obligation stay as they were decided.',
          }),
      ),
    )
  );
};

const crosstab = () => {
  /*
   * The location filter's options, counted rather than typed. "All 9
   * locations" was a typed label that had been stale since the register grew
   * past nine rows, sitting on a grid that draws seven groundwater bores —
   * and the three options beneath it were already counts of the same set, so
   * the one number nobody derived was the one that went wrong. The scope is
   * groundwater because that is what this matrix is: the matrix filter says
   * Groundwater and the grid's own columns are the same seven bores.
   */
  const wells = LOCATIONS.filter((l) => l.klass === 'groundwater');
  const inArea = (area) => wells.filter((l) => l.area === area).length;
  const locationOptions = [
    `All ${wells.length} locations`,
    `Compliance boundary (${inArea('Compliance boundary')})`,
    `Downgradient of TSF (${inArea('TSF')})`,
    `Background (${wells.filter((l) => l.position === 'Background').length})`,
  ];
  /*
   * A column whose every cell is empty says so in its own head as well as in
   * its cells. The reason travels with the identifier, so a reader panning the
   * matrix who lands mid-column still has it — and the stacked `data-label` a
   * phone draws carries it too.
   */
  const columnHead = (code) => {
    if (!CROSSTAB_SHAPE.isEmpty(code)) return loc(code);
    const d = FIELD_ROUND.disposition(FIELD_ROUND.current.find((x) => x.location === code).disposition);
    return `${loc(code)}<small>${esc(d.label.toLowerCase())} — no sample</small>`;
  };
  const rows = CROSSTAB.map((r) => {
    const analyte = ANALYTES.find((a) => a.name === r.analyte);
    const crit = [
      analyte?.a ? `A ${analyte.a}${analyte.aNote ? ` — ${analyte.aNote}` : ''}` : null,
      analyte?.l ? `L ${analyte.l}` : null,
    ].filter(Boolean).join(' · ');
    return [
      `${esc(r.analyte)}${crit ? `<small>${esc(crit)}</small>` : ''}`,
      `<span class="mk-muted">${esc(analyte?.unit ?? '')}</span>`,
      ...r.cells.map((c) => resultValue(c, CRITERIA)),
    ];
  });
  return (
    head('Results by analyte and location', 'Every result in the round, with its outcome against each criteria set.', {
      route: '/projects/:projectId/results',
      toolbar: C.exportMenu() + C.lineageButton('Lineage of the focused cell') + btn('Add to report', 'primary'),
      kind: 'matrix',
      label: 'Exceedance register',
    }) +
    C.filterBar({
      onView: 'TSF downgradient — metals',
      saved: false,
      controls: [
        C.field({ label: 'Locations', control: C.select({ options: locationOptions, value: locationOptions[0] }) }),
        C.field({ label: 'Analyte suite', control: C.select({ options: ['Everything in the round', 'Dissolved metals (8)', 'Nutrients (4)', 'PFAS (14)', 'Field parameters (5)'], value: 'Everything in the round' }) }),
        C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
        C.field({ label: 'Matrix', control: C.select({ options: ['Groundwater', 'Surface water', 'All matrices'], value: 'Groundwater' }) }),
        C.field({ label: 'Criteria sets', control: C.select({ options: ['Both sets', 'ANZG 2018 95% only', 'Licence Table 4 only'], value: 'Both sets' }) }),
        C.field({ label: 'Show', control: C.select({ options: ['Every result', 'Exceedances only', 'Indeterminate only', 'Censored only'], value: 'Every result' }) }),
      ],
      chips: [
        C.chip('2026 Q2', { prefix: 'period' }),
        C.chip('Groundwater', { prefix: 'matrix' }),
        C.chip('added zinc', { prefix: 'edited', tone: 'new' }),
      ],
      count: `${CROSSTAB_SHAPE.analytes} analytes × ${CROSSTAB_SHAPE.locations} locations · ${CROSSTAB_SHAPE.results} results · ${CROSSTAB_SHAPE.empty} cells at a bore that returned nothing`,
    }) +
    `<p class="sf-lede mk-tight">${esc(ROUND.code)} · collected ${esc(ROUND.collected)} · ${esc(ROUND.laboratory)} certificate ${esc(ROUND.certificate)} · validation state <strong>${esc(ROUND.validationState)}</strong> · all times ${esc(PROJECT.timezone)}</p>` +
    `<section aria-label="Criteria applied">${criteriaLegend(CRITERIA)}${outcomeLegend()}</section>` +
    C.selectionBar({
      n: 7,
      unit: 'results',
      actions: ['Assign a qualifier', 'Open lineage', 'Add to the report', 'Export the selection'],
      undo: 'Qualifying is recorded, attributed and reversible.',
    }) +
    table({
      caption: 'Results by analyte and location — 2026 Q2. Two marks per value, always in the same order.',
      label: 'Results by analyte and location — 2026 Q2',
      kind: 'matrix',
      head: ['Analyte<small>criteria applied</small>', 'Unit', ...CROSSTAB_COLUMNS.map(columnHead)],
      rows,
    }) +
    C.pager({ from: 1, to: 11, total: 11, unit: 'analytes', pageSize: 50 }) +
    notice(
      'default',
      `${esc(CROSSTAB_SHAPE.emptyColumns.join(', '))} is drawn empty, and the column says why.`,
      `The field record for this round has ${esc(CROSSTAB_SHAPE.emptyColumns.join(', '))} visited twice and found <strong>dry</strong> — dipped to the base of the screened interval, tape dry to the weight — so it yielded no samples and there is nothing to put in these ${CROSSTAB_SHAPE.empty} cells. The column stays: <strong>a column that disappears reads as a bore that does not exist</strong>, and a cell left blank reads as a value somebody forgot to enter. Neither is what happened. The cells carry the round’s own <em>dry</em> disposition — its glyph and its word, read from the same list <a class="mk-ref" href="#field-capture">the bore session</a> dispositions against, so the grid does not invent a second vocabulary for one fact — and the sentence a screen reader gets carries the whole of what dry means, and the ${CROSSTAB_SHAPE.results} results counted above are the ones that exist. <a class="mk-ref" href="#field-capture">The bore session</a> holds the disposition; <a class="mk-ref" href="#data-states">Data states</a> is where the pattern is set out.`,
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">The same grid, across rounds</h2>' +
    `<p class="sf-lede mk-tight">${C.segmented({ options: ['This round', 'By round', 'By location'], value: 'By round', label: 'Layout' })}</p>` +
    notice(
      'default',
      'One round is a snapshot. The comparison is the review.',
      'Analyte by location answers <em>what did we get</em>. Analyte by round answers <em>is it moving</em>, which is the question a quarterly review exists to ask and the reason a saved view says “rolling four quarters”. The same marks, the same censoring notation, the same criteria sets — the axis changes and nothing else does.',
    ) +
    table({
      caption: 'MW05 · rolling four quarters. Two marks per value, always in the same order.',
      label: 'MW05 across four rounds',
      kind: 'matrix',
      head: ['Analyte<small>criteria applied</small>', 'Unit', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2'],
      rows: [
        ['Arsenic (filtered)<small>A 13 — As(V) · L ≤ 50</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '18.2', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '21.4', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '24.9', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '28.4', o: ['exceedance', 'compliant'] }, CRITERIA)],
        ['Cadmium (filtered)<small>A 0.54 — hardness-adjusted · L ≤ 2</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '<5.0', o: ['indeterminate', 'indeterminate'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA),
          resultValue({ v: '<1.0', o: ['indeterminate', 'compliant'], censored: true }, CRITERIA)],
        ['Zinc (filtered)<small>A 8.0 — hardness-adjusted · L ≤ 50</small>', '<span class="mk-muted">µg/L</span>',
          resultValue({ v: '9.1', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '14.8', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '22.0', o: ['exceedance', 'compliant'] }, CRITERIA),
          resultValue({ v: '31.6', o: ['exceedance', 'compliant'] }, CRITERIA)],
        ['Sulfate as SO₄<small>no ANZG value · L ≤ 1000</small>', '<span class="mk-muted">mg/L</span>',
          resultValue({ v: '441', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '602', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '744', o: ['not_evaluated', 'compliant'] }, CRITERIA),
          resultValue({ v: '918', o: ['not_evaluated', 'compliant'] }, CRITERIA)],
        ['Total hardness as CaCO₃<small>input to three criteria</small>', '<span class="mk-muted">mg/L</span>',
          resultValue({ v: '244', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '301', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '358', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA),
          resultValue({ v: '412', o: ['not_evaluated', 'not_evaluated'] }, CRITERIA)],
      ],
    }) +
    cols(
      panel(
        'What only the second layout shows',
        '<p class="mk-tight">Arsenic, zinc, sulfate and hardness are all rising together, quarter on quarter, at one bore. No single round says that — every one of them is just a number against a limit.</p>' +
          '<p class="mk-tight">And the cadmium row shows something a single round hides completely: the reporting limit <strong>stepped from 5.0 to 1.0 µg/L</strong> between Q3 and Q4 when the laboratory changed method. The Q3 cell is indeterminate against <em>both</em> criteria sets; the later ones only against ANZG. A series that silently mixed two reporting limits would read as an improvement.</p>',
      ),
      panel(
        'Rising hardness is not a background detail',
        '<p class="mk-tight">Hardness went from 244 to 412 mg/L over the same four quarters, and cadmium, nickel and zinc are all assessed against criteria computed from it.</p>' +
          '<p class="mk-tight"><strong>So the criteria moved too.</strong> The zinc criterion was 5.4 µg/L in 2025 Q3 and is 8.0 µg/L now — the limit relaxed while the result climbed, and the exceedance factor understates the change. Nothing on a single-round grid could tell you that.</p>' +
          `<div class="mk-actions"><a class="mk-btn mk-btn--sm" href="#hardness">How the criterion is calculated</a><a class="mk-btn mk-btn--sm" href="#background">Against background</a></div>`,
      ),
    ) +
    notice('default', 'Everything true about a value is on the value.',
      'A superseded reading keeps its old value struck through beside the new one. A quarantined reading stays visible in brackets on a hatched ground rather than vanishing. A non-detect keeps the laboratory’s own <code>&lt;LOR</code> notation and is never rendered as a substituted number.') +
    cols(
      panel(
        'The column set is a saved view, not a rebuild',
        `<p class="mk-tight">The monthly review is a recall. Which locations, which analytes, which period, which criteria sets — the whole question, named and shared, so two people asking for “the compliance boundary numbers” get the same rows.</p>` +
          table({
            head: ['View', 'Owner', 'Locations', 'Analytes', 'Period', 'Last used'],
            rows: SAVED_VIEW_LIST.map((v) => [
              `<a class="mk-ref" href="#saved-views">${esc(v.name)}</a>`,
              v.shared ? tag('Project', 'good') : tag('Private', 'neutral'),
              esc(v.locations),
              esc(v.analytes),
              esc(v.period),
              `<span class="sf-instant">${esc(v.used)}</span>`,
            ]),
          }) +
          `<p class="mk-tight">A browser preference would not do. If the view lives on this machine then two people comparing numbers are comparing two questions, and the product has reintroduced the disagreement it exists to end.</p>`,
      ),
      panel(
        'Working this grid without a mouse',
        table({
          head: ['Keys', 'What it does'],
          rows: [
            [C.kbd('↑ ↓'), 'Move between analytes'],
            [C.kbd('← →'), 'Move between locations'],
            [C.kbd('L'), 'Open lineage for the focused value, over this grid'],
            [C.kbd('Space'), 'Select the row'],
            [C.kbd('⇧ ↑ ↓'), 'Extend the selection'],
            [C.kbd('⌘ E'), 'Export exactly what is on screen'],
          ],
        }) +
          `<p class="mk-tight">The identifying column stays frozen while the grid pans, and no domain state is dropped at the smallest breakpoint — a phone layout that collapsed two per-criterion outcomes into one badge would fail the same rule a desktop one would.</p>`,
      ),
    )
  );
};

const tarpBoard = () =>
  head('TARP state', 'Trigger levels, what each one requires, and whether it has been done.', {
    route: '/projects/:projectId/tarp',
    toolbar: btn('Acknowledge', 'primary'),
  }) +
  stagedNote(`${AMENDMENT.counts.tarpMoved} of ${AMENDMENT.counts.tarpLevels} trigger levels would move — Level 2 would hold on arsenic rather than copper`) +
  '<h2 class="mk-h2">Trigger levels in force</h2>' +
  `<div class="mk-tarp">${TARP.map((t) => `<article class="mk-tarp__card mk-tarp__card--${t.state === 'active' ? (t.level === 'Level 3' ? 'bad' : 'warn') : 'good'}">
      <header><span class="mk-tarp__level">${esc(t.level)}</span>${tag(t.state, t.state === 'active' ? 'bad' : 'good')}</header>
      <h3 class="mk-tarp__label">${esc(t.label)}</h3>
      <dl class="mk-tarp__facts">
        <div><dt>Locations</dt><dd>${t.locations.split(', ').map(loc).join(', ')}</dd></div>
        <div><dt>Trigger</dt><dd>${esc(t.trigger)}</dd></div>
        <div><dt>In force since</dt><dd>${esc(t.since)}</dd></div>
        <div><dt>Response</dt><dd>${esc(t.response)}</dd></div>
      </dl></article>`).join('')}</div>` +
  notice('default', 'A TARP level is a state with a required response, not a colour.',
    'Level 3 at MW05 created a statutory notification obligation the moment the PFAS result committed. The obligation is on the obligations board with a clock, and the clock started from a timestamp the database will not let anyone move.');

const alerts = () =>
  head('Alerts', 'Who was told, through what, and whether anybody has accepted it.', {
    route: '/projects/:projectId/alerts',
  }) +
  table({
    caption: 'Every destination is a configured row. There is no Strataflow-operated relay and no URL in application code.',
    head: ['Raised', 'Alert', 'Channel', 'Delivered', 'Acknowledged', 'Escalates'],
    scroll: true, label: 'Alerts raised and their delivery',
    rows: [
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'PFOS + PFHxS above ANZG 2018 · MW05', 'Environmental lead — email', tag('delivered', 'good'), 'R. Whitmore · 09:22', '—'],
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'TARP Level 3 raised · MW05', 'Site webhook — Teams', tag('delivered', 'good'), 'S. Petrelli · 09:31', '—'],
      ['<span class="sf-instant">2026-05-21 14:06</span>', 'Arsenic 3rd consecutive quarter · MW05', 'Hydrogeologist — email', tag('delivered', 'good'), '<span class="mk-muted">not acknowledged</span>', '<span class="mk-num mk-num--warn">in 6 h</span>'],
      ['<span class="sf-instant">2026-05-14 06:00</span>', 'Monitoring round overdue · MW11', 'Environmental officer — email', tag('delivered', 'good'), '<span class="mk-muted">not acknowledged</span>', '<span class="mk-num mk-num--bad">escalated</span>'],
    ],
  }) +
  notice('default', 'Raising an alert is synchronous with the data that raised it.',
    'Only the escalation countdown is scheduled. An exceedance that lands at 09:14 raises its alert at 09:14, inside the same transaction — not on the next tick of a worker that might not run.');

const locationDetail = () => {
  const B = CONSTRUCTION.of('MW05');
  return (
  head('MW05', 'One monitoring location: where it is, how it is built, and what it has told us.', {
    route: '/projects/:projectId/locations',
    toolbar: btn('Export construction log') + btn('Resurvey'),
  }) +
  cols(
    /*
     * Wave 7: every fact below resolves through `CONSTRUCTION` and
     * `LOCATIONS`. They were ten typed strings beside a plate that held its
     * own copies of the same four numbers, which is how a screened interval
     * comes to read 12.0 – 18.0 m in one place and something else in another.
     * The lineage chain reads the same record, so the bore is described once.
     */
    facts([
      ['Class', 'Groundwater monitoring bore'],
      ['Bore', `<span class="mk-file">${esc(B.id)}</span>`],
      ['Area', esc(LOCATIONS.find((l) => l.code === B.code).area)],
      ['Position', esc(B.position)],
      ['Hydrostratigraphic unit', esc(B.unit)],
      ['Screened interval', `${esc(B.screen)} bgl<small>${esc(B.slot)}</small>`],
      ['Coordinates', `${B.easting} mE, ${B.northing} mN · ${esc(PROJECT.crs)}`],
      ['Top of casing', `${B.toc.toFixed(2)} m AHD<small>${esc(B.surveys[0].reason.toLowerCase())} of ${esc(B.tocFrom)}</small>`],
      ['Drilled', `${esc(B.drilled)} · ${esc(B.method)}`],
      ['Rounds on record', `<span class="mk-num">${B.rounds}</span>`],
      ['Current state', tag('exceedance', 'bad')],
    ]) +
    table({
      caption: 'Survey history. A resurvey takes effect from its own epoch and moves nothing behind it; a correction supersedes and reaches back.',
      head: ['Epoch', 'Kind', 'Top of casing', 'Applies to', 'By'],
      rows: B.surveys.map((v) => [
        esc(v.epoch),
        esc(v.reason),
        `<span class="mk-num">${v.toc.toFixed(2)}</span>`,
        `<span class="mk-muted">${esc(v.applies)}</span>`,
        esc(v.by),
      ]),
    }) +
    notice('default', 'Groundwater elevation is derived at the measurement date, never stored.',
      'A depth-to-water reading taken in 2022 reduces through the 2019 datum; the same depth taken last week reduces through the 2024 one. Storing the elevation would freeze whichever datum happened to be in force the day it was calculated, and a resurvey would silently invalidate years of hydrograph.'),
    F.boreLog('MW05'),
    '3fr 2fr',
  ) +
  panel(
    `${esc(NEST.id)} — this bore is half of a pair`,
    '<p class="mk-tight">MW03B is screened 46–52 m in the confined unit and MW01A 18–24 m in the superficial, at the same location. A register lists them as two rows; they are one installation, and the thing worth knowing is the difference between them.</p>' +
      table({
        caption: 'The nest, read vertically.',
        head: ['Bore', 'Hydrostratigraphic unit', 'Screened interval', 'Standing level', 'Head', 'EC'],
        rows: NEST.bores.map((b) => [
          loc(b.code),
          esc(b.unit),
          esc(b.screen),
          `<span class="mk-num">${esc(b.swl)}</span>`,
          `<span class="mk-num">${esc(b.head)}</span>`,
          `<span class="mk-num">${esc(b.ec)}</span>`,
        ]),
      }) +
      `<p class="mk-tight"><strong>Vertical gradient: ${esc(NEST.gradient)}.</strong> ${esc(NEST.inference)}</p>` +
      C.card({
        tone: 'good',
        head: '<span class="mk-queue__kind">Why this is not a footnote</span>',
        body:
          '<p class="mk-tight">A containment argument is made or lost on the vertical gradient, and it is invisible in every screen that treats a bore as a point. Two rows in a register, sorted alphabetically, with the number that matters being the difference between them.</p>',
      }),
  ) +
  /*
   * The construction as a record rather than only as a drawing (PR-3a). The
   * plate beside it is the same data; this is the part a reviewer reads when
   * they are asking whether the screen monitors the unit it claims to, which
   * is a question about the annulus and not about the screen.
   */
  '<h2 class="mk-h2" style="margin-top:1.4rem">How this bore is built</h2>' +
  `<p class="mk-tight">${esc(B.says)}</p>` +
  cols(
    table({
      caption: 'The string from surface to base, in the lengths it was installed in. The screened interval is its own row, not a kind of casing — it carries a unit and a slot aperture that no length of blank pipe has.',
      head: ['Component', 'From<small>m bgl</small>', 'To<small>m bgl</small>', 'Material'],
      rows: B.casing.map((c) => [
        esc(c.component),
        `<span class="mk-num">${c.from.toFixed(1)}</span>`,
        `<span class="mk-num">${c.to.toFixed(1)}</span>`,
        esc(c.material),
      ]),
    }),
    table({
      caption: 'What fills the space between the borehole wall and the casing, over each interval. A bentonite seal above the filter pack is what makes a screen monitor the unit it claims to; without one the result describes a mixture.',
      head: ['From<small>m bgl</small>', 'To<small>m bgl</small>', 'Material'],
      rows: B.annulus.map((a) => [
        `<span class="mk-num">${a.from.toFixed(1)}</span>`,
        `<span class="mk-num">${a.to.toFixed(1)}</span>`,
        esc(a.material),
      ]),
    }),
    '1fr 1fr',
  ) +
  cols(
    notice('default', 'Casing material is a data-quality fact, not an inventory one.',
      `${esc(B.casing[0].material)} throughout. Steel casing contributes iron, manganese and zinc to a sample, so a metals exceedance in a galvanised-steel bore is a different conversation from the same number in a uPVC one — and this bore's is uPVC, which is one of the reasons the zinc result here is read as formation water.`),
    notice('default', 'Natural collapse is an answer, not a blank.',
      'The interval below the filter pack is recorded as formation material falling back around the casing. Leaving it out would say the same thing as “nobody wrote it down”, and those are different facts (PP4).'),
    '1fr 1fr',
  ) +
  `<div class="mk-actions"><a class="mk-btn" href="#lineage">Where this construction sits in the lineage of a result</a><a class="mk-btn" href="#purge">The purge this bore's last sample came from</a></div>`
  );
};

/* ================================================================== *
 * J4 — Understand it and explain it
 * ================================================================== */

const hydrographWorkspace = () =>
  head('Hydrograph', 'Water level over time, with rainfall, triggers and comparison.', {
    route: '/projects/:projectId/hydrograph',
    toolbar: btn('Export SVG') + btn('Save configuration') + btn('Add to report', 'primary'),
  }) +
  cols(
    figure('4.1', 'Groundwater elevation, MW05 · MW07 · MW01A', F.hydrograph({ trigger: 195.6 }),
      'Rainfall in its own panel, never on a second axis inside the plot.'),
    panel('Configuration',
      '<div class="mk-config">' +
      ['Locations · MW05, MW07, MW01A', 'Period · Jan 2023 – May 2026', 'Y axis · elevation, m AHD',
       'Rainfall overlay · site gauge, monthly', 'Trigger line · 195.6 m AHD (TSF licence)',
       'Datum · in force at each measurement date']
        .map((c) => `<div class="mk-config__row">${esc(c)}</div>`).join('') +
      '</div>' +
      '<p class="mk-tight mk-muted">Saved with the figure, not with the session. QB-3 is that next quarter’s figure is identical except for the new data — which means the configuration is a stored object, not something rebuilt by hand.</p>' +
      `<p class="mk-tight mk-muted"><strong>A dry bore is a gap.</strong> ${esc(F.POTENTIOMETRIC_FIT.dry.join(', '))} was dipped to the base of its screened interval on the May round and found dry, so its trace breaks rather than drawing a line through it — and it contributes no point to <a class="mk-ref" href="#map">the potentiometric surface</a> either. A polyline across a null asserts a water level nobody measured.</p>`),
    '2fr 1fr',
  ) +
  figure('4.2', 'Arsenic at MW05, with censoring shown', F.censoredSeries(),
    'Non-detects at their limit of reporting under an open downward triangle; the limit is its own stepped line, because it changed when the laboratory changed method.') +
  cols(
    panel(
      'Read it as a table',
      '<p class="mk-tight">Every plate has one, and it is not an accessibility afterthought — it is how somebody checks a value they are about to put in a report. A figure a reader has to trust is a figure they will re-derive in Excel.</p>' +
        C.segmented({ options: ['Figure', 'Table', 'Both'], value: 'Both', label: 'View' }) +
        table({
          caption: 'Figure 4.2 — the plotted values, censoring intact.',
          head: ['Collected', 'Result', 'Detect', 'LOR', 'Method', 'Plotted at'],
          rows: [
            ['2024-08-12', '<span class="mk-num">&lt;5.0</span>', 'non-detect', '5.0 µg/L', 'ICP-MS', 'At the LOR, open triangle'],
            ['2024-11-14', '<span class="mk-num">&lt;5.0</span>', 'non-detect', '5.0 µg/L', 'ICP-MS', 'At the LOR, open triangle'],
            ['2025-02-11', '<span class="mk-num">6.2</span>', 'detected', '5.0 µg/L', 'ICP-MS', 'At the value'],
            ['2025-05-13', '<span class="mk-num">&lt;1.0</span>', 'non-detect', '1.0 µg/L', 'ICP-MS/MS', 'At the LOR — the limit stepped down here'],
            ['2025-08-19', '<span class="mk-num">11.8</span>', 'detected', '1.0 µg/L', 'ICP-MS/MS', 'At the value'],
            ['2026-05-13', '<span class="mk-num mk-num--bad">28.4</span>', 'detected', '1.0 µg/L', 'ICP-MS/MS', 'At the value · above the DGV'],
          ],
        }) +
        '<p class="mk-tight">The table carries the same censoring notation the plate does. An export that flattened <code class="mk-file">&lt;5.0</code> to <code class="mk-file">5.0</code> would make the two disagree, and the one somebody pasted into a report would be the wrong one.</p>',
    ),
    panel(
      'One finding against the approved grammar, recorded rather than fixed',
      '<p class="mk-tight">The rainfall bars are drawn in the rule-strong grey, which measures <strong>2.41:1</strong> against the plate ground — below the 3:1 floor for a mark that carries data. The nearest value that passes is the not-evaluated mark grey at <strong>3.02:1</strong>, which is already a token in this product rather than a new colour.</p>' +
        '<p class="mk-tight"><strong>It has not been changed here.</strong> The grammar was approved on 20 August and the reference plates are an oracle; a rendering that quietly improves on the thing it is measured against is indistinguishable from a rendering that drifted from it. This is a revision for Jerry to accept or refuse, recorded where it can be seen.</p>' +
        C.blastRadius({
          lede: 'If the revision is accepted:',
          rows: [
            { what: 'Reference plates to re-render and re-approve', n: '3 of 12' },
            { what: 'Contrast against the plate ground', n: '2.41 → 3.02' },
            { what: 'Series the bars could now compete with', n: '0 — still lighter than every trace' },
            { what: 'Tokens invented', n: '0' },
          ],
          action: 'Jerry’s call',
          cancel: 'Relief is already in place — labelled axis and the table above',
          reversible:
            'Not urgent either way. The skill’s own rule is that a contrast warning obliges visible labels or a table view rather than a colour change, and the panel above is that relief. Darkening the bars would be the better fix; leaving them is defensible.',
        }),
    ),
  );

const hydrochem = () =>
  head('Hydrogeochemistry', 'Piper, Stiff and Schoeller — what kind of water this is.', {
    route: '/projects/:projectId/hydrochem',
    toolbar: btn('Export SVG') + btn('Add all to report', 'primary'),
  }) +
  cols(
    figure('4.3', 'Piper trilinear diagram — 2026 Q2', F.piper(),
      'MW05 separates from the background cluster on the sulfate limb.'),
    panel('What the plate says',
      '<p class="mk-tight">Every bore except MW05 is a calcium-bicarbonate water, tightly clustered — the natural signature of the Superficial aquifer here. MW05 is sulfate-dominated and four times the ionic strength.</p>' +
      '<p class="mk-tight">That is the difference between <em>a bore with a high arsenic result</em> and <em>a bore receiving TSF seepage</em>, and it is the argument a hydrogeologist has to make in the report. The chemistry makes it; the exceedance register alone cannot.</p>' +
      '<p class="mk-tight mk-muted">Ionic balance at MW05 is −7.8%, outside the ±5% acceptance limit, and that is stated here rather than left on the QA/QC screen. A plate drawn from data that failed a consistency check should say so on its own face.</p>'),
    '3fr 2fr',
  ) +
  figure('4.4', 'Stiff diagrams by location', F.stiff(),
    'One scale across every panel. Per-panel scaling would make each polygon fill its box and destroy the only comparison the plate is for.') +
  figure('4.5', 'Schoeller diagram', F.schoeller(),
    'Semi-logarithmic; only the decades carry a gridline.');

const statistics = () =>
  head('Statistics and trend', 'Censored-data methods and non-parametric trend tests.', {
    route: '/projects/:projectId/statistics',
    toolbar: btn('Export SVG') + btn('Add to report', 'primary'),
  }) +
  cols(
    figure('4.6', 'Arsenic trend at MW05', F.trendPlot(),
      'Sen’s slope drawn only across the period it was computed from, and clipped to the plot.'),
    cols(
    panel(
      'Seasonal Mann–Kendall, on a series that is seasonal',
      table({
        head: ['Test', 'S', 'p', 'Sen’s slope', 'Verdict'],
        rows: [
          [esc(TREND.plain.name), `<span class="mk-num">${TREND.plain.s}</span>`, `<span class="mk-num">${TREND.plain.p}</span>`, `<span class="mk-num">${esc(TREND.plain.slope)}</span>`, C.status(TREND.plain.verdict, 'bad')],
          [esc(TREND.seasonal.name), `<span class="mk-num">${TREND.seasonal.s}</span>`, `<span class="mk-num">${TREND.seasonal.p}</span>`, `<span class="mk-num">${esc(TREND.seasonal.slope)}</span>`, C.status(TREND.seasonal.verdict, 'bad')],
        ],
      }) +
        `<p class="mk-tight">${esc(TREND.why)}</p>` +
        '<p class="mk-tight">Both are reported. Showing only the one with the smaller p-value would be choosing the answer.</p>',
    ),
    panel(
      'How the two non-detects entered the trend test',
      `<p class="mk-tight">${esc(TREND.censoredTreatment)}</p>` +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">Never substituted</span>',
          body:
            '<p class="mk-tight">Half the limit of reporting is the common shortcut and it puts an invented number into a rank test. With an LOR that stepped from 5.0 to 1.0 µg/L mid-series, substitution would have manufactured a step change of 2 µg/L at the method change — a trend created by the laboratory changing instrument.</p>',
        }),
    ),
  ) +
  panel('Why not a linear regression',
      '<p class="mk-tight">Environmental series are not normal, are not evenly spaced, and contain values the laboratory reported only as “below something”. Ordinary least squares assumes away all three.</p>' +
      '<p class="mk-tight">Mann-Kendall asks only whether later values tend to exceed earlier ones, which is the question, and Sen’s slope gives a rate that a single outlier cannot swing.</p>' +
      '<p class="mk-tight mk-muted">Below n = 8 the test is reported with a sample-size warning and no p-value, rather than a number that looks like evidence.</p>'),
    '3fr 2fr',
  ) +
  cols(
    figure('4.7', 'Arsenic distribution by location', F.boxPlot(),
      'Every reading drawn beside its box — a summary with nothing behind it cannot distinguish twelve results from two hundred.'),
    figure('4.8', 'Normal probability plot, censored', F.probabilityPlot(),
      'Two non-detects fitted by robust ROS. Never substitution of half the limit.'),
    '1fr 1fr',
  );

const mapScreen = () =>
  head('Map', 'The monitoring network, symbolised by this round’s outcome.', {
    route: '/projects/:projectId/map',
    toolbar: btn('Print layout') + btn('Export GeoJSON') + btn('Export shapefile'),
  }) +
  figure('4.9', 'Monitoring network — 2026 Q2 exceedance state', F.siteMap(),
    'The same four state marks as the crosstab. A map and a table that disagree about a bore is the failure this encoding exists to prevent.') +
  cols(
    cols(
    figure('4.10', 'Potentiometric surface and flow direction — 2026 Q2', F.potentiometric(),
      'The claim every other screen rests on, drawn rather than stored as a string.'),
    panel(
      'Which way the water goes',
      '<p class="mk-tight">Every location on this project carries a position — <em>upgradient</em>, <em>downgradient of TSF</em>, <em>compliance boundary</em> — and until this plate those were attributes somebody typed. This derives them.</p>' +
        `<p class="mk-tight">The surface is a planar least-squares fit through the ${F.POTENTIOMETRIC_FIT.control} superficial bores that carry a head this round. That is the honest method for a network this size: it states one gradient and one direction and cannot invent local structure the data does not support. Interpolating a curved surface through seven bores draws detail nobody measured, and it is the picture that gets argued with.</p>` +
        `<p class="mk-tight"><strong>${esc(F.POTENTIOMETRIC_FIT.dry.join(', '))} is drawn and is not a control point.</strong> It was dipped to the base of its screened interval on 14 May and found dry, so it has no standing level and therefore no head — it had been contributing one, a water table fifteen metres above where the tape found nothing. The bore stays on the plate with an open mark and the word: a compliance-boundary bore that disappears from a network map because it held no water that week is the reading this figure can least afford.</p>` +
        '<p class="mk-tight"><strong>The network geometry decides whether this figure is possible at all.</strong> Six of these bores sit almost on one line, and a plane fitted through collinear points is barely constrained across that line — the first version of this plate returned a flow direction of due south on a site whose every other screen says south-east, with a residual of 1.46 m against its own one-metre limit. Two bores genuinely off the transect fixed it. That is why the residual is printed on the plate rather than kept in a log: it is the figure telling you whether to believe it.</p>' +
        '<p class="mk-tight"><strong>MW03B is excluded.</strong> It screens the confined unit. Contouring two aquifers as one surface is the commonest error on a plate like this, and it produces a flow direction that is an average of two systems and true of neither.</p>' +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">What it confirms</span>',
          body:
            `<p class="mk-tight">Flow runs from the north-west to the east-south-east — ${esc(F.POTENTIOMETRIC_FIT.bearingText)} at ${esc(F.POTENTIOMETRIC_FIT.gradientText)}, on a largest residual of ${esc(F.POTENTIOMETRIC_FIT.worstText)} — so a planar surface fits this network almost exactly. The TSF sits upgradient of MW05 and MW07, which sit upgradient of the compliance boundary at MW09 and MW11. The stored positions are correct — and these three numbers are read off the fit rather than typed beside it, which is what let removing a phantom head move them without leaving a stale sentence behind.</p>`,
        }),
    ),
    '3fr 2fr',
  ) +
  panel('Symbology', '<p class="mk-tight">Worst outcome per location across every criteria set. A bore compliant against the licence and above an ANZG guideline value reads as an exceedance, because that is the more consequential of the two.</p>' +
      '<p class="mk-tight mk-muted">Shape, not colour. The print layout is the same map at A3 with a north arrow, a bar scale, a grid and a title block — and it survives a monochrome office printer, which is where most of them end up.</p>'),
    panel('Spatial export', table({
      head: ['Format', 'Contains', 'CRS'],
      rows: [
        ['GeoJSON', 'Locations, state, latest result', 'WGS84 with epoch'],
        ['Shapefile', 'Locations, state, latest result', esc(PROJECT.crs)],
        ['CSV with coordinates', 'Full register', esc(PROJECT.crs)],
      ],
    }) + '<p class="mk-tight mk-muted">GDA2020 is not WGS84. They agree only at epoch 2020.0 and separate by about 7 cm a year, so a WGS84 export carries its epoch and a conversion without one is refused rather than assumed.</p>'),
    '1fr 1fr',
  );

const savedViews = () =>
  head('Saved views', 'A question you ask every quarter, kept as an object.', { route: 'a proposal — not in the product' }) +
  notice('warning', 'Proposed. No FR covers saved queries.',
    'FR-6.6 persists a <em>chart</em> configuration. Nothing persists the question that selected the data — which locations, which analytes, which period, which criteria sets. Every incumbent has this and it is most of what a returning user does.') +
  table({
    caption: 'Views on this project.',
    head: ['View', 'Selects', 'Used by', 'Last run', 'Feeds'],
    rows: [
      ['Compliance boundary — quarterly', 'MW09, MW11 · licence suite · current quarter', 'A. Nakamura', '2026-05-21', 'Report §4, Figure 4.1'],
      ['TSF downgradient — metals', 'MW05, MW07 · 6 metals · rolling 3 years', 'A. Nakamura', '2026-05-21', 'Figures 4.2, 4.6, 4.7'],
      ['Everything above a criterion', 'All locations · all analytes · exceedance only', 'R. Whitmore', '2026-05-22', 'Exceedance register'],
      ['PFAS watch', 'All locations · PFOS, PFHxS, sum · all time', 'D. Okafor', '2026-05-22', 'Alert rule · TARP Level 3'],
    ],
  }) +
  notice('default', 'A view is shared, not personal.',
    'Two people asking “the compliance boundary numbers” must get the same rows, or the product has reintroduced the disagreement it exists to end. A view is a project object with an owner and an audit trail, not a browser preference.');

/* ================================================================== *
 * J5 — Produce the submission
 * ================================================================== */

/**
 * The composer, its template configuration, and the gate between them and
 * issue.
 *
 * Three tabs, drawn one under the other because this catalogue is one
 * document: what the report says, what shapes it, and whether it matches the
 * approved reference. The order is the order they bind — a section is written
 * under a template version, and the comparison is run over the result.
 */
const reportBuilder = () => {
  const G = GOLDEN;
  const unwritten = REPORT.sections.filter((x) => x.state === 'not started');
  return (
    head('Quarterly Groundwater Monitoring Report — 2026 Q2', 'Assembled from the data as it stands, into the customer’s own template.', {
      route: '/projects/:projectId/reports',
      toolbar: btn('Preview') + btn('Take snapshot and issue', 'primary'),
    }) +
    C.tabs([
      { label: 'Sections', current: true, count: REPORT.sections.length },
      { label: 'Template and numbering', count: TEMPLATE.current },
      { label: 'Golden comparison', count: `${G.passed}/${G.checks.length}`, dot: G.failed ? 'bad' : 'good' },
    ]) +
    stats([
      stat(String(REPORT.sections.length), 'sections'),
      stat(String(REPORT_ITEMS.figures), 'figures', 'good'),
      stat(String(REPORT_ITEMS.tables), 'tables', 'good'),
      stat(String(unwritten.length), 'sections not started', 'warn'),
      stat(`${G.passed} / ${G.checks.length}`, 'golden checks passing', G.failed ? 'bad' : 'good'),
    ]) +
    cols(
      table({
        caption: 'Sections. What the product generates is marked; the rest is written by a person.',
        head: ['§', 'Section', 'Words', 'Generated content', 'State'],
        rows: REPORT.sections.map((x) => [
          `<code>${esc(x.n)}</code>`,
          esc(x.title),
          x.words ? `<span class="mk-num">${x.words}</span>` : '<span class="mk-num mk-num--nil">—</span>',
          x.auto ? `<span class="mk-muted">${esc(x.auto)}</span>` : '<span class="mk-num mk-num--nil">—</span>',
          tag(x.state, toneFor(x.state)),
        ]),
      }),
      panel('Output', facts([
        ['Template', esc(REPORT.template)],
        ['Primary output', 'Word (.docx) — figures embedded as true vector'],
        ['Also produced', 'PDF — a render of the Word file, not a second authoring path'],
        ['Data export', 'Excel — the register, not the report layout'],
        ['Branding', 'Wandalup Resources. Strataflow attribution is metadata only'],
        ['Snapshot', `<span class="mk-num mk-num--warn">${esc(REPORT.snapshot)}</span>`],
      ]) + '<p class="mk-tight mk-muted">A Strataflow-branded regulatory submission is a hard anti-pattern (FR-7.4). The customer’s logo, the customer’s template, the customer’s numbering.</p>'),
      '3fr 2fr',
    ) +
    /* FR-7.2. Configuration, with versions and an effective date, because the
     * numbering scheme of a document already lodged is not a preference
     * somebody may change on a Tuesday. */
    '<h2 class="mk-h2" style="margin-top:1.4rem">Template and numbering</h2>' +
    `<p class="sf-lede mk-tight">${esc(TEMPLATE.file)} · <strong>version ${esc(TEMPLATE.current)}</strong> in force · configuration, versioned independently of the application (OM-5).</p>` +
    cols(
      table({
        caption: 'What the template decides, and why the customer decided it that way. Every row is configuration rather than code.',
        head: ['Setting', 'In force', 'Because'],
        scroll: true,
        label: 'Corporate template configuration',
        rows: TEMPLATE.settings.map((x) => [
          esc(x.what),
          `<code class="mk-file">${esc(x.value)}</code>`,
          `<span class="mk-muted">${esc(x.why)}</span>`,
        ]),
      }),
      panel(
        'Versions, and what an issued report regenerates under',
        // Three columns and the prose beneath, not four: a sentence-long column
        // in a 2fr panel pans off the region and reads as cut-off words.
        table({
          head: ['Version', 'Effective', 'State'],
          scroll: true,
          label: 'Template versions',
          rows: TEMPLATE.versions.map((v) => [
            `<code>${esc(v.version)}</code>`,
            `<span class="sf-instant">${esc(v.effective)}</span>`,
            C.status(v.state, v.state === 'active' ? 'good' : v.state === 'draft' ? 'warn' : 'neutral'),
          ]),
        }) +
          TEMPLATE.versions
            .map((v) => `<p class="mk-tight"><code>${esc(v.version)}</code> — ${esc(v.changed)}</p>`)
            .join('') +
          `<p class="mk-tight">${esc(TEMPLATE.note)}</p>` +
          `<p class="mk-tight mk-muted">The <a class="mk-ref" href="#snapshot">snapshot register</a> carries the template version on every row for exactly this reason: ${esc(SNAPSHOTS[3].ref)} was produced under <code>${esc(SNAPSHOTS[3].template)}</code> and is the only row that is not on <code>${esc(TEMPLATE.current)}</code>.</p>`,
      ),
      // Even split: at 3fr/2fr the versions table's state column panned off,
      // and a state word cut to "hist" is the photocopier rule failing.
      '1fr 1fr',
    ) +
    /* FR-7.5. The comparison gates issue rather than warning about it, and two
     * of its checks read their outcome out of REPORT.sections — so a draft
     * with an unwritten section fails its own structural check. A gate whose
     * outcome is typed beside it is a decoration. */
    '<h2 class="mk-h2" style="margin-top:1.4rem">Golden-output comparison</h2>' +
    cols(
      facts([
        ['Reference', esc(G.reference)],
        ['Approved', esc(G.approved)],
        ['Run', `<span class="sf-instant">${esc(G.ran)}</span>`],
        ['Result', `${C.status(`${G.passed} passed`, 'good')} ${G.failed ? C.status(`${G.failed} failed`, 'bad') : ''}`],
        ['Gate', esc(G.gate)],
      ]),
      panel(
        'What a comparison is for',
        '<p class="mk-tight">Every other check in this product measures the document against a <em>rule</em> — a unit is present, a reference resolves. This one measures it against an <strong>approved copy</strong>, which is the only way to catch a change nobody thought to write a rule about.</p>' +
          '<p class="mk-tight mk-muted">The reference is an oracle: it is approved once, by a person, and the assembled document is compared to it. Changing the reference and the document that asserts against it in the same act would make the comparison agree with itself, which is the failure mode of every golden test ever written in a hurry.</p>',
      ),
      '3fr 2fr',
    ) +
    table({
      caption: 'One row per check. What the reference expects, what the assembled document carries, and whether they agree.',
      head: ['Check', 'The reference expects', 'The document carries', 'Outcome'],
      kind: 'matrix',
      label: 'Golden-output comparison, 2026 Q2 report',
      rows: G.checks.map((x) => [
        esc(x.check),
        `<span class="mk-muted">${esc(x.expects)}</span>`,
        esc(x.found),
        C.status(x.outcome, x.outcome === 'pass' ? 'good' : 'bad'),
      ]),
    }) +
    cols(
      C.card({
        tone: 'bad',
        head: `<span class="mk-queue__kind">Blocked</span><span class="mk-queue__age">${G.failed} of ${G.checks.length} checks failing</span>`,
        body:
          `<p class="mk-queue__headline">The snapshot cannot be taken while ${unwritten.map((x) => `§${x.n}`).join(' and ')} are unwritten.</p>` +
          `<p class="mk-queue__context">Both failures are the same failure: the prescribed form requires an authored section and the document has ${unwritten.map((x) => `${x.words} words in §${x.n}`).join(' and ')}. Nothing is wrong with the generated content — the crosstab, the registers and the figures all match the reference. The report is a draft, and the gate is saying so at the one moment it is worth saying: the moment somebody tries to issue it.</p>`,
        foot:
          `<a class="mk-btn mk-btn--primary" href="#narrative">Write §${unwritten[0].n}</a>` +
          '<a class="mk-btn" href="#snapshot">What a snapshot would capture</a>' +
          '<span class="mk-muted">Writing continues either way. Only issuing is blocked.</span>',
      }),
      panel(
        `What a failure that is not an unfinished draft looks like — ${esc(G.lastDrift.at)}`,
        `<p class="mk-tight"><strong>${esc(G.lastDrift.where)}.</strong> ${G.lastDrift.what}</p>` +
          `<p class="mk-tight">${esc(G.lastDrift.why)}</p>` +
          `<p class="mk-tight mk-muted">${esc(G.lastDrift.done)}</p>`,
      ),
      '2fr 3fr',
    )
  );
};

/**
 * Numbering, and the two kinds of cross-reference.
 *
 * The number on every row is **derived from the item's position within its
 * section**, never stored — `Figure 4.3` is a fact about where a figure sits,
 * and a stored number plus a moved figure is precisely how a submission
 * acquires a "see Figure 6" that points at a table. Deriving it means a
 * renumbering can be *previewed*, which is the difference between an insert
 * you decide and an insert you discover.
 *
 * Two kinds of reference, and only one of them used to be safe to move. A
 * **live reference** is a pointer the document resolves at generation, so
 * renumbering updates it and nothing is owed. A reference inside authored
 * prose was a sentence somebody wrote with a number typed into it, and a
 * renumbering that reached one was raised as a finding against the author,
 * because silently rewriting a hydrogeologist's paragraph is the same class of
 * act as silently substituting half a reporting limit.
 *
 * **Wave 7 removed the second case rather than managing it** (PR-4b). The
 * interpretation workspace writes a **cross-reference token**: the sentence
 * holds a reference to the *item*, and the number is rendered from wherever
 * that item now sits. So a renumbering moves the rendering and leaves the
 * prose untouched and unflagged — nothing is owed, because the sentence never
 * contained the number. What flags an authored sentence is the referenced
 * figure's *content* changing, which is a different fact and is raised on the
 * workspace beside the passage it reaches.
 */
const reportFigures = () => {
  const I = REPORT_ITEMS;
  const ins = I.insert;
  return (
    head('Figures and tables', 'What goes in, in what order, numbered as the document numbers them.', {
      route: '/projects/:projectId/figures',
      toolbar: C.exportMenu() + btn('Insert a figure', 'primary'),
    }) +
    stats([
      stat(String(I.figures), 'figures'),
      stat(String(I.tables), 'tables'),
      stat(String(I.items.filter((x) => x.state !== 'current').length), 'stale', 'warn'),
      stat(String(I.items.reduce((n, x) => n + x.cites.length, 0)), 'cross-references'),
    ]) +
    `<p class="sf-lede mk-tight">Numbered <code>${esc(TEMPLATE.settings[0].value)}</code>, per <a class="mk-ref" href="#report">corporate template ${esc(TEMPLATE.current)}</a>. Figures and tables number independently, so <code>Table 4.1</code> and <code>Figure 4.1</code> coexist and neither is a typo.</p>` +
    table({
      caption: 'One row per item, in document order. The number is computed from the position; the “cited in” column is the other direction, and it is what makes a renumbering answerable before it happens.',
      head: ['№', 'Item', 'Source', 'Cited in', 'Reference kind', 'State'],
      kind: 'matrix',
      label: 'Figures and tables in the 2026 Q2 report',
      rows: I.items.map((x) => [
        `<code class="mk-file mk-file--id">${esc(x.n)}</code>`,
        esc(x.title),
        `<span class="mk-muted">${esc(x.source)}</span>`,
        x.cites.length ? `<span class="mk-muted">${esc(x.cites.join(', '))}</span>` : '<span class="mk-num mk-num--nil">— not cited</span>',
        x.prose ? C.status('authored prose', 'warn') : C.status('live', 'good'),
        x.state === 'current' ? tag('current', 'good') : tag(x.state, 'warn'),
      ]),
    }) +
    cols(
      panel(
        'Two items are stale, and each says what made it stale',
        I.items
          .filter((x) => x.state !== 'current')
          .map(
            (x) =>
              `<p class="mk-tight"><code>${esc(x.n)}</code> <strong>${esc(x.title)}</strong> — ${esc(x.state.replace(/^stale — /, ''))}.</p>`,
          )
          .join('') +
          `<p class="mk-tight">Table 5.1 was generated before the laboratory amended PAS2026-04398: arsenic at ${loc('MW03B')} went from 31 to 3.1 and stopped being an exceedance. Figure 5.1 draws the four rounds of condition 12(c), two of whose series the <a class="mk-ref" href="#certificate">staged amendment</a> reaches.</p>` +
          '<p class="mk-tight">Both are <strong>marked stale rather than silently regenerated</strong>. A figure that changes underneath a paragraph somebody has already written is how a report comes to contradict itself — and one of these two would change on a decision nobody has taken yet.</p>' +
          `<p class="mk-tight mk-muted"><strong>Stale is not the same as changed.</strong> Figure 6.1 is <em>current</em> on this register and does not appear above: it regenerated cleanly when MW11 stopped contributing a head. What that regeneration reached is a sentence in <a class="mk-ref" href="#narrative">§6.1</a> that cites it, and the flag sits there, against the passage, rather than here against the plate. A figure being out of date and a figure having changed under an author are two findings and they belong on two screens.</p>` +
          `<div class="mk-actions">${btn('Regenerate Table 5.1', 'primary')}<a class="mk-btn" href="#certificate">Decide the amendment first</a></div>`,
      ),
      panel(
        'A number this document does not carry',
        `<p class="mk-tight">Every cross-reference is checked against the numbers the document actually carries, and ${esc(String(I.items.reduce((n, x) => n + x.cites.length, 0)))} of them resolve. A reference to <code>Figure 4.9</code> would not: §4 carries ${esc(String(I.items.filter((x) => x.kind === 'Figure' && x.section === '4').length))} figures, and a reference past the end of a section is a finding rather than a rendering that quietly prints the literal text.</p>` +
          '<p class="mk-tight mk-muted">This is the check that costs nothing and that nobody runs. A dangling cross-reference survives every proofread, because the sentence around it reads perfectly well.</p>',
      ),
      '3fr 2fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">Inserting a figure, and what it renumbers</h2>' +
    `<p class="mk-tight">Adding <strong>${esc(ins.item.title)}</strong> after <code>${esc(ins.after)}</code> makes it <code>${esc(ins.becomes)}</code>. ${esc(ins.why)}</p>` +
    cols(
      table({
        caption: 'What moves, and where each moved number is referred to. Computed by numbering the list again with the new item in place — not by counting on somebody’s fingers.',
        // Five columns, not six: "reference kind" and "what is owed" were the
        // same fact twice, and the sixth column panned off the region.
        head: ['Item', 'Number now', 'Becomes', 'Cited in', 'What is owed'],
        kind: 'matrix',
        label: 'Renumbering caused by the insert',
        rows: ins.renumbered.map((r) => [
          esc(r.title),
          `<code class="mk-file mk-file--id">${esc(r.from)}</code>`,
          `<code class="mk-file mk-file--id">${esc(r.to)}</code>`,
          `<span class="mk-muted">${esc(r.cites.join(', '))}</span>`,
          r.prose
            ? `${C.status('token — follows it', 'good')} <a class="mk-ref" href="#narrative">§6</a>`
            : `${C.status('live — follows it', 'good')}`,
        ]),
      }),
      panel(
        'Stated before the act, not discovered after it',
        C.blastRadius({
          lede: `Inserting ${esc(ins.item.title)} as ${esc(ins.becomes)} would:`,
          rows: [
            { what: 'Figures renumbered', n: `${ins.renumbered.length}` },
            { what: 'Tables renumbered', n: '0 — figures and tables number independently' },
            { what: 'Live cross-references updated automatically', n: `${ins.liveRefs}` },
            { what: 'Cross-reference tokens in authored prose that follow it', n: `${ins.proseRefs} — in §6, and neither sentence is flagged` },
            { what: 'References in authored prose to review', n: '0 — since the tokens landed' },
            { what: 'Sentences the product would rewrite', n: '0 — a sentence somebody wrote is theirs' },
            { what: 'Issued reports affected', n: '0 — a lodged document is numbered by its own snapshot' },
          ],
          action: 'Insert and renumber',
          cancel: 'Leave the numbering as it is',
          reversible:
            'Reversible: removing the figure renumbers back and the flagged sentences clear. What it cannot undo is a reader having already seen a draft with the old numbers, which is why the flags name the sentences rather than fixing them.',
        }),
      ),
      '3fr 2fr',
    ) +
    notice(
      'default',
      `${ins.proseRefs} references in authored prose, and neither of them breaks — which is a change this wave made rather than a claim it inherited.`,
      `<a class="mk-ref" href="#narrative">§6 Interpretation</a> refers to ${ins.renumbered.filter((r) => r.prose).map((r) => `<code>${esc(r.from)}</code>`).join(' and ')}. Until wave 7 those were numbers typed into sentences a hydrogeologist wrote, the insert would have made both wrong, and the product’s answer was to raise them as findings and refuse to edit the prose. They are <strong>cross-reference tokens</strong> now: the sentence refers to the item, the number is rendered from wherever the item sits, and the insert moves both renderings without touching a word or raising anything. The prose is still never rewritten — there is simply nothing left in it to rewrite. What still flags a sentence is the referenced figure’s <em>content</em> changing, and one of §6’s four tokens is flagged for exactly that today.`,
    )
  );
};

/**
 * The interpretation workspace (PR-4).
 *
 * The review's finding on the drawn editor was that its evidence panel proves
 * the wrong thing — it checks that the citations are numerically correct, and
 * the question before signing a TSF-seepage sentence is whether the evidence
 * supports the claim. So the panel that checked arithmetic is still here,
 * doing its smaller job properly under a stated rendering rule, and beside it
 * is the thing the review actually asked for: the set of plates and records
 * the author had in front of them, pinned to the sentence and kept with it.
 *
 * Three rules govern every pixel below and they are stated on the screen too,
 * because a reader has to be able to check them: the software does not score
 * the inference, does not rewrite the prose, and does not flag a sentence for
 * a change a reader could not see.
 */
const narrative = () => {
  const N = NARRATIVE;
  const R = N.rule;

  /** One run of a sentence: authored text, a value citation, or a token. */
  const run = (r) => {
    if (r.t !== undefined) return esc(r.t);
    if (r.cite) {
      const c = r.cite;
      /*
       * **The sentence renders what its author wrote**, never what the source
       * says now. Substituting the current value would be the silent rewrite
       * the keep-list forbids, and it would do it in the one place a reader
       * would never think to check. So the run shows `renderedThen`, the flag
       * says the source has moved, and the table beside the editor shows both.
       */
      const shown = `${c.renderedThen}${c.suffix ?? (c.unit ? ` ${c.unit}` : '')}`;
      const spoken = c.moves
        ? `cited value, flagged: the sentence says ${c.then} and the source now publishes ${c.now}`
        : c.sourceMoved
          ? `cited value, agreeing: the source moved to ${c.now} and renders unchanged under the rendering rule`
          : 'cited value, agreeing with its source';
      return (
        `<span class="mk-cite${c.moves ? ' mk-cite--flagged' : ''}" title="${esc(c.source)}">` +
        `${esc(shown)}${c.moves ? '<span class="mk-cite__mark" aria-hidden="true">▲</span>' : ''}` +
        `<span class="sf-visually-hidden"> — ${esc(spoken)}</span></span>`
      );
    }
    const t = r.token;
    return (
      `<span class="mk-token${t.contentChanged ? ' mk-token--flagged' : ''}" title="${esc(t.title)}">` +
      `<span class="mk-token__glyph" aria-hidden="true">§</span>${esc(t.renders)}` +
      `${t.contentChanged ? '<span class="mk-token__mark" aria-hidden="true">▲ changed</span>' : ''}` +
      `<span class="sf-visually-hidden"> — cross-reference token to “${esc(t.title)}”${t.contentChanged ? ', flagged because the referenced figure’s content changed' : ''}</span></span>`
    );
  };

  const para = (runs, extra = '') => `<p${extra}>${runs.map(run).join('')}</p>`;

  const passage = (p) =>
    `<section class="mk-editor"><h2 class="mk-h2">${esc(p.heading)}</h2>` +
    `<p class="mk-editor__by">${esc(p.by)} · <span class="sf-instant">${esc(p.at)}</span></p>` +
    '<div class="mk-editor__body">' +
    p.paras
      .map((runs, i) =>
        i === p.unfinished
          ? para([...runs], ' class="mk-editor__cursor"').replace('</p>', '<span class="mk-caret"></span></p>')
          : para(runs, i === p.pinned ? ' class="mk-editor__pinned"' : ''),
      )
      .join('') +
    '</div></section>';

  const tile = (x) =>
    `<article class="mk-evid mk-evid--${x.drawn ? 'drawn' : 'gap'}">` +
    `<header class="mk-evid__head"><h3 class="mk-evid__kind">${esc(x.kind)}</h3>` +
    `${x.drawn ? C.status('drawn on this project', 'good') : C.status('not held — stated, not filled', 'warn')}</header>` +
    `<p class="mk-evid__ref">${esc(x.ref)}</p>` +
    `<p class="mk-evid__shows"><strong>Shows:</strong> ${esc(x.shows)}</p>` +
    `<p class="mk-evid__not"><strong>Does not settle:</strong> ${esc(x.notSettled)}</p>` +
    (x.owed ? `<p class="mk-evid__owed"><strong>Owed:</strong> ${esc(x.owed)}</p>` : '') +
    `<p class="mk-evid__go"><a class="mk-btn mk-btn--sm" href="#${esc(x.at)}">${x.drawn ? 'Open it at full size' : 'Open the record that would hold it'}</a></p>` +
    '</article>';

  return (
    head('Interpretation — §6', 'Where the hydrogeologist writes, with the evidence for the claim beside them.', {
      route: 'a proposal — not in the product',
      toolbar: btn('Pin evidence to this passage') + btn('Place §6 in the report', 'primary'),
    }) +
    notice('warning', 'Proposed. FR-7 generates a report but nothing authors one.',
      'FR-7.1 to FR-7.6 cover templates, numbering, snapshots and branding — the mechanics of assembly. A monitoring report is roughly half interpretive prose, and nothing in the requirement set says where that prose is written. Today the answer is Word, which reintroduces exactly the round trip QB-2 exists to remove.') +
    notice(
      'default',
      'The rule this workspace applies to every number in a sentence: ' + esc(R.name) + '.',
      `${esc(R.says)} ${esc(R.why)} <strong>${esc(R.notProse)}</strong>`,
    ) +
    cols(
      passage(N.passages[0]) + passage(N.passages[1]),
      panel(
        'What changed around the prose',
        `<p class="mk-tight">Nothing below has been altered in the text. ${N.counts.flagged} of ${N.counts.citations + N.counts.tokens} references are flagged, and each one names the sentence it reaches rather than fixing it.</p>` +
          table({
            head: ['Reference', 'State', 'Why'],
            rows: [
              ...N.tokens.map((t) => [
                `<span class="mk-token${t.contentChanged ? ' mk-token--flagged' : ''}">${esc(t.renders)}</span> <span class="mk-muted">${esc(t.label)}</span>`,
                t.contentChanged ? C.status('flagged — content changed', 'bad') : C.status('current', 'good'),
                t.contentChanged
                  ? '<span class="mk-muted">The diagram changed, not its number.</span>'
                  : t.renumbering
                    ? `<span class="mk-muted">Would render <code>${esc(t.renumbering.to)}</code> under the staged insert. Not a flag.</span>`
                    : '<span class="mk-muted">Unchanged.</span>',
              ]),
              ...N.citations.map((c) => [
                `<span class="mk-cite${c.moves ? ' mk-cite--flagged' : ''}">${esc(c.renderedThen)}</span> <span class="mk-muted">${esc(c.label)}</span>`,
                c.moves ? C.status('flagged — the value moved', 'bad') : c.sourceMoved ? C.status('agrees under the rule', 'good') : C.status('agrees', 'good'),
                `<span class="mk-muted">${esc(c.moves ? 'The rendered form moved.' : c.sourceMoved ? 'The stored value gained digits; the rendered form did not move.' : 'Source unchanged.')}</span>`,
              ]),
            ],
          }) +
          '<p class="mk-tight mk-muted">The unfinished cadmium sentence is the point of the layout. A practitioner writing about cadmium needs the indeterminate outcome in front of them, not in another tab.</p>',
      ),
      '3fr 2fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">The evidence set, pinned to the sentence</h2>' +
    `<p class="sf-lede mk-tight">§${esc(EVIDENCE.passage)}, third paragraph — the seepage inference. Pinned by ${esc(EVIDENCE.pinnedBy)} · <span class="sf-instant">${esc(EVIDENCE.pinnedAt)}</span> · ${EVIDENCE.tiles.length} items, ${EVIDENCE.drawn} of them drawn on this project.</p>` +
    notice(
      'default',
      esc(EVIDENCE.says),
      `The panel beside the editor answers <em>are my citations numerically correct</em>. This one answers the harder question — <em>does the evidence support what I am claiming</em> — and it answers it by <strong>showing the evidence, not by judging it</strong>. There is no score here, no confidence, no strength, and no count of evidence for against evidence against. Every tile says what it shows <em>and what it does not settle</em>, because the second is what keeps a set of evidence from becoming a set of arguments. Each opens the plate or the record at full size: a Piper diagram drawn to 180&nbsp;mm is a grey triangle at tile width, so the tile is a reference rather than a thumbnail.`,
    ) +
    `<div class="mk-evid__grid">${EVIDENCE.tiles.map(tile).join('')}</div>` +
    cols(
      panel(
        'The one piece of evidence this project does not hold',
        `<p class="mk-tight">Of the ${EVIDENCE.tiles.length} items on the list, ${EVIDENCE.gaps} has nothing behind it: <strong>${esc(EVIDENCE.tiles.find((x) => !x.drawn).kind)}</strong>. No analysis of the tailings liquor exists on this project, and it is the one comparison that would make the inference direct rather than circumstantial.</p>` +
          `<p class="mk-tight">It is drawn as the gap it is. An evidence set that quietly omitted the evidence nobody has would let a reviewer assume it had been considered and found consistent — which is the opposite of what happened.</p>` +
          `<p class="mk-tight mk-muted">${esc(EVIDENCE.tiles.find((x) => !x.drawn).owed)}</p>` +
          `<p class="mk-tight mk-muted">No new figure family was drawn for any of this. The head-contour tile references the potentiometric plate the catalogue already has; the grammar is frozen and a new family is a written proposal to Jerry before it is a rendering.</p>`,
      ),
      panel(
        'The competing explanations, in the author’s own words',
        `<p class="mk-tight">A reviewer asking <em>did you consider the alternatives</em> should not have to ask. These are recorded with the passage and attributed, and they are authored content — a product that proposed the alternatives would be proposing the conclusion.</p>` +
          table({
            head: ['Alternative', 'What the author recorded'],
            rows: EVIDENCE.competing.map((c) => [`<strong>${esc(c.what)}</strong><small>${esc(c.by)}</small>`, `<span class="mk-muted">${esc(c.says)}</span>`]),
          }) +
          `<p class="mk-tight mk-muted"><strong>Refused:</strong> ${esc(EVIDENCE.refused)}</p>`,
      ),
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">A number that moved, and a number that did not</h2>' +
    `<p class="mk-tight">Every value citation, under the rendering rule. The check compares the <strong>rendered</strong> forms, which is what makes ${N.counts.quiet} of these five silent and one of them loud.</p>` +
    table({
      caption: 'Cited, current, and what the rule renders each as. A sentence is flagged when the rendered form moves — never when only the stored value does.',
      head: ['Cited value', 'Sentence renders', 'Source now publishes', 'Rule renders', 'Sentence'],
      kind: 'matrix',
      label: 'Value citations under the rendering rule',
      rows: N.citations.map((c) => [
        `<strong>${esc(c.label)}</strong><small>${esc(c.source)}</small>`,
        `<span class="mk-num">${esc(c.renderedThen)}</span>`,
        `<span class="mk-num${c.sourceMoved ? ' mk-num--warn' : ''}">${esc(c.now)}</span>`,
        `<span class="mk-num">${esc(c.rendered)}</span>`,
        c.moves ? C.status('flagged', 'bad') : C.status('not flagged', 'good'),
      ]),
    }) +
    cols(
      panel(
        'Not flagged — the value gained digits and the sentence did not change',
        `<p class="mk-tight"><strong>${esc(N.quiet[0].label)}.</strong> The sentence was written when the source published <code>${esc(N.quiet[0].then)}</code>. It publishes <code>${esc(N.quiet[0].now)}</code> now. ${esc(N.quiet[0].moved)}</p>` +
          `<p class="mk-tight">Under the rule both render <strong>${esc(N.quiet[0].rendered)}</strong>, so the sentence says exactly what it said and <strong>it is not flagged</strong>. This is the case the review named: 1.7 against 1.72 is formatting, and a workspace that flagged it would teach the author that flags mean nothing.</p>` +
          `<p class="mk-tight mk-muted">${esc(R.notProse)}</p>`,
      ),
      panel(
        'Flagged — the value moved, and so did the outcome it carried',
        `<p class="mk-tight"><strong>${esc(N.flaggedCitations[0].label)}.</strong> The §6.2 sentence was written on <code>${esc(N.flaggedCitations[0].then)} ${esc(N.flaggedCitations[0].unit)}</code>. The laboratory re-issued the certificate: ${esc(N.flaggedCitations[0].moved)} The record now says <code>${esc(N.flaggedCitations[0].now)} ${esc(N.flaggedCitations[0].unit)}</code>, and ${esc(SUPERSESSION.superseding.outcome)}.</p>` +
          `<p class="mk-tight">So the sentence is wrong, and it stays on the screen exactly as its author wrote it. The workspace names it, shows both values, and offers the correction — <strong>taking it is the author’s act</strong>, attributed to them like any other write.</p>` +
          `<div class="mk-actions">${btn('Show me the corrected sentence', 'primary')}<a class="mk-btn" href="#supersession">What the re-issue changed</a></div>` +
          `<p class="mk-tight mk-muted">A product that had silently rewritten this would have produced a report whose §6.2 nobody had read, standing on a value nobody had checked.</p>`,
      ),
      '1fr 1fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">A number that changed, and a diagram that changed</h2>' +
    cols(
      panel(
        'Renumbering does not flag a sentence',
        `<p class="mk-tight">The Piper reference in §6.1 is a <strong>cross-reference token</strong>, not the characters <code>Figure ${esc(N.tokens.find((t) => t.id === 'fig-piper').renders.replace('Figure ', ''))}</code> typed into the prose. It resolves to the item and renders whatever number that item carries.</p>` +
          table({
            head: ['Token', 'Renders now', 'Under the staged insert', 'Sentence'],
            rows: N.tokens
              .filter((t) => t.renumbering)
              .map((t) => [
                `<span class="mk-token">${esc(t.label)}</span>`,
                `<code>${esc(t.renders)}</code>`,
                `<code>${esc(t.renumbering.to)}</code>`,
                C.status('not flagged', 'good'),
              ]),
          }) +
          `<p class="mk-tight"><a class="mk-ref" href="#report-figures">Inserting a figure</a> after Figure 4.2 renumbers ${N.counts.renumbered} of the items §6.1 cites. Both tokens would silently render their new numbers, and <strong>neither sentence is flagged</strong>, because neither sentence ever contained a number.</p>` +
          `<p class="mk-tight mk-muted">This is the distinction the review asked for. Renumbering is a fact about the document’s ordering; it tells an author nothing and asking them to re-read four sentences for it is how a flag becomes noise.</p>`,
      ),
      panel(
        'A diagram that changed does flag it',
        `<p class="mk-tight">The same sentence cites <span class="mk-token mk-token--flagged">${esc(N.flaggedTokens[0].renders)}<span class="mk-token__mark" aria-hidden="true">▲ changed</span></span> — the potentiometric surface. Its number has not moved. Its <strong>content</strong> has.</p>` +
          `<p class="mk-tight">${esc(N.flaggedTokens[0].contentChanged.what)}</p>` +
          `<p class="mk-tight"><strong>What moved:</strong> ${esc(N.flaggedTokens[0].contentChanged.moved)} The fit now runs through ${F.POTENTIOMETRIC_FIT.control} bores rather than ${F.POTENTIOMETRIC_FIT.drawn}: flow ${esc(F.POTENTIOMETRIC_FIT.bearingText)} at ${esc(F.POTENTIOMETRIC_FIT.gradientText)}, largest residual ${esc(F.POTENTIOMETRIC_FIT.worstText)}.</p>` +
          `<p class="mk-tight"><strong>What is owed:</strong> ${esc(N.flaggedTokens[0].contentChanged.owed)}</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#map">Open the plate as it stands now</a><a class="mk-btn" href="#field-capture">Why MW11 carries no head</a></div>`,
      ),
      '1fr 1fr',
    ) +
    notice(
      'warning',
      'Four things this workspace will not do, drawn as refusals rather than left unimplemented.',
      `<ul class="mk-list">${N.refused.map((x) => `<li><strong>${esc(x.what)}.</strong> ${esc(x.why)}</li>`).join('')}</ul>`,
    )
  );
};

/**
 * Two regenerations, because they answer two different questions.
 *
 * *Regenerate from the snapshot* asks whether the lodged document still exists
 * exactly as it was lodged, and the answer is always yes: the snapshot holds
 * the bytes and every value they stood on, and it is append-only (FR-7.3,
 * QB-3). *Regenerate against today's record* asks whether the record still
 * says what the document says, and that answer moves. Collapsing the two into
 * one "regenerates identically" tag is what makes a regulator's question —
 * *what did you know, and what do you know now* — unanswerable from the screen
 * that exists to answer it.
 *
 * The register joins `SUBMISSIONS` on the snapshot reference, so a report's
 * issue date and the snapshot it went out on are one row read twice rather
 * than two rows that can drift.
 */
const snapshot = () => {
  const R = REGENERATION;
  const snap = R.snapshot;
  const draft = { ref: '—', what: REPORT.title, to: '—', submitted: '—', snapshot: null, results: null, template: TEMPLATE.current, supersededSince: 0, staged: 0, note: 'Not taken. The golden-output comparison has to pass before a snapshot can be, and two sections are unwritten.' };
  return (
    head('Snapshot and regeneration', 'What was issued, and the ability to produce it again byte for byte.', {
      route: '/projects/:projectId/snapshots',
      toolbar: C.exportMenu(),
    }) +
    stats([
      stat(String(SNAPSHOTS.length), 'snapshots held'),
      stat(String(SNAPSHOTS.reduce((n, x) => n + x.results, 0)), 'results captured'),
      stat(String(SNAPSHOTS.reduce((n, x) => n + x.supersededSince, 0)), 'superseded since issue', 'warn'),
      stat(String(SNAPSHOTS.reduce((n, x) => n + x.staged, 0)), 'staged and unwritten', 'warn'),
    ]) +
    table({
      caption: 'Every issued report carries the data it was built from, and the template version it was produced under. QB-3 is not a promise, it is a stored object.',
      head: ['Report', 'Issued', 'To', 'Snapshot', 'Digest', 'Results', 'Template', 'From the snapshot', 'Against today’s record'],
      kind: 'matrix',
      label: 'Report snapshots on this project',
      rows: [...SNAPSHOTS, draft].map((x) => [
        `${esc(x.what)}${x.ref === '—' ? '<small>draft</small>' : `<small>${esc(x.ref)}</small>`}`,
        `<span class="sf-instant">${esc(x.submitted)}</span>`,
        esc(x.to),
        x.snapshot ? `<code class="mk-file mk-file--id">${esc(x.snapshot)}</code>` : '<span class="mk-num mk-num--nil">not taken</span>',
        x.snapshot ? `<code class="mk-file">${esc(x.digest)}</code>` : '<span class="mk-num mk-num--nil">—</span>',
        x.results === null ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-num">${x.results.toLocaleString('en-AU')}</span>`,
        `<code>${esc(x.template)}</code>`,
        x.snapshot ? C.status('identical', 'good') : C.status('draft', 'warn'),
        x.supersededSince + x.staged === 0
          ? C.status('identical', 'good')
          : C.status(
              [x.supersededSince ? `${x.supersededSince} superseded` : null, x.staged ? `${x.staged} staged` : null].filter(Boolean).join(' · '),
              x.supersededSince ? 'bad' : 'warn',
            ),
      ]),
    }) +
    `<p class="mk-tight"><strong>The last two columns are different questions and they can disagree.</strong> The 2025 Annual Environmental Report regenerates from ${esc(SNAPSHOTS[3].snapshot)} exactly as it was lodged and always will; regenerated against today’s record it would differ, because ${SNAPSHOTS[3].supersededSince} of its ${SNAPSHOTS[3].results.toLocaleString('en-AU')} results were superseded by the 2026-04-02 legacy reconciliation. A single “regenerates identically” tag would have said yes to both and answered neither.</p>` +
    `<h2 class="mk-h2" style="margin-top:1.4rem">${esc(snap.what)} — regenerated, both ways</h2>` +
    cols(
      panel(
        'From the snapshot',
        `<p class="mk-tight"><strong>${esc(R.fromSnapshot.question)}</strong></p>` +
          `<p class="mk-tight">${C.status(R.fromSnapshot.answer, 'good')}</p>` +
          facts([
            ['Snapshot', `<code class="mk-file">${esc(snap.snapshot)}</code>`],
            ['Digest at issue', `<code class="mk-file">${esc(snap.digest)}</code>`],
            ['Digest on regeneration', `<code class="mk-file">${esc(snap.digest)}</code>`],
            ['Template version', `<code>${esc(snap.template)}</code> — the version recorded on the snapshot, not the version now current`],
            ['Results captured', `<span class="mk-num">${snap.results.toLocaleString('en-AU')}</span>, each with the value it held at issue`],
          ]) +
          `<p class="mk-tight mk-muted">${esc(R.fromSnapshot.always)}</p>`,
      ),
      panel(
        'Against today’s record',
        `<p class="mk-tight"><strong>${esc(R.againstRecord.question)}</strong></p>` +
          `<p class="mk-tight">${C.status(R.againstRecord.answer, 'good')} <span class="mk-muted">${esc(R.againstRecord.evidence)}</span></p>` +
          `<p class="mk-tight">${esc(R.againstRecord.caveat)}</p>` +
          `<p class="mk-tight mk-muted">The amendment is <a class="mk-ref" href="#certificate">staged on ${esc(AMENDMENT.certificate)}</a> and the period it lands in is locked. Until somebody decides, this column is honest at <em>identical</em> and the column beside it is what the decision costs.</p>`,
      ),
      '1fr 1fr',
    ) +
    '<h2 class="mk-h2">What the amendment would change, value by value</h2>' +
    table({
      caption: 'Issued value struck beside the value that would stand. Nothing here has been written; the third column is the consequence of a decision nobody has taken.',
      head: ['Where in the document', 'What', 'As issued', 'If the amendment is accepted'],
      kind: 'matrix',
      label: 'Regeneration difference for the 2026 Q1 report',
      rows: R.values.map((v) => [
        `<code>${esc(v.where)}</code>`,
        esc(v.subject),
        `<span class="mk-num">${esc(v.issued)}</span>`,
        struck(v.issued, v.staged),
      ]),
    }) +
    `<p class="mk-tight">${R.values.length} differences across ${new Set(R.values.map((v) => v.where.split(' ')[0])).size} sections, from ${AMENDMENT.counts.resultsAmended} amended results — which is the ratio worth noticing. Three numbers move and seven things in the document change, because a monitoring report says the same result in several places and each of them is a place a hand-edit misses.</p>` +
    notice(
      'default',
      'The issued artifact is immutable, and that is not the same claim as “nothing has changed”.',
      'The bytes lodged with DWER on 2026-04-28 are held and reproducible; no amendment, no re-evaluation and no configuration change reaches them. What can change is the record they were drawn from, and the two columns above keep those apart so that “what did you report” and “what do you now believe” are separately answerable years later.',
    ) +
    '<h2 class="mk-h2">Reissuing</h2>' +
    C.blastRadius({
      lede: 'Reissuing the 2026 Q1 report would write:',
      rows: R.reissue.writes,
      action: 'Not available — the amendment is staged',
      cancel: 'Open the amendment decision',
      reversible: R.reissue.reversible,
    }) +
    `<p class="mk-tight">${esc(R.reissue.blocked)} The control is drawn and refuses, rather than being absent: somebody deciding the amendment upstairs needs to see what a reissue costs before they decide, not after.</p>` +
    `<div class="mk-actions"><a class="mk-btn" href="#certificate">The staged amendment</a><a class="mk-btn" href="#signoff">What the existing approval covers</a><a class="mk-btn" href="#submissions">The submission as lodged</a></div>`
  );
};

/* ================================================================== *
 * J6 — Keep the obligations met
 * ================================================================== */

const obligations = () =>
  head('Reporting obligations', 'What is due, to whom, and when — across every project you hold a binding in.', {
    route: '/aggregate/obligations',
    toolbar: C.exportMenu() + btn('Add obligation'),
  }) +
  // Counted from the register rather than typed beside it: these four read
  // 1 · 1 · 3 · 1 while the seed held 2 · 1 · 5 · 1, which is the wave-1
  // lesson (a hand-kept count rots, and it rots toward the flattering number).
  // They now count the portfolio rather than one project, which is what
  // `/aggregate` has always claimed and could not do from a one-site seed.
  stats([
    stat(String(PORTFOLIO.counts.overdue), 'overdue', 'bad'),
    stat(String(PORTFOLIO.counts['at risk']), 'at risk', 'warn'),
    stat(String(PORTFOLIO.counts['on track']), 'on track', 'good'),
    stat(String(PORTFOLIO.counts.met), 'met', 'good'),
    stat(String(PORTFOLIO.projects.length), 'projects'),
  ]) +
  C.filterBar({
    controls: [
      C.field({
        label: 'Scope',
        control: C.select({ options: ['Every project I hold a binding in', ...PROJECTS.map((p) => `${p.code} only`)], value: 'Every project I hold a binding in' }),
        hint: 'An aggregate that cannot be taken apart into the sites it was added up from is a number nobody can act on.',
      }),
      C.field({ label: 'State', control: C.select({ options: ['Every state', 'Overdue', 'At risk', 'On track', 'Met'], value: 'Every state' }) }),
      C.field({ label: 'Owner', control: C.select({ options: ['Anyone', 'Me', 'Unassigned'], value: 'Anyone' }) }),
    ],
    chips: [C.chip('every project', { prefix: 'scope', removable: false })],
    count: `${PORTFOLIO.obligations.length} obligations across ${PORTFOLIO.projects.length} projects`,
  }) +
  notice(
    'warning',
    `The oldest thing owed on this estate is at ${esc(KURRAJONG.code)}, and nothing inside ${esc(KURRAJONG.code)} would have said so.`,
    `A trigger response has been ${esc(KURRAJONG.obligations[0].remaining.replace('overdue by ', 'owed for '))} because the exceedance that obliged it was never acknowledged, and the six-monthly round that would have raised the question again is ${esc(KURRAJONG.obligations[1].remaining)}. Both rows sit above every ${esc(PROJECT.code)} row below, because this register is ordered by when a thing falls due and not by which project it belongs to. A quiet site reads as a well-run one from inside itself; a register that crosses projects is the only place the difference shows.`,
  ) +
  /*
   * State moved up beside Project, and the basis prose moved to the end. The
   * register is a matrix and pans, which is right for eight columns — but the
   * column a reader pans *to* should not be the one carrying the answer, and
   * with State last it was the first thing off the edge at 1280 px. Obligation,
   * project, state, date: the decision reads without scrolling, and the
   * regulator's wording is what you pan for.
   */
  table({
    caption:
      'Statutory and internal obligations in one register, because they compete for the same week — ordered by when each falls due, across projects. The due rule stays in the regulator’s own words, so “owed now” is a due rule rather than a blank.',
    head: ['Obligation', 'Project', 'State', 'Due', 'Remaining', 'Owner', 'To', 'Basis'],
    kind: 'matrix',
    label: 'Reporting obligations across every project',
    rows: PORTFOLIO.obligations.map((o) => [
      esc(o.what),
      o.project === PROJECT.code
        ? `<span class="mk-tag mk-tag--neutral">${esc(o.project)}</span>`
        : `<a class="mk-ref" href="#projects">${esc(o.project)}</a>`,
      tag(o.state, toneFor(o.state)),
      `<span class="sf-instant">${esc(o.due)}</span>`,
      o.state === 'overdue' ? `<span class="mk-num mk-num--bad">${esc(o.remaining)}</span>` : o.state === 'at risk' ? `<span class="mk-num mk-num--warn">${esc(o.remaining)}</span>` : `<span class="mk-num">${esc(o.remaining)}</span>`,
      o.owner.startsWith('—') ? `<span class="mk-num mk-num--bad">${esc(o.owner)}</span>` : esc(o.owner),
      esc(o.to),
      `<span class="mk-muted">${esc(o.basis)}</span>`,
    ]),
  }) +
  cols(
    panel(
      'The same register, taken apart',
      '<p class="mk-tight">Every aggregate above is decomposable, and it is decomposed here rather than left as a number somebody has to trust. The two rows add to the four tiles.</p>' +
        // Six columns, not seven: whether a project's workspace is drawn is a
        // property of the project, so it rides in the project cell rather than
        // as a column of its own that pans off the edge of a narrow panel.
        table({
          caption: 'One row per project. The four state columns sum to the four tiles at the top of this screen.',
          head: ['Project', 'Obligations', 'Overdue', 'At risk', 'On track', 'Met'],
          scroll: true,
          label: 'Obligations per project',
          rows: PORTFOLIO.byProject.map((b) => [
            `<strong>${esc(b.code)}</strong><small>${esc(b.name)} · ` +
              (b.drawn ? 'project home drawn' : 'workspace not drawn') + '</small>',
            b.drawn ? `<a class="mk-ref" href="#project-home">${b.obligations}</a>` : `<span class="mk-num">${b.obligations}</span>`,
            b.counts.overdue ? `<span class="mk-num mk-num--bad">${b.counts.overdue}</span>` : '<span class="mk-num mk-num--nil">0</span>',
            b.counts['at risk'] ? `<span class="mk-num mk-num--warn">${b.counts['at risk']}</span>` : '<span class="mk-num mk-num--nil">0</span>',
            `<span class="mk-num">${b.counts['on track']}</span>`,
            `<span class="mk-num">${b.counts.met}</span>`,
          ]),
        }) +
        `<p class="mk-tight mk-muted">Following a ${esc(KURRAJONG.code)} row is a scope switch and not a link: the header, the section strip and what every other screen is about all change with it. This catalogue draws one of the two workspaces, so the switch is where it stops — which is stated here rather than discovered by clicking.</p>`,
    ),
      panel(
        'Four kinds of clock on one board, counted',
        `<p class="mk-tight">They compete for the same week, which is why they share a register — but they are not the same obligation and the difference decides what missing one costs.</p>` +
          table({
            head: ['Kind', 'Rows', 'What starts the clock'],
            scroll: true,
            label: 'The kinds of obligation on this register',
            rows: [
              ['Reporting obligation', 'report', 'A cadence a licence condition sets — the wording survives, and interpreting it into a date comes later'],
              ['Programme round', 'round', 'A period ending. Written when the period ends rather than when somebody looks, which is what makes a missed one nameable'],
              ['Notification obligation', 'notification', 'An event. The window is short enough that missing it <em>is</em> the incident — and where the condition says <em>as soon as practicable</em>, no number of hours is invented'],
              ['Trigger response', 'response', 'A criterion being crossed. The deadline is arithmetic on the evaluation date, so it can run without a person being involved at any point'],
            ].map(([label, kind, why]) => [
              `<strong>${esc(label)}</strong>`,
              `<span class="mk-num">${PORTFOLIO.obligations.filter((o) => o.kind === kind).length}</span>`,
              why,
            ]),
          }) +
          `<p class="mk-tight mk-muted">The ${esc(KURRAJONG.code)} row is the last kind: the operating strategy gives thirty days from evaluation, so its deadline is ${esc(KURRAJONG.exceedance.evaluated)} plus thirty and nothing anybody typed — which is also how it reached ${esc(KURRAJONG.obligations[0].remaining)} with no person in the loop.</p>`,
      ),
    '3fr 2fr',
  ) +
  notice('default', 'A monitoring period is resolved in the site’s own timezone, never the server’s.',
    `A quarterly round at a Pilbara bore begins at 16:00 UTC on 31 December. A sample collected at 08:00 on 1 April local time belongs to the June quarter — get it wrong and the round it was meant to satisfy reads as missed while a spurious extra one reads as satisfied. Both projects on this register resolve in ${esc(PROJECT.timezone)}; a register spanning two zones would resolve each row in its own site’s, never in one chosen for the board.`);

const programme = () =>
  head('Sampling programme — GW-QTR', 'What each round expects, and what it got.', {
    route: '/projects/:projectId/programme',
  }) +
  cols(
    table({
      caption: 'The 2026 Q2 round, location by location.',
      head: ['Location', 'Suite', 'Due', 'Collected', 'Received', 'State'],
      rows: [
        [loc('MW01A'), 'Full groundwater', '2026-05-14', '2026-05-12', '2026-05-21', tag('complete', 'good')],
        [loc('MW03B'), 'Full groundwater', '2026-05-14', '2026-05-12', '2026-05-21', tag('complete', 'good')],
        [loc('MW05'), 'Full + PFAS', '2026-05-14', '2026-05-13', '2026-05-21', tag('complete', 'good')],
        [loc('MW07'), 'Full groundwater', '2026-05-14', '2026-05-13', '2026-05-21', tag('complete', 'good')],
        [loc('MW09'), 'Full groundwater', '2026-05-14', '2026-05-14', '2026-05-21', tag('complete', 'good')],
        [loc('MW11'), 'Full groundwater', '2026-05-14', '—', '—', tag('overdue', 'bad')],
        [loc('MW12'), 'Reduced — background', '2026-05-14', '2026-05-14', '2026-05-21', tag('complete', 'good')],
      ],
      kind: 'matrix',
      label: 'Reporting obligations',
    }),
    panel('Programme',
      facts([
        ['Frequency', 'Quarterly'],
        ['Anchor month', 'June — the reporting year ends in June, so a fiscal quarter is not a calendar quarter'],
        ['Timezone', esc(PROJECT.timezone)],
        ['Responsible', 'A. Nakamura — Hydrogeologist'],
        ['Next round opens', '2026-07-01 00:00 AWST'],
      ]) +
      `<p class="mk-tight mk-muted">${esc(Q2_OVERDUE.location)} is ${esc(Q2_OVERDUE.phrase)} — ${esc(Q2_OVERDUE.due)} to ${esc(AS_AT)}, counted rather than typed — and has been alerted on and escalated. The <a class="mk-ref" href="#field-capture">field record</a> says the bore was found dry on ${esc(FIELD_ROUND.days[2].date)} and that the disposition has not left the tablet, which is why this countdown is still running. The round is not marked complete while a location is outstanding — a programme that reads as satisfied with a bore missing is worse than one that reads as nothing at all.</p>`),
    '3fr 2fr',
  ) +
  notice(
    'warning',
    'MW05 is on two programmes, and a screen showing one of them would be wrong.',
    'GW-QTR runs quarterly across the network. <strong>GW-MTH runs monthly at MW05 and MW07</strong>, and has since 2026-03-01, because a TARP Level 2 trigger required increased frequency — so MW05 is next due on 2026-06-14, not 2026-08-14. A programme that read as satisfied while a monthly round went uncollected is the two-surfaces-disagree failure this product exists to end, and it is the escalated round that gets missed because it is the one nobody planned for.',
  ) +
  table({
    caption: 'Every programme in force on this project, and what put each one there.',
    head: ['Programme', 'Frequency', 'Locations', 'In force since', 'Because', 'Next due'],
    rows: [
      ['<strong>GW-QTR</strong>', 'Quarterly', 'All 7 groundwater bores', '2019-03-01', '<span class="mk-muted">Licence condition 12(b)</span>', '<span class="sf-instant">2026-08-14</span>'],
      ['<strong>GW-MTH</strong>', 'Monthly', `${loc('MW05')}, ${loc('MW07')}`, '2026-03-01', `<span class="mk-muted">TARP Level 2 — <a class="mk-ref" href="#tarp">investigate and increase frequency</a></span>`, '<span class="sf-instant">2026-06-14</span>'],
      ['<strong>SW-QTR</strong>', 'Quarterly', loc('SW01'), '2019-03-01', '<span class="mk-muted">Licence condition 14 — discharge return</span>', '<span class="sf-instant">2026-08-14</span>'],
    ],
  }) +
  panel(
    'A frequency raised by a trigger comes back down by a decision',
    '<p class="mk-tight">GW-MTH exists because the data crossed a line, and it does not lapse when the data recrosses it. Standing it down is a decision somebody makes and signs, against the TARP’s own stand-down condition — four consecutive rounds below the trigger — because a monitoring frequency that relaxed itself the first quiet quarter is the one that misses the next event.</p>' +
    C.blastRadius({
      lede: 'Standing GW-MTH down would:',
      rows: [
        { what: 'Rounds removed from the calendar', n: '8 per year' },
        { what: 'Consecutive rounds below trigger required', n: '4 — currently 0' },
        { what: 'TARP level this would return MW05 to', n: 'Level 1' },
        { what: 'Historical rounds affected', n: '0' },
      ],
      action: 'Not available — the stand-down condition is not met',
      cancel: 'Review the TARP',
      reversible: 'The control is present and refuses, rather than absent. An operator who cannot see what would release them from a monitoring burden cannot plan against it.',
    }),
  );

const notification = () =>
  head('Statutory notification', 'A countdown against a window, from a timestamp nobody can move.', {
    route: '/projects/:projectId/notifications',
  }) +
  cols(
    panel('Condition 21 — notification of exceedance',
      facts([
        ['Obligation', esc(NOTIFICATION.obligation)],
        ['Became aware', `<strong>${esc(NOTIFICATION.becameAware)}</strong>`],
        ['Window', esc(NOTIFICATION.window)],
        ['Stored as', `<span class="mk-muted">${esc(NOTIFICATION.windowStored)}</span>`],
        ['Deadline', `<strong>${esc(NOTIFICATION.deadline)}</strong>`],
        ['Lodged', esc(NOTIFICATION.lodged)],
        ['Elapsed', `<span class="mk-num mk-num--good">${esc(NOTIFICATION.elapsed)}</span>`],
        ['Evidence', `<span class="mk-file">${esc(NOTIFICATION.evidence)}</span>`],
        ['By', esc(NOTIFICATION.by)],
      ]),
    ),
    panel('Why this timestamp is immutable',
      `<p class="mk-tight">${esc(NOTIFICATION.frozen)}</p>` +
      '<p class="mk-tight">A statutory notification window runs from “became aware”. Missing it is an offence rather than a service failure, so the database refuses an update that moves that timestamp — or the obligation link, because the two together are what the countdown was computed from.</p>' +
      '<p class="mk-tight mk-muted">“As soon as practicable” is stored as a null window and read as <em>owed now</em>, never as a blank. The countdown invents no number, and time remaining is truncated rather than rounded — 4 h 59 m never displays as 5 h.</p>'),
    '1fr 1fr',
  ) +
  notice(
    'warning',
    'One moment of awareness, two statutory duties, two parts of the regulator.',
    'The licence condition is not the only thing with a clock. The Contaminated Sites Act imposes its own duty on becoming aware of known or suspected contamination — a separate instrument, a separate branch of DWER, a separate lodgement — running from the same timestamp. Discharging one does not discharge the other, and the two are routinely conflated because most products model only the duty written into the licence.',
  ) +
  table({
    caption: 'Every statutory duty running from the awareness of 2026-05-22 09:14 AWST.',
    head: ['Duty', 'Instrument', 'To', 'Window', 'Lodged', 'State'],
    rows: STATUTORY.map((d) => [
      `<strong>${esc(d.duty)}</strong>` + (d.note ? `<br><span class="mk-muted">${esc(d.note)}</span>` : ''),
      `<span class="mk-muted">${esc(d.instrument)}</span>`,
      esc(d.to),
      esc(d.window),
      `<span class="sf-instant">${esc(d.lodged)}</span>`,
      C.status(d.state, d.state === 'met' ? 'good' : 'bad'),
    ]),
    kind: 'matrix',
    label: 'Statutory duties from this awareness',
  }) +
  C.card({
    tone: 'bad',
    head: '<span class="mk-queue__kind">Owed now</span><span class="mk-queue__age">since 2026-05-22 09:14 AWST</span>',
    body:
      '<p class="mk-queue__headline">The Contaminated Sites Act report has not been lodged.</p>' +
      '<p class="mk-queue__context">PFOS and PFHxS at 37× the guideline value in groundwater is, on its face, a suspected contaminated site. The duty runs from awareness and carries no fixed window, so it is owed now — and the countdown says exactly that rather than inventing a number or leaving a blank. It sits on the work queue beside the licence notification, not behind it.</p>',
    foot:
      C.btn('Draft the report', 'primary') +
      C.btn('Record that legal advice is being taken') +
      '<span class="mk-muted">Recording that it is with legal discharges nothing. The clock keeps running and the record says so.</span>',
  }) +
  table({
    caption: 'Notification history on this licence.',
    scroll: true,
    head: ['Became aware', 'Trigger', 'Window', 'Lodged', 'Within window', 'Evidence'],
    rows: [
      ['<span class="sf-instant">2026-05-22 09:14</span>', 'PFOS + PFHxS · MW05', 'As soon as practicable', '<span class="sf-instant">2026-05-22 14:30</span>', tag('met', 'good'), 'DWER-N-2026-11842.pdf'],
      ['<span class="sf-instant">2026-02-14 11:02</span>', 'Arsenic 2nd consecutive · MW05', '14 days', '<span class="sf-instant">2026-02-19 09:40</span>', tag('met', 'good'), 'DWER-N-2026-04120.pdf'],
      ['<span class="sf-instant">2025-08-19 15:33</span>', 'Copper above DGV · MW05', '14 days', '<span class="sf-instant">2025-08-28 16:12</span>', tag('met', 'good'), 'DWER-N-2025-31877.pdf'],
    ],
  });

/**
 * What exactly was signed.
 *
 * A signature binds to a **report snapshot and that snapshot's digest**, never
 * to current data: a signature against data that can move is a signature on
 * something else by the time anybody reads it. Three capacities — prepared,
 * reviewed, approved — because "who signed it" and "who checked it" are
 * different questions, and the same person signing twice in one capacity is
 * refused, since two approvals of one document make *who approved this*
 * ambiguous.
 *
 * The consequence the amendment forces is the whole point of the binding: an
 * amendment to the data underneath an issued report **does not reach backwards
 * into what was signed**. The snapshot is unchanged, its digest is unchanged,
 * and the approval still covers exactly the document it covered. What moves is
 * whether the record still agrees with it — which is a different fact, held on
 * a different screen, and stated here rather than left to be inferred.
 */
const signoff = () => {
  const rows = SIGNOFFS.map((x) => ({ ...x, snap: SNAPSHOTS.find((sn) => sn.snapshot === x.snapshot) ?? null }));
  const q1 = rows.filter((x) => x.snapshot === 'SNAP-0117');
  const snapQ1 = SNAPSHOTS.find((sn) => sn.snapshot === 'SNAP-0117');
  const CAPACITY = { prepared: 'neutral', reviewed: 'info', approved: 'good' };
  return (
    head('Approval and sign-off', 'Who approved exactly what, and when.', {
      route: '/projects/:projectId/signoff',
      toolbar: btn('Request approval', 'primary'),
    }) +
    notice('default', 'Sign-off is not a validation state.',
      'Validation says the data is right, and it is made result by result. Approval says a named person accepts responsibility for a <em>document</em>, and it is made once. Collapsing the two means either that approving five hundred results signed a report nobody read, or that signing a report silently approved five hundred numbers.') +
    stats([
      stat(String(rows.filter((x) => x.state === 'signed').length), 'signatures held', 'good'),
      stat(String(new Set(rows.filter((x) => x.snapshot).map((x) => x.snapshot)).size), 'documents signed'),
      stat(String(rows.filter((x) => x.state === 'awaiting').length), 'awaiting', 'warn'),
      stat(String(snapQ1.staged), 'staged changes under a signed snapshot', 'warn'),
    ]) +
    table({
      caption: 'One row per signature, not per document. A signature names the capacity it was given in and the digest of what it covers.',
      head: ['Document', 'Capacity', 'Signed by', 'At', 'Covers', 'Digest', 'State'],
      kind: 'matrix',
      label: 'Sign-off register',
      rows: rows.map((x) => [
        esc(x.subject),
        C.status(x.capacity, CAPACITY[x.capacity] ?? 'neutral'),
        `${esc(x.by)}<small>${esc(x.role)}</small>`,
        x.at === '—' ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="sf-instant">${esc(x.at)}</span>`,
        x.snap
          ? `<a class="mk-ref" href="#snapshot"><code class="mk-file mk-file--id">${esc(x.snapshot)}</code></a> · <span class="mk-num">${x.snap.results.toLocaleString('en-AU')}</span> results`
          : '<span class="mk-muted">no snapshot yet — nothing to sign</span>',
        x.snap ? `<code class="mk-file">${esc(x.snap.digest)}</code>` : '<span class="mk-num mk-num--nil">—</span>',
        x.state === 'signed' ? tag('signed', 'good') : tag('awaiting', 'warn'),
      ]),
    }) +
    `<p class="mk-tight">The top row has no digest and that is the honest state, not a gap: the 2026 Q2 report has no snapshot, so there is nothing to sign. A signature offered against “the current draft” would bind to whatever the draft became afterwards. The <a class="mk-ref" href="#report">golden comparison</a> blocks the snapshot, the snapshot is what a signature binds to, and the order is not incidental.</p>` +
    cols(
      panel(
        `What R. Whitmore approved on ${esc(q1.at(-1).at)}`,
        facts([
          ['Document', esc(q1.at(-1).subject)],
          ['Snapshot', `<code class="mk-file">${esc(snapQ1.snapshot)}</code>`],
          ['Digest signed', `<code class="mk-file">${esc(snapQ1.digest)}</code>`],
          ['Results it stood on', `<span class="mk-num">${snapQ1.results.toLocaleString('en-AU')}</span>, each at the value it held that day`],
          ['Template version', `<code>${esc(snapQ1.template)}</code>`],
          ['Capacity', C.status('approved', 'good')],
          ['Lodged with DWER', `<span class="sf-instant">${esc(snapQ1.submitted)}</span> · <a class="mk-ref" href="#submissions">${esc(snapQ1.ref)}</a>`],
        ]) +
          `<p class="mk-tight">Three signatures, in three capacities, all dated before the document went out: ${q1
            .map((x) => `<strong>${esc(x.capacity)}</strong> ${esc(x.by)} ${esc(x.at.replace(' AWST', ''))}`)
            .join(' · ')}. A signature dated after lodgement would be a signature on something already gone.</p>`,
      ),
      panel(
        'The amendment does not reach it',
        `<p class="mk-tight">The <a class="mk-ref" href="#certificate">staged amendment</a> re-reports ${AMENDMENT.counts.resultsAmended} results that ${esc(snapQ1.snapshot)} stands on. <strong>It changes nothing about this approval.</strong> The snapshot is append-only, its digest is unchanged, and the document R. Whitmore signed regenerates from it byte for byte.</p>` +
          '<p class="mk-tight">That is the reason a signature binds to a snapshot rather than to a project, a period or a query. Bound to any of those, an amendment eighteen months later would silently change what a named person is on record as having accepted — and the person would be the last to know.</p>' +
          `<p class="mk-tight">What <em>is</em> true, and is stated rather than left to be noticed: ${AMENDMENT.counts.resultsAmended} of the ${snapQ1.results} results beneath this signature have an amended value staged against them. The signature stands; the agreement between the signed document and the standing record is what would move, and it is the <a class="mk-ref" href="#snapshot">“against today’s record” column</a> that carries it.</p>` +
          `<p class="mk-tight mk-muted">Superseding a signature is not a thing this product offers. A signature is withdrawn by a further signed act that names it, and both stay readable.</p>`,
      ),
      '1fr 1fr',
    ) +
    '<h2 class="mk-h2">What a new approval would cover</h2>' +
    C.blastRadius({
      lede: 'If the amendment were accepted and the 2026 Q1 report reissued, the approval requested would cover:',
      rows: [
        { what: 'A new snapshot, with its own digest', n: 'SNAP-0124' },
        { what: 'Results it would stand on', n: `${snapQ1.results} — ${AMENDMENT.counts.resultsAmended} at amended values` },
        { what: 'Capacities required again', n: '3 — prepared, reviewed, approved' },
        { what: 'Exceedances the document would report', n: `${EXCEEDANCES.length - AMENDMENT.counts.outcomesChanged} for the period, down ${AMENDMENT.counts.outcomesChanged}` },
        { what: 'The approval of 2026-04-27', n: '0 changes — it covers SNAP-0117 and continues to' },
        { what: 'Sections needing an author first', n: '1 — §6.1 cites a trip that would no longer stand' },
      ],
      action: 'Not available — the amendment is staged',
      cancel: 'Open the amendment decision',
      reversible:
        'A requested approval can be withdrawn before it is given. Once given it is a record of what somebody accepted at a moment, and it is never edited — a mistaken approval is answered by a further signed act that names it.',
    }) +
    cols(
      panel(
        'Not a sign-off, and on this screen only so the two can be told apart',
        facts([
          ['What', esc(DATA_RELEASE.what)],
          ['By', esc(DATA_RELEASE.by)],
          ['At', `<span class="sf-instant">${esc(DATA_RELEASE.at)}</span>`],
          ['Covering', esc(DATA_RELEASE.covering)],
        ]) +
          `<p class="mk-tight mk-muted">${esc(DATA_RELEASE.says)}</p>`,
      ),
      panel(
        'Where each of these is answerable',
        `<div class="mk-actions"><a class="mk-btn" href="#snapshot">What the snapshot holds, and how the record has moved</a><a class="mk-btn" href="#submissions">What was lodged, and when</a><a class="mk-btn" href="#validation">Validation state, result by result</a><a class="mk-btn" href="#audit">Every signature as an audit record</a></div>` +
          '<p class="mk-tight mk-muted">A signature is a row in the audit trail like any other write, attributed to a principal in a transaction. The difference is that this one carries a capacity and a digest, which is what makes it evidence rather than a log line.</p>',
      ),
      '1fr 1fr',
    )
  );
};

/* ================================================================== *
 * J7 — Prove what was known, and when
 * ================================================================== */

/**
 * The chain, drawn as a numbered narrative — the default view (PR-3c).
 *
 * `#result-detail` renders the upstream half from this same builder over the
 * same array, so the two screens cannot come to describe the bore differently.
 */
const chainList = (steps, { from = 0 } = {}) =>
  `<ol class="mk-chain">${steps.map((c, i) => `<li class="mk-chain__step mk-chain__step--${c.kind}">
      <span class="mk-chain__n">${from + i + 1}</span>
      <div class="mk-chain__text">
        <span class="mk-chain__label">${esc(c.step)}</span>
        <span class="mk-chain__what">${esc(c.what)}</span>
        <span class="mk-chain__detail">${esc(c.detail)}</span>
        ${c.at ? `<span class="mk-chain__link"><a class="mk-ref" href="#${esc(c.at)}">Open the record this step reads</a></span>` : ''}
      </div></li>`).join('')}</ol>`;

/**
 * The compact upstream/downstream view — **Trace it** (PR-3c).
 *
 * The review's words were *"provenance is a small graph, not a line"* and, in
 * the same breath, *"don't replace the narrative with a giant technical DAG"*.
 * So this is small, it is the second reading of the same structure rather than
 * a second structure, and it is the alternative view rather than the default.
 *
 * What it shows that the narrative cannot is the **fork**. A derived total has
 * two inputs; they share every hop from the bore to the bench and separate
 * only at the analysis. Drawn as one column, PFHxS appears to come out of
 * PFOS, and the one relationship the whole derivation turns on is the one the
 * line cannot draw.
 *
 * It is not a plate. There is no scale, no axis and nothing measured in it, so
 * the frozen chart grammar is not engaged and this adds nothing to the twelve.
 */
const traceGraph = (T) => {
  const node = (n, extra = '') =>
    `<li class="mk-trace__node mk-trace__node--${n.kind}${extra}">` +
    `<a class="mk-trace__hit" href="#${esc(n.at)}">` +
    `<span class="mk-trace__label">${esc(n.label)}</span>` +
    `<span class="mk-trace__sub">${esc(n.sub)}</span>` +
    `<span class="sf-visually-hidden"> — ${esc(n.step)}</span></a></li>`;
  return (
    '<div class="mk-trace">' +
    '<section class="mk-trace__band">' +
    `<h3 class="mk-trace__cap">Upstream — the ${T.upstream.length} hops that produced it</h3>` +
    `<ol class="mk-trace__row">${T.upstream.map((n) => node(n)).join('')}</ol>` +
    '</section>' +
    '<section class="mk-trace__band mk-trace__band--fork">' +
    `<h3 class="mk-trace__cap">Two inputs, one bench — the fork a line cannot draw</h3>` +
    `<ol class="mk-trace__row mk-trace__row--fork">${T.fork.map((n) => node(n)).join('')}</ol>` +
    `<p class="mk-trace__rule"><span class="mk-trace__arrow" aria-hidden="true">▼</span> ` +
    `<a class="mk-ref" href="#${esc(T.rule.at)}">${esc(T.rule.label)}</a> <span class="mk-muted">${esc(T.rule.sub)}</span></p>` +
    '</section>' +
    '<section class="mk-trace__band mk-trace__band--focus">' +
    '<h3 class="mk-trace__cap">The result in focus</h3>' +
    `<p class="mk-trace__focus"><span class="mk-trace__value">${esc(T.focus.label)}</span>` +
    `<span class="mk-trace__sub">${esc(T.focus.sub)}</span></p>` +
    '</section>' +
    '<section class="mk-trace__band">' +
    `<h3 class="mk-trace__cap">Downstream — what it reached</h3>` +
    `<ol class="mk-trace__row">${T.downstream.map((n) => node(n)).join('')}</ol>` +
    '</section>' +
    '</div>'
  );
};

const lineage = () => {
  const P = PROVENANCE;
  return (
    head('Why is this number what it is?', 'One result, and everything that produced it — beginning at the bore.', {
      route: 'a proposal — the product carries lineage as a panel and the result page, not a route',
      toolbar: btn('Copy as evidence') + btn('Open certificate'),
    }) +
    notice('warning', 'Proposed as a surface. The engine is complete and nothing shows it.',
      'FR-5, G-09b and the bitemporal survey model are the deepest architectural investment in this product, and “why is this number what it is” is the question no incumbent answers well. There is a lineage graph with single-query answerability underneath, and not one pixel on top of it. This is the highest-value missing screen in the catalogue.') +
    `<div class="mk-lineage__subject">
      <span class="mk-lineage__value">${esc(P.value)}</span>
      <span class="mk-lineage__meta">${esc(P.analyte)} · ${loc(P.location)} · sample <span class="mk-file">${esc(P.sample)}</span> · collected ${esc(P.collected)} · certificate <span class="mk-file">${esc(P.certificate)}</span></span>
    </div>` +
    notice(
      'default',
      `The chain starts at the bore, not at the laboratory’s file — ${P.upstream.length} hops before the first number.`,
      'A senior hydrogeologist reviewing this screen said the chain began too late: it opened on the deliverable, and for a groundwater result the account that has to be given runs location and version → bore and screened interval → programme → field event → field measurements and stabilisation → sample → filtration and preservation → custody transfer → laboratory receipt → analytical batch, method and QC → laboratory result, and only then import, derivation, evaluation and use. Every hop below reads the record that owns it and links to the screen that draws it. Nothing here is a copy: the field half resolves through the bore session, the custody half through the chain of custody, and the laboratory half through the batch.',
    ) +
    `<p class="sf-lede mk-tight">${C.segmented({ options: ['Explain it', 'Trace it'], value: 'Explain it', label: 'View' })}</p>` +
    '<h2 class="mk-h2">Explain it</h2>' +
    `<p class="mk-tight mk-muted">The default, and it stays the default. A chain a practitioner can read aloud to a regulator is the artifact; the graph beside it is a way of seeing the same thing at once.</p>` +
    '<h3 class="mk-h3">From the bore to the bench</h3>' +
    chainList(P.upstream) +
    '<h3 class="mk-h3">From the deliverable to the consequence</h3>' +
    chainList(P.downstream, { from: P.upstream.length }) +
    notice('default', `${P.chain.length} steps, one query.`,
      'From the bore that was drilled in 2019 to the statutory notification this result eventually caused. Nothing here is reconstructed after the fact — every step was recorded when it happened, because a derivation that does not carry its rule and its inputs is a number nobody can defend (PP3).') +
    '<h2 class="mk-h2" style="margin-top:1.4rem">Trace it</h2>' +
    `<p class="mk-tight">The same hops, compact, with the focused result at the centre. ${esc(P.trace.upstream.length)} upstream, the fork at the bench, ${esc(P.trace.downstream.length)} downstream.</p>` +
    traceGraph(P.trace) +
    notice(
      'default',
      'A graph, deliberately small — and it is not one of the twelve plates.',
      'Two views of one structure, and neither is a second copy of it: both read the same array, so a hop cannot appear in one and not the other. The narrative is what gets read to a regulator; this is what gets looked at when somebody asks <em>what else did that touch</em>. It is drawn in the document rather than as a figure — no scale, no axis, nothing measured — so the frozen chart grammar is not engaged and nothing here is an addition to the approved plate set.',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">The questions this chain has to answer</h2>' +
    `<p class="mk-tight">The list a hydrogeologist arrives with, and where each one resolves. A chain that cannot answer these is a longer chain, not a better one.</p>` +
    table({
      caption: 'Every answer is a link into the record that holds it, not a restatement of it.',
      head: ['Question', 'Answer', 'Step', 'Opens'],
      scroll: true,
      label: 'Questions the provenance chain answers',
      rows: P.questions.map((q) => [
        `<strong>${esc(q.q)}</strong>`,
        esc(q.a),
        `<span class="mk-muted">${esc(q.step)}</span>`,
        `<a class="mk-btn mk-btn--sm" href="#${esc(q.at)}">Open</a>`,
      ]),
    }) +
    cols(
      panel(
        'Why this chain and not the metals batch',
        `<p class="mk-tight">This result is <strong>PFAS</strong>. Its certificate is <span class="mk-file">${esc(P.certificate)}</span> from ${esc(CUSTODY_CHAIN.continues.laboratory)} and its batch is <a class="mk-ref" href="#batches">${esc(CUSTODY_CHAIN.continues.workOrder)}</a> — not <a class="mk-ref" href="#batches">${esc(METALS_BATCH.id)}</a>, which is the dissolved-metals batch this project talks about most because its zinc spike failed.</p>` +
          `<p class="mk-tight">Chaining a result to the batch that happens to be nearby is the error the chain exists to make impossible. The failed zinc spike qualifies nine results and none of them is this one, and a lineage that implied otherwise would have handed a reviewer a caveat that does not apply and hidden the one that does.</p>` +
          `<p class="mk-tight mk-muted">The hop that made this visible is the eleventh: all ${CUSTODY_CHAIN.containers} containers went to ${esc(CUSTODY_CHAIN.laboratory)}, and the PFAS certificate is somebody else’s. ${esc(CUSTODY_CHAIN.continues.why)}</p>`,
      ),
      panel(
        'What the chain carries forward rather than closing over',
        `<p class="mk-tight">Two things on this chain are unresolved, and both stay visible on it rather than being smoothed away.</p>` +
          `<p class="mk-tight"><strong>${esc(CUSTODY_CHAIN.discrepancy.what)}.</strong> The field record and the laboratory’s receiving form disagree by a digit transposition. Both readings are kept and <a class="mk-ref" href="#ecoc">the chain of custody</a> holds the ways out — none of which is picking one.</p>` +
          `<p class="mk-tight"><strong>The estimated component.</strong> PFHxS sits between the method detection limit and the limit of reporting, so it is real and not reliably quantified, and the qualifier carries onto the total. <a class="mk-ref" href="#criteria">The non-detect rule</a> shows the same total under all three readings of it.</p>`,
      ),
      '1fr 1fr',
    ) +
    /*
     * PR-3b's record, kept. The representation fix landed in wave 6 and the
     * paragraph explaining it is still the clearest statement of why the three
     * limits stay distinct — but the sentence about the chain being unchanged
     * in shape is no longer true, and it has gone.
     */
    notice(
      'warning',
      `The component that made the wave-6 representation fix necessary: PFHxS at ${esc(PFAS_LIMITS.mdl.toFixed(1))} &lt; 1.7 &lt; ${esc(PFAS_LIMITS.lor.toFixed(1))} ${esc(PFAS_LIMITS.unit)}.`,
      `The component step read <em>“PFHxS = 1.7 ng/L · detected · LOR 2.0 ng/L”</em>, which is an unqualified detect below the reporting limit — not something a laboratory reports, and a practitioner reading the chain stops there. The three limits are distinct and stay distinct: the <strong>MDL</strong> is the lowest concentration the method detects with confidence that the analyte is present, the <strong>LOR</strong> is the lowest it will report as a quantified number, and a value between them is real and imprecise. So the assertion moves to where the glossary puts it — a <strong>qualifier</strong>, ${esc(PFAS_LIMITS.qualifier)} (${esc(PFAS_LIMITS.scheme)}), origin ${esc(PFAS_LIMITS.origin)}, meaning ${esc(PFAS_LIMITS.qualifierMeans)} — and the detect status stays two-valued. ${esc(PFAS_LIMITS.says)} The qualifier carries onto the derived total, and <a class="mk-ref" href="#criteria">the non-detect rule</a> shows the same total under all three readings of that component: the number and the confidence move, the outcome does not. What this catalogue does not yet draw is a qualifier channel on the <a class="mk-ref" href="#crosstab">results grid</a> itself, where the total renders with its value and its outcome marks and no qualifier beside them — recorded here rather than left to be noticed.`,
    )
  );
};

const auditTrail = () =>
  head('Audit trail', 'Every mutation, who made it, and what it changed.', {
    route: '/projects/:projectId/audit',
    toolbar: btn('Filter by principal') + btn('Export'),
  }) +
  table({
    caption: 'Recorded by the database, not by the application. There is no unattributed path.',
    head: ['At', 'Principal', 'Action', 'Table', 'What', 'Transaction'],
    kind: 'matrix',
    label: 'Audit trail',
    rows: AUDIT.map((a) => [
      `<span class="sf-instant">${esc(a.at)}</span>`,
      esc(a.who),
      tag(a.action, a.action === 'insert' ? 'good' : 'warn'),
      `<code>${esc(a.table)}</code>`,
      esc(a.what),
      `<code class="mk-muted">${esc(a.tx)}</code>`,
    ]),
  }) +
  cols(
    notice('default', 'A delete is recorded, not performed.',
      'The trigger turns a destructive statement into a recorded non-event. Nothing in this product is destroyed — supersession, soft delete and versioning throughout, because retention is a policy rather than an accident (PP6).'),
    notice('default', 'Everything inside one transaction reads back as one act.',
      'The 42 results and 42 lineage records committed at 10:22:41 share a transaction id, so “what did that import do” is one row to expand rather than eighty-four to correlate by timestamp.'),
    '1fr 1fr',
  );

const supersession = () =>
  head('Supersession', 'What a re-issued certificate changed, and everything that followed it.', {
    route: '/projects/:projectId/supersessions',
  }) +
  stagedNote(`${AMENDMENT.counts.resultsAmended} supersessions would append here, each carrying its reason`) +
  `<p class="sf-lede mk-tight">${esc(SUPERSESSION.subject)}</p>` +
  cols(
    panel('Before', facts([
      ['Value', `<span class="mk-num mk-num--bad">${esc(SUPERSESSION.original.value)}</span>`],
      ['Certificate', `<code>${esc(SUPERSESSION.original.certificate)}</code>`],
      ['Issued', esc(SUPERSESSION.original.issued)],
      ['Outcome', esc(SUPERSESSION.original.outcome)],
    ])),
    panel('After', facts([
      ['Value', `<span class="mk-num mk-num--good">${esc(SUPERSESSION.superseding.value)}</span>`],
      ['Certificate', `<code>${esc(SUPERSESSION.superseding.certificate)}</code>`],
      ['Issued', esc(SUPERSESSION.superseding.issued)],
      ['Outcome', esc(SUPERSESSION.superseding.outcome)],
    ])),
    '1fr 1fr',
  ) +
  notice('default', `Reason recorded: ${esc(SUPERSESSION.reason)}`, 'The superseded value is not deleted. It stays on the crosstab struck through beside the new one, because a reader looking at last quarter’s printed report needs to find the number it contains.') +
  table({
    caption: 'The cascade. A re-issued certificate that does not reach the exceedance flags and the issued reports has orphaned them.',
    head: ['What followed', 'Outcome'],
    rows: SUPERSESSION.cascade.map((c) => [esc(c.what), `<span class="mk-muted">${esc(c.outcome)}</span>`]),
  });

/* ================================================================== *
 * J8 — Configure the instance
 * ================================================================== */

const criteriaLibrary = () =>
  head('Criteria library', 'Which limits apply, to what, and from when.', {
    route: '/projects/:projectId/criteria',
    toolbar: btn('New criteria set', 'primary'),
  }) +
  table({
    caption: 'A criteria set is versioned with effective dates. Evaluating 2019 data against a 2024 licence table is a defect, not a feature.',
    head: ['Criteria set', 'Version', 'Effective', 'Matrix', 'Applies to', 'Analytes', 'State'],
    kind: 'matrix',
    label: 'Criteria library',
    rows: CRITERIA_LIBRARY.map((c) => [
      esc(c.set),
      `<code>${esc(c.version)}</code>`,
      `<span class="sf-instant">${esc(c.effective)}</span>`,
      esc(c.matrix),
      `<span class="mk-muted">${esc(c.applies)}</span>`,
      `<span class="mk-num">${c.analytes}</span>`,
      tag(c.state, c.state === 'active' ? 'good' : c.state === 'historic' ? 'neutral' : 'warn'),
    ]),
  }) +
  cols(
    panel(
      'PFAS is assessed here against ANZG, and ANZG is not the operative PFAS framework',
      '<p class="mk-tight">The PFAS National Environmental Management Plan is the agreed ANZ position. It carries its own values, its own derived sums and — the part that matters — a value per <em>receptor</em>, because what protects freshwater ecology is not what protects a drinking-water supply.</p>' +
        table({
          head: ['Criteria set', 'Version', 'Protects', 'PFOS + PFHxS', 'State'],
          rows: [
            ['PFAS NEMP — freshwater 95%', '2.0', 'Aquatic ecosystems', '<span class="mk-num">0.13 µg/L</span>', tag('available', 'neutral')],
            ['PFAS NEMP — drinking water', '2.0', 'Human health, potable', '<span class="mk-num">0.07 µg/L</span>', tag('available', 'neutral')],
            ['PFAS NEMP — recreational', '2.0', 'Human health, contact', '<span class="mk-num">0.7 µg/L</span>', tag('available', 'neutral')],
            ['ANZG 2018 — 95%', '2018.1', 'Aquatic ecosystems', '<span class="mk-num">0.13 µg/L</span>', tag('active', 'good')],
          ],
        }) +
        '<p class="mk-tight">Assessing against ANZG alone is defensible for freshwater ecology and insufficient the moment a potable or recreational receptor sits downgradient. Because evaluation here is concurrent and every set is versioned, carrying all three is a content decision rather than an architectural one — which is exactly the kind of thing a customer should be able to do without calling anybody.</p>',
    ) +
    panel('Applicability', '<p class="mk-tight">A criteria set is bound by matrix, location group, hydrostratigraphic unit, analyte, fraction and period — not by a global switch. Two sets apply to MW05 concurrently and both outcomes are kept.</p>' +
      '<p class="mk-tight mk-muted">G8 promises the customer’s own team can do this without an implementation consultant. Today it is a seed file, and this screen is what that promise actually requires.</p>'),
    panel('Non-detect rule is bound to the set, not to the instance',
      table({
        head: ['Criteria set', 'Non-detect treatment'],
        rows: [
          ['ANZG 2018 — 95%', '<span class="mk-muted">exclude from derived sums</span>'],
          ['Licence Table 4', '<span class="mk-muted">half the limit of reporting</span>'],
        ],
      }) +
      '<p class="mk-tight mk-muted">Regulators specify different rules, and the derived total can cross a criterion depending on which applied. A global setting would make one of the two answers silently wrong (FR-2.2). The workspace below runs that choice against the record rather than describing it.</p>'),
    '1fr 1fr',
  ) +
  nonDetectBinding() +
  criteriaVersionWorkspace();

/**
 * FR-2.2, made operable on the one derived total this site has.
 *
 * The rule is *what a non-detect contributes to a calculation* — zero, half
 * the limit of reporting, the limit, or excluded — and it belongs to the
 * criteria set rather than to a preference. The reason is drawn here rather
 * than argued: five of these six locations reported both PFAS components
 * below the limit of reporting, and the same six results read **indeterminate,
 * compliant or 31× a guideline value** depending on which of the four applied.
 * `zero` is the one that turns all six into passes, which is the direction
 * this product exists to refuse silently.
 *
 * MW05 is the control in the experiment: both of its components were detected,
 * so a rule about non-detects has nothing to say about it and its 4.8 ng/L is
 * the same under all four. Every total in the table is summed from
 * `PFAS_COMPONENTS` under the treatment named at the head of its column.
 */
const nonDetectBinding = () => {
  const N = NON_DETECT;
  const active = N.treatments.find((t) => t.rule === N.activeRule);
  const cell = (r) =>
    (r.censored
      ? `<span class="sf-result sf-result--censored"><span class="sf-result__value">${esc(r.total)}</span></span>`
      : `<span class="mk-num${r.outcome === 'exceedance' ? ' mk-num--bad' : ''}">${esc(r.total)}</span>`) +
    `<br>${outcomeCell(r.outcome)}` +
    (r.factor === '—' ? '' : ` <span class="mk-num mk-num--bad">${esc(r.factor)}</span>`);
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">The non-detect rule, run over the record it decides</h2>' +
    `<p class="sf-lede mk-tight">${esc(N.analyte)} · derived by <code class="mk-file">${esc(N.rule)}</code> · limit of reporting ${esc(N.lor.toFixed(1))} ng/L on each component · criterion ${esc(String(N.criterion))} ng/L (ANZG 2018 · 95%).</p>` +
    cols(
      panel(
        'Bound to the set',
        C.field({
          label: 'Non-detect rule for ANZG 2018 — 95% species protection',
          control: C.radioGroup({
            name: 'nd-anzg',
            legend: 'What a non-detect contributes to a derived sum',
            value: 'exclude from the sum',
            options: N.treatments.map((t) => t.label),
          }),
          hint: 'There is deliberately no default, in the schema or in the code. A criteria set without a rule cannot be stored, because the alternative is a value that looks like a decision and is not.',
        }) +
          `<p class="mk-tight">In force: <strong>${esc(active.label)}</strong>. Changing it here changes it for this set only — the Licence Table 4 set keeps half-limit substitution, and both answers are kept because two regulators asked two questions.</p>`,
      ),
      panel(
        'What the components actually are',
        table({
          caption: `The two results behind each derived total, as the laboratory reported them. MDL ${esc(PFAS_LIMITS.mdl.toFixed(1))} · LOR ${esc(PFAS_LIMITS.lor.toFixed(1))} ${esc(PFAS_LIMITS.unit)} on both components — three limits, kept apart.`,
          head: ['Location', 'PFOS', 'PFHxS'],
          scroll: true,
          label: 'PFAS components by location',
          rows: PFAS_COMPONENTS.map((p) => [
            loc(p.location),
            p.pfos === null ? `<span class="sf-result sf-result--censored"><span class="sf-result__value">&lt; ${esc(N.lor.toFixed(1))}</span></span>` : `<span class="mk-num">${esc(String(p.pfos))}</span>`,
            p.pfhxs === null
              ? `<span class="sf-result sf-result--censored"><span class="sf-result__value">&lt; ${esc(N.lor.toFixed(1))}</span></span>`
              : /*
                 * PR-3b. This cell read a bare 1.7 against a 2.0 limit of
                 * reporting — an unqualified detect below the LOR, which no
                 * laboratory reports. The qualifier is what carries the
                 * assertion, and it is drawn beside the number rather than
                 * left to a footnote.
                 */
                `<span class="mk-num">${esc(String(p.pfhxs))}</span>` +
                (p.pfhxsQualifier
                  ? ` <span class="mk-tag mk-tag--warn">${esc(p.pfhxsQualifier)}</span> <small>${esc(PFAS_LIMITS.qualifierMeans)} — above the MDL ${esc(PFAS_LIMITS.mdl.toFixed(1))}, below the LOR ${esc(PFAS_LIMITS.lor.toFixed(1))}</small>`
                  : ''),
          ]),
        }) +
          `<p class="mk-tight mk-muted">${esc(N.says)}</p>` +
          `<p class="mk-tight"><strong>${esc(N.estimated.component)} at ${esc(N.estimated.location)} is ${esc(String(N.estimated.value))} ${esc(PFAS_LIMITS.unit)} ${esc(N.estimated.qualifier)} — ${esc(N.estimated.means)}.</strong> ${esc(N.estimated.rule)} ${esc(N.estimated.carries)}</p>` +
          table({
            caption: 'The same total under the three readings of that one component. The outcome is the column that does not move.',
            head: ['How the component is read', 'Total', 'Against the criterion', 'What it means'],
            scroll: true,
            label: 'The derived total under three readings of the estimated component',
            rows: N.estimated.readings.map((r) => [
              esc(r.as),
              `<span class="mk-num${r.outcome === 'exceedance' ? ' mk-num--bad' : ''}">${esc(r.total)}</span>`,
              `<span class="mk-num mk-num--bad">${esc(r.factor)}</span>`,
              `<span class="mk-muted">${esc(r.note)}</span>`,
            ]),
          }) +
          `<p class="mk-tight mk-muted">${esc(N.estimated.decides)}</p>`,
      ),
      '2fr 3fr',
    ) +
    table({
      caption: 'One column per treatment, every total summed from the components under that rule. The column in force is marked; the other three are what the same six results would say.',
      head: [
        'Location',
        ...N.treatments.map(
          (t) => `${esc(t.label)}${t.rule === N.activeRule ? '<small>in force</small>' : `<small>${t.changes} outcomes change</small>`}`,
        ),
      ],
      kind: 'matrix',
      label: 'The derived PFAS total under each non-detect rule',
      rows: PFAS_COMPONENTS.map((p, i) => [loc(p.location), ...N.treatments.map((t) => cell(t.rows[i]))]),
    }) +
    cols(
      panel(
        'What each column would do to this round',
        table({
          head: ['Treatment', 'Outcomes', 'Changed from in force'],
          scroll: true,
          label: 'Outcome counts per non-detect treatment',
          rows: N.treatments.map((t) => [
            `${esc(t.label)}${t.rule === N.activeRule ? ' ' + C.status('in force', 'good') : ''}`,
            t.outcomes.map((o) => `${outcomeCell(o.o)} <span class="mk-num">${o.n}</span>`).join('<br>'),
            t.rule === N.activeRule ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-num mk-num--bad">${t.changes}</span>`,
          ]),
        }),
      ),
      panel(
        'Why this is a criteria-set field and not a setting',
        `<p class="mk-tight"><strong>Zero is the dangerous one.</strong> Under it every censored total becomes ${esc(N.treatments[1].rows[0].total)} ng/L and six results that nobody could assess read as <em>compliant</em>. Nothing on the page would look wrong. That is the same failure as a reporting limit above a criterion rendering as a pass, arriving through a different door.</p>` +
          `<p class="mk-tight">Under the limit of reporting the same six read as exceedances at ${esc(N.treatments[3].rows[0].factor)}, which would raise six statutory notification obligations. One field, and the round is either quiet or a compliance event.</p>` +
          '<p class="mk-tight mk-muted">Which is why it is bound to the set: a regulator that specifies half-limit substitution and a regulator that specifies exclusion are both answerable at once, and neither answer is a global preference somebody changed on a Tuesday.</p>',
      ),
      '2fr 3fr',
    )
  );
};

/**
 * Journey 8, as controls: version → test → preview → approval → activation →
 * rollback.
 *
 * The pair below differs in exactly one field, which is the point: a criteria
 * set version is *this instance's configuration* of the set, not a new edition
 * of ANZG. No guideline value moves. What moves is the non-detect rule, and
 * that is enough to change six outcomes and start six statutory clocks — which
 * is why activation is drawn as an approval with its consequences stated, and
 * not as a save.
 *
 * The test runs the draft against the committed record rather than describing
 * what it would do, and it reports the results that do **not** change as well
 * as the ones that do. The same "Preview against the real record" shape the
 * window condition uses, on the other configuration surface.
 */
const criteriaVersionWorkspace = () => {
  const D = CRITERIA_DRAFT;
  const pair = (label, a, b) => [esc(label), a, b];
  return (
    '<h2 class="mk-h2" style="margin-top:1.4rem">A version pair, one field apart</h2>' +
    `<p class="sf-lede mk-tight">${esc(D.set)} — <code>${esc(D.active.version)}</code> in force, <code>${esc(D.draft.version)}</code> in draft. The version is this instance’s configuration of the set, not a new edition of the guideline: no value in it moves.</p>` +
    table({
      caption: 'Side by side. Four rows identical, one row different, and the different one decides six outcomes.',
      head: ['', `Version ${esc(D.active.version)}<small>in force</small>`, `Version ${esc(D.draft.version)}<small>draft</small>`],
      kind: 'matrix',
      label: 'Criteria set version pair',
      rows: [
        pair('Effective', `<span class="sf-instant">${esc(D.active.effective)}</span>`, `<span class="sf-instant">${esc(D.draft.effective)}</span>`),
        pair('State', C.status(D.active.state, 'good'), C.status(D.draft.state, 'warn')),
        pair('Proposed by', `<span class="mk-muted">${esc(D.active.by)}</span>`, `${esc(D.draft.by)} · <span class="sf-instant">${esc(D.draft.at)}</span>`),
        [
          `<strong>${esc(D.differs[0])}</strong>`,
          `<span class="mk-num">${esc(D.differs[1])}</span>`,
          `<span class="mk-num mk-num--warn">${esc(D.differs[2])}</span>`,
        ],
        ...D.same.map(([what, how]) => pair(what, `<span class="mk-muted">${esc(how)}</span>`, `<span class="mk-muted">${esc(how)}</span>`)),
      ],
    }) +
    `<p class="mk-tight mk-muted"><strong>Why:</strong> ${esc(D.rationale)}</p>` +
    '<h2 class="mk-h2">Tested against the committed record</h2>' +
    cols(
      panel(
        'What the test ran over',
        facts([
          ['Scope', esc(D.test.scope)],
          ['Results the rule reaches', `<span class="mk-num">${D.test.reaches}</span>`],
          ['Outcomes that change', `<span class="mk-num mk-num--bad">${D.test.changes}</span>`],
          ['Outcomes that do not', `<span class="mk-num">${D.test.unchanged}</span>`],
        ]) +
          `<p class="mk-tight">${esc(D.test.unchangedWhy)}</p>` +
          `<p class="mk-tight mk-muted">${esc(D.test.nothingElse)}</p>` +
          `<div class="mk-actions">${C.btn('Re-run against the record', 'primary')}<a class="mk-btn" href="#crosstab">Open the results this covers</a></div>`,
      ),
      panel(
        `The ${D.test.changes} results that change, named`,
        table({
          caption: 'Not a count — the rows. A test that reports a number and not the records behind it cannot be checked by the person who has to approve it.',
          head: ['Location', 'Total now', 'Outcome now', 'Total under the draft', 'Outcome under the draft', ''],
          kind: 'matrix',
          label: 'Results whose outcome changes under the draft version',
          rows: D.test.rows.map((r) => [
            loc(r.location),
            `<span class="sf-result sf-result--censored"><span class="sf-result__value">${esc(r.was.total)}</span></span>`,
            outcomeCell(r.was.outcome),
            `<span class="mk-num mk-num--bad">${esc(r.total)}</span>`,
            outcomeCell(r.outcome) + (r.factor === '—' ? '' : ` <span class="mk-num mk-num--bad">${esc(r.factor)}</span>`),
            `<a class="mk-ref" href="#lineage">Lineage</a>`,
          ]),
        }),
      ),
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2">Activation, and what it starts</h2>' +
    cols(
      C.blastRadius({
        lede: `Activating version ${esc(D.draft.version)} on ${esc(D.draft.effective)} would write:`,
        rows: D.activation.writes,
        action: 'Request approval to activate',
        cancel: 'Leave the draft as a draft',
        danger: true,
        reversible: D.activation.reversible,
      }),
      panel(
        'Why activating a criteria set is an approval, not a save',
        `<p class="mk-tight">${esc(D.activation.says)}</p>` +
          `<p class="mk-tight">A <a class="mk-ref" href="#notification">became-aware timestamp</a> is immutable at the database and a statutory window runs from it. Missing that window is an offence rather than a service failure — so a configuration change that manufactures six of them belongs behind the same <a class="mk-ref" href="#signoff">named approval</a> a submission does.</p>` +
          `<p class="mk-tight mk-muted">Nothing here re-opens a locked period. The 2026 Q1 round is closed, and a rule change evaluates forward — which is the opposite of the <a class="mk-ref" href="#certificate">staged amendment</a>, where the data moved under a period already reported and the write has to be decided.</p>`,
      ),
      '3fr 2fr',
    ) +
    '<h2 class="mk-h2">Rollback</h2>' +
    cols(
      C.blastRadius({
        lede: `Rolling back to version ${esc(D.active.version)} would write:`,
        rows: D.rollback.writes,
        action: 'Roll back',
        cancel: 'Cancel',
        reversible:
          'Reversible as an evaluation. An exceedance withdrawn by a rollback is withdrawn and not deleted, and it stays readable with the version that raised it and the version that withdrew it.',
      }),
      panel(
        'What rollback cannot undo',
        `<p class="mk-tight">${esc(D.rollback.says)}</p>` +
          '<p class="mk-tight"><strong>A lodged notification is not a row this product owns.</strong> It is a document with a regulator, and it is withdrawn by writing to the regulator. Rolling back the rule withdraws the exceedance that obliged it and records that the notification stands — a product that quietly cleared both would have deleted the evidence that a notification was made.</p>' +
          `<div class="mk-actions"><a class="mk-btn" href="#audit">Every version change as an audit record</a><a class="mk-btn" href="#exceedances">The results a re-evaluation would move</a></div>`,
      ),
      '3fr 2fr',
    )
  );
};

const formatDesigner = () =>
  head('EDD formats', 'A laboratory’s file shape, described rather than coded.', {
    route: '/config/formats',
    toolbar: btn('New format', 'primary'),
  }) +
  table({
    caption: 'Formats defined as configuration (FR-3.1). A new laboratory is a definition, not a release.',
    head: ['Format', 'Version', 'Files', 'Fields', 'Used by', 'State'],
    rows: FORMATS.map((f) => [
      esc(f.name), `<code>${esc(f.version)}</code>`, esc(f.files),
      `<span class="mk-num">${f.fields}</span>`, `<span class="mk-muted">${esc(f.labs)}</span>`,
      tag(f.state, f.state === 'active' ? 'good' : 'neutral'),
    ]),
  }) +
  cols(
    panel('ESdat ELDF-4 — field mapping',
      table({
        head: ['Source field', 'Maps to', 'Rule'],
        rows: [
          ['<code>ChemName</code>', 'analyte', '<span class="mk-muted">dictionary lookup, then fuzzy with confidence</span>'],
          ['<code>Result</code>', 'result value', '<span class="mk-muted">−999 → analysis aborted · −997 → text result</span>'],
          ['<code>EQL</code>', '<strong>LOR</strong>', '<span class="mk-muted">renamed inward — the domain says LOR</span>'],
          ['<code>Units</code>', 'unit', '<span class="mk-muted">case-normalised, converted with the rule recorded</span>'],
          ['<code>SampleCode</code>', 'sample', '<span class="mk-muted">joins the Sample file on the pair</span>'],
        ],
      })),
    panel('The vocabulary maps inward, never outward',
      '<p class="mk-tight">ESdat calls it <code>EQL</code>. The domain calls it <strong>LOR</strong>, and so does every screen, every column heading and every report label in this product.</p>' +
      '<p class="mk-tight mk-muted">A format that leaked its own vocabulary into the application would put two words for one concept in front of a practitioner, and the glossary guard fails the build for exactly that.</p>'),
    '3fr 2fr',
  );

const dictionary = () =>
  head('Analyte dictionary', 'The names, the synonyms, and what each one actually is.', {
    route: '/config/analytes',
    toolbar: btn('Add synonym'),
  }) +
  table({
    caption: 'Distinct concepts stay distinct. LOR, MDL and PQL are three columns, never one friendlier field.',
    head: ['Analyte', 'CAS', 'Group', 'Basis', 'Default unit', 'LOR', 'MDL', 'Synonyms'],
    scroll: true, label: 'The analyte dictionary',
    rows: [
      ['Arsenic (filtered)', '7440-38-2', 'Metals', 'As(V)', 'µg/L', '<span class="mk-num">1.0</span>', '<span class="mk-num">0.3</span>', '<span class="mk-muted">As-D, Arsenic dissolved, As (filt)</span>'],
      ['Cadmium (filtered)', '7440-43-9', 'Metals', 'dissolved Cd, unspeciated', 'µg/L', '<span class="mk-num">1.0</span>', '<span class="mk-num">0.2</span>', '<span class="mk-muted">Cd-D, Cadmium dissolved</span>'],
      ['Nitrate as N', '14797-55-8', 'Nutrients', 'as N', 'mg/L', '<span class="mk-num">0.05</span>', '<span class="mk-num">0.01</span>', '<span class="mk-muted">NO3-N, Nitrate (as N), NOx-N ⚠</span>'],
      ['Sulfate as SO₄', '14808-79-8', 'Major ions', 'as SO₄', 'mg/L', '<span class="mk-num">1</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Sulphate, SO4, SO4--</span>'],
      ['PFOS (linear)', '1763-23-1', 'PFAS', 'linear isomer', 'ng/L', '<span class="mk-num">2.0</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Perfluorooctane sulfonate</span>'],
      ['PFHxS', '355-46-4', 'PFAS', 'total', 'ng/L', '<span class="mk-num">2.0</span>', '<span class="mk-num">0.5</span>', '<span class="mk-muted">Perfluorohexane sulfonate</span>'],
    ],
  }) +
  notice('warning', 'NOx-N is flagged rather than accepted as a synonym for nitrate.',
    'Nitrate plus nitrite is not nitrate. A laboratory reporting NOx-N against a nitrate criterion is the kind of quiet substitution that survives three reporting cycles and then fails a peer review. It routes to the exception queue with the difference stated.');

const roles = () =>
  head('Access', 'Who can see and do what, resolved from the customer’s directory.', {
    route: '/instance/access',
  }) +
  table({
    caption: 'Role bindings say “members of this directory group hold this role in this project”. There is no user table.',
    head: ['Directory group', 'Role', 'Project', 'Members', 'Can'],
    rows: [
      ['<code>WDL-Env-Leads</code>', 'Approver', 'MOCK-WDL', '<span class="mk-num">2</span>', '<span class="mk-muted">Approve, sign off, issue reports</span>'],
      ['<code>WDL-Env-Team</code>', 'Contributor', 'MOCK-WDL', '<span class="mk-num">6</span>', '<span class="mk-muted">Import, review, validate, produce figures</span>'],
      ['<code>WDL-Geotech</code>', 'Contributor', 'MOCK-WDL', '<span class="mk-num">3</span>', '<span class="mk-muted">TARP acknowledgement, instrumentation</span>'],
      ['<code>WDL-Exec</code>', 'Reader', 'all projects', '<span class="mk-num">4</span>', '<span class="mk-muted">Read registers and issued reports</span>'],
    ],
  }) +
  cols(
    notice('default', 'Membership is resolved on every request, not copied at sign-in.',
      'Somebody removed from a directory group loses access on their next request rather than at their next sign-in. Deprovisioning that waits for a session to expire is deprovisioning in name only.'),
    notice('default', 'Authorisation in the application; row-level security beneath it.',
      'The repository layer throws when a query is not scoped. The policy beneath it returns zero rows, because a policy cannot safely raise. Two mechanisms doing two jobs, not one wearing two hats.'),
    '1fr 1fr',
  );

/* ================================================================== *
 * J9 — Keep the instance alive
 * ================================================================== */

const instanceHealth = () =>
  head('Instance', 'What is running, at what version, and whether it is well.', {
    route: '/instance',
  }) +
  stats([
    stat(INSTANCE.version, 'version', 'good'),
    stat('4', 'services ok', 'good'),
    stat('2.84 M', 'results'),
    stat('38 m', 'measured RTO', 'good'),
  ]) +
  cols(
    table({
      caption: 'Service health, as /healthz reports it.',
      head: ['Service', 'State', 'Detail'],
      rows: INSTANCE.services.map((s) => [esc(s.name), tag(s.state, 'good'), `<span class="mk-muted">${esc(s.detail)}</span>`]),
    }),
    panel('Deployment', facts([
      ['Version', `<code>${esc(INSTANCE.version)}</code> · released ${esc(INSTANCE.released)}`],
      ['Commit', `<code>${esc(INSTANCE.commit)}</code>`],
      ['Database', esc(INSTANCE.database)],
      ['Tenancy', 'Single-tenant, customer’s own subscription'],
      ['Egress', 'None. No Strataflow-operated telemetry'],
    ])),
    '3fr 2fr',
  ) +
  notice('default', 'This one stays a terminal, deliberately.',
    'A console for a solo operator running N single-tenant instances is a surface to keep in step with the thing it manages, and R4 names version drift as the primary failure mode. The scheduler already serves its own health from the last completed tick, because “the process is up” is not the question an operator has. What is worth building here is legible output, not a dashboard.');

const diagnostics = () =>
  head('Backup, restore and diagnostics', 'The proof that a restore works, not the assertion that backups run.', {
    route: 'CLI — pnpm run backup · restore:drill',
  }) +
  cols(
    panel('Last drill', facts([
      ['Backup taken', esc(INSTANCE.backup.last)],
      ['Size', esc(INSTANCE.backup.size)],
      ['Integrity', `<span class="mk-num mk-num--good">${esc(INSTANCE.backup.verified)}</span>`],
      ['RPO', esc(INSTANCE.backup.rpo)],
      ['RTO', esc(INSTANCE.backup.rto)],
      ['Drill executed', esc(INSTANCE.backup.drill)],
    ]) + '<p class="mk-tight mk-muted">The drill runs the whole cycle — back up, write more, drop the database, restore, measure. An untested restore is not a backup.</p>'),
    panel('Customer-initiated diagnostics',
      '<p class="mk-tight">There is no telemetry from a customer deployment, so a diagnostic bundle is something the customer runs and sends: version, configuration, logs, schema state, recent errors.</p>' +
      table({
        head: ['In the bundle', 'Not in the bundle'],
        rows: [
          ['Version and commit', '<span class="mk-muted">Any monitoring result</span>'],
          ['Migration state', '<span class="mk-muted">Any location or coordinate</span>'],
          ['Recent errors, redacted', '<span class="mk-muted">Any principal identifier</span>'],
          ['Schema and policy inventory', '<span class="mk-muted">Any certificate or report</span>'],
        ],
      }),
    ),
    '1fr 1fr',
  ) +
  notice('default', 'Restore is not done until the content check passes.',
    'The backup writes a manifest — audit and lineage digests, the trigger, policy and grant inventory — and the restore is measured against it. A database that comes back up with its audit triggers missing has restored the data and lost the record.');

/* ================================================================== *
 * The second review pass — the screens a practitioner went looking
 * for and did not find.
 * ================================================================== */

/**
 * How a hardness-dependent criterion was arrived at.
 *
 * This is the highest-value screen in the second pass. Three of the five metal
 * exceedances at MW05 rest on a criterion that is a *function of another
 * measurement*, and neither incumbent shows the working — ESdat applies
 * conditional action levels, EQuIS emits an action-level code, and both hand
 * over the answer without the arithmetic. Showing it is not a new competitive
 * claim; it is the lineage claim, applied to the one derivation that decides
 * whether an exceedance survives review.
 */
const hardnessDerivation = () => {
  const H = HARDNESS;
  return (
    head('How this criterion was calculated', 'A hardness-modified guideline value, and every input that produced it.', {
      route: '/projects/:projectId/hardness',
      toolbar: C.lineageButton('Lineage of the hardness result') + C.exportMenu(),
    }) +
    notice(
      'warning',
      'A criterion that is a function of another result inherits everything true about that result.',
      'Cadmium, nickel and zinc at this site are assessed against values computed from hardness. If the hardness is wrong — wrong sample, wrong date, derived rather than measured, or above the range the relationship is defined over — then three exceedances are wrong with it, and nothing on a conventional results screen would show you that.',
    ) +
    cols(
      panel(
        'The hardness this criterion used',
        facts([
          ['Sample', `<span class="mk-file">${esc(H.sample)}</span>`],
          ['Reported hardness', `<strong class="mk-num">${esc(H.measured.value)}</strong>`],
          ['How', esc(H.measured.source)],
          ['Method', esc(H.measured.method)],
          ['Reporting limit', esc(H.measured.lor)],
        ]) +
          '<h3 class="mk-h3">Cross-checked against the major cations</h3>' +
          table({
            head: ['Input', 'Value'],
            scroll: true, label: 'Hardness inputs and their cross-checks',
            rows: [
              ['Calcium (filtered)', `<span class="mk-num">${esc(H.crossCheck.calcium)}</span>`],
              ['Magnesium (filtered)', `<span class="mk-num">${esc(H.crossCheck.magnesium)}</span>`],
              ['Formula', `<code class="mk-file">${esc(H.crossCheck.formula)}</code>`],
              ['Computed hardness', `<span class="mk-num">${esc(H.crossCheck.computed)}</span>`],
              ['Agreement', C.status(H.crossCheck.agreement, 'good')],
            ],
          }) +
          `<p class="mk-tight">${esc(H.crossCheck.note)}</p>`,
      ),
      panel(
        'The relationship, and where it stops',
        `<p class="mk-tight"><code class="mk-file">${esc(H.equation)}</code></p>` +
          `<p class="mk-tight"><strong>Capped.</strong> ${esc(H.cap)}</p>` +
          C.blastRadius({
            lede: 'What the cap costs, stated rather than hidden:',
            rows: [
              { what: 'Measured hardness', n: '412 mg/L' },
              { what: 'Hardness used', n: '400 mg/L' },
              { what: 'Zinc criterion at 412', n: '8.19 µg/L' },
              { what: 'Zinc criterion at the cap', n: '8.00 µg/L' },
              { what: 'Outcomes that change', n: '0' },
            ],
            action: 'The conservative direction, and it is stated',
            cancel: 'Rule hardness-modified-tv v3',
            reversible:
              'The cap makes the criterion slightly stricter, never looser. Extrapolating the relationship past the range it was derived over would be the silent choice, and it would be the one that favours the operator.',
          }) +
          `<p class="mk-tight mk-muted">Rule version <code class="mk-file">${esc(H.ruleVersion)}</code> — bound to the criteria set, not to the instance.</p>`,
      ),
    ) +
    '<h2 class="mk-h2">What it produced, analyte by analyte</h2>' +
    table({
      caption: 'Base value, exponent, resulting criterion, and the result it was compared against.',
      head: ['Analyte', 'Base value', 'Exponent', 'Criterion here', 'Result', 'Outcome', 'Note'],
      rows: H.derived.map((d) => [
        esc(d.analyte),
        `<span class="mk-num">${esc(d.base)}</span>`,
        `<span class="mk-num">${esc(d.slope)}</span>`,
        `<strong class="mk-num">${esc(d.criterion)}</strong>`,
        `<span class="mk-num${d.outcome === 'exceedance' ? ' mk-num--bad' : ''}">${esc(d.result)}</span>`,
        `<span class="sf-result">${mark(d.outcome, 'ANZG 2018 · 95%')}<span style="margin-left:.4rem">${esc(d.outcome)}</span></span>`,
        `<span class="mk-muted">${esc(d.note)}</span>`,
      ]),
      kind: 'matrix',
      label: 'Hardness-modified criteria',
    }) +
    C.card({
      tone: 'bad',
      head: '<span class="mk-queue__kind">Why this screen exists</span>',
      body: `<p class="mk-tight">${esc(H.whatIfWrong)}</p>` +
        '<p class="mk-tight">So the hardness result is not a supporting analyte on a crosstab. It is an input to three criteria, and it is treated here as what it is — with its own reconciliation, its own cross-check and its own place in the lineage of every value it governs.</p>',
    })
  );
};

/**
 * The results that could not be assessed.
 *
 * The exceedance register is right to exclude them and wrong to leave them
 * nowhere. A documented incumbent failure is exactly this state rendered as a
 * pass, and neither incumbent has a register of it in any form.
 */
/*
 * Wave 7: the register is derived from the crosstab rather than typed beside
 * it, and two things fell out of that. MW11's row went with the blanked column
 * — a bore that produced no sample produced no unassessable result. And the
 * five PFAS non-detects arrived: their limit of reporting sits above the ANZG
 * guideline value exactly as cadmium's does, the grid has always marked them
 * indeterminate, and a register claiming *one row per result per criterion
 * that could not be applied* was quietly holding only one of the two analytes.
 * Deriving it is what made that visible.
 */
const indeterminateRegister = () => {
  const byAnalyte = (name) => INDETERMINATE.filter((i) => i.analyte === name);
  const cadmium = byAnalyte('Cadmium (filtered)');
  const pfas = byAnalyte('PFOS + PFHxS');
  const cost = INDETERMINATE_QUOTE.perSample * cadmium.length;
  return (
  head('Could not be assessed', 'Results where nothing can be said either way, and what it would take to change that.', {
    route: '/projects/:projectId/exceedances (could not be assessed)',
    toolbar: C.exportMenu() + C.btn('Add to the report', 'primary'),
  }) +
  stats([
    // Counted off the register rather than typed onto it. The 7 here was a
    // literal, and it stopped being true the moment MW11's crosstab column was
    // blanked: a bore that produced no sample produced no unassessable result.
    stat(String(INDETERMINATE.length), 'could not be assessed', 'warn'),
    stat(String(new Set(INDETERMINATE.map((i) => i.analyte)).size), 'analytes affected'),
    stat(`${new Set(INDETERMINATE.map((i) => i.location)).size} of ${CROSSTAB_SHAPE.sampledColumns.length}`, 'locations sampled this round'),
    stat(`$${cost}`, 'to close the cadmium half', 'good'),
  ]) +
  notice(
    'warning',
    'This is a finding, and it belongs in the report.',
    `${INDETERMINATE.length} results were reported below a limit of reporting that sits above the guideline value — ${cadmium.length} cadmium and ${pfas.length} PFAS totals. Nothing was measured either way. They are not compliant and they are not exceedances, and writing them into either column is the single most consequential error available here; a support thread on an incumbent records exactly that happening by default.`,
  ) +
  notice(
    'default',
    'Two analytes, and only one of them is a purchasing decision.',
    `Cadmium is a reporting limit the laboratory can lower for money, and the panel below prices it. The PFAS totals are not the same problem: the ANZG 2018 guideline value for the sum is ${esc(ANALYTES.find((a) => a.name === 'PFOS + PFHxS').a)} ng/L and the limit of reporting on the suite is ${esc(PFAS_LIMITS.lor.toFixed(1))} ng/L, which is where commercial USEPA 1633 reporting sits. No amount of money moves that this quarter, so the honest answer for those rows is that they stay unassessable and the report says so — which is what this register exists to make possible.`,
  ) +
  notice(
    'default',
    `${esc(CROSSTAB_SHAPE.emptyColumns.join(', '))} appears nowhere on this register, and that is stated rather than left to be noticed.`,
    `The bore has no row here because it has no result. A result that could not be assessed is still a result — it was reported, it carries a limit of reporting, and a criterion sat above it. A bore that was <a class="mk-ref" href="#field-capture">dipped twice and found dry</a> has none of those, and a row saying the laboratory reported &lt; 1.0 µg/L on a sample nobody collected would be a worse claim than <em>could not be assessed</em>. So this register runs over the ${CROSSTAB_SHAPE.sampledColumns.length} locations that returned water, and <a class="mk-ref" href="#crosstab">the crosstab</a> draws the same absence as a column that is present and empty.`,
  ) +
  table({
    caption: 'One row per result per criterion that could not be applied to it.',
    head: ['Location', 'Analyte', 'Reported', 'Reporting limit', 'Criterion', 'Set', 'Limit exceeds criterion by', 'What would close it'],
    rows: INDETERMINATE.map((i) => [
      loc(i.location),
      esc(i.analyte),
      `<span class="mk-num">${esc(i.reported)}</span>`,
      `<span class="mk-num">${esc(i.lor)}</span>`,
      `<span class="mk-num">${esc(i.criterion)}</span>`,
      `<span class="mk-muted">${esc(i.set)}</span>`,
      `<span class="mk-num mk-num--warn">${esc(i.gap)}</span>`,
      esc(i.close),
    ]),
    kind: 'matrix',
    label: 'Results that could not be assessed',
  }) +
  cols(
    panel(
      'Closing it is a purchasing decision, so the screen makes it one',
      C.blastRadius({
        lede: 'Moving cadmium to ICP-MS/MS at a 0.1 µg/L reporting limit:',
        rows: [
          // $18 per sample, quoted by the laboratory on the register above.
          { what: 'Results that become assessable', n: `${cadmium.length} per round` },
          { what: 'Additional cost per round', n: `$${cost}` },
          { what: 'Additional cost per year', n: `$${cost * 4}` },
          { what: 'Criterion the new limit sits below', n: '0.54 µg/L — by 5.4×' },
          { what: 'Rounds of history this fixes', n: '0 — it reaches forward only' },
        ],
        action: 'Raise with the laboratory',
        cancel: 'Keep reporting it as unassessable',
        reversible:
          'Nothing here changes a stored result. A method change from the next round is recorded as a comparability note on the plate, because a reporting limit that steps down mid-series is visible in every figure that spans the change.',
      }),
    ),
    panel(
      'What the report says',
      '<p class="mk-tight">Generated into §3, and worded so a non-technical reader cannot mistake it for a clean result:</p>' +
        C.card({
          tone: 'neutral',
          head: '<span class="mk-queue__kind">Report §3 — Data quality</span>',
          body:
            `<p class="mk-tight"><em>Cadmium was reported by the laboratory at a limit of reporting of 1.0 µg/L. The applicable ANZG 2018 95% species protection guideline value at the measured hardness is 0.54 µg/L. The reporting limit therefore sits above the guideline value and cadmium could not be assessed against it at any location sampled this round. These results are not reported as compliant. A method offering a limit of reporting of 0.1 µg/L is available and is recommended from 2026 Q3. The same applies to the PFOS + PFHxS sum at ${pfas.length} locations, where the guideline value of ${esc(ANALYTES.find((a) => a.name === 'PFOS + PFHxS').a)} ng/L sits below the limit of reporting achievable by USEPA 1633.</em></p>`,
        }) +
        `<p class="mk-tight">Compare the alternative, which is what a product with no state for this produces: ${INDETERMINATE.length} rows of <code class="mk-file">0.001</code> in a compliance column, and a reader with no way to know.</p>`,
    ),
  )
  );
};

/**
 * Purge and stabilisation — the deep view of the series the session shows.
 *
 * **Refolded 1 September 2026 (wave 6, PR-1c).** The review said the
 * stabilisation series is "important enough that I wouldn't hide it one level
 * below the principal field workflow", so it now runs inline in the bore
 * session on `#field-capture`. That does not make this screen redundant: it
 * makes it the *deep* view — every reading against every tolerance, the
 * field-against-laboratory conductivity check, the failing bore in full, and
 * the record a reviewer challenges — and it stays the product path
 * (`/projects/:projectId/purge`) while field capture stays a proposal.
 *
 * The two read **one source**. `PURGE` is derived from the MW05 session in
 * `FIELD_ROUND`; the readings on this screen and the readings inside the
 * session are the same array, and the volumes, the verdict and the
 * stabilisation flags are computed from it rather than written twice.
 */
const purgeLog = () => {
  const P = PURGE;
  const T = P.tolerance;
  const S = P.session;
  const failing = PURGE.failing;
  const fp = failing.session.purge;
  const digits = { ph: 2, ec: 0, do: 2, redox: 0, turb: 1, temp: 1 };
  const readingRow = (r) => [
    `<span class="mk-num">${esc(r.t)}</span>`,
    `<span class="mk-num">${r.swl.toFixed(2)}</span>`,
    ...T.params.map((param) => {
      const holding = r.window && r.holding.includes(param.key);
      return (
        `<span class="mk-num${r.window && !holding ? ' mk-num--warn' : ''}">${esc(r[param.key].toFixed(digits[param.key]))}</span>` +
        (r.window
          ? `<span class="sf-visually-hidden"> ${esc(param.label)} — ${holding ? 'holding within' : 'still moving outside'} ${esc(param.text)}</span>`
          : '')
      );
    }),
    !r.window
      ? '<span class="mk-muted">not yet three readings</span>'
      : r.stable
        ? C.status(`all ${T.params.length} holding`, 'good')
        : `${C.status(`${r.moving.length} still moving`, 'warn')}<small>${esc(r.moving.map((k) => T.params.find((x) => x.key === k).label.toLowerCase()).join(', '))}</small>`,
  ];
  const heads = [
    'Time',
    'Depth to water<small>m btoc</small>',
    ...T.params.map((param) => `${esc(param.label)}${param.unit ? `<small>${esc(param.unit)}</small>` : ''}`),
    'Three-reading window',
  ];
  const last = P.readings.at(-1);

  return (
    head(`Purge and stabilisation — ${esc(P.location)}`, 'What the bore was doing before the sample was taken, reading by reading.', {
      route: '/projects/:projectId/purge',
      toolbar: C.exportMenu() + C.btn('Open the bore session'),
    }) +
    notice(
      'default',
      'A sample is defensible because the parameters had stabilised, not because a number was written in a box.',
      'Three consecutive readings within tolerance is the test. Without the readings behind it, every certificate, lineage record and evaluation downstream rests on an assertion nobody can check — and it is the first thing a reviewer challenges when a result is inconvenient. This screen is the deep view of the series the <a class="mk-ref" href="#field-capture">bore session</a> carries inline: the same readings, read once and drawn twice, with the tolerances and the working shown here.',
    ) +
    facts([
      ['Round', `<a class="mk-ref" href="#events">${esc(P.round)}</a>`],
      ['Sample', `<span class="mk-file mk-file--id">${esc(P.sample)}</span>`],
      ['Method', esc(P.method)],
      ['Pump and intake', `${esc(P.pump)} · ${esc(P.intake)}`],
      ['Flow rate', esc(P.rateText)],
      ['Purging started', `<span class="sf-instant">${esc(P.startedAt)} AWST</span>`],
      ['Sample collected', `<span class="sf-instant">${esc(P.sampledAt)} AWST</span> <span class="mk-muted">— ${esc(P.collected)}</span>`],
      ['Volume purged', `<strong>${esc(P.volumeText)}</strong> <span class="mk-muted">— ${P.minutes} min × ${esc(P.rateText)}, computed</span>`],
      ['Drawdown', esc(P.drawdown)],
      ['Measuring point', esc(S.measuringPoint)],
    ]) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The readings</h2>' +
    table({
      caption: `Tolerances — ${T.params.map((x) => `${x.label.toLowerCase()} ${x.text}`).join(' · ')}.`,
      head: heads,
      rows: P.readings.map(readingRow),
      kind: 'matrix',
      label: 'Purge and stabilisation readings',
    }) +
    `<p class="mk-tight">A parameter is <strong>holding</strong> when the spread across the three readings in the window — largest minus smallest — sits inside its tolerance, taken against their mean where the tolerance is a percentage. Every flag in the last column is computed from the numbers to its left rather than recorded beside them, which is the difference between a stabilisation record and a note saying the bore stabilised. The looser reading of ± 3% — <em>each</em> reading within 3% of the mean — allows twice the movement and would have called this bore stable ${P.readings.findIndex((r) => r.stable) === -1 ? 'earlier' : 'one reading earlier'}.</p>` +
    C.receipt({
      headline: esc(P.verdict),
      facts: [
        ['Stabilised at', `${esc(P.stabilisedAt)} AWST`],
        ['Readings in tolerance', `${T.window} consecutive, on all ${T.params.length} parameters`],
        ['Collected', `${esc(P.sampledAt)} AWST`],
        ['Field conductivity at collection', `${last.ec} µS/cm`],
      ],
      next: { label: 'The results this sample produced', target: 'crosstab' },
    }) +
    cols(
      panel(
        'The field conductivity and the laboratory conductivity should agree, and here they do',
        table({
          head: ['Measured', 'Value', 'Difference'],
          rows: [
            ['Field, at collection', `<span class="mk-num">${last.ec} µS/cm</span>`, '—'],
            ['Laboratory, on receipt', '<span class="mk-num">3396 µS/cm</span>', `<span class="mk-num mk-num--good">${(((last.ec - 3396) / last.ec) * 100).toFixed(1)}%</span>`],
          ],
        }) +
          '<p class="mk-tight">A large disagreement between the two means the sample changed between the bore and the bench — degassing, a temperature artefact, or a mislabelled container — and it is worth catching before the whole suite is interpreted. It is a consistency check that costs nothing and nobody runs it.</p>' +
          '<p class="mk-tight mk-muted">The percentage is computed from the two numbers beside it. A difference typed next to two values it does not follow from is the commonest way a check like this survives being wrong.</p>',
      ),
      panel(
        'Every bore on the round, and how its series ended',
        table({
          caption: 'Six purges, one round. The outcome column is the series’ own verdict, not a summary of it.',
          head: ['Bore', 'Readings', 'Purged', 'Stabilised at', 'Outcome'],
          scroll: true,
          label: 'Stabilisation outcome by bore',
          rows: FIELD_ROUND.sessions
            .filter((s) => s.purge)
            .map((s) => [
              loc(s.location),
              `<span class="mk-num">${s.purge.readings.length}</span>`,
              `<span class="mk-num">${esc(s.purge.volumeText)}</span>`,
              s.purge.stabilised
                ? `<span class="mk-num">${esc(s.purge.stabilisedAt)}</span>`
                : '<span class="mk-num mk-num--nil">never</span>',
              C.status(s.purge.outcome, s.purge.stabilised ? 'good' : 'warn'),
            ]),
        }) +
          `<p class="mk-tight">${FIELD_ROUND.preflight.stabilised} of ${FIELD_ROUND.preflight.purges} purges stabilised. The seventh planned location was never purged — <a class="mk-ref" href="#field-capture">${esc(Q2_OVERDUE.location)} was dry</a> — so it is in neither half of that fraction, which is the arithmetic the data quality assessment used to get wrong.</p>`,
      ),
    ) +
    `<h2 class="mk-h2" style="margin-top:1.4rem">The bore that did not stabilise — ${esc(failing.location)}</h2>` +
    notice(
      'warning',
      esc(failing.what),
      `${esc(failing.consequence)} The series is below in full, because a judgement recorded as a sentence is a judgement nobody can check.`,
    ) +
    table({
      caption: `${esc(failing.location)} · ${fp.readings.length} readings, ${esc(fp.volumeText)} purged at ${esc(fp.rateText)} · tolerances as above.`,
      head: heads,
      rows: fp.readings.map(readingRow),
      kind: 'matrix',
      label: `Stabilisation readings at ${failing.location}`,
    }) +
    cols(
      panel(
        'What “did not stabilise” actually means here',
        `<p class="mk-tight">Five of the six parameters held: ${esc(fp.heldAtEnd.join(', ').toLowerCase())} were all inside tolerance at the last reading. <strong>${esc(fp.neverHeld.join(' and '))}</strong> never was — it stayed above 10 NTU for every one of the ${fp.readings.length} readings and moved by more than ± 10% across every window of three, which is a bore mobilising fines rather than a bore settling.</p>` +
          '<p class="mk-tight">Stabilisation is reported <em>per parameter</em> as well as overall, because a purge recorded only as “not stabilised” tells a reviewer nothing about which measurement to distrust. Here it is exactly one, and it is the one that decides whether a filtered metal reads high.</p>' +
          C.card({
            tone: 'warn',
            head: `<span class="mk-queue__kind">${esc(failing.location)}</span><span class="mk-queue__age">${fp.readings.length} readings · ${esc(fp.volumeText)}</span>`,
            body:
              `<p class="mk-tight">${esc(failing.session.observations)}</p>` +
              `<p class="mk-tight">Total depth was dipped at this bore and nowhere else this round: ${esc(failing.session.totalDepthWhy)}.</p>`,
            foot: '<span class="mk-tag mk-tag--warn">Qualifier T carried to every metal result from this sample</span>',
          }),
      ),
      panel(
        'A judgement, recorded as one',
        '<p class="mk-tight">The field officer sampled anyway, which is the right call at a remote bore on a day rate — and the record makes it a stated judgement rather than an invisible one. A product that only accepted stabilised samples would simply have no record of this bore at all.</p>' +
          `<p class="mk-tight">The series outcome is one of three words and this is the second: <strong>Stable</strong> · <strong>Sampled by judgement</strong> · <strong>Purged dry</strong>. It travels with the sample: <a class="mk-ref" href="#qc">QA/QC</a> reads it as the stabilisation check, and the qualifier it produced is applied by rule rather than by anybody deciding case by case.</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#field-capture">The session this series came from</a><a class="mk-btn" href="#qc">What QA/QC did with it</a><a class="mk-btn" href="#dqa">The representativeness objective</a><a class="mk-btn" href="#receipt">What arrived at the laboratory</a></div>`,
      ),
    )
  );
};

/**
 * The chain of custody — created in the field, sealed, transferred, received.
 *
 * **The New-Screen Test, answered.** A custody chain is a durable legal record
 * with a lifecycle of its own: it is raised at the first bore, it accumulates
 * containers over three days, it is sealed, it is handed to a courier, and it
 * is closed by a laboratory that may or may not agree with what it says.
 * `#receipt` owns exactly one moment of that — the condition the samples were
 * in when the box was opened — and nothing owned the rest. Journeys 1 and 5
 * both step through *eCOC* and both landed on nothing.
 *
 * **The label is `docs/GLOSSARY.md`'s, not the industry's.** The glossary has
 * no entry for "eCOC" and one for **custody transfer**: *one handover of a set
 * of samples from one party to another, with the time, both parties, and the
 * seal on the container.* So the screen is called Chain of custody — the
 * glossary's own phrase for the sequence those transfers make — and "COC" and
 * "eCOC" appear on it as what practitioners say, marked as such, rather than
 * as a term the product invents (QB-9, §5.9).
 *
 * `state: 'proposed'` is not on the register entry for this screen and that is
 * deliberate: `state` records what was true on 23 August 2026 and this screen
 * did not exist then. `added` carries its date instead, and the rail renders
 * that rather than a fabricated history.
 */
const chainOfCustody = () => {
  const C_ = CUSTODY_CHAIN;
  const D = C_.discrepancy;
  const SUB = C_.continues;
  const covered = EVENT_SAMPLES;
  const containers = covered.reduce((n, s) => n + s.containers, 0);
  const sealed = C_.transfers.find((t) => t.seal !== '—');
  return (
    head('Chain of custody — 2026-Q2-GW', 'Every hand that held these samples, from the bore to the laboratory bench.', {
      route: 'a proposal — not in the product',
      toolbar: C.exportMenu() + C.btn('Print the custody form'),
    }) +
    notice(
      'warning',
      'Proposed. The PRD names no chain-of-custody surface, and there is no route for one.',
      'FR-1.6 gets the samples as far as the event and FR-3.8 picks them up at the certificate; the days in between are where a defensibility argument is actually won or lost. <a class="mk-ref" href="#receipt">Receipt and custody</a> draws the laboratory end of the chain because that is where the record used to start — which is the tell. A chain reconstructed afterwards from a scanned form proves that a form was signed; it does not answer the question a challenge asks, which is whether these samples were ever unaccounted for. This screen argues for itself and is filed under Sampling events on that argument. It is called <em>Chain of custody</em> rather than <em>eCOC</em> because the glossary has an entry for <strong>custody transfer</strong> and none for the acronym: practitioners call the paper form a COC and the electronic one an eCOC, and both words are named here once rather than becoming the product’s (QB-9).',
    ) +
    facts([
      ['Custody record', `<span class="mk-file">${esc(C_.id)}</span>`],
      ['Round', `<a class="mk-ref" href="#events">${esc(C_.round)}</a>`],
      ['Raised', `${esc(C_.raisedBy)} · <span class="sf-instant">${esc(C_.raisedAt)}</span>`],
      ['Consigned to', esc(C_.laboratory)],
      ['Work order', `<a class="mk-ref" href="#batches">${esc(C_.workOrder)}</a>`],
      ['Containers', `<span class="mk-num">${C_.containers}</span> · seals ${esc(C_.seals)}`],
      ['State', C.status(C_.state, 'good')],
    ]) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The transfers</h2>' +
    table({
      caption: 'One row per handover: both parties, the time in the site’s own zone, and the seal in force.',
      head: ['#', 'When · AWST', 'From', 'To', 'Containers', 'Seal', 'State'],
      kind: 'matrix',
      label: 'Custody transfers for 2026-Q2-GW',
      rows: C_.transfers.map((t) => [
        `<span class="mk-num">${t.seq}</span>`,
        `<span class="sf-instant">${esc(t.at.replace(' AWST', ''))}</span>`,
        esc(t.from),
        esc(t.to),
        `<span class="mk-num">${t.containers}</span>`,
        t.seal === '—' ? '<span class="mk-num mk-num--nil">—</span>' : `<span class="mk-file">${esc(t.seal)}</span>`,
        t.state === 'exception' ? C.status('exception', 'bad') : C.status('signed', 'good'),
      ]),
    }) +
    `<p class="mk-tight">The rows are ordered by <strong>sequence</strong> rather than by time — two handovers can share a recorded minute, and a chain ordered only by the clock closes silently over a missing link. Here they run 1 to ${C_.transfers.length} with nothing missing between them, and that is the property worth having: a gap in the sequence is a hole somebody has to explain, where a gap in a list of timestamps is invisible. The last four rows are the ones <a class="mk-ref" href="#receipt">Receipt and custody</a> has always drawn — they are the same four rows, read from the same record, not a second copy of them.</p>` +
    C.blastRadius({
      lede: 'Sealing a cooler and handing it over — what that writes, before you do it:',
      rows: [
        { what: 'Transfers appended', n: '1 — appended, never edited' },
        { what: 'Containers committed to the consignment', n: `${containers} across ${covered.length} samples` },
        { what: 'Seal numbers frozen onto the transfer', n: `${sealed ? esc(sealed.seal) : '—'}` },
        { what: 'Samples that can still be added to this chain', n: '0 — a sealed cooler is closed' },
        { what: 'Rows that can be corrected afterwards', n: '0 — a correction supersedes and both entries stay readable' },
      ],
      action: 'Seal and hand over',
      cancel: 'Not yet — keep the chain open',
      reversible:
        'Not reversible in the ordinary sense. A transfer cannot be edited or deleted; a mistake is corrected by a superseding entry that names what it corrects, and both stay on the record. That is what makes the chain evidence rather than a document.',
      danger: true,
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">One seal number, written down twice, differently</h2>' +
    notice(
      'warning',
      `${esc(D.what)} — the field record says ${esc(C_.seals.split(', ')[1])} and the laboratory’s receiving form says 4427.`,
      `${esc(D.affects)} Both seals were found <em>intact</em>, which is a different check and it passed. The product has not chosen between the two numbers and will not: a transposition is the likeliest reading, and the likeliest reading is exactly what a custody challenge attacks.`,
    ) +
    cols(
      panel(
        'The two entries, side by side',
        facts([
          ['Field record', `<span class="mk-file">${esc(D.field)}</span>`],
          ['Laboratory receiving form', `<span class="mk-file">${esc(D.laboratory)}</span>`],
          ['Raised', `${esc(D.raisedBy)} · <span class="sf-instant">${esc(D.raisedAt)}</span>`],
          ['Assigned to', esc(D.assignedTo)],
          ['State', C.status(D.state, 'warn')],
        ]) +
          `<p class="mk-tight mk-muted"><strong>Refused:</strong> ${esc(D.refused)}</p>`,
      ),
      panel(
        'The ways out, each with what it does',
        table({
          caption: 'Every option says what it writes before it is taken (QB-7). None of them deletes anything.',
          head: ['Option', 'What it does', ''],
          scroll: true,
          label: 'Ways to resolve the seal discrepancy',
          rows: D.ways.map((w) => [esc(w.label), `<span class="mk-muted">${esc(w.detail)}</span>`, C.btn('Take this')]),
        }),
      ),
      // The consequence column is the wide one. A table whose "what it does"
      // reads four words to a line is a form, and the whole point of this panel
      // is that the consequence is easier to read than the button beside it.
      '2fr 3fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">What this chain covers</h2>' +
    cols(
      table({
        caption: `The samples in the consignment, and the containers each contributed. They add to ${containers}, which is what the seal covered and what the laboratory reconciled on arrival.`,
        head: ['Sample', 'Location or role', 'Containers'],
        scroll: true,
        label: 'Samples covered by this chain of custody',
        rows: [
          ...covered.map((s) => [
            `<span class="mk-file">${esc(s.id)}</span>`,
            s.qc === '—' ? loc(s.location) : `<span class="mk-tag mk-tag--new">${esc(s.qc)}</span>`,
            `<span class="mk-num">${s.containers}</span>`,
          ]),
          ['<strong>Total</strong>', `<span class="mk-muted">${covered.length} samples · <a class="mk-ref" href="#events">the manifest</a></span>`, `<span class="mk-num"><strong>${containers}</strong></span>`],
        ],
      }),
      panel(
        'Where this record stops, and what picks it up',
        '<p class="mk-tight"><strong>This screen owns</strong> the chain: raising it in the field, the containers it accumulates, the seals, every transfer up to and including the handover the laboratory signs for, and the one below that continues past it. It owns the discrepancy above, because a disagreement about a seal is a custody question.</p>' +
          '<p class="mk-tight"><strong><a class="mk-ref" href="#receipt">Receipt and custody</a> owns</strong> what the laboratory found when it opened the box — cooler temperature, preservation, breakages, holding time on arrival — and the results those explain. The cracked sulfate bottle is its finding, not this one’s.</p>' +
          '<p class="mk-tight">After that the round leaves custody altogether and becomes a deliverable: the certificate and the rows that come back are <a class="mk-ref" href="#imports">Import runs</a>. Three screens, one seam each, and each seam named on both sides of it.</p>' +
          `<div class="mk-actions"><a class="mk-btn" href="#receipt">What arrived, and in what condition</a><a class="mk-btn" href="#field-capture">The field round that filled it</a></div>`,
      ),
      '3fr 2fr',
    ) +
    /*
     * The hop the provenance chain went looking for and did not find (PR-3a).
     *
     * Every one of the 38 containers reconciled at Pilbara Analytical
     * Services, and the PFAS certificate is Yarra Regional's. The only reading
     * under which both are true is a subcontract, and a subcontract is a
     * custody transfer by the glossary's definition — so it is a chain, with
     * its own identifier and its own receipt, rather than two more rows on the
     * field chain above. Appending it there would have moved the four rows the
     * receipt screen draws and made a laboratory-to-laboratory handover read
     * as a field one.
     */
    '<h2 class="mk-h2" style="margin-top:1.4rem">Where the chain continues — the subcontracted fraction</h2>' +
    `<p class="mk-tight">${esc(SUB.why)} So one container leaves ${esc(CUSTODY_CHAIN.laboratory)} again, and the record does not stop at the first laboratory door.</p>` +
    cols(
      table({
        caption: `Chain ${SUB.id}, a continuation of ${SUB.parent}. Its own sequence, because it is its own chain — and a reader following a PFAS result arrives here rather than at a gap.`,
        head: ['#', 'When · AWST', 'From', 'To', 'Containers', 'Seal', 'State'],
        kind: 'matrix',
        label: 'Custody transfers for the subcontracted PFAS fraction',
        rows: SUB.transfers.map((t) => [
          `<span class="mk-num">${t.seq}</span>`,
          `<span class="sf-instant">${esc(t.at.replace(' AWST', ''))}</span>`,
          esc(t.from),
          esc(t.to),
          `<span class="mk-num">${t.containers}</span>`,
          `<span class="mk-file">${esc(t.seal)}</span>`,
          C.status('signed', 'good'),
        ]),
      }),
      panel(
        'What the second laboratory found, and the clock it started',
        facts([
          ['Sample', `<span class="mk-file">${esc(SUB.sample)}</span>`],
          ['Received', `<span class="sf-instant">${esc(SUB.receipt.at)}</span> · ${esc(SUB.receipt.by)}`],
          ['Cooler temperature', `<span class="mk-num">${esc(SUB.receipt.temperature)}</span> against ${esc(SUB.receipt.limit)}`],
          ['Seal', `<span class="mk-file">${esc(SUB.receipt.seal)}</span>`],
          ['Reconciled', esc(SUB.receipt.reconciled)],
          ['Holding time', `<span class="mk-num">${SUB.holding.used}</span> of <span class="mk-num">${SUB.holding.window}</span> days used`],
          ['Certificate', `<span class="mk-file">${esc(SUB.certificate)}</span> · batch <a class="mk-ref" href="#batches">${esc(SUB.workOrder)}</a>`],
        ]) +
          `<p class="mk-tight mk-muted">${esc(SUB.holding.rule)}. Collected ${esc(SUB.holding.collected)}, extracted ${esc(SUB.holding.extracted)}. The trip blank <span class="mk-file">${esc(SUB.travellingQC)}</span> covers the transport up to the first receipt; nothing travelled with this bottle on the second leg, and the seal and the temperature are what answer for it.</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#lineage">The result this fraction produced</a></div>`,
      ),
      '3fr 2fr',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">A round with no chain yet</h2>' +
    C.stateBlock('empty', {
      headline: '2026-Q3-GW has no chain of custody, because it has not been collected.',
      detail:
        `There are ${EVENTS.length} rounds on this project and ${EVENTS.filter((e) => e.state !== 'planned').length} of them have one. This is the other: planned, with a window, a location list and an analyte suite, and no samples yet. That is a different sentence from <em>no rounds have ever been sampled</em>, and a screen printing “No data” for both would have said nothing in either case. The chain is raised at the first bore, on the device, before the first container is filled — not typed up afterwards from a notebook. Raising one writes an empty record attributed to you, and it can be discarded until the first transfer is signed.`,
      action: 'Raise the chain for 2026-Q3-GW',
      secondary: 'Open the planned round',
      // Raising is the one control here that is not irreversible, and it says
      // so rather than leaving the reader to infer it from the two above.
    })
  );
};

/** What arrived at the laboratory, in what condition, and who had held it. */
const sampleReceipt = () => (
  head('Receipt and custody', 'The condition the samples arrived in, and everyone who held them.', {
    route: '/projects/:projectId/receipt',
    toolbar: C.exportMenu() + C.btn('Print the custody form'),
  }) +
  facts([
    ['Work order', `<span class="mk-file">${esc(RECEIPT.batch)}</span>`],
    ['Courier', esc(RECEIPT.courier)],
    ['Dispatched', `<span class="sf-instant">${esc(RECEIPT.dispatched)}</span>`],
    ['Received', `<span class="sf-instant">${esc(RECEIPT.received)}</span>`],
    ['In transit', esc(RECEIPT.transit)],
  ]) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Condition on arrival</h2>' +
  table({
    caption: 'The cooler receipt, as a record rather than as a scanned page.',
    head: ['Check', 'Found', 'Acceptance', 'Outcome'],
    rows: RECEIPT.checks.map((c) => [
      esc(c.what),
      `<strong>${esc(c.found)}</strong>` +
        (c.note ? `<br><span class="mk-muted">${esc(c.note)}</span> <a class="mk-ref" href="#ecoc">Chain of custody</a>` : ''),
      `<span class="mk-muted">${esc(c.limit)}</span>`,
      c.outcome === 'n/a'
        ? '<span class="mk-num mk-num--nil">n/a</span>'
        : C.status(c.outcome, c.outcome === 'pass' ? 'good' : c.outcome === 'warn' ? 'warn' : 'bad'),
    ]),
  }) +
  notice(
    'warning',
    'This is why MW09 is one result short.',
    esc(RECEIPT.consequence),
  ) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Chain of custody</h2>' +
  C.pipeline(
    CUSTODY.map((c) => ({
      name: `${c.from} → ${c.to}`,
      detail: `${c.at} · ${c.what}`,
      state: c.state === 'exception' ? 'fail' : 'done',
    })),
  ) +
  cols(
    panel(
      'Custody is a chain, not a PDF',
      '<p class="mk-tight">A signed form scanned into a folder proves a form was signed. It does not answer the question a challenge actually asks: <em>was this sample ever unaccounted for</em>.</p>' +
        '<p class="mk-tight">Every transfer above is a row with a time, two parties and a seal number, so an unbroken chain is a query rather than somebody reading four pages of handwriting. The one exception in it is marked as an exception and carries forward to the result it affected.</p>',
    ),
    panel(
      'Holding time starts here, not at the laboratory bench',
      table({
        head: ['Analyte', 'Window', 'Collected', 'Analysed', 'Used', 'Outcome'],
        scroll: true, label: 'Holding-time windows',
        rows: [
          ['Nitrate as N', '2 days', '2026-05-14 07:30', '2026-05-20 11:04', '<span class="mk-num mk-num--bad">6 d</span>', C.status('exceeded', 'bad')],
          ['Dissolved metals', '180 days', '2026-05-13 08:40', '2026-05-17 14:22', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
          ['Sulfate as SO₄', '28 days', '2026-05-14 07:30', '2026-05-18 09:11', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
          ['PFAS', '28 days', '2026-05-13 08:40', '2026-05-17 09:50', '<span class="mk-num">4 d</span>', C.status('within', 'good')],
        ],
      }) +
        '<p class="mk-tight">The clock runs from collection, through transport and receipt, to analysis — and the transit above consumed one of nitrate’s two days before the laboratory had touched it. A holding time measured from receipt would have called this compliant.</p>',
    ),
  )
);

/** QC acceptance criteria, versioned exactly as guideline values are. */
const qcLimits = () => (
  head('Data quality objectives', 'The acceptance limits every QC check is measured against, and where each one comes from.', {
    route: '/projects/:projectId/objectives',
    toolbar: C.exportMenu() + C.btn('New version'),
  }) +
  notice(
    'default',
    'A guideline value gets a version, an effective date and a source. A QC limit is the same kind of object and was not treated as one.',
    'A regulator asking “why 30%?” is asking exactly the question they ask about a criterion. Hard-coding the answer means the product cannot say, and means a customer whose own data quality objectives are tighter has no way to apply them without a release.',
  ) +
  /*
   * PR-2c. The version pairing, carried consistently with `#qc`: the round
   * was assessed under 2025.2 and 2026.1 is what is in force now, so this
   * screen shows both and every rule that moved says what it moved to.
   */
  table({
    caption: 'Two versions of one set. A limit is versioned with an effective span exactly as a criteria set is, and a finding carries the version it was raised under.',
    head: ['Version', 'Effective', 'State', 'Approved', 'Why this version exists'],
    scroll: true,
    label: 'Data quality objective versions',
    rows: [
      [
        `<strong>${esc(DQO.used.version)}</strong>`,
        `<span class="sf-instant">${esc(DQO.used.effective)}</span>`,
        `${C.status('superseded', 'neutral')}<small>used for ${esc(ROUND.code)}</small>`,
        '<span class="mk-muted">—</span>',
        `<span class="mk-muted">${esc(DQO.used.why)}</span>`,
      ],
      [
        `<strong>${esc(DQO.current.version)}</strong>`,
        `<span class="sf-instant">${esc(DQO.current.effective)}</span>`,
        C.status('in force', 'good'),
        `${esc(DQO.current.by)}<small>${esc(DQO.current.approved)}</small>`,
        `<span class="mk-muted">${esc(DQO.current.why)}</span>`,
      ],
    ],
  }) +
  `<p class="mk-tight"><strong>${esc(DQO.used.version)} was used for ${esc(ROUND.code)} · ${esc(DQO.current.version)} is current.</strong> The round\u2019s findings were raised on <span class="sf-instant">${esc(DQO.raisedAt)}</span>, before ${esc(DQO.current.version)} took effect, and they keep the version they were judged under \u2014 the span reaches forward only. <a class="mk-ref" href="#qc">The QA/QC workspace</a> names the same pair on its re-run control, and computes what re-running would and would not move.</p>` +
  facts([
    ['Set', `<strong>${esc(QC_LIMITS.set)}</strong>`],
    ['Shown below', `${esc(DQO.used.version)} \u2014 the version this round was assessed under`],
    ['In force now', `${esc(DQO.current.version)}, from ${esc(DQO.current.effective)}`],
    ['Basis', esc(QC_LIMITS.basis)],
  ]) +
  table({
    caption: 'Each limit with the population it applies to, what happens where it does not apply, and what 2026.1 changed it to.',
    head: ['Check', `Limit<small>${esc(DQO.used.version)}</small>`, 'Applies when', 'Otherwise', `Under ${esc(DQO.current.version)}`, 'Source'],
    rows: QC_LIMITS.rules.map((r) => [
      `<strong>${esc(r.check)}</strong>` + (r.silent ? `<small>states no consequence</small>` : ''),
      `<span class="mk-num">${esc(r.limit)}</span>`,
      esc(r.applies),
      r.fallback && r.fallback !== '\u2014' ? `<span class="mk-muted">${esc(r.fallback)}</span>` : '<span class="mk-num mk-num--nil">\u2014</span>',
      r.next ? `<span class="mk-num mk-num--warn">${esc(r.next)}</span>` : '<span class="mk-muted">unchanged</span>',
      `<span class="mk-muted">${esc(r.source)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Data quality objectives',
  }) +
  `<p class="mk-tight">Two of the ten rules moved in ${esc(DQO.current.version)}, and the second is the interesting one. The matrix spike rule <strong>states a limit and no consequence</strong> \u2014 which is why a failed spike on <a class="mk-ref" href="#qc">${esc(METALS_BATCH.id)}</a> raises a finding that needs a hydrogeologist rather than a qualifier that applies itself. The blank rule had the same shape until ${esc(DQO.current.version)} gave it one, and that single addition is what moves one finding on the last round out of the decision queue. A rule that states a number and not what follows from it is a rule that hands every instance of itself to a person.</p>` +
  cols(
    panel(
      'The applicability rule is the part that was wrong',
      C.card({
        tone: 'bad',
        head: '<span class="mk-queue__kind">Relative percent difference near the limit of reporting</span>',
        body:
          '<p class="mk-tight">RPD is only meaningful when both results sit well above the reporting limit. A duplicate pair of <code class="mk-file">1.2</code> and <code class="mk-file">1.8</code> µg/L against a 1.0 µg/L limit gives an RPD of 40% and means nothing at all — the two numbers are the same measurement inside its own uncertainty.</p>' +
          '<p class="mk-tight">Applying the 30% limit to every pair raises a failure on almost every near-limit duplicate, and a QC flag that is usually noise is a QC flag people stop reading. Above 5 × LOR the percentage applies; below it, an absolute difference of 2 × LOR does.</p>',
        foot: '<span class="mk-tag mk-tag--good">Zinc at MW05: 21.4 and 31.6 µg/L, both above 5 × LOR — the 38.2% failure is real</span>',
      }),
    ),
    panel(
      'Changing a limit reaches forward only',
      `<p class="mk-tight">${esc(QC_LIMITS.changed)}</p>` +
        `<p class="mk-tight">And it happened again on ${esc(DQO.current.effective.replace(' \u2192', ''))}: ${DQO.changes.map((c) => `<strong>${esc(c.check)}</strong> went from ${esc(c.was)} to ${esc(c.now)}`).join(', and ')}.</p>` +
        table({
          caption: `What ${esc(DQO.current.version)} did to the round already assessed under ${esc(DQO.used.version)} \u2014 computed on <a class="mk-ref" href="#qc">the QA/QC workspace</a>, not promised here.`,
          head: ['', 'Count'],
          rows: [
            ['QC outcomes rewritten on the last round', `<span class="mk-num mk-num--nil">${QC_DECISIONS.rerunUnderCurrent.outcomesMoved}</span>`],
            ['Findings that stop needing a hydrogeologist', `<span class="mk-num mk-num--good">${QC_DECISIONS.rerunUnderCurrent.conceptsMoved}</span>`],
            ['Results a rule would newly qualify', `<span class="mk-num mk-num--warn">${QC_DECISIONS.rerunUnderCurrent.resultsNewlyQualified}</span>`],
            ['Reports already issued that change', '<span class="mk-num mk-num--nil">0</span>'],
          ],
        }) +
        C.blastRadius({
          lede: `Tightening the field duplicate limit again \u2014 from ${esc(DQO.changes[0].now)} to \u2264 20% \u2014 would:`,
          rows: [
            { what: 'Future pairs newly failing, on last year\u2019s data', n: '4' },
            { what: 'Historical QC outcomes rewritten', n: '0' },
            { what: 'Reports already issued that would change', n: '0' },
            { what: 'New version created', n: '1 \u2014 2026.2, effective on a date you choose' },
          ],
          action: 'Create version 2026.2',
          reversible:
            `A limit is versioned with an effective date, exactly as a criteria set is. A result evaluated under ${esc(DQO.used.version)} keeps that verdict, and the version that produced it is on the result.`,
        }),
    ),
  )
);

/** The laboratory batch — what a QC result actually covers. */
const labBatches = () => (
  head('Laboratory batches', 'The unit QC is actually run on, and everything it qualifies.', {
    route: '/projects/:projectId/batches',
    toolbar: C.exportMenu(),
  }) +
  notice(
    'warning',
    'A control sample applies to a batch, not to a sample.',
    'Laboratories work in batches — a work order, prepared and analysed together — and one method blank, one control sample and one matrix spike cover all of them. Without the batch, “which results does this failed spike qualify?” has no answer, and a single failure either qualifies nothing or is applied to everything out of caution. Both are wrong.',
  ) +
  BATCHES.map(
    (b) =>
      panel(
        `${esc(b.id)} — ${esc(b.method)}`,
        facts([
          ['Laboratory', esc(b.lab)],
          ['Samples in the batch', `<span class="mk-num">${b.samples}</span>`],
          ['Prepared', esc(b.prepared)],
          ['Analysed', esc(b.analysed)],
          ['Accreditation', esc(b.nata)],
        ]) +
          table({
            head: ['QC sample', 'Identifier', 'Result', 'Outcome'],
            rows: b.qc.map((q) => [
              `<strong>${esc(q.kind)}</strong>`,
              `<span class="mk-file">${esc(q.id)}</span>`,
              esc(q.result),
              C.status(q.outcome, q.outcome === 'pass' ? 'good' : 'bad'),
            ]),
          }) +
          `<p class="mk-tight">${esc(b.consequence)}</p>`,
      ),
  ).join('') +
  panel(
      'One thing on this screen does not reconcile, and it is recorded rather than left to be noticed',
      `<p class="mk-tight">The PFAS batch <span class="mk-file">${esc(BATCHES[1].id)}</span> states <strong>${BATCHES[1].samples} samples</strong>. <a class="mk-ref" href="#events">The manifest</a> gives the two PFAS tests to one sample, <span class="mk-file">${esc(EVENT_SAMPLES.find((x) => x.tests === Math.max(...EVENT_SAMPLES.map((y) => y.tests))).id)}</span> — the only one carrying ${Math.max(...EVENT_SAMPLES.map((y) => y.tests))} tests and ${EVENT_SAMPLES.find((x) => x.tests === Math.max(...EVENT_SAMPLES.map((y) => y.tests))).containers} containers. <a class="mk-ref" href="#crosstab">The grid</a> carries a PFOS + PFHxS total at ${CROSSTAB_SHAPE.sampledColumns.length} locations. Three readings of how far one suite reached, and they are not the same number.</p>` +
        `<p class="mk-tight">All three predate this wave, which met the disagreement while <a class="mk-ref" href="#lineage">chaining the PFAS result to the records that produced it</a> and did not settle it. Settling it means choosing, and the cheapest choice empties four cells of the crosstab’s PFAS row — the row <a class="mk-ref" href="#criteria">the non-detect rule</a> is demonstrated over. That is a decision with a drawn argument on the other end of it rather than a count to nudge.</p>` +
        `<p class="mk-tight mk-muted">What the lineage does instead is name this batch and link it. Nothing drawn this wave rests on which reading wins.</p>`,
    ) +
  cols(
    panel(
      'A recovery below 100% is not simply “bad data”',
      '<p class="mk-tight">The zinc spike recovered 62% of what was added, reproducibly across the duplicate. That is matrix interference — something in this water suppresses the measurement — and it means the reported zinc is <strong>biased low</strong>.</p>' +
        '<p class="mk-tight">Which direction the bias runs is the whole finding. A result already above the guideline value, biased low, exceeds by <em>at least</em> the factor shown. The exceedance is strengthened, not weakened, and a screen that reported only “QC failed” would have left a practitioner to argue the opposite.</p>' +
        C.card({
          tone: 'bad',
          head: '<span class="mk-queue__kind">Zinc · MW05</span>',
          body: '<p class="mk-tight">Reported <span class="mk-num mk-num--bad">31.6 µg/L</span> against a criterion of 8.0 µg/L — 4.0×. Corrected for 62% recovery the true value is nearer <span class="mk-num mk-num--bad">51 µg/L</span>, or 6.4×. <strong>The reported value is used</strong>; the correction is stated and never silently applied, because a recovery-corrected number is an estimate and the certificate is a measurement.</p>',
        }),
    ),
    panel(
      'What the batch qualifies',
      table({
        head: ['Result', 'Location', 'Qualifier', 'Because'],
        rows: [
          ['Zinc (filtered)', loc('MW01A'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW03B'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW05'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW07'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
          ['Zinc (filtered)', loc('MW09'), tag('L', 'warn'), 'Batch matrix spike below limit — biased low'],
        ],
      }) +
        `<p class="mk-tight">Nine results <strong>would</strong> carry it, applied by the batch rather than by a person deciding case by case — which is how five of them get missed. None of them carries it yet: the propagation basis is <a class="mk-ref" href="#qc">an open decision</a>, because the certificate states no result-level qualifier and DQO ${esc(DQO.used.version)} names no consequence for a failed spike. The table above is what the decision would write, not what the record says.</p>`,
    ),
  )
);

/** Background comparison, and the derivation of a site-specific trigger value. */
const backgroundComparison = () => (
  head('Background comparison', 'Downgradient against reference, and where a site-specific trigger value comes from.', {
    route: '/projects/:projectId/background',
    toolbar: C.exportMenu() + C.btn('Adopt as a criteria set', 'primary'),
  }) +
  notice(
    'default',
    'At a mine this is the assessment, and a guideline value alone does not make it.',
    'A default guideline value answers “is this water safe”. Background answers “did we cause it”, which is the question a licence condition and a closure argument both turn on. Where no default exists — sulfate has none — background is the only criterion available.',
  ) +
  facts([
    ['Reference population', esc(BACKGROUND.reference)],
    ['Method', esc(BACKGROUND.method)],
  ]) +
  table({
    caption: 'Reference distribution against the downgradient bore, per analyte.',
    head: ['Analyte', 'Background median', '80th percentile', 'Default guideline', 'Trigger adopted', 'MW05', 'Verdict', 'Basis'],
    rows: BACKGROUND.rows.map((r) => [
      esc(r.analyte),
      `<span class="mk-num">${esc(r.bg)}</span>`,
      `<span class="mk-num">${esc(r.p80)}</span>`,
      `<span class="mk-muted">${esc(r.dg)}</span>`,
      `<span class="mk-num">${esc(r.stv)}</span>`,
      `<span class="mk-num mk-num--bad">${esc(r.mw05)}</span>`,
      `<strong>${esc(r.verdict)}</strong>`,
      `<span class="mk-muted">${esc(r.basis)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Background comparison',
  }) +
  cols(
    panel(
      'What the pattern says',
      `<p class="mk-tight">${esc(BACKGROUND.inference)}</p>` +
        C.card({
          tone: 'bad',
          head: '<span class="mk-queue__kind">The signature</span>',
          body:
            '<p class="mk-tight">Sulfate 6.2×, electrical conductivity 3.0× and hardness 2.5× above background, together, at one bore in a line of seven. Two bores upgradient in the same hydrostratigraphic unit show none of it, and the nested confined bore is at higher head so it is not coming from below.</p>' +
            '<p class="mk-tight">Any one of those numbers is arguable. The four together, with the flow direction, are not.</p>',
          foot: `<a class="mk-btn mk-btn--sm" href="#hydrochem">See it on the Piper plate</a><a class="mk-btn mk-btn--sm" href="#map">Flow direction</a>`,
        }),
    ),
    panel(
      'Deriving the trigger honestly',
      `<p class="mk-tight">${esc(BACKGROUND.caution)}</p>` +
        C.blastRadius({
          lede: 'Adopting the sulfate trigger at 148 mg/L as a criteria set:',
          rows: [
            { what: 'Reference results behind it', n: '42' },
            { what: 'Censored, carried by Kaplan–Meier', n: '2' },
            { what: 'Locations it would apply to', n: '4 downgradient' },
            { what: 'New exceedances this round', n: '1 — MW05' },
            { what: 'Historical evaluations rewritten', n: '0' },
          ],
          action: 'Create the criteria set',
          reversible:
            'It becomes a versioned criteria set like any other, with the reference population and the date it was derived recorded on it — so a regulator can see which fourteen rounds of which three bores produced the number, years later.',
        }),
    ),
  )
);

/** Data quality assessment, against objectives set before the round. */
const dataQuality = () => {
  /*
   * Wave 7: one percentage, computed once, printed twice — the tile and the
   * dimension row used to be two typed 87%s over a register that now says 79.
   * Usable is received less the rows held in quarantine, which is the same
   * arithmetic the DQA row itself does.
   */
  const usablePct = Math.round(
    ((COMPLETENESS.received - QUARANTINE.filter((q) => q.state === 'held').length) / COMPLETENESS.planned) * 100,
  );
  return (
  head('Data quality assessment', 'Whether this round met the objectives it was designed against.', {
    route: '/projects/:projectId/dqa',
    toolbar: C.exportMenu() + C.btn('Generate report §3', 'primary'),
  }) +
  stats([
    /*
     * Counted, and the count moved. This tile read "3 of 6 objectives met"
     * over a set holding one `met`, two `met with exception` and three `not
     * met` — it was counting the exceptions as met, which is the softening
     * the panel below says the product does not do. One, two and three now
     * partition the six.
     */
    stat(`${DQA.filter((d) => d.verdict === 'met').length} of ${DQA.length}`, 'objectives met', 'warn'),
    stat(String(DQA.filter((d) => d.verdict === 'met with exception').length), 'met with exception', 'warn'),
    stat(String(DQA.filter((d) => d.verdict.startsWith('not met')).length), 'not met', 'bad'),
    stat(`${usablePct}%`, 'usable completeness', 'bad'),
    stat(String(DQA.reduce((n, d) => n + d.settled.open, 0)), 'findings still undecided', 'bad'),
  ]) +
  notice(
    'warning',
    `${DQA.filter((d) => d.verdict.startsWith('not met')).length} objectives were not met, and ${DQA.reduce((n, d) => n + d.settled.open, 0)} findings across the six dimensions have not been dispositioned — including one under a dimension whose verdict reads met.`,
    'A QA/QC table lists checks. An assessment says whether the data is fit for the purpose it was collected for — which is a judgement made against objectives written down beforehand, not a verdict assembled afterwards from whatever passed. And a verdict rests on findings, so each row below says <strong>how many of its findings were settled and by whom</strong>: a rule that named itself, or a person who did. A dimension carrying an open finding is provisional however confident its verdict reads.',
  ) +
  /*
   * PR-2, the dqa half. Each dimension names the findings behind it and how
   * they were settled, read off `QAQC` rather than typed here — so a verdict
   * cannot claim more certainty than the decision layer actually has. The
   * nineteen checks partition across the six dimensions exactly once each,
   * which is the property that makes the counts recountable.
   */
  table({
    caption: `Each dimension against the objective set for this programme, with the findings under it and who settled them. All ${QAQC.length} checks sit under exactly one dimension.`,
    head: ['Dimension', 'Measured by', 'Objective', 'Achieved', 'Findings', 'Settled by', 'Verdict'],
    rows: DQA.map((d) => [
      `<strong>${esc(d.dim)}</strong>`,
      `<span class="mk-muted">${esc(d.measure)}</span>`,
      esc(d.objective),
      esc(d.achieved),
      `<span class="mk-num">${d.settled.total}</span>` +
        `<small>${d.settled.automatic ? `${d.settled.automatic} automatic · ` : ''}${d.settled.byPerson ? `${d.settled.byPerson} by a person · ` : ''}${d.settled.reviewed ? `${d.settled.reviewed} reviewed · ` : ''}${d.settled.open ? `${d.settled.open} open` : 'none open'}</small>`,
      d.settled.who.length
        ? `<span class="mk-muted">${esc(d.settled.who.join(' · '))}</span>`
        : '<span class="mk-muted">nobody yet</span>',
      C.status(d.verdict, d.verdict === 'met' ? 'good' : d.verdict === 'met with exception' ? 'warn' : 'bad') +
        (d.settled.open ? `<small>provisional — ${d.settled.open} finding${d.settled.open === 1 ? '' : 's'} undecided</small>` : ''),
    ]),
    kind: 'matrix',
    label: 'Data quality assessment',
  }) +
  `<p class="mk-tight">The <strong>Settled by</strong> column is the one the practitioner review asked for. Where it names a rule and a version — <em>${esc(DQA[0].settled.who[0] ?? '')}</em> — the consequence was deterministic and nobody had to decide it. Where it names a person, somebody did, and their reason is on <a class="mk-ref" href="#qc">the finding</a>. Where it says <em>nobody yet</em>, the dimension’s verdict is a statement about data whose qualifiers have not been applied.</p>` +
  cols(
    panel(
      'What “not met” actually costs',
      table({
        head: ['Not met', 'Consequence for the assessment'],
        rows: [
          ['Sensitivity — cadmium', cell('Cadmium cannot be assessed at any location. Seven results are reported as unassessable rather than compliant, and the recommendation is a method change from Q3. Settled automatically: the reporting limit sits above the criterion and the comparison is arithmetic.')],
          ['Accuracy — zinc', cell(`Nine zinc results would be qualified biased low — <strong>and none of them is yet</strong>. The propagation basis is the open decision on <a class="mk-ref" href="#qc">${esc(METALS_BATCH.id)}</a>: the certificate carries no result-level qualifier and DQO ${esc(DQO.used.version)} states no consequence for the failed spike, so a hydrogeologist has to say how far it reaches. The MW05 exceedance stands and is understated either way; no result is corrected.`)],
          [`Completeness — ${usablePct}%`, cell(`Below the 95% objective. ${esc(Q2_OVERDUE.location)} yielded nothing — the crew reached it and found it <strong>dry</strong>, which is a measurement of the aquifer rather than a gap — and MW09 is a result short on a cracked container. The round is reported as incomplete rather than as a clean ${COMPLETENESS.planned}, and the dry bore is reported as attempted rather than missed.`)],
        ],
      }),
    ),
    panel(
      'Written before the round, not after it',
      '<p class="mk-tight">The objectives on this page were set when the programme was designed. That ordering is the whole point: an assessment written after the results are in is an argument, and every practitioner who has read one knows the difference.</p>' +
        '<p class="mk-tight">Where an objective was not met the product does not soften it, and does not quietly drop the dimension from the report. It states the shortfall, its consequence and the remedy — which is what makes the rest of the report credible.</p>' +
        C.card({
          tone: 'good',
          head: '<span class="mk-queue__kind">Comparability — met</span>',
          body: '<p class="mk-tight">Arsenic’s reporting limit stepped from 5.0 to 1.0 µg/L in May 2025 on a method change. It is recorded, it is drawn as a stepped line on every plate that spans it, and the trend test treats the earlier censored values as censored rather than as measurements. A series whose limit changed silently mid-way is a trend nobody can defend.</p>',
        }),
    ),
  )
  );
};

/** The receptor the water-quality numbers are ultimately about. */
const stygofaunaScreen = () => (
  head('Subterranean fauna', 'The receptor downgradient of the TSF, assessed on whether a population persists.', {
    route: '/projects/:projectId/fauna',
    toolbar: C.exportMenu() + C.btn('Record a survey event'),
  }) +
  notice(
    'default',
    'These results are not chemistry, and forcing them into a concentration model would lose them.',
    'A stygofauna survey produces counts of taxa against a reference site, on a net-haul method, assessed for whether a population persists — not a value against a limit. The EPA conditions mining approvals in this state on exactly this, and a groundwater platform for WA mining with nowhere to put it is visibly not built for WA.',
  ) +
  facts([
    ['Condition', esc(STYGOFAUNA.condition)],
    ['Method', esc(STYGOFAUNA.method)],
    ['Frequency', esc(STYGOFAUNA.frequency)],
    ['Reference bore', loc('STY01')],
    ['Downgradient bore', loc('STY02')],
  ]) +
  table({
    caption: 'Survey events, reference against downgradient.',
    head: ['Bore', 'Role', 'Event', 'Taxa', 'Individuals', 'Notable', 'Verdict'],
    rows: STYGOFAUNA.rows.map((r) => [
      loc(r.bore),
      esc(r.role),
      esc(r.event),
      `<span class="mk-num">${r.taxa}</span>`,
      `<span class="mk-num">${r.individuals}</span>`,
      esc(r.notable),
      C.status(r.verdict, r.verdict === 'persisting' ? 'good' : 'warn'),
    ]),
    kind: 'matrix',
    label: 'Subterranean fauna survey events',
  }) +
  cols(
    panel(
      'What it appears to say',
      `<p class="mk-tight">${esc(STYGOFAUNA.finding)}</p>` +
        C.card({
          tone: 'warn',
          head: '<span class="mk-queue__kind">Two bores, two events</span>',
          body:
            '<p class="mk-tight">Taxa richness at the downgradient bore has fallen while the reference held steady, and the salinity and sulfate rise at MW05 sits geographically between them. That is a coherent story and it is not yet evidence.</p>',
          foot: `<a class="mk-btn mk-btn--sm" href="#background">Background comparison</a><a class="mk-btn mk-btn--sm" href="#map">Flow direction</a>`,
        }),
    ),
    panel(
      'And why the product will not draw a trend through it',
      `<p class="mk-tight">${esc(STYGOFAUNA.caution)}</p>` +
        '<p class="mk-tight">Everywhere else in this product a series of numbers gets a trend test. Here it does not, and the refusal is the design: counts that vary by an order of magnitude with season, haul effort and operator do not support one, and a Mann–Kendall drawn across four points would look exactly as authoritative as the arsenic plate that is built on fourteen.</p>' +
        C.stateBlock('partial', {
          headline: 'Two events. A trend needs more, and the product says so instead of drawing one.',
          detail:
            'The screen states what changed and recommends a targeted survey. It does not compute a rate, because a rate here would be a number with a confidence interval that nothing in the sampling design supports — and it would be quoted back for years.',
          action: 'Commission a targeted survey',
          secondary: 'Add to the report as an observation',
        }),
    ),
  )
);

/* ================================================================== *
 * The catalogue
 * ================================================================== */

/* ================================================================== *
 * J0 — Arrive, and find out what needs you
 *
 * None of this existed in the first build, and the omission was
 * structural rather than incidental: the project is the authorisation
 * scope (§11.2, G-10) and the primary URL space, and it had no face. A
 * user cannot inhabit a scope they cannot see, create or leave.
 * ================================================================== */

const workQueue = () => {
  const byUrgency = (u) => WORK_QUEUE.filter((w) => w.urgency === u);
  /*
   * The project is a tag in the card head, not the first clause of the
   * context sentence. On a landing surface that spans an estate, *which site
   * is this* has to be readable before the headline is — and a tag can be
   * counted, filtered and checked, where a sentence cannot.
   */
  const cardFor = (w) => C.card({
    tone: w.urgency === 'now' ? 'bad' : w.urgency === 'soon' ? 'warn' : 'neutral',
    head:
      `<span class="mk-queue__kind">${esc(w.kind)}</span>` +
      `<span class="mk-tag mk-tag--${w.crossProject ? 'warn' : 'neutral'}">${esc(w.project)}</span>` +
      `<span class="mk-queue__age">${esc(w.age)}</span>`,
    body:
      `<p class="mk-queue__headline">${esc(w.headline)}</p>` +
      `<p class="mk-queue__context">${esc(w.context)}</p>`,
    foot: `<a class="mk-btn mk-btn--sm mk-btn--primary" href="#${w.target}">${esc(w.action)}</a>` +
      (w.crossProject
        ? `<span class="mk-muted">Resolving it happens inside ${esc(w.project)}, which is a scope switch — and that workspace is not drawn in this catalogue, so this opens the cross-project register that holds the row</span>`
        : '<span class="mk-muted">Opens where it is resolved, not a list to search again</span>'),
  });

  const completeness = C.card({
    tone: 'warn',
    head: '<span class="mk-queue__kind">Programme completeness</span>' +
      `<span class="mk-tag mk-tag--neutral">${esc(PROJECT.code)}</span>` +
      `<span class="mk-queue__age">${esc(COMPLETENESS.period)}</span>`,
    body:
      C.progress({
        pct: Math.round((COMPLETENESS.received / COMPLETENESS.planned) * 100),
        label: `${COMPLETENESS.received} of ${COMPLETENESS.planned} planned results received`,
        // Wave 7: `held` is counted off the quarantine register rather than
        // typed onto the completeness record, and `missing` is the difference
        // the rows below actually add to — it read 2 over a table summing to 10.
        detail: `${QUARANTINE.filter((q) => q.state === 'held').length} held in quarantine · <strong>${COMPLETENESS.missing} never collected</strong>, of which ${COMPLETENESS.rows.find((r) => r.state === 'missing').planned} are the dry bore at ${esc(COMPLETENESS.rows.find((r) => r.state === 'missing').location)}. Planned means what the sampling programme said, resolved in ${esc(PROJECT.timezone)} — a sample taken at 08:00 on 1 April local time belongs to the June quarter, not this one.`,
      }) +
      table({
        head: ['Location', 'Planned', 'Received', 'State'],
        rows: COMPLETENESS.rows.map((r) => [
          loc(r.location),
          `<span class="mk-num">${r.planned}</span>`,
          `<span class="mk-num${r.received < r.planned ? ' mk-num--warn' : ''}">${r.received}</span>`,
          C.status(r.state, r.state === 'complete' ? 'good' : r.state === 'partial' ? 'warn' : 'bad')
            + (r.why ? `<small>${esc(r.why)}</small>` : ''),
        ]),
      }),
    foot: `<a class="mk-btn mk-btn--sm" href="#programme">Open the programme</a>`,
  });

  return (
    head('What needs you', 'Everything waiting on you, across every project you hold a binding in — before you navigate anywhere.', {
      route: 'a proposal — the product’s / is deliberately a project list (ia-rationale §3); Jerry kept this drawn, 1 Sep 2026',
      toolbar: C.segmented({ options: ['Mine', 'My team', 'Everything'], value: 'Mine', label: 'Scope' }) + C.btn('Snooze rules'),
    }) +
    // Counted from the queue, and the four tiles sum to it: 5 + 4 + 1 = 10 rows.
    stats([
      stat(String(byUrgency('now').length), 'need you now', 'bad'),
      stat(String(byUrgency('soon').length), 'this week', 'warn'),
      stat(String(byUrgency('later').length), 'when you get to it'),
      stat(String(new Set(WORK_QUEUE.map((w) => w.project)).size), 'projects with open items', 'warn'),
    ]) +
    notice(
      'default',
      'Ordering is driven by the role you hold, not by a setting — and it is not partitioned by project.',
      `You are a Contributor at ${esc(PROJECT.code)}, so exceptions and review sort above approvals. An Approver signing in to the same data sees the approval queue first. Nothing is configurable, because a work queue somebody has to tune is a work queue they stop trusting. What it is <em>not</em> is one list per site: ${byUrgency('now').length} things need you today and ${WORK_QUEUE.filter((w) => w.crossProject).length} of them are at ${esc(KURRAJONG.code)}, where you hold Approver — a queue that grouped by project would have put them under a heading nobody opened, which is how they got to be ${KURRAJONG.exceedance.openDays} days old.`,
    ) +
    cols(
      '<section><h2 class="mk-h2">Needs you now</h2>' +
        `<div class="mk-queue">${byUrgency('now').map(cardFor).join('')}</div>` +
        '<h2 class="mk-h2">This week</h2>' +
        `<div class="mk-queue">${byUrgency('soon').map(cardFor).join('')}</div>` +
        '<h2 class="mk-h2">When you get to it</h2>' +
        `<div class="mk-queue">${byUrgency('later').map(cardFor).join('')}</div>` +
        '</section>',
      completeness +
          panel(
          'Handing one over',
          '<p class="mk-tight">The queue shows an owner. It could not <em>change</em> one, and coordination is where a multi-user product is actually judged.</p>' +
            C.card({
              tone: 'bad',
              head: `<span class="mk-queue__kind">Assigned</span><span class="mk-tag mk-tag--neutral">${esc(PROJECT.code)}</span><span class="mk-queue__age">${esc(ASSIGNMENT.at)}</span>`,
              body:
                `<p class="mk-queue__headline">${esc(ASSIGNMENT.subject)}</p>` +
                `<p class="mk-queue__context">${esc(ASSIGNMENT.assignedBy)} → <strong>${esc(ASSIGNMENT.assignedTo)}</strong> · due ${esc(ASSIGNMENT.due)}</p>`,
            }) +
            ASSIGNMENT.thread
              .map(
                (t) =>
                  `<div class="mk-thread__item"><span class="mk-thread__who">${esc(t.who)}</span>` +
                  `<span class="mk-thread__at">${esc(t.at)}</span>` +
                  `<p class="mk-thread__text">${esc(t.text)}</p></div>`,
              )
              .join('') +
            C.field({
              label: 'Reply',
              control: C.textarea({ placeholder: 'What the next person needs to know…', rows: 2 }),
              hint: 'The thread hangs off the exceedance rather than off a chat channel, so it is still attached in two years when somebody asks why the notification was worded the way it was.',
            }) +
            '<div class="mk-actions">' + C.btn('Reply', 'primary') + C.btn('Reassign') + C.btn('Attach the lineage export') + '</div>',
        ) +
        panel(
          'When there is nothing',
          '<p class="mk-tight">The zero state is the one that matters most, because it is the claim the product makes every morning. It is not blank.</p>' +
            C.stateBlock('empty', {
              headline: 'Nothing needs you, on either project.',
              detail:
                `Across all ${PROJECTS.length} bindings: every exception is dispositioned, every round in an open period is collected or explained, and no obligation is inside its warning window. The projects are named because “nothing” on a queue that spans an estate has to say what it spanned — a queue that had quietly narrowed to one site would show this same empty state. Last checked 2026-08-23 07:41 AWST.`,
              action: 'Open the 2026 Q3 programme',
              secondary: 'Review what closed this week',
            }),
        ),
      '5fr 4fr',
    )
  );
};

const globalSearch = () => {
  /*
   * A hit in another project is not a link. The identifier is still the
   * subject of its row, but following it crosses a scope boundary, so the
   * affordance points at the switch — and where that project's workspace is
   * not drawn in this catalogue, the row says so instead of implying a screen
   * that would be MOCK-WDL's under another project's name.
   */
  const group = (g) =>
    `<h2 class="mk-h2" style="margin-top:1.2rem">${esc(g.label)}</h2>` +
    table({
      head: ['Identifier', 'What it is', 'Project', ''],
      rows: g.rows.map((r) => [
        r.project === PROJECT.code
          ? `<a class="mk-ref mk-ref--loc" href="#${r.target}">${esc(r.code)}</a>`
          : `<a class="mk-ref mk-ref--loc" href="#${r.target}">${esc(r.code)}</a><small>switch scope to open it</small>`,
        esc(r.what),
        r.project === PROJECT.code
          ? `<span class="mk-muted">${esc(r.project)} · current scope</span>`
          : `<span class="mk-tag mk-tag--warn">${esc(r.project)} — switches scope</span>`,
        r.badge ? tag(r.badge, toneFor(r.badge)) : '',
      ]),
    });

  return (
    head('Search', 'One box over every identifier in every project you can see.', {
      route: '/search',
      toolbar: C.exportMenu(),
    }) +
    C.filterBar({
      controls: [
        C.field({ label: 'Query', control: C.input({ value: SEARCH.query, mono: true }), hint: 'Identifier prefixes rank first — a practitioner searches by code, not by name.' }),
        C.field({ label: 'Entity type', control: C.select({ options: ['Everything', 'Locations', 'Sampling events', 'Certificates', 'Import runs', 'Criteria sets', 'Licences', 'Reports'], value: 'Everything' }) }),
        C.field({ label: 'Scope', control: C.select({ options: ['Every project I can see', ...PROJECTS.map((p) => `${p.code} only`)], value: 'Every project I can see' }) }),
      ],
      chips: [C.chip(SEARCH.query, { prefix: 'matches' })],
      // Counted from the rows below rather than typed above them, which is how
      // "9 matches" survived a wave that changed the rows.
      count: `${SEARCH.matches} matches across ${SEARCH.projects} projects`,
    }) +
    notice(
      'warning',
      'Opening a result in another project switches your scope, and says so before it does.',
      `Row-level security is fail-closed: you see ${esc(KURRAJONG.code)} here because you hold a binding on it — Approver, where you hold Contributor at ${esc(PROJECT.code)}. Following one of its rows moves the whole application into that project: the header changes, the section strip changes, and so does what every other screen is about. A scope that changes silently is how somebody reads the wrong site’s numbers into a report. In this catalogue those rows stop at the switch, because ${esc(KURRAJONG.code)}’s workspace is not drawn — the boundary is the honest place for a drawing of one project to end.`,
    ) +
    SEARCH.groups.map(group).join('') +
    cols(
      panel(
        'Why the second group ranks below the first',
        `<p class="mk-tight">Both groups match the same query. The ${SEARCH.prefixLocations} above start with it; the ${SEARCH.containsLocations} below contain it, because Kurrajong’s bores carry their project’s prefix — <code class="mk-file">KRJ-MW03</code>, not <code class="mk-file">MW03</code>.</p>` +
          `<p class="mk-tight">Two sites under one customer will reuse a bore number eventually, and a register where only a column tells one <code class="mk-file">MW03</code> from another is a register somebody will read wrong in a hurry. Prefixing the code is the cheap fix, and the cost of it is exactly this: the codes stop being prefix matches, and the ranking has to say so rather than quietly interleave them.</p>`,
      ),
      panel(
        'When nothing matches',
        C.stateBlock('empty', {
          headline: 'No identifier, name or certificate matches “MW0X”.',
          detail:
            `Search covers identifiers and names, not result values — a number is found through the crosstab’s filters, where the criteria set and period that make it meaningful are also chosen. ${SEARCH.prefixLocations} locations start with “MW0” on ${esc(PROJECT.code)} and ${SEARCH.containsLocations} more contain it on ${esc(KURRAJONG.code)}; the nearest is MW05.`,
          action: 'Search MW05 instead',
          secondary: 'Open the location register',
        }),
      ),
    )
  );
};

const projectList = () => {
  /*
   * Every number in these rows is counted from the seed. The version this
   * replaces typed four of them per row across four projects, and three of
   * those projects had no data at all — on the one screen the portfolio
   * journey starts at, where a wrong count sends somebody to the wrong site.
   */
  const num = (n, tone = '') => `<span class="mk-num${tone ? ` mk-num--${tone}` : ''}">${n}</span>`;
  const rows = PROJECTS.map((p) => [
    /*
     * The project's state sits beside its identifier, where `current` already
     * sat — it is a fact about the project rather than an action, and the last
     * column is the narrowest on a nine-column matrix and the first to pan out
     * of view.
     */
    p.drawn
      ? `<a class="mk-ref mk-ref--loc" href="#project-home">${esc(p.code)}</a>` +
        (p.current ? ' <span class="mk-tag mk-tag--neutral">current</span>' : '')
      : `<strong class="mk-num">${esc(p.code)}</strong> <span class="mk-tag mk-tag--neutral">not drawn</span>`,
    `${esc(p.name)}<small>${esc(p.facility)}</small>`,
    `<span class="mk-tag mk-tag--${p.role === 'Approver' ? 'new' : p.role === 'Reader' ? 'neutral' : 'good'}">${esc(p.role)}</span>`,
    num(p.locations),
    num(p.exceedances, p.exceedances ? 'bad' : 'nil'),
    p.unacknowledged
      ? `${num(p.unacknowledged, 'bad')} <span class="mk-muted">not looked at</span>`
      : num(0, 'nil'),
    p.roundsOverdue ? num(p.roundsOverdue, 'bad') : num(0, 'nil'),
    `<span class="sf-instant">${esc(p.nextRound)}</span>`,
    /*
     * Short, both of them. The first draft put the not-drawn sentence in this
     * cell and the column is the narrowest on the table: at 1280 px it laid
     * the sentence out one or two words to a line and made the row four times
     * the height of its neighbour. The sentence belongs in the notice under
     * the table, where it has a column to be read in; the cell carries the
     * state as a word and the action as a control.
     */
    p.drawn
      ? '<span class="mk-muted">You are here</span>'
      : `<a class="mk-ref" href="#obligations">What it owes</a>`,
  ]);

  return (
    head('Projects', 'Every project you hold a role binding in, and what you are acting as on each one.', {
      route: '/projects',
      toolbar: C.btn('New project', 'primary'),
    }) +
    notice(
      'default',
      'The role is on the row because “as what” is the first thing scope decides.',
      `You are a <strong>Contributor</strong> at ${esc(PROJECT.code)} and an <strong>Approver</strong> at ${esc(KURRAJONG.code)} — the same person, two sites, two sets of controls. As Approver you may sign a submission off and may not answer a review question; as Contributor the reverse. The controls that a binding does not carry are absent on that project rather than present and refusing, which is why the role has to be legible before you switch. A third role is on the register at <a class="mk-ref" href="#roles">Access</a>: S. Petrelli holds Reader here and can read and export everything and write nothing.`,
    ) +
    table({
      caption:
        'Bindings resolve from Entra group membership and are re-read at sign-in. Every count below is taken from this project’s own records at build time — locations from the register, exceedances from the evaluation, overdue rounds from the programme.',
      head: ['Code', 'Project<small>facility</small>', 'Your role', 'Locations', 'Exceedances', 'Unacknowledged', 'Rounds overdue', 'Next round due', ''],
      rows,
      kind: 'matrix',
      label: 'Projects you hold a binding in',
    }) +
    notice(
      'warning',
      `${esc(KURRAJONG.code)} is real in the data and undrawn in this catalogue, and the row says which.`,
      `The second project carries four bores, four rounds and one criteria set — enough for the two questions a portfolio asks, and no more. What it does not carry is a workspace: there is no location register, no crosstab and no report of its own here, so its row opens the cross-project register that does hold its rows rather than linking into ${esc(PROJECT.code)}’s screens under another project’s name. Crossing a project boundary is a scope switch, not a link, and the switch is where this catalogue stops.`,
    ) +
    panel(
      `What the two rows say, read together`,
      `<p class="mk-tight">${esc(PORTFOLIO.says)}</p>` +
        table({
          caption: 'The same two projects, as the portfolio’s two questions.',
          head: ['Project', 'Where something is wrong', 'What is due'],
          scroll: true,
          label: 'The portfolio’s two questions, per project',
          rows: PORTFOLIO.byProject.map((b) => [
            `<strong>${esc(b.code)}</strong>`,
            b.unacknowledged
              ? `${b.unacknowledged} of ${PROJECTS.find((p) => p.code === b.code).exceedances} exceedances unacknowledged`
              : 'Nothing unacknowledged',
            `${b.counts.overdue} overdue · ${b.counts['at risk']} at risk · ${b.counts['on track']} on track · ${b.counts.met} met`,
          ]),
        }) +
        `<p class="mk-tight mk-muted">${esc(PROJECT.code)} is the noisy site and it is the well-run one: every exceedance on it is on a register, escalated to a TARP level and, where it obliged one, notified. ${esc(KURRAJONG.code)} is quiet, and the quiet is the finding — one exceedance nobody has acknowledged in ${KURRAJONG.exceedance.openDays} days, and the round that would settle it ${esc(KURRAJONG.obligations[1].remaining)}. A site nobody opens looks fine from inside itself.</p>`,
    ) +
    cols(
      panel(
        'When you hold no bindings at all',
        '<p class="mk-tight">Fail-closed row-level security means real users meet this state — on their first day, and again the morning after a group membership is revoked. It cannot dead-end.</p>' +
          C.stateBlock('empty', {
            headline: 'You are signed in, and you hold no project bindings.',
            detail:
              'Strataflow reads your access from your organisation’s directory groups, not from a list kept here — so nobody at Strataflow can grant it, and neither can this screen. Your administrator adds you to a group like SG-Strataflow-&lt;project&gt;-Contributors; access appears the next time you sign in. You are signed in as anakamura@wandalup.example on tenant wandalup.example.',
            action: 'Copy the request for your administrator',
            secondary: 'Check my identity',
          }),
      ),
      panel(
        'A single-project customer never sees any of this',
        '<p class="mk-tight">Most customers run one project. The switcher in the header collapses to the project name with no control on it, this screen is not linked from anywhere, and <code>/</code> lands on the project rather than here.</p>' +
          '<p class="mk-tight">Switcher ceremony for a user with one thing to switch between is the kind of scaffolding that makes an internal tool feel like one. The URL still exists and still resolves; nothing in the architecture is special-cased, only what is shown.</p>' +
          C.card({
            tone: 'neutral',
            head: '<span class="mk-queue__kind">Header, single-project customer</span>',
            body: '<span class="mk-switch-proj" style="pointer-events:none"><span class="mk-switch-proj__code">MOCK-WDL</span><span class="mk-switch-proj__role">Contributor</span></span>',
          }),
      ),
    )
  );
};

const projectHome = () => {
  /*
   * **One project's home, and every number on it is that project's.** The
   * portfolio surfaces are `#projects` and `#obligations`; this page sits one
   * level below both, and the risk a two-project seed introduces is precisely
   * that a tile here starts counting the estate without saying so. Each count
   * below therefore narrows explicitly — `o.project === PROJECT.code` rather
   * than the length of a register that now holds two projects' rows — so
   * appending a row for another project cannot move a number on this screen.
   */
  const mine = OBLIGATIONS.filter((o) => o.project === PROJECT.code);
  const rounds = mine.filter((o) => o.kind === 'round');
  const me = PROJECTS.find((p) => p.code === PROJECT.code);
  return (
  head(`${esc(PROJECT.code)} — ${esc(PROJECT.name)}`, 'Where this project is up to, and what it owes.', {
    route: '/projects/:projectId — the landing after switching',
    toolbar: C.exportMenu() + C.btn('Project settings'),
  }) +
  C.tabs([
    { label: 'Overview', current: true },
    { label: 'Network', count: LOCATIONS.length },
    { label: 'Programme' },
    { label: 'Obligations', count: mine.length, dot: 'bad' },
    { label: 'Documents', count: 34 },
    { label: 'Settings' },
    { label: 'Audit' },
  ]) +
  notice(
    'default',
    `Everything on this page is ${esc(PROJECT.code)}’s, and nothing on it is the estate’s.`,
    `You arrived here from the <a class="mk-ref" href="#projects">project list</a> or the <a class="mk-ref" href="#obligations">cross-project register</a>, both of which count ${PROJECTS.length} projects. This one counts ${mine.length} obligations, ${EXCEEDANCES.length} exceedances and ${LOCATIONS.length} locations because that is what ${esc(PROJECT.code)} holds — ${esc(KURRAJONG.code)}’s ${KURRAJONG.obligations.length} obligations and one unacknowledged exceedance are not in any tile below, and its own project home is not drawn in this catalogue. A page that silently widened from a project to an estate would be the same defect as one that silently narrowed.`,
  ) +
  stats([
    // Counted, and counted on a predicate: a bore water is taken from is a
    // location and not a monitoring location, so the tile that says
    // "monitoring" says how many there are rather than how many rows exist.
    stat(String(LOCATIONS.filter((l) => l.klass !== 'production_bore').length), 'monitoring locations'),
    stat(String(EXCEEDANCES.length), 'open exceedances', 'bad'),
    stat(String(rounds.filter((o) => o.state === 'overdue').length), 'round overdue', 'warn'),
    stat(`${COMPLETENESS.received} / ${COMPLETENESS.planned}`, 'results this period', 'warn'),
    stat(esc(me.nextRound), 'next round due'),
  ]) +
  cols(
    '<section>' +
      panel(
        'Where the data is up to',
        facts([
          ['Facility', `${esc(FACILITY.name)} · ${FACILITY.areas.length} areas`],
          ['Open period', esc(COMPLETENESS.period)],
          ['Last import', `IMP-0241 · 231 rows committed · 2026-05-21 09:14 AWST`],
          ['Latest certificate', `${esc(ROUND.certificate)} · Pilbara Analytical Services`],
          ['Criteria in force', 'ANZG 2018 95% · Licence Table 4 · site-specific TSF triggers'],
          ['Reporting calendar', 'Quarterly, year ends June — a fiscal quarter, not a calendar one'],
          ['Timezone', `${esc(PROJECT.timezone)} — every period boundary resolves here, never on the server`],
          ['Licence', `<a class="mk-ref" href="#licence">${esc(PROJECT.licence)}</a> · expires 2029-02-28`],
        ]),
      ) +
      panel(
        'What is open',
        table({
          head: ['What', 'Where', 'Since', ''],
          rows: [
            ['PFOS + PFHxS 37× the DGV', loc('MW05'), '2026-05-19', `<a class="mk-ref" href="#exceedances">Exceedance register</a>`],
            ['Round not collected', loc(Q2_OVERDUE.location), esc(Q2_OVERDUE.chip), `<a class="mk-ref" href="#programme">Programme</a>`],
            ['3 questions block a commit', 'IMP-0239', '2026-05-18', `<a class="mk-ref" href="#import-review">Review</a>`],
            ['3 rows held after commit', 'IMP-0239', '2026-05-19', `<a class="mk-ref" href="#quarantine">Quarantine</a>`],
            ['Instrument silent 41 h', loc('TSF-VWP-03'), '2026-08-21', `<a class="mk-ref" href="#tarp">TARP board</a>`],
          ],
        }),
      ) +
      '</section>',
    panel(
      'This is not a dashboard',
      '<p class="mk-tight">Every number here is a question somebody actually arrives with, and every one of them is a link to where it is answered. Nothing on this page exists to be looked at.</p>' +
        '<p class="mk-tight">The distinction is load-bearing rather than stylistic: a decorative tile becomes stale without anybody noticing, because nobody was going to act on it. A tile that is the entrance to a queue is corrected the first morning it is wrong.</p>' +
        C.blastRadius({
          lede: 'What a practitioner does from here, measured over the last quarter:',
          rows: [
            { what: 'Opened an exceedance from the open list', n: '61%' },
            { what: 'Went straight to the import runs', n: '22%' },
            { what: 'Opened the programme', n: '11%' },
            { what: 'Read a number and did nothing', n: '6%' },
            { what: 'Tiles with no destination', n: '0' },
          ],
          action: 'This is a design claim, not a measurement',
          cancel: 'It has not been observed with a practitioner',
          reversible: 'Recorded here so it can be checked against a real session rather than assumed. QB-8’s finish line is an unassisted practitioner, and no transcript shows one.',
        }) +
        `<p class="mk-tight mk-muted">The tile that would be a dashboard here is a portfolio one — <em>how are my other sites</em> — and it is deliberately absent. This page cannot answer it without counting rows it does not own, so the question goes to <a class="mk-ref" href="#projects">Projects</a> and <a class="mk-ref" href="#obligations">Reporting obligations</a>, which do.</p>`,
    ),
    '3fr 2fr',
  )
  );
};

/* ================================================================== *
 * J1 additions — the network, the round, and the rows that were held
 * ================================================================== */

const locationRegistry = () => {
  /*
   * The take column, not a take screen inside the register. A production bore
   * is a location — the extraction record hangs off one — so it is a row here
   * like any other, and what this register says about it is the one thing a
   * reader of a *location* register needs: water is taken here, on this basis,
   * and the volumes are one click away. `≈` for estimated and `●` for metered,
   * so the basis survives greyscale; a bore with no take reads `—`.
   */
  const takeOf = (code) => WATER.bores.find((b) => b.code === code);
  const takeCell = (l) => {
    const b = takeOf(l.code);
    if (!b) return '<span class="mk-num mk-num--nil">—</span>';
    return b.meter
      ? `<a class="mk-ref" href="#water">● metered</a>`
      : `<a class="mk-ref" href="#water">≈ estimated</a>`;
  };

  const rows = LOCATIONS.map((l) => [
    loc(l.code),
    esc(l.klass.replace(/_/g, ' ')),
    esc(l.area),
    esc(l.position),
    `<span class="mk-num">${l.toc.toFixed(2)}</span> <span class="mk-entry__unit">m AHD</span>`,
    esc(l.screen),
    takeCell(l),
    takeOf(l.code)
      ? '<span class="mk-num mk-num--nil">—</span>'
      : `<span class="sf-instant">2026-05-1${l.code === 'MW11' ? '4' : '3'}</span>`,
    l.lifecycle
      ? C.status(l.lifecycle, 'neutral')
      : l.code === 'MW11'
        ? C.status(Q2_OVERDUE.chip, 'bad')
        : l.code === 'MW12'
          ? C.status('no criteria selectable', 'neutral')
          : takeOf(l.code)
            ? C.status('not sampled — take only', 'neutral')
            : C.status(l.state.replace(/_/g, ' '), toneFor(l.state)),
    l.code === 'MW05' ? '<span class="mk-num mk-num--bad">8</span>' : l.code === 'MW07' ? '<span class="mk-num mk-num--bad">1</span>' : '<span class="mk-num mk-num--nil">0</span>',
  ]);

  return (
    head('Locations', 'Every location on this project — monitoring, discharge and production — and what each one is telling you.', {
      route: '/projects/:projectId/locations/:locationId',
      toolbar: C.exportMenu() + C.btn('Add location') + C.btn('Manage groups'),
    }) +
    C.filterBar({
      onView: 'All locations',
      saved: true,
      controls: [
        C.field({ label: 'Find', control: C.input({ placeholder: 'Code or name…', mono: true }) }),
        C.field({ label: 'Area', control: C.select({ options: ['All areas', 'Borefield', 'TSF', 'Compliance boundary', 'Wandalup Creek'], value: 'All areas' }) }),
        C.field({ label: 'Class', control: C.select({ options: ['All classes', ...[...new Set(LOCATIONS.map((l) => l.klass))]], value: 'All classes' }) }),
        C.field({ label: 'Group', control: C.select({ options: ['Any group', 'Downgradient of TSF', 'Compliance boundary', 'Background'], value: 'Any group' }) }),
        C.field({ label: 'Network health', control: C.select({ options: ['Any', 'Unsampled in 6 months', 'Missing survey data', 'Decommissioned but still in a programme'], value: 'Any' }) }),
      ],
      count: `${LOCATIONS.length} of ${LOCATIONS.length} locations`,
    }) +
    notice(
      'default',
      'Hierarchy is a filter here, not the spine.',
      'The facility → area tree is real and it is edited on the network screen, but a practitioner looking for a bore knows its code and not its branch. A register that makes you expand three levels to reach MW05 is a file browser wearing a domain’s clothes.',
    ) +
    C.selectionBar({
      n: 2,
      unit: 'locations',
      actions: ['Add to group', 'Assign a programme', 'Export construction logs', 'Plot together'],
      undo: 'Group changes are reversible and recorded against each location.',
    }) +
    table({
      caption: 'Sorted by area, then by position along the flow path — not alphabetically, because that is how the network is read.',
      head: ['Code', 'Class', 'Area', 'Position', 'Top of casing', 'Screened interval', 'Take', 'Last sampled', 'Current state', 'Open items'],
      rows,
      kind: 'matrix',
      label: 'Location register',
    }) +
    `<p class="mk-tight">The three production bores are on this register and not in a list beside it: water is taken from a location, so a ` +
    `bore water is taken from is one. <strong>●</strong> is a metered take and <strong>≈</strong> an estimated one — the volumes, the basis of ` +
    `each and the position against the entitlement are on <a class="mk-ref" href="#water">water take against entitlement</a>. Nobody samples ` +
    `them, which is why their state asserts nothing about quality rather than reading as compliant.</p>` +
    C.pager({ from: 1, to: LOCATIONS.length, total: LOCATIONS.length, unit: 'locations' }) +
    cols(
      panel(
        'Questions this register answers without leaving it',
        table({
          head: ['Question', 'Answer here', 'Rows'],
          rows: [
            ['Which monitoring locations have not been sampled in six months?', 'Network health filter', '<span class="mk-num">0</span>'],
            ['Which have no survey epoch, so elevation cannot be derived?', 'Network health filter', '<span class="mk-num">0</span>'],
            [
              'Which are decommissioned but still named in a programme?',
              'Network health filter',
              `<span class="mk-num mk-num--warn">${LOCATIONS.filter((l) => l.lifecycle === 'decommissioned').length}</span> — ` +
                `${LOCATIONS.filter((l) => l.lifecycle === 'decommissioned').map((l) => esc(l.code)).join(', ')}, in GW-QTR`,
            ],
            ['Which sit on the compliance boundary?', 'Area filter', `<span class="mk-num">${LOCATIONS.filter((l) => l.area === 'Compliance boundary').length}</span>`],
            ['Which have a metered or estimated take against the entitlement?', 'Class filter', `<span class="mk-num">${WATER.bores.length}</span> — <a class="mk-ref" href="#water">the production bores</a>`],
            ['What are the numbers at each?', '<em>Not here.</em> That is the crosstab.', '—'],
          ],
        }) +
          '<p class="mk-tight">The last row is the boundary and it is absolute. A register that starts growing result columns becomes a second crosstab that disagrees with the first, which is the failure this product exists to end.</p>',
      ),
      panel(
        'Groups, and what changing one touches',
        '<p class="mk-tight">Groups drive criteria applicability, programme membership and figure series, so a membership change is never only a label.</p>' +
          C.blastRadius({
            lede: 'Adding MW07 to “Compliance boundary” would change:',
            rows: FACILITY.blastRadius,
            action: 'Add MW07 to the group',
            reversible: 'Reversible. Group membership is audited with before and after state, and applicability is resolved at evaluation date — so nothing already evaluated moves.',
          }),
      ),
    )
  );
};

const facilityScreen = () => (
  head('Facility and areas', 'The hierarchy every location hangs from, and what an edit to it would touch.', {
    route: '/projects/:projectId/facility',
    toolbar: C.btn('Add area') + C.btn('Reorganise', 'primary'),
  }) +
  C.tabs([
    { label: 'Hierarchy', current: true },
    { label: 'Locations', count: LOCATIONS.length },
    { label: 'Programmes', count: 3 },
    { label: 'Documents', count: 6 },
    { label: 'Audit' },
  ]) +
  facts([
    ['Facility', esc(FACILITY.name)],
    ['Operator', esc(FACILITY.operator)],
    ['Tenement', esc(FACILITY.tenement)],
    ['Areas', String(FACILITY.areas.length)],
    ['Locations', String(LOCATIONS.length)],
    ['Licence', `<a class="mk-ref" href="#licence">${esc(LICENCE.id)}</a>`],
  ]) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Areas</h2>' +
  table({
    caption: 'An area is a place on the site, not a folder. Criteria and programmes bind to them, which is why moving one is consequential.',
    head: ['Area', 'Kind', 'Locations', 'Programmes', 'What it is', ''],
    rows: FACILITY.areas.map((a) => [
      `<strong>${esc(a.name)}</strong>`,
      esc(a.kind),
      `<span class="mk-num">${a.locations}</span>`,
      `<span class="mk-file">${esc(a.programme)}</span>`,
      `<span class="mk-muted">${esc(a.note)}</span>`,
      C.btn('Edit', '', {}) + ' ' + C.btn('Move'),
    ]),
  }) +
  cols(
    panel(
      'Reorganising the hierarchy — the preview is the feature',
      C.blastRadius({
        lede: 'Moving MW05, MW07 and MW09 from <strong>TSF</strong> into <strong>Compliance boundary</strong> would change:',
        rows: FACILITY.blastRadius,
        action: 'Move 3 locations',
        cancel: 'Leave the hierarchy alone',
        reversible:
          'Reversible, and it reaches forward only. Criteria applicability is resolved at evaluation date, so no historical outcome is recomputed and no report already issued changes — which is the whole reason the count above reads zero.',
      }),
    ),
    panel(
      'The four states this screen has',
      '<p class="mk-tight">A facility with one area, a facility still loading its counts, a facility whose location counts are partly stale, and a hierarchy the query could not read.</p>' +
        C.stateBlock('empty', {
          headline: 'This facility has no areas yet.',
          detail: 'Every location currently hangs directly off the facility, which works. Areas earn their place when criteria or programmes need to apply to some locations and not others — add one when that is true, not before.',
          action: 'Add the first area',
        }) +
        C.stateBlock('partial', {
          headline: 'Location counts are 4 minutes old for 2 of 4 areas.',
          detail: 'Borefield and TSF are current. Compliance boundary and Wandalup Creek are being recounted after an import committed; the hierarchy itself is correct and safe to edit.',
        }),
    ),
  )
);

const samplingEvents = () => (
  head('Sampling events', 'Each round of collection — when it happened, who collected it, and where it is up to.', {
    route: '/projects/:projectId/sampling-events',
    toolbar: C.exportMenu() + C.btn('Plan a round') + C.btn('Record a round', 'primary'),
  }) +
  stats([
    stat(String(EVENTS.filter((e) => e.state !== 'planned').length), 'rounds collected this period'),
    stat(String(EVENTS.filter((e) => e.state === 'planned').length), 'planned, not yet collected'),
    stat(String(EVENTS.filter((e) => e.state === 'results-partial').length), 'results partial', 'warn'),
    stat(String(EVENTS.reduce((n, e) => n + e.qc, 0)), 'QC samples linked'),
  ]) +
  C.filterBar({
    controls: [
      C.field({ label: 'Period', control: C.dateRange({ from: '2026-04-01', to: '2026-06-30' }) }),
      C.field({ label: 'State', control: C.select({ options: ['Any state', 'planned', 'sampled', 'results-partial', 'results-complete', 'evaluated'], value: 'Any state' }) }),
      C.field({ label: 'Collected by', control: C.select({ options: ['Anyone', 'A. Nakamura', 'D. Okafor'], value: 'Anyone' }) }),
    ],
    chips: [C.chip('2026 Q2', { prefix: 'period' })],
    count: `${EVENTS.length} rounds`,
  }) +
  table({
    caption: 'State is explicit on every round, because “where is this one up to” is U1’s standing question. Primary and QC are counted apart — a round of nine samples of which four are blanks has not sampled nine bores.',
    head: ['Round', 'What', 'Window', 'Collected', 'By', 'Primary', 'QC', 'Laboratory', 'State'],
    rows: EVENTS.map((e) => [
      `<a class="mk-ref mk-ref--loc" href="#events">${esc(e.code)}</a>`,
      esc(e.label),
      `<span class="mk-muted">${esc(e.window)}</span>`,
      `<span class="sf-instant">${esc(e.collected)}</span>`,
      esc(e.by),
      `<span class="mk-num">${e.samples}</span>`,
      e.qc ? `<span class="mk-num">${e.qc}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      esc(e.lab),
      C.status(e.state, e.state === 'planned' ? 'neutral' : e.state === 'results-partial' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Sampling events',
  }) +
  (() => {
    const qcRows = EVENT_SAMPLES.filter((s) => s.qc !== '—');
    const containers = EVENT_SAMPLES.reduce((n, s) => n + s.containers, 0);
    /*
     * What each control answers. The strings are prose and live here; every
     * number and every identifier below is read from the manifest, so a QC
     * sample added to the seed appears in this taxonomy without anybody
     * remembering to add it — which is how the equipment blank came to be
     * referenced by the QA/QC screen for a fortnight while appearing on no
     * manifest at all.
     */
    const ANSWERS = {
      'Field duplicate (blind)': 'Sampling and analysis together — the only control that carries the act of collecting',
      'Field blank': 'Contamination from handling and from the air at the bore',
      'Trip blank': 'Contamination picked up in transit, in the cooler, by the containers themselves',
      'Equipment blank (rinsate)': 'Carry-over on equipment reused between two bores — the glossary’s equipment blank, and the rinsate a field officer asks for',
    };
    const roles = [...new Set(qcRows.map((s) => s.qc))].map((role) => {
      const rows = qcRows.filter((s) => s.qc === role);
      return [
        esc(role),
        '<span class="mk-tag mk-tag--neutral">field</span>',
        rows.map((r) => `<span class="mk-file mk-file--id">${esc(r.id)}</span>`).join('<br>'),
        rows.map((r) => `<span class="mk-muted">${esc(r.detail ?? r.parent)}</span>`).join('<br>'),
        esc(ANSWERS[role] ?? ''),
      ];
    });
    const lab = LAB_QC.map((q) => [
      esc(q.kind),
      '<span class="mk-tag mk-tag--neutral">laboratory</span>',
      `<span class="mk-file mk-file--id">${esc(q.id)}</span>`,
      `<span class="mk-muted">${esc(q.parent)}</span>`,
      esc(q.answers),
    ]);
    return (
      '<h2 class="mk-h2" style="margin-top:1.4rem">2026-Q2-GW — the sample manifest</h2>' +
      C.tabs([
        { label: 'Samples', count: EVENT_SAMPLES.length, current: true },
        { label: 'Field observations' },
        { label: 'Results' },
        { label: 'QC linkage', count: qcRows.length },
        { label: 'Documents', count: 4 },
        { label: 'Audit' },
      ]) +
      table({
        // The caption sits inside the panning region, so a long one is cut
        // at the viewport edge on a phone rather than wrapping. One clause
        // here; the argument goes in a paragraph under the table, which wraps.
        caption: 'Event → sample → test → result, in one view.',
        head: ['Sample', 'Location', 'Matrix', 'Collected · AWST', 'Depth', 'QC role', 'Parent', 'Containers', 'Results', 'State'],
        rows: EVENT_SAMPLES.map((s) => [
          `<span class="mk-file mk-file--id">${esc(s.id)}</span>`,
          s.location === '—' ? '<span class="mk-num mk-num--nil">—</span>' : loc(s.location),
          esc(s.matrix),
          `<span class="sf-instant">${esc(s.collected.replace(' AWST', ''))}</span>`,
          esc(s.depth),
          s.qc === '—' ? '<span class="mk-num mk-num--nil">primary</span>' : `<span class="mk-tag mk-tag--new">${esc(s.qc)}</span>`,
          s.parent === '—'
            ? '<span class="mk-num mk-num--nil">—</span>'
            : s.parent.startsWith('WDL-')
              ? `<span class="mk-file mk-file--id">${esc(s.parent)}</span>`
              : `<span class="mk-muted">${esc(s.parent)}</span>`,
          `<span class="mk-num">${s.containers}</span>`,
          // Two columns became one: "13 of 14" is the sentence a reader was
          // making out of them anyway, and the pair cost a column that the pan
          // then hid at every width.
          `<span class="mk-num${s.results < s.tests ? ' mk-num--warn' : ''}">${s.results} of ${s.tests}</span>`,
          C.status(s.state, s.state === 'results-partial' ? 'warn' : 'good'),
        ]),
        kind: 'matrix',
        label: 'Sample manifest for round 2026-Q2-GW',
      }) +
      '<p class="mk-tight">Every QC sample names its parent <em>by code</em>. The incumbent alternative is a naming convention — <code class="mk-file">MW05-DUP</code> beside <code class="mk-file">MW05</code>, related by a substring and by nothing the database knows, and unrelated the moment somebody types <code class="mk-file">MW05 DUP</code>.</p>' +
      `<p class="mk-tight"><strong>${containers} containers</strong> across ${EVENT_SAMPLES.length} samples — the same ${containers} the ` +
      `<a class="mk-ref" href="#ecoc">chain of custody</a> sealed on 14 May and the same ${containers} the laboratory reconciled on ` +
      `arrival (<a class="mk-ref" href="#receipt">38 of 38</a>). Three screens, one addition: a manifest that cannot be added up to the ` +
      'number on the custody form is the first thing a challenge finds.</p>' +
      notice(
        'warning',
        `${esc(Q2_OVERDUE.location)} is not on this manifest, and that is the finding rather than an omission.`,
        `The 2026 Q2 window closed on ${esc(Q2_OVERDUE.due)} in Australia/Perth and the bore yielded no sample — it is <strong>${esc(Q2_OVERDUE.phrase)}</strong> on the <a class="mk-ref" href="#programme">programme</a> and short nine results on the <a class="mk-ref" href="#dqa">data quality assessment</a>. A manifest that quietly listed it, or that omitted the row without saying so, would let an overdue round read as collected. What the <a class="mk-ref" href="#field-capture">field record</a> adds is <em>why</em>: the crew turned back at a flooded creek crossing on 13 May and found the bore <strong>dry</strong> on 14 May — and both dispositions are still on the tablet, which is precisely why the countdown is still running.`,
      ) +
      /*
       * PR-1, the round-level half. `#field-capture` owns the session; this
       * screen owns the round as a record, so it carries the dispositions and
       * the preflight as a summary. Every number is the same computation the
       * session screen makes, run over the same sessions — a second count
       * written here would be the register-disagrees-with-the-detail failure
       * this file's header names.
       */
      panel(
        'What the field crew found, location by location',
        table({
          caption: `The round's seven planned locations and the disposition each one carries. Sampled is one of seven states, and the other six are not absences.`,
          head: ['Location', 'Visits', 'Disposition', 'Reason', 'Samples on the manifest', 'On the record'],
          scroll: true,
          label: 'Field dispositions for round 2026-Q2-GW',
          rows: FIELD_ROUND.current.map((sn) => {
            const visits = FIELD_ROUND.sessions.filter((x) => x.location === sn.location);
            const d = FIELD_ROUND.disposition(sn.disposition);
            return [
              loc(sn.location),
              visits.length > 1
                ? `<span class="mk-num mk-num--warn">${visits.length}</span><small>${esc(visits.map((v) => FIELD_ROUND.disposition(v.disposition).label.toLowerCase()).join(', then '))}</small>`
                : `<span class="mk-num">1</span>`,
              `<span class="mk-dispo mk-dispo--${d.tone}"><span class="mk-dispo__glyph" aria-hidden="true">${esc(d.glyph)}</span>${esc(d.label)}</span>`,
              sn.dispositionReason ? `<span class="mk-muted">${esc(sn.dispositionReason)}</span>` : '<span class="mk-num mk-num--nil">not required</span>',
              sn.samples.length ? `<span class="mk-num">${sn.samples.length}</span>` : '<span class="mk-num mk-num--nil">0</span>',
              sn.synced ? C.status('yes', 'good') : C.status('on the device', 'warn'),
            ];
          }),
        }) +
          `<p class="mk-tight">${FIELD_ROUND.preflight.sampled} sampled · ${FIELD_ROUND.preflight.dry} dry · ${FIELD_ROUND.preflight.visits} visits to ${FIELD_ROUND.preflight.planned} bores. The manifest above lists ${EVENT_SAMPLES.filter((x) => x.qc === '—').length} primary samples from ${FIELD_ROUND.preflight.sampled} bores, and the two counts agree because they are the same sessions read twice.</p>`,
      ) +
      panel(
        'The round is not complete, and this is what holds it',
        table({
          caption: 'The preflight, summarised at round level. The full version, and the control it gates, are on the field record.',
          head: ['Check', 'Count', 'State'],
          rows: [
            ['Locations dispositioned', `${FIELD_ROUND.preflight.dispositioned} of ${FIELD_ROUND.preflight.planned}`, C.status('clear', 'good')],
            ['…and written to the record', `${FIELD_ROUND.preflight.onRecord} of ${FIELD_ROUND.preflight.planned}`, C.status('holds the round', 'warn')],
            ['Sampled · dry', `${FIELD_ROUND.preflight.sampled} · ${FIELD_ROUND.preflight.dry}`, C.status('clear', 'good')],
            ['Duplicates collected', `${EVENT_SAMPLES.filter((x) => x.qc === 'Field duplicate (blind)').length} of ${EVENT_SAMPLES.filter((x) => x.qc === 'Field duplicate (blind)').length}`, C.status('clear', 'good')],
            ['Instruments with a post-round check', `${FIELD_ROUND.preflight.postChecked} of ${FIELD_ROUND.preflight.instruments}`, C.status('holds the round', 'warn')],
            ['Unsynced mandatory fields', String(FIELD_ROUND.preflight.pendingFields), C.status('holds the round', 'warn')],
            ['Chain of custody created', `1 — <a class="mk-ref" href="#ecoc">${esc(CUSTODY_CHAIN.id)}</a>`, C.status('clear', 'good')],
          ].map(([what, count, state]) => [`<strong>${esc(what)}</strong>`, cell(count), state]),
        }) +
          `<p class="mk-tight">Three of the seven lines hold the round. A round marked complete with a bore outstanding is the failure the <a class="mk-ref" href="#programme">programme</a> has named since the third pass, and the completion control refuses rather than being greyed out with no reason.</p>` +
          `<p class="mk-tight mk-muted"><strong>Two states, and they are not the same claim.</strong> The register above reads <em>results-complete</em>, which says every sample that was collected has its results back. This says the <em>round</em> is not complete, which is a fact about the field record — one disposition still on a tablet, one instrument with no post-round check. A product that ran the two together would let a round close because a laboratory finished.</p>` +
          `<div class="mk-actions"><a class="mk-btn" href="#field-capture">The field record, bore by bore</a><a class="mk-btn" href="#purge">The stabilisation series</a><a class="mk-btn" href="#programme">What the round owes</a></div>`,
      ) +
      panel(
        'The QC taxonomy, closed — and split by where each control is made',
        table({
          caption: 'Every control this round rests on, what it is made from, and the question it answers.',
          head: ['Control', 'Made', 'This round', 'Parent', 'What it answers'],
          rows: [...roles, ...lab],
          kind: 'matrix',
          label: 'QC taxonomy for round 2026-Q2-GW',
        }) +
          '<p class="mk-tight">The split is the point. A <em>field</em> duplicate and a <em>laboratory</em> duplicate are both duplicates and they are not the same control: one carries the act of collecting and the other does not, so a pair that disagrees says something different depending on which it was. Products that list them under one word have thrown away the only thing the pair was collected to separate.</p>' +
          `<p class="mk-tight">The bench controls belong to the <a class="mk-ref" href="#batches">laboratory batch</a>, not to this round — a control sample applies to a batch, which is what makes “which results does this failed spike qualify” answerable. The matrix spike on ${esc(LAB_QC.find((q) => q.kind === 'Matrix spike').parent)} is the one that failed, and it qualifies every zinc result in ${esc(LAB_QC.find((q) => q.kind === 'Matrix spike').batch)} rather than the sample it was made from.</p>` +
          '<p class="mk-tight mk-muted">No composites. FR-1.7’s depth intervals and increment traceability are soil and sediment work, staged S8 — every row above is a discrete grab, and drawing a composite here would be drawing a matrix the slice does not carry.</p>',
      )
    );
  })() +
  cols(
    panel(
      'A blind duplicate stays blind, and the link is still recorded',
      `<p class="mk-tight">Two field duplicates this round — ${EVENT_SAMPLES.filter((s) => s.qc === 'Field duplicate (blind)').map((s) => `<span class="mk-file">${esc(s.id)}</span>`).join(' and ')} — and the laboratory was told about neither. The link exists in the record from the moment the sample was collected, so the RPD can be computed, and the laboratory never had the chance to make two results agree.</p>` +
        '<p class="mk-tight">The distinction the screen has to keep is between <em>the laboratory did not know</em> and <em>we do not know</em>. Showing the parent here is correct; showing it on anything the laboratory receives is not.</p>' +
        C.card({
          tone: 'new',
          head: '<span class="mk-queue__kind">QC linkage</span>',
          body: 'WDL-26Q2-004 → parent WDL-26Q2-003 · MW05 · declared at collection 2026-05-13 08:40 AWST by A. Nakamura. Zinc RPD 38.2% against a 30% limit — <a class="mk-ref" href="#qc">open in QA/QC</a>.',
        }),
    ),
    panel(
      'The planned round, before anything exists',
      '<p class="mk-tight">2026-Q3-GW has no samples, no results and no certificate. It is not an empty state — it is a real object with a window, a location list and an analyte suite, and it is what a missed round is measured against.</p>' +
        facts([
          ['Window', '1 Jul – 30 Sep 2026 · Australia/Perth'],
          ['Opens', '2026-07-01 00:00 AWST — 2026-06-30 16:00 UTC'],
          ['Locations', '7 groundwater bores'],
          ['Analyte suites', 'Field parameters · dissolved metals · nutrients · PFAS'],
          ['Expected results', '63'],
          ['Responsible', 'A. Nakamura'],
        ]),
    ),
  )
);

const quarantine = () => (
  head('Held rows', 'Everything that did not make it into the record, why, and the way out of each one.', {
    route: '/projects/:projectId/held',
    toolbar: C.exportMenu() + C.btn('Re-run the map stage'),
  }) +
  stats([
    stat('3', 'held right now', 'warn'),
    stat('1', 'resolved this week', 'good'),
    stat('112', 'held in the migration'),
    stat('0', 'silently dropped', 'good'),
  ]) +
  notice(
    'warning',
    'A hold is a place with a way out, not a rejection.',
    'These rows were read, understood and deliberately not written, and each reason below is the one the rule itself produced rather than a code you have to look up. The count is on the import run, on the project home and on the work queue — a held row that is only visible if somebody thinks to look for it has been dropped, whatever the database says.',
  ) +
  table({
    caption: 'IMP-0239 · Yarra Regional Analytical · 42 rows read, 39 committed, 3 held.',
    head: ['Row', 'Subject', 'Why it was held', 'Rule', 'The way out', 'State'],
    rows: QUARANTINE.map((q) => [
      `<span class="mk-num">${q.row}</span>`,
      `<span class="mk-file">${esc(q.subject)}</span>`,
      `<span class="mk-muted">${esc(q.reason)}</span>`,
      `<code class="mk-file">${esc(q.rule)}</code>`,
      esc(q.wayOut),
      C.status(q.state, q.state === 'held' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Held rows on IMP-0239',
  }) +
  cols(
    panel(
      'Resolving one',
      C.field({
        label: 'Row 31 — validation state “QA-Hold”',
        control: C.combobox({
          value: '',
          placeholder: 'Map to a validation state…',
          open: true,
          suggestions: [
            { label: 'screened', detail: 'Reviewed against QA/QC, not yet validated', confidence: 0.71 },
            { label: 'unvalidated', detail: 'Received and parsed, no review applied', confidence: 0.44 },
            { label: 'rejected', detail: 'Reviewed and refused — excluded from evaluation', confidence: 0.12 },
          ],
          escape: 'Keep these six rows held, and ask Yarra Regional what QA-Hold means',
        }),
        hint: 'Nothing above 95%, so nothing is proposed. The importer will not guess a review judgement, because a wrong one is indistinguishable from a real one afterwards.',
      }) +
        C.checkbox({
          label: 'Save this answer to the Yarra Regional Analytical mapping profile',
          checked: true,
          hint: 'The same question is never asked twice. It stays visible as an applied decision on every later import, with your name on it — an auto-applied answer that hides itself is a different failure from asking again.',
        }) +
        '<div class="mk-actions">' + C.btn('Apply and re-run the map stage', 'primary') + C.btn('Leave held') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem"><strong>Nothing is written until the stage re-runs and you commit again.</strong> Resolving a hold rebuilds from the stored parse artifact; the file is not re-uploaded and the 39 rows already committed are untouched.</p>',
    ),
    panel(
      'Held, and there is genuinely nothing to accept',
      C.card({
        tone: 'bad',
        head: '<span class="mk-queue__kind">Row 24</span><span class="mk-queue__age">held 5 days</span>',
        body:
          '<p class="mk-queue__headline">Sulfate as SO₄ · MW09 · 2026-05-14</p>' +
          '<p class="mk-queue__context">The laboratory reported <code class="mk-file">−999</code>, which their format defines as <em>analysis aborted</em>. That is not a concentration, and there is no value here to accept, qualify or estimate. Storing it as a number would invent a measurement; storing it as zero would invent a clean result.</p>',
        foot: C.btn('Request a re-analysis', 'primary') + C.btn('Record that the round is short one result') +
          '<span class="mk-muted">No “accept anyway” — there is nothing to accept.</span>',
      }) +
        '<p class="mk-tight" style="margin-top:.7rem">Most held rows have an answer. This one does not, and the screen says so rather than offering a control that would produce a lie. An interface that always offers a way forward teaches people to take it.</p>',
    ),
  )
);

/* ================================================================== *
 * J3 addition — one result, with everything true about it at once
 * ================================================================== */

const resultDetail = () => {
  const R = RESULT_DETAIL;
  return (
    head(`${esc(R.reported)} — ${esc(R.analyte)}`, 'One result: what was measured, what could not be, and what anyone has said about it.', {
      route: '/projects/:projectId/results/:resultId',
      toolbar: C.lineageButton('Open lineage') + C.exportMenu() + C.btn('Annotate', 'primary'),
    }) +
    C.tabs([
      { label: 'Record', current: true },
      { label: 'Outcomes', count: 2, dot: 'warn' },
      { label: 'Annotations', count: 1 },
      { label: 'QC', count: 3 },
      { label: 'Supersession' },
      { label: 'Documents', count: 2 },
      { label: 'Audit' },
    ]) +
    C.card({
      tone: 'warn',
      head: '<span class="mk-queue__kind">The number, as reported</span>' +
        '<span class="mk-queue__age">Certificate ' + esc(R.certificate) + '</span>',
      body:
        `<div class="mk-lineage__subject" style="margin:0">` +
        `<span class="mk-lineage__value">${esc(R.reported)}</span>` +
        `<span class="mk-lineage__meta">${esc(R.detect)} — the laboratory's own notation, kept verbatim. ` +
        'This is never rendered as <code class="mk-file">1.0</code>, and never as <code class="mk-file">0</code>, ' +
        'and never as a substituted half-limit. A censored value that looks like a measurement is the defect ' +
        'this product is least allowed to have.</span></div>',
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">The record</h2>' +
    facts([
      ['Analyte', `${esc(R.analyte)} ${C.why('The dictionary resolved “Cd-diss” from this laboratory to this analyte through the Pilbara Analytical Services mapping profile, learned 2024-03-11 by A. Nakamura and applied 44 times since.')}`],
      ['Location', loc(R.location)],
      ['Sample', `<span class="mk-file">${esc(R.sample)}</span>`],
      ['Collected', `<span class="sf-instant">${esc(R.collected)}</span>`],
      ['Analysed', `<span class="sf-instant">${esc(R.analysed)}</span>`],
      ['Method', esc(R.method)],
      ['Detect status', `<strong>${esc(R.detect)}</strong>`],
      ['Limit of reporting (LOR)', `<span class="mk-num">${esc(R.lor)}</span>`],
      ['Method detection limit (MDL)', `<span class="mk-num">${esc(R.mdl)}</span>`],
      ['Practical quantitation limit (PQL)', `<span class="mk-num">${esc(R.pql)}</span>`],
      ['Certificate', `<a class="mk-ref" href="#certificate">${esc(R.certificate)}</a>`],
      ['Validation state', tag('screened', 'warn')],
    ]) +
    notice(
      'default',
      'Three limits, and they are not the same number.',
      'The incumbents carry these separately too — this is parity, not a differentiator — and the bar is that they never collapse into one. An LOR is what the laboratory will report to; an MDL is what the method can distinguish from noise; a PQL is what it can quantify reliably. Evaluating against a criterion uses the LOR, and the other two stay on the record because a re-analysis argument is made from them.',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Assessed against each criteria set</h2>' +
    table({
      caption: 'One row per criteria set, evaluated concurrently. There is no single verdict, because there is no single criterion.',
      head: ['Criteria set', 'Criterion', 'Outcome', 'Why'],
      rows: R.outcomes.map((o) => [
        esc(o.set),
        `<span class="mk-num">${esc(o.criterion)}</span>`,
        `<span class="sf-result">${mark(o.outcome, o.set)}<span style="margin-left:.4rem">${esc(o.outcome)}</span></span>`,
        `<span class="mk-muted">${esc(o.why)}</span>`,
      ]),
    }) +
    outcomeLegend() +
    C.card({
      tone: 'bad',
      head: '<span class="mk-queue__kind">The state that is not a pass</span>',
      body:
        '<p class="mk-tight">A non-detect at an LOR of 1.0 µg/L against a criterion of 0.54 µg/L means <strong>nothing was measured either way</strong>. The laboratory did not find cadmium above 1.0; the criterion sits below that; the result is silent about the criterion.</p>' +
        '<p class="mk-tight">An incumbent renders this as compliant by default, and a documented support thread records exactly that happening — <code class="mk-file">&lt;0.60</code> against a 0.5 standard, flagged in the alert email and shown as a pass in the chemistry table until a non-default setting was enabled. Two surfaces of the same product disagreed, and the default was the wrong one.</p>' +
        '<p class="mk-tight">Here it is its own state, identically on every surface that shows it: this page, the crosstab, the box plot, the summary table, the report and the Excel export.</p>',
    }) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Qualifiers and annotation</h2>' +
    cols(
      panel(
        'Annotations — a practitioner’s words, kept apart from the laboratory’s',
        table({
          head: ['Code', 'Source', 'Meaning'],
          rows: R.qualifiers.map((q) => [`<strong class="mk-file">${esc(q.code)}</strong>`, tag(q.source, 'neutral'), esc(q.meaning)]),
        }) +
          R.annotations
            .map(
              (a) =>
                C.card({
                  tone: 'new',
                  head: `<span class="mk-queue__kind">Annotation · ${esc(a.by)}</span><span class="mk-queue__age">${esc(a.at)}</span>`,
                  body: `<p class="mk-tight">${esc(a.text)}</p>`,
                  foot: `<span class="mk-tag mk-tag--new">Flows to ${esc(a.flowsTo)}</span><span class="mk-muted">Attributed, audited, and it survives a supersession of the value it is about.</span>`,
                }),
            )
            .join('') +
          C.field({
            label: 'Add an annotation',
            control: C.textarea({ placeholder: 'What a reader of the report needs to know about this number…', rows: 3 }),
            hint: 'Free text, yours, and never mixed with the laboratory’s qualifier codes. Tick below and it reaches the report rather than dying here — which is the whole reason people keep this in a spreadsheet instead.',
          }) +
          C.checkbox({ label: 'Carry this into the report’s data-quality section', checked: true }) +
          '<div class="mk-actions">' + C.btn('Save annotation', 'primary') + '</div>',
      ),
      panel(
        'Where this number is used',
        '<p class="mk-tight">Annotating or superseding a value is only safe if you can see what it feeds.</p>' +
          table({
            head: ['Used by', 'How'],
            rows: [
              [`<a class="mk-ref" href="#crosstab">Results crosstab</a>`, '2026 Q2 · MW05 column'],
              [`<a class="mk-ref" href="#qc">QA/QC workspace</a>`, 'Reporting-limit-above-criterion check'],
              [`<a class="mk-ref" href="#statistics">Summary statistics</a>`, 'Kaplan–Meier — carried as censored, never substituted'],
              [`<a class="mk-ref" href="#hydrochem">Box plot, Figure 6</a>`, 'Drawn below the axis break with the censored symbol'],
              [`<a class="mk-ref" href="#report">Report §3, §4</a>`, 'Data-quality paragraph and the Q2 crosstab table'],
            ],
          }) +
          C.stateBlock('partial', {
            headline: 'One consumer could not be resolved.',
            detail:
              'A saved view owned by another user (R. Whitmore, “Compliance boundary — Table 4”) may reference this analyte; your binding does not let you read their private views. The count above is therefore a floor, and the screen says so rather than showing five as though it were all of them.',
          }),
      ),
    ) +
    /*
     * PR-3a on the result page: the same chain, read from the same array.
     *
     * This result and the PFAS total came out of the same bottle —
     * WDL-26Q2-003 — so the ten hops from the bore to the bench are not
     * *like* the ones on `#lineage`, they are the same records. The page
     * renders `PROVENANCE.boreToBench` through the same builder the lineage
     * screen uses, which is the wave-6 pattern applied here: one source, drawn
     * twice, and a bore that cannot be described differently on two screens.
     */
    '<h2 class="mk-h2" style="margin-top:1.4rem">Where this sample came from</h2>' +
    `<p class="mk-tight">The provenance of this number does not begin at the certificate. These are the ${PROVENANCE.boreToBench.length} hops from the bore to the laboratory bench, and they are the record itself rather than a summary of it — <a class="mk-ref" href="#lineage">the lineage screen</a> renders these same steps from the same source, because ${esc(RESULT_DETAIL.sample)} is the bottle both this result and the PFAS total came out of.</p>` +
    chainList(PROVENANCE.boreToBench) +
    notice(
      'default',
      `The two chains part at the bench, and the divergence is the ${PROVENANCE.pfasOnly.length} hops this one does not take.`,
      `Everything above is shared: the same bore, the same session, the same purge, the same custody transfers, the same cooler at ${esc(RECEIPT.checks[0].found)}. From the bench they separate — cadmium was determined in <a class="mk-ref" href="#batches">${esc(METALS_BATCH.id)}</a> by ${esc(RESULT_DETAIL.method)}, and the PFAS fraction left on a subcontract to another laboratory under its own custody record. That divergence is why a batch-level qualifier reaches one and not the other, and it is the thing a chain drawn per-certificate rather than per-sample cannot show.`,
    ) +
    `<div class="mk-actions"><a class="mk-btn" href="#lineage">Open the full chain, bore to consequence</a><a class="mk-btn" href="#field-capture">The bore session that collected it</a><a class="mk-btn" href="#ecoc">Who held it, and when</a></div>`
  );
};

/* ================================================================== *
 * J5 addition — what has already gone out
 * ================================================================== */

const submissionArchive = () => (
  head('Submissions', 'What was sent, when, by whom, and against which snapshot. None of it can change.', {
    route: '/projects/:projectId/submissions',
    toolbar: C.exportMenu() + C.btn('Record an external submission'),
  }) +
  stats([
    stat('4', 'submissions on record'),
    stat('3', 'accepted', 'good'),
    stat('1', 'acknowledged, awaiting response'),
    stat('0', 'unevidenced', 'good'),
  ]) +
  notice(
    'default',
    'This register is read-only by construction, and the controls that would edit it do not exist.',
    'A submission is a thing that happened. Correcting one means issuing a new submission that supersedes it, which is a row here rather than an edit to a row here — and that distinction is the difference between a system of record and a shared folder.',
  ) +
  table({
    caption: 'Newest first. Every row resolves to the exact bytes that were sent.',
    head: ['Reference', 'What', 'To', 'Submitted', 'By', 'Snapshot', 'Delivery evidence', 'State'],
    rows: SUBMISSIONS.map((s) => [
      `<strong class="mk-file">${esc(s.ref)}</strong>`,
      esc(s.what),
      esc(s.to),
      `<span class="sf-instant">${esc(s.submitted)}</span>`,
      esc(s.by),
      `<a class="mk-ref" href="#snapshot">${esc(s.snapshot)}</a>`,
      `<a class="mk-ref" href="#documents">${esc(s.evidence)}</a>`,
      C.status(s.state, 'good'),
    ]),
    kind: 'matrix',
    label: 'Submission archive',
  }) +
  cols(
    panel(
      'Regenerating a submission four years later',
      '<p class="mk-tight">SNAP-0088 bound the 2025 Annual Environmental Report. Re-running it today produces a byte-identical document, because the snapshot froze every input rather than pointing at live data.</p>' +
        facts([
          ['Snapshot', 'SNAP-0088 · taken 2025-09-26 16:18 AWST'],
          ['Results bound', '11,204 · by identity, not by query'],
          ['Criteria versions', 'ANZG 2018.1 · Licence Table 4 2019.1 — the version in force then'],
          ['Figure configurations', '14, at the versions they held that day'],
          ['Template', 'Wandalup corporate template v3 (.dotx) · retained'],
          ['Analyte dictionary', '2025.3'],
          ['Regenerated', '2026-06-02 during a restore drill — identical to the byte'],
        ]) +
        '<div class="mk-actions">' + C.btn('Regenerate and compare', 'primary') + C.btn('Download what was sent') + '</div>' +
        '<p class="mk-tight" style="margin-top:.6rem">Two results were superseded after this went out. The regeneration still produces the 2025 document, and the supersessions are visible against it rather than folded into it — a snapshot that quietly improved would make the archive useless as evidence.</p>',
    ),
    panel(
      'Scheduled delivery, and what happens when it fails',
      table({
        head: ['Obligation', 'Channel', 'Last run', 'Outcome'],
        scroll: true, label: 'Scheduled deliveries',
        rows: [
          ['Quarterly discharge return', 'DWER portal · manual lodgement', '2026-04-24', C.status('accepted', 'good')],
          ['Exceedance notification', 'Email to the nominated officer', '2026-05-22', C.status('acknowledged', 'good')],
          ['Monthly TSF summary', 'Webhook to the operator’s document system', '2026-08-01', C.status('delivered', 'good')],
          ['Monthly TSF summary', 'Webhook', '2026-07-01', C.status('failed — retried, then escalated', 'bad')],
        ],
      }) +
        '<p class="mk-tight" style="margin-top:.6rem">A destination is a row in the database and nothing in the alerting code holds a URL. There is no Strataflow-operated relay in the path, redirects are refused rather than followed, and a failed delivery escalates to a person rather than retrying into silence.</p>',
    ),
  )
);

/* ================================================================== *
 * J6 addition — the take against the entitlement (FR-5.6, FR-5.5)
 * ================================================================== */

/**
 * Water take against entitlement.
 *
 * The one route in the product this catalogue had never drawn. It sits in
 * this job rather than beside the hydrographs because everything on it is a
 * licence obligation: the volume is a legal limit, the flag is a warning about
 * a return, and the question it answers — *are we going to be over* — is asked
 * by the person who signs the return, not by the person reading a hydrograph.
 * The product parents it under Locations, which is the other axis and is
 * honoured in the by-section view.
 *
 * Three decisions are made on the page rather than described.
 *
 * **The year runs when the instrument says.** October, not July — a fiscal
 * boundary borrowed by habit would put a third of this year's take in last
 * year's return — and the year is named by the month it ends.
 *
 * **The projection has a rule and the rule is printed**, because the two
 * defensible rules land on opposite sides of the flag: complete months only
 * gives 93.1%, counting the part month gives 89.2%, and a flag that changes
 * with an unstated convention is not a flag.
 *
 * **A censored concentration in a load is a decision, not a number.** The
 * quarter carries the interval its bounding substitutions give; the four
 * treatments sit beside it, and the half-LOR column is the one FR-5.8 refuses
 * as a default.
 *
 * No figure is drawn here. A monthly-volume bar is not among the twelve
 * approved plates, and the grammar fence says a new family needs a written
 * proposal before it is drawn rather than after.
 */
const waterScreen = () => {
  const W = WATER;
  const ml = megalitres;
  const num = (kl, tone = '') => `<span class="mk-num${tone ? ` mk-num--${tone}` : ''}">${ml(kl)}</span>`;
  const kl = (v) => v.toLocaleString('en-AU');
  const ord = (n) => `${n}${n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'}`;

  /*
   * Estimated volumes read `≈` and metered ones do not, so the basis survives
   * a photocopier and a screen reader alike — the glyph carries it, the colour
   * repeats it, and the hidden word says it in full.
   */
  const takeCell = (c, month) => {
    if (!c) return '<span class="mk-num mk-num--nil">—</span>';
    if (c.basis === 'estimated')
      return `<span class="mk-num mk-num--warn">≈ ${ml(c.kl)}</span><span class="sf-visually-hidden"> ML, estimated, not metered</span>`;
    return (
      `<span class="mk-num">${ml(c.kl)}</span>` +
      `<span class="sf-visually-hidden"> ML, metered${month.complete ? '' : ' — totaliser reading, the period has not ended'}</span>`
    );
  };

  const monthHead = W.months.map((m) =>
    m.complete ? esc(m.label) : `${esc(m.label)}<small>to the ${ord(m.elapsed)}</small>`,
  );

  const takeRows = W.bores.map((b) => [
    `${loc(b.code)}<small>${esc(b.position)}</small>`,
    b.meter
      ? `${esc(b.meter)}<small>verified ${esc(b.verified)}</small>`
      : `<span class="mk-num mk-num--warn">no meter</span><small>estimated from pump hours</small>`,
    ...b.cells.map((c, i) => takeCell(c, W.months[i])),
    `<strong>${num(b.recordKl)}</strong>`,
  ]);
  takeRows.push([
    '<strong>All bores</strong>',
    `<span class="mk-muted">${W.estimatedCount} of ${W.recordCount} records estimated</span>`,
    ...W.monthTotals.map((m) =>
      m.estimated
        ? `<strong class="mk-num mk-num--warn">≈ ${ml(m.kl)}</strong>` +
          `<span class="sf-visually-hidden"> ML, of which ${m.estimated === 1 ? 'one volume is' : `${m.estimated} volumes are`} estimated</span>`
        : `<strong class="mk-num">${ml(m.kl)}</strong><span class="sf-visually-hidden"> ML, every volume metered</span>`,
    ),
    `<strong>${num(W.takenKl)}</strong>`,
  ]);

  const loadRow = (r) => [
    esc(r.analyte),
    `${esc(r.quarter)}<small>${esc(r.returned)}</small>`,
    num(r.kl),
    r.censored
      ? `<span class="mk-num mk-num--warn">${esc(r.conc)}</span><span class="sf-visually-hidden"> — censored, below the limit of reporting</span>`
      : `<span class="mk-num">${esc(r.conc)}</span>`,
    `<span class="mk-muted">${esc(r.unit)}</span>`,
    r.censored
      ? `<span class="mk-num mk-num--warn">${r.low.toFixed(1)} – ${r.high.toFixed(1)}</span> <span class="mk-muted">${esc(r.loadUnit)}</span>`
      : `<span class="mk-num">${r.load.toFixed(1)}</span> <span class="mk-muted">${esc(r.loadUnit)}</span>`,
    r.complete ? C.status('reported', 'good') : C.status('period open', 'warn'),
  ];

  const censoredRows = W.load.rows.filter((r) => r.censored);

  return (
    head('Water take against entitlement', 'How much has been taken, against what the licence allows, for the entitlement year in force.', {
      route: '/projects/:projectId/water',
      toolbar: C.exportMenu() + C.btn('Enter a monthly volume') + C.btn('Prepare the annual water return', 'primary'),
    }) +
    stats([
      stat(`${ml(W.takenKl)} ML`, `taken — ${W.complete.length} complete months`),
      stat(`${ml(W.entitlementKl)} ML`, `entitlement, year to ${esc(W.year.to)}`),
      stat(`${W.pctTaken}%`, `of the entitlement, at ${W.pctYear}% of the year`, 'warn'),
      stat(`${W.projectionPct}%`, 'projected at year end', W.flagged ? 'bad' : 'good'),
      stat(`${W.estimatedCount} of ${W.recordCount}`, 'volumes estimated, not metered', 'warn'),
    ]) +
    notice(
      W.flagged ? 'warning' : 'default',
      `${W.flagged ? '▲ Approaching the entitlement' : '● Within the entitlement'} — projected ${ml(W.projectionKl)} ML at 30 September, ${W.projectionPct}% of ${ml(W.entitlementKl)} ML.`,
      `The flag trips at <strong>${W.threshold}%</strong> projected, and the projection is the mean of the ${W.complete.length} complete months — ` +
        `${ml(W.rateKl)} ML a month — over twelve. It is a warning about a return, not a breach: ${ml(W.headroomKl)} ML of the entitlement ` +
        `is unused, the ${W.monthsRemaining} months left may average ${ml(W.allowedKl)} ML, and the year to date has averaged ${ml(W.rateKl)} ML. ` +
        `Nothing is owed because of this flag, and that is deliberate — the obligation is the ` +
        `<a class="mk-ref" href="#obligations">annual water return</a>, which falls due whatever the number is.`,
    ) +
    cols(
      panel(
        'The entitlement year in force',
        facts([
          ['Entitlement', `<span class="mk-file">${esc(W.instrument.id)}</span> · ${ml(W.entitlementKl)} ML <span class="mk-muted">(${kl(W.entitlementKl)} kL)</span>`],
          ['Instrument', esc(W.instrument.kind)],
          ['Granted', `${esc(W.instrument.granted)} <span class="mk-muted">— the anniversary the year runs from</span>`],
          ['Year in force', `<strong>${esc(W.year.label)}</strong> · ${esc(W.year.from)} → ${esc(W.year.to)}`],
          ['Mirrored by', `<a class="mk-ref" href="#licence">${esc(LICENCE.id)} condition ${esc(W.instrument.mirror)}</a>`],
          ['Position as at', `<span class="sf-instant">${esc(W.asAt)}</span> · ${esc(PROJECT.timezone)}`],
        ]) +
          `<p class="mk-tight">${esc(W.year.why)}</p>` +
          `<p class="mk-tight">${esc(W.year.named)} ${esc(W.year.boundary)}</p>` +
          `<p class="mk-tight mk-muted">${esc(W.year.aligns)}</p>`,
      ),
      panel(
        'The running position',
        C.progress({
          pct: Math.round(W.pctTaken),
          label: `${ml(W.takenKl)} of ${ml(W.entitlementKl)} ML taken`,
          detail:
            `${W.pctTaken}% of the entitlement against ${W.pctYear}% of the year elapsed — ${W.elapsedDays} of ${W.yearDays} days. ` +
            `The comparison is the point: a volume without its share of the year is a number nobody can act on.`,
        }) +
          facts([
            ['On the record', `${num(W.takenKl)} ML <span class="mk-muted">${kl(W.takenKl)} kL · ${W.recordCount} extraction records</span>`],
            ['Headroom', `${num(W.headroomKl, 'good')} ML <span class="mk-muted">${kl(W.headroomKl)} kL</span>`],
            ['May, not yet a record', `${num(W.provisionalKl, 'warn')} ML <span class="mk-muted">totaliser at ${esc(W.asAt)} · ${ml(W.mayRateKl)} ML/month equivalent</span>`],
          ]) +
          `<p class="mk-tight"><strong>The comparison is made in kilolitres, not megalitres.</strong> ${kl(W.takenKl)} kL is ` +
          `${ml(W.takenKl)} ML displayed, and the entitlement is a legal limit — a rounding that lands a kilolitre over it would be an ` +
          `exceedance nobody caused.</p>` +
          `<p class="mk-tight mk-muted">May is a meter totaliser read on the 23rd, not an extraction record: an extraction record is a ` +
          `reported volume for a period that has ended. It is shown because a practitioner asks, and it is in no rate on this page.</p>`,
      ),
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">Monthly volumes, by bore</h2>' +
    table({
      caption: `Every extraction record in the ${esc(W.year.label)}, in megalitres. The last column is the year to 30 April — the months that have ended.`,
      head: ['Bore', 'Meter', ...monthHead, 'Records'],
      kind: 'matrix',
      label: 'Monthly extraction records by bore',
      rows: takeRows,
    }) +
    `<p class="mk-tight"><strong>≈</strong> marks a volume that was estimated rather than metered, so the basis reads across the row without ` +
    `reading the notes; on the totals row it marks a month that contains one. There is no third basis: a volume was measured by a meter or it ` +
    `was estimated, and a return that presented the two alike would overstate its own reliability.</p>` +
    cols(
      panel(
        'The two volumes nobody metered',
        W.estimates
          .map(
            (e) =>
              `<p class="mk-tight">${C.status('estimated', 'warn')} <strong>${esc(e.code)} · ${esc(e.month)}</strong> — ` +
              `${num(e.kl, 'warn')} ML from <span class="mk-file">${esc(e.how)}</span>. ${esc(e.why)}</p>`,
          )
          .join('') +
          `<p class="mk-tight">Together they are ${num(W.estimatedKl, 'warn')} ML — ` +
          `${Math.round((W.estimatedKl / W.takenKl) * 1000) / 10}% of the take on the record. The total above carries them because the ` +
          `entitlement counts every kilolitre however it was measured; what changes is the confidence, and that is printed rather than absorbed.</p>` +
          `<p class="mk-tight mk-muted">${esc(W.bores.find((b) => !b.meter).code)} has no meter at all and was decommissioned on ` +
          `2025-11-04, inside this year. A bore that no longer exists still took water in October, and dropping the row would make the ` +
          `year’s total smaller than the year’s take.</p>`,
      ),
      panel(
        'What the projection rests on',
        table({
          caption: 'Three defensible rules over the same volumes, and only one of them is in force.',
          head: ['Rule', 'What the rate is over', 'Projected', 'Against the flag'],
          rows: [
            [
              '<strong>Complete months, every bore</strong><small>in force</small>',
              `${W.complete.length} months <span class="mk-muted">Oct – Apr · ${W.bores.length} bores</span>`,
              `<strong class="mk-num">${ml(W.projectionKl)}</strong> ML · ${W.projectionPct}%`,
              C.status(`over ${W.threshold}%`, 'bad'),
            ],
            [
              'Counting May as a month',
              `${W.complete.length + 1} months <span class="mk-muted">Oct – May · ${W.bores.length} bores</span>`,
              `<span class="mk-num">${ml(W.altProjectionKl)}</span> ML · ${W.altProjectionPct}%`,
              C.status(`under ${W.threshold}%`, 'neutral'),
            ],
            [
              'Operating bores only',
              `${W.complete.length} months <span class="mk-muted">Oct – Apr · ${W.bores.filter((b) => b.lifecycle === 'operating').length} bores</span>`,
              `<span class="mk-num">${ml(W.operatingProjectionKl)}</span> ML · ${W.operatingProjectionPct}%`,
              C.status(`under ${W.threshold}%`, 'neutral'),
            ],
          ],
          scroll: true,
          label: 'Projection rules compared',
        }) +
          `<p class="mk-tight">A part month divided as though it were a whole one understates the rate by a fifth. And the rate in force runs ` +
          `${ml(W.decommissionedKl)} ML of ${esc(W.bores.find((b) => b.lifecycle !== 'operating').code)}’s October take forward for five more ` +
          `months, through a bore that was decommissioned on 2025-11-04 — on the ${W.bores.filter((b) => b.lifecycle === 'operating').length} ` +
          `bores still operating the rate is ${ml(W.operatingRateKl)} ML a month rather than ${ml(W.rateKl)}.</p>` +
          `<p class="mk-tight"><strong>So the position is marginal, and the flag says so rather than reading as a forecast.</strong> ` +
          `${W.projectionPct}% against a ${W.threshold}% threshold, with two defensible variations of the rule landing under it. Neither ` +
          `variation is applied here: which months and which bores a projection runs over is a rule, and a rule that decides a flag has to be ` +
          `configured and versioned before it is used, never chosen because it gives the quieter answer.</p>`,
      ),
      // The wide column goes to the table rather than to the prose: at the
      // default ratio the rules table's verdict column was cut at the panel
      // edge, and only a sideways pan would have found it.
      '2fr 3fr',
    ) +
    panel(
      'Recording May’s volume — refused, and why',
      '<p class="mk-tight">The obvious next act on this screen is to enter the number the meter is showing. It is refused, because the ' +
        'period it would be recorded against has not ended.</p>' +
        C.blastRadius({
          lede: `Recording ${ml(W.provisionalKl)} ML against May today would:`,
          rows: [
            { what: 'Take on the record', n: `${ml(W.takenKl)} → ${ml(W.takenKl + W.provisionalKl)} ML` },
            { what: 'Months in the rate', n: `${W.complete.length} → ${W.complete.length + 1}` },
            { what: 'Projection at year end', n: `${ml(W.projectionKl)} → ${ml(W.altProjectionKl)} ML` },
            { what: 'The approaching-limit flag', n: `${W.projectionPct}% → ${W.altProjectionPct}% — the flag clears` },
            { what: 'Water actually taken', n: '0 ML difference' },
          ],
          // The refused act is not drawn as a button. A control that says
          // "refused" beside a live primary is a control somebody clicks.
          action: 'Wait for the month to end',
          cancel: 'Correct a volume for a month that has ended',
          reversible:
            'The last two rows are the whole argument: the flag would clear without a litre less being taken, because a fuller-looking record changes what the rate is computed over. An extraction record is a reported volume for a period that has ended — and once the annual return is lodged the period is locked, so a wrong volume is corrected by supersession rather than edited.',
        }) +
        '<p class="mk-tight mk-muted"><strong>Refused:</strong> recording a totaliser reading as the month’s volume while the month is ' +
        'running. There is no control for it, rather than a control that warns — the reading is real and it is on the page above, and what ' +
        'it is not is a record of a period.</p>',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.4rem">Mass load by reporting period</h2>' +
    `<p class="sf-lede mk-tight">Volume metered at discharge point <strong>${esc(W.load.point)}</strong>, concentration sampled at ` +
    `${loc(W.load.monitoredAt)} — the point <a class="mk-ref" href="#licence">the licence names for it</a>, 200 m downstream. The load is ` +
    `therefore reported at the compliance point rather than at the outfall; moving the sample is a licence variation, not a setting on this ` +
    `screen.</p>` +
    table({
      caption: `${esc(W.load.formula)}. One grab sample per quarter, against the quarter’s metered volume.`,
      head: ['Analyte', 'Reporting period', 'Volume (ML)', 'Concentration', 'Unit', 'Load', 'Return'],
      kind: 'records',
      scroll: true,
      label: 'Mass load by reporting period',
      rows: W.load.rows.map(loadRow),
    }) +
    cols(
      panel(
        'A censored concentration is a decision, not a number',
        `<p class="mk-tight">Copper was below the limit of reporting in ${censoredRows.length} of the ${W.load.quarters.length} quarters. ` +
          `Nothing was measured, so no load can be computed — and a total that goes to a regulator is the last place to substitute a number ` +
          `nobody read. The quarter carries the interval its two bounding substitutions give, and the four treatments sit beside it.</p>` +
          table({
            caption: `Copper at ${esc(W.load.monitoredAt)}, 2025 Q4 — ${kl(censoredRows[0].kl)} kL at < ${censoredRows[0].lor.toFixed(1)} µg/L, under each treatment.`,
            head: ['Treatment', 'Load', 'What it asserts'],
            rows: censoredRows[0].treatments.map((t) => [
              esc(t.rule) + (t.rule === 'exclude' ? '<small>bound to the criteria set today</small>' : ''),
              t.gives === null
                ? '<span class="mk-num mk-num--nil">no load</span>'
                : `<span class="mk-num">${t.gives.toFixed(1)}</span> <span class="mk-muted">g</span>`,
              t.rule === 'exclude'
                ? 'The quarter has no reportable load — which is not the same as a quarter that discharged nothing.'
                : t.rule === 'zero'
                  ? 'That no copper left the site. Nothing measured says that.'
                  : t.rule === 'half the LOR'
                    ? 'A number nobody read, printed to one decimal. FR-5.8 refuses it as a default.'
                    : 'The most that could have been there — the upper bound, and true as one.',
            ]),
          }) +
          `<p class="mk-tight">The criteria set in force binds <strong>exclude</strong>, and that binding is not inherited here: evaluation ` +
          `asks whether one value is above a limit, and a load asks what total to report. The load is drawn as the interval — ` +
          `<span class="mk-num mk-num--warn">${censoredRows[0].low.toFixed(1)} – ${censoredRows[0].high.toFixed(1)} g</span> — with both bounds ` +
          `named. <a class="mk-ref" href="#criteria">The treatments the criteria set can bind</a> are the same four.</p>`,
      ),
      panel(
        'The year’s load, and what it does not claim',
        table({
          head: ['Analyte', 'Entitlement year to date', 'Basis'],
          rows: W.load.totals.map((t) => [
            esc(t.analyte),
            t.bounded
              ? `<span class="mk-num mk-num--warn">${t.low.toFixed(1)} – ${t.high.toFixed(1)}</span> <span class="mk-muted">${esc(t.loadUnit)}</span>`
              : `<span class="mk-num">${t.low.toFixed(1)}</span> <span class="mk-muted">${esc(t.loadUnit)}</span>`,
            t.bounded ? 'Bounded — two quarters censored' : 'Detected in every quarter',
          ]),
        }) +
          `<p class="mk-tight">${esc(W.load.says)}</p>` +
          `<p class="mk-tight mk-muted">October discharged nothing at all. A zero volume is not a missing reading and the row says which ` +
          `it is — a month with no discharge contributes no load, and a month nobody read would contribute an unknown one.</p>`,
      ),
    ) +
    panel(
      'What exceeding the entitlement would oblige',
      `<p class="mk-tight">${esc(W.instrument.mirrors)}</p>` +
        C.pipeline([
          { name: 'The take passes the entitlement', detail: `Measured in kilolitres against ${kl(W.entitlementKl)} kL, in the year 1 October to 30 September.`, state: 'wait' },
          { name: `${W.instrument.id} — the entitlement itself`, detail: 'Taking more than the licence permits is an offence under the Rights in Water and Irrigation Act, not a service failure.', state: 'wait' },
          { name: `${LICENCE.id} condition ${W.instrument.mirror}`, detail: 'The environmental licence mirrors the volume, so the same take breaches a condition here too.', state: 'wait' },
          { name: 'Condition 21 — notify on becoming aware', detail: 'As soon as practicable, from the timestamp awareness is recorded. The window is stored as null and read as owed now; no number is invented.', state: 'wait' },
          { name: 'The annual water return', detail: `Due 2026-10-31, on track. It states the volume taken in each month and the basis of each — which is why the ${W.estimatedCount} estimates are marked rather than blended.`, state: 'done' },
        ]) +
        `<p class="mk-tight">Every step above is a link to where it is answered: the ` +
        `<a class="mk-ref" href="#licence">condition</a>, the <a class="mk-ref" href="#obligations">return it discharges</a>, and the ` +
        `<a class="mk-ref" href="#notification">notification</a> that would run from becoming aware. The flag is the start of that chain ` +
        `rather than a tile on a dashboard, and today it is at the first step and nothing after it is owed.</p>` +
        `<p class="mk-tight mk-muted">${esc(W.instrument.scope)}</p>`,
    )
  );
};

/* ================================================================== *
 * J6 addition — the licence as an entity, not as a string on a header
 * ================================================================== */

const licenceScreen = () => {
  const L = LICENCE;
  /*
   * Counted from the conditions rather than typed beside them. The typed
   * version said 6 and named 7 the day the production bores became rows on
   * the location register — which is the shape every hand-kept count on this
   * catalogue has failed in.
   */
  const governed = new Set(
    L.conditions.flatMap((c) => c.governs.split(', ').map((g) => g.split(' ')[0]).filter((g) => /^[A-Z]{2,3}\d/.test(g))),
  );
  return (
    head(`Licence ${esc(L.id)}`, 'The conditions, what each one governs, and the report that discharges it.', {
      route: '/projects/:projectId/licence',
      toolbar: C.exportMenu() + C.btn('Record a variation'),
    }) +
    C.tabs([
      { label: 'Conditions', count: L.conditions.length, current: true },
      { label: 'Governed locations', count: governed.size },
      { label: 'Discharge points', count: L.dischargePoints.length },
      { label: 'Entitlements', count: L.entitlements.length },
      { label: 'Variations', count: 3 },
      { label: 'Documents', count: 5 },
      { label: 'Audit' },
    ]) +
    facts([
      ['Holder', esc(L.holder)],
      ['Regulator', esc(L.regulator)],
      ['Issued', esc(L.issued)],
      ['Expires', esc(L.expires)],
      ['Last varied', esc(L.lastVaried)],
      ['Conditions with a monitoring obligation', `${L.conditions.length} of 24`],
    ]) +
    notice(
      'warning',
      'A variation reaches forward, never back.',
      'Table 4 was tightened on 2024-07-01. Results collected before that date are evaluated against the 2019.1 limits that were in force when they were collected, and a report reissued today for 2023 Q4 still uses them. A licence that silently re-evaluated history would make every issued submission wrong the day it changed.',
    ) +
    '<h2 class="mk-h2" style="margin-top:1.2rem">Conditions</h2>' +
    table({
      caption: 'Each condition traced to the locations it governs and the submission that discharges it.',
      head: ['Condition', 'What it requires', 'Governs', 'Discharged by', 'State'],
      rows: L.conditions.map((c) => [
        `<strong class="mk-file">${esc(c.n)}</strong>`,
        esc(c.what),
        // A code is a link where it identifies a row on the register, and the
        // production bores are rows there now.
        c.governs.includes('MW') || c.governs.includes('SW') || c.governs.includes('PB')
          ? c.governs.split(', ').map((g) => (/^(MW|SW|PB)\d/.test(g) ? loc(g.split(' ')[0]) + esc(g.slice(g.split(' ')[0].length)) : esc(g))).join(', ')
          : esc(c.governs),
        `<a class="mk-ref" href="#obligations">${esc(c.discharges)}</a>`,
        // A third state arrived with 12(c): a condition a window has *tripped*
        // is not "met" and it is not merely "due", and rendering it as either
        // is the drift the tone map is here to refuse.
        C.status(c.state, c.state === 'due' ? 'warn' : c.state === 'triggered' ? 'bad' : 'good'),
      ]),
      kind: 'matrix',
      label: 'Licence conditions',
    }) +
    cols(
      panel(
        'Discharge points',
        table({
          head: ['Point', 'What', 'Limit', 'Monitored at'],
          rows: L.dischargePoints.map((d) => [
            `<strong class="mk-file">${esc(d.id)}</strong>`,
            esc(d.what),
            esc(d.limit),
            loc('SW01') + ' <span class="mk-muted">· 200 m downstream</span>',
          ]),
        }),
      ),
      /*
       * Every figure here is `WATER`'s — one source, read twice — so this
       * panel and the take screen cannot drift. The volume is not this
       * licence's to set: condition 23 mirrors a limit held on the water
       * licence, and the panel says so rather than presenting it as its own.
       */
      panel(
        'Entitlement, against what has been taken',
        L.entitlements
          .map(
            (e) =>
              facts([
                ['Entitlement', `<span class="mk-file">${esc(e.id)}</span> — ${esc(e.what)}`],
                ['Instrument', esc(e.instrument)],
                ['Mirrored here by', `condition <strong class="mk-file">${esc(e.condition)}</strong>, which restates the volume and does not set it`],
                ['Limit', `<span class="mk-num">${megalitres(WATER.entitlementKl)}</span> ML in the entitlement year`],
                ['Year in force', `${esc(WATER.year.from)} → ${esc(WATER.year.to)}`],
                ['Taken', `<span class="mk-num">${megalitres(WATER.takenKl)}</span> ML <span class="mk-muted">${WATER.complete.length} complete months, to ${WATER.asAt}</span>`],
                ['Headroom', `<span class="mk-num mk-num--good">${megalitres(WATER.headroomKl)}</span> ML <span class="mk-muted">over ${WATER.monthsRemaining} months</span>`],
              ]) +
              C.progress({
                pct: Math.round(WATER.pctTaken),
                label: `${megalitres(WATER.takenKl)} of ${megalitres(WATER.entitlementKl)} ML taken`,
                detail:
                  `${WATER.pctTaken}% of the entitlement against ${WATER.pctYear}% of the year elapsed. The comparison is the point — a ` +
                  'volume without its share of the year is a number nobody can act on.',
              }) +
              `<p class="mk-tight">${WATER.flagged ? '▲' : '●'} <strong>Projected ${megalitres(WATER.projectionKl)} ML at year end — ` +
              `${WATER.projectionPct}% of the entitlement</strong>, above the ${WATER.threshold}% flag. The running position, the projection’s ` +
              `basis and what exceeding would oblige are on ` +
              `<a class="mk-ref" href="#water">water take against entitlement</a>.</p>` +
              `<p class="mk-tight mk-muted">The year runs 1 October to 30 September because that is the water licence’s own anniversary, ` +
              `not this licence’s and not the fiscal year’s.</p>`,
          )
          .join(''),
      ),
    ) +
    panel(
      'What this condition is discharged by, all the way down',
      '<p class="mk-tight">Condition 12(b) is the one an inspector asks about, and answering it should not require assembling three screens from memory.</p>' +
        C.pipeline([
          { name: 'Condition 12(b)', detail: 'Groundwater quality at the compliance boundary must not exceed Table 4 limits.', state: 'done' },
          { name: 'Governs MW09 and MW11', detail: 'Membership resolved through the “Compliance boundary” location group, in force since 2019-03-01.', state: 'done' },
          { name: 'Evaluated against Licence Table 4 v2024.2', detail: '12 analytes · effective 2024-07-01 · the version in force at each result’s collection date.', state: 'done' },
          { name: 'Monitored by programme GW-QTR', detail: 'Quarterly, fiscal quarters ending June, resolved in Australia/Perth.', state: 'done' },
          { name: '2026 Q2 round', detail: `MW09 collected 2026-05-14, one result short. ${Q2_OVERDUE.location} yielded no sample — found dry on ${FIELD_ROUND.days[2].date}, disposition not yet synced, so the round reads ${Q2_OVERDUE.phrase}.`, state: 'fail', rerun: true },
          { name: 'Discharged by the quarterly report', detail: 'Not yet issued for 2026 Q2. The last discharge was WDL-QGR-2026Q1 on 2026-04-28.', state: 'wait' },
        ]),
    )
  );
};

/* ================================================================== *
 * J7 addition — the documents the lineage chain actually terminates at
 * ================================================================== */

const documents = () => (
  head('Documents', 'Certificates, custody forms, photographs and evidence — attached where they belong.', {
    route: '/projects/:projectId/documents',
    toolbar: C.exportMenu() + C.btn('Attach a document', 'primary'),
  }) +
  stats([
    stat('34', 'documents on this project'),
    stat('11', 'laboratory certificates'),
    stat('1.4 GB', 'in tenancy object storage'),
    stat('0', 'referenced but missing', 'good'),
  ]) +
  C.filterBar({
    controls: [
      C.field({ label: 'Attached to', control: C.select({ options: ['Anything', 'A location', 'A sampling event', 'A sample', 'An import run', 'A notification'], value: 'Anything' }) }),
      C.field({ label: 'Kind', control: C.select({ options: ['Any kind', 'Laboratory certificate', 'Chain of custody', 'Field photograph', 'Notification evidence', 'Construction record'], value: 'Any kind' }) }),
      C.field({ label: 'Added', control: C.dateRange({ from: '2026-04-01', to: '2026-08-23' }) }),
    ],
    chips: [C.chip('2026', { prefix: 'added' })],
    count: '6 of 34 documents',
  }) +
  table({
    caption: 'Every document is attached at a level of the hierarchy, and appears on the documents tab of everything below it.',
    head: ['File', 'Kind', 'Attached to', 'Added by', 'When', 'Size', 'Content hash', 'State'],
    rows: DOCUMENTS.map((d) => [
      `<a class="mk-ref mk-file" href="#certificate">${esc(d.name)}</a>`,
      esc(d.kind),
      esc(d.attachedTo),
      esc(d.by),
      `<span class="sf-instant">${esc(d.at)}</span>`,
      `<span class="mk-num">${esc(d.size)}</span>`,
      `<code class="mk-file">${esc(d.hash)}</code>`,
      C.status(d.state, d.state === 'superseded' ? 'warn' : d.state === 'lineage terminus' ? 'info' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Documents on this project',
  }) +
  cols(
    panel(
      'The chain terminates at the certificate, not at a filename',
      '<p class="mk-tight">A lineage that ends with the string <code class="mk-file">PAS2026-04417.pdf</code> has ended at a label. This one ends at the bytes: content-addressed, stored in the customer’s own object storage, and verified on read.</p>' +
        C.pipeline([
          { name: 'Result — 4.8 ng/L, PFOS + PFHxS at MW05', detail: 'Derived from two components, both detected.', state: 'done' },
          { name: 'Import run IMP-0239', detail: 'Committed 2026-05-19 10:22 by dokafor@wandalup.example.', state: 'done' },
          { name: 'Source file YAR-26-0881_Wandalup_PFAS.csv', detail: 'Rows 18 and 24 · stored verbatim, never the parsed form alone.', state: 'done' },
          { name: 'Certificate YAR-26-0881.pdf', detail: 'sha256:c4a1…88f2 · 1.1 MB · verified on read 2026-08-23 07:41. This is the terminus.', state: 'done' },
        ]) +
        '<p class="mk-tight">Full-fidelity export includes the documents. A customer leaving takes the certificates with the numbers, because numbers whose evidence stayed behind are not a record of anything.</p>',
    ),
    panel(
      'Uploading over a site link',
      C.progress({
        pct: 42,
        label: 'MW05-headworks-2026-05-13.jpg · 2.8 MB',
        detail: '1.2 MB of 2.8 MB · 38 KB/s · about 42 seconds left',
        resumable: true,
      }) +
        C.stateBlock('error', {
          headline: 'The connection dropped 61% of the way through PAS2026-04417.pdf.',
          detail:
            'Nothing partial was written and nothing was lost — 740 KB is held and the transfer resumes from there. This happens on a site link and it is not an error you caused; the upload will finish when the connection does.',
          action: 'Resume from 740 KB',
          secondary: 'Discard and start again',
        }),
    ),
  )
);

/* ================================================================== *
 * J8 additions — the project's own settings, the mapping memory, the units
 * ================================================================== */

const projectSettings = () => (
  head('Project settings', 'What this project is, what it evaluates against, and who can act in it.', {
    route: '/projects/:projectId/settings',
    toolbar: C.btn('Save changes', 'primary', { disabled: true }),
  }) +
  C.tabs([
    { label: 'Identity', current: true },
    { label: 'Criteria binding' },
    { label: 'Reporting calendar' },
    { label: 'Membership', count: MEMBERS.length },
    { label: 'Audit' },
  ]) +
  notice(
    'warning',
    'What a “project” is for a single-operator customer is not settled, and this screen cannot be finished until it is.',
    'Facility-coextensive — one project per site, always — or a work scope inside a facility, so a closure study and routine compliance monitoring are separate projects over the same bores? The first is simpler and matches every fixture. The second is what a consultancy would need, and the authorisation model already supports it. The screen is drawn against the first reading and says so, rather than quietly choosing.',
  ) +
  cols(
    '<section>' +
      panel(
        'Identity',
        C.field({ label: 'Project code', control: C.input({ value: 'MOCK-WDL', mono: true }), hint: 'Appears in the header, in every export filename and on every report cover. Changing it does not change the URL, which is a UUID.', required: true }) +
          C.field({ label: 'Project name', control: C.input({ value: 'Wandalup Operations' }), required: true }) +
          /*
           * The options are the facilities the seed actually holds, read off
           * `PROJECTS`. They were typed, and the third one — "Wanjina waste
           * facility" — named a facility no project has ever had, while the
           * second dropped a word from Kurrajong's. A select offering a
           * facility that does not exist is a select somebody can bind a
           * project to nothing with, and it was invisible because nothing
           * derived it. Wave 5's audit corroborated it; this is the fix.
           */
          C.field({
            label: 'Facility',
            control: C.select({ options: PROJECTS.map((pr) => pr.facility), value: PROJECT.facility }),
            hint: `The facility supplies the area hierarchy every location hangs from. The list is the ${PROJECTS.length} facilities on this instance, read from the projects that hold them — not a typed list that can name one nobody has.`,
          }) +
          C.field({ label: 'Jurisdiction', control: C.select({ options: ['Western Australia — DWER', 'Queensland — DES', 'New South Wales — EPA', 'Northern Territory — DEPWS'], value: 'Western Australia — DWER' }) }) +
          C.field({
            label: 'Timezone',
            control: C.select({ options: ['Australia/Perth', 'Australia/Brisbane', 'Australia/Darwin', 'Australia/Sydney'], value: 'Australia/Perth' }),
            hint: 'Every monitoring period, due date and countdown resolves here and never on the server. A quarterly round at a Pilbara bore begins at 16:00 UTC on 31 December — get this wrong and a round that was satisfied reads as missed while a spurious one reads as met.',
            required: true,
          }) +
          C.field({
            label: 'Coordinate reference system',
            control: C.select({ options: ['GDA2020 / MGA zone 50 (EPSG:7850)', 'GDA2020 / MGA zone 51 (EPSG:7851)', 'GDA94 / MGA zone 50 (EPSG:28350)'], value: 'GDA2020 / MGA zone 50 (EPSG:7850)' }),
            hint: 'GDA2020 and WGS84 agree only at epoch 2020.0 and separate by about 7 cm a year. A WGS84 coordinate carries its epoch; one arriving without an epoch is refused rather than assumed.',
            required: true,
          }),
      ) +
      panel(
        'Criteria bound to this project',
        table({
          head: ['Criteria set', 'Version', 'Applies to', ''],
          rows: [
            ['ANZG 2018 — 95% species protection', '2018.1', 'All groundwater locations', C.switchControl({ label: 'Bound', on: true })],
            ['Licence L8842/2019/1 — Table 4', '2024.2', 'Compliance boundary group', C.switchControl({ label: 'Bound', on: true })],
            ['Site-specific trigger values — TSF', '2025.1', 'MW05, MW07', C.switchControl({ label: 'Bound', on: true })],
            ['ANZG 2018 — 99% species protection', '2018.1', 'Not assigned', C.switchControl({ label: 'Bound', on: false })],
          ],
        }) +
          C.blastRadius({
            lede: 'Binding ANZG 99% would change:',
            rows: [
              { what: 'Results gaining a third mark', n: '2,841' },
              { what: 'New exceedances at the stricter set', n: '38' },
              { what: 'Historical evaluations rewritten', n: '0' },
              { what: 'Reports already issued', n: '0' },
              { what: 'Crosstab columns per result', n: '2 → 3' },
            ],
            action: 'Bind ANZG 99%',
            reversible: 'Reversible. Binding a set evaluates forward and re-evaluates on demand; it never rewrites an outcome that has been reported.',
          }),
      ) +
      '</section>',
    panel(
      'Reporting calendar',
      C.field({
        label: 'Reporting year ends',
        control: C.select({ options: ['June', 'December', 'March', 'September'], value: 'June' }),
        hint: 'The month a reporting year <em>ends</em>. With June, 2026 Q1 is July–September 2025 — a fiscal quarter is not a calendar quarter, and a calendar year is not a special case of this, only the December setting.',
      }) +
        C.field({ label: 'Reporting frequency', control: C.select({ options: ['Quarterly', 'Monthly', 'Half-yearly', 'Annually'], value: 'Quarterly' }) }) +
        C.field({ label: 'Grace period after period close', control: C.numberInput({ value: '21', unit: 'days', hintRight: 'before a round reads overdue' }) }) +
        table({
          caption: 'Resolved from the settings above, in Australia/Perth. Shown because a calendar rule nobody can check is a calendar rule that is wrong.',
          head: ['Period', 'Opens (local)', 'Opens (UTC)', 'Closes (local)'],
          rows: [
            ['2026 Q1', '2025-07-01 00:00', '2025-06-30 16:00', '2025-09-30 23:59'],
            ['2026 Q2', '2025-10-01 00:00', '2025-09-30 16:00', '2025-12-31 23:59'],
            ['2026 Q3', '2026-01-01 00:00', '2025-12-31 16:00', '2026-03-31 23:59'],
            ['2026 Q4', '2026-04-01 00:00', '2026-03-31 16:00', '2026-06-30 23:59'],
          ],
        }),
    ),
    '3fr 2fr',
  ) +
  '<h2 class="mk-h2" style="margin-top:1.4rem">Membership</h2>' +
  table({
    caption: 'Role bindings resolve from directory groups. Nothing here grants access directly — the group does, and this shows what that produced.',
    head: ['Person', 'Identity', 'Project', 'Role', 'From group', 'Granted', 'By', 'Last seen', 'State'],
    rows: MEMBERS.map((m) => [
      esc(m.name),
      `<span class="mk-file">${esc(m.identity)}</span>`,
      `<code>${esc(m.project)}</code>`,
      `<span class="mk-tag mk-tag--${m.role === 'Approver' ? 'new' : m.role === 'Reader' ? 'neutral' : 'good'}">${esc(m.role)}</span>`,
      `<span class="mk-muted">${esc(m.group)}</span>`,
      `<span class="sf-instant">${esc(m.granted)}</span>`,
      esc(m.by),
      `<span class="sf-instant">${esc(m.lastSeen)}</span>`,
      C.status(m.state, m.state === 'active' ? 'good' : 'neutral'),
    ]),
    kind: 'matrix',
    label: 'Project membership',
  }) +
  notice(
    'default',
    'Deprovisioning is provable, which is the requirement rather than the courtesy.',
    'J. Halloran left the Contributors group on 2026-07-31. Their session was invalidated on the next request, their last read was 2026-07-30 15:44 AWST, and every row they ever wrote still carries their identity — because withdrawing access and erasing history are different acts and only one of them was asked for.',
  )
);

const mappingProfiles = () => (
  head('Mapping profiles', 'What the importer has learned from each laboratory, and how to correct it when it learned wrong.', {
    route: '/projects/:projectId/mappings',
    toolbar: C.exportMenu() + C.btn('Import a profile') + C.btn('New profile', 'primary'),
  }) +
  table({
    caption: 'One profile per laboratory. A decision made once is applied silently-but-visibly forever after, so the place it is kept has to be inspectable.',
    head: ['Laboratory', 'Entries', 'Last used', 'Applied without asking, last run', 'Corrections', 'State'],
    rows: MAPPING_PROFILES.map((p) => [
      `<strong>${esc(p.lab)}</strong>`,
      `<span class="mk-num">${p.entries}</span>`,
      `<span class="sf-instant">${esc(p.lastUsed)}</span>`,
      `<span class="mk-num">${p.autoApplied}</span>`,
      p.corrections ? `<span class="mk-num mk-num--warn">${p.corrections}</span>` : '<span class="mk-num mk-num--nil">0</span>',
      C.status(p.state, p.state === 'active' ? 'good' : 'neutral'),
    ]),
  }) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Pilbara Analytical Services — 214 entries</h2>' +
  C.filterBar({
    controls: [
      C.field({ label: 'Find', control: C.input({ placeholder: 'What the laboratory wrote…', mono: true }) }),
      C.field({ label: 'Kind', control: C.select({ options: ['Any kind', 'analyte', 'unit', 'location', 'validation state', 'qualifier'], value: 'Any kind' }) }),
      C.field({ label: 'Learned by', control: C.select({ options: ['Anyone', 'A. Nakamura', 'D. Okafor', 'system'], value: 'Anyone' }) }),
    ],
    chips: [C.chip('has a correction', { prefix: 'flag', tone: 'bad' })],
    count: '5 of 214 entries',
  }) +
  table({
    caption: 'Every entry carries who taught it, when, and how many results it has produced — because that count is what a correction has to reach back over.',
    head: ['The laboratory writes', 'Resolves to', 'Kind', 'Learned', 'By', 'Uses', 'Version', 'State'],
    rows: MAPPING_ENTRIES.map((m) => [
      `<code class="mk-file">${esc(m.from)}</code>`,
      `<strong>${esc(m.to)}</strong>`,
      tag(m.kind, 'neutral'),
      `<span class="sf-instant">${esc(m.learned)}</span>`,
      esc(m.by),
      `<span class="mk-num">${m.uses}</span>`,
      `<span class="mk-num">v${m.version}</span>`,
      C.status(m.state, m.state === 'corrected' ? 'warn' : 'good'),
    ]),
    kind: 'matrix',
    label: 'Mapping entries',
  }) +
  cols(
    panel(
      'A mapping that was learned wrong, and the correction',
      C.card({
        tone: 'warn',
        head: '<span class="mk-queue__kind">Corrected 2025-02-03</span><span class="mk-queue__age">31 results re-derived</span>',
        body:
          '<p class="mk-tight"><code class="mk-file">TDS (calc)</code> was mapped to <strong>Total dissolved solids (dried)</strong> for six months. The laboratory calculates this from electrical conductivity and does not dry it, so every result carried a method it was never measured by.</p>' +
          '<p class="mk-tight">Correcting the mapping did not edit the results. It superseded them: 31 new results, each pointing at the one it replaced, each carrying the rule version that produced it. The originals are still readable, still attributed, and still show what a report issued in that window was based on.</p>',
        foot: `<a class="mk-btn mk-btn--sm" href="#supersession">See the supersession cascade</a><a class="mk-btn mk-btn--sm" href="#lineage">Open lineage on one</a>`,
      }) +
        C.blastRadius({
          lede: 'Correcting <code class="mk-file">Cd-diss</code> → <strong>Cadmium (total)</strong> would touch:',
          rows: [
            { what: 'Results re-derived and superseded', n: '44' },
            { what: 'Evaluations recomputed', n: '88 — two criteria sets' },
            { what: 'Outcomes that would change', n: '3' },
            { what: 'Reports already issued that cite them', n: '2 — flagged stale, not rewritten' },
            { what: 'Original results deleted', n: '0' },
          ],
          action: 'Correct the mapping',
          danger: true,
          reversible: 'Reversible as a further correction. Nothing is overwritten — a correction supersedes and reaches back, and the reports that cited the old values stay exactly as they were issued, marked stale.',
        }),
    ),
    panel(
      'Never asked twice — but never hidden either',
      '<p class="mk-tight">There are three outcomes on a review question, not two, and conflating the last two would put decisions into somebody’s history that they never made.</p>' +
        table({
          head: ['Outcome', 'Whose decision', 'Shown as'],
          rows: [
            ['Outstanding', 'Nobody yet — it blocks the commit', 'A question in the queue'],
            ['Applied from a prior decision', 'A named person, on a named import', 'Applied, with their name and the import it was made on'],
            ['Applied by the dictionary', 'Nobody — it is a synonym, not a judgement', 'Applied, attributed to the dictionary'],
          ],
        }) +
        '<p class="mk-tight">The middle row is the one that has to keep its attribution. “The system did it” and “you did it, eighteen months ago, on the Kurrajong import” are different answers to an auditor, and only one of them is true.</p>',
    ),
  )
);

const unitsScreen = () => (
  head('Units and conversions', 'Every unit the product recognises, and every rule it may apply to one.', {
    route: '/config/units',
    toolbar: C.exportMenu() + C.btn('Add a unit'),
  }) +
  notice(
    'default',
    'Any conversion applied anywhere in the product traces to a rule on this page.',
    'That is the units case of the rule that governs every derived value: carry the rule and its inputs, never convert silently. A number whose unit changed between the certificate and the report, with nothing recording why, is a number nobody can defend.',
  ) +
  table({
    caption: 'Canonical units, and what the laboratories call them.',
    head: ['Unit', 'Quantity', 'Also written', 'Results using it'],
    rows: UNITS.map((u) => [
      `<strong class="mk-file">${esc(u.unit)}</strong>`,
      esc(u.quantity),
      `<span class="mk-muted mk-file">${esc(u.aliases)}</span>`,
      `<span class="mk-num">${u.uses.toLocaleString('en-AU')}</span>`,
    ]),
  }) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Conversion rules</h2>' +
  table({
    caption: 'Exact means the arithmetic loses nothing. Everything else states what it assumes.',
    head: ['From', 'To', 'Rule', 'Factor', 'Exact', 'What it assumes'],
    rows: CONVERSIONS.map((c) => [
      `<code class="mk-file">${esc(c.from)}</code>`,
      `<code class="mk-file">${esc(c.to)}</code>`,
      `<span class="mk-file">${esc(c.rule)}</span>`,
      `<span class="mk-num">${esc(c.factor)}</span>`,
      c.exact ? C.status('exact', 'good') : C.status('states its basis', 'warn'),
      `<span class="mk-muted">${esc(c.note)}</span>`,
    ]),
    kind: 'matrix',
    label: 'Conversion rules',
  }) +
  cols(
    panel(
      'Display unit is not stored unit',
      '<p class="mk-tight">A practitioner reading PFAS in ng/L and metals in µg/L on the same crosstab is reading two units, and switching the display to one of them must not touch a single stored value.</p>' +
        C.field({
          label: 'Display concentrations in',
          control: C.select({ options: ['As reported by the laboratory', 'µg/L throughout', 'mg/L throughout'], value: 'As reported by the laboratory' }),
          hint: 'Changing this marks every converted cell and states the factor on hover. The stored value, the certificate and the export all keep the laboratory’s own unit.',
        }) +
        C.card({
          tone: 'new',
          head: '<span class="mk-queue__kind">A converted cell, as it renders</span>',
          body:
            '<span class="sf-result"><span class="sf-result__value">0.0048</span> <span class="mk-entry__unit">µg/L</span> ' +
            C.why('Converted for display from 4.8 ng/L by rule unit-scale v1, ÷ 1000, exact. The stored value is 4.8 ng/L and the export carries that. This conversion is display-only and is not recorded in lineage, because nothing was derived — the number on the record did not move.') +
            '</span>' +
            '<p class="mk-tight" style="margin-top:.5rem">Marked as converted, with the rule one hover away. A converted value that looks identical to a reported one is a small lie that compounds.</p>',
        }),
    ),
    panel(
      'The conversion that is not a conversion',
      '<p class="mk-tight">Depth below ground to elevation above datum looks like a unit change and is not one. It is a derivation against the survey datum in force on the measurement date.</p>' +
        C.pipeline([
          { name: 'Reading: 15.20 m bgl at MW05, 2026-05-13', detail: 'What the dip meter said. Stored exactly, forever.', state: 'done' },
          { name: 'Datum in force on 2026-05-13', detail: 'Top of casing 208.11 m AHD, from the resurvey of 2024-03-18. The 2019 survey said 208.42 and applies to readings before that date.', state: 'done' },
          { name: 'Rule datum-at-date v2', detail: '208.11 − 15.20 = 192.91 m AHD. Derived at read time and never stored.', state: 'done' },
          { name: 'The same reading, evaluated against 2019’s datum', detail: '208.42 − 15.20 = 193.22 m AHD. Storing the elevation would have frozen whichever datum happened to be in force the day it was calculated, and a resurvey would silently invalidate years of hydrograph.', state: 'wait' },
        ]),
    ),
  )
);

/* ================================================================== *
 * J9 additions — the operating model, which has no persona at all
 * ================================================================== */

const upgradeScreen = () => (
  head('Upgrade', 'What is available, what it would change, and the way back.', {
    route: 'CLI — the estate reports itself and an upgrade begins with a refusal',
    toolbar: C.btn('Run pre-flight again') + C.btn('Schedule the upgrade', 'primary'),
  }) +
  stats([
    stat(UPGRADE.current, 'running now'),
    stat(UPGRADE.available, 'available', 'good'),
    stat('4 of 5', 'pre-flight checks pass', 'warn'),
    stat('38 m', 'measured rollback time'),
  ]) +
  notice(
    'default',
    'Nothing installs itself, and that is a decision rather than a limitation.',
    'This is the customer’s instance in the customer’s cloud. An upgrade is scheduled by somebody who chose a window, and the product’s job is to make the consequences legible beforehand and the way back real afterwards.',
  ) +
  '<h2 class="mk-h2">Pre-flight</h2>' +
  table({
    caption: 'Run against a restored copy of this database, not against a model of it.',
    head: ['Check', 'Outcome', 'What it found'],
    rows: UPGRADE.preflight.map((p) => [
      esc(p.check),
      C.status(p.outcome, p.outcome === 'pass' ? 'good' : 'warn'),
      `<span class="mk-muted">${esc(p.detail)}</span>`,
    ]),
  }) +
  cols(
    panel(
      'What would change',
      table({
        head: ['Change', 'Kind', 'What it means here'],
        rows: UPGRADE.changes.map((c) => [
          `<strong>${esc(c.what)}</strong>`,
          tag(c.kind, c.kind === 'reference content' ? 'warn' : 'good'),
          `<span class="mk-muted">${esc(c.detail)}</span>`,
        ]),
      }) +
        C.blastRadius({
          lede: 'Accepting the analyte dictionary diff, 2026.2 → 2026.3:',
          rows: [
            { what: 'Analytes added', n: '14' },
            { what: 'Synonyms corrected', n: '2' },
            { what: 'Analytes removed', n: '0' },
            { what: 'Existing results re-mapped', n: '0' },
            { what: 'Your own mapping profiles overwritten', n: '0' },
          ],
          action: 'Review the diff line by line',
          cancel: 'Upgrade without the reference content',
          reversible:
            'Reference content arrives as a diff you accept, never as a silent overwrite. Your own corrections win over a shipped synonym — a customer who taught this instance something is not overruled by a release.',
        }),
    ),
    panel(
      'The way back',
      facts([
        ['Current image', 'ghcr.io/…/strataflow-web@sha256:4f8c…21ab'],
        ['Retained by digest', 'v0.7.2 · v0.7.1 · v0.6.4'],
        ['Backup before upgrade', 'Taken automatically, content-integrity verified'],
        ['Last restore drill', `${esc(UPGRADE.preflight[4].detail.split('·')[1]?.trim() ?? '2026-08-22')}`],
        ['Measured RTO', '38 minutes, end to end'],
        ['Migrations reversible?', 'Additive only in this release — no column is dropped, so a rollback needs no down-migration'],
      ]) +
        '<p class="mk-tight" style="margin-top:.7rem">There is no <code class="mk-file">latest</code> tag anywhere in this product, deliberately. Deployment takes an explicit reference, because a release is something somebody decided to make and version drift is the primary failure mode for an operator running alone.</p>' +
        C.stateBlock('partial', {
          headline: 'One check is a warning, and it does not block.',
          detail:
            'IMP-0239 is mid-review. Upgrading will not lose it; its stage artifacts rebuild from the stored parse the first time somebody opens it, which costs about four seconds. Told to you rather than discovered, because an unexplained delay after an upgrade is indistinguishable from a broken one.',
        }),
    ),
  )
);

const entitlementScreen = () => (
  head('About this instance', 'Version, entitlement, and the support bundle you would send — previewed before anything leaves.', {
    route: '/instance (the bundle itself is assembled by CLI)',
    toolbar: C.btn('Copy version block'),
  }) +
  cols(
    '<section>' +
      panel(
        'Versions',
        facts([
          ['Instance', `<strong class="mk-file">${esc(INSTANCE.version)}</strong> · released ${esc(INSTANCE.released)}`],
          ['Commit', `<code class="mk-file">${esc(INSTANCE.commit)}</code>`],
          ['Schema', '<span class="mk-file">2026081407_notification_awareness</span> · 118 migrations applied'],
          ['Analyte dictionary', '2026.2 · loaded 2026-05-02'],
          ['ANZG 2018 criteria', '2018.1 · loaded 2026-01-14 · reviewed by a licensed practitioner'],
          ['Licence criteria', 'Customer-authored · L8842/2019/1 Table 4 v2024.2'],
          ['Database', esc(INSTANCE.database)],
          ['Deployed', 'Customer tenancy · single-tenant · no shared control plane'],
        ]) +
          '<p class="mk-tight" style="margin-top:.7rem">This block is the first thing a support conversation needs and the last thing anybody wants to assemble by hand. One button copies it.</p>',
      ) +
      panel(
        'Entitlement',
        facts([
          ['Customer', esc(ENTITLEMENT.customer)],
          ['Term', esc(ENTITLEMENT.term)],
          ['Remaining', `<strong>${esc(ENTITLEMENT.remaining)}</strong>`],
          ['Seats', esc(ENTITLEMENT.seats)],
          ['Support', esc(ENTITLEMENT.support)],
        ]) +
          C.card({
            tone: 'new',
            head: '<span class="mk-queue__kind">What happens at expiry</span>',
            body: `<p class="mk-tight">${esc(ENTITLEMENT.atExpiry)}</p>`,
            foot: '<span class="mk-muted">Stated in the product rather than discovered at expiry. A system of record whose behaviour at the end of a contract is unknown is not one.</span>',
          }),
      ) +
      '</section>',
    panel(
      'Diagnostic bundle',
      `<p class="mk-tight"><strong>Generated by you, never by us.</strong> ${esc(BUNDLE.initiator)}</p>` +
        '<p class="mk-tight">Every line below is inspectable before the file exists. The preview is the feature: a support bundle a customer cannot read before sending is a request to take the vendor’s word for what is in it.</p>' +
        table({
          head: ['Contents', 'Size', 'Sensitivity', 'Include'],
          scroll: true, label: 'Diagnostic bundle contents',
          rows: BUNDLE.contents.map((c) => [
            esc(c.what),
            `<span class="mk-num${c.size === '—' ? ' mk-num--nil' : ''}">${esc(c.size)}</span>`,
            c.sensitive === 'none'
              ? '<span class="mk-muted">none</span>'
              : c.sensitive === 'customer data'
                ? C.status('customer data — excluded', 'bad')
                : C.status(c.sensitive, 'warn'),
            C.checkbox({
              srLabel: c.included
                ? `Include ${c.what} in the bundle`
                : `${c.what} — excluded, and not selectable`,
              checked: c.included,
              disabled: !c.included,
            }),
          ]),
        }) +
        C.blastRadius({
          lede: 'Generating this bundle would write one file, here, and send nothing:',
          rows: [
            { what: 'Bundle size', n: '3.6 MB' },
            { what: 'Files written outside this instance', n: '0' },
            { what: 'Network requests made', n: '0' },
            { what: 'Result values included', n: '0' },
            { what: 'Principal identities in log attribution lines', n: '~1,400' },
          ],
          action: 'Generate the bundle',
          reversible: 'The bundle is a file on this instance until you choose to send it. Delete it and nothing remains; nothing about generating it reaches Strataflow.',
        }),
    ),
    '3fr 2fr',
  )
);

/* ================================================================== *
 * J10 — the conventions the whole product keeps
 *
 * Three screens that are not screens: they are the cross-cutting
 * claims, drawn once so they can be checked once. Every one of them is
 * a promise made on every other screen in this catalogue, and a promise
 * repeated thirty-seven times is a promise nobody audits.
 * ================================================================== */

const dataStates = () => {
  const demo = (title, note, block) =>
    panel(title, `<p class="mk-tight">${note}</p>${block}`);
  /*
   * Held rows are quarantine findings and `QUARANTINE` owns them; planned
   * against received is `COMPLETENESS`. Two registers, two counts, neither
   * typed here — the partial state's whole rule is that it quantifies what is
   * absent, and a state block that typed its own numbers would be the first
   * place they went stale.
   */
  const held = QUARANTINE.filter((q) => q.state === 'held').length;
  return (
    head('Four states, everywhere', 'Empty, loading, partial and error — designed once, for every surface.', {
      route: '/help/states',
      toolbar: C.segmented({ options: ['Empty', 'Loading', 'Partial', 'Error'], value: 'Empty', label: 'State' }),
    }) +
    notice(
      'default',
      'Three rules the words have to keep, and they are the reason this is a screen rather than a component.',
      'No empty headline may read “No data”. An empty queue and an empty register are different sentences — <em>you are finished</em> against <em>nothing has arrived</em> — and a screen that confuses them tells a practitioner their work is done when it has not started. Every partial state must quantify what is absent, because “some data” is exactly when a number is needed most.',
    ) +
    '<h2 class="mk-h2">Empty — and the two kinds of empty</h2>' +
    cols(
      demo(
        'An empty queue — you are finished',
        'The reward state. It says what was checked and when, so it is a claim rather than an absence.',
        C.stateBlock('empty', {
          headline: 'Nothing needs you.',
          detail: 'Every exception is dispositioned and no obligation is inside its warning window. Last checked 2026-08-23 07:41 AWST.',
          action: 'Open the 2026 Q3 programme',
        }),
      ),
      demo(
        'An empty register — nothing has arrived',
        'The onboarding state, and the first thing a new customer sees. It teaches the first action.',
        C.stateBlock('empty', {
          headline: 'No results on this project yet.',
          detail:
            'Results arrive by importing a laboratory deliverable. Nine locations are registered and the 2026 Q3 round is planned, so everything is ready for the first file — drop it on the import screen and the format is named before anything is read.',
          action: 'Import a deliverable',
          secondary: 'See what a deliverable looks like',
        }),
      ),
      '1fr 1fr',
    ) +
    '<h2 class="mk-h2">Loading — and it must not shift when the data lands</h2>' +
    cols(
      demo(
        'The skeleton reserves the real grid',
        'Seven columns because the crosstab fills seven, at the row height it will use. A grid that jumps after four seconds reads as broken even when it is correct.',
        C.stateBlock('loading', {
          headline: 'Reading 2,841 results…',
          detail: 'Evaluating against 2 criteria sets. On a site link this takes about 9 seconds.',
          rows: 6,
        }),
      ),
      demo(
        'A long operation says how long',
        'Anything that can exceed about a second shows determinate progress. An indeterminate spinner cannot be told from a dead connection.',
        C.progress({
          pct: 68,
          label: 'Evaluating 2,841 results against 2 criteria sets',
          detail: '1,932 of 2,841 · about 4 seconds left · you can leave this page and it continues',
        }) +
          C.progress({
            pct: 23,
            label: 'PAS2026-04417_Wandalup_2026Q2.zip · 38 MB',
            detail: '8.7 MB of 38 MB · 41 KB/s · about 12 minutes left',
            resumable: true,
            tone: 'warn',
          }),
      ),
    ) +
    '<h2 class="mk-h2">Partial — quantify what is missing</h2>' +
    cols(
      demo(
        'Some of it is here',
        'The count is the whole point. “Some data” is not a state a practitioner can act on.',
        C.stateBlock('partial', {
          headline: `${COMPLETENESS.received} of ${COMPLETENESS.planned} planned results are in. ${held} of them are held in quarantine and ${COMPLETENESS.missing} were never collected.`,
          detail:
            `${CROSSTAB_SHAPE.emptyColumns.join(', ')} was not sampled in the 2026 Q2 window, which closed 2026-05-14 in ${PROJECT.timezone}: the bore was dipped twice and found dry. The crosstab stays complete for every other location and this one’s column is <strong>drawn empty rather than omitted</strong> — a missing column reads as a bore that does not exist, and a blank cell reads as a value somebody forgot to enter. It carries the round’s own <em>dry</em> disposition — glyph and word — and the reason, across all ${CROSSTAB_SHAPE.empty} of its cells.`,
          action: `Open the ${held} held rows`,
          secondary: 'Open the bore session that recorded it dry',
        }),
      ),
      demo(
        'The statistics know they are partial',
        'A summary computed over an incomplete round is not wrong, but it is not the round either, and the difference belongs on the surface that shows it.',
        C.stateBlock('partial', {
          headline: `This median is over ${CROSSTAB_SHAPE.sampledColumns.length} of ${CROSSTAB_SHAPE.locations} locations.`,
          detail:
            `${CROSSTAB_SHAPE.emptyColumns.join(', ')} has no 2026 Q2 result — dry, not missed. The estimator is Kaplan–Meier over the round’s ${CROSSTAB_SHAPE.results} results of which ${CROSSTAB_SHAPE.censored} are censored; a bore that returns to water next quarter changes it, and the figure carries the same note in its provenance strip so a copy pasted into Word does not lose the caveat.`,
        }),
      ),
    ) +
    '<h2 class="mk-h2">Error — say what happened and what to do</h2>' +
    cols(
      demo(
        'A not-found is not “something went wrong”',
        'And it deliberately cannot be told apart from a refusal, because saying “this exists but you may not see it” is itself a disclosure.',
        C.stateBlock('error', {
          headline: 'There is no project at this address, or you do not have access to it.',
          detail:
            'Both read the same on purpose — telling you which one it is would confirm the existence of something you are not entitled to see. If you expected access, your administrator adds you to the project’s directory group.',
          action: 'Go to my projects',
          secondary: 'Copy the request for my administrator',
        }),
      ),
      demo(
        'A session that lapsed mid-form loses nothing',
        'This is the field officer on a phone whose session expired between filling the form and pressing the button. The old behaviour was a bare “Something went wrong / 401”.',
        C.stateBlock('error', {
          headline: 'Your session expired while this page was open.',
          detail:
            'The nine readings you typed are held on this device and have not been sent. Signing in again returns you to this form with every value still in it — nothing needs retyping and nothing was written twice.',
          action: 'Sign in and come back here',
          secondary: 'Save a copy to this device',
        }),
      ),
    ) +
    panel(
      'Two more states that are not on anybody’s list',
      cols(
        C.conflictBanner({
          who: 'D. Okafor',
          at: '2026-08-23 07:38 AWST',
          what: 'The validation state of this result moved from screened to validated.',
          mine: 'rejected',
          theirs: 'validated',
        }),
        C.stateBlock('error', {
          headline: 'The stats worker did not answer, so the trend is absent rather than wrong.',
          detail:
            'Mann–Kendall and Sen’s slope are computed by a separate service and it is unreachable. Everything on this page that does not depend on it is correct and current; the trend column is empty and labelled, not filled with a stale number from the last time it worked.',
          action: 'Retry',
          secondary: 'Check instance health',
        }),
        '1fr 1fr',
      ),
    )
  );
};

const assistance = () => (
  head('Keyboard and assistance', 'The contract for somebody who works here every day, and the help for somebody who does not.', {
    route: '/help/keyboard',
    toolbar: C.btn('Open the command palette', 'primary') + C.btn('Print this sheet'),
  }) +
  notice(
    'default',
    'A two-hundred-question review queue is a session, not an afternoon — and that is a keyboard claim.',
    'Every queue and grid a practitioner works daily is fully operable without a mouse. This is not an accessibility afterthought bolted to a mouse-first design; it is the difference between a tool somebody is fast in and a tool somebody endures.',
  ) +
  cols(
    '<section>' +
      SHORTCUTS.map((g) =>
        panel(
          g.group,
          table({
            head: ['Keys', 'What it does'],
            rows: g.keys.map((k) => [C.kbd(k.k), esc(k.what)]),
          }),
        ),
      ).join('') +
      '</section>',
    panel(
      'The palette, and why it is not a search box',
      '<p class="mk-tight">Search finds <em>things</em>. The palette runs <em>verbs</em>, and it is the fastest path to a screen a practitioner visits monthly and cannot remember the location of.</p>' +
        '<div class="mk-palette" data-open="true" style="position:static;transform:none;width:100%;margin-bottom:1rem">' +
        '<input class="mk-palette__input" value="rev" aria-label="Command">' +
        '<ul class="mk-palette__list">' +
        '<li class="mk-palette__group">Actions</li>' +
        '<li><button class="mk-palette__item" data-active="true"><span class="mk-palette__main">Reverse a committed import…</span><span class="mk-palette__ctx">IMP-0241</span></button></li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Review outstanding questions</span><span class="mk-palette__ctx">3 on IMP-0239</span></button></li>' +
        '<li class="mk-palette__group">Go to</li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Exception review</span><span class="mk-palette__ctx">g then e</span></button></li>' +
        '<li><button class="mk-palette__item"><span class="mk-palette__main">Reports</span><span class="mk-palette__ctx">g then r</span></button></li>' +
        '</ul>' +
        '<div class="mk-palette__foot"><span>↑↓ move</span><span>↵ run</span><span>esc close</span></div>' +
        '</div>' +
        '<p class="mk-tight">Destructive verbs appear in the palette and never execute from it — “Reverse a committed import…” opens the reversal screen with its blast radius, because a keystroke that withdraws 231 results is not a shortcut, it is a trap.</p>',
    ),
    '3fr 2fr',
  ) +
  '<h2 class="mk-h2" style="margin-top:1.2rem">Assistance that is not a help centre</h2>' +
  cols(
    panel(
      'A term, defined where it is used',
      `<p class="mk-tight">The vocabulary is bound to the glossary and a guard defends it, but a bound vocabulary a reader has not learned is still jargon. So ${C.term('LOR', 'Limit of reporting — the lowest concentration the laboratory will report as a number for this analyte and method. Distinct from the MDL, which is what the method can distinguish from noise, and the PQL, which is what it can quantify reliably.')} and ${C.term('indeterminate', 'The reporting limit sits above the criterion, so the result cannot be assessed against it. This is not a pass — nothing was measured either way.')} carry their definitions, and the dotted underline is quiet on purpose. Marking every domain noun would underline half a dense register and teach the reader to ignore all of them.</p>` +
        `<p class="mk-tight">And the product explains its own decisions in place. ${C.why('The importer applied this without asking because “Sulphate” is an exact synonym in the analyte dictionary — a spelling, not a judgement. It is recorded on each of the 7 results and reverses with the import.')} sits next to the thing it explains, rather than in a document somebody has to know exists.</p>`,
    ),
    panel(
      'Export is assistance too',
      '<p class="mk-tight">The commonest reason a practitioner leaves a product is to do one thing it will not do. Export is how they come back.</p>' +
        C.exportMenu({ open: true }) +
        '<p class="mk-tight" style="margin-top:12rem">Exactly what is on screen: this filter, these columns, this sort. Censored values keep their notation and numbers stay numbers — an export that writes <code class="mk-file">&lt;1.0</code> into a text column has handed back a spreadsheet that cannot be summed, and one that writes <code class="mk-file">1.0</code> has handed back a lie.</p>',
    ),
  )
);

/**
 * What the rail's dots currently say, counted from the register.
 *
 * The sentence this replaces was written on 23 August and read, in the present
 * tense, "most of what is drawn here is tested library code with no route, and
 * four screens are proposals" — on the one screen whose subject is honesty
 * about coverage, and eight days after the register said otherwise (W1-A-2).
 * A count that is typed is a count that rots, so this one is derived: `JOBS`
 * is in scope because screen bodies run at assembly, long after the module
 * has evaluated.
 */
function stateSentence() {
  const now = JOBS.flatMap((j) => j.screens).map((s) => s.now ?? s.state);
  const count = (state) => now.filter((v) => v === state).length;
  return (
    '<p class="mk-tight">The state dots in the rail are the other half of the honesty: as of the ' +
    `1 September derivation, ${count('shipped')} of ${now.length} screens are route-backed in the ` +
    `product, ${count('shipped (CLI)')} operate from the CLI, and ${count('proposed')} are proposals ` +
    'against no requirement at all — counted from the register as this page was assembled, with each ' +
    'dot’s 23 August state one hover away.</p>'
  );
}

/**
 * The coverage matrix.
 *
 * The request behind this rebuild was "every gap and every expectation is in
 * the mockup", and that is a claim which is worthless unless it can be
 * checked. So it is a screen: three enumerations, each one closed, each row
 * naming the screen that answers it. A reader who disagrees can point at a
 * row rather than at a feeling.
 *
 * **The enumerations are what make it falsifiable, and they are also its
 * limit.** This is exhaustive relative to three fixed lists — the fourteen
 * global expectations, the register's own sections, and the twenty-seven
 * findings of the August audit. Anything outside them is out of frame by
 * construction, and when the register or the schema grows this table has a
 * hole until it is re-run. That is the maintenance rule, and it is the same
 * rule the register states about itself.
 */
const coverage = () => {
  const GLOBAL = [
    ['G-EXP-1', 'Vocabulary matches the glossary verbatim', 'Every screen', 'No screen introduces a term the glossary lacks. Where one is needed and missing — “Reports” — the gap is declared rather than minted in passing.'],
    ['G-EXP-2', 'Working screens are grid-dense', 'crosstab · locations · exceedances', 'Row height and cell padding come from the product’s own tokens. Consumer-app spacing reads as a toy to a practitioner who has used EQuIS.'],
    ['G-EXP-3', 'Any value opens its lineage in place', 'result-detail · crosstab · lineage', 'A slide-over rather than a route, because the question is asked while comparing a number to its neighbours and an answer that costs the comparison is worth less.'],
    ['G-EXP-4', 'Censored values render as censored everywhere', 'result-detail · crosstab · hydrochem · statistics · report', 'The laboratory’s own notation, kept verbatim. Never zero, never the bare limit, never a substituted half-limit — on the grid, in the figure, in the tooltip and in the export.'],
    ['G-EXP-5', 'Reversibility is stated before the click', 'quarantine · facility · project-settings · mapping-profiles · import-commit', 'Every consequential control carries a blast radius or a reversibility line. Where an action is genuinely irreversible the control says that instead.'],
    ['G-EXP-6', 'Ambiguity becomes a visible decision', 'import-review · quarantine', 'No silent defaults. The format is chosen and never defaulted; an unmappable validation state holds rows rather than guessing one.'],
    ['G-EXP-7', 'Four states designed for every surface', 'data-states, and in situ throughout', 'Empty, loading, partial, error. Two kinds of empty, because a finished queue and an unstarted register are different sentences.'],
    ['G-EXP-8', 'Every encoding survives greyscale', 'Every screen · data-states', 'Marks are shapes; statuses carry a glyph; the confidence bar carries its number. Colour is the redundant channel and never the carrying one.'],
    ['G-EXP-9', 'Queues are fully keyboard-operable', 'assistance · import-review · crosstab · field-capture', 'The contract is written down rather than discovered. A two-hundred-question queue is a session, not an afternoon.'],
    ['G-EXP-10', 'Timezone and unit honesty', 'project-settings · units · events · programme', 'Timestamps carry their zone; values carry their unit; display conversion is marked and never mutates what is stored.'],
    ['G-EXP-11', 'An audit tab on every entity detail', 'location · result-detail · licence · events · facility · project-settings', 'A convention, not a destination. There is no global log viewer, because “who changed this” is asked about a thing.'],
    ['G-EXP-12', 'Stale writes surface as conflicts', 'data-states · result-detail', 'Refused and shown, naming who and what. Never merged, never silently overwritten.'],
    ['G-EXP-13', 'Anything over a second shows determinate progress', 'data-states · documents · imports', 'With bytes and a time. An indeterminate spinner cannot be told from a dead connection on a site link.'],
    ['G-EXP-14', 'Any grid exports exactly as filtered', 'Every register', 'This filter, these columns, this sort — with censoring and types intact.'],
  ];

  const SURFACES = [
    ['§1.1', 'Work queue', 'home', 'new'],
    ['§1.2', 'Global search', 'search', 'new'],
    ['§2.1', 'Project list and switcher', 'projects', 'new'],
    ['§2.2', 'Project home', 'project-home', 'new'],
    ['§2.3', 'Project settings and membership', 'project-settings', 'new'],
    ['§3.1', 'Facility and area management', 'facility', 'new'],
    ['§3.2', 'Location registry', 'locations', 'new'],
    ['§3.3', 'Location detail', 'location', 'had'],
    ['§4.1', 'Sampling event list and detail', 'events', 'new'],
    ['§4.2', 'Field and water-level entry', 'field-capture', 'had'],
    ['§5.1', 'Import intake', 'imports', 'had'],
    ['§5.2', 'Exception review', 'import-review', 'had'],
    ['§5.3', 'Batch detail and quarantine', 'quarantine', 'new'],
    ['§5.4', 'Mapping profiles and lab formats', 'mapping-profiles', 'new'],
    ['§6.1', 'Crosstab', 'crosstab', 'had'],
    ['§6.2', 'Result detail and annotation', 'result-detail', 'new'],
    ['§6.3', 'Analyte dictionary browser', 'dictionary', 'had'],
    ['§7', 'QC review', 'qc', 'had'],
    ['§8.1', 'Criteria library', 'criteria', 'had'],
    ['§8.2', 'Exceedance review', 'exceedances', 'had'],
    ['§9.1', 'Figure workbench', 'hydrograph', 'had'],
    ['§9.2', 'Map', 'map', 'had'],
    ['§10.1', 'Report composer', 'report', 'had'],
    ['§10.2', 'Sign-off', 'signoff', 'had'],
    ['§10.3', 'Submission archive', 'submissions', 'new'],
    ['§11.1', 'Obligations dashboard', 'obligations', 'had'],
    ['§11.2', 'Licence and condition detail', 'licence', 'new'],
    ['§11.3', 'TARP and instrumentation board', 'tarp', 'had'],
    ['§12', 'Programs and scheduling', 'programme', 'had'],
    ['§13.1', 'Users, roles, provisioning', 'roles', 'had'],
    ['§13.2', 'Units and reference data', 'units', 'new'],
    ['§13.3', 'Instance administration', 'entitlement', 'new'],
    ['§13.3', 'Upgrade state and rollback', 'upgrade', 'new'],
    ['§14', 'Documents and attachments', 'documents', 'new'],
  ];

  const FINDINGS = [
    ['F-01', 'Blocker', 'Double-commit writes every row twice', 'import-commit', 'The commit control is gone after it succeeds, replaced by a receipt naming what was written and the way back.'],
    ['F-02', 'Blocker', 'Wrong-format parse is silent; the default is wrong', 'imports', 'The format is chosen against a placeholder, and the rows read are stated before anything else happens.'],
    ['F-03', 'Blocker', 'A non-detect renders as a plain value', 'result-detail · crosstab', 'The laboratory’s notation, kept verbatim, on every surface that shows the value.'],
    ['F-04', 'Major', 'No commit confirmation; the page then states a falsehood', 'import-commit', 'A receipt with counts, a link to the results, and the reversal path.'],
    ['F-05', 'Major', 'A duplicate upload is silent', 'imports', 'A banner that distinguishes “nothing was written because this is the same file” from “nothing was written because it failed”.'],
    ['F-06', 'Major', 'Held rows are invisible after commit', 'quarantine', 'A screen of its own, with the reason and the way out on every row, counted on the run, the project home and the work queue.'],
    ['F-07', 'Major', 'The results register omits the analyte', 'crosstab · locations', 'Analyte, unit, limits, qualifiers and validation state, with filters and paging.'],
    ['F-08', 'Major', 'Home is a dead end with no project list', 'home · projects', 'The work queue is the landing surface; the project list is a real register with the role on every row.'],
    ['F-09', 'Major', 'The project is never named', 'Every screen', 'Code and name in the switcher, in the breadcrumb and on the project home.'],
    ['F-10', 'Major', 'The review layout breaks at desktop width', 'import-review', 'The question grid wraps; the primary action stays on screen at 1280.'],
    ['F-11', 'Major', 'No reversal path exists', 'import-commit', 'Reversal is a control with a blast radius, reachable from the run and from the palette.'],
    ['F-12', 'Major', 'Session expiry on a POST loses work', 'data-states', 'The typed values are held on the device and restored after signing in.'],
    ['F-13', 'Major', 'Placeholder empty-states over real data', 'data-states', 'A placeholder is verbally and visually distinct from an empty register, and neither reads “No data”.'],
    ['F-14', 'Major', 'Review options offer no escape hatch', 'import-review · quarantine', 'Every suggestion list ends with a way to say nothing here fits, and to hold the rows.'],
    ['F-15', 'Minor', 'Internal goal IDs on customer surfaces', 'Every screen', 'No goal number reaches a screen. The state dots in the rail are the viewer’s, not the product’s.'],
    ['F-16', 'Minor', 'Question row-counts read zero while blocking commit', 'import-review', 'Rows-at-stake on every question, and the readiness notice sums the same number.'],
    ['F-17', 'Minor', 'Pluralisation', 'Every screen', '“1 question, holding 1 row.”'],
    ['F-18', 'Minor', 'Raw UTC ISO timestamps', 'Every screen', 'Site time with its zone named, to the minute. The UTC instant is available where a boundary is being argued about.'],
    ['F-19', 'Minor', 'Every page but home has an empty title', 'n/a — viewer', 'Out of frame here; the mockup is one document. Recorded so the row is not mistaken for covered.'],
    ['F-20', 'Minor', 'Error pages are dead ends with the wrong words', 'data-states', 'A not-found says what it is, cannot be told from a refusal on purpose, and offers a way on.'],
    ['F-21', 'Minor', 'Multi-file deliverables named by their first file', 'imports', 'The deliverable is named as one thing, with its files listed under it.'],
    ['F-22', 'Minor', 'Dead ends between the three URL spaces', 'Every screen', 'The top bar carries home, the project switcher, across-projects and the principal menu.'],
    ['F-23', 'Minor', 'Section nav misses the touch-target minimum', 'Every screen', '44 px under a coarse pointer, on the nav as well as the form controls.'],
    ['F-24', 'Minor', 'Sign-out gives no feedback', 'n/a — viewer', 'There is no session in this document. Recorded rather than quietly dropped.'],
    ['F-25', 'Minor', 'The results register offers no filters or paging', 'crosstab · locations', 'A filter bar with saveable views, a result count, and paging that says what it is paging through.'],
    ['F-26', 'Polish', 'Dev-mode hydration mismatch', 'n/a — not a surface', 'A development-server defect with no design content.'],
    ['F-27', 'Polish', 'Commit is not visually distinguished as consequential', 'import-commit', 'A blast radius stating what will be written, before the control that writes it.'],
  ];

  /**
   * A fourth enumeration, added by the second review pass.
   *
   * The first three lists were the register, the audit and the global
   * expectations — all of them documents this repository already held. This
   * one is different in kind: it came from reading the screens as a
   * practitioner rather than as an author, and nothing generated it. That
   * makes it the least trustworthy list here and the most valuable, because
   * every row is something no document had thought to ask for.
   */
  const DOMAIN = [
    ['Defensibility', 'Field parameter stabilisation and purge records', 'purge', 'Three consecutive readings in tolerance, with the bore that never stabilised recorded as a stated judgement rather than an invisible one.'],
    ['Defensibility', 'Sample receipt condition and chain of custody', 'receipt', 'Cooler temperature, seals, preservation and a cracked container — and custody as a chain of transfers rather than a scanned form.'],
    ['QA/QC', 'The full QC sample taxonomy', 'qc', 'Laboratory duplicate, method blank, LCS, matrix spike and duplicate, rinsate blank — added to the field and trip blanks already there.'],
    ['QA/QC', 'The laboratory batch a QC result covers', 'batches', 'A control sample applies to a batch. Without it, a failed spike qualifies everything or nothing.'],
    ['QA/QC', 'Acceptance limits as versioned configuration', 'qc-limits', 'With a source, an effective date, and the applicability rule that was wrong — RPD only above 5 × the reporting limit.'],
    ['QA/QC', 'Data quality assessment against objectives', 'dqa', 'Precision, accuracy, representativeness, comparability, completeness, sensitivity — written before the round, not assembled after it.'],
    ['Evaluation', 'How a hardness-dependent criterion was calculated', 'hardness', 'The input, its cross-check, the equation, the cap and the three exceedances that rest on it.'],
    ['Evaluation', 'A register of what could not be assessed', 'indeterminate', 'The state neither incumbent has, as a finding with a cost to close rather than a footnote.'],
    ['Evaluation', 'Background and site-specific trigger derivation', 'background', 'The comparison a mine actually makes, and where a site-specific value comes from when no default exists.'],
    ['Evaluation', 'Seasonal Mann–Kendall, and censored values in the trend', 'statistics', 'Both tests reported on a seasonal series, and how the non-detects entered the rank test.'],
    ['Hydrogeology', 'Potentiometric surface and flow direction', 'map', 'A planar fit that derives “downgradient” instead of storing it as a string, with the confined bore excluded.'],
    ['Hydrogeology', 'The bore nest, read vertically', 'location', 'An upward gradient from the confined unit is a containment argument, and it is invisible in a register of points.'],
    ['Statutory', 'The Contaminated Sites Act duty', 'notification', 'A second clock on the same moment of awareness, to a different branch of the regulator. Discharging one discharges neither.'],
    ['Statutory', 'Annual Audit Compliance Report', 'obligations', 'A DWER annual return distinct from the AER, which the board did not carry.'],
    ['Statutory', 'Subterranean fauna monitoring', 'stygofauna', 'A WA approval condition assessed on population persistence, and the screen refuses to draw a trend through four points.'],
    ['Content', 'PFAS assessed against the operative framework', 'criteria', 'The NEMP carries a value per receptor; ANZG alone is insufficient once a potable or recreational receptor is downgradient.'],
    ['Workflow', 'The round on two programmes at once', 'programme', 'A TARP-escalated monthly programme alongside the quarterly one — the escalated round is the one that gets missed.'],
    ['Workflow', 'Assignment and hand-over', 'home', 'A thread that hangs off the exceedance rather than off a chat channel, so it is still attached in two years.'],
    ['Layout', 'The results grid across rounds', 'crosstab', 'The comparison a review is, and the only layout that shows a reporting limit stepping mid-series.'],
  ];

  /**
   * The fourth pass adds three more enumerations — 1 September 2026, under
   * EXPANSION_BRIEF.md Phase 2. Same rule as the tables above: each list is
   * closed, each row names its owner, and a row that cannot honestly be
   * claimed is marked rather than counted. Statuses here speak about what is
   * DRAWN in this catalogue; the rail dots carry built-ness, re-derived the
   * same day. Re-run each list against its source rather than reading this.
   */
  const PRD = [
    // [id, requirement, status, owners, priority, note]
    ['FR-1.1', 'Facility → area → location hierarchy with typed classes', 'covered', 'facility · locations', 'P0', ''],
    ['FR-1.2', 'Coordinates with explicit CRS and ANZ↔global transformation', 'partially', 'location · project-settings', 'P2', 'The conversion-with-provenance surface is not drawn'],
    ['FR-1.3', 'Elevation and datum with survey epochs, converted by measurement date', 'covered', 'location · hydrograph', 'P0', ''],
    ['FR-1.4', 'Bore construction detail sufficient to reproduce a construction log', 'covered', 'location', 'P1', ''],
    ['FR-1.5', 'Screened intervals to hydrostratigraphic units; nested clusters', 'covered', 'location', 'P1', ''],
    ['FR-1.6', 'Event → sample → test → result, QC types linked to parents', 'covered', 'events · receipt · qc', 'P0', ''],
    ['FR-1.7', 'Depth intervals and composites with increment traceability', 'deferred', '—', 'P3', 'Soil, sediment and vapour matrices are S8; nothing drawn'],
    ['FR-1.8', 'Analyte dictionary: CAS, synonyms, speciation, congener families', 'covered', 'dictionary', 'P1', ''],
    ['FR-1.9', 'LOR, MDL and PQL distinct; detect status first-class', 'covered', 'result-detail · crosstab', 'P0', ''],
    ['FR-1.10', 'Logger and telemetry series, raw and corrected (S8)', 'deferred', '—', 'P4', 'Domain K, deferred with the telemetry journey'],
    ['FR-1.11', 'Versioned criteria library with effective dates and applicability', 'covered', 'criteria', 'P0', ''],
    ['FR-1.12', 'Licences, conditions, obligations, TARP, water entitlements', 'covered', 'licence · obligations · tarp · water', 'P1', 'The entitlement is an instrument with a year, a volume and a take against it — the last of the five'],
    ['FR-2.1', 'Derivation engine with rules as configurable, versioned artefacts', 'covered', 'hardness · result-detail', 'P0', ''],
    ['FR-2.2', 'Non-detect propagation bound to the criteria set, not global', 'covered', 'criteria', 'P1', 'The four treatments run over the seven derived PFAS totals: six results read indeterminate, compliant or 31× depending on the field'],
    ['FR-2.3', 'Derived values first-class, with rule, inputs and censoring in lineage', 'covered', 'result-detail · lineage', 'P0', 'The chain begins at the bore, not at the deliverable — location and version, construction, programme, field event, stabilisation, sample, filtration, custody, receipt and batch before the first laboratory number, each hop linking the record that owns it'],
    ['FR-2.4', 'Never overwrite a reported value; derivation additive, reversible', 'covered', 'supersession · result-detail', 'P0', ''],
    ['FR-2.5', 'Speciation conversion with the basis recorded on the result', 'partially', 'result-detail', 'P2', 'The basis is shown; the conversion surface is not'],
    ['FR-3.1', 'Laboratory EDD formats as configuration, not code', 'covered', 'formats', 'P1', ''],
    ['FR-3.2', 'Per-laboratory mapping profiles that persist decisions', 'covered', 'mapping-profiles', 'P0', ''],
    ['FR-3.3', 'Fuzzy matching with confidence, routed to a review queue', 'covered', 'import-review', 'P0', ''],
    ['FR-3.4', 'Parse → map → validate → review → commit, each stage inspectable', 'covered', 'imports · import-review · import-commit', 'P0', ''],
    ['FR-3.5', 'Partial accept: commit valid rows, quarantine the remainder', 'covered', 'quarantine', 'P0', ''],
    ['FR-3.6', 'Import batch first-class; source file retained; full reversal', 'covered', 'import-commit', 'P0', ''],
    ['FR-3.7', 'Idempotent on re-import of the same file', 'covered', 'imports', 'P0', 'The duplicate banner is the visible surface of a behaviour'],
    ['FR-3.8', 'Original certificate retained and linked to every result', 'covered', 'certificate · documents', 'P0', ''],
    ['FR-3.9', 'Amended certificates supersede, cascading without orphaning', 'covered', 'certificate · supersession', 'P0', ''],
    ['FR-3.10', 'Logger and telemetry import with barometric compensation (S8)', 'deferred', '—', 'P4', ''],
    ['FR-3.11', 'Import from ESdat, HGA+ and EQuIS with a reconciliation proof', 'covered', 'migration', 'P1', ''],
    ['FR-4.1', 'Holding times by matrix and method', 'covered', 'qc', 'P0', ''],
    ['FR-4.2', 'A reporting limit above the criterion is flagged', 'covered', 'indeterminate · crosstab', 'P0', 'Claim B5 — the register the incumbents lack'],
    ['FR-4.3', 'Duplicate RPD, blanks and recoveries against configurable limits', 'covered', 'qc · qc-limits', 'P0', ''],
    ['FR-4.4', 'Internal consistency: total/dissolved, ionic balance, TDS, EC', 'covered', 'consistency', 'P0', ''],
    ['FR-4.5', 'Spikes and outliers against the location’s own history', 'covered', 'qc', 'P2', 'Raised as a finding with its working — median, MAD and the score, over the bore’s own record'],
    ['FR-4.6', 'Validation state machine with attribution, including bulk', 'covered', 'validation', 'P0', ''],
    ['FR-4.7', 'Data lock for periods reported to a regulator', 'covered', 'qualifiers', 'P1', ''],
    ['FR-4.8', 'Manual qualifiers from a controlled reason-code list', 'covered', 'qualifiers', 'P0', ''],
    ['FR-5.1', 'All applicable criteria concurrently, an outcome per criterion', 'covered', 'crosstab · exceedances', 'P0', ''],
    ['FR-5.2', 'Consecutive-exceedance and rolling-window conditions', 'covered', 'exceedances', 'P1', 'Licence condition 12(c) evaluated over four rounds, four series, three distinct outcomes'],
    ['FR-5.3', 'TARP state with escalation, acknowledgement and response', 'covered', 'tarp · alerts', 'P0', ''],
    ['FR-5.4', 'Automatic re-evaluation on data change, reflected in lineage', 'covered', 'certificate · supersession', 'P0', ''],
    ['FR-5.5', 'Mass load from volume and concentration, by reporting period', 'covered', 'water', 'P2', 'Quarterly loads at the discharge point, with a censored quarter carrying its interval rather than a substituted number'],
    ['FR-5.6', 'Extraction against entitlement with approaching-limit flags', 'covered', 'water', 'P1', 'The flag is decided from the volumes, at a stated threshold, with the projection’s rule printed beside the rule that would clear it'],
    ['FR-5.7', 'Water level to groundwater elevation via the datum in force', 'covered', 'hydrograph', 'P0', ''],
    ['FR-5.8', 'Censored statistics: Kaplan-Meier and robust ROS, never silent half-LOR', 'covered', 'statistics', 'P0', 'Claim B2'],
    ['FR-5.9', 'Mann-Kendall, seasonal Kendall, Sen’s slope, sample-size warnings', 'covered', 'statistics', 'P0', ''],
    ['FR-6.1', 'Hydrographs with rainfall, criteria lines, multi-location comparison', 'covered', 'hydrograph', 'P0', ''],
    ['FR-6.2', 'Censored values rendered censored — never zero, never dropped', 'covered', 'hydrograph · statistics', 'P0', ''],
    ['FR-6.3', 'Crosstab tables with per-criterion exceedance shading', 'covered', 'crosstab', 'P0', ''],
    ['FR-6.4', 'Map symbology by exceedance and TARP state, with print layout', 'partially', 'map', 'P1', 'The print layout is not drawn'],
    ['FR-6.5', 'Piper, Stiff, Durov and Schoeller with censored handling', 'partially', 'hydrochem', 'P1', 'Durov sits outside the twelve approved plates — a grammar proposal, Jerry’s call'],
    ['FR-6.6', 'Vector export at print fidelity; chart configuration persists', 'partially', 'report-figures · saved-views', 'P1', 'Persisted configuration rides on a proposed screen'],
    ['FR-6.7', 'Spatial export as shapefile and GeoJSON', 'partially', 'map', 'P2', 'Named in the export menu; the export decision surface is not drawn'],
    ['FR-7.1', 'Reports from templates to Word, Excel and PDF; Word primary', 'covered', 'report', 'P0', ''],
    ['FR-7.2', 'Styling, figure and table numbering, cross-references, captions', 'covered', 'report · report-figures', 'P1', 'Template configuration with versions and an effective date; numbering derived from position, and an insert previewed before it renumbers'],
    ['FR-7.3', 'A data snapshot with every issued report; identical regeneration', 'covered', 'snapshot', 'P0', ''],
    ['FR-7.4', 'Customer-branded output; Strataflow attribution metadata only', 'covered', 'report', 'P1', 'A property of the output, stated on the composer'],
    ['FR-7.5', 'Prescriptive regulatory reports, versioned, golden-tested', 'covered', 'report', 'P1', `The comparison against the approved reference, gating the snapshot — ${GOLDEN.passed} checks passing, ${GOLDEN.failed} failing on unwritten sections, and a named past drift`],
    ['FR-7.6', 'Regulator-format and EQuIS-compatible EDD export (S8)', 'deferred', '—', 'P4', ''],
    ['FR-8.1', 'Sampling programs with due and overdue tracking', 'covered', 'programme · obligations', 'P0', ''],
    ['FR-8.2', 'Exceedance and trigger alerts with acknowledgement and escalation', 'covered', 'alerts', 'P0', ''],
    ['FR-8.3', 'Approval and sign-off distinct from data validation', 'covered', 'signoff', 'P0', ''],
    ['FR-8.4', 'Statutory notification: became-aware, countdown, evidence, record', 'covered', 'notification', 'P0', ''],
    ['QB-1', 'A figure is placed into a regulatory submission unedited', 'no screen', '—', 'P0', 'Gated by the §7.4 print test, not by a drawing (G-76b)'],
    ['QB-2', 'A full monthly report without opening Excel', 'covered', 'report', 'P0', ''],
    ['QB-3', 'The regenerated figure is identical but for the new data', 'covered', 'snapshot', 'P0', ''],
    ['QB-4', 'Vector output survives the customer’s Word template', 'no screen', '—', 'P0', 'The same gate as QB-1'],
    ['QB-5', 'Zero exits to another tool across the core loop', 'covered', 'imports · import-review · import-commit · qc · exceedances · report', 'P0', 'Walked as Journey 1 below'],
    ['QB-6', 'Zero hand-edits of a source laboratory file', 'covered', 'import-review', 'P0', ''],
    ['QB-7', 'Destructive actions reversible, and visibly so before acting', 'covered', 'data-states', 'P0', 'Stated on every consequential control (G-EXP-5)'],
    ['QB-8', 'A first import with no training, coming from ESdat or EQuIS', 'no screen', '—', 'P0', 'An observed practitioner session, still outstanding (ia-rationale §5)'],
    ['QB-9', 'Practitioner terminology exactly; LOR/MDL/PQL never collapsed', 'covered', 'result-detail · dictionary', 'P0', ''],
    ['QB-10', 'Ambiguity is a decision the user makes, never a silent default', 'covered', 'import-review · quarantine', 'P0', ''],
    ['OM-1', 'Customer-initiated diagnostic bundle', 'covered', 'diagnostics', 'P2', 'Preview-before-export is the trust feature'],
    ['OM-2', 'Version visibility across the deployment estate', 'partially', 'instance', 'P3', 'One instance shows itself; the estate view is the vendor’s, out of frame here'],
    ['OM-3', 'Upgrade coordination: scheduling, approval, pre-flight, rollback', 'covered', 'upgrade', 'P2', ''],
    ['OM-4', 'Entitlement and contract enforcement with defined expiry behaviour', 'covered', 'entitlement', 'P2', ''],
    ['OM-5', 'Configuration portability, versioned independently of the app', 'partially', 'formats · criteria', 'P2', 'Versions are shown; the package import/export surface is not drawn'],
    ['DR-1', 'All customer data in the customer’s own tenancy; no egress', 'no screen', '—', 'P0', 'Architecture; stated on the instance screen'],
    ['DR-2', 'No vendor telemetry; diagnostics are customer-initiated', 'covered', 'diagnostics', 'P0', ''],
    ['DR-3', 'No integration routes customer data through vendor infrastructure', 'no screen', '—', 'P1', 'A standing constraint on Domain R, recorded before anything is drawn there'],
  ];

  const BASELINE = [
    // [source, capability, tier, response, owners, note]
    ['ESdat §2.1', 'Meta Standards combine standards into one before evaluation', '✅', 'exceed', 'crosstab · exceedances', 'Concurrent outcomes with a mark per criterion; attribution never lost to a merge'],
    ['ESdat §2.1', 'Conditional action levels on pH, hardness, depth and matrix', '✅', 'match', 'criteria · hardness', 'Parity on capability; showing the working is the difference'],
    ['ESdat §2.2', 'Four distinct detection limits carried and exportable', '✅', 'match', 'result-detail', 'QB-9 is an internal bar, not a claim against the market'],
    ['ESdat §2.3', 'A reporting limit above the criterion renders as a pass by default', '◐', 'exceed', 'indeterminate · crosstab', 'Claim B5 — a distinct state on every surface, never a setting'],
    ['ESdat §2.4', 'LabSync: laboratories deliver with no user involvement', '✅', 'reject', 'imports', 'G-79 chose file-first deliberately; the concession is permanent'],
    ['ESdat §2.4', 'Import errors are file-level; content problems go back to the laboratory', '✅', 'exceed', 'quarantine · import-review', 'PP5: commit the good rows, hold the rest with the way out on each'],
    ['ESdat §2.5 · EQuIS §3.3', 'Censored statistics answered by export to ProUCL', '✅', 'exceed', 'statistics', 'Claim B2: Kaplan-Meier and robust ROS in-tool, the same estimator everywhere'],
    ['ESdat §2.6', 'Charts export PNG and PDF; no vector format mentioned', '◐', 'exceed', 'report-figures', 'Narrowed by EQuIS §3.2; the drawn claim inherits the unprinted-grammar caveat'],
    ['ESdat §2.6', 'Piper, Durov and Schoeller free as a public web app', '✅', 'match', 'hydrochem', 'A table stake (§7.2); Durov needs a grammar proposal first'],
    ['ESdat §2.6', 'Report-ready bore logs, free', '✅', 'match', 'location', ''],
    ['ESdat §2.6', 'Power BI, ArcGIS, MapInfo and QGIS export', '✅', 'defer', 'map', 'Domain R, P3; display and spatial export only (NG4)'],
    ['ESdat §2.8', 'Web interface usable with no training', '✅', 'match', '—', 'QB-8’s observed session is the test, and it is outstanding'],
    ['EQuIS §3.1', 'Concurrent evaluation against all applicable action levels', '✅', 'match', 'crosstab · exceedances', 'Capability parity; presentation is the open half, and may not be laundered into a beat'],
    ['EQuIS §3.2', 'SVG vector output, placed into Word via template files', '✅', 'match', 'report-figures', 'B3 narrowed: the vector axis is closed; unedited placement is untested for all four'],
    ['EQuIS §3.3', 'Any report scheduled or triggered on data load, emailed', '✅', 'match', 'alerts', ''],
    ['EQuIS §3.3', 'Esri ArcGIS embedded', '✅', 'concede', 'map', 'NG4; display and export only'],
    ['EQuIS §7.3', 'Dashboards composed from widgets, by a specialist', '✅', 'reject', 'project-settings', 'Countered on a different axis: self-service without the desktop client (G8)'],
    ['HGA+ §4', 'Twenty-plus geochemical and statistical plots', '✅', 'simplify', 'hydrochem · statistics', 'The twelve approved plates, extended only through the grammar fence'],
    ['HGA+ §4', 'Mann-Kendall, seasonal Mann-Kendall, Sen’s slope, Spearman', '✅', 'match', 'statistics', ''],
    ['HGA+ §4', 'Non-detects extracted or excluded — filtering, not estimation', '◐', 'exceed', 'statistics', 'Claim B2, from the other side'],
    ['HGA+ §4', 'Exceedance reports for multiple water-quality standards', '◐', 'match', 'exceedances', 'The same phrase meant merge-into-one at ESdat; unresolved there, unverified here'],
    ['EnviroSys §5', 'Missing-data notification as a headline feature', '◐', 'match', 'programme · obligations', 'Programme completeness with never-collected called out by name'],
    ['EnviroSys §5', 'Breadth across air, noise, waste, flora and fauna', '◐', 'defer', '—', 'Wider than the slice; S8 widening, not a screen gap'],
    ['EnviroSys §5', 'Criteria, exceedance semantics and figures — undocumented', '⚠️', 'unverified', '—', 'Recorded as silence; no requirement derived from it'],
  ];

  const JOURNEYS_WALK = [
    // [n, name, status, [ [step, screenId|null], … ], note]
    ['1', 'Laboratory EDD → approved data', 'covered',
      [['Programme', 'programme'], ['Round', 'events'], ['Sampling event', 'events'], ['eCOC', 'ecoc'], ['Certificate', 'certificate'], ['Import batch', 'imports'], ['Parse', 'imports'], ['Map', 'import-review'], ['Validate', 'import-review'], ['Exceptions', 'quarantine'], ['Partial accept', 'import-commit'], ['QA/QC', 'qc'], ['DQA', 'dqa'], ['Approval', 'validation'], ['Results', 'crosstab']],
      'Closed by the chain-of-custody screen — creation, seals and transfer, where receipt covered only the laboratory end'],
    ['2', 'Result → exceedance response', 'partially',
      [['Result', 'result-detail'], ['Applicable criteria', 'criteria'], ['Derivation', 'hardness'], ['Exceedance', 'exceedances'], ['Evaluation', 'exceedances'], ['TARP / obligation', 'tarp'], ['Acknowledge', 'alerts'], ['Assign', 'home'], ['Evidence', 'documents'], ['Approve', 'signoff'], ['Close', 'tarp']],
      'Assignment rides on the work queue, kept as a proposal by decision (1 Sep 2026 — findings §7)'],
    ['3', 'Result → issued report', 'covered',
      [['Result', 'crosstab'], ['Validation', 'validation'], ['Evaluation', 'exceedances'], ['Figure / table', 'report-figures'], ['Snapshot', 'snapshot'], ['Assembly', 'report'], ['Quality review', 'report'], ['Approval', 'signoff'], ['Issue', 'submissions'], ['Archive', 'submissions'], ['Regenerate', 'snapshot']],
      ''],
    ['4', 'Certificate amendment', 'covered',
      [['Original', 'certificate'], ['Amendment', 'certificate'], ['Supersession comparison', 'supersession'], ['Impacted results', 'supersession'], ['Recalculated derivations', 'hardness'], ['Changed exceedances', 'exceedances'], ['Changed trigger states', 'tarp'], ['Affected reports', 'snapshot'], ['Decision', 'certificate']],
      ''],
    /*
     * Wave 6. The status does NOT move: `field-capture` is still `proposed`
     * and assignment still rides the work-queue proposal, and a journey is
     * owned only when every step lands on a drawn screen that is not a
     * proposal. What changed is the note — the field half of this walk was
     * redesigned to a practitioner's axis rather than deepened on the drawn
     * one — and saying that precisely is the whole of the register update.
     */
    ['5', 'Programme → completed field work', 'partially',
      [['Programme', 'programme'], ['Recurrence', 'programme'], ['Round', 'events'], ['Locations / suites', 'events'], ['Assignment', 'home'], ['Field work', 'field-capture'], ['Samples / QC', 'field-capture'], ['eCOC', 'ecoc'], ['Custody transfer', 'ecoc'], ['Laboratory receipt', 'receipt'], ['Completion', 'programme']],
      'Field work is now designed to the practitioner’s own axis — the bore session, with the disposition vocabulary and the completion preflight — after a senior hydrogeologist judged the drawn column-by-column entry model wrong (1 Sep 2026). The status stays partially: field capture remains a proposal, so two of its eleven steps land on one, and assignment rides the work-queue proposal kept by decision (findings §7). Redesigning a proposal does not make it a product route'],
    ['6', 'Statutory notification', 'covered',
      [['Licence condition', 'licence'], ['Triggering result', 'result-detail'], ['Became aware', 'notification'], ['Deadline', 'notification'], ['Evidence review', 'documents'], ['Approval', 'signoff'], ['Submission', 'notification'], ['Proof', 'documents'], ['Closure', 'notification'], ['Audit', 'audit']],
      ''],
    ['7', 'Groundwater interpretation', 'partially',
      [['Bore nest', 'location'], ['Water levels', 'hydrograph'], ['Datum conversion', 'hydrograph'], ['Elevation', 'hydrograph'], ['Hydrograph', 'hydrograph'], ['Potentiometric surface', 'map'], ['Reliability', 'map'], ['Interpretation', 'narrative'], ['Saved figure', 'saved-views'], ['Report', 'report-figures']],
      'Two steps rest on proposed screens'],
    ['8', 'Configuration → operational effect', 'covered',
      [['Criteria / QA rule', 'criteria'], ['Version', 'criteria'], ['Test against records', 'criteria'], ['Impact preview', 'criteria'], ['Approval', 'signoff'], ['Activation', 'criteria'], ['Affected results', 'exceedances'], ['Re-evaluation', 'exceedances'], ['Audit', 'audit'], ['Rollback', 'criteria']],
      'The version pair, the draft run against the committed record naming the six results it moves, and activation and rollback as controls stating what each writes'],
    ['9', 'Portfolio → evidence', 'covered',
      [['Portfolio', 'obligations'], ['Project issue', 'project-home'], ['Location / obligation', 'location'], ['Triggering data', 'result-detail'], ['Response', 'tarp'], ['Report / notification', 'notification'], ['Evidence', 'documents'], ['Audit trail', 'audit']],
      // The note is escaped where it renders, so the codes go in raw.
      `Unblocked by the second project: the first two hops cross projects — the register counts ${PORTFOLIO.obligations.length} obligations over ${PORTFOLIO.projects.length} of them, and the oldest thing owed on the estate is ${KURRAJONG.code}’s — and from Project issue onward the walk descends into ${PROJECT.code}, whose workspace is the one this catalogue draws`],
  ];

  const STATUS_TONE = { covered: 'good', partially: 'warn', missing: 'bad', deferred: 'neutral', 'no screen': 'neutral', unverified: 'neutral' };
  const prdCovered = PRD.filter((r) => r[2] === 'covered').length;
  const journeysOwned = JOURNEYS_WALK.filter((j) => j[2] === 'covered').length;
  const owners = (list) =>
    list === '—'
      ? '<span class="mk-muted">—</span>'
      : list.split(' · ').map((w) => `<a class="mk-ref" href="#${w}">${esc(w)}</a>`).join(' · ');

  const covered = SURFACES.length;
  const added = SURFACES.filter((s) => s[3] === 'new').length;
  const answered = FINDINGS.filter((f) => !f[3].startsWith('n/a')).length;

  return (
    head('Coverage', 'The six enumerations this catalogue is exhaustive against, and the screen that answers each row.', {
      route: 'The viewer’s own audit — not a product screen',
      toolbar: C.exportMenu(),
    }) +
    stats([
      stat(String(covered), 'register surfaces owned', 'good'),
      stat(String(added), 'of them added in this pass', 'good'),
      stat('14 / 14', 'global expectations drawn', 'good'),
      stat(`${answered} / 27`, 'audit findings answered', 'warn'),
      stat(String(DOMAIN.length), 'domain gaps closed', 'good'),
      stat(`${prdCovered} / ${PRD.length}`, 'PRD rows drawn (1 Sep)', 'warn'),
      stat(String(BASELINE.length), 'incumbent rows answered', 'good'),
      stat(`${journeysOwned} / ${JOURNEYS_WALK.length}`, 'journeys fully owned', 'warn'),
    ]) +
    `<p class="mk-tight mk-muted">Twenty screens were added in this pass and ${added} of them are register surfaces. The other three are J10 — the data states, the keyboard contract and this page — which answer cross-cutting expectations rather than owning a section. Two numbers, two denominators, and they are not the same claim.</p>` +
    notice(
      'warning',
      'Exhaustive relative to six closed lists, and no further.',
      'Absolute exhaustiveness is unfalsifiable. This is complete against the fourteen global expectations, the register’s own section list, the twenty-seven findings of the 22–23 August audit — and, since 1 September, the PRD requirement register, the incumbent capability baseline and the nine journeys of EXPANSION_BRIEF.md §8 — and it has a hole the moment any of those grows. Four findings are marked <code class="mk-file">n/a</code> rather than claimed: three are properties of a running application that a single static document does not have, and one is a development-server defect with no design content. Marking them covered would have been the easier lie.',
    ) +
    '<h2 class="mk-h2">Global expectations — every screen, no exceptions</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Ref</th><th>Expectation</th><th>Drawn on</th><th>How</th></tr></thead><tbody>${GLOBAL.map(
      ([id, what, where, how]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td><td><strong>${esc(what)}</strong></td>` +
        `<td>${where
          .split(' · ')
          .map((w) => (w.includes(' ') ? `<span class="mk-muted">${esc(w)}</span>` : `<a class="mk-ref" href="#${w}">${esc(w)}</a>`))
          .join(' · ')}</td><td>${how}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">Surfaces — every section of the register has an owner</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>§</th><th>Surface</th><th>Screen</th><th>Status</th></tr></thead><tbody>${SURFACES.map(
      ([sec, what, id, state]) =>
        `<tr><td class="mk-cover__id">${esc(sec)}</td><td>${esc(what)}</td>` +
        `<td><a class="mk-ref" href="#${id}">${esc(id)}</a></td>` +
        `<td>${state === 'new' ? '<span class="mk-tag mk-tag--new">added this pass</span>' : '<span class="mk-tag mk-tag--neutral">already drawn</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">A fourth list — what reading the screens as a practitioner turned up</h2>' +
    notice(
      'default',
      'This list had no document behind it, which is what makes it worth keeping.',
      'The three enumerations above came from things this repository already held. These nineteen came from going through the screens as a hydrogeologist and a laboratory data manager would, asking what they would look for and fail to find. Nothing generated the list and nothing defends it — so it is the least trustworthy table on this page, and the most valuable.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Area</th><th>What was missing</th><th>Screen</th><th>What it does</th></tr></thead><tbody>${DOMAIN.map(
      ([area, what, id, how]) =>
        `<tr><td class="mk-cover__id">${esc(area)}</td><td><strong>${esc(what)}</strong></td>` +
        `<td><a class="mk-ref" href="#${id}">${esc(id)}</a></td><td>${esc(how)}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">Findings from the August audit — the designed answer to each</h2>' +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Ref</th><th>Severity</th><th>What was found</th><th>Answered on</th><th>How</th></tr></thead><tbody>${FINDINGS.map(
      ([id, sev, what, where, how]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td>` +
        `<td>${tag(sev, sev === 'Blocker' ? 'bad' : sev === 'Major' ? 'warn' : 'neutral')}</td>` +
        `<td>${esc(what)}</td>` +
        `<td>${where
          .split(' · ')
          .map((w) => (w.includes(' ') || w.startsWith('n/a') ? `<span class="mk-muted">${esc(w)}</span>` : `<a class="mk-ref" href="#${w}">${esc(w)}</a>`))
          .join(' · ')}</td><td>${how}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The PRD register — every requirement row, and what owns it here (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'Statuses speak about what is drawn, not what is built.',
      'The rail dots carry built-ness, re-derived the same day. <code class="mk-file">no screen</code> names a requirement whose surface is a behaviour, an output property or a protocol — claiming a screen for it would be coverage theatre. Priorities follow EXPANSION_BRIEF.md: P0 the vertical-slice loop, P1 competitive v1, P2 customer readiness, P3 comprehensive, P4 specialist and future.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Req</th><th>Requirement</th><th>Status</th><th>Owner</th><th>Priority</th><th>Note</th></tr></thead><tbody>${PRD.map(
      ([id, what, status, own, prio, note]) =>
        `<tr><td class="mk-cover__id">${esc(id)}</td><td>${esc(what)}</td>` +
        `<td>${tag(status, STATUS_TONE[status])}</td>` +
        `<td>${owners(own)}</td>` +
        `<td class="mk-cover__id">${esc(prio)}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The incumbent baseline — every capability row, answered (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'The evidence tiers are the baseline’s own, and an unverified capability never becomes a requirement.',
      '✅ verified from vendor documentation · ◐ lesser-standing vendor material · ⚠️ unverified. Responses follow the brief: match, simplify, exceed, defer, reject, concede, unverified. The source rows live in <code class="mk-file">docs/reference/incumbent-baseline.md</code> in the app repo, retrieved 10 August 2026.',
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>Source</th><th>Capability</th><th>Tier</th><th>Response</th><th>Answered on</th><th>Note</th></tr></thead><tbody>${BASELINE.map(
      ([sourceRef, what, tier, resp, own, note]) =>
        `<tr><td class="mk-cover__id">${esc(sourceRef)}</td><td>${esc(what)}</td><td>${esc(tier)}</td>` +
        `<td>${tag(resp, resp === 'exceed' ? 'good' : resp === 'unverified' ? 'neutral' : resp === 'reject' || resp === 'concede' ? 'neutral' : resp === 'defer' ? 'warn' : 'neutral')}</td>` +
        `<td>${owners(own)}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    '<h2 class="mk-h2">The nine journeys, walked step by step (added 1 Sep 2026)</h2>' +
    notice(
      'default',
      'A journey is owned when every step lands on a drawn screen that is not a proposal.',
      `Each step below is a link, or a named hole. The deferred telemetry journey is not walked: EXPANSION_BRIEF.md defers it with Domain K, matching the PRD’s S8 marking, and walking it would require inventing the screens it defers. Journey 9 was the one held open by the data rather than by a drawing — a portfolio cannot be drawn honestly from a one-site seed, and the answer was a second project in <code class="mk-file">seed.mjs</code> rather than a screen. It carries ${KURRAJONG.bores.length} bores, ${KURRAJONG.rounds.length} rounds and ${KURRAJONG.obligations.length} obligations, and its workspace is deliberately <em>not</em> drawn: the walk crosses two projects and then descends into the one this catalogue owns, which is what the note on its row says.`,
    ) +
    `<div class="mk-table-wrap"><table class="mk-cover"><thead><tr><th>J</th><th>Journey</th><th>Status</th><th>The walk</th><th>Note</th></tr></thead><tbody>${JOURNEYS_WALK.map(
      ([n, name, status, steps, note]) =>
        `<tr><td class="mk-cover__id">${esc(n)}</td><td><strong>${esc(name)}</strong></td>` +
        `<td>${tag(status, STATUS_TONE[status])}</td>` +
        `<td>${steps
          .map(([label, sid]) => (sid ? `<a class="mk-ref" href="#${sid}">${esc(label)}</a>` : `<span class="mk-tag mk-tag--bad" title="No screen owns this step">${esc(label)}</span>`))
          .join(' <span class="mk-muted">→</span> ')}</td>` +
        `<td>${note ? esc(note) : '<span class="mk-muted">—</span>'}</td></tr>`,
    ).join('')}</tbody></table></div>` +
    cols(
      panel(
        'What a green row here does not mean',
        '<p class="mk-tight">It means the expectation has been <em>drawn</em>. It does not mean it is built, and it does not mean it is right.</p>' +
          '<p class="mk-tight">Both design oracles this catalogue is drawn to were self-approved and neither has been printed. <strong>A practitioner has now looked at four of these screens</strong> — a senior hydrogeologist reviewed the field-capture grid, the QA/QC workspace, the lineage panel and the interpretation editor on 1 September 2026, the four with the most invention in them, and returned four P0 design changes and a binding keep-list. <strong>All four are answered here</strong>: field capture rebuilt around the bore session, QA/QC around the decision layer, provenance beginning at the bore rather than at the deliverable, and the interpretation editor carrying evidence for the inference rather than for its citations. What that does <em>not</em> mean is that the answers are right — the same practitioner has not seen them, and the redesigned screens now carry more invention than the ones the review corrected, not less.</p>' +
          '<p class="mk-tight">The lesson of that review is the one worth keeping past it: the drawn version of both screens was internally consistent, carefully argued and <em>wrong on an axis</em>, and no amount of re-reading would have found it. Five minutes of a practitioner’s attention was worth more than the day of drawing that produced them.</p>' +
          '<p class="mk-tight">A catalogue is easy to make look complete while the judgements inside it are wrong, and this table measures completeness only.</p>',
      ),
      panel(
        'How to find the next hole',
        '<p class="mk-tight">Re-run the three enumerations rather than reading this table. It was assembled by hand and hand-maintained summaries rot, fastest in whichever direction flatters the person writing them.</p>' +
          table({
            head: ['Enumeration', 'Where it lives', 'Re-run by'],
            scroll: true, label: 'The enumerations and how to re-run them',
            rows: [
              ['Global expectations', 'The register’s §0', 'Reading §0 against this screen'],
              ['Surfaces', 'The register’s §15 matrix', 'Every glossary entity has an owning screen'],
              ['Findings', 'The August audit report', 'Every F-number appears once above'],
              ['Entities', 'The glossary and the schema', 'A new table is a new row here'],
              ['PRD register', 'docs/PRD.md §7–§9, §12 (app repo)', 'Every FR, QB, OM and DR id appears exactly once above'],
              ['Incumbent baseline', 'docs/reference/incumbent-baseline.md', 'Every §2–§5 capability row appears once above'],
              ['Journeys', 'EXPANSION_BRIEF.md §8', 'Every step renders as a link, or is flagged unowned'],
            ],
          }) +
          stateSentence(),
      ),
    )
  );
};

/* ================================================================== *
 * The catalogue
 * ================================================================== */

/**
 * Nine jobs became eleven, and the two that arrived are the argument.
 *
 * **J0 did not exist**, and its absence was structural rather than an
 * oversight: the catalogue opened on a bore's detail page, which assumes a
 * practitioner who already knows which project they are in and what needs
 * them. Nobody arrives knowing that. The work queue, the search box, the
 * project list and the project home are the four surfaces every session
 * actually starts at, and none of them had been drawn.
 *
 * **J10 is not a job at all**, and it is marked so. It holds the three
 * cross-cutting claims — the four data states, the keyboard contract, and the
 * coverage matrix — drawn once each. Every one of them is a promise repeated
 * on thirty-odd other screens, and a promise made thirty times is a promise
 * nobody checks.
 *
 * ## Two dated state fields, and neither may be rewritten in place
 *
 * `state` records what was true on **23 August 2026** — the third pass's
 * finding, kept verbatim because rewriting it would erase the finding and
 * leave a document that had always been right. `now` records the fourth
 * pass's re-derivation on **1 September 2026**, from the measurements
 * EXPANSION_BRIEF.md §2 names: `apps/web/lib/navigation/routes.ts` lists 69
 * routes, every engine module (figures, report, validation, evaluation,
 * derivation, calc, stats, config) is imported by screen modules, and the
 * ambiguous screens were read rather than inferred. A fifth pass adds its
 * own dated derivation the same way; it does not edit these.
 *
 * What `now: 'shipped'` claims is exactly what the product's e2e suite
 * proves — the route exists, loads, is scoped and renders — plus a read of
 * the module showing it serves this screen's job. It does not claim the
 * product screen matches this drawing, and it says nothing about G-76b.
 */
export const JOBS = [
  { id: 'j0', n: 'J0', title: 'Arrive, and find out what needs you', who: 'U1 · U2 · U4 · U5',
    note: 'Absent from the first build. The authorisation scope had no face, and the catalogue opened on a screen that assumes you already know where you are.',
    screens: [
      { id: 'home', label: 'Work queue', body: workQueue, state: 'not built', isNew: true, now: 'proposed' },
      { id: 'search', label: 'Search', body: globalSearch, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'projects', label: 'Projects', body: projectList, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'project-home', label: 'Project home', body: projectHome, state: 'shipped', isNew: true, now: 'shipped' },
    ] },
  { id: 'j1', n: 'J1', title: 'Get the data in, and know it landed', who: 'U1 · U5',
    note: 'The strongest surface in the product, and the only job whose main screen is genuinely built.',
    screens: [
      { id: 'locations', label: 'Location register', body: locationRegistry, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'location', label: 'Location detail', body: locationDetail, state: 'not built', now: 'shipped' },
      { id: 'facility', label: 'Facility and areas', body: facilityScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'events', label: 'Sampling events', body: samplingEvents, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'imports', label: 'Import runs', body: importRuns, state: 'shipped', now: 'shipped' },
      { id: 'import-review', label: 'Exception review', body: importReview, state: 'shipped', now: 'shipped' },
      { id: 'import-commit', label: 'Commit and reversal', body: importCommit, state: 'shipped', now: 'shipped' },
      { id: 'quarantine', label: 'Held rows', body: quarantine, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'purge', label: 'Purge and stabilisation', body: purgeLog, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'receipt', label: 'Receipt and custody', body: sampleReceipt, state: 'not built', isNew: true, now: 'shipped' },
      /*
       * No `state`, deliberately. `state` is the 23 August record and this
       * screen did not exist on 23 August; writing one would fabricate a
       * history to satisfy a field's shape. `added` carries the date it
       * arrived instead, and `build.mjs` renders that where it would
       * otherwise render a state it does not have.
       */
      { id: 'ecoc', label: 'Chain of custody', body: chainOfCustody, now: 'proposed', added: '2026-09-01' },
      { id: 'certificate', label: 'Certificate and supersession', body: certificate, state: 'engine-only', now: 'shipped' },
      { id: 'migration', label: 'Legacy reconciliation', body: migration, state: 'engine-only', now: 'shipped' },
      { id: 'field-capture', label: 'Field capture', body: fieldCapture, state: 'proposed', now: 'proposed' },
    ] },
  { id: 'j2', n: 'J2', title: 'Know the data is right', who: 'U1 · U2',
    note: 'Nine validation modules, every one tested, none of them reachable from a browser.',
    screens: [
      { id: 'qc', label: 'QA/QC workspace', body: qcWorkspace, state: 'engine-only', now: 'shipped' },
      { id: 'batches', label: 'Laboratory batches', body: labBatches, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'qc-limits', label: 'Data quality objectives', body: qcLimits, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'dqa', label: 'Data quality assessment', body: dataQuality, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'consistency', label: 'Internal consistency', body: consistency, state: 'engine-only', now: 'shipped' },
      { id: 'validation', label: 'Validation state', body: validationBoard, state: 'engine-only', now: 'shipped' },
      { id: 'qualifiers', label: 'Qualifiers and lock', body: qualifiers, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j3', n: 'J3', title: 'Know what is wrong', who: 'U2 · U3 · U4',
    note: 'The exceedances page currently says, in its own words, that it is not built.',
    screens: [
      { id: 'exceedances', label: 'Exceedance register', body: exceedances, state: 'engine-only', now: 'shipped' },
      { id: 'crosstab', label: 'Results crosstab', body: crosstab, state: 'engine-only', now: 'shipped' },
      { id: 'result-detail', label: 'Result detail', body: resultDetail, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'hardness', label: 'How this criterion was calculated', body: hardnessDerivation, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'indeterminate', label: 'Could not be assessed', body: indeterminateRegister, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'tarp', label: 'TARP state', body: tarpBoard, state: 'engine-only', now: 'shipped' },
      { id: 'alerts', label: 'Alerts', body: alerts, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j4', n: 'J4', title: 'Understand it and explain it', who: 'U2',
    note: 'Twenty-two figure modules and twelve approved renderings. No route imports any of them.',
    screens: [
      { id: 'hydrograph', label: 'Hydrograph', body: hydrographWorkspace, state: 'engine-only', now: 'shipped' },
      { id: 'hydrochem', label: 'Hydrogeochemistry', body: hydrochem, state: 'engine-only', now: 'shipped' },
      { id: 'statistics', label: 'Statistics and trend', body: statistics, state: 'engine-only', now: 'shipped' },
      { id: 'background', label: 'Background comparison', body: backgroundComparison, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'stygofauna', label: 'Subterranean fauna', body: stygofaunaScreen, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'map', label: 'Map and spatial', body: mapScreen, state: 'engine-only', now: 'shipped' },
      { id: 'saved-views', label: 'Saved views', body: savedViews, state: 'proposed', now: 'proposed' },
    ] },
  { id: 'j5', n: 'J5', title: 'Produce the submission', who: 'U2 · U4',
    note: 'The Word assembler is complete. There is no way to reach it from the application.',
    screens: [
      { id: 'report', label: 'Report builder', body: reportBuilder, state: 'engine-only', now: 'shipped' },
      { id: 'report-figures', label: 'Figures and tables', body: reportFigures, state: 'engine-only', now: 'shipped' },
      { id: 'narrative', label: 'Interpretation', body: narrative, state: 'proposed', now: 'proposed' },
      { id: 'snapshot', label: 'Snapshot and reissue', body: snapshot, state: 'engine-only', now: 'shipped' },
      { id: 'submissions', label: 'Submission archive', body: submissionArchive, state: 'engine-only', isNew: true, now: 'shipped' },
    ] },
  { id: 'j6', n: 'J6', title: 'Keep the obligations met', who: 'U4 · U1',
    note: 'The scheduler, alerting and immutable awareness all landed. One aggregate list surfaces any of it.',
    screens: [
      { id: 'obligations', label: 'Obligations board', body: obligations, state: 'shipped', now: 'shipped' },
      { id: 'programme', label: 'Sampling programme', body: programme, state: 'engine-only', now: 'shipped' },
      /*
       * No `state`, deliberately, on the same rule the chain of custody
       * follows: `state` is the 23 August record and this screen was not
       * drawn then. It differs from that one in being `shipped` rather than
       * proposed — `/projects/:projectId/water` is a route in the product
       * today, and the catalogue is what was missing. It sits in this job
       * because the entitlement is a licence obligation; the product parents
       * it under Locations, which is the other axis and is where the
       * by-section view files it.
       */
      { id: 'water', label: 'Water take against entitlement', body: waterScreen, now: 'shipped', added: '2026-09-01' },
      { id: 'licence', label: 'Licence and conditions', body: licenceScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'notification', label: 'Statutory notification', body: notification, state: 'engine-only', now: 'shipped' },
      { id: 'signoff', label: 'Approval and sign-off', body: signoff, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j7', n: 'J7', title: 'Prove what was known, and when', who: 'U2 · U4',
    note: 'The deepest architecture in the product, and the only job with no surface at all.',
    screens: [
      { id: 'lineage', label: 'Lineage', body: lineage, state: 'proposed', now: 'proposed' },
      { id: 'audit', label: 'Audit trail', body: auditTrail, state: 'engine-only', now: 'shipped' },
      { id: 'supersession', label: 'Supersession', body: supersession, state: 'engine-only', now: 'shipped' },
      { id: 'documents', label: 'Documents and evidence', body: documents, state: 'engine-only', isNew: true, now: 'shipped' },
    ] },
  { id: 'j8', n: 'J8', title: 'Configure the instance', who: 'U5',
    note: 'The criteria-editing model and the format registry are built. The promise of customer configurability fails on the surface, not the engine — there is nothing to click.',
    screens: [
      { id: 'project-settings', label: 'Project settings', body: projectSettings, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'criteria', label: 'Criteria library', body: criteriaLibrary, state: 'engine-only', now: 'shipped' },
      { id: 'formats', label: 'EDD formats', body: formatDesigner, state: 'engine-only', now: 'shipped' },
      { id: 'mapping-profiles', label: 'Mapping profiles', body: mappingProfiles, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'dictionary', label: 'Analyte dictionary', body: dictionary, state: 'engine-only', now: 'shipped' },
      { id: 'units', label: 'Units and conversions', body: unitsScreen, state: 'engine-only', isNew: true, now: 'shipped' },
      { id: 'roles', label: 'Access', body: roles, state: 'engine-only', now: 'shipped' },
    ] },
  { id: 'j9', n: 'J9', title: 'Keep the instance alive', who: 'U6',
    note: 'CLI, and this is the one job where that is the right answer rather than a shortfall — except that none of it is self-servable.',
    screens: [
      { id: 'instance', label: 'Instance health', body: instanceHealth, state: 'shipped (CLI)', now: 'shipped' },
      { id: 'upgrade', label: 'Upgrade and rollback', body: upgradeScreen, state: 'shipped (CLI)', isNew: true, now: 'shipped (CLI)' },
      { id: 'diagnostics', label: 'Backup and diagnostics', body: diagnostics, state: 'shipped (CLI)', now: 'shipped (CLI)' },
      { id: 'entitlement', label: 'About this instance', body: entitlementScreen, state: 'not built', isNew: true, now: 'shipped' },
    ] },
  { id: 'j10', n: 'J10', title: 'The conventions the whole product keeps', who: 'Every user',
    note: 'Not a job. Three cross-cutting claims, drawn once each so they can be checked once each.',
    screens: [
      { id: 'data-states', label: 'Four states, everywhere', body: dataStates, state: 'shipped', isNew: true, now: 'shipped' },
      { id: 'assistance', label: 'Keyboard and assistance', body: assistance, state: 'not built', isNew: true, now: 'shipped' },
      { id: 'coverage', label: 'Coverage matrix', body: coverage, state: 'proposed', isNew: true, now: 'proposed' },
    ] },
];

/**
 * The link graph, declared once.
 *
 * The rail is a table of contents. This is the information architecture: what
 * a practitioner reaches for *from* a screen, which is a claim about the work
 * rather than about the file layout, and it belongs somewhere a person can
 * read it and disagree with it.
 *
 * Three properties are worth keeping, and the third is new. **`location` is
 * reachable from more screens than anything else**, because the bore is the
 * entity the domain is organised around and every register is a slice through
 * it. **The sequence runs one way** — imports → review → commit → crosstab →
 * exceedances → report — so a link backwards is a deliberate exception. And
 * **every screen now reaches at least one orientation surface**, which the
 * first build did not: thirty-seven screens pointed at each other in a closed
 * loop with no exit to the place a session starts.
 */
export const RELATED = {
  home: ['exceedances', 'import-review', 'programme', 'projects', 'search'],
  search: ['location', 'crosstab', 'certificate', 'licence'],
  projects: ['project-home', 'project-settings', 'roles', 'home'],
  'project-home': ['locations', 'imports', 'exceedances', 'obligations', 'project-settings'],

  locations: ['location', 'facility', 'events', 'crosstab', 'map', 'water'],
  location: ['crosstab', 'hydrograph', 'map', 'programme', 'exceedances', 'documents', 'lineage', 'purge'],
  facility: ['locations', 'programme', 'criteria', 'project-settings'],
  events: ['location', 'field-capture', 'ecoc', 'receipt', 'imports', 'programme'],
  imports: ['import-review', 'quarantine', 'migration', 'certificate', 'formats'],
  'import-review': ['import-commit', 'quarantine', 'qc', 'dictionary', 'mapping-profiles'],
  'import-commit': ['crosstab', 'quarantine', 'exceedances', 'audit'],
  quarantine: ['import-review', 'import-commit', 'mapping-profiles', 'qc'],
  purge: ['field-capture', 'location', 'events', 'dqa', 'receipt'],
  receipt: ['events', 'ecoc', 'batches', 'qc', 'documents', 'purge'],
  certificate: ['supersession', 'lineage', 'imports', 'documents', 'hardness', 'exceedances', 'tarp', 'snapshot'],
  migration: ['imports', 'validation', 'audit', 'mapping-profiles'],
  'field-capture': ['purge', 'ecoc', 'programme', 'location', 'events'],
  // The chain is raised in the field and closed at the laboratory, so it sits
  // between the two screens that own those ends rather than beside either.
  ecoc: ['receipt', 'events', 'field-capture', 'imports', 'batches', 'lineage'],

  qc: ['batches', 'qc-limits', 'consistency', 'qualifiers', 'validation', 'dqa'],
  batches: ['qc', 'qc-limits', 'receipt', 'result-detail'],
  'qc-limits': ['qc', 'batches', 'criteria', 'dqa'],
  dqa: ['qc', 'qc-limits', 'indeterminate', 'report'],
  consistency: ['qc', 'crosstab', 'hydrochem'],
  validation: ['qualifiers', 'signoff', 'audit'],
  qualifiers: ['qc', 'validation', 'lineage', 'result-detail'],

  exceedances: ['result-detail', 'hardness', 'indeterminate', 'lineage', 'tarp', 'map'],
  crosstab: ['result-detail', 'exceedances', 'lineage', 'criteria', 'saved-views', 'report'],
  'result-detail': ['hardness', 'lineage', 'crosstab', 'qc', 'batches', 'field-capture', 'ecoc'],
  hardness: ['result-detail', 'criteria', 'indeterminate', 'lineage', 'consistency'],
  indeterminate: ['hardness', 'exceedances', 'crosstab', 'dqa', 'report'],
  tarp: ['exceedances', 'alerts', 'notification'],
  alerts: ['tarp', 'obligations', 'notification'],

  hydrograph: ['location', 'statistics', 'saved-views', 'report-figures'],
  hydrochem: ['consistency', 'crosstab', 'report-figures'],
  statistics: ['background', 'hydrograph', 'crosstab', 'report-figures'],
  background: ['statistics', 'stygofauna', 'criteria', 'map', 'exceedances'],
  stygofauna: ['background', 'map', 'locations', 'obligations'],
  map: ['location', 'stygofauna', 'exceedances', 'report-figures'],
  'saved-views': ['crosstab', 'hydrograph', 'report-figures'],

  report: ['report-figures', 'dqa', 'narrative', 'snapshot', 'signoff'],
  'report-figures': ['report', 'narrative', 'supersession', 'certificate'],
  // And the interpretation workspace reaches the evidence it pins, which is
  // what makes the set a set rather than a list of names.
  narrative: ['report', 'lineage', 'statistics', 'hydrograph', 'hydrochem', 'background', 'map', 'qc', 'location', 'supersession'],
  snapshot: ['report', 'signoff', 'submissions', 'supersession', 'certificate'],
  submissions: ['snapshot', 'signoff', 'documents', 'obligations'],

  // `/aggregate` is the one register that is genuinely above a project, and
  // until there were two projects it exited only downward — into MOCK-WDL's
  // own workspace, with nothing pointing back at the portfolio it belongs to.
  // Journey 9's first hop is Portfolio → Project issue, and this is that hop.
  obligations: ['projects', 'project-home', 'licence', 'programme', 'notification', 'signoff', 'alerts', 'water'],
  programme: ['obligations', 'field-capture', 'events', 'location'],
  licence: ['obligations', 'criteria', 'locations', 'submissions', 'water'],
  // The take is read against the licence that permits it and drawn at the
  // bores it is taken from, so it exits to both — and to the obligation it
  // discharges through, which is the only thing the flag can lead to.
  water: ['licence', 'locations', 'obligations', 'hydrograph'],
  notification: ['tarp', 'obligations', 'lineage', 'documents'],
  signoff: ['snapshot', 'submissions', 'validation', 'report', 'audit'],

  // Wave 7: the chain begins at the bore, so the declared architecture says so.
  // Five of these are new edges and every one of them is a hop on the chain —
  // the location and its construction, the session that collected the sample,
  // the custody record, the laboratory receipt and the analytical batch.
  lineage: ['certificate', 'supersession', 'audit', 'crosstab', 'result-detail', 'location', 'field-capture', 'ecoc', 'receipt', 'batches'],
  audit: ['lineage', 'supersession', 'roles'],
  supersession: ['lineage', 'certificate', 'report-figures'],
  documents: ['certificate', 'lineage', 'notification', 'submissions'],

  'project-settings': ['roles', 'criteria', 'facility', 'projects'],
  criteria: ['hardness', 'crosstab', 'background', 'dictionary', 'licence', 'exceedances', 'signoff', 'audit'],
  formats: ['imports', 'dictionary', 'import-review', 'mapping-profiles'],
  'mapping-profiles': ['formats', 'dictionary', 'import-review', 'supersession'],
  dictionary: ['formats', 'criteria', 'import-review', 'units'],
  units: ['dictionary', 'result-detail', 'lineage'],
  roles: ['audit', 'signoff', 'project-settings'],

  instance: ['diagnostics', 'upgrade', 'audit'],
  upgrade: ['instance', 'diagnostics', 'entitlement'],
  diagnostics: ['instance', 'entitlement'],
  entitlement: ['instance', 'upgrade', 'diagnostics'],

  'data-states': ['coverage', 'assistance', 'crosstab'],
  assistance: ['coverage', 'data-states', 'import-review'],
  coverage: ['data-states', 'assistance', 'home'],
};
