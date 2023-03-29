import React, { ReactElement, useCallback } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NewsParamList } from "../../scripts/screen_params";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./news_styles";
import { styles as globalStyles } from "../../../App_styles";

import { onAuthStateChanged } from "firebase/auth";
import { auth, getAllNews } from "../../scripts/firebase";

import Card from "../../components/card/card";

type Props = NativeStackScreenProps<NewsParamList, "NewsScreen">;

export default function NewsScreen({ navigation } : Props) : ReactElement<Props> {

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode ? globalStyles.darkText : globalStyles.lightText;
  const pageContrast = isDarkMode ? globalStyles.darkPage : globalStyles.lightPage;

  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const [news, setNews] = React.useState<any>([]);

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
        console.log("Getting News...")
        getAllNews().then((news) => {
          setNews(news);
        });
      }
    }, [isLoggedIn])
  );

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>News</Text>
        {
          news.map((card: any, index: number) => {
            return (
              <Card
                key={index}
                isIcon={true}
                onPress={() => navigation.navigate("ViewNewsScreen", {
                  validNavigation: true,
                  newsId: card.id,
                })}
                highLight={null}
                title={card.title}
                subtitle1={card.author}
                subtitle2={card.datetime.date} 
                description={card.description} 
              />
            );
          })
        }
      </ScrollView>
    </View>
  );
}