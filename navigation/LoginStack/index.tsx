import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import OnboardingNameForm from '../../screens/Onboarding/Name';
import AddressOnboardingForm from '../../screens/Onboarding/Address';
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
        name="OnboardingNameForm"
        component={OnboardingNameForm}
        options={{ headerShown: false }}
      />
      <OnboardingStack.Screen
        name="OnboardingAddressForm"
        component={AddressOnboardingForm}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </OnboardingStack.Navigator>
  );
}
