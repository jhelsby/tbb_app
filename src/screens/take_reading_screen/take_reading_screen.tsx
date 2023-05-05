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

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {
  selectContainerContrast,
  selectDarkMode,
  selectPageContrast,
  selectTextContrast,
} from '../../slices/colorSlice';
import {
  clearReceivedData,
  selectFormattedData,
} from '../../slices/bluetoothSlice';
import {THSL, TMeasurement} from '../../scripts/types';
import {
  color1,
  color2,
  colorInterpolate,
  hslToString,
} from '../../scripts/colors';
import {
  addReadingToState,
  postReading,
  selectUnsyncedReadings,
} from '../../slices/readingsSlice';

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

  const deviceData = useAppSelector(selectFormattedData);
  const unsyncedReadings = useAppSelector(selectUnsyncedReadings);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearReceivedData());
    navigation.popToTop();
  };

  useEffect(() => {
    if (deviceData) {
      dispatch(addReadingToState(deviceData));
      const tempPieChartData: any[] = [];
      const measurements: TMeasurement[] = deviceData.measurements;

      measurements.forEach((measurement: TMeasurement, index: number) => {
        const color: any = colorInterpolate(
          color2,
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
                  color2,
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
  }, [deviceData, dispatch]);

  const handleSync = async () => {
    if (isLoggedIn) {
      if (deviceData?.hasSynced) {
        console.log('Already synced');
      } else {
        const index = unsyncedReadings.findIndex(
          (reading: any) => reading.id === deviceData?.id,
        );

        dispatch(postReading(index));
      }
    }
  };

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={handleClose} />
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
              deviceData?.isSafe ? styles.safe : styles.notSafe,
            ]}>
            {deviceData?.isSafe ? 'SAFE' : 'NOT SAFE'}
          </Text>
          <Text style={styles.data}>{deviceData?.datetime.date}</Text>
          <Text
            style={
              styles.data
            }>{`Latitude: ${deviceData?.location.latitude}, Longitude: ${deviceData?.location.longitude}`}</Text>
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
