import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

type CategoryType = 'all' | 'appetizer' | 'main' | 'dessert' | 'beverage';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const { colors, spacing, fontSize, fontWeight, borderRadius, borderWidth, shadows } = useTheme();
  const accent = colors.accent.CO;

  return (
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
        alignItems: 'center',
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
  );
}