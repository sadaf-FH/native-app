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

export const createCartSummaryFooterStyles = ({
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
      padding: spacing.space0,
      paddingHorizontal: spacing.space400,
      borderTopWidth: borderWidth.bw20,
      borderTopColor: accent,
      flexDirection: 'row',
      alignItems: 'center',
      ...shadows.large,
    } as ViewStyle,

    infoContainer: {
      flex: 1,
    } as ViewStyle,

    itemsText: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs200,
      marginTop: spacing.space100,
    } as TextStyle,

    totalPriceText: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs700,
      fontWeight: fontWeight.bold,
      marginTop: spacing.space0,
    } as TextStyle,

    viewCartButton: {
      backgroundColor: accent,
      paddingVertical: spacing.space200,
      paddingHorizontal: spacing.space800,
      borderRadius: borderRadius.br70,
      ...shadows.medium,
    } as ViewStyle,

    viewCartButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};