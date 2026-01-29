import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createCartSummaryFooterStyles } from './styles/CartSummary.styles';

interface CartSummaryFooterProps {
  totalItems: number;
  totalPrice: number;
  onViewCart: () => void;
}

export default function CartSummaryFooter({
  totalItems,
  totalPrice,
  onViewCart,
}: CartSummaryFooterProps) {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;

  const styles = createCartSummaryFooterStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });

  if (totalItems === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemsText}>
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
        <Text style={styles.totalPriceText}>${totalPrice}</Text>
      </View>

      <TouchableOpacity onPress={onViewCart} style={styles.viewCartButton}>
        <Text style={styles.viewCartButtonText}>View Cart →</Text>
      </TouchableOpacity>
    </View>
  );
}