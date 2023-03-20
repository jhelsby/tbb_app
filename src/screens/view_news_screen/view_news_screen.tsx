import React, { useContext } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";

import { styles } from "./view_news_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps, TNewsData } from "../../scripts/types";

import { ColorContext } from "../../context/color_context";
import { hslToString } from "../../scripts/colors";

import TopNav from "../../components/top_nav/top_nav";
import NewsSvg from "../../assets/svgs/news.svg";
import tempData from './data.temp.json';

export default function ViewNewsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const { color } = useContext(ColorContext);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView style={styles.body} 
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>{tempData.title}</Text>
        <View style={[globalStyles.tile, styles.subtitleContainer, , isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <Text style={styles.subtitle}>{tempData.author}</Text>
          <Text style={styles.subtitle}>{tempData.date}</Text>
        </View>
        <View style={styles.svgContainer}>
          <NewsSvg height="100%" width="100%" color={hslToString(color)} style={styles.svg} />
        </View>
        <View style={styles.content}>
          {
            tempData.contents.map((paragraph, index) => {
              return (
                <View key={index} style={[globalStyles.tile, styles.paragraphsContainer, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
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