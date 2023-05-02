import React, {useCallback, ReactElement, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AccountParamList} from '../../scripts/screen_params';

import {styles} from './report_styles';
import {styles as globalStyles} from '../../../App_styles';

import {TTextInputStyle} from '../../scripts/types';

import {hslToString} from '../../scripts/colors';

import {ColorContext} from '../../context/color_context';

import Button from '../../components/button/button';
import TopNav from '../../components/top_nav/top_nav';

type Props = NativeStackScreenProps<AccountParamList, 'ReportScreen'>;

export default function ReportScreen({
  navigation,
  route,
}: any): ReactElement<Props> {
  useFocusEffect(
    useCallback(() => {
      if (!route.params.validNavigation) {
        navigation.popToTop();
      }
      route.params.validNavigation = false;
    }, [navigation, route.params]),
  );

  const [titleText, setTitleText] = React.useState<string>('');
  const [descriptionText, setDescriptionText] = React.useState<string>('');

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

  const {color, colorLight} = useContext(ColorContext);

  const [isKeyboardVisible, setKeyboardVisible] =
    React.useState<boolean>(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const focusedStyle = {
    borderColor: hslToString(color),
    borderWidth: 2,
  };

  const unfocusedStyle = {
    borderColor: hslToString(colorLight),
    borderWidth: 1,
  };

  const [textInputStyles, setTextInputStyles] = React.useState<
    TTextInputStyle[]
  >([unfocusedStyle, unfocusedStyle]);

  const handleFocus = (index: number) => {
    const newFocusedStyles = textInputStyles.map((style, i) => {
      if (i === index) {
        return focusedStyle;
      } else {
        return unfocusedStyle;
      }
    });

    setTextInputStyles(newFocusedStyles);
    setKeyboardVisible(true);
  };

  const handleSubmit = () => {
    const inputData = {
      title: titleText,
      description: descriptionText,
    };
    console.log('Submitted: ', inputData);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, pageContrast]}>
      <TopNav handlePress={() => navigation.goBack()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.body}>
          <Text style={[styles.title, textContrast]}>Report</Text>
          <View
            style={[
              globalStyles.tile,
              styles.infoContainer,
              containerContrast,
              {display: isKeyboardVisible ? 'none' : 'flex'},
            ]}>
            <Text style={[styles.infoText, textContrast]}>
              Culpa aliquip aliqua deserunt duis mollit.
            </Text>
          </View>
          <View
            style={[
              globalStyles.tile,
              styles.form,
              containerContrast,
              isKeyboardVisible ? {} : {flex: 1},
            ]}>
            <View style={styles.textContainer}>
              <Text style={[styles.label, textContrast]}>Title:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[0],
                  styles.smallInput,
                  containerContrast,
                  textContrast,
                ]}
                cursorColor={hslToString(color)}
                onFocus={() => handleFocus(0)}
                onChange={event => setTitleText(event.nativeEvent.text)}
              />
            </View>
            <View
              style={[
                styles.multitextContainer,
                isKeyboardVisible ? {} : {flex: 1},
              ]}>
              <Text style={[styles.label, textContrast]}>Description:</Text>
              <TextInput
                style={[
                  styles.input,
                  textInputStyles[1],
                  isKeyboardVisible ? {height: 200} : {flex: 1},
                  containerContrast,
                  textContrast,
                ]}
                cursorColor={hslToString(color)}
                onFocus={() => handleFocus(1)}
                onChange={event => setDescriptionText(event.nativeEvent.text)}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
