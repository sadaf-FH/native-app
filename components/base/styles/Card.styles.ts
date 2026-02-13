import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface ThemeParams {
  colors: any;
  spacing: any;
  fontSize: any;
  fontWeight: any;
  borderRadius: any;
  borderWidth: any;
  accent: string;
}

export const createCardStyles = ({
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
      flex: 1,
      backgroundColor: colors.background.elevated,
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      margin: spacing.space200,
      borderWidth: borderWidth.bw10,
      minHeight: 180,
    } as ViewStyle,

    containerInCart: {
      borderColor: accent,
    } as ViewStyle,

    containerNotInCart: {
      borderColor: colors.border.subtle,
    } as ViewStyle,

    containerUnavailable: {
      borderColor: colors.border.subtle,
      backgroundColor: colors.background.elevated,
      opacity: 0.6,
    } as ViewStyle,

    image: {
      width: '100%' as any,
      height: 100,
      borderRadius: borderRadius.br40,
      marginBottom: spacing.space250,
    } as ImageStyle,

    imageUnavailable: {
      opacity: 0.4,
    } as ImageStyle,

    imagePlaceholder: {
      marginBottom: spacing.space250,
    } as ViewStyle,

    name: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs500,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space150,
    } as TextStyle,

    nameUnavailable: {
      color: colors.foreground.tertiary,
    } as TextStyle,

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.space250,
    } as ViewStyle,

    ratingEmoji: {
      fontSize: fontSize.fs200,
    } as TextStyle,

    ratingText: {
      color: colors.foreground.secondary,
      fontSize: fontSize.fs200,
      fontWeight: fontWeight.medium,
      marginLeft: spacing.space150,
    } as TextStyle,

    description: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      marginBottom: spacing.space400,
      lineHeight: 18,
    } as TextStyle,

    priceButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    } as ViewStyle,

    price: {
      color: accent,
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
      flex: 0,
      marginRight: spacing.space200,
    } as TextStyle,

    priceUnavailable: {
      color: colors.foreground.tertiary,
    } as TextStyle,

    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: accent,
      paddingVertical: spacing.space100,
      paddingHorizontal: spacing.space150,
      borderRadius: borderRadius.br40,
      minWidth: 84,
      justifyContent: 'center',
      flexShrink: 0,
    } as ViewStyle,

    buttonContainerUnavailable: {
      backgroundColor: colors.background.primary,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,
    } as ViewStyle,

    quantityButton: {
      backgroundColor: colors.background.elevated,
      width: 18,
      height: 18,
      borderRadius: borderRadius.br40,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    quantityButtonText: {
      color: accent,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    quantityContainer: {
      marginHorizontal: spacing.space200,
      width: 20,
      height: 20,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    quantityText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      textAlign: 'center',
    } as TextStyle,

    addButtonContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    addButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
    } as TextStyle,

unavailableBadge: {
  position: 'absolute',
  bottom: spacing.space400,
  right: spacing.space400,
  backgroundColor: colors.accent.CO,     
  borderRadius: borderRadius.br40,
  paddingVertical: spacing.space150,
  paddingHorizontal: spacing.space200,
} as ViewStyle,

unavailableBadgeText: {
  color: '#FFFFFF',               
  fontSize: fontSize.fs100,
  fontWeight: fontWeight.bold,    
  letterSpacing: 0.5,
} as TextStyle,
  });
};