import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Svg, { Circle, Line, Path } from 'react-native-svg';

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

  return (
    <View
      style={{
        backgroundColor: colors.background.elevated,
        borderBottomWidth: borderWidth.bw20,
        borderBottomColor: colors.border.medium,
        padding: spacing.space400,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...shadows.medium,
      }}
    >
      <View>
        <Text
          style={{
            color: accent,
            fontSize: fontSize.fs800,
            fontWeight: fontWeight.bold,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs200,
              marginTop: spacing.space150,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Theme Toggle */}
        {showThemeToggle && (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              backgroundColor: accent,
              padding: spacing.space400,
              borderRadius: borderRadius.br50,
              marginRight: showSearch || showCart ? spacing.space300 : 0,
              borderWidth: borderWidth.bw10,
              borderColor: accent,
            }}
          >
            {isDark ? (
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
            style={{
              backgroundColor: colors.state.primary.hover,
              padding: spacing.space300,
              borderRadius: borderRadius.br50,
              marginRight: showCart ? spacing.space300 : 0,
              borderWidth: borderWidth.bw10,
              borderColor: colors.border.subtle,
            }}
          >
            <Text style={{ fontSize: fontSize.fs700 }}>🔍</Text>
          </TouchableOpacity>
        )}

        {/* Cart Button */}
        {showCart && onCartPress && (
          <TouchableOpacity
            onPress={onCartPress}
            style={{
              backgroundColor: cartItemCount > 0 ? accent : colors.state.primary.hover,
              padding: spacing.space300,
              borderRadius: borderRadius.br50,
              position: 'relative',
              borderWidth: borderWidth.bw10,
              borderColor: cartItemCount > 0 ? accent : colors.border.subtle,
            }}
          >
            <Text style={{ fontSize: fontSize.fs700 }}>🛒</Text>
            {cartItemCount > 0 && (
              <View
                style={{
                  backgroundColor: colors.action.negative,
                  position: 'absolute',
                  top: -spacing.space150,
                  right: -spacing.space150,
                  borderRadius: borderRadius.brFull,
                  minWidth: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: borderWidth.bw20,
                  borderColor: colors.background.elevated,
                }}
              >
                <Text
                  style={{
                    color: colors.contrast.white,
                    fontSize: fontSize.fs100,
                    fontWeight: fontWeight.bold,
                  }}
                >
                  {cartItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}