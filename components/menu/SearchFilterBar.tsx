import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// Fixed: Removed 'rating' to match MenuScreen
type SortType = 'default' | 'price-low' | 'price-high';

interface SortOption {
  id: SortType; // Fixed: Changed from string to SortType
  label: string;
  icon: string;
}

interface SearchFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: SortType;
  setSortBy: (sort: SortType) => void;
  sortOptions: SortOption[];
}

export default function SearchFilterBar({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOptions,
}: SearchFilterBarProps) {
  const { colors, spacing, fontSize, fontWeight, borderRadius, borderWidth, shadows } = useTheme();
  const accent = colors.accent.CO;

  return (
    <View
      style={{
        backgroundColor: colors.background.light,
        paddingVertical: spacing.space400,
        paddingHorizontal: spacing.space400,
        borderBottomWidth: borderWidth.bw10,
        borderBottomColor: colors.border.lighter,
      }}
    >
      {/* Search Input */}
      <View
        style={{
          backgroundColor: colors.background.elevated,
          borderRadius: borderRadius.br70,
          borderWidth: borderWidth.bw20,
          borderColor: searchQuery ? accent : colors.border.lighter,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: spacing.space400,
          marginBottom: spacing.space400,
          ...shadows.small,
        }}
      >
        <Text style={{ fontSize: fontSize.fs200, marginRight: spacing.space300 }}>🔎</Text>
        <TextInput
          style={{
            flex: 1,
            color: colors.foreground.primary,
            fontSize: fontSize.fs300,
            paddingVertical: spacing.space300,
          }}
          placeholder="Search menu..."
          placeholderTextColor={colors.foreground.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text
              style={{
                color: colors.foreground.tertiary,
                fontSize: fontSize.fs400,
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sort Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: spacing.space150,
        }}
      >
        {sortOptions.map((option) => {
          const isSelected = sortBy === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSortBy(option.id)} // Fixed: No need to cast anymore
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
                {option.icon}
              </Text>
              <Text
                style={{
                  color: isSelected ? colors.contrast.white : colors.foreground.primary,
                  fontSize: fontSize.fs200,
                  fontWeight: isSelected ? fontWeight.bold : fontWeight.medium,
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}