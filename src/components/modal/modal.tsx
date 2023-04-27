import React, {PropsWithChildren} from 'react';
import {
  View,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import {styles} from './modal_styles';
import {styles as globalStyles} from '../../../App_styles';

interface IModalProps {
  title: string;
  handleClose: () => void;
}

export default function Modal(
  props: PropsWithChildren<IModalProps>,
): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      style={styles.modalBackground}
      onPress={props.handleClose}>
      <View
        style={[
          styles.modalContainer,
          globalStyles.tile,
          isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer,
        ]}>
        <View style={styles.modalHeader}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{props.title}</Text>
          </View>
          <Pressable
            style={styles.modalCrossContainer}
            onPress={props.handleClose}>
            <FontAwesomeIcon icon={faClose} size={50} color="#999" />
          </Pressable>
        </View>
        <View style={styles.modalContentContainer}>{props.children}</View>
      </View>
    </TouchableOpacity>
  );
}
