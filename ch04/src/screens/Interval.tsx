import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import {Colors} from 'react-native-paper'
import { Avatar } from '../components'
import * as D from '../data'

const title = 'Interval'
type IdAndAvatar = Pick<D.IPerson, 'id' | 'avatar'>
const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.blue900,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  avatarViewStyle: {
    padding: 5,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.blue500,
  },
  topBarText: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
})

export default function Interval() {
  const [avatars, setAvatars] = useState<IdAndAvatar[]>([])
  const [start, serStart] = useState(true)
  const toggleStart = useCallback(() => serStart((start) => !start), [])
  const clearAvatars = useCallback(() => setAvatars((notUsed) => []), [])
  useEffect(() => {
    const id = setInterval(() => {
      if (start) {
        setAvatars((avatars) => [
          ...avatars,
          {id: D.randomId(), avatar: D.randomAvatarUrl()}
        ])
      }
    }, 1000)
    return () => clearInterval(id)
  }, [start])
  const children = avatars.map(({id, avatar}) => (
    <Avatar
      key={id}
      uri={avatar}
      size={70}
      viewStyle={styles.avatarViewStyle}
    />
  ))
  return (
    <View style={styles.view}>
      <View style={styles.topBar}>
        <Text onPress={toggleStart} style={styles.topBarText}>
          {start ? 'stop' : 'start'}
        </Text>
        <Text onPress={clearAvatars} style={styles.topBarText}>
          clear avatars
        </Text>
      </View>
      <Text style={styles.title}>Interval</Text>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {children}
      </ScrollView>
    </View>
  )
}
