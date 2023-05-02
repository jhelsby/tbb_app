import React from "react";
import { GestureResponderEvent } from "react-native";

import * as type from './types';

export interface IButtonProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  children: React.ReactNode;
  disabled?: boolean;
}

export type IMarkerProps = {
  latitude: number,
  longitude: number,
  isSafe: boolean,
  index: number,
  onActive: (index: number) => void,
  active: boolean,
}

export type ICardProps = {
  isIcon: boolean;
  highLight: boolean | null;
  title: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  onPress: () => void;
};
