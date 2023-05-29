import {createContext} from 'react';

import {color1, color1Light, hslToString} from '../scripts/colors';

export const ColorContext = createContext({
  color: hslToString(color1),
  lightColor: hslToString(color1Light),
});
