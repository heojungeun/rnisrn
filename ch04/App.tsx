import React, {useEffect, useState} from 'react'
import {StyleSheet, SafeAreaView, Text} from 'react-native'
import {useClock} from './src/hooks'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitFont: {
    fontFamily: 'MajorMonoDisplay-Regular',
    fontWeight: '400',
  },
  time: {
    fontSize: 40,
  },
})

export default function App() {
  const time = useClock()
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <Text style={[styles.digitFont, styles.time]}>
        {time.toLocaleTimeString()}
      </Text>
      <Text style={[styles.digitFont]}>{time.toLocaleDateString()}</Text>
    </SafeAreaView>
  )
}
