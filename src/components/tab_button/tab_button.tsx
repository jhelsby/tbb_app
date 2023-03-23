import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { color1, color1Light, color3, color3Light, colorInterpolate } from "../../scripts/colors";

import { THSL } from "../../scripts/types";

import { styles } from "./tab_button_styles";

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

export default function TabButton(props: any) {
  const { icon, onPress, focused, index, length } = props;

  const activeColor: THSL = colorInterpolate(color1, color3, index/(length - 1));
  const inactiveColor: THSL = colorInterpolate(color1Light, color3Light, index/(length - 1));
  const activeColorString: string = `hsl(${activeColor.h}, ${activeColor.s}%, ${activeColor.l}%)`;
  const inactiveColorString: string = `hsl(${inactiveColor.h}, ${inactiveColor.s}%, ${inactiveColor.l}%)`;
  
  const viewRef = useRef(null) as React.RefObject<Animatable.View & View>;
  const circleRef = useRef(null) as React.RefObject<Animatable.View & View>;

  useFocusEffect(() => {
    console.log(`${index} is focused`)
  });

  useEffect(() => {
    console.log("animation")
    if (viewRef.current && circleRef.current) {
      //Animate here
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <FontAwesomeIcon
            icon={icon}
            size={30}
            color={focused ? activeColorString : inactiveColorString} />
        </View>
      </Animatable.View>
    </TouchableOpacity>
  )
}