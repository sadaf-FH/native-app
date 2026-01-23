import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'CO' | 'CM';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.memo<ButtonProps>(
  ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
  }) => {
    const { colors, spacing, typography, borderRadius, shadows } = useTheme();

    // Dynamic styles based on variant
    const getButtonStyle = (): ViewStyle => {
      const baseStyle: ViewStyle = {
        ...styles.button,
        borderRadius: borderRadius.br50,
      };

      // Size-specific styles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: {
        paddingVertical: spacing.space200,    
        paddingHorizontal: spacing.space400,  
      },
      medium: {
        paddingVertical: spacing.space300,   
        paddingHorizontal: spacing.space500, 
      },
      large: {
        paddingVertical: spacing.space400, 
        paddingHorizontal: spacing.space600,  
      },
    };

      // Variant-specific styles
      const variantStyles: Record<ButtonVariant, ViewStyle> = {
        primary: {
          backgroundColor: colors.foreground.primary,
          ...shadows.small,
        },
        secondary: {
          backgroundColor: colors.background.secondary,
          borderWidth: 1,
          borderColor: colors.border.medium,
        },
        outline: {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border.strong,
        },
        CO: {
          backgroundColor: colors.accent.CO,
          ...shadows.small,
        },
        CM: {
          backgroundColor: colors.accent.CM,
          ...shadows.small,
        },
      };

      return {
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(fullWidth && { width: '100%' }),
        ...(disabled && styles.disabled),
      };
    };

    const getTextStyle = (): TextStyle => {
      const baseTextStyle: TextStyle = {
        ...styles.text,
        fontWeight: typography.fontWeight.semibold,
      };

      const sizeTextStyles: Record<ButtonSize, TextStyle> = {
        small: { fontSize: typography.fontSize.sm },
        medium: { fontSize: typography.fontSize.md },
        large: { fontSize: typography.fontSize.lg },
      };

      const variantTextStyles: Record<ButtonVariant, TextStyle> = {
        primary: { color: colors.contrast.white },
        secondary: { color: colors.foreground.primary },
        outline: { color: colors.foreground.primary },
        CO: { color: colors.contrast.white },
        CM: { color: colors.contrast.white },
      };

      return {
        ...baseTextStyle,
        ...sizeTextStyles[size],
        ...variantTextStyles[variant],
      };
    };

    const getLoaderColor = (): string => {
      switch (variant) {
        case 'outline':
        case 'secondary':
          return colors.foreground.primary;
        default:
          return colors.contrast.white;
      }
    };

    return (
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={getLoaderColor()} />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});