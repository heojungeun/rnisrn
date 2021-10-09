import React from 'react'
import {SafeAreaView, Alert, Button} from 'react-native'
import {TouchableOpacity, TouchableHighlight, Text} from 'react-native'
import { TextInput } from 'react-native'
const onPress = () => Alert.alert('home pressed.', 'message')

export default function App() {
  return (
    <SafeAreaView>
      <Button title='Home' onPress={onPress} />
      <Text onPress={onPress}>This Text has onPress function</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={onPress}>
        <Text>TouchableHighlight</Text>
      </TouchableHighlight>
      <TextInput
        placeholder="enter your name"
        onChangeText={(text: string) => console.log(text)}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onEndEditing={() => console.log('onEndEditing')}
      />
    </SafeAreaView>
  )
}
