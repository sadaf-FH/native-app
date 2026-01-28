import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';
import Header from '@/components/base/Header';

export default function ProfileScreen() {
  const { 
    colors, 
    spacing, 
    fontSize,
    fontWeight,
    borderRadius, 
    borderWidth,
    shadows,
  } = useTheme();
  
  const accent = colors.accent.CO;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const accountItems = [
    { icon: '👤', title: 'Account Details', description: 'Personal information' },
    { icon: '📍', title: 'Addresses', description: 'Delivery locations' },
    { icon: '💳', title: 'Payment Methods', description: 'Manage payments' },
  ];

  const appItems = [
    { icon: '📦', title: 'Order History', description: 'View past orders' },
    { icon: '❤️', title: 'Favorites', description: 'Saved dishes' },
    { icon: '🔔', title: 'Notifications', description: 'Preferences' },
  ];

  const supportItems = [
    { icon: '⚙️', title: 'Settings', description: 'App preferences' },
    { icon: '❓', title: 'Help & Support', description: 'Get assistance' },
  ];

  const renderMenuSection = (title: string, items: typeof accountItems) => (
    <View style={{ marginBottom: spacing.space500 }}>
      <Text
        style={{
          color: colors.foreground.secondary,
          fontSize: fontSize.fs200,
          fontWeight: fontWeight.medium,
          marginBottom: spacing.space300,
          paddingHorizontal: spacing.space200,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: colors.background.elevated,
          borderRadius: borderRadius.br70,
          borderWidth: borderWidth.bw10,
          borderColor: colors.border.subtle,
          overflow: 'hidden',
        }}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              padding: spacing.space400,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: index < items.length - 1 ? borderWidth.bw10 : 0,
              borderBottomColor: colors.border.lighter,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: borderRadius.br50,
                  backgroundColor: colors.background.light,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: spacing.space400,
                }}
              >
                <Text style={{ fontSize: fontSize.fs500 }}>{item.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.foreground.primary,
                    fontSize: fontSize.fs400,
                    fontWeight: fontWeight.medium,
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
            <Text style={{ color: colors.foreground.light, fontSize: fontSize.fs500 }}>
              →
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <Header
        title="Profile"
        subtitle="Manage your account"
        showThemeToggle={true}
      />

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ padding: spacing.space400 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View
          style={{
            backgroundColor: colors.background.elevated,
            padding: spacing.space500,
            borderRadius: borderRadius.br70,
            borderWidth: borderWidth.bw20,
            borderColor: colors.border.subtle,
            marginBottom: spacing.space600,
            ...shadows.medium,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.space400 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: borderRadius.br50,
                backgroundColor: accent,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.space400,
              }}
            >
              <Text style={{ fontSize: 32 }}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.foreground.primary,
                  fontSize: fontSize.fs700,
                  fontWeight: fontWeight.bold,
                  marginBottom: spacing.space100,
                }}
              >
                {user?.name || 'Guest User'}
              </Text>
              <Text
                style={{
                  color: colors.foreground.tertiary,
                  fontSize: fontSize.fs300,
                }}
              >
                {user?.email || 'No email'}
              </Text>
              {user?.phone && (
                <Text
                  style={{
                    color: colors.foreground.tertiary,
                    fontSize: fontSize.fs300,
                    marginTop: spacing.space100,
                  }}
                >
                  {user.phone}
                </Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: accent,
              paddingVertical: spacing.space300,
              borderRadius: borderRadius.br70,
              alignItems: 'center',
              ...shadows.small,
            }}
          >
            <Text
              style={{
                color: colors.contrast.white,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.bold,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        {renderMenuSection('Account', accountItems)}
        {renderMenuSection('App', appItems)}
        {renderMenuSection('Support', supportItems)}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: colors.background.elevated,
            padding: spacing.space400,
            borderRadius: borderRadius.br70,
            borderWidth: borderWidth.bw20,
            borderColor: colors.border.negative,
            marginTop: spacing.space200,
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
  content: {
    flex: 1,
  },
});