'use client';

import { useState } from 'react';

/* ============================================================
   EDIT YOUR DETAILS HERE — everything below reads from these.
   ============================================================ */

const PROFILE = {
  name: 'Your Name',
  title: 'AI Builder & Full-Stack Developer',
  location: 'Faisalabad, Pakistan',
  email: 'your-email@gmail.com',
  whatsapp: '923001234567', // 92 + number without the leading 0
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-handle',
  twitter: 'https://twitter.com/your-handle',
  instagram: 'https://instagram.com/your-handle',
  intro:
    'I build AI-powered web applications with Next.js, TypeScript and modern AI APIs — and teach others to do the same at Dollar Tech.',
};

const ABOUT = [
  'I run Dollar Tech, where I teach freelancing, AI-assisted "vibe coding", and digital marketing to Pakistani students. I direct AI tools like Claude and Cline to ship real production apps.',
  'Beyond code, I run Meta ad campaigns, manage Shopify stores, and build content websites. The future belongs to builders who combine business thinking with modern AI tools.',
];

const FACTS: [string, string][] = [
  ['📍 Location', PROFILE.location],
  ['💼 Open to', 'Freelance & Full-time'],
  ['🗣️ Languages', 'English, Urdu'],
  ['⚡ Interests', 'AI, SaaS, Teaching'],
];

type Project = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  links: { label: string; href: string; primary?: boolean }[];
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: '🤖 myai — My Own ChatGPT',
    summary: 'Self-hosted AI chat app with a 4-route smart classifier',
    description:
      'Routes each question to the best pipeline: direct DeepSeek V3 answers, live web search via Tavily, deep research with page scraping, or step-by-step reasoning with DeepSeek R1. Streaming responses, Supabase caching, auto-deployed on Vercel.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'DeepSeek', 'Tavily', 'Vercel AI SDK', 'Supabase'],
    links: [
      { label: 'Live Demo', href: 'https://your-live-url.vercel.app', primary: true },
      { label: 'GitHub', href: 'https://github.com/your-username/myai' },
    ],
    featured: true,
  },
  {
    title: '🛍️ Shopify Store Management',
    summary: 'E-commerce for the Pakistani COD market',
    description:
      'Set up and ran Shopify stores end to end: product listings, Meta ad campaigns, and conversion optimisation for cash-on-delivery customers.',
    tags: ['Shopify', 'Meta Ads', 'Google Analytics', 'COD'],
    links: [{ label: 'Case Study', href: '#' }],
  },
  {
    title: '📝 Content Websites',
    summary: 'SEO-driven niche sites',
    description:
      'Built and grew content websites in travel, lifestyle and tech niches with an SEO-first content strategy and ad monetisation.',
    tags: ['WordPress', 'SEO', 'Content Strategy'],
    links: [{ label: 'View Sites', href: '#' }],
  },
];

const SKILLS = [
  {
    title: '💻 Development',
    items: ['TypeScript / JavaScript', 'Next.js / React', 'Tailwind CSS', 'Node.js', 'Git / GitHub', 'Vercel'],
  },
  {
    title: '🤖 AI & Vibe Coding',
    items: ['Claude / DeepSeek / Gemini', 'Claude Code & Cline', 'Vercel AI SDK', 'Tavily search', 'Supabase', 'Prompt engineering'],
  },
  {
    title: '📈 Marketing & Business',
    items: ['Meta Ads', 'Shopify', 'WordPress & SEO', 'Content monetisation', 'Google Analytics', 'Teaching & mentoring'],
  },
];

const SERVICES = [
  { icon: '🤖', title: 'Custom AI Chat Apps', text: 'Branded AI chat apps for your business with your own domain and knowledge base. From $200.' },
  { icon: '🌐', title: 'Website Development', text: 'Fast, responsive, SEO-ready websites on Next.js + Tailwind, deployed to Vercel. From $150.' },
  { icon: '📣', title: 'Meta Ads Management', text: 'Facebook & Instagram campaigns for e-commerce and lead generation. Retainers from $300/mo.' },
  { icon: '🎓', title: 'AI Coding Mentorship', text: 'One-on-one lessons in vibe coding, AI integrations and shipping real products.' },
];

