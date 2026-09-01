/**
 * The measured half of the build's honesty — a driven browser, because the
 * defects this file exists to catch have never once been findable by reading.
 *
 * `build.mjs` checks what can be checked without layout: the link graph, the
 * section partition, dead hrefs. This checks what needs pixels: at 375, 1000
 * and 1280 px, every screen is activated and measured. Pass 4 is the reason
 * each check exists:
 *
 * - document overflow — eleven screens panned into blank space at 375px and
 *   two at 1280, from four distinct mechanisms (a containing-block escape
 *   inside the product's scroll regions, grid tracks sized by nowrap
 *   sentences, unwrapped record lists, and a flex pseudo-element label that
 *   refused to shrink). None was visible in any element query alone.
 * - duplicate ids, unnamed controls, heading order — the second pass's
 *   defects, kept red-able so they cannot return quietly.
 * - the sticky matrix column — `contain: layout` on the scroll regions is
 *   what fixed the worst overflow, and this asserts it did not cost the one
 *   thing the region exists for.
 * - figure text collisions, coarse-pointer touch targets and stacked-label
 *   legibility — the wave-1 audit's W1-A-4: two of EXPANSION_BRIEF §10's five
 *   check families were run by hand and by nobody afterwards, and the third
 *   is the meter that would have caught W1-A-1 on the day it was written.
 *
 * Run: `npm install` once, then `node verify.mjs`. Set CHROMIUM to a Chromium
 * binary if playwright-core has no browser of its own (e.g.
 * CHROMIUM=/opt/pw-browsers/chromium node verify.mjs). Chromium's CLI
 * --screenshot must NOT be used as a substitute: it shoots before the
 * viewer's script reveals the active screen and reports convincing blanks.
 */

import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const url = 'file://' + resolve(here, 'index.html');
const executablePath = process.env.CHROMIUM;
const browser = await chromium.launch(executablePath ? { executablePath, args: ['--no-sandbox'] } : {});

const failures = [];
const widths = [375, 1000, 1280];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url);
  await page.waitForTimeout(600);
  const ids = await page.evaluate(() => [...document.querySelectorAll('.mk-screen')].map((s) => s.id));

  for (const id of ids) {
    const r = await page.evaluate((sid) => {
      document.querySelectorAll('.mk-screen').forEach((p) => p.setAttribute('data-active', String(p.id === sid)));
      window.scrollTo(0, 0);
      document.body.offsetWidth;
      const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;

      const scope = document.querySelector(`#${CSS.escape(sid)}`);
      const unnamed = [...scope.querySelectorAll('button, a[href], input, select, textarea')]
        .filter((el) => {
          if (el.closest('[hidden]')) return false;
          const name =
            el.getAttribute('aria-label') ||
            el.getAttribute('aria-labelledby') ||
            el.getAttribute('title') ||
            (el.labels && el.labels.length) ||
            el.textContent.trim() ||
            (el.tagName === 'INPUT' && (el.getAttribute('placeholder') || ['submit', 'reset'].includes(el.type)));
          return !name;
        })
        .map((el) => el.tagName + '.' + [...el.classList].join('.'));

      let prev = 0;
      const skips = [];
      for (const h of scope.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
        const level = Number(h.tagName[1]);
        if (prev && level > prev + 1) skips.push(`h${prev}→h${level} “${h.textContent.trim().slice(0, 40)}”`);
        prev = level;
      }
      return { overflow, unnamed: [...new Set(unnamed)], skips };
    }, id);

    if (r.overflow > 1) failures.push(`${width}px #${id}: document overflows by ${r.overflow}px`);
    if (width === widths[0]) {
      for (const u of r.unnamed) failures.push(`#${id}: control with no accessible name: ${u}`);
      for (const s of r.skips) failures.push(`#${id}: heading order skips ${s}`);
    }
  }

  if (width === widths[0]) {
    const dupes = await page.evaluate(() => {
      const seen = new Map();
      document.querySelectorAll('[id]').forEach((e) => seen.set(e.id, (seen.get(e.id) ?? 0) + 1));
      return [...seen].filter(([, n]) => n > 1).map(([k, n]) => `${k}×${n}`);
    });
    for (const d of dupes) failures.push(`duplicate DOM id: ${d}`);
  }

  console.log(`${width}px: ${ids.length} screens measured`);
  await page.close();
}

