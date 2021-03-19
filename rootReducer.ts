import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from './components/Counter/counterReducer';
import authReducer from './components/Login/authReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
