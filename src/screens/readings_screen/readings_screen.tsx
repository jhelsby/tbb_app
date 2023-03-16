import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

export default function ReadingsScreen(props : { navigation : any }) : JSX.Element {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>Readings Screen</Text>
      <Button title="View Readings" onPress={() => props.navigation.navigate("ViewReadings")} />
    </View>
  );
}