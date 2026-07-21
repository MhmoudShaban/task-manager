# Task Manager

A small task management app built with **Vue 3 (Composition API)** and **Nuxt 3**, as a technical assessment project.

## Tech stack

- **Nuxt 3** + **Vue 3** (`<script setup>` everywhere)
- **Pinia** for state management (`stores/tasks.ts`)
- **Tailwind CSS** for styling (`@nuxtjs/tailwindcss`)
- **TypeScript** throughout
- **Vue Router**, via Nuxt's file-based routing (`pages/`)
- **Vitest** + `@vue/test-utils` for unit tests

## Project structure

```
components/     Reusable UI: TaskCard, TaskList, TaskForm, TaskFilters,
                 StatusBadge, LoadingState, ErrorState, ConfirmDialog
composables/     useTaskApi — mock API layer
stores/          tasks.ts — Pinia store (state, getters, CRUD actions)
types/           task.ts — shared Task / TaskDraft / TaskStatus types
utils/           validateTask.ts — pure, unit-tested validation helpers
pages/           index.vue        Task list page
                 tasks/new.vue    Add task page
                 tasks/[id].vue   Task detail / edit page
layouts/         default.vue — header + page shell
tests/           Vitest specs for the store and validation utilities
```

## Getting started

```bash
# install dependencies
npm install

# run the dev server (http://localhost:3000)
npm run dev

# type-check + build for production
npm run build
npm run preview

# run the unit tests
npm run test
```