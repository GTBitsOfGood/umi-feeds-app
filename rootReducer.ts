import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './components/Auth/authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['jwt', 'authenticated', 'firstName', 'lastName', 'username', 'email']
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
