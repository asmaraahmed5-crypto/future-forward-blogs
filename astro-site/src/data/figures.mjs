// Original, license-free illustrations for the "create a website for free" guide.
// Drawn from scratch as inline SVG/HTML (no stock images, no third-party logos), so there is nothing to license.
// Each figure is keyed by the heading id it appears under.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let n = 0;
// wrap an SVG scene in an accessible, animated, interactive figure
const fig = (label, caption, inner, hint = '') =>
  `<figure class="fig" data-fig><svg viewBox="0 0 640 250" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${inner}</svg><figcaption>${esc(caption)}${hint ? ` <span class="hint">${esc(hint)}</span>` : ''}</figcaption></figure>`;

const rv = (i, inner) => `<g class="rv" style="--i:${i}">${inner}</g>`;
const T = (x, y, s, cls = 't', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(s)}</text>`;
const R = (x, y, w, h, cls = 's', r = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(r, 7)}" class="${cls}"/>`;
const lines = (x, y, w, k, gap = 12, cls = 'm') => Array.from({ length: k }, (_, i) => R(x, y + i * gap, i === k - 1 ? w * 0.6 : w, 5, cls, 3)).join('');
const browser = (x, y, w, h, body, url = '') =>
  `${R(x, y, w, h, 'w a', 10)}<line x1="${x}" y1="${y + 22}" x2="${x + w}" y2="${y + 22}" class="a"/>` +
  [0, 1, 2].map((i) => `<circle cx="${x + 13 + i * 12}" cy="${y + 11}" r="3" class="k"/>`).join('') +
  (url ? `${R(x + 52, y + 5, w - 66, 12, 's', 6)}${T(x + 60, y + 14, url, 'tm xs', 'start')}` : '') + body;
const chip = (x, y, w, label, i = 0, extra = '') => rv(i, `<g class="chip" tabindex="0" ${extra}>${R(x, y, w, 30, 'w a', 15)}${T(x + w / 2, y + 20, label, 't sm')}</g>`);
const phone = (x, y, w, h, body) => `${R(x, y, w, h, 'w a', 14)}${R(x + w / 2 - 14, y + 6, 28, 4, 'k', 2)}${body}`;

// ------- scenes -------
const goal = () => fig('Target with an arrow and three possible visitor actions',
  'Pick one action for visitors, then build around it.',
  rv(0, `<circle cx="150" cy="125" r="88" class="s a"/><circle cx="150" cy="125" r="58" class="w a"/><circle cx="150" cy="125" r="28" class="accent2"/><path d="M150 125 L250 45" class="a thick"/><path d="M232 44 h20 v20" class="a thick" fill="none"/>`) +
  T(150, 238, 'One main action', 'tm sm') +
  chip(330, 52, 250, 'View my work', 1) + chip(330, 100, 250, 'Read my articles', 2) + chip(330, 148, 250, 'Ask about a service', 3), 'Hover or tap an option.');

const words = () => fig('A written page, a photo and contact details laid out as three cards',
  'Gather words, images and contact details before you open a builder.',
  rv(0, `${R(40, 30, 170, 190, 'w a', 12)}${R(58, 50, 90, 10, 'k', 4)}${lines(58, 80, 130, 5, 16)}${T(125, 238, 'Short explanation', 'tm sm')}`) +
  rv(1, `${R(235, 30, 170, 190, 'w a', 12)}${R(253, 48, 134, 92, 's', 8)}<path d="M253 140 l36-40 28 28 20-18 50 30z" class="m"/><circle cx="360" cy="72" r="9" class="accent2"/><circle cx="288" cy="178" r="16" class="k"/>${R(314, 170, 70, 8, 'm', 4)}${R(314, 186, 50, 8, 'm', 4)}${T(320, 238, 'Logo and photos', 'tm sm')}`) +
  rv(2, `${R(430, 30, 170, 190, 'w a', 12)}<circle cx="515" cy="92" r="32" class="accent2t a"/>${T(515, 101, '@', 'big')}${R(462, 142, 106, 8, 'm', 4)}${R(472, 160, 86, 8, 'm', 4)}${R(482, 178, 66, 8, 'm', 4)}${T(515, 238, 'Contact details', 'tm sm')}`));

const reqs = () => fig('Two columns: needed now and can wait',
  'Separate what the first version needs from what can wait.',
  T(165, 34, 'Needed now', 'tb') + T(475, 34, 'Can wait', 'tb') +
  `<line x1="320" y1="46" x2="320" y2="226" class="a dash"/>` +
  chip(60, 56, 210, 'Contact method', 0) + chip(60, 102, 210, 'Clear homepage', 1) + chip(60, 148, 210, 'Works on a phone', 2) +
  chip(370, 56, 210, 'Booking calendar', 3, 'data-later') + chip(370, 102, 210, 'Animated intro', 4, 'data-later') + chip(370, 148, 210, 'Newsletter pop-up', 5, 'data-later'));

