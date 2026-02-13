import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  fontWeight: any;
}

export const createEmptyStateStyles = ({
  colors,
  spacing,
  fontSize,
  fontWeight,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.space1200,
    } as ViewStyle,

    icon: {
      fontSize: 64,
      marginBottom: spacing.space400,
    } as TextStyle,

    title: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs700,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space150,
    } as TextStyle,

    subtitle: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      textAlign: 'center',
    } as TextStyle,
  });
};