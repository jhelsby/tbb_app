import {PermissionsAndroid, Platform} from 'react-native';

type PermissionCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>;
}

export default function useBLE(): BluetoothLowEnergyApi {
  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
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
      callback(true);
    }
  };

  return {
    requestPermissions,
  };
}
