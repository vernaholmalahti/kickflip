# CLAUDE.md — Kickflip

Kickflip is a gamified mobile app that helps teenagers (12–14) with ADHD **start** and **finish** everyday tasks: homework, chores, getting ready. Tasks are broken into tiny steps, done in short visual focus sessions ("skate sessions"), and rewarded with XP, levels and unlockable skate gear.

This is a **portfolio project** built by one developer who is learning React Native. Code quality, readability and good commit history matter as much as features.

## Read these first

| File | What it covers |
|---|---|
| `docs/PRD.md` | Product vision, users, MVP scope, non-goals |
| `docs/GAME_DESIGN.md` | XP, levels, unlocks, achievements, weekly goal — exact numbers |
| `docs/SCREENS.md` | Every screen, its contents and navigation |
| `docs/ARCHITECTURE.md` | Tech stack, folder structure, data model, state, storage |
| `docs/DESIGN_SYSTEM.md` | Colours, type, motion, accessibility, tone of voice |
| `docs/ROADMAP.md` | Build order, broken into small tasks with "done when" criteria |

When a doc and the code disagree, ask which one is right; don't silently pick one.

## How to work with me (the developer)

- **Work through `docs/ROADMAP.md` one task at a time.** Don't start the next task until I say so.
- **Before writing code, give a short plan:** which files you'll create or change, and why.
- **Walk me through changes one at a time and explain why.** I want to understand the code, not just copy it. Don't hand me a whole replaced file without explaining what changed. When you introduce a new concept (e.g. a Zustand store, an Expo Router layout, a Reanimated shared value), explain it in 2–4 sentences.
- **Keep changes small** — one roadmap task should normally be one commit.
- **Ask before adding any dependency** not listed in `docs/ARCHITECTURE.md`.
- After each task: run typecheck, lint and tests, and tell me how to try the feature in Expo Go.
- Suggest a commit message (Conventional Commits, e.g. `feat(tasks): add step checklist`).

## Tech stack (summary — details in ARCHITECTURE.md)

Expo (latest SDK) · TypeScript (strict) · Expo Router · Zustand + AsyncStorage persistence · Reanimated · expo-haptics · expo-audio · expo-notifications (local only) · Jest (jest-expo) + React Native Testing Library

## Commands

```bash
npx expo start          # run dev server (open in Expo Go)
npm run typecheck       # tsc --noEmit
npm run lint            # eslint
npm test                # jest
```

(Add these scripts to package.json in roadmap task 0.1 if they don't exist.)

## Code conventions

- TypeScript strict mode. No `any` unless commented why.
- Functional components + hooks only.
- **All game rules live in `src/game/` as pure functions** (no React, no storage) and have unit tests. UI calls them; it never re-implements rules.
- Every number from `docs/GAME_DESIGN.md` lives in `src/game/config.ts`, not hard-coded in components.
- **All user-facing text goes in `src/i18n/en.ts`** — never inline strings in components. (Finnish comes later; this keeps it easy.)
- Use theme tokens from `src/theme/` — no raw hex colours or magic numbers in components.
- File names: `PascalCase.tsx` for components, `camelCase.ts` for everything else.
- Small components (aim < 150 lines). Extract when it grows.
- Every interactive element has an `accessibilityLabel` and a touch target ≥ 48×48.

## Non-negotiable product rules

These come from ADHD research and user needs. Never break them, even if it seems like a nice feature:

1. **Progress never goes backwards.** No losing XP, levels, items or streaks.
2. **No shame.** No red "failed"/"overdue" states, no guilt copy. Missed things are neutral.
3. **Starting is rewarded**, not only finishing.
4. **Privacy first.** No accounts, no network calls, no analytics, no ads, no in-app purchases. All data stays on the device. Users are minors.
5. **Respect settings:** reduce motion, sound off, haptics off must all work.
6. **Max one reminder notification per day**, opt-in only.

## Definition of done (every task)

- Typecheck, lint and tests pass
- New game logic has unit tests
- Works on a small phone screen (iPhone SE size) and with large system font
- No hard-coded strings, colours or game numbers
- I've had the changes explained
