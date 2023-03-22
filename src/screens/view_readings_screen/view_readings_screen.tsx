import React, { useEffect } from "react";
import { View, Text, ScrollView, Dimensions, useColorScheme } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";

import { styles } from "./view_readings_styles";
import { styles as globalStyles } from "../../../App_styles";
import { colorInterpolate, color1, color3 } from "../../scripts/colors";

import tempData from "./data.temp.json";

import TopNav from "../../components/top_nav/top_nav";

import { TPieChartData } from "../../scripts/types";

export default function ViewReadingsScreen({ navigation } : { navigation: any }) : JSX.Element {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const isDarkMode = useColorScheme() === "dark";

  const [pieChartData, setPieChartData] = React.useState([] as TPieChartData[]);

  useEffect(() => {
    let data : TPieChartData[] = [];
    tempData.results.forEach((result: any, index: number) => {
      const color: any = colorInterpolate(color3, color1, index/(tempData.results.length - 1));
      data.push({
        name: result.name,
        value: result.value,
        color: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
    });
    setPieChartData(data);
  }, []);

  return (
    <View style={[styles.container, isDarkMode ? globalStyles.darkPage : globalStyles.lightPage]}>
      <TopNav handlePress={() => navigation.popToTop()} />
      <ScrollView style={styles.body}
        contentContainerStyle={{
          paddingBottom: 180,
        }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>View Readings</Text>
        </View>
        <View style={[globalStyles.tile, styles.dataContainer, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <Text style={[styles.dataTitle, tempData.isSafe ? styles.safe : styles.notSafe]}>{tempData.isSafe ? "SAFE" : "NOT SAFE"}</Text>
          <Text style={styles.data}>{tempData.date}</Text>
          <Text style={styles.data}>{tempData.location}</Text>
        </View>
        <View style={[globalStyles.tile, styles.barChartContainer, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <BarChart
            data={{
              labels: tempData.results.map((result: any) => result.name),
              datasets: [
                {
                  data: tempData.results.map((result: any) => result.value),
                  colors: tempData.results.map((result: any, index: number) => {
                    const color: any = colorInterpolate(color3, color1, index/(tempData.results.length - 1));
                    return (opacity = 1) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
                  })
                },
              ],
            }}
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
              color: (opacity = 1) => `#7F7F7F`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View style={[globalStyles.tile, styles.pieChartContainer, isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer]}>
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.9}
            height={screenHeight * 0.25}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: (opacity = 1) => `#d95448`,
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