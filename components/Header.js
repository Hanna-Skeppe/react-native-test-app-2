import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TitleText } from '../components/TitleText';
import Colors from '../constants/colors';

export const Header = props => {
  return (
    <View style={styles.header}>
        <TitleText style={styles.headerText}>{props.title}</TitleText>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 26
  }
});
