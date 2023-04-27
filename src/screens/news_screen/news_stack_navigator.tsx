import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useContext, ReactElement} from 'react';
import {RootTabParamList, NewsParamList} from '../../scripts/screen_params';

import NewsScreen from './news_screen';
import ViewNewsScreen from '../view_news_screen/view_news_screen';

import {THSL} from '../../scripts/types';

import {ColorContext} from '../../context/color_context';
import {ContrastPolarityContext} from '../../context/contrast_polarity_context';
import {RootNavsContext} from '../../context/root_nav_context';
import {colorInterpolate} from '../../scripts/colors';

const Stack = createNativeStackNavigator<NewsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'NewsStack'>;

export default function NewsStackNavigator(): ReactElement<Props> {
  const {startColor, startColorLight, endColor, endColorLight} = useContext(
    ContrastPolarityContext,
  );

  const rootNavs = useContext(RootNavsContext);

  const index: number = rootNavs.findIndex(navName => navName === 'NewsNav');
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
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen name="ViewNewsScreen" component={ViewNewsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}
