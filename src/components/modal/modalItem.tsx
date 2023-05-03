import {ListRenderItemInfo, Text, View} from 'react-native';
import React, {ReactElement, useCallback} from 'react';

import {styles} from './modal_styles';
import Button from '../button/button';
import {TAbstractDevice} from '../../scripts/types';

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<TAbstractDevice>;
  closeModal: () => void;
  connectToDevice: (deviceId: string) => void;
};

export default function DeviceModalListItem(
  props: DeviceModalListItemProps,
): ReactElement<DeviceModalListItemProps> {
  const {item, closeModal, connectToDevice} = props;

  const connectAndCloseModal = useCallback(() => {
    connectToDevice(item.item.id);
    closeModal();
  }, [closeModal, connectToDevice, item.item.id]);

  return (
    <View style={styles.buttonContainer}>
      <Button onPress={connectAndCloseModal}>
        <Text style={styles.buttonText}>{item.item.name}</Text>
      </Button>
    </View>
  );
}
