import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'

type Common = {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  strength?: number
  href?: string
  target?: string
  rel?: string
  download?: boolean | string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  asButton?: boolean
}

export function MagneticButton({
  children,
  className,
  variant = 'primary',
  strength = 0.3,
  href,
  target,
  rel,
  download,
  onClick,
  type = 'button',
  disabled,
  asButton,
}: Common) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 20, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 240, damping: 20, mass: 0.35 })

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const styles = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium tracking-wide transition',
    variant === 'primary' &&
      'bg-ink text-white shadow-soft hover:bg-purple hover:shadow-glow',
    variant === 'secondary' &&
      'border border-line bg-white text-ink shadow-soft hover:border-purple/30 hover:text-purple',
    variant === 'ghost' && 'text-muted hover:bg-white hover:text-ink',
    className,
  )

  const motionBits = {
    className: styles,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: reduced ? undefined : { scale: 0.97 },
    onClick,
  }

  if (asButton || !href) {
    return (
      <motion.button
        ref={ref as RefObject<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        {...motionBits}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a
      ref={ref as RefObject<HTMLAnchorElement>}
      href={href}
      target={target}
      rel={rel}
      download={download}
      {...motionBits}
    >
      {children}
    </motion.a>
  )
}
