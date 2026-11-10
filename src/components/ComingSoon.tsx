import type { ReactNode } from 'react';

import { t } from '@/i18n/t';

import { EmptyState } from './EmptyState';
import { Screen } from './Screen';
import { ScreenHeader } from './ScreenHeader';

export interface ComingSoonProps {
  /** Screen title, e.g. t('tabs.garage'). */
  title: string;
  /** Optional extra content below the message. */
  children?: ReactNode;
}

/** Temporary screen for tabs that aren't built yet. Removed as each tab is built. */
export function ComingSoon({ title, children }: ComingSoonProps) {
  return (
    <Screen>
      <ScreenHeader title={title} />
      <EmptyState title={t('placeholder.title')} body={t('placeholder.body')} />
      {children}
    </Screen>
  );
}
