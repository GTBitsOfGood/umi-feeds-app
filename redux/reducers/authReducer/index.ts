import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address, Dish, DonationForm, DonationDishes } from '../../../types';
import { AuthUser } from './types';

// This did not render anything on my screen, so I added this same information in components/DonationsList/Index
const date: Date = new Date('December 17, 2021 03:24:00');

const addr = {
  _id: 'addrid',
  streetAddress: '930 Spring St',
  buildingNumber: 19,
  city: 'Atlanta',
  state: 'GA',
  zipCode: 30309,
  longitude: 14,
  latitude: 26
} as Address;

const dd1 = {
  _id: 'dd1id',
  dishID: 'dishid',
  quantity: 10,
} as DonationDishes;

const dd2 = {
  _id: 'dd2id',
  dishID: 'dishidid',
  quantity: 5,
} as DonationDishes;

const df1 = {
  _id: 'df1id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1, dd2],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: date,
  pickupEndTime: date,
  volunteerLockTime: date,
  lockedByVolunteer: false,
  confirmPickUpTime: date,
  confirmDropOffTime: date,
} as DonationForm;

const df2 = {
  _id: 'df2id',
  ongoing: false,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: date,
  pickupEndTime: date,
  volunteerLockTime: date,
  lockedByVolunteer: false,
  confirmPickUpTime: date,
  confirmDropOffTime: date,
} as DonationForm;

const df3 = {
  _id: 'df3id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: date,
  pickupEndTime: date,
  volunteerLockTime: date,
  lockedByVolunteer: false,
  confirmPickUpTime: date,
  confirmDropOffTime: date,
} as DonationForm;

const df4 = {
  _id: 'df4id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd2],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: date,
  pickupEndTime: date,
  volunteerLockTime: date,
  lockedByVolunteer: false,
  confirmPickUpTime: date,
  confirmDropOffTime: date,
} as DonationForm;

const df5 = {
  _id: 'df5id',
  ongoing: true,
  status: 'ongoing',
  imageLink: 'https://spoonuniversity.com/wp-content/uploads/sites/26/2015/09/IMG_8295.jpg',
  donationDishes: [dd1],
  pickupAddress: addr,
  pickupInstructions: 'pickup at front',
  pickupStartTime: date,
  pickupEndTime: date,
  volunteerLockTime: date,
  lockedByVolunteer: false,
  confirmPickUpTime: date,
  confirmDropOffTime: date,
} as DonationForm;

const initialState = {
  _id: '',
  name: '',
  email: '',
  businessName: '',
  phoneNumber: 0,
  pushTokens: [],
  isAdmin: false,
  auth0AccessToken: '',
  roles: [],
  pickupAddresses: [],
  dishes: [],
  donations: [df1, df2, df3, df4, df5],
  authenticated: false,
  jwt: '',
} as AuthUser;

// Helper function to copy all properties from newState over to the existing state
const setState = (state:AuthUser, newState:AuthUser) : void => {
  state._id = newState._id;
  state.name = newState.name;
  state.email = newState.email;
  state.businessName = newState.businessName;
  state.phoneNumber = newState.phoneNumber;
  state.pushTokens = newState.pushTokens;
  state.isAdmin = newState.isAdmin;
  state.auth0AccessToken = newState.auth0AccessToken;
  state.roles = newState.roles;
  state.pickupAddresses = newState.pickupAddresses;
  state.dishes = newState.dishes;
  state.donations = newState.donations;
  state.authenticated = newState.authenticated;
  state.jwt = newState.jwt;
};

const authReducer = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    // Update the authState with the user information
    login(state, action: PayloadAction<AuthUser>) {
      setState(state, action.payload);
    },
    // Clear the authState
    logout(state) {
      setState(state, initialState);
    },
    // Add Dish created to the authState
    addDish(state, action: PayloadAction<Dish>) {
      state.dishes.push(action.payload);
    },
    // Set the pickupAddresses in the authState
    setPickupAddresses(state, action: PayloadAction<Address[]>) {
      state.pickupAddresses = action.payload;
    },
    addDonation(state, action: PayloadAction<DonationForm>) {
      state.donations.push(action.payload);
    }
  }
});

export const { login, logout, addDish, setPickupAddresses, addDonation } = authReducer.actions;

export default authReducer.reducer;
