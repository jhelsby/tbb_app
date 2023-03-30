import React, { useContext } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

import { IMarkerProps } from "../../scripts/interfaces";

import { ColorContext } from "../../context/color_context";

import { styles } from "./map_icon_styles";

export default function MapIcon(props: IMarkerProps) : React.ReactElement<IMarkerProps> {
  const { color, lightColor } = useContext(ColorContext);

  const handlePress = () : void => {
    props.onActive(props.index);
  };

  return (
    <Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude,
      }}
      onPress={handlePress}
    >
      <View style={[styles.container, { backgroundColor: props.active ? color : lightColor }]} >
        <FontAwesomeIcon icon={faDroplet} size={15} color="#fff" />
      </View>
    </Marker>
  );
}


