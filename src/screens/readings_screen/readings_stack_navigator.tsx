import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement } from "react";
import { RootTabParamList, ReadingsParamList } from "../../scripts/screen_params";

import ReadingsScreen from "./readings_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";

const Stack = createNativeStackNavigator<ReadingsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "ReadingsStack">;

export default function ReadingsStackNavigator() : ReactElement<Props> {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReadingsScreen" component={ReadingsScreen} />
      <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
    </Stack.Navigator>
  );
}