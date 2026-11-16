// Markdown plugins: editorial markers, license-free photos, and interactive illustrations.
import path from 'node:path';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import { FIGS } from '../data/figures.mjs';
import { FIGS2 } from '../data/figures2.mjs';

import PHOTOS from '../../photos.json' with { type: 'json' };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// photo key -> alt text describing what is actually in the picture
const ALT = {
  'cover-workspace': 'Laptop on a desk showing charts, beside a notebook and pen',
  'notes-planning': 'Handwritten notes and a pen on a wooden desk',
  'website-layout': 'Person designing a website layout on a laptop',
  'laptop-hands': 'Hands typing on a laptop keyboard, seen from above',
  'phone-hand': 'A hand holding a smartphone',
  magnifier: 'A magnifying glass on a dark surface',
  'laptop-desk': 'A laptop and a mug on a white desk',
  padlock: 'An old padlock on a teal painted door',
  'spiral-stairs': 'A spiral staircase seen from above',
  'keyboard-typing': 'A person typing on a laptop',
  'desk-office': 'A laptop and coffee on a work desk by a window',
  'network-rack': 'Network cables plugged into a server rack',
  'data-center': 'Rows of server racks with network cables in a data center',
  'server-rack-rear': 'The back of a server rack full of cables',
  'servers-closeup': 'Computer servers mounted in a rack',
  'code-screen': 'Lines of code on a computer screen',
  'ethernet-switch': 'A network switch with Ethernet cables plugged in',
  'tech-racks': 'A technician working beside server racks',
  'blog-laptop': 'A person typing on a laptop with a blog open',
  'analytics-laptop': 'A laptop screen showing line and pie charts of website traffic',
  'analytics-typing': 'A person working on a laptop that shows an analytics report',
  'analytics-report': 'A laptop showing a website analytics dashboard',
  'analytics-chart': 'Close-up of a laptop screen with a traffic chart',
  'seo-tiles': 'Three letter tiles spelling SEO on a wooden table',
  'phone-pageviews': 'A phone showing a page views report beside a notebook and laptop',
  'desktop-analytics': 'A desktop monitor with a growing traffic graph on a tidy desk',
};

// heading id -> [photo key, caption]
const BY_HEADING = {
  'what-you-need-before-you-start': ['notes-planning', 'Write the plan down before you open a builder.'],
  'free-website-options-compared': ['website-layout', 'Test each option with the same sample page.'],
  'step-by-step-setup-create-a-website-for-free': ['laptop-hands', 'Most of the work is writing, building and checking.'],
  'step-7-set-page-titles-and-headings': ['magnifier', 'Clear titles help visitors and search engines understand a page.'],
  'step-8-review-the-mobile-version': ['phone-hand', 'Read every page on a real phone.'],
  'step-10-publish-and-check-again': ['laptop-desk', 'Check the live site as a visitor would see it.'],
  'what-free-plans-do-not-include': ['padlock', 'Some features sit behind a paid plan.'],
  'when-to-upgrade': ['spiral-stairs', 'Move up a level only when a limit blocks your goal.'],
};

// article file name -> cover photo key
const COVERS = {
  'create-a-website-for-free': 'cover-workspace',
  'best-free-website-makers': 'keyboard-typing',
  'free-business-website': 'desk-office',
  'top-website-builders': 'laptop-hands',
  'ai-website-builders': 'code-screen',
  'cheap-web-hosting': 'data-center',
  'cheapest-website-builder': 'website-layout',
  'free-web-hosting-services': 'servers-closeup',
  'recommended-website-hosting': 'tech-racks',
  'shared-hosting-explained': 'server-rack-rear',
  'wordpress-hosting-guide': 'blog-laptop',
  'best-keyword-research-tools': 'seo-tiles',
  'best-seo-tools': 'desktop-analytics',
  'cloud-based-crm-software': 'laptop-desk',
  'competitor-keyword-research': 'analytics-typing',
  'find-keywords-on-a-website': 'magnifier',
  'free-keyword-research-tools': 'notes-planning',
  'free-seo-checker': 'analytics-chart',
  'h1-tag-seo': 'code-screen',
  'how-to-find-keywords-for-seo': 'analytics-laptop',
  'keyword-rank-checker-tools': 'phone-pageviews',
  'seo-audit-checklist': 'analytics-report',
  'seo-report-generator': 'desktop-analytics',
  'website-building-platforms': 'website-layout',
  'what-does-crm-mean': 'notes-planning',
  'crm-examples': 'desk-office',
  'best-crm-for-small-businesses': 'cover-workspace',
  'best-crm-for-startups': 'laptop-hands',
  'best-ai-rewriters': 'keyboard-typing',
  'best-ai-writing-assistants': 'blog-laptop',
  'best-email-marketing-software': 'laptop-desk',
  'how-to-plan-email-marketing-campaign': 'notes-planning',
  'how-to-use-ai-in-marketing': 'code-screen',
  'online-marketing-tools': 'analytics-laptop',
  'what-are-seo-keywords': 'keyboard-typing',
};

