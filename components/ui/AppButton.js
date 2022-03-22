import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppButton = (props) => {
  return (
    <>
      <Button title={props.title} disabled={props.disable} onPress={props.onPress} style={styles.primaryBtn}>
          {/* <Text style={styles.txt}>{props.title}</Text> */}
      </Button>
    </>

  )
}

export default AppButton

const styles = StyleSheet.create({
  primaryBtn: {
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#205072',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    maxWidth: Dimensions.get('window').width * 0.95

  },
  txt: {
    fontSize: 16,
    color: "#fff",
    letterSpacing: 1.4,
  }
})