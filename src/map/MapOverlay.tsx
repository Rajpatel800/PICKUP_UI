import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

export interface MapOverlayProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'center' | 'absolute';
  style?: StyleProp<ViewStyle>;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
}

export const MapOverlay: React.FC<MapOverlayProps> = ({ 
  children, 
  position = 'absolute', 
  style,
  pointerEvents = 'box-none'
}) => {
  return (
    <View 
      style={[
        styles.container, 
        position === 'top' && styles.positionTop,
        position === 'bottom' && styles.positionBottom,
        position === 'center' && styles.positionCenter,
        style
      ]}
      pointerEvents={pointerEvents}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  positionTop: {
    justifyContent: 'flex-start',
  },
  positionBottom: {
    justifyContent: 'flex-end',
  },
  positionCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