export function photoHtml(key, caption, { eager = false } = {}) {
  const p = PHOTOS[key];
  if (!p) return '';
  const h = Math.round(1600 * p.aspect);
  const by = p.creator ? `Photo: ${esc(p.creator)}` : 'Photo: Rawpixel';
  return `<figure class="photo${eager ? ' cover' : ''}"><img src="/photos/${key}-1600.jpg" srcset="/photos/${key}-800.jpg 800w, /photos/${key}-1600.jpg 1600w" sizes="(min-width: 960px) 720px, 100vw" width="1600" height="${h}" alt="${esc(ALT[key] || '')}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><figcaption>${esc(caption)} <span class="credit">${by} · ${esc(p.license)} (<a href="/image-credits/">credits</a>)</span></figcaption></figure>`;
}
export { PHOTOS, ALT, COVERS };

export function remarkMarkers() {
  const re = /\[(VERIFY|MY EXPERIENCE):\s*([^\]]*)\]/g;
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !re.test(node.value)) return;
      re.lastIndex = 0;
      const out = []; let last = 0, m;
      while ((m = re.exec(node.value))) {
        if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
        out.push({ type: 'html', value: `<mark class="marker marker-${m[1] === 'VERIFY' ? 'verify' : 'exp'}"><b>${m[1]}</b> ${esc(m[2])}</mark>` });
        last = m.index + m[0].length;
      }
      if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

// Topic rules: choose the photo that best matches a section heading (first match wins)
const RULES = [
  [/analytic|traffic|report|dashboard|monitor|track|performance score|visibility/i, ['analytics-report', 'analytics-chart', 'analytics-laptop', 'desktop-analytics', 'analytics-typing', 'phone-pageviews']],
  [/hosting|server|uptime|speed|performance|bandwidth|storage|vps|cloud/i, ['servers-closeup', 'data-center', 'ethernet-switch', 'server-rack-rear', 'tech-racks', 'network-rack']],
  [/secur|backup|safe|privacy|ssl|risk|limit|restrict|not include|catch|avoid|mistake|warning/i, 'padlock'],
  [/price|cost|cheap|budget|pay|renew|fee|afford|pricing|money|spend/i, ['cover-workspace', 'notes-planning']],
  [/mobile|phone|responsive/i, 'phone-hand'],
  [/seo|search|title|keyword|rank|google|competitor|intent/i, ['magnifier', 'seo-tiles']],
  [/upgrade|grow|scal|next step|move|migrat/i, 'spiral-stairs'],
  [/wordpress|blog|article|content|write|writing/i, 'blog-laptop'],
  [/design|template|layout|builder|editor|compare|comparison|tool|feature|option/i, 'website-layout'],
  [/plan|start|before|need|checklist|prepare|choose|decide|how to|what is|explain|understand/i, 'notes-planning'],
  [/publish|launch|domain|live|setup|set up|install|connect/i, 'laptop-desk'],
];
const FALLBACK = ['laptop-hands', 'keyboard-typing', 'desk-office', 'cover-workspace', 'laptop-desk', 'website-layout'];
const SEO_FALLBACK = ['analytics-laptop', 'analytics-typing', 'analytics-report', 'desktop-analytics', 'analytics-chart', 'phone-pageviews', 'seo-tiles', 'notes-planning'];
const HOSTING_FALLBACK = ['servers-closeup', 'data-center', 'ethernet-switch', 'server-rack-rear', 'tech-racks', 'network-rack', 'code-screen'];
const CAPTION = {
  'analytics-laptop': 'Charts turn search data into decisions.',
  'analytics-typing': 'Check the data before you change a page.',
  'analytics-report': 'A simple dashboard shows what to do next.',
  'analytics-chart': 'Trends matter more than a single number.',
  'seo-tiles': 'Keywords connect what people search with what you publish.',
  'phone-pageviews': 'Keep an eye on page views as you publish.',
  'desktop-analytics': 'Review your numbers on a regular schedule.',
  'network-rack': 'Hosting runs on servers like these.',
  padlock: 'Check the limits and security before you commit.',
  'data-center': 'Your site is stored on servers in a data center.',
  'server-rack-rear': 'Behind every host are racks of servers and cables.',
  'servers-closeup': 'Hosting providers run racks of servers like these.',
  'code-screen': 'Behind every page is code a builder writes for you.',
  'ethernet-switch': 'Network gear connects the servers to the internet.',
  'tech-racks': 'Technicians keep the servers running.',
  'phone-hand': 'Many visitors will see your site on a phone.',
  magnifier: 'Clear details help visitors and search engines.',
  'spiral-stairs': 'Move up only when a limit gets in your way.',
  'blog-laptop': 'Regular publishing is easier on the right platform.',
  'website-layout': 'Test each option with the same sample page.',
  'notes-planning': 'A short written plan saves time later.',
  'laptop-desk': 'Check the finished result as a visitor would.',
  'laptop-hands': 'Most of the work is writing, building and checking.',
  'keyboard-typing': 'Take it one task at a time.',
  'desk-office': 'A simple setup is enough to start.',
  'cover-workspace': 'Keep notes and tests together as you go.',
};
function pickPhoto(text, used, hosting, seo) {
  for (const [re, keys] of RULES) {
    if (!re.test(text)) continue;
    const ks = [].concat(keys);
    if (!hosting && ks.includes('servers-closeup')) continue;
    if (!seo && ks.includes('analytics-report')) continue;
    const hit = [].concat(keys).find((k) => !used.has(k));
    if (hit) return hit;
  }
  return (hosting ? HOSTING_FALLBACK : seo ? SEO_FALLBACK : FALLBACK).find((k) => !used.has(k)) || null;
}

