import React, { ReactElement } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NewsParamList } from "../../scripts/screen_params";

import { styles } from "./news_styles";
import { styles as globalStyles } from "../../../App_styles";

import Card from "../../components/card/card";

import newsData from "./data.temp.json";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectPageContrast, selectTextContrast } from "../../slices/contrast/contrastSlice";

type Props = NativeStackScreenProps<NewsParamList, "NewsScreen">;

export default function NewsScreen({ navigation } : Props) : ReactElement<Props> {
  
  // Get the contrast settings from the redux store
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);


  const cards = newsData.cards;

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>News</Text>
        {
          cards.map((card, index) => {
            return (
              <Card
                key={index}
                isIcon={true}
                onPress={() => navigation.navigate("ViewNewsScreen", { validNavigation: true })}
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