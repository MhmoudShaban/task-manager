<script setup lang="ts">
const store = useTasksStore()

onMounted(() => {
  store.fetchTasks()
})

const taskPendingDelete = ref<number | null>(null)

function requestDelete(id: number) {
  taskPendingDelete.value = id
}

function confirmDelete() {
  if (taskPendingDelete.value !== null) {
    store.deleteTask(taskPendingDelete.value)
  }
  taskPendingDelete.value = null
}

function cancelDelete() {
  taskPendingDelete.value = null
}

function retryFetch() {
  store.loaded = false
  store.fetchTasks()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="font-display text-2xl font-semibold text-ink-800">Your tasks</h1>
      <p class="mt-1 font-body text-sm text-ink-400">
        Track progress, filter by status, and keep due dates in view.
      </p>
    </div>

    <LoadingState v-if="store.loading" />

    <ErrorState v-else-if="store.error" :message="store.error" @retry="retryFetch" />

    <template v-else>
      <TaskFilters />
      <TaskList :tasks="store.filteredTasks" @delete="requestDelete" />
    </template>

    <ConfirmDialog
      :open="taskPendingDelete !== null"
      title="Delete this task?"
      message="This will permanently remove the task from your list."
      confirm-label="Delete task"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
