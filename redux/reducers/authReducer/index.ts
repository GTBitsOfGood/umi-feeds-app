import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser } from './types';

const initialState = {
  _id: '',
  name: 'Test Name',
  email: 'randmemail',
  businessName: 'business',
  phoneNumber: 0,
  pushTokens: [],
  isAdmin: false,
  auth0AccessToken: 'password',
  roles: [],
  pickupAddresses: [],
  dishes: [],
  donations: [],
  authenticated: false,
  jwt: '',
} as AuthUser;

// Helper function to copy all properties from newState over to the existing state
const setState = (state:AuthUser, newState:AuthUser) : void => {
  state._id = newState._id;
  state.name = newState.name;
  state.email = newState.email;
  state.businessName = newState.businessName;
  state.phoneNumber = newState.phoneNumber;
  state.pushTokens = newState.pushTokens;
  state.isAdmin = newState.isAdmin;
  state.auth0AccessToken = newState.auth0AccessToken;
  state.roles = newState.roles;
  state.pickupAddresses = newState.pickupAddresses;
  state.dishes = newState.dishes;
  state.donations = newState.donations;
  state.authenticated = newState.authenticated;
  state.jwt = newState.jwt;
};

const authReducer = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    // Update the authState with the user information
    login(state, action: PayloadAction<AuthUser>) {
      setState(state, action.payload);
    },
    // Clear the authState
    logout(state) {
      setState(state, initialState);
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
