import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Text, TouchableOpacity, View } from 'react-native';
import { createCardStyles } from './styles/Card.styles';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image?: any;
  isAvailable?: boolean;
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
  const isAvailable = item.isAvailable !== false;
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const isInCart = quantity > 0;

  const styles = createCardStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    accent,
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const previousQuantity = useRef(quantity);

  useEffect(() => {
    if (quantity !== previousQuantity.current && quantity > 0) {
      const isIncreasing = quantity > previousQuantity.current;

      slideAnim.setValue(isIncreasing ? 30 : -30);
      scaleAnim.setValue(0);
      rotateAnim.setValue(isIncreasing ? 1 : -1);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 150,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
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
    <View style={[
      styles.container,
      isAvailable
        ? isInCart ? styles.containerInCart : styles.containerNotInCart
        : styles.containerUnavailable,
    ]}>

      {/* Unavailable badge - top right corner */}
      {!isAvailable && (
        <View style={styles.unavailableBadge}>
          <Text style={styles.unavailableBadgeText}>Unavailable</Text>
        </View>
      )}

      {/* Image */}
      {item.image ? (
        <Image
          source={item.image}
          style={[styles.image, !isAvailable && styles.imageUnavailable]}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      {/* Name */}
      <Text
        style={[styles.name, !isAvailable && styles.nameUnavailable]}
        numberOfLines={1}
      >
        {item.name}
      </Text>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingEmoji}>⭐</Text>
        <Text style={styles.ratingText}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Price and Button */}
{/* Price and Button */}
<View style={styles.priceButtonContainer}>
  <Text style={[styles.price, !isAvailable && styles.priceUnavailable]}>
    ${item.price.toFixed(2)}
  </Text>

  {isAvailable && (
    <View style={[
      styles.buttonContainer,
      isInCart && styles.buttonContainer,
    ]}>
      {isInCart ? (
        <>
          <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <View style={styles.quantityContainer}>
            <Animated.Text
              style={[
                styles.quantityText,
                {
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim },
                    { rotate: rotate },
                  ],
                  opacity: opacityAnim,
                },
              ]}
            >
              {quantity}
            </Animated.Text>
          </View>

          <TouchableOpacity onPress={() => onAdd(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => onAdd(item.id)} style={styles.addButtonContent}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  )}
</View>
    </View>
  );
}