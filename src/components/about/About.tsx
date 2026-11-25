import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Layers3, Sparkles } from 'lucide-react'
import { aboutFocus, profile } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'
import { Marquee } from '../ui/Marquee'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'

const icons = [Sparkles, Layers3, Cpu]

const accents = {
  purple: {
    icon: 'text-purple',
    dot: 'bg-purple',
    hover: 'hover:border-purple/35',
    wash: 'from-purple/[0.08]',
  },
  blue: {
    icon: 'text-blue',
    dot: 'bg-blue',
    hover: 'hover:border-blue/35',
    wash: 'from-blue/[0.08]',
  },
  cyan: {
    icon: 'text-cyan',
    dot: 'bg-cyan',
    hover: 'hover:border-cyan/35',
    wash: 'from-cyan/[0.09]',
  },
}

function FocusVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 200 140"
        className="h-28 w-40 text-purple"
        aria-hidden
      >
        <circle cx="100" cy="70" r="50" fill="none" stroke="currentColor" strokeOpacity="0.12" />
        <circle cx="100" cy="70" r="34" fill="none" stroke="currentColor" strokeOpacity="0.24" />
        <circle cx="100" cy="70" r="18" fill="currentColor" fillOpacity="0.1" />
        <circle cx="100" cy="70" r="5" fill="currentColor" />
        <circle cx="144" cy="43" r="3" fill="#06B6D4" />
        <circle cx="58" cy="94" r="2.5" fill="#2563EB" />
        <path
          d="M100 20 A50 50 0 0 1 150 70"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 160 130" className="h-24 w-32 text-blue" aria-hidden>
        {[0, 1, 2].map((layer) => (
          <g key={layer} transform={`translate(0 ${layer * 20})`}>
            <rect
              x="36"
              y="34"
              width="88"
              height="32"
              rx="8"
              fill="white"
              stroke="currentColor"
              strokeOpacity={0.45 - layer * 0.09}
            />
            <circle cx="50" cy="50" r="3" fill={layer === 0 ? '#7C3AED' : '#06B6D4'} />
            <rect
              x="60"
              y="47"
              width={46 - layer * 8}
              height="3"
              rx="1.5"
              fill="currentColor"
              fillOpacity="0.25"
            />
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 160 130" className="h-24 w-32 text-cyan" aria-hidden>
      <rect
        x="49"
        y="34"
        width="62"
        height="62"
        rx="10"
        fill="white"
        stroke="currentColor"
        strokeOpacity="0.5"
      />
      <rect x="64" y="49" width="32" height="32" rx="5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="80" cy="65" r="5" fill="currentColor" />
      {[0, 1, 2, 3].map((pin) => (
        <g key={pin}>
          <line
            x1={59 + pin * 14}
            y1="34"
            x2={59 + pin * 14}
            y2="22"
            stroke="currentColor"
            strokeOpacity="0.35"
          />
          <line
            x1={59 + pin * 14}
            y1="96"
            x2={59 + pin * 14}
            y2="108"
            stroke="currentColor"
            strokeOpacity="0.35"
          />
        </g>
      ))}
      <circle cx="122" cy="98" r="3" fill="#7C3AED" />
      <circle cx="38" cy="46" r="2.5" fill="#2563EB" />
    </svg>
  )
}

export function About() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="about" className="section-shell relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-purple/[0.04] blur-[100px]"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={profile.aboutHeading}
          description={profile.aboutBody}
          aside="Engineering intelligence, with intention."
        />

        <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal className="h-full">
            <div className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-white via-violet-50/70 to-cyan-50/60 p-7 shadow-soft sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-purple/10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-cyan/10"
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted">
                  Profile / 2026
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  ECE
                </span>
              </div>

              <div className="relative mt-8 flex flex-1 flex-col justify-between">
                <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-purple/15"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-5 rounded-full border border-dashed border-blue/20"
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-transparent border-t-purple/40"
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-5 rounded-full border border-transparent border-b-cyan/40"
                    animate={reduced ? undefined : { rotate: -360 }}
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <span className="font-display text-6xl font-bold tracking-[-0.07em] text-gradient">
                    {profile.initials}
                  </span>
                  <span className="absolute right-4 top-7 h-2.5 w-2.5 rounded-full bg-purple shadow-glow" />
                  <span className="absolute bottom-6 left-5 h-2 w-2 rounded-full bg-cyan" />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted">
                    Education snapshot
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                    {profile.education.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {profile.education.college}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-line/80 bg-white/70 px-3 py-2.5 backdrop-blur">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                        Batch
                      </p>
                      <p className="mt-1 text-xs font-medium text-ink">
                        {profile.education.duration}
                      </p>
                    </div>
                    <div className="rounded-xl border border-line/80 bg-white/70 px-3 py-2.5 backdrop-blur">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                        CGPA
                      </p>
                      <p className="mt-1 text-xs font-medium text-ink">
                        {profile.education.cgpa}
                      </p>
                    </div>
                    <div className="rounded-xl border border-line/80 bg-white/70 px-3 py-2.5 backdrop-blur">
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                        Track
                      </p>
                      <p className="mt-1 text-xs font-medium text-ink">ECE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {aboutFocus.map((item, index) => {
              const Icon = icons[index]
              const accent = accents[item.accent]
              return (
                <Reveal
                  key={item.title}
                  delay={0.08 + index * 0.06}
                  className={cn('h-full', index === 0 && 'sm:col-span-2')}
                >
                  <TiltCard className="h-full" maxTilt={5}>
                    <article
                      className={cn(
                        'group relative h-full overflow-hidden rounded-[1.7rem] border border-line bg-canvas p-6 transition duration-500 sm:p-7',
                        accent.hover,
                      )}
                    >
                      <div
                        aria-hidden
                        className={cn(
                          'pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                          accent.wash,
                        )}
                      />
                      <div className="relative flex items-start justify-between gap-5">
                        <div>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink shadow-soft">
                            <Icon size={18} className={accent.icon} />
                          </span>
                          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70">
                            Focus / 0{index + 1}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                            {item.title}
                          </h3>
                          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                            {item.description}
                          </p>
                        </div>
                        {index === 0 ? (
                          <div className="hidden opacity-80 transition duration-500 group-hover:opacity-100 sm:block">
                            <FocusVisual index={index} />
                          </div>
                        ) : null}
                      </div>

                      {index !== 0 ? (
                        <div className="relative mt-6 flex items-end justify-between">
                          <span className={cn('h-1 w-1 rounded-full', accent.dot)} />
                          <FocusVisual index={index} />
                        </div>
                      ) : (
                        <div className="relative mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted/60">
                          <span className={cn('h-1 w-1 rounded-full', accent.dot)} />
                          Applied intelligence, end to end
                          <ArrowUpRight size={11} />
                        </div>
                      )}
                    </article>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-5" delay={0.12}>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="text-sm text-muted">{profile.availabilityNote}</p>
            <div className="flex flex-wrap gap-2">
              {profile.focusTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 lg:mt-20">
        <Marquee
          items={[
            'Artificial Intelligence',
            'Full-Stack Engineering',
            'Embedded Systems',
            'LLM Integration',
            'Computer Vision',
            'Human-centred Products',
          ]}
        />
      </div>
    </section>
  )
}
