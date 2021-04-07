import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Address = {
  streetAddress: string;
  suiteAptBuildingNumber: string;
  city: string;
  state: string;
  zipCode: string;
}

const donorReducer = createSlice({
  name: 'donorInfo',
  initialState: {
    address: {
      streetAddress: '',
      suiteAptBuildingNumber: '',
      city: '',
      state: '',
      zipCode: '',
    },
    phoneNumber: '',
    useThisAddressForPickup: true,
  },
  reducers: {
    setAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
    setUseThisAddressForPickup(state, action: PayloadAction<boolean>) {
      state.useThisAddressForPickup = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    }
  }
});

export const { setAddress, setPhoneNumber, setUseThisAddressForPickup } = donorReducer.actions;

export default donorReducer.reducer;
