import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const HamMenu = () => {
  const navigation = useNavigation();

  const handleButton = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  return (
    <TouchableOpacity onPress={() => handleButton()}>
      <Icon
        name="menu-unfold"
        color={secodaryCardColor}
        type="antdesign"
        size={20}
        backgroundColor={"#ffffff"}
        style={{
          borderRadius: 10,
          padding: 10,
        }}
      ></Icon>
    </TouchableOpacity>
  );
};

export default HamMenu;

const styles = StyleSheet.create({
  // hamMenuBtn: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 20
  // },
});
