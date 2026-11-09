# Kickflip 🛹

A skate-themed game that helps teens (12–14) with ADHD **start** and **finish** everyday tasks. Tasks become tiny steps, done in short visual focus sessions and rewarded with XP, levels and unlockable skate gear, with no shame and no data leaving the phone.

> Portfolio project, work in progress. Built while learning React Native.

## Tech stack

Expo (SDK 58) · TypeScript (strict) · Expo Router · Zustand + AsyncStorage · Reanimated · Jest + React Native Testing Library

## Run it

```bash
npm install
npx expo start      # scan the QR code with Expo Go
```

| Script | What it does |
|---|---|
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint + Prettier check |
| `npm test` | Jest unit tests |
| `npm run format` | Format all files with Prettier |

## Docs

- [Product requirements](docs/PRD.md)
- [Game design](docs/GAME_DESIGN.md)
- [Screens](docs/SCREENS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Roadmap](docs/ROADMAP.md)

## Working with Claude

`CLAUDE.md` is loaded automatically by Claude Code. Extra development instructions live in [`instructions/`](instructions/):

- Add a new file by copying `instructions/_TEMPLATE.md`, e.g. to `instructions/20-code-style.md`.
- Number prefixes set the reading order; higher numbers win on conflicts.
- Files starting with `_` are ignored.
