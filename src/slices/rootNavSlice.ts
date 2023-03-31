import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../scripts/store';
import { TRootNav, TRootNavSliceState } from '../scripts/types';


import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";


const initialState: TRootNavSliceState = {
  rootNavs: [
    {
      name: "MapNav",
      focused: false,
      icon: faMap,
    },
    {
      name: "ReadingsNav",
      focused: false,
      icon: faChartLine,
    },
    {
      name: "HomeNav",
      focused: false,
      icon: faHome,
    },
    {
      name: "NewsNav",
      focused: false,
      icon: faNewspaper,
    },
    {
      name: "AccountNav",
      focused: false,
      icon: faUser,
    },
  ]
}

const setFocusedNavFunc = (state: TRootNavSliceState, action: PayloadAction<number>): void => {
  state.rootNavs.forEach((nav: TRootNav, index: number) => {
    nav.focused = index === action.payload;
  });
}

export const rootNavSlice = createSlice({
  name: 'rootNav',
  initialState,
  reducers: {
    setFocusedNav: setFocusedNavFunc,
  }
});

export const { setFocusedNav } = rootNavSlice.actions;

const getParams = (_: any, args: any) => args

export const selectRootNavs = (state: RootState) => state.rootNav.rootNavs;

export const selectNavIndex = createSelector(
  selectRootNavs,
  getParams,
  (rootNavs: TRootNav[], { name }: any): number => rootNavs.findIndex((nav: TRootNav) => nav.name === name)
);

export const selectNavFocus = createSelector(
  selectRootNavs,
  getParams,
  (rootNavs: TRootNav[], { index }: any): boolean => rootNavs[index].focused
);

export default rootNavSlice.reducer