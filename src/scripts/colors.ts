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
  const initMinHue : number = Math.min(color1.h, color2.h);
  const initMaxHue : number = Math.max(color1.h, color2.h);
  const hueSpan1 : number = initMaxHue - initMinHue;
  const hueSpan2 : number = initMinHue + 360 - initMaxHue;
  const minHue : number = hueSpan1 < hueSpan2 ? initMinHue : initMaxHue;
  const maxHue : number = hueSpan1 < hueSpan2 ? initMaxHue : initMinHue;
  const hueSpan : number = hueSpan1 < hueSpan2 ? hueSpan1 : hueSpan2;
  result.h = (minHue + hueSpan * factor) % 360;

  const minSat : number = Math.min(color1.s, color2.s);
  const maxSat : number = Math.max(color1.s, color2.s);
  const satSpan : number = maxSat - minSat;
  result.s = minSat + satSpan * factor;

  const minLight : number = Math.min(color1.l, color2.l);
  const maxLight : number = Math.max(color1.l, color2.l);
  const lightSpan : number = maxLight - minLight;
  result.l = minLight + lightSpan * factor;

  return result;
}