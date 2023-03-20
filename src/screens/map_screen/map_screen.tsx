import React from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TMarkerProps } from "../../scripts/types";

import MapIcon from "../../components/map_icon/map_icon";

import tempData from "./data.temp.json";

export default function MapScreen() : JSX.Element {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        zoomControlEnabled={false}
        toolbarEnabled={false}
        showsMyLocationButton={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
          {
            tempData.markers.map((marker: TMarkerProps, index: number) => {
              return (
                <MapIcon key={index} {...marker} />
              );
            })
          }
      </MapView>
    </View>
  );
}