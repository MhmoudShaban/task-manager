import type { Task, TaskStatus } from '~/types/task'

interface JsonPlaceholderTodo {
  id: number
  title: string
  completed: boolean
}

const STATUSES: TaskStatus[] = ['Pending', 'In Progress', 'Done']

function statusForTodo(todo: JsonPlaceholderTodo): TaskStatus {
  if (todo.completed) return 'Done'
  // Deterministic-but-varied split between Pending / In Progress
  return todo.id % 3 === 0 ? 'In Progress' : 'Pending'
}

function dueDateForTodo(todo: JsonPlaceholderTodo): string {
  const daysFromNow = ((todo.id * 7) % 20) + 3 // spread tasks 3-22 days out
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString().slice(0, 10)
}

/**
 * Simulates a mock API: pulls sample data from JSONPlaceholder and
 * reshapes it into our Task model. A short artificial delay keeps the
 * loading state visible, and network/HTTP failures are surfaced to
 * the caller so the UI can render an error state.
 */
export function useTaskApi() {
  async function fetchInitialTasks(): Promise<Task[]> {
    const todos = await $fetch<JsonPlaceholderTodo[]>(
      'https://jsonplaceholder.typicode.com/todos',
      { params: { _limit: 12 } }
    )

    // Small artificial delay so the loading UI is actually observable.
    await new Promise((resolve) => setTimeout(resolve, 600))

    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
      description: `Imported sample task #${todo.id} from the mock API.`,
      status: statusForTodo(todo),
      dueDate: dueDateForTodo(todo)
    }))
  }

  return { fetchInitialTasks }
}
