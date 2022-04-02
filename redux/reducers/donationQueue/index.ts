import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, DonationDishes, DonationForm } from '../../../types';
import { DonationQueue } from './types';

const initialState = {
  donationQueue: [],
  donationSearch: [],
} as DonationQueue;

function updateDonationState(state:DonationQueue, newDonation:DonationForm) {
  const ref = state.donationQueue.find((donation) => donation._id === newDonation._id);
  if (ref === undefined) return;
  ref.businessName = newDonation.businessName;
  ref.name = newDonation.name;
  ref.phoneNumber = newDonation.phoneNumber;
  ref.ongoing = newDonation.ongoing;
  ref.status = newDonation.status;
  ref.imageLink = newDonation.imageLink;
  ref.donationDishes = newDonation.donationDishes;
  ref.pickupAddress = newDonation.pickupAddress;
  ref.pickupInstructions = newDonation.pickupInstructions;
  ref.dropOffAddress = newDonation.dropOffAddress;
  ref.dropOffInstructions = newDonation.dropOffInstructions;
  ref.pickupStartTime = newDonation.pickupStartTime;
  ref.pickupEndTime = newDonation.pickupEndTime;
  ref.volunteerLockTime = newDonation.volunteerLockTime;
  ref.lockedByVolunteer = newDonation.lockedByVolunteer;
  ref.confirmPickUpTime = newDonation.confirmPickUpTime;
  ref.confirmDropOffTime = newDonation.confirmDropOffTime;
}

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
    updateDonation(state, action:PayloadAction<DonationForm>) {
      updateDonationState(state, action.payload);
    },
    deleteDonation(state, action:PayloadAction<DonationForm>) {
      state.donationQueue = state.donationQueue.filter((item:DonationForm) => item._id !== action.payload._id);
    },
    deleteDonationByID(state, action:PayloadAction<string>) {
      state.donationQueue = state.donationQueue.filter((item:DonationForm) => item._id !== action.payload);
    },
    updateStatus(state, action: PayloadAction<{donationForm:DonationForm, status: string, dropoffAddr?: Address}>) {
      const donation = state.donationQueue.filter((f: any) => f._id === action.payload.donationForm._id)[0];
      const list = state.donationQueue;
      for (let index = 0; index < list.length; index += 1) {
        if (list[index]._id === donation._id) {
          list[index].status = action.payload.status;
          if (action.payload.dropoffAddr) {
            list[index].dropOffAddress = action.payload.dropoffAddr;
          }
        }
      }
      state.donationQueue = list;
    },
  }
});

export const { loadDonations, searchDonations, updateStatus, updateDonation, deleteDonation, deleteDonationByID } = donationQueueReducer.actions;
export default donationQueueReducer.reducer;
