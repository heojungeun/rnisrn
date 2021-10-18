import React from 'react'
// prettier-ignore
import {StyleSheet, SafeAreaView, Platform, View, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Colors} from 'react-native-paper'
import TopBar from './src/screens/TopBar'
import Content from './src/screens/Content'
import BottomBar from './src/screens/BottomBar'

export default function App() {
  const iconPressed = () => Alert.alert('icon pressed')
  return (
    <>
      <SafeAreaView style={[styles.flex]}>
        <TopBar />
        <Content />
        <BottomBar />
      </SafeAreaView>
      <View style={[styles.absoluteView]}>
        <Icon name="feather" size={50} color="white" onPress={iconPressed} />
      </View>
    </>
  )
}
// prettier-ignore
const styles = StyleSheet.create({
  flex: {flex: 1},
  imageBackground: {flex: 1},
  padding10: {padding: 10},
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
