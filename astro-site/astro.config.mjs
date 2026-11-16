import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBrands } from './src/plugins/brands.mjs';
import { remarkMarkers, rehypeMedia } from './src/plugins/media.mjs';

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

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ filter: (page) => !hidden.has(page) && !page.includes('/image-credits') })],
  markdown: { processor: unified({ remarkPlugins: [remarkMarkers], rehypePlugins: [rehypeMedia, rehypeBrands] }) },
  vite: { server: { fs: { allow: ['..'] } } },
});
