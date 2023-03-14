import React from "react";
import { View, Text } from "react-native";

import { styles } from "./news_styles";

export default function NewsScreen() : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>News Screen</Text>
    </View>
  );
}