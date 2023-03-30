import { PayloadAction, Slice, createSelector, createSlice } from '@reduxjs/toolkit';

import { styles as globalStyles } from '../../../App_styles'
import { TContrastSliceState } from '../../scripts/types';
import { RootState } from '../../scripts/store';

const initialState: TContrastSliceState = {
  textContrast: globalStyles.lightText,
  pageContrast: globalStyles.lightPage,
  containerContrast: globalStyles.lightContainer,
  darkMode: false
}

const setDarkModeFunc = (state: TContrastSliceState, action: PayloadAction<boolean>): void => {
  state.darkMode = action.payload;
  state.textContrast = action.payload ? globalStyles.darkText : globalStyles.lightText,
  state.pageContrast = action.payload ? globalStyles.darkPage : globalStyles.lightPage,
  state.containerContrast = action.payload ? globalStyles.darkContainer : globalStyles.lightContainer
}

export const contrastSlice = createSlice({
  name: 'contrast',
  initialState,
  reducers: {
    setDarkMode: setDarkModeFunc
  }
});

export const { setDarkMode } = contrastSlice.actions;

const getParams = (_: any, args: any) => args

export const selectDarkMode = (state: RootState) => state.contrast.darkMode;
export const selectTextContrast = (state: RootState) => state.contrast.textContrast;
export const selectPageContrast = (state: RootState) => state.contrast.pageContrast;
export const selectContainerContrast = (state: RootState) => state.contrast.containerContrast;

export default contrastSlice.reducer