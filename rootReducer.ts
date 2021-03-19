import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import counterReducer from './components/Counter/counterReducer';
import authReducer from './components/Login/authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['jwt', 'authenticated', 'firstName', 'lastName', 'username', 'email']
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: persistReducer(persistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
