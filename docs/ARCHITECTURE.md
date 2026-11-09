# Kickflip — Architecture

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Expo (latest SDK), managed workflow** | Runs in Expo Go, no native setup |
| Language | **TypeScript, strict** | Catch errors early, self-documenting |
| Navigation | **Expo Router** (file-based) | Standard for new Expo apps |
| State | **Zustand** with `persist` middleware | Simple, little boilerplate, easy to explain |
| Storage | **@react-native-async-storage/async-storage** | Local only, enough for this data size |
| Animation | **react-native-reanimated** | Smooth 60fps animations, `useReducedMotion` |
| Haptics | **expo-haptics** | |
| Sound | **expo-audio** | |
| Notifications | **expo-notifications** (local only) | Session end + optional daily reminder |
| Screen awake | **expo-keep-awake** | During sessions |
| Dates | **date-fns** | Week boundaries, "days since" |
| IDs | **expo-crypto** `randomUUID()` | |
| Fonts | **@expo-google-fonts/*** (see DESIGN_SYSTEM) | |
| Tests | **jest-expo** + **@testing-library/react-native** | |
| Lint/format | ESLint (expo config) + Prettier | |

Any other dependency → ask first.

**No network calls at all.** No backend, no analytics SDK, no crash reporter that sends data.

## 2. Folder structure

```
kickflip/
├── src/
│   ├── app/                    # Expo Router routes (screens only, thin)
│   │   ├── _layout.tsx         # root: fonts, theme, onboarding gate
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx       # Today
│   │   │   ├── garage.tsx
│   │   │   ├── tricks.tsx
│   │   │   └── me.tsx
│   │   ├── onboarding/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx … week.tsx
│   │   ├── mission/
│   │   │   ├── new.tsx
│   │   │   ├── [id].tsx
│   │   │   └── [id]/edit.tsx
│   │   ├── session/[missionId].tsx
│   │   ├── reward.tsx
│   │   ├── crate.tsx
│   │   └── settings.tsx
│   ├── game/                   # PURE game logic — no React, no storage
│   │   ├── config.ts           # every number from GAME_DESIGN.md
│   │   ├── xp.ts               # xpForEvent, totalXp
│   │   ├── levels.ts           # levelFromXp, xpToNext, levelTitle
│   │   ├── items.ts            # item catalogue
│   │   ├── crates.ts           # rollCrate(owned, rng, pityCounter)
│   │   ├── achievements.ts     # definitions + checkAchievements(state)
│   │   ├── rideDays.ts         # week calc, isRideDay, goal hit
│   │   ├── comeback.ts
│   │   ├── templates.ts        # mission templates
│   │   └── __tests__/
│   ├── store/
│   │   ├── useMissionStore.ts
│   │   ├── usePlayerStore.ts   # xp ledger, level, items, achievements, loadout
│   │   ├── useSessionStore.ts  # active session (persisted for background safety)
│   │   ├── useSettingsStore.ts
│   │   └── actions.ts          # cross-store actions, e.g. completeStep()
│   ├── components/             # reusable UI (Button, Card, XpBar, Chip…)
│   ├── features/               # feature-specific components
│   │   ├── today/  mission/  session/  garage/  tricks/  reward/
│   ├── hooks/                  # useFeedback (sound+haptic), useCountdown…
│   ├── services/
│   │   ├── notifications.ts
│   │   ├── sound.ts
│   │   └── haptics.ts
│   ├── theme/                  # colors, spacing, typography, radii
│   ├── i18n/
│   │   ├── en.ts               # all strings
│   │   └── t.ts                # tiny t() helper
│   └── types/                  # shared domain types
├── assets/  (images/, sounds/, fonts/)
├── docs/
└── CLAUDE.md
```

**Rule:** files in `src/app/` stay thin (Expo SDK 58 default location; every file there is a route, so nothing else goes in it) — they compose components from `src/features/` and call store actions.

## 3. Data model

```ts
// src/types/domain.ts
export type ID = string;
export type ISODate = string; // ISO 8601 timestamp

export type MissionSize = 'S' | 'M' | 'L';

export interface Step {
  id: ID;
  title: string;
  done: boolean;
  doneAt?: ISODate;
  xpAwarded: boolean;   // true after first completion — prevents XP farming
}

export interface Mission {
  id: ID;
  title: string;
  steps: Step[];
  size: MissionSize;
  forToday: boolean;
  templateId?: string;
  createdAt: ISODate;
  landedAt?: ISODate;   // set when all steps done
  lastDropInDate?: string; // 'yyyy-MM-dd' — for once-per-day drop-in XP
  order: number;
}

export interface FocusSession {
  id: ID;
  missionId?: ID;
  plannedMinutes: 2 | 5 | 10 | 15 | 25;
  startedAt: ISODate;
  pausedAt?: ISODate;
  pausedTotalMs: number;
  endedAt?: ISODate;
  completedFully: boolean;
  focusedMs: number;
  notificationId?: string;
}

export type XpEventType =
  | 'drop_in' | 'step' | 'mission_landed' | 'session_full' | 'session_partial'
  | 'kept_rolling' | 'comeback' | 'weekly_goal' | 'crate_duplicate';

export interface XpEvent {
  id: ID;
  type: XpEventType;
  amount: number;       // always > 0
  at: ISODate;
  refId?: ID;           // mission/step/session id
}

export type ItemCategory = 'deck' | 'wheels' | 'outfit' | 'spot';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Item {
  id: string;
  category: ItemCategory;
  name: string;
  rarity: Rarity;
  image: number;        // require('...png')
  unlock: { kind: 'starter' } | { kind: 'level'; level: number }
        | { kind: 'achievement'; achievementId: string } | { kind: 'crate' };
}

export interface Loadout { deck: string; wheels: string; outfit: string; spot: string; }

export interface PlayerState {
  nickname: string;
  xpEvents: XpEvent[];
  ownedItemIds: string[];
  loadout: Loadout;
  achievements: Record<string, ISODate>; // id -> unlocked at
  cratesOpenedSinceLegendary: number;    // pity counter
  pendingCrates: number;
  rideDaysGoal: 2 | 3 | 4 | 5;
  activityDates: string[];               // 'yyyy-MM-dd' days with activity
  weeksGoalHit: string[];                // ISO week keys e.g. '2026-W46'
  lastComebackAt?: ISODate;
  onboarded: boolean;
}

export interface Settings {
  sound: boolean;
  haptics: boolean;
  reduceMotion: 'system' | 'on' | 'off';
  showTimerNumbers: boolean;
  reminder: { enabled: boolean; hour: number; minute: number };
  lastSessionMinutes: FocusSession['plannedMinutes'];
}
```

Derived values (never stored, computed with selectors): total XP, level, XP into level, current week's ride days, stats on Me tab.

## 4. State & persistence

- One Zustand store per domain, each with `persist` → AsyncStorage, unique key (`kickflip/missions`, `kickflip/player`, …).
- Each persisted store has a `version` and a `migrate` function from day one.
- **Cross-store actions** live in `src/store/actions.ts`. Example `completeStep(missionId, stepId)`:
  1. mark step done (mission store)
  2. if `!xpAwarded` → add XP event (player store)
  3. record today as activity date
  4. if all steps done → mark mission landed, add landed XP
  5. compute level before/after → if level up, add pending crate
  6. run `checkAchievements` → unlock new ones (+ item rewards)
  7. check weekly goal
  8. return a `RewardSummary` the UI uses to show feedback / navigate to Reward screen
- Game rules are called from actions; actions are the only place that combine stores.
- Inject `now: Date` and `rng: () => number` into game functions so they're testable.

## 5. Session timer design

- Never count with `setInterval` decrementing a number. Store `startedAt`, `pausedAt`, `pausedTotalMs`; compute remaining = `planned − (now − startedAt − pausedTotalMs)`.
- UI tick: a `useCountdown` hook re-renders every 250 ms while the screen is focused.
- On start: schedule a local notification for the end time; cancel/reschedule on pause/resume/end.
- Active session persisted → if the app is killed and reopened, resume or finish the session correctly.
- `expo-keep-awake` active on the Session screen only.

## 6. Notifications

- Ask permission only when the user turns on a reminder or starts their first session — never on first launch.
- Daily reminder: one repeating local notification, friendly copy, rotating from a list in `en.ts`.
- If permission is denied, the app works fully without it.

## 7. Testing strategy

- `src/game/**` → unit tests for every function, including edge cases (week boundaries, Sunday→Monday, level thresholds, crate pity, no duplicate XP).
- `src/store/actions.ts` → integration tests with stores reset between tests.
- Components → a few RNTL tests for key interactions (tick step, start session).
- No snapshot tests.

## 8. Accessibility & performance

- Respect system font scaling (no fixed-height text containers).
- `accessibilityRole`, `accessibilityLabel`, `accessibilityState` on interactive elements.
- Reduce motion: check with Reanimated `useReducedMotion()` combined with settings override.
- Lists use `FlatList`; images are small PNGs/WebPs (or SVG via `react-native-svg` if needed — ask first).

## 9. Later (not MVP) — keep the design open for

- i18n: Finnish file `fi.ts` + `expo-localization`.
- AI step suggestions: would need a small backend proxy; data minimisation + parental consent considerations under GDPR (in Finland, the age of consent for information society services is 13).
- Cloud backup: would need accounts — avoid unless really needed.
