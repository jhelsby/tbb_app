import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import MapScreen from "./map_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

const Stack = createNativeStackNavigator();

export default function MapStackNavigator() : JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="ViewReadings" component={ViewReadingsScreen} />
    </Stack.Navigator>
  );
}