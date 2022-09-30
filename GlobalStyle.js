import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";

const windowWidth = Dimensions.width;
const GlobalStyle = () => {
  return <View>{/* <Text>GlobalStyle</Text> */}</View>;
};

export default GlobalStyle;

global.primary = "#205072";
global.secondary = "#FF7F00";
global.primaryBkg = "#fefefe";
global.secondaryBkg = "#f9f9f9";
global.secodaryCardColor = "#F57F20";
// global.secodaryCardColor ="#93D0F1"
// global.secodaryCardColor = '#205072'
global.cancle = "#1a3e5786";

export const GlobalStyles = StyleSheet.create({
  //texts
  header: {
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 7,
  },
  title1: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title2: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1.3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "normal",
    letterSpacing: 1.5,
  },
  body: {
    fontSize: 14,
    fontWeight: "normal",
    letterSpacing: 1.2,
  },
  caption: {
    fontSize: 12,
    fontWeight: "normal",
    letterSpacing: 1,
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: "bold",
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
    elevation: 2,
  },

  // for loading
  loadingcontainer: {
    flex: 1,
    backgroundColor: "#fefefe58",
    justifyContent: "center",
  },

  container: {
    width: windowWidth - 20,
    marginLeft: 10,
  },

  modalContainer: {
    backgroundColor: secondaryBkg,
    flex: 1,
    width: windowWidth,
  },

  mapViewContainer: {
    width: "100%",
    flex: 0.45,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#32727e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 2,
  },
  map: {
    width: "100%",
    flex: 1,
  },
});
