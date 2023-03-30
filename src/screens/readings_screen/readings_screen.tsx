import React, { ReactElement } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReadingsParamList } from "../../scripts/screen_params";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

import Card from "../../components/card/card";

import readingsData from "./data.temp.json";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectPageContrast, selectTextContrast } from "../../slices/contrast/contrastSlice";

type Props = NativeStackScreenProps<ReadingsParamList, "ReadingsScreen">;

export default function ReadingsScreen({ navigation } : Props) : ReactElement<Props> {
  // Get the contrast settings from the redux store
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const cards = readingsData.cards;

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>Readings</Text>
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                isIcon={false}
                highLight={card.highlight}
                title={card.title}
                subtitle1={card.location}
                subtitle2={card.date} 
                description={card.description}
                onPress={() => navigation.navigate("ViewReadingScreen", { validNavigation: true })}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}