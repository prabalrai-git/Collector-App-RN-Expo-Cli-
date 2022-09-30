import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const AppButton = (props) => {
  return (
    <>
      <Button
        title={props.title}
        disabled={props.disabled}
        onPress={props.onPress}
        buttonStyle={styles.primaryBtn}
      >
        {/* <Text style={styles.txt}>{props.title}</Text> */}
      </Button>
    </>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  primaryBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#205072",
    borderRadius: 8,
    maxWidth: Dimensions.get("window").width * 0.95,
  },
});
