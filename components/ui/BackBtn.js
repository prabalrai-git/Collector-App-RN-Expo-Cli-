import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const BackBtn = () => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={() => handleButton()} style={styles.backBtn}>
      <Icon
        name="left"
        color={secodaryCardColor}
        type="antdesign"
        size={20}
        backgroundColor={"#ffffff"}
        style={{
          borderRadius: 12,
          padding: 10,
        }}
      ></Icon>
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  // backBtn: {
  //   position: 'absolute',
  //   top: 40,
  //   left: 10,
  // },
});
