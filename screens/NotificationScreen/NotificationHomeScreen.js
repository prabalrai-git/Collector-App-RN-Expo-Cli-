import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSampleRequestDetailsByRId } from "../../Services/appServices/Notificationservice";
import AppButton from "../../components/ui/AppButton";
import StatusBadge from "../../components/ui/StatusBadge";
import MapView from "react-native-maps";
import MarkerCostome from "../../components/ui/MarkerCostome";
import { GlobalStyles } from "../../GlobalStyle";
import Header from "../../components/Header";
import {
  GetHomeCollectionTestRequestTestList,
  UpdateStatus,
} from "../../Services/appServices/AssignPatient";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CancleBtn from "../../components/ui/CancleBtn";
import {
  GetListOfCollector,
  ReassignCollectorToCollector,
} from "../../Services/appServices/Collector";
import { PushNotification } from "../../components/PushNotification";

const windowWidth = Dimensions.get("window").width;
const NotificationHomeScreen = ({ route }) => {
  // console.log("route", route.params.data.UserIdFrom);
  const dispatch = useDispatch();
  const [UserData, setUserData] = useState();
  const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const [TestList, setTestList] = useState();
  const [Coordinate, setCoordinate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisibeRef, setisVisibeRef] = useState(false);
  const [CollectorList, setCollectorList] = useState();
  const [ColltorBtnDis, setColltorBtnDis] = useState(false);
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log(user);
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  let temp = [];

  useEffect(() => {
    dispatch(
      GetListOfCollector((res) => {
        setCollectorList(res?.GetListOfCollectors);
      })
    );
    setisRemarksVisible(false);
    setIsLoading(true);
    setUserData();
    setCoordinate();
    setTestList();
    setRemarks("");

    setTimeout(() => {
      dispatch(
        GetSampleRequestDetailsByRId(
          route.params.data.NotficationPathName,
          (res) => {
            // console.log('res', res.RequestDetails[0]);
            setUserData(res.RequestDetails[0]);
            setCoordinate(JSON.parse(res.RequestDetails[0].PatientAddress));
          }
        )
      );
      dispatch(
        GetHomeCollectionTestRequestTestList(
          route.params.data.NotficationPathName,
          (res) => {
            setTestList(res?.RequestTestList);
          }
        )
      );

      setIsLoading(false);
    }, 0);
  }, [isFocused]);

  // console.log(isFocused);
  if (UserData !== undefined) {
    // console.log(UserData.SampleStatus);
    temp = UserData.CollectionReqDate.split("T");
  }

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [isFocused])
  // "CId": 58,
  // "CollectionReqDate": "2022-04-28T15:53:09",
  // "CollectorId": 3,
  // "EnterBy": 1,
  // "EntryDate": "2022-04-28T15:53:21",
  // "IsPaid": true,
  // "PatientAddress": "{\"latitude\":27.7242209978614,\"longitude\":85.32790621742606}",
  // "PatientAge": "25",
  // "PatientEmailId": "",
  // "PatientFName": "Admin",
  // "PatientGender": "male",
  // "PatientLName": "Suman",
  // "PatientMName": "",
  // "PatientReferedBy": 1,
  // "PatientRequestorBy": 1,
  // "PaymentType": "1",
  // "Remarks": null,
  // "RequestId": 94,
  // "RequestStatus": 1,
  // "SampleStatus": "Requested",

  const handleAssigh = (id, name) => {
    // userId
    // requestId
    // collectorId
    // reqStatus
    // sampleStatus
    // remarks

    let data = {
      userId: user.UserId,
      requestId: route.params.data.NotficationPathName,
      collectorId: id,
      reqStatus: 2,
      sampleStatus: 2,
      remarks: `Sample reasigned by ${user.UserName}`,
    };
    Alert.alert("Alert !", `Do you want to assign task to ${name} `, [
      {
        text: "no",
        onPress: () => {},
      },
      {
        text: "yes",
        onPress: () => {
          setisVisibeRef(false);
          setColltorBtnDis(false);
          dispatch(
            ReassignCollectorToCollector(data, (res) => {
              if (res === true) {
                // console.log('sucess res')
                Alert.alert("Sucess !", `Assigned task to ${name} sucessfull`, [
                  {
                    text: "ok",
                    onPress: () => {
                      PushNotification(
                        "asigned task",
                        user.UserId,
                        route.params.data.UserIdFrom,
                        route.params.data.NotficationPathName,
                        `Sample reasigned by ${user.UserName}`,
                        user.UserName,
                        `${UserData.PatientFName} ${UserData.PatientMName} ${UserData.PatientLName}`
                      );
                      navigation.navigate("Home");
                    },
                  },
                ]);
              } else {
                // console.log('err')
              }
            })
          );
        },
      },
    ]);
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
      RequestId: route.params.data.NotficationPathName,
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
          // setisVisibe(false);
          Alert.alert("Sucessfull !", "Taxk accepted sucessfull", [
            {
              text: "OK",
              onPress: () => {
                PushNotification(
                  "accepted task",
                  user.UserId,
                  route.params.data.UserIdFrom,
                  route.params.data.NotficationPathName,
                  Remarks,
                  user.UserName,
                  `${UserData.PatientFName} ${UserData.PatientMName} ${UserData.PatientLName}`
                );
                navigation.navigate("Home");
              },
            },
          ]);
        }
      })
    );
    // retDis(false);
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
      RequestId: route.params.data.NotficationPathName,
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

            Alert.alert("Sucessfull !", "sucessfully rejected", [
              {
                text: "OK",
                onPress: () => {
                  PushNotification(
                    "rejected task",
                    user.UserId,
                    route.params.data.UserIdFrom,
                    route.params.data.NotficationPathName,
                    Remarks,
                    user.UserName,
                    `${UserData.PatientFName} ${UserData.PatientMName} ${UserData.PatientLName}`
                  );
                  navigation.navigate("Home");
                  // setisVisibe(!isVisibe)
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
  };

  return (
    <KeyboardAvoidingView style={styles.centeredView}>
      <Header
        title={`Notification, RId: ${route.params.data.NotficationPathName}`}
      ></Header>
      {isLoading ? (
        <Text>is loading</Text>
      ) : (
        <>
          {UserData !== undefined && (
            <ScrollView>
              {isRemarksVisible ? (
                <View
                  style={[
                    styles.cardContainer,
                    GlobalStyles.boxShadow,
                    styles.cardCotainer,
                    {
                      marginTop: 10,
                      // justifyContent: 'center',
                      // textAlign: 'center',
                      // alignItems: 'center',
                      // flexDirection: 'column'
                    },
                  ]}
                >
                  <Text style={[GlobalStyles.body, styles.formLabel]}>
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
                  {/* <CancleBtn title={'cancel'} onPress={()=> setisRemarksVisible(false)}></CancleBtn> */}
                  <AppButton
                    title="Send"
                    onPress={() => handleReject()}
                  ></AppButton>
                  <Text></Text>
                  <CancleBtn
                    title={"cancel"}
                    onPress={() => {
                      setisRemarksVisible(false);
                      setRemarks("");
                    }}
                  ></CancleBtn>
                </View>
              ) : (
                <View style={styles.cardCotainer}>
                  <View style={styles.profile}>
                    <Image
                      source={require("../../assets/images/user.png")}
                      style={styles.profileImg}
                    ></Image>
                    <View style={styles.right}>
                      <Text style={styles.name}>
                        {UserData.PatientFName} {UserData.PatientMName}{" "}
                        {UserData.PatientLName}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Request ID :</Text>
                        <Text style={{ color: "#FF7F00" }}>
                          {" "}
                          {UserData.RequestId}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Cliet ID : </Text>
                        <Text style={{ color: "#FF7F00" }}>{UserData.CId}</Text>
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
                    RequestStatus={UserData.SampleStatus}
                    IsPaid={UserData.IsPaid}
                  ></StatusBadge>

                  <View
                    style={[styles.mapViewContainer, GlobalStyles.boxShadow]}
                  >
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude:
                          Coordinate?.latitude !== undefined
                            ? Coordinate?.latitude
                            : null,
                        longitude: Coordinate?.longitude,
                        latitudeDelta: 0.00511922,
                        longitudeDelta: 0.00511421,
                      }}
                    >
                      <MarkerCostome
                        coordinate={Coordinate}
                        title={"title"}
                        description={"dis"}
                        forClient
                      />
                    </MapView>
                  </View>

                  <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
                    <Text style={styles.title}>Tests</Text>
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

                  {UserData.SampleStatus === "Requested" ||
                  UserData.SampleStatus === "Assighned" ? (
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
                        <AppButton
                          title="Accept"
                          onPress={() => handleAccept()}
                        ></AppButton>
                      </View>
                    </View>
                  ) : null}
                  {UserData.SampleStatus === "Rejected" && (
                    <>
                      <View
                        style={[
                          styles.testList,
                          { backgroundColor: "#eb5b48da" },
                        ]}
                      >
                        <Text
                          style={{
                            color: "#fefefe",
                            fontSize: 18,
                            marginBottom: 10,
                            fontWeight: "bold",
                            letterSpacing: 1,
                          }}
                        >{`Sample Rejcted by ${route.params.data.UserIdFrom}`}</Text>
                        <Text
                          style={{
                            color: "#fefefe",
                            fontSize: 16,
                            marginBottom: 10,
                            letterSpacing: 1,
                          }}
                        >
                          {route.params.data.NotificationDesc}
                        </Text>
                      </View>
                      <AppButton
                        disabled={ColltorBtnDis}
                        title={"Re-asssign"}
                        onPress={() => setisVisibeRef(!isVisibeRef)}
                      ></AppButton>
                    </>
                  )}

                  {UserData.SampleStatus === "Accepted" && (
                    <>
                      <View
                        style={[
                          styles.testList,
                          { backgroundColor: "#48e6ebda" },
                        ]}
                      >
                        <Text
                          style={{
                            color: "#fefefe",
                            fontSize: 18,
                            marginBottom: 10,
                            fontWeight: "bold",
                            letterSpacing: 1,
                          }}
                        >{`Sample Accepted by ${UserData.CollectorId}`}</Text>
                      </View>
                    </>
                  )}
                </View>
              )}
            </ScrollView>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isVisibeRef}
            onRequestClose={() => {
              setisVisibeRef(!isVisibeRef);
              setColltorBtnDis(false);
            }}
          >
            <View style={styles.centeredView}>
              <View>
                {/* <Filter data={CollectorList} returnData={handleChangeRef} forColl></Filter> */}
                <FlatList
                  data={CollectorList}
                  keyExtractor={(item, index) => `${item.Id}${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleAssigh(item.UserId, item.UserName)}
                      // setPtientCollector(item.UserId)
                      // setPatientCollectorName(item.UserName)
                      style={styles.cardBtn}
                    >
                      <Text style={styles.cardBtnTxt}>{item.UserName}</Text>
                    </TouchableOpacity>
                  )}
                ></FlatList>
              </View>
            </View>
          </Modal>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default NotificationHomeScreen;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth - 20,
    marginLeft: 10,
  },

  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#205072",
    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
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
  module: {
    justifyContent: "space-between",
    backgroundColor: "#9DD4E9",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 18,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#b3afaf",
    width: "100%",
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
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
    borderRadius: 18,
    backgroundColor: "#fefefe",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  testList: {
    backgroundColor: "#9DD4E9",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    width: windowWidth - 20,
  },
  cardBtn: {
    backgroundColor: "#7fb8d3",
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: Dimensions.get("window").width - 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  cardBtnTxt: {
    color: "#fefefe",
    letterSpacing: 1,
    fontSize: 14,
  },
  formLabel: {
    color: secondary,
  },
});
