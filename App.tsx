import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Constants from 'expo-constants';

import axios from 'axios';
import rootReducer from './rootReducer';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const store = configureStore({
  reducer: rootReducer,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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

axios.defaults.baseURL = Constants.manifest.extra.AXIOS_BASEURL;
console.log(axios.defaults.baseURL);
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'https://spring21-umifeeds-backend.azurewebsites.net';
