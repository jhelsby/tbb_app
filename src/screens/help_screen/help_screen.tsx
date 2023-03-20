import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";

import { styles } from "./help_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { hslToString } from "../../scripts/colors";

import HelpSvg from "../../assets/svgs/help.svg";
import TopNav from "../../components/top_nav/top_nav";
import tempData from './data.temp.json';

export default function HelpScreen({ navigation }: TDefaultProps) : React.ReactElement<TDefaultProps> {
  const { color } = useContext(ColorContext);
  return (
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView style={styles.body} 
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        <Text style={styles.title}>Help</Text>
        <View style={styles.svgContainer}>
          <HelpSvg height="100%" width="100%" color={hslToString(color)} style={styles.svg} />
        </View>
        <View style={styles.content}>
          {
            tempData.contents.map((paragraph, index) => {
              return (
                <View key={index} style={[globalStyles.tile, styles.paragraphsContainer]}>
                  <Text style={styles.heading}>{paragraph.heading}</Text>
                  {
                    paragraph.paragraphs.map((paragraph, index) => {
                      return (
                        <Text key={index} style={styles.text}>{paragraph}</Text>
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
