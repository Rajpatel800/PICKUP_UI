import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable,  FlatList } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { languages } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import type { AccountScreenProps } from '../../types/navigation';

export interface SettingsLanguageScreenProps {
  readonly navigation: AccountScreenProps<'LanguageSelection'>['navigation'];
  readonly testID?: string;
}

export const SettingsLanguageScreen: React.FC<SettingsLanguageScreenProps> = ({
  navigation,
  testID,
}) => {
  const [selected, setSelected] = useState('en');

  const handleSave = useCallback(() => {
    // Mock: save language preference via service layer in production
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title="Language"
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = selected === item.id;
          return (
            <Pressable
              style={[styles.row, isSelected && styles.rowSelected]}
              onPress={() => setSelected(item.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
            >
              <View style={styles.labelGroup}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.nativeLabel}>{item.initial}</Text>
              </View>
              {isSelected ? (
                <Icon name="check_circle" style={styles.checkIcon} />
              ) : (
                <View style={styles.unselectedCircle} />
              )}
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <PrimaryButton
        label="SAVE"
        onPress={handleSave}
        style={styles.saveButton}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  listContent: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.containerPadding,
    paddingHorizontal: spacing.gutter,
    borderRadius: borderRadius.sm,
  },
  rowSelected: {
    backgroundColor: colors.primaryContainer,
  },
  labelGroup: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  nativeLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  checkIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  unselectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.outline,
  },
  separator: {
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  saveButton: {
    marginHorizontal: spacing.containerPadding,
    marginBottom: spacing.lg,
  },
});

export default SettingsLanguageScreen;
