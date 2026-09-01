import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable,  FlatList } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { vehicleCategories } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import type { AuthScreenProps } from '../../types/navigation';

export interface VehicleSelectionScreenProps {
  readonly navigation: AuthScreenProps<'VehicleSelection'>['navigation'];
  readonly route: AuthScreenProps<'VehicleSelection'>['route'];
  readonly onComplete: (vehicleId: string, language: string) => void;
  readonly testID?: string;
}

export const VehicleSelectionScreen: React.FC<VehicleSelectionScreenProps> = ({
  navigation,
  route,
  onComplete,
  testID,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedId) {
      onComplete(selectedId, route.params.language);
    }
  };



  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title="VEHICLE TYPE"
        onBackPress={() => navigation.goBack()}
        showBackButton
        showDivider
      />
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Select your vehicle category to continue
        </Text>
        <FlatList
          data={vehicleCategories as unknown as typeof vehicleCategories[number][]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedId;
            return (
              <Pressable
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedId(item.id)}
                accessibilityRole="radio"
                accessibilityLabel={item.name}
                accessibilityState={{ selected: isSelected }}
              >
                <View style={styles.iconContainer}>
                  <Icon name={item.iconName} style={styles.icon} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                </View>
              </Pressable>
            );
          }}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <PrimaryButton
          label="CONTINUE"
          onPress={handleContinue}
          disabled={!selectedId}
          style={styles.continueButton}
        />
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
    paddingHorizontal: spacing.containerPadding,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  list: {
    paddingBottom: spacing.containerPadding,
  },
  separator: {
    height: spacing.gutter,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSelected: {
    backgroundColor: colors.primaryContainer,
  },
  icon: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
  },
  iconTextSelected: {
    color: colors.primary,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  continueButton: {
    marginBottom: spacing.lg,
    borderRadius: 100,
  },
});

export default VehicleSelectionScreen;

