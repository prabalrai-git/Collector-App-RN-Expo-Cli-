import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../GlobalStyle";

const CardButton = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(`${data.pathName}`)}
      style={[
        styles.container,
        {
          backgroundColor: data.color,
        },
      ]}
    >
      <View>
        <Text style={[styles.text, GlobalStyles.title2, { color: "#fefefe" }]}>
          {data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 110,
    overflow: "hidden",
    borderRadius: 18,
    flex: 1,
    flexDirection: "column",
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
