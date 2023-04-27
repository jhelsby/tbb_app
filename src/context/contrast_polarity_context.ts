import {createContext} from 'react';

import {
  color1,
  color1Light,
  color3,
  color3Light,
  backgroundColor,
  textColor,
} from '../scripts/colors';

export const ContrastPolarityContext = createContext({
  startColor: color1,
  startColorLight: color1Light,
  endColor: color3,
  endColorLight: color3Light,
  backgroundColor: backgroundColor,
  textColor: textColor,
});
