import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface CartItemProps {
  item: MenuItem;
  quantity: number;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, quantity, onAdd, onRemove }: CartItemProps) {
  const { colors, spacing, fontSize, fontWeight, borderRadius, borderWidth } = useTheme();
  const accent = colors.accent.CO;

  return (
    <View
      style={{
        backgroundColor: colors.background.secondary,
        padding: spacing.space400,
        borderRadius: borderRadius.br50,
        marginBottom: spacing.space300,
        borderWidth: borderWidth.bw10,
        borderColor: colors.border.subtle,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: spacing.space300,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs400,
              fontWeight: fontWeight.bold,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: accent,
              fontSize: fontSize.fs200,
              fontWeight: fontWeight.bold,
              marginTop: spacing.space150,
            }}
          >
            ${item.price} each
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background.light,
            padding: spacing.space100,
            borderRadius: borderRadius.br40,
          }}
        >
          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            style={{
              backgroundColor: colors.contrast.white,
              width: 24,
              height: 24,
              borderRadius: borderRadius.br40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: accent,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.bold,
              }}
            >
              −
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs300,
              fontWeight: fontWeight.bold,
              marginHorizontal: spacing.space300,
              minWidth: 16,
              textAlign: 'center',
            }}
          >
            {quantity}
          </Text>

          <TouchableOpacity
            onPress={() => onAdd(item.id)}
            style={{
              backgroundColor: accent,
              width: 24,
              height: 24,
              borderRadius: borderRadius.br40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.contrast.white,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.bold,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: colors.foreground.primary,
            fontSize: fontSize.fs700,
            fontWeight: fontWeight.bold,
          }}
        >
          ${item.price * quantity}
        </Text>
      </View>
    </View>
  );
}