import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../scripts/store';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import {TAbstractDevice, TBluetoothSliceState} from '../scripts/types';
import {PermissionsAndroid, Platform} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import base64 from 'react-native-base64';

const DEVICE_UUID: string = '0000FFE0-0000-1000-8000-00805F9B34FB';
const CHARACTERISTIC_UUID: string = '0000FFE1-0000-1000-8000-00805F9B34FB';

const bleManager: BleManager = new BleManager();
let connectedDevice: Device | null = null;

const initialState: TBluetoothSliceState = {
  availableDevices: [],
  isDeviceConnected: false,
  receivedData: null,
  isLoading: false,
  hasError: false,
  permissionsGranted: false,
};

export const getBleManager = (): BleManager => {
  return bleManager;
};

export const getConnectedDevice = (): Device | null => {
  return connectedDevice;
};

export const requestPermissions: any = createAsyncThunk(
  'bluetooth/requestPermissions',
  async (): Promise<boolean> => {
    let permissionGranted: boolean = false;
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
        permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        permissionGranted =
          granted['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED;
      }
    } else {
      permissionGranted = true;
    }
    return permissionGranted;
  },
);

export const connectToDevice: any = createAsyncThunk(
  'bluetooth/connectToDevice',
  async (args: {deviceId: string}): Promise<boolean> => {
    let isConnected: boolean = false;
    try {
      connectedDevice = await bleManager.connectToDevice(args.deviceId);
      await connectedDevice.discoverAllServicesAndCharacteristics();
      isConnected = !!connectedDevice;
      bleManager.stopDeviceScan();
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
    return isConnected;
  },
);

export const disconnectFromDevice: any = createAsyncThunk(
  'bluetooth/disconnectFromDevice',
  async (): Promise<boolean> => {
    let isDisconnected = false;
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      isDisconnected = true;
    }
    return isDisconnected;
  },
);

export const getDataFromDevice: any = createAsyncThunk(
  'bluetooth/getDataFromDevice',
  async (args: {transmitMessage: string}): Promise<any | null> => {
    let receivedData: any | null = null;

    const possibleTransmitMessages: string[] = [
      'takeReading',
      'getAllReadings',
    ];
    // Checks to see if the transmit message is valid
    if (
      !(
        possibleTransmitMessages.findIndex(
          message => message === args.transmitMessage,
        ) > -1
      )
    ) {
      console.error(`Transmit message ${args.transmitMessage} is invalid`);
      return receivedData;
    }

    if (connectedDevice && args.transmitMessage) {
      const encodedTransmitMessage = base64.encode(args.transmitMessage);
      await connectedDevice.writeCharacteristicWithResponseForService(
        DEVICE_UUID,
        CHARACTERISTIC_UUID,
        encodedTransmitMessage,
      );
      await connectedDevice.monitorCharacteristicForService(
        DEVICE_UUID,
        CHARACTERISTIC_UUID,
        (error: BleError | null, characteristic: Characteristic | null) => {
          if (error) {
            console.error(error);
          } else if (!characteristic?.value) {
            console.log('No Data was received');
          }

          const rawReceivedData = characteristic?.value;
          const decodedData = base64.decode(rawReceivedData);
          const values: string[] = decodedData.split(',');
          const listOfReadings = {
            isSafe: values[8] === '1',
            date: values[2],
            latitude: parseFloat(values[4]),
            longitude: parseFloat(values[5]),
            results: [
              {
                name: 'Chloride',
                value: parseFloat(values[0]),
              },
              {
                name: 'Conductivity',
                value: parseFloat(values[1]),
              },
              {
                name: 'Fluoride',
                value: parseFloat(values[3]),
              },
              {
                name: 'Nitrate',
                value: parseFloat(values[6]),
              },
              {
                name: 'pH',
                value: parseFloat(values[7]),
              },
              {
                name: 'Temperature',
                value: parseFloat(values[9]),
              },
              {
                name: 'Turbidity',
                value: parseFloat(values[10]),
              },
            ],
          };
          receivedData = listOfReadings;
        },
      );
    } else {
      console.log('No Device Connected');
    }
    return receivedData;
  },
);

const setDeviceConnectedFunc = (
  state: TBluetoothSliceState,
  action: PayloadAction<boolean>,
): void => {
  state.isDeviceConnected = action.payload;
};

const addAvailableDeviceFunc = (
  state: TBluetoothSliceState,
  action: PayloadAction<TAbstractDevice>,
): void => {
  const deviceIndex = state.availableDevices.findIndex(
    device => device.id === action.payload.id,
  );
  if (!(deviceIndex > -1)) {
    state.availableDevices = [
      ...state.availableDevices,
      {
        name: action.payload.name,
        id: action.payload.id,
      },
    ];
  }
};

const resetAvailableDevicesFunc = (state: TBluetoothSliceState): void => {
  state.availableDevices = [];
};

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setIsDeviceConnected: setDeviceConnectedFunc,
    addAvailableDevice: addAvailableDeviceFunc,
    resetAvailableDevices: resetAvailableDevicesFunc,
  },
  extraReducers: builder => {
    builder
      .addCase(connectToDevice.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        connectToDevice.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isLoading = false;
          state.hasError = false;
          state.isDeviceConnected = action.payload;
        },
      )
      .addCase(connectToDevice.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(requestPermissions.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        requestPermissions.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isLoading = false;
          state.hasError = false;
          state.permissionsGranted = action.payload;
        },
      )
      .addCase(requestPermissions.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(disconnectFromDevice.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        disconnectFromDevice.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.isLoading = false;
          state.hasError = false;
          if (action.payload) {
            state.isDeviceConnected = false;
            state.receivedData = null;
          }
        },
      )
      .addCase(disconnectFromDevice.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(getDataFromDevice.pending, state => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        getDataFromDevice.fulfilled,
        (state, action: PayloadAction<any | null>) => {
          state.isLoading = false;
          state.hasError = false;
          state.receivedData = action.payload;
        },
      )
      .addCase(getDataFromDevice.rejected, state => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {setIsDeviceConnected, addAvailableDevice, resetAvailableDevices} =
  bluetoothSlice.actions;

export const selectRecievedData = (state: RootState) =>
  state.bluetooth.receivedData;

export const selectPermissionsGranted = (state: RootState) =>
  state.bluetooth.permissionsGranted;

export const selectIsDeviceConnected = (state: RootState) =>
  state.bluetooth.isDeviceConnected;

export const selectAvailableDevices = (state: RootState) =>
  state.bluetooth.availableDevices;

export default bluetoothSlice.reducer;
