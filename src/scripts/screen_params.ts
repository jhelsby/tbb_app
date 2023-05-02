export type RootTabParamList = {
  MapStack: undefined;
  ReadingsStack: undefined;
  HomeStack: undefined;
  NewsStack: undefined;
  AccountStack: undefined;
};

export type MapParamList = {
  MapScreen: undefined;
  ViewReadingScreen: { validNavigation: boolean, readingId?: string } | undefined;
};

export type ReadingsParamList = {
  ReadingsScreen: undefined;
  ViewReadingScreen: { validNavigation: boolean, readingId?: string } | undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  HelpScreen: {validNavigation: boolean} | undefined;
  LoadingScreen: {validNavigation: boolean} | undefined;
  TakeReadingScreen: {validNavigation: boolean} | undefined;
};

export type NewsParamList = {
  NewsScreen: undefined;
  ViewNewsScreen: { validNavigation: boolean, newsId?: string } | undefined;
};

export type AccountParamList = {
  AccountScreen: undefined;
  ReportScreen: { validNavigation: boolean } | undefined;
  LoginScreen: { validNavigation: boolean } | undefined;
  SignupScreen: { validNavigation: boolean } | undefined;
  ResetPasswordScreen: { validNavigation: boolean } | undefined;
};
