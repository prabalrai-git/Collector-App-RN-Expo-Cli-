import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";
import MarkerCostome from "./MarkerCostome";
import { Icon } from "react-native-elements";
import { InfoActionButton } from "./HomeActionButton";
import { GetAddressOfClient } from "../../Services/appServices/AssignPatient";
import { GlobalStyles } from "../../GlobalStyle";

const windowWidth = Dimensions.get("window").width;

// "SrId": 1,
//  "RequestId": 2,
//  "RequestStatusId": 3,
//  "EntryDate": "2022-03-22T10:57:37.8717928+05:45",
//  "UserId": 5,
//  "Remarks": "sample string 6"

// "CollectedDate": "2022-04-03T17:15:03",
// "CollectionCharge": 500,
// "CollectionReqDate": "2022-04-16T17:13:44",
// "CollectorId": 3,
// "DiscountAmount": 100,
// "GrandTotal": 6215,
// "IsPaid": true,
// "PatId": 66,
// "PatientAge": "26",
// "PatientFName": "Ram",
// "PatientGender": "male",
// "PatientLName": "Yadav",
// "PatientMName": "",
// "RId": 44,
// "Remarks": "Sik free",
// "RequestStatus": "Requested",
// "TestTotalAmount": 5815,

const PatientInfoCard = ({ data, AsignedTask, disable, retDis }) => {
  // console.log('data', data);
  const [isVisibe, setisVisibe] = useState(false);
  const user = useSelector((state) => state.storeUserData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Coordinate, setCoordinate] = useState({
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    dispatch(
      GetAddressOfClient(data.CId, (res) => {
        let temp = JSON.parse(res.clientAddress[0].PatientAddress);
        setCoordinate(temp);
      })
    );
  }, []);

  const handleProceed = () => {
    navigation.navigate("SelectTest", {
      data: data,
    });
    setisVisibe(false);
  };
  const handleRequest = () => {
    navigation.navigate("PrevioiusRequest", { data: data });
    setisVisibe(false);
  };

  const hadleEvent = () => {
    setisVisibe(true);
    retDis(true);
  };

  const cMarker = {
    latlng: {
      latitude:
        Coordinate.latitude === null || Coordinate.latitude === undefined
          ? 27.7172
          : Coordinate.latitude,
      longitude:
        Coordinate.longitude === null || Coordinate.longitude === undefined
          ? 85.324
          : Coordinate.longitude,
      // latitude: 27.7172,
      // longitude: 85.3240,
    },
    title: "title",
    description: "somethindg",
  };
  return (
    <>
      <Pressable
        disabled={disable}
        onPress={() => hadleEvent()}
        style={styles.cardCotainer}
      >
        <View style={styles.cardBody}>
          <View>
            {/* <Avatar
              size={64}
              rounded
              source={require('../../assets/images/user.png')}
            /> */}
            <Icon
              name={"user"}
              color={"#fefefe"}
              type="antdesign"
              size={30}
              backgroundColor={"#3caea4"}
              borderRadius={50}
              padding={10}
            ></Icon>
          </View>
          <View style={styles.card}>
            <Text style={styles.ctitle}>
              {data.PatientFName} {data.PatientLName}
            </Text>
            <Text style={styles.remarks}>Client Id: {data.CId}</Text>
          </View>
          {/* <BadgeStatus RequestStatus={data.RequestStatus}></BadgeStatus> */}
        </View>
      </Pressable>
      {AsignedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibe}
          onRequestClose={() => {
            setisVisibe(!isVisibe);
            // setisRemarksVisible(false)
            retDis(false);
          }}
        >
          <View style={GlobalStyles.modalContainer}>
            <View style={styles.centeredView}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: secodaryCardColor,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  setisVisibe(false);
                  // setisRemarksVisible(false)
                  retDis(false);
                }}
              >
                <Icon
                  name={"close"}
                  color={"#fefefe"}
                  type="antdesign"
                  size={20}
                ></Icon>
              </TouchableOpacity>

              <View style={styles.patInfocontainer}>
                <View style={styles.profile}>
                  {/* <Image
                    source={require('../../assets/images/user.png')}
                    style={styles.profileImg}
                  ></Image> */}
                  <Icon
                    name={"user"}
                    color={primary}
                    type="antdesign"
                    size={90}
                    padding={10}
                    backgroundColor={primaryBkg}
                    borderRadius={18}
                    style={GlobalStyles.boxShadow}
                  ></Icon>
                  <View style={styles.right}>
                    <Text style={styles.name}>
                      {data.PatientFName} {data.PatientMName}{" "}
                      {data.PatientLName}
                    </Text>
                    <View style={styles.detail}>
                      <Text>Cliet ID : </Text>
                      <Text style={{ color: "#FF7F00" }}>{data.CId}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text>Gender: </Text>
                      <Text style={{ color: "#FF7F00" }}>
                        {data.PatientGender}
                      </Text>
                    </View>
                    <View style={styles.detail}>
                      <Text>Age: </Text>
                      <Text style={{ color: "#FF7F00" }}>
                        {data.PatientAge}
                      </Text>
                    </View>
                    {data.PatientEmailId !== "" ? (
                      <View style={styles.detail}>
                        <Text>Email: </Text>
                        <Text style={{ color: "#FF7F00" }}>
                          {data.PatientEmailId}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* <Text style={styles.title}>Adddress :</Text> */}
                <View style={GlobalStyles.mapViewContainer}>
                  <MapView
                    style={GlobalStyles.map}
                    initialRegion={{
                      latitude:
                        Coordinate.latitude === null ||
                        Coordinate.latitude === undefined
                          ? 27.7172
                          : Coordinate.latitude,
                      longitude:
                        Coordinate.longitude === null ||
                        Coordinate.longitude === undefined
                          ? 85.324
                          : Coordinate.longitude,
                      latitudeDelta: 0.00111922,
                      longitudeDelta: 0.00111421,
                    }}
                  >
                    <MarkerCostome
                      coordinate={cMarker.latlng}
                      title={cMarker.title}
                      description={cMarker.description}
                      forClient
                    />
                  </MapView>
                </View>

                <View style={styles.module}>
                  <Pressable onPress={() => handleRequest()}>
                    <InfoActionButton
                      icon={"book"}
                      name={"Previous Request"}
                      type={"antdesign"}
                    ></InfoActionButton>
                  </Pressable>
                  <Pressable onPress={() => handleProceed()}>
                    <InfoActionButton
                      icon={"addfile"}
                      name={"Book Test"}
                      type={"antdesign"}
                    ></InfoActionButton>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default PatientInfoCard;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardBody: {
    backgroundColor: "#fefefe",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#81e0f1d3",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 2,
  },
  card: {
    width: windowWidth * 0.65,
  },
  ctitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  remarks: {
    color: "#253539",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  },
  cDate: {
    color: "#fefefe",
    fontSize: 10,
    letterSpacing: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#ff7f00",
    borderRadius: 10,
    width: "auto",
  },
  centeredView: {
    width: "100%",
    flex: 1,
  },
  textInput: {
    width: "100%",
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  module: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  patInfocontainer: {
    width: windowWidth - 20,
    flex: 1,
    marginLeft: 10,
    // backgroundColor: 'red'
  },

  profile: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  right: {
    marginLeft: 20,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  name: {
    width: windowWidth * 0.5,
    color: "#205072",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    color: "#205072",
    fontWeight: "bold",
    letterSpacing: 1.3,
    // marginBottom: 10
  },
  detail: {
    flexDirection: "row",
    paddingBottom: 3,
  },
});
