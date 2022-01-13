import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from '../../../screens/HomeScreen';
import AllDonations from '../../../screens/AllDonationsScreen';
import DetailDonationScreen from '../../../components/DetailDonation';

import {
  HomeScreenParamList,
} from './types';

const HomeScreenStack = createStackNavigator<HomeScreenParamList>();

function HomeScreenNavigator() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Home', headerShown: false }}
      />
      <HomeScreenStack.Screen
        name="AllDonations"
        component={AllDonations}
        options={{
          headerShown: true,
          headerTitle: 'All Donations',
          headerTintColor: '#F37B36',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeScreenStack.Screen
        name="DetailDonation"
        component={DetailDonationScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: '#F37B36',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreenNavigator;
