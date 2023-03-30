import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, MapParamList } from "../../scripts/screen_params";

import MapScreen from "./map_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { RootNavsContext } from "../../context/root_nav_context";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";

const Stack = createNativeStackNavigator<MapParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "MapStack">;

export default function MapStackNavigator() : ReactElement<Props> {

  const rootNavs = useContext(RootNavsContext);
  const index: number = rootNavs.findIndex((navName) => navName === "MapNav");
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}