import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const exampleReading = require("../../assets/images/example_reading.png");

export default function ReadingInProgressScreen() {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' />
      <View style={styles.topText}>
        <Text style={styles.topText}>Reading in progress.</Text>
      </View>
      <View style={styles.exampleImageContainer}>
        <ImageViewer ImageSource={exampleReading} ImageType={"exampleImage"} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme='red' label='Finish reading and save' page='ReadingComplete' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
