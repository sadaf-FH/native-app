import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/restaurantSlice';
import { clearMenu } from '@/store/slices/menuSlice';
import Header from '@/components/base/Header';
import { createProfileScreenStyles } from './styles/Profile.styles';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const restaurant = useAppSelector((state) => state.restaurant.restaurant);
  const menu = useAppSelector((state) => state.menu.menu);

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
    dispatch(clearMenu());
    router.replace('/(tabs)/register');
  };

  const totalItems = menu?.Categories?.reduce((sum, cat) => sum + cat.item_count, 0) || 0;

  const statsItems = [
    { icon: '📋', title: 'Menu Items', value: totalItems.toString() },
    { icon: '📁', title: 'Categories', value: (menu?.Categories?.length || 0).toString() },
    { icon: '🍽️', title: 'Version', value: `v${menu?.version || 1}` },
  ];

  const accountItems = [
    { icon: '🏪', title: 'Restaurant Details', description: 'Name, location, franchise' },
    { icon: '📍', title: 'Location Settings', description: 'Address and timezone' },
    { icon: '⏰', title: 'Operating Hours', description: 'Manage availability' },
  ];

  const menuItems = [
    { icon: '📋', title: 'Menu Management', description: 'View and edit menu' },
    { icon: '🏷️', title: 'Offers & Discounts', description: 'Manage promotions' },
    { icon: '📊', title: 'Analytics', description: 'View performance' },
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
      <Header title="Restaurant Profile" subtitle="Manage your restaurant" showThemeToggle={true} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userCardHeader}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarIcon}>🍽️</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{restaurant?.name || 'Guest Restaurant'}</Text>
              <Text style={styles.userEmail}>{restaurant?.location || 'No location'}</Text>
              {restaurant?.franchise && (
                <Text style={styles.userPhone}>{restaurant.franchise}</Text>
              )}
              <Text style={styles.userPhone}>
                {restaurant?.available ? '🟢 Available' : '🔴 Closed'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Restaurant Info</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={{ flexDirection: 'row', gap: theme.spacing.space300, marginBottom: theme.spacing.space500 }}>
          {statsItems.map((stat, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                backgroundColor: theme.colors.background.elevated,
                padding: theme.spacing.space400,
                borderRadius: theme.borderRadius.br70,
                borderWidth: theme.borderWidth.bw10,
                borderColor: theme.colors.border.subtle,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: theme.fontSize.fs600, marginBottom: theme.spacing.space150 }}>
                {stat.icon}
              </Text>
              <Text style={{ 
                color: accent,
                fontSize: theme.fontSize.fs700,
                fontWeight: theme.fontWeight.bold,
                marginBottom: theme.spacing.space100,
              }}>
                {stat.value}
              </Text>
              <Text style={{ 
                color: theme.colors.foreground.tertiary,
                fontSize: theme.fontSize.fs200,
                textAlign: 'center',
              }}>
                {stat.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Menu Sections */}
        {renderMenuSection('Restaurant', accountItems)}
        {renderMenuSection('Menu', menuItems)}
        {renderMenuSection('Support', supportItems)}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}