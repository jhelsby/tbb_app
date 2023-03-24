import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "../../scripts/screen_params";

import { styles } from "./home_styles";
import { styles as globalStyles } from "../../../App_styles";

import { color3, color3Light } from '../../scripts/colors';

import HomeSvg from "../../assets/svgs/home.svg";
import Button from "../../components/button/button";

type Props = NativeStackScreenProps<HomeParamList, "HomeScreen">;

export default function HomeScreen({ navigation } : Props) : ReactElement<Props> {
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
      <View style={[globalStyles.tile, styles.buttonPanel]}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate("TakeReadingScreen", { validNavigation: true })}
            activeColor={color3}
            inactiveColor={color3Light}>
            <Text style={styles.buttonText}>Take Readings</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("HelpScreen")}
            activeColor={color3}
            inactiveColor={color3Light}>
            <Text style={styles.buttonText}>Help</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}