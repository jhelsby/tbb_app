import React from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps } from "../../scripts/types";

import Card from "../../components/card/card";

import readingsData from "./data.temp.json";

export default function ReadingsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const cards = readingsData.cards;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>Readings</Text>
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                isIcon={false}
                navigation={navigation}
                highLight={card.highlight}
                title={card.title}
                subtitle1={card.location}
                subtitle2={card.date} 
                description={card.description} 
                page="ViewReadings"
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}