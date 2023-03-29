import { createContext } from "react";

import {
  color1,
  color1Light,
  color2,
  color2Light,
  backgroundColor,
  textColor
} from "../scripts/colors";

export const ContrastPolarityContext = createContext({
  startColor: color1,
  startColorLight: color1Light,
  endColor: color2,
  endColorLight: color2Light,
  backgroundColor: backgroundColor,
  textColor: textColor
});
