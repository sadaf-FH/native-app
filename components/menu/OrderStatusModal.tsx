import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/store/hooks';
import api from '@/services/api';

const accent = '#C0392B';
const white = '#ffffff';
const bg = '#f5f5f5';
const textColor = '#1a1a1a';
const textSecondary = '#666';
const textTertiary = '#999';
const borderColor = '#e8e8e8';
const success = '#27ae60';
const successLight = '#eafaf1';
const warningLight = '#fff8e1';
const warning = '#f59e0b';

interface OrderStatusModalProps {
  visible: boolean;
  orderId: string | null;
  onClose: () => void;
}

const STATUS_STEPS = [
  { key: 'CREATED',         label: 'Order Placed' },
  { key: 'PAYMENT_PENDING', label: 'Payment Processing' },
  { key: 'PAID',            label: 'Payment Confirmed' },
  { key: 'ACCEPTED',        label: 'Order Accepted' },
  { key: 'COMPLETED',       label: 'Order Completed' },
];

const STATUS_ORDER = ['CREATED', 'PAYMENT_PENDING', 'PAID', 'ACCEPTED', 'COMPLETED'];

function getStepIndex(status: string): number {
  return STATUS_ORDER.indexOf(status);
}

export default function OrderStatusModal({
  visible,
  orderId,
  onClose,
}: OrderStatusModalProps) {
  const restaurant = useAppSelector((state) => state.restaurant.restaurant);

  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrder = async () => {
    if (!orderId || !restaurant?.token) return;

    try {
      const res = await api.getOrder(orderId, restaurant.token);
      if (res.success && res.data) {
        setOrder(res.data);
        setError(null);

        // Stop polling when terminal state reached
        if (res.data.status === 'COMPLETED' || res.data.status === 'CANCELLED') {
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } else {
        setError('Could not fetch order status');
      }
    } catch {
      setError('Network error. Retrying...');
    }
  };

  useEffect(() => {
    if (visible && orderId) {
      fetchOrder();
      pollRef.current = setInterval(fetchOrder, 5000);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [visible, orderId]);

  const handleClose = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    setOrder(null);
    setError(null);
    onClose();
  };

  const currentStatus = order?.status ?? 'CREATED';
  const currentStepIndex = getStepIndex(currentStatus);
  const isCancelled = currentStatus === 'CANCELLED';
  const isCompleted = currentStatus === 'COMPLETED';

  const formatTime = (iso: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderTimeline = () => (
    <View style={s.infoCard}>
      <Text style={[s.itemName, { marginBottom: 12 }]}>Order Timeline</Text>

      {isCancelled ? (
        <View style={s.cancelledBanner}>
          <Text style={s.cancelledText}>❌ Order Cancelled</Text>
        </View>
      ) : (
        STATUS_STEPS.map((step, i) => {
          const done = i <= currentStepIndex;
          const isLast = i === STATUS_STEPS.length - 1;

          return (
            <View key={step.key}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                <View style={[
                  s.timelineDot,
                  { backgroundColor: done ? success : borderColor },
                ]} />
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={[
                    s.timelineLabel,
                    {
                      color: done ? textColor : textTertiary,
                      fontWeight: done ? '600' : '400',
                    },
                  ]}>
                    {step.label}
                  </Text>
                  {done && order?.updated_at && i === currentStepIndex && (
                    <Text style={s.timelineTime}>
                      {formatTime(order.updated_at)}
                    </Text>
                  )}
                </View>
              </View>
              {!isLast && (
                <View style={[
                  s.timelineLine,
                  { backgroundColor: done ? success : borderColor },
                ]} />
              )}
            </View>
          );
        })
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={20} color={textColor} />
            </TouchableOpacity>
            <Text style={s.headerTitle}>Order Status</Text>
          </View>
          {order && (
            <View style={s.badge}>
              <Text style={s.badgeText}>
                #{order.order_id.slice(-6).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>

          {/* Error State */}
          {error && (
            <View style={s.errorBanner}>
              <Text style={s.errorText}>{error}</Text>
            </View>
          )}

          {/* Loading State */}
          {!order && !error && (
            <View style={s.loadingBanner}>
              <Text style={s.loadingText}>Loading order status...</Text>
            </View>
          )}

          {order && (
            <>
              {/* Status Banner */}
              {isCancelled ? (
                <View style={[s.confirmedBanner, { backgroundColor: '#fdecea' }]}>
                  <View style={[s.checkCircle, { backgroundColor: accent }]}>
                    <Text style={{ color: white, fontSize: 18, fontWeight: '700' }}>✕</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.confirmedTitle, { color: accent }]}>Order Cancelled</Text>
                    <Text style={s.confirmedSub}>This order has been cancelled.</Text>
                  </View>
                </View>
              ) : isCompleted ? (
                <View style={s.confirmedBanner}>
                  <View style={s.checkCircle}>
                    <Text style={{ color: white, fontSize: 18, fontWeight: '700' }}>✓</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.confirmedTitle}>Order Completed!</Text>
                    <Text style={s.confirmedSub}>Thank you for your order.</Text>
                  </View>
                </View>
              ) : (
                <View style={[s.confirmedBanner, { backgroundColor: warningLight }]}>
                  <View style={[s.checkCircle, { backgroundColor: warning }]}>
                    <Text style={{ color: white, fontSize: 18, fontWeight: '700' }}>↻</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.confirmedTitle, { color: warning }]}>
                      {currentStatus === 'PAID' ? 'Payment Confirmed' :
                       currentStatus === 'ACCEPTED' ? 'Order Accepted' :
                       'Processing...'}
                    </Text>
                    <Text style={s.confirmedSub}>
                      Updates every 5 seconds
                    </Text>
                  </View>
                </View>
              )}

              {/* Order Info */}
              <View style={s.infoCard}>
                <Text style={s.itemName}>
                  Order #{order.order_id.slice(-6).toUpperCase()}
                </Text>
                <Text style={s.itemSub}>
                  {new Date(order.created_at).toLocaleString()}
                </Text>
                <Text style={s.itemSub}>
                  📍 {order.delivery_address}
                </Text>
                <Text style={[s.itemSub, { marginTop: 6, fontWeight: '600', color: textColor }]}>
                  Total: ₹{Number(order.total_amount).toFixed(2)}
                </Text>
              </View>

              {/* Timeline */}
              <View style={{ marginTop: 12 }}>
                {renderTimeline()}
              </View>

              {/* Cart Snapshot */}
              <View style={[s.infoCard, { marginTop: 12 }]}>
                <Text style={[s.itemName, { marginBottom: 8 }]}>Items Ordered</Text>
                {(order.cart_snapshot as any[]).map((item: any, i: number) => (
                  <View key={i} style={s.snapshotRow}>
                    <Text style={s.snapshotName}>
                      {item.name} × {item.quantity}
                    </Text>
                    <Text style={s.snapshotPrice}>
                      ₹{item.unitPrice * item.quantity}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>

        <View style={s.footer}>
          <TouchableOpacity style={s.closeBtn} onPress={handleClose}>
            <Text style={s.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  scrollContent: { padding: 16, paddingBottom: 32, gap: 0 },
  confirmedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: successLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedTitle: { fontSize: 15, fontWeight: '700', color: success },
  confirmedSub: { fontSize: 12, color: textSecondary, marginTop: 2 },
  infoCard: { backgroundColor: bg, borderRadius: 12, padding: 12 },
  itemName: { fontSize: 14, fontWeight: '500', color: textColor },
  itemSub: { fontSize: 12, color: textTertiary, marginTop: 2 },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 3,
    flexShrink: 0,
  },
  timelineLine: {
    width: 2,
    height: 24,
    marginLeft: 5,
    marginTop: 2,
    marginBottom: 2,
  },
  timelineLabel: { fontSize: 13 },
  timelineTime: { fontSize: 11, color: textTertiary },
  snapshotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  snapshotName: { fontSize: 13, color: textColor },
  snapshotPrice: { fontSize: 13, color: textSecondary },
  cancelledBanner: {
    backgroundColor: '#fdecea',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  cancelledText: { color: accent, fontWeight: '700', fontSize: 14 },
  errorBanner: {
    backgroundColor: '#fdecea',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  errorText: { color: accent, fontSize: 13, textAlign: 'center' },
  loadingBanner: {
    backgroundColor: bg,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: { color: textSecondary, fontSize: 13 },
  footer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    backgroundColor: white,
  },
  closeBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: accent,
    backgroundColor: white,
  },
  closeBtnText: { color: accent, fontSize: 15, fontWeight: '700' },
});