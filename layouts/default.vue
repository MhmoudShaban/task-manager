<template>
  <div class="min-h-screen bg-ink-50 font-body text-ink-800">
    <header class="border-b border-ink-100 bg-white">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <NuxtLink to="/" class="flex items-center gap-2 font-display text-lg font-semibold text-ink-800">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-800 text-sm font-bold text-white">
            T
          </span>
          Task Manager
        </NuxtLink>
        <NuxtLink
          to="/tasks/new"
          class="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-ink-900 transition hover:brightness-95"
        >
          + New task
        </NuxtLink>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <slot />
    </main>
  </div>
</template>
