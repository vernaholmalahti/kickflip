# Kickflip — Screens & Navigation

## Navigation map

```
First launch → Onboarding (stack) → Tabs

Tabs (bottom bar)
├── Today        (src/app/(tabs)/index.tsx)
├── Garage       (src/app/(tabs)/garage.tsx)
├── Trick Book   (src/app/(tabs)/tricks.tsx)
└── Me           (src/app/(tabs)/me.tsx)

Stack screens (over tabs)
├── New mission         src/app/mission/new.tsx
├── Mission detail      src/app/mission/[id].tsx
├── Edit mission        src/app/mission/[id]/edit.tsx
├── Session             src/app/session/[missionId].tsx   (full screen)
├── Reward (modal)      src/app/reward.tsx
├── Crate (modal)       src/app/crate.tsx
└── Settings            src/app/settings.tsx
```

Global rule: from any screen, starting a session is at most **2 taps** away.

---

## 1. Onboarding (4 short screens)

1. **Welcome** — "Kickflip turns tasks into tricks." One sentence + animated skater. Button: *Let's ride*.
2. **How it works** — 3 icons: break it down → skate a session → unlock gear. Button: *Got it*.
3. **Your skater** — nickname field (optional, defaults to "Rider") + pick 1 of 3 starter decks.
4. **Your week** — "How many days a week do you want to ride?" chips 2/3/4/5 (default 3). Toggle: daily reminder (off by default) + time picker if on. Button: *Drop in* → Today.

Skip button on screens 1–2. No data collection beyond nickname.

## 2. Today (home tab)

Top to bottom:
- **Header:** skater avatar (on current Spot background), nickname, level + level title, XP progress bar.
- **Ride days row:** Mon–Sun dots; filled dots = ride days this week; goal marker.
- **Next up card (big):** the first "today" mission (or most recent). Shows title, step progress (e.g. 2/5), next step text. Primary button **Drop in** → Session. Secondary: *Not this one* → cycles to the next mission.
- **Other missions:** collapsed section "More missions (4)". Expanded = simple list, tap → Mission detail.
- **FAB / button:** *+ New mission*.

Empty state: friendly illustration + "No missions yet. What's one thing you need to do?" + *New mission*.

Optional: if comeback bonus is due, show welcome-back modal on open.

## 3. New mission

- Title field (autofocus, placeholder "e.g. Math homework").
- **Templates row:** chips (Homework, Clean room, Pack bag, Morning routine, Study for test). Tapping fills title + steps.
- **Steps list:** add step field ("What's the first tiny step?"), reorder by drag or up/down buttons, delete.
- Tip under steps: "Make the first step super small — like 'open the book'."
- Size: S / M / L chips (with XP shown).
- Toggle: "For today".
- Buttons: *Save* · *Save & drop in*.

Validation: title required. Zero steps allowed (mission then counts as one step).

## 4. Mission detail

- Title, size, step checklist (tap to tick — instant XP feedback).
- **Drop in** button (primary).
- Menu: Edit · Delete (confirm dialog; reassure "Your XP stays").
- When all steps ticked → automatically triggers "Land it" → Reward screen.

## 5. Session (full screen)

- Before start: duration chips **Just 2 min · 5 · 10 · 15 · 25** (default 10; remembers last choice). Big *Go* button.
- During:
  - **Visual timer:** skater travels along a track/half-pipe across the screen; track fills with colour as time passes. Remaining time as large text (can be hidden in settings).
  - **Current step** card with *Done* button → ticks it and shows the next step.
  - Controls: Pause/Resume, End.
  - Screen kept awake.
- "Just 2 min" at the end: "Nice! Keep rolling?" → *Keep going (+5 min)* or *Done for now*.
- End: summary — minutes focused, steps done, XP earned → *Back to Today* or *Another session*.
- If app goes to background, timer keeps correct time; local notification "Session done — you landed it! 🛹" at end.

## 6. Reward (modal)

Triggered by: mission landed, level up, ride-days goal hit, comeback.
- Big animation (trick landing).
- XP breakdown list (e.g. Steps +40, Landed (M) +40, Session +20).
- XP bar fills to new value; if level up → "LEVEL 4 — Street Rider" and button *Open crate*.

## 7. Crate (modal)

- Closed crate, "Tap to open" (tap 1–3 times, it shakes).
- Reveal: item with rarity frame + name.
- Buttons: *Equip now* · *Later*.

## 8. Garage (tab)

- Large preview of skater on current Spot.
- Category tabs: Decks · Wheels · Outfits · Spots.
- Grid of items: owned = full colour, tappable to equip; locked = silhouette + hint ("Reach level 8" / "Mystery — from crates").
- Counter: "Collected 14 / 30".

## 9. Trick Book (tab)

- Grid of achievement "cards", each with trick name + small illustration.
- Unlocked: colour + date earned. Locked: silhouette + hint text. Progress shown only when > 50% (see GAME_DESIGN §7).

## 10. Me (tab)

- Stats (positive only): total missions landed, total session minutes, steps done, ride days this month, best week.
- Ride-days history: last 8 weeks as small bars (no red, neutral grey for zero).
- Button → Settings.

## 11. Settings

- Nickname
- Ride-days goal (2–5)
- Daily reminder on/off + time
- Sound on/off · Haptics on/off · Reduce motion (auto-follows system, can override) · Show timer numbers on/off
- About Kickflip / privacy note ("Everything stays on your phone.")
- Reset all data (double confirm)
