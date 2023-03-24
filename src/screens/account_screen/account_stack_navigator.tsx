import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement } from "react";
import { RootTabParamList, AccountParamList } from "../../scripts/screen_params";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";

const Stack = createNativeStackNavigator<AccountParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "AccountStack">;

export default function AccountStackNavigator() : ReactElement<Props> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
    </Stack.Navigator>
  );
}