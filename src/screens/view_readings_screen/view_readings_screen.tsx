import React from "react";
import { View, Text } from "react-native";

import { styles } from "./view_readings_styles";

export default function ViewReadingsScreen() : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>View Readings Screen</Text>
    </View>
  );
}