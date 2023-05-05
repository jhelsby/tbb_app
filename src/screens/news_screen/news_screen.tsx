import React, {ReactElement, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NewsParamList} from '../../scripts/screen_params';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from './news_styles';
import {styles as globalStyles} from '../../../App_styles';

import Card from '../../components/card/card';

import {useAppSelector, useAppDispatch} from '../../scripts/redux_hooks';
import {
  selectPageContrast,
  selectTextContrast,
  selectContainerContrast,
} from '../../slices/colorSlice';
import {selectIsLoggedIn} from '../../slices/accountSlice';
import {emptyNews, fetchAllNews, selectNews} from '../../slices/newsSlice';

type Props = NativeStackScreenProps<NewsParamList, 'NewsScreen'>;

export default function NewsScreen({navigation}: Props): ReactElement<Props> {
  // Get the contrast settings from the redux store
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const containerContrast = useAppSelector(selectContainerContrast);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const news = useAppSelector(selectNews);

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        if (!news.length) {
          dispatch(fetchAllNews());
        }
      } else {
        dispatch(emptyNews());
      }
    }, [dispatch, isLoggedIn, news.length]),
  );

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>News</Text>
        {isLoggedIn ? (
          news.map((article: any, index: number) => {
            return (
              <Card
                key={index}
                isIcon={true}
                onPress={() =>
                  navigation.navigate('ViewNewsScreen', {
                    validNavigation: true,
                    newsId: article.id,
                  })
                }
                highLight={null}
                title={article.title}
                subtitle1={article.author}
                subtitle2={article.datetime.date}>
                <Text>{article.description}</Text>
              </Card>
            );
          })
        ) : (
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              containerContrast,
            ]}>
            <Text style={[styles.infoText, textContrast]}>
              Please Login to see news articles.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
