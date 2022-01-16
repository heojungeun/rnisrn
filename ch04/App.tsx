import React, {useCallback, useEffect, useMemo, useState} from 'react'
import type {FC} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native'
import {Colors} from 'react-native-paper'
import * as D from './src/data'
import LifeCycle from './src/screens/LifeCycle'
import Timer from './src/screens/Timer'
import Interval from './src/screens/Interval'
import Fetch from './src/screens/Fetch'

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: Colors.grey500,
  },
  topBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.lightBlue500,
  },
  button: {fontSize: 20, color: 'white'},
})

// prettier-ignore
export default function App() {
  const selects = useMemo(() => ['lifeCycle', 'timer', 'interval', 'fetch'], [])
  const [select, setSelect] = useState<string>(selects[0])
  const onPress = useCallback((text) => () => setSelect(text), [])
  const buttons = useMemo(() => 
    selects.map((text) => (
      <Text key={text} onPress={onPress(text)} style={styles.button}>
        {text}
      </Text>
    )), []
  )

  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <View style={styles.topBar}>{buttons}</View>
      {select === 'lifeCycle' && <LifeCycle />}
      {select === 'timer' && <Timer />}
      {select === 'interval' && <Interval />}
      {select === 'fetch' && <Fetch />}
    </SafeAreaView>
  )
}
