
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { styles } from './card_styles';
import { Image } from 'react-native-svg';

type TCardProps = {
  navigation : any,
  highLight : boolean,
  title : string,
  subtitle1 : string,
  subtitle2 : string,
  description : string,
  page : string
};

export default function Card(props : TCardProps) : JSX.Element {

  const handlePress = () : void => {
    if (props.page) {
      props.navigation.navigate(props.page);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={[styles.highlight, props.highLight ? styles.highlightGood : styles.highlightBad]}>
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