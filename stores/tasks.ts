import { defineStore } from 'pinia'
import type { Task, TaskDraft, TaskStatus } from '~/types/task'

interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
  loaded: boolean
  statusFilter: TaskStatus | 'All'
  searchQuery: string
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    loading: false,
    error: null,
    loaded: false,
    statusFilter: 'All',
    searchQuery: ''
  }),

  getters: {
    filteredTasks(state): Task[] {
      const query = state.searchQuery.trim().toLowerCase()

      return state.tasks.filter((task) => {
        const matchesStatus =
          state.statusFilter === 'All' || task.status === state.statusFilter
        const matchesSearch =
          query.length === 0 || task.title.toLowerCase().includes(query)
        return matchesStatus && matchesSearch
      })
    },

    getTaskById(state) {
      return (id: number) => state.tasks.find((task) => task.id === id)
    },

    taskCountByStatus(state) {
      return (status: TaskStatus) =>
        state.tasks.filter((task) => task.status === status).length
    }
  },

  actions: {
    async fetchTasks() {
      if (this.loaded) return

      this.loading = true
      this.error = null

      try {
        const { fetchInitialTasks } = useTaskApi()
        this.tasks = await fetchInitialTasks()
        this.loaded = true
      } catch (err) {
        this.error =
          err instanceof Error
            ? err.message
            : 'Something went wrong while loading tasks.'
      } finally {
        this.loading = false
      }
    },

    addTask(draft: TaskDraft) {
      const nextId =
        this.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1

      const task: Task = { id: nextId, ...draft }
      this.tasks.unshift(task)
      return task
    },

    updateTask(id: number, draft: TaskDraft) {
      const index = this.tasks.findIndex((task) => task.id === id)
      if (index === -1) return

      this.tasks[index] = { id, ...draft }
    },

    deleteTask(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },

    setStatusFilter(status: TaskStatus | 'All') {
      this.statusFilter = status
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    }
  }
})
