<script setup lang="ts">
import type { TaskDraft } from "~/types/task";

const route = useRoute();
const router = useRouter();
const store = useTasksStore();

const taskId = computed(() => Number(route.params.id));

onMounted(async () => {
  await store.fetchTasks();
});

const task = computed(() => store.getTaskById(taskId.value));

const confirmOpen = ref(false);

function handleSubmit(draft: TaskDraft) {
  store.updateTask(taskId.value, draft);
  router.push("/");
}

function confirmDelete() {
  store.deleteTask(taskId.value);
  confirmOpen.value = false;
  router.push("/");
}
</script>

<template>
  <div class="mx-auto max-w-xl">
    <NuxtLink
      to="/"
      class="text-sm font-medium text-ink-500 hover:text-signal-progress"
    >
      ← Back to tasks
    </NuxtLink>

    <LoadingState v-if="store.loading" />

    <ErrorState
      v-else-if="store.error"
      :message="store.error"
      @retry="store.fetchTasks()"
    />

    <div
      v-else-if="!task"
      class="mt-6 rounded-xl border border-dashed border-ink-200 py-14 text-center"
    >
      <p class="font-display text-base font-semibold text-ink-600">
        Task not found
      </p>
      <p class="mt-1 font-body text-sm text-ink-400">
        It may have already been deleted.
      </p>
    </div>

    <template v-else>
      <div class="mt-3 flex items-center justify-between">
        <h1 class="font-display text-2xl font-semibold text-ink-800">
          Edit task
        </h1>
        <StatusBadge :status="task.status" />
      </div>

      <div
        class="mt-6 rounded-xl border border-ink-100 bg-white p-6 shadow-card"
      >
        <TaskForm
          :initial="{
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
          }"
          submit-label="Save changes"
          @submit="handleSubmit"
        >
          <template #extra-actions>
            <button
              type="button"
              class="rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              @click="confirmOpen = true"
            >
              Delete task
            </button>
          </template>
        </TaskForm>
      </div>
    </template>

    <ConfirmDialog
      :open="confirmOpen"
      title="Delete this task?"
      message="This will permanently remove the task from your list."
      confirm-label="Delete task"
      @confirm="confirmDelete"
      @cancel="confirmOpen = false"
    />
  </div>
</template>
