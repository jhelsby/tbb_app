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
import DeviceModalListItem from './modalItem';

import {styles} from './modal_styles';
import {styles as globalStyles} from '../../../App_styles';
import {TAbstractDevice} from '../../scripts/types';

type DeviceModalProps = {
  devices: TAbstractDevice[];
  visible: boolean;
  closeModal: () => void;
  connectToDevice: (device: TAbstractDevice) => void;
};

export default function DeviceModal(
  props: DeviceModalProps,
): ReactElement<DeviceModalProps> {
  const {devices, visible, closeModal, connectToDevice} = props;

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode
    ? globalStyles.darkText
    : globalStyles.lightText;
  const containerContrast = isDarkMode
    ? globalStyles.darkContainer
    : globalStyles.lightContainer;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<TAbstractDevice>) => {
      return (
        <DeviceModalListItem
          item={item}
          closeModal={closeModal}
          connectToDevice={connectToDevice}
        />
      );
    },
    [closeModal, connectToDevice],
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
