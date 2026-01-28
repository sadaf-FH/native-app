import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import CartItem from './CartItem';
import EmptyState from './EmptyState';

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
  const { colors, spacing, fontSize, fontWeight, borderRadius, borderWidth, shadows } = useTheme();
  const accent = colors.accent.CO;

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.state.primary.pressed,
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        <View
          style={{
            backgroundColor: colors.background.elevated,
            borderTopLeftRadius: borderRadius.br90,
            borderTopRightRadius: borderRadius.br90,
            padding: spacing.space600,
            maxHeight: '80%',
            ...shadows.large,
          }}
        >
          {/* Modal Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.space600,
              paddingBottom: spacing.space400,
              borderBottomWidth: borderWidth.bw20,
              borderBottomColor: colors.border.medium,
            }}
          >
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs900,
                fontWeight: fontWeight.bold,
              }}
            >
              Your Cart ({getTotalItems()})
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: colors.background.secondary,
                padding: spacing.space300,
                borderRadius: borderRadius.br50,
              }}
            >
              <Text
                style={{
                  color: colors.foreground.primary,
                  fontSize: fontSize.fs700,
                  fontWeight: fontWeight.bold,
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          {Object.keys(cart).length === 0 ? (
            <EmptyState
              icon="🛒"
              title="Your cart is empty"
              subtitle="Add items from the menu"
            />
          ) : (
            <>
              <ScrollView style={{ marginBottom: spacing.space600 }}>
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
              <View
                style={{
                  backgroundColor: colors.background.secondary,
                  padding: spacing.space400,
                  borderRadius: borderRadius.br50,
                  marginBottom: spacing.space400,
                  borderWidth: borderWidth.bw20,
                  borderColor: colors.border.strong,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: spacing.space150,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground.secondary,
                      fontSize: fontSize.fs200,
                    }}
                  >
                    Subtotal
                  </Text>
                  <Text
                    style={{
                      color: colors.foreground.primary,
                      fontSize: fontSize.fs200,
                    }}
                  >
                    ${Math.round(getTotalPrice())}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: spacing.space150,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground.secondary,
                      fontSize: fontSize.fs200,
                    }}
                  >
                    Tax (10%)
                  </Text>
                  <Text
                    style={{
                      color: colors.foreground.primary,
                      fontSize: fontSize.fs200,
                    }}
                  >
                    ${Math.round(getTotalPrice() * 0.1)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: spacing.space300,
                    borderTopWidth: borderWidth.bw10,
                    borderTopColor: colors.border.medium,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground.primary,
                      fontSize: fontSize.fs700,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      color: accent,
                      fontSize: fontSize.fs900,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    ${Math.round(getTotalPrice() * 1.1)}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={{ flexDirection: 'row', gap: spacing.space300 }}>
                <TouchableOpacity
                  onPress={onClearCart}
                  style={{
                    flex: 1,
                    backgroundColor: colors.background.negative,
                    paddingVertical: spacing.space400,
                    borderRadius: borderRadius.br50,
                    alignItems: 'center',
                    borderWidth: borderWidth.bw10,
                    borderColor: colors.border.negative,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground.negative,
                      fontSize: fontSize.fs400,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    Clear Cart
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onPlaceOrder}
                  style={{
                    flex: 2,
                    backgroundColor: accent,
                    paddingVertical: spacing.space400,
                    borderRadius: borderRadius.br50,
                    alignItems: 'center',
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
                    Place Order 🎉
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}