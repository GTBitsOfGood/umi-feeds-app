import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Constants from 'expo-constants';

import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useNotifications from './hooks/useNotifications';
import Navigation from './navigation';
import { store } from './redux/store';
import { logAxiosError } from './utils';

const persistor = persistStore(store);

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
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

axios.defaults.baseURL = Constants.manifest.extra.AXIOS_BASEURL;
// Add a request interceptor
axios.interceptors.request.use((config) => config,
  (error) => {
  // Do something with request error
    logAxiosError(error);
    return Promise.reject(error);
  });
