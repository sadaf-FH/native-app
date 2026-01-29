import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { createHeaderStyles } from './styles/Header.styles';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showThemeToggle?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  onSearchPress?: () => void;
  onCartPress?: () => void;
  cartItemCount?: number;
}

export default function Header({
  title,
  subtitle,
  showThemeToggle = true,
  showSearch = false,
  showCart = false,
  onSearchPress,
  onCartPress,
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

  const hasActionsMargin = showSearch || showCart;

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
              <Svg width={22} height={22} viewBox="0 0 24 24">
                <Path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  fill="white"
                />
              </Svg>
            ) : (
              <Svg width={22} height={22} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="5" fill="white" />
                <Line x1="12" y1="1" x2="12" y2="4" stroke="white" strokeWidth="2" />
                <Line x1="12" y1="20" x2="12" y2="23" stroke="white" strokeWidth="2" />
                <Line x1="1" y1="12" x2="4" y2="12" stroke="white" strokeWidth="2" />
                <Line x1="20" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" />
                <Line x1="4.5" y1="4.5" x2="6.5" y2="6.5" stroke="white" strokeWidth="2" />
                <Line x1="17.5" y1="17.5" x2="19.5" y2="19.5" stroke="white" strokeWidth="2" />
                <Line x1="4.5" y1="19.5" x2="6.5" y2="17.5" stroke="white" strokeWidth="2" />
                <Line x1="17.5" y1="6.5" x2="19.5" y2="4.5" stroke="white" strokeWidth="2" />
              </Svg>
            )}
          </TouchableOpacity>
        )}

        {/* Search Button */}
        {showSearch && onSearchPress && (
          <TouchableOpacity
            onPress={onSearchPress}
            style={[styles.searchButton, showCart && styles.searchButtonWithMargin]}
          >
            <Text style={styles.searchEmoji}>🔍</Text>
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
            <Text style={styles.cartEmoji}>🛒</Text>
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