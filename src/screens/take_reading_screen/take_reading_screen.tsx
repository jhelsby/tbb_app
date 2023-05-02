import React, {useCallback, ReactElement} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from './take_reading_styles';
import {styles as globalStyles} from '../../../App_styles';

import TopNav from '../../components/top_nav/top_nav';
import Button from '../../components/button/button';

import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../scripts/firebase';

import {useAppSelector} from '../../scripts/redux_hooks';
import {
  selectContainerContrast,
  selectDarkMode,
  selectPageContrast,
  selectTextContrast,
} from '../../slices/colorSlice';

export default function TakeReadingScreen({
  navigation,
  route,
}: any): ReactElement<any> {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const pageContrast = useAppSelector(selectPageContrast);
  const containerContrast = useAppSelector(selectContainerContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const isDarkMode = useAppSelector(selectDarkMode);

  const [pieChartData] = React.useState<any>([]);
  const [barChartData] = React.useState<any>({
    labels: [
      'Turbidity',
      'pH',
      'Chloride',
      'Nitrate',
      'Flouride',
      'Conductivity',
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  });

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [docName] = React.useState<string>('');

  const [readingData] = React.useState<any>({
    location: {
      latitude: Math.round(Math.random() * 90 * 1000000) / 1000000,
      longitude: Math.round(Math.random() * 180 * 1000000) / 1000000,
    },
    datetime: {
      date: '',
      time: '',
    },
    isSafe: false,
    measurements: [
      {name: 'turbidity', value: 0},
      {name: 'ph', value: 0},
      {name: 'chloride', value: 0},
      {name: 'nitrate', value: 0},
      {name: 'flouride', value: 0},
      {name: 'conductivity', value: 0},
    ],
  });

  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) {
        navigation.popToTop();
      }
      route.params.validNavigation = false;
    }, [navigation, route.params]),
  );

  onAuthStateChanged(auth, user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const handleSync = async () => {
    // if (isLoggedIn) {
    //   if (docName) {
    //     Alert.alert('This reading has already been synced.');
    //   } else {
    //     console.log('Syncing...');
    //     const newDocName = await postReading(readingData);
    //     if (docName) {
    //       setDocName(newDocName);
    //     }
    //   }
    // }
  };

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.popToTop()} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{
          paddingBottom: 180,
        }}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, textContrast]}>View Readings</Text>
        </View>
        <View
          style={[globalStyles.tile, styles.dataContainer, containerContrast]}>
          <Text
            style={[
              styles.dataTitle,
              readingData.isSafe ? styles.safe : styles.notSafe,
            ]}>
            {readingData.isSafe ? 'SAFE' : 'NOT SAFE'}
          </Text>
          <Text style={styles.data}>{readingData.datetime.date}</Text>
          <Text
            style={
              styles.data
            }>{`Latitude: ${readingData.location.latitude}, Longitude: ${readingData.location.latitude}`}</Text>
        </View>
        {isLoggedIn && (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSync} disabled={!!docName}>
                <Text style={[styles.buttonText]}>
                  {docName ? 'Synced' : 'Sync'}
                </Text>
              </Button>
            </View>
          </View>
        )}
        <View
          style={[
            globalStyles.tile,
            styles.barChartContainer,
            containerContrast,
          ]}>
          <BarChart
            data={barChartData}
            width={screenWidth * 0.8}
            height={350}
            withCustomBarColorFromData={true}
            flatColor={true}
            yAxisLabel=""
            yAxisSuffix=""
            verticalLabelRotation={90}
            withInnerLines={false}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: isDarkMode ? '#2E2E2E' : '#fff',
              backgroundGradientTo: isDarkMode ? '#2E2E2E' : '#fff',
              barPercentage: 0.8,
              decimalPlaces: 4,
              color: () => '#7F7F7F',
              style: {
                borderRadius: 16,
              },
            }}
          />
        </View>
        <View
          style={[
            globalStyles.tile,
            styles.pieChartContainer,
            containerContrast,
          ]}>
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.9}
            height={screenHeight * 0.25}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: () => '#d95448',
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft=""
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
}
