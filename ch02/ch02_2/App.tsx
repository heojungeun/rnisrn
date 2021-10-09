import React from 'react'
import {Platform, Dimensions, StyleSheet, SafeAreaView, Text, View} from 'react-native'
import {Colors} from 'react-native-paper'
import Color from 'color'

const {width, height} = Dimensions.get('window')
// prettier-ignore
export default function App() {
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <Text style={[styles.text]}>os: {Platform.OS}</Text>
      <Text style={[styles.text]}>width: {width}</Text>
      <Text style={[styles.text]}>height: {height}</Text>

      <View style={[styles.box, styles.border]} />
      <View style={[styles.box, styles.border, {borderRadius: 20}]} />
      <View style={[styles.box, styles.border, {borderTopLeftRadius: 40, borderBottomLeftRadius: 40}]}
      />
    </SafeAreaView>
  )
}
// prettier-ignore
const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue300,
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: Color(Colors.blue500).lighten(0.9).string(),
    marginBottom: 10,
  },
  box: {
    height: 100, backgroundColor: Colors.lime500, marginBottom: 10,
    marginLeft: Platform.select({ios: 20, android: 0}),
  },
  border: {
    borderWidth: 10,
    borderColor: Color('black').alpha(0.3).string(),
  },
})
