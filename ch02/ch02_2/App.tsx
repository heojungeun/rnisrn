import React from 'react'
import {StyleSheet, SafeAreaView, Text} from 'react-native'
import {Colors} from 'react-native-paper'
import Color from 'color'

console.log(Colors.blue500)
console.log(Color(Colors.blue500).alpha(0.5).lighten(0.5).string())

export default function App() {
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <Text style={[styles.text]}>This Text has onPress function</Text>
    </SafeAreaView>
  )
}
// prettier-ignore
const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue500,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: Color(Colors.blue500).alpha(0.7).lighten(0.9).string(),
  },
})
