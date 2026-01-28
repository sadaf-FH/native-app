import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
  const { colors, spacing, fontSize, borderWidth } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background.light,
        padding: spacing.space300,
        paddingHorizontal: spacing.space400,
        borderBottomWidth: borderWidth.bw10,
        borderBottomColor: colors.border.lighter,
      }}
    >
      <Text
        style={{
          color: colors.foreground.secondary,
          fontSize: fontSize.fs200,
        }}
      >
        {count} {count === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}