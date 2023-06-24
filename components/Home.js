import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import React, { useLayoutEffect, useState, useEffect } from 'react'
import axios from 'axios';
import HeadSection from './HeadSection';

const Home = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [])

  const [data, setData] = useState([])
  const [finaldata, setfinaldata] = useState([]);
  const [Value, onChangeValue] = useState("");

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
    if (text) {
      let result = data.filter((c) => {
        return c.commodity.toLowerCase().includes(text.toLowerCase());
      });
      setfinaldata(result);
    } else {
      setfinaldata(data);
    }

  }

  useEffect(() => {
    getdata();
  }, [])

  return (
    <SafeAreaView>
      <HeadSection />
      <View style={styles.searchconatiner}>
        <MagnifyingGlassIcon size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder='Search Commodity'
          onChangeText={onChangetext}
          value={Value}
        />
      </View>
      <Text>Comodity Prices</Text>
      <Text>{finaldata.length}</Text>
      <FlatList
        data={finaldata}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Details', {commodity: item.commodity})}>
            <View style={styles.card}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.commodity}</Text>
              <Text>updated on {item.arrival_date}</Text>
              <Text style={{ marginTop: 5 }}>Min Rs.{item.min_price} - Max Rs.{item.max_price}</Text>

            </View>
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

styles = StyleSheet.create({
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