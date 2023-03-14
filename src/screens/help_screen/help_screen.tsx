import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const Logo = require("../../assets/images/logo.png");

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' />
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageType='logo' />
      </View>
      <View>
        <Text style={styles.captionText}>This will be a help screen.</Text>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
