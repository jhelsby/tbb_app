import React from "react";

import * as type from './types';

export interface IButtonProps {
  onPress: () => void;
  children: React.ReactNode;
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

export type ICardProps = {
  isIcon: boolean,
  highLight : boolean | null,
  title : string,
  subtitle1 : string,
  subtitle2 : string,
  description : string,
  onPress : () => void,
};