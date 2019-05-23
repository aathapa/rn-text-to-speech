import Tts from 'react-native-tts';
import loadLocalResource from 'react-native-local-resource';

export async function textToSpeech(lang, txt) {
  Tts.stop();
  Tts.setDefaultLanguage(lang);
  const read = await loadLocalResource(txt);
  Tts.speak(read);
}