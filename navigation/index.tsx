import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { useSelector } from 'react-redux';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { RootStackParamList } from './types';
import { AdminTabs, DonorTabs } from './MainNavBar/index';

import { RootState } from '../redux/rootReducer';
import LoginStack from './LoginStack';

import { navigationRef } from './RootNavigation';

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
  const loadingState = useSelector((state: RootState) => state.loading);
  const authState = useSelector((state: RootState) => state.auth);
  let TabComponent;
  if (authState.isAdmin) {
    TabComponent = AdminTabs;
  } else {
    TabComponent = DonorTabs;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState.authenticated ? (
        <>
          <Stack.Screen name="Root" component={TabComponent} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginStack} />
          <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        </>
      )
      }
    </Stack.Navigator>
  );
}
