import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export const StartGameScreen = props => {
  return (
    <View style={styles.screen}> 
      <Text style={styles.title}>Start a new game</Text>
      <View style={styles.inputContainer}> 
        <Text>Select a number</Text>
        <TextInput />
        <View style={styles.buttonContainer}> 
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
      </View>
    </View>
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

  },
  inputContainer: {

  },
  buttonContainer: {

  }
});