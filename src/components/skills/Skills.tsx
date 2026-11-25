import { AnimatePresence, motion } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  PanelsTopLeft,
  Plus,
  Server,
  Wrench,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { skillCategories } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'
import { SectionHeading } from '../ui/SectionHeading'

const meta: Record<
  string,
  {
    icon: typeof Code2
    description: string
    accent: string
    glow: string
    index: string
    span: string
  }
> = {
  programming: {
    icon: Code2,
    description: 'Languages I use to reason, build, and solve.',
    accent: 'text-purple',
    glow: 'bg-purple',
    index: '01',
    span: 'xl:col-span-2',
  },
  frontend: {
    icon: PanelsTopLeft,
    description: 'Interfaces built on modern web fundamentals.',
    accent: 'text-blue',
    glow: 'bg-blue',
    index: '02',
    span: 'xl:col-span-2',
  },
  backend: {
    icon: Server,
    description: 'APIs, data, and application infrastructure.',
    accent: 'text-cyan',
    glow: 'bg-cyan',
    index: '03',
    span: 'xl:col-span-2',
  },
  ai: {
    icon: BrainCircuit,
    description: 'Intelligent systems and applied AI technology.',
    accent: 'text-purple',
    glow: 'bg-purple',
    index: '04',
    span: 'xl:col-span-4',
  },
  tools: {
    icon: Wrench,
    description: 'The environment behind the work.',
    accent: 'text-blue',
    glow: 'bg-blue',
    index: '05',
    span: 'xl:col-span-2',
  },
}

const filters = [
  { id: 'all', label: 'All' },
  ...skillCategories.map((category) => ({
    id: category.id,
    label: category.title,
  })),
]

export function Skills() {
  const reduced = usePrefersReducedMotion()
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () =>
      filter === 'all'
        ? skillCategories
        : skillCategories.filter((category) => category.id === filter),
    [filter],
  )

  return (
    <section id="skills" className="section-shell relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid opacity-[0.28]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue/[0.05] blur-[110px]"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Technical Skills."
          description="A focused toolkit across programming, product engineering, AI technologies, and developer tools. No invented proficiency scores — just the technologies I work with."
          aside="Five disciplines. One systems mindset."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {filters.map((item) => {
            const count =
              item.id === 'all'
                ? skillCategories.reduce(
                    (total, category) => total + category.skills.length,
                    0,
                  )
                : skillCategories.find((category) => category.id === item.id)
                    ?.skills.length ?? 0

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
                    : 'border-line bg-white/80 text-muted backdrop-blur hover:border-purple/30 hover:text-ink',
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

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {visible.map((category, categoryIndex) => {
              const details = meta[category.id]
              const Icon = details.icon
              const selected = filter !== 'all'

              return (
                <motion.article
                  key={category.id}
                  layout
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{
                    duration: 0.45,
                    delay: categoryIndex * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    'group relative overflow-hidden rounded-[1.6rem] border border-line bg-white p-6 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7',
                    selected ? 'xl:col-span-6' : details.span,
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10',
                      details.glow,
                    )}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-canvas">
                        <Icon size={18} className={details.accent} />
                      </span>
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/60">
                          Stack / {details.index}
                        </p>
                        <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-muted/50">
                      {String(category.skills.length).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="relative mt-4 text-xs leading-relaxed text-muted">
                    {details.description}
                  </p>

                  <ul
                    className={cn(
                      'relative mt-5 grid gap-x-8',
                      selected ? 'sm:grid-cols-2 lg:grid-cols-3' : '',
                    )}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skill}
                        className="group/skill flex items-center justify-between border-b border-line/70 py-2.5 last:border-b-0"
                      >
                        <span className="flex items-center gap-2.5 text-sm text-ink/80 transition group-hover/skill:text-ink">
                          <span
                            className={cn(
                              'h-1 w-1 rounded-full opacity-50 transition group-hover/skill:opacity-100',
                              details.glow,
                            )}
                          />
                          {skill}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[8px] text-muted/30">
                            {String(skillIndex + 1).padStart(2, '0')}
                          </span>
                          <Plus
                            size={11}
                            className="text-muted/30 transition group-hover/skill:rotate-90 group-hover/skill:text-purple"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/60">
            Working knowledge · continuously expanding
          </p>
          <p className="text-xs text-muted">
            Built through coursework, personal projects, and deliberate practice.
          </p>
        </div>
      </div>
    </section>
  )
}
