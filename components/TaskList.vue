<script setup lang="ts">
import type { Task } from '~/types/task'

defineProps<{ tasks: Task[] }>()
const emit = defineEmits<{ delete: [id: number] }>()
</script>

<template>
  <div v-if="tasks.length === 0" class="rounded-xl border border-dashed border-ink-200 py-14 text-center">
    <p class="font-display text-base font-semibold text-ink-600">No tasks match here</p>
    <p class="mt-1 font-body text-sm text-ink-400">
      Try a different status filter or search term — or add a new task.
    </p>
  </div>

  <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @delete="(id) => emit('delete', id)"
    />
  </div>
</template>
