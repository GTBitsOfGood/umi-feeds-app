import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {
  OnboardingStackParamList
} from './types';

const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

// Create your stack with the separate screens
// export default function Onboarding() {
//   return (
//     <OnboardingStack.Navigator>

//     </OnboardingStack.Navigator>
//   );
// }
