/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, Button, Platform } from 'react-native';
import Tts from 'react-native-tts';
import RNFS from 'react-native-fs';

console.log(RNFS.LibraryDirectoryPath);

const path = Platform.OS === 'android' ? RNFS.ExternalStorageDirectoryPath : RNFS.LibraryDirectoryPath;

const hindi = 'कालिंजर दुर्ग, भारतीय राज्य उत्तर प्रदेश के बांदा जिला स्थित एक दुर्ग है। बुन्देलखण्ड क्षेत्र में विंध्य पर्वत पर स्थित यह दुर्ग विश्व धरोहर स्थल खजुराहो से ९७.७ किमी दूर है। इसे भारत के सबसे विशाल और अपराजेय दुर्गों में गिना जाता रहा है। इस दुर्ग में कई प्राचीन मन्दिर हैं। इनमें कई मंदिर तीसरी से पाँचवीं सदी गुप्तकाल के हैं। यहाँ के शिव मन्दिर के बारे में मान्यता है कि सागर-मन्थन से निकले कालकूट विष को पीने के बाद भगवान शिव ने यही तपस्या कर उसकी ज्वाला शांत की थी।';
const english = 'English is a West Germanic language that was first spoken in early medieval England and eventually became a global lingua franca.[5][6] It is named after the Angles, one of the Germanic tribes that migrated to the area of Great Britain that later took their name, as England. Both names derive from Anglia, a peninsula in the Baltic Sea. The language is closely related to Frisian and Low Saxon, and its vocabulary has been significantly influenced by other Germanic languages, particularly Norse (a North Germanic language), and to a greater extent by Latin and French.'
export default class App extends Component {

  constructor(props) {
    super(props);
  }

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

  onPressHindiPlay = async () => {
    Tts.stop();
    const read = await RNFS.readFile(`${path}/hindi.txt`);
    Tts.setDefaultLanguage('hi-IN');
    Tts.speak(read);

  }

  onPressEnglishPlay = async () => {
    Tts.stop();
    Tts.setDefaultLanguage('en-US');
    const readEnglish = await RNFS.readFile(`${path}/english.txt`);
    Tts.speak(readEnglish);
  }

  writeFile = async () => {
    await RNFS.writeFile(`${path}/hindi.txt`, hindi);
    await RNFS.writeFile(`${path}/english.txt`, english);
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
            title="write "
            onPress={this.writeFile}
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
