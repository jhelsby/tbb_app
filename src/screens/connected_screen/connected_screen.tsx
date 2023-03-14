import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../styles";
import { StatusBar } from "expo-status-bar";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const Logo: any = require("../../assets/images/logo.png");

export default function ConnectedScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Button theme='disconnect' label='Disconnect' page='Home' close={false} file_to_share='' />
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageCategory={"logo"} />
      </View>
      <View>
        <Text style={styles.captionText}>Device connected.</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='green' label='Take a reading' page='ReadingInProgress' close={false} file_to_share='' />
        <Button theme='purple' label='View previous readings' page='Reading' close={false} file_to_share='' />
        <Button theme='grey' label='Help' page='Help' close={false} file_to_share='' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
