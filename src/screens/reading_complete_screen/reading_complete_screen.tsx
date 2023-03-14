import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const Logo = require("../../assets/images/logo.png");

export default function ReadingCompleteScreen() {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' />
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageType={"logo"} />
      </View>
      <View>
        <Text style={styles.captionTextFourButtons}>Reading complete.</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='blue' label='View reading' page='ViewLastReading' />
        <Button theme='green' label='Take another reading' page='ReadingInProgress' />
        <Button theme='purple' label='View previous readings' page='Readings' />
        <Button theme='grey' label='Help' page='Help' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
