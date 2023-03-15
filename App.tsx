import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

const Tab : any = createBottomTabNavigator();

export default function App() : JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeNav" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="MapNav" component={MapStackNavigator} />
        <Tab.Screen name="ReadingsNav" component={ReadingsStackNavigator} />
        <Tab.Screen name="HomeNav" component={HomeStackNavigator} />
        <Tab.Screen name="NewsNav" component={NewsStackNavigator} />
        <Tab.Screen name="AccountNav" component={AccountStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
