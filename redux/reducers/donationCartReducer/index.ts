import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DonationCartState from './types';
import { DonationDishes } from '../../../types';

const initialState = {
  ongoing: false,
  status: '',
  imageLink: '',
  dishes: [],
  pickupAddress: {
    streetAddress: '',
    buildingNumber: 0,
    city: '',
    state: '',
    zipCode: 0,
    longitude: 0,
    latitude: 0,
  },
  pickupInstructions: '',
  pickupStartTime: 0,
  pickupEndTime: 0,
  volunteerLockTime: 0, // time when volunteer agrees to pick it up
  lockedByVolunteer: false, // whether the donation has been locked by a volunteer
  confirmPickUpTime: 0, // time when donation has been picked up by volunteer
  confirmDropOffTime: 0,
} as DonationCartState;

const donationCartReducer = createSlice({
  name: 'donationCart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<DonationDishes>) {
      state.dishes.push(action.payload);
    }
  },
});

export const { addToCart } = donationCartReducer.actions;
export default donationCartReducer.reducer;
