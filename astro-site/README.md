# Future Forward Studios (Astro)

Static blog built with Astro. Articles are read from `../Future Forward Studios Articles/*.md`.

```bash
npm install        # first time only
npm run dev        # local dev server
npm run build      # outputs ./dist (deploy this folder, e.g. Cloudflare Pages)
npm run preview    # serve ./dist locally
```

## Add a blog
Drop a new `.md` (same front matter as the others) in `Future Forward Studios Articles/`, then build.
To give it a cover photo, add its file name to `COVERS` in `src/plugins/media.mjs`.
Photos live in `public/photos/` with credits in `photos.json`.

## Cloudflare Pages
Build command: `npm run build`   ·   Output directory: `dist`   ·   Root directory: `astro-site`
(Cloudflare Pages needs the articles folder in the same repo, or copy articles into `src/content/articles`.)

## Notes
- Pages with open `[VERIFY: ...]` / `[MY EXPERIENCE: ...]` markers are set to `noindex` and left out of the sitemap.
- `public/ads.txt` is a placeholder. Add your AdSense line after approval.
