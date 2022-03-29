import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CheckBox } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width * 0.65;
// "Id": 22,
// "Price": 2700,
// "Seq": 79,
// "Test": "Buddha Airline Basic Health Check-Up (B)",
// "TestType": "Executive",

const SelectTestCard = ({ data, retData, arrData, index }) => {
  const [slected, setSelected] = useState(false);
  // console.log("arr data",arrData);
  // console.log("ret data",data);
  // console.log(index);

  // let keString = `${data.Id}${data.Test}`;
  // console.log(keString);

  useEffect(() => {
  }, [])
  
  const selectedFun = (e) => {
    retData(e)
    // setSelected(!slected)e
  }

  return (
    <TouchableOpacity onPress={() => selectedFun(data)}>
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.title}>{data.Test}</Text>
          <Text style={styles.price}>Rs. {data.Price}</Text>
        </View>
        <View style={styles.right}>

          {/* <CheckBox
            checked={slected}
            checkedColor={'#4688B3'}
            uncheckedColor={'dimgray'}
          /> */}
        </View>
      </View>
    </View>
    </TouchableOpacity>
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
    alignItems: 'center'
  },
  'card:last-child': {
    marginBottom: 100,
  },
  title: {
    fontSize: 14,
    width: windowWidth,
  },
  price: {
    color: '#FFC285'
  }
})