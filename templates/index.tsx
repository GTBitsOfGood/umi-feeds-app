import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { TemplateNavParamList } from './NavTypes';
import { AdminTabs } from './AdminNavBar';

import { TutorialParamList } from './TutorialTypes';
import TutScreenOne from './screens/Tutorials/TutScreenOne';

// const TestingStack = createStackNavigator<TemplateNavParamList>();
const TestingStack = createStackNavigator<TutorialParamList>();

// // Create your stack with the separate screens
// Changing the test stack to be of the tutorial instead
export default function TestStack() {
  return (
    <TestingStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <TestingStack.Screen name="Root" component={AdminTabs} /> */}
      <TestingStack.Screen
        name="TutorialOne"
        component={TutScreenOne}
        options={{}}
      />
      <TestingStack.Screen
        name="TutorialTwo"
        component={TutScreenOne}
        options={{}}
      />
      <TestingStack.Screen
        name="TutorialThree"
        component={TutScreenOne}
        options={{}}
      />
      <TestingStack.Screen
        name="TutorialFour"
        component={TutScreenOne}
        options={{}}
      />
      <TestingStack.Screen
        name="TutorialFive"
        component={TutScreenOne}
        options={{}}
      />
    </TestingStack.Navigator>

  );
}
