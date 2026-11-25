import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight, MousePointer2, Sparkles } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { profile } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { MagneticButton } from '../ui/MagneticButton'

const AIOrb = lazy(() => import('./AIOrb').then((module) => ({ default: module.AIOrb })))

const roleAccents = ['text-purple', 'text-blue', 'text-cyan']

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 620], [0, reduced ? 0 : 70])
  const opacityOut = useTransform(scrollY, [0, 500], [1, 0])
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(124,58,237,0.09), transparent 55%)`

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % profile.roles.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-canvas"
      onMouseMove={(event) => {
        if (reduced) return
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-purple/[0.09] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan/[0.1] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue/[0.06] blur-[100px]"
      />

      <div className="container-shell relative z-10 grid w-full gap-14 pb-20 pt-28 sm:pt-32 md:grid-cols-[1.04fr_0.96fr] md:items-center md:gap-8 md:pb-24 md:pt-28 lg:min-h-[100svh] lg:gap-4 lg:pb-28 lg:pt-24">
        <motion.div
          style={{ y: yParallax, opacity: opacityOut }}
          className="relative max-w-2xl"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1.5 text-[11px] font-medium text-emerald-700 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
            <span className="hidden text-emerald-600/60 sm:inline">/</span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-600/70 sm:inline">
              2026
            </span>
          </motion.div>

          <motion.p
            className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:text-[11px]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="h-px w-8 bg-gradient-to-r from-purple to-transparent" />
            {profile.heroGreeting}
          </motion.p>

          <h1 className="font-display text-display-xl font-semibold text-ink">
            {profile.heroHeadline.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={
                    index === 1
                      ? 'text-gradient block'
                      : index === 2
                        ? 'text-gradient block'
                        : 'block'
                  }
                  initial={reduced ? false : { y: '112%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.18 + index * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 text-base font-medium tracking-tight text-ink/80 md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.55 }}
          >
            {profile.heroSupport}
          </motion.p>

          <motion.p
            className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-[15px]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.55 }}
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-2"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.5 }}
          >
            {profile.roles.map((role, index) => (
              <span
                key={role}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted backdrop-blur"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-current ${roleAccents[index]}`}
                />
                {role}
              </span>
            ))}
            <span className="ml-1 hidden h-5 overflow-hidden font-mono text-[10px] uppercase tracking-[0.12em] text-purple sm:block">
              <motion.span
                key={profile.roles[roleIndex]}
                initial={reduced ? false : { y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-1.5"
              >
                <Sparkles size={11} />
                {profile.roles[roleIndex]}
              </motion.span>
            </span>
          </motion.div>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.74, duration: 0.55 }}
          >
            <MagneticButton href="#projects" variant="primary">
              Explore My Projects
              <ArrowUpRight size={15} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div
            className="mt-10 hidden max-w-md grid-cols-3 gap-4 border-t border-line pt-5 sm:grid"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {profile.heroMeta.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/70">
                  {item.label}
                </p>
                <p className="mt-1.5 text-xs font-medium text-ink">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[440px] md:max-w-none"
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square w-full">
            <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-purple/20 via-blue/10 to-cyan/20 blur-3xl" />
            <div
              aria-hidden
              className="absolute inset-[5%] rounded-full border border-line/70"
            />
            <div
              aria-hidden
              className="absolute inset-[15%] rounded-full border border-dashed border-line/60"
            />

            <div
              role="img"
              aria-label="Interactive translucent 3D orb with orbiting geometric fragments"
              className="absolute inset-0"
            >
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center">
                    <div className="relative h-44 w-44">
                      <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple/20 via-blue/10 to-cyan/20 blur-xl" />
                      <div className="absolute inset-8 rounded-full border border-white/80 bg-white/40 backdrop-blur" />
                    </div>
                  </div>
                }
              >
                <AIOrb />
              </Suspense>
            </div>

            <div className="orb-label absolute -left-1 top-[20%] hidden items-center gap-1.5 sm:flex">
              <span className="h-1 w-1 rounded-full bg-purple" />
              LLM systems
            </div>
            <div className="orb-label absolute -right-1 top-[34%] hidden items-center gap-1.5 sm:flex">
              <span className="h-1 w-1 rounded-full bg-blue" />
              Product engineering
            </div>
            <div className="orb-label absolute bottom-[19%] left-[3%] hidden items-center gap-1.5 sm:flex">
              <span className="h-1 w-1 rounded-full bg-cyan" />
              Embedded
            </div>

            <div className="absolute inset-x-0 -bottom-3 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70">
              <MousePointer2 size={11} />
              Move to explore
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-ink lg:flex"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05 }}
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} />
        </motion.span>
      </motion.a>
    </section>
  )
}
