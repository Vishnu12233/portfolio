import { motion } from 'framer-motion'
import { ArrowUpRight, Bot, Layers3, Workflow } from 'lucide-react'
import { services } from '../../data/portfolio'
import { cn } from '../../lib/utils'
import { MagneticButton } from '../ui/MagneticButton'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TiltCard } from '../ui/TiltCard'

const icons = [Bot, Layers3, Workflow]

const accents = {
  purple: {
    text: 'text-purple',
    border: 'group-hover:border-purple/35',
    glow: 'bg-purple/15',
    line: 'from-purple/50',
    tags: ['AI APIs', 'LLMs', 'Intelligent interfaces'],
  },
  blue: {
    text: 'text-blue',
    border: 'group-hover:border-blue/35',
    glow: 'bg-blue/15',
    line: 'from-blue/50',
    tags: ['Web apps', 'Dashboards', 'Scalable systems'],
  },
  cyan: {
    text: 'text-cyan',
    border: 'group-hover:border-cyan/35',
    glow: 'bg-cyan/15',
    line: 'from-cyan/50',
    tags: ['AI features', 'Automation', 'Workflows'],
  },
}

function ServiceVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-line/80 bg-white">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-purple/20" />
          <span className="absolute inset-4 rounded-full border border-dashed border-purple/25" />
          <motion.span
            className="absolute inset-0 rounded-full border border-transparent border-t-purple/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple to-blue opacity-70 blur-[6px]" />
          <span className="relative h-3 w-3 rounded-full bg-purple shadow-glow" />
          <span className="absolute right-1 top-4 h-1.5 w-1.5 rounded-full bg-cyan" />
          <span className="absolute bottom-3 left-2 h-1 w-1 rounded-full bg-blue" />
        </div>
        <span className="absolute bottom-3 left-3 font-mono text-[7px] uppercase tracking-[0.18em] text-muted/50">
          Neural / 01
        </span>
      </div>
    )
  }

  if (index === 1) {
    return (
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-line/80 bg-white">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative w-40">
          {[0, 1, 2].map((layer) => (
            <div
              key={layer}
              className="absolute left-0 right-0 h-12 rounded-xl border border-blue/20 bg-white shadow-sm"
              style={{
                top: `${layer * 17}px`,
                transform: `translateX(${layer * 9}px) scale(${1 - layer * 0.06})`,
                opacity: 1 - layer * 0.2,
              }}
            >
              <div className="flex items-center gap-2 border-b border-line/70 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue/50" />
                <span className="h-1 w-10 rounded-full bg-line" />
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-2">
                <span className="h-2 rounded-sm bg-blue/10" />
                <span className="h-2 rounded-sm bg-blue/10" />
                <span className="h-2 rounded-sm bg-cyan/10" />
              </div>
            </div>
          ))}
        </div>
        <span className="absolute bottom-3 left-3 font-mono text-[7px] uppercase tracking-[0.18em] text-muted/50">
          Stack / 02
        </span>
      </div>
    )
  }

  return (
    <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-line/80 bg-white">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <svg viewBox="0 0 220 110" className="h-full w-full" aria-hidden>
        <path
          d="M34 55 H80 M140 55 H186"
          stroke="#06B6D4"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
        <path
          d="M110 55 C110 30, 130 24, 155 24 M110 55 C110 80, 130 86, 155 86"
          fill="none"
          stroke="#06B6D4"
          strokeOpacity="0.35"
          strokeDasharray="4 4"
        />
        {[
          [34, 55, '#7C3AED'],
          [110, 55, '#2563EB'],
          [186, 55, '#06B6D4'],
          [155, 24, '#7C3AED'],
          [155, 86, '#06B6D4'],
        ].map(([cx, cy, color], index) => (
          <g key={index}>
            <circle
              cx={cx as number}
              cy={cy as number}
              r="15"
              fill="white"
              stroke={color as string}
              strokeOpacity="0.35"
            />
            <circle
              cx={cx as number}
              cy={cy as number}
              r="4"
              fill={color as string}
              fillOpacity="0.8"
            />
          </g>
        ))}
        <circle cx="110" cy="55" r="25" fill="none" stroke="#2563EB" strokeOpacity="0.1" />
      </svg>
      <span className="absolute bottom-3 left-3 font-mono text-[7px] uppercase tracking-[0.18em] text-muted/50">
        Automation / 03
      </span>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="section-shell relative overflow-hidden bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/[0.05] blur-[100px]"
      />
      <div className="container-shell relative">
        <SectionHeading
          index="05"
          eyebrow="What I do"
          title="How I Can Help."
          description="Three focused practice areas — building intelligent products, engineering full-stack experiences, and connecting AI to the systems people already use."
          aside="From first sketch to working system."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index]
            const accent = accents[service.accent]
            return (
              <Reveal key={service.title} delay={index * 0.07} className="h-full">
                <TiltCard className="h-full" maxTilt={5}>
                  <article
                    className={cn(
                      'group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-line bg-canvas p-6 transition duration-500 sm:p-7',
                      accent.border,
                    )}
                  >
                    <div
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100',
                        accent.glow,
                      )}
                    />

                    <div className="relative flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink shadow-soft">
                        <Icon size={18} className={accent.text} />
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="relative mt-6">
                      <ServiceVisual index={index} />
                    </div>

                    <div className="relative mt-6 flex flex-1 flex-col">
                      <h3 className="font-display text-xl font-semibold leading-snug text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {accent.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href="#contact"
                        className="mt-7 flex items-center justify-between border-t border-line pt-4 text-xs font-medium text-ink transition hover:text-purple"
                      >
                        Start a conversation
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.16} className="mt-8">
          <div className="flex flex-col items-start justify-between gap-5 rounded-[1.6rem] border border-line bg-gradient-to-r from-violet-50/80 via-white to-cyan-50/60 px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-purple">
                Have something in mind?
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                Let&apos;s turn the idea into something real.
              </p>
            </div>
            <MagneticButton href="#contact" variant="primary">
              Let&apos;s talk
              <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
