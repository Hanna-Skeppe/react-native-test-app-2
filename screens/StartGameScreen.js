import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { NumberContainer } from '../components/NumberContainer';
import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';
import Colors from '../constants/colors'

export const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState(''); // even if the input is a number it is read as a string.
const [confirmedInput, setConfirmedInput] = useState(false);
const [selectedNumber, setSelectedNumber] = useState();
let confirmedOutput;

  const inputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); // validate input only number values
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmedInput(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
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
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a new game</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            //blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='phone-pad'
            //keyboardType='numeric' || 'number-pad'// does not work with expo on my phone (shows letters also)
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.secondary}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
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
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: '42%',
  },
  input: {
    width: '40%',
    textAlign: 'center'
  },
  numberOutputContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});