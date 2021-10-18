import {StyleSheet} from 'react-native'
import {Colors} from 'react-native-paper'
import color from 'color'

// prettier-ignore
export const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fffffe',
    padding: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameEmailView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 15,
  },
  email: {},
  dateView: {},
  createdDate: {},
  text: {},
  image: {
      width: '100%',
      height: 150,
  },
  countsView: {
      flexDirection: 'row',
      padding: 3,
      justifyContent: 'space-around',
  },
  counts: {},
})
