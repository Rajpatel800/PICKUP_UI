import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

export interface SocialButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress }) => {
  const isGoogle = provider === 'google';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isGoogle ? styles.googleButton : styles.appleButton
      ]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        {/* Simple text placeholder for logo */}
        <Text style={[styles.iconText, isGoogle ? styles.googleIconText : styles.appleIconText]}>
          {isGoogle ? 'G' : ''}
        </Text>
        <Text style={[
          styles.text,
          isGoogle ? styles.googleText : styles.appleText
        ]}>
          Continue with {isGoogle ? 'Google' : 'Apple'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',
  },
  googleButton: {
    backgroundColor: colors.surfaceContainerLowest,
    borderColor: colors.outlineVariant,
  },
  appleButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  googleIconText: {
    color: '#DB4437', // Google red approximation
  },
  appleIconText: {
    color: colors.onPrimary,
    fontSize: 20,
    marginTop: -2, // Optical alignment for Apple logo character
  },
  text: {
    ...typography.bodyMd,
    fontWeight: '600',
  },
  googleText: {
    color: colors.onSurface,
  },
  appleText: {
    color: colors.onPrimary,
  },
});

export default SocialButton;
