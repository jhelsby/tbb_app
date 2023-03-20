import React from "react";
import { View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TMarkerData } from "../../scripts/types";

import MapIcon from "../../components/map_icon/map_icon";

import tempData from "./data.temp.json";

export default function MapScreen() : JSX.Element {

  const [activeMarkers, setActiveMarkers] = React.useState<boolean[]>(
    tempData.markers.map(() => false)
  );

  const handleMarkerPress = (index: number) => {
    const newActiveMarkers = activeMarkers.map((marker, i) => {
      if (i === index) {
        return !marker;
      } else {
        return false;
      }
    });
    setActiveMarkers(newActiveMarkers);
  };


  const { width, height } = Dimensions.get("window");

  return (
    <View style={[globalStyles.page, styles.container]}>
      <MapView
        style={{
          width: width,
          height: height,
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
            tempData.markers.map((marker: TMarkerData, index: number) => {
              return (
                <MapIcon
                  key={index}
                  index={index}
                  onActive={handleMarkerPress}
                  active={activeMarkers[index]}
                  {...marker}
                />
              );
            })
          }
      </MapView>
    </View>
  );
}