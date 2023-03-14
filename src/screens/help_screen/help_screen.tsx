import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const Logo: any = require("../../assets/images/logo.png");

export default function HelpScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' close={false} file_to_share='' />
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageCategory='logo' />
      </View>
      <View>
        <Text style={styles.captionText}>This will be a help screen.</Text>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
