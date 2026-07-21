<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), {
  label: 'Loading tasks…'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
    <span
      class="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-signal-progress"
      role="status"
      aria-label="Loading"
    />
    <p class="font-body text-sm">{{ label }}</p>
  </div>
</template>
