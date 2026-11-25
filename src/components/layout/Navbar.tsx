import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile, social } from '../../data/portfolio'
import { cn, scrollToId } from '../../lib/utils'
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.2, 0.5] },
    )
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    scrollToId(href)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500">
        <div className="container-shell">
          <div
            className={cn(
              'mt-3 flex items-center justify-between rounded-full border border-transparent px-2 py-2 transition-all duration-500 sm:mt-4',
              scrolled &&
                'glass-nav mt-2 border-white/70 px-3 shadow-lift sm:mt-3 sm:px-4',
            )}
          >
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                go('#home')
              }}
              className="focus-ring group flex items-center gap-2.5 rounded-full px-2 py-1"
              aria-label="Vishnu K — back to top"
            >
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-ink text-[9px] font-bold tracking-tight text-white">
                <span className="absolute inset-0 bg-gradient-to-br from-purple via-blue to-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">VK</span>
              </span>
              <span className="font-display text-[17px] font-bold tracking-tight text-ink">
                VK<span className="text-purple">.</span>
              </span>
            </a>

            <nav
              className="hidden items-center gap-0.5 lg:flex"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active === link.href ? 'page' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    go(link.href)
                  }}
                  className={cn(
                    'focus-ring relative rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300',
                    active === link.href
                      ? 'text-ink'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  {link.label}
                  {active === link.href ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-purple via-blue to-cyan"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  ) : null}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={profile.resumeUrl}
                download
                className="focus-ring hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[12px] font-medium text-white shadow-soft transition-all duration-300 hover:bg-purple hover:shadow-glow sm:inline-flex"
              >
                <Download size={13} />
                Download Resume
              </a>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 text-xs font-medium text-ink backdrop-blur transition hover:border-purple/30 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-navigation"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X size={15} /> : <Menu size={15} />}
                <span>{open ? 'Close' : 'Menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-canvas/96 px-5 pb-8 pt-24 backdrop-blur-xl sm:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
            <nav
              className="relative flex flex-col border-t border-line"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    go(link.href)
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + index * 0.045,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between border-b border-line py-5"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-muted">
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        'font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl',
                        active === link.href ? 'text-purple' : 'text-ink',
                      )}
                    >
                      {link.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple"
                  />
                </motion.a>
              ))}
            </nav>

            <div className="relative mt-auto flex flex-col gap-5 pt-10">
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-white"
              >
                <Download size={15} />
                Download Resume
              </a>
              <div className="flex items-center justify-between border-t border-line pt-5">
                <a
                  href={`mailto:${social.email}`}
                  className="text-sm text-muted hover:text-ink"
                >
                  {social.email}
                </a>
                <div className="flex gap-2">
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-muted"
                  >
                    <GithubIcon size={15} />
                  </a>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-muted"
                  >
                    <LinkedinIcon size={15} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
