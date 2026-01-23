/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const parsePx = (value: string): number => {
  return parseInt(value.replace('px', ''), 10);
}

// CO Colors
const COPrimary100 = '#FFD8D0';
const COPrimary200 = '#FBB1A3';
const COPrimary300 = '#F38A77';
const COPrimary400 = '#E7604E';
const COPrimary500 = '#D82927';
const COPrimary600 = '#B12722';
const COPrimary700 = '#8C241D';
const COPrimary800 = '#681F18';
const COPrimary900 = '#471913';
const COPrimary1000 = '#27110B';
const COPrimaryA50 = '#27110B0D';
const COPrimaryA100 = '#27110B1A';
const COPrimaryA150 = '#27110B33';
const COPrimaryA200 = '#27110B66';

// CM Colors 
const CMPrimary100 = '#DFEFE2';
const CMPrimary200 = '#BFDFC6';
const CMPrimary300 = '#9FCFAA';
const CMPrimary400 = '#7EBE8F';
const CMPrimary500 = '#5BAE75';
const CMPrimary600 = '#4D8F61';
const CMPrimary700 = '#3E714D';
const CMPrimary800 = '#30543B';
const CMPrimary900 = '#233929';
const CMPrimary1000 = '#161F18';
const CMPrimaryA50 = '#5BAE750D';
const CMPrimaryA100 = '#5BAE751A';
const CMPrimaryA150 = '#5BAE7533';
const CMPrimaryA200 = '#5BAE7566';

// Action Light
const green500ce = 'rgba(34, 197, 94, 0.12)';
const greenA200ce = 'rgba(134, 239, 172, 0.18)';
const red500ce = 'rgba(239, 68, 68, 0.12)';
const redA200ce = 'rgba(254, 202, 202, 0.18)';
const blue500ce = 'rgba(59, 130, 246, 0.12)';


// Action Dark
const green500 = '#22C55E';
const greenA200 = '#86EFAC';
const red500 = '#EF4444';
const redA200 = '#FCA5A5';
const blue500 = '#3B82F6';


// Background light
const white1000 = '#FFFFFF';
const whiteA500 = 'rgba(255, 255, 255, 0.5)';
const slate300 = '#CBD5E1';
const slate200 = '#E2E8F0';
const slate100 = '#F1F5F9';


// Background Dark 
const neutral1000 = '#0F172A';
const slate800 = '#1E293B';
const slate700 = '#334155';
const neutral800 = '#1F2937';
const slate900 = '#0F172A';
const neutral900 = '#111827';

// Border Light 
const slate1000 = '#020617';
const neutral400 = '#9CA3AF';
const neutral300 = '#D1D5DB';
const neutral200 = '#E5E7EB';
const neutral100 = '#F3F4F6';
const neutralA50 = 'rgba(17, 24, 39, 0.05)';


// Border Dark 
const neutral500 = '#6B7280';
const neutral600 = '#4B5563';
const neutral700 = '#374151';
const whiteA100 = 'rgba(255, 255, 255, 0.12)';

// Foreground
const colorContrastWhite = '#FFFFFF';

// State Light 
const neutralA100 = 'rgba(17, 24, 39, 0.08)';
const neutralA150 = 'rgba(17, 24, 39, 0.12)';

