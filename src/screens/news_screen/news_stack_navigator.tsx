import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import NewsScreen from './news_screen';
import ViewNewsScreen from '../view_news_screen/view_news_screen';

const Stack = createNativeStackNavigator();

export default function NewsStackNavigator() : JSX.Element {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="ViewNews" component={ViewNewsScreen} />
    </Stack.Navigator>
  );
}