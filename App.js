import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, Button } from 'react-native';
import Tts from 'react-native-tts';
import hindi from './assets/hindi.txt';
import english from './assets/english.txt';
import danish from './assets/danish.txt';
import { textToSpeech } from './textToSpeech';

export default class App extends Component {

  componentDidMount = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Write  Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
    }
    catch (e) {

    }
  };

  componentWillUnmount = () => {
    Tts.stop();
  }

  onPressHindiPlay =  () => {
    textToSpeech('hi-IN', hindi);

  }

  onPressEnglishPlay =  () => {
    textToSpeech('en-US', english);
  }

  onPressDanishPlay = () => {
    textToSpeech('da-DK', danish);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Play hindi"
            onPress={this.onPressHindiPlay}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Play English"
            onPress={this.onPressEnglishPlay}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Play Danish"
            onPress={this.onPressDanishPlay}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    padding: 20
  }
});
