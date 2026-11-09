# Kickflip — Product Requirements

## 1. One-liner

A skate-themed game that helps teens with ADHD get started on tasks, keep going in short focus sessions, and feel progress — without shame.

## 2. Problem

Teens with ADHD typically struggle with:

- **Task initiation** — knowing what to do but not being able to start.
- **Overwhelm** — a big task ("clean your room", "do the essay") feels like a wall.
- **Time blindness** — "10 minutes" and "an hour" feel the same.
- **Delayed rewards don't motivate** — a grade in 3 weeks doesn't help now.
- **Novelty fades** — any system works for a week, then gets ignored.
- **Shame spirals** — apps with broken streaks and red overdue lists make them feel like failures, so they quit.

Most to-do and habit apps are built for neurotypical adults and amplify these problems.

## 3. Target user

**Primary:** 12–14-year-old with ADHD (diagnosed or not), owns a smartphone, uses it independently.

**Persona — "Eetu, 13":** Plays games, watches skate and gaming videos. Knows he has homework but ends up on his phone. Hates apps that look like they're for little kids or that his parents "put on" his phone. Responds well to instant feedback, collecting things and customising his own stuff.

**Not the user (for MVP):** parents, teachers, adults with ADHD. Parent features are explicitly out of scope for the MVP.

## 4. Design principles

1. **Make starting tiny.** The first step should take under 2 minutes.
2. **Instant, frequent rewards.** Feedback within a second of every action.
3. **Progress never goes backwards.** (See CLAUDE.md non-negotiable rules.)
4. **Novelty by design.** Rewards rotate and surprise; there's always something new to unlock.
5. **Show, don't tell, time.** Time is always visual.
6. **One thing at a time.** The UI shows the next action, not the whole mountain.
7. **Feels like the teen's own game,** not a chore chart. Cool, not cute.
8. **Private by default.** Nothing leaves the device.

## 5. MVP scope

### 5.1 Tasks ("Missions")
- Create, edit, delete tasks with a title.
- Break a task into steps (checklist). Steps can be reordered and edited.
- Start from a **template** (Homework, Clean room, Pack school bag, Morning routine, Study for a test) that pre-fills steps.
- Size: S / M / L (affects XP).
- Optional "for today" flag. No hard due dates in MVP (avoids overdue shame).
- Home shows **one "Next up" task** prominently; other tasks are collapsed.

### 5.2 Focus sessions ("Skate sessions")
- Choose length: 2 ("Just 2 min"), 5, 10, 15, 25 minutes.
- Visual timer (skater riding across a track/ramp that fills up) plus remaining time.
- Shows the current step; tick off steps during the session.
- Pause and resume. End early is allowed and still rewarded proportionally.
- Timer survives the app going to background (based on timestamps) and fires a local notification at the end.
- Screen stays awake during a session.

### 5.3 Rewards & progression
- XP for starting tasks, completing steps, finishing tasks and finishing sessions.
- Levels with a gentle curve.
- **Reward moment** screen after meaningful events (task done, level up).
- **Crate** on every level up: random cosmetic item.
- **Garage:** customise the skater (deck, wheels, outfit) and the background "spot".
- **Trick Book:** achievements named after skate tricks.
- **Weekly goal:** teen chooses 2–5 "ride days" per week. Resets weekly, never a streak that breaks.
- **Comeback bonus** when returning after 3+ days away, with a friendly welcome.

### 5.4 Onboarding & settings
- Short onboarding: what Kickflip is, pick a nickname, pick a starter skater look, set weekly goal, optional daily reminder.
- Settings: sound, haptics, reduce motion, reminder time on/off, reset all data (with confirmation).

## 6. Non-goals (MVP)

- Accounts, login, cloud sync
- Parent/teacher features
- Social features, friends, leaderboards
- AI task breakdown (planned later — needs a backend and privacy review)
- Calendar integration, hard deadlines
- Monetisation of any kind
- Finnish translation (planned for v1.1; strings are prepared for it)
- Tablet/web optimisation

## 7. Success criteria (for the portfolio MVP)

- A teen can go from opening the app to starting a focus session in **under 30 seconds**.
- Every user action gives visible feedback within ~100 ms.
- Game logic has ≥ 90% unit test coverage (`src/game/`).
- App runs smoothly in Expo Go on both iOS and Android.
- If possible: 3–5 teens (or people around them) test it; collect feedback in `docs/USER_TESTING.md`.

## 8. Future ideas (post-MVP)

- Finnish language
- AI step suggestions ("break this down for me")
- Body-doubling mode (ambient "someone's skating with you" presence)
- Daily rotating mini-challenges
- Parent companion with teen-controlled sharing (teen decides what's shared)
- Home-screen widget showing "Next up"
- Seasonal item drops
