/* ============================================================
   EDIT YOUR DETAILS HERE.
   The page AND the "Ask my AI" chat both read from this file,
   so the AI always knows the same facts the site shows.
   Leave a link as '' to hide it on the site.
   ============================================================ */

export const PROFILE = {
  name: 'Fiza Munir',
  title: 'College Student & AI Enthusiast',
  location: 'Faisalabad, Pakistan',
  email: 'mnifxza@gmail.com',
  whatsapp: '923703964600', // 92 + number without the leading 0
  github: 'https://github.com/ABD-star-web',
  linkedin: '',
  twitter: '',
  instagram: '',
  chatUrl: '', // full myai app, e.g. 'https://chat.yourdomain.com' once it's live
  intro:
    'I build AI-powered web apps through vibe coding: I describe what I want, and AI tools like Claude and Cline help me write the code.',
};

export const ABOUT = [
  "I'm a college student who loves AI. Instead of spending years learning to code line by line, I build real apps through vibe coding: I plan the idea, guide AI tools like Claude and Cline, and test until it works.",
  'This website and my own ChatGPT-style app, myai, were both built that way. Beyond code, I explore Meta ads, Shopify stores and content websites, because I believe the future belongs to people who combine business thinking with modern AI tools.',
];

export const FACTS: [string, string][] = [
  ['📍 Location', PROFILE.location],
  ['🎓 Education', 'College Student'],
  ['💼 Open to', 'Freelance & Internships'],
  ['🗣️ Languages', 'English, Urdu'],
  ['⚡ Interests', 'AI, Vibe Coding, SaaS'],
];

export type Project = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  links: { label: string; href: string; primary?: boolean }[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: '🤖 myai: My Own ChatGPT',
    summary: 'AI chat app with a 4-route smart classifier, built through vibe coding',
    description:
      'Routes each question to the best pipeline: direct DeepSeek answers, live web search via Tavily, deep research with page scraping, or step-by-step reasoning. Streaming responses, chat history in Supabase, deployed on Vercel.',
    tags: ['Vibe Coding', 'Next.js', 'TypeScript', 'DeepSeek', 'Tavily', 'Vercel AI SDK', 'Supabase'],
    links: [
      { label: 'Try it', href: PROFILE.chatUrl, primary: true },
      { label: 'GitHub', href: 'https://github.com/ABD-star-web/myai' },
    ],
    featured: true,
  },
  {
    title: '🌐 This 3D Portfolio',
    summary: 'Interactive 3D website with its own AI assistant, built through vibe coding',
    description:
      'A 3D hero scene made with Three.js, plus an "Ask my AI" chat bubble that answers questions about me using DeepSeek. Built with Next.js and Tailwind, deployed on Vercel.',
    tags: ['Vibe Coding', 'Next.js', 'Three.js', 'React Three Fiber', 'DeepSeek', 'Tailwind'],
    links: [{ label: 'GitHub', href: 'https://github.com/ABD-star-web/portfolio' }],
  },
  {
    title: '🛍️ Shopify Store Management',
    summary: 'E-commerce for the Pakistani COD market',
    description:
      'Set up and ran Shopify stores end to end: product listings, Meta ad campaigns, and conversion optimisation for cash-on-delivery customers.',
    tags: ['Shopify', 'Meta Ads', 'Google Analytics', 'COD'],
    links: [],
  },
];

export const SKILLS = [
  {
    title: '🤖 AI & Vibe Coding',
    items: ['Claude / DeepSeek / Gemini', 'Claude Code & Cline', 'Prompt engineering', 'Vercel AI SDK', 'Tavily search', 'Supabase'],
  },
  {
    title: '💻 Web Tech I Build With',
    items: ['Next.js / React', 'TypeScript', 'Three.js / React Three Fiber', 'Tailwind CSS', 'Git / GitHub', 'Vercel'],
  },
  {
    title: '📈 Marketing & Business',
    items: ['Meta Ads', 'Shopify', 'WordPress & SEO', 'Content websites', 'Google Analytics'],
  },
];

export const SERVICES = [
  { icon: '🤖', title: 'Custom AI Chat Apps', text: 'Branded AI chat apps for your business with your own domain and knowledge base. From $200.' },
  { icon: '🌐', title: 'Website Development', text: 'Fast, responsive, SEO-ready websites on Next.js + Tailwind, deployed to Vercel. From $150.' },
  { icon: '📣', title: 'Meta Ads Management', text: 'Facebook & Instagram campaigns for e-commerce and lead generation. Retainers from $300/mo.' },
];

/** Social links that are filled in (empty ones are hidden). */
export const SOCIALS = (
  [
    ['GitHub', PROFILE.github],
    ['LinkedIn', PROFILE.linkedin],
    ['Twitter', PROFILE.twitter],
    ['Instagram', PROFILE.instagram],
  ] as const
).filter(([, href]) => href);

/** Everything above, as plain text, for the AI's instructions. */
export function profileAsText() {
  return [
    `Name: ${PROFILE.name}`,
    `Title: ${PROFILE.title}`,
    `Location: ${PROFILE.location}`,
    `Intro: ${PROFILE.intro}`,
    `About: ${ABOUT.join(' ')}`,
    `Facts: ${FACTS.map(([k, v]) => `${k.replace(/^\S+\s/, '')}: ${v}`).join('; ')}`,
    `Projects:\n${PROJECTS.map((p) => `- ${p.title.replace(/^\S+\s/, '')}: ${p.description} (${p.tags.join(', ')})`).join('\n')}`,
    `Skills:\n${SKILLS.map((s) => `- ${s.title.replace(/^\S+\s/, '')}: ${s.items.join(', ')}`).join('\n')}`,
    `Services:\n${SERVICES.map((s) => `- ${s.title}: ${s.text}`).join('\n')}`,
    `Contact: email ${PROFILE.email}, WhatsApp +${PROFILE.whatsapp}${SOCIALS.map(([k, v]) => `, ${k} ${v}`).join('')}`,
  ].join('\n');
}
