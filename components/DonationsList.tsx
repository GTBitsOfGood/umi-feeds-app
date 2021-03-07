import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Button } from 'react-native';

import { Text } from '../components/Themed';
import { Donation } from '../types';

export default function DonationsList() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<Array<Donation>>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  //   useEffect(() => {
  //     axios.get('http://localhost:3000/api/donations')
  //       .then((data) => setDonations(data.donations))
  //       .catch((error) => console.error(error))
  //       .finally(() => setLoading(false));
  //   }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/donations')
      .then((response) => response.json())
      .then((data) => setDonations(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const wait = (timeout:number) => new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch('http://localhost:3000/api/donations')
      .then((response) => response.json())
      .then((data) => setDonations(data))
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
          onPress={() => {
            fetch('http://localhost:3000/api/donations')
              .then((response) => response.json())
              .then((data) => setDonations(data))
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          }}
        />
        <Text>{text}</Text>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
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
