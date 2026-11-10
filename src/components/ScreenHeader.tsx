import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional element on the right, e.g. a settings button. */
  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        {/* role "header" lets screen-reader users jump between headings */}
        <Text accessibilityRole="header" style={[typography.h1, styles.title]}>
          {title}
        </Text>
        {subtitle ? <Text style={[typography.body, styles.subtitle]}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  // flex: 1 + flexShrink lets long titles wrap instead of pushing `right` off screen.
  text: { flex: 1, flexShrink: 1, gap: spacing.xs },
  title: { color: colors.text },
  subtitle: { color: colors.textMuted },
});
