import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { createCategoryFilterStyles } from './styles/CategoryFilter.styles';

// Fixed: Match MenuScreen categories (backend uses capitalized names)
type CategoryType = 'all' | 'Appetizers' | 'Mains' | 'Desserts' | 'Beverages';

interface Category {
  id: CategoryType; // Fixed: Changed from string to CategoryType
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
  );
}