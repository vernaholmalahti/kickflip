# Kickflip — Game Design

All numbers in this document go in `src/game/config.ts`. All rules are implemented as pure, unit-tested functions in `src/game/`.

## 1. Core loop

```
 Pick a mission  →  Drop in (start)  →  Skate session (focus)  →  Land it (step/task done)
       ↑                                                                   ↓
   Garage / Trick Book  ←  Unlocks & crates  ←  Level up  ←  XP & reward moment
```

Vocabulary used in the UI:

| Concept | In-app name |
|---|---|
| Task | Mission |
| Step | Trick (step) — or just "step" if it reads better |
| Focus session | Session |
| Starting a task | Drop in |
| Completing a task | Land it |
| Achievements | Trick Book |
| Cosmetic collection | Garage |
| Background scene | Spot |
| Weekly goal | Ride days |

## 2. XP

| Event | XP | Notes |
|---|---|---|
| Drop in (start a mission's first session or tick its first step) | **+5** | Once per mission per day. Rewards *starting*. |
| Complete a step | **+10** | |
| Land a mission (all steps done) | **S +20 / M +40 / L +60** | Bonus on top of step XP |
| Finish a full session | **+2 per planned minute** (min 5) | 2 min → 5, 10 min → 20, 25 min → 50 |
| End a session early | **+2 per minute actually focused**, min 2 | Never zero if they tried for ≥ 1 min |
| "Just 2 min" session that continues past 2 min | +5 extra "kept rolling" bonus | Rewards momentum |
| Comeback bonus | **+25** | See §6 |
| Ride-days goal hit for the week | **+50** | See §5 |

Rules:
- XP is stored as an **append-only event ledger** (`XpEvent[]`). Total XP = sum. XP is never removed.
- If a step is un-ticked, its XP is **not** taken back (progress never goes backwards). To prevent farming, a step only gives XP the **first** time it's completed.
- Deleting a mission doesn't remove earned XP.

## 3. Levels

XP needed to go from level `n` to `n+1`:

```
xpToNext(n) = 100 + 25 * (n - 1)
```

| Level | XP to next | Cumulative XP to reach |
|---|---|---|
| 1 | 100 | 0 |
| 2 | 125 | 100 |
| 3 | 150 | 225 |
| 4 | 175 | 375 |
| 5 | 200 | 550 |
| 10 | 325 | 1 800 |

A typical active day (2 missions, 3 sessions) ≈ 150–250 XP → a level every 1–2 days early on, slowing gradually. No level cap.

Level titles (shown under the level number, cycle through for fun):
1 Rookie · 3 Grommet · 5 Street Rider · 8 Park Rat · 12 Ramp Ripper · 16 Local Legend · 20 Pro · 25+ Legend

## 4. Unlocks — the Garage

### Item categories
| Category | Examples | MVP count |
|---|---|---|
| Deck | Flame, Checker, Pixel, Neon Wave, Glitch, Northern Lights | 12 |
| Wheels | Classic white, Lime, Clear, Rainbow | 6 |
| Outfit | Hoodie, Tee, Beanie set, Raincoat | 6 |
| Spot (background) | Street, Skatepark, Rooftop, Harbour, Forest Bowl, Night City | 6 |

### Rarity
| Rarity | Crate drop chance | Visual |
|---|---|---|
| Common | 60% | grey frame |
| Rare | 30% | blue frame |
| Epic | 9% | purple frame |
| Legendary | 1% → guaranteed at least once every 10 crates (pity) | gold frame, special animation |

### How items unlock
1. **Level rewards** (fixed): certain levels unlock specific items (e.g. level 2 = first Spot, level 5 = a Rare deck). Defined in `src/game/items.ts`.
2. **Crate on every level up:** random item the player doesn't own yet, using the rarity table. If they own everything in a rarity, roll the next rarity down; if they own everything, give +50 XP instead.
3. **Achievement rewards:** some Trick Book entries unlock a specific item.

Crates are **only earned, never bought**. No real money, no currency to purchase crates. (Variable reward is used for novelty, never for monetisation.)

Starter loadout (given at onboarding): 3 starter decks to choose from, Classic wheels, Hoodie, Street spot.

## 5. Ride days (weekly goal — replaces streaks)

- In onboarding the teen picks a goal: **2, 3, 4 or 5 ride days per week** (default 3).
- A day counts as a "ride day" if they complete **at least one step or one session** that day.
- Week = Monday–Sunday (local time).
- Hitting the goal: +50 XP + celebration. Going beyond the goal is shown as bonus days, not required.
- The week simply resets on Monday. **No broken streaks, no "you missed it" message.** Last week's result is shown neutrally ("Last week: 2 ride days").
- The goal can be changed any time in settings.

## 6. Comeback bonus

- If the last activity was **3 or more days ago**, on the next app open show a welcome-back moment: "Welcome back! Your board missed you." + **+25 XP**.
- Never mention how many days they were away.
- Max once per 3 days.

## 7. Trick Book (achievements)

| ID | Name | Condition | Reward |
|---|---|---|---|
| ollie | Ollie | Complete your first step | — |
| kickflip | Kickflip | Land your first mission | Kickflip deck |
| heelflip | Heelflip | Land 5 missions | — |
| manual | Manual | 60 total minutes of sessions | — |
| nose_manual | Nose Manual | 300 total minutes of sessions | Rare wheels |
| drop_in | Drop In | Start a "Just 2 min" session | — |
| keep_rolling | Keep Rolling | Keep going past 2 min in a "Just 2 min" session | — |
| early_bird | Early Bird | Complete a step before 9:00 | — |
| full_week | Full Send | Hit your ride-days goal | Spot: Rooftop |
| hat_trick | Hat Trick | Hit your ride-days goal 3 weeks (not necessarily in a row) | Epic deck |
| comeback | Comeback Kid | Return after a break | — |
| big_one | 900 | Land an L-size mission | — |
| collector | Collector | Own 15 items | — |
| style_points | Style Points | Change your loadout in the Garage | — |

Locked achievements show a silhouette and a hint, not "0/5 progress" bars for everything (avoids pressure). Show progress only for counter-type achievements when they're > 50% done.

## 8. Feedback & juice

| Moment | Feedback |
|---|---|
| Tick a step | Haptic (light), short "click-pop" sound, +10 XP floats up |
| Drop in | Haptic (medium), whoosh sound, skater pushes off |
| Session end | Haptic (success), board-landing sound, XP tally |
| Mission landed | Full reward screen: trick animation, XP breakdown |
| Level up | Reward screen → crate opening (tap to open) |
| Achievement | Toast sliding in from the top + sound |

All animations respect **reduce motion** (swap for simple fades). Sound and haptics have separate toggles.

## 9. Anti-patterns — never do these

- ❌ Losing anything (XP, items, streaks)
- ❌ Red overdue states, "you failed", guilt copy
- ❌ Leaderboards or comparison with others
- ❌ Paid currency, ads, buying crates
- ❌ Notifications that nag, guilt or arrive more than once a day
- ❌ Infinite scroll or other time-sink mechanics
- ❌ Fake urgency ("only 2 hours left to claim!")
