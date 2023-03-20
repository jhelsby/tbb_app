import React from "react";
import { View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps, TMarkerData, TCardProps } from "../../scripts/types";

import MapIcon from "../../components/map_icon/map_icon";
import Card from "../../components/card/card";

import tempData from "./data.temp.json";

export default function MapScreen({ navigation } : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const [activeMarkers, setActiveMarkers] = React.useState<boolean[]>(
    tempData.markers.map(() => false)
  );

  const [activeCard, setActiveCard] = React.useState<boolean>(false);
  const [cardData, setCardData] = React.useState<TCardProps>({
    isIcon: false,
    navigation: navigation,
    highLight: false,
    title: "",
    subtitle1: "",
    subtitle2: "",
    description: "",
    page: "ViewReadings"
  });

  const handleMarkerPress = (index: number) => {
    const newActiveMarkers = activeMarkers.map((marker, i) => {
      if (i === index) {
        const cardData: TCardProps = {
          isIcon: false,
          navigation: navigation,
          highLight: tempData.markers[i].isSafe,
          title: "Lorem ipsum",
          subtitle1: `${tempData.markers[i].latitude}, ${tempData.markers[i].longitude}`,
          subtitle2: `${tempData.markers[i].date}`,
          description: "Laboris in et ullamco magna excepteur aliquip mollit occaecat aliqua anim exercitation.",
          page: "ViewReadings"
        }
        console.log(cardData);
        setActiveCard(!marker);
        setCardData(cardData);
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
      <View style={[styles.cardContainer, { bottom: activeCard ? 90 : -200 }]}>
        <Card {...cardData} />
      </View>
    </View>
  );
}