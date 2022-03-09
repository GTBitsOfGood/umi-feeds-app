import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DonationQueue from './screens/ScreenTemplate/DonationQueue';
import DetailDonationOnQueue from './screens/DetailDonationOnQueue';
import AddressScreen from './screens/AddressScreen/index';
import EditAddressScreen from './screens/EditAddressScreen/index';

import { TemplateNavParamList } from './NavTypes';
import { AdminTabs } from './AdminNavBar';

const TestingStack = createStackNavigator<TemplateNavParamList>();

// // Create your stack with the separate screens
export default function TestStack() {
  return (
    <TestingStack.Navigator screenOptions={{ headerShown: false }}>
      <TestingStack.Screen name="Root" component={AdminTabs} />

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
