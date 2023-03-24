import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement } from "react";
import { RootTabParamList, MapParamList } from "../../scripts/screen_params";

import MapScreen from "./map_screen";

const Stack = createNativeStackNavigator<MapParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "MapStack">;

export default function MapStackNavigator() : ReactElement<Props> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}