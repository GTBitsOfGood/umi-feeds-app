import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Button } from 'react-native';

import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function DonationsList() {
  const [isLoading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get('/api/donations')
      .then((res) => setDonations(res.data.donations))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const wait = (timeout:number) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get('/api/donations')
      .then((res) => setDonations(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const text = `Donations: \n ${JSON.stringify(donations)}`;

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
        <Text>{text}</Text>
      </ScrollView>
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
});
