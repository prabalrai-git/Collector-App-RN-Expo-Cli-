import { Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'

const CancleBtn = (props) => {
  return (
    <>
      <Button
       title={props.title} 
       onPress={props.onPress} 
       buttonStyle={styles.secondaryBtn}
       type={'clear'}
       titleStyle={{color: '#f5dd4b', fontSize: 14,}}
       >
          {/* <Text style={styles.txt}>{props.title}</Text> */}
      </Button>
    </>
  )
}

export default CancleBtn

const styles = StyleSheet.create({
  secondaryBtn: {
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,

  }
})