import { combineReducers } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import authReducer from './redux/reducers/authReducer';
import donorReducer from './redux/reducers/donorReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['jwt', 'authenticated', 'firstName', 'lastName', 'username', 'email', 'address', 'phoneNumber', 'useThisAddressForPickup']
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  donor: persistReducer(persistConfig, donorReducer)
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
