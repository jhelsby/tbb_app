import React, {ReactElement, useContext} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';

import {styles} from './home_styles';
import {styles as globalStyles} from '../../../App_styles';

import HomeSvg from '../../svgs/home.svg';
import Button from '../../components/button/button';
import DeviceModal from '../../components/modal/modal';

import {ColorContext} from '../../context/color_context';

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {
  selectContainerContrast,
  selectPageContrast,
  selectTextContrast,
} from '../../slices/colorSlice';
import {
  clearReceivedData,
  initiateConnection,
  initiateDisconntect,
  requestPermissions,
  scanForDevices,
  selectAvailableDevices,
  selectConnectedDevice,
} from '../../slices/bluetoothSlice';
import {TAbstractDevice} from '../../scripts/types';

type Props = NativeStackScreenProps<HomeParamList, 'HomeScreen'>;

export default function HomeScreen({navigation}: Props): ReactElement<Props> {
  const [isModalVisible, setModalVisible] = React.useState(false);
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);
  const connectedDevice = useAppSelector(selectConnectedDevice);
  const availableDevices = useAppSelector(selectAvailableDevices);
  const dispatch = useAppDispatch();

  const {color, lightColor} = useContext(ColorContext);

  const connectToDevice = (device: TAbstractDevice) => {
    dispatch(initiateConnection(device.id));
  };

  const disconnectFromDevice = () => {
    dispatch(initiateDisconntect(connectedDevice));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.screen}>
      <View style={[globalStyles.page, styles.pageContainer, pageContrast]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color}]}>Biodevices</Text>
          <Text style={[styles.headerPlain, textContrast]}>Without</Text>
          <Text style={[styles.headerText, {color}]}>Borders</Text>
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
                  dispatch(clearReceivedData());
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
          </View>
        ) : (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  dispatch(requestPermissions());
                  dispatch(scanForDevices());
                  setModalVisible(true);
                }}>
                <Text style={styles.buttonText}>Connect</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
      <DeviceModal
        closeModal={closeModal}
        visible={isModalVisible}
        devices={availableDevices}
        connectToDevice={connectToDevice}
      />
    </View>
  );
}
