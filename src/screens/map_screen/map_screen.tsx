import React, { useEffect, useState, useRef, useCallback, ReactElement } from "react";
import { View, Text, Animated, Dimensions, useColorScheme } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MapParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./map_styles";
import { styles as globalStyles } from "../../../App_styles";

import { TMarkerData } from "../../scripts/types";
import { ICardProps } from "../../scripts/interfaces";

import MapIcon from "../../components/map_icon/map_icon";
import Card from "../../components/card/card";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getAllReadings } from "../../scripts/firebase";

type Props = NativeStackScreenProps<MapParamList, "MapScreen">;

export default function MapScreen({ navigation } : Props) : ReactElement<Props> {
  const [activeMarkers, setActiveMarkers] = useState<boolean[]>([]);

  const isDarkMode = useColorScheme() === "dark";
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;

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


  const [ isLoggedIn, setLoggedIn ] = useState<boolean>(false);
  const [ markers, setMarkers ] = useState<any>([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        console.log("Getting Markers...")
        getAllReadings().then((reading) => {
          if (reading) {
            setMarkers(reading);
            setActiveMarkers(reading.map((marker) => false));
          }
        });
      } else {
        setMarkers([]);
        setActiveMarkers([]);
      }
    }, [isLoggedIn])
  );


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
          highLight: markers[i].isSafe,
          title: `Reading ${markers[i].id}`,
          subtitle1: `${markers[i].location.latitude}, ${markers[i].location.longitude}`,
          subtitle2: `Date: ${markers[i].datetime.date}`,
          description: "Laboris in et ullamco magna excepteur aliquip mollit occaecat aliqua anim exercitation.",
          onPress: () => navigation.navigate("ViewReadingScreen", {
            validNavigation: true,
            readingId: markers[i].id
          })
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
            markers.map((marker: any, index: number) => {
              return (
                <MapIcon
                  key={index}
                  index={index}
                  onActive={handleMarkerPress}
                  active={activeMarkers[index]}
                  latitude={marker.location.latitude}
                  longitude={marker.location.longitude}
                  isSafe={marker.isSafe}
                />
              );
            })
          }
      </MapView>
      {
        isLoggedIn ? (
          <Animated.View style={[
            styles.cardContainer,
            { transform: [
              { translateX: cardAnimation }
            ]}
          ]}>
            <Card {...cardData} />
          </Animated.View>
        ) : (
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              containerContrast,
            ]}
          >
            <Text style={[styles.infoText, textContrast]}>Please Login to use the map to find nearby clean water.</Text>
          </View>
        )
      }
    </View>
  );
}