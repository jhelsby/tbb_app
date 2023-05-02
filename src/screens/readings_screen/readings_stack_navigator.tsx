import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useCallback, ReactElement} from 'react';
import {RootTabParamList, ReadingsParamList} from '../../scripts/screen_params';
import {useFocusEffect} from '@react-navigation/native';

import ReadingsScreen from './readings_screen';
import ViewReadingsScreen from '../view_readings_screen/view_readings_screen';

import {ColorContext} from '../../context/color_context';

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {selectColor, selectLightColor} from '../../slices/colorSlice';
import {selectNavIndex, setFocusedNav} from '../../slices/rootNavSlice';

const Stack = createNativeStackNavigator<ReadingsParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'ReadingsStack'>;

export default function ReadingsStackNavigator(): ReactElement<Props> {
  const dispatch = useAppDispatch();

  const index: number = useAppSelector(state =>
    selectNavIndex(state, {name: 'ReadingsNav'}),
  );
  const color: string = useAppSelector(state => selectColor(state, {index}));
  const lightColor: string = useAppSelector(state =>
    selectLightColor(state, {index}),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(setFocusedNav(index));
    }, [dispatch, index]),
  );

  return (
    <ColorContext.Provider value={{color, lightColor}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ReadingsScreen" component={ReadingsScreen} />
        <Stack.Screen name="ViewReadingScreen" component={ViewReadingsScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}
