import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useContext, ReactElement} from 'react';
import {RootTabParamList, HomeParamList} from '../../scripts/screen_params';

import HomeScreen from './home_screen';
import HelpScreen from '../help_screen/help_screen';
import ViewReadingsScreen from '../view_readings_screen/view_readings_screen';
import LoadingScreen from '../loading_screen/loading_screen';

import {THSL} from '../../scripts/types';

import {ColorContext} from '../../context/color_context';
import {ContrastPolarityContext} from '../../context/contrast_polarity_context';
import {RootNavsContext} from '../../context/root_nav_context';
import {colorInterpolate} from '../../scripts/colors';

const Stack = createNativeStackNavigator<HomeParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'HomeStack'>;

export default function HomeStackNavigator(): ReactElement<Props> {
  const {startColor, startColorLight, endColor, endColorLight} = useContext(
    ContrastPolarityContext,
  );

  const rootNavs = useContext(RootNavsContext);

  const index: number = rootNavs.findIndex(navName => navName === 'HomeNav');
  const color: THSL = colorInterpolate(
    startColor,
    endColor,
    index / (rootNavs.length - 1),
  );
  const colorLight: THSL = colorInterpolate(
    startColorLight,
    endColorLight,
    index / (rootNavs.length - 1),
  );

  return (
    <ColorContext.Provider value={{color, colorLight}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="TakeReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}
