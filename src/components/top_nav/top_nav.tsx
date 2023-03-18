import React from 'react';
import { View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Button from '../button/button'

import { styles } from './top_nav_styles';
import { styles as globalStyles } from '../../../App_styles';

import { color3, color3Light } from '../../scripts/colors'

import { TTopNavProps } from '../../scripts/types';

export default function TopNav(props: TTopNavProps) : React.ReactElement<TTopNavProps> {
  return (
    <View style={[globalStyles.tile, styles.header]}>
      <View style={styles.backButtonContainer}>
        <Button onPress={props.handlePress} activeColor={color3} inactiveColor={color3Light}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </Button>
      </View>
    </View>
  );
}