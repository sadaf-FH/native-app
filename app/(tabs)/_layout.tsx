import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/store/hooks';

export default function TabLayout() {
  // Listen to Redux theme to force re-render
  const isDark = useAppSelector((state) => state.theme.isDark);
  const { colors, fontSize } = useTheme();
  const accent = colors.accent.CO;

  return (
    <Tabs
      key={isDark ? 'dark' : 'light'} // Force re-mount on theme change
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: colors.foreground.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.elevated,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.fs100,
          color: colors.foreground.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🍽️</Text>,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>🔍</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}