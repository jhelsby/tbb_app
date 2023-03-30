export type THSL = { h: number, s: number, l: number };

export type TRGB = { r: number, g: number, b: number };

export type THex = string;


export type TRootNav = {
  name: string;
  component: any;
  icon: any;
};


export type TTopNavProps = {
  handlePress: () => void;
};

export type TPieChartData = {
  name: string,
  value: number,
  color: string,
  legendFontColor: string,
  legendFontSize: number
};

export type TNewsData = {
  title: string,
  author: string,
  date: string,
  contents: { heading: string, paragraphs: string[] }[],
}

export type TTextInputStyle = {
  borderColor: string,
  borderWidth: number,
}

export type TMarkerData = {
  latitude: number,
  longitude: number,
  isSafe: boolean,
  date: string,
}

export type TColorSliceState = {
  pageContrast: any,
  textContrast: any,
  containerContrast: any,
  darkMode: boolean,
  colors: string[],
  lightColors: string[], 
}