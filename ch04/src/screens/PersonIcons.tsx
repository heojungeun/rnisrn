import React, {Dispatch, SetStateAction, useCallback, useState} from 'react'
import type {FC} from 'react'
import {Text, View, Image, Alert} from 'react-native'
import moment from 'moment-with-locales-es6'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from './Person.style'
import * as D from '../data'
import {IconText} from '../components'

export type PersonIconsProps = {
  person: D.IPerson
  setPerson: Dispatch<SetStateAction<D.IPerson>>
}

// prettier-ignore
const PersonIcons: FC<PersonIconsProps> = ({person, setPerson}) => {
  const commentPressed = useCallback(() => setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        comment: person.counts.comment + 1
      }
    })), []
  )
  const retweetPressed = useCallback(() => setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        retweet: person.counts.retweet + 1
      }
    })), []
  )
  const heartPressed = useCallback(() => setPerson(person => ({
      ...person,
      counts: {
        ...person.counts,
        heart: person.counts.heart + 1
      }
    })), []
  )

  return (
    <View style={[styles.countsView]}>
      <IconText viewStyle={[styles.touchableIcon]}
            onPress={commentPressed}
            name="comment" size={24} color={Colors.blue500}
            textStyle={[styles.iconText]} text={person.counts.comment} />
      <IconText viewStyle={[styles.touchableIcon]}
            onPress={retweetPressed}
            name="twitter-retweet" size={24} color={Colors.purple500}
            textStyle={[styles.iconText]} text={person.counts.retweet} />
      <IconText viewStyle={[styles.touchableIcon]}
            onPress={heartPressed}
            name="heart" size={24} color={Colors.red500}
            textStyle={[styles.iconText]} text={person.counts.heart} />
    </View>
  )
}
export default PersonIcons