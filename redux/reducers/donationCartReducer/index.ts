import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DonationCartState from './types';
import { DonationDishes } from '../../../types';

const initialState = {
  ongoing: true,
  status: 'pending pickup',
  imageLink: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  donationDishes: [], // just dishes was having a conflict with the user dishes values!!!
  pickupAddress: {
    streetAddress: 'Georgia Tech Street',
    buildingNumber: 123,
    city: 'Atlanta',
    state: 'GA',
    zipCode: 30332,
    longitude: 33.7795374,
    latitude: -84.4068937,
  },
  pickupInstructions: 'no additional instructions',
  pickupStartTime: 1641045600000,
  pickupEndTime: 1641052800000,
  volunteerLockTime: 1641049200000, // time when volunteer agrees to pick it up
  lockedByVolunteer: false, // whether the donation has been locked by a volunteer
  confirmPickUpTime: 1641049200000, // time when donation has been picked up by volunteer
  confirmDropOffTime: 1641051000000,
} as DonationCartState;

const donationCartReducer = createSlice({
  name: 'donationCart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<DonationDishes>) {
      if (action.payload) {
        state.donationDishes.push(action.payload);
      }
    },
    resetCart(state) {
      state.donationDishes = [];
    },
    removeDishFromCart(state, action: PayloadAction<string | undefined>) {
      state.donationDishes = state.donationDishes.filter((dish) => (dish.dishID !== action.payload));
    }
  },
});

export const { addToCart, removeDishFromCart, resetCart } = donationCartReducer.actions;
export default donationCartReducer.reducer;
