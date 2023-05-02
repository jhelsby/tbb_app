import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { styles } from "./tab_button_styles";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor, selectContainerContrast, selectDarkMode } from "../../slices/colorSlice";
import { selectNavFocus } from "../../slices/rootNavSlice";



export default function TabButton(props: any) {
  const isDarkMode = useAppSelector(selectDarkMode);
  const containerContrast = useAppSelector(selectContainerContrast);

  const activeColor: string = useAppSelector(state => selectColor(state, { index: props.index }));
  const inactiveColor: string = useAppSelector(state => selectLightColor(state, { index: props.index }));

  const isFocused: boolean = useAppSelector(state => selectNavFocus(state, { index: props.index }))


  // circleScale is used to animate the circle in and out of view but can also be used
  // to animate the opacity of the active icon as they are the same value.
  const circleScale: Animated.Value = useRef(new Animated.Value(0)).current;
  const inactiveIconOpacity: Animated.Value = useRef(new Animated.Value(1)).current;
  const viewScale: Animated.Value = useRef(new Animated.Value(1)).current;
  const viewTranslate: Animated.Value = useRef(new Animated.Value(0)).current;


  const timeSpan: number = 300;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(viewScale, {
        toValue: isFocused ? 1.5 : 1,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(viewTranslate, {
        toValue: isFocused ? -18 : 0,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(circleScale, {
        toValue: isFocused ? 1 : 0,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(inactiveIconOpacity, {
        toValue: isFocused ? 0 : 1,
        duration: timeSpan,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={1}
      style={styles.buttonContainer}>
      <Animated.View
        style={[
          styles.button,
          {transform: [{scale: viewScale}, {translateY: viewTranslate}]},
        ]}>
        <View
          style={[
            styles.iconContainer,
            containerContrast,
            isDarkMode ? styles.borderDark : styles.borderLight,
          ]}>
          <Animated.View
            style={[
              styles.circle,
              { backgroundColor: activeColor },
              { transform: [{ scale: circleScale }]}
            ]} />
          <Animated.View
            style={[
              styles.icon,
              { opacity: circleScale }
            ]}>
            <FontAwesomeIcon icon={props.icon} size={25} color={'#fff'} />
          </Animated.View>
          <Animated.View
            style={[
              styles.icon,
              { opacity: inactiveIconOpacity }
            ]}>
            <FontAwesomeIcon icon={props.icon} size={30} color={inactiveColor} />
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
