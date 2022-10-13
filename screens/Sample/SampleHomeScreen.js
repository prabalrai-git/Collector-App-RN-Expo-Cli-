import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSampleRequestListByCollector } from "../../Services/appServices/AssignPatient";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppButton from "../../components/ui/AppButton";
import SampleCard from "./SampleCard";
import Header from "../../components/Header";
import LodaingComp from "../../components/ui/LodaingComp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// "RId": 9,
// "PatId": 12,
// "CollectorId": 3,
// "PatientFName": "Anib",
// "PatientMName": "undefined",
// "PatientLName": "Maharjan",
// "PatientAge": "25",
// "PatientGender": "male",
// "CollectionReqDate": "2022-03-27T02:00:33",
// "TestTotalAmount": 12500,
// "CollectionCharge": 500,
// "DiscountAmount": 200,
// "GrandTotal": 12800,
// "Remarks": "Special discount ",
// "CollectedDate": "2022-03-21T12:20:27"

const SampleHomeScreen = () => {
  const dispatch = useDispatch();
  const [RequestList, setRequestList] = useState();
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log(user.UserId);

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [toshow, setToShow] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disable, setdisable] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const onChangeFromData = (event, selectedValue) => {
    setShow(Platform.OS === "ios");
    setToShow(false);
    if (mode == "date") {
      const currentDate = selectedValue || date;
      setFromDate(currentDate);
    } else {
    }
  };
  const onChangeToData = (event, selectedValue) => {
    setToShow(Platform.OS === "ios");
    setShow(false);
    if (mode == "date") {
      const currentDate = selectedValue || date;
      setToDate(currentDate);
    } else {
    }
  };

  const showDatepicker = () => {
    setShow(true);
    setToShow(false);
  };
  const showToDatepicker = () => {
    setToShow(true);
    setShow(false);
  };
  // console.log("user role", user.UserRole);

  const handleClick = () => {
    setisLoading(true);
    const fromDate = `${
      FromDate.getFullYear() +
      "-" +
      (FromDate.getMonth() + 1) +
      "-" +
      FromDate.getDate()
    }`;
    const toDate = `${
      ToDate.getFullYear() +
      "-" +
      (ToDate.getMonth() + 1) +
      "-" +
      ToDate.getDate()
    }`;
    // const collectorId = 3
    const data = {
      fromDate: fromDate,
      toDate: toDate,
      collectorId: user.UserRole !== 2 ? user.UserId : 0,
    };
    dispatch(
      GetSampleRequestListByCollector(data, (res) => {
        setRequestList(res.RequestList);
        setisLoading(false);
      })
    );
  };
  // console.log('res', RequestList);
  const refData = (res) => {
    if (res === true) {
      handleClick();
    }
  };

  const renderItem = ({ item }) => (
    <SampleCard
      data={item}
      refData={refData}
      disable={disable}
      retDis={handleDisable}
    />
    // <AcceptedCard data={item} refData={refData}/>
  );
  const handleDisable = (e) => {
    // console.log('disable', e)
    setdisable(e);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Header title={"Sample Collection"}></Header>
          <View style={styles.dateFiltercontainer}>
            <TouchableOpacity onPress={showDatepicker} style={styles.TextInput}>
              <View style={styles.inputField}>
                <Text>
                  {FromDate === ""
                    ? "FromDate.."
                    : FromDate.toLocaleDateString()}
                </Text>
                <Icon
                  name="calendar"
                  color={secodaryCardColor}
                  type="entypo"
                  size={20}
                ></Icon>
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                // timeZoneOffsetInMinutes={0}
                value={FromDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeFromData}
                // minimumDate={new Date()}
              />
            )}

            <TouchableOpacity
              onPress={showToDatepicker}
              style={styles.TextInput}
            >
              <View style={styles.inputField}>
                <Text>
                  {ToDate === "" ? "ToDate.." : ToDate.toLocaleDateString()}
                </Text>
                <Icon
                  name="calendar"
                  color={secodaryCardColor}
                  type="entypo"
                  size={20}
                ></Icon>
              </View>
            </TouchableOpacity>
            {toshow && (
              <DateTimePicker
                testID="dateTimePicker"
                // timeZoneOffsetInMinutes={0}
                value={ToDate}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeToData}
                minimumDate={new Date()}
              />
            )}
            <AppButton title="Search" onPress={() => handleClick()}></AppButton>
          </View>
        </View>

        <View style={styles.listcontainer}>
          {isLoading === false ? (
            <FlatList
              data={RequestList}
              renderItem={renderItem}
              keyExtractor={(item) => item.RId}
            ></FlatList>
          ) : (
            <LodaingComp></LodaingComp>
          )}
        </View>
      </View>
    </View>
  );
};

export default SampleHomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#F9F9F9",
  },
  top: {
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: "hidden",
  },
  dateFiltercontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: secodaryCardColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TextInput: {
    width: windowWidth * 0.3,
    alignItems: "center",
    backgroundColor: "#fefefe",
    borderRadius: 5,
    justifyContent: "center",
  },
  inputField: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listcontainer: {
    justifyContent: "center",
    width: windowWidth,
    height: windowHeight * 0.86,
    flexDirection: "row",
  },
});
