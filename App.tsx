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
  backgroundColor,
  textColor,
  colorInterpolate,
  hslToString
} from "./src/scripts/colors";

import { ContrastPolarityContext } from "./src/context/contrast_polarity_context";
import { RootNavsContext } from "./src/context/root_nav_context";

import { THSL } from "./src/scripts/types";

import { Provider } from "react-redux";
import { store } from "./src/scripts/store";
import { useAppDispatch } from "./src/scripts/redux_hooks";
import { setDarkMode, selectContainerContrast } from "./src/slices/contrast/contrastSlice";

interface ITabScreen {
  name: string;
  icon: IconDefinition;
  component: () => Element;
};


const Tab: any = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [containerContrast, setContainerContrast] = React.useState(store.getState().contrast.containerContrast);

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
    setContainerContrast(store.getState().contrast.containerContrast);
  }, [colorScheme])

  const startColor: THSL = color1;
  const startColorLight: THSL = color1Light;
  const endColor: THSL = color3;
  const endColorLight: THSL = color3Light;

  return (
    <Provider store={store}>
      <RootNavsContext.Provider value={tabScreens.map(screen => screen.name)}>
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
        </ContrastPolarityContext.Provider>
      </RootNavsContext.Provider>
    </Provider>
  );
}
