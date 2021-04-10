import React from 'react';
import { View, Button } from 'react-native';
import DonationForm from '../components/DonationForm';

export default function EditDonation({ route, navigation }) {
  const { donation } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DonationForm donation={donation} />
    </View>

  );
}
