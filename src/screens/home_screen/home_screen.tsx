import React, {ReactElement, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';

import {styles} from './home_styles';
import {styles as globalStyles} from '../../../App_styles';

import {ColorContext} from '../../context/color_context';
import {hslToString} from '../../scripts/colors';

import HomeSvg from '../../svgs/home.svg';
import Button from '../../components/button/button';
import DeviceModal from '../../components/modal/modal';
import useBLE from '../../scripts/useBLE';

type Props = NativeStackScreenProps<HomeParamList, 'HomeScreen'>;

export default function HomeScreen({navigation}: Props): ReactElement<Props> {
  const {color, colorLight} = useContext(ColorContext);

  const {
    requestPermissions,
    scanForDevices,
    allDevices,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    startDeviceReading,
    streamedData,
  } = useBLE();

import { ColorContext } from "../../context/color_context";

  const [isModalVisible, setModalVisible] = React.useState(false);

import { useAppSelector } from "../../scripts/redux_hooks";
import { selectContainerContrast, selectPageContrast, selectTextContrast } from "../../slices/colorSlice";

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

export default function HomeScreen({ navigation } : Props) : ReactElement<Props> {

  
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const { color, lightColor } = useContext(ColorContext);

  const openModal = () => {
    requestPermissions((result: boolean) => {
      if (result) {
        scanForDevices();
      }
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.screen}>
      <View style={[globalStyles.page, styles.pageContainer, pageContrast]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color }]}>
            Biodevices
          </Text>
          <Text style={[styles.headerPlain, textContrast]}>Without</Text>
          <Text style={[styles.headerText, {color }]}>
            Borders
          </Text>
        </View>
        <View style={styles.svgContainer}>
          <HomeSvg
            height="100%"
            width="100%"
            color={lightColor}
            style={styles.svg}
          />
        </View>
        {connectedDevice ? (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  startDeviceReading(connectedDevice);
                  navigation.navigate('LoadingScreen', {validNavigation: true});
                }}>
                <Text style={styles.buttonText}>Take Readings</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={disconnectFromDevice}>
                <Text style={styles.buttonText}>Disconnect</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate('HelpScreen', {validNavigation: true})
                }>
                <Text style={styles.buttonText}>{streamedData}</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={openModal}>
                <Text style={styles.buttonText}>Connect</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate('HelpScreen', {validNavigation: true})
                }>
                <Text style={styles.buttonText}>Help</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
      <DeviceModal
        closeModal={closeModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </View>
  );
}
