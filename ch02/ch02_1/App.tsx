/* eslint-disable react/jsx-key */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

// eslint-disable-next-line require-jsdoc
export default function App() {
  const arr = [1, 2, 3].map((i) => <Text>Hello World! {i}</Text>);

  const arr2 = new Array(100)
      .fill(null)
      .map((notUsed, index) => <Text>Hello World! {index+100}</Text>);
  return (
    <SafeAreaView>
      {arr}
      {arr2}
    </SafeAreaView>
  );
}
