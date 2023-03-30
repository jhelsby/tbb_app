import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, HomeParamList } from "../../scripts/screen_params";

import HomeScreen from "./home_screen";
import HelpScreen from "../help_screen/help_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";
import LoadingScreen from "../loading_screen/loading_screen";

import { ColorContext } from "../../context/color_context";
import { RootNavsContext } from "../../context/root_nav_context";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";



const Stack = createNativeStackNavigator<HomeParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "HomeStack">;

export default function HomeStackNavigator() : ReactElement<Props> {

  const rootNavs = useContext(RootNavsContext);
  const index: number = rootNavs.findIndex((navName) => navName === "HomeNav");
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));


  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="TakeReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}