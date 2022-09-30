import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const LodaingComp = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={global.secondary} />
      {/* <View style={styles.card}>
      </View> */}
    </View>
  );
};

export default LodaingComp;

const styles = StyleSheet.create({
  loadingContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    width: windowWidth,
    height: 400,
  },
  // card: {
  //   width: windowWidth - 20,
  //   marginLeft: 10,
  //   height: 80,
  //   borderRadius: 18,
  //   backgroundColor: '#fefefec7'
  // }
});
