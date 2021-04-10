import { DateTime } from 'luxon';
import { isEmpty } from 'lodash';
import React from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function DonationDetails({ route, navigation }: {
  route: RouteProp<{ params: {
    donation: Donation
  }}, 'params'>,
  // TODO: add a more specific generic type, following https://reactnavigation.org/docs/typescript
  navigation: StackNavigationProp<any>
}) {
  /* 2. Get the param */
  const { donation } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={styles.title}>Start Time:</Text>
      <Text>{DateTime.fromJSDate(new Date(donation.availability.startTime)).toLocaleString(DateTime.DATE_MED)}</Text>
      <Text style={styles.title}>End Time: </Text>
      <Text>{DateTime.fromJSDate(new Date(donation.availability.endTime)).toLocaleString(DateTime.DATE_MED)}</Text>
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
        {donation.pickup && `
Pickup at: ${donation.pickup.pickupTime}\n
Dropoff at: ${donation.pickup.dropoffTime}\n`}
        {donation.volunteer?.name
          ? `Picked up by: ${donation.volunteer.name}\n`
          : 'Not yet picked up'}
        {donation.pickupInstructions && `Pickup instructions: ${donation.pickupInstructions}`}
      </Text>
      <Button
        title="Edit Donation"
        onPress={() => navigation.navigate('EditDonation', {
          donation,
          otherParam: 'anything you want here',
        })}
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
