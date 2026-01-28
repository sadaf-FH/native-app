import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/base/Header';
import MenuItemCard from '@/components/base/Card';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating: number;
  reviews: number;
  image?: any;
}

const MENU_DATA: MenuItem[] = [
  {
    id: '1',
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
    price: 8.99,
    category: 'appetizer',
    isVegetarian: true,
    isPopular: true,
    rating: 4.5,
    reviews: 128,
    image: require('@/assets/images/bruschetta.jpeg'),
  },
  {
    id: '2',
    name: 'Calamari Fritti',
    description: 'Crispy fried squid served with marinara sauce and lemon',
    price: 12.99,
    category: 'appetizer',
    isNew: true,
    rating: 4.8,
    reviews: 45,
    image: require('@/assets/images/calamari.jpg'),
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
    price: 9.99,
    category: 'appetizer',
    isVegetarian: true,
    rating: 4.2,
    reviews: 203,
    image: require('@/assets/images/caesar-salad.jpg'),
  },
  {
    id: '4',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with roasted vegetables and lemon butter sauce',
    price: 24.99,
    category: 'main',
    isPopular: true,
    rating: 4.9,
    reviews: 315,
  },
  {
    id: '5',
    name: 'Spicy Chicken Curry',
    description: 'Tender chicken in aromatic curry sauce with basmati rice',
    price: 18.99,
    category: 'main',
    isSpicy: true,
    rating: 4.6,
    reviews: 187,
  },
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 16.99,
    category: 'main',
    isVegetarian: true,
    isPopular: true,
    rating: 4.7,
    reviews: 421,
  },
  {
    id: '7',
    name: 'Beef Tenderloin',
    description: 'Prime cut beef with truffle mashed potatoes and asparagus',
    price: 32.99,
    category: 'main',
    isNew: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '8',
    name: 'Vegetable Stir Fry',
    description: 'Seasonal vegetables wok-tossed in garlic sauce with jasmine rice',
    price: 15.99,
    category: 'main',
    isVegetarian: true,
    isSpicy: true,
    rating: 4.3,
    reviews: 156,
  },
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 7.99,
    category: 'dessert',
    isPopular: true,
    rating: 4.8,
    reviews: 267,
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 8.99,
    category: 'dessert',
    rating: 4.7,
    reviews: 198,
  },
  {
    id: '11',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 7.99,
    category: 'dessert',
    rating: 4.5,
    reviews: 145,
  },
  {
    id: '12',
    name: 'Espresso',
    description: 'Rich Italian espresso',
    price: 3.99,
    category: 'beverage',
    rating: 4.4,
    reviews: 523,
  },
  {
    id: '13',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with mint',
    price: 4.99,
    category: 'beverage',
    isNew: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: '14',
    name: 'House Wine',
    description: 'Red or white wine by the glass',
    price: 8.99,
    category: 'beverage',
    rating: 4.3,
    reviews: 234,
  },
];

type CategoryType = 'all' | 'appetizer' | 'main' | 'dessert' | 'beverage';
type SortType = 'default' | 'price-low' | 'price-high' | 'rating';

