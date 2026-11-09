import { t } from '../t';

describe('t()', () => {
  it('returns a top-level string', () => {
    expect(t('app.name')).toBe('Kickflip');
  });

  it('returns a deeply nested string', () => {
    expect(t('today.empty.title')).toBe('Nothing on the board.');
  });

  it('fills in placeholders, including numbers', () => {
    expect(t('garage.collected', { owned: 14, total: 30 })).toBe('Collected 14 / 30');
  });

  it('leaves a placeholder visible when its param is missing', () => {
    expect(t('garage.collected', { owned: 14 })).toBe('Collected 14 / {{total}}');
  });

  it('ignores params that have no placeholder', () => {
    expect(t('app.name', { unused: 'x' })).toBe('Kickflip');
  });

  it('makes a key typo a TypeScript error', () => {
    // If this line ever stops being a type error, `npm run typecheck` fails
    // because the @ts-expect-error comment becomes unused. That's the proof
    // that key typos are caught at compile time.
    // @ts-expect-error — 'emtpy' is misspelled on purpose
    const result = t('today.emtpy.title');
    // At runtime an unknown key falls back to the key itself.
    expect(result).toBe('today.emtpy.title');
  });

  it('does not accept a path that stops at an object', () => {
    // @ts-expect-error — 'today.empty' is an object, not a string
    expect(t('today.empty')).toBe('today.empty');
  });
});
