import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ReadingsScreen from "./readings_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

const Stack = createNativeStackNavigator();

export default function ReadingsStackNavigator() : JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Readings" component={ReadingsScreen} />
      <Stack.Screen name="ViewReadings" component={ViewReadingsScreen} />
    </Stack.Navigator>
  );
}