import React, { ReactElement, useEffect } from "react";
import { useColorScheme, ColorSchemeName } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootTabParamList } from "./src/scripts/screen_params";

import TabButton from "./src/components/tab_button/tab_button";

import { styles } from "./App_styles";

import { color1, color1Light, color3, color3Light } from "./src/scripts/colors";

import { Provider } from "react-redux";
import { store } from "./src/scripts/store";
import { setDarkMode, setColors } from "./src/slices/color/colorSlice";
import { TRootNav } from "./src/scripts/types";

import MapStackNavigator from "./src/screens/map_screen/map_stack_navigator";
import ReadingsStackNavigator from "./src/screens/readings_screen/readings_stack_navigator";
import HomeStackNavigator from "./src/screens/home_screen/home_stack_navigator";
import NewsStackNavigator from "./src/screens/news_screen/news_stack_navigator";
import AccountStackNavigator from "./src/screens/account_screen/account_stack_navigator";


const Tab: any = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [containerContrast, setContainerContrast] = React.useState(store.getState().color.containerContrast);
  const rootNavs = store.getState().rootNav.rootNavs;

  // Set dark mode
  const colorScheme: ColorSchemeName = useColorScheme();
  useEffect(() => {
    store.dispatch(setDarkMode(colorScheme === "dark"))
    setContainerContrast(store.getState().color.containerContrast);
  }, [colorScheme])


  useEffect(() => {
    store.dispatch(setColors({
      startColor: color1,
      startLightColor: color1Light,
      endColor: color3,
      endLightColor: color3Light,
      length: rootNavs.length
    }));
  }, [])

  const components: (() => ReactElement)[] = [
    MapStackNavigator,
    ReadingsStackNavigator,
    HomeStackNavigator,
    NewsStackNavigator,
    AccountStackNavigator
  ];

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='HomeNav'
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              ...styles.tabBar,
              ...styles.tile,
              ...containerContrast
            }
          }}>
          {
            rootNavs.map((rootNav: TRootNav, index: number) => {
              return (
                <Tab.Screen
                  key={index}
                  name={rootNav.name}
                  component={components[index]}
                  options={({ navigation }: any) => ({
                      tabBarButton: () => <TabButton
                        index={index}
                        length={rootNavs.length}
                        icon={rootNav.icon}
                        onPress={() => navigation.navigate(rootNav.name)}
                      />
                    })
                  }
                />
              );
            })
          }
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
