import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from './types';
import { RootStackParamList } from '../../../navigation/types';
import * as RootNavigation from '../../../navigation/RootNavigation';

const initialState = {
  loading: false,
  loadStartTime: 0 // the epoch
} as LoadingState;

type setLoadingType = { loading: boolean, desination?: string | null }

const minimumLoadingTime = 1000; // milliseconds

const loadingReducer = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<setLoadingType>) {
      function stopLoading() {
        if (action.payload.desination) {
          RootNavigation.navigate(action.payload.desination);
        } else if (action.payload.desination !== null) {
          RootNavigation.goBack();
        }
      }
      if (state.loading) {
        // there should be a minimum loading screen time, to not show the loading screen for a very short period of time
        // I originally had the loading screen be as quick as possible, but it felt jumpy and ugly.
        // see here: https://ux.stackexchange.com/questions/104606/should-a-loading-text-or-spinner-stay-a-minimum-time-on-screen
        const timeSinceStart = Date.now() - state.loadStartTime;
        if (state.loadStartTime === null || timeSinceStart > 1000) {
          stopLoading();
        } else {
          setTimeout(stopLoading, minimumLoadingTime - timeSinceStart);
        }
      } else {
        state.loadStartTime = Date.now();
        RootNavigation.navigate('Loading');
      }
      state.loading = action.payload.loading;
    },
    flipLoading(state) {
      state.loading = !state.loading;
    },
  }
});

// make sure to add your reducer to the root reducer and store
export default loadingReducer.reducer;

export const { setLoading, flipLoading } = loadingReducer.actions;
