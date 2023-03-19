import React from "react";
import { View, Text, Button, ScrollView } from "react-native";

import { styles } from "./readings_styles";

import { TDefaultProps } from "../../scripts/types";

import Card from "../../components/card/card";

import readingsData from "./data.temp.json";

export default function ReadingsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const cards = readingsData.cards;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={styles.title}>Readings</Text>
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