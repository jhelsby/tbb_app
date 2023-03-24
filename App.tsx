import React, { ReactElement } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootTabParamList } from "./src/scripts/screen_params";

import { faMap, faHome, faNewspaper, faUser, faChartLine, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";

import TabButton from "./src/components/tab_button/tab_button";

import { styles } from './App_styles'


interface ITabScreen {
  name: string;
  icon: IconDefinition;
  component: () => Element;
};


const Tab: any = createBottomTabNavigator<RootTabParamList>();

export default function App() {


  const tabScreens: ITabScreen[] = [
    {
      name: "MapNav",
      icon: faMap,
      component: MapStackNavigator,
    },
    {
      name: "ReadingsNav",
      icon: faChartLine,
      component: ReadingsStackNavigator,
    },
    {
      name: "HomeNav",
      icon: faHome,
      component: HomeStackNavigator,
    },
    {
      name: "NewsNav",
      icon: faNewspaper,
      component: NewsStackNavigator,
    },
    {
      name: "AccountNav",
      icon: faUser,
      component: AccountStackNavigator,
    },
  ];

  const focusedScreens: boolean[] = tabScreens.map((screen: ITabScreen) => false);

  const setFocusedScreen = (index: number) => {
    // Sets all screens to false except the one at the index
    focusedScreens.forEach((screen: boolean, i: number) => {
      focusedScreens[i] = i === index;
    });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HomeNav'
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.tabBar, ...styles.tile }
        }}>
        {
          tabScreens.map((screen: ITabScreen, index: number) => {
            return (
              <Tab.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={({ navigation }: any) => ({
                    tabBarButton: () => <TabButton
                      index={index}
                      length={tabScreens.length}
                      icon={screen.icon}
                      focused={focusedScreens[index]}
                      onPress={() => {
                        setFocusedScreen(index);
                        navigation.navigate(screen.name)
                      }}
                    />
                  })
                }
              />
            );
          })
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}
