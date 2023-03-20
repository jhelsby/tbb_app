import React, { useContext } from "react";
import { View, Text, useColorScheme } from "react-native";

import { styles } from "./home_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { hslToString } from "../../scripts/colors";

import HomeSvg from "../../assets/svgs/home.svg";
import Button from "../../components/button/button";

export default function HomeScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const { color, colorLight } = useContext(ColorContext);
  
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={[globalStyles.page, styles.pageContainer, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: hslToString(color)}]}>Biodevices</Text>
        <Text style={[styles.headerPlain, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Without</Text> 
        <Text style={[styles.headerText, { color: hslToString(color)}]}>Borders</Text>
      </View>
      <View style={styles.svgContainer}>
        <HomeSvg height="100%" width="100%" color={hslToString(colorLight)} style={styles.svg} />
      </View>
      <View style={[globalStyles.tile, styles.buttonPanel, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("TakeReadings")}>
            <Text style={styles.buttonText}>Take Readings</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("Help")}>
            <Text style={styles.buttonText}>Help</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}