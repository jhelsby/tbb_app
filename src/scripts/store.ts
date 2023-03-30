import { configureStore } from "@reduxjs/toolkit";

import contrastReducer from '../slices/contrast/contrastSlice'

export const store = configureStore({
  reducer: {
    contrast: contrastReducer
  }
})