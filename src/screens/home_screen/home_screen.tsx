import React, { ReactElement, useContext } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "../../scripts/screen_params";

import { styles } from "./home_styles";
import { styles as globalStyles } from "../../../App_styles";

import { ColorContext } from "../../context/color_context";

import HomeSvg from "../../assets/svgs/home.svg";
import Button from "../../components/button/button";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectContainerContrast, selectPageContrast, selectTextContrast } from "../../slices/colorSlice";

type Props = NativeStackScreenProps<HomeParamList, "HomeScreen">;

export default function HomeScreen({ navigation } : Props) : ReactElement<Props> {

  
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const { color, lightColor } = useContext(ColorContext);

  return (
    <View style={[globalStyles.page, styles.pageContainer, pageContrast]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color }]}>Biodevices</Text>
        <Text style={[styles.headerPlain, textContrast]}>Without</Text> 
        <Text style={[styles.headerText, { color }]}>Borders</Text>
      </View>
      <View style={styles.svgContainer}>
        <HomeSvg height="100%" width="100%" color={lightColor} style={styles.svg} />
      </View>
      <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("LoadingScreen", { validNavigation: true })}>
            <Text style={styles.buttonText}>Take Readings</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("HelpScreen", { validNavigation: true })}>
            <Text style={styles.buttonText}>Help</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}