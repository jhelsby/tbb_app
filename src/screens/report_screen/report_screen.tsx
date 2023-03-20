import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  useColorScheme
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
      <View style={styles.body}>
        <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Report</Text>
        <View style={[globalStyles.tile, styles.infoContainer, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <Text style={[styles.infoText, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Culpa aliquip aliqua deserunt duis mollit.</Text>
        </View>
        <View style={[globalStyles.tile, styles.form, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Title:</Text>
            <TextInput
              style={[styles.input, textInputStyles[0], styles.smallInput, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}
              cursorColor={hslToString(color)}
              onFocus={() => handleFocus(0)}
              onChange={
                (event) => setTitleText(event.nativeEvent.text)
              }
            />
          </KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Description:</Text>
            <TextInput
              style={[styles.input, textInputStyles[1], styles.largeInput, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}
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
      </View>
    </View>
  );
}