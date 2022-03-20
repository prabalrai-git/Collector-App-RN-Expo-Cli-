import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { CheckBox } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width * 0.65;

const SelectTestCard = ({ data, retData, arrData }) => {
  const [slected, setSelected] = useState(false);
  // console.log(data,);
  const selectedFun =(e) => {
    retData(e)
    setSelected(!slected)
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.title}>{data.Test}</Text>
          <Text style={styles.price}>Rs. {data.Price}</Text>
        </View>
        <View style={styles.right}>
          <CheckBox
            checked={slected}
            onPress={() => selectedFun(data)}
            checkedColor={'#4688B3'}
            uncheckedColor={'dimgray'}
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
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fefefe',
    alignItems:'center'
  },
  'card:last-child': {
    marginBottom: 100,
  },
  title: {
    fontSize: 14,
    width: windowWidth,
  },
  price:{
    color: '#FFC285'
  }

})