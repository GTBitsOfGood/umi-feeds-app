import { createSlice } from '@reduxjs/toolkit';
import OnboardingState from './types';

const initialState = {
  name: '',
  email: '',
  phoneNumber: 0,
  roles: [],
  businessName: '',
  pickupAddress: [],
} as OnboardingState;

const onboardingReducer = createSlice({
  name: 'onboardingState',
  initialState,
  reducers: {
    // add your reducers here
  }
});

// make sure to add your reducer to the root reducer and store
export default onboardingReducer.reducer;
