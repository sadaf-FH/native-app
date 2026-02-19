import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/store/hooks';
import api from '@/services/api';
import CartItem from './CartItem';
import EmptyState from './EmptyState';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const accent = '#C0392B';
const white = '#ffffff';
const bg = '#f5f5f5';
const textColor = '#1a1a1a';
const textSecondary = '#666';
const textTertiary = '#999';
const borderColor = '#e8e8e8';

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
  onPlaceOrder: (orderId: string) => void;
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
  const restaurant = useAppSelector((state) => state.restaurant.restaurant);

  const [screen, setScreen] = useState<'cart' | 'payment'>('cart');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.09;
  const deliveryFee = 30;
  const total = subtotal + tax + deliveryFee;

  const handleClose = () => {
    setScreen('cart');
    setIsLoading(false);
    onClose();
  };

  const handlePay = async () => {
    if (!restaurant?.token || !restaurant?.R_ID) {
      Alert.alert('Error', 'Restaurant session expired. Please restart the app.');
      return;
    }

    if (!deliveryAddress.trim()) {
      Alert.alert('Missing Info', 'Please enter a delivery address.');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1 — build items array from cart
      const items = Object.entries(cart).map(([itemId, quantity]) => {
        const item = menuData.find((i) => i.id === itemId);
        return {
          itemId,
          name: item?.name ?? 'Unknown',
          quantity,
          unitPrice: item?.price ?? 0,
        };
      });

      // Step 2 — create order
      const orderRes = await api.createOrder({
        restaurantId: restaurant.R_ID,
        items,
        deliveryAddress: deliveryAddress.trim(),
        idempotencyKey: uuidv4(),
        token: restaurant.token,
      });

      if (!orderRes.success || !orderRes.data) {
        Alert.alert('Order Failed', orderRes.error ?? 'Could not place order. Please try again.');
        setIsLoading(false);
        return;
      }

      const orderId = orderRes.data.order_id;

      // Step 3 — initiate payment
      const paymentRes = await api.initiatePayment({
        orderId,
        amount: Math.round(total),
        idempotencyKey: uuidv4(),
        token: restaurant.token,
      });

      if (!paymentRes.success) {
        Alert.alert('Payment Failed', paymentRes.error ?? 'Payment could not be processed.');
        setIsLoading(false);
        return;
      }

      // Step 4 — success, hand orderId back to Menu.tsx
      setScreen('cart');
      onPlaceOrder(orderId);
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Screen 1: Cart ──────────────────────────────────────────────────────────
  const renderCart = () => (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity style={s.headerLeft} onPress={handleClose}>
          <Ionicons name="close" size={20} color={textColor} />
          <Text style={s.headerTitle}>Create Order</Text>
        </TouchableOpacity>
        <View style={s.badge}>
          <Text style={s.badgeText}>🛒 ₹{Math.round(subtotal)}</Text>
        </View>
      </View>

      {Object.keys(cart).length === 0 ? (
        <EmptyState
          icon="basket-outline"
          title="Your cart is empty"
          subtitle="Add items from the menu"
        />
      ) : (
        <>
          <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
            <Text style={s.sectionTitle}>Cart Items</Text>

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

            <View style={s.divider} />

            {/* Delivery Address */}
            <Text style={s.sectionTitle}>Delivery Address</Text>
            <TextInput
              style={s.input}
              placeholder="Enter delivery address"
              placeholderTextColor={textTertiary}
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />

            <View style={s.divider} />

            {/* Promo */}
            <View style={s.promoRow}>
              <TextInput
                style={s.promoInput}
                placeholder="Promo Code"
                placeholderTextColor={textTertiary}
              />
              <TouchableOpacity>
                <Text style={s.accentText}>Apply</Text>
              </TouchableOpacity>
            </View>

            <View style={s.divider} />

            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Subtotal:</Text>
              <Text style={s.summaryValue}>₹{Math.round(subtotal)}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Tax (9%):</Text>
              <Text style={s.summaryValue}>₹{Math.round(tax)}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Delivery Fee:</Text>
              <Text style={s.summaryValue}>₹{deliveryFee}</Text>
            </View>
            <View style={s.totalRow}>
              <Text style={s.totalLabel}>Total:</Text>
              <Text style={s.totalValue}>₹{Math.round(total)}</Text>
            </View>
          </ScrollView>

          <View style={s.footer}>
            <TouchableOpacity style={s.secondaryBtn} onPress={onClearCart}>
              <Text style={s.secondaryBtnText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.primaryBtn, { flex: 1 }]}
              onPress={() => setScreen('payment')}
            >
              <Text style={s.primaryBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );

  // ─── Screen 2: Payment ────────────────────────────────────────────────────────
  const renderPayment = () => (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity
          style={s.headerLeft}
          onPress={() => !isLoading && setScreen('cart')}
        >
          <Ionicons name="arrow-back" size={20} color={textColor} />
          <Text style={s.headerTitle}>Make Payment</Text>
        </TouchableOpacity>
        <View style={s.badge}>
          <Text style={s.badgeText}>₹{Math.round(total)}</Text>
        </View>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
        <Text style={s.sectionTitle}>Order Summary</Text>
        <View style={s.summaryRow}>
          <Text style={s.summaryLabel}>Subtotal:</Text>
          <Text style={s.summaryValue}>₹{Math.round(subtotal)}</Text>
        </View>
        <View style={s.summaryRow}>
          <Text style={s.summaryLabel}>Tax (9%):</Text>
          <Text style={s.summaryValue}>₹{Math.round(tax)}</Text>
        </View>
        <View style={s.summaryRow}>
          <Text style={s.summaryLabel}>Delivery Fee:</Text>
          <Text style={s.summaryValue}>₹{deliveryFee}</Text>
        </View>
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total:</Text>
          <Text style={s.totalValue}>₹{Math.round(total)}</Text>
        </View>

        <View style={s.divider} />

        <Text style={s.sectionTitle}>Delivery To</Text>
        <View style={s.infoBox}>
          <Text style={s.infoBoxText}>{deliveryAddress || 'No address provided'}</Text>
        </View>

        <View style={s.divider} />

        <Text style={s.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[s.paymentOption, paymentMethod === 'card' && s.paymentOptionSelected]}
          onPress={() => setPaymentMethod('card')}
        >
          <View style={[s.radio, paymentMethod === 'card' && s.radioSelected]}>
            {paymentMethod === 'card' && <View style={s.radioDot} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.itemName}>Credit/Debit Card</Text>
            <Text style={s.itemSub}>•••• •••• •••• 5678</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.paymentOption, paymentMethod === 'cash' && s.paymentOptionSelected]}
          onPress={() => setPaymentMethod('cash')}
        >
          <View style={[s.radio, paymentMethod === 'cash' && s.radioSelected]}>
            {paymentMethod === 'cash' && <View style={s.radioDot} />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.itemName}>Cash on Delivery</Text>
            <Text style={s.itemSub}>Pay when your order arrives</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity
          style={[s.primaryBtn, { flex: 1, opacity: isLoading ? 0.7 : 1 }]}
          onPress={handlePay}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={white} />
          ) : (
            <Text style={s.primaryBtnText}>Pay ₹{Math.round(total)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      {screen === 'cart' && renderCart()}
      {screen === 'payment' && renderPayment()}
    </Modal>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    backgroundColor: white,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 16, fontWeight: '600', color: textColor },
  badge: {
    backgroundColor: accent,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: { color: white, fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 4,
  },
  divider: { height: 1, backgroundColor: borderColor, marginVertical: 12 },
  input: {
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    padding: 10,
    fontSize: 13,
    color: textColor,
    marginBottom: 8,
    backgroundColor: white,
  },
  infoBox: {
    backgroundColor: bg,
    borderRadius: 10,
    padding: 12,
    marginBottom: 4,
  },
  infoBoxText: { fontSize: 13, color: textColor },
  promoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: bg,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  promoInput: { flex: 1, fontSize: 14, color: textColor },
  accentText: { color: accent, fontWeight: '700', fontSize: 14 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: { fontSize: 13, color: textSecondary },
  summaryValue: { fontSize: 13, color: textSecondary },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: borderColor,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: textColor },
  totalValue: { fontSize: 15, fontWeight: '700', color: textColor },
  footer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    backgroundColor: white,
    flexDirection: 'row',
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: white, fontSize: 15, fontWeight: '700' },
  secondaryBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: borderColor,
  },
  secondaryBtnText: { color: textSecondary, fontSize: 15, fontWeight: '600' },
  itemName: { fontSize: 14, fontWeight: '500', color: textColor },
  itemSub: { fontSize: 12, color: textTertiary, marginTop: 2 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: borderColor,
    marginBottom: 8,
  },
  paymentOptionSelected: { borderColor: accent, backgroundColor: '#fdecea' },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: accent },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: accent },
});