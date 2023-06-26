import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon, MicrophoneIcon } from "react-native-heroicons/outline";
import React, { useLayoutEffect, useState, useEffect } from 'react'
import axios from 'axios';
import HeadSection from './HeadSection';
import Voice from '@react-native-voice/voice';

const Home = ({ navigation }) => {

  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState([])
  const [finaldata, setfinaldata] = useState([]);
  const [Value, onChangeValue] = useState("");

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

    onChangetext(text)
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [])


  function getdata(commodity = "", limit = 2000) {
    let url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000019eaed1ae95144f925f630f26665d3a02&format=json';
    if (commodity !== "") {
      url = url + '&filters[commodity]=' + commodity;
    }
    if (limit > 0) {
      url = url + '&limit=' + limit;
    }
    axios.get(url).then((res) => {
      let records = res.data.records;
      // console.log(records.length);
      let uniquedata = [];
      let result = [];
      records.forEach((c) => {
        if (!uniquedata.includes(c.commodity)) {
          uniquedata.push(c.commodity);
          result.push(c);
        }
      });
      setData(result);
      setfinaldata(result);
      //   console.log(res.data.records);
    }).catch((err) => {
      console.log(err);
    }
    )
  }

  function onChangetext(text) {
    onChangeValue(text);
    var keywords = []
    let s = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] != " ") {
        s = s + text[i]
        // console.log(s)
      }
      if (text[i] == " " || i == text.length - 1) {
        keywords.push(s);
        s = "";
      }
    }
    for (var i = 0; i < keywords.length; i++) {
      console.log(keywords[i])
      if (keywords[i]) {
        let result = data.filter((c) => {
          return c.commodity.toLowerCase().includes(keywords[i].toLowerCase());
        });
        setfinaldata(result);
      } else {
        setfinaldata(data);
      }
    }

  }

  useEffect(() => {
    getdata();
  }, [])
  const window = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeadSection />
        <View style={styles.searchconatiner}>
          <MagnifyingGlassIcon size={20} color="#000" />
          <TextInput
            style={styles.input}
            placeholder='Search Commodity'
            onChangeText={onChangetext}
            value={Value}
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
              <MicrophoneIcon size={20} color="#000" />
            </TouchableOpacity>}
        </View>
        <Text>Comodity Prices</Text>
        <Text>{finaldata.length}</Text>
        <FlatList
          data={finaldata}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Details', { commodity: item.commodity })}>
                <View style={styles.card}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.commodity}</Text>
                  <Text>updated on {item.arrival_date}</Text>
                  <Text style={{ marginTop: 5 }}>Min Rs.{item.min_price} - Max Rs.{item.max_price}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  )
}

styles = StyleSheet.create({
  container: {
    backgroundColor: '#228b22',
    height: '100%',
    width: '100%'
  },
  card: {
    backgroundColor: '#f0faed',
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    borderRadius: 5,
    flex: 1,
  },
  searchconatiner: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home