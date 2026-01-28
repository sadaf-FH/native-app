import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
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
  const isInCart = quantity > 0;

  // Multiple animations for a cool effect
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const previousQuantity = useRef(quantity);

  useEffect(() => {
    if (quantity !== previousQuantity.current && quantity > 0) {
      const isIncreasing = quantity > previousQuantity.current;
      
      // Reset all animations
      slideAnim.setValue(isIncreasing ? 30 : -30);
      scaleAnim.setValue(0);
      rotateAnim.setValue(isIncreasing ? 1 : -1);
      opacityAnim.setValue(0);
      
      // Run complex parallel and sequence animations
      Animated.parallel([
        // Slide in from top/bottom
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        // Scale up with bounce
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 6,
          useNativeDriver: true,
        }),
        // Rotate while coming in
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
        // Fade in
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      previousQuantity.current = quantity;
    }
  }, [quantity]);

  const rotate = rotateAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

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
            fontSize: fontSize.fs400,
            fontWeight: fontWeight.bold,
            flex: 0,
            marginRight: spacing.space200,
          }}
        >
          ${item.price.toFixed(2)}
        </Text>

        {/* Single Button Container */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: accent,
            paddingVertical: spacing.space100,
            paddingHorizontal: spacing.space150,
            borderRadius: borderRadius.br40,
            minWidth: 84,
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isInCart ? (
            <>
              <TouchableOpacity
                onPress={() => onRemove(item.id)}
                style={{
                  backgroundColor: colors.background.elevated,
                  width: 20,
                  height: 20,
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

              <View
                style={{
                  marginHorizontal: spacing.space200,
                  width: 20,
                  height: 20,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Animated.Text
                  style={{
                    color: colors.contrast.white,
                    fontSize: fontSize.fs300,
                    fontWeight: fontWeight.bold,
                    textAlign: 'center',
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim },
                      { rotate: rotate },
                    ],
                    opacity: opacityAnim,
                  }}
                >
                  {quantity}
                </Animated.Text>
              </View>

              <TouchableOpacity
                onPress={() => onAdd(item.id)}
                style={{
                  backgroundColor: colors.background.elevated,
                  width: 20,
                  height: 20,
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
                  +
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => onAdd(item.id)}
              style={{
                flex: 1,
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
                Add
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}