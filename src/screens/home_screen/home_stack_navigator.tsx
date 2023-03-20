import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";

import HomeScreen from "./home_screen";
import HelpScreen from "../help_screen/help_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { ContrastPolarityContext } from "../../context/contrast_polarity_context";
import { RootNavsContext } from "../../context/root_nav_context";
import { colorInterpolate } from "../../scripts/colors";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() : JSX.Element {
  const {
    startColor,
    startColorLight,
    endColor,
    endColorLight
  } = useContext(ContrastPolarityContext);

  const rootNavs = useContext(RootNavsContext);


  const index: number = rootNavs.findIndex((navName) => navName === "HomeNav");
  const color: THSL = colorInterpolate(startColor, endColor, index/(rootNavs.length - 1));
  const colorLight: THSL = colorInterpolate(startColorLight, endColorLight, index/(rootNavs.length - 1));


  return (
    <ColorContext.Provider value={{ color, colorLight }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="TakeReadings" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}