const options = () => {
  const tiles = ['Wix', 'WordPress.com', 'Google Sites', 'GitHub Pages'];
  return fig('Four website options shown as selectable tiles',
    'Four candidates to evaluate. None is a ranking.',
    tiles.map((t, i) => rv(i, `<g class="tile" tabindex="0" role="button" aria-pressed="false" data-select>${R(30 + i * 148, 50, 130, 120, 'w a', 14)}${R(46 + i * 148, 66, 98, 42, 's', 8)}${R(46 + i * 148, 70, 60, 6, 'm', 3)}${R(46 + i * 148, 82, 80, 6, 'm', 3)}${T(95 + i * 148, 142, t, 't sm')}<circle cx="${135 + i * 148}" cy="70" r="0" class="k tick"/></g>`)).join('') +
    T(320, 214, 'Select the ones worth a real test', 'tm sm'), 'Click a tile to shortlist it.');
};

const compare = () => fig('The same sample homepage built in two tools and checked on a phone',
  'Build the same sample page in each tool and judge the result.',
  rv(0, browser(30, 40, 210, 170, `${R(46, 74, 120, 12, 'k', 4)}${R(46, 98, 178, 54, 's', 6)}${lines(46, 164, 170, 2, 12)}${R(46, 186, 60, 14, 'k', 7)}`)) + T(135, 232, 'Tool A', 'tm sm') +
  rv(1, browser(265, 40, 210, 170, `${R(281, 74, 120, 12, 'k', 4)}${R(281, 98, 178, 54, 's', 6)}${lines(281, 164, 170, 2, 12)}${R(281, 186, 60, 14, 'k', 7)}`)) + T(370, 232, 'Tool B', 'tm sm') +
  rv(2, phone(510, 30, 100, 190, `${R(524, 56, 72, 8, 'k', 3)}${R(524, 74, 72, 40, 's', 5)}${lines(524, 126, 70, 3, 10)}${R(524, 168, 44, 12, 'k', 6)}`)) + T(560, 238, 'On a phone', 'tm sm'));

const trial = () => fig('A free plan with no end date compared with a trial that ends and starts billing',
  'A free plan has no end date. A trial does, so read the billing terms.',
  T(40, 72, 'Free plan', 'tb', 'start') + rv(0, `${R(40, 84, 560, 22, 's a', 11)}${T(320, 100, 'keeps running, no end date', 't sm')}`) +
  T(40, 156, 'Trial', 'tb', 'start') + rv(1, `${R(40, 168, 330, 22, 'k', 11)}${T(205, 183, 'trial period', 'wt sm')}<g class="chip" tabindex="0">${R(386, 160, 200, 38, 'w a', 8)}${T(486, 184, 'then billing may start', 't sm')}</g><line x1="376" y1="150" x2="376" y2="208" class="a dash"/>`));

const overview = () => fig('A ten stop path from choosing a platform to publishing',
  'Ten steps from a platform choice to a live site.',
  `<path d="M50 125 H590" class="a dash"/>` +
  Array.from({ length: 10 }, (_, i) => rv(i, `<g class="stop" tabindex="0"><circle cx="${50 + i * 60}" cy="125" r="16" class="${i === 9 ? 'k' : 'w a'}"/>${T(50 + i * 60, 130, String(i + 1), i === 9 ? 'wt sm' : 't sm')}</g>`)).join('') +
  T(50, 175, 'Choose', 'tm xs') + T(320, 175, 'Build', 'tm xs') + T(590, 175, 'Publish', 'tm xs'), 'Hover a stop.');

const choose = () => fig('Several options narrowing down to one choice',
  'Eliminate options that cannot do the main job, then pick one.',
  [0, 1, 2, 3].map((i) => rv(i, `<circle cx="${90 + (i % 2) * 70}" cy="${80 + Math.floor(i / 2) * 80}" r="26" class="w a"/>`)).join('') +
  `<path d="M200 80 L320 125 M200 160 L320 125" class="a"/><path d="M320 125 H430" class="a thick"/><path d="M416 112 l16 13 -16 13" class="a thick" fill="none"/>` +
  rv(4, `<circle cx="520" cy="125" r="50" class="k"/>${T(520, 131, 'Your pick', 'wt sm')}`));

