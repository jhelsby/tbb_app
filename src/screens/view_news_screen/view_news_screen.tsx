import React from "react";
import { View, Text } from "react-native";

import { styles } from "./view_news_styles";

import { TDefaultProps } from "../../scripts/types";

import TopNav from "../../components/top_nav/top_nav";

export default function ViewNewsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  return (
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
    </View>
  );
}