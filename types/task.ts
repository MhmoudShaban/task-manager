export type TaskStatus = 'Pending' | 'In Progress' | 'Done'

export const TASK_STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Done']

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  dueDate: string // ISO date string, e.g. "2026-08-01"
}

export interface TaskDraft {
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}
