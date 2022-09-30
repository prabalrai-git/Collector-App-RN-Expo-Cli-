import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const LoginBtn = (props) => {
  return (
    <>
      <Button
        title={props.title}
        disabled={props.disabled}
        onPress={props.onPress}
        buttonStyle={styles.primaryBtn}
        titleStyle={{
          fontSize: 18,
          textTransform: "capitalize",
        }}
      >
        {/* <Text style={styles.txt}>{props.title}</Text> */}
      </Button>
    </>
  );
};

export default LoginBtn;

const styles = StyleSheet.create({
  primaryBtn: {
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 30,
    height: 48,
    // paddingVertical: 10,
    // width: '100%',
    backgroundColor: "#205072",
    borderRadius: 8,
    width: Dimensions.get("window").width - 40,
  },
});
