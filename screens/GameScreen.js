import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';

// function to generate a random number between a min and a max the computer guesses:
// I need to adjust this function so that the computer does not generate the same ramdom number-guess more than once. So maybe store previous guesses in an array and check that current guess isn't included in that array?

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min; // gives a random num between min and max
  //Refactored to ternary 
  return (randomNum === exclude) ? generateRandomBetween(min, max, exclude) : randomNum;
};

export const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  // State for the current guess of computer:
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  // useRef is used to preserve a value over mutiple re-renders (the values can change but is not re-rendered when the component re-renders). These values get updated in the guessHandler-function below.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; //object destructuring to make props into constants

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice]); // don't think I have to include onGameOver in dependencies, since I only need useEffect to run when either currentGuess || userChoice changes.

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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //setRounds(rounds + 1);
    setPastGuesses([nextNumber, ...pastGuesses]); //if not working try line below instead:
    //setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses])
  };

  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => guessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton  onPress={() => guessHandler('higher')}>
          <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
      </Card>
      <ScrollView> 
        {pastGuesses.map((guess) => <View key={guess}><Text>{guess}</Text></View>)}
        {/* Removed index as a key in the map*/}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});