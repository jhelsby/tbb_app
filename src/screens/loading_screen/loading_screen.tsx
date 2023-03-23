import React, { useEffect, useRef } from 'react';
import { View, Animated, BackHandler } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';

import { color1, color3, colorInterpolate } from '../../scripts/colors';
import { THSL, TDefaultProps } from '../../scripts/types';

import { styles } from './loading_screen_styles';

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

    const circleAnimation = (value: Animated.Value) : void => {
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
        ])
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

    const loadingScreenTimer = setTimeout(() => {
      navigation.navigate('TakeReadings');
    }, 10000);

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      clearTimeout(loadingScreenTimer);
      console.log('Back button pressed');
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
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