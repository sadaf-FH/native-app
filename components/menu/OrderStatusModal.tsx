import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const accent = '#C0392B';
const white = '#ffffff';
const bg = '#f5f5f5';
const textColor = '#1a1a1a';
const textSecondary = '#666';
const textTertiary = '#999';
const borderColor = '#e8e8e8';
const success = '#27ae60';
const successLight = '#eafaf1';

interface OrderStatusModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function OrderStatusModal({ visible, onClose }: OrderStatusModalProps) {
  const steps = [
    { label: 'Order Placed', time: '01:03 PM', done: true },
    { label: 'Payment Confirmed', time: '01:03 PM', done: true },
    { label: 'Order Accepted', time: '01:03 PM', done: false },
    { label: 'Preparing Order', time: '', done: false },
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerTitle}>Order Status</Text>
          </View>
          <View style={s.badge}>
            <Text style={s.badgeText}>#2024</Text>
          </View>
        </View>

        <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent}>
          {/* Confirmed Banner */}
          <View style={s.confirmedBanner}>
            <View style={s.checkCircle}>
              <Text style={{ color: white, fontSize: 18, fontWeight: '700' }}>✓</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.confirmedTitle}>Order Confirmed!</Text>
              <Text style={s.confirmedSub}>
                Payment successful. Your order has been placed.
              </Text>
            </View>
          </View>

          {/* Order Info */}
          <View style={s.infoCard}>
            <Text style={s.itemName}>Order ID: #2024</Text>
            <Text style={s.itemSub}>01:03 PM | Today</Text>
            <Text style={s.itemSub}>Delivery: 123 Main Street</Text>
          </View>

          {/* Timeline */}
          <View style={[s.infoCard, { marginTop: 12 }]}>
            <Text style={[s.itemName, { marginBottom: 12 }]}>Order ID: #2024</Text>
            {steps.map((step, i) => (
              <View key={i}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                  <View style={[
                    s.timelineDot,
                    { backgroundColor: step.done ? success : borderColor },
                  ]} />
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[
                      s.timelineLabel,
                      {
                        color: step.done ? textColor : textTertiary,
                        fontWeight: step.done ? '600' : '400',
                      },
                    ]}>
                      {step.label}
                    </Text>
                    {step.time ? (
                      <Text style={s.timelineTime}>{step.time}</Text>
                    ) : null}
                  </View>
                </View>
                {i < steps.length - 1 && (
                  <View style={[
                    s.timelineLine,
                    { backgroundColor: step.done ? success : borderColor },
                  ]} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={s.footer}>
          <TouchableOpacity style={s.cancelBtn} onPress={onClose}>
            <Text style={s.cancelBtnText}>Close</Text>
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
  scrollContent: { padding: 16, paddingBottom: 32 },
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
  footer: {
    padding: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    backgroundColor: white,
  },
  cancelBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: accent,
    backgroundColor: white,
  },
  cancelBtnText: { color: accent, fontSize: 15, fontWeight: '700' },
});