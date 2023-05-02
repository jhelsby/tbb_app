import {ListRenderItemInfo, Text, View} from 'react-native';
import {Device} from 'react-native-ble-plx';
import React, {ReactElement, useCallback} from 'react';

import {styles} from './modal_styles';
import Button from '../button/button';

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

export default function DeviceModalListItem(
  props: DeviceModalListItemProps,
): ReactElement<DeviceModalListItemProps> {
  const {item, connectToPeripheral, closeModal} = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <View style={styles.buttonContainer}>
      <Button onPress={connectAndCloseModal}>
        <Text style={styles.buttonText}>{item.item.name}</Text>
      </Button>
    </View>
  );
}
