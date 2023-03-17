type THSL = { h: number, s: number, l: number };
type TRGB = { r: number, g: number, b: number };
type THex = string;

export const color1 : THSL = { h: 220, s: 67, l: 86 };
export const color2 : THSL = { h: 33, s: 84, l: 68 };
export const color3 : THSL = { h: 28, s: 64, l: 59 };
export const color4 : THSL = { h: 5, s: 56, l: 67 };
export const color5 : THSL = { h: 0, s: 71, l: 83 };
export const backgroundColor : THSL = { h: 0, s: 0, l: 100 };

export const colorInterpolate = (startColor: THSL, endColor: THSL, factor: number) => {
  let result = <THSL>{};
  
  // Find Smallest Hue Difference. Aka, which way around the color wheel is the shortest distance?
  const hueDiff1 = Math.abs(endColor.h - startColor.h);
  const hueDiff2 = startColor.h < endColor.h ? (startColor.h + 360) - endColor.h : (endColor.h + 360) - startColor.h;
  const hueDiff = Math.min(hueDiff1, hueDiff2);

  const modulo = (n: number, m: number) => {
    if (n >= 0)
      return n % m;
    return m - (-n % m);
  }

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
}