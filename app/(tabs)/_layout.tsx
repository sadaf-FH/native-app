import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const { colors, fontSize } = useTheme();
  const accent = colors.accent.CO;

  return (
    <Tabs
      key={isDark ? 'dark' : 'light'} 
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
  name="menu"
  options={{
    title: "Menu",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="restaurant" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="admin"
  options={{
    title: "Admin",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="settings" size={size} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="profile"
  options={{
    title: "Profile",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person" size={size} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="order-flow"
  options={{
    title: "Order Flow",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="person" size={size} color={color} />
    ),
  }}
/>
    </Tabs>
  );
}