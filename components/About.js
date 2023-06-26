import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import HeadSection from './HeadSection';

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeadSection />
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>About</Text>
      <Image style={styles.farmerImage} source={require('../assets/farmer.jpeg')} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, marginTop: 15 }}> Welcome to Krishi Sahyoog!</Text>
      <Text style={styles.description}>We are here to empower farmers with the knowledge they need to thrive.
        Our Android app provides real-time access to crop prices,
        allowing farmers to make informed decisions and maximize their profits.
        Whether you're growing wheat, corn, soybeans, or any other crop,
        Krishi Sahyoog connects you with the latest market trends and price fluctuations.
        Say goodbye to uncertainty and hello to a brighter future for your farm.
        Join our community today and reap the rewards of knowledge. Happy farming!
      </Text>
    </SafeAreaView>
  )
}
styles = StyleSheet.create({
  container: {
    backgroundColor: '#228b22',
    height: '100%',
    width: '100%'
  },
  farmerImage: {
    width: '70%',
    height: '30%',
    marginTop: '5%',
    borderRadius: 7,
    alignSelf: 'center'
  },
  description: {
    marginTop: 20,
    fontSize: 17,
    marginHorizontal: 15,
    textAlign: 'justify',
    fontStyle: 'italic',
  },
});
export default About