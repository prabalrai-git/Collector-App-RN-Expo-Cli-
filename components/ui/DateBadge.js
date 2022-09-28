import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DateBadge = ({ date }) => {
  const text = date;
  let temp = text.split("T");
  return (
    <View style={styles.cDate}>
      <Text
        style={{
          color: "#fefefe",
          fontSize: 12,
          letterSpacing: 2,
        }}
      >
        {temp[0]}
      </Text>
    </View>
  );
};

export default DateBadge;

const styles = StyleSheet.create({
  cDate: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: "#ff7f00",
    borderRadius: 18,
    width: 110,
    alignItems: "center",
  },
});
