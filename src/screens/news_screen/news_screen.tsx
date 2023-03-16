import React from "react";
import { View, Text, Button } from "react-native";

import { styles } from "./news_styles";
import { styles as globalStyles } from "../../../App_styles";

export default function NewsScreen(props : { navigation : any }) : JSX.Element {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>News Screen</Text>
      <Button title="View News" onPress={() => props.navigation.navigate("View News")} />
    </View>
  );
}