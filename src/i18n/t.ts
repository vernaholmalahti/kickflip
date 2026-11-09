import { en, type Translations } from './en';

/**
 * Every valid dot-separated path to a string in the translations,
 * e.g. 'app.name' | 'tabs.today' | 'today.empty.title' | …
 *
 * For each key K of T: if T[K] is a string, the path is just K;
 * if it's a nested object, recurse and prefix with `${K}.`.
 */
type KeyPaths<T> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${KeyPaths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = KeyPaths<Translations>;

export type TranslationParams = Record<string, string | number>;

// Only English for now. Language switching comes with Finnish (v1.1).
const strings: Translations = en;

/**
 * Look up a user-facing string.
 *
 *   t('today.empty.title')                    → 'Nothing on the board.'
 *   t('garage.collected', { owned: 3, total: 30 }) → fills {{owned}} and {{total}}
 *
 * Placeholders without a matching param are left as-is, so a mistake is
 * visible on screen instead of silently showing "undefined".
 */
export function t(key: TranslationKey, params?: TranslationParams): string {
  // Walk the nested object one key segment at a time.
  let node: unknown = strings;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) break; // path went past a string or a gap
    node = (node as Record<string, unknown>)[part];
  }

  // The type system makes this unreachable, but fall back to the key just in case.
  if (typeof node !== 'string') return key;
  if (!params) return node;

  return node.replace(/\{\{(\w+)\}\}/g, (placeholder, name: string) =>
    name in params ? String(params[name]) : placeholder,
  );
}
