import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { createCategoryFilterStyles } from './styles/CategoryFilter.styles';

type CategoryType = 'all' | 'Appetizers' | 'Mains' | 'Desserts' | 'Beverages';

interface Category {
  id: CategoryType;
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
  const theme = useTheme();
  const accent = theme.colors.accent.CO;

  const styles = createCategoryFilterStyles({
    colors: theme.colors,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    shadows: theme.shadows,
    accent,
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            style={[
              styles.categoryButton,
              isSelected ? styles.categoryButtonSelected : styles.categoryButtonUnselected,
            ]}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
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
  );
}