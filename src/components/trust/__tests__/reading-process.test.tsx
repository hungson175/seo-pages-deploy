/**
 * TDD Tests for ReadingProcess trust component
 * RED phase — write failing tests first
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReadingProcess } from '../reading-process'

describe('ReadingProcess', () => {
  it('renders with title visible', () => {
    render(<ReadingProcess />)
    expect(screen.getByText('Cách chúng tôi đọc lá số')).toBeTruthy()
  })

  it('renders all 4 bullet points', () => {
    const { container } = render(<ReadingProcess />)
    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(4)
  })

  it('bullet 1 mentions Tam Hợp Phái algorithm', () => {
    render(<ReadingProcess />)
    expect(screen.getByText(/thuật toán Tử Vi Tam Hợp Phái/i)).toBeTruthy()
  })

  it('bullet 2 mentions 12 cung and sao', () => {
    render(<ReadingProcess />)
    expect(screen.getByText(/12 cung/i)).toBeTruthy()
    expect(screen.getByText(/sao chính\/phụ/i)).toBeTruthy()
  })

  it('bullet 3 mentions AI giải thích', () => {
    render(<ReadingProcess />)
    expect(screen.getByText(/AI giải thích/i)).toBeTruthy()
  })

  it('bullet 4 mentions tham khảo', () => {
    render(<ReadingProcess />)
    expect(screen.getByText(/tham khảo/i)).toBeTruthy()
  })

  it('uses native details element for expand/collapse', () => {
    const { container } = render(<ReadingProcess />)
    const details = container.querySelector('details')
    expect(details).toBeTruthy()
    const summary = container.querySelector('summary')
    expect(summary).toBeTruthy()
  })

  it('has chevron indicator for expand state', () => {
    const { container } = render(<ReadingProcess />)
    const chevron = container.querySelector('[class*="rotate-180"]')
    expect(chevron).toBeTruthy()
  })

  it('is not defensive-looking — no shield or verified text', () => {
    const { container } = render(<ReadingProcess />)
    const text = container.textContent || ''
    expect(text).not.toMatch(/xác thực/i)
    expect(text).not.toMatch(/chứng nhận/i)
    expect(text).not.toMatch(/đảm bảo/i)
  })
})
