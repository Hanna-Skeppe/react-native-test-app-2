import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

import { NumberContainer } from '../components/NumberContainer'
import { Card } from '../components/Card'

// function to generate a random number between a min and a max the computer guesses:
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min; // gives a random num between min and max
  //Refactored to ternary 
  return (randomNum === exclude) ? generateRandomBetween(min, max, exclude) : randomNum;
};

export const GameScreen = props => {
  // State for the current guess of computer:
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);
  // useRef is used to preserve a value over mutiple re-renders (the values can change but is not re-rendered when the component re-renders). These values get updated in the guessHandler-function below.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; //object destructuring to make props into variables

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice]); // I removed onGameOver as a dependency since I don't think it needs to be there. Not sure, but it seems to work as before.

  const guessHandler = direction => {
    if ((direction === 'lower' && currentGuess < props.userChoice)
      || (direction === 'higher' && currentGuess > props.userChoice)) {
      Alert.alert(
        'Oops!',
        'You gave an incorrect hint.',
        [
          {
            text: 'Ok, got it!',
            style: 'cancel'
          }
        ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttoncontainer}>
        <Button title="Lower" onPress={() => guessHandler('lower')} />
        <Button title="Higher" onPress={() => guessHandler('higher')} />
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});