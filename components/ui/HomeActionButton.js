import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../GlobalStyle";

const windowWidth = Dimensions.get("window").width;

export const HomeActionButton = ({ data }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.btnContainer,
          {
            backgroundColor: data.color,
          },
        ]}
        onPress={() => navigation.navigate(`${data.pathName}`)}
      >
        <Icon
          name={data.icon}
          color={"#fefefe"}
          type={data.type}
          style={styles.icon}
          size={30}
        ></Icon>
        {/* <AddPatient></AddPatient> */}
        <Text
          style={[GlobalStyles.btnTxt, { color: "#fefefe", marginTop: 10 }]}
        >
          {data.name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export const HomeActionButton2 = ({ data }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.btnContainer3,
          {
            // backgroundColor: data.color
          },
          GlobalStyles.boxShadow,
        ]}
        onPress={() => navigation.navigate(`${data.pathName}`)}
      >
        <Icon
          name={data.icon}
          color={secondary}
          type={data.type}
          style={styles.icon}
          size={30}
        ></Icon>
        {/* <AddPatient></AddPatient> */}
        <Text style={[styles.txt, { color: "#232426", marginTop: 10 }]}>
          {data.name}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export const InfoActionButton = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.btnContainer2}>
      <Icon
        name={props.icon}
        color={secondary}
        type={props.type}
        style={styles.icon}
        size={30}
      ></Icon>
      <Text style={[GlobalStyles.btnTxt, { color: primary, marginTop: 10 }]}>
        {props.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: windowWidth * 0.45,
    height: 120,
    // margin: 9,
    marginHorizontal: 9,
    marginBottom: 9,
    paddingHorizontal: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    shadowColor: "#88d4ce",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnContainer2: {
    width: windowWidth * 0.45,
    height: 100,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    shadowColor: "#60b6af",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 2,
  },
  btnContainer3: {
    backgroundColor: "#fefefe",
    marginLeft: 10,
    marginBottom: 10,
    // borderWidth: 1,
    width: windowWidth * 0.3,
    // margin: 10,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  txt: {
    paddingTop: 4,
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
    lineHeight: 16,
    color: primary,
    textAlign: "center",
  },
});
