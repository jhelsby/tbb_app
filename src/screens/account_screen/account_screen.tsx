import React, { ReactElement } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountParamList } from '../../scripts/screen_params';

import { styles } from './account_styles';
import { styles as globalStyles } from "../../../App_styles";

type Props = NativeStackScreenProps<AccountParamList, 'AccountScreen'>;

export default function AccountScreen({ navigation }: Props) : ReactElement<Props> {
  return (
    <View style={[globalStyles.page, styles.container]}>
      <Text>Account Screen</Text>
      <Button title="Report" onPress={() => navigation.navigate("ReportScreen", { validNavigation: true })} />
    </View>
  );
};