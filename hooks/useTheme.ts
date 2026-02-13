import { useColorScheme } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleTheme as toggleThemeAction, setTheme } from '@/store/slices/themeSlice';
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
  const dispatch = useAppDispatch();
  
  // Get theme state from Redux instead of useState
  const isDarkFromRedux = useAppSelector((state) => state.theme.isDark);
  
  // Use Redux theme
  const activeTheme: ThemeMode = isDarkFromRedux ? 'dark' : 'light';
  const colors = Colors[activeTheme];
  
  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };
  
  const resetToSystemTheme = () => {
    const isSystemDark = systemColorScheme === 'dark';
    dispatch(setTheme(isSystemDark));
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
    isDark: isDarkFromRedux,
    currentTheme: activeTheme,
    
    // Theme controls
    toggleTheme,
    resetToSystemTheme,
    isManualTheme: true, // Always manual with Redux
  };
};