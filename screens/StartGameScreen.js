import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions, //object that tells available width/height of device (useful for responsive styling)
  ScrollView,
  KeyboardAvoidingView, // need this to make sure the keyboard doesn't overlay the input I want to type (see comment below on Input regarding Android)
} from 'react-native';

import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { NumberContainer } from '../components/NumberContainer';
import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';
import Colors from '../constants/colors';

export const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState(''); // even if the input is a number it is read as a string.
  const [confirmedInput, setConfirmedInput] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  let confirmedOutput;

  useEffect(() => {
    const updateButtonsLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateButtonsLayout);
    return () => { // cleanup-function
      Dimensions.removeEventListener('change', updateButtonsLayout);
    }
  });
  

  const inputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); // validate input only number values
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmedInput(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid input",
        "Please enter a number between 1-99.",
        [
          {
            text: 'Ok, got it!',
            style: 'cancel',
            onPress: resetInputHandler
          }
        ]
      );
      return;
    };
    setConfirmedInput(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  if (confirmedInput) {
    confirmedOutput = (
      <Card style={styles.numberOutputContainer}>
        <BodyText> Your selected number:</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.screenWrap}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}> 
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='phone-pad' //keyboardType='numeric' || 'number-pad'// does not work with expo on my phone (shows letters also). Therefore I use 'phone-pad' here.
                disableFullscreenUI={true} // to prevent the keyboard to go fullscreen on Android in landscape-mode. (the KeyboardAvoidingView-settings apply instead)
                maxLength={2}
                onChangeText={inputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Reset"
                    color={Colors.secondary}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screenWrap: {
    backgroundColor: Colors.background,
  },
  screen: {
    flex: 1, // why doesn't this view take up the whole screen?
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // button: {
  //   width: Dimensions.get('window').width / 4 // a 4th of the device width. NOTE! This is calculated on app start and therefore doesn't adjust when changeing screen-orientation! This needs to be managed by useState.
  // },
  input: {
    width: '40%',
    textAlign: 'center'
  },
  numberOutputContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});