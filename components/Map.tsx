import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Donation } from '../types';
import { store } from '../redux/store';
import { logAxiosError } from '../utils';

export default function Map() {
  const navigation = useNavigation();
  // get available pick up locations
  const [isLoading, setLoading] = useState<boolean>(true);
  const [availablePickup, setAvailablePickup] = useState<Donation[]>([]);

  useEffect(() => {
    axios.get<{ donation: Donation[] }>('/api/available-pickup', { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } })
      .then((res) => setAvailablePickup(res.data.donation))
      .catch((error) => logAxiosError(error))
      .finally(() => setLoading(false));
  }, []);

  const pickUps = isLoading ? [] : availablePickup.map((donation) => (
    <Marker
      key={donation._id}
      coordinate={{
        latitude: donation.donor.donorInfo.latitude,
        longitude: donation.donor.donorInfo.longitude,
      }}
      title={donation.donor.donorInfo.name}
      description={donation.description}
      onCalloutPress={() => {
        navigation.navigate('DonationDetails', {
          donation
        });
      }}
    />
  ));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.7490,
          longitude: -84.3880,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {pickUps}
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
