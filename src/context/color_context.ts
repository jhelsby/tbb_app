import { createContext } from 'react';

import {
  color1,
  color1Light,
} from '../scripts/colors';

export const ColorContext = createContext({
  color: color1,
  colorLight: color1Light,
});