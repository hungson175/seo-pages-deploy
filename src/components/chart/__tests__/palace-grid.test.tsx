/**
 * TDD Tests for STORY-011b: iztro Chart UI Rendering
 * RED phase — write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PalaceGrid, StarTooltip, PalaceDetail } from '../palace-grid'
import type { Palace } from '../palace-grid'

// Mock data — 12 palaces traditional layout
const MOCK_PALACES: Palace[] = [
  { name: 'Mệnh', index: 0, majorStars: [{ name: 'Tử Vi', brightness: 'minh' }], minorStars: ['Ta Phủ'], transformation: 'Hóa Lộc' },
  { name: 'Phụ Mẫu', index: 1, majorStars: [{ name: 'Thiên Cơ', brightness: 'hãm' }], minorStars: [] },
  { name: 'Phúc Đức', index: 2, majorStars: [], minorStars: ['Thiên Khôi'] },
  { name: 'Điền Trạch', index: 3, majorStars: [{ name: 'Thái Dương', brightness: 'bình' }], minorStars: [] },
  { name: 'Quan Lộc', index: 4, majorStars: [{ name: 'Vũ Khúc', brightness: 'minh' }], minorStars: [] },
  { name: 'Nô Bộc', index: 5, majorStars: [], minorStars: [] },
  { name: 'Thiên Di', index: 6, majorStars: [{ name: 'Thiên Đồng', brightness: 'bình' }], minorStars: [] },
  { name: 'Tật Ách', index: 7, majorStars: [], minorStars: ['Thiên Hình'] },
  { name: 'Tài Bạch', index: 8, majorStars: [{ name: 'Liêm Trinh', brightness: 'minh' }], minorStars: [] },
  { name: 'Tử Nữ', index: 9, majorStars: [], minorStars: [] },
  { name: 'Phu Thê', index: 10, majorStars: [{ name: 'Thái Âm', brightness: 'hãm' }], minorStars: [] },
  { name: 'Huynh Đệ', index: 11, majorStars: [], minorStars: [] },
]

describe('PalaceGrid', () => {
  it('renders 12 palace cells', () => {
    const { container } = render(<PalaceGrid palaces={MOCK_PALACES} />)
    const cells = container.querySelectorAll('[data-palace]')
    expect(cells.length).toBe(12)
  })

  it('renders palace names correctly', () => {
    render(<PalaceGrid palaces={MOCK_PALACES} />)
    expect(screen.getByText('Mệnh')).toBeTruthy()
    expect(screen.getByText('Quan Lộc')).toBeTruthy()
    expect(screen.getByText('Phu Thê')).toBeTruthy()
  })

  it('renders major stars with correct brightness class', () => {
    render(<PalaceGrid palaces={MOCK_PALACES} />)
    // Tử Vi (minh) should have bright/star class
    const tuVi = screen.getByText('Tử Vi')
    expect(tuVi).toBeTruthy()
    expect(tuVi.closest('[data-brightness]')?.getAttribute('data-brightness')).toBe('minh')
  })

  it('renders minor stars with smaller text', () => {
    render(<PalaceGrid palaces={MOCK_PALACES} />)
    const taPhu = screen.getByText('Ta Phủ')
    expect(taPhu).toBeTruthy()
  })

  it('renders transformation badges', () => {
    render(<PalaceGrid palaces={MOCK_PALACES} />)
    expect(screen.getByText('Hóa Lộc')).toBeTruthy()
  })

  it('has aria-label for each palace cell', () => {
    const { container } = render(<PalaceGrid palaces={MOCK_PALACES} />)
    const cells = container.querySelectorAll('[data-palace]')
    cells.forEach((cell, i) => {
      expect(cell.getAttribute('aria-label')).toContain(MOCK_PALACES[i].name)
    })
  })

  it('is keyboard navigable (tabindex)', () => {
    const { container } = render(<PalaceGrid palaces={MOCK_PALACES} />)
    const cells = container.querySelectorAll('[data-palace]')
    cells.forEach((cell) => {
      expect(cell.getAttribute('tabindex')).toBe('0')
    })
  })

  it('has aria-live region for chart load', () => {
    const { container } = render(<PalaceGrid palaces={MOCK_PALACES} />)
    const liveRegion = container.querySelector('[aria-live]')
    expect(liveRegion).toBeTruthy()
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite')
  })
})

describe('StarTooltip', () => {
  it('renders star name', () => {
    render(<StarTooltip star={{ name: 'Tử Vi', brightness: 'minh' }} />)
    expect(screen.getByText('Tử Vi')).toBeTruthy()
  })

  it('shows brightness description', () => {
    render(<StarTooltip star={{ name: 'Tử Vi', brightness: 'minh' }} />)
    expect(screen.getByText(/sáng rõ|minh/i)).toBeTruthy()
  })
})

describe('PalaceDetail', () => {
  it('renders palace name as heading', () => {
    render(<PalaceDetail palace={MOCK_PALACES[0]} />)
    const heading = screen.getByRole('heading')
    expect(heading.textContent).toContain('Mệnh')
  })

  it('lists all major stars', () => {
    render(<PalaceDetail palace={MOCK_PALACES[0]} />)
    expect(screen.getByText('Tử Vi')).toBeTruthy()
  })

  it('shows transformation if present', () => {
    render(<PalaceDetail palace={MOCK_PALACES[0]} />)
    expect(screen.getByText(/Hóa Lộc/)).toBeTruthy()
  })
})

describe('STORY-011b: Performance', () => {
  it('PalaceGrid renders within 1 second', () => {
    const start = performance.now()
    render(<PalaceGrid palaces={MOCK_PALACES} />)
    const end = performance.now()
    expect(end - start).toBeLessThan(1000)
  })
})
