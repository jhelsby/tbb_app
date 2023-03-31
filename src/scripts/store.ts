import { configureStore } from "@reduxjs/toolkit";

import colorReducer from '../slices/color/colorSlice'
import rootNavReducer from '../slices/root_nav/rootNavSlice'
import accountReducer from "../slices/account/accountSlice";
import readingsReducer from "../slices/readings/readingsSlice";
import newsReducer from "../slices/news/newsSlice";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    rootNav: rootNavReducer,
    account: accountReducer,
    readings: readingsReducer,
    news: newsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
