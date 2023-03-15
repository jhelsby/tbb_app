import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HelpScreen from "./src/screens/help_screen/help_screen";
import HomeScreen from "./src/screens/home_screen/home_screen";
import AccountScreen from "./src/screens/account_screen/account_screen";
import MapScreen from "./src/screens/map_screen/map_screen";
import NewsScreen from "./src/screens/news_screen/news_screen";
import ReadingScreen from "./src/screens/readings_screen/readings_screen";
import ReportScreen from "./src/screens/report_screen/report_screen";
import ViewNewsScreen from "./src/screens/view_news_screen/view_news_screen";
import ViewReadingScreen from "./src/screens/view_readings_screen/view_readings_screen";


const Stack : any = createNativeStackNavigator();

export default function App() : JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, gestureEnabled: false }} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="Readings" component={ReadingScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="ViewNews" component={ViewNewsScreen} />
        <Stack.Screen name="ViewReadings" component={ViewReadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
