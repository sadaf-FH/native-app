import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createRestaurant } from '@/store/slices/restaurantSlice';
import { createMenu } from '@/store/slices/menuSlice';
import { createRegisterScreenStyles } from './styles/Register.styles';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  
  const { restaurant, isLoading, error } = useAppSelector((state) => state.restaurant);

  const styles = createRegisterScreenStyles({
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
    franchise: '',
    location: '',
    timezone: 'UTC',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    location: '',
  });

  const [isCreatingMenu, setIsCreatingMenu] = useState(false);

  useEffect(() => {
    if (restaurant) {
      router.replace('/(tabs)/menu');
    }
  }, [restaurant]);

  const validate = () => {
    const newErrors = { name: '', location: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
      isValid = false;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (validate()) {
      setIsCreatingMenu(true);
      
      const restaurantResult = await dispatch(createRestaurant({
        name: formData.name,
        franchise: formData.franchise || null,
        location: formData.location,
        available: true,
        timezone: formData.timezone,
      }));

      if (createRestaurant.fulfilled.match(restaurantResult)) {
        const newRestaurant = restaurantResult.payload;
        toast.show('Restaurant created! 🎉', 'success');
        
        const menuResult = await dispatch(createMenu({ 
          restaurantId: newRestaurant.R_ID,
          version: 1 
        }));

        if (createMenu.fulfilled.match(menuResult)) {
          toast.show('Ready to add menu items! 📋', 'success');
        } else {
          toast.show('Restaurant created, but menu setup failed', 'error');
        }
      } else {
        toast.show(error || 'Failed to create restaurant', 'error');
      }
      
      setIsCreatingMenu(false);
    }
  };

  const isProcessing = isLoading || isCreatingMenu;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerIcon}>🍽️</Text>
          <Text style={styles.headerTitle}>Create Restaurant</Text>
          <Text style={styles.headerSubtitle}>Register your restaurant to get started</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Restaurant Name *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.name ? styles.textInputError : styles.textInputNormal,
              ]}
              placeholder="e.g., La Tavola"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.name}
              onChangeText={(name) => {
                setFormData({ ...formData, name });
                setErrors({ ...errors, name: '' });
              }}
              editable={!isProcessing}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Franchise (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textInputNormal]}
              placeholder="e.g., Italian Restaurants Inc."
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.franchise}
              onChangeText={(franchise) => setFormData({ ...formData, franchise })}
              editable={!isProcessing}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Location *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.location ? styles.textInputError : styles.textInputNormal,
              ]}
              placeholder="e.g., New York, NY"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.location}
              onChangeText={(location) => {
                setFormData({ ...formData, location });
                setErrors({ ...errors, location: '' });
              }}
              editable={!isProcessing}
            />
            {errors.location ? <Text style={styles.errorText}>{errors.location}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Timezone</Text>
            <TextInput
              style={[styles.textInput, styles.textInputNormal]}
              placeholder="UTC"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.timezone}
              onChangeText={(timezone) => setFormData({ ...formData, timezone })}
              editable={!isProcessing}
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={isProcessing}
            style={[
              styles.registerButton,
              isProcessing ? styles.registerButtonDisabled : styles.registerButtonActive,
            ]}
          >
            {isProcessing && (
              <ActivityIndicator 
                color={theme.colors.contrast.white} 
                style={styles.loadingIndicator} 
              />
            )}
            <Text style={styles.registerButtonText}>
              {isProcessing ? 'Setting up...' : 'Create Restaurant'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          Your restaurant and menu will be ready instantly
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}