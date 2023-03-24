import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated, useColorScheme } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { color1, color1Light, color3, color3Light, colorInterpolate } from "../../scripts/colors";

import { THSL } from "../../scripts/types";

import { styles } from "./tab_button_styles";
import { styles as globalStyles } from "../../../App_styles";



export default function TabButton(props: any) {
  const {
    icon,
    onPress,
    focused,
    index,
    length,
  } = props;

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;

  const activeColor: THSL = colorInterpolate(color1, color3, index/(length - 1));
  const inactiveColor: THSL = colorInterpolate(color1Light, color3Light, index/(length - 1));
  const activeColorString: string = `hsl(${activeColor.h}, ${activeColor.s}%, ${activeColor.l}%)`;
  const inactiveColorString: string = `hsl(${inactiveColor.h}, ${inactiveColor.s}%, ${inactiveColor.l}%)`;

  const viewScale: Animated.Value = useRef(new Animated.Value(1)).current;
  const viewTranslate: Animated.Value = useRef(new Animated.Value(0)).current;

  // circleScale is used to animate the circle in and out of view but can also be used
  // to animate the opacity of the active icon as they are the same value.
  const circleScale: Animated.Value = useRef(new Animated.Value(0)).current;
  const inactiveIconOpacity: Animated.Value = useRef(new Animated.Value(1)).current;


  const timeSpan: number = 300;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(viewScale, {
        toValue: focused ? 1.5 : 1,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(viewTranslate, {
        toValue: focused ? -18 : 0,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(circleScale, {
        toValue: focused ? 1 : 0,
        duration: timeSpan,
        useNativeDriver: true,
      }),
      Animated.timing(inactiveIconOpacity, {
        toValue: focused ? 0 : 1,
        duration: timeSpan,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.buttonContainer}>
      <Animated.View
        style={[styles.button, { transform: [{ scale: viewScale }, { translateY: viewTranslate }]}]}>
        <View style={[
          styles.iconContainer,
          containerContrast,
          isDarkMode ? styles.borderDark : styles.borderLight,
        ]}>
          <Animated.View
            style={[
              styles.circle,
              { backgroundColor: activeColorString },
              { transform: [{ scale: circleScale }]}
            ]} />
          <Animated.View
            style={[
              styles.icon,
              { opacity: circleScale }
            ]}>
            <FontAwesomeIcon icon={icon} size={25} color={'#fff'} />
          </Animated.View>
          <Animated.View
            style={[
              styles.icon,
              { opacity: inactiveIconOpacity }
            ]}>
            <FontAwesomeIcon icon={icon} size={30} color={inactiveColorString} />
          </Animated.View>
          
        </View>
      </Animated.View>
    </TouchableOpacity>
  )
}