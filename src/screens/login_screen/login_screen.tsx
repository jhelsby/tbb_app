import React, { useCallback, ReactElement, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountParamList } from "../../scripts/screen_params";

import { auth, signInWithGoogle, logInWithEmailAndPassword } from "../../scripts/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { styles } from "./login_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TTextInputStyle } from "../../scripts/types";

import { hslToString } from "../../scripts/colors";

import { ColorContext } from "../../context/color_context";

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

  const isDarkMode = useColorScheme() === "dark";
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;

  const { color, colorLight } = useContext(ColorContext);

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


  const focusedStyle = {
    borderColor: hslToString(color),
    borderWidth: 2,
  }

  const unfocusedStyle = {
    borderColor: hslToString(colorLight),
    borderWidth: 1,
  }

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
                cursorColor={hslToString(color)}
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
                cursorColor={hslToString(color)}
                onFocus={() => handleFocus(0)}
                secureTextEntry={true}
                onChange={
                  (event) => setPassword(event.nativeEvent.text)
                }
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => logInWithEmailAndPassword(email, password)}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={signInWithGoogle}>
                <Text style={styles.buttonText}>Login with Google</Text>
              </Button>
            </View>
            <Text style={[styles.bottomText, styles.clickableText, { color: hslToString(color) }]} onPress={() => {}}>Forgot Password</Text>
            <Text style={[textContrast, styles.bottomText]}>Don't have an account?
              <Text 
                style={[styles.bottomText, styles.clickableText, { color: hslToString(color) }]}
                onPress={() => navigation.navigate("SignupScreen", { validNavigation: true })}
              > Register Now! </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}