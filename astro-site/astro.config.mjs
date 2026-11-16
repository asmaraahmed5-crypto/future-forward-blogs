import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBrands } from './src/plugins/brands.mjs';
import { remarkMarkers, rehypeMedia } from './src/plugins/media.mjs';
import { CATEGORIES } from './src/data/categories.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES = path.resolve(here, '../Future Forward Studios Articles');
const SITE = 'https://futureforwardstudios.com';

// Pages that still contain [VERIFY]/[MY EXPERIENCE] markers stay noindex and out of the sitemap.
const hidden = new Set();
for (const dir of [ARTICLES, path.join(here, 'src/content/pages')]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md') || f.startsWith('._') || /^CLAUDE|^README/i.test(f)) continue;
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    if (/\[(VERIFY|MY EXPERIENCE):/.test(raw)) {
      const m = raw.match(/^slug:\s*"?([^"\n]+)"?/m);
      if (m) hidden.add(SITE + m[1].replace(/^\/?/, '/').replace(/\/?$/, '/'));
    }
  }
}

// Sub-category pages with fewer than 3 guides are noindex (see category page) and kept out of the sitemap.
const thinSubs = new Set();
for (const c of CATEGORIES) for (const s of c.subs) if (s.articles.length < 3) thinSubs.add(`${SITE}/category/${c.slug}/${s.slug}/`);

// Collapse the generated sitemap index + sitemap-0.xml into one /sitemap.xml.
const singleSitemap = {
  name: 'single-sitemap',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const d = fileURLToPath(dir);
      const src = path.join(d, 'sitemap-0.xml');
      if (!fs.existsSync(src)) return;
      fs.writeFileSync(path.join(d, 'sitemap.xml'), fs.readFileSync(src, 'utf8'));
      for (const f of ['sitemap-0.xml', 'sitemap-index.xml']) fs.rmSync(path.join(d, f), { force: true });
    },
  },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !hidden.has(page) && !page.includes('/image-credits') && !thinSubs.has(page) }), singleSitemap],
  markdown: { processor: unified({ remarkPlugins: [remarkMarkers], rehypePlugins: [rehypeMedia, rehypeBrands] }) },
  vite: { server: { fs: { allow: ['..'] } } },
});
