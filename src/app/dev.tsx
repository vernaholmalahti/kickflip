// DEV ONLY route: /dev — component and theme test screen (opened from the Me tab).
// Delete together with src/dev/ in roadmap task 7.5.
import { Stack } from 'expo-router';

import { DevScreen } from '@/dev/DevScreen';
import { colors } from '@/theme';

export default function DevRoute() {
  return (
    <>
      {/* Show a header here so there's a back button to return to the tabs. */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Dev preview',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      />
      <DevScreen />
    </>
  );
}
