import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createHeaderStyles } from './styles/Header.styles';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showThemeToggle?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  showTrackOrder?: boolean;
  onSearchPress?: () => void;
  onCartPress?: () => void;
  onTrackOrderPress?: () => void;
  cartItemCount?: number;
}

export default function Header({
  title,
  subtitle,
  showThemeToggle = true,
  showSearch = false,
  showCart = false,
  showTrackOrder = false,
  onSearchPress,
  onCartPress,
  onTrackOrderPress,
  cartItemCount = 0,
}: HeaderProps) {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;

  const styles = createHeaderStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });

  const hasActionsMargin = showSearch || showCart || showTrackOrder;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.actionsContainer}>
        {/* Theme Toggle */}
        {showThemeToggle && (
          <TouchableOpacity
            onPress={theme.toggleTheme}
            style={[
              styles.themeToggleButton,
              hasActionsMargin && styles.themeToggleButtonWithMargin,
            ]}
          >
            {theme.isDark ? (
              <Ionicons name="moon-outline" size={22} color={theme.colors.foreground.primary} />
            ) : (
              <Ionicons name="sunny-outline" size={22} color={theme.colors.foreground.primary} />
            )}
          </TouchableOpacity>
        )}

        {/* Track Order Button */}
        {showTrackOrder && onTrackOrderPress && (
          <TouchableOpacity
            onPress={onTrackOrderPress}
            style={[styles.searchButton, styles.searchButtonWithMargin]}
          >
            <Ionicons name="bicycle-outline" size={20} color={accent} />
          </TouchableOpacity>
        )}

        {/* Search Button */}
        {showSearch && onSearchPress && (
          <TouchableOpacity
            onPress={onSearchPress}
            style={[styles.searchButton, showCart && styles.searchButtonWithMargin]}
          >
            <Ionicons name="search" size={20} color={theme.colors.foreground.primary} />
          </TouchableOpacity>
        )}

        {/* Cart Button */}
        {showCart && onCartPress && (
          <TouchableOpacity
            onPress={onCartPress}
            style={[
              styles.cartButton,
              cartItemCount > 0 ? styles.cartButtonActive : styles.cartButtonInactive,
            ]}
          >
            <Ionicons
              name="cart-outline"
              size={22}
              color={cartItemCount > 0 ? accent : theme.colors.foreground.primary}
            />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}