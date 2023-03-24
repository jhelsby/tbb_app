import React, { useContext, useCallback, ReactElement } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "../../scripts/screen_params";

import { styles } from "./help_styles";
import { styles as globalStyles } from "../../../App_styles";

import { ColorContext } from "../../context/color_context";
import { hslToString } from "../../scripts/colors";

import HelpSvg from "../../assets/svgs/help.svg";
import TopNav from "../../components/top_nav/top_nav";
import tempData from './data.temp.json';
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<HomeParamList, "HelpScreen">;

export default function HelpScreen({ navigation, route }: any) : ReactElement<Props> {

  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );

  const { color } = useContext(ColorContext);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView style={styles.body} 
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        <Text style={[styles.title, , isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Help</Text>
        <View style={styles.svgContainer}>
          <HelpSvg height="100%" width="100%" color={hslToString(color)} style={styles.svg} />
        </View>
        <View style={styles.content}>
          {
            tempData.contents.map((paragraph, index) => {
              return (
                <View key={index} style={[globalStyles.tile, styles.paragraphsContainer, , isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
                  <Text style={[styles.heading, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>{paragraph.heading}</Text>
                  {
                    paragraph.paragraphs.map((paragraph, index) => {
                      return (
                        <Text key={index} style={[styles.text, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>{paragraph}</Text>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}
