# Task Manager

A small task management app built with **Vue 3 (Composition API)** and **Nuxt 3**, as a technical assessment project.

## Features

- Task list showing title, description, status, and due date.
- Add task form with validation (title required, due date must be in the future).
- Edit and delete existing tasks, with a confirmation dialog on delete.
- Filter by status and search by title (combinable).
- Initial data pulled from a mock API ([JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)) and reshaped into the app's task model, with a short artificial delay so the loading state is visible.
- Loading and error states, with a retry action if the initial fetch fails.

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

Requires Node.js 18+ and npm.

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

> If `npm install` reports a peer-dependency resolution error, retry with
> `npm install --legacy-peer-deps` — the Nuxt module ecosystem currently
> declares peer ranges that some npm versions resolve too eagerly.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Task manager: Vue 3 + Nuxt + Pinia + Tailwind"
git branch -M main
git remote add origin <your-empty-repo-url>
git push -u origin main
```

## Notes on a few decisions

- **Mock API**: JSONPlaceholder's `/todos` endpoint is fetched once on load
  and mapped into the app's `Task` shape (status derived from `completed` /
  id, due dates spread over the next few weeks). All further CRUD operations
  (add/edit/delete) are handled entirely in the Pinia store, since
  JSONPlaceholder doesn't persist writes.
- **Validation** lives in `utils/validateTask.ts` as plain functions rather
  than inline in the form component, so it can be unit-tested in isolation
  and reused if a second form ever needs the same rules.
- **Filtering** (`filteredTasks` getter) combines the status filter and
  search query as a computed getter, so the list re-renders only when the
  underlying state actually changes, and the filter logic isn't duplicated
  in the template.
- **Confirm on delete**: deleting is a destructive, irreversible action in
  this app, so both the list and detail pages route deletes through a
  shared `ConfirmDialog` component rather than deleting immediately.
