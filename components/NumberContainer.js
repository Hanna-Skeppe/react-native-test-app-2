import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors'

export const NumberContainer = props => {
  return (
    <View style={styles.container}> 
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    width: 75,
    height: 70,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  number: {
    color: Colors.secondary,
    fontSize: 22,
    fontWeight: 'bold'
  }
});