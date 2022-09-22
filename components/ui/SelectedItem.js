import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { Icon } from 'react-native-elements'

const SelectedItem = (props) => {
  return (
    <View style={styles.selectedItemcontainer}>
      <Text style={styles.selectedTxt}>{props.title}</Text>
    </View>
  );
};

export default SelectedItem;

const styles = StyleSheet.create({
  selectedItemcontainer: {
    height: 30,
    // width: 200,
    backgroundColor: "#90bcc7",
    // borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 4,
    marginBottom: 4,
  },
  selectedTxt: {
    color: "#fefefe",
  },
});
