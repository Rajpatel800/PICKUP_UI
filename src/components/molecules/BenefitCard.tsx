import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, borderRadius } from '../../theme';

export interface BenefitCardProps {
  readonly title: string;
  readonly description: string;
  readonly iconName: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  iconName,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      <View style={styles.iconContainer}>
        <Icon name={iconName} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.secondary,
  },
  content: {
    flex: 1,
    gap: spacing.unit,
  },
  title: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  description: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
});

export default BenefitCard;
