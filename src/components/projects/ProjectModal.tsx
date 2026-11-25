import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Mail, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { social, type Project } from '../../data/portfolio'
import { GithubIcon } from '../ui/SocialIcons'
import { ProjectVisual } from './ProjectVisual'

type Props = {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!project) return

    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [project, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/30 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white bg-white shadow-2xl sm:rounded-[2rem]"
            initial={{ opacity: 0, y: 36, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="focus-ring absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-ink shadow-soft backdrop-blur transition hover:bg-white"
              aria-label="Close project details"
            >
              <X size={17} />
            </button>

            <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-canvas sm:aspect-[16/8]">
              <ProjectVisual visual={project.visual} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 md:p-10">
              <p className="eyebrow">Project overview</p>
              <h3
                id="project-modal-title"
                className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                {project.title}
              </h3>
              {project.fullName ? (
                <p className="mt-1 text-sm text-muted">{project.fullName}</p>
              ) : null}

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {project.description}
              </p>

              <div className="mt-7">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                  Built with
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-muted"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                {project.links.live ? (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple"
                  >
                    Live demo
                    <ArrowUpRight size={14} />
                  </a>
                ) : null}
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink transition hover:border-purple/30"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                ) : null}
                <a
                  href={`mailto:${social.email}?subject=${encodeURIComponent(
                    `Question about ${project.title}`,
                  )}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink transition hover:border-purple/30"
                >
                  <Mail size={14} />
                  Ask about this project
                </a>
                {!project.links.live && !project.links.github ? (
                  <p className="w-full text-xs leading-relaxed text-muted/70 sm:w-auto">
                    Public demo and repository links are not available yet.
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
