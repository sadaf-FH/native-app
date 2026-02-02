import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMenuByRestaurant } from '@/store/slices/menuSlice';
import Header from '@/components/base/Header';
import MenuItemCard from '@/components/base/Card';
import SearchFilterBar from '@/components/menu/SearchFilterBar';
import CategoryFilter from '@/components/menu/CategoryFilter';
import ResultsCount from '@/components/menu/ResultsCount';
import CartSummaryFooter from '@/components/menu/CartSummaryFooter';
import CartModal from '@/components/menu/CartModal';
import EmptyState from '@/components/menu/EmptyState';
import { createMenuScreenStyles } from './styles/Menu.styles';

const PLACEHOLDER_IMAGES = {
  Appetizers: require('@/assets/images/bruschetta.jpeg'),
  Mains: require('@/assets/images/pizza.jpg'),
  Desserts: require('@/assets/images/tiramisu.jpg'),
  Beverages: require('@/assets/images/espresso.jpg'),
};

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
  isAvailable?: boolean;
  originalPrice?: number;
  discount?: number;
}

type CategoryType = 'all' | 'Appetizers' | 'Mains' | 'Desserts' | 'Beverages';
type SortType = 'default' | 'price-low' | 'price-high';

export default function MenuScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const toast = useToast();
  const dispatch = useAppDispatch();

  const restaurant = useAppSelector((state) => state.restaurant.restaurant);
  const { menu, isLoading } = useAppSelector((state) => state.menu);

  const styles = createMenuScreenStyles({
    colors: theme.colors,
    spacing: theme.spacing,
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (restaurant) {
      dispatch(fetchMenuByRestaurant(restaurant.R_ID));
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurant) {
      const interval = setInterval(() => {
        dispatch(fetchMenuByRestaurant(restaurant.R_ID));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [restaurant]);

  const convertToDisplayMenu = (): MenuItem[] => {
    if (!menu || !menu.Categories) return [];

    const items: MenuItem[] = [];

    menu.Categories.forEach((category) => {
      category.Items?.forEach((item) => {
        const price = item.ItemPrices?.[0];
        const basePrice = price?.base_price || price?.price || 0;
        const finalPrice = price?.final_price || basePrice;
        const discount = price?.discount || 0;

        const categoryMap: Record<string, 'appetizer' | 'main' | 'dessert' | 'beverage'> = {
          'Appetizers': 'appetizer',
          'Mains': 'main',
          'Desserts': 'dessert',
          'Beverages': 'beverage',
        };

        const itemImage = item.image_base64 
          ? { uri: item.image_base64 }
          : PLACEHOLDER_IMAGES[category.name as keyof typeof PLACEHOLDER_IMAGES] || PLACEHOLDER_IMAGES.Mains;

        items.push({
          id: item.item_id,
          name: item.name,
          description: `Delicious ${item.name}`,
          price: finalPrice,
          originalPrice: discount > 0 ? basePrice : undefined,
          discount: discount > 0 ? discount : undefined,
          category: categoryMap[category.name] || 'main',
          isAvailable: item.dataValues?.is_available_now !== false,
          isVegetarian: false,
          isSpicy: false,
          isPopular: false,
          isNew: false,
          rating: 4.5,
          reviews: Math.floor(Math.random() * 200) + 50,
          image: itemImage,
        });
      });
    });

    return items;
  };

  const displayMenu = convertToDisplayMenu();

  const categories = [
    { id: 'all' as CategoryType, label: 'All', icon: '🍽️' },
    ...(menu?.Categories?.map((cat) => ({
      id: cat.name as CategoryType,
      label: cat.name,
      icon: cat.name === 'Appetizers' ? '🥗' :
            cat.name === 'Mains' ? '🍝' :
            cat.name === 'Desserts' ? '🍰' :
            cat.name === 'Beverages' ? '🍷' : '🍽️',
    })) || []),
  ];

  const sortOptions = [
    { id: 'default' as SortType, label: 'Default', icon: '📋' },
    { id: 'price-low' as SortType, label: 'Price: Low to High', icon: '💰' },
    { id: 'price-high' as SortType, label: 'Price: High to Low', icon: '💎' },
  ];

  const getFilteredAndSortedMenu = () => {
    let filtered = displayMenu;

    if (selectedCategory !== 'all') {
      const backendCategoryMap: Record<CategoryType, string> = {
        'all': '',
        'Appetizers': 'appetizer',
        'Mains': 'main',
        'Desserts': 'dessert',
        'Beverages': 'beverage',
      };
      
      const frontendCategory = backendCategoryMap[selectedCategory];
      if (frontendCategory) {
        filtered = displayMenu.filter((item) => item.category === frontendCategory);
      }
    }

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
    toast.show('Added to cart! 🛒', 'success');
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
    toast.show('Cart cleared', 'info');
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = displayMenu.find((i) => i.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const handlePlaceOrder = () => {
    setShowCart(false);
    toast.show('Order placed successfully! 🎉', 'success');
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

  if (isLoading && !menu) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Header
          title={restaurant?.name || "La Tavola"}
          subtitle={restaurant?.location || "Loading..."}
          showThemeToggle={true}
          showSearch={false}
          showCart={false}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={accent} />
          <Text style={{ 
            color: theme.colors.foreground.secondary, 
            marginTop: theme.spacing.space400,
            fontSize: theme.fontSize.fs300 
          }}>
            Loading menu...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Header
        title={restaurant?.name || "La Tavola"}
        subtitle={restaurant?.location || "Fine Dining"}
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
            icon="📋"
            title="No menu items yet"
            subtitle="Items added in Admin will appear here"
          />
        }
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={filteredMenu.length > 0 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
      />

      {getTotalItems() > 0 && (
        <CartSummaryFooter
          totalItems={getTotalItems()}
          totalPrice={getTotalPrice()}
          onViewCart={() => setShowCart(true)}
        />
      )}

      <CartModal
        visible={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onClearCart={clearCart}
        onPlaceOrder={handlePlaceOrder}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        menuData={displayMenu}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />
    </SafeAreaView>
  );
}