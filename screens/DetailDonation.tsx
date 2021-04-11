import { DateTime } from 'luxon';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Button, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { View, Text } from '../components/Themed';
import { Donation } from '../types';
import { logAxiosError } from '../utils';
import { store } from '../redux/store';

export default function DonationDetails({ route, navigation }: {
  route: RouteProp<{ params: {
    donation: Donation
  }}, 'params'>,
  // TODO: add a more specific generic type, following https://reactnavigation.org/docs/typescript
  navigation: StackNavigationProp<any>
}) {
  /* 2. Get the param */
  const [donation, setDonation] = useState(route.params.donation);

  function handleRefresh() {
    axios.get<{ donation: Donation }>(`/api/donations/${donation._id}`)
      .then((res) => setDonation(res.data.donation))
      .catch((err) => logAxiosError(err));
  }

  async function handlePickup() {
    try {
      await axios.post(`/api/donations/${donation._id}/reserve`, { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } });
      // await axios.post(`/api/donations/${donation._id}/pick-up`, { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } });
      // handleRefresh();
    } catch (err) {
      logAxiosError(err);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: '5%' }}>
      <Text style={styles.title}>Donor Availability:</Text>
      <Text>Start Time: {DateTime.fromJSDate(new Date(donation.availability.startTime)).toLocaleString(DateTime.DATETIME_FULL)}</Text>
      <Text>End Time: {DateTime.fromJSDate(new Date(donation.availability.endTime)).toLocaleString(DateTime.DATETIME_FULL)}</Text>
      <Text style={styles.title}>Description:</Text>
      <Text>{donation.description}</Text>
      {donation.weight && (
      <Text>
        <Text style={styles.title}>Weight:</Text>
        <Text>{donation.weight}</Text>
      </Text>
      )}
      {!isEmpty(donation.foodImages) && (
        <>
          <Text style={styles.title}>Images:</Text>
          {donation.foodImages.map((image) => <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />)}
        </>
      )}
      <Text style={styles.title}>Pick Up Information:</Text>
      <Text>
        {/* TODO: use Luxon to format the date in a nice way */}
        {donation.pickup?.pickupTime
          ? `Picked up from donor at: ${DateTime.fromISO(donation.pickup.pickupTime).toLocaleString(DateTime.DATETIME_FULL)}\n`
          : 'Not yet picked up\n'
        }
        {donation.pickup?.dropoffTime
          ? `Delivered to Umi Feeds at: ${DateTime.fromISO(donation.pickup.dropoffTime).toLocaleString(DateTime.DATETIME_FULL)}\n`
          : 'Not yet dropped off\n'
        }
        {donation.volunteer?.name
          ? `Picked up by: ${donation.volunteer.name}\n`
          : 'Not yet picked up by anyone'}
        {donation.pickupInstructions && `Pickup instructions: ${donation.pickupInstructions}`}
      </Text>
      <Button
        title="Edit Donation"
        onPress={() => navigation.navigate('EditDonation', {
          donation,
        })}
      />
      <Button
        title="Mark as picked up"
        onPress={handlePickup}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
});
