import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapParamList } from "../../scripts/screen_params";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

type Props = NativeStackScreenProps<MapParamList, "MapScreen">;

export default function MapScreen() : ReactElement<Props> {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>Map Screen</Text>
    </View>
  );
}