import React from "react";
import { View, Text, Platform, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

import {
  color1,
  color1Light,
  color3,
  color3Light,
  backgroundColor,
  textColor,
  colorInterpolate,
  hslToString
} from "./src/scripts/colors";

import { ContrastPolarityContext } from "./src/context/contrast_polarity_context";
import { RootNavsContext } from "./src/context/root_nav_context";

import { THSL, TRootNav } from "./src/scripts/types";

import { styles } from "./App_styles";




const Tab: any = createBottomTabNavigator();

const rootNavs: TRootNav[] = [
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

export default function App(): JSX.Element {
  const iconActiveSize: number = 45;
  const iconInactiveSize: number = 25;

  const isDarkMode: boolean = useColorScheme() === "dark";
  const containerStyle = isDarkMode ? styles.darkContainer : styles.lightContainer;

  const startColor: THSL = color1;
  const startColorLight: THSL = color1Light;
  const endColor: THSL = color3;
  const endColorLight: THSL = color3Light;

  return (
    <RootNavsContext.Provider value={rootNavs.map(nav => nav.name)}>
      <ContrastPolarityContext.Provider value={{
        startColor,
        startColorLight,
        endColor,
        endColorLight,
        backgroundColor,
        textColor
      }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='HomeNav'
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: { ...styles.tabBar, ...styles.tile, ...containerStyle },
              tabBarHideOnKeyboard: true,
              tabBarItemStyle: { 
                JustifyContent: "flex-end",
                alignItems: "center",
                height: '100%',
              },
            }}>
            {rootNavs.map((screen: TRootNav, index: number) => {
              const activeColor: THSL = colorInterpolate(startColor, endColor, index / rootNavs.length);
              const inactiveColor: THSL = colorInterpolate(startColorLight, endColorLight, index / rootNavs.length);
              const iconActiveStyle: { color: string } = {
                color: hslToString(activeColor),
              };
              const iconInactiveStyle: { color: string } = {
                color: hslToString(inactiveColor),
              };
              return (
                <Tab.Screen
                  key={index}
                  name={screen.name}
                  component={screen.component}
                  options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => 
                      <View style={[styles.iconContainer, Platform.OS === 'ios' ? { position: 'relative', top: 15 } : {}]}>
                        <View style={styles.circleContainer}>
                          <View style={[
                            styles.circle,
                            focused ? styles.circleActive : styles.circleInactive,
                            isDarkMode ? styles.darkContainer : styles.lightContainer
                          ]} />
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
      </ContrastPolarityContext.Provider>
    </RootNavsContext.Provider>
  );
}
