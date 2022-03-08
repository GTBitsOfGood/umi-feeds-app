import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationQueue from './screens/ScreenTemplate/DonationQueue';
import DetailDonationOnQueue from './screens/DetailDonationOnQueue';
import AddressScreen from './screens/AddressScreen/index';
import EditAddressScreen from './screens/EditAddressScreen/index';

import { TemplateNavParamList } from './NavTypes';

const TestingStack = createStackNavigator<TemplateNavParamList>();

// // Create your stack with the separate screens
export default function TestStack() {
  return (
    <TestingStack.Navigator>
      <TestingStack.Screen
        name="DonationQueue"
        component={DonationQueue}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <TestingStack.Screen
        name="DetailDonationOnQueue"
        component={DetailDonationOnQueue}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <TestingStack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
      <TestingStack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{ headerTitle: '', headerShown: true, headerTintColor: '#F37B36' }}
      />
    </TestingStack.Navigator>
  );
}
