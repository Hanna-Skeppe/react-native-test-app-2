import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import Colors from '../constants/colors'
import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';

export const GameOverScreen = props => {

  return (
    <View style={styles.screen}>
      <TitleText>The Game is over!</TitleText>
      <View style={styles.imageContainer}> 
        <Image 
          style={styles.image} 
          //source={require('../assets/success.png')} // syntax for local file
          source={{ uri: 'https://c.stocksy.com/a/Ji6600/z9/1455779.jpg' }} // network image. Don't forget to specify dimensions if using an image from the web.
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}> 
        <BodyText style={styles.resultText}> 
          It took the computer <Text style={styles.highlight}>{props.totalRounds}</Text> rounds to guess the correct number, which was <Text style={styles.highlight}>{props.userNumber}</Text>. 
        </BodyText> 
        {/* In RN, text elements nested inside parent text element, inherits the styles from the parent (unlike for other elements) */}
      </View>
      <MainButton onPress={props.onRestart}>PLAY AGAIN</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: 'grey',
    marginVertical: 25,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    width: '80%',
    marginHorizontal: 20,
    marginBottom: 20
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});