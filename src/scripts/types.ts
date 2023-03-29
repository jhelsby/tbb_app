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

export type TMeasurement= {
  name: string,
  value: number,
}

export type TReading = {
  location: {
    latitude: number,
    longitude: number,
  },
  datetime: {
    date: string,
    time: string,
  }
  id: string,
  isSafe: boolean,
  hasSynced: boolean,
  measurements: TMeasurement[],
}

export type TNews = {
  id: string,
  title: string,
  author: string,
  datetime: {
    date: string,
    time: string,
  },
  description: string,
  contents: { 
    heading: string, 
    paragraphs: string[] 
  }[],
}