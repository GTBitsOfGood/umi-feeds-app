import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { decodedJwtToken } from '../../types';

const authReducer = createSlice({
  name: 'authInfo',
  initialState: {
    authenticated: false,
    jwt: '',
    firstName: '',
    lastName: '',
    username: '',
  },
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.authenticated = true;
      state.jwt = action.payload;

      const userInfo: decodedJwtToken = jwtDecode(action.payload);
      state.firstName = userInfo.given_name;
      state.lastName = userInfo.family_name;
      state.username = userInfo.nickname;
      console.log(userInfo.sub);
    },
    logout(state) {
      state.authenticated = false;
      state.jwt = '';

      state.firstName = '';
      state.lastName = '';
      state.username = '';
    },
  }
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
