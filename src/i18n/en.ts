// All user-facing English text. Components never contain inline strings —
// they call t('some.key') instead. Finnish (fi.ts) will copy this shape later.
//
// Tone of voice (docs/DESIGN_SYSTEM.md §8): casual, encouraging, short.
// Never use: fail, failed, lazy, overdue, should have, missed, behind.
//
// Placeholders use {{name}} and are filled in by t(): t('key', { name: 'Eetu' }).

export const en = {
  app: {
    name: 'Kickflip',
  },
  placeholder: {
    // Temporary copy for screens that aren't built yet.
    title: 'Coming soon',
    body: "This spot's still being built.",
  },
  tabs: {
    today: 'Today',
    garage: 'Garage',
    tricks: 'Trick Book',
    me: 'Me',
  },
  today: {
    empty: {
      title: 'Nothing on the board.',
      body: "What's one thing you need to do?",
      action: 'New mission',
    },
  },
  garage: {
    collected: 'Collected {{owned}} / {{total}}',
  },
};

/** The shape every language file must have (same keys, any string values). */
export type Translations = typeof en;
