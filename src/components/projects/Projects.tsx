import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import {
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
} from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'
import { GithubIcon } from '../ui/SocialIcons'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'
import { ProjectModal } from './ProjectModal'
import { ProjectVisual } from './ProjectVisual'

export function Projects() {
  const reduced = usePrefersReducedMotion()
  const [filter, setFilter] = useState<(typeof projectFilters)[number]['id']>('all')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const visible = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((project) =>
      project.categories.includes(filter as ProjectCategory),
    )
  }, [filter])

  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <section id="projects" className="section-shell relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-purple/[0.035] blur-[110px]"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="03"
          eyebrow="Projects"
          title="Things I've Built."
          description="Selected work across AI platforms, web systems, and embedded hardware. Open any project for a closer look — external links appear only when a real URL is configured."
          aside={`${String(projects.length).padStart(2, '0')} selected projects`}
        />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {projectFilters.map((item) => {
              const count =
                item.id === 'all'
                  ? projects.length
                  : projects.filter((project) =>
                      project.categories.includes(item.id as ProjectCategory),
                    ).length

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                  className={cn(
                    'focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition duration-300',
                    filter === item.id
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-white text-muted hover:border-purple/30 hover:text-ink',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'font-mono text-[9px]',
                      filter === item.id ? 'text-white/50' : 'text-muted/60',
                    )}
                  >
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/60">
            Showing {String(visible.length).padStart(2, '0')} /{' '}
            {String(projects.length).padStart(2, '0')}
          </p>
        </div>

        <motion.div layout className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const featured = index === 0
              const projectNumber = projects.findIndex(
                (item) => item.id === project.id,
              )
              const hasLinks = Boolean(
                project.links.live || project.links.github,
              )

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(featured && 'lg:col-span-2')}
                >
                  <TiltCard className="group h-full" maxTilt={featured ? 2.5 : 4}>
                    <div
                      className={cn(
                        'h-full overflow-hidden rounded-[1.8rem] border border-line bg-white shadow-soft transition duration-500 hover:shadow-lift',
                        featured && 'lg:grid lg:grid-cols-[1.08fr_0.92fr]',
                      )}
                    >
                      <div
                        className={cn(
                          'relative overflow-hidden border-b border-line/80 bg-gradient-to-br',
                          project.gradient,
                          featured
                            ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[410px] lg:border-b-0 lg:border-r'
                            : 'aspect-[16/10]',
                        )}
                      >
                        <div className="absolute inset-0 transition duration-700 ease-out group-hover:scale-[1.035]">
                          <ProjectVisual visual={project.visual} />
                        </div>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/[0.06] via-transparent to-white/[0.08] opacity-0 transition duration-500 group-hover:opacity-100"
                        />

                        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                          <Layers3 size={10} />
                          {String(projectNumber + 1).padStart(2, '0')}
                        </span>
                        {featured ? (
                          <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white">
                            Featured
                          </span>
                        ) : null}
                      </div>

                      <div
                        className={cn(
                          'flex flex-col p-6 md:p-7',
                          featured && 'lg:justify-center lg:p-9',
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                              {project.title}
                            </h3>
                            {project.fullName ? (
                              <p className="mt-1 text-xs leading-relaxed text-muted">
                                {project.fullName}
                              </p>
                            ) : null}
                          </div>
                          <span className="mt-1 hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-muted/50 sm:block">
                            {project.categories.includes('ai')
                              ? 'AI'
                              : project.categories.includes('iot')
                                ? 'IOT'
                                : 'WEB'}
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {project.description}
                        </p>

                        <ul className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <li
                              key={technology}
                              className="rounded-full border border-line bg-canvas px-3 py-1 text-[11px] text-muted"
                            >
                              {technology}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                          <button
                            type="button"
                            onClick={() => setActiveProject(project)}
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-white transition hover:bg-purple"
                          >
                            View project details
                            <ArrowUpRight size={13} />
                          </button>

                          {hasLinks ? (
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/60">
                              External links available
                            </span>
                          ) : (
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/50">
                              In development
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="max-w-md text-sm leading-relaxed text-muted">
            More experiments and works-in-progress live on GitHub.
          </p>
          <a
            href="https://github.com/Vishnu12233"
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink transition hover:border-purple/30 hover:text-purple"
          >
            <GithubIcon size={15} />
            Explore GitHub
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={closeModal} />
    </section>
  )
}
