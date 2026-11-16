// Original, license-free interactive figures for every article except the first one.
// Drawn from scratch (simple SVG glyphs + HTML), so there is nothing to license.
// Each article has a list; entry N is shown under the Nth H2 of that article (FAQ / editorial sections are skipped).
import { checklist } from './figures.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const G = {
  spark: '<path class="c" d="M32 5 38 26 59 32 38 38 32 59 26 38 5 32 26 26Z"/>',
  compass: '<circle class="t s" cx="32" cy="32" r="25"/><path class="c" d="M44 20 36 38 20 44 28 26Z"/>',
  warn: '<path class="t s" d="M32 8 58 54H6Z"/><path class="s" fill="none" d="M32 26v14"/><circle class="c" cx="32" cy="47" r="2.6"/>',
  check: '<circle class="c" cx="32" cy="32" r="25"/><path fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M20 33l9 9 16-18"/>',
  search: '<circle class="t s" cx="27" cy="27" r="17"/><path class="s" fill="none" stroke-width="6" stroke-linecap="round" d="M40 40 56 56"/>',
  chart: '<rect class="t s" x="8" y="10" width="48" height="44" rx="6"/><rect class="c" x="16" y="34" width="8" height="14" rx="2"/><rect class="d" x="28" y="24" width="8" height="24" rx="2"/><rect class="c" x="40" y="16" width="8" height="32" rx="2"/>',
  tag: '<path class="t s" d="M8 8h22l26 26-22 22L8 30Z"/><circle class="c" cx="21" cy="21" r="4"/>',
  server: '<rect class="t s" x="8" y="9" width="48" height="19" rx="5"/><rect class="t s" x="8" y="36" width="48" height="19" rx="5"/><circle class="c" cx="18" cy="18.5" r="3"/><circle class="d" cx="18" cy="45.5" r="3"/><path class="s" fill="none" d="M30 18.5h18M30 45.5h18"/>',
  shield: '<path class="t s" d="M32 6 54 14v16c0 14-10 23-22 28C20 53 10 44 10 30V14Z"/><path fill="none" class="s" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M22 32l8 8 13-15"/>',
  list: '<rect class="t s" x="9" y="8" width="46" height="48" rx="6"/><circle class="c" cx="19" cy="22" r="3"/><circle class="d" cx="19" cy="32" r="3"/><circle class="c" cx="19" cy="42" r="3"/><path class="s" fill="none" d="M27 22h20M27 32h20M27 42h14"/>',
  pencil: '<path class="t s" d="M12 52 14 40 40 14 50 24 24 50Z"/><path class="c" d="M44 10l4-4 10 10-4 4Z"/>',
  link: '<rect class="t s" x="6" y="22" width="30" height="20" rx="10"/><rect class="t s" x="28" y="22" width="30" height="20" rx="10"/><path class="s" fill="none" d="M24 32h16"/>',
  gauge: '<path class="t s" d="M8 44a24 24 0 0 1 48 0Z"/><path class="c" d="M32 44 44 22l-8 24Z"/><circle class="d" cx="32" cy="44" r="4"/>',
  people: '<circle class="c" cx="22" cy="20" r="8"/><path class="t s" d="M6 52c0-10 7-16 16-16s16 6 16 16Z"/><circle class="d" cx="44" cy="24" r="7"/><path class="t s" d="M38 52c0-8 4-13 10-13s10 5 10 13Z"/>',
  doc: '<path class="t s" d="M14 6h26l12 12v40H14Z"/><path class="c" d="M40 6v12h12Z"/><path class="s" fill="none" d="M22 30h22M22 38h22M22 46h14"/>',
  cart: '<path class="s" fill="none" stroke-width="4" stroke-linecap="round" d="M6 10h8l7 28h28l6-20H16"/><circle class="c" cx="24" cy="50" r="5"/><circle class="d" cx="45" cy="50" r="5"/>',
  clock: '<circle class="t s" cx="32" cy="32" r="25"/><path class="s" fill="none" stroke-width="4" stroke-linecap="round" d="M32 16v16l11 7"/>',
  scale: '<path class="s" fill="none" stroke-width="3" stroke-linecap="round" d="M32 10v40M18 52h28M12 20h40"/><path class="t s" d="M6 34a8 8 0 0 0 16 0Z"/><path class="t s" d="M42 34a8 8 0 0 0 16 0Z"/><path class="s" fill="none" d="M14 20 8 34M14 20l8 14M50 20l-8 14M50 20l8 14"/>',
};

let uid = 0;
// kind: 'tabs' (pick one item), 'steps' (numbered path)
const ex = (kind, icon, label, caption, items) => {
  const id = 'ex' + ++uid;
  const list = items.map((s) => s.split('|'));
  const hint = kind === 'steps' ? 'Select a step.' : 'Select an option.';
  return `<figure class="fig ex ex-${kind}" data-ex><div class="ex-head"><svg class="ex-ic" viewBox="0 0 64 64" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${G[icon] || G.spark}</svg><div class="ex-main"><p class="ex-title">${esc(label)}</p><div class="ex-tabs" role="tablist" aria-label="${esc(label)}">${list.map(([t], i) => `<button type="button" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${kind === 'steps' ? `<b>${i + 1}</b>` : ''}<span>${esc(t)}</span></button>`).join('')}</div></div></div>${list.map(([t, d], i) => `<div class="ex-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join('')}<figcaption>${esc(caption)} <span class="hint">${hint}</span></figcaption></figure>`;
};
const T = (icon, label, caption, items) => ex('tabs', icon, label, caption, items);
const S = (icon, label, caption, items) => ex('steps', icon, label, caption, items);
const C = (title, items) => checklist(title, items);

