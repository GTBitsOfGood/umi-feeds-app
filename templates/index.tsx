import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TemplateNavParamList } from './NavTypes';
import { AdminTabs } from './AdminNavBar';

const TestingStack = createStackNavigator<TemplateNavParamList>();

// // Create your stack with the separate screens
export default function TestStack() {
  return (
    <TestingStack.Navigator screenOptions={{ headerShown: false }}>
      <TestingStack.Screen name="Root" component={AdminTabs} />
    </TestingStack.Navigator>

  );
}
