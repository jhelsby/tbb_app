import { configureStore } from "@reduxjs/toolkit";

import colorReducer from '../slices/color/colorSlice'
import rootNavReducer from '../slices/root_nav/rootNavSlice'
import accountReducer from "../slices/account/accountSlice";

export const store = configureStore({
  reducer: {
    color: colorReducer,
    rootNav: rootNavReducer,
    account: accountReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
