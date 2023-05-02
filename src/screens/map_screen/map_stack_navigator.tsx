import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, ReactElement } from "react";
import { RootTabParamList, MapParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import MapScreen from "./map_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

import { ColorContext } from "../../context/color_context";

import { useAppSelector, useAppDispatch } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/colorSlice";
import { selectNavIndex, setFocusedNav } from "../../slices/rootNavSlice";

const Stack = createNativeStackNavigator<MapParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'MapStack'>;

export default function MapStackNavigator() : ReactElement<Props> {
  const dispatch = useAppDispatch();

  const index: number = useAppSelector(state => selectNavIndex(state, { name: "MapNav" }));
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
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}