export const Colors = {
  light: {
    accent: {
      CO: COPrimary500,
      COAlpha: COPrimaryA100, 
      CM: CMPrimary500,
      CMAlpha: CMPrimaryA100, 
    },

    action: {
      positive: green500ce,
      positiveAlpha: greenA200ce,
      negative: red500ce,
      negativeAlpha: redA200ce,
      link: blue500ce,
    },

    background: {
      primary: white1000,
      secondary: slate300,
      tertiary: slate200,
      light: slate100,
      lighter: slate100,
      elevated: white1000,
      accent: white1000,
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500ce,
      positive: green500ce,
      link: blue500ce,
    },

    border: {
      strong: slate1000,
      medium: neutral400,
      subtle: neutral300,
      light: neutral200,
      lighter: neutral100,
      alpha: neutralA50, 
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500ce,
      positive: green500ce,
      link: blue500ce,
    },

    contrast: {
      white: white1000,
      black: neutral1000,
    },

    foreground: {
      primary: neutral1000,
      secondary: neutral800,
      tertiary: neutral600,
      light: neutral500,
      lighter: neutral400,
      invariable: colorContrastWhite,
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500ce,
      positive: green500ce,
      link: blue500ce,
    },

    state: {
      primary: {
        disabled: neutralA100,
        hover: neutralA50,
        pressed: neutralA150,
      },
      accentCO: {
        disabled: COPrimaryA50,
        hover1: COPrimary400,
        hover2: COPrimaryA50,
        pressed1: COPrimary600,
        pressed2: COPrimaryA100,
      },
      accentCM: {
        disabled: CMPrimaryA150,
        hover1: CMPrimaryA50,
        hover2: CMPrimary600,
        pressed1: CMPrimaryA100,
        pressed2: CMPrimaryA100,
      },
      contrastWhite: {
        disabled: whiteA500,
      },
    },

    COPrimary100: COPrimary100,
  },

  dark: {
    accent: {
      CO: COPrimary500,
      COAlpha: COPrimaryA100,
      CM: CMPrimary500,
      CMAlpha: CMPrimaryA100,
    },

    action: {
      positive: green500,
      positiveAlpha: greenA200,
      negative: red500,
      negativeAlpha: redA200,
      link: blue500,
    },

    background: {
      primary: neutral1000,
      secondary: slate800,
      tertiary: slate700,
      light: neutral800,
      lighter: slate900,
      elevated: neutral900,
      accent: neutral800,
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500,
      positive: green500,
      link: blue500,
    },

    border: {
      strong: white1000,
      medium: neutral500,
      subtle: neutral600,
      light: neutral700,
      lighter: neutral800,
      alpha: whiteA100,
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500,
      positive: green500,
      link: blue500,
    },

    contrast: {
      white: white1000,
      black: neutral1000,
    },

    foreground: {
      primary: white1000,
      secondary: neutral100,
      tertiary: neutral200,
      light: neutral300,
      lighter: neutral400,
      invariable: colorContrastWhite,
      accentCO: COPrimary500,
      accentCM: CMPrimary500,
      negative: red500,
      positive: green500,
      link: blue500,
    },

    state: {
      primary: {
        disabled: neutralA100,
        hover: neutralA50,
        pressed: neutralA150,
      },
      accentCO: {
        disabled: COPrimaryA150,
        hover1: COPrimary400,
        hover2: COPrimaryA50,
        pressed1: COPrimary600,
        pressed2: COPrimaryA100,
      },
      accentCM: {
        disabled: CMPrimaryA150,
        hover1: CMPrimary400,
        hover2: CMPrimaryA50,
        pressed1: CMPrimary600,
        pressed2: CMPrimaryA100,
      },
      contrastWhite: {
        disabled: whiteA500,
      },
    }
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Dimensions = {
  Dim00: '0px',
  Dim01: '2px',
  Dim02: '4px',
  Dim03: '6px',
  Dim04: '8px',
  Dim05: '10px',
  Dim06: '12px',
  Dim07: '14px',
  Dim08: '16px',
  Dim09: '18px',
  Dim10: '20px',
  Dim11: '22px',
  Dim12: '24px',
  Dim13: '26px',
  Dim14: '28px',
  Dim15: '30px',
  Dim16: '32px',
  Dim17: '36px',
  Dim18: '40px',
  Dim19: '48px',
  Dim20: '56px',
  Dim21: '64px',
  Dim22: '72px',
  Dim23: '80px',
  Dim24: '88px',
  Dim25: '96px',
  Dim26: '112px',
  Dim27: '128px',
  Dim28: '144px',
  Dim29: '160px',
  Dim30: '176px',
  Dim31: '192px',
  Dim100: '1000px'
} as const;

export const Spacing = {
  space0: parsePx(Dimensions.Dim00),
  space50: parsePx(Dimensions.Dim01),
  space100: parsePx(Dimensions.Dim02),
  space150: parsePx(Dimensions.Dim03),
  space200: parsePx(Dimensions.Dim04),
  space250: parsePx(Dimensions.Dim05),
  space300: parsePx(Dimensions.Dim06),
  space350: parsePx(Dimensions.Dim07),
  space400: parsePx(Dimensions.Dim08),
  space450: parsePx(Dimensions.Dim09),
  space500: parsePx(Dimensions.Dim10),
  space550: parsePx(Dimensions.Dim11),
  space600: parsePx(Dimensions.Dim12), 
  space800: parsePx(Dimensions.Dim18),
  space900: parsePx(Dimensions.Dim19),
  space1000: parsePx(Dimensions.Dim21), 
  space1200: parsePx(Dimensions.Dim25), 
  space1400: parsePx(Dimensions.Dim29)
} as const;

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const BorderRadius = {
  br0: parsePx(Dimensions.Dim00),
  br30: parsePx(Dimensions.Dim04), 
  br40: parsePx(Dimensions.Dim06),
  br50: parsePx(Dimensions.Dim08),
  br60: parsePx(Dimensions.Dim10), 
  br70: parsePx(Dimensions.Dim12), 
  br80: parsePx(Dimensions.Dim14), 
  br90: parsePx(Dimensions.Dim16), 
  brFull: parsePx(Dimensions.Dim100)
} as const;

export const BorderWidth = {
  bw0: parsePx(Dimensions.Dim00), 
  bw10: 1,
  bw15: 1.5,
  bw20: 2,
  bw40: 4
} as const;

export const Shadows = Platform.select({
  ios: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
  },
  android: {
    small: { elevation: 2 },
    medium: { elevation: 4 },
    large: { elevation: 8 },
  },
  default: {
    small: {},
    medium: {},
    large: {},
  },
});

export const FontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
  heavy: '800',
  black: '900'
} as const;

export const FontSize = {
  fs100: parsePx(Dimensions.Dim05), 
  fs200: parsePx(Dimensions.Dim06), 
  fs300: parsePx(Dimensions.Dim07),
  fs400: parsePx(Dimensions.Dim08), 
  fs500: parsePx(Dimensions.Dim09), 
  fs600: parsePx(Dimensions.Dim10), 
  fs700: parsePx(Dimensions.Dim12), 
  fs800: parsePx(Dimensions.Dim16), 
  fs900: parsePx(Dimensions.Dim18), 
  fs1000: parsePx(Dimensions.Dim19), 
  fs1100: parsePx(Dimensions.Dim20),
  fs1200: parsePx(Dimensions.Dim21), 
  fs1300: parsePx(Dimensions.Dim22)
} as const;

export const LineHeight = {
  lh100: parsePx(Dimensions.Dim07), 
  lh200: parsePx(Dimensions.Dim09), 
  lh300: parsePx(Dimensions.Dim10), 
  lh400: parsePx(Dimensions.Dim12), 
  lh500: parsePx(Dimensions.Dim14), 
  lh600: parsePx(Dimensions.Dim16), 
  lh700: parsePx(Dimensions.Dim18), 
  lh800: parsePx(Dimensions.Dim19), 
  lh900: parsePx(Dimensions.Dim20), 
  lh1000: parsePx(Dimensions.Dim21), 
  lh1100: parsePx(Dimensions.Dim22), 
  lh1200: parsePx(Dimensions.Dim23)
} as const;

export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
} as const;