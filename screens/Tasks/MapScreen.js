import {
  Dimensions,
  StyleSheet,
  View,
  Alert,
  Linking,
  Switch,
  Modal,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MarkerCostome from "../../components/ui/MarkerCostome";
import { Avatar, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCollectorLocation } from "../../Services/appServices/Collector";
import AppButton from "../../components/ui/AppButton";
// import MapboxGL from '@react-native-mapbox-gl/maps'

// MapboxGL.setAccessToken('pk.eyJ1IjoiOThtYXJlIiwiYSI6ImNsMDBrcnNwbTBhNHUzY3J5eGN6MGgwZm8ifQ.IQosi4_gB8CXD9q31fl7RQ');

// latitude: geolocation.latitude,
// longitude: geolocation.longitude,

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  {
    id: 1,
    title: "Complete Blood Count",
    price: 850,
  },
  {
    id: 2,
    title: "Hemogran",
    price: 450,
  },
  {
    id: 3,
    title: "Renal Functionn Text",
    price: 750,
  },
  {
    id: 4,
    title: "Liver function Test",
    price: 1050,
  },
  {
    id: 5,
    title: "Complete Blood Count",
    price: 850,
  },
  {
    id: 6,
    title: "Collagen Disease / Arthrities Panel",
    price: 850,
  },
];

