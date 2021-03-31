import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function DonationsList() {
  const [isLoading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get<{ donations: Donation[] }>('/api/donations')
      .then((res) => setDonations(res.data.donations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const wait = (timeout:number) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get<{ donations: Donation[] }>('/api/donations')
      .then((res) => setDonations(res.data.donations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // need to fix refresh
  const donationList = isLoading ? [] : donations.map((donation) => (
    <DonationListBox
      key={donation._id}
      {...donation}
    />
  ));

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.title}>Donations List</Text>
        <Text>Pull down to see RefreshControl indicator</Text>
        <Button
          title="refresh"
          onPress={onRefresh}
        />
        {donationList}
      </ScrollView>
    </View>
  );
}

function DonationListBox(donation:Donation) {
  const navigation = useNavigation();
  return (
    <View style={styles.donationContainer}>
      <Text
        onPress={() => navigation.navigate('DetailDonation', {
          donationId: donation._id,
          startTime: donation.availability.startTime,
          endTime: donation.availability.endTime,
          description: donation.description,
          images: donation.descriptionImages,
          weight: donation.weight,
          pickup: donation.donor.donorInfo
        })
      }
      >
        {donation.description}
      </Text>
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
