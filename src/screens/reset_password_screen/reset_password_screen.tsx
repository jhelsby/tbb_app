import React, { useCallback, ReactElement, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountParamList } from "../../scripts/screen_params";

import { auth } from "../../scripts/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { styles } from "./reset_password_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TTextInputStyle } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";

import { useAppSelector, useAppDispatch } from "../../scripts/redux_hooks";
import {
  selectContainerContrast,
  selectPageContrast,
  selectTextContrast,
} from "../../slices/colorSlice";
import { sendPasswordReset } from "../../slices/accountSlice";

import Button from "../../components/button/button";
import TopNav from "../../components/top_nav/top_nav";

type Props = NativeStackScreenProps<AccountParamList, "ResetPasswordScreen">;

export default function ResetPasswordScreen({ navigation, route } : any) : ReactElement<Props> {
  const pageContrast = useAppSelector(selectPageContrast);
  const containerContrast = useAppSelector(selectContainerContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const dispatch = useAppDispatch();

  const { color, lightColor } = useContext(ColorContext);


  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );

  const [email, setEmail] = React.useState<string>("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (user) navigation.popToTop();
  }, [user, loading])


  const [isKeyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const focusedStyle = { borderColor: color, borderWidth: 2 }
  const unfocusedStyle = { borderColor: lightColor, borderWidth: 1 }
  const [textInputStyles, setTextInputStyles] = React.useState<TTextInputStyle[]>([
    unfocusedStyle,
    unfocusedStyle,
  ]);

  const handleFocus = (index: number) => {
    const newFocusedStyles = textInputStyles.map((style, i) => {
      if (i === index) {
        return focusedStyle;
      } else {
        return unfocusedStyle;
      }
    });

    setTextInputStyles(newFocusedStyles);
    setKeyboardVisible(true);
  }

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
          <Text style={[styles.title, textContrast]}>Reset Password</Text>
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              containerContrast,
              { display: isKeyboardVisible ? "none" : "flex" }
            ]}
          >
            <Text style={[styles.infoText, textContrast]}>Culpa aliquip aliqua deserunt duis mollit.</Text>
          </View>
          <View style={[
            globalStyles.tile,
            styles.form,
            containerContrast,
            isKeyboardVisible ? {} : { height: 'auto' }
          ]}>
            <View style={styles.textContainer}>
              <Text style={[styles.label, textContrast]}>Email:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[0],
                  containerContrast,
                  textContrast
                ]}
                cursorColor={color}
                onFocus={() => handleFocus(0)}
                onChange={
                  (event) => setEmail(event.nativeEvent.text)
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => dispatch(sendPasswordReset({ email }))}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}