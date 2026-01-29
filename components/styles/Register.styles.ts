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

export const createRegisterScreenStyles = ({
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

    scrollContent: {
      padding: spacing.space400,
    } as ViewStyle,

    headerContainer: {
      alignItems: 'center',
      marginTop: spacing.space800,
      marginBottom: spacing.space800,
    } as ViewStyle,

    headerIcon: {
      fontSize: 64,
      marginBottom: spacing.space400,
    } as TextStyle,

    headerTitle: {
      color: accent,
      fontSize: fontSize.fs1100,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space150,
    } as TextStyle,

    headerSubtitle: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs300,
      textAlign: 'center',
    } as TextStyle,

    formContainer: {
      gap: spacing.space400,
    } as ViewStyle,

    inputGroup: {
      // No specific styles needed
    } as ViewStyle,

    inputLabel: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.medium,
      marginBottom: spacing.space200,
    } as TextStyle,

    textInput: {
      backgroundColor: colors.background.elevated,
      color: colors.foreground.primary,
      fontSize: fontSize.fs400,
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
    } as ViewStyle,

    textInputNormal: {
      borderColor: colors.border.subtle,
    } as ViewStyle,

    textInputError: {
      borderColor: colors.border.negative,
    } as ViewStyle,

    errorText: {
      color: colors.foreground.negative,
      fontSize: fontSize.fs200,
      marginTop: spacing.space150,
    } as TextStyle,

    registerButton: {
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      alignItems: 'center',
      marginTop: spacing.space400,
      ...shadows.medium,
      flexDirection: 'row',
      justifyContent: 'center',
    } as ViewStyle,

    registerButtonActive: {
      backgroundColor: accent,
    } as ViewStyle,

    registerButtonDisabled: {
      backgroundColor: colors.background.secondary,
    } as ViewStyle,

    loadingIndicator: {
      marginRight: spacing.space300,
    } as ViewStyle,

    registerButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs500,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    infoText: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      textAlign: 'center',
      marginTop: spacing.space800,
    } as TextStyle,
  });
};