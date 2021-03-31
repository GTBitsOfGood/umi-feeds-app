import { DateTime } from 'luxon';
import React from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import { Text } from '../components/Themed';

export default function DonationDetails({ route, navigation }) {
  /* 2. Get the param */
  const { donationId } = route.params;
  const { startTime } = route.params;
  const { endTime } = route.params;
  const { description } = route.params;
  const { foodImages } = route.params;
  const { weight } = route.params;
  const { pickup } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={styles.title}>Start Time:</Text>
      <Text>{DateTime.fromJSDate(new Date(startTime)).toLocaleString(DateTime.DATE_MED)}</Text>
      <Text style={styles.title}>End Time: </Text>
      <Text>{DateTime.fromJSDate(new Date(endTime)).toLocaleString(DateTime.DATE_MED)}</Text>
      <Text style={styles.title}>Description:</Text>
      <Text>{description}</Text>
      {weight && (
      <Text>
        <Text style={styles.title}>Weight:</Text>
        <Text>{weight}</Text>
      </Text>
      )}
      {foodImages && <Text style={styles.title}>Images:</Text>}
      {foodImages && foodImages.map((image) => <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />)}
      <Text style={styles.title}>Pick Up Information:</Text>
      <Text>
        {pickup.name}
        {'\n'}
        {pickup.phone}
        {'\n'}
        {pickup.address}
        {'\n'}
      </Text>
      <Button
        title="Edit Donation"
        onPress={() => navigation.navigate('EditDonation', {
          donationId,
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
