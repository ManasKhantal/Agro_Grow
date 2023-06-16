import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function App() {
  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-IN')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    setLoading(false)
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Agro Grow</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="Search Here..."
            style={{ flex: 1 }}
            onChangeText={text => setResult(text)}
          />
          {isLoading ? <TouchableOpacity
            style={{
              alignSelf: 'center',
              backgroundColor: 'red',
              padding: 8,
              borderRadius: 4,
              height: 35
            }}
            onPress={stopRecording}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
          </TouchableOpacity>

            :

            <TouchableOpacity
              onPress={startRecording}
            >
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUxxG7irI5LfuDGTQVUK2nktlhpsiXI8AnisuKISD&s' }}
                style={{ width: 24, height: 35 }}
              />
            </TouchableOpacity>}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#228b22'
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fffaf0'
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4
  }
});