
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { styles } from './card_styles';
import { styles as globalStyles } from '../../../App_styles';

import { ICardProps } from '../../scripts/interfaces';

import { useAppSelector } from '../../scripts/redux_hooks';
import { selectContainerContrast, selectTextContrast } from '../../slices/contrast/contrastSlice';

export default function Card(props : ICardProps) : React.ReactElement<ICardProps> {
  const textContrast = useAppSelector(selectTextContrast);
  const containerContrast = useAppSelector(selectContainerContrast);
  const [pressed, setPressed] = React.useState(false);


  return (
    <Pressable
      style={[
        globalStyles.tile,
        styles.container,
        containerContrast,
        pressed ? styles.pressed : {},
  
      ]}
      onPress={props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <View style={
        props.isIcon ? styles.imgContainer :
        [styles.highlight, props.highLight ? styles.highlightGood : styles.highlightBad]}>
        {
          props.isIcon ? <FontAwesomeIcon icon={faNewspaper} size={70} color={"#999"} /> : <View></View>
        }
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, textContrast]}>{props.title}</Text>
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