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

export const createCartModalStyles = ({
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
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.state.primary.pressed,
      justifyContent: 'flex-end',
    } as ViewStyle,

    overlayTouchable: {
      flex: 1,
    } as ViewStyle,

    modalContent: {
      backgroundColor: colors.background.elevated,
      borderTopLeftRadius: borderRadius.br70,
      borderTopRightRadius: borderRadius.br70,
      padding: spacing.space400,
      maxHeight: '75%',
      ...shadows.large,
    } as ViewStyle,

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.space400,
      paddingBottom: spacing.space300,
      borderBottomWidth: borderWidth.bw10,
      borderBottomColor: colors.border.lighter,
    } as ViewStyle,

    headerTitle: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs700,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    closeButton: {
      width: 32,
      height: 32,
      borderRadius: borderRadius.br50,
      backgroundColor: colors.background.light,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,

    closeButtonText: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs500,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    scrollView: {
      marginBottom: spacing.space400,
    } as ViewStyle,

    totalContainer: {
      backgroundColor: colors.background.light,
      padding: spacing.space300,
      borderRadius: borderRadius.br50,
      marginBottom: spacing.space300,
    } as ViewStyle,

    subtotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.space100,
    } as ViewStyle,

    subtotalLabel: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
    } as TextStyle,

    subtotalValue: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs200,
    } as TextStyle,

    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: spacing.space200,
      borderTopWidth: borderWidth.bw10,
      borderTopColor: colors.border.lighter,
    } as ViewStyle,

    totalLabel: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    totalValue: {
      color: accent,
      fontSize: fontSize.fs500,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    actionsContainer: {
      flexDirection: 'row',
      gap: spacing.space300,
    } as ViewStyle,

    clearButton: {
      flex: 1,
      backgroundColor: colors.background.light,
      paddingVertical: spacing.space300,
      borderRadius: borderRadius.br70,
      alignItems: 'center',
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.medium,
    } as ViewStyle,

    clearButtonText: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.medium,
    } as TextStyle,

    placeOrderButton: {
      flex: 2,
      backgroundColor: accent,
      paddingVertical: spacing.space300,
      borderRadius: borderRadius.br70,
      alignItems: 'center',
      ...shadows.small,
    } as ViewStyle,

    placeOrderButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};