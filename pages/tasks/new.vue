<script setup lang="ts">
import type { TaskDraft } from '~/types/task'

const store = useTasksStore()
const router = useRouter()

onMounted(() => {
  store.fetchTasks()
})

function handleSubmit(draft: TaskDraft) {
  store.addTask(draft)
  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-xl">
    <NuxtLink to="/" class="text-sm font-medium text-ink-500 hover:text-signal-progress">
      ← Back to tasks
    </NuxtLink>

    <h1 class="mt-3 font-display text-2xl font-semibold text-ink-800">Add a new task</h1>
    <p class="mt-1 font-body text-sm text-ink-400">
      Give it a clear title and a realistic due date.
    </p>

    <div class="mt-6 rounded-xl border border-ink-100 bg-white p-6 shadow-card">
      <TaskForm submit-label="Create task" @submit="handleSubmit" />
    </div>
  </div>
</template>
