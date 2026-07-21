export interface TaskFormErrors {
  title?: string
  dueDate?: string
}

/**
 * True when the given ISO date string represents a calendar day
 * strictly after today (time-of-day is ignored).
 */
export function isFutureDate(dateStr: string): boolean {
  if (!dateStr) return false

  const due = new Date(dateStr)
  if (Number.isNaN(due.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return due.getTime() > today.getTime()
}

/**
 * Validates the fields of a task form. Returns an object containing
 * only the fields that failed validation.
 */
export function validateTask(title: string, dueDate: string): TaskFormErrors {
  const errors: TaskFormErrors = {}

  if (!title || !title.trim()) {
    errors.title = 'Title is required.'
  }

  if (!dueDate) {
    errors.dueDate = 'Due date is required.'
  } else if (!isFutureDate(dueDate)) {
    errors.dueDate = 'Due date must be in the future.'
  }

  return errors
}
