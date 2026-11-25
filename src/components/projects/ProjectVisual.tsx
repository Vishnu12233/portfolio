import type { ReactNode } from 'react'
import type { Project } from '../../data/portfolio'

function Frame({
  label,
  accent,
  children,
}: {
  label: string
  accent: string
  children: ReactNode
}) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
      <div className="relative aspect-[16/10] w-full max-w-[540px] overflow-hidden rounded-[1.15rem] border border-white/80 bg-white/70 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="flex h-9 items-center justify-between border-b border-line/80 px-4">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          </div>
          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-muted/60">
            {label}
          </span>
          <span className={`h-1.5 w-1.5 rounded-full ${accent}`} />
        </div>
        <div className="relative h-[calc(100%-2.25rem)] p-3 sm:p-4">{children}</div>
      </div>
    </div>
  )
}

function AnalyzerVisual() {
  return (
    <Frame label="skill-gap / analyzer" accent="bg-purple">
      <div className="grid h-full grid-cols-[1.08fr_0.92fr] gap-3">
        <div className="relative overflow-hidden rounded-xl border border-line/70 bg-canvas p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted">
              Skill map
            </span>
            <span className="rounded-full bg-purple/10 px-2 py-0.5 font-mono text-[6px] uppercase tracking-[0.12em] text-purple">
              AI
            </span>
          </div>
          <div className="relative mx-auto mt-2 flex h-[72%] items-center justify-center">
            <svg viewBox="0 0 180 150" className="h-full w-full">
              {[60, 45, 30, 15].map((radius) => (
                <circle
                  key={radius}
                  cx="90"
                  cy="75"
                  r={radius}
                  fill="none"
                  stroke="#7C3AED"
                  strokeOpacity="0.12"
                />
              ))}
              <path
                d="M90 25 L143 65 L125 122 L55 122 L37 65 Z"
                fill="none"
                stroke="#7C3AED"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <path
                d="M90 39 L127 68 L113 107 L67 107 L53 68 Z"
                fill="#7C3AED"
                fillOpacity="0.1"
                stroke="#7C3AED"
                strokeOpacity="0.5"
              />
              {[
                [90, 25],
                [143, 65],
                [125, 122],
                [55, 122],
                [37, 65],
              ].map(([cx, cy], index) => (
                <circle
                  key={index}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill={index % 2 === 0 ? '#7C3AED' : '#06B6D4'}
                />
              ))}
              <circle cx="90" cy="75" r="4" fill="#111827" />
            </svg>
            <span className="absolute bottom-0 left-0 rounded bg-white/90 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.14em] text-muted">
              Career readiness
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="rounded-xl border border-line/70 bg-white p-3">
            <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted">
              Roadmap
            </p>
            {[
              ['Python', '82%', 'bg-purple'],
              ['React', '68%', 'bg-blue'],
              ['FastAPI', '54%', 'bg-cyan'],
            ].map(([name, width, color]) => (
              <div key={name} className="mt-2">
                <div className="flex justify-between font-mono text-[6px] text-muted">
                  <span>{name}</span>
                  <span>{width}</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-line">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-xl border border-purple/20 bg-gradient-to-br from-purple/[0.09] to-cyan/[0.06] p-3">
            <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-purple">
              Next step
            </span>
            <p className="text-[9px] font-medium leading-snug text-ink">
              Personalised learning path generated.
            </p>
            <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-white px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-muted shadow-sm">
              View roadmap <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function NiecpVisual() {
  return (
    <Frame label="niecp-ai / compliance graph" accent="bg-blue">
      <div className="relative h-full overflow-hidden rounded-xl border border-line/70 bg-canvas p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted">
              Approval discovery
            </p>
            <p className="mt-1 text-[10px] font-semibold text-ink">
              Industrial compliance, mapped.
            </p>
          </div>
          <span className="rounded-full bg-blue/10 px-2 py-1 font-mono text-[6px] uppercase tracking-[0.1em] text-blue">
            Live graph
          </span>
        </div>

        <svg
          viewBox="0 0 420 170"
          className="absolute inset-x-3 bottom-2 h-[75%] w-[calc(100%-1.5rem)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="niecp-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M48 32 C 110 32, 95 85, 160 85 S 235 36, 285 36 S 330 112, 385 112"
            fill="none"
            stroke="url(#niecp-line)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <path
            d="M160 85 C 205 85, 195 130, 250 130 S 320 145, 385 112"
            fill="none"
            stroke="url(#niecp-line)"
            strokeWidth="1.5"
          />
          {[
            [48, 32, 'Compliance'],
            [160, 85, 'Approvals'],
            [285, 36, 'Documents'],
            [250, 130, 'Dependencies'],
            [385, 112, 'Clearance'],
          ].map(([cx, cy, label], index) => (
            <g key={label as string}>
              <circle
                cx={cx as number}
                cy={cy as number}
                r="19"
                fill="white"
                stroke={index % 2 === 0 ? '#7C3AED' : '#2563EB'}
                strokeOpacity="0.35"
              />
              <circle
                cx={cx as number}
                cy={cy as number}
                r="4"
                fill={index % 2 === 0 ? '#7C3AED' : '#2563EB'}
              />
              <text
                x={cx as number}
                y={(cy as number) + 31}
                textAnchor="middle"
                fontSize="7"
                fill="#64748B"
                fontFamily="monospace"
              >
                {label as string}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Frame>
  )
}

function HealthVisual() {
  return (
    <Frame label="health-guard / monitoring" accent="bg-cyan">
      <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-3">
        <div className="relative overflow-hidden rounded-xl border border-line/70 bg-canvas p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[6px] uppercase tracking-[0.16em] text-muted">
              Live signal
            </span>
            <span className="flex items-center gap-1 font-mono text-[6px] uppercase tracking-[0.12em] text-emerald-600">
              <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
              Monitoring
            </span>
          </div>
          <div className="relative mt-4 h-[70%]">
            <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
              <path
                d="M0 65 H45 L58 30 L74 96 L92 45 L105 65 H130 L142 22 L160 100 L178 52 L194 65 H280"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0 65 H45 L58 30 L74 96 L92 45 L105 65 H130 L142 22 L160 100 L178 52 L194 65 H280"
                fill="none"
                stroke="#06B6D4"
                strokeOpacity="0.12"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex gap-3 border-t border-line/70 pt-2 font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
            <span>Vitals</span>
            <span>Patterns</span>
            <span>Insights</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-cyan/20 bg-gradient-to-br from-cyan/[0.12] to-emerald-50 p-3">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 animate-[breathe_3.5s_ease-in-out_infinite] rounded-full bg-cyan/20" />
              <span className="absolute inset-3 rounded-full border border-cyan/40" />
              <span className="relative font-display text-2xl font-bold text-cyan">
                +
              </span>
            </div>
            <p className="mt-2 text-center text-[8px] font-medium leading-snug text-ink">
              Predictive assistance
            </p>
          </div>
          <div className="rounded-xl border border-line/70 bg-white p-3">
            <p className="font-mono text-[6px] uppercase tracking-[0.12em] text-muted">
              Concept focus
            </p>
            <p className="mt-1 text-[8px] leading-snug text-ink">
              Intelligent health monitoring.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  )
}

function SolarVisual() {
  return (
    <Frame label="dual-axis / solar tracking" accent="bg-amber-400">
      <div className="relative h-full overflow-hidden rounded-xl border border-line/70 bg-canvas">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(245,158,11,0.18),transparent_55%)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-3">
          <div className="relative mb-2 flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-[breathe_4s_ease-in-out_infinite] rounded-full bg-amber-400/30 blur-xl" />
            <span className="relative h-8 w-8 rounded-full bg-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.45)]" />
            <span className="absolute inset-0 rounded-full border border-amber-300/50" />
            {[0, 45, 90, 135].map((rotation) => (
              <span
                key={rotation}
                className="absolute h-px w-16 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            ))}
          </div>

          <div className="relative mt-1">
            <div className="h-8 w-28 -skew-x-12 rounded-sm border border-blue/30 bg-gradient-to-br from-blue/20 to-purple/20 p-1 shadow-sm">
              <div className="grid h-full grid-cols-4 gap-0.5">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span key={index} className="rounded-[1px] bg-white/50" />
                ))}
              </div>
            </div>
            <span className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 bg-ink/30" />
            <span className="absolute -bottom-4 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-ink/20" />
          </div>

          <div className="absolute inset-x-3 bottom-2 flex items-center justify-between font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
            <span className="rounded-full border border-line bg-white/80 px-2 py-0.5">
              4 × LDR
            </span>
            <span className="flex items-center gap-1 rounded-full border border-line bg-white/80 px-2 py-0.5">
              <span className="h-1 w-1 rounded-full bg-amber-400" />
              Auto tracking
            </span>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  if (visual === 'analyzer') return <AnalyzerVisual />
  if (visual === 'niecp') return <NiecpVisual />
  if (visual === 'health') return <HealthVisual />
  return <SolarVisual />
}
