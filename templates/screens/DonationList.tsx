import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DetailDonationOnQueue from './DetailDonationOnQueue';
import DonationQueue from './DonationQueue';
import DropoffDetailsEditScreen from './DropoffDetailsEditScreen';
import AddressScreen from './AddressScreen';
import EditAddressScreen from './EditAddressScreen';

import { TemplateNavParamList } from './DonationListNavParams';

const DonationList = createStackNavigator<TemplateNavParamList>();

// Donation List Stack
export default function TestStack() {
  return (
    <DonationList.Navigator screenOptions={{ headerShown: false }}>
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
