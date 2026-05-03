import Image from 'next/image'
import Link from 'next/link'
import type { PalaceImageAsset } from '@/content/palace-images'

interface PalaceImageFigureProps {
  asset: PalaceImageAsset
  priority?: boolean
  compact?: boolean
  linkToPalace?: boolean
  className?: string
}

export function PalaceImageFigure({
  asset,
  priority = false,
  compact = false,
  linkToPalace = false,
  className = '',
}: PalaceImageFigureProps) {
  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      priority={priority}
      sizes={compact ? '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw' : '(min-width: 1024px) 720px, 100vw'}
      className="h-auto w-full rounded-2xl object-cover"
    />
  )

  return (
    <figure className={`overflow-hidden rounded-3xl border border-rule/80 bg-ivory/80 shadow-[0_18px_44px_rgba(42,36,24,0.08)] ${className}`}>
      {linkToPalace ? (
        <Link href={`/cung/${asset.slug}/`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300">
          {image}
        </Link>
      ) : (
        image
      )}
      <figcaption className={compact ? 'px-4 py-3' : 'px-5 py-4'}>
        <p className="font-semibold text-ink">{asset.caption}</p>
        {!compact && <p className="mt-1 text-sm leading-6 text-ink-soft">{asset.visualTheme}.</p>}
      </figcaption>
    </figure>
  )
}
