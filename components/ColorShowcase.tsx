import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Svg, { Circle, Line, Path } from 'react-native-svg';

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
    lineHeight,
    borderRadius, 
    borderWidth,
    shadows, 
    isDark,
    toggleTheme,
    zIndex,
  } = useTheme();
  
  const accent = colors.accent.CO;
  const accentAlpha = colors.accent.COAlpha;
  const foregroundAccent = colors.foreground.accentCO;
  
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

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Notification Toast */}
      {notification && (
        <View
          style={[
            styles.notification,
            {
              position: 'absolute',
              top: 60,
              left: spacing.space400,
              right: spacing.space400,
              backgroundColor: colors.action.positive,
              padding: spacing.space400,
              borderRadius: borderRadius.br50,
              zIndex: zIndex.toast,
              ...shadows.large,
            },
          ]}
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
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background.elevated,
            borderBottomWidth: borderWidth.bw20,
            borderBottomColor: colors.border.medium,
            padding: spacing.space400,
            ...shadows.medium,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.headerTitle,
              {
                color: accent,
                fontSize: fontSize.fs800,
                fontWeight: fontWeight.bold,
              },
            ]}
          >
            La Tavola 
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs200,
              marginTop: spacing.space150,
            }}
          >
            Italian Fine Dining
          </Text>
        </View>
        <View style={styles.headerActions}>
          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={[
              styles.iconButton,
              {
                backgroundColor: accent,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                marginRight: spacing.space300,
                borderWidth: borderWidth.bw10,
                borderColor: accent,
              },
            ]}
          >
            <Text
              style={{
                color: colors.contrast.white,
                fontSize: fontSize.fs400,
                fontWeight: fontWeight.bold,
                textAlign: 'center',
              }}
            >
              {isDark ? (
                <Svg width={22} height={22} viewBox="0 0 24 24">
                  <Path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    fill="white"
                  />
                </Svg>
              ) : (
                <Svg width={22} height={22} viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="5" fill="white" />
                  <Line x1="12" y1="1" x2="12" y2="4" stroke="white" strokeWidth="2" />
                  <Line x1="12" y1="20" x2="12" y2="23" stroke="white" strokeWidth="2" />
                  <Line x1="1" y1="12" x2="4" y2="12" stroke="white" strokeWidth="2" />
                  <Line x1="20" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" />
                  <Line x1="4.5" y1="4.5" x2="6.5" y2="6.5" stroke="white" strokeWidth="2" />
                  <Line x1="17.5" y1="17.5" x2="19.5" y2="19.5" stroke="white" strokeWidth="2" />
                  <Line x1="4.5" y1="19.5" x2="6.5" y2="17.5" stroke="white" strokeWidth="2" />
                  <Line x1="17.5" y1="6.5" x2="19.5" y2="4.5" stroke="white" strokeWidth="2" />
                </Svg>
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={[
              styles.iconButton,
              {
                backgroundColor: showFilters ? accentAlpha : colors.state.primary.hover,
                padding: spacing.space300,
                borderRadius: borderRadius.br50,
                marginRight: spacing.space300,
                borderWidth: borderWidth.bw10,
                borderColor: showFilters ? accent : colors.border.subtle,
              },
            ]}
          >
            <Text style={{ fontSize: fontSize.fs700 }}>🔍</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowCart(true)}
            style={[
              styles.cartButton,
              {
                backgroundColor: getTotalItems() > 0 ? accent : colors.state.primary.hover,
                padding: spacing.space300,
                borderRadius: borderRadius.br50,
                position: 'relative',
                borderWidth: borderWidth.bw10,
                borderColor: getTotalItems() > 0 ? accent : colors.border.subtle,
              },
            ]}
          >
            <Text style={{ fontSize: fontSize.fs700 }}>🛒</Text>
            {getTotalItems() > 0 && (
              <View
                style={[
                  styles.cartBadge,
                  {
                    backgroundColor: colors.action.negative,
                    position: 'absolute',
                    top: -spacing.space150,
                    right: -spacing.space150,
                    borderRadius: borderRadius.brFull,
                    minWidth: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: borderWidth.bw20,
                    borderColor: colors.background.elevated,
                  },
                ]}
              >
                <Text
                  style={{
                    color: colors.contrast.white,
                    fontSize: fontSize.fs100,
                    fontWeight: fontWeight.bold,
                  }}
                >
                  {getTotalItems()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter Bar */}
      {showFilters && (
        <View
          style={[
            styles.filterBar,
            {
              backgroundColor: colors.background.secondary,
              padding: spacing.space400,
              borderBottomWidth: borderWidth.bw10,
              borderBottomColor: colors.border.light,
            },
          ]}
        >
          {/* Search Input */}
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.background.elevated,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: searchQuery ? accent : colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: spacing.space400,
                marginBottom: spacing.space400,
              },
            ]}
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
                  style={[
                    styles.sortOption,
                    {
                      backgroundColor: isSelected ? accent : colors.background.elevated,
                      paddingVertical: spacing.space300,
                      paddingHorizontal: spacing.space400,
                      borderRadius: borderRadius.br50,
                      marginRight: spacing.space300,
                      borderWidth: borderWidth.bw10,
                      borderColor: isSelected ? accent : colors.border.subtle,
                    },
                  ]}
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
        style={[
          styles.categoryScroll,
          {
            backgroundColor: colors.background.tertiary,
            borderBottomWidth: borderWidth.bw10,
            borderBottomColor: colors.border.lighter,
            maxHeight: 50,
          },
        ]}
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
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isSelected ? accent : colors.background.elevated,
                  paddingVertical: spacing.space100,
                  paddingHorizontal: spacing.space500,
                  borderRadius: borderRadius.br70,
                  marginRight: spacing.space300,
                  borderWidth: borderWidth.bw20,
                  borderColor: isSelected ? accent : colors.border.lighter,
                  ...shadows.small,
                },
              ]}
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

      {/* Menu Items - MINIMALISTIC DESIGN */}
      <ScrollView
        style={styles.menuScroll}
        contentContainerStyle={{ padding: spacing.space400 }}
      >
        {filteredMenu.length === 0 ? (
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
        ) : (
          filteredMenu.map((item) => {
            const itemQuantity = cart[item.id] || 0;
            const isInCart = itemQuantity > 0;

            return (
              <View
                key={item.id}
                style={[
                  styles.menuItem,
                  {
                    backgroundColor: colors.background.elevated,
                    padding: spacing.space400,
                    borderRadius: borderRadius.br50,
                    marginBottom: spacing.space300,
                    borderWidth: borderWidth.bw10,
                    borderColor: isInCart ? accent : colors.border.subtle,
                  },
                ]}
              >
                {/* Top Row: Name, Rating, Badges */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.space200 }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.foreground.primary,
                        fontSize: fontSize.fs500,
                        fontWeight: fontWeight.bold,
                      }}
                    >
                      {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.space100 }}>
                      <Text style={{ fontSize: fontSize.fs100 }}>⭐</Text>
                      <Text
                        style={{
                          color: colors.foreground.secondary,
                          fontSize: fontSize.fs100,
                          fontWeight: fontWeight.medium,
                          marginLeft: spacing.space100,
                        }}
                      >
                        {item.rating}
                      </Text>
                      <Text
                        style={{
                          color: colors.foreground.lighter,
                          fontSize: fontSize.fs100,
                          marginLeft: spacing.space100,
                        }}
                      >
                        ({item.reviews})
                      </Text>
                    </View>
                  </View>
                  
                  {/* Mini Badges */}
                  <View style={{ flexDirection: 'row', gap: spacing.space150 }}>
                    {item.isPopular && <Text style={{ fontSize: fontSize.fs300 }}>🔥</Text>}
                    {item.isNew && <Text style={{ fontSize: fontSize.fs300 }}>✨</Text>}
                    {item.isVegetarian && <Text style={{ fontSize: fontSize.fs300 }}>🌱</Text>}
                    {item.isSpicy && <Text style={{ fontSize: fontSize.fs300 }}>🌶️</Text>}
                  </View>
                </View>

                {/* Description */}
                <Text
                  style={{
                    color: colors.foreground.tertiary,
                    fontSize: fontSize.fs200,
                    marginBottom: spacing.space300,
                  }}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>

                {/* Bottom Row: Price and Add Button */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: accent,
                      fontSize: fontSize.fs700,
                      fontWeight: fontWeight.bold,
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </Text>

                  {isInCart ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: accentAlpha,
                        paddingVertical: spacing.space150,
                        paddingHorizontal: spacing.space300,
                        borderRadius: borderRadius.br40,
                        borderWidth: borderWidth.bw10,
                        borderColor: accent,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: borderRadius.br40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: accent,
                            fontSize: fontSize.fs500,
                            fontWeight: fontWeight.bold,
                          }}
                        >
                          −
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={{
                          color: foregroundAccent,
                          fontSize: fontSize.fs400,
                          fontWeight: fontWeight.bold,
                          marginHorizontal: spacing.space300,
                          minWidth: 20,
                          textAlign: 'center',
                        }}
                      >
                        {itemQuantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() => addToCart(item.id)}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: borderRadius.br40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: accent,
                            fontSize: fontSize.fs500,
                            fontWeight: fontWeight.bold,
                          }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addToCart(item.id)}
                      style={{
                        backgroundColor: accent,
                        paddingVertical: spacing.space200,
                        paddingHorizontal: spacing.space500,
                        borderRadius: borderRadius.br40,
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
            );
          })
        )}
      </ScrollView>

      {/* Cart Summary Footer */}
      {getTotalItems() > 0 && (
        <View
          style={[
            styles.cartSummary,
            {
              backgroundColor: colors.background.elevated,
              padding: spacing.space400,
              borderTopWidth: borderWidth.bw20,
              borderTopColor: accent,
              ...shadows.large,
            },
          ]}
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
            style={[
              styles.checkoutButton,
              {
                backgroundColor: accent,
                paddingVertical: spacing.space400,
                paddingHorizontal: spacing.space800,
                borderRadius: borderRadius.br70,
                ...shadows.medium,
              },
            ]}
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
          style={[
            styles.modalOverlay,
            {
              flex: 1,
              backgroundColor: colors.state.primary.pressed,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setShowCart(false)}
          />
          <View
            style={[
              styles.cartModal,
              {
                backgroundColor: colors.background.elevated,
                borderTopLeftRadius: borderRadius.br90,
                borderTopRightRadius: borderRadius.br90,
                padding: spacing.space600,
                maxHeight: '80%',
                ...shadows.large,
              },
            ]}
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
  notification: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {},
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {},
  cartButton: {},
  cartBadge: {},
  filterBar: {},
  searchContainer: {},
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryScroll: {},
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuScroll: {
    flex: 1,
  },
  menuItem: {},
  badgesRow: {},
  badge: {},
  menuItemFooter: {},
  quantityControls: {},
  quantityButton: {},
  addButton: {},
  cartSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButton: {},
  modalOverlay: {},
  cartModal: {},
});