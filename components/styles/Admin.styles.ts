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

export const createCreateMenuScreenStyles = ({
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

    // Header
    header: {
      backgroundColor: colors.background.elevated,
      borderBottomWidth: borderWidth.bw20,
      borderBottomColor: colors.border.medium,
      padding: spacing.space400,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...shadows.medium,
    } as ViewStyle,

    headerTextContainer: {
      // No specific styles needed
    } as ViewStyle,

    headerTitle: {
      color: accent,
      fontSize: fontSize.fs800,
      fontWeight: fontWeight.bold,
    } as TextStyle,

    headerSubtitle: {
      color: colors.foreground.tertiary,
      fontSize: fontSize.fs200,
      marginTop: spacing.space150,
    } as TextStyle,

    themeToggleButton: {
      backgroundColor: accent,
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
      borderColor: accent,
    } as ViewStyle,

    // Category Selection
    categoryScrollView: {
      backgroundColor: colors.background.tertiary,
      borderBottomWidth: borderWidth.bw10,
      borderBottomColor: colors.border.lighter,
      maxHeight: 50,
    } as ViewStyle,

    categoryScrollContent: {
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

    // Form Inputs
    inputGroup: {
      marginBottom: spacing.space400,
    } as ViewStyle,

    inputLabel: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space200,
    } as TextStyle,

    textInput: {
      backgroundColor: colors.background.elevated,
      color: colors.foreground.primary,
      fontSize: fontSize.fs400,
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
      borderColor: colors.border.subtle,
    } as ViewStyle,

    textInputMultiline: {
      minHeight: 100,
      textAlignVertical: 'top',
    } as ViewStyle,

    priceInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,

    priceDollarSign: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs700,
      marginRight: spacing.space200,
    } as TextStyle,

    priceInput: {
      flex: 1,
    } as ViewStyle,

    // Tags Section
    tagsSection: {
      marginBottom: spacing.space600,
    } as ViewStyle,

    tagsLabel: {
      color: colors.foreground.primary,
      fontSize: fontSize.fs300,
      fontWeight: fontWeight.bold,
      marginBottom: spacing.space300,
    } as TextStyle,

    tagsContainer: {
      gap: spacing.space300,
    } as ViewStyle,

    tagButton: {
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      borderWidth: borderWidth.bw10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,

    tagButtonUnselected: {
      backgroundColor: colors.background.elevated,
      borderColor: colors.border.subtle,
    } as ViewStyle,

    tagButtonVegetarian: {
      backgroundColor: colors.background.accentCM,
      borderColor: colors.border.accentCM,
    } as ViewStyle,

    tagButtonSpicy: {
      backgroundColor: colors.background.negative,
      borderColor: colors.border.negative,
    } as ViewStyle,

    tagButtonPopular: {
      backgroundColor: colors.background.positive,
      borderColor: colors.border.positive,
    } as ViewStyle,

    tagButtonNew: {
      backgroundColor: colors.background.link,
      borderColor: colors.border.link,
    } as ViewStyle,

    tagContent: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,

    tagIcon: {
      fontSize: fontSize.fs500,
      marginRight: spacing.space300,
    } as TextStyle,

    tagText: {
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.medium,
    } as TextStyle,

    tagTextUnselected: {
      color: colors.foreground.primary,
    } as TextStyle,

    tagTextVegetarian: {
      color: colors.foreground.accentCM,
    } as TextStyle,

    tagTextSpicy: {
      color: colors.foreground.negative,
    } as TextStyle,

    tagTextPopular: {
      color: colors.foreground.positive,
    } as TextStyle,

    tagTextNew: {
      color: colors.foreground.link,
    } as TextStyle,

    tagCheckbox: {
      width: 24,
      height: 24,
      borderRadius: borderRadius.br40,
      borderWidth: borderWidth.bw20,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,

    tagCheckboxUnselected: {
      borderColor: colors.border.medium,
      backgroundColor: 'transparent',
    } as ViewStyle,

    tagCheckboxVegetarian: {
      borderColor: colors.border.accentCM,
      backgroundColor: colors.foreground.accentCM,
    } as ViewStyle,

    tagCheckboxSpicy: {
      borderColor: colors.border.negative,
      backgroundColor: colors.foreground.negative,
    } as ViewStyle,

    tagCheckboxPopular: {
      borderColor: colors.border.positive,
      backgroundColor: colors.foreground.positive,
    } as ViewStyle,

    tagCheckboxNew: {
      borderColor: colors.border.link,
      backgroundColor: colors.foreground.link,
    } as ViewStyle,

    tagCheckmark: {
      color: colors.contrast.white,
      fontSize: fontSize.fs200,
    } as TextStyle,

    // Submit Button
    submitButton: {
      backgroundColor: accent,
      padding: spacing.space400,
      borderRadius: borderRadius.br50,
      alignItems: 'center',
      marginBottom: spacing.space400,
      ...shadows.medium,
    } as ViewStyle,

    submitButtonText: {
      color: colors.contrast.white,
      fontSize: fontSize.fs500,
      fontWeight: fontWeight.bold,
    } as TextStyle,
  });
};