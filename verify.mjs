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

await browser.close();

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log('verify: no document overflow at any width, no duplicate ids, no unnamed controls, no heading skips, matrix panning intact');
