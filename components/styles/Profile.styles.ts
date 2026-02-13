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

export const createProfileScreenStyles = ({
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
      flex: 1,
    } as ViewStyle,

    content: {
      flex: 1,
    } as ViewStyle,

    scrollContent: {
      padding: spacing.space400,
    } as ViewStyle,

    userCard: {
      backgroundColor: colors.background.elevated,
      padding: spacing.space500,
      borderRadius: borderRadius.br70,
      borderWidth: borderWidth.bw20,
      borderColor: colors.border.subtle,
      marginBottom: spacing.space600
    } as ViewStyle,

    userCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.space400,
    } as ViewStyle,

    userAvatar: {
      width: 64,
      height: 64,
      borderRadius: borderRadius.br50,
      backgroundColor: accent,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.space400,
    } as ViewStyle,

    userAvatarIcon: {
      fontSize: 32,
    } as TextStyle,

    userInfo: {
      flex: 1,
    } as ViewStyle,

    userName: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs700,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space100,
    } as TextStyle,

    userEmail: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs300,
    } as TextStyle,

    userPhone: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs300,
      marginTop: spacing.space100,
    } as TextStyle,

    editProfileButton: {
      backgroundColor: accent,
      paddingVertical: spacing.space300,
      borderRadius: borderRadius.br70,
      alignItems: 'center',
      ...shadows.small,
    } as ViewStyle,

    editProfileButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    sectionContainer: {
      marginBottom: spacing.space500,
    } as ViewStyle,

    sectionHeader: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs200,
      fontWeight: fontWeight.medium,
      marginBottom: spacing.space300,
      paddingHorizontal: spacing.space200,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    } as TextStyle,

    sectionCard: {
      backgroundColor: colors.background.elevated,
      borderRadius: borderRadius.br70,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,
      overflow: 'hidden',
    } as ViewStyle,

    menuItem: {
      padding: spacing.space400,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,

    menuItemWithBorder: {
      borderBottomWidth: borderWidth.bw10,
      borderBottomColor: colors.border.lighter,
    } as ViewStyle,

    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    } as ViewStyle,

    menuItemIcon: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.br50,
      backgroundColor: colors.background.light,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.space400,
    } as ViewStyle,

    menuItemIconText: {
      fontSize: fontSize.fs500,
    } as TextStyle,

    menuItemContent: {
      flex: 1,
    } as ViewStyle,

    menuItemTitle: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.medium,
    } as TextStyle,

    menuItemDescription: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      marginTop: spacing.space100,
    } as TextStyle,

    menuItemArrow: {
      color: colors.foreground.light,
      fontSize: fontSize.fs500,
    } as TextStyle,

    logoutButton: {
      backgroundColor: colors.background.elevated,
      padding: spacing.space400,
      borderRadius: borderRadius.br70,
      borderWidth: borderWidth.bw20,
      borderColor: colors.border.negative,
      marginTop: spacing.space200,
      marginBottom: spacing.space400,
      alignItems: 'center',
    } as ViewStyle,

    logoutButtonText: {
      color: colors.foreground.negative,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};