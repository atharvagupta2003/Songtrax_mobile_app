import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { getDistance } from "geolib";
import * as UserLocation from 'expo-location';


const LocationSongs = ({ navigation }) => {
  const [locationSongs, setLocationSongs] = useState([]);
  const [Songs, setSongs] = useState([]);
    const initialMapState = {
        locations: [],
        userLocation: {
            latitude: -27.5263381,
            longitude: 153.0954163,
            // Starts at "Indooroopilly Shopping Centre"
        },
        nearbyLocation: null,
        Id: null,
        locationPermission: false,
    };

  const [mapState, setMapState] = useState(initialMapState);
  const [loading, setLoading] = useState(true);


      useEffect(() => {
          async function requestLocationPermission() {
              const { status } = await UserLocation.requestForegroundPermissionsAsync();
              if (status === 'granted') {
                      setMapState({
                          ...mapState,
                          locationPermission: true
                      });
              }
          }
          requestLocationPermission();
      }, []);

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

                setLoading(false); // Mark data as loaded
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        }

        fetchLocations();
    }, []);

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
            subscription = UserLocation.watchPositionAsync({
                accuracy: UserLocation.Accuracy.High,
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

  useEffect(() => {
    async function fetchLocationSongs() {
      try {

          const response = await axios.get(`https://comp2140.uqcloud.net/api/sampletolocation/?api_key=zjJNYUbFOh&location_id=2537`);
          setLocationSongs(response.data);
          setLoading(false);

      } catch (error) {
        console.error('Error fetching location songs:', error);
        setLoading(false);
      }
    }
    fetchLocationSongs();
  }, []);

  useEffect(() => {
    async function fetchSongs() {
      try {
          const id = locationSongs.id;
          const response = await axios.get(`https://comp2140.uqcloud.net/api/sample/?api_key=zjJNYUbFOh&id=${id}`);
          setLocationSongs(response.data);
          setLoading(false);

      } catch (error) {
        console.error('Error fetching location songs:', error);
        setLoading(false);
      }
    }
    fetchSongs();
  }, []);



  return (
    <View>
      {locationSongs.length === 0 ? (
        <Text>No songs available for the nearest location.</Text>
      ) : (
        <FlatList
          data={locationSongs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>Song ID: {item.sample_id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LocationSongs;
