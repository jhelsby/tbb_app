import React, { ReactElement } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AccountParamList } from '../../scripts/screen_params';

import { styles } from './account_styles';
import { styles as globalStyles } from "../../../App_styles";

import Button from '../../components/button/button';
import AccountSvg from "../../assets/svgs/account.svg";

import { ColorContext } from '../../context/color_context';

import { useAppSelector, useAppDispatch } from '../../scripts/redux_hooks';
import { selectContainerContrast, selectPageContrast, selectTextContrast } from '../../slices/color/colorSlice';
import { logout, selectUser } from '../../slices/account/accountSlice';

type Props = NativeStackScreenProps<AccountParamList, 'AccountScreen'>;

export default function AccountScreen({ navigation }: Props) : ReactElement<Props> {
  const { color } = React.useContext(ColorContext);

  const containerContrast = useAppSelector(selectContainerContrast);
  const pageContrast = useAppSelector(selectPageContrast);
  const textContrast = useAppSelector(selectTextContrast);

  const loggedIn = !!useAppSelector(selectUser)

  const dispatch = useAppDispatch();

  const handleDeletePress = () => {
    console.log("Delete Pressed");
  };

  const handleLogout = async () => {
    dispatch(logout())
  };

  return (
    <View style={[globalStyles.page, styles.container, pageContrast]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, textContrast]}>Account</Text>
        </View>
        <View style={styles.svgContainer}>
          <AccountSvg height="100%" width="100%" color={color} style={styles.svg} />
        </View>
        {
          loggedIn ? (
            <View>
              <View style={[globalStyles.tile, styles.detailsContainer, containerContrast]}>
                <Text style={[styles.detailsText, textContrast]}><Text style={{ fontWeight: 'bold' }}>Username: </Text>John Doe</Text>
                <Text style={[styles.detailsText, textContrast]}><Text style={{ fontWeight: 'bold' }}>Location: </Text>London, UK</Text>
              </View>
              <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
                <View style={styles.buttonContainer}>
                  <Button onPress={handleLogout}>
                    <Text style={[styles.buttonText]}>Log Out</Text>
                  </Button>
                </View>
              </View>
            </View>
          ) : (
            <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("LoginScreen", { validNavigation: true })}>
                  <Text style={[styles.buttonText]}>Login</Text>
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("SignupScreen", { validNavigation: true })}>
                  <Text style={[styles.buttonText]}>SignUp</Text>
                </Button>
              </View>
            </View>
          )
        }
        <View style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
          {
          loggedIn && (<View style={styles.buttonContainer}>
            <Button onPress={handleDeletePress}>
              <Text style={[styles.buttonText]}>Delete Data</Text>
            </Button>
          </View>)
          }
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate("ReportScreen", { validNavigation: true })} >
              <Text style={[styles.buttonText]}>Report</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};