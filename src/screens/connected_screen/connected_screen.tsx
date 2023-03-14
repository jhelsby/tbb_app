import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles';
import { StatusBar } from 'expo-status-bar';
import ImageViewer from '../../components/ImageViewer';
import Button from '../../components/Button';

const Logo = require('../../assets/images/logo.png');

export default function ConnectedScreen() {
  return (
      <View style={styles.container}>
          <Button theme="disconnect" label="Disconnect" page="Home" />
          <View style={styles.logoContainer}>
              <ImageViewer ImageSource={Logo} ImageType={"logo"} />
          </View>
          <View>
              <Text style={styles.captionText}>Device connected.</Text>
          </View>
          <View style={styles.footerContainer}>
              <Button theme="green"   label="Take a reading"          page="ReadingInProgress" />
              <Button theme="purple"  label="View previous readings"  page="Readings" />
              <Button theme="grey"    label="Help"                    page="Help"             />
          </View>
          <StatusBar style="auto" />
      </View>
  );
}