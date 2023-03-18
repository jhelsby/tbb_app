import React from "react";
import { View, Text, Pressable } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMap, faHome, faNewspaper, faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

import { color1, color1Light, color3, color3Light, colorInterpolate } from "../../scripts/colors";

import { THSL } from "../../scripts/types";

import { styles } from "./tab_bar_styles";

export default function TabBar({ state, descriptors, navigation }: { state: any, descriptors: any, navigation: any }) : JSX.Element {
  const iconActiveSize: number = 45;
  const iconInactiveSize: number = 25;

  const icons: any[] = [ faMap, faChartLine, faHome, faNewspaper, faUser ];

  return (
    <View style={{ flexDirection: 'row' }}>
      {
      state.routes.map((route: any, index: number) => {
        const activeColor: THSL = colorInterpolate(color1, color3, index / state.routes.length);
        const inactiveColor: THSL = colorInterpolate(color1Light, color3Light, index / state.routes.length);

        const iconActiveStyle: { color: string } = {
          color: `hsl(${activeColor.h}, ${activeColor.s}%, ${activeColor.l}%)`,
        };
    
        const iconInactiveStyle: { color: string } = {
          color: `hsl(${inactiveColor.h}, ${inactiveColor.s}%, ${inactiveColor.l}%)`
        };

        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.iconContainer}
          >
            <View style={styles.circleContainer}>
                <View style={[styles.circle, isFocused ? styles.circleActive : styles.circleInactive]} />
              </View>
              <View style={isFocused ? styles.svgContainer : {}}>
                <Text>
                  
                </Text>
              </View>
          </Pressable>
        );
      })}
    </View>
  );
}