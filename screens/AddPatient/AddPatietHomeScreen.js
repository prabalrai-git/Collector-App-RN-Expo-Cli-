import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const AddPatietHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header title={"Select Gender"}></Header>
      <View style={styles.maincontainer}>
        <Text style={styles.title}>Gender ?</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
            style={[styles.button, styles.male]}
            onPress={() =>
              navigation.navigate("AddPatientDetals", { gender: "male" })
            }
          >
            <Icon
              name={"male"}
              color={"#fefefe"}
              type="fontisto"
              style={styles.icon}
              size={40}
            ></Icon>
            <Text style={styles.text}>Male</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.female]}
            onPress={() =>
              navigation.navigate("AddPatientDetals", { gender: "female" })
            }
          >
            {/* AddRefReq ,AddPatientDetals */}
            <Icon
              name={"female"}
              color={"#fefefe"}
              type="fontisto"
              style={styles.icon}
              size={40}
            ></Icon>
            <Text style={styles.text}>Female</Text>
          </Pressable>
        </View>

        {/* #49A3D8 */}
        {/* E866A9 */}
      </View>
    </View>
  );
};

export default AddPatietHomeScreen;

const styles = StyleSheet.create({
  // const windowWidth = Dimensions.get('window').width;
  maincontainer: {
    backgroundColor: "#fefefe",
    flexDirection: "column",
    // height: Dimensions.get('window').height,
    width: Dimensions.get("window").width - 20,
    // paddingTop: 100,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 18,
    paddingVertical: 20,
    // justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    color: "#205072",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 2,
    paddingBottom: 30,
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "#FF7F00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  male: {
    backgroundColor: "#49A3D8",
    shadowColor: "#284f66",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  female: {
    backgroundColor: "#E866A9",
    shadowColor: "#491d34",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  text: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 10,
  },
});
