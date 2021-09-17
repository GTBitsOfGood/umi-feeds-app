import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { String } from 'lodash';
import AuthState from './types';
import { decodedJwtToken } from '../../../types';

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  userName: '',
  businessName: '',
  email: '',
  phoneNumber: 0,
  pushTokens: [],
  businessName: '',
  isAdmin: false,
  auth0AccessToken: '',
  roles: [],
  pickupAddresses: [],
  dishes: [],
  donations: [],
  authenticated: false,
  jwt: '',
} as AuthState;

const authReducer = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.authenticated = true;
      state.jwt = action.payload;

      const userInfo: decodedJwtToken = jwtDecode(action.payload);
      state.firstName = userInfo.given_name;
      state.lastName = userInfo.family_name;
      state.auth0AccessToken = userInfo.sub;
      console.log(userInfo.sub);
    },
    logout(state) {
      state.authenticated = false;
      state.jwt = '';

      state.firstName = '';
      state.lastName = '';
      state.auth0AccessToken = '';
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
