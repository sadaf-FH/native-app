import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createButtonStyles, getLoaderColor } from './styles/Button.styles';

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
    const theme = useTheme();

    const styles = createButtonStyles({
      colors: theme.colors,
      spacing: theme.spacing,
      typography: theme.typography,
      borderRadius: theme.borderRadius,
      shadows: theme.shadows,
    });

    const buttonStyle = [
      styles.base.button,
      styles.sizeStyles[size],
      styles.variantStyles[variant],
      fullWidth && styles.base.fullWidth,
      disabled && styles.base.disabled,
    ];

    const textStyle = [
      styles.base.text,
      styles.sizeTextStyles[size],
      styles.variantTextStyles[variant],
    ];

    const loaderColor = getLoaderColor(variant, theme.colors);

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={loaderColor} />
        ) : (
          <Text style={textStyle}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';