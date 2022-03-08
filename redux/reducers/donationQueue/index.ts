import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationForm } from '../../../types';
import { DonationQueue } from './types';

const initialState = {
  donationQueue: [],
  donationSearch: [],
} as DonationQueue;

const donationQueueReducer = createSlice({
  name: 'donationQueue',
  initialState,
  reducers: {
    loadDonations(state, action: PayloadAction<DonationForm[]>) {
      state.donationQueue = action.payload;
    },
    searchDonations(state, action: PayloadAction<DonationForm[]>) {
      state.donationSearch = action.payload;
    },
    updateStatus(state, action: PayloadAction<{donationForm:DonationForm, status: string}>) {
      console.log(state);
      console.log(action);
      const donation = state.donationQueue.filter((f: any) => f._id === action.payload.donationForm._id)[0];
      const list = state.donationQueue;
      for (let index = 0; index < list.length; index += 1) {
        if (list[index]._id === donation._id) {
          list[index].status = action.payload.status;
        }
      }
      state.donationQueue = list;
    },
  }
});

export const { loadDonations, searchDonations, updateStatus } = donationQueueReducer.actions;
export default donationQueueReducer.reducer;
