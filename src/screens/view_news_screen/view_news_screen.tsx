import React from "react";
import { View, Text } from "react-native";

import { styles } from "./view_news_styles";

export default function ViewNewsScreen() : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>View News Screen</Text>
    </View>
  );
}