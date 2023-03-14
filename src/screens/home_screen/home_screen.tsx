import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import ImageViewer from "../../components/ImageViewer";
import Button from "../../components/Button";

const Logo = require("../../assets/images/logo.png");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageViewer ImageSource={Logo} ImageCategory={"logo"} />
      </View>
      <View>
        <Text style={styles.captionText}>No device connected.</Text>
      </View>
      <View>
        <Button theme='connect' label='Connect via Bluetooth' page='Connected' close={false} file_to_share='' />
        <Button theme='purple' label='View previous readings' page='Reading' close={false} file_to_share='' />
        <Button theme='grey' label='Help' page='Help' close={false} file_to_share='' />
      </View>
      <StatusBar style='auto' />
    </View>
  );
}
