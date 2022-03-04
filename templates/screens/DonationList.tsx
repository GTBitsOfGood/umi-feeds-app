import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DetailDonationOnQueue from './DetailDonationOnQueue';
import DonationQueue from './ScreenTemplate/DonationQueue';
import { TemplateNavParamList } from '../NavTypes';

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

    </DonationList.Navigator>

  );
}
