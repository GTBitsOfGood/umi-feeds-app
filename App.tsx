import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import * as Notifications from 'expo-notifications';
import rootReducer from './rootReducer';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useNotifications from './hooks/useNotifications';
import Navigation from './navigation';

const store = configureStore({
  reducer: rootReducer,
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [expoPushToken] = useNotifications();

  // eslint-disable-next-line no-console
  console.log(`Expo Push Token : ${expoPushToken}`);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
