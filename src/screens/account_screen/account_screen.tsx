import React from 'react';
import { View, Text, Button } from 'react-native';

import { styles } from './account_styles';
import { styles as globalStyles } from "../../../App_styles";

import { TDefaultProps } from "../../scripts/types";

export default function AccountScreen(props : TDefaultProps) : React.ReactElement<TDefaultProps> {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>Account Screen</Text>
      <Button title="Report" onPress={() => props.navigation.navigate("Report", { validNavigation: true })} />
    </View>
  );
};