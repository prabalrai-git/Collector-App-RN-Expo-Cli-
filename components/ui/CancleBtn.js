import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-elements";

const CancleBtn = (props) => {
  return (
    <>
      <Button
        title={props.title}
        onPress={props.onPress}
        buttonStyle={styles.secondaryBtn}
        type={"clear"}
        titleStyle={{ color: "white", fontSize: 15 }}
      >
        {/* <Text style={styles.txt}>{props.title}</Text> */}
      </Button>
    </>
  );
};

export default CancleBtn;

const styles = StyleSheet.create({
  secondaryBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red",
    maxWidth: Dimensions.get("window").width * 0.95,
  },
});
