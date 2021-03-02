import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';

import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import axios from 'axios';
import { Text } from '../components/Themed';

export default function Map() {
  // get available pick up locations
  const [isLoading, setLoading] = useState<boolean>(true);
  const [availablePickup, setAvailablePickup] = useState<Array<Donation>>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/available-pickup')
  //     .then((response) => response.json())
  //     .then((data) => setAvailablePickup(data.donation))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   axios.get<DonationsObject>('http://localhost:3000/api/available-pickup')
  //     .then((data) => setAvailablePickup(data.donation))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);
  // setAvailablePickup(tempGET);

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

  let userLocation: LatLng;
  if (location != null) {
    userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
  } else {
    userLocation = {
      latitude: 33.7756,
      longitude: -84.3963,
    };
  }

  const pickUps = tempGET.map((marker) => {
    // let dontationLocation = {
    //   latitude: marker.donor.latitude,
    //   longitude: marker.donor.longitude,
    // };
    // const key = marker._id;
    const myMarker = (
      <Marker
        key={marker._id}
        coordinate={{
          latitude: marker.donor.latitude,
          longitude: marker.donor.longitude,
        }}
      // title={marker.donor.name}
      // description={marker.description}
      />
    );
    return myMarker;
  });

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
        {/* <Marker
          coordinate={userLocation}
        /> */}
        {/* <Text>{text}</Text> */}
        {/* <Text>{text}</Text> */}
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

// Types needs for TypeScript
type LatLng = {
  latitude: number,
  longitude: number,
}

type Donation = {
  descriptionImages: Array<string>,
  foodImages: Array<string>,
  _id: string,
  donor: {
    _id: string,
    name: string,
    latitude: number,
    longitude: number
  },
  availability: {
    _id: string,
    startTime: string,
    endTime: string
  },
  description: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

type DonationsObject = {
  donation: Array<Donation>
}

// temporary json example
const tempGET = [
  {
    descriptionImages: [],
    foodImages: [],
    _id: '6032bd3592899332cc7b25d4',
    donor: {
      _id: '602bf82713e73d625cc0d522',
      name: 'Slutty Vegan',
      latitude: 43.142,
      longitude: -85.049
    },
    availability: {
      _id: '6032bd3592899332cc7b25d5',
      startTime: '2017-04-21T23:25:43.000Z',
      endTime: '2022-04-21T23:25:43.000Z'
    },
    description: 'Plenty of delicious Impossible Burgers 2.0',
    createdAt: '2021-02-21T20:06:13.164Z',
    updatedAt: '2021-02-21T20:06:13.164Z',
    __v: 0
  },
  {
    descriptionImages: [],
    foodImages: [],
    _id: '603916d94808d4576cfad301',
    donor: {
      _id: '603916bb4808d4576cfad300',
      name: 'BareBurger',
      latitude: 43.142,
      longitude: -85.049
    },
    availability: {
      _id: '603916d94808d4576cfad302',
      startTime: '2017-04-21T23:25:43.000Z',
      endTime: '2022-04-21T23:25:43.000Z'
    },
    description: 'BareBurger Impossible Burgers 2.0',
    createdAt: '2021-02-26T15:42:17.557Z',
    updatedAt: '2021-02-26T15:42:17.557Z',
    __v: 0
  },
  {
    descriptionImages: [],
    foodImages: [],
    _id: '603917eb580586365c208958',
    donor: {
      _id: '603916bb4808d4576cfad300',
      name: 'BareBurger',
      latitude: 43.142,
      longitude: -85.049
    },
    availability: {
      _id: '603917eb580586365c208959',
      startTime: '2017-04-21T23:25:43.000Z',
      endTime: '2022-04-21T23:25:43.000Z'
    },
    description: 'BareBurger Impossible Burgers 2.0',
    createdAt: '2021-02-26T15:46:51.993Z',
    updatedAt: '2021-02-26T15:46:51.993Z',
    __v: 0
  }
];
