import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './account_styles';
import { styles as globalStyles } from "../../../App_styles";

import Button from '../../components/button/button';
import AccountSvg from "../../assets/svgs/account.svg";

import { ColorContext } from '../../context/color_context';
import { hslToString } from '../../scripts/colors';

import { TDefaultProps } from "../../scripts/types";

export default function AccountScreen(props : TDefaultProps) : React.ReactElement<TDefaultProps> {
  const { color } = React.useContext(ColorContext);

  const handleDeletePress = () => {
    console.log("Delete Pressed");
  };

  return (
    <View style={[globalStyles.page, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Account</Text>
      </View>
      <View style={styles.svgContainer}>
        <AccountSvg height="100%" width="100%" color={hslToString(color)} style={styles.svg} />
      </View>
      <View style={[globalStyles.tile, styles.detailsContainer]}>
        <Text style={styles.detailsText}><Text style={{ fontWeight: 'bold' }}>Username: </Text>John Doe</Text>
        <Text style={styles.detailsText}><Text style={{ fontWeight: 'bold' }}>Location: </Text>London, UK</Text>
      </View>
      <View style={[globalStyles.tile, styles.buttonPanel]}>
        <View style={styles.buttonContainer}>
          <Button onPress={handleDeletePress}>
            <Text style={styles.buttonText}>Delete Data</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => props.navigation.navigate("Report")} >
            <Text style={styles.buttonText}>Report</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};