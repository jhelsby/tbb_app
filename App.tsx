import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

import { color1, color1Light, color3, color3Light, colorInterpolate } from "./src/scripts/colors";

import { THSL } from "./src/scripts/types";

import { styles } from "./App_styles";

const Tab: any = createBottomTabNavigator();

type TTabScreen = {
  name: string;
  component: any;
  icon: any;
};

export default function App(): JSX.Element {
  const iconActiveSize: number = 45;
  const iconInactiveSize: number = 25;

  const tabScreens: TTabScreen[] = [
    {
      name: "MapNav",
      component: MapStackNavigator,
      icon: faMap,
    },
    {
      name: "ReadingsNav",
      component: ReadingsStackNavigator,
      icon: faChartLine,
    },
    {
      name: "HomeNav",
      component: HomeStackNavigator,
      icon: faHome,
    },
    {
      name: "NewsNav",
      component: NewsStackNavigator,
      icon: faNewspaper,
    },
    {
      name: "AccountNav",
      component: AccountStackNavigator,
      icon: faUser,
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
        {tabScreens.map((screen: TTabScreen, index: number) => {
          const activeColor: THSL = colorInterpolate(color1, color3, index / tabScreens.length);
          const inactiveColor: THSL = colorInterpolate(color1Light, color3Light, index / tabScreens.length);
          const iconActiveStyle: { color: string } = {
            color: `hsl(${activeColor.h}, ${activeColor.s}%, ${activeColor.l}%)`,
          };
          const iconInactiveStyle: { color: string } = {
            color: `hsl(${inactiveColor.h}, ${inactiveColor.s}%, ${inactiveColor.l}%)`
          };
          return (
            <Tab.Screen
              key={index}
              name={screen.name}
              component={screen.component}
              options={{
                tabBarIcon: ({ focused }: { focused: boolean }) => 
                  <View style={styles.iconContainer}>
                    <View style={styles.circleContainer}>
                      <View style={[styles.circle ,focused ? styles.circleActive : styles.circleInactive]} />
                    </View>
                    <View style={focused ? styles.svgContainer : {}}>
                      <Text>
                        <FontAwesomeIcon 
                          icon={screen.icon}
                          size={focused ? iconActiveSize : iconInactiveSize} 
                          style={focused ? iconActiveStyle : iconInactiveStyle}
                        />
                      </Text>
                    </View>
                  </View>
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
