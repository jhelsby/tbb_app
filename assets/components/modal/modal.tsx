import React, {ReactElement, useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Device} from 'react-native-ble-plx';
import DeviceModalListItem from './modalItem';

import {styles} from './modal_styles';
import {styles as globalStyles} from '../../../App_styles';

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

export default function DeviceModal(
  props: DeviceModalProps,
): ReactElement<DeviceModalProps> {
  const {devices, visible, connectToPeripheral, closeModal} = props;

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode
    ? globalStyles.darkText
    : globalStyles.lightText;
  const containerContrast = isDarkMode
    ? globalStyles.darkContainer
    : globalStyles.lightContainer;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral],
  );

  return (
    <Modal
      style={[styles.modalContainer]}
      animationType="slide"
      transparent={true}
      visible={visible}>
      <TouchableOpacity
        style={styles.modalClose}
        activeOpacity={1}
        onPress={closeModal}
      />
      <SafeAreaView
        style={[styles.modalContent, containerContrast, globalStyles.tile]}>
        <Text style={[styles.modalTitleText, textContrast, containerContrast]}>
          Tap on a device to connect
        </Text>
        <FlatList
          contentContainerStyle={styles.modalFlatlistContiner}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />
      </SafeAreaView>
    </Modal>
  );
}