// The sticky matrix column, functionally: at a width where the crosstab
// cannot fit, its wrap must scroll and the row-identity column must stay put.
// (At a wide viewport the table fits and there is nothing to scroll, which
// is success, not failure — the first run of this check got that wrong.)
{
  const page = await browser.newPage({ viewport: { width: 500, height: 900 } });
  await page.goto(url + '#crosstab');
  await page.waitForTimeout(600);
  const ok = await page.evaluate(() => {
    const wrap = document.querySelector('#crosstab .sf-table-scroll');
    const table = wrap.querySelector('table');
    const mustScroll = table.getBoundingClientRect().width > wrap.getBoundingClientRect().width + 2;
    const th = wrap.querySelector('tbody th');
    const before = th.getBoundingClientRect().left;
    wrap.scrollLeft = 200;
    const after = th.getBoundingClientRect().left;
    return { mustScroll, scrolled: wrap.scrollLeft > 0, held: Math.abs(after - before) < 2 };
  });
  if (ok.mustScroll && !ok.scrolled) failures.push('crosstab matrix wrap does not scroll — containment broke panning');
  if (ok.mustScroll && !ok.held) failures.push('crosstab sticky identity column no longer sticks');
  if (!ok.mustScroll) failures.push('crosstab matrix fits a 500px viewport — the check is measuring the wrong thing');
  await page.close();
}

/*
 * §10's figure layout check: lay out every generated figure and compare every
 * `<text>` box against every other.
 *
 * Scoped to `svg.mk-fig, svg.sf-map`, which is every figure `figures.mjs`
 * emits — not to `mk-fig` alone. The class was the scope in §10's wording, in
 * pass 3's check and in the auditor's own first run, and the one figure
 * outside it was the one with the collision: the site map's legend printed
 * "compliant" through the tail of "indeterminate — LOR above criterion"
 * (W1-A-6). A check whose scope is a class name only measures the figures
 * somebody remembered to name.
 *
 * 1px of tolerance: adjacent boxes share a rounded edge, and glyph boxes carry
 * side bearings that touch without a mark ever touching.
 */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(url);
  await page.waitForTimeout(600);
  const ids = await page.evaluate(() => [...document.querySelectorAll('.mk-screen')].map((s) => s.id));
  let figures = 0;
  let nodes = 0;
  for (const id of ids) {
    const r = await page.evaluate((sid) => {
      document.querySelectorAll('.mk-screen').forEach((p) => p.setAttribute('data-active', String(p.id === sid)));
      const scope = `#${CSS.escape(sid)}`;
      const collisions = [];
      let figs = 0;
      let texts = 0;
      for (const svg of document.querySelectorAll(`${scope} svg.mk-fig, ${scope} svg.sf-map`)) {
        figs++;
        const boxes = [...svg.querySelectorAll('text')]
          .map((t) => ({ text: t.textContent, box: t.getBoundingClientRect() }))
          .filter((n) => n.box.width > 0 && n.box.height > 0);
        texts += boxes.length;
        const name = svg.querySelector('title')?.textContent ?? svg.getAttribute('class');
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i].box, b = boxes[j].box;
            const over = Math.min(
              Math.min(a.right, b.right) - Math.max(a.left, b.left),
              Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top),
            );
            if (over > 1) {
              collisions.push(
                `“${boxes[i].text.slice(0, 44)}” and “${boxes[j].text.slice(0, 44)}” overlap by ${over.toFixed(1)}px in “${name}”`,
              );
            }
          }
        }
      }
      return { collisions, figs, texts };
    }, id);
    figures += r.figs;
    nodes += r.texts;
    for (const c of r.collisions) failures.push(`1280px #${id}: figure text collision — ${c}`);
  }
  console.log(`figures: ${figures} drawn, ${nodes} text nodes compared pairwise at 1280px`);
  await page.close();
}

