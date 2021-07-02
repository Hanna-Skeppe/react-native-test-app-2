import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

export const GameOverScreen = props => {

  return (
    <View style={styles.screen}>
      <Text>The Game is over!</Text>
      <Text>Number of rounds: {props.totalRounds}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title='New Game' onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});