import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';
import Header from '@/components/base/Header';
import { createProfileScreenStyles } from './styles/Profile.styles';

export default function ProfileScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const styles = createProfileScreenStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });

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
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.sectionCard}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index < items.length - 1 && styles.menuItemWithBorder,
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuItemIcon}>
                <Text style={styles.menuItemIconText}>{item.icon}</Text>
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
              </View>
            </View>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header title="Profile" subtitle="Manage your account" showThemeToggle={true} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userCardHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarIcon}>👤</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'No email'}</Text>
              {user?.phone && <Text style={styles.userPhone}>{user.phone}</Text>}
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        {renderMenuSection('Account', accountItems)}
        {renderMenuSection('App', appItems)}
        {renderMenuSection('Support', supportItems)}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}