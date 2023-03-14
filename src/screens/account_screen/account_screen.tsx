import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './account_styles';

export default function AccountScreen() : JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
};