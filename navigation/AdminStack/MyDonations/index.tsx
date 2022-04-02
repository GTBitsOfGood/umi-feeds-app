import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import MyDonationScreen from '../../../screens/MyDonations';
import DetailDonationOnQueue from '../../../screens/DonationPickup/DetailDonationOnQueue';
import { MyDonationParamList } from './types';

const MyDonations = createStackNavigator<MyDonationParamList>();

// My Donations Stack
export default function MyDonationsStack() {
  return (
    <MyDonations.Navigator>
      <MyDonations.Screen
        name="MyDonations"
        component={MyDonationScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <MyDonations.Screen
        name="DetailDonationOnQueue"
        component={DetailDonationOnQueue}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
    </MyDonations.Navigator>
  );
}
