import { ArrowUp, Mail } from 'lucide-react'
import { useState } from 'react'
import { navLinks, profile, social } from '../../data/portfolio'
import { scrollToId } from '../../lib/utils'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'

export function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  const socials = [
    { href: `mailto:${social.email}`, label: 'Email', Icon: Mail },
    { href: social.github, label: 'GitHub', Icon: GithubIcon },
    { href: social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent"
      />
      <div className="container-shell pb-10 pt-14 sm:pt-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="max-w-sm">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                scrollToId('#home')
              }}
              className="focus-ring inline-flex items-baseline gap-1 font-display text-4xl font-bold tracking-tight text-ink"
            >
              {profile.logo}
              <span className="h-2 w-2 rounded-full bg-cyan" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              AI developer, full-stack engineer, and ECE student building at
              the intersection of intelligence, software, and hardware.
            </p>
            <a
              href={`mailto:${social.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-line underline-offset-4 transition hover:text-purple hover:decoration-purple/40"
            >
              <Mail size={14} />
              {social.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60">
                Navigate
              </p>
              <nav className="mt-4 flex flex-col gap-2.5" aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToId(link.href)
                    }}
                    className="w-fit text-sm text-muted transition hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60">
                Connect
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-sm text-muted transition hover:text-ink"
                >
                  GitHub
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-sm text-muted transition hover:text-ink"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${social.email}`}
                  className="w-fit text-sm text-muted transition hover:text-ink"
                >
                  Email
                </a>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60">
                Currently
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm text-muted">{profile.status}</span>
              </div>
              <p className="mt-3 max-w-[13rem] text-xs leading-relaxed text-muted/60">
                {profile.availabilityNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-xs text-muted">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted/60">
              Designed &amp; Developed by {profile.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-purple/30 hover:text-purple"
              >
                <Icon size={14} />
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToId('#home')}
              className="focus-ring ml-1 inline-flex h-9 items-center gap-2 rounded-full border border-line bg-white px-3 text-[10px] font-medium text-ink transition hover:border-purple/30 hover:text-purple"
              aria-label="Back to top"
            >
              Top
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
