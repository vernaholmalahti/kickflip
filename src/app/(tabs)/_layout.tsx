import { Tabs } from 'expo-router/js-tabs';

import { GarageIcon } from '@/components/icons/GarageIcon';
import { RiderIcon } from '@/components/icons/RiderIcon';
import { SkateboardIcon } from '@/components/icons/SkateboardIcon';
import { TrickBookIcon } from '@/components/icons/TrickBookIcon';
import { t } from '@/i18n/t';
import { colors, fontFamily, layout, typography } from '@/theme';

// The bottom tab bar. Each <Tabs.Screen name> matches a file in this folder.
// The tab's title is also its accessibility label.
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // screens draw their own ScreenHeader
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: layout.borderWidth,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamily.bodySemiBold,
          fontSize: typography.small.fontSize,
        },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.today'),
          tabBarIcon: ({ color, size }) => <SkateboardIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: t('tabs.garage'),
          tabBarIcon: ({ color, size }) => <GarageIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tricks"
        options={{
          title: t('tabs.tricks'),
          tabBarIcon: ({ color, size }) => <TrickBookIcon color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: t('tabs.me'),
          tabBarIcon: ({ color, size }) => <RiderIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