const MapScreen = ({ route }) => {
  // console.log("params", route.params.data);
  const user = useSelector((state) => state.storeUserData);
  const tempCoordinate = route.params.data.PatientAddress.includes("latitude")
    ? JSON.parse(route.params.data.PatientAddress)
    : { latitude: 27.7172, longitude: 85.324 };
  const [isActive, setIsActive] = useState(false);
  const toggleSwitch = () => setIsActive((previousState) => !previousState);
  const toggleSwitch1 = () => setisPaid((previousState) => !previousState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [geolocation, setGeolocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isVisibe, setisVisibe] = useState(false);
  const [Remarks, setRemarks] = useState("");
  const [isPaid, setisPaid] = useState(false);

  // for collector
  const marker = {
    latlng: {
      latitude: geolocation.latitude === null ? 27.7172 : geolocation.latitude,
      longitude:
        geolocation.longitude === null ? 85.324 : geolocation.longitude,
    },
    title: "title",
    description: "somethindg",
  };
  // for cliet
  const cMarker = {
    latlng: {
      // latitude: geolocation.latitude === null ?27.7172 :geolocation.latitude,
      // longitude: geolocation.longitude === null ?85.3240 :geolocation.longitude,
      // latitude: 27.7172,sample
      // longitude: 85.3240
      latitude:
        tempCoordinate.latitude === null ? 27.7172 : tempCoordinate.latitude,
      longitude:
        tempCoordinate.longitude === null ? 85.324 : tempCoordinate.longitude,
    },
    title: "title",
    description: "somethindg",
  };

  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = status;
      if (finalStatus === "granted") {
        // console.log('permission grated')
        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          maximumAge: 10000,
        });
        // console.log("location 1st", userLocation);
        temp(userLocation);
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Warning",
          "You will not search if you do not enable geolocation in this app. If you would like to search, please enable geolocation for Fin in your settings.",
          [
            { text: "Cancel" },
            // we can automatically open our app in their settings
            // so there's less friction in turning geolocation on
            {
              text: "Enable Geolocation",
              onPress: () =>
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : Linking.openSettings(),
            },
          ]
        );
        return false;
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong while check your geolocation permissions, please try again later."
      );
      return false;
    }
  };

  function temp(e) {
    setGeolocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
    });
  }

  const setCollectorData = () => {
    hasGeolocationPermission();
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const data = {
      LId: 0,
      UserId: user.userData.usrUserId,
      Latitude: geolocation.latitude,
      Longitude: geolocation.longitude,
      EntryDate: newDate,
      ClientId: route.params.data.CId,
    };
    if (isActive === true) {
      // console.log(data);
      dispatch(
        UpdateCollectorLocation(data, (res) => {
          if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          } else {
          }
        })
      );
    } else {
      // console.log('no data');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCollectorData();
    }, 5000);
    return () => clearInterval(interval);
  }, [geolocation]);

  useEffect(() => {
    hasGeolocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {/* <MapboxGL.MapView style={styles.map} /> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:
            tempCoordinate.latitude === null
              ? 27.7172
              : tempCoordinate.latitude,
          longitude:
            tempCoordinate.longitude === null
              ? 85.324
              : tempCoordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* for colector */}
        <MarkerCostome
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          forCollector
        />
        {/* for client */}
        <MarkerCostome
          coordinate={cMarker.latlng}
          title={cMarker.title}
          description={cMarker.description}
          forClient
        />
      </MapView>
      <View style={styles.bSheet}>
        <View style={styles.bSheetTop}>
          <View style={styles.avatar}>
            <Avatar
              size={64}
              rounded
              source={require("../../assets/images/user.png")}
            />
          </View>

          <View style={styles.details}>
            <View>
              <Text h4>Suman Sunuwar</Text>
              <Text>sample collction for covid</Text>
            </View>

            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isActive}
            />
          </View>
        </View>
        {/* <Button title={isActive != false ? 'stop' : "start"}></Button> */}
        <AppButton
          title="collct sample"
          onPress={() => setisVisibe(true)}
        ></AppButton>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibe}
        onRequestClose={() => {
          setisVisibe(!isVisibe);
          // setisRemarksVisible(false)
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.profile}>
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.profileImg}
            ></Image>

            <View style={styles.right}>
              <Text style={styles.name}>
                {route.params.data.PatientFName}{" "}
                {route.params.data.PatientMName}{" "}
                {route.params.data.PatientLName}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Request ID :</Text>
                <Text style={{ color: "#FF7F00" }}>
                  {" "}
                  {route.params.data.CId}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Cliet ID : </Text>
                <Text style={{ color: "#FF7F00" }}>
                  {route.params.data.CId}
                </Text>
              </View>
              {/* <View style={{ flexDirection: 'row' }}>
                  <Text >Collection Date : </Text>
                  <Text style={{ color: "#FF7F00" }}>{temp[0]}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text >Collection Time : </Text>
                  <Text style={{ color: "#FF7F00" }}>{temp[1]}</Text>
                </View> */}
            </View>
          </View>
          {/* <View style={styles.statusCotnainer}>
              <StatusBadge data={route.params.data.RequestStatus}></StatusBadge>
              <StatusBadge data={'Collected'}></StatusBadge>
              <StatusBadge data={'Lab Received'}></StatusBadge>
              <StatusBadge data={'Report Dispatched'}></StatusBadge>
            </View> */}

          {/* // "CId": 1,
// "CollectionReqDate": "2022-03-07T12:10:57.52",
// "CollectorId": 2,
// "EnterBy": 15,
// "EntryDate": "2022-03-07T12:10:57.52",
// "PatientAddress": "sample string 9",
// "PatientAge": "sample str",
// "PatientEmailId": "sample string 8",
// "PatientFName": "sample string 3",
// "PatientGender": "sample str",
// "PatientLName": "sample string 5",
// "PatientMName": "sample string 4",
// "PatientNationalId": "sample string 12",
// "PatientReferedBy": 10,
// "PatientRequestorBy": 11,
// "Remarks": "sample string 13", */}
          <View style={styles.flatListContainer}>
            <Text style={styles.title}>Tests</Text>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <View style={styles.testCard}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fefefe",
                      width: 25,
                      height: 25,
                      textAlign: "center",
                      borderRadius: 50,
                      backgroundColor: "#205072",
                    }}
                  >
                    {index + 1}
                  </Text>
                  <Text style={styles.testsText}>{item.title}</Text>
                  <Text style={styles.testsPrice}>Rs.{item.price}</Text>
                </View>
              )}
              keyExtractor={({ item, index }) => index}
            />
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Total</Text>
              <Text style={styles.finsltestsPrice}>
                {/* Rs.{route.params.data.TestTotalAmount} */}
                Rs.5000
              </Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Collection Charge</Text>
              <Text style={styles.finsltestsPrice}>
                {/* Rs.{route.params.data.CollectionCharge} */}
                Rs.500
              </Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Discount Amout</Text>
              <Text style={styles.finsltestsPrice}>
                {/* Rs.{route.params.data.DiscountAmount} */}
                Rs.500
              </Text>
            </View>
            <View style={styles.testCard}>
              <Text style={styles.titleText}>Grand Total</Text>
              <Text style={styles.finsltestsPrice}>
                {/* Rs.{route.params.data.GrandTotal} */}
                Rs. 5000
              </Text>
            </View>
          </View>

          {/* {
              route.params.data.RequestStatus === 'Requested' ? */}
          <View style={styles.testList}>
            <View style={styles.TextInput}>
              <Text style={styles.formLabel}>IsPaid</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isPaid ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch1}
                value={isPaid}
                disabled={isPaid}
              />
            </View>
            <View style={styles.TextInput}>
              <TextInput
                value={Remarks}
                placeholder="remarks"
                onChangeText={(e) => setRemarks(e)}
                style={styles.inputField}
                multiline={true}
              ></TextInput>
            </View>
            <AppButton title="submit"></AppButton>
            {/* <Button disabled></Button> */}
          </View>
          {/* : <Text></Text>
            } */}
        </View>
      </Modal>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bSheet: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: "#fefefe",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  bSheetTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  details: {
    width: Dimensions.get("window").width * 0.65,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: Dimensions.get("window").width * 0.25,
    textAlign: "center",
    alignItems: "center",
  },

  mainContainer: {
    flex: 1,
    // paddingTop: 40,
    // backgroundColor: '#9DD4E9'
    backgroundColor: "#fefefe",
  },

  profile: {
    // flex: 1,
    flexDirection: "row",
    padding: 10,
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
  testList: {
    // backgroundColor: '#fefefe',
    position: "absolute",
    bottom: 0,
    backgroundColor: "#9DD4E9",
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  title: {
    fontSize: 20,
    color: "#205072",
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginBottom: 10,
  },
  flatListContainer: {
    width: windowWidth - 20,
    marginHorizontal: 10,
  },
  testCard: {
    flexDirection: "row",
    marginVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: windowWidth,
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
    marginLeft: 20,
    width: windowWidth * 0.6,
  },
  testsPrice: {
    width: windowWidth * 0.4,
    color: "#FF7F00",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#fefefe",
    width: windowWidth * 0.92,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  centeredView: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "#fefefe",
    justifyContent: "center",
    alignItems: "center",
  },
  modelCotainer: {
    height: windowHeight,
    width: windowWidth,
  },
  preview: {
    width: "100%",
    height: 400,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
  statusCotnainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  TextInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 16,
    width: windowWidth * 0.6,
  },
  finsltestsPrice: {
    borderWidth: 1,
    borderColor: "#efed11",
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
  },
});
