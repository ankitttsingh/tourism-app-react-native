import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { COLORS, SIZES, SPACING, SHADOWS } from '../styles/theme';
import { TOUR_PACKAGES } from '../data/destinations';
import Button from '../components/Button';

const BookingScreen = ({ navigation, route }) => {
  const preSelectedDestination = route?.params?.destination;

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (!selectedPackage && !preSelectedDestination) {
      Alert.alert('Select Package', 'Please select a tour package');
      return;
    }

    // Show success message
    Alert.alert(
      'Booking Request Submitted! 🎉',
      `Thank you ${formData.name}! We'll contact you shortly to confirm your booking.`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({
              name: '',
              email: '',
              phone: '',
              guests: '1',
              date: '',
            });
            setSelectedPackage(null);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Trip</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Pre-selected Destination */}
        {preSelectedDestination && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selected Destination</Text>
            <View style={styles.selectedCard}>
              <Image
                source={preSelectedDestination.image }
                style={styles.selectedImage}
              />
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedName}>{preSelectedDestination.name}</Text>
                <Text style={styles.selectedLocation}>
                  📍 {preSelectedDestination.location}
                </Text>
                <Text style={styles.selectedPrice}>
                  ₹{preSelectedDestination.price.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Tour Packages */}
        {!preSelectedDestination && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Tour Package</Text>
            {TOUR_PACKAGES.map((pkg) => (
              <TouchableOpacity
                key={pkg.id}
                style={[
                  styles.packageCard,
                  selectedPackage?.id === pkg.id && styles.packageCardSelected,
                ]}
                onPress={() => setSelectedPackage(pkg)}
              >
                <Image source={pkg.image } style={styles.packageImage} />
                <View style={styles.packageContent}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  <Text style={styles.packageDuration}>⏱️ {pkg.duration}</Text>
                  <Text style={styles.packageDestinations}>
                    📍 {pkg.destinations.join(' → ')}
                  </Text>
                  <Text style={styles.packagePrice}>
                    ₹{pkg.price.toLocaleString()}
                  </Text>
                </View>
                {selectedPackage?.id === pkg.id && (
                  <View style={styles.selectedBadge}>
                    <Text style={styles.selectedBadgeText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Booking Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.gray}
              value={formData.name}
              onChangeText={(val) => handleInputChange('name', val)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) => handleInputChange('email', val)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 1234567890"
              placeholderTextColor={COLORS.gray}
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(val) => handleInputChange('phone', val)}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Number of Guests</Text>
              <TextInput
                style={styles.input}
                placeholder="1"
                placeholderTextColor={COLORS.gray}
                keyboardType="number-pad"
                value={formData.guests}
                onChangeText={(val) => handleInputChange('guests', val)}
              />
            </View>

            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Preferred Date</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor={COLORS.gray}
                value={formData.date}
                onChangeText={(val) => handleInputChange('date', val)}
              />
            </View>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Price Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Package Price</Text>
            <Text style={styles.summaryValue}>
              ₹
              {(
                preSelectedDestination?.price ||
                selectedPackage?.price ||
                0
              ).toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Number of Guests</Text>
            <Text style={styles.summaryValue}>×{formData.guests}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹
              {(
                (preSelectedDestination?.price || selectedPackage?.price || 0) *
                parseInt(formData.guests || 1)
              ).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Book Button */}
        <Button
          title="Submit Booking Request"
          variant="primary"
          size="large"
          onPress={handleBooking}
          style={styles.bookButton}
        />

        <Text style={styles.note}>
          * Our team will contact you within 24 hours to confirm your booking
        </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.xxl + 10,
    paddingBottom: SPACING.m,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: SIZES.xLarge,
    color: COLORS.dark,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: '700',
    color: COLORS.dark,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.l,
    paddingBottom: SPACING.xxl,
  },
  section: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  selectedCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  selectedImage: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.lightGray,
  },
  selectedInfo: {
    flex: 1,
    padding: SPACING.m,
    justifyContent: 'center',
  },
  selectedName: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  selectedLocation: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SPACING.s,
  },
  selectedPrice: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
  },
  packageCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.m,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.white,
    ...SHADOWS.small,
  },
  packageCardSelected: {
    borderColor: COLORS.primary,
  },
  packageImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.lightGray,
  },
  packageContent: {
    padding: SPACING.m,
  },
  packageName: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.s,
  },
  packageDuration: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  packageDestinations: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SPACING.s,
  },
  packagePrice: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
  },
  selectedBadge: {
    position: 'absolute',
    top: SPACING.m,
    right: SPACING.m,
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.s,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.m + 2,
    fontSize: SIZES.medium,
    color: COLORS.dark,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  halfInput: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    ...SHADOWS.small,
  },
  summaryTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  summaryLabel: {
    fontSize: SIZES.font,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.dark,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SPACING.m,
  },
  totalLabel: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
  },
  totalValue: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bookButton: {
    marginBottom: SPACING.m,
  },
  note: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default BookingScreen;