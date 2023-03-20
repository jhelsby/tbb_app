import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

import { IMarkerProps } from "../../scripts/interfaces";

import { color1, color1Light } from "../../scripts/colors";

import { styles } from "./map_icon_styles";

export default function MapIcon(props: IMarkerProps) : React.ReactElement<IMarkerProps> {

  const color1String = `hsl(${color1.h}, ${color1.s}%, ${color1.l}%)`;
  const color1LightString = `hsl(${color1Light.h}, ${color1Light.s}%, ${color1Light.l}%)`;

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
      <View style={[styles.container, { backgroundColor: props.active ? color1String : color1LightString }]} >
        <FontAwesomeIcon icon={faDroplet} size={15} color="#fff" />
      </View>
    </Marker>
  );
}


