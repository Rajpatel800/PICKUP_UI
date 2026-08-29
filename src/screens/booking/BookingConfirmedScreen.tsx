import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Feather } from '@expo/vector-icons';

export interface BookingConfirmedScreenProps {
  readonly onCancel?: () => void;
}

const BookingConfirmedScreen: React.FC<BookingConfirmedScreenProps> = ({
  onCancel,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [progressAnim]);

  const scaleX = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 1],
  });

  const opacity = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1, 0],
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCNqQFkoYKnNnFAzyxakSUaqPfR_rXoth8KcCUfvZaqqLWEQuuRDxiHPircSK1GZ9Zhpsec_xrx19M_Q-_CQZkBte3TCMrSErPThJaoCsET164CCzdvfbAmYG5LuLGnLp7Fd0NT1WS4SnBwqHVj9WR4tUvPcRn4efryUMg4ycfMfUqLtv0ia484KLfLJp93_Z_-IH9Ly_S7LuWIQLTZqI28Iuzo5OzGwXqD3tW2aNelura2wQX8Ns3' }}
        style={styles.mapBackground}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <View style={styles.bottomSheet}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.dragHandle} />
          
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Feather name="check-circle" size={32} color={colors.onSecondaryContainer} />
            </View>
            
            <Text style={styles.title}>Booking Confirmed</Text>
            
            <Text style={styles.subtitle}>
              We are processing your request. Please stay on this screen.
            </Text>

            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    transform: [{ scaleX }, { translateX: -0.5 }], // approximate transform origin left
                    opacity,
                  },
                ]}
              />
            </View>

            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...shadows.elevated,
  },
  safeArea: {
    width: '100%',
  },
  dragHandle: {
    width: 48,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceVariant,
    alignSelf: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.xxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  title: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyLg.fontFamily,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing.xxxl,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: 48,
  },
  progressBar: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  cancelButton: {
    width: '100%',
    height: spacing.rowHeightStandard,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.secondary,
    fontFamily: typography.labelCaps.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: typography.labelCaps.letterSpacing,
  },
});

export default BookingConfirmedScreen;
