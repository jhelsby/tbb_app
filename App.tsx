import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ConnectedScreen from "./src/screens/connected_screen/connected_screen";
import HelpScreen from "./src/screens/help_screen/help_screen";
import HomeScreen from "./src/screens/home_screen/home_screen";
import ReadingCompleteScreen from "./src/screens/reading_complete_screen/reading_complete_screen";
import ReadingInProgressScreen from "./src/screens/reading_in_progress_screen/reading_in_progress_screen";
import ReadingScreen from "./src/screens/reading_screen/reading_screen";
import ViewLastReadingScreen from "./src/screens/view_last_reading_screen/view_last_reading_screen";


const Stack : any = createNativeStackNavigator();

export default function App() : JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, gestureEnabled: false }} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Connected" component={ConnectedScreen} />
        <Stack.Screen name="ReadingInProgress" component={ReadingInProgressScreen} />
        <Stack.Screen name="ReadingComplete" component={ReadingCompleteScreen} />
        <Stack.Screen name="ViewLastReading" component={ViewLastReadingScreen} />
        <Stack.Screen name="Readings" component={ReadingScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
