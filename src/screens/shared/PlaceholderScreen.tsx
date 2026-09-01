import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../theme';
import { AppHeader } from '../../components/molecules/AppHeader';

export interface PlaceholderScreenProps {
  readonly title: string;
  readonly iconName: string;
  readonly testID?: string;
}

/**
 * Placeholder screen used for tab stacks that haven't been fully implemented yet.
 * Will be replaced with real screens in subsequent phases.
 */
export const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  iconName,
  testID,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader title={title} showBackButton={false} />
      <View style={styles.container}>
        <Icon name={iconName} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Coming in next phase</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.gutter,
  },
  icon: {
    fontSize: 48,
    color: colors.outline,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.outline,
  },
});

export default PlaceholderScreen;
