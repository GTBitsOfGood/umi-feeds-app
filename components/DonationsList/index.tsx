import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DateTime } from 'luxon';
import { Text } from '../../style/Themed';
import { Donation, DonationsListScreenParamList } from '../../types';
import { store } from '../../redux/store';
import { logAxiosError } from '../../utils';
import styles from './styles';

type DonationListBoxProps = StackNavigationProp<DonationsListScreenParamList, 'DonationsListScreen'>

export default function DonationsList() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
  const navigation = useNavigation<DonationListBoxProps>();
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
