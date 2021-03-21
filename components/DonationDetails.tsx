import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Constants } from 'expo-constants';
import axios from 'axios';
import { Text } from '../components/Themed';
import donation from './donation.json';
import { Donation } from '../types';

export default function DonationDetails() {
  /* 2. Get the param */
  // const { donationId } = route.params;
  // const { otherParam } = route.params;
  // const [donation, setDonation] = useState([]);

  // useEffect(() => {
  //  axios.get('/api/donations/:donation_id')
  //    .then((res) => setDonation(res.data.donations))
  //    .catch((error) => console.error(error));
  // }, []);

  const blobToImage = (array: string[]) => new Promise((resolve) => {
    array.map(async (photo: unknown) => {
      const url = URL.createObjectURL(photo);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.src = url;
    });
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={styles.scrollView}>
        {donation.map((donation) => (
          <Text>
            {new Date(JSON.stringify(donation.pickup.pickupTime).replace(/['"]+/g, '')).toDateString()}
            {'\n'}
            On this day you donated
            {'\n'}
            Donation Description:
            {JSON.stringify(donation.description).replace(/['"]+/g, '')}
            {'\n'}
            <Text>
              Weight :
              {JSON.stringify(donation.weight).replace(/['"]+/g, '')}
              {'\n'}
              <Text>
                Description Images:
                {blobToImage(donation.descriptionImages)}
                {'\n'}
                <Text>
                  Food Images:
                  {JSON.stringify(donation.foodImages).replace(/['"]+/g, '')}

                </Text>
              </Text>
            </Text>
          </Text>

        ))}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
});
