<script setup lang="ts">
import type { Task } from '~/types/task'

const props = defineProps<{ task: Task }>()
const emit = defineEmits<{ delete: [id: number] }>()

const formattedDueDate = computed(() => {
  const date = new Date(props.task.dueDate)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const isOverdue = computed(() => {
  if (props.task.status === 'Done') return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(props.task.dueDate) < today
})
</script>

<template>
  <article
    class="flex flex-col gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-card transition hover:border-ink-200"
  >
    <div class="flex items-start justify-between gap-2">
      <h3 class="font-display text-base font-semibold text-ink-800">
        <NuxtLink :to="`/tasks/${task.id}`" class="hover:text-signal-progress">
          {{ task.title }}
        </NuxtLink>
      </h3>
      <StatusBadge :status="task.status" />
    </div>

    <p v-if="task.description" class="line-clamp-2 font-body text-sm text-ink-500">
      {{ task.description }}
    </p>

    <div class="mt-1 flex items-center justify-between text-xs font-medium">
      <span :class="isOverdue ? 'text-red-600' : 'text-ink-400'">
        Due {{ formattedDueDate }}
        <span v-if="isOverdue">· overdue</span>
      </span>

      <div class="flex items-center gap-3">
        <NuxtLink :to="`/tasks/${task.id}`" class="text-ink-500 hover:text-signal-progress">
          Edit
        </NuxtLink>
        <button
          type="button"
          class="text-ink-500 hover:text-red-600"
          @click="emit('delete', task.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
</template>
