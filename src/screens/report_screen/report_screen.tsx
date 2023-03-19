import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import { styles } from "./report_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps, TTextInputStyle } from "../../scripts/types";

import { color3, color3Light } from "../../scripts/colors";

import ReportSvg from "../../assets/svgs/report.svg";
import Button from "../../components/button/button";
import TopNav from "../../components/top_nav/top_nav";

export default function ReportScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const [titleText, setTitleText] = React.useState<string>("");
  const [descriptionText, setDescriptionText] = React.useState<string>("");
  
  const focusedStyle = {
    borderColor: `hsl(${color3.h}, ${color3.s}%, ${color3.l}%)`,
    borderWidth: 2,
  }

  const unfocusedStyle = {
    borderColor: `hsl(${color3Light.h}, ${color3Light.s}%, ${color3Light.l}%)`,
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
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
      <View style={styles.body}>
        <Text style={styles.title}>Report</Text>
        <View style={[globalStyles.tile, styles.infoContainer]}>
          <Text style={styles.infoText}>Culpa aliquip aliqua deserunt duis mollit.</Text>
        </View>
        <View style={[globalStyles.tile, styles.form]}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={[styles.input, textInputStyles[0], styles.smallInput]}
              cursorColor={`hsl(${color3.h}, ${color3.s}%, ${color3.l}%)`}
              onFocus={() => handleFocus(0)}
              onChange={
                (event) => setTitleText(event.nativeEvent.text)
              }
            />
          </KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, textInputStyles[1], styles.largeInput]}
              cursorColor={`hsl(${color3.h}, ${color3.s}%, ${color3.l}%)`}
              onFocus={() => handleFocus(1)}
              onChange={
                (event) => setDescriptionText(event.nativeEvent.text)
              }
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} activeColor={color3} inactiveColor={color3Light}>
              <Text style={styles.buttonText}>Submit</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}