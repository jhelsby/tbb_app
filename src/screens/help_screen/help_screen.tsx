import React, {useContext, useCallback, ReactElement} from 'react';
import {View, Text, ScrollView, useColorScheme} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';

import {styles} from './help_styles';
import {styles as globalStyles} from '../../../App_styles';

import {ColorContext} from '../../context/color_context';
import {hslToString} from '../../scripts/colors';

import HelpSvg from '../../svgs/help.svg';
import TopNav from '../../components/top_nav/top_nav';
import tempData from './data.temp.json';
import {useFocusEffect} from '@react-navigation/native';

type Props = NativeStackScreenProps<HomeParamList, 'HelpScreen'>;

export default function HelpScreen({
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
        <Text style={[styles.title, textContrast]}>Help</Text>
        <View style={styles.svgContainer}>
          <HelpSvg
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
