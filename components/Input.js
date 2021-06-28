import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const Input = props => {
  return (
    <TextInput {...props} style={{ ...styles.input, ...props.style }}></TextInput>
    //About spreading in the props: see section 4, video 61
    //"You could say you are 'forwarding' your props to the component you're using in your custom component"
  )
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 20
  }
})