// Adds a small brand logo next to tool names in H3 headings and in the first column of comparison tables.
// Glyphs come from Simple Icons (CC0); trademarks belong to their owners. Brands without a glyph get a letter badge.
import { visit } from 'unist-util-visit';

const B = [
  ['google keyword planner', 'googleads'], ['google search console', 'googlesearchconsole'], ['search console', 'googlesearchconsole'],
  ['url inspection', 'googlesearchconsole'], ['google analytics', 'googleanalytics'], ['google business profile', 'google'],
  ['google trends', 'google'], ['google sites', 'googlesites'], ['pagespeed insights', 'google'], ['lighthouse', 'lighthouse'],
  ['wordpress.com', 'wordpress'], ['wordpress', 'wordpress'], ['wix', 'wix'], ['squarespace', 'squarespace'], ['shopify', 'shopify'],
  ['webflow', 'webflow'], ['framer', 'framer'], ['carrd', 'carrd'], ['hostinger', 'hostinger'], ['namecheap', 'namecheap'],
  ['siteground', 'siteground'], ['dreamhost', 'dreamhost'], ['kinsta', 'kinsta'], ['cloudflare pages', 'cloudflarepages'],
  ['netlify', 'netlify'], ['github pages', 'githubpages'], ['infinityfree', 'infinityfree'], ['ahrefs', 'ahrefs'], ['semrush', 'semrush'],
  ['mangools', 'mangools'], ['hubspot', 'hubspot'], ['zoho crm', 'zoho'], ['zoho', 'zoho'], ['bigin', 'bigin'], ['pipedrive', 'pipedrive'],
  ['less annoying crm', 'lessannoyingcrm'], ['salesforce', 'salesforce'], ['mailchimp', 'mailchimp'], ['brevo', 'brevo'],
  ['klaviyo', 'klaviyo'], ['mailerlite', 'mailerlite'], ['buffer', 'buffer'], ['canva', 'canva'], ['grammarly', 'grammarly'],
  ['quillbot', 'quillbot'], ['wordtune', 'wordtune'], ['jasper', 'jasper'], ['claude', 'claude'],
].sort((a, b) => b[0].length - a[0].length);

const textOf = (n) => (n.type === 'text' ? n.value : (n.children || []).map(textOf).join(''));
function match(t) {
  const s = t.trim().toLowerCase();
  for (const [name, file] of B) {
    if (s.startsWith(name) && !/[a-z0-9]/.test(s[name.length] || ' ')) return { name, file };
  }
  return null;
}
const img = (m) => ({ type: 'element', tagName: 'img', properties: { src: `/brands/${m.file}.svg`, alt: '', width: 22, height: 22, className: ['brand-logo'], loading: 'lazy', decoding: 'async' }, children: [] });

export function rehypeBrands() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h3') {
        const m = match(textOf(node));
        if (m) node.children.unshift(img(m));
      }
    });
    visit(tree, 'element', (tr) => {
      if (tr.tagName !== 'tr') return;
      const first = (tr.children || []).find((c) => c.type === 'element' && c.tagName === 'td');
      if (!first) return;
      const m = match(textOf(first));
      if (m) first.children.unshift(img(m));
    });
  };
}
