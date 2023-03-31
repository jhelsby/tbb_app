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

import { styles } from "./login_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TTextInputStyle } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";

import { useAppSelector, useAppDispatch } from "../../scripts/redux_hooks";
import {
  selectContainerContrast,
  selectPageContrast,
  selectTextContrast,
} from "../../slices/color/colorSlice";
import { logInWithEmailAndPassword } from "../../slices/account/accountSlice";

import Button from "../../components/button/button";
import TopNav from "../../components/top_nav/top_nav";

type Props = NativeStackScreenProps<AccountParamList, "LoginScreen">;

export default function LoginScreen({ navigation, route } : any) : ReactElement<Props> {
  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );




  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    }
    if (user) {
      navigation.popToTop();
    }
  }, [user, loading])



  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const { color, lightColor } = useContext(ColorContext);


  const dispatch = useAppDispatch();


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
          <Text style={[styles.title, textContrast]}>Login</Text>
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
            <View style={styles.textContainer}>
              <Text style={[styles.label, textContrast]}>Password:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[0],
                  containerContrast,
                  textContrast
                ]}
                cursorColor={color}
                onFocus={() => handleFocus(0)}
                secureTextEntry={true}
                onChange={
                  (event) => setPassword(event.nativeEvent.text)
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => dispatch(logInWithEmailAndPassword({email, password}))}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </View>
            <Text
              style={[styles.bottomText, styles.clickableText, { color }]}
              onPress={() => navigation.navigate("ResetPasswordScreen", { validNavigation: true })}
            >Forgot Password
            </Text>
            <Text style={[textContrast, styles.bottomText]}>Don't have an account?
              <Text 
                style={[styles.bottomText, styles.clickableText, { color }]}
                onPress={() => navigation.navigate("SignupScreen", { validNavigation: true })}
              > Register Now! </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}