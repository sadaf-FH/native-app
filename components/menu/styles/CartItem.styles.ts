import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  fontWeight: any;
  borderRadius: any;
  borderWidth: any;
  accent: string;
}

export const createCartItemStyles = ({
  colors,
  spacing,
  fontSize,
  fontWeight,
  borderRadius,
  borderWidth,
  accent,
}: ThemeParams) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: spacing.space300,
      borderRadius: borderRadius.br70,
      marginBottom: spacing.space300,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,
    } as ViewStyle,

    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.space0,
      marginTop: spacing.space0,
    } as ViewStyle,

    itemInfoContainer: {
      flex: 1,
    } as ViewStyle,

    itemName: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    itemPrice: {
      color: accent,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      marginTop: spacing.space0,
    } as TextStyle,

    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    } as ViewStyle,

    quantityControlsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.light,
      padding: spacing.space0,
      marginTop: spacing.space100,
      borderRadius: borderRadius.br40,
    } as ViewStyle,

    decrementButton: {
      backgroundColor: colors.contrast.white,
      width: 24,
      height: 24,
      borderRadius: borderRadius.br40,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    decrementButtonText: {
      color: accent,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      marginTop: spacing.space100,
    } as TextStyle,

    quantityText: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      marginHorizontal: spacing.space300,
      minWidth: 16,
      textAlign: 'center',
    } as TextStyle,

    incrementButton: {
      backgroundColor: accent,
      width: 24,
      height: 24,
      borderRadius: borderRadius.br40,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    incrementButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    totalPrice: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs600,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};