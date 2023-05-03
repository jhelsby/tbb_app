import {configureStore} from '@reduxjs/toolkit';

import colorReducer from '../slices/colorSlice';
import rootNavReducer from '../slices/rootNavSlice';
import accountReducer from '../slices/accountSlice';
import readingsReducer from '../slices/readingsSlice';
import newsReducer from '../slices/newsSlice';
import bluetoothReducer from '../slices/bluetoothSlice';

export const store = configureStore({
  reducer: {
    color: colorReducer,
    rootNav: rootNavReducer,
    account: accountReducer,
    readings: readingsReducer,
    news: newsReducer,
    bluetooth: bluetoothReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
