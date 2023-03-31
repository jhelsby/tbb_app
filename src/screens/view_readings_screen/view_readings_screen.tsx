import React, { useEffect, useCallback, ReactElement } from "react";
import { View, Text, ScrollView, Dimensions, useColorScheme } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./view_readings_styles";
import { styles as globalStyles } from "../../../App_styles";
import { colorInterpolate, color1, color3, hslToString } from "../../scripts/colors";

import TopNav from "../../components/top_nav/top_nav";

import { THSL, TMeasurement, TPieChartData, TReading } from "../../scripts/types";

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectContainerContrast, selectPageContrast, selectTextContrast, selectDarkMode } from "../../slices/color/colorSlice";
import { selectIsLoggedIn } from "../../slices/account/accountSlice";
import { selectReadingById } from "../../slices/readings/readingsSlice";

export default function ViewReadingsScreen({ navigation, route } : any) : ReactElement<any> {
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const isDarkMode = useAppSelector(selectDarkMode);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const reading: TReading = useAppSelector(state => selectReadingById(state, { id: route.params.readingId }))

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [pieChartData, setPieChartData] = React.useState<any>([]);
  const [barChartData, setBarChartData] = React.useState<any>({
    labels: [],
    datasets: [{
      data: [],
    }],
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
        const tempPieChartData: any[] = [];
        const measurements: TMeasurement[] = reading.measurements;

        measurements.forEach((measurement: TMeasurement, index: number) => {
          const color: any = colorInterpolate(color3, color1, index/(measurements.length - 1));
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
          labels: measurements.map((measurement: TMeasurement) => measurement.name),
          datasets: [
            {
              data: measurements.map((measurement: TMeasurement) => measurement.value),
              colors: measurements.map((measurement: TMeasurement, index: number) => {
                const color: THSL = colorInterpolate(color3, color1, index/(measurements.length - 1));
                return () => hslToString(color);
              })
            },
          ],
        });
      } else {
        setBarChartData({
          labels: [],
          datasets: [{
            data: [],
          }],
        });
        setPieChartData([]);
      }
    }, [isLoggedIn, reading])
  )

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
          <Text style={[styles.dataTitle, reading.isSafe ? styles.safe : styles.notSafe]}>{reading.isSafe ? "SAFE" : "NOT SAFE"}</Text>
          <Text style={styles.data}>{reading.datetime.date}</Text>
          <Text style={styles.data}>{`Latitude: ${reading.location.latitude}, Longitude: ${reading.location.longitude}`}</Text>
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