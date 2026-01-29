import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createResultsCountStyles } from './styles/ResultsCount.styles';

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
  const theme = useTheme();

  const styles = createResultsCountStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    borderWidth: theme.borderWidth,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>
        {count} {count === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}