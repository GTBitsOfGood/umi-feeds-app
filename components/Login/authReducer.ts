import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtToken } from '../../types';

const authReducer = createSlice({
  name: 'authInfo',
  initialState: {
    authenticated: false,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  },
  reducers: {
    login(state, action: PayloadAction<jwtToken>) {
      const { given_name, family_name, nickname, name } = action.payload; // eslint-disable-line camelcase

      state.authenticated = true;

      state.firstName = given_name; // eslint-disable-line camelcase
      state.lastName = family_name; // eslint-disable-line camelcase
      state.username = nickname;
      state.email = name;
    },
    logout(state) {
      state.authenticated = false;

      state.firstName = '';
      state.lastName = '';
      state.username = '';
      state.email = '';
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
