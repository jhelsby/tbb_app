import React from "react";
import { View, Text, Pressable } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

import { color1, color1Light, color3, color3Light, colorInterpolate } from "../../scripts/colors";

import { THSL } from "../../scripts/types";

import { styles } from "./tab_icon_styles";

export default function TabIcon({ focused, index, length }: { focused: boolean, index: number, length: number }) : JSX.Element {
  const iconActiveSize: number = 45;
  const iconInactiveSize: number = 25;

  const icons: any[] = [ faMap, faChartLine, faHome, faNewspaper, faUser ];

  const iconActiveColor: THSL = colorInterpolate(color1, color3, index / (length - 1));
  const iconInactiveColor: THSL = colorInterpolate(color1Light, color3Light, index / (length - 1));

  const iconActiveStyle: any = { color: `hsl(${iconActiveColor.h}, ${iconActiveColor.s}%, ${iconActiveColor.l}%)` };
  const iconInactiveStyle: any = { color: `hsl(${iconInactiveColor.h}, ${iconInactiveColor.s}%, ${iconInactiveColor.l}%)` };

  return (
    <View style={styles.iconContainer}>
      <View style={styles.circleContainer}>
        <View style={[styles.circle ,focused ? styles.circleActive : styles.circleInactive]} />
      </View>
      <View style={focused ? styles.svgContainer : {}}>
        <Text>
          <FontAwesomeIcon 
            icon={icons[index]}
            size={focused ? iconActiveSize : iconInactiveSize} 
            style={focused ? iconActiveStyle : iconInactiveStyle}
          />
        </Text>
      </View>
    </View>
  );
}