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
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppButton from "./AppButton";
import { useDispatch, useSelector } from "react-redux";
import {
  GetHomeCollectionTestRequestTestList,
  UpdatePaidStatus,
  UpdateStatus,
} from "../../Services/appServices/AssignPatient";
import StatusBadge from "./StatusBadge";
import MapView from "react-native-maps";
import MarkerCostome from "./MarkerCostome";
import { Icon } from "react-native-elements";
import BadgeStatus from "./BadgeStatus";
import DateBadge from "./DateBadge";
import { GlobalStyles } from "../../GlobalStyle";
import { PushNotification } from "../PushNotification";

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

const AcceptedCard = ({ data, refData, disable, retDis }) => {
  // console.log("accepted data", data)
  const [isVisibe, setisVisibe] = useState(false);
  // const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const user = useSelector((state) => state.storeUserData.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const text = data.CollectionReqDate;
  const temp = text.split("T");
  const [TestList, setTestList] = useState();
  const [isPaid, setisPaid] = useState(false);
  const [Coordinate, setCoordinate] = useState(JSON.parse(data.PatientAddress));
  let RequestPatientname = `${data.PatientFName} ${data.PatientMName} ${data.PatientLName}`;

  useEffect(() => {
    setisPaid(data.IsPaid);
  }, [isVisibe]);

  const toggleSwitch = () => setisPaid((previousState) => !previousState);
  const [btnDis, setbtnDis] = useState(false);

  useEffect(() => {
    dispatch(
      GetHomeCollectionTestRequestTestList(data.RequestId, (res) => {
        setTestList(res?.RequestTestList);
      })
    );
  }, []);

  const hadleEvent = () => {
    setisVisibe(true);
    retDis(true);
  };
  const handleSubmit = () => {
    // UpdateStatus
    setbtnDis(true);
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();
    const sData = {
      SrId: 0,
      RequestId: data.RequestId,
      RequestStatusId: 5,
      EntryDate: newDate,
      UserId: user.usrUserId,
      Remarks: Remarks === "" ? "Sample Collected" : Remarks,
    };
    const pData = {
      userId: user.usrUserId,
      requestId: data.RequestId,
      ispaid: isPaid,
      remarks: Remarks === "" ? "Bill paid" : Remarks,
    };

    // console.log('rejected data', sData);

    // console.log("data", sData, "pdata",pData);
    // return
    if (isPaid === true) {
      // console.log('paid');
      // return
      dispatch(
        UpdateStatus(sData, (res) => {
          // console.log('response of accepted task', res);
          if (res?.SuccessMsg === true) {
            dispatch(
              UpdatePaidStatus(pData, (res) => {
                // console.log("response sucess", res);
                // if (res?.SuccessMsg === true) {
                setRemarks("");
                Alert.alert(
                  "Success !",
                  "Sample has been collected successfully",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        PushNotification(
                          "sample collected",
                          user.UserId,
                          data.EnterBy,
                          data.RequestId,
                          Remarks,
                          user.UserName,
                          RequestPatientname
                        );
                        setisVisibe(!isVisibe);
                        refData(true);
                      },
                    },
                  ]
                );
                // }
              })
            );
          } else {
            Alert.alert("Failure !", "Please collect the due", [
              {
                text: "OK",
                onPress: () => {},
              },
            ]);
          }
          setbtnDis(false);
        })
      );
    } else {
      Alert.alert("Failure !", "Please collect the due", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
      setbtnDis(false);
    }
    retDis(false);
  };

  const handleDrop = () => {
    // UpdateStatus
    setbtnDis(true);
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();
    const sData = {
      SrId: 0,
      RequestId: data.RequestId,
      RequestStatusId: 6,
      EntryDate: newDate,
      UserId: user.usrUserId,
      Remarks: "Sample Droped in lab",
    };

    // console.log('drop  sample', sData);
    // return
    dispatch(
      UpdateStatus(sData, (res) => {
        // console.log('response of accepted task', res);
        if (res?.SuccessMsg === true) {
          Alert.alert("Success !", "Sample has been droped sucessfully", [
            {
              text: "OK",
              onPress: () => {
                setisVisibe(!isVisibe);
                navigation.navigate("CompletedTask");
                setRemarks("");
              },
            },
          ]);
        } else {
          Alert.alert("Failure !", "server error, please try again later", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
        setbtnDis(false);
      })
    );
    retDis(false);
  };

  // console.log('isVisibe',);

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
  // console.log('data', data);
  return (
    <>
      <Pressable
        disabled={disable}
        onPress={() => hadleEvent()}
        style={styles.cardCotainer}
      >
        <View style={[styles.cardBody, GlobalStyles.boxShadow]}>
          <View style={styles.card}>
            <Text style={styles.ctitle}>
              {data.PatientFName} {data.PatientLName}
            </Text>
            <Text style={styles.remarks}>Request Id: {data.RequestId}</Text>
            {/* <Text style={styles.cDate}>{data.CollectionReqDate}</Text> */}
            <DateBadge date={data.CollectionReqDate}></DateBadge>
          </View>
          <BadgeStatus
            RequestStatus={data.SampleStatus}
            IsPaid={data.IsPaid}
          ></BadgeStatus>
        </View>
      </Pressable>

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
                    {data.PatientFName} {data.PatientMName} {data.PatientLName}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Request ID :</Text>
                    <Text style={{ color: "#FF7F00" }}> {data.RequestId}</Text>
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
                      <View style={styles.testCard} key={e.TestName}>
                        <Text style={styles.testsText}>{e.TestName}</Text>
                        <Text style={styles.testsPrice}>Rs.{e.TestPrice}</Text>
                      </View>
                    ))
                  : null}
              </View>
            </View>
            {data.SampleStatus === "Collected" ? (
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
                  "{data.Remarks}"
                </Text>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 1,
                  }}
                >
                  Do you want to drop sample in lab ?
                </Text>
                <AppButton
                  title="Drop Sample"
                  onPress={() => handleDrop()}
                  disabled={btnDis}
                ></AppButton>
              </View>
            ) : (
              <View style={[styles.testList, GlobalStyles.boxShadow]}>
                {isPaid !== true ? (
                  <View style={styles.TextInput}>
                    <Text style={styles.formLabel}>IsPaid</Text>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={isPaid ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isPaid}
                      disabled={isPaid}
                    />
                  </View>
                ) : null}

                <View style={styles.TextInput}>
                  <TextInput
                    value={Remarks}
                    placeholder="remarks"
                    onChangeText={(e) => setRemarks(e)}
                    style={styles.inputField}
                    multiline={true}
                  ></TextInput>
                </View>
                <AppButton
                  title="Collect Sample"
                  onPress={() => handleSubmit()}
                  disabled={btnDis}
                ></AppButton>
                {/* <Button disabled></Button> */}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default AcceptedCard;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
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
    // height: "100%",
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#f9f9f9",
  },

  patInfocontainer: {
    width: windowWidth - 20,
    flex: 1,
    marginLeft: 10,
    // backgroundColor: 'red'
  },

  profile: {
    // flex: 1,
    flexDirection: "row",
    // padding: 10,
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
    height: 200,
    // backgroundColor: 'red',
    borderRadius: 18,
    marginVertical: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    flex: 1,
  },
  flatListContainer: {
    width: windowWidth - 20,
    marginHorizontal: 10,
    flex: 0.55,
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
    marginVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: "100%",
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

  testList: {
    // backgroundColor: '#fefefe',
    // position: 'absolute',
    // bottom: 0,
    // left: 10,
    // right: 0,
    backgroundColor: "#9DD4E9",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    // borderTopRightRadius: 18,
    width: windowWidth - 20,
    marginLeft: 10,
  },
  TextInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#fefefe",
    width: windowWidth - 50,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardContainer: {
    // borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "#fefefe",
    paddingVertical: 16,
    paddingHorizontal: 10,
    // maxHeight: 200,
  },
});
