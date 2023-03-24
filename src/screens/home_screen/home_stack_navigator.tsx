import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement } from "react";
import { RootTabParamList, HomeParamList } from "../../scripts/screen_params";

import HomeScreen from "./home_screen";
import HelpScreen from "../help_screen/help_screen";
import ViewReadingsScreen from "../view_readings_screen/view_readings_screen";



const Stack = createNativeStackNavigator<HomeParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "HomeStack">;

export default function HomeStackNavigator() : ReactElement<Props> {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} initialParams={{ validNavigation: true }}/>
      <Stack.Screen name="TakeReadingScreen" component={ViewReadingsScreen} />
    </Stack.Navigator>
  );
}