import React, { useContext, useEffect } from "react";
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

import { styles } from "./report_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps, TTextInputStyle } from "../../scripts/types";

import { hslToString } from "../../scripts/colors";

import { ColorContext } from "../../context/color_context";

import ReportSvg from "../../assets/svgs/report.svg";
import Button from "../../components/button/button";
import TopNav from "../../components/top_nav/top_nav";

export default function ReportScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const [titleText, setTitleText] = React.useState<string>("");
  const [descriptionText, setDescriptionText] = React.useState<string>("");

  const isDarkMode = useColorScheme() === "dark";
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

  const handleSubmit = () => {
    const inputData = {
      title: titleText,
      description: descriptionText,
    }
    console.log("Submitted: ", inputData);
    navigation.goBack();
  }

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.body}>
          <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Report</Text>
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer,
              { display: isKeyboardVisible ? "none" : "flex" }
            ]}
          >
            <Text style={[styles.infoText, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Culpa aliquip aliqua deserunt duis mollit.</Text>
          </View>
          <View style={[
            globalStyles.tile,
            styles.form, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer,
            isKeyboardVisible ? {} : { flex: 1 }
          ]}>
            <View style={styles.textContainer}>
              <Text style={[styles.label, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Title:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[0],
                  styles.smallInput,
                  isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer,
                  isDarkMode ? globalStyles.darkText : globalStyles.lightText
                ]}
                cursorColor={hslToString(color)}
                onFocus={() => handleFocus(0)}
                onChange={
                  (event) => setTitleText(event.nativeEvent.text)
                }
              />
            </View>
            <View style={[styles.multitextContainer, isKeyboardVisible ? {} : { flex: 1}]}>
              <Text style={[styles.label, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Description:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[1],
                  isKeyboardVisible ? { height: 200 } : { flex: 1 },
                  isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer,
                  isDarkMode ? globalStyles.darkText : globalStyles.lightText
                ]}
                cursorColor={hslToString(color)}
                onFocus={() => handleFocus(1)}
                onChange={
                  (event) => setDescriptionText(event.nativeEvent.text)
                }
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}