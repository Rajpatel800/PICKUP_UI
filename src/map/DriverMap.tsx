import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { DriverMarker } from './DriverMarker';
import { PickupMarker } from './PickupMarker';
import { DropMarker } from './DropMarker';
import { RoutePolyline } from './RoutePolyline';
import { MapControls } from './MapControls';
import { colors } from '../theme';
import type { Coordinate, RouteData, MapRegion } from './types';

export interface DriverMapProps {
  currentLocation?: Coordinate;
  heading?: number;
  routeData?: RouteData;
  followDriver?: boolean;
  showControls?: boolean;
  onMapReady?: () => void;
  onRegionChangeComplete?: (region: MapRegion) => void;
  style?: object;
  testID?: string;
}

const DEFAULT_LATITUDE_DELTA = 0.02;
const DEFAULT_LONGITUDE_DELTA = 0.02;

export const DriverMap: React.FC<DriverMapProps> = ({
  currentLocation,
  heading,
  routeData,
  followDriver = false,
  showControls = true,
  onMapReady,
  onRegionChangeComplete,
  style,
  testID,
}) => {
  const mapRef = useRef<MapView>(null);
  const isMapReady = useRef(false);
  const hasInitialZoomed = useRef(false);

  // Initial region or fallback
  const initialRegion = currentLocation ? {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: DEFAULT_LATITUDE_DELTA,
    longitudeDelta: DEFAULT_LONGITUDE_DELTA,
  } : undefined;

  // Handle initial center and follow mode
  useEffect(() => {
    if (currentLocation && isMapReady.current && mapRef.current) {
      if (!hasInitialZoomed.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: DEFAULT_LATITUDE_DELTA,
          longitudeDelta: DEFAULT_LONGITUDE_DELTA,
        }, 1000);
        hasInitialZoomed.current = true;
      } else if (followDriver) {
        mapRef.current.animateCamera({
          center: currentLocation,
          heading: heading,
          pitch: 0,
        }, { duration: 1000 });
      }
    }
  }, [currentLocation, heading, followDriver]);

  // Fit route bounds if provided
  useEffect(() => {
    if (routeData?.bounds && isMapReady.current && mapRef.current) {
      hasInitialZoomed.current = true; // Prioritize route bounds over initial current location zoom
      mapRef.current.fitToCoordinates([
        routeData.bounds.northeast,
        routeData.bounds.southwest
      ], {
        edgePadding: { top: 100, right: 50, bottom: 100, left: 50 },
        animated: true,
      });
    }
  }, [routeData?.bounds]);

  const handleRecenter = () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      }, 1000);
    }
  };

  const handleMapReady = () => {
    isMapReady.current = true;
    onMapReady?.();
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={initialRegion}
        onMapReady={handleMapReady}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={false}
        mapType="standard"
        customMapStyle={mapStyle} // We can provide a dark mode / standard JSON style here later
      >
        {/* Route Polyline */}
        {routeData?.polylinePoints && (
          <RoutePolyline coordinates={routeData.polylinePoints} />
        )}

        {/* Stops */}
        {routeData?.stops.map((stop) => {
          if (stop.type === 'pickup') {
            return (
              <PickupMarker 
                key={stop.id} 
                coordinate={stop.coordinate} 
                label={stop.label} 
                isCurrent={stop.isCurrent} 
              />
            );
          } else {
            return (
              <DropMarker 
                key={stop.id} 
                coordinate={stop.coordinate} 
                label={stop.label} 
                isCurrent={stop.isCurrent} 
              />
            );
          }
        })}

        {/* Driver location */}
        {currentLocation && (
          <DriverMarker coordinate={currentLocation} heading={heading} />
        )}
      </MapView>

      {showControls && (
        <MapControls 
          onRecenter={currentLocation ? handleRecenter : undefined}
          // Add zoom logic if required by grabbing current region and animating
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
});

// Optional: Minimal custom map style to hide POIs, match brand, etc.
const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  }
];
