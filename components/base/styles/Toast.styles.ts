import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  fontWeight: any;
  borderRadius: any;
  shadows: any;
}

export const createToastStyles = ({
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  shadows,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: spacing.space1400,
      left: spacing.space400,
      right: spacing.space400,
      zIndex: 9999,
    } as ViewStyle,

    pressable: {
      borderRadius: borderRadius.br70,
      paddingVertical: spacing.space350,
      paddingHorizontal: spacing.space400,
      flexDirection: 'row',
      alignItems: 'center',
      ...shadows.large,
    } as ViewStyle,

    icon: {
      fontSize: fontSize.fs500,
      marginRight: spacing.space300,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    message: {
      flex: 1,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.medium,
    } as TextStyle,
  });
};