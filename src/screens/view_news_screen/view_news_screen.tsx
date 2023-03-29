import React, { useContext, useCallback, ReactElement, useState } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NewsParamList } from "../../scripts/screen_params";

import { styles } from "./view_news_styles";
import { styles as globalStyles } from "../../../App_styles";

import { ColorContext } from "../../context/color_context";
import { hslToString } from "../../scripts/colors";

import TopNav from "../../components/top_nav/top_nav";
import NewsSvg from "../../assets/svgs/news.svg";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getNews } from "../../scripts/firebase";

type Props = NativeStackScreenProps<NewsParamList, "ViewNewsScreen">;

export default function ViewNewsScreen({ navigation, route } : any) : ReactElement<Props> {

  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) navigation.popToTop();
      route.params.validNavigation = false;
    }, [])
  );

  const [article, setData] = useState({
    title: "Loading...",
    author: "Loading...",
    date: "Loading...",
    contents: [],
  });
  const [isLoggedIn, setLoggedIn] = useState(false);

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
        console.log("Getting News Data...")
        getNews(route.params.newsId).then((data: any) => {
          if (data) {
            setData(data);
          }
        });
      }
    }, [isLoggedIn])
  )

  const { color } = useContext(ColorContext);

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const containerContrast = isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView style={styles.body} 
        contentContainerStyle={{
          paddingBottom: 200,
        }}>
        <Text style={[styles.title, textContrast]}>{article.title}</Text>
        <View style={[globalStyles.tile, styles.subtitleContainer, containerContrast]}>
          <Text style={styles.subtitle}>{article.author}</Text>
          <Text style={styles.subtitle}>{article.date}</Text>
        </View>
        <View style={styles.svgContainer}>
          <NewsSvg height="100%" width="100%" color={hslToString(color)} style={styles.svg} />
        </View>
        <View style={styles.content}>
          {
            article.contents.map((section: any, index: number) => {
              return (
                <View key={index} style={[globalStyles.tile, styles.paragraphsContainer, containerContrast]}>
                  <Text style={[styles.heading, textContrast]}>{section.heading}</Text>
                  {
                    section.paragraphs.map((paragraph: any, index: number) => {
                      return (
                        <Text key={index} style={[styles.text, textContrast]}>{paragraph}</Text>
                      );
                    })
                  }
                </View>
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
}