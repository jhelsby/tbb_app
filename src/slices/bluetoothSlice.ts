import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TAbstractDevice, TReading} from '../scripts/types';
import {RootState} from '../scripts/store';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

type TBluetoothSliceState = {
  permissionsGranted: boolean;
  availableDevices: Array<TAbstractDevice>;
  connectedDevice: string | null;
  receivedData: Array<string>;
  formattedData: TReading | null;
  isConnectingToDevice: boolean;
  isDisconnectingFromDevice: boolean;
  isStreamingData: boolean;
  isScanning: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TBluetoothSliceState = {
  permissionsGranted: false,
  availableDevices: [],
  isConnectingToDevice: false,
  isDisconnectingFromDevice: false,
  connectedDevice: null,
  receivedData: [],
  formattedData: null,
  isStreamingData: false,
  isScanning: false,
  isLoading: false,
  hasError: false,
};

const DEVICE_NAME = 'DSD TECH';

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

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState: initialState,
  reducers: {
    clearReceivedData: state => {
      state.receivedData = [];
      state.formattedData = null;
    },
    scanForDevices: state => {
      state.isScanning = true;
    },
    initiateConnection: (state, _) => {
      state.isConnectingToDevice = true;
    },
    initiateDisconntect: (state, _) => {
      state.isDisconnectingFromDevice = true;
    },
    connectToDevice: (state, action) => {
      state.isConnectingToDevice = false;
      state.connectedDevice = action.payload;
    },
    disconnectFromDevice: state => {
      state.isDisconnectingFromDevice = false;
      state.connectedDevice = null;
    },
    updateReceivedData: (state, action) => {
      let lastMessage = action.payload;
      state.receivedData = [...state.receivedData, lastMessage];
      // Check if transmission is complete by checking for end of message character
      lastMessage = lastMessage.replace(/(\r\n|\n|\r)/gm, '');
      const lastChar: string = lastMessage[lastMessage.length - 1];

      if (lastChar === '$') {
        let dataString: string = '';
        state.receivedData.forEach((data: any) => {
          dataString = dataString.concat(data);
        });
        const deviceValues: string[] = dataString.split(',');
        const lastIndex = deviceValues.length - 1;
        deviceValues[lastIndex] = deviceValues[lastIndex].replace('$', '');
        const deviceReadings: TReading = {
          id: `${Date.now()}`,
          hasSynced: false,
          isSafe: deviceValues[8] === '1',
          datetime: {
            date: deviceValues[2],
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
        state.formattedData = deviceReadings;
        state.receivedData = [];
      }
    },
    takeReading: state => {
      state.formattedData = null;
      state.isStreamingData = true;
    },
    bluetoothDeviceFound: (
      state: TBluetoothSliceState,
      action: PayloadAction<TAbstractDevice>,
    ) => {
      // Ensure no duplicate devices are added
      const isDuplicate = state.availableDevices.some(
        device => device.id === action.payload.id,
      );
      const isCorrectDevice = action.payload?.name?.includes(DEVICE_NAME);
      if (!isDuplicate && isCorrectDevice) {
        state.availableDevices = state.availableDevices.concat(action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder
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
      });
  },
});

export const {
  bluetoothDeviceFound,
  scanForDevices,
  initiateConnection,
  initiateDisconntect,
  takeReading,
  clearReceivedData,
} = bluetoothReducer.actions;

export const sagaActionConstants = {
  SCAN_FOR_DEVICES: bluetoothReducer.actions.scanForDevices.type,
  ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothDeviceFound.type,
  INITIATE_CONNECTION: bluetoothReducer.actions.initiateConnection.type,
  INITIATE_DISCONNECT: bluetoothReducer.actions.initiateDisconntect.type,
  DISCONNECT_SUCCESS: bluetoothReducer.actions.disconnectFromDevice.type,
  CONNECTION_SUCCESS: bluetoothReducer.actions.connectToDevice.type,
  UPDATE_RECEIVED_DATA: bluetoothReducer.actions.updateReceivedData.type,
  START_STREAMING_DATA: bluetoothReducer.actions.takeReading.type,
};

export const selectAvailableDevices = (state: RootState) =>
  state.bluetooth.availableDevices;

export const selectIsScanning = (state: RootState) =>
  state.bluetooth.isScanning;

export const selectIsConnectingToDevice = (state: RootState) =>
  state.bluetooth.isConnectingToDevice;

export const selectConnectedDevice = (state: RootState) =>
  state.bluetooth.connectedDevice;

export const selectReceivedData = (state: RootState) =>
  state.bluetooth.formattedData;

export const selectIsStreamingData = (state: RootState) =>
  state.bluetooth.isStreamingData;

export default bluetoothReducer.reducer;
