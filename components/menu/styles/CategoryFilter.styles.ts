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

export const createCategoryFilterStyles = ({
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
    scrollView: {
      backgroundColor: colors.background.tertiary,
      borderBottomWidth: borderWidth.bw10,
      borderBottomColor: colors.border.lighter,
      maxHeight: 50,
    } as ViewStyle,

    contentContainer: {
      alignItems: 'center',
      paddingVertical: spacing.space150,
      paddingHorizontal: spacing.space400,
    } as ViewStyle,

    categoryButton: {
      paddingVertical: spacing.space100,
      paddingHorizontal: spacing.space500,
      borderRadius: borderRadius.br70,
      marginRight: spacing.space300,
      borderWidth: borderWidth.bw20,
      flexDirection: 'row',
      alignItems: 'center',
      ...shadows.small,
    } as ViewStyle,

    categoryButtonSelected: {
      backgroundColor: accent,
      borderColor: accent,
    } as ViewStyle,

    categoryButtonUnselected: {
      backgroundColor: colors.background.elevated,
      borderColor: colors.border.lighter,
    } as ViewStyle,

    categoryIcon: {
      fontSize: fontSize.fs200,
      marginRight: spacing.space100,
    } as TextStyle,

    categoryLabel: {
      fontSize: fontSize.fs200,
    } as TextStyle,

    categoryLabelSelected: {
      color: colors.contrast.white,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    categoryLabelUnselected: {
      color: colors.foreground.primary,
      fontWeight: fontWeight.medium,
    } as TextStyle,
  });
};