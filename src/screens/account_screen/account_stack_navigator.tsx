import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, AccountParamList } from "../../scripts/screen_params";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";
import LoginScreen from "../login_screen/login_screen";
import SignupScreen from "../signup_screen/signup_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { ContrastPolarityContext } from "../../context/contrast_polarity_context";
import { RootNavsContext } from "../../context/root_nav_context";
import { colorInterpolate } from "../../scripts/colors";

const Stack = createNativeStackNavigator<AccountParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "AccountStack">;

export default function AccountStackNavigator() : ReactElement<Props> {
  const {
    startColor,
    startColorLight,
    endColor,
    endColorLight
  } = useContext(ContrastPolarityContext);

  const rootNavs = useContext(RootNavsContext);

  const index: number = rootNavs.findIndex((navName) => navName === "AccountNav");
  const color: THSL = colorInterpolate(startColor, endColor, index/(rootNavs.length - 1));
  const colorLight: THSL = colorInterpolate(startColorLight, endColorLight, index/(rootNavs.length - 1));

  return (
    <ColorContext.Provider value={{ color, colorLight }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}