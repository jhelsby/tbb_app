import React from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";

import { styles } from "./news_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps } from "../../scripts/types";

import Card from "../../components/card/card";

import newsData from "./data.temp.json";

export default function NewsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const cards = newsData.cards;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>News</Text>
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                isIcon={true}
                navigation={navigation}
                highLight={null}
                title={card.title}
                subtitle1={card.author}
                subtitle2={card.date} 
                description={card.description} 
                page="ViewNews"
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}