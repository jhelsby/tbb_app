import React, {useEffect, useRef, ReactElement, useCallback} from 'react';
import {View, Animated} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';
import {useFocusEffect} from '@react-navigation/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWater} from '@fortawesome/free-solid-svg-icons';

import {
  color1,
  color3,
  colorInterpolate,
  hslToString,
} from '../../scripts/colors';
import {THSL} from '../../scripts/types';

import {styles} from './loading_screen_styles';
import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {
  selectFormattedData,
  stopReading,
  takeReading,
} from '../../slices/bluetoothSlice';

type Props = NativeStackScreenProps<HomeParamList, 'LoadingScreen'>;

export default function LoadingScreen({
  navigation,
  route,
}: any): ReactElement<Props> {
  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) {
        navigation.popToTop();
      }
      route.params.validNavigation = false;
    }, [navigation, route.params]),
  );

  let colors: string[] = [];
  for (let i: number = 0; i < 5; i++) {
    const color: THSL = colorInterpolate(color1, color3, i / 4);
    colors.push(hslToString(color));
  }

  const scaleValue1 = useRef(new Animated.Value(1)).current;
  const scaleValue2 = useRef(new Animated.Value(1)).current;
  const scaleValue3 = useRef(new Animated.Value(1)).current;
  const scaleValue4 = useRef(new Animated.Value(1)).current;
  const scaleValue5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const circleAnimation = (value: Animated.Value): void => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    circleAnimation(scaleValue1);

    setTimeout(() => {
      circleAnimation(scaleValue2);
    }, 200);

    setTimeout(() => {
      circleAnimation(scaleValue3);
    }, 400);

    setTimeout(() => {
      circleAnimation(scaleValue4);
    }, 600);

    setTimeout(() => {
      circleAnimation(scaleValue5);
    }, 800);
  }, [
    navigation,
    scaleValue1,
    scaleValue2,
    scaleValue3,
    scaleValue4,
    scaleValue5,
  ]);

  const receivedData = useAppSelector(selectFormattedData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(takeReading());
  }, [dispatch]);

  useEffect(() => {
    if (receivedData) {
      console.log('Received data: ', receivedData);
      dispatch(stopReading());
      navigation.navigate('TakeReadingScreen', {validNavigation: true});
    }
  }, [receivedData, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bigCircle,
          {backgroundColor: colors[0]},
          {transform: [{scale: scaleValue5}]},
        ]}>
        <Animated.View
          style={[
            styles.circle,
            {backgroundColor: colors[1]},
            {transform: [{scale: scaleValue4}]},
          ]}>
          <Animated.View
            style={[
              styles.circle,
              {backgroundColor: colors[2]},
              {transform: [{scale: scaleValue3}]},
            ]}>
            <Animated.View
              style={[
                styles.circle,
                {backgroundColor: colors[3]},
                {transform: [{scale: scaleValue2}]},
              ]}>
              <Animated.View
                style={[
                  styles.circle,
                  {backgroundColor: colors[4]},
                  {transform: [{scale: scaleValue1}]},
                ]}>
                <FontAwesomeIcon icon={faWater} size={50} color="#fff" />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
