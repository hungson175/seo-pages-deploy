/**
 * STORY-011b: iztro Chart UI Components
 * PalaceGrid, StarTooltip, PalaceDetail
 */

'use client'

import { useState } from 'react'

export interface Star {
  name: string
  brightness: 'minh' | 'hãm' | 'bình'
}

export interface Palace {
  name: string
  index: number
  majorStars: Star[]
  minorStars: string[]
  transformation?: string
}

export interface ChartProps {
  palaces: Palace[]
}

// Brightness color mapping
const brightnessClass: Record<Star['brightness'], string> = {
  minh: 'text-gold-300 font-bold',
  hãm: 'text-navy-400',
  bình: 'text-navy-200',
}

const brightnessLabel: Record<Star['brightness'], string> = {
  minh: 'Sáng rõ',
  hãm: 'Bị hãm',
  bình: 'Bình hòa',
}

export function StarTooltip({ star }: { star: Star }) {
  return (
    <div className="absolute z-10 bg-navy-800 border border-navy-600 rounded-lg p-3 shadow-lg -mt-2">
      <p className="font-semibold text-gold-300">{star.name}</p>
      <p className="text-sm text-navy-300">{brightnessLabel[star.brightness]}</p>
    </div>
  )
}

export function PalaceDetail({ palace }: { palace: Palace }) {
  return (
    <div className="bg-navy-800 border border-navy-600 rounded-lg p-4 mt-2">
      <h3 className="text-lg font-semibold text-gold-300 mb-2">{palace.name}</h3>
      {palace.majorStars.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-navy-400 mb-1">Sao chính:</p>
          {palace.majorStars.map((star) => (
            <span
              key={star.name}
              className={`inline-block mr-2 ${brightnessClass[star.brightness]}`}
            >
              {star.name}
            </span>
          ))}
        </div>
      )}
      {palace.minorStars.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-navy-400 mb-1">Sao phụ:</p>
          <p className="text-xs text-navy-500">{palace.minorStars.join(', ')}</p>
        </div>
      )}
      {palace.transformation && (
        <span className="inline-block px-2 py-1 bg-gold-700 text-gold-100 text-xs rounded">
          {palace.transformation}
        </span>
      )}
    </div>
  )
}

export function PalaceGrid({ palaces }: ChartProps) {
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null)
  const [expandedPalace, setExpandedPalace] = useState<number | null>(null)

  return (
    <div className="w-full">
      {/* Aria-live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Lá số tử vi 12 cung đã tạo xong. Mệnh cung có{' '}
        {palaces[0]?.majorStars[0]?.name || 'nhiều sao'}.
      </div>

      {/* 4x3 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {palaces.map((palace) => (
          <div
            key={palace.index}
            data-palace={palace.name}
            tabIndex={0}
            role="button"
            aria-label={`Cung ${palace.name}${palace.majorStars.length > 0 ? `, có ${palace.majorStars.map((s) => s.name).join(', ')}` : ''}`}
            className="bg-navy-800 border border-navy-700 rounded-lg p-3 cursor-pointer hover:border-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300"
            onClick={() =>
              setExpandedPalace(
                expandedPalace === palace.index ? null : palace.index
              )
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setExpandedPalace(
                  expandedPalace === palace.index ? null : palace.index
                )
              }
            }}
          >
            {/* Palace Name */}
            <h3 className="text-sm font-semibold text-gold-400 mb-1">
              {palace.name}
            </h3>

            {/* Major Stars */}
            {palace.majorStars.length > 0 && (
              <div className="mb-1">
                {palace.majorStars.map((star) => (
                  <span
                    key={star.name}
                    data-brightness={star.brightness}
                    className={`block text-sm ${brightnessClass[star.brightness]} cursor-help`}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onFocus={() => setHoveredStar(star)}
                    onBlur={() => setHoveredStar(null)}
                  >
                    {star.name}
                    {hoveredStar?.name === star.name && (
                      <StarTooltip star={star} />
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Minor Stars */}
            {palace.minorStars.length > 0 && (
              <p className="text-xs text-navy-500 mb-1">
                {palace.minorStars.join(', ')}
              </p>
            )}

            {/* Transformation Badge */}
            {palace.transformation && (
              <span className="inline-block px-1.5 py-0.5 bg-gold-700 text-gold-100 text-xs rounded">
                {palace.transformation}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Expanded Palace Detail */}
      {expandedPalace !== null && (
        <PalaceDetail palace={palaces[expandedPalace]} />
      )}
    </div>
  )
}
