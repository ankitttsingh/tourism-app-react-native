import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS, SPACING, RADIUS } from '../styles/theme';

const DestinationCard = ({ destination, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image 
        source={destination.image }
        style={styles.image}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.gradient}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ {destination.rating}</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{destination.category}</Text>
          </View>
          <Text style={styles.name}>{destination.name}</Text>
          <Text style={styles.location}>📍 {destination.location}</Text>
          
          <View style={styles.footer}>
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
  );
};

const styles = StyleSheet.create({
  card: {
    height: 320,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    marginBottom: SPACING.m,
    ...SHADOWS.large,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: SPACING.m,
    justifyContent: 'space-between',
  },
  badge: {
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
  content: {
    marginBottom: SPACING.s,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent + '40',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.m,
    marginBottom: SPACING.s,
  },
  categoryText: {
    fontSize: SIZES.xs,
    fontWeight: '700',
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: SIZES.xLarge + 2,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
    letterSpacing: -0.5,
  },
  location: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SPACING.m,
  },
  footer: {
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
});

export default DestinationCard;