import React from "react";
import { View, Text } from "react-native";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

export default function MapScreen() : JSX.Element {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>Map Screen</Text>
    </View>
  );
}