
import React from 'react';
import { View, Text, Pressable, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { styles } from './card_styles';
import { styles as globalStyles } from '../../../App_styles';

import { ICardProps } from '../../scripts/interfaces';

export default function Card(props : ICardProps) : React.ReactElement<ICardProps> {
  const [pressed, setPressed] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Pressable
      style={[
        globalStyles.tile,
        styles.container,
        pressed ? styles.pressed : {},
        isDarkMode ? globalStyles.darkContainer : globalStyles.lightContainer
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
        <Text style={[styles.title, isDarkMode ? globalStyles.darkText : globalStyles.lightText]}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle1}</Text>
        <Text style={styles.subtitle}>{props.subtitle2}</Text>
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