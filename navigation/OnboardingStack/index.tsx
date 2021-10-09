import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import EnterAddressScreen from '../../screens/Onboarding/EnterAddressScreen';
import CreateAccountScreen from '../../screens/Onboarding/CreateAccountScreen';
import {
  OnboardingStackParamList
} from './types';

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

// Create your stack with the separate screens
export default function Onboarding() {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
      {/* <OnboardingStack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      /> */}
      <OnboardingStack.Screen
        name="EnterAddress"
        component={EnterAddressScreen}
        options={{ headerShown: false }}
      />
    </OnboardingStack.Navigator>
  );
}
