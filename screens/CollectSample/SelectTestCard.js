import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { CheckBox } from 'react-native-elements';

const SelectTestCard = ({ data, retData,arrData }) => {
  const [slected, setSelected] = useState(false);
  // console.log(data,);
  const selectedFun =(e) => {
    retData(e)
    setSelected(!slected)
  }
  return (
    <View style={styles.container}>
      <View style={[styles.card, arrData.includes(data.id) ? styles.selected : styles.unSelected]}>
        <View style={styles.left}>
          <Text>{data.title}</Text>
          <Text>Rs. {data.price}</Text>
        </View>
        <View style={styles.right}>
          <CheckBox
            checked={slected}
            onPress={() => selectedFun(data)}
          />
        </View>
      </View>
    </View>
  )
}

export default SelectTestCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10
  },
  'card:last-child': {
    marginBottom: 100,
  },
  selected: {
    backgroundColor: '#c2f7f7',
  },
  unSelected: {
    backgroundColor: '#fefefe',
  }

})