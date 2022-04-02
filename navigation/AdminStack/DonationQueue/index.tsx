import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DetailDonationOnQueue from '../../../screens/DonationPickup/DetailDonationOnQueue';
import DonationQueue from '../../../screens/DonationPickup/DonationQueue';
import DropoffDetailsEditScreen from '../../../screens/DonationPickup/DropoffDetailsEditScreen';
import AddressScreen from '../../../screens/DonationPickup/AddressScreen';
import EditAddressScreen from '../../../screens/DonationPickup/EditAddressScreen';

import { DonationQueueParamList } from './types';

const DonationList = createStackNavigator<DonationQueueParamList>();

// Donation List Stack
export default function DonationQueueStack() {
  return (
    <DonationList.Navigator>
      <DonationList.Screen
        name="DonationQueue"
        component={DonationQueue}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <DonationList.Screen
        name="DetailDonationOnQueue"
        component={DetailDonationOnQueue}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <DonationList.Screen
        name="DropoffDetailsEditScreen"
        component={DropoffDetailsEditScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <DonationList.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <DonationList.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />

    </DonationList.Navigator>

  );
}
