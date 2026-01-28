import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useToast } from 'expo-toast';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/base/Header';
import MenuItemCard from '@/components/base/Card';
import SearchFilterBar from '@/components/menu/SearchFilterBar';
import CategoryFilter from '@/components/menu/CategoryFilter';
import ResultsCount from '@/components/menu/ResultsCount';
import CartSummaryFooter from '@/components/menu/CartSummaryFooter';
import CartModal from '@/components/menu/CartModal';
import EmptyState from '@/components/menu/EmptyState';

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
    price: 9,
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
    price: 13,
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
    price: 10,
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
    price: 25,
    category: 'main',
    isPopular: true,
    rating: 4.9,
    reviews: 315,
    image: require('@/assets/images/griller-salmon.jpg')
  },
  {
    id: '5',
    name: 'Spicy Chicken Curry',
    description: 'Tender chicken in aromatic curry sauce with basmati rice',
    price: 19,
    category: 'main',
    isSpicy: true,
    rating: 4.6,
    reviews: 187,
    image: require('@/assets/images/chicken-curry.jpg')
  },
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 17,
    category: 'main',
    isVegetarian: true,
    isPopular: true,
    rating: 4.7,
    reviews: 421,
    image: require('@/assets/images/pizza.jpg')
  },
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 8,
    category: 'dessert',
    isPopular: true,
    rating: 4.8,
    reviews: 267,
    image: require('@/assets/images/tiramisu.jpg')
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 9,
    category: 'dessert',
    rating: 4.7,
    reviews: 198,
    image: require('@/assets/images/choco.jpg')
  },
  {
    id: '12',
    name: 'Espresso',
    description: 'Rich Italian espresso',
    price: 4,
    category: 'beverage',
    rating: 4.4,
    reviews: 523,
    image: require('@/assets/images/espresso.jpg')
  },
  {
    id: '13',
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with mint',
    price: 5,
    category: 'beverage',
    isNew: true,
    rating: 4.6,
    reviews: 78,
    image: require('@/assets/images/lemonade.jpg')
  }
];

type CategoryType = 'all' | 'appetizer' | 'main' | 'dessert' | 'beverage';
type SortType = 'default' | 'price-low' | 'price-high' | 'rating';

export default function MenuScreen() {
  const { colors, spacing } = useTheme();
  const toast = useToast();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [showCart, setShowCart] = useState(false);

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
    let filtered =
      selectedCategory === 'all'
        ? MENU_DATA
        : MENU_DATA.filter((item) => item.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
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
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.show('Added to cart! 🛒', { duration: 2000 });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
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
    toast.show('Cart cleared', { duration: 2000 });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = MENU_DATA.find((i) => i.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const handlePlaceOrder = () => {
    setShowCart(false);
    toast.show('Order placed successfully! 🎉', { duration: 2000 });
    setTimeout(() => setCart({}), 500);
  };

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

  const renderHeader = () => (
    <>
      {showFilters && (
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
        />
      )}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ResultsCount count={filteredMenu.length} />
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
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

      <FlatList
        data={filteredMenu}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No items found"
            subtitle="Try adjusting your search or filters"
          />
        }
        contentContainerStyle={{ padding: spacing.space400 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />

      <CartSummaryFooter
        totalItems={getTotalItems()}
        totalPrice={getTotalPrice()}
        onViewCart={() => setShowCart(true)}
      />

      <CartModal
        visible={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onClearCart={clearCart}
        onPlaceOrder={handlePlaceOrder}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        menuData={MENU_DATA}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});