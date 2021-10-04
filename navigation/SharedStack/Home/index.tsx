import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../../screens/LoginScreen';
import NewDonorName from '../../../screens/NewDonor/NewDonorName';
import NewDonorNumber from '../../../screens/NewDonor/NewDonorNumber';
import NewDonorLocation from '../../../screens/NewDonor/NewDonorLocation';
import AllDonations from '../../../screens/AllDonations';
import MyDishes from '../../../screens/MyDishes';
import DonationView from '../../../screens/DetailDonation';
import {
  HomeScreenParamList,
} from './types';

const HomeScreenStack = createStackNavigator<HomeScreenParamList>();

function HomeScreen() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
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
        name="MyDishes"
        component={MyDishes}
        options={{ headerShown: false, headerTitle: 'MyDishes' }}
      />
      <HomeScreenStack.Screen
        name="AllDonations"
        component={AllDonations}
        options={{ headerShown: false, headerTitle: 'AllDonations' }}
      />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreen;
