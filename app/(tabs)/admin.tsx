import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  Alert 
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Svg, { Circle, Line, Path } from 'react-native-svg';

export default function CreateMenuScreen() {
  const { 
    colors, 
    spacing, 
    fontSize,
    fontWeight,
    borderRadius, 
    borderWidth,
    shadows,
    isDark,
    toggleTheme,
  } = useTheme();
  
  const accent = colors.accent.CO;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main' as 'appetizer' | 'main' | 'dessert' | 'beverage',
  });

  const [tags, setTags] = useState({
    isVegetarian: false,
    isSpicy: false,
    isPopular: false,
    isNew: false,
  });

  const categories = [
    { id: 'appetizer', label: 'Appetizer', icon: '🥗' },
    { id: 'main', label: 'Main', icon: '🍝' },
    { id: 'dessert', label: 'Dessert', icon: '🍰' },
    { id: 'beverage', label: 'Beverage', icon: '🍷' },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      Alert.alert('Error', 'Please fill in name and price');
      return;
    }
    Alert.alert('Success', 'Menu item created!');
    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'main',
    });
    setTags({
      isVegetarian: false,
      isSpicy: false,
      isPopular: false,
      isNew: false,
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View
        style={{
          backgroundColor: colors.background.elevated,
          borderBottomWidth: borderWidth.bw20,
          borderBottomColor: colors.border.medium,
          padding: spacing.space400,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...shadows.medium,
        }}
      >
        <View>
          <Text
            style={{
              color: accent,
              fontSize: fontSize.fs800,
              fontWeight: fontWeight.bold,
            }}
          >
            Create Menu Item
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs200,
              marginTop: spacing.space150,
            }}
          >
            Add a new dish to your menu
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            backgroundColor: accent,
            padding: spacing.space400,
            borderRadius: borderRadius.br50,
            borderWidth: borderWidth.bw10,
            borderColor: accent,
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
        </TouchableOpacity>
      </View>

      {/* Category Selection */}
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
          const isSelected = formData.category === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => setFormData({ ...formData, category: category.id as any })}
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

      {/* Form */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ padding: spacing.space400 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Name Input */}
        <View style={{ marginBottom: spacing.space400 }}>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs300,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space200,
            }}
          >
            Dish Name *
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
            placeholder="e.g., Margherita Pizza"
            placeholderTextColor={colors.foreground.lighter}
            value={formData.name}
            onChangeText={(name) => setFormData({ ...formData, name })}
          />
        </View>

        {/* Description Input */}
        <View style={{ marginBottom: spacing.space400 }}>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs300,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space200,
            }}
          >
            Description
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
              minHeight: 100,
              textAlignVertical: 'top',
            }}
            placeholder="Describe your dish..."
            placeholderTextColor={colors.foreground.lighter}
            value={formData.description}
            onChangeText={(description) => setFormData({ ...formData, description })}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Price Input */}
        <View style={{ marginBottom: spacing.space400 }}>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs300,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space200,
            }}
          >
            Price *
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs700,
                marginRight: spacing.space200,
              }}
            >
              $
            </Text>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: colors.background.elevated,
                color: colors.foreground.primary,
                fontSize: fontSize.fs400,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: colors.border.subtle,
              }}
              placeholder="0.00"
              placeholderTextColor={colors.foreground.lighter}
              value={formData.price}
              onChangeText={(price) => setFormData({ ...formData, price })}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Tags Section */}
        <View style={{ marginBottom: spacing.space600 }}>
          <Text
            style={{
              color: colors.foreground.primary,
              fontSize: fontSize.fs300,
              fontWeight: fontWeight.bold,
              marginBottom: spacing.space300,
            }}
          >
            Tags
          </Text>
          <View style={{ gap: spacing.space300 }}>
            {/* Vegetarian */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isVegetarian: !tags.isVegetarian })}
              style={{
                backgroundColor: tags.isVegetarian ? colors.background.accentCM : colors.background.elevated,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: tags.isVegetarian ? colors.border.accentCM : colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize.fs500, marginRight: spacing.space300 }}>🌱</Text>
                <Text
                  style={{
                    color: tags.isVegetarian ? colors.foreground.accentCM : colors.foreground.primary,
                    fontSize: fontSize.fs400,
                    fontWeight: fontWeight.medium,
                  }}
                >
                  Vegetarian
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: borderRadius.br40,
                  borderWidth: borderWidth.bw20,
                  borderColor: tags.isVegetarian ? colors.border.accentCM : colors.border.medium,
                  backgroundColor: tags.isVegetarian ? colors.foreground.accentCM : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tags.isVegetarian && (
                  <Text style={{ color: colors.contrast.white, fontSize: fontSize.fs200 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Spicy */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isSpicy: !tags.isSpicy })}
              style={{
                backgroundColor: tags.isSpicy ? colors.background.negative : colors.background.elevated,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: tags.isSpicy ? colors.border.negative : colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize.fs500, marginRight: spacing.space300 }}>🌶️</Text>
                <Text
                  style={{
                    color: tags.isSpicy ? colors.foreground.negative : colors.foreground.primary,
                    fontSize: fontSize.fs400,
                    fontWeight: fontWeight.medium,
                  }}
                >
                  Spicy
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: borderRadius.br40,
                  borderWidth: borderWidth.bw20,
                  borderColor: tags.isSpicy ? colors.border.negative : colors.border.medium,
                  backgroundColor: tags.isSpicy ? colors.foreground.negative : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tags.isSpicy && (
                  <Text style={{ color: colors.contrast.white, fontSize: fontSize.fs200 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>

            {/* Popular */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isPopular: !tags.isPopular })}
              style={{
                backgroundColor: tags.isPopular ? colors.background.positive : colors.background.elevated,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: tags.isPopular ? colors.border.positive : colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize.fs500, marginRight: spacing.space300 }}>🔥</Text>
                <Text
                  style={{
                    color: tags.isPopular ? colors.foreground.positive : colors.foreground.primary,
                    fontSize: fontSize.fs400,
                    fontWeight: fontWeight.medium,
                  }}
                >
                  Popular
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: borderRadius.br40,
                  borderWidth: borderWidth.bw20,
                  borderColor: tags.isPopular ? colors.border.positive : colors.border.medium,
                  backgroundColor: tags.isPopular ? colors.foreground.positive : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tags.isPopular && (
                  <Text style={{ color: colors.contrast.white, fontSize: fontSize.fs200 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>

            {/* New */}
            <TouchableOpacity
              onPress={() => setTags({ ...tags, isNew: !tags.isNew })}
              style={{
                backgroundColor: tags.isNew ? colors.background.link : colors.background.elevated,
                padding: spacing.space400,
                borderRadius: borderRadius.br50,
                borderWidth: borderWidth.bw10,
                borderColor: tags.isNew ? colors.border.link : colors.border.subtle,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize.fs500, marginRight: spacing.space300 }}>✨</Text>
                <Text
                  style={{
                    color: tags.isNew ? colors.foreground.link : colors.foreground.primary,
                    fontSize: fontSize.fs400,
                    fontWeight: fontWeight.medium,
                  }}
                >
                  New Item
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: borderRadius.br40,
                  borderWidth: borderWidth.bw20,
                  borderColor: tags.isNew ? colors.border.link : colors.border.medium,
                  backgroundColor: tags.isNew ? colors.foreground.link : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tags.isNew && (
                  <Text style={{ color: colors.contrast.white, fontSize: fontSize.fs200 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: accent,
            padding: spacing.space400,
            borderRadius: borderRadius.br50,
            alignItems: 'center',
            marginBottom: spacing.space400,
            ...shadows.medium,
          }}
        >
          <Text
            style={{
              color: colors.contrast.white,
              fontSize: fontSize.fs500,
              fontWeight: fontWeight.bold,
            }}
          >
            Create Menu Item
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});