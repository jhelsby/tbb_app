import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { ReactElement } from 'react';
import { RootTabParamList, NewsParamList } from '../../scripts/screen_params';

import NewsScreen from './news_screen';
import ViewNewsScreen from '../view_news_screen/view_news_screen';

const Stack = createNativeStackNavigator<NewsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'NewsStack'>;

export default function NewsStackNavigator() : ReactElement<Props> {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="ViewNewsScreen" component={ViewNewsScreen} />
    </Stack.Navigator>
  );
}