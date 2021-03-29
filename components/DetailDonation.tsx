import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Dimensions } from 'react-native';
import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function DonationDetails({ route, navigation }) {
  /* 2. Get the param */
  const { donationId } = route.params;
  const { startTime } = route.params;
  const { endTime } = route.params;
  const { description } = route.params;
  const { images } = route.params;
  //const { weight } = route.params;
  const { pickup } = route.params;
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>
        Start Time: {DateTime.fromJSDate(new Date(startTime)).toLocaleString(DateTime.DATE_MED)}
        {"\n"}
        End Time: {DateTime.fromJSDate(new Date(endTime)).toLocaleString(DateTime.DATE_MED)}
        {"\n"}
        Description: {description}
        {"\n"}
        Images: {images}
        {"\n"}
        Pick Up Information: {pickup.name},{pickup.phone},{pickup.address}
      </Text>
          
      <Button title="Edit Donation" onPress={() => navigation.navigate('EditDonation', {
          donationId: donationId,
          otherParam: 'anything you want here',
        })} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  donationContainer: {
    flex: 1,
    fontSize: 20,
    width: Dimensions.get('window').width,
    height: 20,
    alignContent: 'space-around',
    alignSelf: 'center',
  }
});
