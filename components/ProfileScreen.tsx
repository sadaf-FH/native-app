import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';

export default function ProfileScreen() {
  const { 
    colors, 
    spacing, 
    fontSize,
    fontWeight,
    borderRadius, 
    borderWidth,
    shadows,
    isDark,
    toggleTheme,
  } = useTheme();
  
  const accent = colors.accent.CO;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { icon: '👤', title: 'Account Details', description: 'Manage your personal information' },
    { icon: '📍', title: 'Addresses', description: 'Manage delivery addresses' },
    { icon: '💳', title: 'Payment Methods', description: 'Manage payment options' },
    { icon: '📦', title: 'Order History', description: 'View past orders' },
    { icon: '❤️', title: 'Favorites', description: 'Your favorite dishes' },
    { icon: '🔔', title: 'Notifications', description: 'Manage notifications' },
    { icon: '⚙️', title: 'Settings', description: 'App preferences' },
    { icon: '❓', title: 'Help & Support', description: 'Get help and contact us' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background.elevated,
            borderBottomWidth: borderWidth.bw20,
            borderBottomColor: colors.border.medium,
            padding: spacing.space400,
            ...shadows.medium,
          },
        ]}
      >
        <View>
          <Text
            style={{
              color: accent,
              fontSize: fontSize.fs1100,
              fontWeight: fontWeight.bold,
            }}
          >
            Profile 👤
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs200,
              marginTop: spacing.space150,
            }}
          >
            Manage your account
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            backgroundColor: accent,
            padding: spacing.space300,
            borderRadius: borderRadius.br50,
            ...shadows.small,
          }}
        >
          <Text style={{ fontSize: fontSize.fs400 }}>
            {isDark ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ padding: spacing.space400 }}>
        {/* User Info Card */}
        <View
          style={{
            backgroundColor: colors.background.elevated,
            padding: spacing.space500,
            borderRadius: borderRadius.br70,
            borderWidth: borderWidth.bw20,
            borderColor: accent,
            marginBottom: spacing.space600,
            alignItems: 'center',
            ...shadows.medium,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: accent,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.space400,
            }}
          >
            <Text style={{ fontSize: 40 }}>👤</Text>
          </View>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs900,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space150,
            }}
          >
            {user?.name || 'Guest User'}
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs300,
              marginBottom: spacing.space400,
            }}
          >
            {user?.email || 'No email'}
          </Text>
          {user?.phone && (
            <Text
              style={{
                color: colors.foreground.tertiary,
                fontSize: fontSize.fs300,
                marginBottom: spacing.space400,
              }}
            >
              {user.phone}
            </Text>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.secondary,
              paddingVertical: spacing.space250,
              paddingHorizontal: spacing.space500,
              borderRadius: borderRadius.br50,
              borderWidth: borderWidth.bw10,
              borderColor: colors.border.medium,
            }}
          >
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.medium,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={{ gap: spacing.space300 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: colors.background.elevated,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: colors.border.light,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: fontSize.fs900, marginRight: spacing.space400 }}>
                  {item.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.foreground.primary,
                      fontSize: fontSize.fs400,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.foreground.tertiary,
                      fontSize: fontSize.fs200,
                      marginTop: spacing.space100,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <Text style={{ color: colors.foreground.tertiary, fontSize: fontSize.fs700 }}>
                →
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: colors.background.negative,
            padding: spacing.space400,
            borderRadius: borderRadius.br50,
            borderWidth: borderWidth.bw10,
            borderColor: colors.border.negative,
            marginTop: spacing.space600,
            marginBottom: spacing.space400,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: colors.foreground.negative,
              fontSize: fontSize.fs400,
              fontWeight: fontWeight.bold,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});