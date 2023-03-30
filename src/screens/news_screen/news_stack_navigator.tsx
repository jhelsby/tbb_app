import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useCallback, ReactElement } from 'react';
import { RootTabParamList, NewsParamList } from '../../scripts/screen_params';
import { useFocusEffect } from '@react-navigation/native';

import NewsScreen from './news_screen';
import ViewNewsScreen from '../view_news_screen/view_news_screen';

import { ColorContext } from "../../context/color_context";

import { useAppSelector, useAppDispatch } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";
import { selectNavIndex, setFocusedNav } from "../../slices/root_nav/rootNavSlice";

const Stack = createNativeStackNavigator<NewsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'NewsStack'>;

export default function NewsStackNavigator() : ReactElement<Props> {
  const dispatch = useAppDispatch();

  const index: number = useAppSelector(state => selectNavIndex(state, { name: "NewsNav" }));
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  useFocusEffect(
    useCallback(() => {
      dispatch(setFocusedNav(index));
    }, [])
  );

  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen name="ViewNewsScreen" component={ViewNewsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}