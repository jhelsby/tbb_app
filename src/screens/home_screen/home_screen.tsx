import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./home_styles";

export default function HomeScreen(props: { navigation: any }) : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Help" onPress={() => props.navigation.navigate("Help")} />
      <Button title="Take Readings" onPress={() => props.navigation.navigate("TakeReadings")} />
    </View>
  );
}