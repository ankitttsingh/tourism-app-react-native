import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Linking, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS, SPACING, RADIUS } from '../styles/theme';
import { DESTINATIONS, SERVICES, COMPANY_INFO } from '../data/destinations';
import { AntDesign } from '@expo/vector-icons';
import Button from '../components/Button';

const OpenExternalLink = ({ url, children }) => {
  const handlePress = async () => {
    // Check if the device knows how to open the URL
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: 'blue', textDecorationLine: 'none' }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const featuredDestinations = DESTINATIONS.slice(0, 4);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section with Animated Content */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark, COLORS.accent]}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View
            style={[
              styles.heroContent,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.heroTitle}>{COMPANY_INFO.name}</Text>
            <Text style={styles.heroSubtitle}>{COMPANY_INFO.tagline}</Text>

            {/* Modern Search Bar with Glassmorphism */}
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Where do you want to go?"
                  placeholderTextColor={COLORS.gray}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>→</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Decorative Circles */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Destinations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Happy Travelers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8⭐</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[COLORS.white, COLORS.background]}
                  style={styles.serviceGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.serviceIconWrapper}>
                    <Text style={styles.serviceIcon}>
                      {service.icon === 'bed' && '🏨'}
                      {service.icon === 'airplane' && '✈️'}
                      {service.icon === 'map' && '🗺️'}
                      {service.icon === 'car' && '🚗'}
                    </Text>
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDesc}>{service.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Featured</Text>
              <Text style={styles.sectionSubtitle}>Most popular places</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Destinations')}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Text style={styles.viewAllArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.destinationsScroll}
          >
            {featuredDestinations.map((destination, index) => (
              <TouchableOpacity
                key={destination.id}
                style={[styles.destinationCard, index === 0 && styles.firstCard]}
                onPress={() => navigation.navigate('DestinationDetail', { destination })}
                activeOpacity={0.9}
              >
                <Image
                  source={destination.image}
                  style={styles.destinationImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={styles.destinationGradient}
                >
                  <View style={styles.destinationBadge}>
                    <Text style={styles.destinationRating}>⭐ {destination.rating}</Text>
                  </View>
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{destination.name}</Text>
                    <Text style={styles.destinationLocation}>
                      📍 {destination.location}
                    </Text>
                    <View style={styles.destinationFooter}>
                      <Text style={styles.destinationPrice}>
                        ₹{destination.price.toLocaleString()}
                      </Text>
                      <View style={styles.destinationTag}>
                        <Text style={styles.destinationTagText}>{destination.duration}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.primaryCtaCard}
            onPress={() => navigation.navigate('Booking')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent]}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.ctaIcon}>🎫</Text>
              <Text style={styles.ctaTitle}>Book Your Trip</Text>
              <Text style={styles.ctaSubtitle}>Special offers available</Text>
              <View style={styles.ctaArrow}>
                <Text style={styles.ctaArrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryCtaCard}
            onPress={() => navigation.navigate('Contact')}
            activeOpacity={0.9}
          >
            <View style={styles.secondaryCtaContent}>
              <Text style={styles.secondaryCtaIcon}>💬</Text>
              <Text style={styles.secondaryCtaTitle}>Need Help?</Text>
              <Text style={styles.secondaryCtaSubtitle}>Contact our travel experts</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.secondaryCtaContent}>
          <Text style={styles.secondaryCtaTitle}>Made with ❤️</Text>

          <OpenExternalLink url="https://www.linkedin.com/in/ankittchaudhary/">
            <View style={styles.linkRow}>
              <AntDesign name="linkedin" size={16} color="#0A66C2" />
              <Text style={styles.linkText}> By Ankit Chaudhary</Text>
            </View>
          </OpenExternalLink>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    minHeight: height * 0.5,
    paddingTop: SPACING.xxl + 20,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.l,
    overflow: 'hidden',
  },
  heroContent: {
    zIndex: 10,
  },
  welcomeText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.s,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: SIZES.large,
    color: COLORS.white,
    opacity: 0.95,
    marginBottom: SPACING.xl,
    fontWeight: '400',
  },
  searchWrapper: {
    marginTop: SPACING.m,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: RADIUS.l,
    paddingLeft: SPACING.m,
    height: 56,
    ...SHADOWS.large,
  },
  searchIcon: {
    fontSize: SIZES.xLarge,
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.dark,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: RADIUS.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontWeight: '600',
  },
  circle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -50,
    right: -50,
  },
  circle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: 50,
    left: -30,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: -30,
    marginHorizontal: SPACING.l,
    marginBottom: SPACING.l,
    gap: SPACING.m,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.l,
    padding: SPACING.m,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  statNumber: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.l,
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  sectionTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: '800',
    color: COLORS.dark,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginTop: SPACING.xs,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '15',
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.m,
    borderRadius: RADIUS.full,
  },
  viewAllText: {
    fontSize: SIZES.font,
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  viewAllArrow: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '700',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.m,
  },
  serviceCard: {
    width: (width - SPACING.l * 2 - SPACING.m) / 2,
    height: 160,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  serviceGradient: {
    flex: 1,
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  serviceIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIcon: {
    fontSize: 28,
  },
  serviceTitle: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  serviceDesc: {
    fontSize: SIZES.xs,
    color: COLORS.gray,
    lineHeight: 16,
  },
  destinationsScroll: {
    paddingRight: SPACING.l,
  },
  destinationCard: {
    width: width * 0.7,
    height: 400,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    marginRight: SPACING.m,
    ...SHADOWS.large,
  },
  firstCard: {
    marginLeft: 0,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  destinationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.full,
  },
  destinationRating: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.dark,
  },
  destinationInfo: {
    marginBottom: SPACING.s,
  },
  destinationName: {
    fontSize: SIZES.xxLarge,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  destinationLocation: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.m,
  },
  destinationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationPrice: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.white,
  },
  destinationTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: RADIUS.m,
  },
  destinationTagText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: SPACING.l,
    paddingBottom: SPACING.xxl,
    gap: SPACING.m,
  },
  primaryCtaCard: {
    height: 180,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    ...SHADOWS.colored,
  },
  ctaGradient: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  ctaIcon: {
    fontSize: 40,
    marginBottom: SPACING.m,
  },
  ctaTitle: {
    fontSize: SIZES.xxLarge,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  ctaSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
  },
  ctaArrow: {
    position: 'absolute',
    top: SPACING.xl,
    right: SPACING.xl,
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaArrowText: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    fontWeight: '700',
  },
  secondaryCtaCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  secondaryCtaContent: {
    padding: SPACING.xl,
  },
  secondaryCtaIcon: {
    fontSize: 40,
    marginBottom: SPACING.m,
  },
  secondaryCtaTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  secondaryCtaSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center', 
  },

  linkText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#202541ff',
    textDecorationLine: 'none',
  },


});

export default HomeScreen;