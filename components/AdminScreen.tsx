import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { createCreateMenuScreenStyles } from './styles/Admin.styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createMenu, addMenuItem, fetchMenuByRestaurant } from '@/store/slices/menuSlice';
import { useToast } from '@/hooks/useToast';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function CreateMenuScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const dispatch = useAppDispatch();
  const toast = useToast();

  const restaurant = useAppSelector((state) => state.restaurant.restaurant);
  const { menu, isLoading } = useAppSelector((state) => state.menu);

  const styles = createCreateMenuScreenStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Mains' as string,
  });

  const [tags, setTags] = useState({
    isVegetarian: false,
    isSpicy: false,
    isPopular: false,
    isNew: false,
  });

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const categories = [
    { id: 'Appetizers', label: 'Appetizers', icon: '🥗' },
    { id: 'Mains', label: 'Mains', icon: '🍝' },
    { id: 'Desserts', label: 'Desserts', icon: '🍰' },
    { id: 'Beverages', label: 'Beverages', icon: '🍷' },
  ];

  useEffect(() => {
    if (restaurant && !menu) {
      dispatch(createMenu({ restaurantId: restaurant.R_ID }));
    }
  }, [restaurant, menu]);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        toast.show('Image selected! 📷', 'success');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      toast.show('Failed to pick image', 'error');
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.show('Please fill in name and price', 'error');
      return;
    }

    if (!menu) {
      toast.show('Menu not initialized', 'error');
      return;
    }

    setIsProcessingImage(true);

    try {
      let imageBase64: string | undefined;
      
      if (imageUri) {
        imageBase64 = await convertImageToBase64(imageUri);
      }

      const result = await dispatch(addMenuItem({
        menuId: menu.menu_id,
        item: {
          categoryName: formData.category,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          orderType: 'DINE_IN',
          imageBase64,
          ...tags,
        },
      }));

      if (addMenuItem.fulfilled.match(result)) {
        toast.show('Item added successfully! 🎉', 'success');
        
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Mains',
        });
        setTags({
          isVegetarian: false,
          isSpicy: false,
          isPopular: false,
          isNew: false,
        });
        setImageUri(null);

        if (restaurant) {
          dispatch(fetchMenuByRestaurant(restaurant.R_ID));
        }
      } else {
        toast.show('Failed to add item', 'error');
      }
    } catch (error) {
      console.error('Error submitting item:', error);
      toast.show('Failed to process image', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
          <Text style={styles.headerSubtitle}>
            {menu ? `${menu.Categories?.length || 0} categories` : 'Loading...'}
          </Text>
        </View>
        <TouchableOpacity onPress={theme.toggleTheme} style={styles.themeToggleButton}>
          {theme.isDark ? (
            <Svg width={22} height={22} viewBox="0 0 24 24">
              <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="white" />
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
        </TouchableOpacity>
      </View>

      {/* Category Selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map((category) => {
          const isSelected = formData.category === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => setFormData({ ...formData, category: category.id })}
              style={[
                styles.categoryButton,
                isSelected ? styles.categoryButtonSelected : styles.categoryButtonUnselected,
              ]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected ? styles.categoryLabelSelected : styles.categoryLabelUnselected,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Form */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Image (Optional)</Text>
          <TouchableOpacity
            onPress={pickImage}
            disabled={isLoading || isProcessingImage}
            style={{
              backgroundColor: theme.colors.background.elevated,
              borderRadius: theme.borderRadius.br50,
              borderWidth: theme.borderWidth.bw10,
              borderColor: theme.colors.border.subtle,
              overflow: 'hidden',
              marginBottom: theme.spacing.space200,
            }}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: '100%',
                  height: 200,
                }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ 
                alignItems: 'center', 
                padding: theme.spacing.space600,
                backgroundColor: theme.colors.background.secondary,
              }}>
                <Text style={{ 
                  fontSize: theme.fontSize.fs900, 
                  marginBottom: theme.spacing.space300 
                }}>
                  📷
                </Text>
                <Text style={{ 
                  color: theme.colors.foreground.primary,
                  fontSize: theme.fontSize.fs300,
                  fontWeight: theme.fontWeight.medium,
                  marginBottom: theme.spacing.space100,
                }}>
                  Tap to add image
                </Text>
                <Text style={{ 
                  color: theme.colors.foreground.tertiary,
                  fontSize: theme.fontSize.fs200,
                }}>
                  Recommended: 4:3 ratio
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {imageUri && (
            <TouchableOpacity
              onPress={() => setImageUri(null)}
              style={{
                backgroundColor: theme.colors.background.secondary,
                padding: theme.spacing.space200,
                borderRadius: theme.borderRadius.br50,
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                color: theme.colors.foreground.negative,
                fontSize: theme.fontSize.fs300,
              }}>
                Remove Image
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Dish Name *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Margherita Pizza"
            placeholderTextColor={theme.colors.foreground.lighter}
            value={formData.name}
            onChangeText={(name) => setFormData({ ...formData, name })}
            editable={!isLoading && !isProcessingImage}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textInputMultiline]}
            placeholder="Describe your dish..."
            placeholderTextColor={theme.colors.foreground.lighter}
            value={formData.description}
            onChangeText={(description) => setFormData({ ...formData, description })}
            multiline
            numberOfLines={4}
            editable={!isLoading && !isProcessingImage}
          />
        </View>

        {/* Price Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Price *</Text>
          <View style={styles.priceInputRow}>
            <Text style={styles.priceDollarSign}>$</Text>
            <TextInput
              style={[styles.textInput, styles.priceInput]}
              placeholder="0.00"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.price}
              onChangeText={(price) => setFormData({ ...formData, price })}
              keyboardType="decimal-pad"
              editable={!isLoading && !isProcessingImage}
            />
          </View>
        </View>

        {/* Tags Section */}
        <View style={styles.tagsSection}>
          <Text style={styles.tagsLabel}>Tags</Text>
          <View style={styles.tagsContainer}>
            {/* Vegetarian */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isVegetarian: !tags.isVegetarian })}
              style={[
                styles.tagButton,
                tags.isVegetarian ? styles.tagButtonVegetarian : styles.tagButtonUnselected,
              ]}
              disabled={isLoading || isProcessingImage}
            >
              <View style={styles.tagContent}>
                <Text style={styles.tagIcon}>🌱</Text>
                <Text
                  style={[
                    styles.tagText,
                    tags.isVegetarian ? styles.tagTextVegetarian : styles.tagTextUnselected,
                  ]}
                >
                  Vegetarian
                </Text>
              </View>
              <View
                style={[
                  styles.tagCheckbox,
                  tags.isVegetarian ? styles.tagCheckboxVegetarian : styles.tagCheckboxUnselected,
                ]}
              >
                {tags.isVegetarian && <Text style={styles.tagCheckmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            {/* Spicy */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isSpicy: !tags.isSpicy })}
              style={[
                styles.tagButton,
                tags.isSpicy ? styles.tagButtonSpicy : styles.tagButtonUnselected,
              ]}
              disabled={isLoading || isProcessingImage}
            >
              <View style={styles.tagContent}>
                <Text style={styles.tagIcon}>🌶️</Text>
                <Text
                  style={[
                    styles.tagText,
                    tags.isSpicy ? styles.tagTextSpicy : styles.tagTextUnselected,
                  ]}
                >
                  Spicy
                </Text>
              </View>
              <View
                style={[
                  styles.tagCheckbox,
                  tags.isSpicy ? styles.tagCheckboxSpicy : styles.tagCheckboxUnselected,
                ]}
              >
                {tags.isSpicy && <Text style={styles.tagCheckmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            {/* Popular */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isPopular: !tags.isPopular })}
              style={[
                styles.tagButton,
                tags.isPopular ? styles.tagButtonPopular : styles.tagButtonUnselected,
              ]}
              disabled={isLoading || isProcessingImage}
            >
              <View style={styles.tagContent}>
                <Text style={styles.tagIcon}>🔥</Text>
                <Text
                  style={[
                    styles.tagText,
                    tags.isPopular ? styles.tagTextPopular : styles.tagTextUnselected,
                  ]}
                >
                  Popular
                </Text>
              </View>
              <View
                style={[
                  styles.tagCheckbox,
                  tags.isPopular ? styles.tagCheckboxPopular : styles.tagCheckboxUnselected,
                ]}
              >
                {tags.isPopular && <Text style={styles.tagCheckmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            {/* New */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isNew: !tags.isNew })}
              style={[
                styles.tagButton,
                tags.isNew ? styles.tagButtonNew : styles.tagButtonUnselected,
              ]}
              disabled={isLoading || isProcessingImage}
            >
              <View style={styles.tagContent}>
                <Text style={styles.tagIcon}>✨</Text>
                <Text
                  style={[
                    styles.tagText,
                    tags.isNew ? styles.tagTextNew : styles.tagTextUnselected,
                  ]}
                >
                  New Item
                </Text>
              </View>
              <View
                style={[
                  styles.tagCheckbox,
                  tags.isNew ? styles.tagCheckboxNew : styles.tagCheckboxUnselected,
                ]}
              >
                {tags.isNew && <Text style={styles.tagCheckmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleSubmit} 
          style={styles.submitButton}
          disabled={isLoading || isProcessingImage}
        >
          {(isLoading || isProcessingImage) ? (
            <ActivityIndicator color={theme.colors.contrast.white} />
          ) : (
            <Text style={styles.submitButtonText}>Add to Menu</Text>
          )}
        </TouchableOpacity>

        {/* Current Menu Summary */}
        {menu && menu.Categories && menu.Categories.length > 0 && (
          <View style={styles.inputGroup}>
            <Text style={styles.tagsLabel}>Current Menu Summary</Text>
            {menu.Categories.map((cat) => (
              <View
                key={cat.category_id}
                style={{
                  backgroundColor: theme.colors.background.elevated,
                  padding: theme.spacing.space300,
                  borderRadius: theme.borderRadius.br50,
                  marginBottom: theme.spacing.space200,
                }}
              >
                <Text style={{ 
                  color: theme.colors.foreground.primary, 
                  fontWeight: theme.fontWeight.bold 
                }}>
                  {cat.name}: {cat.item_count} items
                </Text>
                <Text style={{ 
                  color: theme.colors.foreground.tertiary, 
                  fontSize: theme.fontSize.fs200 
                }}>
                  Avg Price: ${cat.avg_price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}