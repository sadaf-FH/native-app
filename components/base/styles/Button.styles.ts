import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'CO' | 'CM';
type ButtonSize = 'small' | 'medium' | 'large';

interface ThemeParams {
  colors: any;
  spacing: any;
  typography: any;
  borderRadius: any;
  shadows: any;
}

export const createButtonStyles = ({
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
}: ThemeParams) => {
  const base = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: borderRadius.br50,
    } as ViewStyle,

    text: {
      textAlign: 'center',
      fontWeight: typography.fontWeight.semibold,
    } as TextStyle,

    disabled: {
      opacity: 0.5,
    } as ViewStyle,

    fullWidth: {
      width: '100%',
    } as ViewStyle,
  });

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
    base,
    sizeStyles,
    variantStyles,
    sizeTextStyles,
    variantTextStyles,
  };
};

export const getLoaderColor = (variant: ButtonVariant, colors: any): string => {
  switch (variant) {
    case 'outline':
    case 'secondary':
      return colors.foreground.primary;
    default:
      return colors.contrast.white;
  }
};