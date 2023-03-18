
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { styles } from './card_styles';
import { styles as globalStyles } from '../../../App_styles';

import { TCardProps } from '../../scripts/types';

export default function Card(props : TCardProps) : JSX.Element {

  const handlePress = () : void => {
    if (props.page) {
      props.navigation.navigate(props.page);
    }
  };

  return (
    <Pressable style={[globalStyles.tile, styles.container]} onPress={handlePress}>
      <View style={
        props.isIcon ? styles.imgContainer :
        [styles.highlight, props.highLight ? styles.highlightGood : styles.highlightBad]}>
        {
          props.isIcon ? <FontAwesomeIcon icon={faNewspaper} size={70} color={"#999"} /> : <View></View>
        }
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{props.subtitle1}</Text>
          <Text style={styles.subtitle}>{props.subtitle2}</Text>
        </View>
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <View style={styles.chevronContainer}>
        <FontAwesomeIcon
        icon={faChevronRight}
        size={50}
        color="#999" />
      </View>
    </Pressable>
  );
};