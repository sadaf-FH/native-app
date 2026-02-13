import { createCreateMenuScreenStyles } from '@/components/styles/Admin.styles';
import Header from '@/components/base/Header';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addMenuItem, createMenu, fetchMenuByRestaurant } from '@/store/slices/menuSlice';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let ImagePicker: any = null;
let FileSystem: any = null;

try {
  ImagePicker = require('expo-image-picker');
  if (Platform.OS !== 'web') {
    FileSystem = require('expo-file-system/legacy');
  }
} catch (e) {
  console.log('Image picker not available - using without images');
}

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

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const isImagePickerAvailable = ImagePicker !== null;

  const [availableFrom, setAvailableFrom] = useState<Date | null>(null);
  const [availableTo, setAvailableTo] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const categories = [
    { id: 'Appetizers', label: 'Appetizers', icon: 'leaf-outline' },
    { id: 'Mains', label: 'Mains', icon: 'pizza-outline' },
    { id: 'Desserts', label: 'Desserts', icon: 'ice-cream-outline' },
    { id: 'Beverages', label: 'Beverages', icon: 'wine-outline' },
  ];

  useEffect(() => {
    if (restaurant && !menu) {
      dispatch(createMenu({ restaurantId: restaurant.R_ID }));
    }
  }, [restaurant, menu]);

  const pickImage = async () => {
    if (!isImagePickerAvailable) {
      Alert.alert(
        'Feature Not Available',
        'Image upload requires a development build. For now, you can add items without images.',
        [{ text: 'OK' }]
      );
      return;
    }

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
        base64: Platform.OS === 'web',
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        toast.show('Image selected!', 'success');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      toast.show('Failed to pick image', 'error');
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      if (Platform.OS === 'web') {
        const response = await fetch(uri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      if (!FileSystem) {
        throw new Error('FileSystem not available');
      }

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  const formatDateToTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatTime24Hour = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleFromTimeChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setAvailableFrom(selectedDate);
    }
  };

  const handleToTimeChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setAvailableTo(selectedDate);
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

    if ((availableFrom && !availableTo) || (!availableFrom && availableTo)) {
      toast.show('Please set both start and end times', 'error');
      return;
    }

    if (availableFrom && availableTo && availableFrom >= availableTo) {
      toast.show('End time must be after start time', 'error');
      return;
    }

    setIsProcessingImage(true);

    try {
      let imageBase64: string | undefined;

      if (imageUri) {
        imageBase64 = await convertImageToBase64(imageUri);
      }

      let timeAvailability = undefined;
      if (availableFrom && availableTo) {
        timeAvailability = {
          available_from: formatDateToTime(availableFrom),
          available_to: formatDateToTime(availableTo),
        };
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
          time: timeAvailability,
        },
      }));

      if (addMenuItem.fulfilled.match(result)) {
        toast.show('Item added successfully!', 'success');

        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Mains',
        });
        setImageUri(null);
        setAvailableFrom(null);
        setAvailableTo(null);

        if (restaurant) {
          dispatch(fetchMenuByRestaurant(restaurant.R_ID));
        }
      } else {
        toast.show('Failed to add item', 'error');
      }
    } catch (error) {
      console.error('Error submitting item:', error);
      toast.show('Failed to process item', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>

      {/* ✅ Shared Header — replaces the inline header + SVG toggle */}
      <Header
        title="Add Menu Item"
        subtitle={menu ? `${menu.Categories?.length || 0} categories` : 'Loading...'}
        showThemeToggle={true}
        showSearch={false}
        showCart={false}
      />

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
              <Ionicons
                name={category.icon as any}
                size={18}
                color={isSelected ? theme.colors.contrast.white : theme.colors.foreground.secondary}
                style={{ marginBottom: theme.spacing.space100 }}
              />
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
        {isImagePickerAvailable && (
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
                  style={{ width: '100%', height: 200 }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{
                  alignItems: 'center',
                  padding: theme.spacing.space600,
                  backgroundColor: theme.colors.background.secondary,
                }}>
                  <Ionicons name="camera-outline" size={24} color={theme.colors.foreground.primary} />
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
                  marginBottom: theme.spacing.space300,
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
        )}

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

        {/* Availability Time Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Availability Time (Optional)</Text>
          <Text style={{
            color: theme.colors.foreground.tertiary,
            fontSize: theme.fontSize.fs200,
            marginBottom: theme.spacing.space300,
          }}>
            Leave empty for all-day availability. Set times when this item is available.
          </Text>

          {/* Available From */}
          <View style={{ marginBottom: theme.spacing.space300 }}>
            <Text style={[styles.inputLabel, { fontSize: theme.fontSize.fs200, marginBottom: theme.spacing.space200 }]}>
              Available From
            </Text>
            <TouchableOpacity
              onPress={() => setShowFromPicker(true)}
              style={{
                backgroundColor: theme.colors.background.elevated,
                padding: theme.spacing.space300,
                borderRadius: theme.borderRadius.br50,
                borderWidth: theme.borderWidth.bw10,
                borderColor: theme.colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{
                color: availableFrom ? theme.colors.foreground.primary : theme.colors.foreground.lighter,
                fontSize: theme.fontSize.fs300,
              }}>
                {availableFrom ? formatTime24Hour(availableFrom) : 'Select time (e.g., 09:00)'}
              </Text>
              <Ionicons name="time-outline" size={20} color={theme.colors.foreground.primary} />
            </TouchableOpacity>
            {availableFrom && (
              <TouchableOpacity
                onPress={() => setAvailableFrom(null)}
                style={{ marginTop: theme.spacing.space200, alignItems: 'center' }}
              >
                <Text style={{
                  color: theme.colors.foreground.tertiary,
                  fontSize: theme.fontSize.fs200,
                }}>
                  Clear
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Available To */}
          <View>
            <Text style={[styles.inputLabel, { fontSize: theme.fontSize.fs200, marginBottom: theme.spacing.space200 }]}>
              Available To
            </Text>
            <TouchableOpacity
              onPress={() => setShowToPicker(true)}
              style={{
                backgroundColor: theme.colors.background.elevated,
                padding: theme.spacing.space300,
                borderRadius: theme.borderRadius.br50,
                borderWidth: theme.borderWidth.bw10,
                borderColor: theme.colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{
                color: availableTo ? theme.colors.foreground.primary : theme.colors.foreground.lighter,
                fontSize: theme.fontSize.fs300,
              }}>
                {availableTo ? formatTime24Hour(availableTo) : 'Select time (e.g., 22:00)'}
              </Text>
              <Ionicons name="time-outline" size={20} color={theme.colors.foreground.primary} />
            </TouchableOpacity>
            {availableTo && (
              <TouchableOpacity
                onPress={() => setAvailableTo(null)}
                style={{ marginTop: theme.spacing.space200, alignItems: 'center' }}
              >
                <Text style={{
                  color: theme.colors.foreground.tertiary,
                  fontSize: theme.fontSize.fs200,
                }}>
                  Clear
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Selected time range summary */}
          {availableFrom && availableTo && (
            <View style={{
              marginTop: theme.spacing.space300,
              padding: theme.spacing.space300,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.br50,
            }}>
              <Text style={{
                color: theme.colors.foreground.secondary,
                fontSize: theme.fontSize.fs200,
                textAlign: 'center',
              }}>
                Available: {formatTime24Hour(availableFrom)} - {formatTime24Hour(availableTo)}
              </Text>
            </View>
          )}

          {/* Time Pickers */}
          {showFromPicker && (
            <DateTimePicker
              value={availableFrom || new Date()}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleFromTimeChange}
            />
          )}

          {showToPicker && (
            <DateTimePicker
              value={availableTo || new Date()}
              mode="time"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleToTimeChange}
            />
          )}
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
                  fontWeight: theme.fontWeight.bold,
                }}>
                  {cat.name}: {cat.item_count} items
                </Text>
                <Text style={{
                  color: theme.colors.foreground.tertiary,
                  fontSize: theme.fontSize.fs200,
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