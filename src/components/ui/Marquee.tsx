import { cn } from '../../lib/utils'

type Props = {
  items: string[]
  className?: string
  separator?: string
}

export function Marquee({ items, className, separator = '✦' }: Props) {
  const loop = [...items, ...items]

  return (
    <div
      className={cn(
        'edge-fade overflow-hidden border-y border-line bg-white/50 py-4',
        className,
      )}
      aria-hidden
    >
      <div className="marquee-track items-center gap-8">
        {loop.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8 font-mono text-[10px] uppercase tracking-[0.26em] text-muted"
          >
            <span>{item}</span>
            <span className="text-[9px] text-purple/60">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
