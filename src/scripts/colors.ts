import {THSL} from './types';

export const color1: THSL = {h: 208, s: 39, l: 40};
export const color2: THSL = {h: 33, s: 65, l: 57};
export const color1Light: THSL = {h: 203, s: 34, l: 48};
export const color2Light: THSL = {h: 33, s: 47, l: 72};
export const backgroundColor: THSL = {h: 0, s: 0, l: 100};
export const textColor: THSL = {h: 0, s: 0, l: 0};

export const colorInterpolate = (
  startColor: THSL,
  endColor: THSL,
  factor: number,
) => {
  let result = <THSL>{};

  // Find Smallest Hue Difference. Aka, which way around the color wheel is the shortest distance?
  const hueDiff1 = Math.abs(endColor.h - startColor.h);
  const hueDiff2 =
    startColor.h < endColor.h
      ? startColor.h + 360 - endColor.h
      : endColor.h + 360 - startColor.h;
  const hueDiff = Math.min(hueDiff1, hueDiff2);

  const modulo = (n: number, m: number) => {
    if (n >= 0) {
      return n % m;
    }
    return m - (-n % m);
  };

  if (hueDiff1 < hueDiff2) {
    if (startColor.h < endColor.h) {
      result.h = startColor.h + hueDiff * factor;
    } else {
      result.h = startColor.h - hueDiff * factor;
    }
  } else {
    if (startColor.h < endColor.h) {
      result.h = modulo(startColor.h - hueDiff * factor, 360);
    } else {
      result.h = modulo(startColor.h + hueDiff * factor, 360);
    }
  }

  result.s = startColor.s + (endColor.s - startColor.s) * factor;
  result.l = startColor.l + (endColor.l - startColor.l) * factor;

  return result;
};

export const hslToString = (hsl: THSL): string => {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};