const SECTIONS = ['About', 'Projects', 'Skills', 'Services', 'Contact'];

/* ============================================================ */

const card = 'bg-neutral-900 border border-neutral-800 rounded-xl p-6';

function SectionHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold mb-12">
      <span className="text-blue-500 font-mono">{String(n).padStart(2, '0')}.</span> {children}
    </h2>
  );
}

function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a href={href} className={className} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  );
}

export default function Portfolio() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const firstName = PROFILE.name.split(' ')[0];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-neutral-950/80 backdrop-blur-lg z-50 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold">
            <span className="text-blue-500">&lt;</span>
            {firstName}
            <span className="text-blue-500">/&gt;</span>
          </a>
          <div className="hidden md:flex gap-8 text-sm text-neutral-400">
            {SECTIONS.map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition">
                {s}
              </a>
            ))}
          </div>
          <a href="#contact" className="md:hidden text-sm px-3 py-1.5 bg-blue-600 rounded-lg">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-5xl mx-auto w-full">
          <p className="text-blue-500 font-mono mb-4">👋 Hi, I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            {PROFILE.name}
          </h1>
          <p className="text-2xl md:text-4xl font-semibold text-neutral-400 mb-8">{PROFILE.title}</p>
          <p className="text-lg text-neutral-500 max-w-2xl mb-10 leading-relaxed">
            {PROFILE.intro} Based in {PROFILE.location}.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition font-medium">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeading n={1}>About Me</SectionHeading>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-neutral-400 leading-relaxed">
              {ABOUT.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className={card}>
              <h3 className="font-semibold mb-4 text-blue-500">Quick Facts</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                {FACTS.map(([label, value]) => (
                  <li key={label} className="flex justify-between gap-4">
                    <span>{label}</span>
                    <span className="text-white text-right">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeading n={2}>Featured Projects</SectionHeading>
          <div className="space-y-6">
            {PROJECTS.map((p) => (
              <article key={p.title} className={`${card} hover:border-blue-500 transition`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{p.title}</h3>
                      {p.featured && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Featured</span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm">{p.summary}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.links.map((l) => (
                      <ExternalLink
                        key={l.label}
                        href={l.href}
                        className={
                          l.primary
                            ? 'text-xs px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition'
                            : 'text-xs px-3 py-1 border border-neutral-700 rounded hover:bg-neutral-800 transition'
                        }
                      >
                        {l.label}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeading n={3}>Skills &amp; Tools</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((group) => (
              <div key={group.title} className={card}>
                <h3 className="font-semibold mb-4 text-blue-500">{group.title}</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto">
          <SectionHeading n={4}>Services I Offer</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className={card}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-blue-500 font-mono">05.</span> Let&apos;s Build Together
          </h2>
          <p className="text-neutral-400 mb-10 text-lg">
            Need an AI app, a website, or marketing help? I reply within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button onClick={copyEmail} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium">
              {copied ? '✓ Email Copied!' : '📧 Copy Email'}
            </button>
            <ExternalLink
              href={`https://wa.me/${PROFILE.whatsapp}`}
              className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition font-medium"
            >
              💬 WhatsApp Me
            </ExternalLink>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-neutral-400">
            {[
              ['LinkedIn', PROFILE.linkedin],
              ['GitHub', PROFILE.github],
              ['Twitter', PROFILE.twitter],
              ['Instagram', PROFILE.instagram],
            ].map(([label, href]) => (
              <ExternalLink key={label} href={href} className="hover:text-white transition">
                {label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-neutral-800 text-center text-sm text-neutral-500">
        <p>Built with Next.js + Tailwind by {PROFILE.name}</p>
        <p className="mt-2">© 2026 All rights reserved.</p>
      </footer>
    </main>
  );
}
