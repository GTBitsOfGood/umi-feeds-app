import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import DonationQueue from './screens/ScreenTemplate/DonationQueue';

import { TemplateNavParamList } from './NavTypes';

const TestingStack = createStackNavigator<TemplateNavParamList>();

// // Create your stack with the separate screens
export default function TestStack() {
  return (
    <TestingStack.Navigator>
      <TestingStack.Screen
        name="DonationQueue"
        component={DonationQueue}
        options={{ headerTitle: 'Login', headerShown: false }}
      />
    </TestingStack.Navigator>
  );
}