const textOf = (n) => (n.type === 'text' ? n.value : (n.children || []).map(textOf).join(''));

const SEO = new Set(['best-keyword-research-tools','best-seo-tools','competitor-keyword-research','find-keywords-on-a-website','free-keyword-research-tools','free-seo-checker','h1-tag-seo','how-to-find-keywords-for-seo','keyword-rank-checker-tools','seo-audit-checklist','seo-report-generator','what-are-seo-keywords']);
export function rehypeMedia() {
  return (tree, file) => {
    const slugger = new GithubSlugger();
    const name = path.basename(file.path || '', '.md');
    const out = []; let sawH1 = false, coverDone = !COVERS[name];
    const used = new Set(COVERS[name] ? [COVERS[name]] : []);
    const custom = name === 'create-a-website-for-free';
    const list2 = FIGS2[name] || []; let h2n = -1;
    for (const node of tree.children) {
      out.push(node);
      if (node.type !== 'element') continue;
      if (node.tagName === 'h1') sawH1 = true;
      else if (sawH1 && !coverDone && node.tagName === 'p') {
        out.push({ type: 'raw', value: photoHtml(COVERS[name], 'Free-to-use photo chosen for this guide.', { eager: true }) });
        coverDone = true;
      }
      const id = /^h[1-6]$/.test(node.tagName) ? slugger.slug(textOf(node)) : null;
      if (id && /^h[23]$/.test(node.tagName)) {
        if (custom && BY_HEADING[id]) out.push({ type: 'raw', value: photoHtml(BY_HEADING[id][0], BY_HEADING[id][1]) });
        else if (!custom && COVERS[name] && node.tagName === 'h2' && id !== 'faq') {
          const key = pickPhoto(textOf(node), used, /hosting/.test(name), SEO.has(name));
          if (key) { used.add(key); out.push({ type: 'raw', value: photoHtml(key, CAPTION[key] || '') }); }
        }
        if (custom && FIGS[id]) out.push({ type: 'raw', value: FIGS[id] });
        if (node.tagName === 'h2' && !/^(faq|editorial)/.test(id)) { h2n++; if (list2[h2n]) out.push({ type: 'raw', value: list2[h2n] }); }
      }
    }
    tree.children = out;
  };
}
