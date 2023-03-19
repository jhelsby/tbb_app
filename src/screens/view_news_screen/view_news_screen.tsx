import React from "react";
import { View, Text, ScrollView } from "react-native";

import { styles } from "./view_news_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps, TNewsData } from "../../scripts/types";

import TopNav from "../../components/top_nav/top_nav";

import NewsSvg from "../../assets/svgs/news.svg";

import tempData from './data.temp.json';

export default function ViewNewsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  return (
    <View style={styles.container}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView style={styles.body} 
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        <Text style={styles.title}>{tempData.title}</Text>
        <View style={[globalStyles.tile, styles.subtitleContainer]}>
          <Text style={styles.subtitle}>{tempData.author}</Text>
          <Text style={styles.subtitle}>{tempData.date}</Text>
        </View>
        <View style={styles.svgContainer}>
          <NewsSvg height="100%" width="100%" style={styles.svg} />
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