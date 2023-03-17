import React, { useEffect } from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

import { styles } from "./view_readings_styles";
import { styles as globalStyles } from "../../../App_styles";
import { colorInterpolate, color1, color4 } from "../../scripts/colors";

import tempData from "./data.temp.json";

type TPieChartData = { name: string, value: number, color: string, legendFontColor: string, legendFontSize: number };

export default function ViewReadingsScreen({ navigation } : { navigation: any }) : JSX.Element {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const [pieChartData, setPieChartData] = React.useState([] as TPieChartData[]);

  useEffect(() => {
    let data : TPieChartData[] = [];
    tempData.results.forEach((result: any, index: number) => {
      const color: any = colorInterpolate(color4, color1, index/(tempData.results.length - 1));
      data.push({
        name: result.name,
        value: result.value,
        color: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      });
    });
    console.log(data);
    setPieChartData(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[globalStyles.tile, styles.header]}>
        <Pressable style={styles.backButton} onPress={navigation.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.body}
        contentContainerStyle={{
          paddingBottom: 180,
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>View Readings</Text>
        </View>
        <View style={[globalStyles.tile, styles.dataContainer]}>
          <Text style={styles.dataTitle}>SAFE</Text>
          <Text style={styles.data}>Date: 12/12/2020</Text>
          <Text style={styles.data}>Location: 1234 Main St, City, State</Text>
        </View>
        <View style={[globalStyles.tile, styles.barChartContainer]}>
          <BarChart
            data={{
              labels: tempData.results.map((result: any) => result.name),
              datasets: [
                {
                  data: tempData.results.map((result: any) => result.value),
                  colors: tempData.results.map((result: any, index: number) => {
                    const color: any = colorInterpolate(color4, color1, index/(tempData.results.length - 1));
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
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              barPercentage: 0.8,
              decimalPlaces: 4,
              color: (opacity = 1) => `#7F7F7F`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View style={[globalStyles.tile, styles.pieChartContainer]}>
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