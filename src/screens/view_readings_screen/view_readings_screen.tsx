import React from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

import { styles } from "./view_readings_styles";
import { styles as globalStyles } from "../../../App_styles";

export default function ViewReadingsScreen({ navigation } : { navigation: any }) : JSX.Element {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 100, 43],
                },
              ],
            }}
            width={screenWidth * 0.8}
            height={350}
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
              color: (opacity = 1) => `#d95448`,
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View style={[globalStyles.tile, styles.pieChartContainer]}>
          <PieChart
            data={[
              {
                name: "Severe",
                population: 30.32,
                color: "#d95448",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },  
              {
                name: "Moderate",
                population: 12.22,
                color: "#f2b3b3",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Mild",
                population: 12.22,
                color: "#f2b56b",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Normal",
                population: 12.22,
                color: "#c2d2f2",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={screenWidth * 0.9}
            height={screenHeight * 0.25}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2,
              color: (opacity = 1) => `#d95448`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft=""
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
}