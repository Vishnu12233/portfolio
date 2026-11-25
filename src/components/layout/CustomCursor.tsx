import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useIsDesktop } from '../../hooks/useIsDesktop'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function CustomCursor() {
  const isDesktop = useIsDesktop()
  const reduced = usePrefersReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.3 })

  useEffect(() => {
    if (!isDesktop || reduced) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setHovering(
        Boolean(
          t?.closest(
            'a, button, input, textarea, select, [role="button"], .cursor-pointer',
          ),
        ),
      )
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.documentElement.classList.add('cursor-none')

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('cursor-none')
    }
  }, [isDesktop, reduced, x, y])

  if (!isDesktop || reduced) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-ink/30"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 42 : 14,
          height: hovering ? 42 : 14,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering
            ? 'rgba(124,58,237,0.12)'
            : 'rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-purple"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}
