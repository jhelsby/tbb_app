export type THSL = { h: number, s: number, l: number };

export type TRGB = { r: number, g: number, b: number };

export type THex = string;

export type TDefaultProps = {
  navigation : any,
};

export type TCardProps = {
  navigation : any,
  isIcon: boolean,
  highLight : boolean | null,
  title : string,
  subtitle1 : string,
  subtitle2 : string,
  description : string,
  page : string
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