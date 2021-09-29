import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './reducers/authReducer';
import donorReducer from './reducers/donorReducer';
import donationCartReducer from './reducers/donationCartReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['jwt', 'authenticated', 'firstName', 'lastName', 'username', 'email', 'address', 'phoneNumber']
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  donor: persistReducer(persistConfig, donorReducer),
  donationCart: persistReducer(persistConfig, donationCartReducer)
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
