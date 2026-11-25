import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../../data/portfolio'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = { onComplete: () => void }

export function Loader({ onComplete }: Props) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = reduced ? 120 : 1650
    const timer = window.setTimeout(() => {
      setVisible(false)
      window.setTimeout(onComplete, reduced ? 30 : 480)
    }, duration)
    return () => window.clearTimeout(timer)
  }, [onComplete, reduced])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[90px]" />
          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-white bg-white/70 shadow-soft backdrop-blur"
              initial={reduced ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-display text-4xl font-bold tracking-tight text-gradient">
                {profile.initials}
              </span>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-cyan" />
            </motion.div>

            <motion.p
              className="mt-7 font-mono text-[9px] uppercase tracking-[0.38em] text-muted"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Portfolio / 2026
            </motion.p>

            <div className="mt-5 h-px w-40 overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-purple via-blue to-cyan"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: 'left' }}
                transition={{
                  duration: reduced ? 0.1 : 1.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
