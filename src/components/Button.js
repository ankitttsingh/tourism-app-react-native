import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS, SPACING, RADIUS } from '../styles/theme';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  loading = false,
  disabled = false,
  icon = null,
  style = {},
  textStyle = {},
}) => {
  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        style={[styles.button, styles[`button_${size}`], style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.accent]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              {icon && <Text style={styles.icon}>{icon}</Text>}
              <Text style={[styles.text, styles.text_gradient, textStyle]}>{title}</Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.primary} />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.l,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
  },
  
  // Variants
  button_primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  button_secondary: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  button_accent: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  button_ghost: {
    backgroundColor: COLORS.primary + '15',
  },
  button_disabled: {
    backgroundColor: COLORS.lightGray,
    opacity: 0.6,
  },
  
  // Sizes
  button_small: {
    paddingVertical: SPACING.s + 2,
    paddingHorizontal: SPACING.m,
    borderRadius: RADIUS.m,
  },
  button_medium: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.l,
  },
  button_large: {
    paddingVertical: SPACING.m + 4,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.xl,
  },
  
  // Text styles
  text: {
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  text_primary: {
    color: COLORS.white,
  },
  text_secondary: {
    color: COLORS.primary,
  },
  text_accent: {
    color: COLORS.white,
  },
  text_outline: {
    color: COLORS.white,
  },
  text_ghost: {
    color: COLORS.primary,
  },
  text_gradient: {
    color: COLORS.white,
  },
  text_disabled: {
    color: COLORS.gray,
  },
  text_small: {
    fontSize: SIZES.small,
  },
  text_medium: {
    fontSize: SIZES.medium,
  },
  text_large: {
    fontSize: SIZES.large,
  },
  
  icon: {
    marginRight: SPACING.s,
    fontSize: SIZES.large,
  },
});

export default Button;