import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions // RN object to use for responsiveness to check dimensions of screen.
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NumberContainer } from '../components/NumberContainer';
import { Card } from '../components/Card';
import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';
import Colors from '../constants/colors'

// function to generate a random number between a min and a max the computer guesses:
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min)) + min; // gives a random num between min and max
  return (randomNum === exclude) ? generateRandomBetween(min, max, exclude) : randomNum;
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText style={styles.listText}>Guess #{listLength - itemData.index}</BodyText>
    <BodyText style={styles.listText}>{itemData.item}</BodyText>
  </View>
);


export const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  // State for the current guess of computer:
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  // useRef is used to preserve a value over mutiple re-renders (the values can change but is not re-rendered when the component re-renders). These values get updated in the guessHandler-function below.
  //const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width); // not in use right now
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props; //object destructuring to make props into constants

  useEffect(() => {
    const updateLayout = () => {
      //setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout)
    return () => { //cleanup function
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

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
    setPastGuesses([nextNumber.toString(), ...pastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
      <TitleText style={styles.title}>Opponent's Guess</TitleText>
      <View style={styles.controls}> 
        <MainButton onPress={() => guessHandler('lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton  onPress={() => guessHandler('higher')}>
          <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
      </View>
      <View style={styles.listView}> 
        <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)} 
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
    )
  }

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
      <View style={styles.listView}> 
        <FlatList 
          keyExtractor={(item) => item} 
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)} 
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    marginTop: 20,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 300,
    maxWidth: '80%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '55%'
  },
  listView: {
    flex: 1, // without this on the wrapping View around the ScrollView, the scroll don't work on android
    width: Dimensions.get('window').width > 360 ? '90%' : '100%',
  },
  listContent: {
    flexGrow: 1, // To be able to scroll and have list-items appear from bottom and upwards.
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    borderColor: 'lightgrey',
    borderWidth:1,
    borderRadius: 10,
    elevation: 8, //only android
    shadowColor: '#000000', //only ios
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    padding: 15,
    marginVertical: 15,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    width: 300,
    maxWidth: '80%',
  },
  listText: {
    color: Colors.secondary,
    fontSize: 18
  }
});