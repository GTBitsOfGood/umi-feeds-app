import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnboardingState, BeginOnboardingUser, NameOnboardingUser } from './types';

const initialState = {
  name: '',
  email: '',
  phoneNumber: 0,
  roles: [],
  businessName: '',
  isAdmin: false,
  auth0AccessToken: '',
  jwt: '',
} as OnboardingState;

const onboardingReducer = createSlice({
  name: 'onboardingState',
  initialState,
  reducers: {
    beginOnboarding(state, action: PayloadAction<BeginOnboardingUser>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.auth0AccessToken = action.payload.auth0AccessToken;
      state.jwt = action.payload.jwt;
    },
    saveNameAndRoles(state, action: PayloadAction<NameOnboardingUser>) {
      state.phoneNumber = action.payload.phoneNumber;
      state.businessName = action.payload.businessName;
      state.roles = action.payload.roles;
    },
    reset: () => initialState,
  }
});

// make sure to add your reducer to the root reducer and store
export default onboardingReducer.reducer;

export const { reset, beginOnboarding, saveNameAndRoles } = onboardingReducer.actions;
