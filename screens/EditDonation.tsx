import React from 'react';
import { View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import DonationForm from '../components/DonationForm';

import { Donation } from '../types';

type EditDonationParamList = {
  EditDonation: {
    donation: Donation
  }
}

export default function EditDonation() {
  const route = useRoute<RouteProp<EditDonationParamList, 'EditDonation'>>();
  // const { donation } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DonationForm donation={route.params.donation} />
    </View>

  );
}
