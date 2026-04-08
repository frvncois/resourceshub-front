# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server with HMR
npm run build     # Type-check + build for production
npm run preview   # Preview production build locally
npm run type-check  # Run vue-tsc type checking only
npm run build-only  # Build without type checking
```

No linting or testing scripts are configured.

## Architecture

Vue 3 SPA with TypeScript, Vite, Tailwind CSS v4, and Pinia. Content is served from a **Strapi headless CMS** with multi-locale support (en, fr, es).

**Bootstrap**: `src/main.ts` creates the app, registers Pinia and Vue Router, mounts to `#app`.

**Routing**: `src/router/index.ts` — web history mode, two routes:
- `/` → `HomeView` — landing page
- `/hub` → `HubView` — filterable resource/partner hub

**App shell**: `App.vue` wraps all views with `SharedHeader`, `SharedCTA`, and `SharedFooter`. It also calls `useContentStore().load()` on mount to fetch home page content for the default locale.

**State**:
- `src/stores/content.ts` — `useContentStore` holds the active `locale` and the `ResourcesHub` single-type content (home page copy). Locale changes here trigger re-fetches in `HubList`.
- `src/stores/hub.ts` — `useHubStore` holds `selectedAudience` and `selectedCategory` filter values. The `counter.ts` store is an unused scaffold.

**Components**: Organized into `components/home/`, `components/hub/`, and `components/shared/`. Views in `src/views/` simply compose these components. `StrapiBlocks.vue` is a shared renderer for Strapi rich-text block arrays (`StrapiBlock[]`).

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Two custom fonts (`heading.otf`, `body.otf`) registered in `src/assets/main.css` as `Heading` and `Body` font families; `font-heading` is exposed as a Tailwind theme token.

**Path alias**: `@` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

**TypeScript**: Strict mode with `noUncheckedIndexedAccess` enabled. Use `vue-tsc` (not `tsc`) for type checking `.vue` files.

## Strapi Integration

**Environment variables** (see `.env.local`):
- `VITE_STRAPI_URL` — Strapi base URL (e.g. `http://localhost:1337`)
- `VITE_STRAPI_TOKEN` — Bearer token for authenticated requests

**API layer** (`src/api/strapi.ts`): All fetch functions live here. Key functions:
- `fetchResources(locale)` — single-locale resource fetch with full populate chain
- `fetchAllResources()` — parallel fetch across en/fr/es locales, returns flattened array
- `fetchPartners(locale)` — partners with logo and country
- `fetchCategories(locale)` / `fetchAudiences()` — used to populate filter dropdowns
- `fetchResourcesHub(locale)` — fetches the `Resources Hub` single type for home page content
- `mediaUrl(path)` — constructs absolute Strapi media URL

**Data models** (`src/api/types.ts`): `Resource`, `Partner`, `Category`, `Audience`, `Country`, `StrapiMedia`, `ResourcesHub`, `StrapiResponse<T>`. Resources relate to Partner (many-to-one), Categories (many-to-many), and Audiences (many-to-many). `ResourcesHub` holds all localized copy fields for the home page sections.

## Hub Filtering

`HubFilter.vue` loads audiences/categories from Strapi on mount (hardcoded to `'en'` locale) and writes selections to `useHubStore`. `HubList.vue` watches the `locale` from `useContentStore` and re-fetches `fetchResources(locale)` or `fetchPartners(locale)` whenever it changes, then applies client-side filtering by `selectedAudience` and `selectedCategory` from `useHubStore`. Partners are not filtered client-side. The `type` prop on `HubList` (`'resource' | 'partner'`) controls which item component (`HubResource` or `HubPartner`) is rendered.
