import React, {useContext, useCallback, ReactElement} from 'react';
import {View, Text, ScrollView, useColorScheme} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NewsParamList} from '../../scripts/screen_params';

import {styles} from './view_news_styles';
import {styles as globalStyles} from '../../../App_styles';

import {ColorContext} from '../../context/color_context';
import {hslToString} from '../../scripts/colors';

import TopNav from '../../components/top_nav/top_nav';
import NewsSvg from '../../svgs/news.svg';
import tempData from './data.temp.json';

type Props = NativeStackScreenProps<NewsParamList, 'ViewNewsScreen'>;

export default function ViewNewsScreen({
  navigation,
  route,
}: any): ReactElement<Props> {
  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) {
        navigation.popToTop();
      }
      route.params.validNavigation = false;
    }, [navigation, route.params]),
  );

  const {color} = useContext(ColorContext);

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode
    ? globalStyles.darkText
    : globalStyles.lightText;
  const containerContrast = isDarkMode
    ? globalStyles.darkContainer
    : globalStyles.lightContainer;
  const pageContrast = isDarkMode
    ? globalStyles.darkPage
    : globalStyles.lightPage;

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingBottom: 200}}>
        <Text style={[styles.title, textContrast]}>{tempData.title}</Text>
        <View
          style={[
            globalStyles.tile,
            styles.subtitleContainer,
            containerContrast,
          ]}>
          <Text style={styles.subtitle}>{tempData.author}</Text>
          <Text style={styles.subtitle}>{tempData.date}</Text>
        </View>
        <View style={styles.svgContainer}>
          <NewsSvg
            height="100%"
            width="100%"
            color={hslToString(color)}
            style={styles.svg}
          />
        </View>
        <View style={styles.content}>
          {tempData.contents.map((content, contentIdx) => {
            return (
              <View
                key={contentIdx}
                style={[
                  globalStyles.tile,
                  styles.paragraphsContainer,
                  containerContrast,
                ]}>
                <Text style={[styles.heading, textContrast]}>
                  {content.heading}
                </Text>
                {content.paragraphs.map((paragraph, paragraphIdx) => {
                  return (
                    <Text
                      key={paragraphIdx}
                      style={[styles.text, textContrast]}>
                      {paragraph}
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
