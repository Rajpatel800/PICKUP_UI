import React from 'react';
import { View, Text, StyleSheet,  FlatList } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../../theme';
import { mockNotifications } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { NotificationCard } from '../../components/molecules/NotificationCard';
import type { HomeScreenProps } from '../../types/navigation';

export interface NotificationCenterScreenProps {
  readonly navigation: HomeScreenProps<'NotificationCenter'>['navigation'];
  readonly testID?: string;
}

export const NotificationCenterScreen: React.FC<NotificationCenterScreenProps> = ({
  navigation,
  testID,
}) => {
  const renderItem = ({ item }: { item: typeof mockNotifications[number] }) => (
    <NotificationCard
      title={item.title}
      description={item.description}
      timestamp={item.timestamp}
      iconName={item.iconName}
      isRead={item.isRead}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icon name="notifications_none" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptyText}>You're all caught up!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title="Notifications"
        onBackPress={() => navigation.goBack()}
        showBackButton
      />
      <FlatList
        data={mockNotifications as unknown as typeof mockNotifications[number][]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  list: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.outline,
  },
  emptyTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  emptyText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
});

export default NotificationCenterScreen;
