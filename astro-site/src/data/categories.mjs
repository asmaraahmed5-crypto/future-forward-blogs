// Site categories and sub categories. Articles are matched by file name (slug).
export const CATEGORIES = [
  { slug: 'website-building', name: 'Website Building', blurb: 'Choose a builder or platform and launch your first site.', subs: [
    { slug: 'website-builders', name: 'Website Builders', blurb: 'Compare builders, prices and AI tools.', articles: ['top-website-builders', 'best-free-website-makers', 'cheapest-website-builder', 'ai-website-builders', 'website-building-platforms'] },
    { slug: 'free-and-business-sites', name: 'Free and Business Sites', blurb: 'Step-by-step guides to your first site.', articles: ['create-a-website-for-free', 'free-business-website'] },
  ] },
  { slug: 'web-hosting', name: 'Web Hosting', blurb: 'Understand hosting types, costs and trade-offs.', subs: [
    { slug: 'cheap-and-free-hosting', name: 'Cheap and Free Hosting', blurb: 'What low-cost and free hosting really includes.', articles: ['cheap-web-hosting', 'free-web-hosting-services'] },
    { slug: 'choosing-a-host', name: 'Choosing a Host', blurb: 'Recommendations and plain-English explainers.', articles: ['recommended-website-hosting', 'shared-hosting-explained'] },
    { slug: 'wordpress-hosting', name: 'WordPress Hosting', blurb: 'Pick and set up hosting for WordPress.', articles: ['wordpress-hosting-guide'] },
  ] },
  { slug: 'seo', name: 'SEO', blurb: 'Keywords, tools and audits for search visibility.', subs: [
    { slug: 'keyword-research', name: 'Keyword Research', blurb: 'Find and understand the words people search.', articles: ['what-are-seo-keywords', 'how-to-find-keywords-for-seo', 'free-keyword-research-tools', 'best-keyword-research-tools', 'find-keywords-on-a-website', 'competitor-keyword-research'] },
    { slug: 'seo-tools-and-reports', name: 'SEO Tools and Reports', blurb: 'Checkers, trackers and reporting.', articles: ['best-seo-tools', 'free-seo-checker', 'keyword-rank-checker-tools', 'seo-report-generator'] },
    { slug: 'on-page-and-audits', name: 'On-Page SEO and Audits', blurb: 'Headings, page checks and site audits.', articles: ['seo-audit-checklist', 'h1-tag-seo'] },
  ] },
  { slug: 'business-tools', name: 'Business Tools', blurb: 'Software that helps a small business run.', subs: [
    { slug: 'crm-software', name: 'CRM Software', blurb: 'Cloud tools for managing customers.', articles: ['what-does-crm-mean', 'crm-examples', 'cloud-based-crm-software', 'best-crm-for-small-businesses', 'best-crm-for-startups'] },
  ] },
  { slug: 'ai-tools', name: 'AI Tools', blurb: 'Practical looks at AI tools for writing and work.', subs: [
    { slug: 'ai-writing-tools', name: 'AI Writing Tools', blurb: 'Rewriters and writing assistants compared.', articles: ['best-ai-rewriters', 'best-ai-writing-assistants'] },
    { slug: 'ai-in-marketing', name: 'AI in Marketing', blurb: 'Using AI carefully in marketing work.', articles: ['how-to-use-ai-in-marketing'] },
  ] },
  { slug: 'marketing', name: 'Marketing', blurb: 'Email and online marketing tools and plans.', subs: [
    { slug: 'email-marketing', name: 'Email Marketing', blurb: 'Pick software and plan your campaigns.', articles: ['best-email-marketing-software', 'how-to-plan-email-marketing-campaign'] },
    { slug: 'marketing-tools', name: 'Marketing Tools', blurb: 'Tools for online marketing.', articles: ['online-marketing-tools'] },
  ] },
];
