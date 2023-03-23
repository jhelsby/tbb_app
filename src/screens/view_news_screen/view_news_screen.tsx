import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./view_news_styles";

import { TDefaultProps } from "../../scripts/types";

import TopNav from "../../components/top_nav/top_nav";

export default function ViewNewsScreen({ navigation, route } : any) : React.ReactElement<TDefaultProps> {

  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );

  return (
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
    </View>
  );
}