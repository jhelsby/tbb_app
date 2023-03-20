import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

import { TMarkerProps } from "../../scripts/types";

import { styles } from "./map_icon_styles";

export default function MapIcon(props: TMarkerProps) : React.ReactElement<TMarkerProps> {

  const handlePress = () : void => {
    console.log(`pressed ${props.latitude} ${props.longitude}`);
  };

  return (
    <Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <FontAwesomeIcon icon={faDroplet} size={15} color="#fff" />
      </View>
    </Marker>
  );
}


