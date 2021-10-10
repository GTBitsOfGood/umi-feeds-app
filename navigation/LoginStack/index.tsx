import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import NewDonorName from '../../screens/NewDonor/NewDonorName';
import {
  LoginStackParamList
} from './types';

const OnboardingStack = createStackNavigator<LoginStackParamList>();

// // Create your stack with the separate screens
export default function LoginStack() {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
      <OnboardingStack.Screen
        name="OnboardingForm"
        component={NewDonorName}
        options={{ headerTitle: 'Onboarding' }}
      />
    </OnboardingStack.Navigator>
  );
}