/*
 * §10's touch-target check, by hit-testing under an emulated coarse pointer.
 *
 * `hasTouch: true` on the context is what makes `(pointer: coarse)` match —
 * the media query, not `navigator.maxTouchPoints`, is what the rules in
 * chrome.mjs are written against, so a run where it does not match measures
 * the desktop stylesheet and reports a green that means nothing. It is
 * asserted rather than assumed, below.
 *
 * The measure is the *hit* area and not the box: `.mk-why__btn` keeps a 15px
 * glyph on purpose — growing it would push apart the sentence it sits in —
 * and gains its 45px target from an inset `::after`, which no element query
 * can see. So a control whose own box (or whose enclosing check/radio/switch
 * label, since tapping the label activates the control) is short enough to
 * matter is probed with `elementFromPoint` up and down its centre line, and
 * what counts is the run of points that actually reach it.
 *
 * Inline text links are exempt and that is WCAG 2.5.5's own exception, not a
 * local convenience: `a.mk-ref` and `.mk-linkbtn` sit in flowing prose, where
 * a 44px target either breaks the line box or spaces the paragraph to nothing.
 * chrome.mjs floors the ones that are navigation rather than sentences.
 *
 * **Both axes, and the bar is 44** (W1-A-10). The hit walk used to run up and
 * down the centre line only, so a control 44px tall and 18px wide passed — and
 * the pass bar was 43, one pixel under the number the summary line claimed.
 * The run is a count of integer sample points that reach the target, so a run
 * of 44 is a target at least 43px across and at most 45; the bar is set at the
 * number in the rule rather than a pixel under it, and the two axes are
 * reported separately so a failure says which way the target is thin.
 *
 * **The viewer's own chrome is measured too**, and that is a change from the
 * wave-1 exclusion. The top bar and the section strip are drawn as the
 * *product's* architecture — the mockup's README says so — so excluding them
 * meant excluding product surfaces on the grounds of where the check happened
 * to be pointed, which is W1-A-6's lesson exactly. The rail is the catalogue's
 * own furniture and is measured anyway: it is the only navigation this document
 * has on a phone, and a filter box nobody can tap is a defect whoever owns it.
 * What is still out of scope is what is display:none at rest — the palette and
 * the lineage panel — because a hit test on a hidden element measures nothing
 * rather than measuring zero.
 */
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true });
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForTimeout(600);
  const coarse = await page.evaluate(() => window.matchMedia('(pointer: coarse)').matches);
  if (!coarse) failures.push('touch targets: (pointer: coarse) does not match — the check would measure the desktop stylesheet');
  const ids = await page.evaluate(() => [...document.querySelectorAll('.mk-screen')].map((s) => s.id));

  /**
   * One measurement pass over one set of scopes. Runs in the page.
   *
   * `pin` exists because the single-column layout stacks a 100vh sticky rail
   * above a sticky page header, and each covers the other depending on where
   * the document is scrolled: measured at scrollY 2331 every rail control
   * reported a 0×0 hit area, because the header was painted over it. So the
   * rail is measured at the top of the document and the header from inside the
   * canvas, and each element's own `scrollIntoView` is undone by re-pinning
   * before the hit test. A 0×0 result now means unreachable rather than
   * unlucky, and it fails.
   */
  const probe = ({ scopes, sid, pin = null }) => {
    if (sid) document.querySelectorAll('.mk-screen').forEach((p) => p.setAttribute('data-active', String(p.id === sid)));
    if (pin !== null) window.scrollTo(0, pin);
    const parts = ['button', 'select', 'textarea', 'input:not([type=hidden])', 'label.mk-check', 'label.mk-radio', 'label.mk-switch'];
    const selector = scopes.flatMap((sc) => parts.map((p) => `${sc} ${p}`)).join(', ');
    const small = [];
    let seen = 0;
    for (const el of document.querySelectorAll(selector)) {
      if (el.closest('[hidden]')) continue;
      if (el.matches('a.mk-ref, .mk-linkbtn') || el.closest('.mk-linkbtn')) continue;
      const own = el.getBoundingClientRect();
      if (own.width === 0 && own.height === 0) continue;
      seen++;
      // Tapping the label activates the control, so the label is the target.
      const label = el.closest('label.mk-check, label.mk-radio, label.mk-switch');
      const lab = label ? label.getBoundingClientRect() : null;
      const box = { w: Math.max(own.width, lab ? lab.width : 0), h: Math.max(own.height, lab ? lab.height : 0) };
      if (box.w >= 44 && box.h >= 44) continue;
      // Only now is a hit test worth its cost. The box can be smaller than the
      // target — `.mk-why__btn` keeps a 15px glyph and gains 45px from an inset
      // `::after` that no element query can see.
      const target = label ?? el;
      target.scrollIntoView({ block: 'center' });
      if (pin !== null) window.scrollTo(0, pin);
      const rect = target.getBoundingClientRect();
      const cx = Math.round(rect.left + rect.width / 2);
      const cy = Math.round(rect.top + rect.height / 2);
      // The target itself, or something inside it — never an ancestor.
      // Counting an ancestor as a hit makes every target as tall as the
      // panel behind it, and the check passes with the floors deleted.
      const reaches = (x, y) => {
        const hit = document.elementFromPoint(x, y);
        return hit === target || target.contains(hit);
      };
      const run = (axis) => {
        if (!reaches(cx, cy)) return 0;
        const at = (n) => (axis === 'y' ? reaches(cx, cy + n) : reaches(cx + n, cy));
        const origin = axis === 'y' ? cy : cx;
        const limit = (axis === 'y' ? window.innerHeight : window.innerWidth) - 1 - origin;
        let lo = 0;
        let hi = 0;
        while (lo - 1 >= -origin && at(lo - 1)) lo -= 1;
        while (hi + 1 <= limit && at(hi + 1)) hi += 1;
        return hi - lo + 1;
      };
      const down = run('y');
      const across = run('x');
      if (down < 44 || across < 44) {
        const name = (el.textContent || el.value || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 30);
        small.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} “${name}” — ${across}×${down}px hit area`);
      }
    }
    return { small, seen };
  };

  let measured = 0;
  if (coarse) {
    for (const id of ids) {
      const r = await page.evaluate(probe, { scopes: [`#${id}`], sid: id });
      measured += r.seen;
      for (const s of new Set(r.small)) failures.push(`#${id}: coarse-pointer target under 44px: ${s}`);
    }
    // The chrome is drawn once and does not change with the active screen, so
    // it is measured once rather than 67 times — but in two passes, because
    // the rail and the header are only reachable at different scroll positions
    // in the single-column layout.
    for (const [scope, pin] of [['.mk-rail', 0], ['.mk-chrome-head', 1200]]) {
      const chrome = await page.evaluate(probe, { scopes: [scope], sid: null, pin });
      measured += chrome.seen;
      for (const s of new Set(chrome.small)) failures.push(`viewer chrome ${scope}: coarse-pointer target under 44px: ${s}`);
    }
    console.log(`touch: ${measured} controls hit-tested at 375px under (pointer: coarse), both axes, floor 44px`);
  }
  await context.close();
}

