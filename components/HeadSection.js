import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'

const HeadSection = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headingText}>Krishi Sahyoog</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    color: 'Green',
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fffaf0'
  },
})

export default HeadSection