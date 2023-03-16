import React from "react";
import { View, Text, Button, ScrollView } from "react-native";

import { styles } from "./readings_styles";

import Card from "../../components/card/card";

import readingsData from "./readings_data.temp.json";

export default function ReadingsScreen(props : { navigation : any }) : JSX.Element {
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
                navigation={props.navigation} 
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