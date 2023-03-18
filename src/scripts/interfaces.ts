import React from "react";

import * as type from './types';

export interface IButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  activeColor: type.THSL;
  inactiveColor: type.THSL
}