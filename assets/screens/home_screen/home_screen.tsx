import React, {ReactElement, useContext} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../scripts/screen_params';

import {styles} from './home_styles';
import {styles as globalStyles} from '../../../App_styles';

import {ColorContext} from '../../context/color_context';
import {hslToString} from '../../scripts/colors';

import HomeSvg from '../../svgs/home.svg';
import Button from '../../components/button/button';
import Modal from '../../components/modal/modal';
import useBLE from '../../scripts/useBLE';

type Props = NativeStackScreenProps<HomeParamList, 'HomeScreen'>;

export default function HomeScreen({navigation}: Props): ReactElement<Props> {
  const {color, colorLight} = useContext(ColorContext);

  const {requestPermissions} = useBLE();

  const [isConnected, _] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const textContrast = isDarkMode
    ? globalStyles.darkText
    : globalStyles.lightText;
  const containerContrast = isDarkMode
    ? globalStyles.darkContainer
    : globalStyles.lightContainer;
  const pageContrast = isDarkMode
    ? globalStyles.darkPage
    : globalStyles.lightPage;

  const openModal = () => {
    requestPermissions((result: boolean) => {
      console.log('The android permission result is: ' + result);
    });
    //setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={globalStyles.screen}>
      <View style={[globalStyles.page, styles.pageContainer, pageContrast]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: hslToString(color)}]}>
            Biodevices
          </Text>
          <Text style={[styles.headerPlain, textContrast]}>Without</Text>
          <Text style={[styles.headerText, {color: hslToString(color)}]}>
            Borders
          </Text>
        </View>
        <View style={styles.svgContainer}>
          <HomeSvg
            height="100%"
            width="100%"
            color={hslToString(colorLight)}
            style={styles.svg}
          />
        </View>
        {isConnected ? (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate('LoadingScreen', {validNavigation: true})
                }>
                <Text style={styles.buttonText}>Take Readings</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => {}}>
                <Text style={styles.buttonText}>Disconnect</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate('HelpScreen', {validNavigation: true})
                }>
                <Text style={styles.buttonText}>Help</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={[globalStyles.tile, styles.buttonPanel, containerContrast]}>
            <View style={styles.buttonContainer}>
              <Button onPress={openModal}>
                <Text style={styles.buttonText}>Connect</Text>
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() =>
                  navigation.navigate('HelpScreen', {validNavigation: true})
                }>
                <Text style={styles.buttonText}>Help</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
      {isModalVisible && (
        <Modal title="Pick Bluetooth Device" handleClose={closeModal}>
          <View style={styles.modalButtonContainer}>
            <Button onPress={() => {}}>
              <Text style={styles.buttonText}>Device 1</Text>
            </Button>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button onPress={() => {}}>
              <Text style={styles.buttonText}>Device 2</Text>
            </Button>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button onPress={() => {}}>
              <Text style={styles.buttonText}>Device 3</Text>
            </Button>
          </View>
        </Modal>
      )}
    </View>
  );
}
