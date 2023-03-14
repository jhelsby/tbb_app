import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/rootScreensPrams";
//import Share from 'react-native-share';
// import * as Sharing from 'expo-sharing'; <- may need to use this to compile with Expo.

let isConnected = false;

type buttonNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

/**
 *
 * @param {*} label - Text on button
 * @param {*} theme - "connect" to connect the device, "disconnect" to
 *                    disconnect, "export" to share a url, "back" for a back
 *                    button, "blue", "green", "red", "grey", "purple" for
 *                    coloured navigation buttons.
 * @param {*} page - the page the button should navigate you to
 * @param {*} close - if true, formats the button to have a smaller bottom margin
 * @param {*} file_to_share - the file to share
 *
 * @returns
 */
export default function Button(props : { label : string, theme : string, page : keyof RootStackParamList, close : boolean, file_to_share : string }) {
  const navigation = useNavigation<buttonNavigationProp>();

  if (props.theme === "connect") {
    return (
      <View style={[props.close ? styles.closeButtonContainer : styles.bigButtonContainer]}>
        <Pressable
          style={[styles.bigButton, { backgroundColor: "#0073e5" }]}
          onPress={() => {
            navigation.navigate(props.page);
            isConnected = true;
          }}>
          <Text style={[styles.bigButtonLabel, { color: "#ffffff" }]}>{props.label}</Text>
        </Pressable>
      </View>
    );
  }

  if (props.theme === "disconnect") {
    if (isConnected) {
      return (
        <View style={[styles.disconnectContainer]}>
          <Pressable
            style={[styles.disconnectButton, { backgroundColor: "#f44336" }]}
            onPress={() => {
              Alert.alert("Warning", "Are you sure you want to disconnect this device?", [
                {
                  text: "Disconnect",
                  onPress: () => {
                    navigation.navigate(props.page);
                    isConnected = false;
                  },
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]);
            }}>
            <Text style={[styles.disconnectLabel, { color: "#ffffff" }]}>{props.label}</Text>
          </Pressable>
        </View>
      );
    } else {
      return null;
    }
  }

  if (props.theme === "export") {
    return (
      <View style={[props.close ? styles.closeButtonContainer : styles.bigButtonContainer]}>
        <Pressable
          style={[styles.bigButton, { backgroundColor: "#6400ce" }]}
          onPress={
            () => Alert.alert("Sharing function not yet implemented.")
            // Share.open({ url: {file_to_share},})
            // .then((res) => {
            //     console.log(res);
            // })
            // .catch((err) => {
            //     err && console.log(err);
          }>
          <Text style={[styles.bigButtonLabel, { color: "#ffffff" }]}>{props.label}</Text>
        </Pressable>
      </View>
    );
  }

  if (props.theme === "back") {
    return (
      <View style={[props.close ? styles.closeButtonContainer : styles.bigButtonContainer]}>
        <Pressable
          style={[styles.bigButton, { backgroundColor: "#0073e5" }]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={[styles.bigButtonLabel, { color: "#ffffff" }]}>{props.label}</Text>
        </Pressable>
      </View>
    );
  }

  let the_colour;

  if (props.theme === "blue") {
    the_colour = "#0073e5";
  }
  if (props.theme === "green") {
    the_colour = "#6cd43e";
  }
  if (props.theme === "red") {
    the_colour = "#f44336";
  }
  if (props.theme === "grey") {
    the_colour = "#3e3e3e";
  }
  if (props.theme === "purple") {
    the_colour = "#6400ce";
  }

  return (
    <View style={[props.close ? styles.closeButtonContainer : styles.bigButtonContainer]}>
      <Pressable
        style={[styles.bigButton, { backgroundColor: the_colour }]}
        onPress={() => {
          navigation.navigate(props.page);
        }}>
        <Text style={[styles.bigButtonLabel, { color: "#ffffff" }]}>{props.label}</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  bigButton: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  bigButtonLabel: {
    color: "#fff",
    fontSize: 16,
  },

  closeButtonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },

  disconnectContainer: {
    width: 90,
    height: 35,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    alignSelf: "flex-end",
    marginTop: 50,
    right: -15,
    position: "absolute",
  },

  disconnectButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  disconnectLabel: {
    color: "#fff",
    fontSize: 10,
  },
});
