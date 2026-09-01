import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, shadows } from '../../theme';

export interface TabItem {
  readonly key: string;
  readonly label: string;
  readonly iconName: string;
}

export interface BottomTabBarProps {
  readonly tabs: readonly TabItem[];
  readonly activeTab: string;
  readonly onTabPress: (key: string) => void;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <Icon name={tab.iconName} style={[isActive ? styles.iconActive : styles.iconInactive]} />
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingBottom: spacing.xs,
    ...shadows.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: 2,
  },
  icon: {
    fontSize: 24,
  },
  iconActive: {
    color: colors.primary,
  },
  iconInactive: {
    color: colors.outline,
  },
  label: {
    ...typography.labelSm,
    fontSize: 10,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  labelInactive: {
    color: colors.outline,
  },
});

export default BottomTabBar;
