import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { styles as globalStyles } from '../../App_styles'
import { TColorSliceState, THSL } from '../scripts/types';
import { RootState } from '../scripts/store';

import { colorInterpolate, hslToString } from '../scripts/colors';

const initialState: TColorSliceState = {
  textContrast: globalStyles.lightText,
  pageContrast: globalStyles.lightPage,
  containerContrast: globalStyles.lightContainer,
  darkMode: false,
  colors: [],
  lightColors: []
}

const setDarkModeFunc = (state: TColorSliceState, action: PayloadAction<boolean>): void => {
  state.darkMode = action.payload;
  state.textContrast = action.payload ? globalStyles.darkText : globalStyles.lightText,
  state.pageContrast = action.payload ? globalStyles.darkPage : globalStyles.lightPage,
  state.containerContrast = action.payload ? globalStyles.darkContainer : globalStyles.lightContainer
}

type ColorActionPayload = {
  startColor: THSL;
  startLightColor: THSL;
  endColor: THSL;
  endLightColor: THSL;
  length: number;
};

const setColorsFunc = (state: TColorSliceState, action: PayloadAction<ColorActionPayload>): void => {
  const { startColor, startLightColor, endColor, endLightColor, length } = action.payload;
  const colors: string[] = [];
  const lightColors: string[] = [];
  for (let i = 0; i < length; i++) {
    const color: THSL = colorInterpolate(startColor, endColor, i / length);
    const lightColor: THSL = colorInterpolate(startLightColor, endLightColor, i / length);
    colors.push(hslToString(color));
    lightColors.push(hslToString(lightColor));
  }
  state.colors = colors;
  state.lightColors = lightColors;
}

export const colorSlice = createSlice({
  name: 'contrast',
  initialState,
  reducers: {
    setDarkMode: setDarkModeFunc,
    setColors: setColorsFunc
  }
});

export const { setDarkMode, setColors } = colorSlice.actions;

const getParams = (_: any, args: any) => args

export const selectDarkMode = (state: RootState) => state.color.darkMode;
export const selectTextContrast = (state: RootState) => state.color.textContrast;
export const selectPageContrast = (state: RootState) => state.color.pageContrast;
export const selectContainerContrast = (state: RootState) => state.color.containerContrast;

export const selectColors = (state: RootState) => state.color.colors;
export const selectLightColors = (state: RootState) => state.color.lightColors;

export const selectColor = createSelector(selectColors, getParams, (colors: string[], { index }: any): string => colors[index]);
export const selectLightColor = createSelector(selectLightColors, getParams, (colors: string[], { index }: any): string => colors[index]);

export default colorSlice.reducer