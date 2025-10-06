import { describe, expect, it } from 'vitest'
import { formatWeekday, formatDay, shouldDisplaySeparator } from '../index'

describe('formatWeekday', () => {
  it('formats date to short weekday', () => {
    expect(formatWeekday('2024-06-10')).toMatch(/Mon|Mo|Lu|Lun|Mo./)
  })
})

describe('formatDay', () => {
  it('formats date to numeric day', () => {
    expect(formatDay('2024-06-10')).toBe('10')
  })
})

describe('shouldDisplaySeparator', () => {
  it('returns true if months are different', () => {
    const dates = ['2024-06-30', '2024-07-01']
    expect(shouldDisplaySeparator(dates, 0)).toBe(true)
  })

  it('returns false if months are the same', () => {
    const dates = ['2024-06-10', '2024-06-11']
    expect(shouldDisplaySeparator(dates, 0)).toBe(false)
  })

  it('returns undefined for last index', () => {
    const dates = ['2024-06-10', '2024-06-11']
    expect(shouldDisplaySeparator(dates, 1)).toBe(false)
  })
})
