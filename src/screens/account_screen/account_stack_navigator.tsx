import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useContext, ReactElement } from "react";
import { RootTabParamList, AccountParamList } from "../../scripts/screen_params";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";

import { ColorContext } from "../../context/color_context";
import { RootNavsContext } from "../../context/root_nav_context";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";



const Stack = createNativeStackNavigator<AccountParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "AccountStack">;

export default function AccountStackNavigator() : ReactElement<Props> {

  const rootNavs = useContext(RootNavsContext);
  const index: number = rootNavs.findIndex((navName) => navName === "AccountNav");
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}