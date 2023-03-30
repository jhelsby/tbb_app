import { configureStore } from "@reduxjs/toolkit";

import colorReducer from '../slices/color/colorSlice'
import rootNavReducer from '../slices/root_nav/rootNavSlice'

export const store = configureStore({
  reducer: {
    color: colorReducer,
    rootNav: rootNavReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
