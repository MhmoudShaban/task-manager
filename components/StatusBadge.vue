<script setup lang="ts">
import type { TaskStatus } from '~/types/task'

const props = defineProps<{ status: TaskStatus }>()

const styles: Record<TaskStatus, string> = {
  Pending: 'bg-signal-pending/10 text-signal-pending ring-signal-pending/30',
  'In Progress': 'bg-signal-progress/10 text-signal-progress ring-signal-progress/30',
  Done: 'bg-signal-done/10 text-signal-done ring-signal-done/30'
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
    :class="styles[props.status]"
  >
    <span class="h-1.5 w-1.5 rounded-full bg-current" />
    {{ props.status }}
  </span>
</template>
