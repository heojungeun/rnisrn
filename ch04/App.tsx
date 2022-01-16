import React, {useEffect, useMemo, useState} from 'react'
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
import PersonUsingValueState from './src/screens/PersonUsingValueState'
import PersonUsingObjectState from './src/screens/PersonUsingObjectState'
import PersonUsingPassingState from './src/screens/PersonUsingPassingState'
import * as D from './src/data'
import TopBar from './src/screens/TopBar'

const {width} = Dimensions.get('window')

type PersonInformation = {
  title: string
  Component: FC<any>
}
const personInformations: PersonInformation[] = [
  {title: 'PersonUsingValueState', Component: PersonUsingValueState},
  {title: 'PersonUsingObjectState', Component: PersonUsingObjectState},
  {title: 'PersonUsingPassingState', Component: PersonUsingPassingState}
]

const numberOfComponents = personInformations.length

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    width: width * numberOfComponents,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  itemSeparator: {
    borderWidth: 1,
    borderColor: Colors.grey500,
  }
})

// prettier-ignore
export default function App() {
  // const people = useMemo(() => D.makeArray(10).map(D.createRandomPerson), [])
  const [people, setPeople] = useState<D.IPerson[]>([])
  const children = useMemo(() => 
    personInformations.map(({title, Component}: PersonInformation) => (
      <View style={{flex: 1}} key={title}>
        <Text style={[styles.text]}>{title}</Text>
        <FlatList data={people}
            renderItem={({item}) => <Component person={item} />}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />} />
      </View>
    ))
  ,[people.length])
  return (
    <SafeAreaView style={[styles.SafeAreaView]}>
      <TopBar setPeople={setPeople} />
      <ScrollView 
        horizontal 
        pagingEnabled
        contentContainerStyle={[styles.contentContainerStyle]}>
          {children}
      </ScrollView>
    </SafeAreaView>
  )
}
