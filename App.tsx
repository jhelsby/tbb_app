import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { Circle } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

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
          tabBarStyle: { ...styles.tabBar },
          tabBarItemStyle: { 
            JustifyContent: "flex-end",
          },
        }}>
        {tabScreens.map((screen: TTabScreen, index: number) => {
          return (
            <Tab.Screen
              key={index}
              name={screen.name}
              component={screen.component}
              options={{
                tabBarIcon: ({ focused }: { focused: boolean }) => 
                  <View style={styles.iconContainer}>
                    <View style={styles.circleContainer}>
                      <Svg height={90} width={90}>
                        <Circle
                          cx={45}
                          cy={35}
                          r={focused ? 35 : 10}
                          fill='white'
                        />
                      </Svg>
                    </View>
                    <View style={focused ? styles.svgContainer : {}}>
                      <Text>
                        <FontAwesomeIcon 
                          icon={screen.icon}
                          size={focused ? iconActiveSize : iconInactiveSize} 
                          style={focused ? styles.iconActive : styles.iconInactive}
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
