import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DonationCartState from './types';
import { DonationDishes } from '../../../types';

const initialState = {
  donationDishes: [], // just dishes was having a conflict with the user dishes values!!!
  ongoing: false,
  status: '',
  imageLink: '',
  pickupAddress: {},
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
      state.dishes = [].concat(action.payload);
    },
    getDonationList(state) {
      return state;
    },
    deleteDonationList(state: any, action) {
      const list = state.dishes.filter((f: any) => f._id !== action.payload._id);
      state.dishes = list;
    },
    updateQty(state: any, action) {
      const item = state.dishes.filter((f: any) => f._id === action.payload.item._id)[0];
      const list = state.dishes;
      for (let index = 0; index < list.length; index += 1) {
        if (list[index]._id === item._id) {
          list[index].quantity = action.payload.quantity;
        }
      }
      state.dishes = list;
      console.log(item);
    },
    removeDishFromCart(state, action: PayloadAction<string | undefined>) {
      state.donationDishes = state.donationDishes.filter((dish) => (dish.dishID !== action.payload));
    }
  },
});


export const { addToCart, setDonationList, getDonationList, removeDishFromCart, deleteDonationList, updateQty, resetCart } = donationCartReducer.actions;
export default donationCartReducer.reducer;
