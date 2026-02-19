import Header from '@/components/base/Header';
import EmptyState from '@/components/menu/EmptyState';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/store/hooks';
import api from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type OrderStatus = 'PAID' | 'ACCEPTED' | 'COMPLETED';

interface OrderItem {
  name: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  order_id: string;
  status: OrderStatus;
  total_amount: string;
  delivery_address: string;
  createdAt: string;
  updatedAt: string;
  cart_snapshot: OrderItem[];
}

const POLL_INTERVAL = 8000;

export default function KitchenScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const restaurant = useAppSelector((state) => state.restaurant.restaurant);

  const [orders, setOrders] = useState<Record<OrderStatus, Order[]>>({
    PAID: [],
    ACCEPTED: [],
    COMPLETED: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrderStatus>('PAID');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const styles = createStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    accent,
  });

  const STATUS_CONFIG: Record<OrderStatus, {
    label: string;
    color: string;
    bg: string;
    next?: OrderStatus;
    nextLabel?: string;
    nextIcon?: keyof typeof Ionicons.glyphMap;
  }> = {
    PAID: {
      label: 'New Orders',
      color: '#f59e0b',
      bg: theme.colors.background.secondary,
      next: 'ACCEPTED',
      nextLabel: 'Accept',
      nextIcon: 'checkmark-circle-outline',
    },
    ACCEPTED: {
      label: 'In Progress',
      color: accent,
      bg: theme.colors.background.secondary,
      next: 'COMPLETED',
      nextLabel: 'Complete',
      nextIcon: 'flag-outline',
    },
    COMPLETED: {
      label: 'Completed',
      color: '#27ae60',
      bg: theme.colors.background.secondary,
    },
  };

  const fetchOrders = useCallback(
    async (silent = false) => {
      if (!restaurant?.token) return;
      if (!silent) setIsLoading(true);

      try {
        const [paidRes, acceptedRes, completedRes] = await Promise.all([
          api.getOrdersByStatus('PAID', restaurant.token),
          api.getOrdersByStatus('ACCEPTED', restaurant.token),
          api.getOrdersByStatus('COMPLETED', restaurant.token),
        ]);

        setOrders({
          PAID: paidRes.data?.data ?? [],
          ACCEPTED: acceptedRes.data?.data ?? [],
          COMPLETED: completedRes.data?.data ?? [],
        });
      } catch {
        // silent fail on background polls
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [restaurant?.token],
  );

  useEffect(() => {
    fetchOrders();
    pollRef.current = setInterval(() => fetchOrders(true), POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchOrders]);

  const handleUpdateStatus = async (order: Order, newStatus: OrderStatus) => {
    if (!restaurant?.token) return;
    setUpdatingId(order.order_id);
    try {
      const res = await api.updateOrderStatus(order.order_id, newStatus, restaurant.token);
      if (res.success) {
        await fetchOrders(true);
      } else {
        Alert.alert('Error', res.error ?? 'Could not update order status.');
      }
    } catch {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancel = (order: Order) => {
    Alert.alert(
      'Cancel Order',
      `Cancel order #${order.order_id.slice(-6).toUpperCase()}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            if (!restaurant?.token) return;
            setUpdatingId(order.order_id);
            try {
              const res = await api.cancelOrder(order.order_id, restaurant.token);
              if (res.success) {
                await fetchOrders(true);
              } else {
                Alert.alert('Error', res.error ?? 'Could not cancel order.');
              }
            } catch {
              Alert.alert('Error', 'Network error. Please try again.');
            } finally {
              setUpdatingId(null);
            }
          },
        },
      ],
    );
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatShortId = (id: string) => `#${id.slice(-6).toUpperCase()}`;

  const renderOrderCard = ({ item: order }: { item: Order }) => {
    const config = STATUS_CONFIG[order.status];
    const isUpdating = updatingId === order.order_id;

    return (
      <View style={styles.card}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.orderId}>{formatShortId(order.order_id)}</Text>
            <Text style={styles.orderTime}>{formatTime(order.createdAt)}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
            <Text style={[styles.statusBadgeText, { color: config.color }]}>
              {order.status}
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.itemsContainer}>
          {order.cart_snapshot.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <Text style={[styles.itemQty, { color: accent }]}>{item.quantity}×</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.unitPrice * item.quantity}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={{ flex: 1 }}>
            <Text style={styles.totalText}>
              ₹{Number(order.total_amount).toFixed(0)}
            </Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {order.delivery_address}
            </Text>
          </View>

          <View style={styles.cardActions}>
            {(order.status === 'PAID' || order.status === 'ACCEPTED') && (
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancel(order)}
                disabled={isUpdating}
              >
                <Ionicons name="close" size={16} color={accent} />
              </TouchableOpacity>
            )}

            {config.next && (
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  { backgroundColor: config.color },
                  isUpdating && styles.actionBtnDisabled,
                ]}
                onPress={() => handleUpdateStatus(order, config.next!)}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <>
                    <Ionicons name={config.nextIcon!} size={14} color="#fff" />
                    <Text style={styles.actionBtnText}>{config.nextLabel}</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (isLoading && orders.PAID.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title="Kitchen"
          subtitle="Order Management"
          showThemeToggle={true}
          showSearch={false}
          showCart={false}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={accent} />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const newOrderCount = orders.PAID.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title="Kitchen"
        subtitle={newOrderCount > 0 ? `${newOrderCount} new order${newOrderCount > 1 ? 's' : ''}` : 'Order Management'}
        showThemeToggle={true}
        showSearch={false}
        showCart={false}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['PAID', 'ACCEPTED', 'COMPLETED'] as OrderStatus[]).map((status) => {
          const config = STATUS_CONFIG[status];
          const count = orders[status].length;
          const isActive = activeTab === status;

          return (
            <TouchableOpacity
              key={status}
              style={[styles.tab, isActive && { borderBottomColor: config.color, borderBottomWidth: 2 }]}
              onPress={() => setActiveTab(status)}
            >
              <Text style={[
                styles.tabText,
                { color: isActive ? config.color : theme.colors.foreground.secondary },
              ]}>
                {config.label}
              </Text>
              {count > 0 && (
                <View style={[styles.tabBadge, { backgroundColor: config.color }]}>
                  <Text style={styles.tabBadgeText}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Order List */}
      <FlatList
        data={orders[activeTab]}
        keyExtractor={(item) => item.order_id}
        renderItem={renderOrderCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon={
              activeTab === 'PAID' ? 'receipt-outline' :
              activeTab === 'ACCEPTED' ? 'flame-outline' :
              'checkmark-done-outline'
            }
            title={
              activeTab === 'PAID' ? 'No new orders' :
              activeTab === 'ACCEPTED' ? 'Nothing in progress' :
              'No completed orders'
            }
            subtitle={activeTab === 'PAID' ? 'New orders will appear here automatically' : ''}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchOrders();
            }}
            tintColor={accent}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function createStyles({ colors, spacing, fontSize, fontWeight, borderRadius, accent }: any) {
  return StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    loadingText: {
      fontSize: fontSize.fs300,
      color: colors.foreground.secondary,
    },
    tabs: {
      flexDirection: 'row',
      backgroundColor: colors.background.elevated,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.space100,
      paddingVertical: spacing.space300,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    tabText: {
      fontSize: fontSize.fs200,
      fontWeight: fontWeight.semibold,
    },
    tabBadge: {
      borderRadius: 10,
      paddingHorizontal: spacing.space100,
      paddingVertical: 1,
      minWidth: 18,
      alignItems: 'center',
    },
    tabBadgeText: {
      fontSize: fontSize.fs100,
      fontWeight: fontWeight.bold,
      color: '#fff',
    },
    listContent: {
      padding: spacing.space300,
      gap: spacing.space200,
      paddingBottom: spacing.space600,
    },
    card: {
      backgroundColor: colors.background.elevated,
      borderRadius: borderRadius.lg,
      padding: spacing.space300,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.space200,
    },
    orderId: {
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
      color: colors.foreground.primary,
    },
    orderTime: {
      fontSize: fontSize.fs100,
      color: colors.foreground.tertiary,
      marginTop: 2,
    },
    statusBadge: {
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.space200,
      paddingVertical: spacing.space100,
    },
    statusBadgeText: {
      fontSize: fontSize.fs100,
      fontWeight: fontWeight.bold,
    },
    itemsContainer: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.md,
      padding: spacing.space200,
      gap: spacing.space100,
      marginBottom: spacing.space200,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.space100,
    },
    itemQty: {
      fontSize: fontSize.fs200,
      fontWeight: fontWeight.bold,
      width: 24,
    },
    itemName: {
      flex: 1,
      fontSize: fontSize.fs200,
      color: colors.foreground.primary,
    },
    itemPrice: {
      fontSize: fontSize.fs200,
      color: colors.foreground.secondary,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalText: {
      fontSize: fontSize.fs400,
      fontWeight: fontWeight.bold,
      color: colors.foreground.primary,
    },
    addressText: {
      fontSize: fontSize.fs100,
      color: colors.foreground.tertiary,
      marginTop: 2,
      maxWidth: 180,
    },
    cardActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.space200,
    },
    cancelBtn: {
      width: 34,
      height: 34,
      borderRadius: borderRadius.sm,
      borderWidth: 1.5,
      borderColor: accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.space100,
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.space300,
      paddingVertical: spacing.space200,
    },
    actionBtnDisabled: { opacity: 0.6 },
    actionBtnText: {
      color: '#fff',
      fontSize: fontSize.fs200,
      fontWeight: fontWeight.bold,
    },
    autoRefreshBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.space100,
      paddingVertical: spacing.space200,
      backgroundColor: colors.background.elevated,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
    },
    autoRefreshText: {
      fontSize: fontSize.fs100,
      color: colors.foreground.tertiary,
    },
  });
}