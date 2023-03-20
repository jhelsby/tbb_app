import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { ContrastPolarityContext } from "../../context/contrast_polarity_context";
import { RootNavsContext } from "../../context/root_nav_context";
import { colorInterpolate } from "../../scripts/colors";

const Stack = createNativeStackNavigator();

export default function AccountStackNavigator() : JSX.Element {
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
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}