export default function MenuScreen() {
  const {
    colors,
    spacing,
    fontSize,
    fontWeight,
    borderRadius,
    borderWidth,
    shadows,
    zIndex,
  } = useTheme();

  const accent = colors.accent.CO;
  const accentAlpha = colors.accent.COAlpha;

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'appetizer', label: 'Appetizers', icon: '🥗' },
    { id: 'main', label: 'Mains', icon: '🍝' },
    { id: 'dessert', label: 'Desserts', icon: '🍰' },
    { id: 'beverage', label: 'Beverages', icon: '🍷' },
  ];

  const sortOptions = [
    { id: 'default', label: 'Default', icon: '📋' },
    { id: 'price-low', label: 'Price: Low to High', icon: '💰' },
    { id: 'price-high', label: 'Price: High to Low', icon: '💎' },
    { id: 'rating', label: 'Top Rated', icon: '⭐' },
  ];

  const getFilteredAndSortedMenu = () => {
    let filtered = selectedCategory === 'all'
      ? MENU_DATA
      : MENU_DATA.filter(item => item.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const filteredMenu = getFilteredAndSortedMenu();

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    showNotification('Added to cart! 🛒');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
    setShowCart(false);
    showNotification('Cart cleared');
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = MENU_DATA.find(i => i.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  // Render each menu item card
  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const itemQuantity = cart[item.id] || 0;
    return (
      <MenuItemCard
        item={item}
        quantity={itemQuantity}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
    );
  };

  // Empty state component
  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.space1200,
      }}
    >
      <Text style={{ fontSize: 64, marginBottom: spacing.space400 }}>🔍</Text>
      <Text
        style={{
          color: colors.foreground.primary,
          fontSize: fontSize.fs700,
          fontWeight: fontWeight.bold,
          marginBottom: spacing.space150,
        }}
      >
        No items found
      </Text>
      <Text
        style={{
          color: colors.foreground.tertiary,
          fontSize: fontSize.fs200,
          textAlign: 'center',
        }}
      >
        Try adjusting your search or filters
      </Text>
    </View>
  );

  // Header component for FlatList
  const renderHeader = () => (
    <>
      {/* Search and Filter Bar */}
      {showFilters && (
        <View
          style={{
            backgroundColor: colors.background.secondary,
            padding: spacing.space400,
            borderBottomWidth: borderWidth.bw10,
            borderBottomColor: colors.border.light,
          }}
        >
          {/* Search Input */}
          <View
            style={{
              backgroundColor: colors.background.elevated,
              borderRadius: borderRadius.br50,
              borderWidth: borderWidth.bw10,
              borderColor: searchQuery ? accent : colors.border.subtle,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: spacing.space400,
              marginBottom: spacing.space400,
            }}
          >
            <Text style={{ fontSize: fontSize.fs400, marginRight: spacing.space300 }}>🔎</Text>
            <TextInput
              style={{
                flex: 1,
                color: colors.foreground.primary,
                fontSize: fontSize.fs400,
                paddingVertical: spacing.space300,
              }}
              placeholder="Search menu..."
              placeholderTextColor={colors.foreground.lighter}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text
                  style={{
                    color: colors.foreground.tertiary,
                    fontSize: fontSize.fs700,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sort Options */}
          <Text
            style={{
              color: colors.foreground.secondary,
              fontSize: fontSize.fs200,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space300,
            }}
          >
            Sort By
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sortOptions.map((option) => {
              const isSelected = sortBy === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setSortBy(option.id as SortType)}
                  style={{
                    backgroundColor: isSelected ? accent : colors.background.elevated,
                    paddingVertical: spacing.space300,
                    paddingHorizontal: spacing.space400,
                    borderRadius: borderRadius.br50,
                    marginRight: spacing.space300,
                    borderWidth: borderWidth.bw10,
                    borderColor: isSelected ? accent : colors.border.subtle,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: fontSize.fs200, marginRight: spacing.space150 }}>
                    {option.icon}
                  </Text>
                  <Text
                    style={{
                      color: isSelected ? colors.contrast.white : colors.foreground.primary,
                      fontSize: fontSize.fs100,
                      fontWeight: isSelected ? fontWeight.bold : fontWeight.regular,
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: colors.background.tertiary,
          borderBottomWidth: borderWidth.bw10,
          borderBottomColor: colors.border.lighter,
          maxHeight: 50,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: spacing.space150,
          paddingHorizontal: spacing.space400,
        }}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id as CategoryType)}
              style={{
                backgroundColor: isSelected ? accent : colors.background.elevated,
                paddingVertical: spacing.space100,
                paddingHorizontal: spacing.space500,
                borderRadius: borderRadius.br70,
                marginRight: spacing.space300,
                borderWidth: borderWidth.bw20,
                borderColor: isSelected ? accent : colors.border.lighter,
                flexDirection: 'row',
                alignItems: 'center',
                ...shadows.small,
              }}
            >
              <Text style={{ fontSize: fontSize.fs200, marginRight: spacing.space100 }}>
                {category.icon}
              </Text>
              <Text
                style={{
                  color: isSelected ? colors.contrast.white : colors.foreground.primary,
                  fontSize: fontSize.fs200,
                  fontWeight: isSelected ? fontWeight.bold : fontWeight.medium,
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results Count */}
      <View
        style={{
          backgroundColor: colors.background.light,
          padding: spacing.space300,
          paddingHorizontal: spacing.space400,
          borderBottomWidth: borderWidth.bw10,
          borderBottomColor: colors.border.lighter,
        }}
      >
        <Text
          style={{
            color: colors.foreground.secondary,
            fontSize: fontSize.fs200,
          }}
        >
          {filteredMenu.length} {filteredMenu.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Notification Toast */}
      {notification && (
        <View
          style={{
            position: 'absolute',
            top: 60,
            left: spacing.space400,
            right: spacing.space400,
            backgroundColor: colors.action.positive,
            padding: spacing.space400,
            borderRadius: borderRadius.br50,
            zIndex: zIndex.toast,
            ...shadows.large,
          }}
        >
          <Text
            style={{
              color: colors.contrast.white,
              fontSize: fontSize.fs400,
              fontWeight: fontWeight.bold,
              textAlign: 'center',
            }}
          >
            {notification}
          </Text>
        </View>
      )}

      {/* Header */}
      <Header
        title="La Tavola"
        subtitle="Italian Fine Dining"
        showThemeToggle={true}
        showSearch={true}
        showCart={true}
        onSearchPress={() => setShowFilters(!showFilters)}
        onCartPress={() => setShowCart(true)}
        cartItemCount={getTotalItems()}
      />

      {/* FlatList with Grid Layout */}
      <FlatList
        data={filteredMenu}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={{ padding: spacing.space400 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />

      {/* Cart Summary Footer */}
      {getTotalItems() > 0 && (
        <View
          style={{
            backgroundColor: colors.background.elevated,
            padding: spacing.space400,
            borderTopWidth: borderWidth.bw20,
            borderTopColor: accent,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadows.large,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.foreground.light,
                fontSize: fontSize.fs100,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                color: colors.foreground.secondary,
                fontSize: fontSize.fs200,
                marginTop: spacing.space150,
              }}
            >
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </Text>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs900,
                fontWeight: fontWeight.bold,
                marginTop: spacing.space150,
              }}
            >
              ${getTotalPrice().toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowCart(true)}
            style={{
              backgroundColor: accent,
              paddingVertical: spacing.space400,
              paddingHorizontal: spacing.space800,
              borderRadius: borderRadius.br70,
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
              View Cart →
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Cart Modal */}
      <Modal
        visible={showCart}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCart(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.state.primary.pressed,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowCart(false)}
          />
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
                onPress={() => setShowCart(false)}
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: spacing.space1200,
                }}
              >
                <Text style={{ fontSize: 64, marginBottom: spacing.space400 }}>🛒</Text>
                <Text
                  style={{
                    color: colors.foreground.primary,
                    fontSize: fontSize.fs700,
                    fontWeight: fontWeight.bold,
                    marginBottom: spacing.space150,
                  }}
                >
                  Your cart is empty
                </Text>
                <Text
                  style={{
                    color: colors.foreground.tertiary,
                    fontSize: fontSize.fs200,
                  }}
                >
                  Add items from the menu
                </Text>
              </View>
            ) : (
              <>
                <ScrollView style={{ marginBottom: spacing.space600 }}>
                  {Object.entries(cart).map(([itemId, quantity]) => {
                    const item = MENU_DATA.find(i => i.id === itemId);
                    if (!item) return null;

                    return (
                      <View
                        key={itemId}
                        style={{
                          backgroundColor: colors.background.secondary,
                          padding: spacing.space400,
                          borderRadius: borderRadius.br50,
                          marginBottom: spacing.space300,
                          borderWidth: borderWidth.bw10,
                          borderColor: colors.border.subtle,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: spacing.space300,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                color: colors.foreground.primary,
                                fontSize: fontSize.fs400,
                                fontWeight: fontWeight.bold,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                color: accent,
                                fontSize: fontSize.fs200,
                                fontWeight: fontWeight.bold,
                                marginTop: spacing.space150,
                              }}
                            >
                              ${item.price.toFixed(2)} each
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: colors.background.light,
                              padding: spacing.space150,
                              borderRadius: borderRadius.br40,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => removeFromCart(itemId)}
                              style={{
                                backgroundColor: colors.contrast.white,
                                width: 28,
                                height: 28,
                                borderRadius: borderRadius.br40,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  color: accent,
                                  fontSize: fontSize.fs400,
                                  fontWeight: fontWeight.bold,
                                }}
                              >
                                −
                              </Text>
                            </TouchableOpacity>

                            <Text
                              style={{
                                color: colors.foreground.primary,
                                fontSize: fontSize.fs400,
                                fontWeight: fontWeight.bold,
                                marginHorizontal: spacing.space400,
                                minWidth: 20,
                                textAlign: 'center',
                              }}
                            >
                              {quantity}
                            </Text>

                            <TouchableOpacity
                              onPress={() => addToCart(itemId)}
                              style={{
                                backgroundColor: accent,
                                width: 28,
                                height: 28,
                                borderRadius: borderRadius.br40,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  color: colors.contrast.white,
                                  fontSize: fontSize.fs400,
                                  fontWeight: fontWeight.bold,
                                }}
                              >
                                +
                              </Text>
                            </TouchableOpacity>
                          </View>

                          <Text
                            style={{
                              color: colors.foreground.primary,
                              fontSize: fontSize.fs700,
                              fontWeight: fontWeight.bold,
                            }}
                          >
                            ${(item.price * quantity).toFixed(2)}
                          </Text>
                        </View>
                      </View>
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
                      ${getTotalPrice().toFixed(2)}
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
                      ${(getTotalPrice() * 0.1).toFixed(2)}
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
                      ${(getTotalPrice() * 1.1).toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: 'row', gap: spacing.space300 }}>
                  <TouchableOpacity
                    onPress={clearCart}
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
                    onPress={() => {
                      setShowCart(false);
                      showNotification('Order placed successfully! 🎉');
                      setTimeout(() => setCart({}), 500);
                    }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});