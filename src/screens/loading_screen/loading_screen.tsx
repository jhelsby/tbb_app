import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';

import { color1, color3, colorInterpolate } from '../../scripts/colors';
import { THSL, TDefaultProps } from '../../scripts/types';

import { styles } from './loading_screen_styles';
import { config } from '@fortawesome/fontawesome-svg-core';

export default function LoadingScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  let colors: string[] = [];
  for(let i: number = 0; i < 5; i++) {
    const color: THSL = colorInterpolate(color1, color3, i / 4);
    colors.push(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
  }

  const scaleValue1 = useRef(new Animated.Value(1)).current;
  const scaleValue2 = useRef(new Animated.Value(1)).current;
  const scaleValue3 = useRef(new Animated.Value(1)).current;
  const scaleValue4 = useRef(new Animated.Value(1)).current;
  const scaleValue5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue1, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue2, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue2, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 200);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue3, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue3, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 400);
    
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue4, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue4, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 600);

    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue5, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue5, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, 800);

    setTimeout(() => {
      navigation.navigate('TakeReadings');
    }, 10000);
  }, []);


  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.bigCircle,
        { backgroundColor: colors[0] },
        { transform: [{ scale: scaleValue5 }] }
      ]}>
        <Animated.View style={[
          styles.circle,
          { backgroundColor: colors[1] },
          { transform: [{ scale: scaleValue4 }] }
        ]}>
          <Animated.View style={[
            styles.circle,
            { backgroundColor: colors[2] },
            { transform: [{ scale: scaleValue3 }] }
          ]}>
            <Animated.View style={[
              styles.circle,
              { backgroundColor: colors[3] },
              { transform: [{ scale: scaleValue2 }] }
            ]}>
              <Animated.View style={[
                styles.circle,
                { backgroundColor: colors[4] },
                { transform: [{ scale: scaleValue1 }] }
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