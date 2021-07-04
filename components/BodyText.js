import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const BodyText = props => <Text style={styles.bodyText}>{props.children}</Text>;

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans'
  }
})