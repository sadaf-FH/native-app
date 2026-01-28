import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image?: any;
}

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export default function MenuItemCard({
  item,
  quantity,
  onAdd,
  onRemove,
}: MenuItemCardProps) {
  const {
    colors,
    spacing,
    fontSize,
    fontWeight,
    borderRadius,
    borderWidth,
  } = useTheme();

  const accent = colors.accent.CO;
  const accentAlpha = colors.accent.COAlpha;
  const foregroundAccent = colors.foreground.accentCO;
  const isInCart = quantity > 0;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.elevated,
        padding: spacing.space400,
        borderRadius: borderRadius.br50,
        margin: spacing.space200,
        borderWidth: borderWidth.bw10,
        borderColor: isInCart ? accent : colors.border.subtle,
        minHeight: 180,
      }}
    >
      {/* Image or empty space */}
      {item.image ? (
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: 100,
            borderRadius: borderRadius.br40,
            marginBottom: spacing.space250,
          }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ marginBottom: spacing.space250 }} />
      )}

      {/* Name */}
      <Text
        style={{
          color: colors.foreground.primary,
          fontSize: fontSize.fs500,
          fontWeight: fontWeight.bold,
          marginBottom: spacing.space150,
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>

      {/* Rating */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: spacing.space250,
        }}
      >
        <Text style={{ fontSize: fontSize.fs200 }}>⭐</Text>
        <Text
          style={{
            color: colors.foreground.secondary,
            fontSize: fontSize.fs200,
            fontWeight: fontWeight.medium,
            marginLeft: spacing.space150,
          }}
        >
          {item.rating} ({item.reviews})
        </Text>
      </View>

      {/* Description */}
      <Text
        style={{
          color: colors.foreground.tertiary,
          fontSize: fontSize.fs200,
          marginBottom: spacing.space400,
          lineHeight: 18,
        }}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      {/* Price and Button */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
        }}
      >
        <Text
          style={{
            color: accent,
            fontSize: fontSize.fs700,
            fontWeight: fontWeight.bold,
          }}
        >
          ${item.price.toFixed(2)}
        </Text>

        {isInCart ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: accentAlpha,
              paddingVertical: spacing.space150,
              paddingHorizontal: spacing.space250,
              borderRadius: borderRadius.br40,
              borderWidth: borderWidth.bw10,
              borderColor: accent,
            }}
          >
            <TouchableOpacity
              onPress={() => onRemove(item.id)}
              style={{
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: accent,
                  fontSize: fontSize.fs500,
                  fontWeight: fontWeight.bold,
                }}
              >
                −
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: foregroundAccent,
                fontSize: fontSize.fs400,
                fontWeight: fontWeight.bold,
                marginHorizontal: spacing.space300,
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={() => onAdd(item.id)}
              style={{
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: accent,
                  fontSize: fontSize.fs500,
                  fontWeight: fontWeight.bold,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onAdd(item.id)}
            style={{
              backgroundColor: accent,
              paddingVertical: spacing.space200,
              paddingHorizontal: spacing.space500,
              borderRadius: borderRadius.br40,
            }}
          >
            <Text
              style={{
                color: colors.contrast.white,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.bold,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}