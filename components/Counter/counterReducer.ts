import { createSlice } from '@reduxjs/toolkit';

const counterReducer = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state, action) {
      state.value += 1;
    },
    decrement(state, action) {
      state.value -= 1;
    },
  }
});

export const { increment, decrement } = counterReducer.actions;

export default counterReducer.reducer;
