import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  fontWeight: any;
  borderRadius: any;
  borderWidth: any;
  shadows: any;
  accent: string;
}

export const createHeaderStyles = ({
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  borderWidth,
  shadows,
  accent,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.elevated,
      borderBottomWidth: borderWidth.bw20,
      borderBottomColor: colors.border.medium,
      paddingHorizontal: spacing.space400,
      paddingVertical: spacing.space400,
      paddingTop: spacing.space200,        // ← reduce top padding, SafeAreaView handles the gap
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...shadows.medium,
    } as ViewStyle,

    titleContainer: {
    } as ViewStyle,

    title: {
      color: accent,
      fontSize: fontSize.fs800,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    subtitle: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      marginTop: spacing.space150,
    } as TextStyle,

    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,

    themeToggleButton: {
      backgroundColor: colors.background.primary,   // ← blends with background
      padding: spacing.space300,                    // ← slightly smaller
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,            // ← subtle border instead of accent
    } as ViewStyle,

    themeToggleButtonWithMargin: {
      marginRight: spacing.space300,
    } as ViewStyle,

    searchButton: {
      backgroundColor: colors.background.primary,   // ← match toggle button
      padding: spacing.space300,
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,
    } as ViewStyle,

    searchButtonWithMargin: {
      marginRight: spacing.space300,
    } as ViewStyle,

    searchEmoji: {
      fontSize: fontSize.fs700,
    } as TextStyle,

    cartButton: {
      padding: spacing.space300,
      borderRadius: borderRadius.br50,
      position: 'relative',
      borderWidth: borderWidth.bw10,
    } as ViewStyle,

    cartButtonActive: {
      backgroundColor: accent,
      borderColor: accent,
    } as ViewStyle,

    cartButtonInactive: {
      backgroundColor: colors.background.primary,  
      borderColor: colors.border.subtle,
    } as ViewStyle,

    cartEmoji: {
      fontSize: fontSize.fs700,
    } as TextStyle,

    cartBadge: {
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
    } as ViewStyle,

    cartBadgeText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs100,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};