const account = () => fig('A shield with a check mark, a recovery email and two step verification',
  'Use an email you control and switch on the account protection on offer.',
  rv(0, `<path d="M180 40 L260 62 V130 C260 176 224 204 180 220 C136 204 100 176 100 130 V62Z" class="s a"/><path d="M144 132 l28 28 52-56" class="a thick" fill="none"/>`) +
  chip(330, 66, 260, 'Email you control', 1) + chip(330, 112, 260, 'Two step verification', 2) + chip(330, 158, 260, 'Recovery options', 3));

const template = () => fig('Three template thumbnails with the middle one selected',
  'Choose the layout that already fits your content.',
  [0, 1, 2].map((i) => rv(i, `<g class="tile ${i === 1 ? 'sel' : ''}" tabindex="0" role="button" aria-pressed="${i === 1}" data-select>${R(40 + i * 200, 34, 170, 160, 'w a', 12)}${i === 0 ? `${R(54, 50, 142, 56, 's', 6)}${lines(54, 120, 140, 3)}` : i === 1 ? `${R(254, 50, 64, 56, 's', 6)}${R(328, 50, 68, 56, 's', 6)}${lines(254, 120, 140, 3)}` : `${R(454, 50, 142, 14, 'k', 4)}${lines(454, 78, 140, 6, 12)}`}`+ `</g>`)).join('') +
  T(125, 224, 'Hero first', 'tm sm') + T(325, 224, 'Content and image', 'tm sm') + T(525, 224, 'Article led', 'tm sm'), 'Click a layout.');

const homepage = () => fig('A homepage with a clear headline, a description, a button and an image',
  'The first screen says what you offer and what to do next.',
  rv(0, browser(70, 24, 500, 200,
    `${R(100, 62, 190, 14, 'k', 5)}${R(100, 84, 150, 14, 'k', 5)}${lines(100, 112, 190, 3)}<g class="btn" tabindex="0">${R(100, 160, 100, 30, 'k', 15)}${T(150, 180, 'Get in touch', 'wt xs')}</g>${R(340, 62, 200, 128, 's', 10)}<path d="M340 190 l60-60 40 36 30-24 70 48z" class="m"/><circle cx="480" cy="92" r="11" class="accent2"/>`, 'yourname.example.com')));

const pages = () => fig('Four supporting pages: Home, Work, About and Contact',
  'Four small pages cover most first sites.',
  `<path d="M100 125 H540" class="a dash"/>` +
  ['Home', 'Work', 'About', 'Contact'].map((p, i) => rv(i, `<g class="tile" tabindex="0">${R(30 + i * 148, 50, 124, 150, 'w a', 12)}${R(44 + i * 148, 64, 96, 10, 'k', 4)}${R(44 + i * 148, 84, 96, 46, 's', 6)}${lines(44 + i * 148, 142, 96, 3, 11)}${T(92 + i * 148, 190, p, 't sm')}</g>`)).join(''));

const nav = () => fig('A navigation bar linking to Services, About and Contact',
  'Plain labels beat clever ones.',
  rv(0, browser(70, 30, 500, 130, `${R(88, 52, 70, 12, 'k', 4)}${['Services', 'About', 'Contact'].map((l, i) => `<g class="navlink" tabindex="0">${T(340 + i * 76, 62, l, 't sm')}<line x1="${312 + i * 76}" y1="70" x2="${368 + i * 76}" y2="70" class="a ul"/></g>`).join('')}${R(88, 96, 240, 50, 's', 8)}${lines(344, 100, 200, 4, 12)}`)) +
  chip(90, 186, 130, 'Services', 1) + chip(255, 186, 130, 'About', 2) + chip(420, 186, 130, 'Contact', 3), 'Hover a link.');

const titles = () => fig('A search result showing a page title, address and description',
  'Each page needs its own title, summary and address.',
  rv(0, `${R(60, 36, 520, 150, 'w a', 12)}<circle cx="90" cy="68" r="10" class="k"/>${T(110, 64, 'yourname.example.com', 'tm xs', 'start')}${T(110, 78, '› services › photography', 'tm xs', 'start')}${R(80, 98, 300, 14, 'k', 5)}${lines(80, 128, 460, 3, 14)}`) +
  rv(1, `${T(420, 214, 'Title', 'tb sm')}${T(320, 214, 'Address', 'tb sm')}${T(520, 214, 'Description', 'tb sm')}`));

