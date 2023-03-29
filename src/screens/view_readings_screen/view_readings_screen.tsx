import React, { useEffect, useCallback, ReactElement } from "react";
import { View, Text, ScrollView, Dimensions, useColorScheme } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./view_readings_styles";
import { styles as globalStyles } from "../../../App_styles";
import { colorInterpolate, color1, color3, hslToString } from "../../scripts/colors";

import TopNav from "../../components/top_nav/top_nav";

import { THSL, TMeasurement, TPieChartData, TReading } from "../../scripts/types";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getReading, postReading } from "../../scripts/firebase";

export default function ViewReadingsScreen({ navigation, route } : any) : ReactElement<any> {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const isDarkMode = useColorScheme() === "dark";
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;

  const [pieChartData, setPieChartData] = React.useState<any>([]);
  const [barChartData, setBarChartData] = React.useState<any>({
    labels: [],
    datasets: [{
      data: [],
    }],
  });

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [readingData, setReadingData] = React.useState<TReading>({
    location: {
      latitude: 0,
      longitude: 0,
    },
    datetime: {
      date: "",
      time: "",
    },
    id: "",
    isSafe: false,
    hasSynced: true,
    measurements: [
      {name: "turbidity", value: 0},
      {name: "ph", value: 0},
      {name: "chloride", value: 0},
      {name: "nitrate", value: 0},
      {name: "flouride", value: 0},
      {name: "conductivity", value: 0},
    ],
  });

  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        getReading(route.params.readingId).then((data: any) => {
          setReadingData(data);
  
          const tempPieChartData: any[] = [];
  
          data.measurements.forEach((measurement: TMeasurement, index: number) => {
            const color: any = colorInterpolate(color3, color1, index/(data.measurements.length - 1));
            tempPieChartData.push({
              name: measurement.name,
              value: measurement.value,
              color: hslToString(color),
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            });
          });
          setPieChartData(tempPieChartData);
  
          setBarChartData({
            labels: data.measurements.map((measurement: TMeasurement) => measurement.name),
            datasets: [
              {
                data: data.measurements.map((measurement: TMeasurement) => measurement.value),
                colors: data.measurements.map((measurement: TMeasurement, index: number) => {
                  const color: THSL = colorInterpolate(color3, color1, index/(readingData.measurements.length - 1));
                  return () => hslToString(color);
                })
              },
            ],
          });
        });
      } else {
        setBarChartData({
          labels: [],
          datasets: [{
            data: [],
          }],
        });
        setPieChartData([]);
        setReadingData({
          location: {
            latitude: 0,
            longitude: 0,
          },
          datetime: {
            date: "",
            time: "",
          },
          id: "",
          isSafe: false,
          hasSynced: true,
          measurements: [
            {name: "turbidity", value: 0},
            {name: "ph", value: 0},
            {name: "chloride", value: 0},
            {name: "nitrate", value: 0},
            {name: "flouride", value: 0},
            {name: "conductivity", value: 0},
          ],
        });
      }
    }, [isLoggedIn])
  )

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.popToTop()} />
      <ScrollView style={styles.body}
        contentContainerStyle={{
          paddingBottom: 180,
        }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, textContrast]}>View Readings</Text>
        </View>
        <View style={[globalStyles.tile, styles.dataContainer, containerContrast]}>
          <Text style={[styles.dataTitle, readingData.isSafe ? styles.safe : styles.notSafe]}>{readingData.isSafe ? "SAFE" : "NOT SAFE"}</Text>
          <Text style={styles.data}>{readingData.datetime.date}</Text>
          <Text style={styles.data}>{`Latitude: ${readingData.location.latitude}, Longitude: ${readingData.location.longitude}`}</Text>
        </View>
        <View style={[globalStyles.tile, styles.barChartContainer, containerContrast]}>
          <BarChart
            data={barChartData}
            width={screenWidth * 0.8}
            height={350}
            withCustomBarColorFromData={true}
            flatColor={true}
            yAxisLabel=""
            yAxisSuffix=""
            verticalLabelRotation={90}
            withInnerLines={false}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: "transparent",
              backgroundGradientFrom: isDarkMode ? "#2E2E2E" : "#fff",
              backgroundGradientTo: isDarkMode ? "#2E2E2E" : "#fff",
              barPercentage: 0.8,
              decimalPlaces: 4,
              color: () => `#7F7F7F`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View style={[globalStyles.tile, styles.pieChartContainer, containerContrast]}>
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.9}
            height={screenHeight * 0.25}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: () => `#d95448`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft=""
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
}