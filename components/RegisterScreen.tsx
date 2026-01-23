import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/userSlice';

export default function RegisterScreen() {
  const { 
    colors, 
    spacing, 
    fontSize, 
    fontWeight, 
    borderRadius, 
    borderWidth, 
    shadows 
  } = useTheme();
  
  const accent = colors.accent.CO;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView contentContainerStyle={{ padding: spacing.space400 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginTop: spacing.space800, marginBottom: spacing.space800 }}>
          <Text style={{ fontSize: 64, marginBottom: spacing.space400 }}>👤</Text>
          <Text
            style={{
              color: accent,
              fontSize: fontSize.fs1100,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space150,
            }}
          >
            Create Account
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs300,
              textAlign: 'center',
            }}
          >
            Sign up to get started
          </Text>
        </View>

        {/* Form */}
        <View style={{ gap: spacing.space400 }}>
          {/* Name Input */}
          <View>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.medium,
                marginBottom: spacing.space200,
              }}
            >
              Full Name *
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.background.elevated,
                color: colors.foreground.primary,
                fontSize: fontSize.fs400,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: errors.name ? colors.border.negative : colors.border.subtle,
              }}
              placeholder="Enter your name"
              placeholderTextColor={colors.foreground.lighter}
              value={formData.name}
              onChangeText={(name) => {
                setFormData({ ...formData, name });
                setErrors({ ...errors, name: '' });
              }}
              editable={!isLoading}
            />
            {errors.name ? (
              <Text
                style={{
                  color: colors.foreground.negative,
                  fontSize: fontSize.fs200,
                  marginTop: spacing.space150,
                }}
              >
                {errors.name}
              </Text>
            ) : null}
          </View>

          {/* Email Input */}
          <View>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.medium,
                marginBottom: spacing.space200,
              }}
            >
              Email *
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.background.elevated,
                color: colors.foreground.primary,
                fontSize: fontSize.fs400,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: errors.email ? colors.border.negative : colors.border.subtle,
              }}
              placeholder="Enter your email"
              placeholderTextColor={colors.foreground.lighter}
              value={formData.email}
              onChangeText={(email) => {
                setFormData({ ...formData, email });
                setErrors({ ...errors, email: '' });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors.email ? (
              <Text
                style={{
                  color: colors.foreground.negative,
                  fontSize: fontSize.fs200,
                  marginTop: spacing.space150,
                }}
              >
                {errors.email}
              </Text>
            ) : null}
          </View>

          {/* Phone Input (Optional) */}
          <View>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs300,
                fontWeight: fontWeight.medium,
                marginBottom: spacing.space200,
              }}
            >
              Phone (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: colors.background.elevated,
                color: colors.foreground.primary,
                fontSize: fontSize.fs400,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: colors.border.subtle,
              }}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.foreground.lighter}
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
            style={{
              backgroundColor: isLoading ? colors.background.secondary : accent,
              padding: spacing.space400,
              borderRadius: borderRadius.br50,
              alignItems: 'center',
              marginTop: spacing.space400,
              ...shadows.medium,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {isLoading && (
              <ActivityIndicator 
                color={colors.contrast.white} 
                style={{ marginRight: spacing.space300 }} 
              />
            )}
            <Text
              style={{
                color: colors.contrast.white,
                fontSize: fontSize.fs500,
                fontWeight: fontWeight.bold,
              }}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Text */}
        <Text
          style={{
            color: colors.foreground.tertiary,
            fontSize: fontSize.fs200,
            textAlign: 'center',
            marginTop: spacing.space800,
          }}
        >
          Note: Your profile will reset when you close the app
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});