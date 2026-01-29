import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import CartItem from './CartItem';
import EmptyState from './EmptyState';
import { createCartModalStyles } from './styles/CartModal.styles';

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface CartModalProps {
  visible: boolean;
  cart: { [key: string]: number };
  onClose: () => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  menuData: MenuItem[];
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export default function CartModal({
  visible,
  cart,
  onClose,
  onClearCart,
  onPlaceOrder,
  addToCart,
  removeFromCart,
  menuData,
  getTotalPrice,
  getTotalItems,
}: CartModalProps) {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;

  const styles = createCartModalStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Cart ({getTotalItems()})</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          {Object.keys(cart).length === 0 ? (
            <EmptyState icon="🛒" title="Your cart is empty" subtitle="Add items from the menu" />
          ) : (
            <>
              <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {Object.entries(cart).map(([itemId, quantity]) => {
                  const item = menuData.find((i) => i.id === itemId);
                  if (!item) return null;

                  return (
                    <CartItem
                      key={itemId}
                      item={item}
                      quantity={quantity}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                    />
                  );
                })}
              </ScrollView>

              {/* Cart Total */}
              <View style={styles.totalContainer}>
                <View style={styles.subtotalRow}>
                  <Text style={styles.subtotalLabel}>Subtotal</Text>
                  <Text style={styles.subtotalValue}>${Math.round(getTotalPrice())}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>${Math.round(getTotalPrice() * 1.1)}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={onClearCart} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPlaceOrder} style={styles.placeOrderButton}>
                  <Text style={styles.placeOrderButtonText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}