// DEV ONLY — every base component, interactive, for checking on a real phone.
// Demo labels are hard-coded on purpose (not user-facing); real screens use t().
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, type ButtonVariant } from '@/components/Button';
import { Card } from '@/components/Card';
import { Chip } from '@/components/Chip';
import { EmptyState } from '@/components/EmptyState';
import { ScreenHeader } from '@/components/ScreenHeader';
import { t } from '@/i18n/t';
import { colors, spacing, typography } from '@/theme';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive'];
const durations = [2, 5, 10, 15, 25];

export function ComponentPreview() {
  const [presses, setPresses] = useState(0);
  const [duration, setDuration] = useState(10);
  const press = () => setPresses((n) => n + 1);

  return (
    <>
      <ScreenHeader title="Components" subtitle={`Button presses: ${presses}`} />

      <Text style={[typography.small, styles.sectionLabel]}>Button</Text>
      {variants.map((variant) => (
        <Button key={variant} label={variant} variant={variant} onPress={press} />
      ))}
      <Button label="primary lg" size="lg" onPress={press} />
      <Button label="disabled" disabled onPress={press} />

      <Text style={[typography.small, styles.sectionLabel]}>Chip</Text>
      <View style={styles.chipRow}>
        {durations.map((minutes) => (
          <Chip
            key={minutes}
            label={String(minutes)}
            accessibilityLabel={`${minutes} minutes`}
            selected={duration === minutes}
            onPress={() => setDuration(minutes)}
          />
        ))}
      </View>

      <Text style={[typography.small, styles.sectionLabel]}>Card + EmptyState</Text>
      <Card>
        <EmptyState
          title={t('today.empty.title')}
          body={t('today.empty.body')}
          action={{ label: t('today.empty.action'), onPress: press }}
        />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: colors.primary, marginTop: spacing.lg },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
