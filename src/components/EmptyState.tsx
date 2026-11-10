import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  body?: string;
  /** Optional call to action, e.g. "New mission". */
  action?: { label: string; onPress: () => void };
}

/**
 * Friendly "nothing here yet" block. Copy must stay neutral and encouraging —
 * an empty list is never a failure (DESIGN_SYSTEM §8).
 * An illustration slot comes later with real art.
 */
export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={[typography.h2, styles.title]}>
        {title}
      </Text>
      {body ? <Text style={[typography.body, styles.body]}>{body}</Text> : null}
      {action ? <Button label={action.label} onPress={action.onPress} size="lg" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  title: { color: colors.text, textAlign: 'center' },
  body: { color: colors.textMuted, textAlign: 'center' },
});
