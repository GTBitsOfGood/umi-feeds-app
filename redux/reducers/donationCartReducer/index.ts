import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationDishes, Address } from '../../../types';
import { DonationCartState, PickupTimeInformation } from './types';

const initialState = {
  donationDishes: [],
  ongoing: false,
  status: '',
  imageLink: '',
  pickupAddress: {
    streetAddress: '',
    buildingNumber: 0,
    city: '',
    state: 'GA',
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
      if (action.payload) {
        state.donationDishes.push(action.payload);
      }
    },
    resetCart(state) {
      state.donationDishes = [];
    },
    setDonationList(state, action) {
      state.donationDishes = [].concat(action.payload);
    },
    getDonationList(state) {
      return state;
    },
    deleteDonationList(state: any, action) {
      const list = state.dishes.filter((f: any) => f._id !== action.payload._id);
      state.donationDishes = list;
    },
    updateQty(state: any, action) {
      const item = state.donationDishes.filter((f: any) => f._id === action.payload.item._id)[0];
      const list = state.donationDishes;
      for (let index = 0; index < list.length; index += 1) {
        if (list[index]._id === item._id) {
          list[index].quantity = action.payload.quantity;
        }
      }
      state.donationDishes = list;
    },
    removeDishFromCart(state, action: PayloadAction<string | undefined>) {
      state.donationDishes = state.donationDishes.filter((dish: DonationDishes) => (dish.dishID !== action.payload));
    },
    setPickUpTimeInformation(state, action: PayloadAction<PickupTimeInformation>) {
      state.pickupInstructions = action.payload.pickupInstructions;
      state.pickupStartTime = action.payload.pickupStartTime;
      state.pickupEndTime = action.payload.pickupEndTime;
    },
    setAddress(state, action: PayloadAction<Address>) {
      state.pickupAddress.streetAddress = action.payload.streetAddress;
      state.pickupAddress.city = action.payload.city;
      state.pickupAddress.state = action.payload.state;
      state.pickupAddress.zipCode = action.payload.zipCode;
      state.pickupAddress.latitude = action.payload.latitude;
      state.pickupAddress.longitude = action.payload.longitude;
    }
  },
});

export const { addToCart, setDonationList, getDonationList, removeDishFromCart, deleteDonationList, updateQty, resetCart, setPickUpTimeInformation, setAddress } = donationCartReducer.actions;
export default donationCartReducer.reducer;
