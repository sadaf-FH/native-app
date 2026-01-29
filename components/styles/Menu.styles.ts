import { StyleSheet, ViewStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
}

export const createMenuScreenStyles = ({
  colors,
  spacing,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    } as ViewStyle,

    listContent: {
      padding: spacing.space400,
    } as ViewStyle,

    columnWrapper: {
      justifyContent: 'space-between',
    } as ViewStyle,
  });
};