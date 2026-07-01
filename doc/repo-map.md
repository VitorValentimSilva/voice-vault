# Repository Map

## Root

- Shared tooling and orchestration live here.
- Root lint covers `shared/` only.
- Root typecheck covers `shared/` only.
- Root config files should stay focused on repo-wide conventions, not package internals.

## Backend

- NestJS code lives in `backend/src`.
- Prisma schema and migrations live in `backend/prisma`.
- Backend tests and package-specific lint/typecheck should be run from `backend/`.

## Mobile

- Expo app code lives in `mobile/src`.
- UI assets and app-level config live under `mobile/`.
- Mobile lint and typecheck should be run from `mobile/`.

## Shared Contracts

- Shared enums, DTOs, constants, and error types live in `shared/`.
- Any alias change should be mirrored in root, backend, and mobile tsconfig files.

## Current Command Matrix

- Root lint: `npm run lint`
- Backend lint: `cd backend && npm run lint`
- Mobile lint: `cd mobile && npm run lint`
- Root typecheck: `npm run typecheck` for `shared/`
- Backend typecheck: `cd backend && npm run typecheck`
- Mobile typecheck: `cd mobile && npm run typecheck`
