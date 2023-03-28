import React, { ReactElement } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReadingsParamList } from "../../scripts/screen_params";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

import Card from "../../components/card/card";
import Button from "../../components/button/button";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../scripts/firebase";

import readingsData from "./data.temp.json";

type Props = NativeStackScreenProps<ReadingsParamList, "ReadingsScreen">;

export default function ReadingsScreen({ navigation } : Props) : ReactElement<Props> {
  const cards = readingsData.cards;

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const handleSync = () => {
    console.log("Syncing All...");
  };

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>Readings</Text>
        {
          isLoggedIn && (
          <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSync} >
                <Text style={[styles.buttonText]}>Sync All</Text>
              </Button>
            </View>
          </View>
          )
        }
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