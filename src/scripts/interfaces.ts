import React from "react";

import * as type from './types';

export interface IButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  activeColor: type.THSL;
  inactiveColor: type.THSL
}

export type IMarkerProps = {
  latitude: number,
  longitude: number,
  isSafe: boolean,
  date: string,
  index: number,
  onActive: (index: number) => void,
  active: boolean,
}