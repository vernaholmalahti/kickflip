import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, layout, opacity, radii, spacing, typography } from '@/theme';

export interface ChipProps {
  /** Visible text. Pass a t() string — never inline text. */
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Defaults to `label`, e.g. set "10 minutes" when the label is just "10". */
  accessibilityLabel?: string;
  disabled?: boolean;
  testID?: string;
}

/** Selectable pill — durations, mission size, templates, ride days. */
export function Chip({
  label,
  selected,
  onPress,
  accessibilityLabel,
  disabled = false,
  testID,
}: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      // Screen readers announce "selected", so state isn't shown by colour alone.
      accessibilityState={{ selected, disabled }}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        selected ? styles.selected : styles.unselected,
        pressed && { opacity: opacity.pressed },
        disabled && { opacity: opacity.disabled },
      ]}
    >
      <Text style={[typography.bodyStrong, { color: selected ? colors.onPrimary : colors.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget,
    minWidth: layout.minTouchTarget,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  unselected: { backgroundColor: colors.surface, borderColor: colors.border },
});
