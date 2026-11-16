import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fm = z.object({
  site_name: z.string().optional(),
  site_url: z.string().optional(),
  slug: z.string(),
  canonical_url: z.string().optional(),
  seo_title: z.string().optional(),
  meta_description: z.string().optional(),
  primary_keyword: z.string().optional(),
  content_type: z.string().optional(),
  editorial_status: z.string().optional(),
  date: z.string().optional(),
  updated: z.string().optional(),
  research_updated: z.string().optional(),
});

// Articles live outside the Astro project, in the folder you already use. Drop a new .md there and rebuild.
const articles = defineCollection({
  loader: glob({ pattern: ['*.md', '!CLAUDE*', '!README*', '!._*', '!free-monthly-seo-report-template.md', '!ai-rewriter-test-notes.md'], base: '../Future Forward Studios Articles' }),
  schema: fm,
});
const pages = defineCollection({
  loader: glob({ pattern: ['*.md', '!._*', '!free-monthly-seo-report-template.md'], base: './src/content/pages' }),
  schema: fm,
});
export const collections = { articles, pages };
