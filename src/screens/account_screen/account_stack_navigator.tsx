import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";

const Stack = createNativeStackNavigator();

export default function AccountStackNavigator() : JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}