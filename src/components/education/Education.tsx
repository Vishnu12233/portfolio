import { AnimatePresence, motion } from 'framer-motion'
import {
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Medal,
  Presentation,
} from 'lucide-react'
import { useState } from 'react'
import { profile, timeline } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type Entry = {
  id: string
  title: string
  organization: string
  period: string
  detail?: string
}

const tabs: {
  id: string
  label: string
  icon: typeof Award
  items: Entry[]
}[] = [
  { id: 'certifications', label: 'Certifications', icon: Award, items: timeline.certifications },
  { id: 'workshops', label: 'Workshops', icon: Presentation, items: timeline.workshops },
  { id: 'internships', label: 'Internships', icon: Briefcase, items: timeline.internships },
  { id: 'achievements', label: 'Achievements', icon: Medal, items: timeline.achievements },
]

const years = ['2024', '2025', '2026', '2027', '2028']

export function Education() {
  const reduced = usePrefersReducedMotion()
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [currentYear] = useState(() => new Date().getFullYear())
  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]
  const ActiveIcon = current.icon

  return (
    <section id="education" className="section-shell relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid opacity-20"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="04"
          eyebrow="Education"
          title="My Learning Journey."
          description="Formal education and verified milestones. Certifications, workshops, internships, and achievements remain intentionally empty until real entries are supplied."
          aside="Class of 2028 · ECE"
        />

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-white p-7 shadow-soft sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-purple/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-dashed border-blue/15"
              />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-canvas text-purple">
                    <GraduationCap size={20} />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70">
                      Formal education
                    </p>
                    <p className="mt-1 text-xs font-medium text-ink">
                      {profile.education.duration}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  In progress
                </span>
              </div>

              <div className="relative mt-10 border-l border-line pl-6 sm:pl-8">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-purple shadow-glow" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple">
                  {profile.education.duration}
                </p>
                <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                  {profile.education.degree}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {profile.education.college}
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-purple/15 bg-purple/[0.045] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-purple/70">
                      CGPA
                    </p>
                    <p className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
                      {profile.education.cgpa}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      Current academic record
                    </p>
                  </div>
                  <div className="rounded-2xl border border-line bg-canvas p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                      Academic foundation
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['Electronics', 'Communication', 'Embedded systems'].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] text-muted"
                          >
                            {item}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-9">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/70">
                    Academic timeline
                  </p>
                  <CalendarDays size={14} className="text-muted/50" />
                </div>
                <div className="relative mt-5">
                  <div className="absolute left-0 right-0 top-[5px] h-px bg-line" />
                  <div
                    className="absolute left-0 top-[5px] h-px bg-gradient-to-r from-purple via-blue to-cyan"
                    style={{ width: `${Math.max(0, Math.min(100, ((currentYear - 2024) / 4) * 100))}%` }}
                  />
                  <div className="relative flex justify-between">
                    {years.map((year) => {
                      const isCurrent = year === String(currentYear)
                      const isPast = Number(year) < currentYear
                      return (
                        <div key={year} className="flex flex-col items-center gap-2">
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm',
                              isCurrent
                                ? 'bg-purple shadow-glow'
                                : isPast
                                  ? 'bg-blue'
                                  : 'bg-line',
                            )}
                          />
                          <span
                            className={cn(
                              'font-mono text-[8px] tracking-[0.08em]',
                              isCurrent ? 'text-ink' : 'text-muted/60',
                            )}
                          >
                            {year}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70">
                    Beyond the classroom
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    Credentials & milestones
                  </h3>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-canvas text-purple">
                  <Award size={16} />
                </span>
              </div>

              <div className="no-scrollbar mt-6 flex gap-1 overflow-x-auto rounded-xl border border-line bg-canvas p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const active = tab.id === activeTab
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={active}
                      className={cn(
                        'focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-medium transition',
                        active
                          ? 'bg-white text-ink shadow-sm'
                          : 'text-muted hover:text-ink',
                      )}
                    >
                      <Icon size={12} />
                      {tab.label}
                      <span className="font-mono text-[8px] text-muted/50">
                        {tab.items.length}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    {current.items.length === 0 ? (
                      <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-canvas/60 px-6 py-10 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white text-muted">
                          <ActiveIcon size={19} />
                        </span>
                        <p className="mt-4 font-display text-base font-semibold text-ink">
                          No verified entries yet
                        </p>
                        <p className="mt-2 max-w-[15rem] text-xs leading-relaxed text-muted">
                          This space is ready for real {current.label.toLowerCase()} when they are added to the portfolio data.
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted/60">
                          <CheckCircle2 size={10} />
                          Verified only
                        </span>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {current.items.map((item) => (
                          <li
                            key={item.id}
                            className="rounded-2xl border border-line bg-canvas p-4"
                          >
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-purple">
                              {item.period}
                            </p>
                            <p className="mt-1.5 text-sm font-semibold text-ink">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs text-muted">
                              {item.organization}
                            </p>
                            {item.detail ? (
                              <p className="mt-2 text-xs text-muted">
                                {item.detail}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="mt-5 border-t border-line pt-4 text-[10px] leading-relaxed text-muted/60">
                Only information supplied by Vishnu appears here. No awards,
                internships, or certifications are invented.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
