import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GlobalStyle = () => {
  return (
    <View>
      {/* <Text>GlobalStyle</Text> */}
    </View>
  )
}

export default GlobalStyle

global.primary = '#205072',
  global.secondary = '#FF7F00',
  global.primaryBkg = '#fefefe',
  global.secondaryBkg = '#f9f9f9',
  global.secodaryCardColor = '#9DD4E9'


export const GlobalStyles = StyleSheet.create({

  //texts
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 7,
  },
  title1: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title2: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'normal',
    letterSpacing: 1.5,
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: 1.2,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 1,
  },

  // containers
  boxShadow: {
    shadowColor: "#57b2e6be",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  // for loading
  loadingcontainer: {
    flex: 1,
    backgroundColor: '#fefefe58',
    justifyContent: 'center',
  }
})