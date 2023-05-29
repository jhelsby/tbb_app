import React, {useCallback, ReactElement} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from './take_reading_styles';
import {styles as globalStyles} from '../../../App_styles';

import TopNav from '../../components/top_nav/top_nav';
import Button from '../../components/button/button';

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {
  selectContainerContrast,
  selectDarkMode,
  selectPageContrast,
  selectTextContrast,
} from '../../slices/colorSlice';
import {selectIsLoggedIn} from '../../slices/accountSlice';
import {
  clearReceivedData,
  selectFormattedData,
} from '../../slices/bluetoothSlice';
import {THSL, TMeasurement, TPieChartData, TReading} from '../../scripts/types';
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
  const pageContrast = useAppSelector(selectPageContrast);
  const containerContrast = useAppSelector(selectContainerContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const isDarkMode = useAppSelector(selectDarkMode);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const reading = useAppSelector(selectFormattedData);

  const unsyncedReadings = useAppSelector(selectUnsyncedReadings);
  const dispatch = useAppDispatch();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [pieChartData, setPieChartData] = React.useState<TPieChartData[]>([]);
  const [lineChartData, setLineChartData] = React.useState<any>([]);
  const [barChartData, setBarChartData] = React.useState<any>({
    labels: [],
    datasets: [
      {
        data: [],
      },
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

  const handleSync = async () => {
    if (isLoggedIn) {
      if (reading?.hasSynced) {
        console.log('Already synced');
      } else {
        const index = unsyncedReadings.findIndex(
          (unsynedReading: TReading) => unsynedReading.id === reading?.id,
        );

        dispatch(postReading(index));
      }
    }
  };

  const handleClose = () => {
    dispatch(clearReceivedData());
    navigation.popToTop();
  };

  useFocusEffect(
    useCallback(() => {
      if (reading) {
        dispatch(addReadingToState(reading));
        const getBarChartData = (measurements: TMeasurement[]): any => {
          return {
            labels: measurements.map(
              (measurement: TMeasurement) => measurement.name,
            ),
            datasets: [
              {
                data: measurements.map((measurement: TMeasurement) =>
                  getAverageReadings(measurement),
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
          };
        };

        const getPieChartData = (
          measurements: TMeasurement[],
        ): TPieChartData[] => {
          const tempPieChartData: TPieChartData[] = [];
          measurements.forEach((measurement: TMeasurement, index: number) => {
            const color: any = colorInterpolate(
              color2,
              color1,
              index / (measurements.length - 1),
            );

            let measurementValue: number = getAverageReadings(measurement);
            tempPieChartData.push({
              name: measurement.name,
              value: measurementValue,
              color: hslToString(color),
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            });
          });
          return tempPieChartData;
        };

        const getLineChartData = (
          measurements: TMeasurement[],
          timeIntervals: number[] | undefined,
        ): any[] => {
          if (!timeIntervals) {
            return [];
          }

          const tempLineChartData: any = [];
          measurements.forEach((measurement: TMeasurement, index: number) => {
            if (Array.isArray(measurement.value)) {
              tempLineChartData.push({
                name: measurement.name,
                average: getAverageReadings(measurement),
                max: Math.max(...measurement.value),
                min: Math.min(...measurement.value),
                data: {
                  labels: timeIntervals,
                  datasets: [
                    {
                      data: measurement.value,
                      color: () =>
                        hslToString(
                          colorInterpolate(
                            color1,
                            color2,
                            index / (measurements.length - 1),
                          ),
                        ),
                    },
                  ],
                },
              });
            }
          });
          return tempLineChartData;
        };

        const getAverageReadings = (measurement: TMeasurement): number => {
          let measurementValue: number = 0;
          if (Array.isArray(measurement.value)) {
            measurementValue = measurement.value.reduce(
              (accumulator: number, currentValue: number) =>
                accumulator + currentValue,
              0,
            );
            measurementValue /= measurement.value.length;
          } else {
            measurementValue = measurement.value;
          }
          const measurementValueRounded: number =
            Math.round(measurementValue * 100) / 100;
          return measurementValueRounded;
        };

        const measurements: TMeasurement[] = reading.measurements;

        setPieChartData(getPieChartData(measurements));
        setBarChartData(getBarChartData(measurements));
        setLineChartData(getLineChartData(measurements, reading.timeIntervals));
      }
    }, [dispatch, reading]),
  );

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
              reading?.isSafe ? styles.safe : styles.notSafe,
            ]}>
            {reading?.isSafe ? 'SAFE' : 'NOT SAFE'}
          </Text>
          <Text style={styles.data}>{reading?.datetime.date}</Text>
          <Text
            style={
              styles.data
            }>{`Latitude: ${reading?.location.latitude}, Longitude: ${reading?.location.longitude}`}</Text>
        </View>
        {isLoggedIn && (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSync} disabled={reading?.hasSynced}>
                <Text style={[styles.buttonText]}>
                  {reading?.hasSynced ? 'Synced' : 'Sync'}
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
        {lineChartData.map((data: any, index: number) => {
          return (
            <View
              key={index}
              style={[
                globalStyles.tile,
                styles.lineChartContainer,
                containerContrast,
              ]}>
              <View style={styles.lineChartTextContainer}>
                <Text style={[styles.lineChartTitle, textContrast]}>
                  {data.name}
                </Text>
                <View style={styles.lineChartDescriptionContainer}>
                  <Text
                    style={
                      styles.lineChartDescription
                    }>{`Mean: ${data.average}`}</Text>
                  <Text
                    style={
                      styles.lineChartDescription
                    }>{`Max: ${data.max}`}</Text>
                  <Text
                    style={
                      styles.lineChartDescription
                    }>{`Min: ${data.min}`}</Text>
                </View>
              </View>
              <LineChart
                data={data.data}
                width={screenWidth * 0.8}
                height={screenHeight * 0.25}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: isDarkMode ? '#2E2E2E' : '#fff',
                  backgroundGradientTo: isDarkMode ? '#2E2E2E' : '#fff',
                  decimalPlaces: 2,
                  color: () => '#7F7F7F',
                }}
                withShadow={false}
                bezier
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartXLabel}>Time(s)</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
