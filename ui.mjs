/**
 * The markup vocabulary, shared by every screen.
 *
 * These helpers emit the `sf-` classes that `apps/web/app/styles/app.css`
 * already implements, so the mockup is styled by the product's own stylesheet
 * rather than by a parallel one written to look similar. `build.mjs` inlines
 * that file verbatim; nothing here restates a colour, a size or a spacing.
 *
 * The mark geometry below is copied from
 * `design/reference/screens/results-crosstab.html`, which was approved on
 * 18 August. One deliberate difference: the hatch pattern is declared once in a
 * document-level sprite instead of re-declared inside every indeterminate mark.
 * The reference repeats the `<defs>` per mark, which is correct in isolation and
 * would mean ~200 duplicate element ids in a document holding every screen at
 * once. Same rendering, valid document.
 */

export const HATCH_ID = 'sf-hatch-indeterminate';

/** Declared once, near the top of the document, and referenced by every mark. */
export const HATCH_SPRITE = `<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute"><defs><pattern id="${HATCH_ID}" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="1.4" height="3" fill="#12161a"></rect></pattern></defs></svg>`;

/**
 * What each outcome means, in words.
 *
 * These strings are the accessible name of every mark, and the indeterminate one
 * carries the clause that matters most in the whole product: **this is not a
 * pass**. A reporting limit above the criterion means nothing was measured
 * either way, and a practitioner who reads that as compliance has signed off on
 * a claim nobody made.
 */
export const OUTCOME_TEXT = {
  compliant: 'assessed against this criterion and below it',
  exceedance: 'assessed against this criterion and above it',
  indeterminate:
    'could not be assessed — the reporting limit sits above the criterion, and this is not a pass',
  not_evaluated: 'no criterion was selectable, so nothing is asserted',
};

export const OUTCOME_LABEL = {
  compliant: 'compliant',
  exceedance: 'exceedance',
  indeterminate: 'indeterminate',
  not_evaluated: 'not evaluated',
};

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * One criterion's outcome, as a shape sized to sit on a text baseline.
 *
 * Shape rather than colour is the decision (tokens.json): the mark has to
 * survive a photocopier, a monochrome print and a colour-blind reader, because a
 * regulatory submission goes through all three. Colour is the redundant channel
 * here, never the carrying one.
 */
export function mark(outcome, criterionName) {
  const text = `${criterionName}: ${OUTCOME_TEXT[outcome]}`;
  const open = `<svg class="sf-mark" width="13" height="15" viewBox="0 0 13 15" role="img" aria-label="${esc(text)}"><title>${esc(text)}</title>`;
  const body = {
    compliant: '<rect x="1.5" y="2.5" width="10" height="10" fill="none" stroke="#6b7885" stroke-width="1"></rect>',
    exceedance:
      '<rect x="1.5" y="2.5" width="10" height="10" fill="#b3300c"></rect><path d="M3.9 8.9 6.5 5.6l2.6 3.3" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="square"></path>',
    indeterminate: `<rect x="1.5" y="2.5" width="10" height="10" fill="url(#${HATCH_ID})" stroke="#12161a" stroke-width="1"></rect>`,
    not_evaluated:
      '<rect x="2.5" y="3.5" width="8" height="8" fill="none" stroke="#7d8b98" stroke-width="1" stroke-dasharray="2 1.6"></rect>',
  }[outcome];
  return `${open}${body}</svg>`;
}

/**
 * One result, with everything true about it at once.
 *
 * The order of the spans is the reading order: what it was before it was
 * superseded, then the value, then one mark per criteria set. Everything the
 * marks say is also said in the visually-hidden sentence, because a screen
 * reader given four unnamed shapes has been given nothing.
 */
export function resultValue(cell, criteria) {
  const classes = ['sf-result'];
  if (cell.o.includes('exceedance')) classes.push('sf-result--exceedance');
  if (cell.censored) classes.push('sf-result--censored');
  if (cell.quarantined) classes.push('sf-result--quarantined');

  const spoken = [
    cell.v,
    cell.superseded ? `superseding ${cell.superseded}` : null,
    cell.quarantined ? `quarantined — ${cell.quarantined}` : null,
    cell.derived ? 'derived value' : null,
    ...cell.o.map((outcome, i) => `${criteria[i].name}: ${OUTCOME_TEXT[outcome]}`),
  ]
    .filter(Boolean)
    .join(' · ');

  const before = cell.superseded
    ? `<span class="sf-result__superseded" aria-hidden="true">${esc(cell.superseded)}</span><span class="sf-result__arrow" aria-hidden="true">→</span>`
    : '';
  const open = cell.quarantined ? '<span class="sf-result__bracket" aria-hidden="true">[</span>' : '';
  const close = cell.quarantined ? '<span class="sf-result__bracket" aria-hidden="true">]</span>' : '';
  const marks = cell.o.map((outcome, i) => mark(outcome, criteria[i].name)).join('');

  return (
    `<span class="${classes.join(' ')}">` +
    `<span class="sf-visually-hidden">${esc(spoken)}</span>` +
    `${before}${open}<span class="sf-result__value" aria-hidden="true">${esc(cell.v)}</span>${close}` +
    `<span class="sf-result__marks" aria-hidden="true">${marks}</span>` +
    '</span>'
  );
}

