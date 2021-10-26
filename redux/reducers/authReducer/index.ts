import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'react-native-gesture-handler';
import { Dish } from '../../../types';
import { AuthUser } from './types';

const initialState = {
  _id: '',
  name: 'Test Name',
  email: 'randmemail',
  businessName: 'business',
  phoneNumber: 1234567890,
  pushTokens: [],
  isAdmin: false,
  auth0AccessToken: 'password',
  roles: [],
  pickupAddresses: [],
  dishes: [{
    favorite: true,
    dishName: 'fofo',
    cost: 90.90,
    pounds: 90,
    allergens: [],
    imageLink: '',
    comments: 'Yes'
  }],
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
    // Add Dish created to the authState
    addDish(state, action: PayloadAction<Dish>) {
      state.dishes.push(action.payload);
    }
  }
});

export const { login, logout, addDish } = authReducer.actions;

export default authReducer.reducer;
