import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackBtn from "./ui/BackBtn";
import HamMenu from "./ui/HamMenu";
import Filter from "./ui/Filter";

const windowWidth = Dimensions.get("window").width;

const Header = (props) => {
  return (
    <View style={styles.headercontainer}>
      <View style={styles.top}>
        <BackBtn></BackBtn>
        <Text style={styles.title}>{props.title}</Text>
        <HamMenu></HamMenu>
      </View>
      {/* <Filter></Filter> */}
      {props.bookTestFilter && (
        <Filter
          data={props.data}
          returnData={props.returnData}
          bookTestFilter
        ></Filter>
      )}

      {props.selectTestFilter && (
        <Filter
          data={props.data}
          returnData={props.returnData}
          selectTestFilter
        ></Filter>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headercontainer: {
    backgroundColor: "#F57F20",
    width: windowWidth,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: "hidden",
  },
  top: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth,
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#fefefe",
    letterSpacing: 1,
  },
});
