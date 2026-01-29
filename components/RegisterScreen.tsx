import { useState } from 'react';
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
import { registerUser } from '@/store/slices/userSlice';
import { createRegisterScreenStyles } from './styles/Register.styles';

export default function RegisterScreen() {
  const theme = useTheme();
  const accent = theme.colors.accent.CO;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

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
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validate = () => {
    const newErrors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validate()) {
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerIcon}>👤</Text>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Sign up to get started</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.name ? styles.textInputError : styles.textInputNormal,
              ]}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.name}
              onChangeText={(name) => {
                setFormData({ ...formData, name });
                setErrors({ ...errors, name: '' });
              }}
              editable={!isLoading}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={[
                styles.textInput,
                errors.email ? styles.textInputError : styles.textInputNormal,
              ]}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.email}
              onChangeText={(email) => {
                setFormData({ ...formData, email });
                setErrors({ ...errors, email: '' });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Phone Input (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textInputNormal]}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.foreground.lighter}
              value={formData.phone}
              onChangeText={(phone) => setFormData({ ...formData, phone })}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            style={[
              styles.registerButton,
              isLoading ? styles.registerButtonDisabled : styles.registerButtonActive,
            ]}
          >
            {isLoading && (
              <ActivityIndicator 
                color={theme.colors.contrast.white} 
                style={styles.loadingIndicator} 
              />
            )}
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Note: Your profile will reset when you close the app
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}