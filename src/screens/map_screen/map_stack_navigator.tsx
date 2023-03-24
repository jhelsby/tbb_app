import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, MapParamList } from "../../scripts/screen_params";

import MapScreen from "./map_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { ContrastPolarityContext } from "../../context/contrast_polarity_context";
import { RootNavsContext } from "../../context/root_nav_context";
import { colorInterpolate } from "../../scripts/colors";

const Stack = createNativeStackNavigator<MapParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "MapStack">;

export default function MapStackNavigator() : ReactElement<Props> {
  const {
    startColor,
    startColorLight,
    endColor,
    endColorLight
  } = useContext(ContrastPolarityContext);

  const rootNavs = useContext(RootNavsContext);


  const index: number = rootNavs.findIndex((navName) => navName === "MapNav");
  const color: THSL = colorInterpolate(startColor, endColor, index/(rootNavs.length - 1));
  const colorLight: THSL = colorInterpolate(startColorLight, endColorLight, index/(rootNavs.length - 1));

  return (
    <ColorContext.Provider value={{ color, colorLight }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}