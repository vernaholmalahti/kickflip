# Kickflip — Design System

**Vibe:** street / skate culture, bold and energetic, but calm enough not to overstimulate. Think skatepark at dusk: dark asphalt, neon accents, stickers. **Cool, not cute.** Never childish.

Implement these tokens in `src/theme/`. Components use tokens only.

## 1. Colour (dark theme is the default and only theme in MVP)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#121317` | App background (asphalt) |
| `surface` | `#1D1F25` | Cards |
| `surfaceRaised` | `#272A32` | Modals, pressed cards |
| `border` | `#33363F` | Dividers, card outlines |
| `text` | `#F4F4F5` | Primary text |
| `textMuted` | `#A1A1AA` | Secondary text, hints |
| `primary` | `#C6FF3D` | Electric lime — main actions, XP, progress |
| `onPrimary` | `#121317` | Text on primary buttons |
| `secondary` | `#FF5FA2` | Hot pink — celebrations, level ups |
| `accent` | `#4FC3FF` | Sky blue — sessions/timer |
| `warm` | `#FFB547` | Highlights, achievements |
| `rarityCommon` | `#9CA3AF` | |
| `rarityRare` | `#4FA8FF` | |
| `rarityEpic` | `#B57BFF` | |
| `rarityLegendary` | `#FFC93D` | |

Rules:
- **No red for user state.** Red is only for destructive confirmations (delete), using `#FF6B6B`.
- One primary (lime) action per screen.
- Text contrast must meet WCAG AA (4.5:1 for body text). All text tokens above pass on `bg` and `surface`.

## 2. Typography

- **Display:** *Bricolage Grotesque* (bold/extra-bold) — headings, level numbers, big timer.
- **Body:** *Inter* — everything else.
- Load via `@expo-google-fonts/bricolage-grotesque` and `@expo-google-fonts/inter`.

| Token | Size / line height | Font |
|---|---|---|
| `display` | 40 / 44 | Bricolage ExtraBold |
| `h1` | 28 / 34 | Bricolage Bold |
| `h2` | 22 / 28 | Bricolage Bold |
| `body` | 17 / 24 | Inter Regular |
| `bodyStrong` | 17 / 24 | Inter SemiBold |
| `small` | 14 / 20 | Inter Regular |
| `timer` | 64 / 68 | Bricolage ExtraBold, tabular numbers |

- Sentence case everywhere ("Drop in", not "DROP IN"), except tiny labels/badges.
- Short lines; max ~2 sentences of text in any block.
- Support Dynamic Type / font scaling.

## 3. Spacing, radius, elevation

- Spacing scale (dp): `4, 8, 12, 16, 24, 32, 48`
- Screen padding: 16 (20 on larger screens)
- Radius: `sm 8` · `md 14` · `lg 20` · `pill 999`
- Cards: `surface` + 1px `border`, radius `lg`. Minimal shadows (dark UI); use a subtle lime glow for the "Next up" card.
- Touch targets ≥ 48×48.

## 4. Components (build these in `src/components/`)

| Component | Notes |
|---|---|
| `Button` | variants: primary (lime), secondary (outline), ghost, destructive. Sizes md/lg. Haptic on press. |
| `Chip` | selectable (duration, size, templates, ride days) |
| `Card` | base container |
| `XpBar` | animated fill, shows "120 / 175 XP" |
| `LevelBadge` | number + title |
| `RideDaysRow` | 7 dots Mon–Sun |
| `StepItem` | checkbox row, satisfying tick animation |
| `MissionCard` / `NextUpCard` | |
| `ItemTile` | Garage item with rarity frame / locked silhouette |
| `TrickCard` | Trick Book entry |
| `Toast` | achievement toast |
| `SkaterAvatar` | layered images: spot bg + deck + wheels + outfit |
| `ScreenHeader`, `EmptyState` | |

## 5. Motion

- Default durations: micro 120 ms, standard 250 ms, celebration 600–1200 ms.
- Use springs for "pop" (XP float, tick), easing for progress bars.
- Celebrations are **short** (< 1.5 s) and **skippable by tap**.
- No constant looping/flashing animations on regular screens (distracting for ADHD). Idle animation only on the skater avatar, subtle.
- **Reduce motion:** replace movement with fades; disable crate shake and screen-wide effects.

## 6. Sound & haptics

| Event | Sound | Haptic |
|---|---|---|
| Button press | — | selection |
| Tick step | click-pop | light impact |
| Drop in | whoosh | medium impact |
| Session end | board landing | success notification |
| Level up | short riff/sting | success notification |
| Crate open | crack + shimmer | heavy impact |

Short (< 1 s), not loud, not annoying on repeat. Use royalty-free / CC0 sounds and list sources in `assets/sounds/CREDITS.md`.

## 7. Illustration

- Flat, bold-outline sticker style. Skater is seen from the side, gender-neutral, customisable via layers.
- Spots are simple flat backgrounds with low detail (they sit behind UI).
- MVP may use placeholder shapes/emoji; real art can come later. Keep the layer structure from day one.

## 8. Tone of voice

Casual, encouraging, short. A friend who skates, not a teacher or a parent. Light skate slang, never forced. No exclamation-mark overload.

| Situation | ✅ Do | ❌ Don't |
|---|---|---|
| Empty Today | "Nothing on the board. What's one thing you need to do?" | "You have no tasks! Add tasks to be productive!" |
| Step done | "Landed it." / "Clean." / "Nice one." (rotate) | "Task completed successfully." |
| Session ended early | "4 minutes of focus still counts." | "Session incomplete." |
| Came back after days | "Welcome back! Your board missed you." | "You haven't used the app in 6 days." |
| Weekly goal not hit | "Last week: 2 ride days." | "You missed your goal." |
| Reminder | "Got 2 minutes? Your board's waiting." | "Don't forget your tasks!!!" |
| First step tip | "Make the first step tiny — like 'open the book'." | "Break tasks into manageable subtasks." |

Never use: fail, failed, lazy, overdue, should have, missed, behind.
