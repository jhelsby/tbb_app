import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, ReadingsParamList } from "../../scripts/screen_params";

import ReadingsScreen from "./readings_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

import { THSL } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { RootNavsContext } from "../../context/root_nav_context";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";

const Stack = createNativeStackNavigator<ReadingsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "ReadingsStack">;

export default function ReadingsStackNavigator() : ReactElement<Props> {

  const rootNavs = useContext(RootNavsContext);
  const index: number = rootNavs.findIndex((navName) => navName === "ReadingsNav");
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ReadingsScreen" component={ReadingsScreen} />
        <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}