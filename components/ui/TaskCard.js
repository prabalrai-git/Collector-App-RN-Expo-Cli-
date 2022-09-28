import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppButton from "./AppButton";
import CancleBtn from "./CancleBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddressOfClient,
  GetHomeCollectionTestRequestTestList,
  UpdateStatus,
} from "../../Services/appServices/AssignPatient";
import StatusBadge from "./StatusBadge";
import MapView from "react-native-maps";
import MarkerCostome from "./MarkerCostome";
import { Icon } from "react-native-elements";
import BadgeStatus from "./BadgeStatus";
import DateBadge from "./DateBadge";
// import { GlobalStyles } from '../../GlobalStyle';
import { PushNotification } from "../PushNotification";
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

const TaskCard = ({
  data,
  AsignedTask,
  disable,
  retDis,
  rejected,
  completed,
}) => {
  // console.log('data task', data);
  const [isVisibe, setisVisibe] = useState(false);
  const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log('user', user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const text = data.CollectionReqDate;
  const temp = text.split("T");
  const [TestList, setTestList] = useState();
  const [Coordinate, setCoordinate] = useState({
    latitude: null,
    longitude: null,
  });
  let RequestPatientname = `${data.PatientFName} ${data.PatientMName} ${data.PatientLName}`;

  useEffect(() => {
    dispatch(
      GetHomeCollectionTestRequestTestList(data.RequestId, (res) => {
        setTestList(res?.RequestTestList);
      })
    );
    dispatch(
      GetAddressOfClient(data.CId, (res) => {
        // setCoordinate(res?.RequestTestList);
        // console.log("res", res.clientAddress[0].PatientAddress);
        let temp = JSON.parse(res.clientAddress[0].PatientAddress);
        // console.log('temp', temp);
        setCoordinate(temp);
      })
    );
  }, []);

  const hadleEvent = () => {
    setisVisibe(true);
    retDis(true);
  };

  const handleAccept = () => {
    // UpdateStatus
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();

    const rData = {
      SrId: 0,
      RequestId: data.RequestId,
      RequestStatusId: 3,
      //  "RequestStatusId": 1,
      EntryDate: newDate,
      UserId: user.UserId,
      Remarks: `accepted by user ${user.UserName}`,
    };
    // console.log('accepted data', rData);
    dispatch(
      UpdateStatus(rData, (res) => {
        // console.log('response', res);
        if (res?.SuccessMsg === true) {
          // console.log('potato sucess');
          setisVisibe(false);

          Alert.alert("Successfull !", "Task Accepted Successfully", [
            {
              text: "OK",
              onPress: () => {
                PushNotification(
                  "accepted task",
                  user.UserId,
                  data.EnterBy,
                  data.RequestId,
                  Remarks,
                  user.UserName,
                  RequestPatientname
                );
                navigation.navigate("AcceptedTask");
              },
            },
          ]);
        }
      })
    );
    retDis(false);
  };

  const handleReject = () => {
    // PushNotification('rejected task', user.UserId, 1,  data.RequestId,Remarks)
    // return

    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();
    const aData = {
      SrId: 0,
      RequestId: data.RequestId,
      RequestStatusId: 4,
      EntryDate: newDate,
      UserId: user.UserId,
      Remarks: Remarks,
    };
    // console.log(aData);
    // return
    if (Remarks !== "" || Remarks !== undefined) {
      // PushNotification('RejectedTask', user.userData.usrusername, 'admin', Remarks)
      // return

      dispatch(
        UpdateStatus(aData, (res) => {
          // console.log('response', res);
          if (res?.SuccessMsg === true) {
            // console.log('potato sucess, rejected');

            Alert.alert("Successfull !", "Successfully Rejected", [
              {
                text: "OK",
                onPress: () => {
                  PushNotification(
                    "rejected task",
                    user.UserId,
                    data.EnterBy,
                    data.RequestId,
                    Remarks,
                    user.UserName,
                    RequestPatientname
                  );
                  navigation.navigate("RejectedTask");
                  setisVisibe(!isVisibe);
                  setisRemarksVisible(false);
                  setRemarks("");
                },
              },
            ]);
          }
        })
      );
    } else {
      Alert.alert("Failure !", "please enter the remarks", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    }

    retDis(false);
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
    description: "something",
  };
  // console.log('resons', data.remarks);
  return (
    <>
      <Pressable
        disabled={disable}
        onPress={() => hadleEvent()}
        style={styles.cardCotainer}
      >
        <View style={[styles.cardBody, GlobalStyles.boxShadow]}>
          <View style={styles.card}>
            <View style={styles.cDetail}>
              <Text style={styles.ctitle}>
                {data.PatientFName} {data.PatientLName}
              </Text>
              <Text style={styles.subheading}>
                Request Id: {data.RequestId}
              </Text>
              <DateBadge date={data.CollectionReqDate}></DateBadge>
            </View>

            <BadgeStatus
              RequestStatus={data.SampleStatus}
              IsPaid={data.IsPaid}
            ></BadgeStatus>
          </View>
          {rejected && (
            <View style={styles.remarks}>
              <Text style={styles.ctitle}>Remarks</Text>
              <Text style={styles.remarksDis}>{data.Remarks}</Text>
            </View>
          )}
        </View>
      </Pressable>
      {AsignedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibe}
          onRequestClose={() => {
            setisVisibe(!isVisibe);
            setisRemarksVisible(false);
            retDis(false);
          }}
        >
          <KeyboardAvoidingView style={styles.centeredView}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: secodaryCardColor,
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={() => {
                  setisVisibe(false);
                  setisRemarksVisible(false);
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
              {isRemarksVisible ? (
                <View style={styles.textInput}>
                  <Text style={styles.formLabel}>
                    Please write remarks on why you want to decline
                  </Text>
                  <TextInput
                    value={Remarks}
                    placeholder="Remarks"
                    onChangeText={(e) => setRemarks(e)}
                    style={styles.inputField}
                    multiline={true}
                  ></TextInput>
                  {/* <TextInput></TextInput> */}

                  <AppButton
                    title="Send"
                    onPress={() => handleReject()}
                  ></AppButton>
                </View>
              ) : (
                <View style={styles.patInfocontainer}>
                  <View style={styles.profile}>
                    <Image
                      source={require("../../assets/images/user.png")}
                      style={styles.profileImg}
                    ></Image>
                    <View style={styles.right}>
                      <Text style={styles.name}>
                        {data.PatientFName} {data.PatientMName}{" "}
                        {data.PatientLName}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Request ID :</Text>
                        <Text style={{ color: "#FF7F00" }}>
                          {" "}
                          {data.RequestId}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Cliet ID : </Text>
                        <Text style={{ color: "#FF7F00" }}>{data.PatId}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Collection Date : </Text>
                        <Text style={{ color: "#FF7F00" }}>{temp[0]}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Collection Time : </Text>
                        <Text style={{ color: "#FF7F00" }}>{temp[1]}</Text>
                      </View>
                    </View>
                  </View>

                  <StatusBadge
                    RequestStatus={data.SampleStatus}
                    IsPaid={data.IsPaid}
                  ></StatusBadge>

                  <View
                    style={[styles.mapViewContainer, GlobalStyles.boxShadow]}
                  >
                    <MapView
                      style={styles.map}
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
                        latitudeDelta: 0.0111922,
                        longitudeDelta: 0.0111421,
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

                  <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
                    <Text style={styles.title}>Tests</Text>
                    {/* <FlatList
                        data={TestList}
                        renderItem={({ item, index }) =>
                          <View style={styles.testCard}>
                            <Text style={{
                              fontSize: 16,
                              color: '#fefefe',
                              width: 25,
                              height: 25,
                              textAlign: 'center',
                              borderRadius: 50,
                              backgroundColor: '#205072',
                            }}>{index + 1}</Text>
                            <Text style={styles.testsText}>{item.TestName}</Text>
                            <Text style={styles.testsPrice}>Rs.{item.TestPrice}</Text>
                          </View>
                        }
                        keyExtractor={item => item.SId}
                      /> */}
                    {TestList !== undefined
                      ? TestList.map((e) => (
                          <View style={styles.testCard} key={e.SId}>
                            <Text style={styles.testsText}>{e.TestName}</Text>
                            <Text style={styles.testsPrice}>
                              Rs.{e.TestPrice}
                            </Text>
                          </View>
                        ))
                      : null}
                  </View>

                  <View style={[styles.module, GlobalStyles.boxShadow]}>
                    <Text
                      style={{
                        color: "#fefefe",
                        fontSize: 16,
                        marginBottom: 10,
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      Do you want to Accept or rect the task ?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <CancleBtn
                        title="Reject"
                        color={"#e0c945"}
                        onPress={() => setisRemarksVisible(true)}
                      ></CancleBtn>
                      <Text> </Text>
                      <AppButton
                        title="Accept"
                        onPress={() => handleAccept()}
                      ></AppButton>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {rejected || completed ? (
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
          <View style={styles.centeredView}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: secodaryCardColor,
                  padding: 10,
                  borderRadius: 50,
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
                  <Image
                    source={require("../../assets/images/user.png")}
                    style={styles.profileImg}
                  ></Image>
                  <View style={styles.right}>
                    <Text style={styles.name}>
                      {data.PatientFName} {data.PatientMName}{" "}
                      {data.PatientLName}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Request ID :</Text>
                      <Text style={{ color: "#FF7F00" }}> {data.RId}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Cliet ID : </Text>
                      <Text style={{ color: "#FF7F00" }}>{data.PatId}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Collection Date : </Text>
                      <Text style={{ color: "#FF7F00" }}>{temp[0]}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Collection Time : </Text>
                      <Text style={{ color: "#FF7F00" }}>{temp[1]}</Text>
                    </View>
                  </View>
                </View>

                <StatusBadge
                  RequestStatus={data.RequestStatus}
                  IsPaid={data.IsPaid}
                ></StatusBadge>

                <View style={[styles.mapViewContainer, GlobalStyles.boxShadow]}>
                  <MapView
                    style={styles.map}
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
                      latitudeDelta: 0.0111922,
                      longitudeDelta: 0.0111421,
                    }}
                  >
                    <MarkerCostome
                      coordinate={cMarker.latlng}
                      title={cMarker.title}
                      description={cMarker.description}
                      forCollector
                    />
                  </MapView>
                </View>

                <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
                  <View style={styles.flatListContainer}>
                    <Text style={styles.title}>Tests</Text>

                    {TestList !== undefined
                      ? TestList.map((e) => (
                          <View style={styles.testCard} key={e.TestName}>
                            <Text style={styles.testsText}>{e.TestName}</Text>
                            <Text style={styles.testsPrice}>
                              Rs.{e.TestPrice}
                            </Text>
                          </View>
                        ))
                      : null}
                  </View>
                </View>
              </View>

              <View>
                {rejected && (
                  <View
                    style={[styles.testList, { backgroundColor: "#eb5b48" }]}
                  >
                    <Text
                      style={{
                        color: "#fefefe",
                        fontSize: 18,
                        marginBottom: 10,
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      Sample Rejcted
                    </Text>
                    <Text
                      style={{
                        color: "#fefefe",
                        fontSize: 16,
                        marginBottom: 10,
                        letterSpacing: 1,
                      }}
                    >
                      {data.Remarks}
                    </Text>
                  </View>
                )}
                {completed && (
                  <View style={[styles.testList, GlobalStyles.boxShadow]}>
                    <Text
                      style={{
                        color: "#fefefe",
                        fontSize: 18,
                        marginBottom: 10,
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      Sample collected
                    </Text>
                    <Text
                      style={{
                        color: "#fefefe",
                        fontSize: 16,
                        marginBottom: 10,
                        letterSpacing: 1,
                      }}
                    >
                      {data.Remarks}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      ) : null}
    </>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },

  cardBody: {
    backgroundColor: "#fefefe",
    marginTop: 8,
    marginBottom: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#205072",
    // shadowColor: "#101010",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,

    // elevation: 2,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  subheading: {
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
    // width: '100%',
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  textInput: {
    width: "100%",
    // flex: 1,
    marginLeft: 10,
    marginTop: 80,
    // justifyContent: 'center',
  },
  module: {
    width: "100%",
    // flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: "#9DD4E9",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 18,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "red",
    width: windowWidth - 20,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },

  patInfocontainer: {
    width: windowWidth - 20,
    flex: 1,
    marginLeft: 10,
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
  mapViewContainer: {
    width: "100%",
    height: 230,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    flex: 1,
  },
  // flatListContainer: {
  //   width: windowWidth - 20,
  //   marginHorizontal: 10,
  //   flex: 0.55,
  // },
  title: {
    fontSize: 20,
    color: "#205072",
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginBottom: 10,
  },
  testCard: {
    flexDirection: "row",
    marginVertical: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    // marginLeft: 20,
    width: windowWidth * 0.7,
  },
  testsPrice: {
    width: windowWidth * 0.3,
    color: "#FF7F00",
  },
  remarks: {
    // borderWidth: 1,
    // borderColor: '#76968a',
    // borderRadius: 5,
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  remarksDis: {
    fontSize: 12,
    color: "#205072",
    letterSpacing: 1,
    textAlign: "justify",
  },
  cardContainer: {
    // borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "#fefefe",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  testList: {
    backgroundColor: "#9DD4E9",
    marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    width: windowWidth - 20,
  },
});
