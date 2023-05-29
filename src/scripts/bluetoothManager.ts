import base64 from 'react-native-base64';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  Subscription,
} from 'react-native-ble-plx';

const DEVICE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
const CHARACTERISTIC_UUID = '0000FFE1-0000-1000-8000-00805F9B34FB';

class BluetoothManager {
  bleManager: BleManager;
  device: Device | null;
  subscription: Subscription | undefined;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
    this.subscription = undefined;
  }

  scanForDevices = (
    onDeviceFound: (arg: {
      type: string;
      payload: BleError | Device | null;
    }) => void,
  ) => {
    this.bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      onDeviceFound({type: 'SAMPLE', payload: scannedDevice ?? error});
      return;
    });
    return () => {
      this.bleManager.stopDeviceScan();
    };
  };

  stopScanningForDevices = () => {
    this.bleManager.stopDeviceScan();
  };

  connectToDevice = async (deviceId: string) => {
    this.device = await this.bleManager.connectToDevice(deviceId);
  };

  disconnectFromDevice = async (deviceId: string) => {
    this.device = await this.bleManager.cancelDeviceConnection(deviceId);
  };

  monitorDisconnection = (
    deviceId: string,
    onDeviceDisconnect: (arg: {type: string; payload: boolean}) => void,
  ) => {
    const unsubscriber = this.bleManager.onDeviceDisconnected(deviceId, () => {
      onDeviceDisconnect({type: 'SAMPLE', payload: true});
      return;
    });
    return () => {
      unsubscriber.remove();
    };
  };

  onReceivedDataUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    emitter: (arg: {payload: string | BleError}) => void,
  ) => {
    if (error) {
      if (error.errorCode !== 2) {
        console.error(error);
        emitter({payload: error});
      }
    }

    const decodedData: string = base64.decode(characteristic?.value ?? '');
    //remove special characters
    const filteredData: string = decodedData.replace(/(\r\n|\n|\r)/gm, '');
    const lastIndex = filteredData.length - 1;
    if (filteredData[lastIndex] === '?') {
      this.sendData('next');
    }
    console.log(filteredData);

    emitter({payload: filteredData});
  };

  sendData = async (data: string) => {
    console.log(`sending ${data}`);
    await this.device?.writeCharacteristicWithResponseForService(
      DEVICE_UUID,
      CHARACTERISTIC_UUID,
      base64.encode(data),
    );
  };

  startReadingData = async (
    emitter: (arg: {payload: string | BleError}) => void,
  ) => {
    console.log('started reading');
    await this.device?.discoverAllServicesAndCharacteristics();
    await this.sendData('takeReading');
    this.subscription = this.device?.monitorCharacteristicForService(
      DEVICE_UUID,
      CHARACTERISTIC_UUID,
      (error, characteristic) =>
        this.onReceivedDataUpdate(error, characteristic, emitter),
    );
  };

  stopReadingData = async () => {
    await this.subscription?.remove();
  };
}

const bluetoothManager = new BluetoothManager();

export default bluetoothManager;