/** The outcome key, beside the table that uses it. */
export function outcomeLegend() {
  const items = ['exceedance', 'indeterminate', 'compliant', 'not_evaluated']
    .map(
      (outcome) =>
        `<li class="sf-legend__item">${mark(outcome, 'Key')}<span>${OUTCOME_LABEL[outcome]}</span></li>`,
    )
    .join('');
  return `<ul class="sf-legend sf-stack-sm">${items}</ul>`;
}

/** Which criteria set each mark position belongs to. Order is fixed and stated. */
export function criteriaLegend(criteria) {
  const items = criteria
    .map(
      (c, i) =>
        `<li class="sf-legend__item"><span class="sf-legend__key">${esc(c.key)}</span><span>${esc(c.name)} — ${i === 0 ? 'first' : 'second'} mark</span></li>`,
    )
    .join('');
  return `<ul class="sf-legend">${items}</ul>`;
}

/**
 * A table.
 *
 * `records` reflows to labelled blocks on a phone and `matrix` pans with a
 * frozen identifying column — both already in the stylesheet, so a table only
 * has to say which kind it is. Every cell carries `data-label` so the reflow has
 * a header to show without duplicating one into the markup.
 */
export function table({ caption, head, rows, kind = 'records', label, scroll = false }) {
  const thead = `<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>`;
  const tbody = rows
    .map((row) => {
      const cells = row.map((cell, i) =>
        i === 0
          ? `<th scope="row">${cell}</th>`
          : `<td data-label="${esc(stripTags(head[i] ?? ''))}">${cell}</td>`,
      );
      return `<tr>${cells.join('')}</tr>`;
    })
    .join('');
  const inner =
    `<table class="sf-table sf-table--${kind}">` +
    (caption ? `<caption class="sf-table__caption">${caption}</caption>` : '') +
    `${thead}<tbody>${tbody}</tbody></table>`;
  /*
   * A matrix always pans. A record list stacks on a phone (app.css, ≤767px)
   * and normally needs nothing else — but pass 4 measured five record lists
   * whose natural width exceeds their column on a desktop, and a table that
   * silently widens the document is worse than one that pans. `scroll: true`
   * gives such a list the same focusable region a matrix gets; when stacked
   * on a phone the wrapper has nothing to scroll and costs nothing.
   */
  return kind === 'matrix' || scroll
    ? `<div class="sf-table-scroll" role="region" aria-label="${esc(label ?? caption ?? 'Table')}" tabindex="0">${inner}</div>`
    : inner;
}

function stripTags(value) {
  return String(value).replace(/<[^>]*>/g, '');
}

/**
 * A panel heading is `h2`, not `h3`.
 *
 * It was `h3`, and on any screen whose title was followed straight by a panel
 * the outline ran h1 → h3 — a skipped level, on eight screens. A panel is a
 * top-level block under the page title, so h2 is also the truthful level;
 * where a screen groups panels under its own `mk-h2`, the two sit as peers,
 * which is a flat outline rather than a broken one.
 */
export function panel(heading, body) {
  return `<section class="sf-panel"><h2 class="sf-panel__heading">${heading}</h2>${body}</section>`;
}

export function notice(level, headline, detail) {
  return (
    `<div class="sf-notice${level === 'warning' ? ' sf-notice--warning' : ''}">` +
    `<p class="sf-notice__headline">${headline}</p>` +
    (detail ? `<p class="sf-notice__detail">${detail}</p>` : '') +
    '</div>'
  );
}

/** A definition list of facts — the shape used for record headers throughout. */
export function facts(pairs) {
  const body = pairs
    .map(([term, value]) => `<div><dt>${esc(term)}</dt><dd>${value}</dd></div>`)
    .join('');
  return `<dl class="sf-facts sf-facts--grid">${body}</dl>`;
}

/** A state word, rendered as a token rather than as loose text. */
export function tag(text, tone = 'neutral') {
  return `<span class="mk-tag mk-tag--${tone}">${esc(text)}</span>`;
}

export function toneFor(state) {
  const s = String(state).toLowerCase();
  if (['fail', 'overdue', 'exceedance', 'active', 'open', 'at risk', 'reversed'].includes(s)) return 'bad';
  if (['warn', 'in review', 'at risk', 'indeterminate', 'draft', 'in progress'].includes(s)) return 'warn';
  if (['pass', 'committed', 'met', 'on track', 'ok', 'complete', 'cleared', 'compliant'].includes(s)) return 'good';
  return 'neutral';
}

/** A figure with its caption, numbered as it would be in the report. */
export function figure(number, title, svg, caption) {
  return (
    `<figure class="sf-figure">${svg}` +
    `<figcaption class="sf-figure__caption"><strong>Figure ${number}.</strong> ${title}${caption ? ` — ${caption}` : ''}</figcaption>` +
    '</figure>'
  );
}

/**
 * A cross-screen link.
 *
 * The rule these follow is worth stating, because the wrong version of it is the
 * obvious one: **a code is a link where it identifies the row's subject, not
 * wherever it is mentioned.** MW05 appears on twenty-five of the thirty-seven
 * screens here. Linking every occurrence produces a page of blue noise and
 * teaches a reader to stop seeing links at all; linking the subject makes the
 * register behave the way a practitioner already expects a register to behave.
 */
export function ref(target, text) {
  return `<a class="mk-ref" href="#${target}">${esc(text)}</a>`;
}

/** A monitoring location, as the thing you can open. */
export function loc(code) {
  return `<a class="mk-ref mk-ref--loc" href="#location">${esc(code)}</a>`;
}
