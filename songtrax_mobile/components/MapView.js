import React, { useState,useRef, useEffect } from "react";
import { StyleSheet, Appearance, View, SafeAreaView, Text, Image, Platform } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from 'songtrax_mobile/data/styles.js';
import axios from 'axios';
import * as Location from 'expo-location';
import { getDistance } from "geolib";
import LocationSongs from 'songtrax_mobile/screens/nearme.js';


// Define Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,

        width: '100%', height: '100%',
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: "black",
    },
    nearbyLocationView: {
        padding: 25,
    },
    nearbyLocationText: {
        color: "white",
        lineHeight: 25,
    },
});

// Get light or dark mode

// Component for displaying nearest location and whether it's within 100 meters
function NearbyLocation(props) {
    if (props.id) {
        return (
            <SafeAreaView style={styles.nearbyLocationSafeAreaView}>
                <View style={styles.nearbyLocationView}>
                    <Text style={styles.nearbyLocationText}>
                        {props.id}
                    </Text>
                    {props.distance && props.distance.nearby && (
                        <Text style={{ ...styles.nearbyLocationText, fontWeight: "bold" }}>
                            Within 100 Meters!
                        </Text>
                    )}
                </View>
            </SafeAreaView>
        );
    } else {
        return null; // Don't render if there's no location data
    }
}

export default function ShowMap() {
   const mapRef = useRef(null);
   const { getColorScheme } = Appearance
   const colorScheme = getColorScheme()
   let isDark = getColorScheme() == 'dark'
    const initialMapState = {
        locationPermission: false,
        locations: [],
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163,
            // Starts at "Indooroopilly Shopping Centre"
        },
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        nearbyLocation: null,
    };
       const [mapState, setMapState] = useState(initialMapState);
       const [dataLoaded, setDataLoaded] = useState(false); // Add this state



    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await axios.get("https://comp2140.uqcloud.net/api/location/?api_key=zjJNYUbFOh");
                const fetchedLocations = response.data;

                const updatedLocations = fetchedLocations.map(location => {
                    location.coordinates = {
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude),
                    };
                    return location;
                });

                setMapState({
                    ...mapState,
                    locations: updatedLocations,
                    locationPermission: true,
                });

                setDataLoaded(true); // Mark data as loaded
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        }

        fetchLocations();
    }, []);
    const mapCustomStyle = [{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }]

    useEffect(() => {
        function calculateDistance(userLocation) {
            const nearestLocations = mapState.locations.map(location => {
                const meters = getDistance(
                    userLocation,
                    location.coordinates
                );
                location["distance"] = {
                    meters: meters,
                    nearby: meters <= 100,
                };
                return location;
            }).sort((previousLocation, thisLocation) => {
                return previousLocation.distance.meters - thisLocation.distance.meters;
            });
            return nearestLocations[0];
        }
        let subscription; // Define the subscription variable

        if (mapState.locationPermission) {
            subscription = Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                distanceInterval: 10, // in meters
            }, location => {
                const userLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
                const nearbyLocation = calculateDistance(userLocation);
                setMapState({
                    ...mapState,
                    userLocation,
                    nearbyLocation: nearbyLocation,
                });
            });
        }

        return () => {
            if (subscription && subscription.remove) { // Check if subscription and remove function exist
                subscription.remove();
            }
        };
    }, [mapState.locationPermission]);


    return (
        <>
            <MapView
                zoomEnabled
                zoomControlEnabled
                ref={mapRef}
                pitchEnabled
                camera={{
                    center: mapState.userLocation,
                    pitch: 0,
                    heading: 0,
                    altitude: 3000,
                    zoom: 15,
                }}
                showsUserLocation={mapState.locationPermission}
                customMapStyle={isDark && mapCustomStyle}
                style={styles.container}
                provider={PROVIDER_GOOGLE}
            >
                {mapState.locations.map(location => (
                    <Circle
                        key={location.id}
                        center={location.coordinates}
                        radius={100}
                        strokeWidth={3}
                        strokeColor="#A42DE8"
                        fillColor={colors[colorScheme].fgColorLighter}
                    />
                ))}
            </MapView>
            <NearbyLocation {...mapState.nearbyLocation} />

        </>
    );
}
