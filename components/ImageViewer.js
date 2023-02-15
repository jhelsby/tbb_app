import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ ImageSource, ImageType }) {

    if (ImageType === "logo") {
        return (
            <Image source={ImageSource} style={styles.logo}/>
        );
    }

    if (ImageType === "exampleImage") {
        return (
            <Image source={ImageSource} style={styles.exampleImage}/>
        );
    }
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
