import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DonationCartState from './types';
import { DonationDishes } from '../../../types';

const initialState = {
  ongoing: false,
  status: '',
  imageLink: '',
  dishes: [{ dishID: 'asd', quantity: 2, _id: `${Math.random()}` }],
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
      state.dishes = state.dishes.filter((dish) => (dish.dishID !== action.payload));
    }
  },
});

export const { addToCart, setDonationList, getDonationList, deleteDonationList, updateQty, removeDishFromCart } = donationCartReducer.actions;
export default donationCartReducer.reducer;
