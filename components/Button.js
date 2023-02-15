import {Alert, StyleSheet, View, Text, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import * as Sharing from 'expo-sharing';

export default function Button({ label, theme, page, close=false, url }) {

    const navigation = useNavigation();

    if (theme === "disconnect") {
        return (

            <View
                style={[styles.disconnectContainer]}
            >
                <Pressable
                    style={[styles.disconnectButton, {backgroundColor: "#f44336"}]}
                    onPress={() => {
                        Alert.alert('Warning', 'Are you sure you want to disconnect this device?',
                            [
                                {
                                    text: 'Disconnect',
                                    onPress: () => {navigation.navigate(page)}
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                            ]);
                    }}
                >
                    <Text style={[styles.disconnectLabel, {color: "#ffffff"}]}>{label}</Text>
                </Pressable>
            </View>

        );
    }

    if (theme === "export") {
        return (
            <View
                style={[close ? styles.closeButtonContainer : styles.bigButtonContainer]}
            >
                <Pressable
                    style={[styles.bigButton, {backgroundColor: "#6400ce"}]}
                    onPress={ () => Sharing.shareAsync(url) }
                        >
                    <Text style={[styles.bigButtonLabel, {color: "#ffffff"}]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    let the_colour

    if (theme === "blue")   { the_colour = "#0073e5" }
    if (theme === "green")  { the_colour = "#6cd43e" }
    if (theme === "red")    { the_colour = "#f44336" }
    if (theme === "grey")   { the_colour = "#3e3e3e" }
    if (theme === "purple") { the_colour = "#6400ce" }

    return (
        <View
            style={[close ? styles.closeButtonContainer : styles.bigButtonContainer ]}
        >
            <Pressable
                style={[styles.bigButton, {backgroundColor: the_colour}]}
                onPress={ () => { navigation.navigate(page) } }
            >
                <Text style={[styles.bigButtonLabel, {color: "#ffffff"}]}>{label}</Text>
            </Pressable>
        </View>
    );





}
const styles = StyleSheet.create({
    bigButtonContainer: {
        width: 320,
            height: 68,
            marginHorizontal: 20,
            marginBottom: 50,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
    },
    bigButton: {
        borderRadius: 10,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
    },

    bigButtonLabel: {
        color: '#fff',
            fontSize: 16,
    },

    closeButtonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },

    disconnectContainer: {
        width: 90,
        height: 35,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        alignSelf: 'flex-end',
        marginTop: 50,
        right: -15,
        position: 'absolute',
    },

    disconnectButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    disconnectLabel: {
        color: '#fff',
        fontSize: 10,
    },
});