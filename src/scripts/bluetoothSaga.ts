import {Device} from 'react-native-ble-plx';
import {AnyAction} from 'redux';
import {END, eventChannel, TakeableChannel} from 'redux-saga';
import {call, put, take, takeEvery} from 'redux-saga/effects';
import {sagaActionConstants} from '../slices/bluetoothSlice';
import bluetoothManager from './bluetoothManager';

type TakeableDevice = {
  payload: {id: string; name: string; serviceUUIDs: string};
  take: (callback: (message: any | END) => void) => Device;
};

type TakeableReceivedData = {
  payload: {};
  take: (callback: (message: any | END) => void) => string;
};

function* watchForPeripherals(): Generator<AnyAction, void, TakeableDevice> {
  const onDiscoveredPeripheral = () =>
    eventChannel(emitter => {
      return bluetoothManager.scanForDevices(emitter);
    });

  const channel: TakeableChannel<Device> = yield call(onDiscoveredPeripheral);

  try {
    while (true) {
      const response = yield take(channel);

      yield put({
        type: sagaActionConstants.ON_DEVICE_DISCOVERED,
        payload: {
          id: response.payload.id,
          name: response.payload.name,
          serviceUUIDs: response.payload.serviceUUIDs,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
}

function* connectToDevice(action: {
  type: typeof sagaActionConstants.INITIATE_CONNECTION;
  payload: string;
}): Generator<AnyAction, void, TakeableDevice> {
  const deviceId = action.payload;
  yield call(bluetoothManager.connectToDevice, deviceId);
  yield put({
    type: sagaActionConstants.CONNECTION_SUCCESS,
    payload: deviceId,
  });

  yield call(bluetoothManager.stopScanningForDevices);

  const onDeviceDisconnect = () =>
    eventChannel(emitter => {
      return bluetoothManager.monitorDisconnection(deviceId, emitter);
    });

  const channel: TakeableChannel<boolean> = yield call(onDeviceDisconnect);

  try {
    while (true) {
      const response = yield take(channel);
      if (response.payload) {
        yield put({
          type: sagaActionConstants.DISCONNECT_SUCCESS,
          payload: deviceId,
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function* disconnectFromDevice(action: {
  type: typeof sagaActionConstants.INITIATE_DISCONNECT;
  payload: string;
}) {
  const deviceId = action.payload;
  yield call(bluetoothManager.disconnectFromDevice, deviceId);
  yield put({
    type: sagaActionConstants.DISCONNECT_SUCCESS,
    payload: deviceId,
  });
  yield call(bluetoothManager.stopScanningForDevices);
}

function* getReceivedDataUpdates(): Generator<
  AnyAction,
  void,
  TakeableReceivedData
> {
  const onReceivedDataUpdate = () =>
    eventChannel(emitter => {
      bluetoothManager.startReadingData(emitter);

      return () => {
        bluetoothManager.stopScanningForDevices();
      };
    });

  const channel: TakeableChannel<string> = yield call(onReceivedDataUpdate);

  try {
    while (true) {
      const response = yield take(channel);
      yield put({
        type: sagaActionConstants.UPDATE_RECEIVED_DATA,
        payload: response.payload,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

function* stopReceivingUpdates() {
  yield call(bluetoothManager.stopReadingData);
}

export function* bluetoothSaga() {
  yield takeEvery(sagaActionConstants.SCAN_FOR_DEVICES, watchForPeripherals);
  yield takeEvery(sagaActionConstants.INITIATE_CONNECTION, connectToDevice);
  yield takeEvery(
    sagaActionConstants.INITIATE_DISCONNECT,
    disconnectFromDevice,
  );
  yield takeEvery(
    sagaActionConstants.START_STREAMING_DATA,
    getReceivedDataUpdates,
  );
  yield takeEvery(
    sagaActionConstants.STOP_STREAMING_DATA,
    stopReceivingUpdates,
  );
}
