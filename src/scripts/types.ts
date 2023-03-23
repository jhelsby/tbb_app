export type THSL = { h: number, s: number, l: number };

export type TRGB = { r: number, g: number, b: number };

export type THex = string;

export type TDefaultProps = {
  navigation : any,
};

export type TTopNavProps = {
  handlePress: () => void;
};

export type TPieChartData = {
  name: string,
  value: number,
  color: string,
  legendFontColor: string,
  legendFontSize: number};