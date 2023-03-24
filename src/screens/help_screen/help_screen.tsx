import React, { useCallback, ReactElement } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "../../scripts/screen_params";

import { styles } from "./help_styles";

import TopNav from "../../components/top_nav/top_nav";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<HomeParamList, "HelpScreen">;

export default function HelpScreen({ navigation, route }: any) : ReactElement<Props> {

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
