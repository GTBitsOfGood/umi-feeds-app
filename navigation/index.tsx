/* eslint-disable no-nested-ternary */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { useSelector } from 'react-redux';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from './types';
import { DonorTabs } from './MainNavBar/DonorTabs';
import { AdminTabs } from './MainNavBar/AdminTabs';
import DonorGuidesScreenNavigator from './DonorStack/DonorGuides';

import { RootState } from '../redux/rootReducer';
import LoginStack from './LoginStack';

import { navigationRef } from './RootNavigation';

// FOR TEMPLATING AND TESTING
import TestStack from '../templates/index';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const authState = useSelector((state: RootState) => state.auth);
  let TabComponent;
  if (authState.isAdmin || authState.roles.includes('volunteer')) {
    TabComponent = AdminTabs;
  } else {
    TabComponent = DonorTabs;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState.firstTimeLogin ? (
        <Stack.Screen name="DonorFirstTimeGuides" component={DonorGuidesScreenNavigator} />
      ) : (
        authState.authenticated ? (
          <>
            <Stack.Screen name="Root" component={TabComponent} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginStack} />
        )
      )
      }
    </Stack.Navigator>
  );
}
