import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const counterReducer = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  }
});

export const { increment, decrement, incrementByAmount } = counterReducer.actions;

export default counterReducer.reducer;
