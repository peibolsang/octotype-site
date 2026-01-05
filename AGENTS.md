# Repository Guidelines

## Project Structure & Module Organization

- `app/` contains Next.js App Router routes, layouts, and API handlers (see `app/api/`).
- `components/` is split by runtime: `components/client/`, `components/server/`, and shared UI primitives in `components/ui/`.
- `lib/` holds shared utilities, API helpers, and metadata helpers (e.g. `lib/api.ts`, `lib/metadata.ts`).
- `interfaces/` stores TypeScript type definitions used across the app.
- `public/` contains static assets (images, icons).
- Tests live alongside code (e.g. `lib/utils.test.ts`).

## Build, Test, and Development Commands

- `npm run dev` starts the Next.js dev server with Turbo (`http://localhost:3000`).
- `npm run build` creates a production build.
- `npm run start` runs the production server from `.next/`.
- `npm run lint` runs Next.js ESLint checks.
- `npm run test` runs Jest in watch mode.

## Coding Style & Naming Conventions

- Language: TypeScript + React (Next.js App Router).
- Indentation: 2 spaces; keep JSX formatting consistent with nearby files.
- Imports use the `@/` alias for project-relative paths (configured in Jest and TS).
- File naming: use lowercase with hyphens for components (e.g. `post-preview.tsx`), PascalCase for exported React components.
- Styling uses Tailwind CSS; prefer utility classes over custom CSS unless a module already exists.

## Testing Guidelines

- Framework: Jest with `jest-environment-jsdom` and Testing Library.
- Test files typically use `*.test.ts` or `*.test.tsx` naming.
- Coverage collection includes `app/`, `components/`, and `lib/` (see `jest.config.js`).
- Run a focused test with `npm run test -- path/to/file.test.ts`.

## Commit & Pull Request Guidelines

- Git history shows short, imperative messages (e.g. “fix dynamic server usage”). Keep messages brief and specific.
- PRs should include: a clear description, relevant screenshots for UI changes, and any linked issues.
- If you add routes or API handlers, mention runtime/ISR settings in the PR summary.

## Configuration Tips

- Next.js config is in `next.config.js`; Tailwind setup in `tailwind.config.ts`.
- If you add environment variables, document them in the PR and ensure they are used via `process.env` in server-only code.
