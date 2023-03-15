import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./news_styles";

export default function NewsScreen(props : { navigation : any }) : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>News Screen</Text>
      <Button title="View News" onPress={() => props.navigation.navigate("View News")} />
    </View>
  );
}