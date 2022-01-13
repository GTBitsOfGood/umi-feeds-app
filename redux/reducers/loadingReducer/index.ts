import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from './types';
import { RootStackParamList } from '../../../navigation/types';
import * as RootNavigation from '../../../navigation/RootNavigation';

const initialState = {
  loadingStatus: false,
  loadStartTime: 0 // the epoch
} as LoadingState;

type setLoadingType = { loading: boolean, desination?: string | null }

const minimumLoadingTime = 1000; // milliseconds

const loadingReducer = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<setLoadingType>) {
      state.loadingStatus = action.payload.loading;
    },
    flipLoading(state) {
      state.loadingStatus = !state.loadingStatus;
    },
  }
});

// make sure to add your reducer to the root reducer and store
export default loadingReducer.reducer;

export const { setLoading, flipLoading } = loadingReducer.actions;
