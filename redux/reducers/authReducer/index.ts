import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { String } from 'lodash';
import AuthState from './types';
import { Address, decodedJwtToken } from '../../../types';

const fakeAddress: Address = {
  businessName: "Smith Hall",
  streetAddress: "Williams St NW",
  buildingNumber: 630,
  city: "Atlanta",
  state: "GA",
  zipCode: 30313,
  longitude: 10,
  latitude: 10
}

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: 'phultquist3@gatech.edu',
  phoneNumber: 6308901801,
  pushTokens: [],
  businessName: "Example Business",
  isAdmin: false,
  auth0AccessToken: '',
  roles: [],
  pickupAddresses: [fakeAddress, fakeAddress],
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
