import React, {ReactElement, useContext, useEffect} from 'react';
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
  disconnectFromDevice,
  getDataFromDevice,
  requestPermissions,
  getBleManager,
  selectAvailableDevices,
  addAvailableDevice,
  resetAvailableDevices,
  setConnectedDeviceDetails,
} from '../../slices/bluetoothSlice';
import {BleManager, Device} from 'react-native-ble-plx';

type Props = NativeStackScreenProps<HomeParamList, 'HomeScreen'>;

export default function HomeScreen({navigation}: Props): ReactElement<Props> {
  const [isModalVisible, setModalVisible] = React.useState(false);
  // Get the contrast settings from the redux store
  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const [selectedDeviceId, setSelectedDeviceId] = React.useState<string>('');
  const [connectedDevice, setConnectedDevice] = React.useState<Device | null>(
    null,
  );
  const availableDevices = useAppSelector(selectAvailableDevices);
  const dispatch = useAppDispatch();

  const {color, lightColor} = useContext(ColorContext);

  const DEVICE_NAME: string = 'DSD TECH';

  const openModal = () => {
    dispatch(resetAvailableDevices());
    dispatch(requestPermissions()).then((result: boolean) => {
      if (result) {
        const bleManager = getBleManager();
        bleManager.startDeviceScan(null, null, (error, newDevice) => {
          if (error) {
            console.error(error);
          }
          if (newDevice && newDevice.name?.includes(DEVICE_NAME)) {
            dispatch(
              addAvailableDevice({
                id: newDevice.id,
                name: newDevice.name,
                serviceUUIDs: newDevice.serviceUUIDs,
              }),
            );
          }
        });
      }
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const connectToDevice = async (deviceId: string) => {
      try {
        const bleManager: BleManager = getBleManager();
        const deviceConnection = await bleManager.connectToDevice(deviceId);
        setConnectedDevice(deviceConnection);
        await deviceConnection.discoverAllServicesAndCharacteristics();
        dispatch(
          setConnectedDeviceDetails({
            id: deviceConnection.id,
            name: deviceConnection.name,
            serviceUUIDs: deviceConnection.serviceUUIDs,
          }),
        );
      } catch (e) {
        console.log('FAILED TO CONNECT', e);
      }
    };

    if (selectedDeviceId) {
      connectToDevice(selectedDeviceId);
    }
  }, [dispatch, selectedDeviceId]);

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
                  dispatch(getDataFromDevice('takeReading'));
                  navigation.navigate('LoadingScreen', {validNavigation: true});
                }}>
                <Text style={styles.buttonText}>Take Readings</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  dispatch(disconnectFromDevice());
                  setConnectedDevice(null);
                }}>
                <Text style={styles.buttonText}>Disconnect</Text>
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
        devices={availableDevices}
        connectToDevice={setSelectedDeviceId}
      />
    </View>
  );
}