export const FIGS2 = {
  'ai-website-builders': [
    S('spark', 'From brief to live site', 'Generation is only one stage on the way to a published website.', [
      'Brief|Describe the business, the audience and the pages you need. A clear brief becomes the starting structure.',
      'Generate|The builder drafts a layout and text. Generating a draft is not the same as publishing it.',
      'Edit|You still decide what is accurate, what matters most and what the business really offers.',
      'Review|Read the whole website, page by page, on desktop and on a phone.',
      'Publish|Publish only when every page, link and contact detail has been checked.']),
    T('compass', 'Five builders, one question each', 'Choose a builder to see what to investigate before committing.', [
      'Wix|Investigate the correction workflow: how easily can you fix wording and structure after the first draft?',
      'Squarespace|Investigate a guided design route: how much does the builder steer you toward a finished design?',
      'Hostinger|Identify the exact builder and the commitment length that goes with the plan you are looking at.',
      'Webflow|Investigate structure as well as generation: how much control do you get over the layout underneath?',
      'Framer|Investigate ongoing visual editing: how comfortable is it to keep changing the site later?']),
    T('warn', 'What AI builders do badly', 'These five jobs stay with you, however good the draft looks.', [
      'Vague ideas|Turning a vague business idea into accurate information needs your input.',
      'What matters most|Choosing which content to put first depends on knowing your customers.',
      'Real experience|A tool cannot prove originality or real-world experience.',
      'Business process|Confirming that bookings, orders or enquiries really work is your job.',
      'Accessibility|Check that every layout is readable and usable, not only attractive.']),
    C('Get better results from an AI builder', ['Write a brief with boundaries', 'Supply your own content before asking for polish', 'Make focused revisions, one at a time', 'Evaluate the complete cost, not the first month', 'Give the builder an acceptance checklist', 'Keep a record of decisions', 'Review the whole site before publishing']),
  ],

  'best-free-website-makers': [
    T('scale', 'How to compare website makers', 'Three questions apply to every free plan.', [
      'The job|Start with the job the website needs to do, then judge each maker against it.',
      'Essential pages|List the pages you cannot launch without and check each maker can build them.',
      'Free vs paid|Separate what the free plan publishes from what only a paid upgrade unlocks.']),
    null,
    T('compass', 'Five makers, pros and limits', 'Choose a maker to see where it tends to fit.', [
      'Wix|A visual starting point for a small business. Check which limits apply on the free plan.',
      'WordPress.com|A practical choice for regular articles. Check what the free plan leaves out.',
      'Google Sites|Straightforward information pages with a simple editor and fewer design options.',
      'Webflow|Useful for learning visual design. Expect more to learn than with a basic builder.',
      'Framer|A visual option for a personal project. Check the free limits before building a lot.']),
    T('people', 'Which one fits your site?', 'Pick your situation to see what to prioritise.', [
      'Service business|Prioritise a clear enquiry route and contact details on the first screen.',
      'Blog or guides|Prioritise the writing and publishing routine, since you will repeat it often.',
      'Portfolio or learning|Prioritise how freely you can design and experiment.',
      'Custom domain|Check which plan connects your own domain and what it costs to grow.',
      'Maintainable|Choose a maker you will still be able to update in six months.']),
  ],

  'best-keyword-research-tools': [
    T('search', 'Match the tool to the task', 'Decide what you want to learn first, then pick a starting point.', [
      'Ideas|Use a tool that suggests topics and phrases around a seed term.',
      'Evidence|Use data from your own site to see what already earns impressions.',
      'Timing|Use a trends tool when the question is when interest rises or falls.',
      'Competition|Use a larger platform when you need to compare against other sites.']),
    null,
    T('compass', 'Five tools, one angle each', 'Select a tool to see how this guide frames it.', [
      'Google Keyword Planner|Useful context for advertising research. It is built for advertisers, not publishers.',
      'Google Trends|A companion for timing questions, showing relative interest over time.',
      'Search Console|Prioritise evidence from your own site: the queries people already use to find you.',
      'Ahrefs|Compare the plan with your research workload before paying.',
      'Semrush|Investigate the broader workflow before subscribing.']),
    C('Choose a keyword tool', ['Separate discovery, evaluation and monitoring', 'Compare the same sample topics in each tool', 'Judge usefulness, not report size', 'Match the page to the search task', 'Check the complete subscription cost', 'Turn findings into a written brief', 'Keep account ownership clear', 'Review the process after publication']),
  ],

  'best-seo-tools': [
    T('list', 'One job per tool', 'Give every tool a purpose, then add only what you need.', [
      'Monitoring|Begin with your own website: see how it appears in search.',
      'Keyword research|Choose a useful question first, then the tool that answers it.',
      'Page checks|Inspect the issue behind the score, not just the score.',
      'Site audits|Look for repeating patterns across many pages.',
      'Reporting|Communicate the next decision, not only the numbers.']),
    T('scale', 'Free or paid?', 'Select a point to see how to weigh it.', [
      'Free first|Free tools can cover a useful starting process.',
      'Paid for repeat work|Paid tools should solve work you repeat often.',
      'Full subscription|Compare the complete subscription, not the headline price.',
      'Keep context|Keep free and paid data in context, since they measure different things.']),
    S('chart', 'A starter toolkit in seven steps', 'Add one capability at a time.', [
      'Goal|Define a small website goal.',
      'Monitoring|Set up search monitoring first.',
      'Research|Research one audience problem.',
      'Check pages|Check representative pages.',
      'Fix one|Fix one verified problem.',
      'Rhythm|Keep a short reporting rhythm.',
      'Add paid|Add one paid capability only when it is justified.']),
    T('warn', 'What to skip', 'Five things that add cost without adding insight.', [
      'Overlapping subscriptions|Tools that duplicate each other with no owner.',
      'Unexplained automation|Automatic changes you do not understand.',
      'Scores as outcomes|A score is not a business result.',
      'AI drafts as evidence|A draft is not proof that people want the page.',
      'Reports without action|Large reports that end with no next step.']),
  ],

  'cheap-web-hosting': [
    T('tag', 'Intro price vs renewal price', 'Read the headline price four ways.', [
      'Monthly headline|Understand what the monthly rate actually means.',
      'Commitment|A low rate can require a long upfront commitment.',
      'Same basis|Compare rates in the same currency and for the same period.',
      'Next payment|Budget for the next payment, not just the first.']),
    T('server', 'Four hosts, one thing to check', 'Select a host to see what this guide says to compare.', [
      'Hostinger|Evaluate the commitment and the backup interval.',
      'Namecheap|Compare the whole entry-tier package, not one feature.',
      'SiteGround|Inspect where each tier begins and ends.',
      'DreamHost|Distinguish the Launch plan from DreamPress.']),
    C('Avoid these cheap-hosting mistakes', ['Choosing from the lowest headline price alone', 'Treating "unlimited" as a full specification', 'Assuming backups mean effortless recovery', 'Buying upgrades before finding the problem', 'Ignoring the maintenance workload', 'Accepting untested performance claims', 'Skipping a written buying brief', 'Forgetting the people who use the account', 'Overlooking cancellation and migration work']),
    T('tag', 'Is the free domain worth it?', 'A free domain is a bonus with its own conditions.', [
      'A bonus|Useful, but it comes with separate conditions.',
      'Control|Keep control of the name in an account you own.',
      'Final comparison|Compare the whole package, not the domain alone.']),
  ],

  'cheapest-website-builder': [
    T('tag', 'Reading a price table', 'Three ways the headline rate can mislead.', [
      'Commitment|Compare the commitment as well as the rate.',
      'Renewal cost|The renewal cost is what you pay after the first term ends.',
      'Today|Calculate what leaves your account today.']),
    T('compass', 'Builders under $10 a month', 'Select a plan to see what this guide says about it.', [
      'Carrd Pro Standard|Consider it for a focused, single-purpose page.',
      'WordPress.com Personal|Consider it for publishing.',
      'Hostinger Premium|Compare the long commitment carefully.',
      'Framer Basic|A useful budget boundary to test against.',
      'Staying free|Sometimes staying on the free plan makes sense.']),
    T('warn', 'Six fees that appear later', 'Check each one before you pay.', [
      'Domain|Domain registration and renewal.',
      'Email|Email and third-party services.',
      'Payments|Payment costs for online selling.',
      'Seats and upgrades|Paid seats, resources and feature upgrades.',
      'Tax and term|Taxes, currency and commitment length.',
      'Moving|Moving and rebuilding later.']),
    C('Is this cheap plan worth it?', ['Match the plan to a specific website', 'Compare two complete budgets', 'Confirm the workflow before paying', 'Use a simple buying worksheet', 'Spend when the benefit is clear']),
  ],

  'cloud-based-crm-software': [
    T('people', 'What a cloud CRM holds', 'Know the records before you choose software.', [
      'Records|Understand the records you will manage: contacts, companies, deals and notes.',
      'Process first|Start with the process you want, then choose the software.']),
    null,
    T('compass', 'Four CRMs, one angle each', 'Select a CRM to see how this guide frames it.', [
      'HubSpot|Consider it for a small free starting point.',
      'Zoho CRM|Consider it for a three-person free team.',
      'Pipedrive|Consider it for a defined sales pipeline.',
      'Salesforce Starter Suite|Consider it for a broader customer workflow.']),
    C('How to choose a CRM', ['Write a one-page requirements list', 'Evaluate the same scenario in each system', 'Check integrations in both directions', 'Calculate a realistic first-year budget', 'Clean your records before migration', 'Assign an owner and keep the launch small', 'Check access and customer communication', 'Make the final decision']),
  ],

  'competitor-keyword-research': [
    S('search', 'Find your real competitors', 'Competitors are the sites that appear for your customers’ searches.', [
      'Customer searches|Start with searches your customers would make.',
      'Relevant pages|Choose relevant pages, not just famous domains.',
      'Record|Record the market and the date.']),
    T('compass', 'Five ways to look at a competitor', 'Free routes first, paid routes after.', [
      'Inspect the page|Free: read the title, headings and wording of the page itself.',
      'Site search|Free: use a site-restricted search to see how a site covers a topic.',
      'Keyword Planner|Free tool route: start from a website in Keyword Planner.',
      'Ahrefs Content Gap|Paid route: compare your pages against a competitor.',
      'Semrush Keyword Gap|Paid route: compare keyword coverage side by side.']),
    S('scale', 'From gap to decision', 'Not every gap deserves a page.', [
      'Remove|Remove gaps that do not belong to your business.',
      'Check need|Check what the searcher actually needs.',
      'Compare|Compare against your existing content.',
      'Table|Build a gap-to-action table.']),
    C('Turn gaps into a content plan', ['Prioritise a useful contribution', 'Choose between updating and creating', 'Write an actionable brief', 'Work through one opportunity before scaling', 'Keep a compact research record', 'Review after publication']),
  ],

  'find-keywords-on-a-website': [
    T('search', 'Three kinds of evidence', 'Know what each source can and cannot tell you.', [
      'Page purpose|What the page helps people do.',
      'On-page wording|What the title, headings and text say.',
      'Search data|What search tools report about the page, which is separate evidence.']),
    S('doc', 'Method 1: read the page source', 'You can see a public page’s own wording yourself.', [
      'Open|Open the public page.',
      'Title|Find the title and the description.',
      'Headings|Inspect headings and visible content.',
      'Inspect|Use your browser’s Inspect tool when needed.',
      'Skip meta keywords|Ignore the old meta keywords shortcut.']),
    T('gauge', 'Method 2: free tools', 'Choose the tool by the question.', [
      'Keyword Planner|Use it for topic suggestions.',
      'Search Console|Use it for a website you manage, to see real queries.',
      'By question|Pick the tool that answers the question you have.']),
    T('search', 'Method 3: search operators', 'Search within a site and narrow the question.', [
      'One domain|Search within one domain to see how it covers a topic.',
      'Narrow|Narrow the question with extra words.',
      'Limits|The results cannot prove traffic or rankings.']),
    C('Use what you find', ['Create a small page-research record', 'Turn observations into a useful action', 'Avoid guessing traffic', 'Keep the checks proportionate', 'Decide whether a new page is needed']),
  ],

  'free-business-website': [
    T('doc', 'Pages every business site needs', 'Four pages cover most small businesses.', [
      'Homepage|A homepage that explains the offer.',
      'Service or work|A page that shows what you do.',
      'About|An About page that says who is behind the business.',
      'Contact|A Contact page and any relevant privacy information.']),
    T('compass', 'Choose a free platform', 'Start from your essential requirement.', [
      'Requirement|Start with your essential requirement.',
      'Wix|Consider it for a visual first version.',
      'WordPress.com|Consider it for regular publishing.',
      'Google Sites|Consider it for straightforward information.']),
    S('pencil', 'Build the pages', 'Content before editing, homepage before the rest.', [
      'Content|Prepare the content before editing.',
      'Account|Create the account and select a layout.',
      'Homepage|Build the homepage first.',
      'Support pages|Add the supporting pages.',
      'Review|Review the site as a new customer.',
      'Connect|Connect the pages and check mobile layouts.']),
    S('check', 'Contact form and basic SEO', 'A short form, a full test and a clear topic.', [
      'Short form|Keep the enquiry form short.',
      'Test|Test the full contact journey.',
      'Topic|Make the page topic clear.',
      'Publish|Publish and review the live site.']),
    T('tag', 'Costs that appear later', 'Free is a starting point, not a promise.', [
      'Domain|Your own domain.',
      'Extras|Extra functions and ongoing work.',
      'When to spend|Decide when spending makes sense.']),
  ],

  'free-keyword-research-tools': [
    T('scale', 'What free tools can do', 'Useful evidence, not guarantees.', [
      'Discover|Help you discover how people describe a problem.',
      'Different evidence|Provide different kinds of evidence.',
      'Support, not promise|Support decisions without guaranteeing outcomes.']),
    T('compass', 'Four free tools by task', 'Select a tool to see the task it suits.', [
      'Ahrefs Free Keyword Generator|A starting point for ideas.',
      'Google Keyword Planner|Useful advertising context.',
      'Google Trends|Investigate timing and relative interest.',
      'Search Console|Learn from your own pages.']),
    S('search', 'Find a keyword in seven steps', 'Write the brief before drafting.', [
      'Reader|Choose a reader and a problem.',
      'Seeds|Prepare a small seed list.',
      'Collect|Collect ideas with consistent settings.',
      'Group|Group phrases by the answer they need.',
      'Inspect|Inspect the search results.',
      'Prioritise|Prioritise a page you can make useful.',
      'Brief|Write the brief before drafting.']),
    T('warn', 'Limits to know', 'Five reasons to treat the numbers with care.', [
      'Estimates vs observed|Estimates and observed site data are different.',
      'Difficulty|Difficulty does not guarantee an outcome.',
      'Advertising costs|Advertising costs are not publishing income.',
      'Access changes|Free access can change.',
      'Your contribution|A tool cannot choose your editorial contribution.']),
  ],

  'free-seo-checker': [
    T('gauge', 'What a checker tests', 'Know the scope before trusting a score.', [
      'Different questions|Different tools answer different questions.',
      'Defined scope|Automated checks have a defined scope.',
      'Five minutes|Five minutes means triage, not completion.']),
    T('compass', 'Four free checkers', 'Select a checker to see where to begin.', [
      'PageSpeed Insights|Begin with a representative URL.',
      'Lighthouse|Read the individual findings.',
      'URL Inspection|Separate indexed information from live information.',
      'Ahrefs Free|Use a crawl to find patterns.']),
    S('doc', 'Read the report', 'From warning to action.', [
      'What was checked|Confirm what was checked.',
      'Score|Treat a score as a summary of that tool’s checks.',
      'Confirm|Confirm the issue on the page.',
      'Observe vs explain|Separate observations from explanations.',
      'Action list|Turn the report into a short action list.',
      'Define a fix|Record what would count as a fix.']),
    S('list', 'Fix these first', 'Five priorities, in order.', [
      'Essential pages|Unavailable essential pages.',
      'Navigation|Broken navigation and customer actions.',
      'Indexing|Indexing settings that contradict the page’s purpose.',
      'Labels|Unclear content and page labels.',
      'Experience|Verified experience problems.']),
  ],

  'free-web-hosting-services': [
    T('server', 'What free hosting gives you', 'A place to publish, with boundaries.', [
      'A place to publish|Somewhere to put files, not necessarily a finished website.',
      'Site type|Different types of websites need different hosting.',
      'Boundaries|The free allowance has limits.',
      'Other costs|Other expenses may remain.']),
    T('compass', 'Four free hosts', 'Select a host to see what to check.', [
      'Cloudflare Pages|Investigate it for prepared site files.',
      'Netlify Free|Understand the credit budget.',
      'GitHub Pages|Useful for permitted project publishing.',
      'InfinityFree|Investigate it when PHP and MySQL matter.']),
    T('warn', 'Limits and risks', 'Five things to plan around.', [
      'Unlimited|"Unlimited" does not describe every resource.',
      'Forms|Your form may need another service.',
      'Recovery|Recovery needs a plan.',
      'Advertising|Free hosting is not an advertising approval.',
      'Support|Support and availability matter differently by project.']),
    S('scale', 'When to switch to paid', 'Move with a plan, not in a rush.', [
      'Requirement|Upgrade when a defined requirement changes.',
      'Cost|Compare the complete operating cost.',
      'Editing|Review the editing workflow before migrating.',
      'Checklist|Move with a checklist.']),
  ],

  'h1-tag-seo': [
    T('doc', 'What an H1 is', 'The H1 names the main topic of the page.', [
      'Structure|A heading identifies content structure.',
      'Style vs structure|Styling and structure are different decisions.']),
    T('scale', 'H1 vs title tag', 'Two labels, two places.', [
      'H1|Appears within the page itself.',
      'Title tag|Appears in the browser tab and search results.',
      'Same or different|They can match or differ sensibly.',
      'Check the template|Check what your template actually publishes.']),
    C('H1 best practices', ['Describe the actual task', 'Use topic wording naturally', 'Keep one clear main heading in a simple template', 'Build a logical outline', 'Review the mobile appearance']),
    T('pencil', 'Examples', 'Three page types, three headings.', [
      'Service page|Name the service and who it is for.',
      'Practical guide|Say what the reader will be able to do.',
      'Comparison page|State what is being compared.']),
    T('warn', 'Common mistakes', 'Five ways an H1 goes wrong.', [
      'Choosing by size|Choosing a heading level for appearance.',
      'Copying|Copying the same H1 across unrelated pages.',
      'Overpromising|Making a promise the content cannot support.',
      'One tag only|Treating the tag as the whole SEO strategy.',
      'No review|Skipping the final page review.']),
  ],

  'how-to-find-keywords-for-seo': [
    S('people', 'Start with topics', 'Reader, problems, purpose.', [
      'Reader|Define the reader.',
      'Problems|List real problems.',
      'Purpose|Connect topics to the website’s purpose.']),
    S('spark', 'Generate ideas', 'Seeds, tools, coverage.', [
      'Seeds|Create a small seed list.',
      'Tool|Use the appropriate research tool.',
      'Coverage|Inspect existing coverage.']),
    S('gauge', 'Volume and difficulty', 'Both are estimates.', [
      'Volume|Treat volume as an estimate.',
      'Difficulty|Understand difficulty scores.',
      'Ads vs organic|Separate advertising metrics from organic decisions.']),
    S('search', 'Check the search results', 'Look at what already ranks.', [
      'Task and format|Identify the task and format.',
      'Contribution|Find a distinct contribution.',
      'Update or create|Decide whether to update or create.']),
    S('list', 'Build your keyword list', 'Group, record, prioritise.', [
      'Group|Group by the answer needed.',
      'Record|Record enough context.',
      'Prioritise|Prioritise a realistic publishing plan.']),
  ],

  'keyword-rank-checker-tools': [
    T('gauge', 'How rank tracking works', 'A position only means something with context.', [
      'Context|A position needs context.',
      'Tracker vs Search Console|They answer different questions.',
      'Outcomes|Visibility is not the same as a business outcome.']),
    T('compass', 'Five rank tools', 'Select a tool to see how to approach it.', [
      'Search Console|Start with evidence from your own site.',
      'Ahrefs Free Rank Checker|Use it for a spot check.',
      'Ahrefs Rank Tracker|Compare the tracking configuration.',
      'Semrush Position Tracking|Connect positions with investigation.',
      'Mangools SERPWatcher|Check the update interval.']),
    T('check', 'Free options', 'Start small and repeatable.', [
      'Small process|Start with a small repeatable process.',
      'Manual searches|Treat manual searches as observations.',
      'Free vs trial|Distinguish a free checker from a trial.']),
    C('What to track', ['Choose keywords tied to useful pages', 'Preserve the configuration', 'Group queries by task', 'Check whether the tool fits the brief', 'Track actions and outcomes alongside positions', 'Investigate patterns before rewriting pages']),
  ],

  'recommended-website-hosting': [
    T('server', 'Quick picks by site type', 'Start with the website, not the brand.', [
      'The website first|Decide what the site needs before you look at hosts.',
      'Shortlist|Compare a short shortlist side by side.']),
    T('check', 'How hosts are evaluated', 'Five tests for any recommendation.', [
      'Compatibility|Compatibility comes first.',
      'Recovery|Recovery matters alongside performance.',
      'Maintenance|Maintenance responsibilities must be explicit.',
      'Costs|Costs need a defined period.',
      'Limits|Recommendations need practical limits.']),
    T('compass', 'Five host reviews', 'Select a host to see what it suits.', [
      'Cloudflare Pages|A prepared static site.',
      'Hostinger|A small conventional website.',
      'DreamHost|A WordPress starting point.',
      'Kinsta|A managed WordPress operation.',
      'Shopify|A store built on its platform.']),
    S('tag', 'How much hosting costs', 'Build the budget in layers.', [
      'Subscription|Start with the full subscription payment.',
      'Services|Add the services your site actually needs.',
      'Recovery and time|Account for recovery and staff time.',
      'Decision record|Keep a short decision record.',
      'Live check|Review the live journey after setup.',
      'Next step|Choose a plan with an understood next step.']),
  ],

  'seo-audit-checklist': [
    S('list', 'What an audit covers', 'Scope first, then tools.', [
      'Define|Define what you are reviewing.',
      'Sample|Start with representative pages.',
      'Tools|Choose tools for specific questions.']),
    C('Technical checks', ['Check public access', 'Review indexing intent', 'Investigate accidental restrictions carefully', 'Check discovery and the sitemap', 'Review loading and mobile experience']),
    C('On-page checks', ['Review titles and headings together', 'Check descriptions and internal links', 'Inspect images and supporting material']),
    C('Content checks', ['Confirm the page answers the right question', 'Check facts, examples and ownership', 'Review overlap before creating more pages', 'Test the next step']),
    S('scale', 'Prioritising fixes', 'Rank, report, check, close.', [
      'Rank|Rank verified problems by consequence.',
      'Report|Create a usable audit report.',
      'Dependencies|Check dependencies before implementing.',
      'Close|Verify and close the loop.']),
  ],

  'seo-report-generator': [
    S('doc', 'What to include in a report', 'Five parts, in order.', [
      'Goal|Start with the website’s goal.',
      'Period|Define the period and scope.',
      'Visibility|Include search visibility and useful outcomes.',
      'Work done|Explain the work completed.',
      'Actions|End with actions and owners.']),
    T('compass', 'Four report generators', 'Select one to see where to begin.', [
      'Search Console|Begin with the source data.',
      'Google Data Studio|Build a reusable dashboard.',
      'Ahrefs Report Builder|Present the platform’s data.',
      'Semrush My Reports|Check the report tier.']),
    C('Check the report before sharing', ['Copy a monthly report structure', 'Explain rates without hiding the counts', 'Check the report before sharing', 'Keep the template small enough to use']),
    T('clock', 'How often to report', 'Four habits for a steady rhythm.', [
      'Decisions|Choose a rhythm around decisions.',
      'Consistency|Keep comparisons consistent.',
      'Actions|Review the actions, not just the charts.',
      'Automation|Automate carefully.']),
  ],

  'shared-hosting-explained': [
    T('server', 'What shared hosting is', 'Several accounts share one set of resources.', [
      'Shared infrastructure|Several accounts share the infrastructure.',
      'Account vs website|A hosting account is not the whole website.',
      'Compatibility|Start with compatibility.']),
    T('scale', 'Shared vs VPS vs cloud', 'Three words that describe different things.', [
      'Shared|Describes how resources are shared.',
      'VPS|A virtual server environment of your own.',
      'Cloud|A broader delivery model.']),
    T('check', 'Pros and cons', 'Two advantages, two limits.', [
      'Manageable start|Advantage: a manageable starting point.',
      'Focused budget|Advantage: you can focus the initial budget.',
      'Less control|Limitation: less control over the environment.',
      'Still maintained|Limitation: the site still needs maintenance.']),
    T('people', 'Who should use it', 'Three kinds of project.', [
      'Business information|A straightforward business information site.',
      'New blog|A new blog or modest publishing project.',
      'Special needs|A project with special operational requirements should look further.']),
    C('How to pick a plan', ['Ask specific questions', 'Compare the complete cost', 'Plan for the next change', 'Test the actual website']),
  ],

  'top-website-builders': [
    T('compass', 'Quick picks', 'Choose by the work you need to do.', [
      'The work|Choose by the work you need to do.',
      'Visitor action|Decide your primary visitor action.']),
    null,
    T('compass', 'Six builders at a glance', 'Select a builder to see how this guide frames it.', [
      'Wix|A starting point for a service business.',
      'Squarespace|Investigate it for presentation-led sites.',
      'Shopify|Choose around commerce operations.',
      'WordPress.com|A starting point for a publishing routine.',
      'Webflow|Assess layout needs and plan structure together.',
      'Framer|Consider it for a visual project.']),
    C('How to choose a builder', ['Compare the full first-year and renewal costs', 'Check what hosting includes', 'Try the work you will repeat', 'Make ownership and handover clear', 'Keep the first version focused']),
  ],

  'website-building-platforms': [
    T('scale', 'Builder vs CMS vs custom', 'Three routes, and they overlap.', [
      'Builder|Combines editing and publishing.',
      'CMS|Organises website content.',
      'Custom|An implementation route rather than a product type.',
      'Overlap|The categories overlap, so compare the working setup.']),
    null,
    T('pencil', 'Best for blogs', 'Prioritise the article workflow.', [
      'Workflow|Prioritise the article workflow.',
      'Hosted WordPress|Investigate it as a starting point.',
      'Self-hosting|Consider it when the responsibility fits.',
      'Custom|Use a custom content site when justified.']),
    T('cart', 'Best for small business', 'Match the platform to the work.', [
      'Services|Service businesses need a clear next action.',
      'Stores|Stores need an operational system.',
      'Specialised|Specialised workflows need a written brief.']),
    C('How to decide', ['Write a short website brief', 'Test the work you will repeat', 'Compare full costs and future changes', 'Define the handover before launch', 'Plan the next likely requirement', 'Choose a manageable first version']),
  ],

  'what-are-seo-keywords': [
    T('search', 'Four kinds of keyword', 'Select a type to see what it means.', [
      'Broad topic|A wide subject, such as a category of product or service.',
      'Branded|Includes a brand name, compared with non-branded searches.',
      'Service + place|A service combined with a location.',
      'Question|A full question someone types or speaks.']),
    T('scale', 'Long-tail vs short-tail', 'Length alone does not decide it.', [
      'Not just length|Length alone does not define the long tail.',
      'Specific wording|Specific wording can clarify the task.',
      'Group|Group related phrases by their answer.']),
    T('compass', 'Search intent', 'What does the person want to do?', [
      'Accomplish|Identify what the person wants to accomplish.',
      'Page format|Match the page format to the task.',
      'Example|Begin with one example and work outward.']),
    C('Where to place keywords', ['Use descriptive titles and headings', 'Answer the question early', 'Write useful descriptions and links', 'Avoid keyword stuffing', 'Turn the phrase into a short brief']),
  ],

  'wordpress-hosting-guide': [
    T('server', 'Types of WordPress hosting', 'Select a type to see what it means.', [
      'Self-hosted vs .com|Self-hosted WordPress and WordPress.com are different services.',
      'Shared|The entry route for many small sites.',
      'Managed|Hosting where the provider handles more of the WordPress care.',
      'VPS and others|More control, more responsibility.']),
    T('check', 'Features that matter', 'Six things worth checking.', [
      'Compatibility|Current software compatibility.',
      'Backups|Backups you can actually restore.',
      'Staging|A staging environment for testing changes.',
      'Support|Clear support boundaries.',
      'Maintenance|A maintenance process your team can follow.',
      'Limits|Resource limits and billing terms.']),
    T('compass', 'Three recommended hosts', 'Select a host to see what to compare.', [
      'DreamHost|Compare its entry and managed routes.',
      'SiteGround|Compare the tier-specific tools.',
      'Kinsta|Investigate a managed service for an important site.',
      'After the job|Choose the provider after defining the job.']),
    S('list', 'Setup checklist', 'Seven steps from accounts to maintenance.', [
      'Accounts|Decide who controls the accounts.',
      'Plan|Confirm the plan and complete budget.',
      'Install|Install or migrate WordPress.',
      'Review|Review settings and content.',
      'Backups|Check backup and staging access.',
      'Test|Test the live visitor journey.',
      'Maintain|Assign ongoing maintenance.']),
  ],

  'best-ai-rewriters': [
    T('pencil', 'What a rewriter does', 'Rewriting is not researching, and the size of the edit matters.', [
      'Not research|Rewriting changes wording. It does not check facts or find new information.',
      'Size of edit|Decide whether you need a single phrase, a sentence or a paragraph reworked.',
      'This comparison|It covers short, free rewriting; it does not rank long-form editing tools.']),
    T('compass', 'Four rewriters', 'Select a tool to see how this guide frames it.', [
      'Ahrefs|A practical starting point for one paragraph.',
      'Grammarly|Distinguish the free paraphrasing page from the wider product.',
      'QuillBot|Evaluate the controls and any access requirements.',
      'Wordtune|A researched option for occasional edits.']),
    S('check', 'How the comparison was run', 'One input, the same checks for each tool.', [
      'Input|Use one sample sentence and a defined set of checks.',
      'Ahrefs result|Check whether the meaning and the condition survived.',
      'Grammarly result|Compare the structure of the rewritten sentence.',
      'Other tools|Note what could not be established without signing in.',
      'Your own text|Repeat the check with your own material.']),
    C('Keep your voice', ['Define the edit before asking for it', 'Keep examples of language that sounds like you', 'Protect facts during every revision', 'Use rewriting to improve usefulness', 'Make acceptance a separate step', 'Choose a tool by the work it helps you finish']),
  ],

  'best-ai-writing-assistants': [
    T('compass', 'Quick picks by job', 'Select a job to see the tool this guide suggests evaluating.', [
      'Drafting|Evaluate Claude for drafting through conversation.',
      'Editing|Evaluate Grammarly for editing existing writing.',
      'Marketing work|Evaluate Jasper for organised marketing work.',
      'Rewriting|Evaluate Wordtune for occasional rewriting.',
      'One paragraph|Evaluate Ahrefs for a quick paragraph alternative.']),
    S('list', 'How the test was set up', 'What was and was not checked.', [
      'Checked|The guide records which settings and interfaces were viewed.',
      'Observed|It reports what the interfaces displayed, not writing quality.',
      'Limits|The comparison cannot establish which tool writes best.']),
    T('compass', 'Five reviews', 'Select a tool to see its angle.', [
      'Claude|A conversational candidate for developing a draft.',
      'Grammarly|Editing support around an existing message.',
      'Jasper|A marketing platform to justify against recurring work.',
      'Wordtune|Short edits within a documented allowance.',
      'Ahrefs|A focused alternative for one paragraph.']),
    S('scale', 'Which to choose', 'Three questions before you pay.', [
      'Work you do most|Choose by the work you do most often.',
      'Finished work|Compare finished work, not generation alone.',
      'Budget|Budget for the plan you actually need.']),
    C('Use AI without losing quality', ['Give the assistant a usable brief', 'Separate research from drafting', 'Edit for usefulness and voice', 'Keep responsibility for the final version']),
  ],

  'best-crm-for-small-businesses': [
    T('compass', 'Quick picks', 'Select a CRM to see who it suits.', [
      'HubSpot|An owner and one colleague: the free CRM covers up to two users and 1,000 contacts.',
      'Zoho CRM|Three people starting free: the Free Edition supports up to three users.',
      'Pipedrive|Managing sales opportunities in a defined pipeline.',
      'Less Annoying CRM|A simple subscription structure: one price per user after a 30-day trial.',
      'Salesforce Starter Suite|A broader suite, starting at US$25 per user per month.']),
    null,
    T('people', 'Five reviews', 'Select a CRM to see its angle.', [
      'HubSpot|A free starting point for a very small team.',
      'Zoho CRM|Free access for a three-person starting team.',
      'Pipedrive|A paid candidate for a defined sales process.',
      'Less Annoying CRM|Straightforward paid pricing.',
      'Salesforce Starter Suite|Evaluate the customer handoff.']),
    S('list', 'How to choose', 'From the work you need to improve to the final choice.', [
      'The work|Start with the work you need to improve.',
      'Two finalists|Use the same evaluation for two finalists.',
      'Full cost|Check the complete cost.',
      'Connections|Review website, email and accounting connections.',
      'Data and launch|Plan data ownership and a small launch.',
      'Decide|Make the final choice.']),
  ],

  'best-crm-for-startups': [
    T('people', 'What startups need', 'Three things a first CRM should give you.', [
      'Conversations|A place for customer conversations.',
      'A changing process|A process that can change as you learn.',
      'Budget and exit|A realistic budget and a route out if it stops fitting.']),
    T('compass', 'Five top picks', 'Select a CRM to see who it is for.', [
      'HubSpot|A founder and one colleague starting free.',
      'Zoho CRM|Three people starting with a shared process.',
      'Bigin|A solo founder: Free covers one user and 500 records, with a low-cost upgrade.',
      'Pipedrive|A startup building a repeatable sales process.',
      'Less Annoying CRM|Predictable monthly subscription pricing after a 30-day trial.']),
    T('warn', 'Free plan limits', 'Read the limits before you pick.', [
      'Users|User allowances can decide the shortlist immediately.',
      'Contacts vs records|Contacts and records are different measurements.',
      'Trial vs free|A trial may show more than the free plan keeps.',
      'Admin and integrations|Integration and administration requirements still matter.']),
    S('chart', 'When to upgrade', 'Three signals, in order of importance.', [
      'A blocked task|A specific limitation blocks useful work.',
      'Full cost fits|The full cost fits your next stage.',
      'Process adopted|The team has adopted the basic process.']),
  ],

  'best-email-marketing-software': [
    T('compass', 'Quick picks', 'Select a platform to see what it suits.', [
      'MailerLite|A small newsletter: Free covers up to 250 subscribers and 2,500 monthly emails.',
      'Brevo|Modest daily sending: Free includes 300 emails a day.',
      'Mailchimp|A compact starting campaign: Free covers 250 contacts and 500 monthly sends.',
      'Klaviyo|Store-connected automation: Free email covers 250 active profiles and 500 sends a month.']),
    null,
    T('search', 'Four reviews', 'Select a platform to see how to evaluate it.', [
      'MailerLite|Evaluate it for a small, regular newsletter.',
      'Brevo|Evaluate the daily allowance against your schedule.',
      'Mailchimp|Assess the exact starting workload.',
      'Klaviyo|Evaluate customer journeys alongside the store connection.']),
    S('list', 'How to choose', 'Nine steps from the email job to the decision.', [
      'The job|Define the email job first.',
      'Counts|Calculate contacts and sends separately.',
      'One workflow|Test one complete workflow.',
      'Connections|Check the tools you need to connect.',
      'Automation map|Map an automation before enabling it.',
      'Honest trial|Judge the evaluation honestly.',
      'Support|Review support and day-to-day ownership.',
      'Growth costs|Compare growth costs before migrating.',
      'Decide|Make the final decision.']),
  ],

  'crm-examples': [
    T('people', 'Everyday CRM use', 'Select a situation to see how a CRM helps.', [
      'An enquiry|Record the enquiry and assign it to someone.',
      'After a proposal|Set a follow-up so the proposal does not go quiet.',
      'A handoff|Pass the history to a colleague without retelling it.',
      'Agency example|A documented example of agency follow-ups.']),
    T('compass', 'Software examples', 'Select a CRM to see a typical use.', [
      'HubSpot|Contacts, deals and tasks.',
      'Zoho CRM|Leads, follow-ups and reports.',
      'Pipedrive|Moving from a lead to a deal.',
      'Salesforce Starter Suite|Connected customer activities.']),
    T('cart', 'Examples by industry', 'Select an industry to see the workflow.', [
      'Home services|Enquiry to scheduled work.',
      'Professional services|Proposal to project handoff.',
      'Retail or wholesale|Repeat orders.',
      'Membership|Enquiry to joining.']),
    S('check', 'Next steps', 'Start small and review.', [
      'One workflow|Choose one workflow to improve.',
      'Fictional records|Evaluate with fictional records first.',
      'Review|Review the process after launch.']),
  ],

  'how-to-plan-email-marketing-campaign': [
    S('gauge', 'Set a goal', 'Outcome, brief, measure.', [
      'Outcome|Choose the outcome you want from the campaign.',
      'Brief|Create a short brief for the email.',
      'Measure|Define how you will measure it before you send.']),
    S('people', 'Build the list', 'Right people, clear expectations.', [
      'Who|Choose people who should receive the message.',
      'Signup promise|Make signup expectations clear.',
      'Limits|Check the audience and plan limits.']),
    S('pencil', 'Write the email', 'Accurate subject, useful lead, matching page.', [
      'Subject|Write an accurate subject line.',
      'Lead|Lead with the useful information.',
      'Destination|Match the destination page to the email.']),
    C('Send and test', ['Prepare the response as well as the send', 'Finish sender setup', 'Complete a pre-send check', 'Plan a focused comparison']),
    S('chart', 'Measure results', 'Outcome first, then the details.', [
      'Primary outcome|Review the primary outcome first.',
      'Check the maths|Check calculations and attribution.',
      'Feedback|Read customer feedback alongside the numbers.',
      'Improve|Record one useful improvement.']),
  ],

  'how-to-use-ai-in-marketing': [
    S('spark', 'Where AI helps', 'Start with a brief and a small pilot.', [
      'Create vs automate|Separate creating from automating.',
      'Brief|Create a brief before choosing a tool.',
      'Pilot|Start with a manageable pilot.']),
    T('pencil', 'Content uses', 'Select a use to see the safe approach.', [
      'Outlines|Turn customer questions into a useful outline.',
      'Drafts|Draft from an approved fact sheet.',
      'Repurpose|Repurpose an approved article.',
      'SEO|Keep SEO focused on the reader.']),
    T('compass', 'Email and ads', 'Select a task to see the guardrail.', [
      'Emails|Draft emails around one clear action.',
      'Variations|Use variations to test a specific idea.',
      'Ad copy|Prepare ad copy with explicit boundaries.',
      'Visuals|Review generated visuals and automated decisions.']),
    S('chart', 'Reporting', 'Question, check, action.', [
      'Question|Start with a question and a defined dataset.',
      'Check the maths|Use a small example to check the arithmetic.',
      'Actions|Turn the summary into a short action list.',
      'Approval|Keep interpretation separate from approval.']),
    T('warn', 'Mistakes to avoid', 'Five common errors.', [
      'No context|Asking for strategy without business context.',
      'Unchecked claims|Publishing claims you have not checked.',
      'No owner|Automating a process nobody owns.',
      'Too many changes|Changing too many things at once.',
      'Volume over value|Choosing volume over useful results.']),
  ],

  'online-marketing-tools': [
    T('compass', 'Tools by channel', 'Select a channel to see the tool this guide covers.', [
      'Search|Google Search Console.',
      'Local discovery|Google Business Profile.',
      'Email|Brevo: the free plan includes 300 email sends per day.',
      'Social|Buffer: Free supports up to three channels and 10 scheduled posts per channel.',
      'Creative|Canva.',
      'Measurement|Google Analytics.',
      'Enquiries|HubSpot CRM: free for up to two users and 1,000 contacts.']),
    T('scale', 'Free vs paid', 'Three rules for weighing cost.', [
      'Right units|Compare allowances in the right units: sends, contacts, users.',
      'Hidden work|Include setup and maintenance in the cost.',
      'Defined need|Upgrade for a defined requirement, not a hunch.']),
    S('list', 'Build a starter stack', 'Add one thing at a time.', [
      'Journey|Begin with the customer journey.',
      'One channel|Add one active communication channel.',
      'Measure and records|Add measurement and shared records deliberately.',
      'Acceptance check|Run a small acceptance check.',
      'Routine|Establish a repeatable review routine.']),
  ],

  'what-does-crm-mean': [
    T('people', 'What CRM means', 'An approach and the software that supports it.', [
      'The approach|Customer relationship management is how you keep track of and look after customers.',
      'The software|A CRM system stores that information so a team can use it.']),
    T('check', 'What a CRM does', 'Three everyday jobs.', [
      'Organises|Organises people and conversations in one place.',
      'Tracks sales|Tracks potential sales through stages.',
      'Next action|Makes the next action clear.']),
    T('compass', 'Types of CRM', 'Select a type to see what it focuses on.', [
      'Operational|Supports everyday sales, service and marketing tasks.',
      'Analytical|Looks at customer data to find patterns.',
      'Collaborative|Shares customer information across teams.',
      'Strategic and hosting|Strategy and hosting choices sit alongside the types.']),
    T('scale', 'Who needs one', 'Three situations.', [
      'Lost follow-ups|Businesses losing track of follow-ups.',
      'Handoffs|Teams handing customers between people.',
      'Maybe not yet|When a spreadsheet may be enough.']),
    S('list', 'How to start', 'Small, then reviewed.', [
      'Outcome|Define one useful outcome.',
      'Records|Prepare a small set of records.',
      'Compare|Compare tools against your workflow.',
      'Review|Review the habit, not just the setup.']),
  ],
};
