import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import AuthState from './types';
import { decodedJwtToken } from '../../../types';

const initialState = {
  _id: '5',
  firstName: 'John',
  lastName: 'Smith',
  username: 'johnsmith',
  email: 'johnsmith@gmail.com',
  phoneNumber: 4040404040,
  pushTokens: [],
  isAdmin: true,
  auth0AccessToken: 'password',
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
      state.username = userInfo.nickname;
      state.auth0AccessToken = userInfo.sub;
      // eslint-disable-next-line no-console
      console.log(userInfo.sub);
    },
    logout(state) {
      state.authenticated = false;
      state.jwt = '';

      state.firstName = '';
      state.lastName = '';
      state.username = '';
      state.auth0AccessToken = '';
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
