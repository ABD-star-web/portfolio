import ChatWidget from '@/components/ChatWidget';
import CopyEmailButton from '@/components/CopyEmailButton';
import Hero3DLazy from '@/components/Hero3DLazy';
import { ABOUT, FACTS, PROFILE, PROJECTS, SERVICES, SKILLS, SOCIALS } from '@/lib/profile';

// To change any text on the page, edit lib/profile.ts

const SECTIONS = ['About', 'Projects', 'Skills', 'Services', 'Contact'];
const card = 'bg-neutral-900/60 backdrop-blur border border-neutral-800 rounded-xl p-6';

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
  const firstName = PROFILE.name.split(' ')[0];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-neutral-950/70 backdrop-blur-lg z-40 border-b border-neutral-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold">
            {firstName}
            <span className="text-blue-500">.</span>
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

      {/* Hero with 3D scene */}
      <section className="relative min-h-screen flex items-center px-6 pt-20">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(37,99,235,0.18),transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="order-2 md:order-1 min-w-0">
            <p className="text-blue-500 font-mono mb-4">👋 Hi, I&apos;m</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
              {PROFILE.name}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-neutral-400 mb-6">{PROFILE.title}</p>
            <p className="text-lg text-neutral-500 max-w-xl mb-10 leading-relaxed">
              {PROFILE.intro} Based in {PROFILE.location}.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium">
                View My Work
              </a>
              {PROFILE.chatUrl ? (
                <ExternalLink
                  href={PROFILE.chatUrl}
                  className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition font-medium"
                >
                  🤖 Try my AI
                </ExternalLink>
              ) : (
                <a href="#contact" className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition font-medium">
                  Get In Touch
                </a>
              )}
            </div>
          </div>

          <div className="order-1 md:order-2 min-w-0 h-[320px] md:h-[520px]">
            <Hero3DLazy />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto">
          <SectionHeading n={2}>Featured Projects</SectionHeading>
          <div className="space-y-6">
            {PROJECTS.map((p) => ({ ...p, links: p.links.filter((l) => l.href) })).map((p) => (
              <article
                key={p.title}
                className={`${card} transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-600/10`}
              >
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
                  {p.links.length > 0 && (
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
                  )}
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
        <div className="max-w-6xl mx-auto">
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
        <div className="max-w-6xl mx-auto">
          <SectionHeading n={4}>Services I Offer</SectionHeading>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className={`${card} transition duration-300 hover:-translate-y-1 hover:border-blue-500`}>
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
          <SectionHeading n={5}>Let&apos;s Work Together</SectionHeading>
          <p className="text-neutral-400 -mt-6 mb-10 text-lg">
            Need an AI app, a website, or marketing help? I reply within 24 hours, or you can ask my AI right now (bottom right).
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <CopyEmailButton email={PROFILE.email} />
            <ExternalLink
              href={`https://wa.me/${PROFILE.whatsapp}`}
              className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-900 transition font-medium"
            >
              💬 WhatsApp Me
            </ExternalLink>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-neutral-400">
            {SOCIALS.map(([label, href]) => (
              <ExternalLink key={label} href={href} className="hover:text-white transition">
                {label}
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-neutral-800 text-center text-sm text-neutral-500">
        <p>Built through vibe coding with Next.js, Three.js and Tailwind by {PROFILE.name}</p>
        <p className="mt-2">© 2026 All rights reserved.</p>
      </footer>

      <ChatWidget />
    </main>
  );
}
