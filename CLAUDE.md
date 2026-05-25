# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server
yarn start

# Run on specific platform
yarn ios
yarn android
yarn web

# Lint
yarn eslint src/

# Type check
yarn tsc --noEmit
```

There is no test suite configured.

## Environment

Set `EXPO_PUBLIC_API_URL` to the backend base URL. For local dev, point to your local server; for builds, `eas.json` injects the staging URL (`https://backend-homolog.up.railway.app`).

## Architecture

This is the **therapist-facing** Expo app of the Therappi platform. The companion patient app is a separate repository. All API calls include `s_app_origin: 'TH'` to identify the request source.

### Routing (Expo Router v3, file-based)

```
src/app/
  _layout.tsx               — root: providers (QueryClient, Auth, GestureHandler, SafeArea)
  (auth)/                   — unauthenticated screens (sign-in, create-account, forgot-password)
  (app)/
    _layout.tsx             — checks auth; redirects to (auth)/intro if not authenticated
    (tabs)/                 — main app tabs: Home, Meu Perfil, Configurações
    (walkthrough)/          — onboarding intro steps shown after first login
    (therapist-register)/   — multi-step registration wizard (phone → address → photo → profile → session pricing)
```

The `(app)/_layout.tsx` gate: if `isAuthenticated` is false → redirect to `/(auth)/intro`. The `(tabs)/_layout.tsx` gate: checks `THERAPIST_REGISTERED_KEY` in AsyncStorage; if missing → redirect to walkthrough or registration wizard.

### Data Layer

**Pattern:** `services/` → `queries/` → screen components.

- `src/services/` — raw Axios calls, one file per domain (`auth`, `user`, `address`, `userTherapy`, `viaCep`)
- `src/queries/` — TanStack Query wrappers (mutations and queries), consumed directly in screens
- `src/api/axiosConfig.tsx` — single Axios instance; `EXPO_PUBLIC_API_URL` as baseURL; Bearer token injected by `useAuth` after login
- `src/api/InterceptorError.tsx` — global response error interceptor; shows a toast for all API errors
- `src/api/reactQueryConfig.ts` — shared `QueryClient` (staleTime: 20s, no refetch on focus)

### Auth Flow

`src/contexts/useAuth.tsx` — Context + Provider. Session token stored in `expo-secure-store` with a 30-day expiry. User object stored in `expo-secure-store`. Walkthrough/registration flags stored in `AsyncStorage`. On app load, the provider reads SecureStore; if token is expired it calls `signOut()` which clears all storage.

Storage keys are in `src/utils/constants.ts`.

### Client State

`src/stories/useTherapyStore.ts` — Zustand store used during the therapist registration wizard to accumulate multi-screen form data (selected therapy, address, type of service, session price) before a final submit.

### Styling

NativeWind v4 (Tailwind CSS for React Native). Config in `tailwind.config.js`. Custom theme:
- Colors: `brand`, `gray`, `dark`, `feedback` — defined in `src/theme/colors.js`
- Fonts: `Montserrat{Light|Regular|Medium|SemiBold|Bold}` — loaded via `@expo-google-fonts/montserrat`
- Helper: `src/utils/lib/index.tsx` exports `cn()` (clsx + tailwind-merge)

### Path Aliases

`@/*` maps to `src/*`. Use `@/components/...`, `@/queries/...`, etc. everywhere.

### API Field Naming Convention

Backend uses Hungarian notation: `s_` prefix for strings, `d_` for dates, `n_` for numbers. Response objects (TypeScript types in `src/types/`) use camelCase equivalents (e.g., `sName`, `dBirthDate`). Keep this pattern when adding new API interactions.

### Forms

React Hook Form + Zod. Schema defined inline or colocated with the screen file.

### User Registration Status

`WarningData` type (`src/types/user.ts`) models registration completeness. `s_status` values: `P` (Pending), `I` (Incomplete), `A` (Approved), `R` (Rejected). `s_module` values: `SC` (ScheduleConfig), `BA` (BankAccountConfig), `TH` (TherapyConfig), `PE` (PersonalConfig).
