import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createCartItemStyles } from './styles/CartItem.styles';

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
  const theme = useTheme();
  const accent = theme.colors.accent.CO;

  const styles = createCartItemStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    accent,
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price} each</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityControlsWrapper}>
          <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.decrementButton}>
            <Text style={styles.decrementButtonText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{quantity}</Text>

          <TouchableOpacity onPress={() => onAdd(item.id)} style={styles.incrementButton}>
            <Text style={styles.incrementButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.totalPrice}>${item.price * quantity}</Text>
      </View>
    </View>
  );
}
