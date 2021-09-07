import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../../screens/LoginScreen';
import NewDonorName from '../../../screens/NewDonor/NewDonorName';
import NewDonorNumber from '../../../screens/NewDonor/NewDonorNumber';
import NewDonorLocation from '../../../screens/NewDonor/NewDonorLocation';
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
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreen;
