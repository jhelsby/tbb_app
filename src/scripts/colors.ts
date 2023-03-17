type THSL = { h: number, s: number, l: number };
type TRGB = { r: number, g: number, b: number };
type THex = string;

export const color1 : THSL = { h: 220, s: 67, l: 86 };
export const color2 : THSL = { h: 33, s: 84, l: 68 };
export const color3 : THSL = { h: 28, s: 64, l: 59 };
export const color4 : THSL = { h: 5, s: 56, l: 67 };
export const color5 : THSL = { h: 0, s: 71, l: 83 };
export const backgroundColor : THSL = { h: 0, s: 0, l: 100 };

export const colorInterpolate = (color1: THSL, color2: THSL, factor: number) => {
  let result = <THSL>{};
  
  // Find Smallest Hue Difference. Aka, which way around the color wheel is the shortest distance?
  const hueDiff1 = Math.abs(color2.h - color1.h);
  const hueDiff2 = color1.h < color2.h ? (color1.h + 360) - color2.h : (color2.h + 360) - color1.h;

  let startColor: THSL;
  let endColor: THSL;

  // If standard way around the color wheel (the way that doesn't lap 360)
  // is shorter, set the start color to the smallest hue, and the end color
  // to the largest hue. Otherwise, set the start color to the largest hue,
  // and the end color to the smallest hue.
  if (hueDiff1 < hueDiff2) {
    startColor = color1.h < color2.h ? color1 : color2;
    endColor = color1.h < color2.h ? color2 : color1;
    result.h = (startColor.h + (hueDiff1) * factor) % 360;
  } else {
    startColor = color1.h < color2.h ? color2 : color1;
    endColor = color1.h < color2.h ? color1 : color2;
    result.h = (startColor.h + (hueDiff2) * factor) % 360;
  }

  result.s = startColor.s + (endColor.s - startColor.s) * factor;
  result.l = startColor.l + (endColor.l - startColor.l) * factor;

  return result;
}