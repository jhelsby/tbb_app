import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import TabBar from "./src/components/tab_bar/tab_bar";

const Tab: any = createBottomTabNavigator();

interface ITabScreen {
  name: string;
  component: () => Element;
};



export default function App(): JSX.Element {
  const tabScreens: ITabScreen[] = [
    {
      name: "MapNav",
      component: MapStackNavigator,
    },
    {
      name: "ReadingsNav",
      component: ReadingsStackNavigator,
    },
    {
      name: "HomeNav",
      component: HomeStackNavigator,
    },
    {
      name: "NewsNav",
      component: NewsStackNavigator,
    },
    {
      name: "AccountNav",
      component: AccountStackNavigator,
    },
  ];

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='HomeNav' tabBar={(props: any) => <TabBar {...props} />}>
        {
          tabScreens.map((tabScreen: ITabScreen, index: number) => {
            return (
              <Tab.Screen
                key={index}
                name={tabScreen.name}
                component={tabScreen.component}
              />
            );
          })
        }
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
