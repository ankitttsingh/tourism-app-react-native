import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SPACING, SHADOWS, RADIUS } from '../styles/theme';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window');

const DestinationDetailScreen = ({ navigation, route }) => {
  const { destination } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('overview');

  // Sample itinerary data (you can add this to destinations.js later)
  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Welcome',
      activities: ['Hotel Check-in', 'Welcome Dinner', 'City Orientation Tour'],
      meals: 'Dinner',
    },
    {
      day: 2,
      title: 'Full Day Exploration',
      activities: ['Morning Temple Visit', 'Local Market Tour', 'Cultural Show'],
      meals: 'Breakfast, Lunch, Dinner',
    },
    {
      day: 3,
      title: 'Adventure Day',
      activities: ['Nature Trek', 'Water Activities', 'Sunset Point Visit'],
      meals: 'Breakfast, Lunch',
    },
    {
      day: 4,
      title: 'Departure',
      activities: ['Hotel Checkout', 'Airport Transfer', 'Safe Journey Home'],
      meals: 'Breakfast',
    },
  ];

  const highlights = [
    '🏛️ UNESCO World Heritage Sites',
    '🍽️ Authentic Local Cuisine',
    '🚗 Private Transportation',
    '🏨 Premium Accommodation',
    '👨‍🏫 Expert Tour Guide',
    '📸 Photo Opportunities',
  ];

  const inclusions = [
    'Accommodation for all nights',
    'Daily breakfast & dinners',
    'All transfers & sightseeing',
    'Professional tour guide',
    'Entrance fees to monuments',
    'Travel insurance',
  ];

  const exclusions = [
    'International flights',
    'Personal expenses',
    'Lunch on day 4',
    'Tips & gratuities',
    'Optional activities',
  ];

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: 'Oct 2024',
      comment: 'Amazing experience! The guide was knowledgeable and friendly.',
      avatar: '👩',
    },
    {
      id: 2,
      name: 'Rahul Verma',
      rating: 4.5,
      date: 'Sep 2024',
      comment: 'Great trip with family. Accommodation was excellent.',
      avatar: '👨',
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 5,
      date: 'Aug 2024',
      comment: 'Highly recommend! Every detail was perfectly planned.',
      avatar: '👩',
    },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
              <Text style={styles.headerButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {destination.name}
            </Text>
            <View style={styles.headerButton} />
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Floating Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.floatingBack}
      >
        <Text style={styles.floatingBackText}>←</Text>
      </TouchableOpacity>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Image */}
        <Image
          source={destination.image }
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.heroGradient}
        />

        {/* Main Content Card */}
        <View style={styles.mainCard}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{destination.category}</Text>
            </View>
            <Text style={styles.destinationName}>{destination.name}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>📍 {destination.location}</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {destination.rating}</Text>
              </View>
            </View>
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoGrid}>
            <View style={styles.quickInfoCard}>
              <Text style={styles.quickInfoIcon}>⏱️</Text>
              <Text style={styles.quickInfoLabel}>Duration</Text>
              <Text style={styles.quickInfoValue}>{destination.duration}</Text>
            </View>
            <View style={styles.quickInfoCard}>
              <Text style={styles.quickInfoIcon}>💰</Text>
              <Text style={styles.quickInfoLabel}>Price</Text>
              <Text style={styles.quickInfoValue}>₹{destination.price.toLocaleString()}</Text>
            </View>
            <View style={styles.quickInfoCard}>
              <Text style={styles.quickInfoIcon}>👥</Text>
              <Text style={styles.quickInfoLabel}>Group</Text>
              <Text style={styles.quickInfoValue}>2-15 pax</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'itinerary' && styles.tabActive]}
              onPress={() => setActiveTab('itinerary')}
            >
              <Text style={[styles.tabText, activeTab === 'itinerary' && styles.tabTextActive]}>
                Itinerary
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.tabTextActive]}>
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <View style={styles.tabContent}>
              {/* Description */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About This Trip</Text>
                <Text style={styles.description}>{destination.description}</Text>
              </View>

              {/* Highlights */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trip Highlights</Text>
                <View style={styles.highlightsList}>
                  {highlights.map((highlight, index) => (
                    <View key={index} style={styles.highlightItem}>
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Inclusions & Exclusions */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>What's Included</Text>
                <View style={styles.includeCard}>
                  {inclusions.map((item, index) => (
                    <View key={index} style={styles.includeRow}>
                      <Text style={styles.checkIcon}>✓</Text>
                      <Text style={styles.includeText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>What's Excluded</Text>
                <View style={styles.excludeCard}>
                  {exclusions.map((item, index) => (
                    <View key={index} style={styles.includeRow}>
                      <Text style={styles.crossIcon}>✕</Text>
                      <Text style={styles.excludeText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {activeTab === 'itinerary' && (
            <View style={styles.tabContent}>
              {itinerary.map((day, index) => (
                <View key={index} style={styles.itineraryCard}>
                  <View style={styles.dayBadge}>
                    <Text style={styles.dayBadgeText}>Day {day.day}</Text>
                  </View>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                  
                  <View style={styles.activitiesSection}>
                    <Text style={styles.activitiesLabel}>Activities:</Text>
                    {day.activities.map((activity, actIndex) => (
                      <View key={actIndex} style={styles.activityRow}>
                        <View style={styles.activityDot} />
                        <Text style={styles.activityText}>{activity}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.mealsRow}>
                    <Text style={styles.mealsIcon}>🍽️</Text>
                    <Text style={styles.mealsText}>{day.meals}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.tabContent}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.reviewsRating}>{destination.rating} ⭐</Text>
                <Text style={styles.reviewsCount}>Based on {reviews.length} reviews</Text>
              </View>

              {reviews.map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.avatarText}>{review.avatar}</Text>
                    </View>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                    <View style={styles.reviewRating}>
                      <Text style={styles.reviewRatingText}>⭐ {review.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>₹{destination.price.toLocaleString()}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.contactButtonText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('Booking', { destination })}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent]}
              style={styles.bookGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGradient: {
    paddingTop: SPACING.xxl + 10,
    paddingBottom: SPACING.m,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.m,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginHorizontal: SPACING.m,
  },
  floatingBack: {
    position: 'absolute',
    top: SPACING.xxl + 10,
    left: SPACING.l,
    width: 44,
    height: 44,
    borderRadius: RADIUS.m,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
    ...SHADOWS.medium,
  },
  floatingBackText: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: width,
    height: height * 0.5,
    backgroundColor: COLORS.lightGray,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  mainCard: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xxl + 8,
    borderTopRightRadius: RADIUS.xxl + 8,
    marginTop: -32,
    paddingTop: SPACING.l,
    paddingHorizontal: SPACING.l,
    paddingBottom: 100,
  },
  titleSection: {
    marginBottom: SPACING.l,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.m,
  },
  categoryText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  destinationName: {
    fontSize: SIZES.xxLarge + 4,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.s,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    fontWeight: '500',
  },
  ratingBadge: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.full,
    ...SHADOWS.small,
  },
  ratingText: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.dark,
  },
  quickInfoGrid: {
    flexDirection: 'row',
    gap: SPACING.m,
    marginBottom: SPACING.l,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.m,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  quickInfoIcon: {
    fontSize: 32,
    marginBottom: SPACING.s,
  },
  quickInfoLabel: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  quickInfoValue: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.dark,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xs,
    marginBottom: SPACING.l,
    ...SHADOWS.small,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.s + 2,
    alignItems: 'center',
    borderRadius: RADIUS.m,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.gray,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  tabContent: {
    marginBottom: SPACING.l,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    lineHeight: 24,
  },
  highlightsList: {
    gap: SPACING.s,
  },
  highlightItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.m,
    borderRadius: RADIUS.m,
    ...SHADOWS.small,
  },
  highlightText: {
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontWeight: '500',
  },
  includeCard: {
    backgroundColor: COLORS.success + '10',
    borderRadius: RADIUS.m,
    padding: SPACING.m,
  },
  excludeCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
  },
  includeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  checkIcon: {
    fontSize: SIZES.medium,
    color: COLORS.success,
    fontWeight: '700',
    marginRight: SPACING.s,
    width: 20,
  },
  crossIcon: {
    fontSize: SIZES.medium,
    color: COLORS.error,
    fontWeight: '700',
    marginRight: SPACING.s,
    width: 20,
  },
  includeText: {
    fontSize: SIZES.font,
    color: COLORS.dark,
    flex: 1,
  },
  excludeText: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    flex: 1,
  },
  itineraryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  dayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.s,
  },
  dayBadgeText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.white,
  },
  dayTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  activitiesSection: {
    marginBottom: SPACING.m,
  },
  activitiesLabel: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: SPACING.s,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: SPACING.s,
  },
  activityText: {
    fontSize: SIZES.font,
    color: COLORS.dark,
    flex: 1,
  },
  mealsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.s,
    borderRadius: RADIUS.m,
  },
  mealsIcon: {
    fontSize: SIZES.medium,
    marginRight: SPACING.s,
  },
  mealsText: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontWeight: '500',
  },
  reviewsHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.l,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  reviewsRating: {
    fontSize: SIZES.xxxLarge,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  reviewsCount: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  reviewAvatar: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  avatarText: {
    fontSize: SIZES.xLarge,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  reviewDate: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  reviewRating: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.s,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.m,
  },
  reviewRatingText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.dark,
  },
  reviewComment: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    ...SHADOWS.large,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  priceValue: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.s,
  },
  contactButton: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.l,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.small,
  },
  contactButtonText: {
    fontSize: SIZES.xLarge,
  },
  bookButton: {
    borderRadius: RADIUS.l,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  bookGradient: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.m + 2,
  },
  bookButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default DestinationDetailScreen;