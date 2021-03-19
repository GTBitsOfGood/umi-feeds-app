import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Donation } from '../types';

export default function Map() {
  const navigation = useNavigation();
  // get available pick up locations
  const [isLoading, setLoading] = useState<boolean>(true);
  const [availablePickup, setAvailablePickup] = useState<Array<Donation>>([]);

  useEffect(() => {
    axios.get('/api/available-pickup')
      .then((res) => setAvailablePickup(res.data.donation))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const pickUps = isLoading ? [] : availablePickup.map((donation) => (
    <Marker
      key={donation._id}
      coordinate={{
        latitude: donation.donor.latitude,
        longitude: donation.donor.longitude,
      }}
      title={donation.donor.name}
      description={donation.description}
      onCalloutPress={() => {
        navigation.navigate('DonationDetails', {
          donationId: donation._id,
          otherParam: 'anything you want here',
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
