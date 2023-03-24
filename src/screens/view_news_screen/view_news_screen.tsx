import React, { useCallback, ReactElement } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NewsParamList } from "../../scripts/screen_params";

import { styles } from "./view_news_styles";

import TopNav from "../../components/top_nav/top_nav";

type Props = NativeStackScreenProps<NewsParamList, "ViewNewsScreen">;

export default function ViewNewsScreen({ navigation, route } : any) : ReactElement<Props> {

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