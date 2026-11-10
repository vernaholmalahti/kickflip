import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, opacity, radii, spacing, typography } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps {
  /** Visible text. Pass a t() string — never inline text. */
  label: string;
  onPress: () => void;
  /** Use one 'primary' per screen (DESIGN_SYSTEM §1). */
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  /** Defaults to `label`. Set it when the label alone isn't clear out of context. */
  accessibilityLabel?: string;
  /** Extra context read after the label, e.g. what will happen. */
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// Colours per variant. A lookup object keeps the render code free of if/else chains.
const variantColors: Record<ButtonVariant, { bg: string; text: string; border: string }> = {
  primary: { bg: colors.primary, text: colors.onPrimary, border: colors.primary },
  secondary: { bg: 'transparent', text: colors.text, border: colors.border },
  ghost: { bg: 'transparent', text: colors.primary, border: 'transparent' },
  destructive: { bg: colors.destructive, text: colors.onPrimary, border: colors.destructive },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  testID,
}: ButtonProps) {
  const palette = variantColors[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: layout.controlHeight[size],
          backgroundColor: palette.bg,
          borderColor: palette.border,
        },
        pressed && { opacity: opacity.pressed },
        disabled && { opacity: opacity.disabled },
        style,
      ]}
    >
      <Text style={[typography.bodyStrong, styles.label, { color: palette.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: layout.minTouchTarget,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    borderWidth: layout.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { textAlign: 'center' },
});
