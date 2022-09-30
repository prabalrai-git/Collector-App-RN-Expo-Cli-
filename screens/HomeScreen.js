import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../GlobalStyle";
import { HomeActionButton2 } from "../components/ui/HomeActionButton";

import { useDispatch, useSelector } from "react-redux";

import NotificationBtn from "../components/ui/NotificationBtn";

const windowWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.storeUserData);
  // console.log(user.userData.UserName);
  const dispatch = useDispatch();

  const navData = [
    {
      id: 1,
      name: "Add Patient",
      pathName: "AddPatient",
      color: "#9985FF",
      icon: "addusergroup",
      type: "antdesign",
      isAdmin: true,
      isCollecor: true,
    },
    {
      id: 2,
      name: "Patients",
      pathName: "BookTest",
      color: "#FF8585",
      icon: "user",
      type: "antdesign",
      isAdmin: true,
      isCollecor: true,
    },
    {
      id: 3,
      name: "Samples",
      pathName: "SampleHome",
      color: "#FFC285",
      icon: "test-tube-alt",
      type: "fontisto",
      isAdmin: true,
      isCollecor: true,
    },
    {
      id: 4,
      name: "Tasks",
      pathName: "task",
      color: "#4688B3",
      icon: "notification",
      type: "entypo",
      isAdmin: false,
      isCollecor: true,
    },
    {
      id: 5,
      name: "Collector Tracking",
      pathName: "CollectorLocation",
      color: "#4688B3",
      icon: "find",
      type: "antdesign",
      isAdmin: true,
      isCollecor: false,
    },
    {
      id: 6,
      name: "Report Verification",
      pathName: "ReportVerification",
      color: "#4688B3",
      icon: "file1",
      type: "antdesign",
      isAdmin: true,
      isCollecor: false,
    },
  ];

  const renderItem = ({ item }) => <HomeActionButton2 data={item} />;

  return (
    <View style={styles.maincontainer}>
      {/* <ImageBackground
        source={require('../assets/images/bkg2.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      > */}
      <View style={styles.hamMenu}>
        <NotificationBtn></NotificationBtn>
      </View>
      {/* <Header homeScreen></Header> */}

      <View style={styles.cardContainer}>
        <View style={styles.dis}>
          <Text style={[GlobalStyles.heading, { color: "#3d4e58" }]}>Hi!</Text>
          <Text style={[GlobalStyles.header, { color: "#205072" }]}>
            {user.userData.UserName}
          </Text>
          <Text style={[GlobalStyles.body, { color: "#3d4e58" }]}>
            Your target for today is to keep positive mindset and smile to
            everyone you meet.
          </Text>
        </View>
        {/* <Avatar
            size={64}
            rounded
            source={require('../assets/images/user.png')}
          /> */}
      </View>
      {/* <View style={styles.cardContainer2}> */}
      <FlatList
        data={navData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.flatContainer}
      />
      {/* </View> */}

      {/* </ImageBackground> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  bkgImg: {
    flex: 1,
    paddingTop: 40,
  },
  cardContainer: {
    flexDirection: "row",
    width: windowWidth - 20,
    justifyContent: "space-between",
    backgroundColor: global.primaryBkg,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#86a3a3",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 1,
  },
  cardContainer2: {
    flexDirection: "row",
    width: windowWidth - 20,
    justifyContent: "space-between",
    backgroundColor: global.primaryBkg,
    borderRadius: 18,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#86a3a3",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 1,
  },
  flatContainer: {
    // width: windowWidth - 20,
    // marginHorizontal: 10,
    paddingVertical: 15,
  },
  hamMenu: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    // marginHorizontal: 10,
    // paddingHorizonal: 10,
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
});
