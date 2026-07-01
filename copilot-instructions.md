# Copilot Instructions

## Repo Layout

- `shared/` owns cross-package enums, DTOs, errors, and constants.
- `backend/` owns the NestJS API, Prisma schema, migrations, and backend-specific tests.
- `mobile/` owns the Expo app, mobile UI, and mobile-specific tests.
- The repository root owns shared tooling, top-level config, and package orchestration.

## Working Rules

- Prefer the smallest change that fixes the real cause.
- Do not let root lint or typecheck silently recurse into `backend/` or `mobile/`.
- Use package-local commands when validating package-specific code.
- Keep shared aliases in sync across root, backend, and mobile tsconfig files.
- If a change touches shared code, check both backend and mobile consumers.

## Validation Order

- Root lint: `npm run lint`
- Backend lint: `cd backend && npm run lint`
- Mobile lint: `cd mobile && npm run lint`
- Then run the matching package typecheck if the change affects types or aliases.

## Useful Notes

- Backend Jest uses package-local path mapping plus explicit shared aliases.
- Mobile lint depends on Expo's flat config and React-related rules.
- Root lint currently targets `shared/` only by design.
- Root typecheck currently targets `shared/` only by design.
