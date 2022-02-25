import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './reducers/authReducer';
import donorReducer from './reducers/donorReducer';
import donationCartReducer from './reducers/donationCartReducer';
import loadingReducer from './reducers/loadingReducer';
import OnboardingReducer from './reducers/OnboardingReducer';
import donationQueueReducer from './reducers/donationQueue';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['jwt', 'authenticated', '_id', 'name', 'email', 'businessName',
    'phoneNumber', 'pushTokens', 'isAdmin', 'auth0AccessToken', 'roles', 'pickupAddresses', 'dishes', 'donations']
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  donor: persistReducer(persistConfig, donorReducer),
  donationCart: persistReducer(persistConfig, donationCartReducer),
  onboarding: persistReducer(persistConfig, OnboardingReducer),
  loading: persistReducer(persistConfig, loadingReducer),
  donationQueueReducer: persistReducer(persistConfig, donationQueueReducer)
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
