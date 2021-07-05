import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const TitleText = props => <Text style={{...styles.titleText, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 20
  }
})