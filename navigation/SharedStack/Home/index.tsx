import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../../screens/LoginScreen';
import NewDonorName from '../../../screens/NewDonor/NewDonorName';
import NewDonorNumber from '../../../screens/NewDonor/NewDonorNumber';
import NewDonorLocation from '../../../screens/NewDonor/NewDonorLocation';
import {
  HomeScreenParamList,
} from './types';
import Onboarding from '../../OnboardingStack';

const HomeScreenStack = createStackNavigator<HomeScreenParamList>();

function HomeScreen() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Onboarding"
        component={Onboarding}
      />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreen;
