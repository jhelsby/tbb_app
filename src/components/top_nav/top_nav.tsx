import React from 'react';
import { View, Text } from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import Button from '../button/button';

import {styles} from './top_nav_styles';
import {styles as globalStyles} from '../../../App_styles';

import { TTopNavProps } from '../../scripts/types';

import { useAppSelector } from '../../scripts/redux_hooks';
import { selectContainerContrast } from '../../slices/colorSlice';

export default function TopNav(props: TTopNavProps) : React.ReactElement<TTopNavProps> {
  const containerContrast = useAppSelector(selectContainerContrast);

  return (
    <View style={[globalStyles.tile, styles.header, containerContrast]}>
      <View style={styles.backButtonContainer}>
        <Button onPress={props.handlePress}>
          <FontAwesomeIcon icon={faArrowLeft} size={30} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </Button>
      </View>
    </View>
  );
}
