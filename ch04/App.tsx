import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native'
import Cache from './src/screens/Cache'
import Memo from './src/screens/Memo'
import Fibo from './src/screens/Fibo'

const {width} = Dimensions.get('window')
const numberOfComponents = 3

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    width: width * numberOfComponents,
  },
})

// prettier-ignore
export default function App() {
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <ScrollView 
        horizontal 
        pagingEnabled
        contentContainerStyle={[styles.contentContainerStyle]}>
        <Cache />
        <Memo />
        <Fibo />
      </ScrollView>
    </SafeAreaView>
  )
}
