import React from 'react'
// prettier-ignore
import {StyleSheet, SafeAreaView, Platform, View, FlatList} from 'react-native'
import {Colors} from 'react-native-paper'
import color from 'color'
import Person from './src/copy/Person'
import * as D from './src/data'

const people: D.IPerson[] = D.makeArray(10).map(D.createRandomPerson)

// prettier-ignore
export default function App() {
  return (
    <>
      <SafeAreaView style={[styles.flex]}>
        <FlatList 
          data={people} 
          renderItem={({item}) => <Person person={item}/>}
          keyExtractor={(item, index) => item.id} 
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}/>
      </SafeAreaView>
    </>
  )
}
// prettier-ignore
const styles = StyleSheet.create({
  flex: {flex: 1},
  imageBackground: {flex: 1},
  padding10: {padding: 10},
  itemSeparator: {
    borderWidth: 1,
    borderColor: color(Colors.grey500).lighten(0.3).string()
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
  },
  absoluteView: {
    backgroundColor: Colors.purple100,
    position: 'absolute',
    right: 30,
    bottom: Platform.select({ios: 100, android: 80}),
    padding: 10,
    borderRadius: 35,
  },

  regular: {
    fontFamily: 'DancingScript-Regular',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'DancingScript-Medium',
    fontWeight: '500',
  },
  semiBold: {
    fontFamily: 'DancingScript-SemiBold',
    fontWeight: '600',
  },
  bold: {
    fontFamily: 'DancingScript-Bold',
    fontWeight: Platform.select({ios: '700', android: '600'}),
  },
})
