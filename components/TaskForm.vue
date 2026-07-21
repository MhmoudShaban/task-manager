<script setup lang="ts">
import { TASK_STATUSES, type TaskDraft } from '~/types/task'
import { validateTask } from '~/utils/validateTask'

const props = withDefaults(
  defineProps<{
    initial?: TaskDraft
    submitLabel?: string
  }>(),
  {
    submitLabel: 'Save task'
  }
)

const emit = defineEmits<{ submit: [draft: TaskDraft] }>()

const form = reactive<TaskDraft>({
  title: props.initial?.title ?? '',
  description: props.initial?.description ?? '',
  status: props.initial?.status ?? 'Pending',
  dueDate: props.initial?.dueDate ?? ''
})

const errors = ref<{ title?: string; dueDate?: string }>({})
const touched = ref(false)

const todayIso = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1) // earliest valid due date is tomorrow
  return date.toISOString().slice(0, 10)
})

function handleSubmit() {
  touched.value = true
  errors.value = validateTask(form.title, form.dueDate)

  if (Object.keys(errors.value).length > 0) return

  emit('submit', { ...form })
}
</script>

<template>
  <form class="flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
    <div>
      <label for="title" class="mb-1 block text-sm font-medium text-ink-700">
        Title <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        placeholder="e.g. Prepare quarterly report"
        class="w-full rounded-lg border px-3 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2"
        :class="
          touched && errors.title
            ? 'border-red-400 focus:ring-red-100'
            : 'border-ink-200 focus:border-signal-progress focus:ring-signal-progress/20'
        "
      >
      <p v-if="touched && errors.title" class="mt-1 text-xs font-medium text-red-600">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label for="description" class="mb-1 block text-sm font-medium text-ink-700">
        Description
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        placeholder="Add any useful detail…"
        class="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-700 focus:border-signal-progress focus:outline-none focus:ring-2 focus:ring-signal-progress/20"
      />
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label for="status" class="mb-1 block text-sm font-medium text-ink-700">
          Status
        </label>
        <select
          id="status"
          v-model="form.status"
          class="w-full rounded-lg border border-ink-200 px-3 py-2 text-sm text-ink-700 focus:border-signal-progress focus:outline-none focus:ring-2 focus:ring-signal-progress/20"
        >
          <option v-for="status in TASK_STATUSES" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <div>
        <label for="dueDate" class="mb-1 block text-sm font-medium text-ink-700">
          Due date <span class="text-red-500">*</span>
        </label>
        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
          :min="todayIso"
          class="w-full rounded-lg border px-3 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2"
          :class="
            touched && errors.dueDate
              ? 'border-red-400 focus:ring-red-100'
              : 'border-ink-200 focus:border-signal-progress focus:ring-signal-progress/20'
          "
        >
        <p v-if="touched && errors.dueDate" class="mt-1 text-xs font-medium text-red-600">
          {{ errors.dueDate }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button
        type="submit"
        class="rounded-lg bg-ink-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink-900"
      >
        {{ submitLabel }}
      </button>
      <slot name="extra-actions" />
    </div>
  </form>
</template>
