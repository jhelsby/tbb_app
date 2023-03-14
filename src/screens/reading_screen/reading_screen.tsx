import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const exampleTable = require("../../assets/images/example_table.png");

export default function ReadingScreen() {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' close={false} file_to_share='' />
      <View style={styles.topText}>
        <Text style={styles.topText}>Readings</Text>
      </View>
      <View style={styles.exampleImageContainer}>
        <ImageViewer ImageSource={exampleTable} ImageCategory={"exampleImage"} />
      </View>
      <View style={styles.footerContainer}>
        <Button theme='export' label='Export all readings' page='ReadingComplete' close={true} file_to_share='./assets/images/example_table.png' />
        <Button theme='back' label='Back' page='Home' close={false} file_to_share='' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
