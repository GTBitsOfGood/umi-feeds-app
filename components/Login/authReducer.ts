import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authReducer = createSlice({
  name: 'authInfo',
  initialState: {
    jwt: ''
  },
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    logout(state) {
      state.jwt = '';
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
