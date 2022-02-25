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
    }
  }
});

export const { loadDonations, searchDonations } = donationQueueReducer.actions;
export default donationQueueReducer.reducer;
