import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { styles } from './top_nav_styles';
import { styles as globalStyles } from '../../../App_styles';

type TTopNavProps = {
  handlePress: () => void;
};

export default function TopNav(props: TTopNavProps) : React.ReactElement<TTopNavProps> {
  return (
    <View style={[globalStyles.tile, styles.header]}>
    <Pressable style={styles.backButton} onPress={props.handlePress}>
      <FontAwesomeIcon icon={faArrowLeft} size={30} color="#fff" />
      <Text style={styles.backButtonText}>Back</Text>
    </Pressable>
  </View>
  );
}