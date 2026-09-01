import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';

export interface ProfileHeaderProps {
  readonly name: string;
  readonly location: string;
  readonly avatarUrl?: string;
  readonly completionPercent: number;
  readonly completionLabel?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  location,
  avatarUrl,
  completionPercent,
  completionLabel = 'Profile Completion',
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Text style={styles.avatarPlaceholder}>
            {name.charAt(0).toUpperCase()}
          </Text>
        ) : (
          <Text style={styles.avatarPlaceholder}>
            {name.charAt(0).toUpperCase()}
          </Text>
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
      <View style={styles.completionContainer}>
        <View style={styles.completionHeader}>
          <Text style={styles.completionLabel}>{completionLabel}</Text>
          <Text style={styles.completionPercent}>{completionPercent}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${completionPercent}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.xs,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  avatarPlaceholder: {
    ...typography.headlineLg,
    color: colors.onPrimaryContainer,
  },
  name: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  location: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  completionContainer: {
    width: '100%',
    gap: spacing.unit,
    marginTop: spacing.xs,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completionLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  completionPercent: {
    ...typography.labelSm,
    fontWeight: '600',
    color: colors.primary,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
});

export default ProfileHeader;
