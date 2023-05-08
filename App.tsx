/* eslint-disable react/no-unstable-nested-components */
import React, {ReactElement, useEffect, useState} from 'react';
import {
  useColorScheme,
  ColorSchemeName,
  Keyboard,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {RootTabParamList} from './src/scripts/screen_params';

import TabButton from './src/components/tab_button/tab_button';

import {styles} from './App_styles';

import {Provider} from 'react-redux';
import {store} from './src/scripts/store';
import {setDarkMode, setColors} from './src/slices/colorSlice';
import {TRootNav} from './src/scripts/types';

import {color1, color1Light, color2, color2Light} from './src/scripts/colors';

import MapStackNavigator from './src/screens/map_screen/map_stack_navigator';
import ReadingsStackNavigator from './src/screens/readings_screen/readings_stack_navigator';
import HomeStackNavigator from './src/screens/home_screen/home_stack_navigator';
import NewsStackNavigator from './src/screens/news_screen/news_stack_navigator';
import AccountStackNavigator from './src/screens/account_screen/account_stack_navigator';

const Tab: any = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  const [containerContrast, setContainerContrast] = React.useState(
    store.getState().color.containerContrast,
  );
  const rootNavs = store.getState().rootNav.rootNavs;

  // Set dark mode
  const colorScheme: ColorSchemeName = useColorScheme();
  useEffect(() => {
    store.dispatch(setDarkMode(colorScheme === 'dark'));
    setContainerContrast(store.getState().color.containerContrast);
  }, [colorScheme]);

  useEffect(() => {
    store.dispatch(
      setColors({
        startColor: color1,
        startLightColor: color1Light,
        endColor: color2,
        endLightColor: color2Light,
        length: rootNavs.length,
      }),
    );
  }, [rootNavs.length]);

  const components: (() => ReactElement)[] = [
    MapStackNavigator,
    ReadingsStackNavigator,
    HomeStackNavigator,
    NewsStackNavigator,
    AccountStackNavigator,
  ];

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#1E1E1E' : '#EBF1FF'}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeNav"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              ...styles.tabBar,
              ...styles.tile,
              ...containerContrast,
              bottom: isKeyboardVisible ? -100 : 16,
            },
          }}>
          {rootNavs.map((rootNav: TRootNav, index: number) => {
            return (
              <Tab.Screen
                key={index}
                name={rootNav.name}
                component={components[index]}
                options={({navigation}: any) => ({
                  tabBarButton: () => (
                    <TabButton
                      index={index}
                      length={rootNavs.length}
                      icon={rootNav.icon}
                      onPress={() => navigation.navigate(rootNav.name)}
                    />
                  ),
                })}
              />
            );
          })}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
