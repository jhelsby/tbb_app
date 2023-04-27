import React, {ReactElement} from 'react';
import {View, Text, ScrollView, useColorScheme} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NewsParamList} from '../../scripts/screen_params';

import {styles} from './news_styles';
import {styles as globalStyles} from '../../../App_styles';

import Card from '../../components/card/card';

import newsData from './data.temp.json';

type Props = NativeStackScreenProps<NewsParamList, 'NewsScreen'>;

export default function NewsScreen({navigation}: Props): ReactElement<Props> {
  const cards = newsData.cards;

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode
    ? globalStyles.darkText
    : globalStyles.lightText;
  const pageContrast = isDarkMode
    ? globalStyles.darkPage
    : globalStyles.lightPage;

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>News</Text>
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              isIcon={true}
              onPress={() =>
                navigation.navigate('ViewNewsScreen', {validNavigation: true})
              }
              highLight={null}
              title={card.title}
              subtitle1={card.author}
              subtitle2={card.date}
              description={card.description}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
