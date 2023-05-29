import React, {ReactElement, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReadingsParamList} from '../../scripts/screen_params';
import {useFocusEffect} from '@react-navigation/native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCloudArrowUp, faCloud} from '@fortawesome/free-solid-svg-icons';

import {styles} from './readings_styles';
import {styles as globalStyles} from '../../../App_styles';

import Card from '../../components/card/card';
import Button from '../../components/button/button';

import {useAppSelector, useAppDispatch} from '../../scripts/redux_hooks';
import {
  selectPageContrast,
  selectTextContrast,
  selectContainerContrast,
} from '../../slices/colorSlice';
import {selectIsLoggedIn} from '../../slices/accountSlice';
import {
  selectReadings,
  fetchAllReadings,
  postAllReadings,
  emptySyncedReadings,
} from '../../slices/readingsSlice';

type Props = NativeStackScreenProps<ReadingsParamList, 'ReadingsScreen'>;

export default function ReadingsScreen({
  navigation,
}: Props): ReactElement<Props> {
  // Get the contrast settings from the redux store
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const containerContrast = useAppSelector(selectContainerContrast);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  const readings = useAppSelector(selectReadings);

  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        dispatch(fetchAllReadings());
      } else {
        dispatch(emptySyncedReadings());
      }
    }, [dispatch, isLoggedIn]),
  );

  const handleSync = () => {
    dispatch(postAllReadings(null));
  };

  return (
    <View style={[styles.container, pageContrast]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: 90,
        }}>
        <Text style={[styles.title, textContrast]}>Readings</Text>
        {isLoggedIn ? (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSync}>
                <Text style={[styles.buttonText]}>Sync All</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              containerContrast,
            ]}>
            <Text style={[styles.infoText, textContrast]}>
              Please Login to see readings that have been saved to the cloud.
            </Text>
          </View>
        )}
        {readings.length !== 0 &&
          readings.map((reading: any, index: number) => {
            return (
              <Card
                key={index}
                isIcon={false}
                highLight={reading.isSafe}
                title={'Reading ' + reading.id}
                subtitle1={`Latitude: ${reading?.location?.latitude}, Longitude: ${reading?.location?.longitude}`}
                subtitle2={`Date: ${reading.datetime.date}, Time: ${reading.datetime.time}`}
                onPress={() =>
                  navigation.navigate('ViewReadingScreen', {
                    validNavigation: true,
                    readingId: reading.id,
                  })
                }>
                <View>
                  {reading.hasSynced ? (
                    <FontAwesomeIcon icon={faCloud} />
                  ) : (
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                  )}
                </View>
              </Card>
            );
          })}
      </ScrollView>
    </View>
  );
}
