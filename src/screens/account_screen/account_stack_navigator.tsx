import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { ReactElement, useCallback } from "react";
import { RootTabParamList, AccountParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import AccountScreen from "./account_screen";
import ReportScreen from "../report_screen/report_screen";
import LoginScreen from "../login_screen/login_screen";
import SignupScreen from "../signup_screen/signup_screen";
import ResetPasswordScreen from "../reset_password_screen/reset_password_screen";

import { ColorContext } from "../../context/color_context";

import { useAppSelector, useAppDispatch } from "../../scripts/redux_hooks";
import { selectColor, selectLightColor } from "../../slices/color/colorSlice";
import { selectNavIndex, setFocusedNav } from "../../slices/root_nav/rootNavSlice";




const Stack = createNativeStackNavigator<AccountParamList>();
type Props = BottomTabScreenProps<RootTabParamList, "AccountStack">;

export default function AccountStackNavigator() : ReactElement<Props> {
  const dispatch = useAppDispatch();

  const index: number = useAppSelector(state => selectNavIndex(state, { name: "AccountNav" }));
  const color: string = useAppSelector(state => selectColor(state, { index }));
  const lightColor: string = useAppSelector(state => selectLightColor(state, { index }));

  useFocusEffect(
    useCallback(() => {
      dispatch(setFocusedNav(index));
    }, [])
  );

  return (
    <ColorContext.Provider value={{ color, lightColor }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="ReportScreen" component={ReportScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </ColorContext.Provider>
  );
}