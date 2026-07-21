import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTasksStore } from '../stores/tasks'
import type { TaskDraft } from '../types/task'

const draft: TaskDraft = {
  title: 'Write onboarding guide',
  description: 'Draft the first version for new hires.',
  status: 'Pending',
  dueDate: '2099-01-01'
}

describe('useTasksStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a task with an incrementing id', () => {
    const store = useTasksStore()

    const first = store.addTask(draft)
    const second = store.addTask({ ...draft, title: 'Second task' })

    expect(store.tasks).toHaveLength(2)
    expect(second.id).toBeGreaterThan(first.id)
  })

  it('updates an existing task in place', () => {
    const store = useTasksStore()
    const task = store.addTask(draft)

    store.updateTask(task.id, { ...draft, status: 'Done', title: 'Updated title' })

    expect(store.tasks[0].status).toBe('Done')
    expect(store.tasks[0].title).toBe('Updated title')
  })

  it('deletes a task by id', () => {
    const store = useTasksStore()
    const task = store.addTask(draft)

    store.deleteTask(task.id)

    expect(store.tasks).toHaveLength(0)
  })

  it('filters tasks by status and search query together', () => {
    const store = useTasksStore()
    store.addTask({ ...draft, title: 'Fix login bug', status: 'In Progress' })
    store.addTask({ ...draft, title: 'Fix payments bug', status: 'Done' })
    store.addTask({ ...draft, title: 'Write changelog', status: 'In Progress' })

    store.setStatusFilter('In Progress')
    store.setSearchQuery('fix')

    expect(store.filteredTasks).toHaveLength(1)
    expect(store.filteredTasks[0].title).toBe('Fix login bug')
  })
})
