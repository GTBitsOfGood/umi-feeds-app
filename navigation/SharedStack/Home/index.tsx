import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from '../../../screens/HomeScreen';
import NewDonorName from '../../../screens/NewDonor/NewDonorName';
import NewDonorNumber from '../../../screens/NewDonor/NewDonorNumber';
import NewDonorLocation from '../../../screens/NewDonor/NewDonorLocation';
import AllDonations from '../../../screens/AllDonations';
import DonationView from '../../../screens/DetailDonation';
import DonationsList from '../../../components/DonationsList';
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
        options={{ headerTitle: 'Home' }}
      />
      <HomeScreenStack.Screen
        name="NewDonorName"
        component={NewDonorName}
        options={{ headerShown: false }}
      />
      <HomeScreenStack.Screen
        name="NewDonorNumber"
        component={NewDonorNumber}
        options={{ headerShown: false }}
      />
      <HomeScreenStack.Screen
        name="NewDonorLocation"
        component={NewDonorLocation}
        options={{ headerShown: false }}
      />
      <HomeScreenStack.Screen
        name="DonationView"
        component={DonationView}
        options={{ headerShown: false, headerTitle: 'DonationView' }}
      />
      <HomeScreenStack.Screen
        name="AllDonations"
        component={AllDonations}
        options={{ headerShown: false, headerTitle: 'AllDonations' }}
      />
      <HomeScreenStack.Screen
        name="DetailDonation"
        component={DetailDonationScreen}
        options={{ headerShown: false, headerTitle: 'DetailDonation' }}
      />
      <HomeScreenStack.Screen
        name="DonationsList"
        component={DonationsList}
        options={{ headerShown: false, headerTitle: 'DonationsList' }}
      />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreenNavigator;
