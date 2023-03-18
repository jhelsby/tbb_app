import React from "react";
import { View, Text } from "react-native";

import { styles } from "./help_styles";

import { TDefaultProps } from "../../scripts/types";

import TopNav from "../../components/top_nav/top_nav";

export default function HelpScreen({ navigation }: TDefaultProps) : React.ReactElement<TDefaultProps> {
  return (
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
    </View>
  );
}
