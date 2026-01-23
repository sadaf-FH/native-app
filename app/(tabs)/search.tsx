import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export default function SearchScreen() {
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
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState(['Pizza', 'Salmon', 'Tiramisu', 'Espresso']);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background.elevated,
            borderBottomWidth: borderWidth.bw20,
            borderBottomColor: colors.border.medium,
            padding: spacing.space400,
            ...shadows.medium,
          },
        ]}
      >
        <View>
          <Text
            style={{
              color: accent,
              fontSize: fontSize.fs1100,
              fontWeight: fontWeight.bold,
            }}
          >
            Search
          </Text>
          <Text
            style={{
              color: colors.foreground.tertiary,
              fontSize: fontSize.fs200,
              marginTop: spacing.space150,
            }}
          >
            Find your favorite dishes
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleTheme}
          style={{
            backgroundColor: accent,
            padding: spacing.space300,
            borderRadius: borderRadius.br50,
            ...shadows.small,
          }}
        >
          <Text style={{ fontSize: fontSize.fs400 }}>
            {isDark ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={{ padding: spacing.space400 }}>
        <View
          style={{
            backgroundColor: colors.background.elevated,
            borderRadius: borderRadius.br50,
            borderWidth: borderWidth.bw10,
            borderColor: searchQuery ? accent : colors.border.subtle,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.space400,
            ...shadows.small,
          }}
        >
          <Text style={{ fontSize: fontSize.fs400, marginRight: spacing.space300 }}>🔎</Text>
          <TextInput
            style={{
              flex: 1,
              color: colors.foreground.primary,
              fontSize: fontSize.fs400,
              paddingVertical: spacing.space300,
            }}
            placeholder="Search for food..."
            placeholderTextColor={colors.foreground.lighter}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: colors.foreground.tertiary, fontSize: fontSize.fs700 }}>
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ padding: spacing.space400 }}>
        {searchQuery ? (
          // Search Results
          <View>
            <Text
              style={{
                color: colors.foreground.secondary,
                fontSize: fontSize.fs300,
                marginBottom: spacing.space400,
              }}
            >
              Searching for "{searchQuery}"...
            </Text>
            <View style={{ alignItems: 'center', paddingVertical: spacing.space1000 }}>
              <Text style={{ fontSize: 64, marginBottom: spacing.space400 }}>🔍</Text>
              <Text
                style={{
                  color: colors.foreground.primary,
                  fontSize: fontSize.fs700,
                  fontWeight: fontWeight.bold,
                }}
              >
                No results found
              </Text>
              <Text
                style={{
                  color: colors.foreground.tertiary,
                  fontSize: fontSize.fs300,
                  marginTop: spacing.space200,
                }}
              >
                Try searching for something else
              </Text>
            </View>
          </View>
        ) : (
          // Recent Searches
          <View>
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs700,
                fontWeight: fontWeight.bold,
                marginBottom: spacing.space400,
              }}
            >
              Recent Searches
            </Text>
            <View style={{ gap: spacing.space300 }}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearchQuery(search)}
                  style={{
                    backgroundColor: colors.background.elevated,
                    padding: spacing.space400,
                    borderRadius: borderRadius.br50,
                    borderWidth: borderWidth.bw10,
                    borderColor: colors.border.light,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: fontSize.fs400, marginRight: spacing.space300 }}>
                      ⏱️
                    </Text>
                    <Text
                      style={{
                        color: colors.foreground.primary,
                        fontSize: fontSize.fs400,
                      }}
                    >
                      {search}
                    </Text>
                  </View>
                  <Text style={{ color: colors.foreground.tertiary, fontSize: fontSize.fs400 }}>
                    →
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Categories */}
            <Text
              style={{
                color: colors.foreground.primary,
                fontSize: fontSize.fs700,
                fontWeight: fontWeight.bold,
                marginTop: spacing.space800,
                marginBottom: spacing.space400,
              }}
            >
              Popular Categories
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.space300 }}>
              {['🥗 Appetizers', '🍝 Mains', '🍰 Desserts', '🍷 Beverages'].map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: colors.background.elevated,
                    paddingVertical: spacing.space300,
                    paddingHorizontal: spacing.space400,
                    borderRadius: borderRadius.br50,
                    borderWidth: borderWidth.bw10,
                    borderColor: colors.border.light,
                    ...shadows.small,
                  }}
                >
                  <Text
                    style={{
                      color: colors.foreground.primary,
                      fontSize: fontSize.fs300,
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});