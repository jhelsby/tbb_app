import React from "react";
import { View, Text, Button, ScrollView } from "react-native";

import { styles } from "./news_styles";

import { TDefaultProps } from "../../scripts/types";

import Card from "../../components/card/card";

import newsData from "./news_data.temp.json";

export default function NewsScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const cards = newsData.cards;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={styles.title}>News</Text>
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                isIcon={true}
                onPress={() => navigation.navigate("ViewNews", { validNavigation: true })}
                highLight={null}
                title={card.title}
                subtitle1={card.author}
                subtitle2={card.date} 
                description={card.description} 
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}