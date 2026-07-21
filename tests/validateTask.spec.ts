import { describe, expect, it } from 'vitest'
import { isFutureDate, validateTask } from '../utils/validateTask'

function isoDaysFromNow(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

describe('isFutureDate', () => {
  it('returns false for today and past dates', () => {
    expect(isFutureDate(isoDaysFromNow(0))).toBe(false)
    expect(isFutureDate(isoDaysFromNow(-1))).toBe(false)
  })

  it('returns true for a date after today', () => {
    expect(isFutureDate(isoDaysFromNow(1))).toBe(true)
  })

  it('returns false for an empty or invalid string', () => {
    expect(isFutureDate('')).toBe(false)
    expect(isFutureDate('not-a-date')).toBe(false)
  })
})

describe('validateTask', () => {
  it('requires a title', () => {
    const errors = validateTask('   ', isoDaysFromNow(5))
    expect(errors.title).toBeDefined()
    expect(errors.dueDate).toBeUndefined()
  })

  it('requires the due date to be in the future', () => {
    const errors = validateTask('Write report', isoDaysFromNow(-2))
    expect(errors.dueDate).toBeDefined()
  })

  it('returns no errors for a valid task', () => {
    const errors = validateTask('Write report', isoDaysFromNow(3))
    expect(errors).toEqual({})
  })
})
