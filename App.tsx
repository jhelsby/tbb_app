import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import TabBar from "./src/components/tab_icon/tab_icon";

import { styles } from './App_styles'

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
      <Tab.Navigator
        initialRouteName='HomeNav'
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.tabBar, ...styles.tile },
          tabBarItemStyle: { 
            JustifyContent: "flex-end",
          },
        }}>
        {
          tabScreens.map((screen: ITabScreen, index: number) => {
            return (
              <Tab.Screen key={index} name={screen.name} component={screen.component} options={{
                  tabBarIcon: (props: any) => <TabBar index={index} length={tabScreens.length} {...props} />
                }}
              />
            );
          })
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}