/*
 * The meter W1-A-1 was missing: a stacked cell's label may not be squeezed
 * narrower than the text inside it.
 *
 * On a phone a record row becomes a block and each cell's `data-label` is
 * drawn by a `::before` beside the value. Wave 1 let that box shrink with
 * `min-width: 0`, and 85 labels across ~30 screens then printed *through*
 * their values — "Consequ**Cadm**ence" — while every meter stayed green,
 * because glyphs spilling out of a shrunk box extend neither `td.scrollWidth`
 * nor the document's.
 *
 * The floor is the label's min-content width, which is the widest run of it
 * that cannot be broken — measured, not counted, because CSS breaks at more
 * places than a space: "Re-run by" may break after its hyphen, so its floor is
 * "run" and not "Re-run". Splitting on whitespace instead reported the three
 * `#coverage` cells that wrap to three lines as defects while they were
 * rendering correctly. What the box may never be is narrower than a run the
 * browser cannot break, because that is the case where the glyphs leave it.
 */
{
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  await page.goto(url);
  await page.waitForTimeout(600);
  const ids = await page.evaluate(() => [...document.querySelectorAll('.mk-screen')].map((s) => s.id));
  let cells = 0;
  for (const id of ids) {
    const r = await page.evaluate((sid) => {
      document.querySelectorAll('.mk-screen').forEach((p) => p.setAttribute('data-active', String(p.id === sid)));
      const ruler = document.createElement('span');
      // min-content on the ruler is the whole measurement: it reports the
      // widest unbreakable run under this exact font, hyphens and all.
      ruler.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;width:min-content';
      const floors = new Map();
      const tight = [];
      let stacked = 0;
      for (const td of document.querySelectorAll(`#${CSS.escape(sid)} .sf-table--records tbody td[data-label]`)) {
        if (getComputedStyle(td).display !== 'flex') continue; // not stacked at this width
        stacked++;
        const before = getComputedStyle(td, '::before');
        const label = td.getAttribute('data-label');
        const font = `${before.fontStyle} ${before.fontWeight} ${before.fontSize}/${before.lineHeight} ${before.fontFamily}`;
        const key = `${font}|${before.letterSpacing}|${before.textTransform}|${label}`;
        if (!floors.has(key)) {
          ruler.style.font = font;
          ruler.style.letterSpacing = before.letterSpacing;
          ruler.style.textTransform = before.textTransform;
          ruler.textContent = label;
          td.appendChild(ruler);
          floors.set(key, ruler.getBoundingClientRect().width);
          ruler.remove();
        }
        const floor = floors.get(key);
        const used = parseFloat(before.width);
        if (used + 2 < floor) {
          tight.push(`“${label}” drawn in ${used.toFixed(1)}px, needs ${floor.toFixed(1)}px — the label prints over its value`);
        }
      }
      return { tight, stacked };
    }, id);
    cells += r.stacked;
    for (const t of new Set(r.tight)) failures.push(`375px #${id}: stacked label squeezed below its text: ${t}`);
  }
  console.log(`stacked labels: ${cells} labelled cells measured against their own min-content at 375px`);
  await page.close();
}

