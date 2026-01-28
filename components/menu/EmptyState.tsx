import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  const { colors, spacing, fontSize, fontWeight } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.space1200,
      }}
    >
      <Text style={{ fontSize: 64, marginBottom: spacing.space400 }}>{icon}</Text>
      <Text
        style={{
          color: colors.foreground.primary,
          fontSize: fontSize.fs700,
          fontWeight: fontWeight.bold,
          marginBottom: spacing.space150,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colors.foreground.tertiary,
          fontSize: fontSize.fs200,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
}