import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { createEmptyStateStyles } from './styles/EmptyState.styles';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  const theme = useTheme();
  const styles = createEmptyStateStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
  });

  return (
    <View style={styles.container}>
      <Ionicons
        name={icon as any}
        size={48}
        color={theme.colors.foreground.tertiary}
        style={{ marginBottom: theme.spacing.space300 }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}