/*
 * A caption inside a panning region, measured against the region rather than
 * against the table.
 *
 * A `<caption>` lays out at the *table's* width, and inside a scroll region
 * that width is routinely two or three times what a reader can see — so the
 * sentence is cut at the visible edge and the rest of it is only reachable by
 * scrolling the table sideways. Wave 3 measured 7 clipped at 1280px, 44 at
 * 1000 and 41 at 375, the worst by 2397px.
 *
 * No existing check could see it. The document does not overflow — the region
 * pans, which is what it is for — and every element query says the caption is
 * exactly as wide as its table, which is true and is the defect. The meter is
 * the caption's own box against the region's client width, at all three
 * widths, because the ratio is worst where the region is narrowest.
 */
{
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url);
    const ids = await page.evaluate(() => [...document.querySelectorAll('.mk-screen')].map((n) => n.id));
    let seen = 0;
    for (const id of ids) {
      await page.evaluate((i) => (window.location.hash = '#' + i), id);
      await page.waitForTimeout(15);
      const r = await page.evaluate((i) => {
        const wide = [];
        let n = 0;
        for (const reg of document.querySelectorAll(`#${i} .sf-table-scroll`)) {
          const cap = reg.querySelector('caption');
          if (!cap) continue;
          n += 1;
          const over = Math.round(cap.getBoundingClientRect().width - reg.clientWidth);
          if (over > 2) wide.push(`+${over}px — “${cap.innerText.trim().slice(0, 60)}…”`);
        }
        return { wide, n };
      }, id);
      seen += r.n;
      for (const w of r.wide) failures.push(`${width}px #${id}: caption wider than the region it captions: ${w}`);
    }
    console.log(`captions: ${seen} in panning regions measured against their region at ${width}px`);
    await page.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(
  'verify: no document overflow at any width, no duplicate ids, no unnamed controls, no heading skips, ' +
    'matrix panning intact, no figure text collisions, every coarse-pointer target ≥44px, no stacked label ' +
    'squeezed below its own text, no caption wider than the region it captions',
);
