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

const DEVICE_NAME = 'TANTALUS';

export const requestPermissions: any = createAsyncThunk(
  'bluetooth/requestPermissions',
  async (): Promise<boolean> => {
    console.log('requesting permissions');
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
      // Check if transmission is complete by checking for end of message character
      if (typeof lastMessage === 'string') {
        lastMessage = lastMessage.replace(/(\r\n|\n|\r)/gm, '');
        const lastChar: string = lastMessage[lastMessage.length - 1];

        state.receivedData = [...state.receivedData, lastMessage];

        if (lastChar === '!') {
          let dataString: string = '';
          state.receivedData.forEach((data: any) => {
            dataString = dataString.concat(data);
          });

          dataString = dataString.replace('!', '');

          const dataStringRows: string[] = dataString.split('?');

          let chloride: number = 0;
          let conductivity: number = 0;
          let fluoride: number = 0;
          let nitrate: number = 0;
          let ph: number = 0;
          let Turbidity: number = 0;

          let length: number = 0;

          let latitude: number = 0;
          let longitude: number = 0;
          let date: string = '';
          let time: string = '';
          let isSafe: boolean = false;

          dataStringRows.forEach((dataStringRow: string, idx: number) => {
            const values: string[] = dataStringRow.split(',');
            if (idx < dataStringRows.length - 1) {
              try {
                chloride += parseFloat(values[1]);
                conductivity += parseFloat(values[2]);
                fluoride += parseFloat(values[3]);
                nitrate += parseFloat(values[4]);
                ph += parseFloat(values[5]);
                Turbidity += parseFloat(values[6]);
                length += 1;
              } catch (err) {
                console.error(
                  `Incorrect number of values in data row\n\r ${values}`,
                );
                console.error(err);
              }
            } else {
              latitude = parseFloat(values[0]);
              longitude = parseFloat(values[1]);
              date = values[2];
              time = values[3];
              const roundTo = (num: number, places: number) => {
                const factor = 10 ** places;
                return Math.round(num * factor) / factor;
              };
              const numOfDecimals: number = 3;
              isSafe = values[4] === '1';
              chloride = roundTo(chloride / length, numOfDecimals);
              conductivity = roundTo(conductivity / length, numOfDecimals);
              fluoride = roundTo(fluoride / length, numOfDecimals);
              nitrate = roundTo(nitrate / length, numOfDecimals);
              ph = roundTo(ph / length, numOfDecimals);
              Turbidity = roundTo(Turbidity / length, numOfDecimals);
            }
          });

          const deviceReadings: TReading = {
            id: `${Date.now()}`,
            hasSynced: false,
            isSafe: isSafe,
            datetime: {
              date: date,
              time: time,
            },
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            measurements: [
              {
                name: 'Chloride',
                value: chloride,
              },
              {
                name: 'Conductivity',
                value: conductivity,
              },
              {
                name: 'Fluoride',
                value: fluoride,
              },
              {
                name: 'Nitrate',
                value: nitrate,
              },
              {
                name: 'pH',
                value: ph,
              },
              {
                name: 'Turbidity',
                value: Turbidity,
              },
            ],
          };
          state.formattedData = deviceReadings;
          state.receivedData = [];
        }
      }
    },
    takeReading: state => {
      console.log(`Permissions: ${state.permissionsGranted}`);
      state.formattedData = null;
      state.isStreamingData = true;
    },
    stopReading: state => {
      state.isStreamingData = false;
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
  stopReading,
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
  STOP_STREAMING_DATA: bluetoothReducer.actions.stopReading.type,
};

export const selectAvailableDevices = (state: RootState) =>
  state.bluetooth.availableDevices;

export const selectIsScanning = (state: RootState) =>
  state.bluetooth.isScanning;

export const selectIsConnectingToDevice = (state: RootState) =>
  state.bluetooth.isConnectingToDevice;

export const selectConnectedDevice = (state: RootState) =>
  state.bluetooth.connectedDevice;

export const selectFormattedData = (state: RootState) =>
  state.bluetooth.formattedData;

export const selectIsStreamingData = (state: RootState) =>
  state.bluetooth.isStreamingData;

export const selectPermissionsGranted = (state: RootState) =>
  state.bluetooth.permissionsGranted;

export default bluetoothReducer.reducer;
