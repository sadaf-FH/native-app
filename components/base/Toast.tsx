import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { createToastStyles } from './styles/Toast.styles';

export default function Toast() {
  const theme = useTheme();
  const { visible, message, type, hide } = useToast();
  const accent = theme.colors.accent.CO;

  const styles = createToastStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  });
  
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(100, { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible && translateY.value === 100) return null;

  const getTypeStyle = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✓',
          bg: accent,
          text: theme.colors.contrast.white,
        };
      case 'error':
        return {
          icon: '✕',
          bg: accent,
          text: theme.colors.contrast.white,
        };
      default:
        return {
          icon: 'ℹ',
          bg: accent,
          text: theme.colors.contrast.white,
        };
    }
  };

  const typeStyle = getTypeStyle();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        onPress={hide}
        style={[styles.pressable, { backgroundColor: typeStyle.bg }]}
      >
        <Text style={[styles.icon, { color: typeStyle.text }]}>
          {typeStyle.icon}
        </Text>
        <Text style={[styles.message, { color: typeStyle.text }]}>
          {message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}