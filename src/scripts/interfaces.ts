import React from "react";

import * as type from './types';

export interface IButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  activeColor: type.THSL;
  inactiveColor: type.THSL
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