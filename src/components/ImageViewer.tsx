import { StyleSheet, Image } from "react-native";

export default function ImageViewer(props : { ImageSource : any, ImageCategory : string }) {
  if (props.ImageCategory === "logo") {
    return <Image source={props.ImageSource} style={styles.logo} />;
  }
  return <Image source={props.ImageSource} style={styles.exampleImage} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 120,
    borderRadius: 18,
  },
  exampleImage: {
    width: 350,
    height: 500,
    borderRadius: 18,
  },
});
