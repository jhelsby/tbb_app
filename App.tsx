import React, { useEffect } from "react";
import { useColorScheme, ColorSchemeName } from "react-native";
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

import { styles } from "./App_styles";

import {
  color1,
  color1Light,
  color3,
  color3Light,
} from "./src/scripts/colors";

import { RootNavsContext } from "./src/context/root_nav_context";

import { Provider } from "react-redux";
import { store } from "./src/scripts/store";
import { setDarkMode, setColors } from "./src/slices/color/colorSlice";

interface ITabScreen {
  name: string;
  icon: IconDefinition;
  component: () => Element;
};


const Tab: any = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [containerContrast, setContainerContrast] = React.useState(store.getState().color.containerContrast);

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

  const focusedScreens: boolean[] = tabScreens.map((screen: ITabScreen) => screen.name === "HomeNav");

  const setFocusedScreen = (index: number) => {
    // Sets all screens to false except the one at the index
    focusedScreens.forEach((screen: boolean, i: number) => {
      focusedScreens[i] = i === index;
    });
  };

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
      length: tabScreens.length
    }));
  }, [])

  return (
    <Provider store={store}>
      <RootNavsContext.Provider value={tabScreens.map(screen => screen.name)}>
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
      </RootNavsContext.Provider>
    </Provider>
  );
}
