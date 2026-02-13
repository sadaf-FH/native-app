import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  borderWidth: any;
}

export const createResultsCountStyles = ({
  colors,
  spacing,
  fontSize,
  borderWidth,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.light,
      padding: spacing.space300,
      paddingHorizontal: spacing.space400,
      borderBottomWidth: borderWidth.bw10,
      borderBottomColor: colors.border.lighter,
    } as ViewStyle,

    countText: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs200,
    } as TextStyle,
  });
};