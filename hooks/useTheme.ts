import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { 
  Colors, 
  Spacing, 
  FontSize,
  FontWeight,
  LineHeight,
  BorderRadius, 
  BorderWidth,
  Shadows, 
  ZIndex,
  Typography 
} from '@/constants/theme';

type ThemeMode = 'light' | 'dark';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState<ThemeMode | null>(null);
  
  // Use manual theme if set, otherwise use system theme
  const activeTheme: ThemeMode = manualTheme ?? (systemColorScheme ?? 'light');
  const colors = Colors[activeTheme];
  
  const toggleTheme = () => {
    setManualTheme(prev => {
      if (prev === null) {
        // First toggle: set opposite of system theme
        return systemColorScheme === 'light' ? 'dark' : 'light';
      }
      return prev === 'light' ? 'dark' : 'light';
    });
  };
  
  const resetToSystemTheme = () => {
    setManualTheme(null);
  };
  
  return {
    // Colors
    colors,
    
    // Design tokens
    spacing: Spacing,
    fontSize: FontSize,
    fontWeight: FontWeight,
    lineHeight: LineHeight,
    borderRadius: BorderRadius,
    borderWidth: BorderWidth,
    typography: Typography,
    shadows: Shadows,
    zIndex: ZIndex,
    
    // Theme info
    isDark: activeTheme === 'dark',
    currentTheme: activeTheme,
    
    // Theme controls
    toggleTheme,
    resetToSystemTheme,
    isManualTheme: manualTheme !== null,
  };
};