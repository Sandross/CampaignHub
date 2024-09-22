import { configureStore } from '@reduxjs/toolkit';
import { campaignReducer } from './reducers/campaign';

export const store = configureStore({
  reducer: {
    assetData: campaignReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
