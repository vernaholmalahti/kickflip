# Kickflip — Roadmap

Build in this order. **One task = one Claude Code conversation step = (usually) one commit.** Each task has a "Done when" check. Tick the box when done.

---

## Phase 0 — Foundation

- [x] **0.1 Create the project**
  Create an Expo app with TypeScript and Expo Router (`npx create-expo-app@latest kickflip`), remove example screens, enable `strict` in tsconfig, add scripts `typecheck`, `lint`, `test`. Set up ESLint + Prettier.
  *Done when:* blank app runs in Expo Go; all three scripts run without errors.

- [x] **0.2 Folder structure & docs**
  Create the folder structure from ARCHITECTURE §2 with placeholder `index.ts` files where useful. Make sure `docs/` and `CLAUDE.md` sit in the repo root (move them if the app was scaffolded elsewhere). Write a minimal README.
  *Done when:* structure matches the doc; first commit made.

- [x] **0.3 Theme & fonts**
  Implement `src/theme/` tokens from DESIGN_SYSTEM (colours, spacing, radii, typography). Load fonts in root layout with a splash screen until loaded.
  *Done when:* a test screen shows each text style and colour swatch.

- [x] **0.4 i18n helper**
  `src/i18n/en.ts` (nested object) + `t('today.empty.title')` helper with type-safe keys.
  *Done when:* a key typo is a TypeScript error.

- [x] **0.5 Base components**
  `Button`, `Chip`, `Card`, `ScreenHeader`, `EmptyState` with accessibility props.
  *Done when:* used on the test screen; RNTL test for Button press.

- [ ] **0.6 Tab navigation shell**
  Tabs: Today, Garage, Trick Book, Me — each showing a placeholder. Tab icons + labels from i18n.
  *Done when:* can switch between all four tabs.

## Phase 1 — Missions

- [ ] **1.1 Domain types** — `src/types/domain.ts` from ARCHITECTURE §3.
- [ ] **1.2 Mission store** — Zustand + persist (AsyncStorage), versioned. Actions: add, update, delete, reorder, toggle forToday, add/edit/remove/reorder steps.
  *Done when:* unit tests for store actions pass; data survives app reload.
- [ ] **1.3 Templates** — `src/game/templates.ts` with the 5 templates from PRD.
- [ ] **1.4 New mission screen** — per SCREENS §3 (title, templates, steps, size, for today, save).
  *Done when:* can create a mission from a template and from scratch.
- [ ] **1.5 Mission detail + edit + delete** — SCREENS §4. Ticking steps works (no XP yet).
- [ ] **1.6 Today screen v1** — Next up card, "Not this one", collapsed list, empty state, + button.
  *Done when:* the full flow create → see on Today → open → tick steps works.

## Phase 2 — Sessions

- [ ] **2.1 Timer logic** — pure functions: `remainingMs(session, now)`, pause/resume math. Tests incl. pause edge cases.
- [ ] **2.2 Session store** — persisted active session.
- [ ] **2.3 Session screen** — duration chips, Go, visual progress (simple bar first), current step with Done, pause/resume/end, keep-awake.
- [ ] **2.4 Background safety** — local notification at end; correct state after backgrounding/killing the app.
  *Done when:* start 2-min session, lock phone, notification arrives, reopening shows the summary.
- [ ] **2.5 "Just 2 min" keep-rolling flow** + session summary screen.

## Phase 3 — XP & levels

- [ ] **3.1 Game config + XP rules** — `config.ts`, `xp.ts`, `levels.ts` with full tests (table in GAME_DESIGN §2–3).
- [ ] **3.2 Player store** — XP ledger, derived level selectors.
- [ ] **3.3 Cross-store actions** — `completeStep`, `dropIn`, `finishSession` returning `RewardSummary` (ARCHITECTURE §4). Integration tests: no double XP, un-ticking doesn't remove XP.
- [ ] **3.4 XP UI** — `XpBar`, `LevelBadge` in Today header; floating "+10 XP" on tick.
- [ ] **3.5 Feedback service** — `useFeedback()` hook wrapping sound + haptics, respecting settings (temporary settings defaults OK).
- [ ] **3.6 Reward screen** — XP breakdown, level-up state.
  *Done when:* landing a mission shows the reward screen with correct numbers.

## Phase 4 — Garage & crates

- [ ] **4.1 Item catalogue** — `items.ts` with 30 items (placeholder art: coloured shapes are fine).
- [ ] **4.2 Crate logic** — `rollCrate` with rarity table, no duplicates, fallback, pity counter. Seeded-rng tests.
- [ ] **4.3 `SkaterAvatar`** — layered rendering of loadout.
- [ ] **4.4 Crate screen** — tap-to-open, reveal, equip/later. Pending crates badge.
- [ ] **4.5 Garage tab** — preview, category tabs, item grid, equip, locked hints, collection counter.

## Phase 5 — Trick Book, ride days, comeback

- [ ] **5.1 Ride days logic** — week boundaries (Mon–Sun, local), goal hit, +50 XP once per week. Tests around Sunday/Monday and DST.
- [ ] **5.2 `RideDaysRow`** on Today.
- [ ] **5.3 Achievements logic** — definitions + `checkAchievements`. Tests for each.
- [ ] **5.4 Trick Book tab** + achievement toast.
- [ ] **5.5 Comeback bonus** — logic + welcome-back modal.
- [ ] **5.6 Me tab** — positive stats + 8-week history.

## Phase 6 — Onboarding, settings, polish

- [ ] **6.1 Settings store + screen** (SCREENS §11), including reset all data.
- [ ] **6.2 Onboarding flow** (SCREENS §1) + root-layout gate.
- [ ] **6.3 Daily reminder** — opt-in, permission asked in context, rotating copy.
- [ ] **6.4 Motion pass** — Reanimated: step tick, XP float, session skater on track, level-up, crate shake; reduce-motion fallbacks.
- [ ] **6.5 Sound pass** — add CC0 sounds + `CREDITS.md`.
- [ ] **6.6 Accessibility pass** — screen reader walkthrough, large font check, touch targets, contrast.
- [ ] **6.7 Copy pass** — check all strings against tone-of-voice table; no banned words.

## Phase 7 — Portfolio-ready

- [ ] **7.1 Test coverage** — `src/game/` ≥ 90%; fix gaps.
- [ ] **7.2 README** — pitch, screenshots/GIF, features, ADHD design principles and why, tech stack, architecture diagram, how to run, what I learned.
- [ ] **7.3 Build** — EAS preview build (Android APK) so people can install it.
- [ ] **7.4 User testing** — test with 3–5 people, write `docs/USER_TESTING.md` (findings + what changed).
- [ ] **7.5 Final cleanup** — remove test screen, dead code, TODOs.

## Later (v1.1+)

Finnish translation · real illustrations · home-screen widget · daily mini-challenges · body-doubling mode · AI step suggestions · parent companion (teen-controlled sharing)
