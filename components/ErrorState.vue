<script setup lang="ts">
defineProps<{ message: string }>()
const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div
    class="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center"
  >
    <p class="font-display text-base font-semibold text-red-700">
      Couldn't load your tasks
    </p>
    <p class="max-w-sm font-body text-sm text-red-600">{{ message }}</p>
    <button
      type="button"
      class="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      @click="emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
