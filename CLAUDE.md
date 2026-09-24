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
  _layout.tsx                   — root: providers (QueryClient, Auth, GestureHandler, SafeArea)
  (auth)/                       — unauthenticated screens
    intro.tsx                   — landing/welcome
    sign-in.tsx
    create-account/             — multi-step: index → account-email/[name] → account-password/[...user] → feedback
    forgot-password/            — [email] → feedback
  (app)/
    _layout.tsx                 — auth gate: redirects to /(auth)/intro if not authenticated; shows custom SplashScreen while fonts load (3s delay)
    (tabs)/                     — main app: Home, Meu Perfil (profile/), Configurações
      profile/
        index.tsx
        registration-data.tsx
    (walkthrough)/              — onboarding: intro → step-1 through step-5
    (therapist-register)/       — registration wizard (see flow below)
```

**Registration wizard flow** (`(therapist-register)/`):
`phoneNumber` → `date-birth/[phoneNumber]` → `photo/` → `photo/addPhoto/` → `profissional-data/` → `profissional-data/bio` → `profissional-data/therapy/` → `profissional-data/therapy/select-therapy` → `profissional-data/therapy/feedbackTherapy` → `profissional-data/type-service` → `address/cep` → `address/full-address/[cep]` → `session/cost` → `session/duration` → `session/feedback`

**Navigation gates:**
- `(app)/_layout.tsx`: if `isAuthenticated` is false → redirect to `/(auth)/intro`
- `(tabs)/_layout.tsx`: checks `THERAPIST_REGISTERED_KEY` in AsyncStorage; if missing → redirect to `/(app)/(walkthrough)/intro`
- `(therapist-register)/_layout.tsx`: if `THERAPIST_REGISTERED_KEY` is set → redirect to `/(app)/(tabs)`

### Data Layer

**Pattern:** `services/` → `queries/` → screen components.

- `src/services/` — raw Axios calls, one file per domain (`auth`, `user`, `address`, `userTherapy`, `viaCep`)
- `src/queries/` — TanStack Query wrappers (mutations and queries), consumed directly in screens
- `src/api/axiosConfig.tsx` — single Axios instance; `EXPO_PUBLIC_API_URL` as baseURL; Bearer token injected by `useAuth` after login
- `src/api/InterceptorError.tsx` — global response error interceptor; shows a toast for all API errors
- `src/api/reactQueryConfig.ts` — shared `QueryClient` (staleTime: 20s, no refetch on focus)

### Auth Flow

`src/contexts/useAuth.tsx` — Context + Provider. Session token stored in `expo-secure-store` with a 30-day expiry. User object stored in `expo-secure-store`. Walkthrough/registration flags stored in `AsyncStorage`. On app load, the provider reads SecureStore; if token is expired it calls `signOut()` which clears all storage.

Storage keys (in `src/utils/constants.ts`):
- `therappi.therapist.token` — SecureStore: JWT
- `therappi.therapist.user` — SecureStore: user object
- `therappi.therapist.walkthrough` — AsyncStorage: walkthrough seen flag
- `therappi.therapist.registered` — AsyncStorage: registration complete flag

### Client State

`src/stories/useTherapyStore.ts` — Zustand store used during the registration wizard to accumulate form data (`selectedTherapy`, `address`, `typeOfService`, `currency`) before a final submit. Reset between wizard runs.

### Layout Components

- `src/layout/CardStack/` — branded full-screen wrapper (brand-color background + stacked white cards visual). Used on auth/onboarding screens.
- `src/layout/KeyboardAvoidingViewLayout/` — scrollable layout with a branded header slot; used on form screens.
- `src/hooks/useKeyboardStatus.tsx` — returns `'active' | 'inactive'`.
- `src/hooks/useAnimatedKeyboardAwareStyle.tsx` — Reanimated `translateY` for Android small-screen keyboard avoidance (height < 700px).

### Styling

NativeWind v4 (Tailwind CSS for React Native). Config in `tailwind.config.js`. Custom theme:
- Colors: `brand`, `gray`, `dark`, `feedback` — defined in `src/theme/colors.js`
- Fonts: `Montserrat{Light|Regular|Medium|SemiBold|Bold}` — loaded via `@expo-google-fonts/montserrat`; use class names like `font-MontserratSemiBold`
- Helper: `src/utils/lib/index.tsx` exports `cn()` (clsx + tailwind-merge)

### Path Aliases

`@/*` maps to `src/*`. Use `@/components/...`, `@/queries/...`, etc. everywhere.

### API Field Naming Convention

Backend uses Hungarian notation: `s_` prefix for strings, `d_` for dates, `n_` for numbers. TypeScript types in `src/types/` use camelCase equivalents (e.g., `sName`, `dBirthDate`). Request bodies sent to the API keep the original `s_`/`d_`/`n_` snake_case keys. Keep this pattern when adding new API interactions.

### Forms

React Hook Form + Zod. Schema defined inline or colocated with the screen file. Validation mode is typically `'all'`.

### User Registration Status

`WarningData` type (`src/types/user.ts`) models registration completeness. `s_status` values: `P` (Pending), `I` (Incomplete), `A` (Approved), `R` (Rejected). `s_module` values: `SC` (ScheduleConfig), `BA` (BankAccountConfig), `TH` (TherapyConfig), `PE` (PersonalConfig).
