import React, { ReactElement, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReadingsParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./readings_styles";
import { styles as globalStyles } from "../../../App_styles";

import Card from "../../components/card/card";
import Button from "../../components/button/button";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getAllReadings } from "../../scripts/firebase";
import { TReading } from "../../scripts/types";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectPageContrast, selectTextContrast, selectContainerContrast } from "../../slices/color/colorSlice";

type Props = NativeStackScreenProps<ReadingsParamList, "ReadingsScreen">;

export default function ReadingsScreen({ navigation } : Props) : ReactElement<Props> {
  // Get the contrast settings from the redux store
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const containerContrast = useAppSelector(selectContainerContrast);

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [readings, setReadings] = React.useState<TReading[]>([]);

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
        console.log("Getting Readings...")
        getAllReadings().then((readings) => {
          if (readings) setReadings(readings as TReading[]);
        });
      } else {
        setReadings([]);
      }
    }, [isLoggedIn])
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
          isLoggedIn ? (
          <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSync} >
                <Text style={[styles.buttonText]}>Sync All</Text>
              </Button>
            </View>
          </View>
          ) : (
            <View
              style={[
                globalStyles.tile,
                styles.infoContainer,
                containerContrast,
              ]}
            >
              <Text style={[styles.infoText, textContrast]}>Please Login to see readings that have been saved to the cloud.</Text>
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
                subtitle1={`Latitude: ${reading.location.latitude}, Longitude: ${reading.location.longitude}`}
                subtitle2={`Date: ${reading.datetime.date}, Time: ${reading.datetime.time}`}
                description={"Description needs to be changed"}
                onPress={() => navigation.navigate("ViewReadingScreen",
                {
                  validNavigation: true,
                  readingId: reading.id,
                })}
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}