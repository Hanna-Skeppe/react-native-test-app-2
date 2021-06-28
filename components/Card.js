import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000000', //the shadow properties: only on ios
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.3,
    backgroundColor: '#ffffff',
    elevation: 8, //elevation to set shadow: only on android
    padding: 22,
    borderRadius: 10
  },
})