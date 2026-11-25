import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/utils'

type Props = {
  index?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  aside?: ReactNode
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  aside,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion()
  const centered = align === 'center'

  return (
    <motion.header
      className={cn('mb-12 md:mb-16', className)}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-6 border-t border-line pt-5',
          centered && 'justify-center',
        )}
      >
        <p className="eyebrow">
          {index ? (
            <span className="text-ink/45">{index}</span>
          ) : null}
          <span>{eyebrow}</span>
        </p>
        {aside && !centered ? (
          <p className="hidden max-w-xs text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80 sm:block">
            {aside}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          'mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12',
          centered && 'justify-items-center text-center lg:grid-cols-1',
        )}
      >
        <h2 className="font-display text-display-lg font-semibold text-ink">
          {title}
        </h2>
        {description ? (
          <div
            className={cn(
              'max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end',
              centered && 'mx-auto text-center',
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
    </motion.header>
  )
}
