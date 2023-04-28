import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';

import DeviceInfo from 'react-native-device-info';

type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

const DEVICE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
const CHARACTERISTIC_UUID = '0000FFE1-0000-1000-8000-00805F9B34FB';

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>;
  scanForDevices(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  streamedData: any;
}

export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [streamedData, setStreamedData] = useState('');

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            buttonNeutral: 'Ask Me Later',
          },
        );
        callback(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const isAllPermissionsGranted =
          granted['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;

        callback(isAllPermissionsGranted);
      }
    } else {
      callback(true);
    }
  };

  const isDuplicateDevice = (devices: Device[], nextdevice: Device) => {
    return devices.findIndex(device => nextdevice.id === device.id) > -1;
  };

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes('DSD TECH')) {
        setAllDevices(prevState => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setStreamedData('');
    }
  };

  const onHeartRateUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
  ) => {
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log('No Data was recieved');
      return -1;
    }

    const rawData = characteristic.value;

    setStreamedData(rawData);
  };

  const startStreamingData = async (device: Device) => {
    if (device) {
      device.monitorCharacteristicForService(
        DEVICE_UUID,
        CHARACTERISTIC_UUID,
        (error, characteristic) => onHeartRateUpdate(error, characteristic),
      );
    } else {
      console.log('No Device Connected');
    }
  };

  return {
    scanForDevices,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    streamedData,
  };
}
