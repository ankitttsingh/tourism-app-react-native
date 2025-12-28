import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SPACING, SHADOWS, RADIUS } from '../styles/theme';
import { DESTINATIONS } from '../data/destinations';

const DestinationsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Heritage', 'Beach', 'Nature', 'Adventure', 'Spiritual'];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Modern Header with Gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredDestinations.length} {filteredDestinations.length === 1 ? 'place' : 'places'} found
        </Text>
      </View>

      {/* Destinations Grid */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              style={styles.card}
              onPress={() => navigation.navigate('DestinationDetail', { destination })}
              activeOpacity={0.9}
            >
              <Image
                source={destination.image }
                style={styles.cardImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.85)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardBadge}>
                  <Text style={styles.badgeText}>⭐ {destination.rating}</Text>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.cardTag}>
                    <Text style={styles.cardTagText}>{destination.category}</Text>
                  </View>
                  <Text style={styles.cardName}>{destination.name}</Text>
                  <Text style={styles.cardLocation}>📍 {destination.location}</Text>
                  
                  <View style={styles.cardFooter}>
                    <View>
                      <Text style={styles.priceLabel}>Starting from</Text>
                      <Text style={styles.price}>₹{destination.price.toLocaleString()}</Text>
                    </View>
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>{destination.duration}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No destinations found</Text>
            <Text style={styles.emptyText}>
              Try different search terms or categories
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.xxl + 10,
    paddingBottom: SPACING.m,
    borderBottomLeftRadius: RADIUS.xxl,
    borderBottomRightRadius: RADIUS.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.m,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.m,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 44,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    paddingHorizontal: SPACING.m,
    marginHorizontal: SPACING.l,
    height: 52,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  searchIcon: {
    fontSize: SIZES.large,
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontWeight: '500',
  },
  clearIcon: {
    fontSize: SIZES.large,
    color: COLORS.gray,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingBottom: SPACING.m,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.l,
    gap: SPACING.s,
  },
  categoryPill: {
    paddingHorizontal: SPACING.m + 4,
    paddingVertical: SPACING.s + 2,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: SPACING.s,
  },
  categoryPillActive: {
    backgroundColor: COLORS.white,
  },
  categoryText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.white,
  },
  categoryTextActive: {
    color: COLORS.primary,
  },
  resultsContainer: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
  },
  resultsText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.l,
    paddingTop: 0,
    paddingBottom: SPACING.xxl,
  },
  card: {
    height: 320,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    marginBottom: SPACING.m,
    ...SHADOWS.large,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.dark,
  },
  cardContent: {
    marginBottom: SPACING.s,
  },
  cardTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent + '40',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.m,
    marginBottom: SPACING.s,
  },
  cardTagText: {
    fontSize: SIZES.xs,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardName: {
    fontSize: SIZES.xLarge + 2,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  cardLocation: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.m,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: SIZES.xs,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.white,
  },
  durationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.m,
  },
  durationText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.xxl * 2,
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: SPACING.l,
    opacity: 0.3,
  },
  emptyTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.s,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.l,
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
  },
  resetButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default DestinationsScreen;