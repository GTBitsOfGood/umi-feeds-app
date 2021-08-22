import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'luxon';
import { Text } from '../components/Themed';
import { Donation } from '../types';
import { store } from '../redux/store';
import { logAxiosError } from '../utils';

export default function DonationsList() {
  const [isLoading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get<{ donations: Donation[] }>('/api/donations', { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } })
      .then((res) => setDonations(res.data.donations))
      .catch((error) => logAxiosError(error))
      .finally(() => setLoading(false));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get<{ donations: Donation[] }>('/api/donations', { headers: { Authorization: `Bearer ${store.getState().auth.jwt}` } })
      .then((res) => {
        setDonations(res.data.donations);
        setRefreshing(false);
      })
      .catch((error) => logAxiosError(error))
      .finally(() => setLoading(false));
  }, []);

  const ongoingDonations: JSX.Element[] = [];
  const pastDonations: JSX.Element[] = [];
  if (!isLoading) {
    donations.forEach((donation) => {
      if (donation.pickup !== undefined && 'pickupTime' in donation.pickup) {
        pastDonations.push(<DonationListBox
          key={donation._id}
          {...donation}
        />);
      } else {
        ongoingDonations.push(<DonationListBox
          key={donation._id}
          {...donation}
        />);
      }
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.title}>All Donations</Text>
        <Text style={styles.subtitle}>Ongoing Donations</Text>
        {ongoingDonations}
        <Text style={styles.subtitle}>Completed Donations</Text>
        {pastDonations}
      </ScrollView>
    </View>
  );
}

function DonationListBox(donation: Donation) {
  const navigation = useNavigation();
  const endTime = DateTime.fromISO(donation.availability.endTime).toLocaleString(DateTime.DATETIME_MED);
  let pickupTime = 'TBA';
  let color = '#FC8834';
  if (donation.pickup !== undefined && 'pickupTime' in donation.pickup) {
    pickupTime = DateTime.fromISO(donation.pickup.pickupTime).toLocaleString(DateTime.TIME_SIMPLE);
    color = '#3E3E3E';
  }
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20,
        padding: 10,
        borderColor: color,
      }}
    >
      <View style={{ flex: 1, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color, fontSize: 18, fontWeight: 'bold' }}>{endTime}</Text>
        <Text
          style={{ color: '#4B78CB', fontSize: 16, fontWeight: 'bold' }}
          onPress={() => navigation.navigate('DetailDonation', {
            donation
          })}
        >
          View ⟩
        </Text>
      </View>
      <View style={{ flex: 1, marginBottom: 10 }}>
        <Text style={{ color, fontSize: 14 }}>{donation.description}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color, fontSize: 14 }}>{`Picked up at: ${pickupTime}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    width: '80%',
    margin: '10%',
    paddingBottom: 35,
  },
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FC8834',
    paddingVertical: 10,
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 23,
    color: '#3E3E3E',
    marginBottom: 20,
    marginTop: 10,
  }
});
