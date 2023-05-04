import React, {useCallback, ReactElement, useEffect} from 'react';
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
import {selectReceivedData} from '../../slices/bluetoothSlice';
import {THSL, TMeasurement} from '../../scripts/types';
import {
  color1,
  color3,
  colorInterpolate,
  hslToString,
} from '../../scripts/colors';

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

  const [pieChartData, setPieChartData] = React.useState<any>([]);
  const [barChartData, setBarChartData] = React.useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [docName] = React.useState<string>('');

  const [readingData, setReadingData] = React.useState<any>({
    location: {
      latitude: 0,
      longitude: 0,
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

  const deviceData = useAppSelector(selectReceivedData);

  useEffect(() => {
    if (deviceData.length > 0) {
      console.log('Formating data...');
      const lastMessage: string = deviceData[deviceData.length - 1];
      const lastMessageWithoutNewLine: string = lastMessage.replace(
        /(\r\n|\n|\r)/gm,
        '',
      );
      const lastChar: string =
        lastMessageWithoutNewLine[lastMessageWithoutNewLine.length - 1];
      if (lastChar === '$') {
        console.log('Start of message found');
        let dataString: string = '';
        deviceData.forEach((data: any) => {
          dataString = dataString.concat(data);
        });
        const deviceValues: string[] = dataString.split(',');
        const lastIndex = deviceValues.length - 1;
        deviceValues[lastIndex] = deviceValues[lastIndex].replace('$', '');
        const deviceReadings = {
          isSafe: deviceValues[8] === '1',
          datetime: {
            data: deviceValues[2],
            time: deviceValues[2],
          },
          location: {
            latitude: parseFloat(deviceValues[4]),
            longitude: parseFloat(deviceValues[5]),
          },
          measurements: [
            {
              name: 'Chloride',
              value: parseFloat(deviceValues[0]),
            },
            {
              name: 'Conductivity',
              value: parseFloat(deviceValues[1]),
            },
            {
              name: 'Fluoride',
              value: parseFloat(deviceValues[3]),
            },
            {
              name: 'Nitrate',
              value: parseFloat(deviceValues[6]),
            },
            {
              name: 'pH',
              value: parseFloat(deviceValues[7]),
            },
            {
              name: 'Temperature',
              value: parseFloat(deviceValues[9]),
            },
            {
              name: 'Turbidity',
              value: parseFloat(deviceValues[10]),
            },
          ],
        };
        console.log(deviceReadings);
        setReadingData(deviceReadings);
        const tempPieChartData: any[] = [];
        const measurements: TMeasurement[] = deviceReadings.measurements;

        measurements.forEach((measurement: TMeasurement, index: number) => {
          const color: any = colorInterpolate(
            color3,
            color1,
            index / (measurements.length - 1),
          );
          tempPieChartData.push({
            name: measurement.name,
            value: measurement.value,
            color: hslToString(color),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          });
        });
        setPieChartData(tempPieChartData);

        setBarChartData({
          labels: measurements.map(
            (measurement: TMeasurement) => measurement.name,
          ),
          datasets: [
            {
              data: measurements.map(
                (measurement: TMeasurement) => measurement.value,
              ),
              colors: measurements.map(
                (measurement: TMeasurement, index: number) => {
                  const color: THSL = colorInterpolate(
                    color3,
                    color1,
                    index / (measurements.length - 1),
                  );
                  return () => hslToString(color);
                },
              ),
            },
          ],
        });
      }
    }
  }, [deviceData]);

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
            }>{`Latitude: ${readingData.location.latitude}, Longitude: ${readingData.location.longitude}`}</Text>
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
