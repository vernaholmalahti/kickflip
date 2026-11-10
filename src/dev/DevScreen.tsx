// DEV ONLY — scrollable test screen: base components first, then theme tokens.
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

import { ComponentPreview } from './ComponentPreview';
import { ThemePreview } from './ThemePreview';

export function DevScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ComponentPreview />
        <ThemePreview />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: layout.screenPadding, gap: spacing.md },
});
