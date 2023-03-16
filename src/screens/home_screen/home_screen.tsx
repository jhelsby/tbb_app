import React from "react";
import { View, Text, Pressable } from "react-native";

import { styles } from "./home_styles";
import { styles as globalStyles } from "../../../App_styles";

import HomeSvg from "../../assets/svgs/home.svg";

export default function HomeScreen(props: { navigation: any }) : JSX.Element {
  const [helpPressed, setHelpPressed] = React.useState(false);
  const [takeReadingsPressed, setTakeReadingsPressed] = React.useState(false);



  const handleTakeReadingsPressIn = () => {
    setTakeReadingsPressed(true);
    props.navigation.navigate("TakeReadings");
  };

  const handleTakeReadingsPressOut = () => {
    setTakeReadingsPressed(false);
  };
  
  const handleHelpPressIn = () => {
    setHelpPressed(true);
    props.navigation.navigate("Help");
  };

  const handleHelpPressOut = () => {
    setHelpPressed(false);
  };

  return (
    <View style={[globalStyles.page ,styles.pageContainer]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Biodevices</Text>
        <Text style={styles.headerPlain}>Without</Text> 
        <Text style={styles.headerText}>Borders</Text>
      </View>
      <View style={styles.svgContainer}>
        <HomeSvg height="100%" width="100%" style={styles.svg} />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, takeReadingsPressed ? styles.active : styles.inactive]}
          onPressIn={handleTakeReadingsPressIn}
          onPressOut={handleTakeReadingsPressOut}>
          <Text style={styles.buttonText}>Take Readings</Text>
        </Pressable>
        <Pressable
          style={[styles.button, helpPressed ? styles.active : styles.inactive]}
          onPressIn={handleHelpPressIn}
          onPressOut={handleHelpPressOut}>
          <Text style={styles.buttonText}>Help</Text>
        </Pressable>
      </View>
    </View>
  );
}