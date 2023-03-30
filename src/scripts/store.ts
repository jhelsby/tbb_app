import { configureStore } from "@reduxjs/toolkit";

import contrastReducer from '../slices/contrast/contrastSlice'

export const store = configureStore({
  reducer: {
    contrast: contrastReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