const mobile = () => fig('A desktop layout beside the same page on a phone',
  'Read every page on a phone from top to bottom.',
  rv(0, browser(30, 40, 360, 180, `${R(48, 72, 160, 14, 'k', 5)}${R(48, 96, 150, 80, 's', 6)}${lines(216, 96, 150, 5)}${R(48, 188, 70, 16, 'k', 8)}`)) +
  rv(1, phone(440, 24, 130, 206, `${R(456, 50, 98, 10, 'k', 4)}${R(456, 70, 98, 54, 's', 6)}${lines(456, 136, 96, 4, 11)}<g class="btn" tabindex="0">${R(456, 190, 98, 26, 'k', 13)}${T(505, 207, 'Tap', 'wt xs')}</g>`)) +
  `<path d="M395 130 H430" class="a thick"/><path d="M420 120 l10 10 -10 10" class="a thick" fill="none"/>`, 'Check text, images and buttons.');

const publish = () => fig('A live address in a browser and a private window showing the same site',
  'Open the live address in a private window to see what visitors see.',
  rv(0, browser(30, 40, 330, 170, `${R(48, 72, 150, 14, 'k', 5)}${R(48, 96, 120, 70, 's', 6)}${lines(180, 96, 150, 4)}`, 'yourname.example.com')) +
  rv(1, browser(390, 40, 220, 170, `${R(404, 72, 100, 12, 'k', 4)}${R(404, 94, 90, 50, 's', 6)}${lines(404, 156, 100, 2)}<circle cx="582" cy="73" r="0" class="k"/>`, 'private window')) +
  rv(2, `<circle cx="560" cy="188" r="18" class="accent2"/><path d="M551 188 l7 7 12-14" fill="none" class="wa thick"/>`) + T(485, 232, 'Visible without logging in', 'tm sm'));

const locks = () => fig('Four locked features commonly limited on free plans',
  'Check these four limits before you commit.',
  [['Own address', 'domain'], ['Full design', 'design'], ['No branding or ads', 'branding'], ['Easy export', 'export']].map(([l], i) => rv(i, `<g class="tile locked" tabindex="0">${R(30 + i * 148, 50, 130, 130, 'w a', 14)}<rect x="${80 + i * 148}" y="98" width="30" height="24" rx="5" class="k"/><path d="M${85 + i * 148} 98 v-8 a10 10 0 0 1 20 0 v8" class="a thick" fill="none"/>${T(95 + i * 148, 154, l, 't sm')}${T(95 + i * 148, 168, 'check your plan', 'tm xs')}</g>`)).join(''), 'Hover a lock.');

const upgrade = () => fig('A three step ladder from free plan to naming the problem to upgrading',
  'Upgrade when a specific limit blocks the site, not before.',
  [['Free', 0], ['Name the problem', 1], ['Upgrade', 2]].map(([l, i]) => rv(i, `<g class="stop" tabindex="0">${R(50 + i * 190, 150 - i * 50, 170, 56 + i * 50, i === 2 ? 'k' : 'w a', 10)}${T(135 + i * 190, 182 - i * 50, l, i === 2 ? 'wt sm' : 't sm')}</g>`)).join(''));

const checklist = (title, items) => {
  const id = 'cl' + ++n;
  return `<figure class="fig checklist" data-check><figcaption class="cl-title">${esc(title)} <span class="cl-count" aria-live="polite">0 of ${items.length} done</span></figcaption><div class="cl-bar" aria-hidden="true"><i></i></div><ul>${items.map((t, i) => `<li><label for="${id}-${i}"><input type="checkbox" id="${id}-${i}"><span>${esc(t)}</span></label></li>`).join('')}</ul></figure>`;
};

export const FIGS = {
  'decide-what-the-website-should-do': goal(),
  'prepare-your-words-and-images': words(),
  'list-your-essential-requirements': reqs(),
  'free-website-options-compared': options(),
  'compare-a-real-task': compare(),
  'distinguish-a-free-plan-from-a-trial': trial(),
  'step-by-step-setup-create-a-website-for-free': overview(),
  'step-1-choose-one-platform': choose(),
  'step-2-create-the-account': account(),
  'step-3-start-with-a-simple-template': template(),
  'step-4-build-the-homepage': homepage(),
  'step-5-add-the-supporting-pages': pages(),
  'step-6-connect-the-navigation': nav(),
  'step-7-set-page-titles-and-headings': titles(),
  'step-8-review-the-mobile-version': mobile(),
  'step-9-test-before-sharing': checklist('Test before sharing', ['Follow every menu link and button', 'Submit a test message through the form', 'Proofread names and contact details', 'Remove leftover sample content', 'Check each image is on the right page']),
  'keep-a-simple-launch-checklist': checklist('Launch checklist', ['Every page has a clear purpose', 'Text reviewed on each page', 'Links checked', 'Opened on a phone', 'You can edit a paragraph and swap an image yourself']),
  'step-10-publish-and-check-again': publish(),
  'what-free-plans-do-not-include': locks(),
  'when-to-upgrade': upgrade(),
};
export { checklist };
