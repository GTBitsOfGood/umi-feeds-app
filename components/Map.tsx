import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import axios from 'axios';
import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function Map() {
  // get available pick up locations
  const [isLoading, setLoading] = useState<boolean>(true);
  const [availablePickup, setAvailablePickup] = useState<Array<Donation>>([]);

  useEffect(() => {
    axios.get('/api/available-pickup')
      .then((res) => setAvailablePickup(res.data.donation))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // get user location
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLocation(await Location.getCurrentPositionAsync({}));
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `My latitude: ${location.coords.latitude} \n My longitude: ${location.coords.longitude} \n\n JSON Junk: ${JSON.stringify(location)}`;
  }

  let userLocation: JSX.Element | [];
  if (location != null) {
    userLocation = (
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }}
        pinColor="blue"
        title="My Location"
        description="current"
      />
    );
  } else {
    userLocation = [];
  }

  let pickUps: Array<JSX.Element> | [];
  if (isLoading === true) {
    pickUps = [];
  } else {
    pickUps = availablePickup.map((marker) => {
      const myMarker = (
        <Marker
          key={marker._id}
          coordinate={{
            latitude: marker.donor.latitude,
            longitude: marker.donor.longitude,
          }}
          title={marker.donor.name}
          description={marker.description}
        />
      );
      return myMarker;
    });
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // latitude: userLocation.latitude,
          // longitude: userLocation.longitude,
          latitude: 33.7490,
          longitude: -84.3880,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation}
        {pickUps}
        <Text>{text}</Text>
        <Text>{text}</Text>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
