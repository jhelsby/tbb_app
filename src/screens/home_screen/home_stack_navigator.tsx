import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement, useCallback } from "react";
import { RootTabParamList, HomeParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import HomeScreen from "./home_screen";
import HelpScreen from "../help_screen/help_screen";
import TakeReadingsScreen from "../take_reading_screen/take_reading_screen";
import LoadingScreen from "../loading_screen/loading_screen";

import { ColorContext } from "../../context/color_context";

import { useAppDispatch, useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/colorSlice";
import { selectNavIndex, setFocusedNav } from "../../slices/rootNavSlice";



const Stack = createNativeStackNavigator<HomeParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'HomeStack'>;

export default function HomeStackNavigator() : ReactElement<Props> {
  const dispatch = useAppDispatch();
  const index: number = useAppSelector(state => selectNavIndex(state, { name: "HomeNav" }));
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  useFocusEffect(
    useCallback(() => {
      dispatch(setFocusedNav(index));
    }, [])
  );


  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="TakeReadingScreen" component={TakeReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}
