import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

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
  const { colors, spacing, fontSize, fontWeight, borderRadius, borderWidth, shadows } = useTheme();
  const accent = colors.accent.CO;

  if (totalItems === 0) return null;

  return (
    <View
      style={{
        backgroundColor: colors.background.elevated,
        padding: spacing.space400,
        borderTopWidth: borderWidth.bw20,
        borderTopColor: accent,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadows.large,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.foreground.light,
            fontSize: fontSize.fs100,
          }}
        >
          Subtotal
        </Text>
        <Text
          style={{
            color: colors.foreground.secondary,
            fontSize: fontSize.fs200,
            marginTop: spacing.space150,
          }}
        >
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Text>
        <Text
          style={{
            color: colors.foreground.primary,
            fontSize: fontSize.fs900,
            fontWeight: fontWeight.bold,
            marginTop: spacing.space150,
          }}
        >
          ${Math.round(totalPrice)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onViewCart}
        style={{
          backgroundColor: accent,
          paddingVertical: spacing.space400,
          paddingHorizontal: spacing.space800,
          borderRadius: borderRadius.br70,
          ...shadows.medium,
        }}
      >
        <Text
          style={{
            color: colors.contrast.white,
            fontSize: fontSize.fs400,
            fontWeight: fontWeight.bold,
          }}
        >
          View Cart →
        </Text>
      </TouchableOpacity>
    </View>
  );
}