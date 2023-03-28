import React, { ReactElement, useCallback } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReadingsParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

import Card from "../../components/card/card";
import Button from "../../components/button/button";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getReadings } from "../../scripts/firebase";

type Props = NativeStackScreenProps<ReadingsParamList, "ReadingsScreen">;

export default function ReadingsScreen({ navigation } : Props) : ReactElement<Props> {

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [readings, setReadings] = React.useState<any>([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        getReadings().then((readings) => {
          setReadings(readings);
        });
      }
    }, [])
  );

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
          readings.length !== 0 && readings.map((reading: any, index: number) => {
            return (
              <Card
                key={index}
                isIcon={false}
                highLight={reading.isSafe}
                title={"Reading " + reading.id}
                subtitle1={`Latitude: ${reading.latitude}, Longitude: ${reading.longitude}`}
                subtitle2={reading.date} 
                description={"Description needs to be changed"}
                onPress={() => navigation.navigate("ViewReadingScreen", { validNavigation: true })}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}