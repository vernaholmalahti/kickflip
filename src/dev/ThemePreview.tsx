// DEV ONLY — shows every theme token so we can check them on a real phone.
// Labels here are token names, not user-facing copy, so they are not in i18n.
// Delete the src/dev folder in roadmap task 7.5.
import { StyleSheet, Text, View } from 'react-native';

import { colors, layout, radii, spacing, typography } from '@/theme';
import type { ColorToken, TypographyToken } from '@/theme';

const textStyleNames = Object.keys(typography) as TypographyToken[];
const colorNames = Object.keys(colors) as ColorToken[];

export function ThemePreview() {
  return (
    <>
      <Text style={[typography.small, styles.sectionLabel]}>Typography</Text>
      {textStyleNames.map((name) => (
        <View key={name} style={styles.row}>
          <Text style={[typography.small, styles.muted]}>{name}</Text>
          <Text style={[typography[name], styles.text]}>
            {name === 'timer' ? '09:58' : 'Drop in 123'}
          </Text>
        </View>
      ))}

      <Text style={[typography.small, styles.sectionLabel]}>Colours</Text>
      {colorNames.map((name) => (
        <View key={name} style={styles.swatchRow}>
          <View style={[styles.swatch, { backgroundColor: colors[name] }]} />
          <View style={styles.swatchText}>
            <Text style={[typography.bodyStrong, styles.text]}>{name}</Text>
            <Text style={[typography.small, styles.muted]}>{colors[name]}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { color: colors.primary, marginTop: spacing.lg },
  row: { gap: spacing.xs },
  text: { color: colors.text },
  muted: { color: colors.textMuted },
  swatchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  swatch: {
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: radii.md,
    borderWidth: layout.borderWidth,
    borderColor: colors.border,
  },
  swatchText: { flex: 1 },
});
