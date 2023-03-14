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
      <Button theme='disconnect' label='Disconnect' page='Home' close={false} file_to_share='' />
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageCategory={"logo"} />
      </View>
      <View>
        <Text style={styles.captionTextFourButtons}>Reading complete.</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='blue' label='View reading' page='ViewLastReading' close={false} file_to_share='' />
        <Button theme='green' label='Take another reading' page='ReadingInProgress' close={false} file_to_share='' />
        <Button theme='purple' label='View previous readings' page='Reading' close={false} file_to_share='' />
        <Button theme='grey' label='Help' page='Help' close={false} file_to_share='' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
