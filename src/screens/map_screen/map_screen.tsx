import React, { useEffect, useState, useRef, ReactElement } from "react";
import { View, Animated, Dimensions, useColorScheme } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapParamList } from "../../scripts/screen_params";

import { styles } from "./map_styles";

import { TMarkerData } from "../../scripts/types";
import { ICardProps } from "../../scripts/interfaces";

import MapIcon from "../../components/map_icon/map_icon";
import Card from "../../components/card/card";

import tempData from "./data.temp.json";

type Props = NativeStackScreenProps<MapParamList, "MapScreen">;

export default function MapScreen({ navigation } : Props) : ReactElement<Props> {
  const [activeMarkers, setActiveMarkers] = useState<boolean[]>(
    tempData.markers.map(() => false)
  );

  const isDarkMode = useColorScheme() === "dark";

  const [activeCard, setActiveCard] = useState<boolean>(false);
  const [cardData, setCardData] = useState<ICardProps>({
    isIcon: false,
    highLight: false,
    title: "",
    subtitle1: "",
    subtitle2: "",
    description: "",
    onPress: () => navigation.navigate("ViewReadingScreen", { validNavigation: true })
  });

  const screenWidth = Dimensions.get("window").width;
  const cardAnimation = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    Animated.timing(cardAnimation, {
      toValue: activeCard ? 0 : screenWidth,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [activeCard]);

  const handleMarkerPress = (index: number) => {
    const newActiveMarkers = activeMarkers.map((marker, i) => {
      if (i === index) {
        const cardData: ICardProps = {
          isIcon: false,
          highLight: tempData.markers[i].isSafe,
          title: "Lorem ipsum",
          subtitle1: `${tempData.markers[i].latitude}, ${tempData.markers[i].longitude}`,
          subtitle2: `${tempData.markers[i].date}`,
          description: "Laboris in et ullamco magna excepteur aliquip mollit occaecat aliqua anim exercitation.",
          onPress: () => navigation.navigate("ViewReadingScreen", { validNavigation: true })
        }
        setActiveCard(!marker);
        setCardData(cardData);
        return !marker;
      } else {
        return false;
      }
    });
    setActiveMarkers(newActiveMarkers);
  };



  return (
    <View style={styles.container}>
      <MapView
        style={{
          width: '100%',
          height: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        zoomControlEnabled={false}
        toolbarEnabled={false}
        userInterfaceStyle={isDarkMode ? "dark" : "light"}
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
      <Animated.View style={[
        styles.cardContainer,
        { transform: [
          {
            translateX: cardAnimation
          }
        ]}
      ]}>
        <Card {...cardData} />
      </Animated.View>
    </View>
  );
}