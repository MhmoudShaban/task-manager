<script setup lang="ts">
import { TASK_STATUSES } from '~/types/task'

const store = useTasksStore()
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition"
        :class="
          store.statusFilter === 'All'
            ? 'bg-ink-800 text-white'
            : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
        "
        @click="store.setStatusFilter('All')"
      >
        All ({{ store.tasks.length }})
      </button>
      <button
        v-for="status in TASK_STATUSES"
        :key="status"
        type="button"
        class="rounded-full px-3.5 py-1.5 text-sm font-medium transition"
        :class="
          store.statusFilter === status
            ? 'bg-ink-800 text-white'
            : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
        "
        @click="store.setStatusFilter(status)"
      >
        {{ status }} ({{ store.taskCountByStatus(status) }})
      </button>
    </div>

    <label class="relative block w-full sm:w-64">
      <span class="sr-only">Search tasks by title</span>
      <input
        :value="store.searchQuery"
        type="search"
        placeholder="Search by title…"
        class="w-full rounded-lg border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-300 focus:border-signal-progress focus:outline-none focus:ring-2 focus:ring-signal-progress/20"
        @input="store.setSearchQuery(($event.target as HTMLInputElement).value)"
      >
      <svg
        class="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-ink-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </label>
  </div>
</template>
