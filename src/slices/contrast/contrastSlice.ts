import { Slice, createSelector, createSlice } from '@reduxjs/toolkit';

import { styles as globalStyles } from '../../../App_styles'
import { TContrastSliceState } from '../../scripts/types';

const initialState: TContrastSliceState = {
  textContrast: globalStyles.lightText,
  pageContrast: globalStyles.lightPage,
  containerContrast: globalStyles.lightContainer,
  darkMode: false
}

const setModeDarkAction = (state: TContrastSliceState): void => {
  state.darkMode = true;
  state.textContrast = globalStyles.darkText,
  state.pageContrast = globalStyles.darkPage,
  state.containerContrast = globalStyles.darkContainer
}

const setModeLightAction = (state: TContrastSliceState): void => {
  state.darkMode = false;
  state.textContrast = globalStyles.lightText,
  state.pageContrast = globalStyles.lightPage,
  state.containerContrast = globalStyles.lightContainer
}


export const contrastSlice:Slice = createSlice({
  name: 'contrast',
  initialState,
  reducers: {
    setModeDark: setModeDarkAction,
    setModeLight: setModeLightAction
  }
});

export const { setModeDark, setModeLight } = contrastSlice.actions;

const getParams = (_: any, args: any) => args

export const selectDarkMode = (state: any) => state.colors.darkMode;
export const selectTextContrast = (state: any) => state.colors.textContrast;
export const selectPageContrast = (state: any) => state.colors.pageContrast;
export const selectContainerContrast = (state: any) => state.colors.containerContrast;

export default contrastSlice.reducer