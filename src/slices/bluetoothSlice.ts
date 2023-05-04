import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TAbstractDevice} from '../scripts/types';
import {RootState} from '../scripts/store';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

type TBluetoothSliceState = {
  permissionsGranted: boolean;
  availableDevices: Array<TAbstractDevice>;
  isConnectingToDevice: boolean;
  connectedDevice: string | null;
  receivedData: Array<string>;
  isStreamingData: boolean;
  isScanning: boolean;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TBluetoothSliceState = {
  permissionsGranted: false,
  availableDevices: [],
  isConnectingToDevice: false,
  connectedDevice: null,
  receivedData: [],
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
    scanForDevices: state => {
      state.isScanning = true;
    },
    initiateConnection: (state, _) => {
      state.isConnectingToDevice = true;
    },
    connectToDevice: (state, action) => {
      state.isConnectingToDevice = false;
      state.connectedDevice = action.payload;
    },
    updateReceivedData: (state, action) => {
      state.receivedData = [...state.receivedData, action.payload];
    },
    takeReading: state => {
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
  takeReading,
} = bluetoothReducer.actions;

export const sagaActionConstants = {
  SCAN_FOR_DEVICES: bluetoothReducer.actions.scanForDevices.type,
  ON_DEVICE_DISCOVERED: bluetoothReducer.actions.bluetoothDeviceFound.type,
  INITIATE_CONNECTION: bluetoothReducer.actions.initiateConnection.type,
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
  state.bluetooth.receivedData;

export const selectIsStreamingData = (state: RootState) =>
  state.bluetooth.isStreamingData;

export default bluetoothReducer.reducer;
