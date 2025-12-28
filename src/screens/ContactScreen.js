import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SPACING, SHADOWS } from '../styles/theme';
import { COMPANY_INFO } from '../data/destinations';
import Button from '../components/Button';

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Message Sent! ✉️',
      `Thank you ${formData.name}! We'll get back to you within 24 hours.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setFormData({ name: '', email: '', subject: '', message: '' });
          },
        },
      ]
    );
  };

  const handleCall = () => {
    Linking.openURL(`tel:${COMPANY_INFO.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${COMPANY_INFO.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${COMPANY_INFO.website}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.accent]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Get in Touch</Text>
          <Text style={styles.headerSubtitle}>
            We'd love to hear from you
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Info Cards */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.infoCard} onPress={handleCall}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>📞</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.phone}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoCard} onPress={handleEmail}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>✉️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.email}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>📍</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.address}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.infoCard} onPress={handleWebsite}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>🌐</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{COMPANY_INFO.website}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor={COLORS.gray}
              value={formData.name}
              onChangeText={(val) => handleInputChange('name', val)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
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
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="What's this about?"
              placeholderTextColor={COLORS.gray}
              value={formData.subject}
              onChangeText={(val) => handleInputChange('subject', val)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us more..."
              placeholderTextColor={COLORS.gray}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={formData.message}
              onChangeText={(val) => handleInputChange('message', val)}
            />
          </View>

          <Button
            title="Send Message"
            variant="primary"
            size="large"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow Us</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📷</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🐦</Text>
              <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Hours */}
        <View style={styles.hoursCard}>
          <Text style={styles.hoursTitle}>Business Hours</Text>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Monday - Friday</Text>
            <Text style={styles.hoursTime}>9:00 AM - 7:00 PM</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Saturday</Text>
            <Text style={styles.hoursTime}>10:00 AM - 5:00 PM</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Sunday</Text>
            <Text style={styles.hoursTime}>Closed</Text>
          </View>
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
  header: {
    paddingTop: SPACING.xxl + 10,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.l,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.m,
  },
  backIcon: {
    fontSize: SIZES.xLarge,
    color: COLORS.white,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: SIZES.xxxLarge,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: SPACING.s,
  },
  headerSubtitle: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    opacity: 0.9,
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
    fontSize: SIZES.xLarge,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    ...SHADOWS.small,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  icon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  infoValue: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.dark,
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
  textArea: {
    minHeight: 120,
    paddingTop: SPACING.m,
  },
  submitButton: {
    marginTop: SPACING.s,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  socialButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  socialIcon: {
    fontSize: 32,
    marginBottom: SPACING.s,
  },
  socialText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.dark,
  },
  hoursCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    ...SHADOWS.small,
  },
  hoursTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: SPACING.m,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  hoursDay: {
    fontSize: SIZES.font,
    color: COLORS.gray,
  },
  hoursTime: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.dark,
  },
});

export default ContactScreen;