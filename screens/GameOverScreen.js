import React from 'react';
import {
  View,
  ScrollView, // It does not work for me to wrap it in a scrollview. The screen gets a white cut-off at the bottom and no scroll. Why?
  Image,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import Colors from '../constants/colors'
import { BodyText } from '../components/BodyText';
import { TitleText } from '../components/TitleText';
import { MainButton } from '../components/MainButton';

export const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            //source={require('../assets/success.png')} // syntax for local file
            source={{ uri: 'https://c.stocksy.com/a/Ji6600/z9/1455779.jpg' }} // Don't forget to specify dimensions if using a network image.
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'grey',
    marginTop: Dimensions.get('window').height / 20,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  resultContainer: {
    marginVertical: Dimensions.get('window').height / 30,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Colors.background,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});